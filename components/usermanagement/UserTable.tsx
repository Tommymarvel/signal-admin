"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserDropDown from "./UserDropDown";
import { axiosGet } from "@/utils/api";
import { toast } from "react-toastify";


const UserTable = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [userList, setUserList] = useState<userDetailProps[]>([])
  const usersPerPage = 5;

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(userList.map((user) => user.id));
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

  const filteredUsers = userList.filter((users) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      users.name?.toLowerCase().includes(lowerSearch) ||
      String(users.id)?.toLowerCase().includes(lowerSearch) ||
      users.email?.toLowerCase().includes(lowerSearch)
    );
  });
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber : number) => setCurrentPage(pageNumber);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page when searching
  };

  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const getUsers = async()=>{
      try {
        const res = await axiosGet('/admin/users',true)
        setUserList(res.users)
      } catch (error) {
        toast.error('Error occured while fetching users data')
      }finally{
        setLoading(false)
      }
    }
    getUsers()
  },[])

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
            <th className="p-3">Phone</th>
            <th className="p-3">Date Joined</th>
            <th className="p-3">KYC Status</th>
            <th className="p-3">Status</th>
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
            </>) : currentUsers.map((user) => (
            <tr key={user.id} className="border-t border-gray-100 text-[0.85vw] font-semibold font-man-rope text-gray-400">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleSelectUser(user.id)}
                />
              </td>
              <td className="p-3 capitalize">{user.name ?? "N/A"}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.phone_number}</td>
              <td className="p-3">{user.date_joined}</td>
              <td className="p-3 text-blue-500">{user.kyc_status}</td>
              <td className={`p-3 ${user.status === 'Active' ? "text-green-500" : "text-red-500"}`}>{user.status === 'Inactive' ? 'Inactive' : "Active"}</td>
              <td className="p-3 text-blue-500"><UserDropDown userId={user.uid}/></td>
            </tr>
          ))}

        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">1-5 of {userList.length} users</p>
        <div className="flex space-x-2">
          {[...Array(Math.ceil(userList.length / usersPerPage)).keys()].map((number) => (
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

export default UserTable;
