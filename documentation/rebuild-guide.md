# Frontend Rebuild Guide

This document describes the current frontend implementation so it can be recreated or rebuilt with the same structure and behavior.

## Goal

The frontend is a small React application that uses:

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- Axios

It is organized by feature/module rather than by technical layer alone. The current app focuses on authentication and task loading.

## Runtime Flow

1. `src/main.tsx` mounts the app into `#root`.
2. `src/app/App.tsx` wraps the app with `AppProviders` and `AppRoutes`.
3. `src/app/providers.tsx` hydrates the auth store on startup.
4. `src/app/routes.tsx` decides whether to show the login page or the tasks page.
5. `src/services/api.ts` provides the shared Axios client for all backend calls.

## File Structure

The current frontend source tree is:

```txt
src/
├── app/
│   ├── App.tsx
│   ├── providers.tsx
│   └── routes.tsx
├── modules/
│   ├── auth/
│   │   ├── pages/LoginPage.tsx
│   │   ├── services/auth.api.ts
│   │   └── state/auth.store.ts
│   └── Tasks/
│       ├── pages/TasksPage.tsx
│       ├── services/tasks.api.ts
│       └── state/tasks.store.ts
├── services/
│   └── api.ts
├── index.css
└── main.tsx
```

The app currently uses two feature modules:

- `auth` for sign-in, token hydration, and logout
- `Tasks` for loading and showing tasks from the API

## App Shell

### `src/main.tsx`

This is the Vite entrypoint. It imports `index.css`, renders `App`, and mounts to the DOM root.

### `src/app/App.tsx`

This component is the top-level composition point. It currently only wires providers and routing.

### `src/app/providers.tsx`

This file hydrates the auth store on app startup by calling `useAuthStore().hydrate()` inside `useEffect`.

There is no React context provider required for Zustand.

### `src/app/routes.tsx`

This file defines the full navigation model:

- `/login` shows the login page
- `/tasks` shows the protected task page
- any other route redirects to `/tasks`

The `ProtectedRoute` checks:

- `accessToken` from the auth store
- `isHydrating` while the app is restoring session state

If the app is still hydrating, it shows a loading message.
If there is no access token, it redirects to `/login`.

## Authentication Flow

### API layer

`src/modules/auth/services/auth.api.ts` exposes three calls:

- `login(email, password)` -> `POST /api/auth/login`
- `refresh(refreshToken)` -> `POST /api/auth/refresh`
- `logout()` -> `POST /api/auth/logout`

### Auth store

`src/modules/auth/state/auth.store.ts` is the main auth state container. It keeps:

- `user`
- `accessToken`
- `refreshToken`
- `isHydrating`

It exposes these actions:

- `login`
- `refresh`
- `logout`
- `hydrate`

Behavior:

- Login saves the user, access token, and refresh token.
- Refresh uses the stored refresh token to obtain new tokens.
- Logout clears local auth state and removes the stored refresh token from `localStorage`.
- Hydrate attempts a refresh on startup if a refresh token exists.

### Token strategy

- `accessToken` lives in Zustand memory.
- `refreshToken` is persisted in `localStorage` under `refresh_token`.

This means a page reload can restore the session if the refresh token is still valid.

## Shared API Client

`src/services/api.ts` creates the shared Axios instance.

It does two important things:

1. Adds `Authorization: Bearer <accessToken>` to requests when a token exists.
2. Automatically retries a request after a 401 by refreshing the session.

If refresh fails, the store logs the user out.

The client reads its base URL from `import.meta.env.VITE_API_URL`.

## Tasks Flow

### API layer

`src/modules/Tasks/services/tasks.api.ts` exposes:

- `getAll()` -> `GET /api/tasks`

It returns task objects shaped like:

```ts
type TaskDto = {
  id: number;
  title: string;
  description: string | null;
  priority_id: number;
  status_id: number;
  due_date: string | null;
  created_at: string | null;
  updated_at: string | null;
};
```

### Task store

`src/modules/Tasks/state/tasks.store.ts` keeps:

- `tasks`
- `loading`
- `error`

It exposes `loadTasks()` which fetches all tasks and stores either the data or an error message.

### Tasks page

`src/modules/Tasks/pages/TasksPage.tsx`:

- loads tasks on mount
- shows a logout button
- renders a simple task list
- shows loading and error states

## Login Page Behavior

`src/modules/auth/pages/LoginPage.tsx`:

- provides a basic email/password form
- submits credentials through the auth store
- redirects to `/tasks` after login
- redirects away if a token already exists

The current UI is intentionally minimal and uses inline styles.

## Rebuild Steps

If you want to recreate this frontend from scratch, follow this order:

1. Create a Vite React + TypeScript app.
2. Install `axios`, `zustand`, and `react-router`.
3. Add `VITE_API_URL` to the environment.
4. Build the shared Axios client in `src/services/api.ts`.
5. Create the auth store with login, refresh, logout, and hydrate behavior.
6. Add the protected routes and route redirect logic.
7. Add the login page and task list page.
8. Wire the app through `main.tsx`, `App.tsx`, and `providers.tsx`.
9. Verify that login, refresh, protected routing, and task loading all work against the backend.

## Commands

From the `frontend/` folder:

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Notes For Reimplementation

- Keep the API paths prefixed with `/api/...`.
- Preserve the refresh-token hydration flow, or protected routes will fail after reload.
- Keep the Axios interceptor logic in one shared client so auth is handled consistently.
- The current app is small, so a heavy global state setup is unnecessary.

## Current Limitations

- Styling is minimal and mostly inline.
- `index.css` is currently empty.
- There is no dedicated layout system yet.
- The task page only reads and displays tasks; it does not create, edit, or delete them.
