'use client'
import { Button } from '@/components/shared/NavLink'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const page = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleTogglePassword = ()=> setShowPassword(!showPassword)
  const router = useRouter()
  return (
    <div className='flex justify-center items-center h-screen font-inter'>
      <Formik
      initialValues={{email : '',password : ''}}
      validationSchema={Yup.object({
        email : Yup.string().email('Invalid Email Address').required('Email field is required'),
        password : Yup.string().required('Password field is required')
      })}
      onSubmit={async(values)=>{
        try {
          setLoading(true)
          toast.loading('Submitting',{toastId : 'signin'})
          const res = await axios.post('/api/auth/login',values)
          toast.update('signin',{render: res.data.message,
            type: 'success',
            isLoading: false,
            autoClose: 2000,
          })
          toast.warning('Redirecting to dashboard...',{autoClose : 2000})
          setTimeout(()=>{
            const lastLocation = localStorage.getItem('sig_lastKnown_location')
            if(lastLocation){
              router.push(lastLocation)
            }else{
              router.push('/')
            }
            
          },2000)
          setLoading(false)
        } catch (error) {
          if(error instanceof AxiosError){
            console.log(error)
            toast.update('signin',{render: error.response?.data.message,
              type: 'error',
              isLoading: false,
              autoClose: 2000,
            })
            setLoading(false)
          }
        }
      }}
      >
        <Form className='w-full lg:max-w-[470px]'>
          <header className='mb-[33px] flex justify-center'>
            <Image src={`/dashboard/sidebarlogo.svg`} alt='logo' width={183} height={29} />
          </header>
          <main className='py-10 px-8 rounded-2xl shadowy text-center'>
            <h3 className='text-[#1B1818] font-bold text-2xl text-center mb-1'>
            Sign in with your email
            </h3>
            <p className='text-office-brown-700 text-sm mb-8'>
            Use your email to sign in to the admin platform
            </p>
            <label htmlFor="email" className='flex flex-col gap-2 text-left px-3.5
            '>
              Email Address
              <Field type='email' name='email' id='email' className='rounded-[6px] p-4 border border-gray-400 text-gray-400 font-medium placeholder:font-extralight outline-none' placeholder='Enter email address'/>
              <ErrorMessage name='email' component='div' className='italic text-xs text-red-400' />
            </label>
            <label htmlFor="password" className='flex flex-col gap-2 mt-4 text-left px-3.5'>
              PASSWORD
              <div className='rounded-[6px] p-4 border border-gray-400 text-gray-400 font-medium placeholder:font-extralight flex items-center gap-2'>
                <Field type={showPassword ? 'text': 'password'} name='password' id='password'  placeholder='Enter email address' className='outline-none w-[90%]'/>
                <Image src={showPassword ? '/login/unsee.svg' : '/login/see.png'} alt='eyes'  width={20} height={20} className='w-[5%] cursor-pointer' onClick={handleTogglePassword}/>
              </div>
              <ErrorMessage name='password' component='div' className='italic text-xs text-red-400' />
            </label>
            <div className='px-3.5 mt-8'>
              <Button text='Sign In' disabled={loading} className='bg-[#000] text-white font-semibold rounded-lg' />
            </div>
          </main>
        </Form>
      </Formik>
    </div>
  )
}

export default page
