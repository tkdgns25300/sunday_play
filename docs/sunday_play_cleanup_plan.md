# Sunday Play — 정리 작업 계획서

> 작성일: 2026-05-12
> 범위: docs 업데이트 + dead code 정리

---

## 📋 작업 요약

| # | 항목 | 종류 | 우선순위 |
|---|------|------|---------|
| 1 | `docs/SCHEMA.md` 전면 재작성 | 문서 | 높음 |
| 2 | `docs/SPEC.md` 전면 재작성 | 문서 | 높음 |
| 3 | `docs/ROADMAP.md` 3건 체크박스 수정 | 문서 | 낮음 |
| 4 | `src/lib/subscription.ts` 정리 (logDownload만 추출) | 코드 | 높음 |
| 5 | `src/constants/subscription.ts` 삭제 | 코드 | 높음 |
| 6 | `src/constants/pricing.ts` 삭제 | 코드 | 높음 |
| 7 | `src/components/paywall.tsx` dead path 제거 | 코드 | 중간 |
| 8 | `src/app/privacy/page.tsx` "구독 관리" 문구 수정 | 코드 | 낮음 |

---

# 1. docs/SCHEMA.md — 전면 재작성

## 현재 문제점

`docs/SCHEMA.md`는 초기 구독 모델 시점에서 한 번도 업데이트되지 않음 (마지막 수정: `a89afbc Replace biblicalThemes with characterQualities`).

### 잘못된 내용
- `subscriptions`, `free_view_logs` 테이블이 여전히 표기됨 → **실제론 DROP됨**
- **크레딧 관련 테이블 정보 없음**: `user_credits`, `credit_transactions`, `game_purchases`
- Game 타입 outdated:
  - `energyLevel: 1~5` → 실제 `1~3`
  - `difficulty: 1~5` → 실제 `1~3`
  - `Environment: 실내교실|실내강당|야외|온라인` → 실제 `실내|야외|온라인`
  - `scriptKo`/`scriptEn` 남아있음 → 제거됨
  - 누락 필드: `requiredStaff`, `safetyNotes`, `tips`, `referenceVideoUrl`, `previewPages`, `creditPrice`, `recommendScore`
- "구독자 전용" 표현 다수 → 크레딧 모델로 바뀜
- "Supabase Storage" 명시 → 실제론 `public/downloads/` 사용

## 새 SCHEMA.md에 들어가야 할 내용

### 1) 하이브리드 아키텍처 (업데이트)
```
TypeScript 파일 (src/data/)              Supabase DB
──────────────────────                   ──────────
게임 콘텐츠 50개 (정적 데이터)            profiles (사용자)
                                         user_credits (크레딧 잔액)
public/images/games/  (썸네일)           credit_transactions (충전/차감 기록)
public/downloads/games/ (PPT/PDF)        game_purchases (게임 구매 기록)
                                         download_logs (다운로드 기록)
                                         bookmarks (보관함 — Phase 3, 아직 미사용)
                                         reviews (리뷰 — Phase 3, 아직 미사용)
```

**중요**: PPT/PDF는 Supabase Storage가 아닌 `public/downloads/` 로 서빙. 구매 확인은 DB로 검증.

### 2) Game 타입 정의 (최신)

```typescript
type AgeGroup = "영아부" | "유치부" | "유년부" | "초등부" | "중고등부" | "청년부" | "장년부";
type Environment = "실내" | "야외" | "온라인";  // 4→3 통합
type PrepTime = "none" | "quick" | "advance";
type GroupSize = "xs" | "sm" | "md" | "lg";
type CharacterQuality = ...49가지...;

type GameStep = {
  title: string;
  content: string;
  // scriptKo, scriptEn 제거됨 (PPT 발표자 노트로 대체)
};

type GameMaterial = {
  name: string;
  quantity: string;
  isOptional: boolean;
  purchaseUrl?: string;
  purchaseUrls?: { label: string; url: string }[];
  downloadPath?: string;
};

type BibleConnection = {
  verseReference: string;
  verseText: string;
  messageSummary: string;
};

type GameVariation = {
  condition: string;
  suggestion: string;
};

type GameAsset = {
  fileName: string;
  fileType: "pptx" | "pdf" | "hwpx" | "image" | "zip";
  storagePath: string;  // /downloads/games/{game-id}/{file}
};

type Game = {
  id: string;
  title: string;
  summary: string;
  description: string;
  thumbnailUrl: string;
  ageGroups: AgeGroup[];
  energyLevel: 1 | 2 | 3;          // 5→3 통합
  environments: Environment[];
  prepTime: PrepTime;
  groupSizes: GroupSize[];
  characterQualities: CharacterQuality[];
  durationMinutes: number;
  difficulty: 1 | 2 | 3;            // 5→3 통합
  requiredStaff: { min: number; recommended: number };  // 신규
  steps: GameStep[];
  materials: GameMaterial[];
  bibleConnections: BibleConnection[];
  variations: GameVariation[];
  safetyNotes: string[];            // 신규
  assets: GameAsset[];
  tips?: string[];                  // 신규
  referenceVideoUrl?: string;       // 신규
  previewPages?: number[];          // 신규
  creditPrice: 500 | 1000 | 1500 | 2000;  // 신규 (크레딧 가격)
  recommendScore: 1 | 2 | 3 | 4 | 5;       // 신규 (추천도, 정렬용)
};
```

