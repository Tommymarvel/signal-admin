'use client'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import { AuthProvider,useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div
      className={`bg-white-200 font-man-rope antialiased flex items-start h-screen w-full`}
    >
      <Sidebar />
      <AuthProvider>
        <MainComp children={children} />
      </AuthProvider>
    </div>
  )
}

export default layout

const MainComp = ({children} : {children : React.ReactNode})=>{
  const {loading} = useAuth()
  return(<>
  {
    loading ? (<div className='h-screen w-full flex items-center justify-center'>
      <Image src={`/animations/animatedBall.svg`} alt='ball' width={120} height={120} priority />
    </div>) : (<div className="w-full h-full overflow-y-auto">
      <Navbar/>
      {children}
    </div>)
  }
  </>)
}