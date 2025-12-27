import React from "react";

const skills = [
  { id: 1, name: "Java", abbrev: "Jv", level: "80%", color: "from-yellow-500 to-yellow-400", details: ["OOP cơ bản", "Collections", "Streams"] },
  { id: 2, name: "JavaScript", abbrev: "JS", level: "85%", color: "from-yellow-300 to-yellow-200", details: ["ES6+", "Async/Await", "DOM"] },
  { id: 3, name: "TypeScript", abbrev: "TS", level: "80%", color: "from-sky-500 to-indigo-500", details: ["Types", "Generics", "TS in React"] },
  { id: 4, name: "Next.js", abbrev: "Nx", level: "85%", color: "from-purple-600 to-purple-500", details: ["App Router", "SSR/SSG", "API Routes"] },
  { id: 5, name: "Docker", abbrev: "Dc", level: "65%", color: "from-sky-500 to-cyan-400", details: ["Containers", "Dockerfile", "Compose"] },
  { id: 6, name: "CI/CD", abbrev: "CI", level: "70%", color: "from-emerald-500 to-green-400", details: ["GitHub Actions", "Jenkins"] },
  { id: 7, name: "Linux", abbrev: "Ln", level: "75%", color: "from-gray-700 to-gray-500", details: ["Bash", "SSH", "Systemd"] },
  { id: 8, name: "Git", abbrev: "Gt", level: "90%", color: "from-rose-500 to-red-500", details: ["Branching", "Rebase", "Workflows"] },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071022] to-[#071428] text-white font-sans">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-blue-300">Kỹ năng & Công nghệ</h1>
          <p className="text-gray-300">Danh sách kỹ năng, công nghệ và mức độ thành thạo.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((s) => (
            <div key={s.id} className="bg-[#0b1220] p-6 rounded-xl border border-blue-900/30">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg bg-gradient-to-br ${s.color}`}>{s.abbrev}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{s.name}</h3>
                    <span className="text-sm text-gray-400">{s.level}</span>
                  </div>
                  <div className="mt-3 bg-[#07101a] rounded-full h-2 overflow-hidden">
                    <div className="h-2 rounded-full bg-blue-400" style={{ width: s.level }} />
                  </div>
                  <ul className="mt-3 text-sm text-gray-300 list-disc list-inside">
                    {s.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Công nghệ chính</h2>
          <div className="flex flex-wrap gap-3">
            {['Java', 'JavaScript', 'TypeScript', 'Next.js', 'Node.js', 'Docker', 'PostgreSQL', 'Git', 'CI/CD'].map((t) => (
              <span key={t} className="px-3 py-1 bg-[#0f1724] rounded-full border border-blue-900/30 text-sm">{t}</span>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
