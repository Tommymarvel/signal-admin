'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPost } from '@/utils/api';

// Generate time slots in increments of `interval` minutes for the next 30 minutes
// starting from the next multiple of `interval`.
function generateTimeSlots(interval: number): string[] {
  const slots: string[] = [];
  const now = new Date();

  // Round "now" up to the next multiple of `interval`
  const remainder = now.getMinutes() % interval;
  if (remainder !== 0) {
    now.setMinutes(now.getMinutes() + (interval - remainder));
  }
  now.setSeconds(0);
  now.setMilliseconds(0);

  // We'll generate up to 30 minutes ahead in steps of `interval`
  // e.g. if interval = 5, that's 6 steps (0..30 => 7 total slots including 0).
  // if interval = 15, that's 2 steps (0..30 => 3 total slots).
  const totalSteps = Math.floor(30 / interval); // e.g. 30/5=6, 30/15=2
  for (let i = 0; i <= totalSteps; i++) {
    const slot = new Date(now);
    slot.setMinutes(now.getMinutes() + i * interval);

    const hh = String(slot.getHours()).padStart(2, '0');
    const mm = String(slot.getMinutes()).padStart(2, '0');
    slots.push(`${hh}:${mm}`);
  }
  return slots;
}

interface NewTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggleRefresh : ()=> void
}

export default function NewTradeModal({ isOpen, onClose, toggleRefresh }: NewTradeModalProps) {
  // Form states
  const [product, setProduct] = useState('BTC');
  const [direction, setDirection] = useState('CALL');
  const [amount, setAmount] = useState('30');

  // Time Period & Trade Period
  const [timePeriod, setTimePeriod] = useState('5'); // 5, 10, or 15
  const [timeSlots, setTimeSlots] = useState<string[]>([]); // auto-generated
  const [tradePeriod, setTradePeriod] = useState(''); // user-selected from timeSlots

  // Trading Fee
  const [tradingFee, setTradingFee] = useState('HoldPortfolio');
  const [loading, setLoading] = useState(false)

  // Generate new time slots whenever `timePeriod` changes
  useEffect(() => {
    const interval = parseInt(timePeriod, 10) || 5;
    const slots = generateTimeSlots(interval);
    setTimeSlots(slots);
    // default the tradePeriod to the first slot if available
    if (slots.length > 0) {
      setTradePeriod(slots[0]);
    } else {
      setTradePeriod('');
    }
  }, [timePeriod]);

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Handle form submission
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true)
      const data = {
        symbol : product,
        side : direction,
        price : Number(amount),
        time_period : timePeriod,
        trade_period : tradePeriod
      }
      await axiosPost(`/admin/trade/create`,data,true)
      toggleRefresh()
      onClose();
      toast.success("Trade Created Successfully")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
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
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 3) Time Period & Trade Period (2 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Time Period (5, 10, 15) */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-inter-medium text-gray-700">
                Time Period
              </label>
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>

            {/* Trade Period (populated by generateTimeSlots) */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-inter-medium text-gray-700">
                Trade Period
              </label>
              <select
                value={tradePeriod}
                onChange={(e) => setTradePeriod(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4) Trading Fee (full width) */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-inter-medium text-gray-700">
              Trading Fee
            </label>
            <select
              value={tradingFee}
              onChange={(e) => setTradingFee(e.target.value)}
              className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="HoldPortfolio">HoldPortfolio</option>
              <option value="AnotherFeeType">AnotherFeeType</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 w-1/2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white w-1/2 bg-black rounded-md hover:bg-gray-900 cursor-pointer disabled:cursor-not-allowed"
            >
              Set Trade Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
