export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">개인정보처리방침</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        시행일: 2026년 3월 16일
      </p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
        <Section title="제1조 (개인정보의 수집 항목 및 수집 방법)">
          <p>회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left font-medium text-foreground">구분</th>
                  <th className="px-3 py-2 text-left font-medium text-foreground">수집 항목</th>
                  <th className="px-3 py-2 text-left font-medium text-foreground">수집 방법</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="px-3 py-2">회원가입</td>
                  <td className="px-3 py-2">이름, 이메일, 프로필 이미지</td>
                  <td className="px-3 py-2">Google 소셜 로그인</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="px-3 py-2">결제</td>
                  <td className="px-3 py-2">결제 수단 정보, 결제 기록</td>
                  <td className="px-3 py-2">포트원 결제 연동</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">서비스 이용</td>
                  <td className="px-3 py-2">서비스 이용 기록, 접속 로그</td>
                  <td className="px-3 py-2">자동 수집</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="제2조 (개인정보의 수집 및 이용 목적)">
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>회원 관리: 회원 식별, 가입 의사 확인, 서비스 부정 이용 방지</li>
            <li>서비스 제공: 콘텐츠 제공, 구독 관리, 결제 및 환불 처리</li>
            <li>서비스 개선: 이용 통계 분석, 서비스 품질 향상</li>
          </ol>
        </Section>

        <Section title="제3조 (개인정보의 보유 및 이용 기간)">
          <p>
            회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체
            없이 파기합니다. 단, 관련 법령에 의해 보존이 필요한 경우 해당
            기간까지 보관합니다.
          </p>
          <ul className="mt-3 flex flex-col gap-2 pl-5">
            <li className="list-disc">
              계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)
            </li>
            <li className="list-disc">
              대금 결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)
            </li>
            <li className="list-disc">
              소비자의 불만 또는 분쟁 처리에 관한 기록: 3년 (전자상거래법)
            </li>
            <li className="list-disc">
              웹사이트 방문 기록: 3개월 (통신비밀보호법)
            </li>
          </ul>
        </Section>

        <Section title="제4조 (개인정보의 제3자 제공)">
          <p>
            회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
            단, 다음의 경우는 예외로 합니다.
          </p>
          <ol className="mt-2 flex list-decimal flex-col gap-2 pl-5">
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 따르거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 요청이 있는 경우</li>
          </ol>
        </Section>

        <Section title="제5조 (개인정보 처리의 위탁)">
          <p>
            회사는 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁하고
            있습니다.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left font-medium text-foreground">수탁업체</th>
                  <th className="px-3 py-2 text-left font-medium text-foreground">위탁 업무</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="px-3 py-2">Supabase</td>
                  <td className="px-3 py-2">회원 인증 및 데이터 저장</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="px-3 py-2">포트원(PortOne)</td>
                  <td className="px-3 py-2">결제 처리</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Vercel</td>
                  <td className="px-3 py-2">서비스 호스팅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="제6조 (개인정보의 파기)">
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              회사는 개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우
              지체 없이 해당 개인정보를 파기합니다.
            </li>
            <li>
              전자적 파일 형태의 정보는 복구할 수 없는 방법으로 삭제하며, 종이
              문서는 분쇄하거나 소각합니다.
            </li>
          </ol>
        </Section>

        <Section title="제7조 (이용자의 권리와 행사 방법)">
          <p>
            이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제, 처리
            정지를 요청할 수 있으며, 회원 탈퇴를 통해 개인정보 삭제를 요청할 수
            있습니다.
          </p>
          <p className="mt-2">
            관련 문의는 아래 개인정보 보호책임자에게 연락해주시기 바랍니다.
          </p>
        </Section>

        <Section title="제8조 (개인정보 보호책임자)">
          <ul className="flex flex-col gap-1">
            <li>성명: 이상훈</li>
            <li>직위: 대표</li>
            <li>이메일: tkdgns25300@naver.com</li>
          </ul>
        </Section>

        <Section title="제9조 (개인정보 처리방침의 변경)">
          <p>
            이 개인정보처리방침은 법령, 정책 또는 보안 기술의 변경에 따라 내용이
            변경될 수 있으며, 변경 시 서비스 내 공지사항을 통해 안내합니다.
          </p>
        </Section>

        <div className="border-t border-border pt-4 text-xs text-muted-foreground/70">
          <p>이 개인정보처리방침은 2026년 3월 16일부터 시행합니다.</p>
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
