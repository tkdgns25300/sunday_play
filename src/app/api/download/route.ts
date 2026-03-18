import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getSubscriptionStatus,
  getMonthlyDownloadedGames,
  logDownload,
} from "@/lib/subscription";
import { MONTHLY_DOWNLOAD_LIMIT } from "@/constants/subscription";

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

    const isSubscribed = await getSubscriptionStatus(supabase, user.id);

    if (!isSubscribed) {
      return NextResponse.json(
        { success: false, message: "프리미엄 구독이 필요합니다." },
        { status: 403 }
      );
    }

    const downloadedGames = await getMonthlyDownloadedGames(supabase, user.id);
    const isAlreadyDownloaded = downloadedGames.includes(gameId);

    if (!isAlreadyDownloaded && downloadedGames.length >= MONTHLY_DOWNLOAD_LIMIT) {
      return NextResponse.json(
        {
          success: false,
          message: `이번 달 다운로드 한도(${MONTHLY_DOWNLOAD_LIMIT}개 게임)를 초과했습니다.`,
        },
        { status: 429 }
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
