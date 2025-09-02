
import { useUserContext } from "@/context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import {FaUser, FaEnvelope, FaPhone, FaHashtag, FaHome, FaEye,FaEyeSlash,FaIdBadge, FaArrowLeft } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";
import LeafletMap from "./LeafletMap";
import AddNewUserModal from "./AddNewUserModal";
import Notification from "./Notification";

export default function SingleUserPage() {
    const {userID} = useParams();
    const nevigate = useNavigate();
    const {singleUser, handleUpdateUser, notificationMessage} = useUserContext();
    const [showPassword, setShowPassword] = useState(false)

    const CheckedSingleUser = singleUser && singleUser.id === Number(userID);

    function capitalizeWord(word:string) {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    const firstName = singleUser?.name?.firstname ? capitalizeWord(singleUser.name.firstname) : "";
    const lastName  = singleUser?.name?.lastname  ? capitalizeWord(singleUser.name.lastname) : "";
    const Latitude =  singleUser?.address?.geolocation?.lat ? singleUser.address.geolocation.lat : "";
    const Longitude =  singleUser?.address?.geolocation?.long ? singleUser.address.geolocation.long : "";

    if (!CheckedSingleUser){
    return <div className='text-2xl text-red-500 font-bold'>Product not found.</div>;
        }

  return (

        <div className="bg-white flex flex-col gap-5 px-6 py-2 min-h-screen absolute left-69 right-0 top-17">
            <div className='flex justify-between items-center px-5 py-3'>
                <button className=' flex items-center justify-between gap-4 bg-gray-400 hover:bg-gray-700 text-white px-6 py-2 rounded cursor-pointer'
                    onClick={() => nevigate(-1)}
                    > <FaArrowLeft/> 
                     <span>Back</span>
                </button>
                <button className='bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded cursor-pointer' 
                      onClick={() => handleUpdateUser(singleUser)}
                    >Update User
                </button>
            </div>
            <div className="flex justify-between gap-8 py-4 pl-5">
                <div className="flex flex-col gap-5 w-1/2">
                    <h1 className="text-xl font-bold text-gray-800">Profile Information</h1>
                    <div>
                        <div className="flex justify-center items-center text-gray-800 h-[6rem] w-[6rem] bg-gray-300 text-3xl font-semibold rounded-[3rem]">
                            <span>{firstName[0]}</span>
                            <span>{lastName[0]}</span>
                        </div>
                        <h1 className="flex gap-2 mt-4 text-2xl text-gray-800 font-bold">
                            <span>{firstName}</span>
                            <span>{lastName}</span>
                        </h1>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-5 items-center text-gray-800">
                            <span><FaUser/></span>
                            <span className="font-semibold">Username</span>
                            <span>:</span>
                            <span>{singleUser.username}</span>
                        </div>
                        <div className="flex gap-5 items-center text-gray-800">
                            <span><FaEnvelope/></span>
                            <span className="font-semibold">Email</span>
                            <span>:</span>
                            <span>{singleUser.email}</span>
                        </div>
                        <div className="flex gap-5 items-center text-gray-800">
                            <span><FaPhone/></span>
                            <span className="font-semibold">Phone</span>
                            <span>:</span>
                            <span>{singleUser.phone}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 w-1/2">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 mb-4">Address Information</h1>
                        <div className="flex flex-col gap-3">
                             <div className="flex gap-5 items-center text-gray-800">
                                <span><FaHome/></span>
                                <span className="font-semibold">Street Address</span>
                                <span>:</span>
                                <span>{singleUser.address.zipcode}</span>
                            </div>
                            <div className="flex gap-5 items-center text-gray-800">
                                <span><IoLocationOutline/></span>
                                <span className="font-semibold">City</span>
                                <span>:</span>
                                <span>{singleUser.address.zipcode}</span>
                            </div>
                            <div className="flex gap-5 items-center text-gray-800">
                                <span><FaHashtag/></span>
                                <span className="font-semibold">Zip Code</span>
                                <span>:</span>
                                <span>{singleUser.address.zipcode}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                         <h1 className="text-xl font-bold text-gray-800 mb-4">
                            Other Information
                         </h1>
                         <div className="flex flex-col gap-3">
                            <div className="flex gap-5 items-center text-gray-800">
                                <span onClick={()=>setShowPassword(!showPassword)}>
                                   {showPassword? <FaEyeSlash/> : <FaEye/> }  
                                </span>
                                <span className="font-semibold">Password</span>
                                <span>:</span>
                                <span>{showPassword? singleUser.password :"********"}</span>
                            </div>
                            <div className="flex gap-5 items-center text-gray-800">
                                <span>< FaIdBadge /></span>
                                <span className="font-semibold">User Id</span>
                                <span>:</span>
                                <span>{singleUser.address.zipcode}</span>
                            </div>
                            <div className="flex gap-5 items-center text-gray-800">
                                <span className="font-bold text-gray-900">V</span>
                                <span className="font-semibold">Version</span>
                                <span>:</span>
                                <span>{singleUser.address.zipcode}</span>
                            </div>
                        </div>
                   </div>
              </div>
          </div>
          <div className="flex flex-col gap-3 pl-5">
                <h1 className="text-xl font-bold text-gray-800 mb-4">
                    Location
                </h1>
                <div>
                    <LeafletMap Longitude = {Number(Longitude)} Latitude ={Number(Latitude)}  />
                </div>
                <div className="flex justify-center items-center gap-10 px-4 py-2 bg-green-200">
                    <span> 
                        <span className="text-gray-900 font-bold">Latitude : </span>
                            {Latitude}
                    </span>
                    <span> 
                        <span className="text-gray-900 font-bold">Longitude : </span>
                            {Longitude}
                    </span>
                </div>
          </div>
          <AddNewUserModal />
            {notificationMessage &&
                      <Notification key={`${notificationMessage}-${Date.now()}`} />
                }
     </div>
    )
}