### 3) 라벨 값 정의 (최신)

| EnergyLevel 값 | 라벨 |
|--------------|------|
| 1 | 정적 |
| 2 | 보통 |
| 3 | 활동적 |

| Difficulty 값 | 라벨 |
|------------|------|
| 1 | 쉬움 |
| 2 | 보통 |
| 3 | 어려움 |

| PrepTime 값 | 라벨 |
|-----------|------|
| none | 바로 시작 |
| quick | 간단한 준비 |
| advance | 미리 준비 필요 |

| GroupSize 값 | 라벨 |
|------------|------|
| xs | 5명 미만 |
| sm | 5~10명 |
| md | 10~30명 |
| lg | 30명 이상 |

### 4) 파일 저장소 (업데이트)

| 파일 종류 | 저장 위치 | 접근 제어 |
|-----------|---------|---------|
| 게임 썸네일 (50개) | `public/images/games/{game-id}.png` | 누구나 |
| 게임 자료 (PPT/PDF) | `public/downloads/games/{game-id}/rules.{pptx,pdf}` | 구매 확인 후 API로 서빙 |
| 미리보기 이미지 | `public/downloads/games/{game-id}/preview/{n}.png` | 누구나 |
| 인터랙티브 게임 자료 | `public/images/games/{game-id}/` (예: photo-stop) | 누구나 |

### 5) Supabase DB 테이블 (현재 상태)

#### 5-1. profiles
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid PK FK auth.users.id | 사용자 ID |
| email | text NOT NULL | |
| display_name | text | |
| avatar_url | text | |
| created_at, updated_at | timestamptz | |

#### 5-2. user_credits (신규)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| user_id | uuid PK FK profiles.id | |
| balance | integer NOT NULL DEFAULT 0 | 크레딧 잔액 |
| updated_at | timestamptz | |

#### 5-3. credit_transactions (신규)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid PK | |
| user_id | uuid FK profiles.id | |
| type | text NOT NULL | "charge" / "deduct" |
| amount | integer NOT NULL | |
| description | text | 설명 ("게임 구매: {gameId}", "가입 축하 크레딧" 등) |
| payment_id | text | 충전 시 PortOne 결제 ID |
| created_at | timestamptz | |

#### 5-4. game_purchases (신규)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid PK | |
| user_id | uuid FK profiles.id | |
| game_id | text NOT NULL | |
| credit_amount | integer | 차감된 크레딧 |
| purchased_at | timestamptz | |

UNIQUE(user_id, game_id) — 중복 구매 방지

#### 5-5. download_logs
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid PK | |
| user_id | uuid FK profiles.id | |
| game_id | text NOT NULL | |
| file_name | text | |
| downloaded_at | timestamptz | |

#### 5-6. ~~subscriptions, free_view_logs~~ — DROP됨

구독 모델 폐기로 제거됨.

#### 5-7. bookmarks, reviews — Phase 3 예정 (미사용)

### 6) RLS 정책

| 테이블 | 정책 | 설명 |
|--------|------|------|
| profiles | SELECT/UPDATE: 본인만 | |
| user_credits | SELECT: 본인만 / 쓰기: 서버만 (service role) | |
| credit_transactions | SELECT: 본인만 / 쓰기: 서버만 | |
| game_purchases | SELECT: 본인만 / 쓰기: 서버만 | |
| download_logs | SELECT/INSERT: 본인만 | |

### 7) 결제 흐름

```
사용자 → 포트원 결제 모듈 → 결제 완료
       ↓
       /api/payment/verify (클라이언트 검증)
         + 포트원 API 조회 → PAID 확인
         + 결제 금액 ↔ 크레딧 매핑 검증
         + chargeCredits() → user_credits + credit_transactions
       ↓
       /api/payment/webhook (서버-투-서버 백업)
         + 같은 로직 (중복 충전 방지 필요)
```

