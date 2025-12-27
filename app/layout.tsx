import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog Nguyễn Hưng",
  description: "Portfolio & Blog cá nhân của Nguyễn Hưng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col font-sans">
        <header className="w-full bg-[rgba(12,12,12,0.75)] backdrop-blur-sm shadow-sm px-4 md:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-2xl text-white drop-shadow-lg tracking-wider" style={{letterSpacing:'2px'}}>Blog Nguyễn Hưng</span>
          </div>
          <nav className="flex gap-2 text-base font-semibold">
            <Link href="/" className="nav-btn">Trang chủ</Link>
            <Link href="/skills" className="nav-btn">Kỹ năng</Link>
            <Link href="/certifications" className="nav-btn">Chứng chỉ</Link>
            <Link href="/profile" className="nav-btn">Giới thiệu</Link>
            <Link href="/blog/java" className="nav-btn">Blog Java</Link>
            <Link href="/admin" className="ml-2">
              <span className="btn-main" style={{padding:'0.5rem 1.5rem',fontSize:'1rem'}}>Admin</span>
            </Link>
          </nav>
        </header>
        <main className="flex-1 w-full mx-auto max-w-7xl px-2 md:px-8 py-6">{children}</main>
        <footer className="w-full bg-[rgba(12,12,12,0.75)] text-center text-sm text-white py-4 mt-8 border-t border-[rgba(138,43,226,0.08)]">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4">
            <div className="mb-2 md:mb-0 font-semibold drop-shadow">© 2025 Blog Nguyễn Hưng. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="mailto:nguyenhung@example.com" className="hover:text-[#2d0a1a] font-bold">Email</a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#2d0a1a] font-bold">GitHub</a>
            </div>
          </div>
        </footer>
      </body>
    </html>

  );
}
