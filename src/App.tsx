
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/login/Login";
import Products from "./features/dashboard/products/Products";
import Cart from "./features/dashboard/cart/Cart";
import User from "./features/dashboard/user/User";
import ProtectedLayout from "./routing/privateRoute"
import LayoutSidebar from "@/routing/LayoutSidebar"

function App() {
  return (
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />

    <Route element={<ProtectedLayout />}>
      <Route element={<LayoutSidebar />}>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
      </Route>
    </Route>
  </Routes>
</BrowserRouter>

  );
}
export default App;


// alternative way.........................

/*
<Route
  element={
    <PrivateRoute>
      <Layout />
    </PrivateRoute>
  }
>
  <Route path="/products" element={<Products />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/user" element={<User />} />
</Route>

*/

