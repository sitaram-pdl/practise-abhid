


import { NavLink} from "react-router-dom";
import { FaBox, FaShoppingCart, FaUser } from "react-icons/fa";

export default function SideBar() {
 
  return (
    <>
        <aside className="flex flex-col fixed w-64 h-screen justify-center  bg-neutral-400 text-white p-4  ">
          <h1 className="text-2xl font-bold mb-10">Yarsa Test</h1>
          <nav className=" flex flex-col bg-gray-200 text-black p-4  gap-4">
              <NavLink className = {({isActive}) => `flex  items-center gap-2 p-2 ${isActive?"bg-green-500 hover:bg-green-500 text-white": "text-black" } hover:bg-green-200 rounded`}
                to="/products" 
                >
                  <FaBox /> <span>Product</span>
              </NavLink>

              <NavLink  className = {({isActive}) => `flex  items-center gap-2 p-2 ${isActive?"bg-green-500 hover:bg-green-500 text-white": "text-black" } hover:bg-green-200 rounded`}
                to="/cart"
                >
                  <FaShoppingCart /> <span>Cart</span>
              </NavLink>

              <NavLink className = {({isActive}) => `flex  items-center gap-2 p-2 ${isActive?"bg-green-500 hover:bg-green-500 text-white": "text-black" } hover:bg-green-200 rounded`}
                to="/user">
                <FaUser /> <span>User</span>
              </NavLink>
          </nav>
        </aside>
   </>

  );
}













