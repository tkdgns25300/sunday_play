# CLAUDE.md — Sunday Play

## Project Overview

교회 레크레이션/게임 큐레이션 플랫폼. 주일학교 교사 및 교회 리더가 대상별·상황별로 적합한 게임을 쉽게 찾고, 상세 진행 가이드와 함께 활용할 수 있는 서비스.

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Payment**: Stripe (구독 결제)
- **Deployment**: Vercel
- **Package Manager**: npm

## Directory Structure

```
src/
├── app/          # 라우트 전용 (page.tsx, layout.tsx만 배치)
├── components/   # 재사용 UI 컴포넌트
├── constants/    # 상수 데이터
├── data/games/   # 게임 콘텐츠 데이터 (TypeScript 파일)
├── hooks/        # 커스텀 React 훅
├── lib/          # 유틸리티 함수, API 호출, Supabase 클라이언트
└── types/        # 공유 TypeScript 타입/인터페이스

public/
├── images/games/{game-id}.png          # 게임 썸네일
└── downloads/games/{game-id}/          # 게임별 다운로드 자료
    ├── rules.pptx                      # 진행 PPT
    └── {자료명}.pdf                     # 준비물 자료 등
```

### 게임 파일 규칙
- 게임 데이터 파일명: `src/data/games/{game-id}.ts` (kebab-case, 게임 id와 동일)
- 썸네일 경로: `public/images/games/{game-id}.png`
- 다운로드 자료 경로: `public/downloads/games/{game-id}/`
- 폴더/파일명은 **영어 kebab-case**만 사용 (한글 금지, URL 인코딩 문제 방지)

## Code Conventions

### General

- 모든 소통은 한국어로 한다.
- 커밋 메시지는 영어로 작성한다.
- 불필요한 주석을 달지 않는다. 코드 자체가 의도를 드러내야 한다.
- 매직 넘버, 매직 스트링을 사용하지 않는다. `constants/`에 정의한다.
- 사용하지 않는 코드(변수, import, 함수)는 남기지 않고 즉시 삭제한다.

### Naming

- **파일/폴더**: kebab-case (`game-card.tsx`, `use-search.ts`)
- **컴포넌트**: PascalCase (`GameCard`, `FilterBar`)
- **함수/변수**: camelCase (`getGamesByCategory`, `isLoading`)
- **상수**: UPPER_SNAKE_CASE (`AGE_GROUPS`, `MAX_RESULTS`)
- **타입/인터페이스**: PascalCase, `I` 접두사 사용하지 않음 (`Game`, `FilterOption`)
- **Boolean 변수**: `is`, `has`, `should` 접두사 (`isOpen`, `hasError`)

### TypeScript

- `any` 사용 금지. 불가피한 경우 `unknown`을 사용하고 타입 가드로 좁힌다.
- 공유 타입은 `types/`에, 컴포넌트 전용 타입은 해당 파일 상단에 정의한다.
- API 응답 등 외부 데이터는 반드시 타입을 명시한다.

### React / Next.js

- 컴포넌트는 함수 선언문으로 작성한다: `export default function Component()`.
- `app/` 내 페이지는 최소한의 조합만 담는다. 로직과 UI는 `components/`로 분리한다.
- 서버 컴포넌트를 기본으로 사용한다. 클라이언트 컴포넌트가 필요한 경우에만 `"use client"`를 선언한다.
- `useEffect` 사용을 최소화한다. 서버 컴포넌트나 이벤트 핸들러로 대체할 수 있는지 먼저 검토한다.

### Styling (Tailwind CSS + shadcn/ui)

- 인라인 Tailwind 클래스를 사용한다. 별도 CSS 파일을 만들지 않는다 (`globals.css` 제외).
- shadcn/ui 컴포넌트를 우선 활용한다. 커스텀 컴포넌트는 필요한 경우에만 만든다.
- 클래스가 길어지면 줄바꿈으로 가독성을 확보한다.
- 반응형은 모바일 퍼스트: `base` → `sm` → `md` → `lg` 순서로 작성한다.

### Imports

- 경로는 항상 alias를 사용한다: `@/components/...`, `@/lib/...`.
- 상대 경로(`../`)는 같은 폴더 내에서만 허용한다.

## Git Workflow

- **Branch**: `main`(배포) → `dev`(개발 통합) → `feature/*`(기능별)
- **Commit message**: 영어, 동사 원형으로 시작 (`Add`, `Fix`, `Update`, `Remove`)
- **Commit 단위**: 하나의 논리적 변경 = 하나의 커밋. 여러 작업을 섞지 않는다.

## Quality Checklist

코드 작성 후 반드시 확인:

1. `npm run build` 에러 없이 통과하는가
2. 사용하지 않는 import/변수가 없는가
3. `any` 타입이 없는가
4. 컴포넌트가 단일 책임을 지키는가
5. 네이밍만으로 역할을 이해할 수 있는가
