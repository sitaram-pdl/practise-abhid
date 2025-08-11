



import { FaBox, FaShoppingCart, FaUser } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-violet-600 text-white p-4">
      <h1 className="text-2xl font-bold mb-10">Yarsa Test</h1>
      <nav className="space-y-4">
        <div className="flex items-center gap-2 p-2 bg-violet-700 rounded">
          <FaBox /> <span>Product</span>
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-violet-500 rounded cursor-pointer">
          <FaShoppingCart /> <span>Cart</span>
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-violet-500 rounded cursor-pointer">
          <FaUser /> <span>User</span>
        </div>
      </nav>
    </aside>
  );
}


