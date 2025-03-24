'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import NewTradeModal from './modal/NewTradeModal';

interface Trade {
  id: number;
  tradeId: string;
  product: string;
  tradeType: 'Buy' | 'Sell';
  price: number;
  followed: number;
  totalValue: number;
  status: 'Active' | 'Failed' | 'Completed' | 'Pending';
}

// Mock data for demonstration
const allTrades: Trade[] = [
  {
    id: 1,
    tradeId: 'TRD-001',
    product: 'BTC',
    tradeType: 'Buy',
    price: 42500,
    followed: 3.613,
    totalValue: 21250,
    status: 'Active',
  },
  {
    id: 2,
    tradeId: 'TRD-002',
    product: 'BTC',
    tradeType: 'Buy',
    price: 42500,
    followed: 0.734,
    totalValue: 12000,
    status: 'Failed',
  },
  {
    id: 3,
    tradeId: 'TRD-003',
    product: 'ETH',
    tradeType: 'Sell',
    price: 2800,
    followed: 5.12,
    totalValue: 14336,
    status: 'Completed',
  },
  {
    id: 4,
    tradeId: 'TRD-004',
    product: 'BTC',
    tradeType: 'Buy',
    price: 43000,
    followed: 1.05,
    totalValue: 45150,
    status: 'Completed',
  },
  {
    id: 5,
    tradeId: 'TRD-005',
    product: 'ETH',
    tradeType: 'Buy',
    price: 2850,
    followed: 0.35,
    totalValue: 997.5,
    status: 'Pending',
  },
  {
    id: 6,
    tradeId: 'TRD-006',
    product: 'BTC',
    tradeType: 'Buy',
    price: 41000,
    followed: 2.75,
    totalValue: 112750,
    status: 'Active',
  },
  {
    id: 7,
    tradeId: 'TRD-007',
    product: 'BTC',
    tradeType: 'Sell',
    price: 41500,
    followed: 3.0,
    totalValue: 124500,
    status: 'Failed',
  },
  {
    id: 8,
    tradeId: 'TRD-008',
    product: 'ETH',
    tradeType: 'Sell',
    price: 3000,
    followed: 4.2,
    totalValue: 12600,
    status: 'Active',
  },
  {
    id: 8,
    tradeId: 'TRD-008',
    product: 'ETH',
    tradeType: 'Sell',
    price: 3000,
    followed: 4.2,
    totalValue: 12600,
    status: 'Active',
  },
  
  // ... add as many as needed
];

export default function TradesTable() {
  // Table state
  const [trades, setTrades] = useState<Trade[]>(allTrades);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

  const tradesPerPage = 10;

  // Filter trades by search
  const filteredTrades = trades.filter((trade) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      trade.tradeId.toLowerCase().includes(lowerSearch) ||
      trade.product.toLowerCase().includes(lowerSearch)
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
          {currentTrades.map((trade) => {
            // Color-coding statuses
            let statusColor = 'text-gray-500';
            if (trade.status === 'Active') statusColor = 'text-green-500';
            else if (trade.status === 'Failed') statusColor = 'text-red-500';
            else if (trade.status === 'Completed')
              statusColor = 'text-gray-700';
            else if (trade.status === 'Pending')
              statusColor = 'text-yellow-500';

            return (
              <tr key={trade.id} className="border-t border-gray-100">
                <td className="p-3">{trade.tradeId}</td>
                <td className="p-3">{trade.product}</td>
                <td className="p-3">{trade.tradeType}</td>
                <td className="p-3">{trade.price.toLocaleString()}</td>
                <td className="p-3">{trade.followed}</td>
                <td className="p-3">{trade.totalValue.toLocaleString()}</td>
                <td className={`p-3 font-medium ${statusColor}`}>
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
