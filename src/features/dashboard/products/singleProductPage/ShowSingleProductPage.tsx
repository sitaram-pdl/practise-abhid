
import { useParams } from 'react-router-dom';
import { useProductContext } from "@/context/ProductContext";


export default function ShowSingleProductPage() {

    const { productID } = useParams();
    const { products } = useProductContext();
  
  const SingleProduct = products.find(
  (eachProduct) => eachProduct.id === Number(productID) // convert string to number
);

  if (!SingleProduct) {
    return <div className='text-2xl text-red-500 font-bold'>Product not found.</div>;
  }


  return (

     <div className="flex flex-col h-auto absolute left-72 right-2 top-20  
    shadow-[2px_2px_5px_1px_rgba(0,0,0,0.5)]">

    
 
    </div>
  )
}
