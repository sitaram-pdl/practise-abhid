

import { FaShoppingCart } from "react-icons/fa";
import {useNavigate } from "react-router-dom";
import { useProductContext } from '@/context/ProductContext';


export default function HeadBar() {
  const {totalCartItems, setCartOpen} = useProductContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-69 right-0 h-16 z-100 px-4 py-4 bg-amber-300 flex justify-between items-center ">
      <h2 className="text-2xl font-semibold">Product</h2>
      <div className="flex items-center gap-6">
      
        <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
          <FaShoppingCart className="text-2xl" />
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {totalCartItems}
            </span>
          )}
        </div>

        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          JO
        </div>
        <button  className="ml-auto bg-red-600 px-2 py-1 rounded text-white"
          onClick={logout}
          >
          Logout
        </button>
      </div>
    </div>
  );
}

