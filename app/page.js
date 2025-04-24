"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-200">
            API Key Management
          </h1>
          <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Secure, simple, and powerful way to manage your API keys. Get started with just one click.
          </p>
          
          <button
            onClick={() => signIn("google")}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            {/* Button background animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Google icon */}
            <svg className="w-6 h-6 mr-3 relative" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#fff"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#fff"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#fff"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#fff"
              />
            </svg>
            <span className="relative">Sign in with Google</span>
          </button>
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