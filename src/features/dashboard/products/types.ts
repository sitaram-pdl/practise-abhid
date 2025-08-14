


// export interface ProductType {
//   category: string;
//   description: string;
//   id: number;
//   image: string;
//   price: number;
//   rating: {
//     rate: number;
//     count: number;
//   };
//   title: string;
//   quantity?: number;
// }

// export interface ProductContextType {
//   products: ProductType[];
//   cartItems: ProductType[];
//   totalCartItems: number;
//   isCartOpen: boolean;
//   isDeleteModalOpen: boolean;
//   deleteTargetId: number | null;
//   notificationMessage: string;
//   setCartOpen: (isOpen: boolean) => void;
//   setDeleteModalOpen: (isOpen: boolean) => void;
//   setDeleteTargetId: (id: number | null) => void;
//   setNotificationMessage: (message: string) => void;
//   increaseQuantity: (productId: number) => void;
//   decreaseQuantity: (productId: number) => void;
//   removeCartItem: (id: number) => void;
//   clearCart: () => void;
//   handleRemove: (id: number) => void;
//   confirmDelete: () => Promise<void>; // note the way to write type of promise (async calls)
//   fetchProducts: () => Promise<void>;
// }

// export interface ProviderPropsType {
//   children: React.ReactNode;
// }

// export type CartDataType = { [productId: number]: number };

