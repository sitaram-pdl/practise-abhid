
import { useState } from "react"

import { Button } from "@/components/ui/button"


function Login() {

    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [signal , setSignal] = useState<boolean>(false)
    const [errors, setErrors] = useState({ userName: "", password: "" })

   
   const handleButtonClick = () => {
    const newErrors = {
      userName: userName.trim() === "" ? "Username is required" : "",
      password: password.trim() === "" ? "Password is required" : "",
    }
    setErrors(newErrors)

    if (newErrors.userName === "" && newErrors.password === "") {
      setSignal(true)
    } else {
      setSignal(false)
    }
  }

  return (
    <div className="flex ">
        <div className = " bg-indigo-600 w-2/5 h-screen text-white font-semibold  flex" >
            <p className=" text-2rem flex justify-start items-end ml-3 mb-5 text-3xl" > Yarsa Test Part Two</p>
        </div> 
        <div className = "bg-grey-100 w-3/5  flex justify-center items-center" >

            <div className = "bg-white w-7/10 flex flex-col px-5 py-5 rounded-md shadow-[1px_1px_8px_rgb(0,0,0,0.3)]" >
                 
                <div className = "text-2xl font-semibold mx-1 mb-5" >Login</div>
                <div className = "flex flex-col mx-1 mb-3">
                    <label className = " text-gray-700  text-base font-normal"
                    htmlFor="zUserName">Username </label>
                    <input 
                        className = {`border-1 px-3 py-2 rounded ${errors.userName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
                        type = "text" 
                        id = "zUserName"
                        placeholder = "Enter Username"
                        value = {userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    {errors.userName && <span className="text-red-500 text-sm mt-1">{errors.userName}</span>}
                </div>

                <div className = "flex flex-col mx-1 mb-4"> 
                    <label htmlFor="zPassword">Password </label>
                    <input 
                        className = {`border-1 px-3 py-2 rounded ${errors.userName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
                        type = "text" 
                        id = "zPassword"
                        placeholder = "Enter Password"
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                     {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                </div>

                <div className = "mx-1 mb-3"> 
                    <Button className="bg-indigo-600 hover:opacity-80 hover:bg-indigo-600  w-300px " 
                        onClick={handleButtonClick}
                    >Sign In</Button>
                </div>
                <div className = " flex flex-col text-gray-600 mx-1 items-center leading-4">
                    <p>Demo credentials:</p>
                    <p>username: {signal ? userName : null} | password: {signal ? password: null} </p>
                </div>
            </div>
        </div>
    

    </div>
  )
}

export default Login

