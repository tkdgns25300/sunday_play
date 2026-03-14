import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getPortOnePayment } from "@/lib/portone";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (type !== "Transaction.Paid" && type !== "Transaction.Cancelled") {
      return NextResponse.json({ success: true });
    }

    const paymentId = data?.paymentId;
    if (!paymentId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const payment = await getPortOnePayment(paymentId);
    const customerId = payment.customer?.customerId;

    if (!customerId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (type === "Transaction.Paid") {
      const now = new Date();
      const periodEnd = new Date(now);
      periodEnd.setMonth(periodEnd.getMonth() + 1);

      await supabaseAdmin
        .from("subscriptions")
        .upsert(
          {
            user_id: customerId,
            status: "active",
            current_period_start: now.toISOString(),
            current_period_end: periodEnd.toISOString(),
            stripe_subscription_id: paymentId,
            updated_at: now.toISOString(),
          },
          { onConflict: "user_id" }
        );
    }

    if (type === "Transaction.Cancelled") {
      await supabaseAdmin
        .from("subscriptions")
        .update({
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", paymentId);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
