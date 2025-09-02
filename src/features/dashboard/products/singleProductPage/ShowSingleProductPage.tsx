
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from "@/context/ProductContext";
import {FaPlus,FaMinus, FaCartPlus,FaStar, FaRegStar,FaStarHalfAlt} from "react-icons/fa";
import AddNewProductModel from '../AddNewProductModel';
import Notification from '../Notification';


export default function ShowSingleProductPage() {
    const navigate = useNavigate();
    const { productID } = useParams();
    const {cartQuantity, singleProduct, increaseCartQuantity, decreaseCartQuantity, handleUpdateProduct,notificationMessage} = useProductContext()
    const CheckSingleProduct = singleProduct && singleProduct.id === Number(productID)
    const displayQuantity = cartQuantity[singleProduct.id] || 0;
    if (!CheckSingleProduct) {
        return <div className='text-2xl text-red-500 font-bold'>Product not found.</div>;
      }
  const safeRating = singleProduct.rating || { rate: 0, count: 0 };

  return (

     <div className="flex flex-col min-h-screen absolute left-69 right-0 top-17 bg-white">
       <div className='flex justify-between items-center px-5 py-3'>
          <button className='bg-gray-400 text-white px-4 py-2 font-normal rounded cursor-pointer shadow-[0.25rem_0.25rem_0.25rem_rgba(0,0,0,0.5)]
                            hover:bg-gray-600 hover:font-bold hover:translate-x-0.5 hover:translate-y-0.5  hover:shadow-none
                            transition-all duration-300 ease-in-out' 
            onClick={() => navigate(-1)}
            >Back
          </button>
          <button className='bg-orange-400 text-white px-4 py-2 font-normal rounded cursor-pointer shadow-[0.25rem_0.25rem_0.25rem_rgba(0,0,0,0.5)]
                            hover:bg-orange-600 hover:font-bold hover:translate-x-1 hover:translate-y-0.5  hover:shadow-none
                            transition-all duration-300 ease-in-out' 
              onClick={() => handleUpdateProduct(singleProduct)}
            >Update Product
          </button>
        </div>

        <div className='p-5 flex gap-10 w-full'>
              <div className=' flex justify-center items-center max-w-1/2 h-auto bg-neutral-100  '>
                <img 
                  className='w-3/5 h-3/4 aspect-auto '
                  src={singleProduct.image}
                  alt={singleProduct.title}
                />
              </div>
              <div className='flex flex-col gap-5 max-w-1/2'>
                <div>
                  <div className="text-2xl font-bold ">{singleProduct.title}</div>
                </div>

                <div>
                  <div className="px-3 py-1 font-medium bg-blue-100 text-blue-800 w-fit rounded-xl">{singleProduct.category}</div>
                </div>

                 
                <div className="flex gap-2 items-center ">
                        <span className="flex items-center ">
                           {[1, 2, 3, 4, 5].map((star) => (
                           <span key={star}>
                              {safeRating.rate >= star ? (
                                  <FaStar className="text-yellow-400" size={20} />
                                ) : safeRating.rate >= star - 0.5 ? (
                                  <FaStarHalfAlt className="text-yellow-400" size={20} />
                                ) : (
                                  <FaRegStar className="text-gray-400" size={20} />
                                )}
                            </span>
                          ))}
                        </span>
                        <span>{safeRating.rate.toFixed(1)}
                          <span className="text-xs text-gray-500">({safeRating.count})</span>
                        </span>
                </div>
                <div className='text-3xl font-bold'>${singleProduct.price.toFixed(2)}</div>

                <div className='flex flex-col gap-3'>
                  <div className='text-xl font-bold'>Description</div>
                  <div className='text-base text-gray-500 line leading-5 '>{singleProduct.description}</div>
                </div>

                <div className="py-4">
                  {displayQuantity > 0 ? (
                    <div className="flex justify-center items-center border-2 border-blue-600 px-4 py-2 rounded">
                        <button 
                          onClick={() => decreaseCartQuantity(singleProduct.id)} 
                          className="px-1 hover:text-red-500"
                        >
                          <FaMinus className="text-sm" />
                        </button>
                        <span className="mx-2">{displayQuantity}</span>
                        <button 
                          onClick={() => increaseCartQuantity(singleProduct.id)} 
                          className="px-1 hover:text-green-500"
                        >
                          <FaPlus className="text-sm" />
                        </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => increaseCartQuantity(singleProduct.id)}
                      className=' flex w-full justify-center items-center gap-1 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition-colors '
                    >
                      <FaCartPlus /> Add
                    </button>
                  )}
                </div>
              </div>
        </div>
        <AddNewProductModel />
         {notificationMessage && (
                    <Notification key={`${notificationMessage}-${Date.now()}`} />
          )} 
    </div>
  )
}

