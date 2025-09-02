
import { NavLink} from "react-router-dom";
import { Users, ShoppingCart, Box } from 'lucide-react';
import { ArrowBigRight } from 'lucide-react';
export default function SideBar() {
 
  return (
    <>
        <aside className="flex flex-col fixed  w-64 h-full justify-center  bg-neutral-100 p-4  ">
          <h1 className="text-3xl text-center text-orange-600 font-bold mb-10  
           drop-shadow-[0.1rem_0.1rem_0rem_#555]">Yarsa Test</h1>
          
          <nav className=" flex flex-col  text-black p-4  gap-4">

              <NavLink className =  {({isActive}) => `flex  items-center gap-2 p-2 ${isActive?"bg-green-500 font-bold text-white active: translate-x-[0.30rem] active:translate-y-1 active:shadow-none  ": "text-white bg-gray-400 font-bold shadow-[0.30rem_0.25rem_0.24rem_rgba(10,10,10,0.5)] " }  rounded `}
                to="/products" 
                >
                    {({ isActive }) => (
                                <>
                                  <Box /> 
                                  <span>Product</span>
                                  {isActive && <ArrowBigRight className="ml-auto" />}
                                </>
                              )}
              </NavLink>

              <NavLink  className = {({isActive}) => `flex  items-center gap-2 p-2 ${isActive?"bg-green-500 font-bold text-white active: translate-x-[0.30rem] active:translate-y-1 active:shadow-none ": "text-white bg-gray-400 font-bold shadow-[0.30rem_0.25rem_0.24rem_rgba(10,10,10,0.5)] " }  rounded `}
                to="/cart"
                state={{ title: "My Cart Items" }} // Optional custom title, for route title synchronization on  HeadBar.
                >
                  {({ isActive }) => (
                            <>
                              <ShoppingCart /> 
                              <span>Cart</span>
                              {isActive && <ArrowBigRight className="ml-auto" />}
                            </>
                          )}
              </NavLink>

              <NavLink className =  {({isActive}) => `flex  items-center gap-2 p-2 ${isActive?"bg-green-500 font-bold text-white active: translate-x-[0.30rem] active:translate-y-1 active:shadow-none ": "text-white bg-gray-400 font-bold shadow-[0.30rem_0.25rem_0.24rem_rgba(10,10,10,0.5)] " }  rounded `}
                to="/users">
                 {({ isActive }) => (
                            <>
                              <Users /> 
                              <span>User</span>
                              {isActive && <ArrowBigRight className="ml-auto" />}
                            </>
                          )}
              </NavLink>
          </nav>
        </aside>
   </>

  );
}







 





