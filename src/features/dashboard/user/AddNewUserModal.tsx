



import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, type UserFormFieldType} from "@/validationSchema/userSchema/UserSchema";
import { useUserContext } from "@/context/UserContext";



export default function AddNewUserModal() {

    const {isAddNewUserModalOpen,setAddNewUserModalOpen,ConfirmAddNewUser} = useUserContext();

    const {register,reset,handleSubmit, formState:{errors} } = useForm<UserFormFieldType>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    })

    const onSubmit = async(data:UserFormFieldType) =>{
        const success = await ConfirmAddNewUser(data);
        if (success){
            reset()
        }
    }

    const handleClose = () => {
        setAddNewUserModalOpen(false)
    }

    if (!isAddNewUserModalOpen){
        return null;
    }

  return (
    <>
        <div  
            className="fixed inset-0  z-50  backdrop-brightness-40"
            onClick={handleClose}
        />
        <div className="fixed inset-0 flex justify-center items-center z-50  h-auto w-1/3  p-2 " >
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md h-auto overflow-y-auto">
                <div className="text-2xl text-black mb-5 text-center font-bold ">
                    Add New User
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
                            className="px-4 py-2 bg-gray-500 text-white hover:bg-gray-700 hover:font-bold rounded"
                            type="button"
                            onClick={handleClose}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-4 py-2 bg-green-500 text-white hover:bg-green-700 hover:font-bold rounded   transition duration-300 text-font"
                                type="submit"
                            >Create User
                            </button>
                        </div>
                    </div>
                </form>
            </div>
         </div>
    </>
  )
}


