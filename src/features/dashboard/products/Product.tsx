


import { useEffect, useState } from "react";
import axios from "../../../api/Api"; // now , here we use axios that was previously created.

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/products") // here, merge happens = baseURL + /products → full URL
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Products</h1>
      <ul>
        {products.map((p: any) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
