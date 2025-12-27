"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    fetch("/api/profile").then(r => r.json()).then(setProfile);
  }, []);
  if (!profile) return <div>Đang tải...</div>;
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Giới thiệu</h1>
      <div className="bg-[#1e293b] p-6 rounded-lg border border-blue-900/40 flex flex-col md:flex-row gap-6 items-center">
        <img src={profile.avatar || "/avatar-hung.png"} alt="avatar" className="w-32 h-32 rounded-full border-2 border-blue-400 object-cover mb-4 md:mb-0" />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-blue-300 mb-2">{profile.name}</h2>
          <p className="text-lg text-gray-300 mb-2">{profile.title}</p>
          <p className="text-gray-400 mb-2">{profile.description}</p>
          <div className="mb-2">
            <span className="font-semibold text-blue-300">Kỹ năng:</span> {profile.skills && profile.skills.join(", ")}
          </div>
          <div className="mb-2 flex items-center gap-3">
            <span className="font-semibold text-blue-300 flex items-center gap-2">Email:
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                <path d="M3 8.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 6.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v.5L12 13l9-6V6.5z" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <a href={`mailto:${profile.contact?.email}`} className="text-gray-200 hover:underline">{profile.contact?.email}</a>
          </div>
          <div className="flex gap-4 mt-2 items-center">
            <a href={profile.contact?.github || 'https://github.com/'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:scale-110 transition-transform">
              <img src="/github.svg" alt="GitHub" className="w-8 h-8" />
              <span className="text-gray-200 text-sm">GitHub</span>
            </a>
            <a href={profile.contact?.facebook || 'https://facebook.com/'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:scale-110 transition-transform">
              <img src="/facebook.svg" alt="Facebook" className="w-8 h-8" />
              <span className="text-gray-200 text-sm">Facebook</span>
            </a>
          </div>
        </div>
      </div>
      {profile.about && (
        <div className="bg-[#1e293b] p-6 rounded-lg border border-blue-900/40 mt-6">
          <h3 className="text-xl font-bold text-blue-400 mb-2">Giới thiệu chi tiết</h3>
          <div className="text-gray-200 whitespace-pre-line">{profile.about}</div>
        </div>
      )}
    </div>
  );
}
