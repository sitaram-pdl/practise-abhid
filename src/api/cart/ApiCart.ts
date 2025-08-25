



import axios from "@/api/auth/Api";



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

