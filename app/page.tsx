"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
};

export default function Home() {
  const [showCvModal, setShowCvModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const introVariants = [
    {
      key: 'professional',
      headline: 'Xin chào, mình là Nguyễn Hưng.',
      tagline: 'Biến ý tưởng thành sản phẩm thông qua dòng Code.',
      short: 'Mình là một lập trình viên đam mê xây dựng những giải pháp công nghệ hiệu quả và tối ưu. Không chỉ là viết code, mình tập trung vào việc tạo ra giá trị thực tế cho người dùng.',
      detail: 'Với nền tảng vững chắc về Java, JavaScript và Python, mình không ngừng khám phá những công nghệ mới để giải quyết các bài toán phức tạp. Blog này là nơi mình ghi lại hành trình phát triển, những bài học kinh nghiệm và chia sẻ kiến thức cùng cộng đồng công nghệ.'
    },
    {
      key: 'creative',
      headline: 'Nguyễn Hưng – Nơi những dòng Code kể chuyện.',
      tagline: 'Kẻ mộng mơ học cách thực thi ý tưởng bằng lập trình. 🚀',
      short: 'Chào mừng bạn đến với góc nhỏ của mình! Tại đây, mình chia sẻ mọi thứ từ những dòng code Java đầu tiên cho đến các dự án Web/App hiện đại. Mình tin rằng kiến thức chỉ có giá trị nhất khi được sẻ chia.',
      detail: 'Hãy cùng mình khám phá thế giới công nghệ đầy thú vị này nhé!'
    },
    {
      key: 'minimal',
      headline: "Hi, I'm Hưng. I build things with code.",
      tagline: 'Full-stack Developer | Tech Blogger | Problem Solver',
      short: 'Tập trung vào hiệu suất, tính thẩm mỹ và trải nghiệm người dùng. Chuyên tâm với Java, Ecosystem của JavaScript và Automation với Python.',
      detail: 'Cùng kết nối và tạo nên những điều tuyệt vời!'
    }
  ];

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects);
    fetch("/api/profile")
      .then((res) => res.json())
      .then(setProfile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1e293b] to-[#0f172a] text-white font-sans">
      {/* Header + Avatar + Intro */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 pt-16 pb-8 max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col justify-center gap-6">
          {/* Using Creative variant content but Professional headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {/* professional headline with highlighted name */}
            {introVariants[0].headline.includes('Nguyễn Hưng') || introVariants[0].headline.includes('Xin chào') ? (
              <>
                {introVariants[0].headline.split('Nguyễn Hưng').map((t, i, arr) =>
                  i < arr.length - 1 ? (
                    <React.Fragment key={i}>
                      <span>{t}</span>
                      <span className="text-blue-400">Nguyễn Hưng</span>
                    </React.Fragment>
                  ) : (
                    <span key={i}>{t}</span>
                  )
                )}
              </>
            ) : (
              introVariants[0].headline
            )}
          </h1>

          <h2 className="text-2xl font-semibold text-blue-300 mb-4">{introVariants[1].tagline}</h2>

          <p className="text-lg text-gray-300 max-w-xl mb-4">{introVariants[1].short} {introVariants[1].detail ? introVariants[1].detail : ''}</p>
          <div className="flex gap-4 mt-4">
            <Link href="/skills">
              <button className="btn-main"><span className="btn-icon">🛠️</span>Kỹ năng & Công nghệ</button>
            </Link>
            <Link href="/profile">
              <button className="btn-outline"><span className="btn-icon">👤</span>Giới thiệu</button>
            </Link>
            <a href="#contact">
              <button className="btn-outline"><span className="btn-icon">✉️</span>Liên hệ</button>
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center mt-10 md:mt-0">
          <div className="rounded-2xl overflow-hidden border-4 border-blue-900 shadow-lg bg-[#112240] p-4">
            <img
              src={profile?.avatar || "/avatar-hung.png"}
              alt="Nguyễn Hưng"
              className="w-64 h-80 object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* Skills Section (mirrors /skills page) */}
      <section className="max-w-6xl mx-auto px-8 py-12" id="skills">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-blue-400">Kỹ năng & Công nghệ</h2>
          <p className="text-gray-300">Danh sách kỹ năng, công nghệ và mức độ thành thạo.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0b1220] p-6 rounded-xl border border-blue-900/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg bg-gradient-to-br from-yellow-500 to-yellow-400">Jv</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Java</h3>
                  <span className="text-sm text-gray-400">80%</span>
                </div>
                <div className="mt-3 bg-[#07101a] rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full bg-blue-400" style={{ width: '80%' }} />
                </div>
                <ul className="mt-3 text-sm text-gray-300 list-disc list-inside">
                  <li>OOP cơ bản</li>
                  <li>Collections & Streams</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#0b1220] p-6 rounded-xl border border-blue-900/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg bg-gradient-to-br from-yellow-300 to-yellow-200">JS</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">JavaScript</h3>
                  <span className="text-sm text-gray-400">85%</span>
                </div>
                <div className="mt-3 bg-[#07101a] rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full bg-white" style={{ width: '85%' }} />
                </div>
                <ul className="mt-3 text-sm text-gray-300 list-disc list-inside">
                  <li>ES6+, Async/Await</li>
                  <li>DOM & Browser APIs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#0b1220] p-6 rounded-xl border border-blue-900/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg bg-gradient-to-br from-sky-500 to-indigo-500">TS</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">TypeScript</h3>
                  <span className="text-sm text-gray-400">80%</span>
                </div>
                <div className="mt-3 bg-[#07101a] rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full bg-blue-400" style={{ width: '80%' }} />
                </div>
                <ul className="mt-3 text-sm text-gray-300 list-disc list-inside">
                  <li>Types & Generics</li>
                  <li>TS in React</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#0b1220] p-6 rounded-xl border border-blue-900/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg bg-gradient-to-br from-purple-600 to-purple-500">Nx</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Next.js</h3>
                  <span className="text-sm text-gray-400">85%</span>
                </div>
                <div className="mt-3 bg-[#07101a] rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full bg-white" style={{ width: '85%' }} />
                </div>
                <ul className="mt-3 text-sm text-gray-300 list-disc list-inside">
                  <li>App Router, SSR/SSG</li>
                  <li>API Routes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-12" id="projects">
        <h2 className="text-3xl font-bold text-blue-400 mb-8">Dự án của tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-[#1e293b] rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 border border-blue-900/40">
              <img src={project.image} alt={project.name} className="w-32 h-32 object-cover rounded-lg border-2 border-blue-800" />
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-2"><Link href={`/projects/${project.id}`}>{project.name}</Link></h3>
                <p className="text-gray-300 mb-2">{project.description}</p>
                { /* Removed external link and separate "Xem chi tiết" as requested. Title already links to details. */ }
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CV Section - placed under Projects and above Contact (minimal per user request) */}
      <section className="max-w-6xl mx-auto px-8 py-12" id="cv">
        <h2 className="text-3xl font-bold text-green-400 mb-6">CV / Hồ sơ</h2>
        <div className="bg-[#0f1724] rounded-xl shadow-lg p-6 border border-green-900/30 flex items-center gap-6">
          <div className="flex-shrink-0">
            <button onClick={() => setShowCvModal(true)} className="rounded-lg overflow-hidden border-2 border-green-800 hover:scale-105 transition-transform">
              <img
                src="/cv.jpg"
                alt="CV Nguyễn Hưng"
                className="max-w-full w-[320px] max-h-[420px] object-cover"
                onError={(e: any) => { e.currentTarget.onerror = null; e.currentTarget.src = '/cv-placeholder.svg'; }}
              />
            </button>
            <p className="text-sm text-gray-400 mt-2 text-center">Nhấn ảnh để phóng to. (Hiển thị tối đa 320×420)</p>
          </div>
          <div className="flex-1">
            {/* Intentionally minimal: user will add CV image to /public/cv.jpg */}
          </div>
        </div>
      </section>

      {/* CV Modal */}
      {showCvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowCvModal(false)}>
          <div className="max-w-[90vw] max-h-[90vh] p-4">
            <img
              src="/cv.jpg"
              alt="CV Nguyễn Hưng"
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded shadow-lg border-4 border-white/10"
              onError={(e: any) => { e.currentTarget.onerror = null; e.currentTarget.src = '/cv-placeholder.svg'; }}
            />
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-8 py-12" id="contact">
        <h2 className="text-3xl font-bold text-pink-400 mb-6">Liên hệ</h2>
        <div className="bg-[#1e293b] rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 border border-pink-900/40">
          <div className="flex-1">
            <p className="text-lg text-gray-300 mb-4">Bạn muốn hợp tác hoặc trao đổi? Hãy liên hệ với mình:</p>
            <div className="mb-2">
              <span className="text-gray-400">Điện thoại: </span>
              <a href={`tel:${profile?.contact?.phone}`} className="text-pink-400 text-xl font-semibold hover:underline">{profile?.contact?.phone || '0782717662'}</a>
            </div>
            <div>
              <span className="text-gray-400">Email: </span>
              <a href={`mailto:${profile?.contact?.email}`} className="text-pink-400 text-xl font-semibold hover:underline">{profile?.contact?.email || 'nguyenhung20042019@gmail.com'}</a>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex gap-4">
              <a href={profile?.contact?.github || 'https://github.com/'} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <img src="/github.svg" alt="GitHub" className="w-10 h-10" />
              </a>
              <a href={profile?.contact?.facebook || 'https://facebook.com/'} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <img src="/facebook.svg" alt="Facebook" className="w-10 h-10" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
