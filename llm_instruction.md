# Rental Front - LLM Workspace Instructions

## Project Architecture Overview

This is a React + TypeScript rental platform frontend built with Vite, featuring role-based access (Client, Landlord, Admin).

## Directory Structure & Standards

### `/src/lib/types/` - Type Definitions

All TypeScript interfaces and types must be organized by domain:

- **`/types/auth/`** - Authentication types (User, Login, Signup)
  - Currently exports: `User`, `SignupRequest`, `LoginRequest`, `LoginResponse`
- **`/types/client/`** - Client-specific types (tenant features)
- **`/types/landlord/`** - Landlord-specific types (property management)
- **`/types/admin/`** - Admin-specific types (system management)
- **`/types/utils.ts`** - Shared utility types
  - Contains `ApiResponse<T>` - Standard API response wrapper with pagination metadata

**Rules:**

- Each domain folder must have an `index.ts` that exports all types
- Use explicit exports: `export type { TypeName } from "./file"`
- All API response types should wrap data in `ApiResponse<T>`
- Keep domain types isolated (no cross-domain dependencies)

### `/src/lib/api/` - API Layer

#### `/api/services/` - Service Modules

All API service logic must follow the authentication service pattern:

**Structure Example (based on auth service):**

```
/api/services/auth/
  ├── index.ts          # Exports all services from this domain
  └── user.ts           # UserService class with methods
```

**Service Class Pattern:**

```typescript
class UserService {
  private readonly basePath = "/auth";

  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return api.post<ApiResponse<LoginResponse>>(
      `${this.basePath}/login`,
      data,
      {
        addAuthHeaders: false,
      }
    );
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return api.getItem<ApiResponse<User>>(`${this.basePath}/me`);
  }
}

export const userService = new UserService();
```

**Key Points:**

- Each service domain has an `index.ts` that exports service instances
- Service classes define a `basePath` for their endpoints
- Methods use the `api` singleton directly (from `/api/config`)
- Services are instantiated and exported as singletons (e.g., `userService`)
- Types are imported from `/lib/types/`, not defined in services

**Required Services:**

- ✅ `auth/` - Authentication (login, signup, logout)
- ⚠️ `client/` - Client operations (search, bookings, ratings)
- ⚠️ `landlord/` - Landlord operations (properties, listings)
- ⚠️ `admin/` - Admin operations (users, moderation)

**Rules:**

- All services use the `api` singleton from `/api/config/`
- Never use `fetch` or `axios` directly in services
- All methods must return `Promise<ApiResponse<T>>`
- Define `basePath` at the class level for endpoint organization
- Handle errors through the API layer, not in services
- Services should be exported as singleton instances (e.g., `const userService = new UserService()`)

#### `/api/sockets/` - WebSocket Communication

All real-time features must be implemented here:

**Planned Features:**

- Real-time chat between clients and landlords
- Live booking notifications
- Property availability updates
- Admin moderation alerts

**Structure:**

```
/api/sockets/
  ├── client.ts         # WebSocket client setup
  ├── events.ts         # Event type definitions
  └── handlers/         # Event handlers by domain
      ├── chat.ts
      ├── notifications.ts
      └── bookings.ts
```

**Rules:**

- WebSocket connection must be singleton
- All events must be strongly typed
- Implement reconnection logic
- Handle connection state (connecting, connected, disconnected)

### `/src/lib/hooks/` - Custom React Hooks

Reusable hooks for state management and side effects:

**Current/Required Hooks:**

- Data fetching hooks (e.g., `useProperties`, `useBookings`)
- Form management hooks
- WebSocket hooks (e.g., `useChat`, `useNotifications`)
- Auth state hooks (e.g., `useAuth`, `useUser`)

**Rules:**

- Prefix all hooks with `use`
- Hooks should be pure and reusable
- API calls should go through `/api/services/`
- Keep business logic minimal in hooks

### `/src/lib/guards/` - Route & Access Guards

Authentication and authorization guards:

**Required Guards:**

- `AuthGuard` - Requires authentication
- `RoleGuard` - Requires specific role (Client/Landlord/Admin)
- `GuestGuard` - Redirect authenticated users

**Implementation Pattern:**

