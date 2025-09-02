

import axios from "@/api/auth/Api";
import { type CreateNewProduct, type ProductApiResponse, type CartQuantityType } from "@/features/dashboard/ProductTypes";


export const fetchProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};

export const fetchSingleProduct = async (id: number) => {
const response =  await axios.get(`/products/${id}`);
return response.data
}

export const deleteProduct = async (id: number) => {
  await axios.delete(`/products/${id}`);
};

export const updateProduct = async (id: number, productData: CreateNewProduct): Promise<ProductApiResponse> => {
  const response = await axios.put<ProductApiResponse>(`/products/${id}`, {
    ...productData,
  });
  return response.data;
};

export const addNewProduct = async (productData: CreateNewProduct): Promise<ProductApiResponse> => {
  const response = await axios.post<ProductApiResponse>("/products", {
    ...productData,
    rating: { rate: 0, count: 0 } // API requirement
  });
  return response.data;
};

export const saveCartQuantityToLocalStorage = (cartQuantity:CartQuantityType) => {
  localStorage.setItem("cartQuantityData", JSON.stringify(cartQuantity));
};

export const loadCartQuantityFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cartQuantityData");
  return savedCart ? JSON.parse(savedCart): {}
};


