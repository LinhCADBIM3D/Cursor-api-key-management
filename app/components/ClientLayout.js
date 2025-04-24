"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from 'next/navigation';
import Sidebar from "./Sidebar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <SessionProvider>
      <div className="flex">
        {!isHomePage && <Sidebar />}
        <div className={`flex-1 ${!isHomePage ? 'ml-64' : ''}`}>
          {children}
        </div>
      </div>
    </SessionProvider>
  );
} 