import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasPurchasedGame } from "@/lib/credit";
import { logDownload } from "@/lib/subscription";

export async function POST(request: NextRequest) {
  try {
    const { gameId, fileName, filePath } = await request.json();

    if (!gameId || !fileName || !filePath) {
      return NextResponse.json(
        { success: false, message: "잘못된 요청입니다." },
        { status: 400 }
      );
    }

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

    const purchased = await hasPurchasedGame(supabase, user.id, gameId);

    if (!purchased) {
      return NextResponse.json(
        { success: false, message: "게임을 먼저 구매해주세요." },
        { status: 403 }
      );
    }

    await logDownload(supabase, user.id, gameId, fileName);

    return NextResponse.json({ success: true, filePath });
  } catch {
    return NextResponse.json(
      { success: false, message: "다운로드 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
