import Link from "next/link";
import PricingCard from "@/components/pricing-card";

const FAQS = [
  {
    question: "Sunday Play는 어떤 서비스인가요?",
    answer:
      "교회 레크레이션 게임을 대상·인원·장소별로 검색하고, 상세 진행 가이드와 함께 바로 활용할 수 있는 큐레이션 플랫폼입니다.",
  },
  {
    question: "크레딧은 어떻게 사용하나요?",
    answer:
      "크레딧을 충전한 후, 원하는 게임의 진행 자료를 개별 구매할 수 있습니다. 게임마다 가격이 다르며, 구매한 게임은 언제든 재다운로드 가능합니다.",
  },
  {
    question: "게임 가이드는 무료로 볼 수 있나요?",
    answer:
      "네, 로그인만 하면 모든 게임의 규칙, 진행 방법, 응용 아이디어, 말씀 연결 등을 무제한 무료로 볼 수 있습니다. 크레딧은 진행 자료 다운로드에만 사용됩니다.",
  },
  {
    question: "진행 자료는 어떤 형태인가요?",
    answer:
      "게임 규칙 설명용 슬라이드이며, 편집 가능한 파일과 발표용 파일을 함께 제공합니다. 다운로드 후 바로 화면에 띄워 사용할 수 있습니다.",
  },
  {
    question: "충전한 크레딧은 환불되나요?",
    answer:
      "미사용 크레딧은 환불 가능합니다. 자세한 내용은 환불 정책을 확인해주세요.",
  },
  {
    question: "문의는 어디로 하면 되나요?",
    answer:
      "tkdgns25300@naver.com으로 이메일을 보내주시면 빠르게 답변드리겠습니다.",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <section className="mx-auto max-w-6xl px-4 py-12 lg:py-20">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">크레딧 충전</h1>
          <p className="text-muted-foreground">
            크레딧으로 원하는 게임의 진행 자료를 구매하세요.
          </p>
        </div>
        <div className="mt-10">
          <PricingCard />
        </div>
      </section>

      <section className="bg-muted/20">
        <div className="mx-auto max-w-2xl px-4 py-12 lg:py-20">
          <h2 className="mb-8 text-center text-2xl font-bold">자주 묻는 질문</h2>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-border bg-background p-5"
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            더 궁금한 점이 있으시면{" "}
            <Link
              href="/refund"
              className="text-primary underline transition-colors hover:text-primary/80"
            >
              환불 정책
            </Link>
            을 확인하거나 tkdgns25300@naver.com으로 문의해주세요.
          </p>
        </div>
      </section>
    </div>
  );
}
