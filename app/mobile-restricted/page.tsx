import React from "react";

const MobileRestrictedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100 text-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Restricted</h1>
        <p className="text-gray-700 mb-4">
          This website is only accessible from desktop devices. Please switch to a desktop browser to continue.
        </p>
        <div className="mt-4">
          <p className="text-gray-500">For further assistance, contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default MobileRestrictedPage;
