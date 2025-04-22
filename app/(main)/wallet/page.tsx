'use client'
import TransactionTable from '@/components/wallet/TransactionTable'
import { axiosGet } from '@/utils/api'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [holdings, setHoldings] = useState({})
  useEffect(()=>{
    const getHoldings = async()=>{
      try {
        const res = await axiosGet(`/admin/total-crypto-holdings`,true)
        setHoldings(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getHoldings()
    
  },[])
  return (
    <div className="my-5 mx-11">
      <header className='p-6 pr-16 rounded-[20px] bg-white font-man-rope mb-[31px]'>
        <h1 className='text-black font-semibold mb-5'>
        Available Balances
        </h1>
        <main className='flex gap-4'>
          {
            Object.entries(holdings).map(([key, value])=> <BalanceItem key={key} coin={key} value={String(Number(value).toFixed(2))}/>)
          }
        </main>
      </header>
      <TransactionTable/>
    </div>
  )
}

export default page

const BalanceItem = ({coin,value}:{coin : string, value : string})=>{
  return(<div className='py-6 w-[17.9vw]'>
    <h4 className='text-[#667185] font-inter mb-4'>
      {coin}
    </h4>
    <p className='text-[32px] font-medium text-[#0F1011]'>
      {value}
    </p>
  </div>)
}
