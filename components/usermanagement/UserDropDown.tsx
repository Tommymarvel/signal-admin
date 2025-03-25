"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function UserDropDown({userId}:{userId : string}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Toggle Button */}

      <Image src={`/umanage/more.svg`} className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} alt="" width={24} height={24}/>

      {/* Dropdown Items */}
      {isOpen && (
        <div className="absolute top-1 right-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 cursor-pointer">
          <Link
          href={`/userManagement/${userId}`}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Image src={`/umanage/eye.svg`} alt="eye" width={16} height={16} />
            View Details
          </Link>
        </div>
      )}
    </div>
  );
}