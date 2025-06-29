"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { axiosGet } from "@/utils/api";
import { toast } from "react-toastify";
import KycDropDown from "./KycDropDown";
import Link from "next/link";


interface kycProps { 
  "id": number,
  "user_id": number,
  "first_name": string,
  "last_name": string,
  "country": string,
  "id_type": string,
  "id_number": string,
  "status": string,
  "created_at": string,
  "updated_at": string ,
  document_path : string,
  "user": {
    "id": number,
    "name": string | null,
    "email": string | null
  }
}

const KycTable = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [kycList, setKycList] = useState<kycProps[]>([])
  const kycsPerPage = 10;


  const filteredKycs = kycList.filter((kycs) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      kycs.status?.toLowerCase().includes(lowerSearch) ||
      String(kycs.id)?.toLowerCase().includes(lowerSearch) ||
      kycs.user.email?.toLowerCase().includes(lowerSearch) ||
      kycs.user.name?.toLowerCase().includes(lowerSearch)
    );
  });

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredKycs.map((kyc) => kyc.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectUser = (id : number) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((kycId) => kycId !== id)
        : [...prevSelected, id]
    );
  };
  const indexOfLastKyc = currentPage * kycsPerPage;
  const indexOfFirstKyc = indexOfLastKyc - kycsPerPage;
  const currentKycs = filteredKycs.slice(indexOfFirstKyc, indexOfLastKyc);

  const paginate = (pageNumber : number) => setCurrentPage(pageNumber);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page when searching
  };

  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const toggleRefresh = ()=> setRefresh(!refresh)
  useEffect(()=>{
    const getKycRequests = async()=>{
      try {
        setLoading(true)
        const res = await axiosGet('/admin/kyc-requests',true)
        setKycList(res.kyc_requests)
      } catch (error) {
        toast.error('Error occured while fetching users data')
      }finally{
        setLoading(false)
      }
    }
    getKycRequests()
  },[refresh])

  return (
    <div className="p-6 bg-white rounded-lg ">
      <div className="flex justify-between items-center">
        <div className="mb-4 flex items-center gap-3 w-full max-w-[22.2vw] border border-gray-100 py-3 px-5 rounded-lg">
            <Image src={'/umanage/search.svg'} alt="" width={20} height={20} />
            <input
            type="text"
            placeholder="Search by user ID, email address"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border-none outline-none text-gray-400 placeholder:text-gray-200"
            />
        </div>
        <div className="flex item-center gap-4">
            <Image src={'/umanage/filter.svg'} alt="" className="cursor-pointer " width={40} height={40} />
            <Image src={'/umanage/Exportcsv.svg'} alt="" width={40} height={40} />
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-100 rounded-lg">
        <thead>
          <tr className="bg-white-200 text-left rounded-lg">
            <th className="p-3">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="p-3">Name</th>
            <th className="p-3">Email Address</th>
            <th className="p-3">Id Type</th>
            <th className="p-3">Id Number</th>
            <th className="p-3">Id Document</th>
            <th className="p-3">Country</th>
            <th className="p-3">Date Created</th>
            <th className="p-3">KYC Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          { loading ? (
            <>
              {[...Array(5)].map((_, index) => ( // Generate 5 skeleton rows
                <tr key={index} className="animate-pulse border-gray-100">
                  <td colSpan={9} className="p-3">
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  </td>
                </tr>
              ))}
            </>) : currentKycs.map((kyc) => (
            <tr key={kyc.id} className="border-t border-gray-100 text-[0.85vw] font-semibold font-man-rope text-gray-400">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(kyc.id)}
                  onChange={() => toggleSelectUser(kyc.id)}
                />
              </td>
              <td className="p-3 capitalize">{kyc.user.name || "N/A"}</td>
              <td className="p-3">{kyc.user.email || "N/A"}</td>
              <td className="p-3 capitalize">{kyc.id_type || "N/A"}</td>
              <td className="p-3 ">{kyc.id_number || "N/A"}</td>
              <td className="p-3 ">
                <Link href={kyc.document_path ? kyc.document_path  : ''}  target={kyc.document_path && '_blank'} >
                  {kyc.document_path ? 'Click here to view' : 'N/A'}
                </Link>
              </td>
              <td className="p-3 ">{kyc.country}</td>
              <td className="p-3 capitalize">{new Date(kyc.created_at).toLocaleDateString()}</td>
              <td className={`p-3 capitalize ${kyc.status == 'verified' ? "text-green-500" : "text-red-500"}`}>{kyc.status}</td>
              <td className="p-3 text-blue-500"><KycDropDown toggleRefresh={toggleRefresh} kycId={kyc.id}/></td>
            </tr>
          ))}

        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">1-5 of {filteredKycs.length} users</p>
        <div className="flex space-x-2">
          {[...Array(Math.ceil(filteredKycs.length / kycsPerPage)).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`px-3 py-1 border rounded-md cursor-pointer ${currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-7">
            <button>
                Previous
            </button>
            <button>
                Next
            </button>
        </div>
      </div>
    </div>
  );
};

export default KycTable;
