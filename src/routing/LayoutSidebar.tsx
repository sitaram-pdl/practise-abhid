


import {Outlet } from "react-router-dom";
import SideBar from "@/features/dashboard/sidebar/SideBar";

export default function LayoutSidebar() {
 
  return (
    <div className = "flex items-start ">
      <SideBar />
      <div className="w-5 h-screen bg-red-400 fixed top-0 left-64 bottom-0"> </div>
      <Outlet />
   </div>

  );
}


