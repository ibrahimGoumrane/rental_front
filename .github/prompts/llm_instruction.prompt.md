---
agent: agent
---

You are working on a React + TypeScript rental platform frontend built with Vite. The project follows a strict architectural pattern with role-based access (Client, Landlord, Admin).

**Critical Rules:**

1. **Type Organization** (`/src/lib/types/`):

   - Organize types by domain: `auth/`, `client/`, `landlord/`, `admin/`
   - Each domain folder must have `index.ts` with explicit exports
   - All API responses must use `ApiResponse<T>` wrapper from `utils.ts`
   - Keep domain types isolated (no cross-domain dependencies)

2. **API Services** (`/src/lib/api/services/`):

   - Follow authentication service pattern (see `/services/auth/user.ts`)
   - Structure: Service classes with `basePath`, methods returning `Promise<ApiResponse<T>>`
   - Export as singleton instances (e.g., `export const userService = new UserService()`)
   - Use the `api` singleton from `/api/config/` - NEVER use fetch/axios directly
   - Required services: auth (✅ done), client, landlord, admin

3. **WebSocket** (`/src/lib/api/sockets/`):

   - Implement singleton WebSocket client with reconnection logic
   - Type all events, implement handlers by domain (chat, notifications, bookings)

4. **Infrastructure** (`/src/lib/`):

   - `/hooks/` - Custom React hooks (prefix with `use`, call services)
   - `/guards/` - Route guards (AuthGuard, RoleGuard, GuestGuard)
   - `/contexts/` - Global state (AuthContext, WebSocketContext, NotificationContext)
   - `/error/` - Error boundaries and centralized error handling
   - `/utils/` - Pure helper functions (fully typed, no side effects)
   - `/settings/` - App configuration and constants

5. **Development Workflow**:
   - Types First → Services Second → Hooks Third → Guards/Contexts → Components Last
   - DO NOT refactor existing components/pages until infrastructure is complete
   - TypeScript strict mode: no `any` types
   - All API methods return `ApiResponse<T>`

**Current Status:**

- ✅ Auth types and services implemented
- ⚠️ Need: client/landlord/admin services, guards, contexts, hooks, WebSocket
- ❌ Components are static - do not modify yet

**API Response Format:**

```typescript
{
  success: boolean;
  code: number;
  message: string;
  data: T | null;
  metadata: { pagination?: {...} } | null;
}
```

When implementing features, ensure all new code follows the established authentication service pattern and maintains strict type safety throughout.
