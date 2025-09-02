
import { useCartContext } from "@/context/CartContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "./Notification";

export default function SingleCartPage() {
    const {cartID} = useParams();
    const navigate =  useNavigate();
    const { singleCartData, hydratedSingleCartData, handleUpdateCart,notificationMessage } = useCartContext();

    const CheckSingleCart = singleCartData && singleCartData.id === Number(cartID)
    if (!CheckSingleCart) {
        return <div className='text-2xl text-red-500 font-bold'>Cart not found.</div>;
      }
    const GrandTotal = hydratedSingleCartData?.products.reduce((sum, item) => {
        return sum + item.productDetails.price * item.quantity;}, 0) ?? 0;

  return (

    <div className="bg-white flex flex-col gap-5 px-6 py-2 min-h-screen absolute left-69 right-0 top-17">
        <div className="flex justify-between items-center py-4">
            <div className="w-32">
                  <button className=' flex items-center justify-between gap-4 bg-gray-400 text-white px-4 py-2 font-normal rounded cursor-pointer shadow-[0.25rem_0.25rem_0.25rem_rgba(0,0,0,0.5)] hover:bg-gray-600 hover:font-bold hover:translate-x-0.5 hover:translate-y-0.5  hover:shadow-none transition-all duration-300 ease-in-out' 
                onClick={() => navigate(-1)}
                > <FaArrowLeft/> 
                    <span>Back</span>
                </button>
            </div>
            <p className="text-3xl text-gray-700 font-semibold">
                Your Shopping Cart
            </p>
                <button className='w-40 mx-4 bg-orange-400 text-white px-4 py-2 font-normal rounded cursor-pointer shadow-[0.25rem_0.25rem_0.25rem_rgba(0,0,0,0.5)]
                            hover:bg-orange-600 hover:font-bold hover:translate-x-1 hover:translate-y-0.5  hover:shadow-none
                            transition-all duration-300 ease-in-out' 
                  onClick={() => handleUpdateCart()}
                >Update Cart
            </button>
        </div>
        <div className="w-full py-4">
            <table className="w-full table-auto border">
              <thead className="bg-neutral-200 text-gray-600 text-lg">
                    <tr className="w-full">
                        <th className="px-4 py-3 text-left">Product</th>
                        <th  className="px-4 py-3 text-left">Price</th>
                        <th  className="px-4 py-3 text-left">Quantity</th>
                        <th  className="px-4 py-3 text-left">Total</th>
                    </tr>
                </thead>
                    
                <tbody className="w-full">
                 {hydratedSingleCartData?.products.map((item) => {
                    const { productDetails, quantity } = item;
                    const totalPerProduct = productDetails.price * quantity;
                     return(
                          <tr className="w-full border-t border-b hover:bg-neutral-100">
                                <td className="px-4 py-3 text-left">
                                    <div className="flex items-center gap-3"
                                        >
                                        <div className="h-10 w-10">
                                            <img
                                            src={productDetails.image}
                                            alt={productDetails.title}
                                            className="w-full h-full rounded object-cover"
                                            />

                                        </div>
                                      
                                        <div>
                                        <div className="font-medium w-3/4 overflow-hidden  whitespace-nowrap text-ellipsis">{productDetails.title}</div>
                                        <div className="text-sm text-gray-500 w-full overflow-hidden whitespace-nowrap text-ellipsis">{productDetails.category}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 text-left">
                                    ${productDetails.price.toFixed(2)}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-left ">
                                    {quantity}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-left">
                                    ${totalPerProduct.toFixed(2)}
                                </td>
                         </tr>
                       )
                    })}
                </tbody>
            </table>
        </div>
        <div className="text-2xl text-gray-700 font-semibold py-4">
           Total <span className="px-2">:</span><span className="mr-1">$</span>{GrandTotal.toFixed(2)}
        </div>
         {notificationMessage && (
                <Notification key={`${notificationMessage}-${Date.now()}`} />
              )} 
  </div>
  )
}

