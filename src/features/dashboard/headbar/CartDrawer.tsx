

import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useProductContext } from "@/context/ProductContext";

export default function CartDrawer() {

   const { cartItems, isCartOpen, setCartOpen, increaseQuantity, decreaseQuantity, removeCartItem, clearCart,
   } = useProductContext();

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * (item.quantity || 0)),
    0
  );

  return (

    <div className= "z-101">
        {/* Overlay................................. */}
        {/* if isCartOpen state is true open the cart. and onclick just close the cart */}
        {isCartOpen && (
          <div
            className="fixed inset-0 bg-gray-200 z-40"
            onClick={() => setCartOpen(false)}
          />
        )}
        {/* Drawer .....................................*/}
        <div
            className={`fixed right-0 top-0  h-full w-150 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
              isCartOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
              <div className="flex justify-between items-center border-b p-4">
                  <h2 className="text-lg font-bold">
                      Your Cart ({cartItems.length} items)
                  </h2>
                  <button className="text-gray-500 hover:text-black"
                    onClick={() => setCartOpen(false)} 
                  >
                      ✖
                  </button>
              </div>

              {/* Cart items...................................... */}
              <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-150px)]">

                    {cartItems.length === 0 && (
                      <p className="text-gray-500">Your cart is empty.</p>
                    )}

                    {cartItems.map((item) => (
                      // this below div is for single horizontal product.
                      <div key={item.id} className="flex items-center gap-3 border-b pb-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 object-cover"
                          />

                          <div className="w-1/2 overflow-y-auto">
                            <div className="font-medium truncate">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.category}</div>
                            <div className="text-sm font-semibold">${item.price}</div>
                          </div>

                          {/* Quantity Controls.............................................. */}
                          <div className="flex items-center border px-2 py-1 rounded">
                              <button onClick={() => decreaseQuantity(item.id)}>
                                <FaMinus />
                              </button>
                              <span className="px-2">{item.quantity}</span>
                              <button onClick={() => increaseQuantity(item.id)}>
                                <FaPlus />
                              </button>
                          </div>

                          <button
                                onClick={() => removeCartItem(item.id)}
                                className="text-red-500 hover:text-red-700 hover:cursor-pointer ml-5"
                              >
                                <FaTrash />
                          </button>
                      </div>
                    ))}
              </div>
              {/* Footer.............................................................. */}
              <div className="p-4 border-t">
              
                  <div className="flex justify-between items-center gap-2">
                      <button
                          className="w-fit px-4 py-2 bg-red-600 text-white  rounded hover:bg-red-700"
                          onClick={clearCart}
                        >
                          <FaTrash className="inline mr-1" /> Clear Cart
                      </button>

                      <div className="flex justify-between font-bold gap-3 ">
                          <span>Total: </span>
                          <span>${ total.toFixed(2)}</span>
                      </div>

                      <button className="w-fit px-4 py-2  bg-violet-600 text-white rounded hover:bg-violet-700">
                        Checkout
                      </button>
                  </div>
              </div>
        </div>
    </div>
  );
}

