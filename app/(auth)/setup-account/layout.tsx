import Header from "@/app/(landing_Page_Compoenets)/header";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex bg-gradient-to-b from-blue-50 to-white ">
      <Header />
      <div className="w-screen bg-slate-50 mt-28 ">{children}</div>
    </div>
  );
}
