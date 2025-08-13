
import ProductTable from "./ProductTable";
import ConfirmDeleteModal from "./ConformDeleteModel";
import Notification from './Notification';
import { useProductContext } from "@/context/ProductContext";

export default function Products() {
  const {
    products,
    isDeleteModalOpen,
    notificationMessage,
    setNotificationMessage,
    setDeleteModalOpen,
    increaseQuantity,
    decreaseQuantity,
    handleRemove,
    confirmDelete,
  } = useProductContext(); // it is a custom hook which get us the function to consume context.

  return (
    <div className="flex min-h-screen absolute left-72 right-2 top-20  
    shadow-[2px_2px_5px_1px_rgba(0,0,0,0.5)]">
      <main className="flex-1 p-6 bg-white rounded">
        
        <div className="flex justify-between items-center border-t py-4 pr-2 ">
          <input
            type="text"
            placeholder="Search by name"
            className="w-1/3 p-2 border rounded"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
            Add New Product
          </button>
        </div>
        
        <ProductTable
          products={products}
          onRemove={handleRemove}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
        />
      </main>

     {/* Delete confirmation modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
     {/* for Notification message */}
      {notificationMessage && (
        <Notification
          message={notificationMessage}
          onClose={() => setNotificationMessage("")}
        />
      )}
    </div>
  );
}


{/* 
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onClear={clearCart}
        RemoveCartItem={removeCartItem}
      /> 
*/}