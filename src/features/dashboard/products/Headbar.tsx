

import { FaShoppingCart } from "react-icons/fa";

interface HeaderbarPropsType {
  Quantity: number;
  onCartClick: () => void;
}

export default function Headbar({ Quantity, onCartClick }: HeaderbarPropsType) {
  return (
    <div className="flex justify-between items-center px-2 py-3">
      <h2 className="text-2xl font-semibold">Product</h2>
      <div className="flex items-center gap-6">
      

        <div className="relative cursor-pointer" onClick={onCartClick}>
          <FaShoppingCart className="text-2xl" />
          {Quantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {Quantity}
            </span>
          )}
        </div>

        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          JO
        </div>
      </div>
    </div>
  );
}


