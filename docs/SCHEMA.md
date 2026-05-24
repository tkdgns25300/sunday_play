# Sunday Play — 데이터 설계

## 하이브리드 아키텍처

```
TypeScript 파일 (src/data/)        Supabase DB
──────────────────────              ──────────
게임 콘텐츠 전체 (50개)             profiles (사용자)
                                    user_credits (크레딧 잔액)
public/downloads/                   credit_transactions (크레딧 입출금)
──────────────────────              game_purchases (게임 구매 이력)
게임별 PPT/PDF 자료                 download_logs (다운로드 이력)
                                    bookmarks (보관함, Phase 3)
                                    reviews (리뷰, Phase 3)
```

**이유:** 게임 콘텐츠는 관리자(본인)만 추가하고 자주 변경되지 않음. TypeScript 파일로 관리하면 git 버전 관리 + SSG 정적 생성이 가능하고, Supabase 무료 티어 부담도 줄어듦. 다운로드 자료는 `public/downloads/`에 두어 Vercel CDN으로 서빙하되, 다운로드 API에서 구매 여부를 검증해 접근 제어.

---

## 1. 게임 데이터 (TypeScript 파일)

### 파일 구조

```
src/data/
└── games/
    ├── index.ts                # 전체 게임 목록 export
    ├── color-flip-bingo.ts     # 개별 게임 파일
    ├── word-speed-quiz.ts
    └── ...                      # 총 50개
```

### Game 타입 정의

```typescript
type AgeGroup =
  | "영아부" | "유치부" | "유년부" | "초등부"
  | "중고등부" | "청년부" | "장년부";

type Environment = "실내" | "야외" | "온라인";

type PrepTime = "none" | "quick" | "advance";

type GroupSize = "xs" | "sm" | "md" | "lg";

type CharacterQuality = "감사" | "검약" | ... ;    // 49가지 품성

type GameStep = {
  title: string;
  content: string;
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
  storagePath: string;    // public/downloads/games/{id}/ 기준 상대 경로
};

type Game = {
  id: string;
  title: string;
  summary: string;
  description: string;
  thumbnailUrl: string;
  ageGroups: AgeGroup[];
  energyLevel: 1 | 2 | 3;             // 1:정적 / 2:보통 / 3:활동적
  environments: Environment[];
  prepTime: PrepTime;
  groupSizes: GroupSize[];
  characterQualities: CharacterQuality[];
  durationMinutes: number;
  difficulty: 1 | 2 | 3;              // 1:쉬움 / 2:보통 / 3:어려움
  requiredStaff: { min: number; recommended: number };
  steps: GameStep[];
  materials: GameMaterial[];
  bibleConnections: BibleConnection[];
  variations: GameVariation[];
  safetyNotes: string[];
  assets: GameAsset[];                // 구매자 전용 다운로드
  tips?: string[];
  referenceVideoUrl?: string;
  previewPages?: number[];            // PPT 미리보기 페이지 번호
  creditPrice: 500 | 1000 | 1500 | 2000;
  recommendScore: 1 | 2 | 3 | 4 | 5;
};
```

### Enum 값 정의

| EnergyLevel | 의미 |
|---|---|
| 1 | 정적 (앉아서 진행) |
| 2 | 보통 |
| 3 | 활동적 (뛰거나 움직임 큼) |

| Difficulty | 의미 |
|---|---|
| 1 | 쉬움 |
| 2 | 보통 |
| 3 | 어려움 |

| PrepTime | 의미 |
|---|---|
| none | 바로 시작 (준비물 없음) |
| quick | 간단한 준비 (5분 내) |
| advance | 미리 준비 필요 |

| GroupSize | 의미 |
|---|---|
| xs | 5명 미만 |
| sm | 5~10명 |
| md | 10~30명 |
| lg | 30명 이상 |

---

## 2. 파일 저장소

| 파일 종류 | 저장 위치 | 접근 제어 |
|---|---|---|
| 게임 썸네일 이미지 | `public/images/games/{id}.png` | 누구나 (Vercel CDN) |
| PPT/PDF (구매자 전용 자료) | `public/downloads/games/{id}/` | `/api/download`에서 `game_purchases` 확인 후 서빙 |

