'use client';
import React from 'react';
import Image from 'next/image';
import { adminDetails } from '@/declarations/addAdmin.declaration';
import AdminDropDown from './AdminDropDown';

export default function AdminTable({loading, adminData, adminTools, toggleRefresh} : {loading : boolean, adminData : adminDetails[], adminTools : {indexOfFirstAdmin : number, indexOfLastAdmin : number, totalPages : number, currentPage : number, paginate : (value : number)=> void}, toggleRefresh : ()=>void}) {

  return (
    <div className="bg-white rounded-lg font-inter">

      {/* Table */}
      <table className="w-full border-collapse border border-gray-100 rounded-lg">
        <thead>
          <tr className="bg-white-200 text-left">
            <th className="p-3 text-gray-500">Admins</th>
            <th className="p-3 text-gray-500">Email</th>
            <th className="p-3 text-gray-500">Role</th>
            <th className="p-3 text-gray-500">Date Created</th>
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
          adminData.map((admin) => {
            return (
              <tr key={admin.id} className="border-t border-gray-100 text-[0.85vw] font-semibold font-man-rope text-gray-400">
                <td className="p-3 flex items-center gap-2">
                  <Image src={`/adminManage/person.svg`} alt='' width={30} height={30} />
                  {admin.name|| "N/A"}
                </td>
                <td className="p-3">{admin.email}</td>
                <td className="p-3">{admin.role}</td>
                <td className="p-3">{new Date(admin.dateCreated).toLocaleString()}</td>
                <td className="p-3">{admin.status}</td>
                <td className="p-3">
                  <AdminDropDown toggleRefresh={toggleRefresh} adminData={admin} />
                </td>
              </tr>
            );
          })}
          {/* If no trades found */}
          {adminData.length === 0 && (
            <tr>
              <td colSpan={8} className="p-3 text-center text-gray-400">
                No Admin found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        {/* Showing X-Y of Z Trades */}
        <p className="text-sm text-gray-600">
          {adminTools.indexOfFirstAdmin + 1}-
          {Math.min(adminTools.indexOfLastAdmin, adminData.length)} of{' '}
          {adminData.length} Trades
        </p>

        {/* Page Number Buttons */}
        <div className="flex space-x-2">
          {[...Array(adminTools.totalPages)].map((_, index) => {
            const page = index + 1;
            const isActive = page === adminTools.currentPage;
            return (
              <button
                key={page}
                onClick={() => adminTools.paginate(page)}
                className={`px-3 py-1 border rounded-md cursor-pointer ${
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
            onClick={() => adminTools.paginate(adminTools.currentPage - 1)}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Previous
          </button>
          <button
            onClick={() => adminTools.paginate(adminTools.currentPage + 1)}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
