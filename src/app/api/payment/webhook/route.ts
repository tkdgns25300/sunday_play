import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getPortOnePayment } from "@/lib/portone";
import { CREDIT_PACKAGES } from "@/constants/credit";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (type !== "Transaction.Paid") {
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

    const pkg = CREDIT_PACKAGES.find(
      (p) => p.amount === payment.amount.total
    );

    if (!pkg) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 결제 금액" },
        { status: 400 }
      );
    }

    const { error: txError } = await supabaseAdmin
      .from("credit_transactions")
      .insert({
        user_id: customerId,
        type: "charge",
        amount: pkg.credits,
        description: `크레딧 충전 ${pkg.label} (${pkg.credits.toLocaleString()} 크레딧)`,
        payment_id: paymentId,
      });

    if (txError) {
      if (txError.code === "23505") {
        return NextResponse.json({ success: true, alreadyProcessed: true });
      }
      throw txError;
    }

    const { data: existing } = await supabaseAdmin
      .from("user_credits")
      .select("balance")
      .eq("user_id", customerId)
      .single();

    await supabaseAdmin
      .from("user_credits")
      .upsert(
        {
          user_id: customerId,
          balance: (existing?.balance ?? 0) + pkg.credits,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
