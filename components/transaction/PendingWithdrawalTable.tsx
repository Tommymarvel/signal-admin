'use client';
import { axiosGet } from '@/utils/api';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TrxDropDown from './TrxDropDown';

interface trrxProps {
  id: number;
  user_id: number;
  tx_id: string;
  currency: string;
  chain: string;
  amount: string;
  handling_fee: string;
  total_deduction: string;
  withdraw_address: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const PendingWithdrawalTable = () => {
  const [selectedTrx, setSelectedTrx] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [trxs, setTrxs] = useState<trrxProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTrxs, setTotalTrxs] = useState(0);
  const [currentFrom, setCurrentFrom] = useState(1);
  const [currentTo, setCurrentTo] = useState(50);
  const trxsPerPage = 50;

  const toggleRefresh = () => setRefresh(!refresh);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedTrx([]);
    } else {
      setSelectedTrx(
        Array.isArray(trxs) ? trxs.map((trx) => String(trx.id)) : []
      );
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    const getAllTrx = async () => {
      try {
        setLoading(true);
        const res = await axiosGet(
          `/admin/withdraw-requests?status=pending&page=${currentPage}`,
          true
        );
        console.log('Pending withdrawals API response:', res);

        // Handle different response structures
        let data: trrxProps[] = [];
        let pagination: any = {};

        if (res.pending_withdrawals) {
          // Empty response structure
          data = res.pending_withdrawals.data || [];
          pagination = res.pending_withdrawals;
        } else if (res.withdrawals) {
          // Standard response structure
          data = res.withdrawals.data || [];
          pagination = res.withdrawals;
        } else if (res.data && Array.isArray(res.data)) {
          // Direct array response
          data = res.data;
          pagination = res;
        } else if (Array.isArray(res)) {
          // Direct array
          data = res;
          pagination = {
            last_page: 1,
            total: res.length,
            from: 1,
            to: res.length,
          };
        } else {
          // Fallback
          data = [];
          pagination = { last_page: 1, total: 0, from: null, to: null };
        }

        setTrxs(data);
        setTotalPages(pagination.last_page || 1);
        setTotalTrxs(pagination.total || data.length);
        setCurrentFrom(pagination.from || (data.length > 0 ? 1 : null));
        setCurrentTo(pagination.to || data.length);
      } catch (error) {
        console.log('Error fetching pending withdrawals:', error);
        toast.error('Unable to fetch Pending Withdrawals data');
      } finally {
        setLoading(false);
      }
    };
    getAllTrx();
  }, [currentPage, refresh]);

  const toggleSelectTrx = (id: string) => {
    setSelectedTrx((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((trxId) => trxId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredTrx = Array.isArray(trxs)
    ? trxs.filter((trx) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
          trx.currency?.toLowerCase().includes(lowerSearch) ||
          String(trx.id || trx.tx_id)
            ?.toLowerCase()
            .includes(lowerSearch) ||
          trx.status?.toLowerCase().includes(lowerSearch)
        );
      })
    : [];

  const currentTrx = filteredTrx;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSearchTerm(''); // reset search when changing page
    setSelectedTrx([]); // reset selections
    setSelectAll(false);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page when searching
    setSelectedTrx([]); // reset selections
    setSelectAll(false);
  };

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
              <th className="p-3">Address</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                {[...Array(5)].map(
                  (
                    _,
                    index // Generate 5 skeleton rows
                  ) => (
                    <tr key={index} className="animate-pulse border-gray-100">
                      <td colSpan={10} className="p-3">
                        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              Array.isArray(currentTrx) &&
              currentTrx.map((trx) => (
                <tr
                  key={trx?.tx_id || trx?.id}
                  className="border-t border-gray-100"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedTrx.includes(
                        String(trx?.tx_id || trx?.id)
                      )}
                      onChange={() =>
                        toggleSelectTrx(String(trx?.tx_id || trx?.id))
                      }
                    />
                  </td>
                  <td className="p-3">{trx?.tx_id || trx?.id}</td>
                  <td className="p-3">{trx.user_id}</td>
                  <td className="p-3">{trx.type}</td>
                  <td className="p-3">{trx.currency}</td>
                  <td className="p-3">{trx.amount}</td>
                  <td className="p-3">{trx.withdraw_address || 'N/A'}</td>
                  <td className="p-3">
                    {new Date(trx?.created_at).toLocaleString()}
                  </td>
                  <td
                    className={`p-3 ${
                      trx.status == 'completed'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {trx.status}
                  </td>
                  <td className="p-3">
                    <TrxDropDown toggleRefresh={toggleRefresh} trxId={trx.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {Array.isArray(trxs) && trxs.length > 0 ? (
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              {currentFrom}-{currentTo} of {totalTrxs} pending withdrawals
            </p>
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    disabled={loading}
                    className={`px-3 py-1 border rounded-md cursor-pointer ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-7">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={loading || currentPage === 1}
                className={`text-sm text-gray-600 hover:text-gray-800 ${
                  loading || currentPage === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={loading || currentPage === totalPages}
                className={`text-sm text-gray-600 hover:text-gray-800 ${
                  loading || currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center my-4">No Pending Withdrawals found</div>
        )}
      </main>
    </div>
  );
};

export default PendingWithdrawalTable;
