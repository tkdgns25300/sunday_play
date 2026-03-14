"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PaymentComplete() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "fail">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function verify() {
      const paymentId = searchParams.get("paymentId");
      const code = searchParams.get("code");

      if (code) {
        setStatus("fail");
        setMessage(searchParams.get("message") ?? "결제가 취소되었습니다.");
        return;
      }

      if (!paymentId) {
        setStatus("fail");
        setMessage("결제 정보를 찾을 수 없습니다.");
        return;
      }

      try {
        const response = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId }),
        });

        const result = await response.json();

        if (result.success) {
          setStatus("success");
        } else {
          setStatus("fail");
          setMessage(result.message ?? "결제 검증에 실패했습니다.");
        }
      } catch {
        setStatus("fail");
        setMessage("결제 검증 중 오류가 발생했습니다.");
      }
    }

    verify();
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="text-center">
        <p className="text-lg font-medium">결제 확인 중...</p>
        <p className="mt-2 text-sm text-muted-foreground">잠시만 기다려주세요.</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">구독이 완료되었습니다!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          이제 모든 게임 가이드를 무제한으로 이용할 수 있습니다.
        </p>
        <Button className="mt-6" onClick={() => router.push("/")}>
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <h2 className="text-xl font-bold">결제 실패</h2>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      <Button className="mt-6" onClick={() => router.push("/pricing")}>
        다시 시도하기
      </Button>
    </div>
  );
}
