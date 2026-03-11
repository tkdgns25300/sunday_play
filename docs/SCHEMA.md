# Sunday Play — 데이터 설계

## 하이브리드 아키텍처

```
JSON 파일 (src/data/)              Supabase DB
──────────────────────              ──────────
게임 콘텐츠 전체                    profiles (사용자)
                                    subscriptions (구독/결제)
                                    bookmarks (보관함)
                                    reviews (리뷰/평점)
                                    free_view_logs (무료 열람 추적)
```

**이유:** 게임 콘텐츠는 관리자(본인)만 추가하고 자주 변경되지 않음. JSON 파일로 관리하면 git 버전 관리 + SSG 정적 생성이 가능하고, Supabase 무료 티어 부담도 줄어듦.

---

## 1. 게임 데이터 (TypeScript 파일)

### 파일 구조

```
src/data/
└── games/
    ├── index.ts            # 전체 게임 목록 export
    ├── balloon-relay.ts    # 개별 게임 파일
    ├── bible-quiz.ts
    └── ...
```

### Game 타입 정의

```typescript
type AgeGroup = "영아부" | "유치부" | "유년부" | "초등부" | "중고등부" | "청년부" | "장년부";
type Environment = "실내교실" | "실내강당" | "야외" | "온라인";
type PrepTime = "none" | "quick" | "advance";
type GroupSize = "xs" | "sm" | "md" | "lg";

type GameStep = {
  title: string;
  content: string;
  scriptKo?: string;    // 구독자 전용
  scriptEn?: string;    // 구독자 전용
};

type GameMaterial = {
  name: string;
  quantity: string;
  isOptional: boolean;
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
  fileType: "ppt" | "pdf" | "image";
  storagePath: string;    // Supabase Storage 경로
};

type Game = {
  id: string;
  title: string;
  summary: string;
  description: string;
  thumbnailUrl: string;
  ageGroups: AgeGroup[];
  energyLevel: 1 | 2 | 3 | 4 | 5;
  environments: Environment[];
  prepTime: PrepTime;
  groupSizes: GroupSize[];
  biblicalThemes: string[];
  durationMinutes: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  steps: GameStep[];
  materials: GameMaterial[];
  bibleConnections: BibleConnection[];
  variations: GameVariation[];
  assets: GameAsset[];           // 구독자 전용
};
```

### 개별 게임 파일 예시

```typescript
// src/data/games/balloon-relay.ts
import { Game } from "@/types/game";

const balloonRelay: Game = {
  id: "balloon-relay",
  title: "풍선 릴레이",
  summary: "팀별로 풍선을 떨어뜨리지 않고 릴레이하는 게임",
  description: "신나는 음악과 함께 팀별로 풍선을 릴레이하며 협동심을 배우는 활동입니다.",
  thumbnailUrl: "/images/games/balloon-relay.jpg",
  ageGroups: ["유년부", "초등부", "중고등부"],
  energyLevel: 4,
  environments: ["실내강당", "야외"],
  prepTime: "quick",
  groupSizes: ["md", "lg"],
  biblicalThemes: ["협동", "사랑"],
  durationMinutes: 15,
  difficulty: 2,
  steps: [
    {
      title: "팀 나누기",
      content: "2~4팀으로 나눕니다.",
      scriptKo: "자, 오늘은 팀별로 나눠서 재밌는 게임을 할 거예요!",
      scriptEn: "Alright, today we're going to split into teams for a fun game!",
    },
    { title: "규칙 설명", content: "풍선을 손으로만 터치하여..." },
    { title: "게임 진행", content: "출발 신호와 함께..." },
  ],
  materials: [
    { name: "풍선", quantity: "팀당 3개", isOptional: false },
    { name: "호루라기", quantity: "1개", isOptional: true },
  ],
  bibleConnections: [
    {
      verseReference: "전도서 4:9",
      verseText: "두 사람이 한 사람보다 나으니...",
      messageSummary: "혼자보다 함께할 때 더 큰 힘이 나와요.",
    },
  ],
  variations: [
    { condition: "인원이 5명 미만일 때", suggestion: "개인전으로 진행" },
    { condition: "실내 교실일 때", suggestion: "책상을 벽쪽으로 밀고 진행" },
  ],
  assets: [
    {
      fileName: "풍선릴레이_점수판.pptx",
      fileType: "ppt",
      storagePath: "game-assets/balloon-relay/scoreboard.pptx",
    },
  ],
};

export default balloonRelay;
```

### PrepTime / GroupSize 값 정의

| PrepTime 값 | 의미 |
|-------------|------|
| none | 준비물 없음 |
| quick | 5분 내 준비 |
| advance | 사전 준비 필요 |

| GroupSize 값 | 의미 |
|-------------|------|
| xs | 5명 미만 |
| sm | 5~10명 |
| md | 10~30명 |
| lg | 30명 이상 |

---

## 2. 파일 저장소

| 파일 종류 | 저장 위치 | 이유 |
|-----------|-----------|------|
| 게임 썸네일 이미지 | `public/images/games/` | 무료 사용자에게도 노출, Vercel CDN 서빙 |
| PPT/PDF/HWP (유료 자료) | Supabase Storage (`game-assets/`) | 구독자만 다운로드, 접근 제어 필요 |

