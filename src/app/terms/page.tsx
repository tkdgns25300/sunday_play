export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">이용약관</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        시행일: 2026년 3월 16일
      </p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
        <Section title="제1조 (목적)">
          <p>
            이 약관은 훈테크(이하 &quot;회사&quot;)가 운영하는 Sunday Play
            서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자 간의
            권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
          </p>
        </Section>

        <Section title="제2조 (정의)">
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              &quot;서비스&quot;란 회사가 제공하는 교회 레크레이션/게임 큐레이션
              플랫폼을 의미합니다.
            </li>
            <li>
              &quot;이용자&quot;란 이 약관에 따라 서비스를 이용하는 자를
              의미합니다.
            </li>
            <li>
              &quot;구독&quot;이란 이용자가 월정액을 결제하고 프리미엄 콘텐츠에
              접근할 수 있는 유료 서비스를 의미합니다.
            </li>
          </ol>
        </Section>

        <Section title="제3조 (약관의 효력 및 변경)">
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              이 약관은 서비스 화면에 게시하거나 기타 방법으로 이용자에게
              공지함으로써 효력이 발생합니다.
            </li>
            <li>
              회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며,
              변경 시 적용일자 및 변경사유를 명시하여 최소 7일 전에 공지합니다.
            </li>
          </ol>
        </Section>

        <Section title="제4조 (서비스의 제공)">
          <p>회사는 다음과 같은 서비스를 제공합니다.</p>
          <ol className="mt-2 flex list-decimal flex-col gap-2 pl-5">
            <li>교회 레크레이션 게임 검색 및 필터링</li>
            <li>게임별 상세 진행 가이드 제공</li>
            <li>프리미엄 구독 서비스 (진행 스크립트, 자료 다운로드 등)</li>
          </ol>
        </Section>

        <Section title="제5조 (회원가입 및 계정)">
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              이용자는 Google 소셜 로그인을 통해 회원가입을 할 수 있습니다.
            </li>
            <li>
              이용자는 자신의 계정 정보를 정확하게 유지해야 하며, 관리 소홀로
              인한 문제에 대해 회사는 책임을 지지 않습니다.
            </li>
          </ol>
        </Section>

        <Section title="제6조 (유료 서비스 및 결제)">
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              프리미엄 구독은 월 단위로 결제되며, 결제일로부터 1개월간
              유효합니다.
            </li>
            <li>
              결제는 포트원(PortOne)을 통해 처리되며, 결제 수단은 신용카드 등
              회사가 지정한 수단으로 제한됩니다.
            </li>
            <li>
              구독은 자동 갱신되지 않으며, 이용자가 직접 재결제해야 합니다.
            </li>
          </ol>
        </Section>

        <Section title="제7조 (이용자의 의무)">
          <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
          <ol className="mt-2 flex list-decimal flex-col gap-2 pl-5">
            <li>타인의 정보를 도용하는 행위</li>
            <li>서비스의 운영을 방해하는 행위</li>
            <li>서비스에서 제공하는 콘텐츠를 무단으로 복제, 배포하는 행위</li>
            <li>기타 관련 법령에 위반되는 행위</li>
          </ol>
        </Section>

        <Section title="제8조 (서비스의 중단)">
          <p>
            회사는 천재지변, 시스템 장애 등 불가피한 사유가 발생한 경우 서비스의
            전부 또는 일부를 제한하거나 중단할 수 있습니다. 이 경우 사전에
            이용자에게 공지합니다.
          </p>
        </Section>

        <Section title="제9조 (저작권 및 자료 이용)">
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              서비스에서 제공하는 모든 콘텐츠(PPT, PDF, 스크립트, 활동지 등)의
              저작권은 회사에 있습니다.
            </li>
            <li>
              구독자는 다운로드한 자료를 본인이 속한 교회 및 단체 내에서 비상업적
              목적으로 자유롭게 사용할 수 있습니다.
            </li>
            <li>
              자료의 무단 복제, 재배포, 판매, 공유 플랫폼 업로드 등은 엄격히
              금지됩니다.
            </li>
            <li>
              구독 해지 후에도 이미 다운로드한 자료는 개인 사용 목적으로 보관할 수
              있으나, 재배포는 허용되지 않습니다.
            </li>
          </ol>
        </Section>

        <Section title="제10조 (면책 조항)">
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              회사는 이용자가 서비스를 통해 얻은 정보를 활용하여 발생한 결과에
              대해 책임을 지지 않습니다.
            </li>
            <li>
              회사는 이용자 간 또는 이용자와 제3자 간에 서비스를 매개로 발생한
              분쟁에 대해 개입할 의무가 없으며 이에 대한 책임을 지지 않습니다.
            </li>
          </ol>
        </Section>

        <Section title="제11조 (준거법 및 관할법원)">
          <p>
            이 약관의 해석 및 분쟁 해결은 대한민국 법률에 따르며, 서비스 이용과
            관련한 분쟁의 관할법원은 회사의 소재지를 관할하는 법원으로 합니다.
          </p>
        </Section>

        <div className="border-t border-border pt-4 text-xs text-muted-foreground/70">
          <p>부칙: 이 약관은 2026년 3월 16일부터 시행합니다.</p>
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
