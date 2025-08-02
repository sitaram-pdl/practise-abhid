
import { useState } from "react"
function Login() {

    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState({ userName: "", password: "" })

   const handleButtonClick = () => {
    const newErrors = {
      userName: userName.trim() === "" ? "Username is required" : "",
      password: password.trim() === "" ? "Password is required" : "",
    }
    setErrors(newErrors)

  }

  return (
    <div className="flex ">
        <div className = " bg-indigo-600 w-2/5 h-screen text-white font-semibold  flex" >
            <p className=" flex justify-start items-end ml-3 mb-5 text-3xl" > Yarsa Test Part Two</p>
        </div> 
        <div className = "bg-grey-100 w-3/5  flex justify-center items-center" >

            <div className = "bg-white w-5/10 flex flex-col px-5 py-5 rounded-md shadow-[1px_1px_8px_rgb(0,0,0,0.3)]" >
                 
                <div className = "text-2xl font-semibold mx-1 mb-5" >Login</div>
                <div className = "flex flex-col mx-1 mb-3">
                    <label className = " text-gray-700  text-base font-normal"
                    htmlFor="zUserName">Username </label>
                    <input 
                        className = "border-1 px-3 py-2 rounded  "
                        type = "text" 
                        id = "zUserName"
                        placeholder = "Enter Username"
                    />
                  
                </div>

                <div className = "flex flex-col mx-1 mb-4"> 
                    <label htmlFor="zPassword">Password </label>
                    <input 
                        className = "border-1 px-3 py-2 rounded "
                        type = "text" 
                        id = "zPassword"
                        placeholder = "Enter Password"            
                    />
                </div>

                <div className = "mx-1 mb-3"> 
                    <button className="bg-indigo-600 hover:opacity-60  w-full rounded-md text-white px-4 py-2 " 
                        onClick={handleButtonClick}
                    >Sign In</button>
                </div>

                <div className = " flex flex-col text-sm text-blue-700 mx-1 items-center leading-4">
                    <p className="text-gray-500">Demo credentials:</p>
                    <p>username: johnd | password: m38rmF$ </p>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Login

