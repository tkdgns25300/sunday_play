"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as PortOne from "@portone/browser-sdk/v2";
import { createClient } from "@/lib/supabase/client";
import { getCreditBalance } from "@/lib/credit";
import { Button } from "@/components/ui/button";
import { CREDIT_PACKAGES } from "@/constants/credit";

export default function PricingCard() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [creditBalance, setCreditBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [processingIndex, setProcessingIndex] = useState<number | null>(null);

  useEffect(() => {
    async function checkStatus() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        const balance = await getCreditBalance(supabase, user.id);
        setCreditBalance(balance);
      }
      setIsLoading(false);
    }
    checkStatus();
  }, []);

  async function handleCharge(packageIndex: number) {
    if (!userId) {
      router.push("/login");
      return;
    }

    const pkg = CREDIT_PACKAGES[packageIndex];
    setProcessingIndex(packageIndex);

    try {
      const paymentId = `credit-${userId.slice(0, 8)}-${Date.now()}`;

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      const response = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        paymentId,
        orderName: `Sunday Play 크레딧 ${pkg.credits.toLocaleString()}`,
        totalAmount: pkg.amount,
        currency: "KRW",
        payMethod: "CARD",
        customer: {
          customerId: userId,
        },
        ...(isMobile && {
          redirectUrl: `${window.location.origin}/payment/complete`,
        }),
      });

      if (response?.code) {
        alert(`결제 실패: ${response.message}`);
        setProcessingIndex(null);
        return;
      }

      const verifyResponse = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId, credits: pkg.credits }),
      });

      const result = await verifyResponse.json();

      if (result.success) {
        setCreditBalance((prev) => prev + pkg.credits);
        router.refresh();
      } else {
        alert(`결제 검증 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("결제 오류:", error);
      alert(`결제 중 오류가 발생했습니다.\n${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setProcessingIndex(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {userId && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            보유 크레딧: <span className="font-bold text-foreground">{creditBalance.toLocaleString()}</span>
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CREDIT_PACKAGES.map((pkg, index) => (
          <div
            key={pkg.amount}
            className={`flex flex-col rounded-xl border p-5 ${
              index === 2
                ? "border-2 border-primary"
                : "border-border"
            }`}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">{pkg.label}</h3>
              {pkg.bonus > 0 && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  +{pkg.bonus}%
                </span>
              )}
            </div>
            <p className="mt-1 text-2xl font-bold text-primary">
              {pkg.credits.toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground"> 크레딧</span>
            </p>
            {pkg.bonus > 0 && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {(pkg.amount).toLocaleString()}원 + 보너스 {(pkg.credits - pkg.amount).toLocaleString()}
              </p>
            )}
            <div className="mt-auto pt-4">
              {isLoading ? (
                <Button className="w-full" size="sm" disabled>
                  확인 중...
                </Button>
              ) : (
                <Button
                  className="w-full"
                  size="sm"
                  variant={index === 2 ? "default" : "outline"}
                  onClick={() => handleCharge(index)}
                  disabled={processingIndex !== null}
                >
                  {processingIndex === index ? "처리 중..." : "충전하기"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-md text-center text-xs text-muted-foreground">
        <p>크레딧으로 원하는 게임의 진행 자료(PPT, PDF, PNG)를 구매할 수 있습니다.</p>
        <p className="mt-1">구매한 게임은 언제든 재다운로드 가능합니다.</p>
      </div>
    </div>
  );
}