```
public/images/games/              → 썸네일 (무료, 누구나 접근)
Supabase Storage/game-assets/     → PPT, PDF, HWP (유료, 구독자만)
```

---

## 3. Supabase DB 테이블

### 3-1. profiles (사용자 프로필)

Supabase Auth의 `auth.users`와 1:1 연결.

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK, FK → auth.users.id | 사용자 ID |
| email | text | NOT NULL | 이메일 |
| display_name | text | | 표시 이름 |
| avatar_url | text | | 프로필 이미지 URL |
| created_at | timestamptz | DEFAULT now() | 가입일 |
| updated_at | timestamptz | DEFAULT now() | 수정일 |

### 3-2. subscriptions (구독)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | ID |
| user_id | uuid | FK → profiles.id, UNIQUE | 사용자 ID |
| stripe_customer_id | text | UNIQUE | Stripe 고객 ID |
| stripe_subscription_id | text | UNIQUE | Stripe 구독 ID |
| status | text | NOT NULL | 구독 상태 (active, canceled, past_due) |
| current_period_start | timestamptz | | 현재 결제 기간 시작 |
| current_period_end | timestamptz | | 현재 결제 기간 종료 |
| created_at | timestamptz | DEFAULT now() | 생성일 |
| updated_at | timestamptz | DEFAULT now() | 수정일 |

### 3-3. bookmarks (보관함)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | ID |
| user_id | uuid | FK → profiles.id, ON DELETE CASCADE | 사용자 ID |
| game_id | text | NOT NULL | 게임 ID (JSON의 id 값) |
| created_at | timestamptz | DEFAULT now() | 저장일 |

UNIQUE(user_id, game_id)

### 3-4. reviews (리뷰)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | ID |
| user_id | uuid | FK → profiles.id, ON DELETE CASCADE | 사용자 ID |
| game_id | text | NOT NULL | 게임 ID (JSON의 id 값) |
| rating | smallint | NOT NULL, CHECK (1~5) | 평점 |
| content | text | | 리뷰 내용 |
| created_at | timestamptz | DEFAULT now() | 작성일 |
| updated_at | timestamptz | DEFAULT now() | 수정일 |

UNIQUE(user_id, game_id)

### 3-5. free_view_logs (무료 상세 열람 기록)

비구독자의 월 3회 상세 가이드 열람 추적.

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | ID |
| user_id | uuid | FK → profiles.id, ON DELETE CASCADE | 사용자 ID |
| game_id | text | NOT NULL | 게임 ID (JSON의 id 값) |
| viewed_at | timestamptz | DEFAULT now() | 열람일 |

UNIQUE(user_id, game_id) — 같은 게임 중복 카운트 방지

---

## 4. RLS (Row Level Security) 정책

| 테이블 | 정책 | 설명 |
|--------|------|------|
| profiles | SELECT/UPDATE: 본인만 | 자기 프로필만 조회/수정 |
| bookmarks | ALL: 본인만 | 자기 보관함만 CRUD |
| reviews | SELECT: 모든 사용자 | 리뷰는 누구나 조회 |
| reviews | INSERT/UPDATE/DELETE: 본인만 | 자기 리뷰만 수정/삭제 |
| subscriptions | SELECT: 본인만 | 자기 구독 정보만 조회 |
| free_view_logs | ALL: 본인만 | 자기 열람 기록만 CRUD |

---

## 5. 인덱스

| 테이블 | 인덱스 | 용도 |
|--------|--------|------|
| bookmarks | idx_user_id | 사용자별 보관함 조회 |
| reviews | idx_game_id | 게임별 리뷰 조회 |
| free_view_logs | idx_user_id_viewed_at | 월별 열람 횟수 집계 |

---

## 6. 설계 결정 사항

### 게임 데이터: TypeScript 파일 vs DB

**TypeScript 파일을 선택한 이유:**
- 콘텐츠는 관리자(본인)만 추가/수정 → DB CRUD 불필요
- git으로 콘텐츠 변경 이력 추적 가능
- Next.js SSG로 빌드 시 정적 페이지 생성 → 빠른 로딩
- Supabase 무료 티어 쿼리/스토리지 절약
- 20~30개 규모에서 클라이언트 필터링으로 충분

### DB 테이블의 game_id가 text인 이유

- 게임 데이터가 DB가 아닌 파일에 있으므로, FK 대신 JSON의 `id` 문자열로 참조
- 게임 삭제 시 연관 DB 레코드 정리는 수동 또는 관리 스크립트로 처리

### 스크립트를 GameStep에 합친 이유

- 별도 GameScript 타입을 두면 step과 1:1 매핑을 위한 `stepOrder` 관리 필요
- step 안에 optional 필드(`scriptKo`, `scriptEn`)로 두면 구조가 단순해짐
- 모든 step에 스크립트가 필요한 것은 아니므로 optional이 자연스러움

### 콘텐츠 규모 확장 시

게임이 100개 이상으로 늘어나면 DB 마이그레이션 검토.
타입 구조가 동일하므로 파일 → DB 이전이 수월함.
