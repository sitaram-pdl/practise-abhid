

import { useCartContext } from "@/context/CartContext";
import CartRow from "./CartRow";


export default function CartTable() {

    const {carts} = useCartContext()

  return (

    <table className="w-full table-auto border">
        <thead className="bg-neutral-200 text-gray-600 text-lg">
            <tr className="w-full">
                <th className="px-4 py-3 text-left">Card ID</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Total Quantity</th>
                <th className="px-4 py-3 text-left">Products</th>
                <th className="px-4 py-3 text-left">Actions</th>
            </tr>
        </thead>
        <tbody className="w-full">
            {carts.map((eachItem)=> 
                <CartRow 
                    key={eachItem.id}
                    eachItem = {eachItem}
                />
            )}
        </tbody>
    </table>
  )
}
