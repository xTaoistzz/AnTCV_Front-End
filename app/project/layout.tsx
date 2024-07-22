import React from "react";
import ListMem from "../components/navigation/Member";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="sticky top-0 z-50 bg-white shadow-md">
          <ListMem />
        </div>
        <div className="min-h-screen bg-gradient-to-r from-orange-100 to-green-100 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}