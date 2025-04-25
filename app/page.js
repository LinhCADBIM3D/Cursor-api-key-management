"use client";

import { signIn } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Name */}
            <div className="flex items-center">
              <Image 
                src="/github-mark.svg"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">Linh Github Analyzer</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</Link>
              <Link href="/dashboards" className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                Dashboard
              </Link>
            </div>

            {/* Sign in Button */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboards" })}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Content */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                Unlock the Power of GitHub Repositories
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Get valuable insights, summaries, stats, and important updates on any open source GitHub repository with Khanh Github Analyzer.
              </p>
              <div className="mt-8 sm:mt-12">
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
                    Get Started for Free
                  </button>
                  <button className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 md:py-4 md:text-lg md:px-10">
                    See How It Works
                  </button>
                </div>
                <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16a1 1 0 11-2 0V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 013 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L7 4.323V3a1 1 0 011-1h2z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2">Track Stars</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2">Monitor PRs</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2">Version Updates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Demo Section */}
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <div className="h-12 bg-gray-100 flex items-center px-4 border-b border-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="ml-4 text-sm text-gray-600">github.com/vercel/next.js</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">Repository Summary</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Next.js is a React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR, SSG, and more.
                    </p>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">98.5k</div>
                        <div className="text-sm text-gray-500">Stars</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">542</div>
                        <div className="text-sm text-gray-500">Open PRs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">v14.0.3</div>
                        <div className="text-sm text-gray-500">Latest</div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900">Latest Important PR</h4>
                      <div className="mt-2 text-sm text-gray-500">#49876: Add support for Server Actions in App Router</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 