
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useProductContext } from "@/context/ProductContext";
import type { CartQuantityType, ProductType } from "../types";
import type { CartProductDetails, CartWithProductDetailsType } from "../CartTypes";
import { useCartContext } from "@/context/CartContext";
import { useEffect } from "react";

export type productsArrayInsideCartType = {productId:number, quantity:number} []

export default function CartDrawer() {
  const { cartQuantity, setCartQuantity, ConfirmAddNewCart, selectedProducts, isCartOpen, setCartOpen, increaseCartQuantity, decreaseCartQuantity, removeCartItem,totalCartsQuantity, clearCart, totalPrice} = useProductContext();
  const { isUpdateCart,hydratedSingleCartData,isLoading,ConfirmUpdateCart,setUpdateCart} = useCartContext();
  
type CartQuantityMap = Record<number, number>;
function buildCartQuantityObject(hydratedSingleCartData: CartWithProductDetailsType|null): CartQuantityMap {
  if (!hydratedSingleCartData) {
          return {};
        }
  return hydratedSingleCartData.products.reduce<CartQuantityMap>((acc, item) => {
    acc[item.productDetails.id] = item.quantity;
    return acc;
  }, {});
}

useEffect(() => {
  if (isUpdateCart && hydratedSingleCartData) {
    clearCart();
    const quantityMap = buildCartQuantityObject(hydratedSingleCartData);
    setCartQuantity(quantityMap);
  }
}, [isUpdateCart, hydratedSingleCartData?.id]); 

  const prepareCartProducts = ( cartQuantity: CartQuantityType, selectedProducts:
     ProductType[]): CartProductDetails[] => {
        if (!cartQuantity) {
          return [];
        }
        return selectedProducts.map(eachProduct => ({
          productDetails: eachProduct,
          quantity: Number(cartQuantity[eachProduct.id] ?? 0),
        }));
    };
    const currentCart = {
        id: isUpdateCart ? hydratedSingleCartData?.id ?? 0 : 0,
        userId: isUpdateCart ? hydratedSingleCartData?.userId ?? 0 : 0,
        date: new Date().toISOString().split("T")[0],
        products: prepareCartProducts(cartQuantity,selectedProducts),
        __v : 0  
      };

  const handleFinalClick = ()=> {
    isUpdateCart
       ? ConfirmUpdateCart(hydratedSingleCartData?.id || 0, currentCart )
       : ConfirmAddNewCart(currentCart)
  }
  const handleOverlayClose = () =>{
    setUpdateCart(false)
    setCartOpen(false)
  }

  return (
    <div>
        {isCartOpen && (
          <div
            className="fixed inset-0 backdrop-brightness-60 z-40"
            onClick={handleOverlayClose}
          />
        )}
        <div
            className={`fixed right-0 top-0  h-full w-120 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
              isCartOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
              <div className="flex justify-between items-center border-b p-4">
                  <h2 className="text-lg font-bold">
                      Your Cart ({totalCartsQuantity} items)
                  </h2>
                  <button className="text-gray-500 hover:text-black"
                    onClick={() => setCartOpen(false)} 
                  >
                      ✖
                  </button>
              </div>

              <div className="flex justify-between align-center gap-2 w-full">
                  <div className=" absolute  p-4 flex flex-col gap-4 overflow-y-auto w-full
                   h-[calc(100%-9rem)]">
                      {selectedProducts.length === 0 && (
                        <p className="text-gray-500">Your cart is empty.</p>
                      )}

                      {selectedProducts.map((item) => (
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

                            <div className="flex items-center border px-2 py-1 rounded">
                                <button onClick={() => decreaseCartQuantity(item.id)}>
                                  <FaMinus />
                                </button>
                                <span className="px-2">{cartQuantity[item.id]}</span>
                                <button onClick={() => increaseCartQuantity(item.id)}>
                                  <FaPlus />
                                </button>
                            </div>

                            <button
                                  onClick={() => removeCartItem(item.id)}
                                  className="text-gray-500 hover:text-red-500 hover:cursor-pointer ml-5"
                                >
                                  <FaTrash />
                            </button>
                        </div>
                      ))}
                  </div>
              </div>
              <div className="fixed bottom-1 right-0 left-0 p-4 border-t">
              
                  <div className=" flex justify-between items-center gap-2 z-10 ">
                      <button
                          className="w-fit px-4 py-2 bg-gray-500 text-white  rounded hover:bg-red-500 cursor-pointer"
                          onClick={clearCart}
                        >
                          <FaTrash className="inline mr-1" /> Clear Cart
                      </button>

                      <div className="flex justify-between  text-lg font-bold gap-3 ">
                          <span>Total: </span>
                          <span>${ totalPrice.toFixed(2)}</span>
                      </div>

                      <button className="w-fit px-4 py-2  bg-blue-500 text-white rounded hover:bg-green-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={totalCartsQuantity === 0}
                        onClick={handleFinalClick}
                      >
                        {
                          isLoading
                          ? isUpdateCart ? "Updating..." : "Creating..."
                          : isUpdateCart ? "Update Cart" : "Create Cart"
                        }
                      </button>
                  </div>
              </div>
        </div>
    </div>
  );
}

