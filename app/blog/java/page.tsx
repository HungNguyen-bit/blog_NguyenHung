"use client";


import React, { useMemo } from "react";
import Link from "next/link";
import postsData from "../../../data/posts.json";

export default function JavaBlogStyled() {
  const posts = useMemo(() => (postsData as any[])
    .filter(p => {
      const tags = (p.tags || []).map((t: string) => t.toLowerCase());
      return tags.includes('java') || tags.includes('javascript');
    })
    .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  , []);
  const categoryColors: Record<string, string> = {
    "JAVA CORE": "border-blue-400",
    "FRAMEWORK": "border-blue-400",
    "DEVOPS": "border-blue-400",
    "SECURITY": "border-blue-400",
    "JVM": "border-blue-400",
    "DEFAULT": "border-gray-700"
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0c17', fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto' }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-10 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Xin chào, mình là
              <br />
              <span className="text-blue-400">Nguyễn Hưng.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300">Kẻ mộng mơ học cách thực thi ý tưởng bằng lập trình. 🚀</p>
          </div>
          {/* avatar box removed as requested */}
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => {
            const borderClass = categoryColors[post.category || "DEFAULT"] || categoryColors.DEFAULT;
            const stripHtml = (html: string) => html ? html.replace(/<[^>]*>/g, '').replace(/\s+/g,' ').trim() : '';
            const excerptSource = post.excerpt || stripHtml(post.content || '') || post.summary || '';
            const excerpt = excerptSource.length > 220 ? excerptSource.slice(0, 220).trim() + '…' : excerptSource;
            return (
              <div key={post.id} className={`relative rounded-2xl bg-[#181c2b] p-6 border-2 ${borderClass} shadow-lg flex flex-col justify-between`} style={{ minHeight: 240 }}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded bg-[#23263a] text-blue-300 tracking-wide`} style={{ letterSpacing: 1 }}>{post.category || "JAVA"}</span>
                  <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <h2 className="mt-2 text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{post.title}</h2>
                <p className="mt-2 text-gray-300 text-base italic">{post.summary}</p>
                <p className="mt-3 text-gray-200 text-sm leading-relaxed">{excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    {(post.tags || []).map((t:string) => <span key={t} className="text-xs text-blue-200 bg-blue-900/30 px-2 py-1 rounded">#{t}</span>)}
                  </div>
                  <Link href={`/blog/${post.id}`} className="font-semibold text-blue-400 flex items-center gap-1 hover:underline">
                    KHÁM PHÁ <span aria-hidden>→</span>
                  </Link>
                </div>
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl border-2 border-blue-500 opacity-30" style={{ zIndex: 0 }} />
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
