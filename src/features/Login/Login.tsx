
import { useState } from "react"

// import { Button } from "@/components/ui/button"

type combined =  string|number;

function Login() {

    const [userName, setUserName] = useState<combined>("")
    const [password, setPassword] = useState<combined>("")

    const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUserName(e.target.value)
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value)
    }

  return (
    <div>
        <div> Yarsa Test Part Two </div>
        <div>
            <div>
                <div>Login</div>
                <div>
                    <label htmlFor="zUserName">Username : </label>
                    <input 
                        type = "text" 
                        id = "zUserName"
                        placeholder = "Enter Username"
                        value = {userName}
                        onChange = {handleChangeUserName}
                    />
                </div>

                <div> 
                    <label htmlFor="zPassword">Password : </label>
                    <input 
                        type = "text" 
                        id = "zPassword"
                        placeholder = "Enter Password"
                        value = {password}
                        onChange = {handleChangePassword}
                    />
                </div>

                <div> Sign In </div>
                <div>
                    <p>Demo credentials:</p>
                    <p>username: johnd | password: m38rmF$ </p>
                </div>
            </div>
        </div>
    

    </div>
  )
}
export default Login