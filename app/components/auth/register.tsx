"use client";

import React, { useState } from "react";
import SuccessDialog from "./registersuccess";

export default function RegisterA() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegisterSuccess = () => {
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { username, email, password, conPassword };
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.type === "failed") {
        setMsg(data.message);
      } else {
        handleRegisterSuccess();
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="p-10 border-black rounded-lg shadow-md bg-white">
        <div className="text-lg font-bold mb-4 text-center flex flex-col items-center">
          <img
            src="/favicon.ico"
            alt="Site Icon"
            className="h-12 rounded-full" // Adjust the size as needed
          />
          <div>Sign-Up to AnTCV</div>
        </div>
        <form className="flex flex-col space-y-4 items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full max-w-sm">
            <label htmlFor="username" className="block mb-1 text-gray-500">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="border border-gray-200 rounded-md focus:outline-gray-500"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full max-w-sm">
            <label htmlFor="email" className="block mb-1 text-gray-500">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 rounded-md focus:outline-gray-500"
            />
          </div>
          <div className="flex flex-col w-full max-w-sm">
            <label htmlFor="password" className="block mb-1 text-gray-500">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-200 rounded-md focus:outline-gray-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full max-w-sm">
            <label htmlFor="confirm password" className="block mb-1 text-gray-500">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-200 rounded-md focus:outline-gray-500"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          {msg && <div className="text-red-500 text-center">{msg}</div>}
          <button
            type="submit"
            className="text-black border-2 border-black py-2 px-4 rounded hover:bg-gray-300"
          >
            Sign Up
          </button>
        </form>
      </div>
      <SuccessDialog isOpen={showSuccess} onClose={handleCloseSuccess} />
    </div>
  );
}