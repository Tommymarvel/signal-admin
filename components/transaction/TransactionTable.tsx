"use client"
import Image from "next/image";
import React, { useState } from "react";

const trxs= [
    {
      transactionId: "TXN-102314",
      userName: "Mark Johnson",
      type: "Buy",
      asset: "BTC",
      amount: 5000.00,
      dateTime: "2025-03-10 16:35:22",
      status: "Completed"
    },
    {
      transactionId: "TXN-102315",
      userName: "Mark Johnson",
      type: "Buy",
      asset: "BTC",
      amount: 5000.00,
      dateTime: "2025-03-10 16:35:22",
      status: "Pending"
    },
    {
      transactionId: "TXN-102316",
      userName: "Mark Johnson",
      type: "Buy",
      asset: "BTC",
      amount: 5000.00,
      dateTime: "2025-03-10 16:35:22",
      status: "Failed"
    },
    {
      transactionId: "TXN-102317",
      userName: "Mark Johnson",
      type: "Buy",
      asset: "BTC",
      amount: 5000.00,
      dateTime: "2025-03-10 16:35:22",
      status: "Completed"
    },
    {
      transactionId: "TXN-102318",
      userName: "Mark Johnson",
      type: "Buy",
      asset: "BTC",
      amount: 5000.00,
      dateTime: "2025-03-10 16:35:22",
      status: "Completed"
    },
    {
      transactionId: "TXN-102319",
      userName: "Mark Johnson",
      type: "Buy",
      asset: "BTC",
      amount: 5000.00,
      dateTime: "2025-03-10 16:35:22",
      status: "Completed"
    },
    {
      transactionId: "TXN-102320",
      userName: "Mark Johnson",
      type: "Buy",
      asset: "BTC",
      amount: 5000.00,
      dateTime: "2025-03-10 16:35:22",
      status: "Completed"
    },
    {
      transactionId: "TXN-102321",
      userName: "Mark Johnson",
      type: "Buy",
      asset: "BTC",
      amount: 5000.00,
      dateTime: "2025-03-10 16:35:22",
      status: "Completed"
    },
    {
      transactionId: "TXN-102322",
      userName: "Mark Johnson",
      type: "Buy",
      asset: "BTC",
      amount: 5000.00,
      dateTime: "2025-03-10 16:35:22",
      status: "Completed"
    },
    {
      transactionId: "TXN-102323",
      userName: "Mark Johnson",
      type: "Buy",
      asset: "BTC",
      amount: 5000.00,
      dateTime: "2025-03-10 16:35:22",
      status: "Completed"
    },
    {
      transactionId: "TXN-102324",
      userName: "Mark Johnson",
      type: "Buy",
      asset: "BTC",
      amount: 5000.00,
      dateTime: "2025-03-10 16:35:22",
      status: "Completed"
    }
];
  

const TransactionTable = () => {
  const [selectedTrx, setSelectedTrx] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const trxsPerPage = 5;

  const toggleSelectAll = () => {
    if (selectAll) {
        setSelectedTrx([]);
    } else {
        setSelectedTrx(trxs.map((trx) => trx.transactionId));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectTrx = (id : string) => {
    setSelectedTrx((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };
  const indexOfLastTrx = currentPage * trxsPerPage;
  const indexOfFirstTrx = indexOfLastTrx - trxsPerPage;
  const currentTrx = trxs.slice(indexOfFirstTrx, indexOfLastTrx);

  const paginate = (pageNumber : number) => setCurrentPage(pageNumber);

  return (
    <div>
        <div className="mb-4 flex items-center gap-3 w-full max-w-[22.2vw] border border-gray-100 py-3 px-5 rounded-lg">
            <Image src={'/umanage/search.svg'} alt="" width={20} height={20} />
            <input
            type="text"
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
                    <th className="p-3">User Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Asset</th>
                    <th className="p-3">Amount ($) </th>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Status</th>
                </tr>
                </thead>
                <tbody>
                {currentTrx.map((trx) => (
                    <tr key={trx.transactionId} className="border-t border-gray-100">
                    <td className="p-3">
                        <input
                        type="checkbox"
                        checked={selectedTrx.includes(trx.transactionId)}
                        onChange={() => toggleSelectTrx(trx.transactionId)}
                        />
                    </td>
                    <td className="p-3">{trx.transactionId}</td>
                    <td className="p-3">{trx.userName}</td>
                    <td className="p-3">{trx.type}</td>
                    <td className="p-3">{trx.asset}</td>
                    <td className="p-3">{trx.amount}</td>
                    <td className="p-3">{trx.dateTime}</td>
                    <td className={`p-3 ${trx.status === "Active" ? "text-green-500" : "text-red-500"}`}>{trx.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">1-5 of {trxs.length} users</p>
                <div className="flex space-x-2">
                {[...Array(Math.ceil(trxs.length / trxsPerPage)).keys()].map((number) => (
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
            </div>
        </main>
    </div>
  );
};

export default TransactionTable;
