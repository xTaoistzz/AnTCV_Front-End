"use client";
import React, { useState } from "react";
import SuccessDialog from "./loginsuccess";

export default function LoginA() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLoginSuccess = () => {
    setShowSuccess(true);
}

const handleCloseSuccess = () => {
    setShowSuccess(false);
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { username, password };
    try {
        const res = await fetch(`${process.env.ORIGIN_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
          });
      const data = await res.json();
      console.log(data);
      if (data.type === "failed") {
        setMsg(data.message)
      } else {
        handleLoginSuccess()
      }
    } catch (error) {
      console.error("Error Logging In: ", error);
    }
  };
  return (
    <div className="flex w-full justify-center">
      <div className=" p-10 border-2 border-black rounded-lg ">
        <div className="text-lg font-bold mb-4 text-center">
          Sign-In to AnTCV
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">
          <div className="flex flex-col">
            <label htmlFor="username" className="block mb-1 font-semibold">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className=" border-2 border-gray-200 rounded-md focus:outline-gray-500"
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className=" border-2 border-gray-200 rounded-md focus:outline-gray-500"
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {msg && <div className="text-red-500">{msg}</div>}
          <button
            type="submit"
            className=" text-black border-2 border-black py-2 px-4 rounded hover:bg-gray-300 "
          >
            Sign In
          </button>
        </form>
      </div>
      <SuccessDialog isOpen={showSuccess} onClose={handleCloseSuccess}/>
    </div>
  );
}
