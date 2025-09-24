'use client';
import TransactionsChart from '@/components/transaction/TransactionChart';
import TrxDropDown from '@/components/transaction/TrxDropDown';
import TrxPopUp from '@/components/transaction/TrxPopUp';
import { axiosGet } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface insightProps {
  deposit_count: number;
  withdraw_count: number;
  transaction_count: number;
  total_deposited: string;
  total_withdrawn: string;
  deposit_vs_withdraw_percentage: string;
}

const page = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(`month=${new Date().getMonth() + 1}`);
  const [insights, setInsights] = useState<insightProps>({} as insightProps);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const getTradingInsights = async () => {
      try {
        const res = await axiosGet(`/admin/transaction-counts?${filter}`, true);
        setInsights(res);
      } catch (error) {
        toast.error('Error Occurred While Fetching Trading Insights');
      } finally {
        setLoading(false);
      }
    };

    getTradingInsights();
  }, [filter]);
  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  if (loading) return null;
  return (
    <div className="my-5 mx-11">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-5 ">
          <Link
            href={'/transactions'}
            className="px-2 py-2 text-gray-100 font-man-rope bg-[#1B1F3B] rounded-lg font-semibold text-lg"
          >
            Transactions Insights
          </Link>

          <Link
            href={'/transactions/all'}
            className="text-[#5E5E5E] font-man-rope font-semibold text-lg"
          >
            All Transactions
          </Link>

          <Link
            href={'/transactions/pending'}
            className="text-[#5E5E5E] font-man-rope font-semibold text-lg"
          >
            Pending Withdrawal
          </Link>
        </div>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Withdraw Funds
        </button>
      </header>
      <main className="grid grid-cols-[minmax(0,1fr)_100px_minmax(0,1fr)] bg-white p-6 rounded-[20px] font-man-rope">
        <div>
          <h4 className="text-black text-lg font-semibold">
            Transaction Insights
          </h4>
          <div className="py-6">
            <p className="mb-6 font-medium text-sm text-gray-400">
              Users deposited{' '}
              <span className="text-error-red font-semibold">
                {insights?.deposit_vs_withdraw_percentage}
              </span>{' '}
              more than they withdrew
            </p>
            <section>
              <div className="flex gap-4 mb-5">
                <Image
                  src={'/transactions/incoming.svg'}
                  alt=""
                  width={48}
                  height={48}
                />
                <div>
                  <h2 className="text-[1vw] text-gray-400 font-medium">
                    Deposits
                  </h2>
                  <p className="text-black font-bold text-[1.9vw]">
                    {insights?.total_deposited}
                  </p>
                </div>
              </div>
              <div className="py-4 px-3 bg-white-200 rounded-xl w-fit">
                <h2 className="text-gray-400 text-[1vw] font-medium">
                  Deposit Count
                </h2>
                <p className="text-black font-bold text-[1.9vw]">
                  {insights?.deposit_count}
                </p>
              </div>
            </section>
            <div className="my-6 pr-5">
              <hr className="border-[#DADCE0] " />
            </div>
            <section>
              <div className="flex gap-4 mb-5">
                <Image
                  src={'/transactions/outgoing.svg'}
                  alt=""
                  width={48}
                  height={48}
                />
                <div>
                  <h2 className="text-[1vw] text-gray-400 font-medium">
                    Withdrawals
                  </h2>
                  <p className="text-black font-bold text-[1.9vw]">
                    {insights?.total_withdrawn}
                  </p>
                </div>
              </div>
              <div className="py-4 px-3 bg-white-200 rounded-xl w-fit">
                <h2 className="text-gray-400 text-[1vw] font-medium">
                  Withdrawal Count
                </h2>
                <p className="text-black font-bold text-[1.9vw]">
                  {insights?.withdraw_count}
                </p>
              </div>
            </section>
          </div>
        </div>
        <div className="py-7 pb-14">
          <div className="border-l border-r border-[#DADCE0] w-[1px] h-full"></div>
        </div>
        <TransactionsChart handleFilter={handleFilter} insights={insights} />
        <TrxPopUp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </div>
  );
};

export default page;
