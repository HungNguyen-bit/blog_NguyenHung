const fs = require('fs');
const path = 'd:/nuxt.js/blog cua hung/blog/app/blog/java/page.tsx';
const content = `"use client";

import React, { useMemo, useState, useEffect } from "react";
import postsData from "../../../data/posts.json";

export default function JavaBlogStyled() {
  const [openPostId, setOpenPostId] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenPostId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openPost = (id: number) => {
    setScrollY(window.scrollY || 0);
    setOpenPostId(id);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setOpenPostId(null);
    document.body.style.overflow = '';
    window.scrollTo({ top: scrollY });
  };

  const posts = useMemo(() => (postsData as any[])
    .filter(p => {
      const tags = (p.tags || []).map((t: string) => t.toLowerCase());
      return tags.includes('java') || tags.includes('javascript');
    })
    .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  , []);
  const formatDate = (d?: string) => {
    try { return d ? new Date(d).toLocaleDateString('en-GB') : ''; } catch { return '' }
  };
  const categoryColors: Record<string, string> = {
    "JAVA CORE": "border-blue-400",
    "FRAMEWORK": "border-blue-400",
    "DEVOPS": "border-blue-400",
    "SECURITY": "border-blue-400",
    "JVM": "border-blue-400",
    "DEFAULT": "border-gray-700"
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0c17', fontFamily: 'Inter, system-ui, -apple-system, \"Segoe UI\", Roboto' }}>
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
            const stripHtml = (html: string) => html ? html.replace(/<[^>]*>/g, '').replace(/\\s+/g,' ').trim() : '';
            const excerptSource = post.excerpt || stripHtml(post.content || '') || post.summary || '';
            const excerpt = excerptSource.length > 220 ? excerptSource.slice(0, 220).trim() + '…' : excerptSource;
            return (
              <div key={post.id} className={`relative rounded-2xl bg-[#181c2b] p-6 border-2 ${borderClass} shadow-lg flex flex-col justify-between`} style={{ minHeight: 240 }}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded bg-[#23263a] text-blue-300 tracking-wide`} style={{ letterSpacing: 1 }}>{post.category || "JAVA"}</span>
                  <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                </div>
                <h2 className="mt-2 text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{post.title}</h2>
                <p className="mt-2 text-gray-300 text-base italic">{post.summary}</p>
                <p className="mt-3 text-gray-200 text-sm leading-relaxed">{excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    {(post.tags || []).map((t:string) => <span key={t} className="text-xs text-blue-200 bg-blue-900/30 px-2 py-1 rounded">#{t}</span>)}
                  </div>
                  <a href={`/blog/${post.id}`} onClick={(e) => { e.preventDefault(); openPost(post.id); }} className="font-semibold text-blue-400 flex items-center gap-1 hover:underline">
                    KHÁM PHÁ <span aria-hidden>→</span>
                  </a>
                </div>
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl border-2 border-blue-500 opacity-30" style={{ zIndex: 0 }} />
              </div>
            );
          })}
        </section>
      </main>

      {openPostId !== null && (() => {
        const p = posts.find(x => x.id === openPostId);
        if (!p) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-start justify-center px-4 py-12">
            <div className="fixed inset-0 bg-black/60" onClick={closePost} />
            <div className="relative z-60 max-w-3xl w-full bg-[#0f1724] rounded-2xl shadow-2xl overflow-auto" style={{ maxHeight: '80vh' }}>
              <div className="p-6 border-b border-white/5 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{p.title}</h2>
                  <p className="text-sm text-gray-300">{p.summary}</p>
                </div>
                <button onClick={closePost} aria-label="Close" className="text-gray-300 hover:text-white ml-4">✕</button>
              </div>
              <div className="p-6 prose prose-invert text-gray-100" dangerouslySetInnerHTML={{ __html: p.content || '<p>Không có nội dung.</p>' }} />
            </div>
          </div>
        );
      })()}
    </div>
  );
}
`;
fs.writeFileSync(path, content, 'utf8');
console.log('WROTE', path);
