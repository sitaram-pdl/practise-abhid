

import { useEffect } from "react";
import { useProductContext } from "@/context/ProductContext";


export default function Notification() {

    const { notificationMessage, setNotificationMessage,} = useProductContext(); // consuming props through custom hook.

  // Auto-hide after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotificationMessage("");
    }, 1500);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [setNotificationMessage]);

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fadeIn">
      <div className="flex justify-between items-center gap-4">
        <span>{notificationMessage}</span>
        <button onClick={() => setNotificationMessage("")} className="font-bold">✖</button>
      </div>
    </div>
  );
}
