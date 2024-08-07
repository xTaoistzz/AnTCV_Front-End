"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessDialog from "./loginsuccess";
import Link from "next/link";

export default function LoginA() {
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLoginSuccess = () => {
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { username, password };
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.type === "failed") {
        setMsg(data.message);
      } else {
        handleLoginSuccess();
        setTimeout(() => {
          router.push("/project");
        }, 2000); // 5000 milliseconds = 5 seconds
      }
    } catch (error) {
      console.error("Error Logging In: ", error);
    }
  };
  return (
    <div className="flex w-full justify-center">
      <div className=" p-20 rounded-lg shadow-lg bg-white">
        <div className="text-lg font-bold mb-4 text-center flex flex-col items-center">
        <img
            src="/favicon.ico"
            alt="Site Icon"
            className="h-12 rounded-full" // Adjust the size as needed
          />
          <div>
            Sign-In to AnTCV
          </div>
          
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 items-center"
        >
          <div className="flex flex-col">
            <label htmlFor="username" className="block mb-1 text-gray-500">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className=" border border-gray-200 rounded-md focus:outline-gray-500 pl-2 text-sm"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="block mb-1 text-gray-500">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className=" border border-gray-200 rounded-md focus:outline-gray-500 pl-2 text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {msg && <div className="text-red-500">{msg}</div>}
          <button
            type="submit"
            className=" text-gray-700 py-2 px-4 rounded bg-white hover:bg-orange-400 hover:text-white transition-colors duration-300 border"
          >
            Sign In
          </button>
        </form>
        <div className=" text-center mt-3 flex flex-col text-sm space-y-2 ">
          <Link href="/auth/register">
          <button className="text-gray-400 hover:text-gray-900">
            Don't have any account ? Sign-Up
          </button>
          </Link>
          <Link href="/auth/forget">          
          <button className="hover:text-gray-900 rounded-lg text-gray-400 text-sm">
            forget password?
          </button>
          </Link>

        </div>
      </div>
      <SuccessDialog isOpen={showSuccess} onClose={handleCloseSuccess} />
    </div>
  );
}
