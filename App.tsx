/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Linkedin, 
  Instagram, 
  ExternalLink, 
  X, 
  ChevronRight, 
  MapPin, 
  Phone,
  ArrowUpRight,
  Menu,
  Github
} from 'lucide-react';

// --- Types ---

type Tab = 'about' | 'projects' | 'contact';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  role: string;
  concept: string;
  imageUrl: string;
  year: string;
}

// --- Mock Data ---

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'The Vertical Commons',
    category: 'Urban Housing',
    description: 'A high-density residential project focusing on shared vertical spaces and community interaction in dense urban environments.',
    role: 'Lead Designer / Visualization',
    concept: 'Interlocking volumes creating semi-private courtyards at various elevations.',
    imageUrl: 'https://picsum.photos/seed/arch1/1200/800',
    year: '2024'
  },
  {
    id: '2',
    title: 'Ephemeral Pavilion',
    category: 'Installation',
    description: 'A temporary structure designed for the city park, utilizing recycled timber and tensioned fabric to create a play of light and shadow.',
    role: 'Material Research / Fabrication',
    concept: 'Kinetic response to wind patterns, creating a living breathing space.',
    imageUrl: 'https://picsum.photos/seed/arch2/1200/800',
    year: '2023'
  },
  {
    id: '3',
    title: 'Coastal Resilience Hub',
    category: 'Public Infrastructure',
    description: 'A research facility and community center designed to mitigate rising sea levels through amphibious architecture.',
    role: 'Site Analysis / 3D Modeling',
    concept: 'A modular system that adapts to tidal changes while maintaining public access.',
    imageUrl: 'https://picsum.photos/seed/arch3/1200/800',
    year: '2024'
  },
  {
    id: '4',
    title: 'The Monolith Library',
    category: 'Institutional',
    description: 'A brutalist-inspired library that uses heavy concrete masses to define intimate reading spaces and grand atriums.',
    role: 'Concept Development',
    concept: 'Carving light out of solid mass.',
    imageUrl: 'https://picsum.photos/seed/arch4/1200/800',
    year: '2023'
  },
  {
    id: '5',
    title: 'Subterranean Gallery',
    category: 'Cultural',
    description: 'An underground art space that utilizes natural light wells and raw earth walls to create a sensory experience.',
    role: 'Lighting Design / Rendering',
    concept: 'The descent into the earth as a transition from the mundane to the artistic.',
    imageUrl: 'https://picsum.photos/seed/arch5/1200/800',
    year: '2022'
  },
  {
    id: '6',
    title: 'Timber Nexus',
    category: 'Office Space',
    description: 'A mass-timber office building designed for carbon neutrality and biophilic well-being.',
    role: 'Structural Integration',
    concept: 'Exposed structural grid as the primary aesthetic element.',
    imageUrl: 'https://picsum.photos/seed/arch6/1200/800',
    year: '2024'
  }
];

const SKILLS = [
  { category: 'Design', items: ['AutoCAD', 'Revit', 'Rhino 3D', 'SketchUp', 'Grasshopper'] },
  { category: 'Visualization', items: ['V-Ray', 'Enscape', 'Lumion', 'Twinmotion'] },
  { category: 'Creative', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Premiere Pro'] },
  { category: 'Soft Skills', items: ['Project Management', 'Site Analysis', 'Model Making', 'Public Speaking'] }
];

const EDUCATION = [
  {
    school: 'Metropolitan University of Architecture',
    degree: 'Bachelor of Architecture (B.Arch)',
    period: '2020 - Present',
    details: 'Current GPA: 3.9/4.0. Focus on sustainable urbanism and parametric design.'
  },
  {
    school: 'Design Institute of Technology',
    degree: 'Foundation in Environmental Design',
    period: '2019 - 2020',
    details: 'Introductory course covering spatial theory and manual drafting.'
  }
];

// --- Components ---

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
}

const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#F5F2ED]/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="font-serif text-xl font-bold tracking-tight uppercase">Alex Rivera</span>
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-mono">Architecture Student</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative text-xs uppercase tracking-widest transition-colors ${
                activeTab === tab.id ? 'text-black' : 'text-black/40 hover:text-black'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-black"
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-[#F5F2ED] border-b border-black/5 md:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-sm uppercase tracking-widest ${
                    activeTab === tab.id ? 'text-black font-bold' : 'text-black/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  key?: string | number;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8 }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="aspect-[4/3] overflow-hidden bg-black/5 relative">
      <img 
        src={project.imageUrl} 
        alt={project.title}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </div>
    <div className="mt-4 flex justify-between items-start">
      <div>
        <h3 className="font-serif text-lg leading-tight">{project.title}</h3>
        <p className="text-[10px] uppercase tracking-widest opacity-50 mt-1">{project.category}</p>
      </div>
      <span className="font-mono text-[10px] opacity-40">{project.year}</span>
    </div>
  </motion.div>
);

