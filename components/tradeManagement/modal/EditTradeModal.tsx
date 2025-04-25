'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPost } from '@/utils/api';
import { Trade } from '../TradeTable';


interface NewTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggleRefresh : ()=> void
  tradeData : Trade
}

export default function EditTradeModal({ isOpen, onClose, toggleRefresh, tradeData }: NewTradeModalProps) {
  // Form states
  const [product, setProduct] = useState(tradeData.symbol);
  const [direction, setDirection] = useState<'CALL' | 'PUT' | string>(tradeData.side);
  const [amount, setAmount] = useState(tradeData.price);

  const [openPrice, setOpenPrice] = useState<number>(Number(tradeData.open_price) || 0);
  const [settlementPrice, setSettlementPrice] = useState<number>(Number(tradeData.settlement_price) ||0);
  const [ror, setRor] = useState(Number(tradeData.rate_of_return) || 0);

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Handle form submission
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        "trade_id" : tradeData.id,
        "status" : 'FILLED',
        symbol : product,
        side : direction,
        rate_of_return : ror,
        settlement_price : settlementPrice,
        open_price : openPrice
      }
      const res = await axiosPost('/admin/edit-trade',data,true)
      console.log(res)
      toggleRefresh()
      onClose();
      toast.success("Trade Created Successfully")
    } catch (error) {
      console.log(error)
      toast.error("An error occurred while creating trade")
    }
    
  };

  return (
    // Overlay
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 md:p-8">
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
        >
          X
        </button>

        {/* Heading */}
        <h2 className="text-xl font-inter-semibold text-black">
          New Trade Setup
        </h2>
        <p className="mt-1 text-sm text-gray-500">Basic Trade Information</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* 1) Product (full width) */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-inter-medium text-gray-700">
              Product
            </label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="BTC/USDT">BTC/USDT</option>
              <option value="ETH/USDT">ETH/USDT</option>
              <option value="SOL/USDT">SOL/USDT</option>
            </select>
          </div>

          {/* 2) Direction & Amount (2 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Direction */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-inter-medium text-gray-700">
                Direction
              </label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="CALL">Call</option>
                <option value="PUT">Put</option>
              </select>
            </div>

            {/* Amount */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-inter-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                readOnly
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Prices */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-inter-medium text-gray-700">
                Open Price
              </label>
              <input
                type="number"
                value={openPrice}
                onChange={(e) => setOpenPrice(Number(e.target.value))}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

            </div>

            {/* settlement price */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-inter-medium text-gray-700">
                Settlement Price
              </label>
              <input
                type="number"
                value={settlementPrice}
                onChange={(e) => setSettlementPrice(Number(e.target.value))}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-inter-medium text-gray-700">
              Rate of Return in(%)
            </label>
            <input
                type="number"
                value={ror}
                onChange={(e) => setRor(Number(e.target.value))}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>



          {/* Action Buttons */}
          <div className="flex w-full  justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 w-1/2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white w-1/2 bg-black rounded-md hover:bg-gray-900"
            >
              Update Trade Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
