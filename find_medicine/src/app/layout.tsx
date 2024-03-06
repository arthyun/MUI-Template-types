import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ConfirmAccess from './common/ConfirmAccess';
import Script from 'next/script';
import './globals.css';
// import Header from "./common/Header";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pharmacy',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="wrap">
          {/* 세션스토리지를 확인하여 값이 없으면 '/'으로 강제 리다이렉트 */}
          {/* <ConfirmAccess /> */}
          {/* 헤더 숨김 */}
          {/* <Header /> */}
          <main className="w-full box-border">{children}</main>
        </div>
        <Script strategy="beforeInteractive" src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`} />
      </body>
    </html>
  );
}
