
import ProductRow from "./ProductRow";
import { type ProductType } from "@/features/dashboard/products/Product"

interface ProductTablePropsType {
  products: ProductType[];
  onRemove: (id: number) => void;
  onIncrease: (id:number) => void;
  onDecrease: (id:number) => void;
  Quantity: number;
}

export default function ProductTable({ products,  onRemove, onIncrease, onDecrease, }:ProductTablePropsType) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded shadow">

          <thead className="bg-gray-300">
            <tr className="text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Cart</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody >
            {products.map((eachProduct:any) => (
              <ProductRow
                key={eachProduct.id}
                eachProduct={eachProduct}
                onRemove={onRemove}
                onIncrease ={onIncrease}
                onDecrease ={onDecrease}
                Quantity={eachProduct.quantity || 0}
              />
            ))}
          </tbody>
      </table>
    </div>
  );
}