```typescript
interface GuardProps {
  children: React.ReactNode;
  requiredRole?: "client" | "landlord" | "admin";
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<GuardProps> = ({ children, requiredRole }) => {
  // Check user role and render accordingly
};
```

**Rules:**

- Guards wrap protected routes/components
- Use context for user/auth state
- Implement loading states
- Provide clear redirect/fallback logic

### `/src/lib/contexts/` - React Contexts

Global state management:

**Required Contexts:**

- `AuthContext` - User authentication state
- `ThemeContext` - UI theme (if applicable)
- `NotificationContext` - Global notifications/toasts
- `WebSocketContext` - WebSocket connection state

**Rules:**

- Export both Context and Provider
- Provide custom hooks (e.g., `useAuth()`)
- Keep context scope minimal
- Avoid prop drilling

### `/src/lib/error/` - Error Handling

Centralized error handling utilities:

**Required:**

- Error boundary components
- Error type definitions
- Error logging utilities
- User-friendly error messages mapping

### `/src/lib/settings/` - Configuration

Application settings and constants:

**Content:**

- API base URLs (from `.env`)
- Feature flags
- UI constants (pagination limits, etc.)
- Validation rules/constants

### `/src/lib/utils/` - Utility Functions

Pure helper functions:

**Categories:**

- Date/time formatting
- String manipulation
- Validation helpers
- Data transformation
- Currency/number formatting

**Rules:**

- Functions must be pure (no side effects)
- Fully typed with TypeScript
- Well-documented with JSDoc
- Unit testable

## API Communication Standards

### Request/Response Format

All API communication follows this structure:

```typescript
// Request
{
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  params?: Record<string, string>;
}

// Response (wrapped in ApiResponse<T>)
{
  success: boolean;
  code: number;
  message: string;
  data: T | null;
  metadata: {
    pagination?: {
      page: number;
      pageSize: number;
      totalPages: number;
      totalItems: number;
    };
  } | null;
}
```

### Error Handling

- API errors are caught in the abstraction layer
- Services receive typed error responses
- UI components display user-friendly messages
- Errors are logged for debugging

## Current Implementation Status

### ✅ Completed

- `/lib/types/utils.ts` - ApiResponse type
- `/lib/types/auth/` - Auth types structure
- Project scaffolding

### ⚠️ In Progress

- API services (auth implemented, others pending)
- Type definitions (auth done, client/landlord/admin placeholders)

### ❌ Not Started

- WebSocket implementation (`/api/sockets/`)
- Guards (`/lib/guards/`)
- Contexts (`/lib/contexts/`)
- Custom hooks (`/lib/hooks/`)
- Error handling (`/lib/error/`)

## Component & Page Guidelines (Static - Do Not Modify Yet)

### `/src/components/` - Reusable Components

Current components are static UI elements:

- `ChatInterface.tsx`
- `Header.tsx`
- `PropertyCard.tsx`
- `PropertyCarousel.tsx`
- `PropertyDetails.tsx`
- `RatingForm.tsx`
- `VerificationBadge.tsx`

**DO NOT REFACTOR THESE YET** - They will be updated after core infrastructure is complete.

### `/src/pages/` - Route Pages

Page components are static and will be refactored after:

1. All services are implemented
2. Guards are functional
3. Contexts provide state
4. Hooks are available

## Development Workflow

1. **Types First**: Define TypeScript types in `/lib/types/` before implementation
2. **Services Second**: Implement API services using the abstraction layer
3. **Hooks Third**: Create custom hooks that use services
4. **Guards/Contexts**: Set up authentication and state management
5. **Components Last**: Refactor static components to use infrastructure

## Code Quality Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **Imports**: Use absolute imports from `@/` (if configured)
- **Naming**: PascalCase for components/types, camelCase for functions/variables
- **Documentation**: JSDoc for public APIs
- **Testing**: Unit tests for services, hooks, and utilities

## Environment Variables

Configuration files:

- `.env` - Shared variables
- `.env.dev` - Development environment
- `.env.prod` - Production environment

All sensitive config must go through `/lib/settings/` abstraction.

---

**Last Updated**: Current analysis based on workspace structure
**Next Steps**: Implement remaining services, guards, contexts, and hooks following auth pattern
