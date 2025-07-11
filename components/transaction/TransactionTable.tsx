"use client"
import { axiosGet } from "@/utils/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TrxDropDown from "./TrxDropDown";


interface trrxProps{
  "id": number,
  "user_id": number,
  "tx_id": string,
  "currency": string,
  "chain": string,
  "amount": string,
  "handling_fee": string,
  "total_deduction": string,
  "withdraw_address": string,
  "type": string,
  "status": string,
  "created_at": string,
  "updated_at": string
}

const TransactionTable = () => {
  const [selectedTrx, setSelectedTrx] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [trxs, setTrxs] = useState<trrxProps[]>([])
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const trxsPerPage = 5;

  const toggleRefresh = ()=> setRefresh(!refresh)

  const toggleSelectAll = () => {
    if (selectAll) {
        setSelectedTrx([]);
    } else {
        setSelectedTrx(trxs.map((trx) => String(trx.id)));
    }
    setSelectAll(!selectAll);
  };

  useEffect(()=>{
    const getAllTrx = async()=>{
      try {
        setLoading(true)
        const res = await axiosGet(`/admin/withdraw-requests`,true)
        setTrxs(res.transactions)
      } catch (error) {
        toast.error('Unable to fetch Transaction data')
      }finally{
        setLoading(false)
      }
    }
    getAllTrx()
  },[])


  const toggleSelectTrx = (id : string) => {
    setSelectedTrx((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((trxId) => trxId !== id)
        : [...prevSelected, id]
    );
  };
  const indexOfLastTrx = currentPage * trxsPerPage;
  const indexOfFirstTrx = indexOfLastTrx - trxsPerPage;

  const paginate = (pageNumber : number) => setCurrentPage(pageNumber);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page when searching
  };
  const filteredTrx = trxs?.filter((trx) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      trx.currency?.toLowerCase().includes(lowerSearch) ||
      String(trx.id || trx.tx_id)?.toLowerCase().includes(lowerSearch) ||
      trx.status?.toLowerCase().includes(lowerSearch)
    );
  });

  const currentTrx = filteredTrx?.slice(indexOfFirstTrx, indexOfLastTrx);

  return (
    <div>
      <div className="mb-4 flex items-center gap-3 w-full max-w-[22.2vw] border border-gray-100 py-3 px-5 rounded-lg">
          <Image src={'/umanage/search.svg'} alt="" width={20} height={20} />
          <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by Transaction ID, username"
          className="w-full border-none outline-none text-gray-400 placeholder:text-gray-200"
          />
      </div>
      <main className=" bg-white rounded-lg">
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
              <th className="p-3">Transaction ID</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Type</th>
              <th className="p-3">Asset</th>
              <th className="p-3">Amount ($) </th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
            </thead>
            <tbody>
            {loading ? (<>
              {[...Array(5)].map((_, index) => ( // Generate 5 skeleton rows
                <tr key={index} className="animate-pulse border-gray-100">
                  <td colSpan={8} className="p-3">
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  </td>
                </tr>
              ))}
              </>) :currentTrx?.map((trx) => (
              <tr key={trx?.tx_id || trx?.id} className="border-t border-gray-100">
              <td className="p-3">
                <input
                type="checkbox"
                checked={selectedTrx.includes(String(trx?.tx_id || trx?.id))}
                onChange={() => toggleSelectTrx(String(trx?.tx_id || trx?.id))}
                />
              </td>
              <td className="p-3">{trx?.tx_id || trx?.id}</td>
              <td className="p-3">{trx.user_id}</td>
              <td className="p-3">{trx.type}</td>
              <td className="p-3">{trx.currency}</td>
              <td className="p-3">{trx.amount}</td>
              <td className="p-3">{new Date(trx?.created_at).toLocaleString()}</td>
              <td className={`p-3 ${trx.status == "completed" ? "text-green-500" : "text-red-500"}`}>{trx.status}</td>
              <td className="p-3"><TrxDropDown toggleRefresh={toggleRefresh} trxId={trx.id} /></td>
              </tr>
            ))}
            </tbody>
        </table>
        {
          (trxs && trxs.length > 1) ? (<div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">1-5 of {trxs?.length} users</p>
            <div className="flex space-x-2">
            {[...Array(Math.ceil(trxs?.length / trxsPerPage)).keys()].map((number) => (
                <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-3 py-1 border rounded-md ${currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
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
        </div>) : (<div className="text-center my-4">No Withdrawal Requests found</div>)
        }
        
      </main>
    </div>
  );
};

export default TransactionTable;
