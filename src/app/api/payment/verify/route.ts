import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPortOnePayment } from "@/lib/portone";
import { SUBSCRIPTION_PRICE } from "@/constants/subscription";

export async function POST(request: NextRequest) {
  try {
    const { paymentId } = await request.json();

    if (!paymentId) {
      return NextResponse.json(
        { success: false, message: "paymentId가 필요합니다" },
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

    if (payment.amount.total !== SUBSCRIPTION_PRICE) {
      return NextResponse.json(
        { success: false, message: "결제 금액이 일치하지 않습니다" },
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

    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setMonth(periodEnd.getMonth() + 1);

    const { error } = await supabase
      .from("subscriptions")
      .upsert(
        {
          user_id: user.id,
          status: "active",
          current_period_start: now.toISOString(),
          current_period_end: periodEnd.toISOString(),
          payment_customer_id: payment.customer?.customerId ?? null,
          payment_id: paymentId,
          updated_at: now.toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (error) {
      return NextResponse.json(
        { success: false, message: "구독 정보 저장 실패" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "결제 검증 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
