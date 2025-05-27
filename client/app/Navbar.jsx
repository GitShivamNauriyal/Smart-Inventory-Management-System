import React from "react";
import { Button } from "primereact/button";

const Navbar = () => {
    return (
        <div className="w-full bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 px-6 py-4 shadow-md flex items-center justify-between">
            {/* Left side: Title */}
            <div className="text-blue-400 text-xl font-bold tracking-wide">
                <a href="/">Inventory Management</a>
            </div>

            {/* Right side: Menu */}
            <div className="flex items-center gap-6 text-gray-200 text-base font-medium">
                <a href="/dashboard" className="hover:text-blue-400 transition">
                    Dashboard
                </a>
                <a href="/about" className="hover:text-blue-400 transition">
                    About
                </a>

                {/* Simulated user state */}
                <a
                    href="/about"
                    className="hover:text-blue-400 transition border-blue-400 hover:border-blue-600 border-[1px] p-3 rounded-lg "
                >
                    <i className="pi pi-user text-white mr-2" />
                    Signup
                </a>
                <Button className="flex items-center gap-2">
                    <i className="pi pi-user text-white" />
                    <a href="#login" className="text-white transition">
                        Login
                    </a>
                </Button>
            </div>
        </div>
    );
};

export default Navbar;
