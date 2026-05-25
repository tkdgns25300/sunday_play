import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { WELCOME_CREDITS } from "@/constants/credit";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      let isNewUser = false;
      if (user) {
        const { data: existing } = await supabase
          .from("user_credits")
          .select("user_id")
          .eq("user_id", user.id)
          .single();

        if (!existing) {
          isNewUser = true;
          await supabase.from("user_credits").insert({
            user_id: user.id,
            balance: WELCOME_CREDITS,
          });
          await supabase.from("credit_transactions").insert({
            user_id: user.id,
            type: "charge",
            amount: WELCOME_CREDITS,
            description: "가입 축하 크레딧",
          });
        }
      }
      const redirectUrl = new URL(`${origin}${next}`);
      if (isNewUser) redirectUrl.searchParams.set("welcome", "1");
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.redirect(`${origin}/?error=auth`);
}
