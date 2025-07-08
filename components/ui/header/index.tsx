'use client'

import CloseIcon from '@/assets/icons/CloseIcon'
import MenuIcon from '@/assets/icons/MenuIcon'
import { ListHeader } from '@/constants/ListHeader'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="background-header text-white">
      <div className="px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo@3x.png" alt="logo@3x" width={140} height={140} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex justify-center items-center space-x-8 flex-1 h-full">
            {ListHeader.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white hover:text-yellow-500 transition-colors duration-200 font-medium text-sm tracking-wide uppercase"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="border-t border-slate-700">
            <div
              className={`flex flex-col space-y-1 py-4 transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-y-0" : "-translate-y-4"
              }`}
            >
              {ListHeader.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`text-white hover:text-yellow-500 hover:bg-slate-700 font-medium text-sm tracking-wide py-3 px-4 rounded-md transform transition-all duration-200 ${
                    isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header