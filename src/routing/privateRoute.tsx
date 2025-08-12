



import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedLayout;

// <Navigate to="/" /> means goto login page again.

// another way of doing it..............................................

// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const isAuthenticated = !!localStorage.getItem("token");
//   return isAuthenticated ? children : <Navigate to="/" replace />;
// };
// export default PrivateRoute;

