
import {type UsersType} from "@/features/dashboard/UserTypes"
import { useState } from "react"
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa"

export default function UserRow({eachUser}: {eachUser: UsersType}) {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <tr className="w-full hover:bg-gray-100">
            <td className="px-4 py-2">
                {eachUser.id}
            </td>
            <td className="px-4 py-2">
                {eachUser.username}
            </td>
            <td className="px-4 py-2">
                {eachUser.email}
            </td>
            <td className="w-1/4 px-4 py-2">
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
            <td className="px-4 py-2">
                <button className="cursor-pointer"
                    title="delete"
                    >
                    <FaTrash className="text-red-500 bg hover:text-red-700"/>
                </button>
            </td>
        </tr>
    )
}