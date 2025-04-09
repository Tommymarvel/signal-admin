import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="my-5 mx-11">
      <header className=' mb-8'>
        <Link href={'/transactions'} className='px-2 py-2 text-gray-100 font-man-rope bg-[#1B1F3B] rounded-lg font-semibold text-lg'>
            Admin Team Members
        </Link>
      </header>
      <main className='h-full'>
        <NoAdmins />
      </main>
    </div>
  )
}

export default page


const NoAdmins = ()=>{
    return(<div className='flex justify-center w-full pt-32'>
        <div className='flex flex-col items-center justify-center'>
            <Image src={'/adminManage/noAdmin.svg'} alt='' width={100} height={100} />
            <h4 className='text-[#0D0F11] text-center font-semibold text-lg mb-[6px]'>No Admin Members Created</h4>
            <p className='text-[#81909D] font-normal text-xs text-center'>Create a new admin member by clicking the button</p>
            <button className='py-[11px] px-7 rounded-[3px] border border-[#000] bg-[#000] text-white text-sm font-semibold mt-8 cursor-pointer hover:text-[#000] hover:bg-inherit transition-all duration-300 ease-in-out'>
                Create Admin
            </button>
        </div>
    </div>)
}
