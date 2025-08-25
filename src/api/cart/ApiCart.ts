



import axios from "@/api/auth/Api";



export const fetchCarts = async() => {
  const response = await axios.get("/carts")
  return response.data;
}



