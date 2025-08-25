
import { fetchCarts } from "@/api/cart/ApiCart";
import type { CartContextType, CartTypes, ProviderPropsType } from "@/features/dashboard/CartTypes";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<CartContextType>({} as CartContextType )

export const CartProvider = ({children}:ProviderPropsType) =>{

    const [carts, setCarts] = useState<CartTypes[]>([])

    const fetchAllCarts  = async() =>{

        try {
            const apiResponse = await fetchCarts();
            console.log("This is carts related: ",apiResponse)
            setCarts(apiResponse) 
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }
    useEffect(()=>{
        fetchAllCarts()
    },[])

    console.log("this is the first cart data",carts)

    return(
        <CartContext.Provider 
            value={{
                 carts,


        }} >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () =>{
    const context = useContext(CartContext)
    if(!context){
        throw new Error(" useCartContext must be used within CartProvider.")
    }
    return context
}
