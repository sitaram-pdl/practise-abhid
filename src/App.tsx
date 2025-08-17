
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/login/Login";
import Products from "./features/dashboard/products/Products";
import Cart from "./features/dashboard/cart/Cart";
import User from "./features/dashboard/user/User";
import ShowSingleProductPage from "@/features/dashboard/products/singleProductPage/ShowSingleProductPage"
import ProtectedLayout from "./routing/privateRoute";
import Layout from "@/routing/Layout";
import { ProductProvider } from "@/context/ProductContext";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedLayout />}>
            <Route element={<Layout />}>
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productID" element={<ShowSingleProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/user" element={<User />} />
            </Route>
          </Route>
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}
export default App;
