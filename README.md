# Task Manager Frontend

A modern, modular, and scalable task management web application built with React, Vite, Zustand, and TailwindCSS.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Folder Highlights](#folder-highlights)
- [UI Overview](#ui-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication:** Secure login and sign-in flows.
- **Task Management:** Create, update, assign, filter, and track tasks with progress indicators.
- **Dashboard:** Visualize task status and progress with charts and summary cards.
- **User & Team Management:** Manage users, assign tasks, and view team members.
- **Modular Architecture:** Each feature is encapsulated in its own module for scalability and maintainability.
- **Responsive UI:** Clean, modern, and mobile-friendly interface.
- **Reusable Components:** UI elements and layouts for rapid development.

## Tech Stack

- **React 19** – UI library
- **Vite** – Fast development/build tool
- **Zustand** – State management
- **TailwindCSS** – Utility-first CSS framework
- **TypeScript** – Type safety
- **Axios** – HTTP client for API requests
- **Lucide React** – Icon library
- **ESLint** – Linting and code quality

## Project Structure

```
src/
│   index.tsx
│   main.tsx
│
├── app/
│   ├── App.tsx
│   ├── providers.tsx
│   ├── routes.tsx
│   └── store.ts
│
├── assets/
│   ├── icons/
│   │   ├── Eye.tsx
│   │   └── Eye_corssed.tsx
│   ├── images/
│   │   └── login_side_panel.jpg
│   └── styles/
│       ├── globals.css
│       └── variables.css
│
├── components/
│   ├── charts/
│   │   ├── Bars.tsx
│   │   ├── Donut.tsx
│   │   └── VerticalBars.tsx
│   ├── dashboard/
│   │   └── TasksStatusCard.tsx
│   ├── layout/
│   │   └── SidebarNavigation.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── Sidebar.tsx
│       ├── ToastProvider.tsx
│       └── TopBar.tsx
│
├── hooks/
│   └── useTheme.ts
│
├── layouts/
│   └── AppShellLayout.tsx
│
├── modules/
│   ├── Admin/
│   │   ├── components/
│   │   └── pages/
│   │       └── DashboardPage.tsx
│   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   └── SigninPage.tsx
│   │   ├── services/
│   │   │   └── auth.api.ts
│   │   └── state/
│   │       └── auth.store.ts
│   ├── ManageTasks/
│   │   ├── components/
│   │   │   └── TaskFilters.tsx
│   │   ├── hooks/
│   │   │   └── useManageTasks.ts
│   │   ├── layout/
│   │   │   └── TaskGrid.tsx
│   │   └── pages/
│   │       └── ManageTasksPage.tsx
│   ├── TaskForm/
│   │   ├── TaskFormContainer.tsx
│   │   ├── components/
│   │   │   ├── TaskAssignees.tsx
│   │   │   ├── TaskAttachments.tsx
│   │   │   ├── TaskDescriptionInput.tsx
│   │   │   ├── TaskDueDateInput.tsx
│   │   │   ├── TaskPrioritySelect.tsx
│   │   │   ├── TaskTitleInput.tsx
│   │   │   └── TaskTodoList.tsx
│   │   └── hooks/
│   │       ├── useAssignees.ts
│   │       ├── useAttachments.ts
│   │       ├── useTaskForm.ts
│   │       └── useTodoList.ts
│   ├── Tasks/
│   │   ├── components/
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskDetails.tsx
│   │   │   ├── TaskListTable.tsx
│   │   │   └── UpdateTaskForm.tsx
│   │   ├── hooks/
│   │   │   └── useCreateTask.ts
│   │   ├── pages/
│   │   │   ├── CreateTaskPage.tsx
│   │   │   └── TasksPage.tsx
│   │   ├── services/
│   │   │   ├── priority.api.ts
│   │   │   ├── status.api.ts
│   │   │   └── tasks.api.ts
│   │   └── state/
│   │       ├── priority.store.ts
│   │       ├── status.store.ts
│   │       └── tasks.store.ts
│   └── Users/
│       ├── components/
│       │   ├── Avatar.tsx
│       │   ├── SelectUsersModal.tsx
│       │   ├── SidebarUserProfile.tsx
│       │   └── TeamMemberCard.tsx
│       ├── pages/
│       │   ├── EditUserModal.tsx
│       │   ├── EditUserPage.tsx
│       │   └── TeamMembersPage.tsx
│       ├── services/
│       │   └── users.api.ts
│       └── state/
│           └── users.store.ts
│
├── services/
│   └── api.ts
│
└── utils/
		└── types/
				└── Task.ts
```

### Folder and File Explanations

- **index.tsx / main.tsx**: Entry points for the React app. They initialize the root component and global styles.

- **app/**: Main application logic, providers, routing, and global state setup.
	- `App.tsx`: Main app component.
	- `providers.tsx`: Context providers (theme, state, etc.).
	- `routes.tsx`: Route definitions.
	- `store.ts`: Zustand or other global state setup.

- **assets/**: Static assets for the app.
	- `icons/`: SVG/React icon components.
	- `images/`: Static images (e.g., login illustration).
	- `styles/`: Global and variable CSS files.

- **components/**: Reusable UI and layout components.
	- `charts/`: Chart components for analytics.
	- `dashboard/`: Dashboard-specific UI (e.g., status cards).
	- `layout/`: Layout-related components (e.g., sidebar navigation).
	- `ui/`: Common UI elements (Button, Input, Modal, Sidebar, ToastProvider, TopBar).

- **hooks/**: Custom React hooks (e.g., theme management).

- **layouts/**: Layout wrappers for the app (e.g., AppShellLayout).

- **modules/**: Feature-based organization. Each module contains its own components, pages, services, and state:
	- `Admin/`: Admin dashboard and pages.
	- `auth/`: Authentication (login, sign-in), API, and state.
	- `ManageTasks/`: Task filtering, grid, and management.
	- `TaskForm/`: Task creation/editing form, subcomponents, and hooks.
	- `Tasks/`: Task list, details, update forms, and related API/state logic.
	- `Users/`: User management, team member cards, user modals, and user-related API/state.

- **services/**: Centralized API configuration (e.g., Axios instance).

- **utils/**: Utility types and helpers (e.g., TypeScript types for tasks).

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

### Build

```bash
npm run build
# or
yarn build
```

### Lint

```bash
npm run lint
# or
yarn lint
```

### Preview

```bash
npm run preview
# or
yarn preview
```

## Available Scripts

- `dev` – Start development server
- `build` – Build for production
- `lint` – Lint codebase
- `preview` – Preview production build

## Folder Highlights

- `modules/` – Each feature (Tasks, Users, Auth, etc.) is organized in its own module with components, pages, services, and state.
- `components/ui/` – Common UI elements (Button, Input, Modal, Sidebar, ToastProvider, TopBar).
- `components/charts/` – Chart components for dashboard analytics.
- `services/api.ts` – Centralized API configuration.
- `utils/types/Task.ts` – TypeScript types for tasks.

## UI Overview

The application features a clean, modern UI with:

- **Task Cards:** Show task status, priority, assignees, progress bar, and key dates.
- **Dashboard:** Visual charts (bar, donut, vertical bars) for task analytics.
- **User Avatars:** Display assigned users and team members.
- **Modals:** For editing, assigning, and managing tasks and users.
- **Sidebar & TopBar:** For navigation and quick access.

### Example UI Layout

```
┌─────────────────────────────────────────────┐
│ [Sidebar]   [TopBar]                       │
│ ┌───────────────┐ ┌──────────────────────┐ │
│ │ Task Card     │ │ Task Card           │ │
│ │ (with users,  │ │ (with progress bar) │ │
│ │ status, dates)│ └──────────────────────┘ │
│ └───────────────┘                          │
│        ...                                 │
└─────────────────────────────────────────────┘
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
