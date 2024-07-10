import Sidebar from "@/components/shared/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <main className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex items-center justify-end h-16 bg-white border-b border-gray-200">

                <div className="flex items-end pr-4">

                    <button
                        className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="p-4">
                {children}
            </div>
        </div></main>;
};

export default Layout;
