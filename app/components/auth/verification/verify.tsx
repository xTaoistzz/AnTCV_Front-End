"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import SuccessModal from "./successVerify";

const Verify = () => {
  const [code, setCode] = useState(""); // To store the input code
  const [msg, setMsg] = useState(""); // To display messages (e.g., errors or success)
  const [modalIsOpen, setModalIsOpen] = useState(false); // To control the modal visibility
  const router = useRouter(); // Initialize useRouter

  const SubmitCode = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }), // Send the code in the request body
        credentials: 'include'
      });

      const data = await res.json();
      console.log(data);

      if (data.type === "success") {
        setMsg("Verification successful!");
        setModalIsOpen(true); // Show the success modal
        setTimeout(() => {
          router.push("/auth");
        }, 5000); // 5000 milliseconds = 5 seconds
      } else {
        setMsg(data.message || "Verification failed.");
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      setMsg("An error occurred while verifying the code.");
    }
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    // Redirect to /auth after closing the modal
    setTimeout(() => {
      router.push("/auth");
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Verification</h2>
        <div className="text-center mb-4">
          Verification Code has been sent to your email. Please check your email.
        </div>
        <div className="text-gray-500 mb-4">Code must be 6 characters</div>
        <form className="flex flex-col space-y-4" onSubmit={SubmitCode}>
          <label className="block text-sm font-medium text-gray-700">
            Enter Your Code
          </label>
          <input
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-400 text-white rounded-md shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-800"
          >
            Submit Code
          </button>
        </form>
        {msg && <div className="text-center mt-4 text-red-500">{msg}</div>}
        <div className="text-center mt-6">
          <button
            className="text-orange-400 hover:underline focus:outline-none"
            onClick={() => {
              // Logic to resend code
            }}
          >
            Send Code Again
          </button>
        </div>
      </div>
      <SuccessModal isOpen={modalIsOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Verify;