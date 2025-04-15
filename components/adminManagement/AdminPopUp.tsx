import { addAdminSchema, adminDetails, adminInfo,adminOption,adminOptions } from "@/declarations/addAdmin.declaration"
import { ErrorMessage, Field, Form, Formik } from "formik"
import Select from 'react-select'
import { AdminModal } from "../shared/Modals"
import { useState } from "react"
import Image from "next/image"

export const AdminPopUp = ({IsOpen,toggleAddAdmin,adminData,popupType} : {IsOpen : boolean, toggleAddAdmin : ()=>void, adminData ?: adminDetails, popupType : 'add' | 'edit'})=>{
    const [isSuccessful, setIsSuccessful] = useState(false)
    return(<AdminModal isOpen={IsOpen} onClose={()=>{toggleAddAdmin()}}>
      <Formik
      initialValues={{name : adminData?.name ?? '',email : adminData?.email ?? '', role : adminData?.role ?? ''}}
      validationSchema={addAdminSchema}
      onSubmit={(values)=>{
  
      }}
      >
        {
          ({isValid,dirty,setFieldValue,setFieldTouched})=>(<Form onClick={(e)=>{e.stopPropagation()}}>
            <header className='flex items-center justify-between mb-6'>
              <h4 className='text-spn-900 text-lg font-semibold'>
                {popupType == 'edit' ? 'Edit Admin' : 'Add Admin'}
              </h4>
              <Image onClick={toggleAddAdmin} src={`/adminManage/close.svg`} width={24} height={24} alt='close svg' className='cursor-pointer' /> 
            </header>
            <main className='space-y-6'>
              <label htmlFor="name" className='flex flex-col gap-2'>
                Name
                <Field name='name' id='name' readOnly={popupType == 'edit'} placeholder='Mark' className='p-4 text-base text-spn-900 outline-none rounded-[4px] border border-spn-100 bg-white' />
                <ErrorMessage name='name' component='div' className='text-red-500 text-sm italic' />
              </label>
              <label htmlFor="email" className='flex flex-col gap-2'>
                Email Address
                <Field name='email' id='email' readOnly={popupType == 'edit'} placeholder='info@signalWavex.com' className='p-4 text-base text-spn-900 outline-none rounded-[4px] border border-spn-100 bg-white' />
                <ErrorMessage name='email' component='div' className='text-red-500 text-sm italic' />
              </label>
              <label htmlFor="role" className='flex flex-col gap-2'>
                Assign Role
  
                <Select<adminOption>
                  options={adminOptions}
                  onChange={(newValue)=>{setFieldValue('role',newValue?.value)}}
                  onBlur={()=> setFieldTouched('role',true,true)}
                  placeholder="Select a role"
                  isClearable
                />
                <ErrorMessage name='role' component='div' className='text-red-500 text-sm italic' />
              </label>
              <div>
                <button disabled={!(isValid && dirty)} className='py-[11px] px-7 rounded-[3px] border border-[#000] bg-[#000] text-white text-sm font-semibold mt-8 cursor-pointer hover:text-[#000] hover:bg-inherit w-full transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-400'>
                  {popupType == 'edit' ? 'Save Changes' : 'Send Invite'}
                </button>
              </div>
            </main>
          </Form>)
        }
      </Formik>
    </AdminModal>)
}