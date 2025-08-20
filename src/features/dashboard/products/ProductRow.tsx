
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaTrash, FaPlus, FaMinus, FaCartPlus } from "react-icons/fa";
import { type ProductType } from "@/features/dashboard/types"
import { useProductContext } from "@/context/ProductContext";


interface ProductRowPropsType {
  eachProduct: ProductType;
  quantity?: number; 
}

export default function ProductRow({ eachProduct, quantity = 0 }: ProductRowPropsType) {
  const { increaseQuantity, decreaseQuantity, handleRemove } = useProductContext();

  const navigate = useNavigate();

  // Safe defaults for rating.........vvi step for adding new product 
  const safeRating = eachProduct.rating || { rate: 0, count: 0 };
  const displayQuantity = quantity || eachProduct.quantity || 0;

    
  return (
    <tr className="hover:bg-gray-100"
      
      >
      <td className="whitespace-nowrap px-6 py-4"
        >
        {eachProduct.id}
      </td>

      <td className="px-6 py-4">
        
        <div className="flex items-center gap-3"
            onClick={() => navigate(`/products/${eachProduct.id}`)} 
             >
            <img
              src={eachProduct.image}
              alt={eachProduct.title}
              className="h-10 w-10 rounded object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-product.png';
              }}
            />
            <div>
              <div className="font-medium line-clamp-1">{eachProduct.title}</div>
              <div className="text-sm text-gray-500 line-clamp-1">{eachProduct.category}</div>
            </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-6 py-4">${eachProduct.price.toFixed(2)}</td>

      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-1">
          {safeRating.rate.toFixed(1)}
          {safeRating.rate >= 4 ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-gray-400" />
          )}
          <span className="text-xs text-gray-500">({safeRating.count})</span>
        </div>
      </td>
      
      <td className="whitespace-nowrap px-6 py-4">
          {displayQuantity > 0 ? (
            <div className="inline-flex items-center border px-2 py-1 rounded">
              <button 
                onClick={() => decreaseQuantity(eachProduct.id)} 
                className="px-1 hover:text-red-500"
              >
                <FaMinus className="text-sm" />
              </button>
              <span className="mx-2">{displayQuantity}</span>
              <button 
                onClick={() => increaseQuantity(eachProduct.id)} 
                className="px-1 hover:text-green-500"
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => increaseQuantity(eachProduct.id)}
              className="inline-flex items-center gap-1 rounded bg-violet-600 px-3 py-1 text-white hover:bg-violet-700 transition-colors"
            >
              <FaCartPlus /> Add
            </button>
          )}
      </td>

      <td className="whitespace-nowrap px-6 py-4">
          <button
            onClick={() => handleRemove(eachProduct.id)}
            className="text-gray-500 hover:text-red-500 transition-colors"
            title="Delete"
            aria-label="Delete product"
          >
            <FaTrash />
          </button>
      </td>
    </tr>
  );
}






