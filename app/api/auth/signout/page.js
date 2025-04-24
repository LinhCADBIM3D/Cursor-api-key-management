"use client";

import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: true
      });
    } catch (error) {
      console.error('Error signing out:', error);
      // Fallback redirect if signOut fails
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-blue-950">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className={`text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-200">
            Sign Out
          </h1>
          <p className="text-lg text-blue-200 mb-8 max-w-md mx-auto">
            Are you sure you want to sign out from your account?
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => router.push('/dashboards')}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-gray-500/30 transition-all duration-300 hover:scale-105"
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 w-full h-full bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon */}
              <svg 
                className="w-5 h-5 relative" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              
              <span className="relative font-medium">Cancel</span>
            </button>

            <button
              onClick={handleSignOut}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-105"
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon */}
              <svg 
                className="w-5 h-5 relative" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              
              <span className="relative font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Animated circles in bottom */}
        <div className="absolute bottom-10 flex space-x-3 animate-bounce">
          <div className="w-3 h-3 rounded-full bg-blue-400 opacity-75"></div>
          <div className="w-3 h-3 rounded-full bg-blue-400 opacity-75 animate-bounce animation-delay-200"></div>
          <div className="w-3 h-3 rounded-full bg-blue-400 opacity-75 animate-bounce animation-delay-500"></div>
        </div>
      </div>
    </div>
  );
} 