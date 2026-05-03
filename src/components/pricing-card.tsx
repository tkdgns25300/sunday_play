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
  const [chargedCredits, setChargedCredits] = useState<number | null>(null);

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
          redirectUrl: `${window.location.origin}/payment/complete?credits=${pkg.credits}`,
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
        const newBalance = creditBalance + pkg.credits;
        setCreditBalance(newBalance);
        setChargedCredits(pkg.credits);
        window.dispatchEvent(new CustomEvent("credit-change", { detail: newBalance }));
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
    <div className="flex flex-col gap-8">
      {userId && (
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-muted-foreground">현재 보유 크레딧</p>
          <p className="text-4xl font-bold text-primary">
            {creditBalance.toLocaleString()}
          </p>
        </div>
      )}

      <div className={`grid grid-cols-2 gap-4 ${CREDIT_PACKAGES.length <= 4 ? "lg:grid-cols-4" : "lg:grid-cols-5"}`}>
        {CREDIT_PACKAGES.map((pkg, index) => {
          const isRecommended = index === 2;
          return (
            <div
              key={pkg.amount}
              className={`relative flex flex-col rounded-2xl p-6 transition-shadow hover:shadow-lg ${
                isRecommended
                  ? "border-2 border-primary bg-primary/[0.03] shadow-md"
                  : "border border-border bg-background"
              }`}
            >
              {isRecommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold text-white">
                  추천
                </span>
              )}

              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-bold">{pkg.label}</h3>
                {pkg.bonus > 0 && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-bold text-green-600 dark:bg-green-900/50 dark:text-green-400">
                    +{pkg.bonus}%
                  </span>
                )}
              </div>

              <div className="mt-3">
                <p className="text-3xl font-extrabold text-primary">
                  {pkg.credits.toLocaleString()}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">크레딧</p>
              </div>

              {pkg.bonus > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  기본 {pkg.amount.toLocaleString()} + 보너스{" "}
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {(pkg.credits - pkg.amount).toLocaleString()}
                  </span>
                </p>
              )}

              <div className="mt-auto pt-5">
                {isLoading ? (
                  <Button className="w-full" disabled>
                    확인 중...
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${isRecommended ? "" : "variant-outline"}`}
                    variant={isRecommended ? "default" : "outline"}
                    onClick={() => handleCharge(index)}
                    disabled={processingIndex !== null}
                  >
                    {processingIndex === index ? "처리 중..." : "충전하기"}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 text-center">
        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            게임별 개별 구매
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            무제한 재다운로드
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            유효기간 5년
          </div>
        </div>
      </div>

      {chargedCredits !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setChargedCredits(null)}
        >
          <div
            className="w-full max-w-sm animate-in fade-in zoom-in-95 rounded-2xl border border-border bg-background p-6 shadow-2xl duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">충전 완료!</h3>
              <p className="text-3xl font-extrabold text-primary">
                +{chargedCredits.toLocaleString()} 크레딧
              </p>
              <p className="text-sm text-muted-foreground">
                보유 크레딧: {creditBalance.toLocaleString()}
              </p>
              <Button
                className="mt-2 w-full"
                onClick={() => { setChargedCredits(null); router.push("/games"); }}
              >
                게임 둘러보기
              </Button>
              <button
                onClick={() => setChargedCredits(null)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                계속 충전하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
