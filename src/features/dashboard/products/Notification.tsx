
import { useEffect, useState } from "react";
import { useProductContext } from "@/context/ProductContext";
import {FaCheckCircle } from "react-icons/fa"

export default function Notification() {
  const { notificationMessage, setNotificationMessage } = useProductContext();
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (notificationMessage) {
      setCurrentMessage(notificationMessage);
      setIsVisible(true); 
      const hideTimer = setTimeout(() => {
        setIsVisible(false); 
        setTimeout(() => setNotificationMessage(""), 300); 
      }, 2000);
      return () => clearTimeout(hideTimer);
    }
  }, [notificationMessage, setNotificationMessage]);
  if (!notificationMessage) return null;

  return (
    <div
      className={`fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-[1000]
      transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
       <div className="flex items-center gap-2 text-lg font-bold text-white">
             <FaCheckCircle className="h-5 w-5 text-white" />
             {currentMessage}
      </div>
    </div>
  );
}
