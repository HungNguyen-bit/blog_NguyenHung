"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout, getToken } from "../lib/auth";

export default function AdminPage() {
    const router = useRouter();
    const ok = isAuthenticated();

    useEffect(() => {
        if (!ok) {
            // redirect to login if not authenticated
            router.replace("/admin/login");
        }
    }, [ok, router]);

    return (
        <div className="min-h-screen flex items-start justify-center py-10">
            <div className="w-full max-w-5xl px-4"> 
                <AdminPanel onLogout={() => router.replace('/admin/login')} />
            </div>
        </div>
    );
}

type Project = {
    id: number;
    name: string;
    description: string;
    image: string;
    link: string;
    content: string;
};

function AdminPanel({ onLogout }: { onLogout: () => void }) {
    const [profile, setProfile] = useState({
        name: "",
        title: "",
        description: "",
        skills: [],
        contact: { email: "" },
        avatar: "",
        about: ""
    });
    const [projects, setProjects] = useState<Project[]>([]);
    const [certs, setCerts] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");
    const [avatar, setAvatar] = useState(profile.avatar || "/avatar-hung.png");

    useEffect(() => {
        fetch("/api/profile").then(r => r.json()).then(data => {
          setProfile(data);
          setAvatar(data.avatar || "/avatar-hung.png");
        });
        fetch("/api/projects").then(r => r.json()).then(setProjects);
        fetch("/api/certifications").then(r => r.json()).then(setCerts);
    }, []);

    const handleProfileChange = (e: any) => {
        const { name, value } = e.target;
        setProfile((prev: any) => ({ ...prev, [name]: value }));
    };
    const handleEmailChange = (e: any) => {
        setProfile((prev: any) => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }));
    };
    const handleSkillsChange = (e: any) => {
        setProfile((prev: any) => ({ ...prev, skills: e.target.value.split(",") }));
    };

        const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                // Upload file lên server (gửi token để server xác thực)
                const formData = new FormData();
                formData.append('file', file);
                formData.append('token', getToken() || '');
                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                const data = await res.json();
                if (data.url) {
                    setAvatar(data.url);
                    setProfile((prev: any) => ({ ...prev, avatar: data.url }));
                } else if (data.error) {
                    setMsg('Upload lỗi: ' + data.error);
                    setTimeout(() => setMsg(''), 3000);
                }
            }
        };

        const saveProfile = async (e: any) => {
            e.preventDefault();
            setSaving(true);
            await fetch("/api/profile", { method: "POST", body: JSON.stringify({ ...profile, avatar }) });
            setSaving(false);
            setMsg("Đã lưu thông tin cá nhân!");
            setTimeout(() => setMsg(""), 2000);
        };

    // Project edit helpers
    const handleProjectChange = (idx: number, field: string, value: string) => {
        setProjects((prev: any) => prev.map((p: any, i: number) => i === idx ? { ...p, [field]: value } : p));
    };

    const handleCvUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('token', getToken() || '');
            const res = await fetch('/api/upload-cv', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.url) {
                setMsg('Ảnh CV đã được tải lên! Đường dẫn: ' + data.url);
                setTimeout(() => setMsg(''), 3000);
            } else {
                setMsg('Upload CV lỗi: ' + (data.error || '')); setTimeout(() => setMsg(''), 3000);
            }
        }
    };
    const addProject = () => {
        setProjects((prev) => [...prev, { id: Date.now(), name: "", description: "", image: "", link: "", content: "" }]); 
    };
    const removeProject = (idx: number) => {
        setProjects((prev) => prev.filter((_, i) => i !== idx));
    };
    const saveProjects = async (e: any) => {
        e.preventDefault();
        setSaving(true);
        await fetch("/api/projects", { method: "POST", body: JSON.stringify(projects) });
        setSaving(false);
        setMsg("Đã lưu danh sách dự án!");
        setTimeout(() => setMsg(""), 2000);
    };

    const handleProjectImageChange = async (idx: number, e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('token', getToken() || '');
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.url) {
                setProjects((prev: any) => prev.map((p: any, i: number) => i === idx ? { ...p, image: data.url } : p));
            } else {
                setMsg('Upload ảnh dự án lỗi: ' + (data.error || ''));
                setTimeout(() => setMsg(''), 3000);
            }
        }
    };

        // Chứng chỉ
        const handleCertChange = (idx: number, field: string, value: string) => {
            setCerts((prev: any) => prev.map((c: any, i: number) => i === idx ? { ...c, [field]: value } : c));
        };
        const addCert = () => {
                setCerts((prev: any) => [...prev, { id: Date.now(), name: "", issuer: "", date: "", link: "", image: "", content: "" }]);
            };
        const removeCert = (idx: number) => {
            setCerts((prev: any) => prev.filter((_: any, i: number) => i !== idx));
        };
        const handleCertImageChange = async (idx: number, e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append('file', file);
                formData.append('token', getToken() || '');
                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                const data = await res.json();
                if (data.url) {
                    setCerts((prev: any) => prev.map((c: any, i: number) => i === idx ? { ...c, image: data.url } : c));
                } else {
                    setMsg('Upload ảnh chứng chỉ lỗi: ' + (data.error || ''));
                    setTimeout(() => setMsg(''), 3000);
                }
            }
        };
        const saveCerts = async (e: any) => {
            e.preventDefault();
            setSaving(true);
            await fetch("/api/certifications", { method: "POST", body: JSON.stringify(certs) });
            setSaving(false);
            setMsg("Đã lưu chứng chỉ!");
            setTimeout(() => setMsg(""), 2000);
        };

        return (
                <div>
                        <h2 className="text-2xl font-bold text-blue-400 mb-4">Quản trị Blog</h2>
                        <form onSubmit={saveProfile} className="mb-8 bg-[#0a192f] p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-blue-300 mb-2">Thông tin cá nhân</h3>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4 mb-2">
                                                                <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full border-2 border-blue-400 object-cover" />
                                                                <input type="file" accept="image/*" onChange={handleAvatarChange} className="text-white" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <label className="text-sm text-gray-300">Upload CV (lưu thành /public/cv.jpg):</label>
                                        <input type="file" accept="image/*" onChange={handleCvUpload} className="text-white" />
                                    </div>
                                        <input name="name" value={profile.name} onChange={handleProfileChange} className="p-2 rounded bg-[#1e293b] text-white border border-blue-800" placeholder="Tên" />
                                        <input name="title" value={profile.title} onChange={handleProfileChange} className="p-2 rounded bg-[#1e293b] text-white border border-blue-800" placeholder="Tiêu đề" />
                                        <textarea name="description" value={profile.description} onChange={handleProfileChange} className="p-2 rounded bg-[#1e293b] text-white border border-blue-800" placeholder="Mô tả" />
                                        <input name="skills" value={profile.skills.join(",")} onChange={handleSkillsChange} className="p-2 rounded bg-[#1e293b] text-white border border-blue-800" placeholder="Kỹ năng (cách nhau bởi dấu phẩy)" />
                                        <input name="email" value={profile.contact.email} onChange={handleEmailChange} className="p-2 rounded bg-[#1e293b] text-white border border-blue-800" placeholder="Email" />
                                        <textarea name="about" value={profile.about || ""} onChange={handleProfileChange} className="p-2 rounded bg-[#1e293b] text-white border border-blue-800" placeholder="Giới thiệu chi tiết về bản thân (hiện ở trang /profile)" rows={5} />
                                </div>
                                <button type="submit" className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold" disabled={saving}>{saving ? "Đang lưu..." : "Lưu thông tin"}</button>
                        </form>

                        <form onSubmit={saveProjects} className="mb-8 bg-[#0a192f] p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-blue-300 mb-2">Dự án</h3>
                                <div className="flex flex-col gap-4">
                                        {projects.map((p: any, idx: number) => (
                                            <div key={p.id} className="flex flex-col md:flex-row gap-2 md:items-center bg-[#1e293b] p-2 rounded">
                                                <input value={p.name} onChange={e => handleProjectChange(idx, "name", e.target.value)} className="p-2 rounded bg-[#0a192f] text-white border border-blue-800 flex-1" placeholder="Tên dự án" />
                                                <input value={p.description} onChange={e => handleProjectChange(idx, "description", e.target.value)} className="p-2 rounded bg-[#0a192f] text-white border border-blue-800 flex-1" placeholder="Mô tả" />
                                                <div className="flex items-center gap-3 w-full">
                                                    {p.image ? (
                                                        <img src={p.image} alt={p.name} className="w-28 h-20 object-cover rounded" />
                                                    ) : (
                                                        <div className="w-28 h-20 bg-[#0b1220] rounded flex items-center justify-center text-sm text-[#9aa0a6]">Chưa có</div>
                                                    )}
                                                    <div className="flex-1">
                                                        <input value={p.image} onChange={e => handleProjectChange(idx, "image", e.target.value)} className="p-2 rounded bg-[#0a192f] text-white border border-blue-800 w-full" placeholder="Đường dẫn ảnh" />
                                                        <input type="file" accept="image/*" onChange={e => handleProjectImageChange(idx, e)} className="text-white mt-2" />
                                                    </div>
                                                </div>
                                                <input value={p.link} onChange={e => handleProjectChange(idx, "link", e.target.value)} className="p-2 rounded bg-[#0a192f] text-white border border-blue-800 flex-1" placeholder="Link (external)" />
                                                <textarea value={p.content || ""} onChange={e => handleProjectChange(idx, "content", e.target.value)} className="p-2 rounded bg-[#0a192f] text-white border border-blue-800 w-full mt-2" placeholder="Nội dung chi tiết dự án" rows={4} />
                                                <div className="flex gap-2 mt-2">
                                                    <button type="button" onClick={() => removeProject(idx)} className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded">Xóa</button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex gap-2">
                                            <button type="button" onClick={addProject} className="mt-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-semibold">Thêm dự án</button>
                                        </div>
                                </div>
                                <button type="submit" className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold" disabled={saving}>{saving ? "Đang lưu..." : "Lưu dự án"}</button>
                        </form>

                        <form onSubmit={saveCerts} className="mb-8 bg-[#0a192f] p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-blue-300 mb-2">Chứng chỉ</h3>
                                <div className="flex flex-col gap-4">
                                    {certs.map((c: any, idx: number) => (
                                        <div key={c.id} className="flex flex-col md:flex-row gap-2 md:items-center bg-[#1e293b] p-2 rounded">
                                            <input value={c.name} onChange={e => handleCertChange(idx, "name", e.target.value)} className="p-2 rounded bg-[#0a192f] text-white border border-blue-800 flex-1" placeholder="Tên chứng chỉ" />
                                            <input value={c.issuer} onChange={e => handleCertChange(idx, "issuer", e.target.value)} className="p-2 rounded bg-[#0a192f] text-white border border-blue-800 flex-1" placeholder="Nơi cấp" />
                                            <input value={c.date} onChange={e => handleCertChange(idx, "date", e.target.value)} className="p-2 rounded bg-[#0a192f] text-white border border-blue-800 flex-1" placeholder="Ngày cấp" />
                                            <input value={c.link} onChange={e => handleCertChange(idx, "link", e.target.value)} className="p-2 rounded bg-[#0a192f] text-white border border-blue-800 flex-1" placeholder="Link" />
                                            <div className="flex items-center gap-3">
                                                {c.image ? (
                                                    <img src={c.image} alt="cert" className="w-20 h-12 object-cover rounded" />
                                                ) : (
                                                    <div className="w-20 h-12 bg-[#0b1220] rounded flex items-center justify-center text-sm text-[#9aa0a6]">Chưa có</div>
                                                )}
                                                <input type="file" accept="image/*" onChange={e => handleCertImageChange(idx, e)} className="text-white" />
                                            </div>
                                            <textarea value={c.content || ""} onChange={e => handleCertChange(idx, "content", e.target.value)} className="p-2 rounded bg-[#0a192f] text-white border border-blue-800 w-full mt-2" placeholder="Nội dung chi tiết / mô tả" rows={4} />
                                            <button type="button" onClick={() => removeCert(idx)} className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded">Xóa</button>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={addCert} className="mt-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-semibold">Thêm chứng chỉ</button>
                                <button type="submit" className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold ml-2" disabled={saving}>{saving ? "Đang lưu..." : "Lưu chứng chỉ"}</button>
                        </form>

                        {msg && <div className="text-green-400 font-semibold mb-4">{msg}</div>}
                        <button onClick={() => { logout(); onLogout(); }} className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded font-semibold">Đăng xuất</button>
                </div>
        );
}
            // ...existing code...