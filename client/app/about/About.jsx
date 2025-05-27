"use client";

import React from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { AnimatedTooltip } from "./team-tooltip";

const people = [
    {
        id: 1,
        name: "Shivam Nauriyal",
        designation: "Frontend UI & UX",
        image: "/avatar1.png",
    },
    {
        id: 2,
        name: "Krish Gupta",
        designation: "Backend & Optimization",
        image: "/avatar2.png",
    },
    {
        id: 3,
        name: "Vijay Singh Khati",
        designation: "Report & Documentation",
        image: "/avatar3.png",
    },
    {
        id: 4,
        name: "Kanika Rawat",
        designation: "Logic & Integration",
        image: "/avatar4.png",
    },
];

const About = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-200 px-6 py-16 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-blue-400 mb-1">
                    About the Project
                </h1>
                <div className="border-t border-gray-600 mb-6 w-full" />

                {/* Project Overview */}
                <p className="text-lg mb-6">
                    This project is a practical implementation of the classic
                    Dynamic Programming Knapsack problem, tailored for modern
                    inventory optimization needs. Built using React, Next.js,
                    and a Python Flask backend, it empowers users to make
                    data-driven decisions on what items to include in
                    limited-capacity containers to maximize profit.
                </p>

                {/* Inventory Management */}
                <h2 className="text-2xl font-semibold text-blue-300 mt-10 mb-1">
                    Inventory Management
                </h2>
                <div className="border-t border-gray-600 mb-4 w-full" />
                <p className="mb-6">
                    Inventory management involves tracking, organizing, and
                    controlling stock to ensure optimal use of resources. Our
                    system allows users to input item characteristics like
                    weight, volume, price, fragility, and priority. With
                    fractional division support, users can decide whether an
                    item can be split or must be included as a whole.
                </p>

                {/* Knapsack Problem */}
                <h2 className="text-2xl font-semibold text-blue-300 mb-1">
                    Dynamic Programming & Knapsack
                </h2>
                <div className="border-t border-gray-600 mb-4 w-full" />
                <p className="mb-6">
                    The 0/1 Knapsack problem is a foundational problem in
                    dynamic programming. It determines the most valuable subset
                    of items to include in a container without exceeding
                    weight/volume limits. This project implements both 0/1 and
                    fractional variations, handling multiple constraints and
                    prioritizing items based on custom criteria like fragility
                    and priority level.
                </p>

                {/* Team Section with Tooltips */}
                <h2 className="text-2xl font-semibold text-blue-300 mt-10 mb-1">
                    Our Team
                </h2>
                <div className="border-t border-gray-600 mb-4 w-full" />
                <div className="flex justify-center mt-8">
                    <AnimatedTooltip items={people} />
                </div>

                {/* GitHub Button */}
                <div className="flex justify-center mt-12">
                    <a
                        href="https://github.com/GitShivamNauriyal/Smart-Inventory-Management-System"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            icon="pi pi-github"
                            label="View on GitHub"
                            className="p-button-rounded p-button-secondary text-lg"
                        />
                    </a>
                </div>

                {/* Download Project Report */}
                <h2 className="text-2xl font-semibold text-blue-300 mt-14 mb-1">
                    Project Report
                </h2>
                <div className="border-t border-gray-600 mb-4 w-full" />
                <p className="mb-4">
                    Download the detailed project report containing the problem
                    statement, algorithm explanation, results, and conclusion.
                </p>
                <div className="flex justify-center">
                    <a
                        href="/project-report.pdf"
                        download
                        className="inline-flex items-center gap-2 text-blue-400 hover:underline text-lg"
                    >
                        <i className="pi pi-file-pdf" />
                        Download Report
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
