
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormDataType } from "@/validationSchema/productSchema/ProductSchema"
import { useProductContext } from "@/context/ProductContext";
import { useEffect, useState } from "react";

export default function AddNewProductModel() {
  const {
    isAddNewProductModalOpen,
    setAddNewProductModalOpen,
    confirmAddNewProduct,
    isLoading,
    confirmUpdateProduct,
    editingProduct,
    setEditingProduct,
  } = useProductContext();

  const { register, handleSubmit, watch, reset, formState: { errors },} = useForm<ProductFormDataType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    },
  });

  // Autofill form when editing

  useEffect(() => {
    if (editingProduct) {
      reset({
        title: editingProduct.title,
        price: editingProduct.price,
        description: editingProduct.description,
        category: editingProduct.category,
        image: editingProduct.image,
      });
      setAddNewProductModalOpen(true); // ensure modal opens immediately
    } else {
      reset({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
      });
    }
  }, [editingProduct, reset, setAddNewProductModalOpen]);

   //  Watch image field for live preview
  const imageUrl = watch("image");
  const [previewUrl, setPreviewUrl] = useState("");
  useEffect(() => setPreviewUrl(imageUrl || ""), [imageUrl]);

  const handleImageError = () => setPreviewUrl("");

 
  //  Handle submit (decide add vs update)
  const onSubmit = async (data: ProductFormDataType) => {
    if (editingProduct) {
      await confirmUpdateProduct(editingProduct.id, data);
      reset();
    } else {
      const success = await confirmAddNewProduct(data);
      if (success) {
        reset();
        setPreviewUrl("");
      }
    }
  };

  const handleClose = () => {
    setEditingProduct(null);
    setAddNewProductModalOpen(false);
  };


  if (!isAddNewProductModalOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 backdrop-brightness-40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-auto overflow-y-auto">
          <div className="text-2xl text-center font-bold p-3 mb-4">
              {editingProduct ? "Update Product" : "Add New Product"}
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-5 w-full">
              {/* Left Column - Form Fields */}
                <div className="w-full lg:w-1/2 space-y-3 md:space-y-4">
                    {/* Title Field */}
                    <div>
                      <label className="block mb-1"> Product Title*</label>
                      <input
                        {...register("title")}
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                      )}
                    </div>

                     {/* Price Field */}
                    <div>
                      <label className="block mb-1">Price ($)*</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register("price", { valueAsNumber: true })}
                        placeholder="150.5"
                        className="w-full p-2 border rounded"
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base md:text-lg mb-1">Category*</label>
                      <input
                        {...register("category")}
                        type='text'
                        className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
                      
                      />
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                      )}
                    </div>

                    <div>
                        <label className="block text-sm sm:text-base md:text-lg mb-1">Image URL*</label>
                        <input
                          {...register("image")}
                          type="url"
                          placeholder="https://example.com"
                          // required
                          className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        {errors.image && (
                        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                        )}
                    </div>
                  </div>
                  {/* Right Column - Description and Image Preview */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-3 md:gap-4">
                    <div className="flex flex-col h-30">
                      <label className="block text-sm sm:text-base md:text-lg mb-1">Description*</label>
                      <textarea
                        {...register("description")}
                        className="border border-gray-400 rounded-md px-3 py-2 w-full h-full focus:outline-none focus:ring-1 focus:ring-black"
                        // required
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Image Preview</label>
                        <div className="border border-gray-400 rounded-md h-45 flex items-center justify-center bg-gray-100 overflow-hidden">
                          {previewUrl ? (
                            <img
                              className="w-full h-3/4 object-contain p-1"
                              src={previewUrl}
                              alt="Product preview"
                              onError={handleImageError}
                            />
                            ) : (
                            <span className="text-gray-500">No image provided</span>
                                    )}
                      </div>
                    </div>
                  </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-4 md:pt-5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-3 py-2 mx-3 bg-gray-500 text-white hover:bg-gray-700 hover:font-bold rounded text-font hover:px-4 hover:mx-2
                  transition-all duration-300 ease-in-out "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className=' mx-3 bg-green-400 text-white px-3 py-2 font-bold rounded cursor-pointer hover:bg-green-600  hover:mx-2 hover:px-4 
                            transition-all duration-300 ease-in-out' 
                >
                  {
                  isLoading
                    ? editingProduct ? "Updating..." : "Creating..."
                    : editingProduct ? "Update Product" : "Create Product"
                  }
                </button>
              </div>
          </form>
        </div>
      </div>
    </>
  );
}




