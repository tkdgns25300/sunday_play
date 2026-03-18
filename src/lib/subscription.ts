import { SupabaseClient } from "@supabase/supabase-js";

export async function getSubscriptionStatus(
  supabase: SupabaseClient,
  userId: string
): Promise<boolean> {
  const { data } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  return !!data;
}

export async function getMonthlyViewCount(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { count } = await supabase
    .from("free_view_logs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("viewed_at", firstDayOfMonth);

  return count ?? 0;
}

export async function hasViewedGame(
  supabase: SupabaseClient,
  userId: string,
  gameId: string
): Promise<boolean> {
  const { data } = await supabase
    .from("free_view_logs")
    .select("id")
    .eq("user_id", userId)
    .eq("game_id", gameId)
    .single();

  return !!data;
}

export async function logGameView(
  supabase: SupabaseClient,
  userId: string,
  gameId: string
): Promise<void> {
  await supabase
    .from("free_view_logs")
    .upsert(
      { user_id: userId, game_id: gameId },
      { onConflict: "user_id,game_id" }
    );
}

export async function getMonthlyDownloadedGames(
  supabase: SupabaseClient,
  userId: string
): Promise<string[]> {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { data } = await supabase
    .from("download_logs")
    .select("game_id")
    .eq("user_id", userId)
    .gte("downloaded_at", firstDayOfMonth);

  const uniqueGameIds = [...new Set((data ?? []).map((d) => d.game_id))];
  return uniqueGameIds;
}

export async function logDownload(
  supabase: SupabaseClient,
  userId: string,
  gameId: string,
  fileName: string
): Promise<void> {
  await supabase
    .from("download_logs")
    .insert({ user_id: userId, game_id: gameId, file_name: fileName });
}
