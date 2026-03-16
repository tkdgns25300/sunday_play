import Link from "next/link";
import { Button } from "@/components/ui/button";
import { games } from "@/data/games";
import GameCard from "@/components/game-card";
import {
  FREE_MONTHLY_VIEW_LIMIT,
  SUBSCRIPTION_PRICE_LABEL,
} from "@/constants/subscription";

const PREVIEW_GAMES = games.slice(0, 3);

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    title: "쉽고 빠른 검색",
    description: "대상, 인원, 장소 등 다양한 필터로 상황에 맞는 게임을 바로 찾으세요.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
        <path d="M12 20h9" />
        <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
      </svg>
    ),
    title: "상세 진행 가이드",
    description: "단계별 진행 방법, 준비물, 변형 팁까지. 처음 해보는 게임도 자신 있게.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      </svg>
    ),
    title: "말씀 연결",
    description: "게임과 연관된 성경 구절과 메시지로 레크레이션을 사역으로 연결하세요.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "49가지 품성 교육",
    description: "게임마다 연결된 품성 덕목으로 놀이와 교육을 자연스럽게 연결하세요.",
  },
];

const TARGET_USERS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m15 11 2 2 4-4" />
      </svg>
    ),
    title: "주일학교 교사",
    description: "매주 레크레이션 준비에\n시간을 쏟고 계신 선생님",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "청년부 리더",
    description: "모임마다 새로운\n아이스브레이킹이 필요한 리더",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
        <path d="M8 11h8" />
        <path d="M8 7h6" />
      </svg>
    ),
    title: "교회 교육부",
    description: "체계적인 레크레이션 자료가\n필요한 교육부서",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
    title: "수련회 담당자",
    description: "수련회, 캠프 프로그램을\n기획하는 담당자",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 lg:py-20 text-center md:py-32">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            이번 주 레크레이션,
          </h1>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
            고민 끝.
          </h1>
          <p className="mt-2 max-w-lg text-lg leading-relaxed text-muted-foreground">
            50+개 이상의 게임 중 딱 맞는 게임을 찾고,
            <br />
            진행 스크립트·PPT·활동지까지 한 번에 준비하세요.
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
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-12 lg:grid-cols-4 lg:gap-6 lg:py-20">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-2 lg:gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 lg:size-12">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold lg:text-base">{feature.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground lg:text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">인기 게임</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                선생님들이 가장 많이 찾는 게임을 만나보세요.
              </p>
            </div>
            <Link
              href="/games"
              className="hidden text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:block"
            >
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PREVIEW_GAMES.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/games">
              <Button variant="outline">전체 게임 보기</Button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">이런 분들에게 추천해요</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              매주 반복되는 레크레이션 준비, Sunday Play가 도와드립니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {TARGET_USERS.map((user) => (
              <div
                key={user.title}
                className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-center lg:gap-4 lg:p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-muted lg:size-14">
                  {user.icon}
                </div>
                <h3 className="text-sm font-semibold lg:text-base">{user.title}</h3>
                <p className="whitespace-pre-line text-xs leading-relaxed text-muted-foreground lg:text-sm">
                  {user.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">요금제</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              무료로 시작하고, 필요할 때 업그레이드하세요.
            </p>
          </div>
          <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
            <div className="flex flex-col rounded-xl border border-border bg-background p-6">
              <h3 className="text-lg font-bold">무료</h3>
              <p className="mt-1 text-3xl font-bold">₩0</p>
              <ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
                <PricingItem>전체 게임 목록 탐색</PricingItem>
                <PricingItem>필터로 게임 검색</PricingItem>
                <PricingItem>상세 가이드 월 {FREE_MONTHLY_VIEW_LIMIT}개</PricingItem>
                <PricingItem>말씀 연결 열람</PricingItem>
              </ul>
              <div className="mt-auto pt-6">
                <Link href="/games">
                  <Button variant="outline" className="w-full">
                    시작하기
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col rounded-xl border-2 border-primary bg-background p-6">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">프리미엄</h3>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  추천
                </span>
              </div>
              <p className="mt-1 text-3xl font-bold">
                {SUBSCRIPTION_PRICE_LABEL}
              </p>
              <ul className="mt-6 flex flex-col gap-2 text-sm">
                <PricingItem highlighted>모든 상세 가이드 무제한</PricingItem>
                <PricingItem highlighted>진행 스크립트 (한/영)</PricingItem>
                <PricingItem highlighted>PPT/PDF 자료 다운로드</PricingItem>
                <PricingItem highlighted>모든 무료 기능 포함</PricingItem>
              </ul>
              <div className="mt-auto pt-6">
                <Link href="/pricing">
                  <Button className="w-full">구독하기</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PricingItem({
  children,
  highlighted,
}: {
  children: React.ReactNode;
  highlighted?: boolean;
}) {
  return (
    <li className="flex items-center gap-2">
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
        {children}
      </span>
    </li>
  );
}
