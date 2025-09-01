
import axios from "@/api/auth/Api";
import type { CartTypes, CartWithProductDetailsType,} from "@/features/dashboard/CartTypes";


export const fetchCarts = async() => {
  const response = await axios.get("/carts")
  return response.data;
}

export const removeCart = async(id:number) => {
  const response = await axios.delete(`/carts/${id}`)
  return response.data;
}

export const fetchSingleCart = async(id:number) =>{
  const response = await axios.get(`/carts/${id}`)
  return response.data
}

export const addNewCart = async(NewCart:CartWithProductDetailsType): Promise<CartTypes> => {
  const response = await axios.post<CartTypes>("/users",NewCart)
  return response.data;
}

export const updateCart = async(id:number, editedCart:CartWithProductDetailsType) =>{
  const response = await axios.put(`/carts/${id}`, {...editedCart})
  return response.data
}

