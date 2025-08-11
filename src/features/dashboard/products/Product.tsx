
import { useEffect, useState } from "react";
import axios from "@/api/Api"; // now , here we use axios that was previously created.
import Sidebar from "./Sidebar";
import Headbar from "./Headbar";
import ProductTable from "./ProductTable"
import CartDrawer from "./CartDrawer";


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
  // Quantity?: number; 
}

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cartOpen, setCartOpen] = useState(false); // for cart .....
 
  /*
  //here, we just the Load products from localStorage or from API...................
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      // Load from local storage...........
      setProducts(JSON.parse(savedProducts));
    } else {
      // Fetch from API.........
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
    }
  }, []);

  // Save products to localStorage whenever they change................
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);
*/

useEffect(() => {
  axios
    .get("/products")
    .then((response) => {
       const savedCart = localStorage.getItem("cart"); 
       const cartData: Record<number, number> = savedCart ? JSON.parse(savedCart) : {};

       const mergedProducts = response.data.map((p: ProductType) => ({
         ...p,
         quantity: cartData[p.id] || 0 // Merge saved quantity with API product
       }));

       setProducts(mergedProducts);
    })
    .catch((error) => console.error("Error fetching products:", error));
}, []);

 useEffect(() => {
   if (products.length > 0) {
     // Save only quantities, not the whole product data
     const cartData: Record<number, number> = {};
     products.forEach((p) => {
       if (p.quantity && p.quantity > 0) {
         cartData[p.id] = p.quantity;
       }
     });
     localStorage.setItem("cart", JSON.stringify(cartData));
   }
 }, [products]);



  console.log(products) // see the product to know the details about it and further analysis it.

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

  const handleClearCart = () => {
    setProducts((prev) => prev.map((p) => ({ ...p, quantity: 0 })));
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
        <main className="flex-1 p-6">
          <Headbar Quantity={totalCartItems} onCartClick={() => setCartOpen(true)} />
          {/* <Headbar Quantity={totalCartItems} /> */}
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
        {/* Cart Drawer..................................... */}
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={products.filter((eachProduct) => (eachProduct.quantity || 0) > 0)}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onClear={handleClearCart}
          onRemove={handleRemove}
        />

    </div>
  );
}



