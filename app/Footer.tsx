
"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-6">

                {/* Main Footer Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-semibold tracking-tight font-serif"
                    >
                        File<span className="text-red-500">Arc</span>
                    </Link>

                    {/* Center Links */}
                    <div className="flex items-center gap-8 text-sm font-medium text-gray-600">

                        <Link
                            href="https://github.com/thex1abhi"
                            target="_blank"
                            className="flex items-center gap-2 hover:text-black transition-colors duration-200"
                        >
                            <Github size={18} />
                            GitHub
                        </Link>

                        <Link
                            href="https://www.linkedin.com/in/abhishek-yadav-888648329/"
                            target="_blank"
                            className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200"
                        >
                            <Linkedin size={18} />
                            LinkedIn
                        </Link>

                    </div>

                    {/* Email */}
                    <Link
                        href="mailto:contact@filearc.com"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors duration-200"
                    >
                        <Mail size={18} />
                        yabhishekk480@gmail.com
                    </Link>

                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

                {/* Bottom Row */}
                <div className="flex items-center justify-center text-xs text-gray-500 gap-3">

                    <p>
                        © {new Date().getFullYear()} FileArc. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
}

