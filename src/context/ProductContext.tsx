

import { createContext, useContext, useState, useEffect } from "react";
import { type ProductType, type ProductContextType , type ProviderPropsType, type CreateNewProduct } from "@/features/dashboard/types";
import { fetchProducts, deleteProduct,addNewProduct, saveQuantityToLocalStorage, loadQuantityFromLocalStorage } from "@/api/product";

const ProductContext = createContext<ProductContextType | undefined>(undefined); // first create a context ..........

export const ProductProvider = ({ children }: ProviderPropsType) => {

  const [products, setProducts] = useState<ProductType[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
   // For delete modal....
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  //  For  notification message...
  const [notificationMessage, setNotificationMessage] = useState(""); 
  // For Add New Product modal....
  const [isAddNewProductModalOpen, setAddNewProductModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
  
  const cartItems = products.filter((product) => (product.quantity || 0) > 0);
  const totalCartItems = products.reduce((sum, product) => sum + (product.quantity || 0), 0);

  const fetchProductsData = async () => {
    try {
      const data = await fetchProducts();
      const mergedProducts = loadQuantityFromLocalStorage(data);
      setProducts(mergedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  console.log(products) // see the product to know the details about it and further analysis it.

  useEffect(() => {
    fetchProductsData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      saveQuantityToLocalStorage(products);
    }
  }, [products]);

  const increaseQuantity = (productId: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: (product.quantity || 0) + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId && (product.quantity || 0) > 0
          ? { ...product, quantity: (product.quantity || 0) - 1 }
          : product
      )
    );
  };

  const removeCartItem = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const clearCart = () => {
    setProducts((prev) => prev.map((p) => ({ ...p, quantity: 0 })));
  };

  // ............fundtions to delete product......................................................

  // When delete button clicked → show modal
  const handleRemove = (id: number) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  // When confirmed → runs delete API
  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteProduct(deleteTargetId);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTargetId)); // simulate API call
      setNotificationMessage("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      setNotificationMessage("Failed to delete product.");
    } finally {
      setDeleteModalOpen(false);
      setDeleteTargetId(null);
    }
  };
  // ............fundtions to Add New product......................................................

  // When delete button clicked → show modal
  const handleAddNewProduct = () => {
    setAddNewProductModalOpen(true);
  };

  // When confirmed → runs Add new Product API

  const confirmAddNewProduct = async (productData: CreateNewProduct) => {
  try {
    setIsLoading(true);
    setNotificationMessage(""); // Clear any existing message first
    
    const apiResponse = await addNewProduct(productData);
    console.log("this is api response: ",apiResponse)
    setProducts(prev => [...prev, { ...apiResponse, quantity: 0 }]);
    
    // Set success message
    setNotificationMessage("Product created successfully!");
    
    // Close modal after a short delay
    setTimeout(() => {
      setAddNewProductModalOpen(false);
    }, 500);
    
    return true;
  } catch (error) {
    setNotificationMessage("Failed to create product");
    return false;
  } finally {
    setIsLoading(false);
  }
};


  // ...........................................................................................

  return (
    <ProductContext.Provider
      value={{
        products,
        cartItems,
        totalCartItems,
        isCartOpen,
        isDeleteModalOpen,
        isAddNewProductModalOpen,
        deleteTargetId,
        notificationMessage,
        isLoading,
        setIsLoading,
        setCartOpen,
        setDeleteModalOpen,
        setAddNewProductModalOpen,
        setDeleteTargetId,
        setNotificationMessage,
        increaseQuantity,
        decreaseQuantity,
        removeCartItem,
        clearCart,
        handleRemove,
        confirmDelete,
        handleAddNewProduct,
        confirmAddNewProduct,
        fetchProducts: fetchProductsData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// this is a function to consume context, here on this same context page.

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};






















/*
The useProductContext function is placed in the context provider file (typically named something like ProductContext.tsx) for several important reasons:

1. Encapsulation and Co-location
    It's a best practice to keep the custom hook that consumes the context in the same file where the context is created.
    This keeps all context-related code together, making it easier to maintain and understand.

2. Type Safety
    When both the context and its consumer hook are in the same file, TypeScript can automatically infer the types from the context value.
    If they were separated, you'd need to export and import types explicitly, adding complexity.

3. Error Handling
    The hook includes a runtime check to ensure it's used within a ProductProvider:
      typescript
      if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider");
      }
      This safety check belongs with the context definition since it's validating the context itself.

4. Single Source of Truth
    Having the hook in the same file ensures there's only one way to consume the context throughout your app.
    If it were defined separately, you might end up with multiple versions or implementations.

5. Developer Experience
    When developers look at the context file, they immediately see both:
        The provider component (ProductProvider)
        How to consume it (useProductContext)

    This creates better discoverability and documentation.

Alternative Approach (Why Not Separate?).................................

While you could technically separate them, it would:
    Require exporting/importing the context object (breaking encapsulation)
    Make type inference more difficult
    Create an extra file for minimal benefit
    Increase the chance of mismatched versions

*/