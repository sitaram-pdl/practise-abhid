
import CartTable from "./CartTable";
import ConfirmDeleteModal from "./ConformDeleteModel";
import Notification from "./Notification";


export default function Cart() {

    
  return (
     <div className="flex h-auto absolute left-72 right-2 top-20  
    shadow-[2px_2px_5px_1px_rgba(0,0,0,0.5)]">
  
      <main className=" flex-1 p-6 w-full rounded">
        <CartTable />
      </main>

      <ConfirmDeleteModal />
      <Notification/>

    </div>
  )
}
