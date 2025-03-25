import TransactionsChart from '@/components/transaction/TransactionChart'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (<div className="my-5 mx-11">
        <header className='flex items-center gap-5 mb-8'>
            <Link href={'/transactions'} className='px-2 py-2 text-gray-100 font-man-rope bg-[#1B1F3B] rounded-lg font-semibold text-lg'>
                Transactions Insights 
            </Link>

            <Link href={'/transactions/all'} className='text-[#5E5E5E] font-man-rope font-semibold text-lg'>
                All Transactions
            </Link>
        </header>
        <main className='grid grid-cols-2 bg-white p-6 rounded-[20px] font-man-rope'>
            <div>
                <h4 className='text-black text-lg font-semibold'>
                    Transaction Insights
                </h4>
                <div className='border-r border-[#DADCE0]'>
                    <p className='mt-6 font-medium text-sm text-gray-400'>Users deposited <span className='text-error-red font-semibold'>28.4%</span> more than they withdrew</p>
                    <div className='flex'>
                        <Image src={} alt='' />
                        <div>
                            <h2>Deposits</h2>
                            <p>

                            </p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <TransactionsChart />
        </main>

    </div>)
}

export default page
