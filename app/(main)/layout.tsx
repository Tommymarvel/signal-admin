import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import { AuthProvider } from '@/context/AuthContext'
import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div
      className={`bg-white-200 font-man-rope antialiased flex items-start h-screen w-full`}
    >
      <Sidebar />
      <AuthProvider>
        <div className="w-full h-full overflow-y-auto">
          <Navbar/>
          {children}
        </div>
      </AuthProvider>
    </div>
  )
}

export default layout
