"use client";

import { useState } from "react";
import Login from "../components/auth/login";
import Register from "../components/auth/register";

export default function Auth() {
  const [auth, setAuth] = useState("login");

  const handlelogin = () => {
    setAuth("login");
  }
  const handleregister = () => {
    setAuth("register")
  }

  return (
    <div className="">
      <div className="mt-5 text-center w-full items-center font-bold">
        <button onClick={handlelogin} className="p-3 m-3 bg-white rounded-md border-2 border-black hover:bg-slate-100 focus:bg-slate-300">Sign-In</button>
        <button onClick={handleregister} className="p-3 m-3 bg-white rounded-md border-2 border-black hover:bg-slate-100 focus:bg-slate-300">Sign-Up</button>
      </div>
      {auth === "register" && <Register />}
      {auth === "login" && <Login />}
    </div>
  );
}
