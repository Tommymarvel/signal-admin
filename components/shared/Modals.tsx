'use client'
import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
const BASIC_MODAL_STYLES = "fixed top-1/2 w-[85%] max-w-[535px] left-[50%] lg:left-1/2 transform -translate-x-[50%] lg:-translate-x-1/2 -translate-y-1/2 z-40 bg-[#fff] rounded-[5px] opacity-100 lg:p-[24px] font-inter-semibold text-center"

const OVERLAY_STYLE = "bg-[rgba(0,0,0,0.5)] fixed left-0 right-0 top-0 bottom-0 z-30 backdrop-blur-sm"


export const AdminModal = ({isOpen, onClose,children} : {isOpen : boolean, onClose : ()=> void, children : React.ReactNode}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if(!isOpen) return null
    
  return mounted ? createPortal(
    <div className={`${OVERLAY_STYLE}`} onClick={onClose}>
      <div className={`${BASIC_MODAL_STYLES}`} >
        {children}
      </div>
    </div>
    ,
    document.body
  ) :  null
}

