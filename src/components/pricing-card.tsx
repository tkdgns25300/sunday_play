"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as PortOne from "@portone/browser-sdk/v2";
import { createClient } from "@/lib/supabase/client";
import { getSubscriptionStatus } from "@/lib/subscription";
import { Button } from "@/components/ui/button";
import {
  SUBSCRIPTION_PRICE,
  SUBSCRIPTION_PRICE_LABEL,
  SUBSCRIPTION_NAME,
} from "@/constants/subscription";
import { FREE_FEATURES, PREMIUM_FEATURES } from "@/constants/pricing";

export default function PricingCard() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        const subscribed = await getSubscriptionStatus(supabase, user.id);
        setIsSubscribed(subscribed);
      }
      setIsLoading(false);
    }
    checkStatus();
  }, []);

  async function handleSubscribe() {
    if (!userId) {
      router.push("/login");
      return;
    }

    setIsProcessing(true);

    try {
      const paymentId = `pay-${userId.slice(0, 8)}-${Date.now()}`;

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      const response = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        paymentId,
        orderName: SUBSCRIPTION_NAME,
        totalAmount: SUBSCRIPTION_PRICE,
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
        setIsProcessing(false);
        return;
      }

      const verifyResponse = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId }),
      });

      const result = await verifyResponse.json();

      if (result.success) {
        setIsSubscribed(true);
        router.refresh();
      } else {
        alert(`결제 검증 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("결제 오류:", error);
      alert(`결제 중 오류가 발생했습니다.\n${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col rounded-xl border border-border p-6 lg:p-10">
        <h3 className="text-lg font-bold">무료</h3>
        <p className="mt-1 text-3xl font-bold">₩0</p>
        <p className="mt-1 text-sm text-muted-foreground">영원히 무료</p>
        <ul className="mt-6 flex flex-col gap-2">
          {FREE_FEATURES.map((feature) => (
            <FeatureItem key={feature} text={feature} />
          ))}
        </ul>
        <div className="mt-auto pt-6">
          {isSubscribed ? (
            <Button variant="outline" className="w-full" disabled>
              무료 플랜
            </Button>
          ) : (
            <Button variant="outline" className="w-full" disabled>
              현재 이용 중
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col rounded-xl border-2 border-primary p-6 lg:p-10">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">프리미엄</h3>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            추천
          </span>
        </div>
        <p className="mt-1 text-3xl font-bold">
          {SUBSCRIPTION_PRICE_LABEL}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">모든 기능 무제한</p>
        <ul className="mt-6 flex flex-col gap-2">
          {PREMIUM_FEATURES.map((feature) => (
            <FeatureItem key={feature} text={feature} highlighted />
          ))}
        </ul>
        <div className="mt-auto pt-6">
          {isLoading ? (
            <Button className="w-full" disabled>
              확인 중...
            </Button>
          ) : isSubscribed ? (
            <Button className="w-full" disabled>
              구독 중
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={handleSubscribe}
              disabled={isProcessing}
            >
              {isProcessing ? "처리 중..." : "구독하기"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text, highlighted }: { text: string; highlighted?: boolean }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={highlighted ? "text-primary" : "text-muted-foreground"}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span className={highlighted ? "text-foreground" : "text-muted-foreground"}>
        {text}
      </span>
    </li>
  );
}
