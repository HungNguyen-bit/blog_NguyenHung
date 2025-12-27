"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

type Cert = {
  id: string | number;
  name: string;
  issuer?: string;
  date?: string;
  image?: string;
  fullImage?: string;
  link?: string;
};

export default function CertificationsPage() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/certifications").then(r => r.json()).then(setCerts);
  }, []);
  // derived stats
  const total = certs.length;
  const withCert = certs.filter(c => c.fullImage || c.image || c.link).length;
  const latestYear = (() => {
    const years = certs.map(c => {
      if (!c.date) return null;
      const m = String(c.date).match(/(20\d{2})/);
      return m ? Number(m[1]) : null;
    }).filter(Boolean) as number[];
    if (!years.length) return new Date().getFullYear();
    return Math.max(...years);
  })();

  return (
    <div className="pb-12">
      <header className="pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400">Chứng chỉ của tôi</h1>
        <p className="mt-3 text-gray-300 max-w-2xl mx-auto">Các chứng chỉ và khóa học tôi đã hoàn thành trong hành trình học tập và phát triển</p>
      </header>

      <section className="max-w-6xl mx-auto px-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#0f1720] p-6 rounded-lg border border-blue-900/30 flex flex-col items-center gap-3">
            <div className="text-3xl">🏆</div>
            <div className="text-3xl font-bold text-blue-300">{total}</div>
            <div className="text-gray-400">Chứng chỉ</div>
          </div>

          <div className="bg-[#0f1720] p-6 rounded-lg border border-blue-900/30 flex flex-col items-center gap-3">
            <div className="text-3xl">🔗</div>
            <div className="text-3xl font-bold text-blue-300">{withCert}</div>
            <div className="text-gray-400">Chứng chỉ có Certificate</div>
          </div>

          <div className="bg-[#0f1720] p-6 rounded-lg border border-blue-900/30 flex flex-col items-center gap-3">
            <div className="text-3xl">⭐</div>
            <div className="text-3xl font-bold text-blue-300">{latestYear}</div>
            <div className="text-gray-400">Năm gần nhất</div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((c: any) => (
            <div key={c.id} className="bg-[#1e293b] p-4 rounded-lg border border-blue-900/40">
              {c.image && (
                <div className="w-full flex justify-center items-center mb-3">
                  <img 
                    src={c.image} 
                    alt={c.name} 
                    className="rounded-lg border border-blue-900/40 shadow-lg bg-[#111827]"
                    style={{ maxWidth: '320px', maxHeight: '180px', width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '16/9' }}
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-blue-300 mb-2">{c.name}</h2>
              <p className="text-gray-300 mb-2">{c.issuer}</p>
              <p className="text-gray-400 text-sm mb-3">{c.date}</p>
              <div className="flex items-center gap-4">
                {(c.fullImage || c.image) && (
                  <button
                    onClick={() => {
                      if (c.fullImage) {
                        window.open(c.fullImage, '_blank', 'noopener');
                        return;
                      }
                      setPreviewSrc(c.image);
                      setPreviewTitle(c.name);
                    }}
                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Xem ảnh
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Inline image preview modal */}
      {previewSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setPreviewSrc(null)}>
          <div className="max-w-full max-h-full">
            <img src={previewSrc} alt={previewTitle || 'Preview'} className="max-w-[90vw] max-h-[90vh] rounded shadow-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
