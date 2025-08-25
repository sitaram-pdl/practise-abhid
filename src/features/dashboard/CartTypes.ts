

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

}


export interface ProviderPropsType{
    children: React.ReactNode;
}