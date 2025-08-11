
import { FaShoppingCart } from "react-icons/fa";

interface HeaderbarPropsType{
  Quantity: number;
}

export default function Headbar({Quantity}:HeaderbarPropsType) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Product</h2>
      <div className="flex items-center gap-6">
        <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700">
          Add
        </button>add
        <div className="relative">
          <FaShoppingCart className="text-2xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {Quantity}
          </span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          JO
        </div>
      </div>
    </div>
  );
}
