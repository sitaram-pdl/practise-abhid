
// import { useState } from "react";
import UserTable from "./UserTable";


export default function User() {



  return (
     <div className="flex h-auto absolute left-72 right-2 top-20  
    shadow-[2px_2px_5px_1px_rgba(0,0,0,0.5)]">
   
        <main className="flex-1 p-6 bg-white rounded ">
            <div className="flex justify-between items-center border-t py-4 pr-2 ">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="w-1/3 p-2 border rounded"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  // onClick={handleAddNewProduct}
                  >
                  Add New Product
                </button>
            </div>
            <div>
                <UserTable />
            </div>
        </main>

    </div>
  )
}
