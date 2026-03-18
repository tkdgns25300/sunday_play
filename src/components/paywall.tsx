import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FREE_MONTHLY_VIEW_LIMIT } from "@/constants/subscription";

type PaywallProps = {
  type: "login" | "subscribe";
  viewCount?: number;
};

export default function Paywall({ type, viewCount }: PaywallProps) {
  if (type === "login") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-muted/30 px-6 py-12 text-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h3 className="text-lg font-bold">더 자세한 내용이 궁금하신가요?</h3>
        <p className="text-sm text-muted-foreground">
          로그인하시면 준비물, 진행 방법 등
          <br />
          상세 가이드를 확인할 수 있어요.
        </p>
        <Link href="/login">
          <Button>로그인하기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 px-6 py-12 text-center">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M12 2 L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26Z" />
      </svg>
      <h3 className="text-lg font-bold">이번 달 무료 열람을 모두 사용했어요</h3>
      <p className="text-sm text-muted-foreground">
        {FREE_MONTHLY_VIEW_LIMIT}개 중 {viewCount}개를 열람했습니다.
        <br />
        구독하면 모든 게임 가이드를 무제한으로 이용할 수 있어요.
      </p>
      <Link href="/pricing">
        <Button>구독하기</Button>
      </Link>
    </div>
  );
}
