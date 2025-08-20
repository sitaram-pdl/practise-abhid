

import { createContext,  useContext,  useEffect, useState } from "react";
import {fetchUser, removeUser,} from "@/api/user/ApiUser"
import {type UserContextType, type ProviderPropsType , type UsersType} from "@/features/dashboard/UserTypes"


const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({children}:ProviderPropsType) =>{
  
  const [users, setUsers] = useState<UsersType[]>([]);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [notificationMessage, setNotificationMessage] = useState(""); 
 

// .............................................................................
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
  // .................................................................................

  const handleRemove = (id:number) =>{
    setDeleteTargetId(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async() => {

    if (!deleteTargetId) return;
    try{
        await removeUser(deleteTargetId)
        setUsers((prev) => prev.filter((p) => p.id !== deleteTargetId)); 
        setNotificationMessage("Deleted successfully!");
    } catch (error) {
      console.log("Error deleting a user", error)
      setNotificationMessage("Failed to delete User.");
    } finally{
      setDeleteModalOpen(false)
      setDeleteTargetId(null)
    }
  }
  // ...............................................................................

return (

    <UserContext.Provider  value = {{
      users,
      notificationMessage,
      isDeleteModalOpen,
      deleteTargetId,
      setDeleteModalOpen,
      setNotificationMessage,
      setDeleteTargetId,
      handleRemove,
      confirmDelete,
      }}>
      {children}
    </UserContext.Provider>
)}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context){
    throw new Error(" useUserContext must be used within a UserProvider")
  }
  return context
}
