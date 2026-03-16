import Link from "next/link";
import PricingCard from "@/components/pricing-card";

const FAQS = [
  {
    question: "Sunday Play는 어떤 서비스인가요?",
    answer:
      "교회 레크레이션 게임을 대상·인원·장소별로 검색하고, 상세 진행 가이드와 함께 바로 활용할 수 있는 큐레이션 플랫폼입니다.",
  },
  {
    question: "무료로도 게임을 이용할 수 있나요?",
    answer:
      "네, 무료 플랜으로도 모든 게임 목록을 검색하고 월 3개의 상세 가이드를 열람할 수 있습니다.",
  },
  {
    question: "프리미엄에서 제공하는 스크립트는 어떤 건가요?",
    answer:
      "게임 진행 시 그대로 읽으면 되는 한국어/영어 대본입니다. 처음 진행하는 게임도 자연스럽게 이끌 수 있습니다.",
  },
  {
    question: "PPT 자료는 어떤 형태인가요?",
    answer:
      "게임 규칙 설명용 프레젠테이션 슬라이드입니다. 다운로드 후 바로 화면에 띄워 사용할 수 있습니다.",
  },
  {
    question: "게임 데이터는 계속 추가되나요?",
    answer:
      "네, 새로운 게임과 자료가 지속적으로 업데이트됩니다.",
  },
  {
    question: "여러 교회에서 하나의 계정으로 사용할 수 있나요?",
    answer:
      "하나의 계정은 한 명의 사용자를 위한 것이며, 여러 교회에서 공유하는 것은 권장하지 않습니다.",
  },
  {
    question: "오프라인에서도 자료를 사용할 수 있나요?",
    answer:
      "프리미엄 구독자가 다운로드한 PPT/PDF 자료는 오프라인에서도 자유롭게 사용할 수 있습니다.",
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
          <h1 className="text-3xl font-bold">요금제</h1>
          <p className="text-muted-foreground">
            더 많은 게임 가이드와 프리미엄 자료를 이용하세요.
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
