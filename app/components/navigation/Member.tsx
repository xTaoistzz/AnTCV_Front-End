"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SuccessModal from "./LogOutSuccess";

export default function ListMem() {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/logout`, {
        method: "GET", // Ensure correct HTTP method
        credentials: 'include',
      });

      if (res.ok) {
        setModalIsOpen(true); // Show the success modal
        setTimeout(() => {
          router.push('/auth'); // Redirect to /auth after a short delay
        }, 1000); // Short delay to show the modal
      } 
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    // Optionally, handle additional logic if needed
  };

  return (
    <div id="navigation" className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-300 to-green-300 shadow-md">
      <Link href="/">
        <div className="flex items-center">
          <img
            src="/favicon.ico"
            alt="Site Icon"
            className="h-12 rounded-full" // Adjust the size as needed
          />
          <span className="ml-2 font-bold text-3xl text-gray-900 hover:text-gray-900 transition-colors duration-300">
            AnTCV
          </span>
        </div>
      </Link>
      
      <div className="flex space-x-6">
        <Link href="/project">
          <button className="bg-white text-gray-800 hover:bg-orange-400 transition-colors duration-300 hover:text-white font-medium  rounded-lg p-2">Project</button>
        </Link>
        <button onClick={()=>handleLogout()} className="bg-white text-gray-800 hover:bg-orange-400 transition-colors duration-300 hover:text-white font-medium rounded-lg p-2">Logout</button>
      </div>

      {/* Render the SuccessModal */}
      <SuccessModal isOpen={modalIsOpen} onClose={handleCloseModal} />
    </div>
  );
}