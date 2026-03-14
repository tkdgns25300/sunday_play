import PricingCard from "@/components/pricing-card";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">요금제</h1>
        <p className="text-muted-foreground">
          더 많은 게임 가이드와 프리미엄 자료를 이용하세요.
        </p>
      </div>
      <div className="mt-10">
        <PricingCard />
      </div>
    </div>
  );
}
