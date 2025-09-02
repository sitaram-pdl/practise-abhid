
import type { ProductType } from "./types";


// ....................................................
export interface CartProduct {
  productId: number;
  quantity: number;
}

export interface CartTypes{
    date: string;
    id: number
    products: CartProduct[];
    userId: number
    __v : number;
}
// ..........................................

export interface CartProductDetails {
  productDetails: ProductType;
  quantity: number;
}

export interface CartWithProductDetailsType{
    date: string;
    id?: number;
    products: CartProductDetails[];
    userId: number;
    __v : number;

}

// ...............................................................

export interface CartContextType{
    carts: CartTypes[];
    isDeleteCartModalOpen: boolean;
    deleteTargetId: number | null;
    notificationMessage: string;
    singleCartData: CartTypes;
    isUpdateCart:boolean;
    isLoading:boolean;

    setDeleteCartModalOpen: (isOpen:boolean) => void;
    setDeleteTargetId: (id:number | null) => void;
    setNotificationMessage: (message:string) => void;
    setSingleCartData: (data:any) => void;
    setUpdateCart: (isUpdate:boolean) => void;

    hydratedSingleCartData:CartWithProductDetailsType| null;
    loadHydratedSingleCartData: () => void;
    handleDeleteCart:(id:number) => void;
    confirmDelete: () => Promise<void>;
    fetchSingleCartData: (id:number) => Promise<void>
    handleUpdateCart:() => void;
    ConfirmUpdateCart: (id:number ,editedCart:CartWithProductDetailsType) => void;
}

// ....................................................................
export interface ProviderPropsType{
    children: React.ReactNode;
}
