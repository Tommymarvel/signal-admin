"use client";
import { axiosPost } from "@/utils/api";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

export default function KycDropDown({kycId, toggleRefresh}:{kycId : string | number, toggleRefresh : ()=>void}) {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleKycRequest = async(status : string,)=>{
    try {
      const data = {
        verification_id : kycId,
        status
      }
      setIsOpen(false);
      await axiosPost('/admin/verify-user',data, true)
      toggleRefresh()
      toast.success('Kyc status updated successfully')
    } catch (error) {
      console.log(error)
      toast.error('An error occurred while submitting request')
    }
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Toggle Button */}

      <Image src={`/umanage/more.svg`} className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} alt="" width={24} height={24}/>

      {/* Dropdown Items */}
      {isOpen && (
        <div className="absolute top-1 right-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 cursor-pointer">
          <div
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#0F973D] hover:bg-gray-100"
            onClick={() => handleKycRequest('verified')}
          >
            <Image src={`/transactions/check.svg`} alt="" width={20} height={20} />
            Approve
          </div>
          <div
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#D42620] hover:bg-gray-100"
            onClick={() => handleKycRequest('rejected')}
          >
            <Image src={`/transactions/x.svg`} alt="" width={20} height={20} />
            Decline
          </div>
        </div>
      )}
    </div>
  );
}