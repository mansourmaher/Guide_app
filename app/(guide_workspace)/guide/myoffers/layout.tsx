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
    <div className="h-full flex ">
      <Navbar />
      <div className="w-screen ">{children}</div>
    </div>
  );
}