### 8) 게임 구매 흐름

```
사용자 → /games/{id} → "구매하기" 클릭
       ↓
       /api/credit/purchase
         + 잔액 확인 (>= creditPrice)
         + 중복 구매 확인 (game_purchases)
         + user_credits 차감 (UPDATE)
         + game_purchases INSERT
         + credit_transactions INSERT (type: "deduct")
       ↓
       다운로드 버튼 활성화
       ↓
       /api/download
         + hasPurchasedGame() 검증
         + logDownload()
         + 파일 경로 반환 → 클라이언트가 다운로드
```

### 9) Welcome Credit (가입 보너스)

`/auth/callback/route.ts`에서 처리:
- Google OAuth 성공 후 `user_credits` 테이블에 user_id 존재 확인
- 없으면 → 신규 가입자 → 1,000 크레딧 INSERT + credit_transactions 기록

### 10) 인덱스

| 테이블 | 인덱스 | 용도 |
|--------|--------|------|
| credit_transactions | (user_id, created_at) | 사용자별 거래 내역 조회 |
| game_purchases | (user_id, purchased_at) | 마이페이지 구매 게임 목록 |
| download_logs | (user_id, downloaded_at) | 다운로드 이력 |

---

# 2. docs/SPEC.md — 전면 재작성

## 현재 문제점

`docs/SPEC.md`는 초기 작성 후 한 번도 업데이트 안 됨 (마지막 수정: 최초 commit).

### 잘못된 내용
- "구독제를 통한 수익화" → 크레딧 모델
- "활성 5단계, 난이도 5단계" → 3단계로 통합
- "실내(교실)/실내(강당)/야외/온라인" → 3개로 통합
- "준비물 없음/5분 내/사전 준비" → "바로 시작/간단한 준비/미리 준비 필요"
- "$5/월 구독", "월 3개 제한" → 크레딧 모델
- 결제: "Stripe" → PortOne
- 영문 가격 표기 ($5) ← 한국 시장이므로 모순

## 새 SPEC.md 구조 제안

```markdown
# Sunday Play — 기획서

## 프로젝트 개요
- 프로젝트명: Sunday Play
- 도메인: sundayplay.life
- 한 줄 설명: 교회 레크레이션 큐레이션 플랫폼
- 수익 모델: 크레딧 충전 기반 진행 자료 판매
- 타겟 사용자: 주일학교 교사, 청년부 리더, 교회 교육부, 수련회 담당자
- 시장: 한국 (한국어 전용)

## 핵심 기능

### 1. 게임 목록 (50개)
- 카드 뷰: 썸네일, 제목, 요약, 소요 시간, 인원, 난이도, 크레딧 가격
- 정렬: 추천순, 크레딧, 소요 시간, 난이도
- 필터: 대상, 인원, 장소 / 상세: 준비 시간, 활동성, 품성(49가지)
- URL params 동기화 (뒤로가기 복원)

### 2. 게임 상세 페이지
- 로그인 필수
- 기본 정보 (대상, 장소, 품성 태그)
- 메타데이터 (소요 시간, 인원, 활동성, 난이도, 준비, 심판)
- 진행 방법 (단계별)
- 준비물 (구매 링크 지원)
- 응용 아이디어 (변형 팁)
- 안전 주의사항
- 말씀 연결 (성경 구절 + 메시지)
- 진행 자료 다운로드 (크레딧 구매 → 다운로드)
- 미리보기 (구매 전)
- 인터랙티브 게임 (time-match, photo-stop)

### 3. 필터/검색
- 대상: 영아부 ~ 장년부 (7개)
- 활동성: 정적/보통/활동적 (3단계)
- 난이도: 쉬움/보통/어려움 (3단계)
- 공간: 실내/야외/온라인 (3개)
- 준비 시간: 바로 시작/간단한 준비/미리 준비 필요
- 품성: 49가지 멀티 선택 + 검색
- 인원: 5명 미만 ~ 30명 이상

## 수익화 — 크레딧 모델

### 가격 정책
- 1 크레딧 = 1원
- 게임 자료 가격: 500/1000/1500/2000 크레딧
- 가입 시 1,000 크레딧 무료 지급

### 충전 패키지
| 결제 금액 | 지급 크레딧 | 보너스 |
|---------|-----------|------|
| ₩3,000 | 3,000 | 0% |
| ₩5,000 | 5,250 | +5% |
| ₩10,000 | 11,000 | +10% |
| ₩50,000 | 60,000 | +20% |

### 무료 vs 유료 범위
- **무료 (로그인만)**: 게임 목록 브라우징, 상세 가이드 무제한 열람
- **유료 (크레딧)**: 진행 자료 (PPT/PDF) 다운로드만

### 결제 시스템
- PG: PortOne V2 (NHN KCP)
- 결제 수단: 신용카드 (간편결제 추가 예정)
- 크레딧 유효기간: 3개월 (KCP 요구사항)
- 환불: 충전된 크레딧 환불 가능, 구매한 게임 환불 불가

## 사용자 기능
- Google OAuth 로그인
- 마이페이지: 프로필, 크레딧 잔액, 구매한 게임 목록
- 다크모드 토글
- 간편 공유 (링크 복사)
- 보관함/리뷰: Phase 3 예정

## 기술 스택
- Framework: Next.js 16+ (App Router)
- 언어: TypeScript (strict)
- UI: shadcn/ui, Tailwind CSS v4
- 인증/DB: Supabase
- 결제: PortOne V2 (NHN KCP)
- 분석: Google Analytics 4
- 호스팅: Vercel

## 디자인
- 톤: Sunny & Friendly
- 색상: 파란색 주색상 + 노란색 포인트
- 다크모드 지원

## 법적 요건
- 사업자: 훈테크 / 대표 이상훈 / 165-41-01202
- 통신판매업 신고: 제2026-경북안동-0139호
- 이행보증보험 가입 완료
- KCP PG 심사 완료, 카드사 등록심사 완료
```

