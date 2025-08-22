

import { createContext,  useContext,  useEffect, useState } from "react";
import {addNewUser, fetchSingleUser, fetchUser, removeUser,} from "@/api/user/ApiUser"
import {type UserContextType, type ProviderPropsType , type UsersType,} from "@/features/dashboard/UserTypes"


const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({children}:ProviderPropsType) =>{
  
  const [users, setUsers] = useState<UsersType[]>([]);
  const [singleUser, setSingleUser] = useState<UsersType>({} as UsersType )

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [notificationMessage, setNotificationMessage] = useState(""); 
  const [isAddNewUserModalOpen, setAddNewUserModalOpen] = useState(false)
 

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

  // .................................................................................

  const fetchSingleUserData = async(id:number) =>{
    try {
      const data = await fetchSingleUser(id)
      setSingleUser(data)
    } catch (error) {
      console.error("Error fetching single user:", error)
    }
  }

  // console.log("This is a data after fetching all users: ",users)

  // .................................................................................

  const handleRemove = (id:number) =>{
    setDeleteTargetId(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async() => {

    if (!deleteTargetId) return;
    try{
        await removeUser(deleteTargetId)
        // setUsers((prev) => prev.filter((p) => p.id !== deleteTargetId)); 
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

  const HandleAddNewUser = () => {
    setAddNewUserModalOpen(true)
  }
  const ConfirmAddNewUser = async(NewUser:UsersType) =>{
    try {
      setNotificationMessage("");
      const apiResponse = await addNewUser(NewUser);
      console.log("this is api response: ",apiResponse)
      // setUsers((prev)=> [...prev,{...NewUser}] )
      setNotificationMessage("New User Added successfully!");   
      return true;   
    } catch (error) {
      console.log("Error Adding a new user: ", error)
      setNotificationMessage("Failed to Add a New User!!!");
      return false;
    }finally{
      setAddNewUserModalOpen(false)
    }

  }
  // ..................................................................................


  // ..................................................................................


return (

    <UserContext.Provider  value = {{
      users,
      singleUser,
      notificationMessage,
      isDeleteModalOpen,
      deleteTargetId,
      isAddNewUserModalOpen,

      // setSingleUser,
      setDeleteModalOpen,
      setNotificationMessage,
      setDeleteTargetId,
      setAddNewUserModalOpen,

      handleRemove,
      confirmDelete,
      HandleAddNewUser,
      ConfirmAddNewUser,
      fetchSingleUserData,
      
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
