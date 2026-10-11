import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import Navliks from "@/components/Navliks";
import Marquee from "@/components/Marquee";
import { Suspense } from "react";

const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
});

const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
});

export const metadata: Metadata = {
title: "বাজার দর | বাংলাদেশের বাজারদর",
description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বর্তমান বাজারদর দেখুন।",
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html
lang="bn"
data-theme="light"
className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
> <body className="flex min-h-full flex-col"> <Navbar />


    <Suspense
      fallback={
        <div className="flex min-h-40 items-center justify-center gap-4">
          <div className="skeleton h-10 w-24 rounded-full" />
          <div className="skeleton h-10 w-24 rounded-full" />
          <div className="skeleton h-10 w-24 rounded-full" />
        </div>
      }
    >
      <Navliks />
      <Marquee />
    </Suspense>

    <ToastContainer
      position="top-right"
      autoClose={3000}

    />

    <main className="flex-1">{children}</main>

    <Footer />
  </body>
</html>


);
}