---

# 3. docs/ROADMAP.md — 체크박스 수정 3건

### 수정 1: 라인 123
```diff
- [ ] 통신판매업 신고 — 신청 완료, 심사 중
+ [x] 통신판매업 신고 완료 (제2026-경북안동-0139호, 2026-05-06)
```

### 수정 2: 라인 124
```diff
- [ ] 통신판매업 신고번호 푸터에 추가 (심사 완료 후)
+ [x] 통신판매업 신고번호 푸터에 추가
```

### 수정 3: 라인 126
```diff
- [ ] 이행보증보험 가입 — 신청 완료, 심사 중
+ [x] 이행보증보험 가입 완료 (2026-05-04 승인)
```

### (선택) 라인 131
```diff
- [x] 이용약관 크레딧 기준 업데이트 (유효기간 5년, 탈퇴 조항 등)
+ [x] 이용약관 크레딧 기준 업데이트 (유효기간 3개월, 탈퇴 조항 등)
```
> 단순 히스토리 기록으로 보면 안 바꿔도 됨

---

# 4. src/lib/subscription.ts — 정리

## 현재 상태

```typescript
// 5개 함수 정의
getSubscriptionStatus()        // ❌ DROP된 subscriptions 테이블 참조
getMonthlyViewCount()          // ❌ DROP된 free_view_logs 테이블 참조
hasViewedGame()                // ❌ DROP된 free_view_logs 테이블 참조
logGameView()                  // ❌ DROP된 free_view_logs 테이블 참조
getMonthlyDownloadedGames()    // ❌ 사용 안 됨
logDownload()                  // ✅ download API에서 사용 중
```

## 작업

### Step 1: `src/lib/download.ts` 새 파일 생성

```typescript
import { SupabaseClient } from "@supabase/supabase-js";

export async function logDownload(
  supabase: SupabaseClient,
  userId: string,
  gameId: string,
  fileName: string
): Promise<void> {
  await supabase
    .from("download_logs")
    .insert({ user_id: userId, game_id: gameId, file_name: fileName });
}
```

### Step 2: `src/app/api/download/route.ts` import 경로 수정

```diff
- import { logDownload } from "@/lib/subscription";
+ import { logDownload } from "@/lib/download";
```

### Step 3: `src/lib/subscription.ts` 파일 삭제

---

# 5. src/constants/subscription.ts — 삭제

## 현재 상태

```typescript
FREE_MONTHLY_VIEW_LIMIT     // 사용처: pricing.ts, paywall.tsx (둘 다 dead)
MONTHLY_DOWNLOAD_LIMIT      // 사용 안 됨
SUBSCRIPTION_PRICE          // 사용 안 됨
SUBSCRIPTION_PRICE_LABEL    // 사용 안 됨
SUBSCRIPTION_NAME           // 사용 안 됨
```

## 작업

