
import UserRow from "./UserRow"
import {type UsersType} from "@/features/dashboard/UserTypes"

interface UserTablePropsType {
  filteredUsers: UsersType[];
}

export default function UserTable({filteredUsers}:UserTablePropsType) {

    return (
        <table className="w-full table-auto border"> {/* Add table-auto for proper sizing */}
            <thead className="w-full bg-gray-500 text-lg text-white">
                <tr className="w-full">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Username</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Password</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody className="w-full">
                {filteredUsers.map((eachUser) => (
                    <UserRow 
                        key={eachUser.id}
                        eachUser={eachUser}
                    />
                ))}
            </tbody>
        </table>
    )
}