export default function RefundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">환불 정책</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        시행일: 2026년 3월 16일
      </p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
        <Section title="제1조 (적용 범위)">
          <p>
            이 환불 정책은 Sunday Play 프리미엄 구독 서비스(이하
            &quot;구독&quot;)의 결제 및 환불에 적용됩니다.
          </p>
        </Section>

        <Section title="제2조 (구독 서비스 안내)">
          <ul className="flex flex-col gap-2 pl-5">
            <li className="list-disc">구독 금액: 월 5,000원</li>
            <li className="list-disc">구독 기간: 결제일로부터 1개월</li>
            <li className="list-disc">
              자동 갱신 없음: 구독 기간 만료 후 자동으로 결제되지 않으며,
              이용자가 직접 재결제해야 합니다.
            </li>
          </ul>
        </Section>

        <Section title="제3조 (환불 조건)">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left font-medium text-foreground">구분</th>
                  <th className="px-3 py-2 text-left font-medium text-foreground">환불 가능 여부</th>
                  <th className="px-3 py-2 text-left font-medium text-foreground">환불 금액</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="px-3 py-2">결제 후 7일 이내, 프리미엄 콘텐츠 미이용</td>
                  <td className="px-3 py-2 text-foreground">환불 가능</td>
                  <td className="px-3 py-2">전액 환불</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="px-3 py-2">결제 후 7일 이내, 프리미엄 콘텐츠 이용</td>
                  <td className="px-3 py-2 text-foreground">환불 가능</td>
                  <td className="px-3 py-2">이용 일수에 따른 일할 계산 후 환불</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">결제 후 7일 경과</td>
                  <td className="px-3 py-2 text-foreground">환불 불가</td>
                  <td className="px-3 py-2">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="제4조 (환불 절차)">
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              환불을 원하시는 경우 아래 연락처로 환불 요청을 해주세요.
            </li>
            <li>
              환불 요청 확인 후 영업일 기준 3~5일 이내에 환불이 처리됩니다.
            </li>
            <li>
              환불은 결제 시 사용한 결제 수단으로 진행됩니다.
            </li>
          </ol>
        </Section>

        <Section title="제5조 (환불이 불가능한 경우)">
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>결제 후 7일이 경과한 경우</li>
            <li>이용자의 귀책 사유로 서비스 이용이 불가능한 경우</li>
            <li>서비스를 통해 제공받은 자료를 다운로드하여 보관한 경우</li>
          </ol>
        </Section>

        <Section title="제6조 (연락처)">
          <p>환불 관련 문의는 아래 연락처로 해주세요.</p>
          <ul className="mt-2 flex flex-col gap-1">
            <li>이메일: tkdgns25300@naver.com</li>
            <li>처리 시간: 평일 09:00 ~ 18:00</li>
          </ul>
        </Section>

        <div className="border-t border-border pt-4 text-xs text-muted-foreground/70">
          <p>이 환불 정책은 2026년 3월 16일부터 시행합니다.</p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}
