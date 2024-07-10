"use client"
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { fetchUserDetails } from "@/store/slices/user.slice";
import { AppDispatch } from "@/store/store";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchUserDetails());
    }, [])
    return <main className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-y-auto">
            <Navbar />
            <div className="p-4 h-full">
                {children}
            </div>
        </div>
    </main>;
};

export default Layout;
