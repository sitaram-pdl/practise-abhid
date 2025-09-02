
import {Outlet } from "react-router-dom";
import SideBar from "@/features/dashboard/sidebar/SideBar";
import HeadBar from "@/features/dashboard/headbar/HeadBar"

export default function Layout() {
 
  return (
    <div >
      <HeadBar />
      <SideBar />
      <Outlet />
   </div>
  );
}


