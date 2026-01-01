/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "react-router-dom";
import { api } from "./api";
// Backend response types for refresh endpoint
interface RefreshResponseItem {
  accessToken: string;
  refreshToken?: string;
}
interface ApiResponse<T> {
  success: boolean;
  code: number;
  data: T;
  metadata?: unknown;
}

const authApi = {
  refreshToken: (refreshToken: string) =>
    api.post<ApiResponse<RefreshResponseItem[]>>(
      "/auth/refresh",
      { refreshToken },
      { addAuthHeaders: false }
    ),
};

// JWT Token management
class TokenManager {
  static getToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  static setToken(token: string): void {
    localStorage.setItem("accessToken", token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  static setRefreshToken(refreshToken: string): void {
    localStorage.setItem("refreshToken", refreshToken);
  }

  static storeAuthData(
    user: any,
    tokens: { accessToken: string; refreshToken?: string }
  ): void {
    if (!tokens?.accessToken) {
      return;
    }

    // Store access token
    localStorage.setItem("accessToken", tokens.accessToken);

    // Store refresh token if present
    if (tokens.refreshToken) {
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }

    // Store user data without tokens
    const userData = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      profilePicture: user.profilePicture,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
  }

  static clearTokens(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  static clearAll(): void {
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  // Decode JWT exp (seconds since epoch)
  static getAccessTokenExpiry(): number | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const [, payload] = token.split(".");
      const json = JSON.parse(
        atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
      );
      return typeof json?.exp === "number" ? json.exp : null;
    } catch {
      return null;
    }
  }

  static willExpireSoon(marginSeconds = 300): boolean {
    const exp = this.getAccessTokenExpiry();
    if (!exp) return true; // treat unknown as expired
    const now = Math.floor(Date.now() / 1000);
    return exp - now <= marginSeconds;
  }
}
// Refresh queue to dedupe concurrent refreshes
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function performRefresh(): Promise<boolean> {
  const rt = TokenManager.getRefreshToken();
  if (!rt) return false;
  try {
    const res = await authApi.refreshToken(rt);
    const item = Array.isArray(res.data) ? res.data[0] : null;
    if (!item?.accessToken) return false;
    TokenManager.setToken(item.accessToken);
    // Backend now does not return new refresh token; keep existing one
    return true;
  } catch (e) {
    console.error("Token refresh failed:", e);
    return false;
  }
}

async function refreshToken(): Promise<boolean> {
  if (isRefreshing && refreshPromise) return refreshPromise;
  isRefreshing = true;
  refreshPromise = performRefresh().finally(() => {
    isRefreshing = false;
    refreshPromise = null;
  });
  return refreshPromise;
}

async function ensureValidAccessToken(silent = false): Promise<string | null> {
  const token = TokenManager.getToken();
  if (!token || TokenManager.willExpireSoon()) {
    const ok = await refreshToken();
    if (!ok) {
      if (silent) {
        return null;
      }
      TokenManager.clearAll();
      redirect("/");
      return null;
    }
  }
  return TokenManager.getToken();
}

// Request interceptor for adding auth headers
async function addAuthHeaders(
  headers: Record<string, string>,
  skipAuthCheck?: boolean
): Promise<Record<string, string>> {
  if (skipAuthCheck) return headers; // avoid infinite loop
  const valid = await ensureValidAccessToken();
  if (valid) headers.Authorization = `Bearer ${valid}`;
  return headers;
}

// Add auth header only if a valid token exists; do not redirect on failure
async function addAuthHeadersOptional(
  headers: Record<string, string>
): Promise<Record<string, string>> {
  const valid = await ensureValidAccessToken(true);
  if (valid) headers.Authorization = `Bearer ${valid}`;
  return headers;
}

// Logout function
export function logout(redirectTo?: string): void {
  // Determine redirect target based on stored userData role if not explicitly provided
  let target = redirectTo;
  if (!target) {
    try {
      const raw = localStorage.getItem("userData");
      if (raw) {
        const parsed = JSON.parse(raw);
        const role: string | undefined = parsed?.role;
        if (role === "RECRUITER") {
          target = "/auth/recruiter-signin";
        } else {
          target = "/auth/signin";
        }
      }
    } catch {
      // Fallback handled below
    }
  }
  // Fallback default if still undefined
  if (!target) target = "/";

  tokenManager.clearAll();
  redirect(target);
}

// Token management exports
export const tokenManager = {
  getToken: TokenManager.getToken,
  setToken: TokenManager.setToken,
  getRefreshToken: TokenManager.getRefreshToken,
  setRefreshToken: TokenManager.setRefreshToken,
  storeAuthData: TokenManager.storeAuthData,
  clearTokens: TokenManager.clearTokens,
  clearAll: TokenManager.clearAll,
  getAccessTokenExpiry: TokenManager.getAccessTokenExpiry,
  willExpireSoon: TokenManager.willExpireSoon,
  addAuthHeaders,
  addAuthHeadersOptional,
  refreshToken,
  ensureValidAccessToken,
  logout,
};
