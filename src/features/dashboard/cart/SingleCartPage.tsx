
import { useCartContext } from "@/context/CartContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";


export default function SingleCartPage() {



    const {userID} = useParams();
    const navigate =  useNavigate();
    const {singleCartData} = useCartContext();

  return (
        <div className="flex flex-col gap-5 px-6 py-2 h-auto absolute left-72 right-2 top-20  
             shadow-[2px_2px_5px_1px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center">
                <button className=' flex items-center justify-between gap-4 bg-gray-400 hover:bg-gray-700 text-white px-6 py-2 rounded cursor-pointer'
                    onClick={() => navigate(-1)}
                    > <FaArrowLeft/> 
                        <span>Back</span>
                </button>
                <p className="text-2xl text-gray-700 font-semibold">
                    Your Shopping Cart
                </p>
                 <button className='bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded cursor-pointer' 
                    //   onClick={() => handleUpdateUser(singleUser)}
                    >Update Cart
                </button>
            </div>
            <div className="w-full py-4">
                <table className="w-full table-auto border">
                    <thead className="bg-gray-500 text-white text-lg">
                        <tr className="w-full">
                            <th className="px-4 py-2 text-left">Product</th>
                            <th  className="px-4 py-2 text-left">Price</th>
                            <th  className="px-4 py-2 text-left">Quantity</th>
                            <th  className="px-4 py-2 text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        <tr className="w-full border-t border-b hover:bg-gray-200">
                                good
                            {/* {singleCartData.map((eachItem)=> 
                                key={eachItem.id}
                                eachItem = {eachItem}
                            />
                            )} */}
                        </tr>
                    </tbody>
                </table>
            </div>
          

            
        </div>

    

 
  )
}
