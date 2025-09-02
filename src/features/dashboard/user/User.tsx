
import { useState } from "react";
import UserTable from "./UserTable";
import { useUserContext } from "@/context/UserContext";
import ConfirmDeleteModal from "@/features/dashboard/user/ConformDeleteModel"
import Notification from "./Notification";
import AddNewUserModal from "./AddNewUserModal";

export default function User() {
  const {users, notificationMessage, HandleAddNewUser} = useUserContext()
  const [searchTerm, setSearchTerm] = useState("")
  const filteredUsers = users.filter((eachUser) => eachUser.username.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  console.log("The filtered users is:",filteredUsers)

  return (
       <div className="flex min-h-screen absolute left-69 right-0 top-17">
        <main className="flex-1 p-6 w-full bg-white ">
            <div className="flex justify-between items-center border-t py-4 pr-2 ">
                <input
                  type="text"
                  placeholder="Search by username"
                  value={searchTerm}
                  onChange={(e)=>setSearchTerm(e.target.value)}
                  className="w-1/3 p-2 border rounded"
                />
                <button className="bg-green-500 cursor-pointer text-white font-bold mx-3 px-3 py-2 rounded hover:bg-green-600 hover:mx-2 hover:px-4 transition-all duration-300 ease-in-out "
                  onClick={HandleAddNewUser}
                  >
                  Add New User
                </button>
            </div>
            <div className="w-full">
                <UserTable filteredUsers={filteredUsers}  />
            </div>
        </main>
        <AddNewUserModal />
        <ConfirmDeleteModal />
        {notificationMessage &&
            <Notification key={`${notificationMessage}-${Date.now()}`} />
          }
         

    </div>
  )
}
