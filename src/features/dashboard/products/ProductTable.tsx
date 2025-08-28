
import ProductRow from "./ProductRow";
import {type ProductType} from "@/features/dashboard/types"
// import { useProductContext } from "@/context/ProductContext";


interface ProductTablePropsType {
  filteredProducts: ProductType[];
}

export default function ProductTable({filteredProducts}:ProductTablePropsType) {

   {/* instead of receiving the products from context directly, receive the filtered products from product page to pass data to ProductRow.  */}

  return (
    <div className="overflow-x-auto  border border-gray-200 shadow">
      <table className="max-w-full">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-medium bg-gray-300">
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3 w-2/5">Product</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Rating</th>
            <th className="px-6 py-3">Cart</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {filteredProducts.map((eachProduct) => (
            <ProductRow
              key={eachProduct.id}
              eachProduct={eachProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}


