

export interface CartProduct {
  productId: number;
  quantity: number;
}

export interface CartTypes{
    date: string;
    id: number;
    products: CartProduct[];
    userId: number;
    __v : number;
}

export interface CartContextType{
    carts: CartTypes[];
    isDeleteCartModalOpen: boolean;
    deleteTargetId: number | null;
    notificationMessage: string;
    singleCartData: any;

    setDeleteCartModalOpen: (isOpen:boolean) => void;
    setDeleteTargetId: (id:number | null) => void;
    setNotificationMessage: (message:string) => void;
    setSingleCartData: (data:any) => void;

    handleDeleteCart:(id:number) => void;
    confirmDelete: () => Promise<void>;
    fetchSingleCartData: (id:number) => Promise<void>
}

export interface ProviderPropsType{
    children: React.ReactNode;
}