```
public/images/games/              → 썸네일 (무료, 누구나 접근)
public/downloads/games/{id}/      → PPT, PDF (다운로드 API로만 접근)
   ├── rules.pptx                  → 진행 PPT
   └── {자료명}.pdf                 → 준비물/인쇄물 등
```

**왜 Supabase Storage가 아닌 public/downloads인가?**
- 50개 게임 자료가 1인 개발자 관리 콘텐츠이고 git으로 버전 관리됨
- Storage 무료 티어 절약
- 접근 제어는 API 라우트(`/api/download`)에서 처리 — 직접 URL로 접근해도 인증 검증 통과해야 함

---

## 3. Supabase DB 테이블

### 3-1. profiles (사용자 프로필)

Supabase Auth의 `auth.users`와 1:1 연결.

| 컬럼 | 타입 | 제약 조건 | 설명 |
|---|---|---|---|
| id | uuid | PK, FK → auth.users.id | 사용자 ID |
| email | text | NOT NULL | 이메일 |
| display_name | text | NULL 허용 | 표시 이름 |
| avatar_url | text | NULL 허용 | 프로필 이미지 URL |
| created_at | timestamptz | DEFAULT now() | 가입일 |
| updated_at | timestamptz | DEFAULT now() | 수정일 |

### 3-2. user_credits (크레딧 잔액)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|---|---|---|---|
| user_id | uuid | PK, FK → profiles.id | 사용자 ID (1인 1행) |
| balance | integer | NOT NULL, DEFAULT 0 | 현재 잔액 |
| updated_at | timestamptz | NOT NULL, DEFAULT now() | 최종 갱신 시각 |

신규 가입 시 `WELCOME_CREDITS=1000`이 자동 지급됨.

### 3-3. credit_transactions (크레딧 입출금 이력)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|---|---|---|---|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID |
| user_id | uuid | NOT NULL, FK → profiles.id | 사용자 ID |
| type | text | NOT NULL | `charge` (충전/지급) / `purchase` (게임 구매로 차감) |
| amount | integer | NOT NULL | 변동량 (charge는 양수, purchase는 양수로 차감되는 양) |
| description | text | NOT NULL | "크레딧 충전 ₩5,000", "가입 축하 크레딧" 등 |
| payment_id | text | NULL 허용 | 결제 충전 시 PortOne paymentId |
| created_at | timestamptz | NOT NULL, DEFAULT now() | 발생 시각 |

### 3-4. game_purchases (게임 구매 이력)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|---|---|---|---|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID |
| user_id | uuid | NOT NULL, FK → profiles.id | 구매자 |
| game_id | text | NOT NULL | 게임 ID (TS의 id 값) |
| credit_amount | integer | NOT NULL | 차감된 크레딧 |
| purchased_at | timestamptz | NOT NULL, DEFAULT now() | 구매 시각 |

UNIQUE(user_id, game_id) — 같은 게임 중복 구매 방지

### 3-5. download_logs (다운로드 이력)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|---|---|---|---|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID |
| user_id | uuid | NOT NULL, FK → profiles.id | 사용자 ID |
| game_id | text | NOT NULL | 게임 ID |
| file_name | text | NOT NULL | 다운로드한 파일명 |
| downloaded_at | timestamptz | DEFAULT now() | 다운로드 시각 |

### 3-6. bookmarks (보관함, Phase 3)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|---|---|---|---|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID |
| user_id | uuid | NOT NULL, FK → profiles.id, ON DELETE CASCADE | 사용자 ID |
| game_id | text | NOT NULL | 게임 ID |
| created_at | timestamptz | DEFAULT now() | 저장일 |

UNIQUE(user_id, game_id)

### 3-7. reviews (리뷰, Phase 3)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|---|---|---|---|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID |
| user_id | uuid | NOT NULL, FK → profiles.id, ON DELETE CASCADE | 사용자 ID |
| game_id | text | NOT NULL | 게임 ID |
| rating | smallint | NOT NULL, CHECK (1~5) | 평점 |
| content | text | NULL 허용 | 리뷰 내용 |
| created_at | timestamptz | DEFAULT now() | 작성일 |
| updated_at | timestamptz | DEFAULT now() | 수정일 |

