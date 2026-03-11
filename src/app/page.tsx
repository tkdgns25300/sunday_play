import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-20 text-center md:py-32">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          이번 주 레크레이션,
          <br />
          <span className="text-primary">고민 끝.</span>
        </h1>
        <p className="max-w-lg text-lg text-muted-foreground">
          대상별·상황별로 딱 맞는 게임을 찾고,
          <br />
          상세 진행 가이드로 바로 사역에 활용하세요.
        </p>
        <div className="flex gap-3">
          <Link href="/games">
            <Button size="lg">게임 둘러보기</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              요금제 보기
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
          <div className="flex flex-col gap-3 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">쉽고 빠른 검색</h3>
            <p className="text-sm text-muted-foreground">
              대상, 공간, 인원, 활동성 등 다양한 필터로 원하는 게임을 바로 찾으세요.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M12 20h9" />
                <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">상세 진행 가이드</h3>
            <p className="text-sm text-muted-foreground">
              단계별 진행 방법, 준비물, 변형 팁까지. 처음 해보는 게임도 자신 있게.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">말씀 연결</h3>
            <p className="text-sm text-muted-foreground">
              게임과 연관된 성경 구절과 메시지로 레크레이션을 사역으로 연결하세요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
