

import { useCartContext } from "@/context/CartContext";
import type { CartTypes } from "../CartTypes"
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

interface CartRowPropsType{
  eachItem:CartTypes
}

export default function CartRow({eachItem}:CartRowPropsType) {

  const {fetchSingleCartData,handleDeleteCart,loadHydratedSingleCartData} = useCartContext();
  const nevigate =   useNavigate();

// .........................................................................
  const productsArray = eachItem ?. products ?? []
  const TotalQuantity = productsArray.reduce(
          (accu, eachObject ) =>  accu + eachObject.quantity , 0)
//..................................................................... 
  const dateString = eachItem.date // it is just a string not date.
  // converting string to date, so that we can use date methods to convert it to different date formats
  const date = new Date(dateString); 
  // using date method to get proper date format.
  const formattedDate = date.toLocaleDateString(); 

// ......................................................................
  const handleNavigationToSingleCartPage = (id:number) =>{
    fetchSingleCartData(id)
    loadHydratedSingleCartData()
    nevigate(`/cart/${id}`)
  }

  return (

      <tr className="w-full bg-white border-t border-b hover:bg-neutral-100">
        <td className="px-4 py-3"
          onClick={()=>handleNavigationToSingleCartPage(eachItem.id)}
        >
          {eachItem.id}
        </td>

        <td className="px-4 py-3"
          onClick={()=>handleNavigationToSingleCartPage(eachItem.id)}
        
        >
          {formattedDate}
        </td>

        <td className="px-4 py-3"
          onClick={()=>handleNavigationToSingleCartPage(eachItem.id)}
        
        >
          {TotalQuantity}
        </td>
        <td className="px-4 py-3"
          onClick={()=>handleNavigationToSingleCartPage(eachItem.id)}
        
        >
          {(eachItem.products).length}
        </td>
      
        <td className="px-4 py-3 ">
            <FaTrash 
            title="delete"
            onClick={() => handleDeleteCart(eachItem.id)}
            className="text-gray-500 bg hover:text-red-500"
            />
        </td>

      </tr>
  )
}
