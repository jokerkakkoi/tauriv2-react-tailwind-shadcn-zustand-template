# Tauri React Starter

A production-minded desktop application starter built with Tauri v2, React, TypeScript, Tailwind CSS v4, shadcn/ui, and Zustand.

## Tech Stack

- Tauri v2
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui
- Zustand
- ESLint
- Prettier

## Requirements

- Node.js
- pnpm
- Rust
- Tauri system dependencies for your platform

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the web dev server:

```bash
pnpm dev
```

Start the Tauri app in development mode:

```bash
pnpm tauri:dev
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm typecheck
pnpm lint
pnpm format
pnpm format:check
pnpm tauri:dev
pnpm tauri:build
```

## Project Structure

```text
src/
  assets/styles/       Global Tailwind and theme styles
  components/base/     Base app-level components
  components/ui/       shadcn/ui components
  config/              Application metadata and runtime config
  lib/                 Shared utilities
  utils/               Browser and WebView helpers
src-tauri/
  capabilities/        Tauri permission configuration
  src/                 Rust application entrypoints
```

## Adding shadcn/ui Components

The shadcn configuration points to `src/assets/styles/app.css` and uses the `@/*` path alias.

```bash
pnpm dlx shadcn@latest add button
```

## Security Notes

- Tauri capabilities are intentionally minimal by default.
- The default Content Security Policy is restrictive and should be expanded only for required domains.
- WebView shortcuts are disabled only in production builds.

## Build

Create a production frontend build:

```bash
pnpm build
```

Create a Tauri bundle:

```bash
pnpm tauri:build
```
