
import { useEffect, useState } from "react";
import { useProductContext } from "@/context/ProductContext";

export default function Notification() {
  const { notificationMessage, setNotificationMessage } = useProductContext();
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (notificationMessage) {
      setCurrentMessage(notificationMessage);
      setIsVisible(true); // trigger fade in
      
      const hideTimer = setTimeout(() => {
        setIsVisible(false); // trigger fade out..
        // Delay message clearing to allow fade-out animation
        setTimeout(() => setNotificationMessage(""), 300); // remove from DOM after fade out
      }, 3000);

      return () => clearTimeout(hideTimer);
    }
  }, [notificationMessage, setNotificationMessage]);

  if (!notificationMessage) return null;

  return (
    <div
      className={`fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-[1000]
      transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="text-lg font-bold text-white">
        {currentMessage}
      </div>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import { useProductContext } from "@/context/ProductContext";

// export default function Notification() {
//   const { notificationMessage, setNotificationMessage } = useProductContext();
//   const [visible, setVisible] = useState(false);

//   // Show + auto-hide....
//   useEffect(() => {
//     if (notificationMessage) {
//       setVisible(true); // trigger fade in
//       const timer = setTimeout(() => {
//         setVisible(false); // trigger fade out..
//         setTimeout(() => setNotificationMessage(""), 300); // remove from DOM after fade out
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [notificationMessage, setNotificationMessage]);

//   return (
//     notificationMessage && (
//       <div
//         className={`fixed top-4 right-4 bg-green-500 px-4 py-2 rounded shadow-lg z-50 
//         transition-all duration-300 ease-in-out
//         ${visible ? "opacity-100 translate-y-3" : "opacity-0 -translate-y-3"}`}
//       >
//         <div className="flex justify-between items-center gap-4">
//           <span className="text-white font-bold">{notificationMessage}</span>
//           <button onClick={() => setVisible(false)} className="font-bold">✖</button>
//         </div>
//       </div>
//     )
//   );
// }

/*
1. The first timer controls *how long the message stays visible*.
2. The second timer gives enough time for the fade-out animation to finish before removing the element.
If skipped this, the message would instantly vanish instead of fading.

*/


