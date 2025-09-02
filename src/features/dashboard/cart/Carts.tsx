
import CartTable from "./CartTable";
import ConfirmDeleteModal from "./ConformDeleteModel";
import Notification from "./Notification";


export default function Cart() {

    
  return (
     <div className="flex h-screen absolute left-69 right-0 top-17">
      <main className=" flex-1 p-6 w-full bg-white">
        <CartTable />
      </main>

      <ConfirmDeleteModal />
      <Notification/>

    </div>
  )
}
