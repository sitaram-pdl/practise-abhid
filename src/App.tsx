
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/login/Login";

import Products from "./features/dashboard/products/Products";
import Cart from "./features/dashboard/cart/Carts";
import User from "./features/dashboard/user/User";
import ShowSingleProductPage from "@/features/dashboard/products/singleProductPage/ShowSingleProductPage"
import ProtectedLayout from "./routing/privateRoute";
import Layout from "@/routing/Layout";
import { ProductProvider } from "@/context/ProductContext";
import SingleProductPage from "@/features/dashboard/user/SingleUserPage"

import {UserProvider} from "@/context/UserContext"
import { CartProvider } from "./context/CartContext";
import SingleCartPage from "./features/dashboard/cart/SingleCartPage";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <UserProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedLayout />}>
                <Route element={<Layout />}>
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:productID" element={<ShowSingleProductPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/cart/:cartID" element={<SingleCartPage/>} />
                  <Route path="/users" element={<User />} />
                  <Route path="/users/:userID" element={<SingleProductPage />} />
                </Route>
              </Route>
            </Routes>
          </CartProvider>
        </UserProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}
export default App;

