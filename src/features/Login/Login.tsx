
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

// now, define Zod schema with all validations...........
const loginSchema = z.object({
  Username: z.string()
    .min(3, "Minimum length of username is 3")
    .max(20, "Maximum length of username is 20"),
  Password: z.string()
    .min(8, "Minimum length of password is 8")
    .max(20, "Maximum length of password is 20")
    .regex(/[A-Z]/, "At least one uppercase letter required")
    .regex(/[a-z]/, "At least one lowercase letter required")
    .regex(/[0-9]/, "At least one number required")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "At least one special character required")
});

type FormFields = z.infer<typeof loginSchema>;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<FormFields>({ 
    resolver: zodResolver(loginSchema),
    defaultValues: {
      Username: "",
      Password: "",
    }
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
      reset();
      throw new Error();
    } catch (error) {
      setError("Username", {
        message: "This username is already taken"
      });
      setError("Password", {
        message: "This password is already taken"
      });
    }
  };

  return (
    <div className="flex">
      <div className="bg-indigo-600 w-2/5 h-screen text-white font-semibold flex">
        <p className="flex justify-start items-end ml-3 mb-5 text-3xl">Yarsa Test Part Two</p>
      </div> 
      <div className="bg-grey-100 w-3/5 flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} 
          className="bg-white w-5/10 flex flex-col px-5 py-5 rounded-md shadow-[1px_1px_8px_rgb(0,0,0,0.3)]">
          <div className="text-2xl font-semibold mx-1 mb-5">Login</div>
          <div className="flex flex-col mx-1 mb-3">
            <label className="text-gray-700 text-base font-normal" htmlFor="zUserName">
              Username
            </label>
            <input 
              {...register("Username")}
              className="border-1 px-3 py-2 rounded"
              type="text" 
              id="zUserName"
              placeholder="Enter Username"
            />
            {errors.Username && (
              <div className="text-red-500">{errors.Username.message}</div>
            )}
          </div>
          <div className="flex flex-col mx-1 mb-4"> 
            <label htmlFor="zPassword">Password</label>
            <input 
              {...register("Password")}
              className="border-1 px-3 py-2 rounded"
              type="password"  //change type from "text" to "password" for better security.... 
              id="zPassword"
              placeholder="Enter Password"            
            />
            {errors.Password && (
              <div className="text-red-500">{errors.Password.message}</div>
            )}
          </div>
          <div className="mx-1 mb-3"> 
            <button 
              className={`hover:opacity-60 w-full rounded-md text-white px-4 py-2 ${
                isSubmitting ? "bg-green-500" : "bg-indigo-600"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Sign In"}
            </button>
          </div>
          <div className="flex flex-col text-sm text-blue-700 mx-1 items-center leading-4">
            <p className="text-gray-500">Demo credentials:</p>
            <p>username: johnd | password: m38rmF$</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;















