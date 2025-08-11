

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Overlay..............*/}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>

        {/* Modal...................... */}
        <div className="bg-white rounded-lg shadow-lg p-6 relative z-10 w-96">
          <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-6">Are you sure you want to delete this product?</p>

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={onConfirm}
            >
              Yes, Delete
            </button>
          </div>
        </div>
    </div>
  );
}
