import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Sunday Play. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              이용약관
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/refund"
              className="transition-colors hover:text-foreground"
            >
              환불정책
            </Link>
          </nav>
        </div>

        <div className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground/70">
          <p>
            훈테크 | 대표 이상훈 | 사업자등록번호 165-41-01202
          </p>
          <p>
            경상북도 안동시 감나무5길 15 | 이메일 tkdgns25300@naver.com
          </p>
        </div>
      </div>
    </footer>
  );
}