→ `pricing.ts`, `paywall.tsx` 정리 후 (아래 #6, #7) 파일 삭제

---

# 6. src/constants/pricing.ts — 삭제

## 현재 상태

```typescript
FREE_FEATURES               // 사용 안 됨
PREMIUM_FEATURES            // 사용 안 됨
```

## 작업

→ 그냥 파일 삭제. 사용처 없음.

---

# 7. src/components/paywall.tsx — Dead path 제거

## 현재 상태

```typescript
type PaywallProps = {
  type: "login" | "subscribe";  // subscribe는 dead
  viewCount?: number;           // 어디서도 전달 안 됨
};
```

`type="subscribe"` 분기는 어디서도 호출 안 됨. game-detail.tsx에서는 `<Paywall type="login" />`만 사용.

## 작업 옵션

### 옵션 A: 분기만 제거 (간단)

```typescript
type PaywallProps = {};  // 또는 그냥 props 제거

export default function Paywall() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-muted/30 px-6 py-12 text-center">
      <svg .../>
      <h3 className="text-lg font-bold">더 자세한 내용이 궁금하신가요?</h3>
      <p className="text-sm text-muted-foreground">
        로그인하시면 준비물, 진행 방법 등
        <br />
        상세 가이드를 확인할 수 있어요.
      </p>
      <Link href="/login">
        <Button>로그인하기</Button>
      </Link>
    </div>
  );
}
```

그리고 game-detail.tsx에서:
```diff
- <Paywall type="login" />
+ <Paywall />
```

### 옵션 B: 파일명 변경 (더 깔끔)

- 파일명: `paywall.tsx` → `login-prompt.tsx`
- 컴포넌트명: `Paywall` → `LoginPrompt`
- game-detail.tsx의 import도 수정

→ **옵션 A 권장**. 옵션 B는 일관성은 좋지만 git diff가 커짐.

---

# 8. src/app/privacy/page.tsx — 문구 수정

## 라인 45

```diff
- <li>서비스 제공: 콘텐츠 제공, 구독 관리, 결제 및 환불 처리</li>
+ <li>서비스 제공: 콘텐츠 제공, 크레딧 관리, 결제 및 환불 처리</li>
```

---

# 🎯 실행 순서 (의존성 고려)

```
1단계 — 코드 정리 (순서 중요)
  ① src/lib/download.ts 생성 (logDownload만)
  ② src/app/api/download/route.ts import 경로 수정
  ③ src/lib/subscription.ts 삭제
  ④ src/components/paywall.tsx dead path 제거
  ⑤ src/components/game-detail.tsx Paywall 호출 수정 (props 제거)
  ⑥ src/constants/pricing.ts 삭제
  ⑦ src/constants/subscription.ts 삭제
  ⑧ npm run build 통과 확인

2단계 — 문구 수정
  ⑨ src/app/privacy/page.tsx "구독 관리" → "크레딧 관리"

3단계 — 문서
  ⑩ docs/SCHEMA.md 전면 재작성
  ⑪ docs/SPEC.md 전면 재작성
  ⑫ docs/ROADMAP.md 체크박스 3건 수정

4단계 — 마무리
  ⑬ npm run build 최종 확인
  ⑭ 커밋 → 푸시 → 머지
```

---

# ✅ 검증 체크리스트

- [ ] `npm run build` 통과
- [ ] `grep -r "subscription" src/` 결과에 dead code 없음 (auth state listener의 subscription은 제외)
- [ ] `grep -r "구독" src/` 결과에 outdated 문구 없음
- [ ] `grep -r "free_view_logs\|FREE_MONTHLY_VIEW_LIMIT\|SUBSCRIPTION_" src/` 결과 없음
- [ ] 게임 상세 페이지 (비로그인) 정상 동작
- [ ] 게임 상세 페이지 (로그인) 정상 동작
- [ ] 크레딧 충전 페이지 정상 동작
- [ ] 다운로드 API 정상 동작

---

# 📌 참고: 손대지 않을 것

- Footer (정보 정확함)
- 50개 게임 데이터 (전부 최신)
- GAME_ATTRIBUTES.md (코드와 정합)
- credit.ts, credit API, payment API (모두 정상)
- 인증, OAuth, welcome credit 로직 (정상)
- migrations/ 디렉토리 (user_credits 등 테이블은 Supabase Dashboard에서 직접 생성됨 — 추후 마이그레이션 파일로 추가하려면 별도 작업)

---

# 📂 영향 받는 파일 목록

```
삭제:
- src/lib/subscription.ts
- src/constants/subscription.ts
- src/constants/pricing.ts

신규:
- src/lib/download.ts

수정:
- src/app/api/download/route.ts (import)
- src/components/paywall.tsx (props 제거)
- src/components/game-detail.tsx (Paywall 호출 수정)
- src/app/privacy/page.tsx (1줄 문구)
- docs/SCHEMA.md (전면 재작성)
- docs/SPEC.md (전면 재작성)
- docs/ROADMAP.md (3~4줄 체크박스)
```

총 7개 파일 수정, 3개 삭제, 1개 신규.
