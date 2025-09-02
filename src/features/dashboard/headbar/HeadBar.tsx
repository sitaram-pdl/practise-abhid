

import { ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import { useProductContext } from '@/context/ProductContext';
import CartDrawer from "./CartDrawer";

const RouteTitles: Record<string, string> = {
  '/products': 'Available Products',
  '/cart': 'Shopping Cart',
  '/users': 'User Profile',
};
export default function HeadBar() {
  const {totalCartsQuantity, setCartOpen, } = useProductContext();
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    if (location.state?.title) return location.state.title;
    if (RouteTitles[location.pathname]) return RouteTitles[location.pathname];
    return 'Dashboard';
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="fixed top-0 left-69 right-0 h-17 z-10 px-4 py-4  bg-neutral-100 flex justify-between items-center border ">
        <h2 className="pl-2 text-3xl  text-blue-900  font-bold  
           drop-shadow-[0.1rem_0.1rem_0rem_#555] ">
            {getPageTitle()}</h2>
        <div className="flex items-center gap-6">
        
          <div className="relative cursor-pointer"
            onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="text-2xl text-blue-700" />
              {totalCartsQuantity > 0 
                ? (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                      {totalCartsQuantity}
                    </span>
                  )
                : ( <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                      {0}
                    </span> )
            }
            </div>

            <div className="w-10 h-10 text-blue-700 rounded-full bg-gray-200 flex items-center justify-center">
              JO
            </div>
            <button  className="ml-auto bg-red-400 hover:bg-red-500 px-2 py-1 rounded text-bold text-white"
              onClick={logout}
              >
              Logout
            </button>
        </div>
      </div>
       <CartDrawer />
    </>
  );
}


