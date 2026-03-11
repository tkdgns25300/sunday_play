# Sunday Play — DB 스키마

## ERD 개요

```
profiles ──┬── bookmarks ──── games
            ├── reviews ─────── games
            ├── subscriptions
            └── free_view_logs ── games

games ──┬── game_steps
        ├── game_materials
        ├── game_scripts
        ├── game_bible_connections
        ├── game_variations
        └── game_assets
```

---

## 테이블 정의

### 1. profiles (사용자 프로필)

Supabase Auth의 `auth.users`와 1:1 연결.

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK, FK → auth.users.id | 사용자 ID |
| email | text | NOT NULL | 이메일 |
| display_name | text | | 표시 이름 |
| avatar_url | text | | 프로필 이미지 URL |
| created_at | timestamptz | DEFAULT now() | 가입일 |
| updated_at | timestamptz | DEFAULT now() | 수정일 |

### 2. games (게임)

게임의 핵심 정보. 필터링에 사용되는 카테고리는 PostgreSQL 배열로 저장하여 JOIN 없이 빠르게 필터링.

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK, DEFAULT gen_random_uuid() | 게임 ID |
| title | text | NOT NULL | 게임명 |
| summary | text | NOT NULL | 짧은 요약 설명 (카드에 노출) |
| description | text | | 상세 설명 |
| thumbnail_url | text | | 썸네일 이미지 URL |
| age_groups | text[] | NOT NULL | 대상 (영아부, 유치부, ...) |
| energy_level | smallint | NOT NULL, CHECK (1~5) | 활동성 (1: 정적 ~ 5: 격동적) |
| environments | text[] | NOT NULL | 공간 (실내교실, 실내강당, 야외, 온라인) |
| prep_time | text | NOT NULL | 준비 시간 (none, quick, advance) |
| group_sizes | text[] | NOT NULL | 인원 범위 (xs, sm, md, lg) |
| biblical_themes | text[] | | 성경 주제 (사랑, 순종, 믿음, ...) |
| duration_minutes | smallint | NOT NULL | 소요 시간 (분) |
| difficulty | smallint | NOT NULL, CHECK (1~5) | 난이도 |
| has_materials | boolean | DEFAULT false | 준비물 필요 여부 (카드 아이콘용) |
| is_published | boolean | DEFAULT false | 공개 여부 |
| avg_rating | numeric(2,1) | DEFAULT 0 | 평균 평점 (캐시) |
| review_count | integer | DEFAULT 0 | 리뷰 수 (캐시) |
| view_count | integer | DEFAULT 0 | 조회 수 |
| created_at | timestamptz | DEFAULT now() | 생성일 |
| updated_at | timestamptz | DEFAULT now() | 수정일 |

#### prep_time 값 정의

| 값 | 의미 |
|----|------|
| none | 준비물 없음 |
| quick | 5분 내 준비 |
| advance | 사전 준비 필요 |

#### group_sizes 값 정의

| 값 | 의미 |
|----|------|
| xs | 5명 미만 |
| sm | 5~10명 |
| md | 10~30명 |
| lg | 30명 이상 |

### 3. game_steps (진행 스텝)

게임의 단계별 진행 가이드. 순서가 중요.

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | 스텝 ID |
| game_id | uuid | FK → games.id, ON DELETE CASCADE | 게임 ID |
| step_order | smallint | NOT NULL | 순서 (1, 2, 3, ...) |
| title | text | NOT NULL | 스텝 제목 (예: "팀 나누기") |
| content | text | NOT NULL | 스텝 상세 내용 |

### 4. game_materials (준비물)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | 준비물 ID |
| game_id | uuid | FK → games.id, ON DELETE CASCADE | 게임 ID |
| name | text | NOT NULL | 준비물 이름 |
| quantity | text | | 수량 (예: "팀당 1개") |
| is_optional | boolean | DEFAULT false | 선택 준비물 여부 |

### 5. game_scripts (진행 스크립트) — 구독자 전용

한/영 진행 대사 예시.

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | 스크립트 ID |
| game_id | uuid | FK → games.id, ON DELETE CASCADE | 게임 ID |
| step_order | smallint | NOT NULL | game_steps와 대응되는 순서 |
| script_ko | text | NOT NULL | 한국어 대사 |
| script_en | text | | 영어 대사 |

### 6. game_bible_connections (말씀 연결)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | ID |
| game_id | uuid | FK → games.id, ON DELETE CASCADE | 게임 ID |
| verse_reference | text | NOT NULL | 성경 구절 (예: "고린도전서 13:4-7") |
| verse_text | text | NOT NULL | 구절 본문 |
| message_summary | text | NOT NULL | 1분 메시지 요약 |

### 7. game_variations (변형 팁)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | ID |
| game_id | uuid | FK → games.id, ON DELETE CASCADE | 게임 ID |
| condition | text | NOT NULL | 상황 (예: "인원이 5명 미만일 때") |
| suggestion | text | NOT NULL | 대안 설명 |

### 8. game_assets (다운로드 자료) — 구독자 전용

