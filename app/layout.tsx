import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/token";
import prisma from "@/lib/prisma";
import { ToastContainer } from 'react-toastify';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "5EREAL",
  description: "Công ty bất động sản 5EREAL",
};

async function getServerUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  if (!token) return null;

  const userData = await verifyToken(token);
  if (!userData) return null;

  const user = await prisma.user.findUnique({
    where: { id: Number(userData.userId) },
    select: { id: true, fullName: true, phoneNumber: true, role: true, createdAt: true },
  });

  return user;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const me = await getServerUser()
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
        <Header me={me} />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
