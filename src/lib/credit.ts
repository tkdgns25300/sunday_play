import { SupabaseClient } from "@supabase/supabase-js";

export async function getCreditBalance(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  const { data } = await supabase
    .from("user_credits")
    .select("balance")
    .eq("user_id", userId)
    .single();
  return data?.balance ?? 0;
}

export async function hasPurchasedGame(
  supabase: SupabaseClient,
  userId: string,
  gameId: string
): Promise<boolean> {
  const { data } = await supabase
    .from("game_purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("game_id", gameId)
    .single();
  return !!data;
}

export async function getPurchasedGames(
  supabase: SupabaseClient,
  userId: string
): Promise<string[]> {
  const { data } = await supabase
    .from("game_purchases")
    .select("game_id")
    .eq("user_id", userId)
    .order("purchased_at", { ascending: false });
  return data?.map((row) => row.game_id) ?? [];
}

export async function purchaseGame(
  supabase: SupabaseClient,
  userId: string,
  gameId: string,
  creditPrice: number
): Promise<{ success: boolean; message: string }> {
  const balance = await getCreditBalance(supabase, userId);
  if (balance < creditPrice) {
    return { success: false, message: "크레딧이 부족합니다." };
  }

  const already = await hasPurchasedGame(supabase, userId, gameId);
  if (already) {
    return { success: false, message: "이미 구매한 게임입니다." };
  }

  const { error: deductError } = await supabase
    .from("user_credits")
    .update({
      balance: balance - creditPrice,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);
  if (deductError) {
    return { success: false, message: "크레딧 차감 중 오류가 발생했습니다." };
  }

  const { error: purchaseError } = await supabase
    .from("game_purchases")
    .insert({ user_id: userId, game_id: gameId, credit_amount: creditPrice });
  if (purchaseError) {
    await supabase
      .from("user_credits")
      .update({ balance, updated_at: new Date().toISOString() })
      .eq("user_id", userId);
    return { success: false, message: "구매 기록 중 오류가 발생했습니다." };
  }

  await supabase.from("credit_transactions").insert({
    user_id: userId,
    type: "deduct",
    amount: creditPrice,
    description: `게임 구매: ${gameId}`,
  });

  return { success: true, message: "구매 완료" };
}

export async function chargeCredits(
  supabase: SupabaseClient,
  userId: string,
  credits: number,
  paymentId: string,
  description: string
): Promise<{ alreadyProcessed: boolean }> {
  const { error: txError } = await supabase.from("credit_transactions").insert({
    user_id: userId,
    type: "charge",
    amount: credits,
    description,
    payment_id: paymentId,
  });

  if (txError) {
    if (txError.code === "23505") return { alreadyProcessed: true };
    throw txError;
  }

  const balance = await getCreditBalance(supabase, userId);
  const { error: balanceError } = await supabase
    .from("user_credits")
    .upsert(
      {
        user_id: userId,
        balance: balance + credits,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
  if (balanceError) throw balanceError;

  return { alreadyProcessed: false };
}
