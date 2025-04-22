"use client";
import { axiosPost } from "@/utils/api";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

export default function TradeDropDown({tradeId, toggleRefresh}:{tradeId : string | number, toggleRefresh : ()=>void}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleTradeStatus = async(status : string)=>{
    const confirm = window.confirm(`Are you sure you want to toggle status to ${status}`)
    if(confirm){
      try {
        const data = {
          "trade_id" : tradeId,
          "status" : status
        }
        setIsOpen(false);
        toggleRefresh()
        await axiosPost('/admin/edit-trade',data,true)
        toggleRefresh()
        toast.success('Trade Updated Successfully')
      } catch (error) {
        console.log(error)
        toast.error('An error occurred while submitting request')
      }
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
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleTradeStatus('FILLED')}
          >
            Filled
          </div>
          <div
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleTradeStatus('PARTIALLY_FILLED')}
          >
            Partially Filled
          </div>
          <div
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleTradeStatus('CANCELED')}
          >
            Cancel Trade
          </div>
        </div>
      )}
    </div>
  );
}