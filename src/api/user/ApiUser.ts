
import axios from "@/api/auth/Api";



export const fetchUser = async() => {
  const response = await axios.get("/users")
  return response.data;
}

export const removeUser = async(id:number) => {
  const response = await axios.delete(`/users/${id}`)
  return response.data;
}

 

