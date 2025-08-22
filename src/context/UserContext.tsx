

import { createContext,  useContext,  useEffect, useState } from "react";
import {addNewUser, fetchSingleUser, fetchUser, removeUser, updateSingleUser,} from "@/api/user/ApiUser"
import {type UserContextType, type ProviderPropsType , type UsersType, type CreateNewUser,} from "@/features/dashboard/UserTypes"


const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({children}:ProviderPropsType) =>{
  
  const [users, setUsers] = useState<UsersType[]>([]);
  const [singleUser, setSingleUser] = useState<UsersType>({} as UsersType )
  const [isLoading, setIsLoading] = useState(false);


  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [notificationMessage, setNotificationMessage] = useState(""); 
  const [isAddNewUserModalOpen, setAddNewUserModalOpen] = useState(false)
  const [editUser, setEditUser] = useState<UsersType | null>(null)
 

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
  const ConfirmAddNewUser = async(NewUser:CreateNewUser) =>{
    try {
      setIsLoading(true)
      setNotificationMessage("");
      const apiResponse = await addNewUser(NewUser);
      console.log("this is Add new user api response: ",apiResponse)
      // setUsers((prev)=> [...prev,{...NewUser}] )
      setNotificationMessage("New User Added successfully!");   
      setTimeout(() => {
        setAddNewUserModalOpen(false);
        setIsLoading(false);
       }, 300);
      return true; 

    }catch (error) {
      console.log("Error Adding a new user: ", error)
      setNotificationMessage("Failed to Add a New User!!!");
      return false;
    }
  }
  // ..................................................................................

  const handleUpdateUser = (edidtedUser:UsersType) =>{
    setEditUser(edidtedUser)
    setAddNewUserModalOpen(true)
  }

  const ConfirmUpdateUserModal = async(id:number ,edidtedUser:CreateNewUser) => {
      try {
        setIsLoading(true)
        setNotificationMessage("");
        const apiResponse = await updateSingleUser(id,edidtedUser);
        console.log("this is update user api response: ",apiResponse)
        // setUsers((prev)=> prev.map((u)=> u.id === id ?{...prev,...apiResponse}: u ))
        setNotificationMessage("User Updated successfully!");  
        setTimeout(() => {
              setAddNewUserModalOpen(false);
              setIsLoading(false);
          }, 100);
        setEditUser(null);
        return true;  
      } catch (error) {
        console.log("Error Updating a User: ", error)
        setNotificationMessage("Failed to Update a User!");
        return false;
      } 
  }

  // ..................................................................................

return (

    <UserContext.Provider  value = {{
      users,
      editUser,
      singleUser,
      notificationMessage,
      isDeleteModalOpen,
      deleteTargetId,
      isAddNewUserModalOpen,
      isLoading,

      setDeleteModalOpen,
      setNotificationMessage,
      setDeleteTargetId,
      setAddNewUserModalOpen,
      setEditUser,

      handleRemove,
      confirmDelete,
      HandleAddNewUser,
      handleUpdateUser,
      ConfirmAddNewUser,
      fetchSingleUserData,
      ConfirmUpdateUserModal,
      
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
