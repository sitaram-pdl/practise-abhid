

import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useProductContext } from '@/context/ProductContext';
import CartDrawer from "./CartDrawer";

const RouteTitles: Record<string, string> = {
  '/products': 'Available Products',
  '/cart': 'Shopping Cart',
  '/user': 'User Profile',
};
export default function HeadBar() {

    const { totalCartItems, setCartOpen, } = useProductContext();

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
      <div className="fixed top-0 left-69 right-0 h-16 z-10 px-4 py-4 bg-amber-300 flex justify-between items-center ">
        <h2 className="text-2xl font-semibold">{getPageTitle()}</h2>
        <div className="flex items-center gap-6">
        
          <div className="relative cursor-pointer"
          onClick={() => setCartOpen(true)}
          >
            
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
       {/* call  CartDrawer component from moved the header */}
       <CartDrawer />
    </>
  );
}




/*

import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useProductContext } from '@/context/ProductContext';

// Route to title mapping (can be moved to a separate config file if needed)
// { [key: string]: string }
const RouteTitles: Record<string, string> = {
  '/products': 'Available Products',
  '/cart': 'Shopping Cart',
  '/user': 'User Profile',
  // Add more routes as needed..
};

export default function HeadBar() {
  const { totalCartItems, setCartOpen } = useProductContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Get title from route state or predefined mapping
  const getPageTitle = () => {
    // First check for state title (passed during navigation)
    if (location.state?.title) return location.state.title;
    
    // Then check predefined route mapping
    if (RouteTitles[location.pathname]) return RouteTitles[location.pathname];
    
    // Default fallback
    return 'Dashboard';
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-69 right-0 h-16 z-100 px-4 py-4 bg-amber-300 flex justify-between items-center ">
      <h2 className="text-2xl font-semibold">{getPageTitle()}</h2>
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
*/



/*
// Alternative way to use the dynamic heading...............................

import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useProductContext } from '@/context/ProductContext';


export default function HeadBar() {
  const {totalCartItems, setCartOpen} = useProductContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Map route paths to display names.....
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/products':
        return 'Products';
      case '/cart':
        return 'Shopping Cart';
      case '/user':
        return 'User Profile';
      default:
        return 'Dashboard';
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-69 right-0 h-16 z-100 px-4 py-4 bg-amber-300 flex justify-between items-center ">
      <h2 className="text-2xl font-semibold">{getPageTitle()}</h2>
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

*/