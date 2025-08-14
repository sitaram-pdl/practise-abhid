

import { useProductContext } from "@/context/ProductContext";


export default function AddNewProductModel() {

    const { isAddNewProductModalOpen, setAddNewProductModalOpen,} = useProductContext();
  



     if (!isAddNewProductModalOpen) return null;

  return (
    <> 
        {/* Overlay with fade effect */}
        { isAddNewProductModalOpen && (
              <div
                className="fixed inset-0 z-50 backdrop-brightness-40 "
                onClick = {() => setAddNewProductModalOpen(false)}
              />
          )}

          {/* Modal positioned fixed at center */}
        <div className=" fixed inset-0 flex flex-1 items-center justify-center z-50 ">
          <div className="absolute bg-white rounded-lg shadow-xl p-6 w-96 mx-4">
              <div>Add New Product</div>

              <div>
                  <div>
                      <div>
                        <p>Product Title</p>
                        <input type="text" />
                      </div>
                      <div>
                        <p>Price ($)</p>
                        <input type="number" />
                      </div>
                      <div>
                        <p>Category</p>
                        <input type="text" />
                      </div>
                      <div>
                        <p>Image URL</p>
                        <input type="text" />
                      </div>
                  </div>

                  <div>
                      <div>
                        <p>Description</p>
                        <input type="text" />
                      </div>
                      <div>
                        <p>Image Preview</p>
                        <img src="" alt="No image URL provided" />
                      </div>
                  </div>

              </div>

              <div>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 transition-colors"
                  onClick={() => setAddNewProductModalOpen(false)}
                  >Cancel</button>

                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
                  >Create Product</button>
              </div>
           
          </div>
        </div>


    </>
  )
}
