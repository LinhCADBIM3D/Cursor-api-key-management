"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from 'next/navigation';
import Sidebar from "./Sidebar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const shouldHideSidebar = pathname === '/' || 
                           pathname === '/login' || 
                           pathname === '/api/auth/signout';

  return (
    <SessionProvider>
      <div className="flex">
        {!shouldHideSidebar && <Sidebar />}
        <div className={`flex-1 ${!shouldHideSidebar ? 'ml-64' : ''}`}>
          {children}
        </div>
      </div>
    </SessionProvider>
  );
} 