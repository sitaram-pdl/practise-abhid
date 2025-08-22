

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import { z } from "zod";
import axios from "axios";


const loginSchema = z.object({
        Username: z.string()
            .min(3, "Minimum length of username is 3")
            .max(20, "Maximum length of username is 20"),
        Password: z.string()
            .min(6, "Minimum length of password is 6")
            .max(20, "Maximum length of password is 20")
            .regex(/[!@#$%^&*(),.?":{}|<>]/, "At least one special character required")
            // .regex(/[A-Z]/, "At least one uppercase letter required")
            // .regex(/[0-9]/, "At least one number required")
            // .regex(/[a-z]/, "At least one lowercase letter required")
        });

type FormFields = z.infer<typeof loginSchema>;

function Login() {

  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset,
    setError
  } = useForm<FormFields>({ 
                        resolver: zodResolver(loginSchema), // integrating zod in react_hook_for
                        defaultValues: {
                        Username: "",
                        Password: "",
                        }
                        });
 
const onSubmit: SubmitHandler<FormFields> = async (data) => {
  try {
    const response = await axios.post("https://fakestoreapi.com/auth/login", {
      username: data.Username,
      password: data.Password,
    });
    // Save the token
    localStorage.setItem("token", response.data.token);
    // Redirect
    navigate("/products");
    // window.location.href = "/products";
    
  } catch (error: any) {
  const msg = error.response?.data?.message || "Login failed";
  setError("Username", { message: msg });
  setError("Password", { message: msg });
}
};

  return (
  
    <div className="flex flex-col md:flex-row min-h-screen">
    
      <div className="bg-indigo-600 w-full md:w-2/5 lg:w-1/3 text-white font-semibold flex p-4 md:p-0">
        <p className="text-xl md:text-2xl lg:text-3xl self-end mb-4 ml-2 md:ml-4">Yarsa Test Part Two</p>
      </div> 
      
      <div className="w-full bg-gray-200 md:w-3/5 lg:w-2/3 flex justify-center items-center p-4 md:p-8">
     
        <form onSubmit={handleSubmit(onSubmit)} 
          className="bg-white w-full max-w-md flex flex-col p-6 rounded-md shadow-lg">
          
          <h1 className="text-2xl font-semibold mb-6">Login</h1>
          
    
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="zUserName">
              Username
            </label>
            <input 
              {...register("Username")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text" 
              id="zUserName"
              placeholder="Enter Username"
            />
            {errors.Username && (
              <div className="text-red-500 text-sm mt-1">{errors.Username.message}</div>
            )}
          </div>
          
          <div className="mb-6"> 
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="zPassword">
              Password
            </label>
            <input 
              {...register("Password")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="password"
              id="zPassword"
              placeholder="Enter Password"            
            />
            {errors.Password && (
              <div className="text-red-500 text-sm mt-1">{errors.Password.message}</div>
            )}
          </div>
          <button 
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${
              isSubmitting 
                ? "bg-green-500 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Sign In"}
          </button>
          
          <div className="mt-6 text-center text-sm text-blue-600">
            <p className="text-gray-500">Demo credentials:</p>
            <p>username: johnd | password: m38rmF$</p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;



















