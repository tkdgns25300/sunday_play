# Sunday Play — 작업 로드맵

## Phase 0: 프로젝트 준비

### 0-1. GitHub 레포지토리 생성

- [x] GitHub 레포 생성
- [x] .gitignore 설정 (Next.js 템플릿)
- [x] 브랜치 전략 결정
  - main: 배포용 (항상 안정 상태)
  - dev: 개발 통합 브랜치
  - feature/*: 기능별 브랜치

### 0-2. 프로젝트 초기 세팅

- [x] Next.js App Router 프로젝트 생성
- [x] TypeScript + Tailwind CSS 설정
- [x] 폴더 구조 확정
  - src/app/ — 라우트 전용 (page.tsx, layout.tsx)
  - src/components/ — 재사용 UI 컴포넌트
  - src/components/ui/ — shadcn/ui 컴포넌트
  - src/constants/ — 상수 데이터
  - src/hooks/ — 커스텀 React 훅
  - src/lib/ — 유틸리티 함수, Supabase 클라이언트
  - src/data/ — 게임 콘텐츠 데이터 (TypeScript 파일)
  - src/types/ — 공유 TypeScript 타입
- [x] CLAUDE.md 작성
- [x] 기획서 작성 (docs/SPEC.md)
- [x] 데이터 설계 (docs/SCHEMA.md) — 하이브리드 아키텍처 (게임: 파일, 사용자: DB)
- [x] shadcn/ui 초기 설정
- [x] Vercel 연동 (GitHub 레포 연결 → 자동 배포 파이프라인)

### 0-3. Supabase 세팅

- [x] Supabase 프로젝트 생성 (대시보드)
- [x] 테이블 생성 (profiles, subscriptions, bookmarks, reviews, free_view_logs, download_logs)
- [x] RLS(Row Level Security) 정책 설정
- [x] Supabase 클라이언트 설정 (src/lib/supabase/)
- [x] 환경 변수 설정 (.env)

### 0-4. 인증 설정

- [x] Google Cloud Console OAuth 클라이언트 생성
- [x] Supabase Auth 구글 소셜 로그인 설정 (대시보드)
- [x] 인증 콜백 라우트 (src/app/auth/callback/)
- [x] 인증 미들웨어 (src/middleware.ts)

---

## Phase 1: MVP (핵심 플로우)

> 목표: "게임을 검색/필터하고, 상세 가이드를 본다"는 핵심 플로우 완성

### 1-1. 게임 데이터 및 타입

- [x] Game 타입 정의 (src/types/game.ts)
- [x] 샘플 게임 데이터 4개 작성 (src/data/games/)
- [x] 썸네일 이미지 배치 (public/images/games/)

### 1-2. 공통 레이아웃

- [x] 헤더 (로고, 네비게이션, 로그인 버튼, 모바일 햄버거 메뉴)
- [x] 푸터 (저작권, 사업자 정보, 이용약관/개인정보처리방침/환불정책 링크)
- [x] 반응형 기본 레이아웃 (모바일 퍼스트)
- [x] 디자인 토큰 설정 (파란색 주색상 + 노란색 포인트)
- [x] 랜딩 페이지 (히어로 + 핵심 가치 + 인기 게임 + 타겟 유저 + 요금제)

### 1-3. 인증 기능

- [x] 구글 소셜 로그인 버튼 UI (AuthButton 컴포넌트)
- [x] 로그인/로그아웃 플로우
- [x] 로그인 상태에 따른 UI 분기 (헤더 프로필/이름 표시)
- [x] 로그인 전용 페이지 (Google 로그인 버튼 UI)
- [x] 인증 미들웨어 (세션 갱신)

### 1-4. 게임 리스트 페이지

- [x] 카드 뷰 (제목, 설명, 소요 시간, 인원)
- [x] 그리드 레이아웃 (반응형 1~3열)
- [x] 드롭다운 필터 UI (대상, 인원, 장소 + 상세: 준비 시간, 활동성, 품성)
- [x] 필터 조합 시 실시간 결과 갱신
- [x] 빈 상태 UI
- [x] 품성(Character Qualities) 필터 (멀티 선택, 49가지 품성 기반, 검색 지원)

### 1-5. 게임 상세 페이지

- [x] 썸네일 이미지
- [x] 기본 정보 영역 (게임명, 태그, 메타데이터 카드 그리드)
- [x] 대상/장소/품성 태그 (색상 구분)
- [x] 준비물 리스트 (구매 링크 지원)
- [x] 상세 진행 스텝 (단계별 가이드)
- [x] 변형 팁 영역
- [x] 유의사항 (안전 관리)
- [x] 말씀 연결 영역 (성경 구절 + 메시지)
- [x] SSG 정적 페이지 생성 (generateStaticParams)
- [x] 무료 사용자: 월 3개 상세 열람 제한 로직 (Supabase 연동)

---

## Phase 2: 수익화

> 목표: 구독 결제 시스템 연동 및 프리미엄 콘텐츠 제공

### 2-1. 결제 및 법적 요건

- [x] 포트원 V2 연동 (NHN KCP PG)
- [x] 결제 페이지 (/pricing) — 무료 vs 프리미엄 비교 UI + FAQ
- [x] 결제 검증 API (/api/payment/verify)
- [x] Webhook 핸들러 (/api/payment/webhook)
- [x] 모바일 리다이렉트 결제 플로우 (/payment/complete)
- [x] 마이페이지 (/mypage) — 프로필, 구독 상태 확인
- [x] DB 컬럼명 정리 (stripe_ → payment_)
- [x] Webhook에 service role key 적용 (RLS 우회)
- [x] 이용약관 (/terms) — 저작권 조항 포함
- [x] 개인정보처리방침 (/privacy)
- [x] 환불정책 (/refund)
- [x] 커스텀 도메인 연결 (sundayplay.life)
- [x] KCP PG 심사 승인
- [x] KCP 에스크로 가입 신청 — 승인 대기 중
- [ ] KCP 실연동 채널 설정 (PG-API 인증서 발급 → 포트원 실연동 채널 생성)
- [x] 통신판매업 신고 (KCP 계약서로 소명자료 제출) — 심사 중
- [ ] 통신판매업 신고번호 푸터에 추가
- [ ] 카드사 등록심사 신청 (partner.kcp.co.kr)
- [ ] 이행보증보험 가입 (SGI 서울보증보험, 200만원)
- [x] KCP 심사용 이메일/비밀번호 로그인 추가 (테스트 계정)
- [ ] KCP 심사 완료 후 이메일 로그인 폼 제거 또는 비활성화
- [ ] 환불 요청 처리 (마이페이지에서 환불 신청 → 관리자 처리)

### 2-2. 프리미엄 콘텐츠

#### 타입 확장
- [x] safetyNotes 필드 추가
- [x] GameMaterial에 purchaseUrl(구매 링크), downloadPath(다운로드 파일 경로) 추가
- [x] scriptKo 제거 (PPT 발표자 노트로 대체)

#### 다운로드 시스템
- [x] 프리미엄 다운로드 UI (잠금/해제 상태, 골드 스타일)
- [x] 다운로드 API (/api/download) — 구독 확인 + 다운로드 카운트
- [x] 월 10개 게임 다운로드 제한 (download_logs 테이블)
- [x] 비구독자용 프리미엄 유도 UI (블러 + 구독 버튼)

#### 진행 자료 제작
- [ ] 진행 PPT 템플릿 제작 (Canva, 칠판 스타일) — 진행 중
- [ ] 준비물 자료 PDF 제작 (숫자 카드 등)
- [ ] 각 게임별 PPT + 준비물 자료 배치 (public/downloads/)

#### 준비물 고도화
- [ ] 구매 링크 연결 (쿠팡 등 외부 링크)

### 2-3. 게임 데이터 확충

- [ ] 게임 데이터 50개 이상으로 확충
- [ ] 카테고리별 균형 확인 (대상별, 활동성별 최소 3~5개씩)
- [ ] 썸네일 이미지 생성 및 배치

### 2-4. 다국어 지원 (보류)

- [ ] i18n 라이브러리 설정 (next-intl 등)
- [ ] 한국어/영어 번역 키 구조 설계
- [ ] UI 텍스트 다국어 적용
- [ ] 언어 전환 UI

---

## Phase 3: 고도화

> 목표: 사용자 경험 강화 및 커뮤니티 기능

### 3-1. SEO 및 배포

- [x] 커스텀 도메인 연결 (sundayplay.life)
- [ ] Open Graph 태그 (카카오톡/슬랙 공유 미리보기)
- [ ] 파비콘 및 사이트 타이틀
- [ ] Google Search Console 등록

### 3-2. 사용자 기능

- [ ] 보관함 (게임 저장/삭제)
- [ ] 리뷰 작성 및 조회
- [ ] 평점 시스템 (별점 + 정렬)
- [ ] 간편 공유 (카카오톡 / 링크 복사)

### 3-3. 현장 모드 (Presenter Mode)

- [ ] 현장 모드 진입/종료 버튼
- [ ] 폰트 200% 확대 + 간소화된 UI
- [ ] 단계별 넘기기 큰 버튼
- [ ] 내장 스톱워치

### 3-4. 진행 보조 툴킷

- [ ] 인앱 타이머
- [ ] 랜덤 팀 나누기 도구
- [ ] 구독자 전용 접근 제어

### 3-5. AI 추천 엔진

- [ ] 이번 주 공과 주제 입력 → 맞춤 게임 3종 세트 추천
- [ ] 위클리 큐레이션 자동화

### 3-6. UI 마무리

- [ ] 다크모드
- [ ] 애니메이션 및 트랜지션
- [ ] Lighthouse 성능 점검

---

## Git 브랜치 운영 가이드

| 브랜치 | 용도 | 규칙 |
|--------|------|------|
| main | 배포 브랜치 | PR 병합만 허용, 직접 push 금지 |
| dev | 개발 통합 | feature 브랜치를 여기로 PR |
| feature/* | 기능 개발 | 예: feature/auth, feature/game-list |

### 커밋 메시지

영어, 동사 원형으로 시작: Add, Fix, Update, Remove

### 작업 흐름

1. dev에서 feature/* 브랜치 생성
2. 기능 개발 및 커밋
3. dev로 PR 생성 및 병합
4. Phase 단위로 dev → main PR 병합 및 배포
