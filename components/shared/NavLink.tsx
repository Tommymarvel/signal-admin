'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { ReactElement } from "react"

const NavLink = ({to, text, children}: {to : string, text : string, children : React.ReactNode}) => {
    const pathname = usePathname()
    const active = to === pathname
    const logout = to === '/logout'
  return (
    <Link href={to} className={`flex items-center gap-2 font-semibold lg:text-[1.2vw] px-5 py-3 ${logout ? 'hover:bg-red-200' : 'hover:bg-[#EEFFF4]'} ${active ? 'text-[#0F973D] bg-[#EEFFF4] rounded-[12px] ': 'text-[#202020]'}`}>
      {React.isValidElement<{ active: boolean, logout ?: boolean }>(children)
      ? React.cloneElement(children as ReactElement<{ active: boolean, logout ?: boolean }>, { active, logout })
      : children}
      {text}
    </Link>
  )
}

export default NavLink

export const PrimaryLink = ({to, text, className}:{to : string, text : string, className ?: string})=>{
    return(<Link href={to} className={`w-full px-6 py-3 text-white font-man-rope font-medium border-[#0B1B2B] rounded-lg bg-[#0B1B2B] hover:text-[#0B1B2B] hover:bg-white transition-all duration-300 ${className}`}>
    {text}
  </Link>)
}

export const Button = ({onClick, text, className, disabled}:{onClick ?: ()=> void, text : string, className ?: string, disabled ?: boolean})=>{
  return(<button onClick={onClick} disabled={disabled}  className={`w-full px-6 py-3 text-white font-man-rope font-medium cursor-pointer border border-[#0B1B2B] rounded-lg bg-[#0B1B2B] hover:text-[#0B1B2B] hover:bg-white transition-all duration-300 disabled:cursor-not-allowed disabled:bg-gray-400 ${className}`}>
  {text}
</button>)
}
