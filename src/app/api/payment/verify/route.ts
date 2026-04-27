import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPortOnePayment } from "@/lib/portone";
import { chargeCredits } from "@/lib/credit";
import { CREDIT_PACKAGES } from "@/constants/credit";

export async function POST(request: NextRequest) {
  try {
    const { paymentId, credits } = await request.json();

    if (!paymentId || !credits) {
      return NextResponse.json(
        { success: false, message: "paymentId와 credits가 필요합니다" },
        { status: 400 }
      );
    }

    const payment = await getPortOnePayment(paymentId);

    if (payment.status !== "PAID") {
      return NextResponse.json(
        { success: false, message: "결제가 완료되지 않았습니다" },
        { status: 400 }
      );
    }

    const validPackage = CREDIT_PACKAGES.find(
      (pkg) => pkg.credits === credits && pkg.amount === payment.amount.total
    );

    if (!validPackage) {
      return NextResponse.json(
        { success: false, message: "결제 금액과 크레딧이 일치하지 않습니다" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "인증되지 않은 사용자입니다" },
        { status: 401 }
      );
    }

    await chargeCredits(
      supabase,
      user.id,
      credits,
      paymentId,
      `크레딧 충전 ${validPackage.label} (${credits.toLocaleString()} 크레딧)`
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "결제 검증 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
