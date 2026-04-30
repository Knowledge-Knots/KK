# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- `artifacts/api-server` — Express 5 API server (template; no Knowledge Knots routes use it)
- `artifacts/mockup-sandbox` — Vite component preview server for canvas
- `artifacts/knowledge-knots` — **Knowledge Knots**, a kids' educational web app (React + Vite + Tailwind v4 + react-router-dom). Imported from a Base44 export. Self-contained: progress is persisted in `localStorage`, no backend required. Lives at `/`.
  - Subjects: ELA, Math, Science, Social Studies & History (~564 lessons across grades K–12)
  - Activities: drag-sort, drag-label, sequence, matching, click-identify, highlight, journal
  - Brand colors and Fredoka One / Nunito fonts wired up via custom utilities in `src/index.css`
  - Inline SVG `KKCharacter` components replace the broken external character image URLs from the original export
