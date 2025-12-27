/* eslint-disable @typescript-eslint/no-explicit-any */
import postsData from '../../../data/posts.json';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = postsData as any[];
  return posts.map((p) => ({ id: String(p.id) }));
}

export default function PostDetail({ params }: { params: { id: string } }) {
  const posts = postsData as any[];
  const id = params.id;
  const post = posts.find((p) => String(p.id) === String(id));

  if (!post) {
    return (
      <div className="min-h-screen p-8" style={{ background: '#050505' }}>
        <h1 className="text-2xl font-bold text-blue-400">Bài viết không tìm thấy</h1>
        <p className="text-gray-300">Không có bài viết với id {id}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#050505', fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto' }}>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <article className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <header className="lg:col-span-2">
            <div className="relative rounded-2xl p-6" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', WebkitBackdropFilter: 'blur(8px)' }}>
              <div className="absolute -inset-px rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(90deg,#6d28d9,#ec4899,#f59e0b)', maskImage: 'linear-gradient(#000, transparent)', opacity: 0.08 }} />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1 rounded bg-gradient-to-r from-indigo-500 to-pink-500 text-white">HÀNH TRÌNH HỌC</span>
                  <time className="text-xs text-gray-400">{post.date ? new Date(post.date).toLocaleDateString() : ''}</time>
                </div>

                <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{post.title}</h1>
                <p className="mt-3 text-gray-300 text-lg">{post.summary}</p>

                <div className="mt-4 flex items-center gap-3">
                  {(post.tags || []).map((t: string) => (
                    <span key={t} className="text-xs text-blue-100 bg-blue-900/30 px-2 py-1 rounded">#{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/4 backdrop-blur-sm rounded-xl p-6 prose prose-invert text-gray-100" dangerouslySetInnerHTML={{ __html: post.content || '<p>Không có nội dung.</p>' }} />
          </header>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl p-4 bg-white/3 backdrop-blur-sm border border-white/5">
              <h3 className="text-sm font-semibold text-gray-200">Bài viết trong series</h3>
              <ol className="mt-3 space-y-2 text-gray-300">
                {posts.filter((p) => (p.tags || []).some((tg: string) => (post.tags || []).includes(tg))).slice(0, 9).map((p: any, i: number) => (
                  <li key={p.id} className={`p-2 rounded ${String(p.id) === String(post.id) ? 'bg-gradient-to-r from-indigo-600 to-pink-500 text-white' : 'hover:bg-white/5'}`}>
                    <Link href={`/blog/${p.id}`} className="text-sm">{i + 1}. {p.title}</Link>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </article>
      </main>
    </div>
  );
}
