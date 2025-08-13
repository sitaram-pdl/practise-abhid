
import ProductTable from "./ProductTable";
import CartDrawer from "./CartDrawer";
import ConfirmDeleteModal from "./ConformDeleteModel";
import Notification from './Notification';
import { useProductContext } from "@/context/ProductContext";

export default function Products() {
  const {
    products,
    cartItems,
    isCartOpen,
    isDeleteModalOpen,
    notificationMessage,
    setCartOpen,
    setNotificationMessage,
    setDeleteModalOpen,
    increaseQuantity,
    decreaseQuantity,
    removeCartItem,
    clearCart,
    handleRemove,
    confirmDelete,
  } = useProductContext(); // it is a custom hook which get us the function to consume context.

  return (
    <div className="flex min-h-screen absolute left-69 right-0">
      <main className="flex-1 p-6 bg-white">
        
        <div className="flex justify-between items-center border-t py-4 pr-2">
          <input
            type="text"
            placeholder="Search by name"
            className="w-1/3 p-2 border rounded"
          />
          <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700">
            Add
          </button>
        </div>
        
        <ProductTable
          products={products}
          onRemove={handleRemove}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
        />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onClear={clearCart}
        RemoveCartItem={removeCartItem}
      />
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

