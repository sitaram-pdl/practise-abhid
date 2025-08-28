
import { useCartContext } from "@/context/CartContext";
import { useProductContext } from "@/context/ProductContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";


export default function SingleCartPage() {


    const {cartID} = useParams();
    const navigate =  useNavigate();
    const {singleCartData} = useCartContext();
    const {products} = useProductContext();

    const CheckSingleCart = singleCartData && singleCartData.id === Number(cartID)
    if (!CheckSingleCart) {
        return <div className='text-2xl text-red-500 font-bold'>Cart not found.</div>;
      }

    const productsArrayOfSingleCartData = singleCartData?.products ?? []
    const singlePageProductsIDsObject = new Set(productsArrayOfSingleCartData.map(item => item.productId));
    const matchedProducts = products.filter(item => singlePageProductsIDsObject.has(item.id))
    // console.log("matched Products: ",matchedProducts)

    const CartquantityMap:Record<number,number> = {};
    for( const item of productsArrayOfSingleCartData){
        CartquantityMap[item.productId] = item.quantity 
    }

    const GrandTotal = matchedProducts.reduce((sum, eachProduct) => {
    const quantity = CartquantityMap[eachProduct.id] ?? 0;
    return sum + (eachProduct.price * quantity);
    }, 0);

  return (
    <div className="flex flex-col gap-5 px-6 py-2 h-auto absolute left-72 right-2 top-20  
            shadow-[2px_2px_5px_1px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center py-4">
            <button className=' flex items-center justify-between gap-4 bg-gray-400 hover:bg-gray-700 text-white px-6 py-2 rounded cursor-pointer'
                onClick={() => navigate(-1)}
                > <FaArrowLeft/> 
                    <span>Back</span>
            </button>
            <p className="text-3xl text-gray-700 font-semibold">
                Your Shopping Cart
            </p>
                <button className='bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded cursor-pointer' 
                //   onClick={() => handleUpdateUser(singleUser)}
                >Update Cart
            </button>
        </div>
        <div className="w-full py-4">
            <table className="w-full table-auto border">
                <thead className="bg-neutral-500 text-white text-lg">
                    <tr className="w-full">
                        <th className="px-6 py-4 text-left">Product</th>
                        <th  className="px-6 py-4 text-left">Price</th>
                        <th  className="px-6 py-4 text-left">Quantity</th>
                        <th  className="px-6 py-4 text-left">Total</th>
                    </tr>
                </thead>
                    
                <tbody className="w-full">
                  {matchedProducts.map((eachProduct)=> {
                     const quantity = CartquantityMap[eachProduct.id] ?? 0;
                     const totalPerProduct = eachProduct.price * quantity;
                     return(
                          <tr className="w-full border-t border-b hover:bg-neutral-200">
                                <td className="px-6 py-4 text-left">
                                    <div className="flex items-center gap-3"
                                        >
                                        <img
                                        src={eachProduct.image}
                                        alt={eachProduct.title}
                                        className="h-10 w-8 rounded object-cover"
                                        />
                                        <div>
                                        <div className="font-medium w-3/4 overflow-hidden  whitespace-nowrap text-ellipsis">{eachProduct.title}</div>
                                        <div className="text-sm text-gray-500 w-full overflow-hidden whitespace-nowrap text-ellipsis">{eachProduct.category}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-left">
                                    ${eachProduct.price.toFixed(2)}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-left ">
                                    {quantity}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-left">
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
  </div>
  )
}

