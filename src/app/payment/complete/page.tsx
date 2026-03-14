import { Suspense } from "react";
import PaymentComplete from "@/components/payment-complete";

export default function PaymentCompletePage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Suspense
        fallback={
          <div className="text-center">
            <p className="text-lg font-medium">결제 확인 중...</p>
            <p className="mt-2 text-sm text-muted-foreground">잠시만 기다려주세요.</p>
          </div>
        }
      >
        <PaymentComplete />
      </Suspense>
    </div>
  );
}
