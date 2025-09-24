import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function Footer() {
  return (
    <footer className="background-header text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo-doc.png" alt="logo-doc" width={240} height={240} />
            </Link>
          </div>
          <div className="lg:px-16 mb-4">
            <p className="mb-4 text-xl uppercase font-bold bg-text-yellow">Về 5E REAL</p>
            <ul>
              <li className="py-2">
                <Link href="/ve-chung-toi">Giới thiệu</Link>
              </li>
              {/* <li className="py-2">
                <Link href="/du-an">Dự án</Link>
              </li> */}
              {/* <li className="py-2">
                <Link href="/truyen-thong">Truyền thông</Link>
              </li> */}
              <li className="py-2">
                <Link href="/tuyen-dung">Tuyển dụng</Link>
              </li>
            </ul>
          </div>
          <div className="lg:px-16">
            <p className="mb-4 text-xl uppercase font-bold bg-text-yellow">LIÊN HỆ</p>
            <p className="mb-4 uppercase font-bold text-xl">CÔNG TY CỔ PHẦN TƯ VẤN VÀ PHÁT TRIỂN KINH DOANH BẤT ĐỘNG SẢN 5E</p>
            <ul>
              <li className="py-2">
                <Image src="/location.png" alt="location" width={20} height={20} className="inline-block mr-2" />
                <span>Tầng 8, Tòa 221B Trần Đăng Ninh, Cầu Giấy, Hà Nội</span>
              </li>
              <li className="py-2">
                <Image src="/phone.png" alt="phone" width={20} height={20} className="inline-block mr-2" />
                <span>024 666 99999</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer