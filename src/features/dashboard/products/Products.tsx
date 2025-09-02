
import {useState } from "react";
import ProductTable from "./ProductTable";
import ConfirmDeleteModal from "./ConformDeleteModel";
import Notification from './Notification';
import { useProductContext } from "@/context/ProductContext";
import AddNewProductModel from "./AddNewProductModel"

export default function Products() {

  const {products, notificationMessage, handleAddNewProduct} = useProductContext(); 
  // it is a custom hook which get us the function to consume context.

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-auto absolute left-69 right-0 top-17">
        <main className= "flex-1 p-6 bg-white ">
            <div className="flex justify-between items-center border-t py-4 pr-2 ">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="w-1/3 p-2 border rounded"
                  value={searchTerm}
                  onChange={(e)=> setSearchTerm(e.target.value)}
                />
              
              <button className="bg-green-500 text-white font-bold mx-3 px-3 py-2 rounded  cursor-pointer hover:bg-green-600 hover:mx-2 hover:px-4
                    transition-all duration-300 ease-in-out "
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


