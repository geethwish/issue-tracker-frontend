'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import '../utils/axiosConfig';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useContext, useEffect, useState } from "react";
import Loader from "@/components/shared/loader";
import { Provider } from 'react-redux';
import { store } from '../store/store';


const inter = Inter({ subsets: ["latin"] });

const LoadingContext = createContext<{ loading: boolean; setLoading: (loading: boolean) => void }>({
  loading: false,
  setLoading: () => { },
});

export const useLoading = () => useContext(LoadingContext);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(false);

  return (
    <Provider store={store}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <html lang="en">
          <body className={inter.className}> {loading && <Loader />}<ToastContainer />{children}</body>
        </html>
      </LoadingContext.Provider>
    </Provider>

  );
}
