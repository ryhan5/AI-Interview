"use client"
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import Logo from './Logo'

function Header() {
    const path = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/how-it-works", label: "How it Works" },
        { href: "/contact", label: "Contact Us" },
        { href: "/upgrade", label: "Upgrade" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 ">
                        <Logo />
                    </div>
                    
                    <div className="hidden md:block">
                        <ul className="flex space-x-4">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}>
                                        <span className={`px-3 py-2 rounded-md text-sm font-medium ${path === item.href ? 'text-primary font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-primary'} transition-all duration-200`}>
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="hidden md:block">
                        <UserButton />
                    </div>
                    
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMenu} 
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                            <svg 
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg 
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <span 
                                className={`block px-3 py-2 rounded-md text-base font-medium ${path === item.href ? 'text-primary font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-primary'} transition-all duration-200`}
                                onClick={() => setIsMenuOpen(false)}  // Close menu when an item is clicked
                            >
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center px-5">
                        <UserButton />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header