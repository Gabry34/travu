"use client";

import "../globals.css";
import { Inter } from "next/font/google";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "travu",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-white ${inter.className}`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}