


import {Outlet } from "react-router-dom";
import SideBar from "@/features/dashboard/sidebar/SideBar";
import HeadBar from "@/features/dashboard/headbar/HeadBar"

export default function Layout() {
 
  return (
    <div className = "flex items-start ">
      <HeadBar />
      <SideBar />
      <div className="w-5 h-screen bg-cyan-500 fixed top-0 left-64 bottom-0"> </div>
      <Outlet />
   </div>

  );
}


