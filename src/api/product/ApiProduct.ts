

import axios from "@/api/auth/Api";
import { type ProductType, type CartDataType, type CreateNewProduct, type ProductApiResponse } from "@/features/dashboard/types";

// .........Get (fetch) all products...................

export const fetchProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};


//.............Get (fetch) a single product.............

// export const fetchSingleProduct = async (id: number) => {
// const response =  await axios.get(`/products/${id}`);
// return response.data
// }

// ......Delete a product.....................

export const deleteProduct = async (id: number) => {
  await axios.delete(`/products/${id}`);
};

// ........Update a product....................

export const updateProduct = async (id: number, productData: CreateNewProduct): Promise<ProductApiResponse> => {
  const response = await axios.put<ProductApiResponse>(`/products/${id}`, {
    ...productData,
  });
  return response.data;
};

//....Add a new product...................

export const addNewProduct = async (productData: CreateNewProduct): Promise<ProductApiResponse> => {
  const response = await axios.post<ProductApiResponse>("/products", {
    ...productData,
    rating: { rate: 0, count: 0 } // API requirement
  });
  return response.data;
};

// ................handler for saving and loading Quantity from local storage..........

export const saveQuantityToLocalStorage = (products: ProductType[]) => {
  const cartData: CartDataType = {};
  products.forEach((p) => {
    if (p.quantity && p.quantity > 0) {
      cartData[p.id] = p.quantity;
    }
  });
  localStorage.setItem("cart", JSON.stringify(cartData));
};

export const loadQuantityFromLocalStorage = (products: ProductType[]) => {
  const savedCart = localStorage.getItem("cart");
  const cartData: CartDataType = savedCart ? JSON.parse(savedCart) : {};
  return products.map((p) => ({
    ...p,
    quantity: cartData[p.id] || 0,
  }));
};


