
import ProductRow from "./ProductRow";
import { useProductContext } from "@/context/ProductContext";

export default function ProductTable() {

  // it is a custom hook which get us the function to consume context.
  const { products} = useProductContext();

  return (
    <div className="overflow-x-auto  border border-gray-200 shadow">
      <table className="min-w-full">
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
          {products.map((eachProduct) => (
            <ProductRow
              key={eachProduct.id}
              eachProduct={eachProduct}
              Quantity={eachProduct.quantity || 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
