import fs from 'fs';
import path from 'path';

export default async function CertificationDetail({ params }: { params: { id: string } }) {
  const certsPath = path.join(process.cwd(), 'data', 'certifications.json');
  const data = fs.readFileSync(certsPath, 'utf-8');
  const certs = JSON.parse(data) as any[];
  const id = params.id;
  const cert = certs.find(c => String(c.id) === String(id));
  if (!cert) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold text-blue-400">Chứng chỉ không tìm thấy</h1>
        <p className="text-gray-300">Không có chứng chỉ với id {id}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex justify-center items-center bg-[#0a192f]">
      <div className="w-full max-w-2xl bg-[#1e293b] rounded-xl shadow-2xl border border-blue-900/40 p-6 relative">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {cert.image && (
            <div className="relative flex-shrink-0 flex justify-center items-center w-full md:w-auto">
              <div className="bg-white rounded shadow-inner p-3 border border-gray-200" style={{maxWidth: 1200}}>
                <a href={cert.fullImage || cert.image} target="_blank" rel="noopener noreferrer" title="Mở ảnh chứng chỉ kích thước lớn">
                  <img
                    src={cert.fullImage || cert.image}
                    alt={cert.name}
                    className="rounded-lg w-full h-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-200"
                    style={{ display: 'block', maxWidth: '1200px' }}
                  />
                </a>
                <p className="text-xs text-gray-500 mt-2">Bấm ảnh để xem bản gốc kích thước đầy đủ</p>
              </div>
              {/* Sticker badge */}
              <span className="absolute top-6 left-6 bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white/30 select-none" style={{letterSpacing: 1}}>CHỨNG CHỈ</span>
              {/* Issuer logo sticker if Cisco */}
              {cert.issuer?.toLowerCase() === 'cisco' && (
                <span className="absolute top-6 right-6 bg-white rounded-full p-1 shadow-md border border-blue-200">
                  <img src="/globe.svg" alt="Cisco" className="w-8 h-8 object-contain" />
                </span>
              )}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">{cert.name}</h1>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-300 font-semibold">{cert.issuer}</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{cert.date}</p>
            {cert.content ? (
              <div className="prose prose-invert text-gray-100" dangerouslySetInnerHTML={{ __html: cert.content }} />
            ) : (
              <p className="text-gray-300">Chưa có mô tả cho chứng chỉ này.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
