import fs from 'fs';
import path from 'path';

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
  const data = fs.readFileSync(projectsPath, 'utf-8');
  const projects = JSON.parse(data) as any[];
  const id = params.id;
  const project = projects.find(p => String(p.id) === String(id));
  if (!project) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold text-blue-400">Dự án không tìm thấy</h1>
        <p className="text-gray-300">Không có dự án với id {id}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">{project.name}</h1>
        <p className="text-gray-300 mb-1">{project.description}</p>
        {project.image && (
          <img src={project.image} alt={project.name} className="w-full h-auto object-contain rounded mb-4 border border-blue-900/30" />
        )}
        {project.content ? (
          <div className="prose prose-invert text-gray-100" dangerouslySetInnerHTML={{ __html: project.content }} />
        ) : (
          <p className="text-gray-300">Chưa có mô tả chi tiết cho dự án này.</p>
        )}
        {project.link && (
          <p className="mt-4"><a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Xem link dự án</a></p>
        )}
      </div>
    </div>
  );
}
