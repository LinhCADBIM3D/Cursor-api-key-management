'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  HomeIcon, 
  KeyIcon, 
  CreditCardIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'API Keys', href: '/api-keys', icon: KeyIcon },
  { name: 'Billing', href: '/billing', icon: CreditCardIcon },
  { name: 'Account', href: '/account', icon: UserCircleIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} min-h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50 transition-colors z-50"
        title={isCollapsed ? "Mở rộng" : "Thu gọn"}
      >
        <ChevronLeftIcon
          className={`w-4 h-4 text-gray-600 transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
        />
      </button>

      <div className={`flex items-center h-16 ${isCollapsed ? 'px-4' : 'px-6'} border-b border-gray-200`}>
        <span className="text-xl font-bold truncate">
          {isCollapsed ? 'C' : 'Cursor API Key'}
        </span>
      </div>

      <nav className={`${isCollapsed ? 'px-2' : 'px-4'} py-4`}>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-4 py-2 text-sm rounded-lg ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={isCollapsed ? item.name : ''}
                >
                  <item.icon className={`w-5 h-5 ${!isCollapsed && 'mr-3'}`} />
                  {!isCollapsed && item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
} 