
import { useEffect, useState } from "react";
import axios from "@/api/Api"; // now , here we use axios that was previously created.
import Sidebar from "./Sidebar";
import Headbar from "./Headbar";
import ProductTable from "./ProductTable"


export interface RatingType {  
  rate: number;
  count: number;
}

export interface ProductType {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: RatingType;
  title: string;
  quantity?: number; // manually adding extra quantity property for easy manupulations.
}

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
 
  
 useEffect(() => {
    axios
      .get("/products")
      .then((response) =>
        setProducts(
          response.data.map((eachProduct: ProductType) => ({
            ...eachProduct,
            quantity: 0, // here, we manually add quantity at the end of product, so every products starts with quantity 0.
          }))
        )
      )
      .catch((error) => console.error("Error fetching products:", error));
  }, []);


  console.log(products) // see the product to know about the details about it and  further analysis


    // here we calculate total cart items for using in Headbar.
      const totalCartItems = products.reduce(
        (sum, product) => sum + (product.quantity || 0),
          0
        );
  
     const increaseQuantity = (productId: number) => {
          setProducts((prev) =>
            prev.map((eachProduct) => eachProduct.id === productId 
              ? { ...eachProduct, quantity: (eachProduct.quantity || 0) + 1 } 
              : eachProduct
            )
          );
        };

     const decreaseQuantity = (productId: number) => {
          setProducts((prev) =>
            prev.map((eachProduct) => eachProduct.id === productId && (eachProduct.quantity || 0) > 0
              ? { ...eachProduct, quantity: (eachProduct.quantity || 0) - 1 } 
              : eachProduct
            )
          );
        };

  const handleRemove = (currentId:number) => {
    setProducts((previous) => previous.filter((eachProduct) => eachProduct.id !== currentId));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
        <main className="flex-1 p-6">
          <Headbar Quantity={totalCartItems} />
          <input
            type="text"
            placeholder="Search by name"
            className="w-full p-2 border rounded mb-4"
          />
          <ProductTable
            products={products}
            onRemove={handleRemove}
            onIncrease = {increaseQuantity}
            onDecrease = {decreaseQuantity}
          />
        </main>
    </div>
  );
}

