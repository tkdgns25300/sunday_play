import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { purchaseGame } from "@/lib/credit";
import { games } from "@/data/games";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "로그인이 필요합니다." },
      { status: 401 }
    );
  }

  const { gameId } = await request.json();

  if (!gameId) {
    return NextResponse.json(
      { success: false, message: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  const game = games.find((g) => g.id === gameId);

  if (!game) {
    return NextResponse.json(
      { success: false, message: "존재하지 않는 게임입니다." },
      { status: 400 }
    );
  }

  const result = await purchaseGame(supabase, user.id, gameId, game.creditPrice);

  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result);
}
