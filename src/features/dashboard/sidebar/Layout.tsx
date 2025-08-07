


import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/user">User</NavLink>
        <button onClick={logout} className="ml-auto bg-red-600 px-2 py-1 rounded">
          Logout
        </button>
      </nav>
      <Outlet />
    </>
  );
}
