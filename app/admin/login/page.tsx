"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      if (!res.ok) {
        setError('Mật khẩu sai hoặc lỗi kết nối');
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data?.token) {
        login(data.token);
        router.replace('/admin');
      } else {
        setError('Không nhận được token');
      }
    } catch {
      setError('Lỗi mạng');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#070607] via-[#0b0920] to-[#0a0a14]">
      <div className="bg-[#0f1724] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Đăng nhập Admin</h2>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu quản trị" className="p-3 rounded bg-[#0b1220] text-white border border-[#1f2937]" />
          {error && <div className="text-red-400">{error}</div>}
          <div className="flex gap-2">
            <button className="btn-main" type="submit" disabled={loading}>{loading ? 'Đang...' : 'Đăng nhập'}</button>
            <button type="button" className="btn-outline" onClick={() => { setPassword(''); setError(''); }}>Xóa</button>
          </div>
        </form>
      </div>
    </div>
  );
}
