

import type { CartTypes } from "../CartTypes"
import { FaRegTrashAlt } from "react-icons/fa";

interface CartRowPropsType{
  eachItem:CartTypes
}

export default function CartRow({eachItem}:CartRowPropsType) {

const productsArray = eachItem ?. products ?? []

const TotalQuantity = productsArray.reduce(
        (accu, eachObject ) =>  accu + eachObject.quantity , 0)
      

  return (

      <tr className="w-full border-t border-b hover:bg-gray-200">
        <td className="px-4 py-3">
          {eachItem.id}
        </td>

        <td className="px-4 py-3">
          {eachItem.date}
        </td>

        <td className="px-4 py-3">
          {TotalQuantity}
        </td>
        <td className="px-4 py-3">
          {(eachItem.products).length}
        </td>
      
        <td className="px-4 py-3">
          <FaRegTrashAlt/>
        </td>

      </tr>
      

  )
}
