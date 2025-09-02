

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { type ProductType, type ProductContextType , type ProviderPropsType, type CreateNewProduct, type CartQuantityType } from "@/features/dashboard/ProductTypes";
import { fetchProducts, deleteProduct,addNewProduct, updateProduct,fetchSingleProduct,loadCartQuantityFromLocalStorage, saveCartQuantityToLocalStorage } from "@/api/product/ApiProduct"
import { addNewCart } from "@/api/cart/ApiCart";
import type {CartWithProductDetailsType,} from "@/features/dashboard/CartTypes";

const ProductContext = createContext<ProductContextType|null>(null); 

export const ProductProvider = ({ children }: ProviderPropsType) => {

  const [products, setProducts] = useState<ProductType[]>([]);
  const [singleProduct, setSingleProduct] = useState<ProductType>({} as ProductType)
  const [cartQuantity, setCartQuantity] = useState<CartQuantityType>(
    () => loadCartQuantityFromLocalStorage() )
  const [isCartOpen, setCartOpen] = useState(false);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [notificationMessage, setNotificationMessage] = useState(""); 
  const [isAddNewProductModalOpen, setAddNewProductModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);


const selectedProducts = useMemo(
  () => products.filter((p) => cartQuantity[p.id] !== undefined),
  [products, cartQuantity]
);

 const totalPrice = useMemo(() => {
  return selectedProducts.reduce(
    (sum, product) => sum + product.price * (cartQuantity[product.id] || 0),
    0
  );
}, [selectedProducts, cartQuantity]);

const totalCartsQuantity = useMemo(
    () =>  Object.values(cartQuantity).reduce((sum, qty)=> sum + qty,0)
  ,[cartQuantity])

console.log("selectedProducts", selectedProducts)

  const increaseCartQuantity = (productId: number) => {
    setCartQuantity((prev) => {
      const updatedCartQuantity = {...prev, [productId]: (prev[productId] || 0)+ 1 }
      saveCartQuantityToLocalStorage(updatedCartQuantity)
      return updatedCartQuantity
  })
  };
  const decreaseCartQuantity = (productId: number) => {
    setCartQuantity((prev) => {
      const current = prev[productId] || 0;
      const updated = { ...prev };
      if (current > 1) updated[productId] = current - 1;
      else delete updated[productId]; 
      saveCartQuantityToLocalStorage(updated);
      return updated;
    });
  };

  const removeCartItem = (id: number) => {
  setCartQuantity((prev) => {
    const updated = { ...prev };
    delete updated[id]; 
    saveCartQuantityToLocalStorage(updated);
    return updated;
  });
};

  const clearCart = useCallback(() => {
    setCartQuantity({});
    localStorage.removeItem("cart"); 
  }, []);

  const fetchProductsData = async () => {
    try {
      const data = await fetchProducts();
      const dataWithUserId = data.map((eachProduct:ProductType) => ({...eachProduct, userId: 0 }))
      setProducts(dataWithUserId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  console.log("This is a data after fetching all products:",products)

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchSingleProductData = async(id:number) =>{
    try {
      const apiResponse = await fetchSingleProduct(id)
      console.log("single Product response from Api call: ",apiResponse)
      // const mergedProduct = loadSingleProductQuantityToLocalStorage(apiResponse);
      setSingleProduct(apiResponse)
    } catch (error) {
      console.error("Error fetching single user:", error)
    }
  }
  console.log("CartQuantity data is: ",cartQuantity)

  const handleRemove = (id: number) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteProduct(deleteTargetId);
      // setProducts((prev) => prev.filter((p) => p.id !== deleteTargetId)); 
      setNotificationMessage(" Product Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      setNotificationMessage("Failed to delete product.");
    } finally {
      setDeleteModalOpen(false);
      setDeleteTargetId(null);
    }
  };
  const handleAddNewProduct = () => {
    setAddNewProductModalOpen(true);
  };

  const confirmAddNewProduct = async (productData: CreateNewProduct) => {
  try {
    setIsLoading(true);
    setNotificationMessage(""); 
    const apiResponse = await addNewProduct(productData);
    console.log("this is api response: ",apiResponse)
    setProducts(prev => [...prev, { ...apiResponse, quantity: 0 }]); 
    setNotificationMessage("Product created successfully!");
    setTimeout(() => {
      setAddNewProductModalOpen(false);
      setIsLoading(false);
    }, 300);
    
    return true;
  } catch (error) {
    setNotificationMessage("Failed to create product");
    return false;
  }
};

const handleUpdateProduct = (product: ProductType) => {
  setEditingProduct(product);
  setAddNewProductModalOpen(true); 
};

const confirmUpdateProduct = async (id: number, productData: CreateNewProduct) => {
    try {
      setIsLoading(true);
      const updated = await updateProduct(id, productData);
      console.log("this is update user api response: ",updated)
      setNotificationMessage("Product updated successfully!");
      setTimeout(() => {
        setAddNewProductModalOpen(false)
        setIsLoading(false);
      },100);
      setEditingProduct(null);
      return true;
      } catch (error) {
      setNotificationMessage("Failed to update product.");
      return false;
      }
  }

  const ConfirmAddNewCart = async(NewCart:CartWithProductDetailsType) =>{
    try {
      setIsLoading(true)
      setNotificationMessage("");
      const apiResponse = await addNewCart(NewCart);
      console.log("this is Add new user api response: ",apiResponse)
      setNotificationMessage("Cart Created successfully!");  
      setIsLoading(false)
      setCartOpen(false)
      clearCart() 
    }catch (error) {
      console.log("Error Adding a new user: ", error)
      setNotificationMessage("Failed to Create a Cart!");
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        singleProduct,
        selectedProducts,
        cartQuantity,
        isCartOpen,
        isDeleteModalOpen,
        isAddNewProductModalOpen,
        deleteTargetId,
        notificationMessage,
        isLoading,
        totalCartsQuantity,
        totalPrice,
        setIsLoading,
        setCartOpen,
        setDeleteModalOpen,
        setAddNewProductModalOpen,
        setDeleteTargetId,
        setNotificationMessage,
        setEditingProduct,
        setCartQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartItem,
        clearCart,
        handleRemove,
        confirmDelete,
        confirmAddNewProduct,
        handleAddNewProduct,
        fetchProducts: fetchProductsData,
        editingProduct,
        handleUpdateProduct,
        confirmUpdateProduct,
        fetchSingleProductData,
        ConfirmAddNewCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};