const Lightbox = ({ project, onClose }: { project: Project, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
  >
    <div className="absolute inset-0 bg-black/95" onClick={onClose} />
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="relative w-full max-w-6xl bg-[#F5F2ED] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-black text-white hover:bg-black/80 transition-colors"
      >
        <X size={20} />
      </button>

      <div className="w-full md:w-2/3 bg-black flex items-center justify-center overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="w-full md:w-1/3 p-8 md:p-12 overflow-y-auto">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">{project.category} — {project.year}</span>
        <h2 className="font-serif text-3xl md:text-4xl mt-4 mb-8">{project.title}</h2>
        
        <div className="space-y-8">
          <section>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2 opacity-40">The Concept</h4>
            <p className="text-sm leading-relaxed italic">"{project.concept}"</p>
          </section>

          <section>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2 opacity-40">Description</h4>
            <p className="text-sm leading-relaxed opacity-80">{project.description}</p>
          </section>

          <section>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2 opacity-40">My Role</h4>
            <p className="text-sm leading-relaxed opacity-80">{project.role}</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-black/5">
          <button className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:gap-4 transition-all">
            View Full Case Study <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen pt-20 pb-20">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-6 mt-12">
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <header className="mb-16">
                <h1 className="font-serif text-5xl md:text-7xl tracking-tighter mb-6">Selected Works</h1>
                <p className="max-w-xl text-black/60 leading-relaxed">
                  A collection of architectural explorations ranging from urban interventions to experimental material studies. 
                  Each project represents a unique dialogue between site, program, and human experience.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {PROJECTS.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
            >
              <div className="lg:col-span-5">
                <div className="aspect-[3/4] bg-black/5 overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/architect/800/1200" 
                    alt="Alex Rivera"
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm opacity-60">
                    <MapPin size={16} /> <span>Based in New York, NY</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm opacity-60">
                    <Mail size={16} /> <span>alex.rivera@arch.edu</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <section className="mb-16">
                  <h1 className="font-serif text-5xl md:text-7xl tracking-tighter mb-8">Design Philosophy</h1>
                  <p className="text-xl md:text-2xl font-light leading-relaxed mb-8">
                    "I believe architecture should be an <span className="italic font-serif">empathetic response</span> to its environment, 
                    balancing the permanence of structure with the fluidity of human interaction."
                  </p>
                  <p className="text-black/60 leading-relaxed">
                    As a final-year architecture student, my work explores the intersection of parametric design and sustainable urbanism. 
                    I am particularly interested in how digital fabrication can be leveraged to create more resilient, community-focused spaces.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <section>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 opacity-40">Education</h3>
                    <div className="space-y-8">
                      {EDUCATION.map((edu, idx) => (
                        <div key={idx}>
                          <h4 className="font-bold text-sm">{edu.school}</h4>
                          <p className="text-sm italic opacity-70">{edu.degree}</p>
                          <p className="font-mono text-[10px] mt-1 opacity-50">{edu.period}</p>
                          <p className="text-xs mt-3 opacity-60 leading-relaxed">{edu.details}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 opacity-40">Technical Skills</h3>
                    <div className="space-y-8">
                      {SKILLS.map((skill, idx) => (
                        <div key={idx}>
                          <h4 className="font-bold text-[10px] uppercase tracking-widest mb-3 opacity-50">{skill.category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {skill.items.map((item, sIdx) => (
                              <span key={sIdx} className="px-3 py-1 border border-black/10 text-[10px] uppercase tracking-wider">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <header className="mb-16 text-center">
                <h1 className="font-serif text-5xl md:text-7xl tracking-tighter mb-6">Let's Connect</h1>
                <p className="text-black/60">Available for internships, collaborations, and architectural visualization projects.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 opacity-40">Contact Details</h3>
                  <div className="space-y-8">
                    <a href="mailto:alex.rivera@arch.edu" className="group block">
                      <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-1">Email</span>
                      <span className="text-xl group-hover:underline underline-offset-8">alex.rivera@arch.edu</span>
                    </a>
                    <a href="tel:+1234567890" className="group block">
                      <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-1">Phone</span>
                      <span className="text-xl group-hover:underline underline-offset-8">+1 (234) 567-890</span>
                    </a>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-4">Social</span>
                      <div className="flex gap-6">
                        <a href="#" className="p-3 border border-black/5 hover:bg-black hover:text-white transition-all rounded-full">
                          <Linkedin size={20} />
                        </a>
                        <a href="#" className="p-3 border border-black/5 hover:bg-black hover:text-white transition-all rounded-full">
                          <Instagram size={20} />
                        </a>
                        <a href="#" className="p-3 border border-black/5 hover:bg-black hover:text-white transition-all rounded-full">
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 md:p-12 shadow-sm border border-black/5">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 opacity-40">Send a Message</h3>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block opacity-50">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block opacity-50">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block opacity-50">Message</label>
                      <textarea 
                        rows={4}
                        className="w-full bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <button className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-black/80 transition-colors mt-8">
                      Send Inquiry
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-32 pt-12 border-t border-black/5 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-[10px] uppercase tracking-[0.2em] opacity-40">
          © 2024 Alex Rivera Architecture Portfolio
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">Behance</a>
          <a href="#" className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">LinkedIn</a>
          <a href="#" className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">Instagram</a>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <Lightbox 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
