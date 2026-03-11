import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:justify-between">
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
        </nav>
      </div>
    </footer>
  );
}
