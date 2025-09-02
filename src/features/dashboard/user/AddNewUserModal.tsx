
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, type UserFormFieldType} from "@/validationSchema/userSchema/UserSchema";
import { useUserContext } from "@/context/UserContext";
import { useEffect} from "react";

export default function AddNewUserModal() {
    const {editUser,setEditUser,ConfirmUpdateUserModal,isAddNewUserModalOpen,setAddNewUserModalOpen,ConfirmAddNewUser, isLoading} = useUserContext();
    const {register,reset,handleSubmit, formState:{errors} } = useForm<UserFormFieldType>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    })
    useEffect(()=>{
        if(editUser){
            reset({
                username: editUser.username ,
                email: editUser.email,
                password: editUser.password,
            })
        }else{
            reset()
        }
    },[editUser,reset])

    const onSubmit = async(data:UserFormFieldType) =>{
        if(editUser){
            await ConfirmUpdateUserModal(editUser.id, data)
        }else{
        const success = await ConfirmAddNewUser(data);
        if (success){
            reset()
        }}
    }
    const handleClose = () => {
        setEditUser(null)
        setAddNewUserModalOpen(false)
    }
    if (!isAddNewUserModalOpen){
        return null;
    }

  return (
    <>
        <div  
        className="fixed inset-0 z-50 backdrop-brightness-40"
            onClick={handleClose}
        />
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md h-auto overflow-y-auto">
                <div className="text-2xl text-black mb-5 text-center font-bold ">
                    {editUser ? "Update User" : "Add New User"}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <div>
                            <label className="block mb-1">Username</label>
                            <input
                                {...register("username")} 
                                type="text"
                                placeholder="Enter Username"
                                className="w-full p-2 border rounded"
                            />
                            {errors.username && <p className="text-red-500">{errors.username.message}</p> }
                        </div>

                        <div>
                            <label className="block mb-1" >Email</label>
                            <input 
                                {...register("email")} 
                                type="text" 
                                placeholder="Enter Email"
                                className="w-full p-2 border rounded"
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p> }
                        </div>

                        <div>
                            <label className="block mb-1">Password</label>
                            <input 
                                {...register("password")} 
                                type="text" 
                                placeholder="Enter Password"
                                className="w-full p-2 border rounded"

                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p> }
                        </div>

                        <div  className="flex justify-between items-center w-full ">
                            <button
                            className="px-3 py-2 mx-3 bg-gray-500 text-white hover:bg-gray-700 hover:font-bold rounded text-font hover:px-4 hover:mx-2 transition-all duration-300 ease-in-out "
                            type="button"
                            onClick={handleClose}
                            >
                                Cancel
                            </button>

                            <button
                                className=' mx-3 bg-green-400 text-white px-3 py-2 font-bold rounded cursor-pointer hover:bg-green-600  hover:mx-2 hover:px-4 transition-all duration-300 ease-in-out' 
                                type="submit"
                                disabled={isLoading}
                            >{
                                isLoading
                                    ? editUser ? "Updating...": "Creating..."
                                    : editUser ? "Update User" : "Create User"
                            }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
         </div>
    </>
  )
}


