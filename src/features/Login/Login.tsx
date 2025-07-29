





import { useState } from "react"

import { Button } from "@/components/ui/button"



function Login() {

    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [signal , setSignal] = useState<boolean>(false)

    const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUserName(e.target.value)
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value)
    }

    const handleButtonClick = () =>{
        setSignal(true)
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
                        className = "border-1 px-3 py-2 rounded "
                        type = "text" 
                        id = "zUserName"
                        placeholder = "Enter Username"
                        value = {userName}
                        onChange = {handleChangeUserName}
                    />
                </div>

                <div className = "flex flex-col mx-1 mb-4"> 
                    <label htmlFor="zPassword">Password </label>
                    <input 
                        className = "border-1 px-3 py-2 rounded "
                        type = "text" 
                        id = "zPassword"
                        placeholder = "Enter Password"
                        value = {password}
                        onChange = {handleChangePassword}
                    />
                </div>

                <div className = "mx-1 mb-3"> 
                    <Button className="bg-indigo-600 hover:opacity-80 hover:bg-indigo-600  w-300px " 
                    onClick = {handleButtonClick}
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


