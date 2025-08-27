

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { type ProductType, type ProductContextType , type ProviderPropsType, type CreateNewProduct, type CartQuantityType } from "@/features/dashboard/types";
import { fetchProducts, deleteProduct,addNewProduct, updateProduct,fetchSingleProduct,loadCartQuantityFromLocalStorage, saveCartQuantityToLocalStorage } from "@/api/product/ApiProduct"

const ProductContext = createContext<ProductContextType | undefined>(undefined); // first create a context ..........

export const ProductProvider = ({ children }: ProviderPropsType) => {

  const [products, setProducts] = useState<ProductType[]>([]);
  // const [singleProduct, setSingleProduct] = useState<ProductType |null>(null)
  const [singleProduct, setSingleProduct] = useState<ProductType>({} as ProductType)
  const [cartQuantity, setCartQuantity] = useState<CartQuantityType>(
    () => loadCartQuantityFromLocalStorage() )
  const [isCartOpen, setCartOpen] = useState(false);

   //state For delete modal....
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  // state  For  notification message...
  const [notificationMessage, setNotificationMessage] = useState(""); 
  // state For Add New Product modal....
  const [isAddNewProductModalOpen, setAddNewProductModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  // New state for single product update 
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);

  // ....................................................................................

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
      else delete updated[productId]; // remove when 0
      saveCartQuantityToLocalStorage(updated);
      return updated;
    });
  };

  const removeCartItem = (id: number) => {
  setCartQuantity((prev) => {
    const updated = { ...prev };
    delete updated[id]; // remove this product from cart
    saveCartQuantityToLocalStorage(updated);
    return updated;
  });
};

 const clearCart = () => {
  setCartQuantity({});
  localStorage.removeItem("cart"); // or save empty {}
};

// .....................................................................................
  const fetchProductsData = async () => {
    try {
      const data = await fetchProducts();
      // const mergedProducts = loadQuantityFromLocalStorage(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  console.log("This is a data after fetching all products:",products) // see the product to know the details about it and further analysis it.

// products should load automatically as the login is done so use use effect to fetch products.....
  useEffect(() => {
    fetchProductsData();
  }, []);

//............(functions)(Handlers) to fetch single product..................

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

  console.log("CartQuantity dat is: ",cartQuantity)


// .................................................................................
  // ............functions)(Handlers) to delete product......................

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
      // simulate API call onlu, not to delete from frontend.
      // setProducts((prev) => prev.filter((p) => p.id !== deleteTargetId)); 
      setNotificationMessage("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      setNotificationMessage("Failed to delete product.");
    } finally {
      setDeleteModalOpen(false);
      setDeleteTargetId(null);
    }
  };
  
  // ............functions)(Handlers) to Add New product...................

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
    // just simulate only, no need to add products to state.....
    setProducts(prev => [...prev, { ...apiResponse, quantity: 0 }]); 
    
    // Set success message
    setNotificationMessage("Product created successfully!");
    
    // Close modal after a short delay
    setTimeout(() => {
      setAddNewProductModalOpen(false);
      setIsLoading(false);
    }, 300);
    
    return true;
  } catch (error) {
    setNotificationMessage("Failed to create product");
    return false;
  } finally {
    // setIsLoading(false);
  }
};

//...............functions to  Update products.............................

// Open modal for update
const handleUpdateProduct = (product: ProductType) => {
  setEditingProduct(product);
  setAddNewProductModalOpen(true); 
};

// Confirm update
const confirmUpdateProduct = async (id: number, productData: CreateNewProduct) => {
  try {
    setIsLoading(true);
    const updated = await updateProduct(id, productData);
    console.log("this is update user api response: ",updated)

    // simulate update in local state
    // setProducts((prev) =>
    //   prev.map((p) => (p.id === id ? { ...updated, quantity: p.quantity || 0 } : p))
    // );
    
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
    } finally {
    // setIsLoading(false);
  }
};
 
// ...............................................................................

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