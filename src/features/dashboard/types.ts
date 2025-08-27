


export interface ProductType {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

export interface ProductContextType {

  products: ProductType[];
  singleProduct:ProductType;
  selectedProducts: ProductType[];
  cartQuantity: CartQuantityType;
  editingProduct: ProductType | null;
  isCartOpen: boolean;
  isLoading: boolean;
  isDeleteModalOpen: boolean;
  isAddNewProductModalOpen: boolean;
  deleteTargetId: number | null;
  notificationMessage: string;
  totalCartsQuantity: number;
  totalPrice: number;

  setCartOpen: (isOpen: boolean) => void;
  setIsLoading: (isOpen: boolean) => void;
  setDeleteModalOpen: (isOpen: boolean) => void;
  setAddNewProductModalOpen: (isOpen: boolean) => void;
  setEditingProduct: (product: ProductType | null) => void;
  setDeleteTargetId: (id: number | null) => void;
  setNotificationMessage: (message: string) => void;
  
  increaseCartQuantity: (productId: number) => void;
  decreaseCartQuantity: (productId: number) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
  handleRemove: (id: number) => void;
  confirmDelete: () => Promise<void>; // note the way to write type of promise (async calls)
  handleAddNewProduct: () => void;
  handleUpdateProduct: (product: ProductType) => void;
  fetchProducts: () => Promise<void>;
  fetchSingleProductData: (id:number) => Promise<void>;
  confirmAddNewProduct: (productData: CreateNewProduct) => Promise<boolean>;
  confirmUpdateProduct: (id: number, productData: CreateNewProduct) => Promise<boolean>;
}


export interface ProviderPropsType {
  children: React.ReactNode;
}
// ..............................................................................

export type CartQuantityType = { [productId: number]: number };

// ..........................................................................

// ........................type for Adding new Product......................
// Add these new types
export interface CreateNewProduct {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface ProductApiResponse extends Omit<ProductType, 'quantity'> {
  // This matches the API response exactly
  // quantity is omitted because it's frontend-only
}
// ..........................................................
