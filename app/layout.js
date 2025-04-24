import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cursor API Key Management",
  description: "Manage your Cursor API keys",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 min-h-screen bg-gray-50">
              {children}
            </main>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
} 