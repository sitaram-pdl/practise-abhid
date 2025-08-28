
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaTrash, FaPlus, FaMinus, FaCartPlus } from "react-icons/fa";
import { type ProductType } from "@/features/dashboard/types"
import { useProductContext } from "@/context/ProductContext";


interface ProductRowPropsType {
  eachProduct: ProductType;
}

export default function ProductRow({ eachProduct}: ProductRowPropsType) {
  const {cartQuantity, fetchSingleProductData,  increaseCartQuantity, decreaseCartQuantity, handleRemove } = useProductContext();

  const navigate = useNavigate();

  // Safe defaults for rating.........vvi step for adding new product 
  const safeRating = eachProduct.rating || { rate: 0, count: 0 };
  const displayQuantity = cartQuantity[eachProduct.id] || 0;

  const handleNavigateToSingleProductPage = (id:number) =>{
    fetchSingleProductData(id)
    navigate(`/products/${eachProduct.id}`)
  }

    
  return (
    <tr className="hover:bg-gray-100"
      
      >
      {/* <td className="whitespace-nowrap px-6 py-4" */}
      <td className="px-2 py-2 sm:px-3 md:px-4 lg:py-4 lg:px-5 xl:px-6">
        {eachProduct.id}
      </td>

      {/* <td className="px-6 py-4"> */}
      <td className="px-2 py-2 sm:px-3 md:px-4 lg:py-4 lg:px-5 xl:px-6">        
        <div className="flex items-center gap-3"
            onClick={() => handleNavigateToSingleProductPage(eachProduct.id)} 
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

      {/* <td className="whitespace-nowrap px-6 py-4"> */}
      <td className="px-2 py-2 sm:px-3 md:px-4 lg:py-4 lg:px-5 xl:px-6">
        ${eachProduct.price.toFixed(2)}
      </td>

      {/* <td className="whitespace-nowrap px-6 py-4"> */}
      <td className=" px-2 py-2 sm:px-3 md:px-4 lg:py-4 lg:px-5 xl:px-6">
      
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
      
      {/* <td className="whitespace-nowrap px-6 py-4"> */}
      <td className="px-2 py-2 sm:px-3 md:px-4 lg:py-4 lg:px-5 xl:px-6">
      
          {displayQuantity > 0 ? (
            <div className="inline-flex items-center border px-2 py-1 rounded">
              <button 
                onClick={() => decreaseCartQuantity(eachProduct.id)} 
                className="px-1 hover:text-red-500"
              >
                <FaMinus className="text-sm" />
              </button>
              <span className="mx-2">{displayQuantity}</span>
              <button 
                onClick={() => increaseCartQuantity(eachProduct.id)} 
                className="px-1 hover:text-green-500"
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => increaseCartQuantity(eachProduct.id)}
              className="inline-flex items-center gap-1 rounded bg-violet-600 px-3 py-1 text-white hover:bg-violet-700 transition-colors"
            >
              <FaCartPlus /> Add
            </button>
          )}
      </td>

      {/* <td className="whitespace-nowrap px-6 py-4"> */}
      <td className=" px-2 py-2 sm:px-3 md:px-4 lg:py-4 lg:px-5 xl:px-6">
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



// import { useNavigate } from "react-router-dom";
// import { FaStar, FaRegStar, FaTrash, FaPlus, FaMinus, FaCartPlus } from "react-icons/fa";
// import { type ProductType } from "@/features/dashboard/types";
// import { useProductContext } from "@/context/ProductContext";

// interface ProductRowPropsType {
//   eachProduct: ProductType;
//   variant?: "table" | "cart"; 
// }

// export default function ProductRow({ eachProduct, variant = "table" }: ProductRowPropsType) {
//   const { cartQuantity, fetchSingleProductData, increaseCartQuantity, decreaseCartQuantity, handleRemove } =
//     useProductContext();

//   const navigate = useNavigate();

//   const safeRating = eachProduct.rating || { rate: 0, count: 0 };
//   const displayQuantity = cartQuantity[eachProduct.id] || 0;

//   const handleNavigate = () => {
//     fetchSingleProductData(eachProduct.id);
//     navigate(`/products/${eachProduct.id}`);
//   };

//   // ================== 📌 Variant 1: Table Row (ProductTable) ==================
//   if (variant === "table") {
//     return (
//       <tr className="hover:bg-gray-100">
//         <td className="whitespace-nowrap px-6 py-4">{eachProduct.id}</td>

//         <td className="px-6 py-4">
//           <div className="flex items-center gap-3 cursor-pointer" onClick={handleNavigate}>
//             <img
//               src={eachProduct.image}
//               alt={eachProduct.title}
//               className="h-10 w-10 rounded object-cover"
//               onError={(e) => ((e.target as HTMLImageElement).src = "/placeholder-product.png")}
//             />
//             <div>
//               <div className="font-medium line-clamp-1">{eachProduct.title}</div>
//               <div className="text-sm text-gray-500 line-clamp-1">{eachProduct.category}</div>
//             </div>
//           </div>
//         </td>

//         <td className="whitespace-nowrap px-6 py-4">${eachProduct.price.toFixed(2)}</td>

//         <td className="whitespace-nowrap px-6 py-4">
//           <div className="flex items-center gap-1">
//             {safeRating.rate.toFixed(1)}
//             {safeRating.rate >= 4 ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-400" />}
//             <span className="text-xs text-gray-500">({safeRating.count})</span>
//           </div>
//         </td>

//         <td className="whitespace-nowrap px-6 py-4">
//           {displayQuantity > 0 ? (
//             <div className="inline-flex items-center border px-2 py-1 rounded">
//               <button onClick={() => decreaseCartQuantity(eachProduct.id)} className="px-1 hover:text-red-500">
//                 <FaMinus className="text-sm" />
//               </button>
//               <span className="mx-2">{displayQuantity}</span>
//               <button onClick={() => increaseCartQuantity(eachProduct.id)} className="px-1 hover:text-green-500">
//                 <FaPlus className="text-sm" />
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={() => increaseCartQuantity(eachProduct.id)}
//               className="inline-flex items-center gap-1 rounded bg-violet-600 px-3 py-1 text-white hover:bg-violet-700"
//             >
//               <FaCartPlus /> Add
//             </button>
//           )}
//         </td>

//         <td className="whitespace-nowrap px-6 py-4">
//           <button
//             onClick={() => handleRemove(eachProduct.id)}
//             className="text-gray-500 hover:text-red-500"
//             title="Delete"
//           >
//             <FaTrash />
//           </button>
//         </td>
//       </tr>
//     );
//   }

//   // ================== 📌 Variant 2: Cart Drawer (flex item) ==================
//   return (
//     <div className="flex items-center gap-3 border-b pb-3">
//       <img
//         src={eachProduct.image}
//         alt={eachProduct.title}
//         className="w-12 h-12 object-cover rounded"
//         onError={(e) => ((e.target as HTMLImageElement).src = "/placeholder-product.png")}
//       />

//       <div className="flex-1 min-w-0">
//         <div className="font-medium truncate">{eachProduct.title}</div>
//         <div className="text-sm text-gray-500">{eachProduct.category}</div>
//         <div className="text-sm font-semibold">${eachProduct.price.toFixed(2)}</div>
//       </div>

//       <div className="flex items-center border px-2 py-1 rounded">
//         <button onClick={() => decreaseCartQuantity(eachProduct.id)} className="p-1 hover:bg-gray-100 rounded">
//           <FaMinus size={12} />
//         </button>
//         <span className="px-2">{displayQuantity}</span>
//         <button onClick={() => increaseCartQuantity(eachProduct.id)} className="p-1 hover:bg-gray-100 rounded">
//           <FaPlus size={12} />
//         </button>
//       </div>

//       <button onClick={() => handleRemove(eachProduct.id)} className="text-red-500 hover:text-red-700 ml-3">
//         <FaTrash />
//       </button>
//     </div>
//   );
// }


