import React from "react";

const Footer = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-300 py-16 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                    <h2 className="text-blue-400 text-xl font-bold mb-4">
                        Inventory Optimizer
                    </h2>
                    <p className="text-sm">
                        A Decision-Making Tool using Dynamic Programming. Built
                        for DAA project 2025.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-blue-400 font-semibold mb-3">
                        Navigation
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/" className="hover:text-blue-400">
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dashboard"
                                className="hover:text-blue-400"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="hover:text-blue-400">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-blue-400">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Team */}
                <div>
                    <h3 className="text-blue-400 font-semibold mb-3">Team</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Shivam Nauriyal</li>
                        <li>Krish Gupta</li>
                        <li>Vijay Singh Khati</li>
                        <li>Kanika Rawat</li>
                    </ul>
                </div>

                {/* GitHub */}
                <div>
                    <h3 className="text-blue-400 font-semibold mb-3">
                        Project
                    </h3>
                    <p className="text-sm mb-2">
                        View the source code and contribute on GitHub:
                    </p>
                    <a
                        href="https://github.com/GitShivamNauriyal/Smart-Inventory-Management-System"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:underline text-sm"
                    >
                        <i className="pi pi-github" />
                        Github
                    </a>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                © 2025 Inventory Management System | DAA Project
            </div>
        </div>
    );
};

export default Footer;
