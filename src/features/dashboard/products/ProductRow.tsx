
import {
  FaStar,
  FaRegStar,
  FaTrash,
  FaPlus,
  FaMinus,
  FaCartPlus,
} from "react-icons/fa";

import { type ProductType } from "@/features/dashboard/products/Product"


interface ProductRowPropsType {
  eachProduct: ProductType;
  onRemove: (id: number) => void;
  Quantity: number;
  onIncrease: (id:number) => void;
  onDecrease: (id:number) => void;
}

export default function ProductRow({ eachProduct, onRemove,Quantity, onIncrease, onDecrease, }:ProductRowPropsType) {

  const increase  = () => {
    onIncrease(eachProduct.id)
  }
  const decrease  = () => {
    onDecrease(eachProduct.id)
  }
  
  return (
    <tr className="border-t">

        <td className="p-3">{eachProduct.id}</td>

        <td className="p-3 flex items-center gap-3">
            <img
              src={eachProduct.image}
              alt={eachProduct.title}
              className="w-10 h-10 object-cover"
            />
            <div>
              <div className="font-medium truncate max-w-xs">{eachProduct.title}</div>
              <div className="text-sm text-gray-500">{eachProduct.category}</div>
            </div>
        </td>

        <td className="p-3">${eachProduct.price.toFixed(2)}</td>

        <td className="p-3 flex items-center gap-1">
          {eachProduct.rating.rate}
          {eachProduct.rating.rate >= 4 ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-gray-400" />
          )}
        </td>
        
        <td className="p-3">
          {Quantity > 0 ? (
              <div className="flex items-center border px-2 py-1 rounded w-fit">
                <button onClick={decrease}>
                  <FaMinus className="text-sm" />
                </button>
                <span className="mx-2">{Quantity}</span>
                <button onClick={increase}>
                  <FaPlus className="text-sm" />
                </button>
              </div>
          ) : (
            <button
              onClick={increase}
              className="flex items-center gap-1 text-white bg-violet-600 px-3 py-1 rounded hover:bg-violet-700"
            >
              <FaCartPlus /> Add
            </button>
          )}
        </td>

        <td className="p-3">
          <button
            onClick={() => onRemove(eachProduct.id)}
            className="text-red-500 hover:text-red-700 hover:cursor-pointer"
          >
            <FaTrash />
          </button>
        </td>
    </tr>
  );
}
