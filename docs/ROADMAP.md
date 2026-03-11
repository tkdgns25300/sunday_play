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
- [ ] Vercel 연동 (GitHub 레포 연결 → 자동 배포 파이프라인)

### 0-3. Supabase 세팅

- [ ] Supabase 프로젝트 생성 (대시보드)
- [ ] 테이블 생성 (profiles, subscriptions, bookmarks, reviews, free_view_logs)
- [ ] RLS(Row Level Security) 정책 설정
- [ ] Supabase 클라이언트 설정 (src/lib/supabase.ts)
- [ ] 환경 변수 설정 (.env.local)

### 0-4. 인증 설정

- [ ] Google Cloud Console OAuth 클라이언트 생성
- [ ] Supabase Auth 구글 소셜 로그인 설정 (대시보드)
- [ ] 환경 변수에 OAuth 키 추가

---

## Phase 1: MVP (핵심 플로우)

> 목표: "게임을 검색/필터하고, 상세 가이드를 본다"는 핵심 플로우 완성

### 1-1. 게임 데이터 및 타입

- [x] Game 타입 정의 (src/types/game.ts)
- [x] 샘플 게임 데이터 3개 작성 (src/data/games/)
- [ ] 게임 데이터 20~30개로 확충 (UI 확인 후 진행)
- [ ] 카테고리별 균형 확인 (대상별, 활동성별 최소 3~5개씩)
- [ ] 썸네일 이미지 배치 (public/images/games/)

### 1-2. 공통 레이아웃

- [x] 헤더 (로고, 네비게이션, 로그인 버튼, 모바일 햄버거 메뉴)
- [x] 푸터 (저작권, 이용약관/개인정보처리방침 링크)
- [x] 반응형 기본 레이아웃 (모바일 퍼스트)
- [x] 디자인 토큰 설정 (파란색 주색상 + 노란색 포인트)
- [x] 랜딩 페이지 (히어로 섹션 + 핵심 가치 소개)

### 1-3. 인증 기능

- [ ] 구글 소셜 로그인 버튼 UI
- [ ] 로그인/로그아웃 플로우
- [ ] 로그인 상태에 따른 UI 분기 (헤더 프로필 등)
- [ ] 인증 미들웨어 (보호된 라우트)

### 1-4. 게임 리스트 페이지

- [x] 카드 뷰 (Summary Card) 컴포넌트
  - 게임명, 썸네일, 핵심 태그
  - 소요 시간, 활동성, 준비물 유무 아이콘
- [x] 그리드 레이아웃 (반응형 1~3열)
- [x] 키워드 검색 기능
- [x] 필터 UI 구현
  - 대상(Age Group): 영아부 ~ 장년부
  - 활동성(Energy Level): 1~5단계
  - 공간(Environment): 실내(교실) / 실내(강당) / 야외 / 온라인
  - 준비 시간(Prep Time): 준비물 없음 / 5분 내 / 사전 준비
  - 인원수 범위: 5명 미만 / 5~10명 / 10~30명 / 30명 이상
- [x] 필터 조합 시 실시간 결과 갱신
- [x] 빈 상태 UI
- [ ] 성경 주제(Biblical Themes) 필터 (데이터 확충 후 추가)

### 1-5. 게임 상세 페이지

- [x] 기본 정보 영역 (게임명, 태그, 메타데이터)
- [x] 준비물 리스트
- [x] 난이도 표시 (1~5단계)
- [x] 상세 진행 스텝 (단계별 가이드)
- [x] 말씀 연결 영역 (성경 구절 + 1분 메시지 요약)
- [x] 변형 팁 영역
- [x] SSG 정적 페이지 생성 (generateStaticParams)
- [ ] 무료 사용자: 월 3개 상세 열람 제한 로직 (Supabase 연동 후)

---

## Phase 2: 수익화

> 목표: 구독 결제 시스템 연동 및 프리미엄 콘텐츠 제공

### 2-1. Stripe 구독 결제

- [ ] Stripe 계정 생성 및 상품/가격 설정 ($5/월)
- [ ] 결제 페이지 (Stripe Checkout 연동)
- [ ] 구독 상태 관리 (Webhook으로 Supabase 동기화)
- [ ] 구독/해지 플로우
- [ ] 구독 상태에 따른 콘텐츠 접근 제어

### 2-2. 프리미엄 콘텐츠

- [ ] 진행 스크립트 (한/영) 영역 — 구독자 전용
- [ ] PPT 템플릿 / 활동지 PDF 다운로드 기능
- [ ] Supabase Storage에 파일 업로드 및 관리
- [ ] 다운로드 권한 체크 (구독 여부)

### 2-3. 다국어 지원

- [ ] i18n 라이브러리 설정 (next-intl 등)
- [ ] 한국어/영어 번역 키 구조 설계
- [ ] UI 텍스트 다국어 적용
- [ ] 언어 전환 UI

---

## Phase 3: 고도화

> 목표: 사용자 경험 강화 및 커뮤니티 기능

### 3-1. 사용자 기능

- [ ] 보관함 (게임 저장/삭제)
- [ ] 리뷰 작성 및 조회
- [ ] 평점 시스템 (별점 + 정렬)
- [ ] 간편 공유 (카카오톡 / 링크 복사)

### 3-2. 현장 모드 (Presenter Mode)

- [ ] 현장 모드 진입/종료 버튼
- [ ] 폰트 200% 확대 + 간소화된 UI
- [ ] 단계별 넘기기 큰 버튼
- [ ] 내장 스톱워치

### 3-3. 진행 보조 툴킷

- [ ] 인앱 타이머
- [ ] 랜덤 팀 나누기 도구
- [ ] 구독자 전용 접근 제어

### 3-4. AI 추천 엔진

- [ ] 이번 주 공과 주제 입력 → 맞춤 게임 3종 세트 추천
- [ ] 위클리 큐레이션 자동화

### 3-5. UI 마무리

- [ ] 다크모드
- [ ] 애니메이션 및 트랜지션
- [ ] Lighthouse 성능 점검

### 3-6. SEO 및 배포

- [ ] Open Graph 태그 (카카오톡/슬랙 공유 미리보기)
- [ ] 파비콘 및 사이트 타이틀
- [ ] Google Search Console 등록
- [ ] 커스텀 도메인 연결

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
