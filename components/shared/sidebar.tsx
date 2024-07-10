import Link from 'next/link';
import React from 'react'
import { FaBug, FaHome } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div className="hidden md:flex flex-col w-64 bg-gray-800">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <span className="text-white font-bold uppercase">Issue Tracker</span>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 bg-gray-800">
                    <Link href={"/"} className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 gap-1"> <FaHome />
                        Home
                    </Link>
                    <Link href={"/issue/create"} className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 gap-1"><FaBug />
                        Create New Issue
                    </Link>

                </nav>
            </div>
        </div>
    )
}

export default Sidebar