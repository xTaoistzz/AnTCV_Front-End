"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ListGuest from "./components/navigation/lists";
import ListMem from "./components/navigation/listMem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "AnTCV 2.0",
//   description: "Create by ",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authen, setAuthen] = useState(false)
const router = useRouter()
  const fetchName = async() => {
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/returnUsername`, { credentials : 'include' })
      const data = await res.json()
      console.log(data.username);
      if (res.ok) {
        setAuthen(true);
        router.push("/project")
      }
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    fetchName()
  })

  return (
    <html lang="en">
      <body className={inter.className}>
        { authen ? <ListMem/>:<ListGuest/>}{children}
      </body>
    </html>
  );
}
