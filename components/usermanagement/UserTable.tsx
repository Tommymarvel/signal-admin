"use client"
import Image from "next/image";
import React, { useState } from "react";

const users = [
  { id: 1, name: "Amara Onyebuchi", email: "amaonyebuchi@ecs.com", phone: "08147511481", dateJoined: "12/05/2023", kycStatus: "Verified", status: "Active" },
  { id: 2, name: "Paul Ashiwaju", email: "paashiwaju@ecs.com", phone: "08147511481", dateJoined: "17/05/2023", kycStatus: "Pending", status: "Active" },
  { id: 3, name: "Bimpe Arinshaun", email: "paashiwaju@ecs.com", phone: "08147511481", dateJoined: "17/05/2023", kycStatus: "Rejected", status: "Inactive" },
  { id: 4, name: "Paul Ashiwaju", email: "paashiwaju@ecs.com", phone: "08147511481", dateJoined: "17/05/2023", kycStatus: "Verified", status: "Active" },
  { id: 5, name: "Amara Onyebuchi", email: "amaonyebuchi@ecs.com", phone: "08147511481", dateJoined: "12/05/2023", kycStatus: "Verified", status: "Suspended" }
];

const UserTable = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectUser = (id : number) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber : number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-white rounded-lg ">
      <div className="flex justify-between items-center">
        <div className="mb-4 flex items-center gap-3 w-full max-w-[22.2vw] border border-gray-100 py-3 px-5 rounded-lg">
            <Image src={'/umanage/search.svg'} alt="" width={20} height={20} />
            <input
            type="text"
            placeholder="Search by user ID, email address"
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
            <th className="p-3">Phone</th>
            <th className="p-3">Date Joined</th>
            <th className="p-3">KYC Status</th>
            <th className="p-3">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="border-t border-gray-100">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleSelectUser(user.id)}
                />
              </td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.phone}</td>
              <td className="p-3">{user.dateJoined}</td>
              <td className="p-3 text-blue-500">{user.kycStatus}</td>
              <td className={`p-3 ${user.status === "Active" ? "text-green-500" : "text-red-500"}`}>{user.status}</td>
              <td className="p-3 text-blue-500"><Image src={`/umanage/more.svg`} alt="" width={24} height={24}/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">1-5 of {users.length} users</p>
        <div className="flex space-x-2">
          {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((number) => (
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
    </div>
  );
};

export default UserTable;
