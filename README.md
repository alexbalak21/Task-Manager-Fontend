# Task Manager Frontend

## Overview
Task Manager Frontend is a modern web application for managing tasks, teams, and workflows. It provides dashboards, user roles (admin, worker), and intuitive UI components for efficient project and task management.

## Features
- User authentication (login, sign-in)
- Task creation, update, and tracking
- Team management and user assignment
- Dashboard with charts and task status
- Responsive and clean UI
- Modular code structure with reusable components

## Project Structure
```
src/
	app/           # App entry, providers, routes
	assets/        # Icons, images, global styles
	components/    # Reusable UI and layout components
	hooks/         # Custom React hooks
	layouts/       # Layout components
	modules/       # Feature modules (Admin, Auth, Tasks, Users)
	services/      # API and service logic
	utils/         # Utility types and helpers
```

## Getting Started
### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
git clone <repository-url>
cd task-manager-frontend
npm install
# or
yarn install
```

### Running the App
```bash
npm run dev
# or
yarn dev
```
The app will be available at `http://localhost:5173` (default Vite port).

## Usage
1. **Login** with your credentials.
2. **View Dashboard** for an overview of tasks and team status.
3. **Create/Manage Tasks** using the Tasks module.
4. **Assign Users** to tasks and manage team members.
5. **Track Progress** with visual charts and status cards.

## Scripts
- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
