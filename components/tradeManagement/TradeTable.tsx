'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NewTradeModal from './modal/NewTradeModal';
import { axiosGet } from '@/utils/api';
import { toast } from 'react-toastify';

interface Trade {
  id: number;
  tid: string;
  trading_pair: string;
  order_direction: 'PUT' | 'CALL';
  price: string;
  followed: number;
  totalValue: number;
  status: 'active' | 'failed' | 'completed' | 'pending';
}


export default function TradesTable() {
  // Table state
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false)

  const tradesPerPage = 10;

  useEffect(()=>{
    const getTrades = async()=>{
      try {
        setLoading(true)
        const res = await axiosGet(`/admin/trade-calls`,true)
        setTrades(res.trade_calls)
      } catch (error) {
        toast.error('Error occurred while fetching trade data')
      }finally{
        setLoading(false)
      }
    }
    getTrades()
  },[refresh])

  // Filter trades by search
  const filteredTrades = trades.filter((trade) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      trade.tid?.toLowerCase().includes(lowerSearch) ||
      String(trade.id)?.toLowerCase().includes(lowerSearch) ||
      trade.trading_pair?.toLowerCase().includes(lowerSearch)
    );
  });

  // Pagination calculations
  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
  const currentTrades = filteredTrades.slice(
    indexOfFirstTrade,
    indexOfLastTrade
  );
  const totalPages = Math.ceil(filteredTrades.length / tradesPerPage);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page when searching
  };

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const toggleRefresh = ()=> setRefresh(!refresh)

  return (
    <div className="p-6 bg-white rounded-lg font-inter">
      {/* Top Bar: Search + Button */}
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
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Set New Trade Order
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-100 rounded-lg">
        <thead>
          <tr className="bg-white-200 text-left">
            <th className="p-3 text-gray-500">Trade ID</th>
            <th className="p-3 text-gray-500">Product</th>
            <th className="p-3 text-gray-500">Trade Type</th>
            <th className="p-3 text-gray-500">Price ($)</th>
            <th className="p-3 text-gray-500">Followed</th>
            <th className="p-3 text-gray-500">Total Value ($)</th>
            <th className="p-3 text-gray-500">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          { loading ? (
            <>
              {[...Array(5)].map((_, index) => ( // Generate 5 skeleton rows
                <tr key={index} className="animate-pulse border-gray-100">
                  <td colSpan={8} className="p-3">
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  </td>
                </tr>
              ))}
            </>) :
          currentTrades.map((trade) => {
            // Color-coding statuses
            let statusColor = 'text-gray-500';
            if (trade.status == 'active') statusColor = 'text-green-500';
            else if (trade.status == 'failed') statusColor = 'text-red-500';
            else if (trade.status == 'completed')
              statusColor = 'text-gray-700';
            else if (trade.status == 'pending')
              statusColor = 'text-yellow-500';

            return (
              <tr key={trade.id} className="border-t border-gray-100 text-[0.85vw] font-semibold font-man-rope text-gray-400">
                <td className="p-3">{trade.tid || "N/A"}</td>
                <td className="p-3">{trade.trading_pair}</td>
                <td className="p-3">{trade.order_direction}</td>
                <td className="p-3">{trade?.price?.toLocaleString() || "N/A"}</td>
                <td className="p-3">{trade?.followed || "N/A"}</td>
                <td className="p-3">{trade?.totalValue?.toLocaleString() || "N/A"}</td>
                <td className={`p-3 font-medium capitalize ${statusColor}`}>
                  {trade.status}
                </td>
                <td className="p-3">
                  <Image
                    src="/umanage/more.svg"
                    alt="more"
                    width={24}
                    height={24}
                  />
                </td>
              </tr>
            );
          })}
          {/* If no trades found */}
          {currentTrades.length === 0 && (
            <tr>
              <td colSpan={8} className="p-3 text-center text-gray-400">
                No trades found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        {/* Showing X-Y of Z Trades */}
        <p className="text-sm text-gray-600">
          {indexOfFirstTrade + 1}-
          {Math.min(indexOfLastTrade, filteredTrades.length)} of{' '}
          {filteredTrades.length} Trades
        </p>

        {/* Page Number Buttons */}
        <div className="flex space-x-2">
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-3 py-1 border rounded-md ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Previous / Next Buttons */}
        <div className="flex items-center gap-7">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Next
          </button>
        </div>
      </div>
      <NewTradeModal
       toggleRefresh={toggleRefresh}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
