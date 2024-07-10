'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import '../utils/axiosConfig';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import Loader from "@/components/shared/loader";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { LoadingProvider } from "@/components/shared/loadingProvider";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(false);

  return (
    <Provider store={store}>
      <LoadingProvider>
        <html lang="en">
          <body className={inter.className}> {loading && <Loader />}<ToastContainer />{children}</body>
        </html>
      </LoadingProvider>
    </Provider>

  );
}
