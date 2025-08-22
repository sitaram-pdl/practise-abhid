
import axios from "@/api/auth/Api";
import { type CreateNewUser, type UsersType,} from "@/features/dashboard/UserTypes"


export const fetchUser = async() => {
  const response = await axios.get("/users")
  return response.data;
}

export const removeUser = async(id:number) => {
  const response = await axios.delete(`/users/${id}`)
  return response.data;
}

export const addNewUser = async(NewUser:CreateNewUser): Promise<UsersType> => {
  const response = await axios.post<UsersType>("/users",NewUser)
  return response.data;
}

export const fetchSingleUser = async(id:number) =>{
  const response = await axios.get(`/users/${id}`)
  return response.data
}

export const updateSingleUser = async(id:number, edidtedUser:CreateNewUser):Promise<UsersType> => {
  const response = await axios.put<UsersType>(`/users/${id}`,{...edidtedUser})
  return response.data
}

