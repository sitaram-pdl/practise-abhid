import { useState } from 'react';
import { useProductContext } from "@/context/ProductContext";

export default function AddNewProductModel() {
  // Get necessary functions and state from context
  const {  isAddNewProductModalOpen,  setAddNewProductModalOpen,  confirmAddNewProduct, isLoading,
  } = useProductContext();

  // Form state management
  const initialFormData = {
    title: '',
    price: 0,
    category: '',
    description: '',
    image: ''
  };
  const [formData, setFormData] = useState(initialFormData);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; //another way of receiving argument...note it.
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await confirmAddNewProduct(formData);
    if (success) {
      setFormData(initialFormData); // Reset form here
    }
   
  };

  // Don't render if modal isn't open
  if (!isAddNewProductModalOpen) return null;

  return (
    <>
      {/* Overlay with click-to-close functionality */}
      {isAddNewProductModalOpen && (
        <div 
          className="fixed inset-0 z-50 backdrop-brightness-40" 
          onClick={() => setAddNewProductModalOpen(false)} 
        />
      )}
      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-auto overflow-y-auto">
          <div className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-5 font-semibold">
            Add New Product
          </div>

          {/* Form with two-column layout */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-5 w-full">
                {/* Left Column - Form Fields */}
                <div className="w-full lg:w-1/2 space-y-3 md:space-y-4">
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg mb-1">Product Title*</label>
                      <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required // it will give error if field left empty.
                        className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base md:text-lg mb-1">Price ($)*</label>
                      <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base md:text-lg mb-1">Category*</label>
                      <input
                        name="category"
                        type='text'
                        value={formData.category}
                        onChange={handleChange}
                        className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base md:text-lg mb-1">Image URL*</label>
                      <input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        type="url"
                        placeholder="https://example.com"
                        required
                        className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                </div>

              {/* Right Column - Description and Image Preview */}
              <div className="w-full lg:w-1/2 flex flex-col gap-3 md:gap-4">
                  <div className="flex flex-col h-30">
                    <label className="block text-sm sm:text-base md:text-lg mb-1">Description*</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="border border-gray-400 rounded-md px-3 py-2 w-full h-full focus:outline-none focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>

                  <div className="flex flex-col h-51">
                      <label className="block text-sm sm:text-base md:text-lg mb-1">
                        Image Preview
                      </label>

                      <div className="border border-gray-400 rounded-md h-full flex items-center justify-center bg-gray-100 overflow-hidden">
                        {formData.image ? (
                          <img
                            className="w-full h-full object-contain p-1"
                            src={formData.image}
                            alt="Product preview"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '';
                              (e.target as HTMLImageElement).alt = 'Invalid image URL';
                            }}
                          />
                        ) : (
                          <span className="text-gray-500">No image provided</span>
                        )}
                      </div>
                  </div>
              </div>
          </div>

            {/* Form action buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-4 md:pt-5">

                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 transition-colors w-full sm:w-auto"
                  onClick={() => setAddNewProductModalOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>

                <button
                  type="submit" // when type submit is used , onclick event is not required.(remember it)
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors w-full sm:w-auto flex justify-center items-center gap-2"
                  disabled={isLoading}
                  // onClick={showMessage}
                  
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block animate-spin">↻</span>
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Create Product"
                  )}
                </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}







// import { useProductContext } from "@/context/ProductContext";

// export default function AddNewProductModel() {
//   const { isAddNewProductModalOpen, setAddNewProductModalOpen } = useProductContext();


//   if (!isAddNewProductModalOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       {isAddNewProductModalOpen && (
//         <div
//           className="fixed inset-0 z-50 backdrop-brightness-40"
//           onClick={() => setAddNewProductModalOpen(false)}
//         />
//       )}

//       {/* Modal */}
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-lg shadow-xl p-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-auto overflow-auto">
//           <div className="text-xl sm:text-xl md:text-2xl mb-4 md:mb-5 font-semibold">
//             Add New Product
//           </div>

//           <div className="flex flex-col lg:flex-row gap-4 md:gap-5 w-full">
//             {/* Left Column - Form Fields */}
//             <div className="w-full lg:w-1/2 space-y-3 md:space-y-4">
//               <div>
//                 <p className="text-sm sm:text-base md:text-lg">Product Title</p>
//                 <input
//                   className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
//                   type="text"
//                 />
//               </div>
//               <div>
//                 <p className="text-sm sm:text-base md:text-lg">Price ($)</p>
//                 <input
//                   className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
//                   type="number"
//                   placeholder="0"
//                 />
//               </div>
//               <div>
//                 <p className="text-sm sm:text-base md:text-lg">Category</p>
//                 <input
//                   className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
//                   type="text"
//                 />
//               </div>
//               <div>
//                 <p className="text-sm sm:text-base md:text-lg">Image URL</p>
//                 <input
//                   className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
//                   type="text"
//                 />
//               </div>
//             </div>

//             {/* Right Column - Description and Image Preview */}
//             <div className="w-full lg:w-1/2 flex flex-col gap-3 md:gap-4">
//               <div className="flex flex-col h-48">
//                 <p className="text-sm sm:text-base md:text-lg mb-1">Description</p>
//                 <textarea
//                   className="border border-gray-400 rounded-md px-3 py-2 w-full h-full focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
//                   rows={4}
//                 />
//               </div>

//               <div className="flex flex-col h-64">
//                 <p className="text-sm sm:text-base md:text-lg mb-1">Image Preview</p>
//                 <div className="border border-gray-400 rounded-md h-full flex items-center justify-center bg-gray-100 overflow-hidden">
//                   <img
//                     className="w-full h-full object-contain p-1"
//                     src=""
//                     alt="No image URL provided"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 md:pt-5">
//             <button
//               className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 transition-colors w-full sm:w-auto"
//               onClick={() => setAddNewProductModalOpen(false)}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors w-full sm:w-auto"
//             >
//               Create Product
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }












