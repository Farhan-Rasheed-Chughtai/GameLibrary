# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GameLibrary is a full-stack web application for managing a personal game library. It consists of:
- **Backend**: ASP.NET Core 8.0 Web API with Entity Framework Core and PostgreSQL
- **Frontend**: React 19 SPA with TypeScript, Vite, TailwindCSS, and React Router

## Development Commands

### Backend (.NET Core)

Located in `BackEndDotNetCore/`

```bash
# Run the backend API (automatically applies migrations on startup)
cd BackEndDotNetCore
dotnet run

# Create a new migration
dotnet ef migrations add <MigrationName>

# Apply migrations manually
dotnet ef database update

# Build the project
dotnet build

# Restore dependencies
dotnet restore
```

The backend runs on HTTPS and serves Swagger UI at the root path (`/`) in development mode.

### Frontend (React)

Located in `FrontEndReact/`

```bash
# Install dependencies
cd FrontEndReact
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Backend Structure

**Program.cs**: Main entry point that:
- Configures EF Core with PostgreSQL connection
- Automatically runs migrations on startup (`db.Database.Migrate()`)
- Enables Swagger UI at root path in development
- Registers controllers and dependency injection services

**Database Layer** (`Database/`):
- `GameLibraryDbContext`: EF Core DbContext with `Users` and `Games` DbSets
- Many-to-many relationship between Users and Games
- Unique index on User.Email

**Data Models** (`DataModels/`):
- `User`: Id, Name, Email, Games collection
- `Game`: Id, Name, Genre, Users collection
- `LoginRequest`: Email, Password (for login endpoint)
- `SignUpRequest`: Email, Password (for registration endpoint)

**Controllers** (`Controllers/`):
- `UserController`: Handles `/User/login` and `/User/register` endpoints
- Currently uses placeholder authentication (not production-ready)
- TODO items indicate JWT token implementation is pending

**Migrations** (`Migrations/`):
- Entity Framework Core migrations
- Initial migration creates Users and Games tables with many-to-many relationship

### Frontend Structure

**Main Entry** (`src/main.tsx`):
- Wraps App with `AuthProvider` for authentication state management

**Routing** (`src/App.tsx`):
- `/` and `/Login` → Login page
- `/Signup` → Signup page
- `/GameLibrary` → Game library (protected route)
- Unknown routes redirect to login

**Authentication**:
- `AuthContext.tsx`: Simple boolean-based auth state (login/logout/isLoggedIn)
- `ProtectedRoute.tsx`: Route guard that redirects to login if not authenticated
- Currently stores auth state in memory only (no persistence)

**Pages**:
- `login.tsx`: Login form
- `SignUp.tsx`: Registration form
- `GameLibrary.tsx`: Main game library view

**UI Components** (`src/components/ui/`):
- Reusable shadcn/ui components: button, card, input
- Uses class-variance-authority and tailwind-merge for styling

**Utilities** (`src/lib/`):
- `utils.ts`: Contains `cn()` helper for merging Tailwind classes

### Database Configuration

PostgreSQL connection configured in `BackEndDotNetCore/appsettings.Development.json`:
- Host: localhost
- Port: 5432
- Database: GameLibrary
- Username: postgres
- Password: postgres

**Important**: Ensure PostgreSQL is running before starting the backend. The application will auto-create the database and apply migrations on startup.

### Key Patterns

**Backend**:
- Controllers use attribute routing (`[Route("[controller]")]`)
- Model validation uses DataAnnotations
- Custom `ValidationProblemResponse()` method formats validation errors consistently
- All auth endpoints are marked `[AllowAnonymous]`

**Frontend**:
- Path alias `@/` points to `src/` directory (configured in vite.config.ts)
- Protected routes use `ProtectedRoute` wrapper component
- Authentication managed through React Context API
- UI components follow shadcn/ui conventions

## Known TODOs

The codebase contains placeholder implementations that need to be replaced:

**Backend**:
- `UserController.Login()`: Replace hardcoded credential check with database validation
- `UserController.Login()`: Implement real JWT token generation
- `UserController.Register()`: Add email existence check against database
- `UserController.Register()`: Implement password hashing and user persistence

**Frontend**:
- `AuthContext`: Add token storage and persistence (localStorage/sessionStorage)
- Authentication: Integrate with backend JWT tokens
- Protected routes: Verify token validity with backend
