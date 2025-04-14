'use client'
import { AdminModal } from '@/components/shared/Modals'
import { addAdminSchema } from '@/declarations/addAdmin.declaration'
import { Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
  const [addAdminIsOpen,setAddAdminIsOpen] = useState(true)
  const [editAdminIsOpen,setEditAdminIsOpen] = useState(false)
  const toggleAddAdmin = ()=> setAddAdminIsOpen(!addAdminIsOpen)
  const toggleEditAdmin = ()=> setAddAdminIsOpen(!editAdminIsOpen)
  return (
    <div className="my-5 mx-11">
      <header className=' mb-8'>
        <Link href={'/transactions'} className='px-2 py-2 text-gray-100 font-man-rope bg-[#1B1F3B] rounded-lg font-semibold text-lg'>
            Admin Team Members
        </Link>
      </header>
      <main className='h-full'>
        <NoAdmins createAdminHandler={toggleAddAdmin} />
        <AddAdmin IsOpen={addAdminIsOpen} toggleAddAdmin={toggleAddAdmin} />
      </main>
    </div>
  )
}

export default page

export const AddAdmin = ({IsOpen,toggleAddAdmin} : {IsOpen : boolean, toggleAddAdmin : ()=>void})=>{
  return(<AdminModal isOpen={IsOpen} onClose={toggleAddAdmin}>
    <Formik
    initialValues={{f_name : '', l_name : '', email : '', role : ''}}
    validationSchema={addAdminSchema}
    onSubmit={(values)=>{

    }}
    >
      <header>
        <h4>

        </h4>
        <Image src={`/adminManage/close.svg`} alt='close svg' /> 
      </header>
    </Formik>
  </AdminModal>)
}


const NoAdmins = ({createAdminHandler} : {createAdminHandler : ()=> void})=>{
    return(<div className='flex justify-center w-full pt-32'>
        <div className='flex flex-col items-center justify-center'>
            <Image src={'/adminManage/noAdmin.svg'} alt='' width={100} height={100} />
            <h4 className='text-[#0D0F11] text-center font-semibold text-lg mb-[6px]'>No Admin Members Created</h4>
            <p className='text-[#81909D] font-normal text-xs text-center'>Create a new admin member by clicking the button</p>
            <button onClick={createAdminHandler} className='py-[11px] px-7 rounded-[3px] border border-[#000] bg-[#000] text-white text-sm font-semibold mt-8 cursor-pointer hover:text-[#000] hover:bg-inherit transition-all duration-300 ease-in-out'>
                Create Admin
            </button>
        </div>
    </div>)
}
