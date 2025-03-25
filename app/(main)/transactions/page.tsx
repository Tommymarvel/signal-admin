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
        <main className='grid grid-cols-[minmax(0,1fr)_100px_minmax(0,1fr)] bg-white p-6 rounded-[20px] font-man-rope'>
            <div>
                <h4 className='text-black text-lg font-semibold'>
                    Transaction Insights
                </h4>
                <div className='py-6'>
                    <p className='mb-6 font-medium text-sm text-gray-400'>Users deposited <span className='text-error-red font-semibold'>28.4%</span> more than they withdrew</p>
                    <section>
                        <div className='flex gap-4 mb-5'>
                            <Image src={'/transactions/incoming.svg'} alt='' width={48} height={48} />
                            <div>
                                <h2 className='text-[1vw] text-gray-400 font-medium'>Deposits</h2>
                                <p className='text-black font-bold text-[1.9vw]'>$190,977,000.20</p>
                            </div>
                        </div>
                        <div className='py-4 px-3 bg-white-200 rounded-xl w-fit'>
                            <h2 className='text-gray-400 text-[1vw] font-medium'>
                                Deposit Count
                            </h2>
                            <p className='text-black font-bold text-[1.9vw]'>
                                300
                            </p>
                        </div>
                    </section>
                    <div className='my-6 pr-5'>
                        <hr  className='border-[#DADCE0] '/>
                    </div>
                    <section>
                        <div className='flex gap-4 mb-5'>
                            <Image src={'/transactions/outgoing.svg'} alt='' width={48} height={48} />
                            <div>
                                <h2 className='text-[1vw] text-gray-400 font-medium'>Withdrawals</h2>
                                <p className='text-black font-bold text-[1.9vw]'>$25,977,000.20</p>
                            </div>
                        </div>
                        <div className='py-4 px-3 bg-white-200 rounded-xl w-fit'>
                            <h2 className='text-gray-400 text-[1vw] font-medium'>
                                Deposit Count
                            </h2>
                            <p className='text-black font-bold text-[1.9vw]'>
                                1014
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            <div className='py-7 pb-14'>
                <div className='border-l border-r border-[#DADCE0] w-[1px] h-full'>

                </div>
            </div>
            <TransactionsChart />
        </main>

    </div>)
}

export default page
