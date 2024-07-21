import React from "react";
import ListGuest from "../components/navigation/lists"; // Adjust path if necessary
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ListGuest />
        <div className="min-h-screen bg-gradient-to-r from-orange-100 to-green-100 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}