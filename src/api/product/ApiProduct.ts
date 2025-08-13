


import axios from "@/api/auth/Api";
import {type ProductType , type CartDataType } from "@/features/dashboard/products/types";

// 

export const fetchProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};

export const deleteProduct = async (id: number) => {
  await axios.delete(`/products/${id}`);
};

// const axios = require('axios');
// axios.delete('https://fakestoreapi.com/products/1')
//   .then(response => console.log(response.data));

export const addNewProduct = async (id: number) => {
  await axios.post(`/products', product`)
};


// const axios = require('axios');
// const product = { title: 'New Product', price: 29.99 };
// axios.post('https://fakestoreapi.com/products', product)
//   .then(response => console.log(response.data));

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


