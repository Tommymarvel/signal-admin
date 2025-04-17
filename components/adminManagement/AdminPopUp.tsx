import { addAdminSchema, adminDetails,adminOption,adminOptions } from "@/declarations/addAdmin.declaration"
import { ErrorMessage, Field, Form, Formik } from "formik"
import Select from 'react-select'
import { AdminModal } from "../shared/Modals"
import { useState } from "react"
import Image from "next/image"
import { axiosPost } from "@/utils/api"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"

export const AdminPopUp = ({IsOpen,toggleAddAdmin,adminData,popupType, toggleRefresh} : {IsOpen : boolean, toggleAddAdmin : ()=>void, adminData ?: adminDetails, popupType : 'add' | 'edit', toggleRefresh : ()=> void})=>{
    const [loading, setLoading] = useState(false)
    return(<AdminModal isOpen={IsOpen} onClose={()=>{toggleAddAdmin()}}>
      <Formik
      initialValues={{name : adminData?.name ?? '',email : adminData?.email ?? '', role : adminData?.role ?? ''}}
      validationSchema={addAdminSchema}
      onSubmit={async(values)=>{
        try {
          setLoading(true)
          if(popupType === 'add'){
            const data = {
              name : values.name,
              email : values.email,
              role_id : values.role,
            }

            const res = await axiosPost(`/admin/create`,data,true)
            toast.success('Admin Account Created Successfully')

          }else if (popupType === 'edit'){
            const data ={
              admin_id : adminData?.id,
              new_role_id : values.role
            }
            await axiosPost(`/admin/reassign-role`,data,true)
            toast.success('Admin Account Edited Successfully')
          }
          setLoading(false)
          toggleRefresh()
        } catch (error) {
          if(isAxiosError(error)){
            toast.error(error.response?.data.message ?? "Error Occurred while creating Admin Profile")
          }
        }finally{
          setLoading(false)
        }
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
                <button disabled={!(isValid && dirty) || loading} className='py-[11px] px-7 rounded-[3px] border border-[#000] bg-[#000] text-white text-sm font-semibold mt-8 cursor-pointer hover:text-[#000] hover:bg-inherit w-full transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-400'>
                  {popupType == 'edit' ? 'Save Changes' : 'Send Invite'}
                </button>
              </div>
            </main>
          </Form>)
        }
      </Formik>
    </AdminModal>)
}