import Header from "@/app/(landing_Page_Compoenets)/header";
import Navbar from "@/components/app_compoenets/Navbar";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex bg-slate-50 ">
      <Header />
      <div className="w-screen bg-slate-50 mt-8 ">{children}</div>
    </div>
  );
}
