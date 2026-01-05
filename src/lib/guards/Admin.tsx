import { Navigate, Outlet } from "react-router-dom";

export function AdminGuard() {
  // TODO: Replace with actual auth logic
  // const { user, isLoading } = useAuth();

  // Placeholder: Check localStorage for demo purposes
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
