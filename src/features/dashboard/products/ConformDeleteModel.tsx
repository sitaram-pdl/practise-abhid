
import { useEffect } from "react";
import { useProductContext } from "@/context/ProductContext";

export default function ConfirmDeleteModal() {

    const { isDeleteModalOpen, setDeleteModalOpen, confirmDelete,} = useProductContext();

  useEffect(() => {
    if (isDeleteModalOpen) {
      // Disable scroll on body...
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll on body when modal closed...
      document.body.style.overflow = "";
    }
    // Cleanup when component unmounts or isOpen changes...
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDeleteModalOpen]);


  if (!isDeleteModalOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-102">
        {/* Overlay..............*/}
        { isDeleteModalOpen && (
        <div
          className=" absolute inset-0 bg-opacity-50 backdrop-brightness-60"
          onClick={() => setDeleteModalOpen(false)}
        ></div>)
          }

        {/* Modal...................... */}
        <div className="relative bg-white rounded-lg shadow-lg p-6 z-10 w-96">
          <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-6">Are you sure you want to delete this product?</p>

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={confirmDelete}
            >
              Yes, Delete
            </button>
          </div>
        </div>
    </div>
  );
}
