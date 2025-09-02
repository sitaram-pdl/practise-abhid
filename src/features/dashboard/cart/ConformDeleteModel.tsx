

import { useCartContext } from "@/context/CartContext";

export default function ConfirmDeleteModal() {

  const { isDeleteCartModalOpen, setDeleteCartModalOpen, confirmDelete } = useCartContext();
  if (!isDeleteCartModalOpen) return null;

  return (
    <>
      { isDeleteCartModalOpen && (
          <div
            className="fixed inset-0 z-50 backdrop-brightness-40 "
            onClick = {() => setDeleteCartModalOpen(false)}
          />
      )}
      <div className=" fixed inset-0 flex items-center justify-center z-50 ">
        <div className="absolute bg-white rounded-lg shadow-xl p-6 w-145 mx-4">
          <h2 className="text-xl text-red-500 font-bold mb-4 text-center">Confirm Cart Delete</h2>
          <p className="mb-6 font-semibold">Are you sure you want to delete this Cart? This action cannot be undone.</p>

          <div className="flex justify-between gap-3">
            <button
              className="px-4 py-2 text-white font-bold bg-gray-400 rounded hover:bg-gray-500 transition-colors"
              onClick={() => setDeleteCartModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition-colors"
              onClick={confirmDelete}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
