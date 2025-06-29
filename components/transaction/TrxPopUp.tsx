'use client';

import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { axiosPost } from '@/utils/api';
import axios from 'axios';

interface TrxPopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrxPopUp({ isOpen, onClose }: TrxPopUpProps) {
  const [loading, setLoading] = useState(false)


  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    // Overlay
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 md:p-8">
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
        >
          X
        </button>

        {/* Heading */}
        <h2 className="text-xl font-inter-semibold text-black">
          Funds Withdrawal
        </h2>

        {/* Form */}
        <Formik
        initialValues={{withdrawAddress : '', adminWithrawSecret: ''}}
        onSubmit={async(values)=>{
          try {
            await axios.post('https://deposit-address-microservice.onrender.com/fundpolling',values)
            toast.success('Funds Transferred Successfully')
          } catch (error) {
            toast.error('An error occurred while Processing Withdrawal')
          }
        }}
        >
          <Form className='flex flex-col gap-2 mt-4'>
            <div className="flex flex-col gap-1">
                <label className="mb-1 text-sm font-inter-medium text-gray-700">
                  Withdrawal Address
                </label>
                <Field name='withdrawAddress' className='rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'  />
                <ErrorMessage name='withdrawAddress' className='italic text-sm text-red-400' />
            </div>
            <div className="flex flex-col gap-1">
              <label className="mb-1 text-sm font-inter-medium text-gray-700">
                Withdrawal Secret
              </label>
              <Field name='adminWithrawSecret' className='rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'  />
              <ErrorMessage name='adminWithrawSecret' className='italic text-sm text-red-400' />
            </div>
            <div className="flex w-full justify-between gap-3 pt-4">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 w-1/2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                Cancel
                </button>
                <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-white w-1/2 bg-black rounded-md hover:bg-gray-900 cursor-pointer disabled:cursor-not-allowed"
                >
                Withdraw
                </button>
            </div>
          </Form>
        </Formik>

      </div>
    </div>
  );
}
