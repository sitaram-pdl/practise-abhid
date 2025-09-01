
import { fetchCarts, fetchSingleCart, removeCart, updateCart, } from "@/api/cart/ApiCart";
import type { CartContextType, CartTypes, CartWithProductDetailsType, ProviderPropsType } from "@/features/dashboard/CartTypes";
import type { ProductType } from "@/features/dashboard/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useProductContext } from "./ProductContext";

const CartContext = createContext<CartContextType| null>(null )

export const CartProvider = ({children}:ProviderPropsType) =>{

    const [carts, setCarts] = useState<CartTypes[]>([])
    const [isLoading, setIsLoading] = useState(false);
    
    const {products,setCartOpen,clearCart} = useProductContext();

    const [singleCartData, setSingleCartData] = useState<CartTypes>({} as CartTypes)
    const [hydratedSingleCartData, setHydratedSingleCartData] =
            useState<CartWithProductDetailsType | null>(null);

    const [isDeleteCartModalOpen, setDeleteCartModalOpen] = useState(false)
    const [deleteTargetId, setDeleteTargetId] = useState<number|null>(null)
    const [notificationMessage, setNotificationMessage] = useState(""); 
    // const [editCarts, setEditCart] = useState<CartTypes[]>([])
    // const [isCartDrawerOpen, setCartDrawerOpen] = useState(false)
    const [isUpdateCart, setUpdateCart] = useState(false)
    
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
            console.log("This is the  APi response of fetching single cart:", responseAPi)
            setSingleCartData(responseAPi)
        }catch (error) {
            console.error("Error occured while fetching a single cart: ", error)
            setNotificationMessage("Failed to fetch a Single Cart.")
        }
    }

// ..............................................................................

// handler for Creating new cart is kept inside the product Context as it mostly utlizes the states avilable in productContext.

// ..................................................................................

// with the help up this fucntion, by the help of "singleCartData" and "products" we create an object which contains all necessary data to utilize during the cart page. 

    function hydrateCart(singleCartData: CartTypes, allProducts: ProductType[]):            CartWithProductDetailsType {
        if (!singleCartData.products) {
            return { ...singleCartData, products: [] };
        }
        return {
            ...singleCartData,
            products: singleCartData.products.map(cartItem => {
            const foundProduct = allProducts.find(p => p.id === cartItem.productId);
            if (!foundProduct) {
                throw new Error(`Product with id ${cartItem.productId} not found`);
            }
            return {
                productDetails: foundProduct,
                quantity: cartItem.quantity,
            };
            }),
        };
        }

    //  update hydratedSingleCartData whenever raw cart or products change
    useEffect(() => {
        if (singleCartData && products.length > 0) {
                setHydratedSingleCartData(hydrateCart(singleCartData, products));
            } else {
                setHydratedSingleCartData(null);
            }
        }, [singleCartData, products]);

    const loadHydratedSingleCartData = () => {
        if (singleCartData && products.length > 0) {
        setHydratedSingleCartData(hydrateCart(singleCartData, products));
        }
    };
// ..............................................................................

// // In CartContext.tsx - Add this useEffect
// useEffect(() => {
//   if (isUpdateCart && hydratedSingleCartData) {
//     // Make sure all products in the cart are available in the product context
//     const productIds = hydratedSingleCartData.products.map(p => p.productDetails.id);
//     // You might need to ensure these products are fetched if not already
//   }
// }, [isUpdateCart, hydratedSingleCartData]);
// ..................................................................
  const handleUpdateCart = () =>{
    setCartOpen(true)
    setUpdateCart(true)
  }
  const ConfirmUpdateCart = async(id:number ,editedCart:CartWithProductDetailsType) => {
        try {
          setIsLoading(true)
          setNotificationMessage("");
          const apiResponse = await updateCart(id,editedCart);
          console.log("This is update Cart api response: ",apiResponse)
          // setUsers((prev)=> prev.map((u)=> u.id === id ?{...prev,...apiResponse}: u ))
          
          setTimeout(() => {
                setUpdateCart(false);
                setCartOpen(false)
                setIsLoading(false);
                setNotificationMessage("Cart Updated successfully!");  
            }, 100);
        clearCart()
        } catch (error) {
          console.log("Error Updating a User: ", error)
          setNotificationMessage("Failed to Update a User!");
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
                 isUpdateCart,
                 isLoading,

                 setDeleteCartModalOpen,
                 setDeleteTargetId,
                 setNotificationMessage,
                 setSingleCartData,
                 setUpdateCart,

                 handleDeleteCart,
                 confirmDelete,
                 fetchSingleCartData,
                 hydratedSingleCartData,
                 loadHydratedSingleCartData,
                 handleUpdateCart,
                 ConfirmUpdateCart,

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
