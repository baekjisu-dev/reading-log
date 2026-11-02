# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

독서 기록(reading-log) 웹 앱. Vite 템플릿(React 19 + TypeScript)으로 시작한 초기 단계이며, 런타임 의존성은 `react`, `react-dom`뿐이다(라우터·상태관리·백엔드 없음). UI 문구는 한국어로 작성한다.

## 명령어

```bash
npm run dev       # 개발 서버 (HMR, 기본 http://localhost:5173)
npm run build     # tsc -b 타입 검사 후 vite build → dist/  (타입 에러가 있으면 빌드 실패)
npm run lint      # eslint .
npm run preview   # 빌드된 dist/ 미리보기
npx tsc -b        # 빌드 없이 타입 검사만
```

테스트 러너는 아직 설정되어 있지 않다. 변경 검증은 `npx tsc -b`와 `npm run lint`로 한다.

## 구조

- 진입 흐름: `index.html` → `src/main.tsx`(전역 `index.css` 로드, `#root`에 `<App />`을 `StrictMode`로 렌더) → `src/App.tsx`.
- `public/`은 가공 없이 루트 경로로 서빙된다(`/favicon.svg`, `/icons.svg` SVG 스프라이트). `src/assets/`는 import해서 쓰는 리소스다.
- TypeScript는 프로젝트 참조 구조: `tsconfig.app.json`은 `src/`(브라우저), `tsconfig.node.json`은 `vite.config.ts`(Node)를 담당한다.

## 주의할 컴파일러/린트 설정

- `verbatimModuleSyntax`: 타입만 가져올 때는 `import type`을 써야 한다.
- `erasableSyntaxOnly`: `enum`, `namespace`, 생성자 parameter property 사용 불가 → 유니언 리터럴 타입 등으로 대체.
- `noUnusedLocals` / `noUnusedParameters`: 미사용 변수·매개변수는 타입 에러(=빌드 실패).
- `allowImportingTsExtensions`: 기존 코드는 `./App.tsx`처럼 확장자를 붙여 import한다.
- `eslint-plugin-react-refresh`: 컴포넌트 파일은 컴포넌트만 export해야 HMR이 유지된다(훅·상수는 별도 파일로).

## 스타일

- 전역 스타일과 색상 변수(`--text`, `--text-h`, `--bg`, `--border`, `--accent` 등, 다크 모드 대응 포함)는 `src/index.css`에 있다. 새 스타일은 이 변수를 재사용한다.
- `#root`는 `width: 1126px; max-width: 100%`, `display: flex; flex-direction: column`, `text-align: center`, `min-height: 100svh`로 잡혀 있어 레이아웃에 영향을 준다.
- `src/App.css`와 `src/assets/`의 이미지들은 Vite 템플릿 잔재로 현재 사용되지 않는다.

## Git

- 기본(PR 대상) 브랜치는 `main`이다. 작업은 `feat/...` 같은 브랜치를 만들어 하고 `main`으로 PR을 연다.
- 커밋 메시지는 `chore: ...` 같은 Conventional Commits 접두어 + 한국어 설명 형식을 쓴다.

## 명령어

- 개발 서버: npm run dev
- 타입 체크: npx tsc -b (루트 tsconfig는 참조만 있어서 `npx tsc --noEmit`은 아무 파일도 검사하지 않음)
- 린트: npm run lint

## 구조

- src/types: 도메인 타입
- src/lib: 저장소, 유틸 (컴포넌트에서 localStorage 직접 접근 금지)
- src/stores: Zustand 스토어
- src/components: UI 컴포넌트, 파일 하나에 컴포넌트 하나

## 규칙

- 상태는 Zustand, 컴포넌트 내부 UI 상태만 useState
- 필터·정렬 같은 공유 상태는 Zustand
- any 금지, props 타입은 컴포넌트 파일 안에 type으로 선언
- 작업을 끝내기 전에 반드시 타입 체크와 린트를 돌릴 것
