
import { useUserContext } from "@/context/UserContext"
import {type UsersType} from "@/features/dashboard/UserTypes"
import { useState } from "react"
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"


interface UserRowPropsType{
    eachUser:UsersType
}

export default function UserRow({eachUser}: UserRowPropsType ) {

    const nevigate = useNavigate()
    const {handleRemove, fetchSingleUserData} = useUserContext();
    const [showPassword, setShowPassword] = useState(false)


    const handleNavigateToSingleUserPage = (id:number) =>{
        fetchSingleUserData(id)
        nevigate(`/users/${id}`)
    }

    return (
        <tr className="w-full hover:bg-gray-100 border-t border-b ">
            <td className="px-4 py-3">
                {eachUser.id}
            </td>
            <td className="px-4 py-3"
                onClick={() => handleNavigateToSingleUserPage(eachUser.id)}
                >
                {eachUser.username}
                
            </td>
            <td className="px-4 py-3"
                onClick={() => handleNavigateToSingleUserPage(eachUser.id)}
            
            >
                {eachUser.email}
            </td>
            <td className="w-1/4 px-4 py-3">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex-shrink-0 focus:outline-none cursor-pointer"
                    >
                        {showPassword ? <FaEyeSlash className="text-red-500" /> : <FaEye className="text-green-500" />}
                    </button>
                    <span className="font-mono inline-block min-w-35"> {/* Fixed width */}
                        {showPassword ? eachUser.password : "********"}
                    </span>
                </div>
            </td>
            <td className="px-4 py-3">
                <button className="cursor-pointer"
                    title="delete"
                    onClick={()=>handleRemove(eachUser.id)}
                    >
                    <FaTrash className="text-gray-500 bg hover:text-red-500"/>
                </button>
            </td>
        </tr>
    )
}

