'use client'
import { AdminPopUp } from '@/components/adminManagement/AdminPopUp'
import AdminTable from '@/components/adminManagement/AdminTable'
import NoAdmins from '@/components/adminManagement/NoAdmins'
import { adminDetails } from '@/declarations/addAdmin.declaration'
import { axiosGet } from '@/utils/api'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const adminList = [
  {
    id :1,
    name: "Ade Bankole",
    email: "bankole@signalwavex.com",
    role: "Super Admin",
    dateCreated: "03/03/2025",
    status: "Active",
  },
  {
    id : 2,
    name: "Tomiwa Ibironke",
    email: "tomiwa@signalwavex.com",
    role: "General Admin",
    dateCreated: "03/03/2025",
    status: "Active",
  },
  {
    id : 3,
    name: "Asuquo Victor",
    email: "victor@signalwavex.com",
    role: "General Admin",
    dateCreated: "03/03/2025",
    status: "Active",
  },
  {
    id : 4,
    name: "Oladimeji Momoh",
    email: "tomiwa@signalwavex.com",
    role: "General Admin",
    dateCreated: "03/03/2025",
    status: "Deactivated",
  },
  {
    id : 5,
    name: "Ernest Felix",
    email: "tomiwa@signalwavex.com",
    role: "General Admin",
    dateCreated: "03/03/2025",
    status: "Active",
  },
  {
    id : 6,
    name: "Fiyin George",
    email: "tomiwa@signalwavex.com",
    role: "General Admin",
    dateCreated: "03/03/2025",
    status: "Active",
  },
  {
    id : 7,
    name: "Fiyin George",
    email: "tomiwa@signalwavex.com",
    role: "General Admin",
    dateCreated: "03/03/2025",
    status: "Deactivated",
  },
  {
    id : 8,
    name: "Sarah Musa",
    email: "sarah@signalwavex.com",
    role: "General Admin",
    dateCreated: "04/03/2025",
    status: "Active",
  },
  {
    id : 9,
    name: "Emeka Uche",
    email: "emeka@signalwavex.com",
    role: "Super Admin",
    dateCreated: "02/03/2025",
    status: "Active",
  },
  {
    id : 20,
    name: "Tola Alabi",
    email: "tola@signalwavex.com",
    role: "General Admin",
    dateCreated: "01/03/2025",
    status: "Deactivated",
  },
  {
    id : 10,
    name: "Ifeoma Okeke",
    email: "ifeoma@signalwavex.com",
    role: "General Admin",
    dateCreated: "05/03/2025",
    status: "Active",
  },
  {
    id : 11,
    name: "Kelvin Etim",
    email: "kelvin@signalwavex.com",
    role: "General Admin",
    dateCreated: "04/03/2025",
    status: "Active",
  },
  {
    id : 12,
    name: "Chinelo Obi",
    email: "chinelo@signalwavex.com",
    role: "Super Admin",
    dateCreated: "01/03/2025",
    status: "Active",
  },
  {
    id : 13,
    name: "Seyi Ogundipe",
    email: "seyi@signalwavex.com",
    role: "General Admin",
    dateCreated: "02/03/2025",
    status: "Deactivated",
  },
  {
    id : 14,
    name: "Michael Akin",
    email: "michael@signalwavex.com",
    role: "General Admin",
    dateCreated: "05/03/2025",
    status: "Active",
  },
  {
    id : 15,
    name: "Abiola Johnson",
    email: "abiola@signalwavex.com",
    role: "General Admin",
    dateCreated: "05/03/2025",
    status: "Active",
  },
  {
    id : 16,
    name: "Daniel Ojo",
    email: "daniel@signalwavex.com",
    role: "General Admin",
    dateCreated: "03/03/2025",
    status: "Deactivated",
  },
  {
    id : 17,
    name: "Grace Alade",
    email: "grace@signalwavex.com",
    role: "General Admin",
    dateCreated: "03/03/2025",
    status: "Active",
  },
  {
    id : 18,
    name: "Funmi Adewale",
    email: "funmi@signalwavex.com",
    role: "Super Admin",
    dateCreated: "03/03/2025",
    status: "Active",
  },
  {
    id: 19,
    name: "Jude Nwankwo",
    email: "jude@signalwavex.com",
    role: "General Admin",
    dateCreated: "03/03/2025",
    status: "Deactivated",
  },
];


const page = () => {
  const [addAdminIsOpen,setAddAdminIsOpen] = useState(false)


  const [admins, setAdmins] = useState<adminDetails[]>([]);
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const adminsPerPage = 10;

  useEffect(()=>{
    // const getAdmins = async()=>{
    //   try {
    //     setLoading(true)
    //     const res = await axiosGet(`/admin/trade-calls`,true)
    //     setTrades(res.trade_calls)
    //   } catch (error) {
    //     toast.error('Error occurred while fetching admin data')
    //   }finally{
    //     setLoading(false)
    //   }
    // }
    // getAdmins()
    setAdmins(adminList)
  },[])

  // Filter trades by search
  const filteredAdmins = admins.filter((admin) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      admin.name?.toLowerCase().includes(lowerSearch) ||
      String(admin.email)?.toLowerCase().includes(lowerSearch) ||
      admin.role?.toLowerCase().includes(lowerSearch)
    );
  });

  // Pagination calculations
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(
    indexOfFirstAdmin,
    indexOfLastAdmin
  );
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page when searching
  };

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const toggleAddAdmin = ()=> {
    setAddAdminIsOpen(!addAdminIsOpen)
  }

  return (
    <div className="my-5 mx-11">
      <header className=' mb-8'>
        <Link href={'/transactions'} className='px-2 py-2 text-gray-100 font-man-rope bg-[#1B1F3B] rounded-lg font-semibold text-lg'>
            Admin Team Members
        </Link>
      </header>
      <main className='h-full'>
        {
          currentAdmins.length > 0 ? (<section>
          <div className="flex justify-between items-center mb-4">
            {/* Search Bar */}
            <div className="flex items-center gap-3 w-full max-w-[22.2vw] border border-gray-100 py-3 px-5 rounded-lg">
              <Image
                src="/umanage/search.svg"
                alt="search icon"
                width={20}
                height={20}
              />
              <input
                type="text"
                placeholder="Search trades by Trade ID, Asset"
                className="w-full border-none outline-none text-gray-400 placeholder:text-gray-200"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Action Button */}
            <button
              className="bg-[#000] text-white py-2 px-4 rounded-md cursor-pointer hover:bg-[#00000034]"
              onClick={toggleAddAdmin}
            >
              Add Admins
            </button>
          </div>
          <AdminTable adminData={currentAdmins} loading={loading} adminTools={{indexOfFirstAdmin,indexOfLastAdmin,currentPage,paginate,totalPages}} />
          </section>)  : (<NoAdmins createAdminHandler={toggleAddAdmin} />)
        }
        
        <AdminPopUp IsOpen={addAdminIsOpen} toggleAddAdmin={toggleAddAdmin} popupType='add' />
      </main>
    </div>
  )
}

export default page





