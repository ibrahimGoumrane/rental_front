// Placeholder auth utilities for demo/testing purposes
// TODO: Replace with actual authentication service

export type UserRole = "client" | "landlord" | "admin";

/**
 * Set user authentication state for demo purposes
 * In production, this will be handled by your auth provider
 */
export function setDemoAuth(role: UserRole | null) {
  if (role) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    console.log(`✅ Demo auth set: ${role}`);
  } else {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    console.log("❌ Demo auth cleared");
  }
}

/**
 * Get current demo user info
 */
export function getDemoAuth() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole") as UserRole | null;

  return {
    isAuthenticated,
    userRole,
  };
}

/**
 * Quick login helpers for testing
 */
export const demoAuth = {
  loginAsClient: () => setDemoAuth("client"),
  loginAsLandlord: () => setDemoAuth("landlord"),
  loginAsAdmin: () => setDemoAuth("admin"),
  logout: () => setDemoAuth(null),
  status: () => {
    const auth = getDemoAuth();
    console.log("Current auth:", auth);
    return auth;
  },
};

// Make it globally available for console testing
if (typeof window !== "undefined") {
  (window as any).demoAuth = demoAuth;
  console.log("💡 Demo auth available: Use window.demoAuth in console");
  console.log("   - demoAuth.loginAsClient()");
  console.log("   - demoAuth.loginAsLandlord()");
  console.log("   - demoAuth.loginAsAdmin()");
  console.log("   - demoAuth.logout()");
  console.log("   - demoAuth.status()");
}
