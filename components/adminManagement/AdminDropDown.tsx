"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { AdminPopUp } from "./AdminPopUp";
import { adminDetails } from "@/declarations/addAdmin.declaration";
import { axiosGet, axiosPost } from "@/utils/api";
import { toast } from "react-toastify";

export default function AdminDropDown({adminData, toggleRefresh}:{adminData : adminDetails, toggleRefresh : ()=> void}) {
  const [isOpen, setIsOpen] = useState(false);
    const [editAdminIsOpen,setEditAdminIsOpen] = useState(false)

    const toggleEditAdmin = ()=> {
      setEditAdminIsOpen(!editAdminIsOpen)
    }
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteAdmin = async(admin_id : string|number|undefined)=>{
    try {
      const confirm = window.confirm("Are you sure you want to take delete this Admin")

      if(confirm){
        await axiosPost('/admin/delete',{admin_id},true)
        toggleRefresh()
        toast.success('Admin Deleted Successfully')
        
      }
      return;
    } catch (error) {
      console.log(error)
      toast.error('An error occurred while deleting admin')
    }
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Toggle Button */}

      <Image src={`/umanage/more.svg`} className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} alt="" width={24} height={24}/>
      <AdminPopUp toggleRefresh={toggleRefresh} adminData={adminData} IsOpen={editAdminIsOpen} toggleAddAdmin={toggleEditAdmin} popupType='edit' />

      {/* Dropdown Items */}
      {isOpen && (
        <div className="absolute top-1 right-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 cursor-pointer">
          <div
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => toggleEditAdmin()}
          >
            Edit Admin
          </div>
          <div
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleDeleteAdmin(adminData.id)}
          >
            Delete Admin
          </div>
        </div>
      )}
    </div>
  );
}