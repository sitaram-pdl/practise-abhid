


import {useState } from "react";
import ProductTable from "./ProductTable";
import ConfirmDeleteModal from "./ConformDeleteModel";
import Notification from './Notification';
import { useProductContext } from "@/context/ProductContext";
import AddNewProductModel from "./AddNewProductModel"


type ProductsProps = {
  isInsideCart?: boolean;
};

export default function Products({ isInsideCart = false }: ProductsProps) {
// export default function Products() {

  const {products, notificationMessage, handleAddNewProduct} = useProductContext(); 
  // it is a custom hook which get us the function to consume context.

  const [searchTerm, setSearchTerm] = useState("");
  // Filter products by title
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className= {isInsideCart 
      ? ""
      : "flex h-auto absolute left-72 right-2 top-20 shadow-[2px_2px_5px_1px_rgba(0,0,0,0.5)]"
    }
    >
    <main className= {isInsideCart 
    ? "flex-1 p-2 bg-white rounded"
    : "flex-1 p-6 bg-white rounded"
  
  }
    
      >
        <div className="flex justify-between items-center border-t py-4 pr-2 ">
          <input
            type="text"
            placeholder="Search by name"
            className="w-1/3 p-2 border rounded"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleAddNewProduct}
            >
            Add New Product
          </button>
        </div>

        {/* instead of passing the products from context directly, pass the filtered products to ProdutTable. */}
        <div className="max-w-full">
          <ProductTable filteredProducts={filteredProducts} />
        </div>

      </main>

      {/* Render components in this order */}
      <ConfirmDeleteModal />
      <AddNewProductModel />
      {/* Key ensures re-render */}
      {notificationMessage && (
        <Notification key={`${notificationMessage}-${Date.now()}`} />
      )} 
    </div>
  );
}


