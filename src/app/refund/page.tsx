export default function RefundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">환불 정책</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        시행일: 2026년 4월 27일
      </p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
        <Section title="제1조 (적용 범위)">
          <p>
            이 환불 정책은 Sunday Play의 크레딧 충전 및 게임 진행 자료 구매(이하
            &quot;유료 서비스&quot;)의 결제 및 환불에 적용됩니다.
          </p>
        </Section>

        <Section title="제2조 (크레딧 서비스 안내)">
          <ul className="flex flex-col gap-2 pl-5">
            <li className="list-disc">크레딧 충전 단위: ₩3,000 / ₩5,000 / ₩10,000 / ₩50,000</li>
            <li className="list-disc">충전 금액에 따라 보너스 크레딧이 제공될 수 있습니다.</li>
            <li className="list-disc">
              크레딧으로 게임별 진행 자료를 개별 구매할 수 있습니다.
            </li>
            <li className="list-disc">
              구매한 게임의 자료는 계정이 유효한 동안 횟수 제한 없이 재다운로드 가능합니다.
            </li>
            <li className="list-disc">
              크레딧의 유효기간은 충전일로부터 3개월이며, 서비스 정책에 따라 연장될 수 있습니다.
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
                  <td className="px-3 py-2">충전 후 7일 이내, 크레딧 미사용</td>
                  <td className="px-3 py-2 text-foreground">환불 가능</td>
                  <td className="px-3 py-2">전액 환불</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="px-3 py-2">충전 후 7일 이내, 크레딧 일부 사용</td>
                  <td className="px-3 py-2 text-foreground">환불 가능</td>
                  <td className="px-3 py-2">충전 금액 × (미사용 기본 크레딧 ÷ 충전 기본 크레딧). 보너스 크레딧은 환불 대상이 아닙니다.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="px-3 py-2">충전 후 7일 경과, 미사용 크레딧 잔여</td>
                  <td className="px-3 py-2 text-foreground">환불 가능</td>
                  <td className="px-3 py-2">미사용 기본 크레딧에 해당하는 금액의 90% (수수료 10% 공제)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">크레딧 전부 사용</td>
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

        <Section title="제5조 (게임 구매 환불)">
          <p>
            크레딧으로 구매한 게임의 진행 자료는 디지털 콘텐츠 특성상 구매 후 환불이 불가합니다.
            구매 전 미리보기를 통해 자료의 내용과 구성을 확인하신 후 구매해주세요.
          </p>
        </Section>

        <Section title="제6조 (환불이 불가능한 경우)">
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>크레딧으로 구매한 게임의 진행 자료 (미리보기 제공으로 사전 확인 가능)</li>
            <li>충전한 크레딧을 전부 사용한 경우</li>
            <li>이용자의 귀책 사유로 서비스 이용이 불가능한 경우</li>
            <li>부정한 방법으로 크레딧을 취득한 경우</li>
          </ol>
        </Section>

        <Section title="제7조 (연락처)">
          <p>환불 관련 문의는 아래 연락처로 해주세요.</p>
          <ul className="mt-2 flex flex-col gap-1">
            <li>이메일: tkdgns25300@naver.com</li>
            <li>처리 시간: 평일 09:00 ~ 18:00</li>
          </ul>
        </Section>

        <div className="border-t border-border pt-4 text-xs text-muted-foreground/70">
          <p>이 환불 정책은 2026년 4월 27일부터 시행합니다.</p>
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
