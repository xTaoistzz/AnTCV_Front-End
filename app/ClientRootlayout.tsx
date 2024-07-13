"use client"
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import ListGuest from "./navigation/lists";
import ListMem from "./navigation/listMem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <>
      <Head>
        <title>AnTCV</title>
        <meta name="description" content="Your description here" />
      </Head>
      <div className={inter.className}>
        {authen ? <ListMem /> : <ListGuest />}
        {children}
      </div>
    </>
  );
}