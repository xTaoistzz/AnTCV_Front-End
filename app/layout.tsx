import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ListGuest from "./components/navigation/lists";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnTCV 2.0",
  description: "Create by ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ListGuest/>{children}
      </body>
    </html>
  );
}