UNIQUE(user_id, game_id)

---

## 4. RLS (Row Level Security) 정책

| 테이블 | 정책 | 설명 |
|---|---|---|
| profiles | SELECT/UPDATE: 본인만 | 자기 프로필만 조회/수정 |
| user_credits | SELECT: 본인만 / INSERT/UPDATE: service role | 잔액 조회는 본인, 변경은 서버에서 service role로만 |
| credit_transactions | SELECT: 본인만 / INSERT: service role | 거래 기록은 본인 조회, 발생은 서버에서만 |
| game_purchases | SELECT: 본인만 / INSERT: service role | 구매 이력 본인만, 발생은 서버에서만 |
| download_logs | SELECT/INSERT: 본인만 | 다운로드 기록은 본인 CRUD |
| bookmarks | ALL: 본인만 | 보관함은 본인 CRUD |
| reviews | SELECT: 모든 사용자 / INSERT/UPDATE/DELETE: 본인만 | 리뷰는 누구나 조회, 본인만 편집 |

**핵심:** 크레딧 잔액과 거래 기록은 사용자가 직접 변경할 수 없도록 RLS로 막고, 서버(`/api/payment/verify`, `/api/credit/purchase`, `/api/payment/webhook`)에서 `SUPABASE_SERVICE_ROLE_KEY`로만 변경.

---

## 5. 결제/충전 플로우

```
[크레딧 충전]
  사용자 → /pricing → PortOne 결제창 → 결제 완료
  → 클라이언트 콜백: /api/payment/verify
      ├─ PortOne API로 결제 검증 (status=PAID, 금액 일치)
      └─ chargeCredits(): user_credits 증액 + credit_transactions(charge) 기록
  → 서버 콜백: /api/payment/webhook (Transaction.Paid)
      └─ 동일 로직 (중복 방지는 paymentId UNIQUE로)

[게임 구매]
  사용자 → 게임 상세 → "구매" 클릭
  → /api/credit/purchase
      ├─ user_credits.balance >= creditPrice 확인
      ├─ user_credits 차감 + credit_transactions(purchase) 기록
      └─ game_purchases INSERT

[자료 다운로드]
  사용자 → 다운로드 클릭 → /api/download?gameId=...&file=...
      ├─ auth.users 인증 확인
      ├─ game_purchases에서 구매 여부 확인
      ├─ public/downloads/games/{id}/{file} 서빙
      └─ download_logs 기록
```

---

## 6. 설계 결정 사항

### 게임 데이터: TypeScript 파일 vs DB

**TypeScript 파일을 선택한 이유:**
- 콘텐츠는 관리자(본인)만 추가/수정 → DB CRUD 불필요
- git으로 콘텐츠 변경 이력 추적 가능
- Next.js SSG로 빌드 시 정적 페이지 생성 → 빠른 로딩
- Supabase 무료 티어 쿼리/스토리지 절약
- 50개 규모에서 클라이언트 필터링으로 충분

### 크레딧 모델로 전환한 이유 (vs 정기 구독)

- 교회 사역자가 매월 결제하는 구독보다 **필요할 때만 결제**하는 모델이 한국 시장에 적합
- KCP/PortOne 정기결제 심사가 까다로움 → 충전식이 심사 통과 쉬움
- 구매한 게임은 영구 보유 → 사용자 만족도 ↑
- Phase 2.5 단계에서 `subscriptions`, `free_view_logs` 테이블은 **DROP** 처리됨

### DB 테이블의 game_id가 text인 이유

- 게임 데이터가 DB가 아닌 파일에 있으므로, FK 대신 TS의 `id` 문자열로 참조
- 게임 삭제 시 연관 DB 레코드 정리는 수동 또는 관리 스크립트로 처리

### 크레딧 유효기간

- 약관 표기상: **3개월** (KCP 리스크관리팀 요구사항)
- 실제 시스템: 만료 처리 로직 없음 (정책 변경 여지를 위해 "서비스 정책에 따라 연장될 수 있습니다" 문구 추가)

### 콘텐츠 규모 확장 시

게임이 100개 이상으로 늘어나면 DB 마이그레이션 검토.
타입 구조가 동일하므로 파일 → DB 이전이 수월함.
