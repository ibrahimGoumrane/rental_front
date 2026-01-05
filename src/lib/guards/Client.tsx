import { Navigate, Outlet } from "react-router-dom";

export function ClientGuard() {
  // TODO: Replace with actual auth logic
  // const { user, isLoading } = useAuth();

  // Placeholder: Check localStorage for demo purposes
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
