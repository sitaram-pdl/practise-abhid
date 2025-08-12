



import { FaShoppingCart } from "react-icons/fa";
import {useNavigate } from "react-router-dom";

interface HeaderbarPropsType {
  Quantity: number;
  onCartClick: () => void;
}

export default function Headbar({ Quantity, onCartClick }: HeaderbarPropsType) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
        <button onClick={logout} className="ml-auto bg-red-600 px-2 py-1 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}



