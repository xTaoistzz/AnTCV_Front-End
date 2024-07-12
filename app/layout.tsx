"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import ListGuest from "./components/navigation/lists";
import ListMem from "./components/navigation/listMem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authen, setAuthen] = useState(false);
  const router = useRouter();

  const fetchName = async () => {
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/returnUsername`, { credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        setAuthen(true);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  useEffect(() => {
    fetchName();
  }, []); // Ensure useEffect runs only once on mount

  return (
    <html lang="en">
      <body className={inter.className}>
        {authen ? <ListMem /> : <ListGuest />}
        {children}
      </body>
    </html>
  );
}