PPT, PDF 등 다운로드 파일. 실제 파일은 Supabase Storage에 저장.

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | ID |
| game_id | uuid | FK → games.id, ON DELETE CASCADE | 게임 ID |
| file_name | text | NOT NULL | 파일명 |
| file_type | text | NOT NULL | 파일 타입 (ppt, pdf, image) |
| storage_path | text | NOT NULL | Supabase Storage 경로 |
| file_size_bytes | integer | | 파일 크기 |

### 9. bookmarks (보관함)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | ID |
| user_id | uuid | FK → profiles.id, ON DELETE CASCADE | 사용자 ID |
| game_id | uuid | FK → games.id, ON DELETE CASCADE | 게임 ID |
| created_at | timestamptz | DEFAULT now() | 저장일 |

UNIQUE(user_id, game_id)

### 10. reviews (리뷰)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | ID |
| user_id | uuid | FK → profiles.id, ON DELETE CASCADE | 사용자 ID |
| game_id | uuid | FK → games.id, ON DELETE CASCADE | 게임 ID |
| rating | smallint | NOT NULL, CHECK (1~5) | 평점 |
| content | text | | 리뷰 내용 |
| created_at | timestamptz | DEFAULT now() | 작성일 |
| updated_at | timestamptz | DEFAULT now() | 수정일 |

UNIQUE(user_id, game_id)

### 11. subscriptions (구독)

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | ID |
| user_id | uuid | FK → profiles.id, ON DELETE CASCADE, UNIQUE | 사용자 ID |
| stripe_customer_id | text | UNIQUE | Stripe 고객 ID |
| stripe_subscription_id | text | UNIQUE | Stripe 구독 ID |
| status | text | NOT NULL | 구독 상태 (active, canceled, past_due) |
| current_period_start | timestamptz | | 현재 결제 기간 시작 |
| current_period_end | timestamptz | | 현재 결제 기간 종료 |
| created_at | timestamptz | DEFAULT now() | 생성일 |
| updated_at | timestamptz | DEFAULT now() | 수정일 |

### 12. free_view_logs (무료 상세 열람 기록)

비구독자의 월 3회 상세 가이드 열람 추적.

| 컬럼 | 타입 | 제약 조건 | 설명 |
|------|------|-----------|------|
| id | uuid | PK | ID |
| user_id | uuid | FK → profiles.id, ON DELETE CASCADE | 사용자 ID |
| game_id | uuid | FK → games.id, ON DELETE CASCADE | 게임 ID |
| viewed_at | timestamptz | DEFAULT now() | 열람일 |

UNIQUE(user_id, game_id) — 같은 게임 중복 카운트 방지

---

## 인덱스

| 테이블 | 인덱스 | 용도 |
|--------|--------|------|
| games | GIN(age_groups) | 대상별 필터링 |
| games | GIN(environments) | 공간별 필터링 |
| games | GIN(group_sizes) | 인원별 필터링 |
| games | GIN(biblical_themes) | 성경 주제 필터링 |
| games | idx_energy_level | 활동성 필터링 |
| games | idx_prep_time | 준비 시간 필터링 |
| games | idx_is_published | 공개 게임만 조회 |
| bookmarks | idx_user_id | 사용자별 보관함 조회 |
| reviews | idx_game_id | 게임별 리뷰 조회 |
| free_view_logs | idx_user_id_viewed_at | 월별 열람 횟수 집계 |

---

## RLS (Row Level Security) 정책

| 테이블 | 정책 | 설명 |
|--------|------|------|
| profiles | SELECT: 본인만 | 자기 프로필만 조회 |
| profiles | UPDATE: 본인만 | 자기 프로필만 수정 |
| games | SELECT: 모든 사용자 (is_published = true) | 공개 게임은 누구나 조회 |
| bookmarks | ALL: 본인만 | 자기 보관함만 CRUD |
| reviews | SELECT: 모든 사용자 | 리뷰는 누구나 조회 |
| reviews | INSERT/UPDATE/DELETE: 본인만 | 자기 리뷰만 수정/삭제 |
| subscriptions | SELECT: 본인만 | 자기 구독 정보만 조회 |
| free_view_logs | ALL: 본인만 | 자기 열람 기록만 CRUD |
| game_scripts | SELECT: 구독자만 | 프리미엄 콘텐츠 접근 제어 |
| game_assets | SELECT: 구독자만 | 프리미엄 자료 접근 제어 |

---

## 설계 결정 사항

### 필터용 배열(text[]) vs 별도 테이블

**배열을 선택한 이유:**
- 필터 카테고리가 고정적이고 값이 적음 (대상 7개, 공간 4개 등)
- JOIN 없이 GIN 인덱스로 빠른 필터링 가능
- 데이터 입력/조회가 단순

### avg_rating, review_count 캐시 컬럼

리뷰 테이블에서 매번 AVG/COUNT 집계하지 않고 games 테이블에 캐시.
리뷰 INSERT/UPDATE/DELETE 시 트리거로 자동 갱신.

### free_view_logs 중복 방지

UNIQUE(user_id, game_id)로 같은 게임은 1회만 카운트.
월별 집계는 `viewed_at`의 연월로 WHERE 필터링.
