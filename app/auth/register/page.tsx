"use client";

import { useState } from "react";
import Register from "@/app/components/auth/register";

export default function Auth() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <Register/>
    </div>
  );
}
