
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from "@/context/ProductContext";
import {FaPlus,FaMinus, FaCartPlus } from "react-icons/fa";
import AddNewProductModel from '../AddNewProductModel';



export default function ShowSingleProductPage() {

    const navigate = useNavigate();
    const { productID } = useParams();
    const { products, increaseQuantity, decreaseQuantity, handleUpdateProduct} = useProductContext();

    const SingleProduct = products.find(
      (eachProduct) => eachProduct.id === Number(productID) 
    );


    if (!SingleProduct) {
        return <div className='text-2xl text-red-500 font-bold'>Product not found.</div>;
      }
    const displayQuantity = SingleProduct.quantity || 0;


  return (

     <div className="flex flex-col h-auto absolute left-72 right-2 top-20  
    shadow-[2px_2px_5px_1px_rgba(0,0,0,0.5)]">
       <div className='flex justify-between items-center px-5 py-3'>
          <button className='bg-gray-400 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer'
            onClick={() => navigate(-1)}
            >Back
          </button>
          <button className='bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded cursor-pointer' 
              onClick={() => handleUpdateProduct(SingleProduct)}
            >Update Product
          </button>
        </div>

        <div className='p-5 flex gap-10 w-full'>
              <div className=' flex justify-center items-center max-w-1/2 max-h-auto bg-gray-200  '>
                <img 
                  className='w-3/4 h-auto aspect-auto '
                  src={SingleProduct.image}
                  alt={SingleProduct.title}
                />
              </div>
            <div className='flex flex-col gap-5 max-w-1/2'>
                <div>
                  <div className="font-medium line-clamp-1">{SingleProduct.title}</div>
                </div>

                <div>
                  <div className="font-medium line-clamp-1">{SingleProduct.category}</div>
                </div>

                <div> ratings and reviews</div>

                <div>${SingleProduct.price.toFixed(2)}</div>

                <div className='flex flex-col gap-3'>
                  <div>Description</div>
                  <div>{SingleProduct.description}</div>
                </div>

                <div className="py-4">
                  {displayQuantity > 0 ? (
                    <div className="flex justify-center items-center border-2 border-emerald-600 px-4 py-2 rounded">
                        <button 
                          onClick={() => decreaseQuantity(SingleProduct.id)} 
                          className="px-1 hover:text-red-500"
                        >
                          <FaMinus className="text-sm" />
                        </button>
                        <span className="mx-2">{displayQuantity}</span>
                        <button 
                          onClick={() => increaseQuantity(SingleProduct.id)} 
                          className="px-1 hover:text-green-500"
                        >
                          <FaPlus className="text-sm" />
                        </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => increaseQuantity(SingleProduct.id)}
                      className=' flex w-full justify-center items-center gap-1 bg-emerald-400 text-white px-4 py-2 rounded hover:bg-emerald-600 cursor-pointer transition-colors '
                    >
                      <FaCartPlus /> Add
                    </button>
                  )}
                </div>
            </div>
        </div>
        <AddNewProductModel />
    </div>
  )
}
