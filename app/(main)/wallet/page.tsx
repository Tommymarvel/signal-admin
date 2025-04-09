import TransactionTable from '@/components/transaction/TransactionTable'
import React from 'react'

const page = () => {
  return (
    <div className="my-5 mx-11">
      <header className='p-6 pr-16 rounded-[20px] bg-white font-man-rope mb-[31px]'>
        <h1 className='text-black font-semibold mb-11'>
        Available Balances
        </h1>
        <main>

        </main>
      </header>
      <TransactionTable/>
    </div>
  )
}

export default page

const BalanceItem = ({coin,value}:{coin : string, value : string})=>{
  return(<div className='p-6'>
    <h4 className='mb-4'>
      {coin}
    </h4>
    <p>
      {value}
    </p>
  </div>)
}
