"use client"
import { useAuth } from "@/context/AuthContext"
import Image from "next/image"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [userInfo, setUserInfo] = useState({initials : '', name : '', email : '',role :''})
  const {user} = useAuth()
  useEffect(()=>{
    if(user){
      const {name,email,role} = user
      const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
      setUserInfo((prev)=>({...prev, name, email, initials, role}));
    }
  },[user])
  
  return (
    <div className="flex justify-between border-b bg-white border-gray-100 py-4 lg:py-5 px-10">
      <div className="font-inter font-semibold text-black lg:text-[2.22vw]">
        Dashboard
      </div>
      <div className="flex items-center gap-4">
        <div className="px-7 border-x border-gray-100 ">
          <div className="relative">
            <Image  src={'/dashboard/notification.svg'} alt="" className="lg:w-[2.77vw] lg:h-[2.77vw]" width={40} height={40}/>
            <p className="absolute top-0 right-0 h-4 w-4 bg-burnt-orange text-[10px] text-pr3 flex justify-center items-center rounded-full">4</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-medium w-10 h-10 bg-[#75AD74] text-white rounded-full flex justify-center items-center text-[1.1vw]">
            {userInfo.initials}
          </p>
          <div>
            <div>
              <h4 className="text-black text-[1.25vw] font-semibold">
                {`${userInfo.name.substring(0,8)}.`}
                <span className="inline-block text-xs text-pr2 px-2 py-1 bg-[#EFEFF9] rounded-xl"> {userInfo.role}</span>
              </h4>
              <p className="text-xs text-gray-300">
                SignalwaveX
              </p>
            </div>
          </div>
          <Image src={'/dashboard/arrow-up.svg'} alt="" width={24} height={24} className="rotate-180 cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
