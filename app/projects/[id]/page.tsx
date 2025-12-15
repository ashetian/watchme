import { projects } from "../../data/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StackSlider from "../../components/StackSlider";
import { FiExternalLink } from "react-icons/fi";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    notFound();
  }

  return (
    <main className="h-dvh w-full bg-black text-white relative overflow-hidden flex flex-col">
       {/* Background */}
       <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-50 opacity-30" 
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />
      
      <div className="flex-1 flex flex-col max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12 w-full h-full">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-4 md:mb-8 uppercase tracking-widest text-sm font-bold group w-max shrink-0">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
        </Link>

        <div className="flex-1 flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center min-h-0 pb-8">
            {/* Image */}
            <div className="relative w-full md:w-1/2 border border-white/10 overflow-hidden group shrink-0">
                 <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 block"
                  />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center overflow-y-auto md:overflow-visible max-h-full pr-2 md:pr-0">
                <span className="text-white/50 font-mono text-sm tracking-wider uppercase block mb-2 md:mb-4">
                    {project.category}
                </span>

                <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <h1 className="font-unifraktur text-4xl md:text-7xl lg:text-8xl leading-none text-white mix-blend-difference">
                        {project.title}
                    </h1>
                    {project.link && (
                        <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 transition-opacity hover:opacity-70 text-white"
                            title="Open Project"
                        >
                            <FiExternalLink className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
                        </a>
                    )}
                </div>
                
                <div className="mb-6 md:mb-8">
                    <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 uppercase tracking-wider">About the Project</h2>
                    <p className="text-white/70 text-sm md:text-lg leading-relaxed whitespace-pre-wrap">
                        {project.details || project.description}
                    </p>
                </div>

                {/* Stack Slider */}
                {project.stack && (
                    <StackSlider stack={project.stack} />
                )}
            </div>
        </div>
      </div>
    </main>
  );
}
