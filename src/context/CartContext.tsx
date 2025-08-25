
import { fetchCarts, fetchSingleCart, removeCart } from "@/api/cart/ApiCart";
import type { CartContextType, CartTypes, ProviderPropsType } from "@/features/dashboard/CartTypes";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<CartContextType>({} as CartContextType )

export const CartProvider = ({children}:ProviderPropsType) =>{

    const [carts, setCarts] = useState<CartTypes[]>([])
    const [singleCartData, setSingleCartData] = useState()

    const [isDeleteCartModalOpen, setDeleteCartModalOpen] = useState(false)
    const [deleteTargetId, setDeleteTargetId] = useState<number|null>(null)
    const [notificationMessage, setNotificationMessage] = useState(""); 
    
// ........................................................................
    const fetchAllCarts  = async() =>{
        try {
            const apiResponse = await fetchCarts();
            console.log("This is carts related data: ",apiResponse)
            setCarts(apiResponse) 
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }
    useEffect(()=>{
        fetchAllCarts()
    },[])
// ..............................................................................

    const handleDeleteCart= (id:number) => {
        setDeleteCartModalOpen(true)
        setDeleteTargetId(id)
    }

    const confirmDelete = async() =>{
        if (!deleteTargetId) return;
        try{
            setNotificationMessage("")
            await removeCart(deleteTargetId);
            // setCarts((prev)=> prev.filter((c) => c.id !== deleteTargetId))
            setNotificationMessage("Deleted Cart successfully.")

        } catch (error) {
            console.error("Error occured while deleting a cart: ", error)
            setNotificationMessage("Failed to delete a Cart.")
        }finally{
            setDeleteCartModalOpen(false);
            setDeleteTargetId(null);
        }

    }
// ..............................................................................

    const fetchSingleCartData = async(id:number) =>{
        try {
            const responseAPi = await fetchSingleCart(id)
            console.log("This is the  APi response of fetching single cart", responseAPi)
            setSingleCartData(responseAPi)
        }catch (error) {
            console.error("Error occured while fetching a single cart: ", error)
            setNotificationMessage("Failed to fetch a Single Cart.")
            
        }

    }

// ..............................................................................

    return(
        <CartContext.Provider 
            value={{
                 carts,
                 deleteTargetId,
                 isDeleteCartModalOpen,
                 notificationMessage,
                 singleCartData,

                 setDeleteCartModalOpen,
                 setDeleteTargetId,
                 setNotificationMessage,
                 setSingleCartData,

                 handleDeleteCart,
                 confirmDelete,
                 fetchSingleCartData,

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
