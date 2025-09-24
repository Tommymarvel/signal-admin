import TransactionTable from '@/components/transaction/TransactionTable'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="my-5 mx-11">
        <header className='flex items-center gap-5 mb-8'>
            <Link href={'/transactions'} className='text-[#5E5E5E] font-man-rope font-semibold text-lg'>
                Transactions Insights 
            </Link>

            <Link href={'/transactions/all'} className='px-2 py-2 text-gray-100 font-man-rope bg-[#1B1F3B] rounded-lg font-semibold text-lg'>
                All Transactions
            </Link>

            <Link href={'/transactions/pending'} className='text-[#5E5E5E] font-man-rope font-semibold text-lg'>
                Pending Withdrawal
            </Link>
        </header>
        <TransactionTable />
    </div>
  )
}

export default page
