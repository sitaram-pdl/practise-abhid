
import { createContext, useEffect, useState } from "react";
import {fetchUser} from "@/api/user/ApiUser"
import {type UserContextType, type ProviderPropsType , type UsersType} from "@/features/dashboard/UserTypes"

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({children}:ProviderPropsType) =>{

  const [users, setUsers] = useState<UsersType[]>([]);
  const fetchUserData = async() => {
      try {
        const data = await fetchUser();
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
  }
  useEffect(()=>{
    fetchUserData()
  },[])

  console.log("This is a data after fetching all users: ",users)

return (

    <UserContext.Provider  value = {{
      users,
      }}
    >
      {children}
    </UserContext.Provider>
)}

