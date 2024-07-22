"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";


const Forget = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.getElementById("__next") || "body");
    }
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    setError("");

    try {
      // Add your submit logic here

      // Show the modal after successful submission
      setModalIsOpen(true);

      // Close the modal and redirect after a delay
      setTimeout(() => {
        setModalIsOpen(false);
        router.push("/auth");
      }, 5000); // 3 seconds delay
    } catch (error) {
      console.error("Error submitting email:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Forget Password</h2>
        <p className="text-center mb-6">
          Please enter your email to receive a password reset link.
        </p>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Enter your Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className={`mt-1 block w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 text-white rounded-md shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Submit Email
          </button>
        </form>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
          <h2 className="text-lg font-semibold mb-4">Email has Sent.</h2>
          <div>Please check your email for the password reset link.</div>
        </div>
      </Modal>
    </div>
  );
};

export default Forget;