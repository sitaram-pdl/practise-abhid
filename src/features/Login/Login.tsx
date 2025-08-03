
import { useForm, type FieldValues , type SubmitHandler   } from "react-hook-form"


type FormFields = {
    Username: string;
    Password: string;
}


function Login() {
    const {register,handleSubmit, formState:{errors, isSubmitting}, reset ,setError } = useForm<FormFields>()


    const onSubmit: SubmitHandler<FormFields> = async (data:FieldValues) =>{

       try {
        await new Promise ((resolve)=> setTimeout(resolve,2000))
        console.log(data)
        reset()
        throw new Error
    
       } catch (error) {
        setError("Username",{
            message: "This Username is already taken"
        })
        
       }
    }

  
  return (
    <div className="flex ">
        <div className = " bg-indigo-600 w-2/5 h-screen text-white font-semibold  flex" >
            <p className=" flex justify-start items-end ml-3 mb-5 text-3xl" > Yarsa Test Part Two</p>
        </div> 
        <div className = "bg-grey-100 w-3/5  flex justify-center items-center" >

            <form onSubmit={handleSubmit(onSubmit)} 
                className = "bg-white w-5/10 flex flex-col px-5 py-5 rounded-md shadow-[1px_1px_8px_rgb(0,0,0,0.3)]"  >
                    <div className = "text-2xl font-semibold mx-1 mb-5" >Login</div>
                    <div className = "flex flex-col mx-1 mb-3">
                        <label className = " text-gray-700  text-base font-normal"
                            htmlFor="zUserName">Username </label>

                         <input 
                            {...register("Username",{
                                required:"Username is required",
                                 minLength: {
                                    value: 3,
                                    message: 'Minimum length of username is 3'
                                    },
                                maxLength: {
                                    value: 20,
                                    message: 'Maximum length of username is 20'
                                    },
                            })}
                            className = "border-1 px-3 py-2 rounded  "
                            type = "text" 
                            id = "zUserName"
                            placeholder = "Enter Username"
                        />
                        {errors.Username && (<div className=" text-red-500">{errors.Username.message}</div> )}

                  
                    </div>
                    <div className = "flex flex-col mx-1 mb-4"> 
                        <label htmlFor="zPassword">Password </label>
                        <input 
                                {...register("Password",{
                                required:"Password is required",
                                 minLength: {
                                    value: 8,
                                    message: 'Minimum length of Password is 8'
                                    },
                                maxLength: {
                                    value: 20,
                                    message: 'Maximum length of Password is 20'
                                    },
                                validate: (value) => {
                                    const hasUpperCase = /[A-Z]/.test(value);
                                    const hasLowerCase = /[a-z]/.test(value);
                                    const hasNumber = /[0-9]/.test(value);
                                    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                                    
                                    if (!hasUpperCase) return "At least one uppercase letter required";
                                    if (!hasLowerCase) return "At least one lowercase letter required";
                                    if (!hasNumber) return "At least one number required";
                                    if (!hasSpecialChar) return "At least one special character required";
                                    return true;
                                    }
                            })}
                            className = "border-1 px-3 py-2 rounded "
                            type = "text" 
                            id = "zPassword"
                            placeholder = "Enter Password"            
                        />
                         {errors.Password && (<div className=" text-red-500">{errors.Password.message}</div> )}
                    </div>
                    <div className = "mx-1 mb-3"> 
                        <button 
                        className = {`hover:opacity-60  w-full rounded-md text-white px-4 py-2   ${isSubmitting ? "bg-green-500": "bg-indigo-600" }   `}
                        disabled = {isSubmitting}
                        >
                        {isSubmitting ?  "Loading..." : "Sign In"}</button>
                    </div>

                <div className = " flex flex-col text-sm text-blue-700 mx-1 items-center leading-4">
                    <p className="text-gray-500">Demo credentials:</p>
                    <p>username: johnd | password: m38rmF$ </p>
                </div>
            </form>
        </div>
    </div>
  )
}
export default Login
