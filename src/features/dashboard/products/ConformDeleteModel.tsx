
import { useProductContext } from "@/context/ProductContext";

export default function ConfirmDeleteModal() {
  const { isDeleteModalOpen, setDeleteModalOpen, confirmDelete } = useProductContext();
  if (!isDeleteModalOpen) return null;

  return (
    <>
      { isDeleteModalOpen && (
          <div
            className="fixed inset-0 z-50 backdrop-brightness-40 "
            onClick = {() => setDeleteModalOpen(false)}
          />
      )}
      <div className=" fixed inset-0 flex flex-1 items-center justify-center z-50 ">
        <div className="absolute bg-white rounded-lg shadow-xl p-6 w-105 mx-4">
          
          <h2 className="text-xl font-bold mb-4 text-center text-red-500">Confirm Deletion</h2>
          <p className="mb-6 text-lg">Are you sure you want to delete this product ?</p>

          <div className="flex justify-between gap-3">
            <button
              className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-600 transition-colors"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
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

