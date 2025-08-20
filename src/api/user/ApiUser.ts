
import axios from "@/api/auth/Api";



export const fetchUser = async() => {
  const response = await axios.get("/users")
  return response.data;
}

 

