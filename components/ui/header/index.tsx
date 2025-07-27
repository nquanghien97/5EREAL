'use client';

import CloseIcon from '@/assets/icons/CloseIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import { ListHeader } from '@/constants/ListHeader';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Auth from '../auth';
import { useAuthStore } from '@/zustand/user';
import { LogoutUser } from '@/services/auth';
import { UserEntity } from '@/entities/user';

interface HeaderProps {
  me: UserEntity | null;
}

function Header({ me }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const pathname = usePathname();

  const { user, setUser } = useAuthStore();
  const currentUser = user === undefined ? me : user;

  // Gán user từ server (SSR) vào Zustand lần đầu
  useEffect(() => {
    if (me) setUser(me);
  }, [me, setUser]);

  const onLogout = async () => {
    await LogoutUser();
    setUser(null); // Cập nhật Zustand -> UI đổi ngay
  };

  return (
    <>
      <header className="background-header text-white fixed top-0 left-0 right-0 z-[999]">
        <div className="px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 m-auto">
              <Image src="/logo@3x.png" alt="logo@3x" width={140} height={140} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex justify-center items-center space-x-8 flex-1 h-full">
              {ListHeader.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`hover:text-[#d29015] transition-colors duration-200 font-medium text-sm tracking-wide uppercase ${
                    pathname === item.href ? 'text-[#d29015]' : 'text-white'
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Auth */}
            {currentUser ? (
              <div className="max-lg:hidden flex gap-4">
                <p>Xin chào {currentUser.fullName}</p>
                <div>
                  <button
                    className="hover:text-[#d29015] transition-colors duration-200 font-medium text-sm tracking-wide uppercase text-white cursor-pointer"
                    onClick={onLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-lg:hidden">
                <button
                  className="hover:text-[#d29015] transition-colors duration-200 font-medium text-sm tracking-wide uppercase text-white cursor-pointer"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Đăng nhập
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="border-t border-slate-700">
              <div
                className={`flex flex-col space-y-1 py-4 transform transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? 'translate-y-0' : '-translate-y-4'
                }`}
              >
                {ListHeader.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`text-white hover:text-yellow-500 hover:bg-slate-700 font-medium text-sm tracking-wide py-3 px-4 rounded-md transform transition-all duration-200 ${
                      isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                {!currentUser && (
                  <div className="lg:hidden flex justify-center">
                    <button
                      className="hover:text-[#d29015] transition-colors duration-200 font-medium text-sm tracking-wide uppercase bg-white px-8 py-2 rounded-lg text-[#0F3E5A] cursor-pointer"
                      onClick={() => {
                        setIsLoginOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      Đăng nhập
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div className="h-16"></div> {/* Spacer for fixed header */}
      <Auth open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Header;
