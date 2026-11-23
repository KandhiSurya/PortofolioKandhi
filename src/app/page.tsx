'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  ArrowDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Eye,
  Server,
  Database,
  Cpu,
  ExternalLink,
  CheckCircle2,
  X,
  FileText,
  Award,
  Globe,
  Smartphone,
  Code2,
  Briefcase,
  GraduationCap,
  Terminal,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  Download,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TiltCard from '@/components/TiltCard';
import Background3D from '@/components/Background3D';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import styles from './page.module.css';

// ============================================================================
// Authentic Projects Data from Latest CV
// ============================================================================
type Project = {
  id: string;
  category: 'web' | 'mobile' | 'cloud';
  categoryLabel: string;
  type: string;
  association: string;
  period: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  impact: string;
  image: string;
  mockupType: 'browser' | 'mobile' | 'cloud';
  browserUrl?: string;
  tags: string[];
  demoUrl?: string;
  githubUrl: string;
};

const PROJECTS: Project[] = [
  {
    id: 'si-bansos',
    category: 'web',
    categoryLabel: 'Gov Web Platform',
    type: 'Full Stack Web Platform',
    association: 'Dinas Sosial Provinsi Jawa Timur',
    period: 'Jan 2026 – Jul 2026',
    title: 'Social Assistance Recipient Data Collection System (SI-BANSOS)',
    summary:
      'Platform digital web terpusat untuk mendigitalkan entri data penerima bantuan sosial, validasi kelayakan otomatis, dan monitoring penyaluran kuota bantuan multi-wilayah se-Jawa Timur.',
    problem:
      'Pelacakan manual dan desentralisasi data penerima bantuan sosial lintas kabupaten/kota sebelumnya menghadapi risiko redudansi data, proses validasi administratif yang memakan waktu, dan tantangan transparansi distribusi bantuan publik.',
    solution:
      'Membangun platform web terpadu berbasis Next.js dan Supabase dengan arsitektur data terpusat, dasbor superadmin real-time, validasi kelayakan otomatis, serta Role-Based Access Control (RBAC) berjenjang.',
    highlights: [
      'Role-Based Access Control (RBAC) terstruktur: Super Admin Provinsi, Verifikator Divisi, dan Operator Daerah Kabupaten/Kota',
      'Dasbor analitik real-time untuk memantau kuota bansos dan verifikasi pengajuan warga se-Jawa Timur',
      'Skema basis data Supabase (PostgreSQL) yang aman dan teroptimasi untuk memangkas latensi query data skala besar',
      'Validasi formulir real-time untuk mencegah entri data ganda dan inkonsistensi nomor kependudukan',
    ],
    impact:
      'Menggantikan pelacakan manual dengan platform terpusat, secara drastis meningkatkan akurasi validasi data penerima dan transparansi penyaluran bantuan sosial.',
    image: '/images/project-1.jpg',
    mockupType: 'browser',
    browserUrl: 'https://dinsos.jatimprov.go.id/bansos-portal',
    tags: ['Next.js', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'RBAC', 'REST API'],
    demoUrl: 'https://dinsos.jatimprov.go.id',
    githubUrl: 'https://github.com/KandhiSurya',
  },
  {
    id: 'public-info-ai',
    category: 'mobile',
    categoryLabel: 'Mobile App & AI Assistant',
    type: 'Cross-Platform Mobile Application',
    association: 'Dinas Sosial Provinsi Jawa Timur',
    period: 'Feb 2025 – Jul 2025',
    title: 'Public Information Center & AI Virtual Assistant Mobile App',
    summary:
      'Aplikasi mobile pusat informasi publik terpadu yang diintegrasikan dengan asisten virtual Artificial Intelligence (AI) untuk merespons pertanyaan dan tracking aduan warga secara instan 24/7.',
    problem:
      'Tingginya volume pertanyaan publik yang repetitif mengenai syarat program bantuan sosial, lokasi unit dinas, dan kontak resmi membebani staf helpdesk kantor dinas selama jam kerja.',
    solution:
      'Mengembangkan aplikasi mobile responsif berbasis React dan Expo Go yang terhubung ke back-end REST API Laravel dan basis data Supabase, serta mengintegrasikan AI Virtual Assistant API untuk layanan informasi otomatis.',
    highlights: [
      'Integrasi Artificial Intelligence (AI) API untuk bertindak sebagai asisten virtual cerdas yang menjawab pertanyaan warga secara otomatis dan real-time',
      'Antarmuka mobile responsif menggunakan React dan Expo Go untuk performa optimal di Android & iOS',
      'Back-end API berbasis Laravel dan basis data Supabase terpusat yang efisien tanpa membebani resource server dinas',
      'Direktori digital lokasi kantor dinas se-Jatim, katalog bantuan aktif, dan kontak resmi dalam satu genggaman',
    ],
    impact:
      'Membuka akses mandiri informasi publik warga sekaligus memangkas beban kerja administratif staf dinas dalam menangani pertanyaan berulang.',
    image: '/images/project-2.jpg',
    mockupType: 'mobile',
    tags: ['React', 'Expo Go', 'Laravel', 'PHP', 'Supabase', 'AI API', 'REST API'],
    demoUrl: 'https://dinsos.jatimprov.go.id',
    githubUrl: 'https://github.com/KandhiSurya',
  },
  {
    id: 'cloud-backend-gcp',
    category: 'cloud',
    categoryLabel: 'Cloud & Distributed Backend',
    type: 'Cloud Infrastructure Architecture',
    association: 'MSIB Bangkit Academy 2024 by Google, GoTo, Traveloka',
    period: 'Aug 2024 – Jan 2025',
    title: 'Cloud Architecture & Scalable Back-End Development',
    summary:
      'Perancangan infrastruktur cloud terdistribusi di Google Cloud Platform (GCP) dengan REST API backend berkemampuan throughput tinggi dan orkestrasi kontainer Docker.',
    problem:
      'Sistem aplikasi modern memerlukan infrastruktur backend yang scalable, decoupled, dan siap diuji coba dengan traffic tinggi tanpa mengorbankan keamanan atau ketersediaan layanan.',
    solution:
      'Merancang arsitektur sistem terdistribusi di Google Cloud Platform (GCP) menggunakan REST API backend modern, integrasi machine learning di GCP, dan manajemen kontainer Docker.',
    highlights: [
      'Perancangan arsitektur cloud terdistribusi memanfaatkan layanan Google Cloud Platform (Compute Engine, Cloud Storage, Networking)',
      'Pengembangan backend scalable berbasis RESTful API dengan struktur middleware dan autentikasi aman',
      'Penerapan Machine Learning di GCP serta kolaborasi rekayasa perangkat lunak menggunakan Git/GitHub workflows',
      'Pengujian performa endpoint backend untuk memastikan kesiapan deployment produksi',
    ],
    impact:
      'Memperkuat kesiapan deployment cloud berstandar industri dan menguasai praktik kolaboratif rekayasa perangkat lunak standar Google.',
    image: '/images/project-4.jpg',
    mockupType: 'cloud',
    tags: ['Google Cloud Platform', 'Cloud Computing', 'REST API', 'Machine Learning', 'Docker', 'Git/GitHub'],
    demoUrl: 'https://github.com/KandhiSurya',
    githubUrl: 'https://github.com/KandhiSurya',
  },
];

// ============================================================================
// Technical Skills Matrix (4-Card Bento Matrix)
// ============================================================================
const SKILLS_BENTO = [
  {
    id: 'web-mobile',
    title: 'Full Stack Web & Mobile',
    badge: 'Production Core',
    icon: Smartphone,
    summary:
      'Engineering reactive client experiences across desktop and mobile with modern frameworks, server-side rendering, and responsive styling.',
    skills: [
      { name: 'Next.js 16', highlight: 'App Router, SSR, SEO' },
      { name: 'React.js', highlight: 'Hooks, State, Virtual DOM' },
      { name: 'Expo Go', highlight: 'Android & iOS Mobile Apps' },
      { name: 'Tailwind CSS', highlight: 'Tokens, Dark Theme' },
      { name: 'Laravel (PHP)', highlight: 'RESTful API, MVC' },
      { name: 'JavaScript ES6+', highlight: 'Async, DOM, Logic' },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & Distributed Systems',
    badge: 'Certified Google GCP',
    icon: Server,
    summary:
      'Architecting resilient cloud hosting, containerized microservices, high-throughput REST APIs, and collaborative version control.',
    skills: [
      { name: 'Google Cloud Platform', highlight: 'Compute Engine, Storage, IAM' },
      { name: 'Cloud Computing', highlight: 'Scalability, Architecture' },
      { name: 'Docker', highlight: 'Containerization, Isolation' },
      { name: 'Git & GitHub', highlight: 'Branching, PRs, CI/CD' },
      { name: 'Google Cloud Console', highlight: 'Resource Monitoring' },
    ],
  },
  {
    id: 'databases-baas',
    title: 'Centralized Databases & BaaS',
    badge: 'High Integrity',
    icon: Database,
    summary:
      'Managing relational schemas, backend-as-a-service platforms, query optimization, data validation, and real-time synchronization.',
    skills: [
      { name: 'Supabase (BaaS)', highlight: 'Auth, Database, Realtime' },
      { name: 'PostgreSQL', highlight: 'Indexing, Schemas, Triggers' },
      { name: 'MySQL', highlight: 'Normalization, Transactions' },
      { name: 'Database Systems', highlight: 'Profiling, Integrity' },
    ],
  },
  {
    id: 'ai-architecture',
    title: 'AI & Enterprise Architecture',
    badge: 'Applied Intelligence',
    icon: Cpu,
    summary:
      'Integrating machine learning inferencing endpoints, virtual assistant APIs, structured role-based access control (RBAC), and enterprise logic.',
    skills: [
      { name: 'Artificial Intelligence API', highlight: '24/7 Virtual Assistant' },
      { name: 'REST APIs Development', highlight: 'Endpoints, Auth, JSON' },
      { name: 'RBAC Security', highlight: 'Multi-Tier Permissions' },
      { name: 'System Architecture', highlight: 'End-to-End Design' },
      { name: 'Python', highlight: 'FastAPI, Data Pipelines' },
    ],
  },
];

// ============================================================================
// Work Experience from Latest CV
// ============================================================================
const EXPERIENCES = [
  {
    idx: '01',
    period: 'Jan 2026 – Jul 2026',
    year: '2026',
    role: 'Full Stack Developer (Internship)',
    org: 'Dinas Sosial Provinsi Jawa Timur',
    location: 'Surabaya, Indonesia',
    kind: 'Public Sector Internship',
    summary:
      'Mengembangkan Sistem Informasi Pendataan Penerima Bantuan Sosial (Bansos) berbasis web menggunakan Next.js dan Supabase sebagai platform digital terpusat.',
    contributions: [
      'Merancang arsitektur sistem front-end dan back-end lengkap dengan fitur profiling data penerima dan manajemen hak akses terstruktur.',
      'Membangun dasbor superadmin untuk manajemen akun operator dan pemantauan distribusi bantuan sosial secara real-time lintas wilayah administratif.',
      'Menyusun skema basis data yang aman pada Supabase untuk mengefisiensikan validasi data terpusat dan meningkatkan transparansi penyaluran bantuan publik.',
      'Mengimplementasikan Role-Based Access Control (RBAC) berjenjang multi-level (Super Admin, Divisi Provinsi, Operator Daerah).',
    ],
    tags: ['Next.js', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'RBAC', 'Data Validation'],
  },
  {
    idx: '02',
    period: 'Feb 2025 – Jul 2025',
    role: 'Mobile Application Developer (Internship)',
    org: 'Dinas Sosial Provinsi Jawa Timur',
    location: 'Surabaya, Indonesia',
    kind: 'Public Sector Internship',
    summary:
      'Mengembangkan aplikasi mobile pusat informasi publik terintegrasi yang menyediakan lokasi kantor dinas, program bansos, dan kontak resmi.',
    contributions: [
      'Mengintegrasikan Artificial Intelligence (AI) API sebagai asisten virtual otomatis untuk merespons pertanyaan dan aduan warga secara instan dan real-time.',
      'Membangun antarmuka mobile responsif menggunakan React dan Expo Go yang terhubung ke back-end API Laravel dan basis data Supabase terpusat.',
      'Memastikan integrasi API berjalan efisien dan ringan tanpa membebani resource server dinas.',
      'Memangkas beban kerja administratif staf dinas dalam menangani pertanyaan publik yang berulang sekaligus meningkatkan efisiensi operasional layanan.',
    ],
    tags: ['React', 'Expo Go', 'Laravel', 'PHP', 'Supabase', 'AI Virtual Assistant'],
  },
  {
    idx: '03',
    period: 'Aug 2024 – Jan 2025',
    role: 'Cloud Computing Learning Path (Independent Study)',
    org: 'MSIB Bangkit Academy 2024 by Google, GoTo, Traveloka',
    location: 'Indonesia',
    kind: 'Independent Study',
    summary:
      'Program studi independen intensif berstandar industri dengan fokus arsitektur Google Cloud Platform (GCP), backend services, dan deployment scalable.',
    contributions: [
      'Merancang infrastruktur cloud dan arsitektur sistem terdistribusi menggunakan Google Cloud Platform (GCP).',
      'Mengembangkan back-end services dan REST API yang scalable untuk mendukung aplikasi berbasis web, diiringi penerapan Machine Learning di GCP.',
      'Menerapkan praktik kolaborasi rekayasa perangkat lunak berstandar industri dengan alur kerja Git/GitHub terstruktur.',
      'Lulus 8 modul sertifikasi teknis resmi dari Google dan Dicoding Indonesia dengan hasil sangat memuaskan.',
    ],
    tags: ['Google Cloud Platform', 'Cloud Computing', 'REST API', 'Machine Learning', 'Git/GitHub'],
  },
];

// ============================================================================
// Education from Latest CV
// ============================================================================
const EDUCATION = [
  {
    degree: 'Bachelor of Information Systems (S1 Sistem Informasi)',
    institution: 'Universitas Pembangunan Nasional "Veteran" Jawa Timur',
    period: '2022 – 2026',
    location: 'Surabaya, Indonesia',
    gpa: '3.69 / 4.00',
    details: [
      'Mengembangkan aplikasi web dan mobile dengan fokus utama pada analisis sistem dan perancangan basis data relasional.',
      'Menerapkan arsitektur aplikasi full-stack modern, pengembangan REST API, dan integrasi layanan cloud computing.',
      'Lulus dengan predikat akademik Sangat Memuaskan (IPK 3.69 / 4.00).',
    ],
  },
  {
    degree: 'Independent Study – Cloud Computing Learning Path',
    institution: 'MSIB Bangkit Academy 2024 by Google, GoTo, Traveloka',
    period: 'Aug 2024 – Jan 2025',
    location: 'Indonesia',
    gpa: 'Graduate',
    details: [
      'Menyelesaikan kurikulum intensif arsitektur Google Cloud Platform, microservices backend, dan implementasi deployment produksi.',
      'Lulus 8 sertifikasi kompetensi teknis dari Dicoding Indonesia dan Google.',
    ],
  },
];

// ============================================================================
// Certifications from Latest CV with Preview Metadata & Authentic PDF Sources
// ============================================================================
type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  validUntil?: string;
  year: string;
  category: string;
  desc: string;
  credentialId: string;
  verificationUrl?: string;
  pdfUrl: string;
  hours?: string;
  score?: string;
  skills: string[];
};

const CERTIFICATIONS: Certificate[] = [
  {
    id: 'bangkit-cloud-computing',
    title: 'MSIB Bangkit Academy 2024 – Cloud Computing',
    issuer: 'Google, GoTo, Traveloka (Kemdikbudristek MSIB)',
    issueDate: '10 Januari 2025',
    year: '2025',
    category: 'Cloud Specialist',
    desc: 'Sertifikasi kelulusan program studi independen berskala nasional yang dipimpin oleh Google untuk mencetak talenta teknis berkaliber tinggi pada spesialisasi Cloud Computing.',
    credentialId: 'BA24/GRAD/XXIV-01/C296B4KY2136',
    pdfUrl: '/certificates/bangkit-cloud-computing.pdf',
    hours: '900+ Jam Pembelajaran',
    score: 'Full Graduate (Capstone Finished)',
    skills: ['Google Cloud Platform', 'Cloud Architecture', 'REST APIs', 'Containerization Docker', 'DevOps & SRE', 'Associate Cloud Engineer'],
  },
  {
    id: 'google-cloud-engineer',
    title: 'Menjadi Google Cloud Engineer',
    issuer: 'Dicoding Indonesia × Google Cloud Partner',
    issueDate: '22 November 2024',
    validUntil: '22 November 2027',
    year: '2024',
    category: 'GCP Engineering',
    desc: 'Penguasaan arsitektur Google Cloud Platform berstandar industri: konfigurasi compute resources, storage, networking, IAM security, monitoring, dan deployment solusi cloud.',
    credentialId: 'GRX54M0N2P0M',
    verificationUrl: 'https://www.dicoding.com/certificates/GRX54M0N2P0M',
    pdfUrl: '/certificates/google-cloud-engineer.pdf',
    hours: '42 Jam Kurikulum',
    skills: ['Compute Engine', 'Google Cloud Storage', 'VPC Networks', 'IAM Security', 'Cloud Operations Monitoring', 'Cloud Marketplace'],
  },
  {
    id: 'applied-ml-gcp',
    title: 'Belajar Penerapan Machine Learning dengan Google Cloud',
    issuer: 'Dicoding Indonesia × Google Cloud Partner',
    issueDate: '06 Desember 2024',
    validUntil: '06 Desember 2027',
    year: '2024',
    category: 'Machine Learning',
    desc: 'Membangun aplikasi machine learning dan melakukan deployment di Google Cloud: pengelolaan model TensorFlow di lingkungan produksi, training model di Compute Engine & App Engine, serta Vertex AI MLOps.',
    credentialId: '0LZ040NVNP65',
    verificationUrl: 'https://www.dicoding.com/certificates/0LZ040NVNP65',
    pdfUrl: '/certificates/applied-ml-gcp.pdf',
    hours: '40 Jam Kurikulum',
    skills: ['TensorFlow Production', 'Model Training on GCP', 'Compute Engine', 'App Engine', 'Vertex AI & MLOps', 'Cloud Storage & Firestore'],
  },
  {
    id: 'backend-gcp',
    title: 'Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud',
    issuer: 'Dicoding Indonesia × Google Cloud Partner',
    issueDate: '10 November 2024',
    validUntil: '10 November 2027',
    year: '2024',
    category: 'Backend & Cloud',
    desc: 'Pengembangan backend service RESTful API berstandar internasional: arsitektur client-server HTTP, Node.js & framework Hapi, deployment di Google Compute Engine, dan pengujian otomatis dengan Postman.',
    credentialId: 'GRX54WEVVP0M',
    verificationUrl: 'https://www.dicoding.com/certificates/GRX54WEVVP0M',
    pdfUrl: '/certificates/backend-gcp.pdf',
    hours: '45 Jam Kurikulum',
    skills: ['RESTful API Architecture', 'Node.js & Hapi Framework', 'Compute Engine SSH', 'Postman Automated Testing', 'CRUD API Bookshelf'],
  },
  {
    id: 'basic-ai',
    title: 'Belajar Dasar AI',
    issuer: 'Dicoding Indonesia × Google Cloud Partner',
    issueDate: '26 November 2024',
    validUntil: '26 November 2027',
    year: '2024',
    category: 'Artificial Intelligence',
    desc: 'Fondasi teori dan implementasi kecerdasan buatan: konsep dasar AI, pengelolaan data untuk AI, algoritma Machine Learning, dan deep learning untuk pemula.',
    credentialId: '0LZ04EJR3P65',
    verificationUrl: 'https://www.dicoding.com/certificates/0LZ04EJR3P65',
    pdfUrl: '/certificates/basic-ai.pdf',
    hours: '10 Jam Kurikulum',
    skills: ['AI Fundamentals', 'Data for AI', 'Machine Learning Concepts', 'Deep Learning Implementation'],
  },
  {
    id: 'javascript-fundamentals',
    title: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding Indonesia (AWS Validated Partner)',
    issueDate: '03 November 2024',
    validUntil: '03 November 2027',
    year: '2024',
    category: 'Core Language',
    desc: 'Standar kompetensi industri JavaScript untuk pengembangan aplikasi web dan backend Node.js: sintaksis modern ES6+, struktur data Object/Array/Map/Set, OOP, Functional Programming, dan asynchronous process.',
    credentialId: '81P2457GOZOY',
    verificationUrl: 'https://www.dicoding.com/certificates/81P2457GOZOY',
    pdfUrl: '/certificates/javascript-fundamentals.pdf',
    hours: '46 Jam Kurikulum',
    skills: ['ECMAScript ES6+', 'Node.js Runtime', 'OOP Paradigm', 'Functional Programming', 'Async/Await & Promises', 'Code Quality & Testing'],
  },
  {
    id: 'web-fundamentals',
    title: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding Indonesia × Google Developers Partner',
    issueDate: '23 September 2024',
    validUntil: '23 September 2027',
    year: '2024',
    category: 'Web Engineering',
    desc: 'Tiga fondasi pembuatan website modern: semantic HTML5, styling CSS mendalam, arsitektur layouting responsif dengan Flexbox, dan interaktivitas DOM di browser.',
    credentialId: 'NVP74YDGGPR0',
    verificationUrl: 'https://www.dicoding.com/certificates/NVP74YDGGPR0',
    pdfUrl: '/certificates/web-fundamentals.pdf',
    hours: '41 Jam Kurikulum',
    skills: ['Semantic HTML5', 'CSS3 Deep-Dive', 'Responsive Flexbox', 'Layouting Architecture', 'DOM Interaction'],
  },
  {
    id: 'git-github',
    title: 'Belajar Dasar Git dengan GitHub',
    issuer: 'Dicoding Indonesia',
    issueDate: '16 September 2024',
    validUntil: '16 September 2027',
    year: '2024',
    category: 'DevOps & Collaboration',
    desc: 'Pengelolaan kode dan data kolaboratif berstandar industri: version control terdistribusi Git, branching strategy, conflict resolution, kolaborasi tim dengan pull request workflows, dan optimasi repositori GitHub.',
    credentialId: '4EXGQWJNEZRL',
    verificationUrl: 'https://www.dicoding.com/certificates/4EXGQWJNEZRL',
    pdfUrl: '/certificates/git-github.pdf',
    hours: '15 Jam Kurikulum',
    skills: ['Git Version Control', 'Branching & Merging', 'Conflict Resolution', 'Pull Request Collaboration', 'GitHub Workflows'],
  },
  {
    id: 'programming-fundamentals',
    title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
    issuer: 'Dicoding Indonesia (Kartu Prakerja & KBJI: 2512.03)',
    issueDate: '15 September 2024',
    validUntil: '15 September 2027',
    year: '2024',
    category: 'Software Engineering',
    desc: 'Standar okupasi Pengembang Software resmi: analisis dan spesifikasi kebutuhan software, diagram alur algoritma, dasar pemrograman HTML/CSS/JavaScript, serta dokumentasi dan pengarsipan teknis.',
    credentialId: '98XW5D5D4PM3',
    verificationUrl: 'https://www.dicoding.com/certificates/98XW5D5D4PM3',
    pdfUrl: '/certificates/programming-fundamentals.pdf',
    hours: '9 Jam Kurikulum',
    score: 'Nilai Kelulusan: 91 / 100',
    skills: ['Software Requirements Analysis', 'Flowchart & Algorithm Logic', 'Pseudocode Design', 'Technical Documentation'],
  },
];

export default function Home() {
  const [projectFilter, setProjectFilter] = useState<'all' | 'web' | 'mobile' | 'cloud'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  // Close modals or navigate certificates with keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedCertIndex(null);
      } else if (e.key === 'ArrowRight' && selectedCertIndex !== null) {
        setSelectedCertIndex((prev) => (prev !== null ? (prev + 1) % CERTIFICATIONS.length : null));
      } else if (e.key === 'ArrowLeft' && selectedCertIndex !== null) {
        setSelectedCertIndex((prev) =>
          prev !== null ? (prev - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCertIndex]);

  // Filtered projects
  const filteredProjects = PROJECTS.filter((proj) => {
    if (projectFilter === 'all') return true;
    return proj.category === projectFilter;
  });

  return (
    <div className={styles.page}>
      {/* 3D SCROLL-DRIVEN GEOMETRIC CANVAS BACKGROUND */}
      <Background3D />

      {/* 1. FLOATING LIQUID NAVBAR */}
      <Navbar />

      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        {/* ==================================================================
            2. SPLIT CINEMATIC HERO SECTION
            ================================================================== */}
        <section id="hero" className={styles.heroSection} aria-label="Hero">
          <div className="container">
            <div className={styles.heroSplitLayout}>
              {/* Left Column: Bio & Core CTAs */}
              <div className={styles.heroLeftCol}>
                <div className={styles.rolePill}>
                  <span className={styles.roleDot} />
                  <span>Full Stack Web &amp; Mobile · Cloud &amp; AI Builder</span>
                </div>

                <div className={styles.statusPill}>
                  <span className={styles.statusPillDot} />
                  <span>Available for software engineering roles</span>
                </div>

                <h1 className={styles.heroHeading}>
                  Architecting resilient platforms.
                  <br />
                  <span className={styles.heroHighlight}>Engineering intelligent systems.</span>
                </h1>

                <p className={styles.heroDescription}>
                  Hi, I’m <strong>Kandhi Surya Atmadja</strong>, an Information Systems graduate from UPN
                  &ldquo;Veteran&rdquo; Jawa Timur (GPA 3.69 / 4.00) and Bangkit 2024 Cloud Computing graduate.
                  I bridge frontend engineering, mobile development, centralized databases, and cloud computing
                  to create software with measurable real-world impact.
                </p>

                <div className={styles.heroActions}>
                  <a href="#projects" className={styles.heroCtaPrimary}>
                    <span>Explore Systems</span>
                    <ArrowDown size={16} />
                  </a>
                  <a
                    href="https://wa.me/6282232601115?text=Halo%20Kandhi,%20saya%20tertarik%20dengan%20portofolio%20Anda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.heroCtaSecondary}
                  >
                    <span>Discuss a project</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                <div className={styles.heroChipsRow}>
                  <a
                    href="https://github.com/KandhiSurya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.heroChip}
                  >
                    <GithubIcon size={14} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kandhiatmadja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.heroChip}
                  >
                    <LinkedinIcon size={14} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="/CV_KANDHI_SURYA_ATMADJA.docx"
                    download
                    className={styles.heroChip}
                  >
                    <FileText size={14} />
                    <span>Resume (DOCX)</span>
                  </a>
                </div>
              </div>

              {/* Right Column: 3D Interactive Glass Dev Terminal Widget */}
              <div className={styles.heroRightCol}>
                <TiltCard maxTilt={8} scale={1.02} glare={true} className={styles.terminalCard}>
                  <div className={styles.terminalHeader}>
                    <div className={styles.windowControls}>
                      <span className={styles.dotClose} />
                      <span className={styles.dotMin} />
                      <span className={styles.dotMax} />
                    </div>
                    <span className={styles.terminalTitle}>kandhi-core.ts — profile configuration</span>
                    <span className={styles.terminalStatusPill}>ACTIVE</span>
                  </div>

                  <div className={styles.terminalBody}>
                    <pre className={styles.codeSnippet}>
                      <code>
                        <span className={styles.codeKeyword}>const</span>{' '}
                        <span className={styles.codeVar}>engineer</span> = &#123;{'\n'}
                        {'  '}<span className={styles.codeKey}>name</span>: <span className={styles.codeString}>&quot;Kandhi Surya Atmadja&quot;</span>,{'\n'}
                        {'  '}<span className={styles.codeKey}>degree</span>: <span className={styles.codeString}>&quot;S1 Sistem Informasi (UPNVJT)&quot;</span>,{'\n'}
                        {'  '}<span className={styles.codeKey}>gpa</span>: <span className={styles.codeNum}>3.69</span>, <span className={styles.codeComment}>// Honors</span>{'\n'}
                        {'  '}<span className={styles.codeKey}>focus</span>: [<span className={styles.codeString}>&quot;Full Stack Web&quot;</span>, <span className={styles.codeString}>&quot;Mobile Expo&quot;</span>, <span className={styles.codeString}>&quot;Cloud Systems&quot;</span>],{'\n'}
                        {'  '}<span className={styles.codeKey}>publicInternship</span>: <span className={styles.codeString}>&quot;Dinas Sosial Provinsi Jawa Timur&quot;</span>,{'\n'}
                        {'  '}<span className={styles.codeKey}>cloudCertification</span>: <span className={styles.codeString}>&quot;Bangkit 2024 by Google&quot;</span>,{'\n'}
                        {'  '}<span className={styles.codeKey}>techStack</span>: &#123;{'\n'}
                        {'    '}<span className={styles.codeKey}>web</span>: [<span className={styles.codeString}>&quot;Next.js 16&quot;</span>, <span className={styles.codeString}>&quot;React.js&quot;</span>, <span className={styles.codeString}>&quot;Tailwind&quot;</span>],{'\n'}
                        {'    '}<span className={styles.codeKey}>mobile</span>: [<span className={styles.codeString}>&quot;Expo Go&quot;</span>, <span className={styles.codeString}>&quot;React Native&quot;</span>],{'\n'}
                        {'    '}<span className={styles.codeKey}>backend</span>: [<span className={styles.codeString}>&quot;Laravel&quot;</span>, <span className={styles.codeString}>&quot;FastAPI&quot;</span>, <span className={styles.codeString}>&quot;REST APIs&quot;</span>],{'\n'}
                        {'    '}<span className={styles.codeKey}>databases</span>: [<span className={styles.codeString}>&quot;Supabase&quot;</span>, <span className={styles.codeString}>&quot;PostgreSQL&quot;</span>, <span className={styles.codeString}>&quot;MySQL&quot;</span>],{'\n'}
                        {'    '}<span className={styles.codeKey}>cloud</span>: [<span className={styles.codeString}>&quot;Google Cloud Platform&quot;</span>, <span className={styles.codeString}>&quot;Docker&quot;</span>]{'\n'}
                        {'  '}&#125;,{'\n'}
                        {'  '}<span className={styles.codeKey}>status</span>: <span className={styles.codeString}>&quot;READY_FOR_DEPLOYMENT&quot;</span>{'\n'}
                        &#125;;
                      </code>
                    </pre>

                    <div className={styles.terminalFooterBar}>
                      <span className={styles.termLiveDot} />
                      <span>TERMINAL: 0 ERRORS // TURBOPACK ONLINE // PRODUCTION READY</span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className={styles.metricsRibbon}>
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>3.69</span>
                <span className={styles.metricLbl}>GPA / 4.00 (UPNVJT Honors)</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>Bangkit &apos;24</span>
                <span className={styles.metricLbl}>Cloud Computing (Google, GoTo)</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>Dinsos Jatim</span>
                <span className={styles.metricLbl}>Full Stack &amp; Mobile AI Developer</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>9 Modules</span>
                <span className={styles.metricLbl}>Google &amp; Cloud Certified</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. ABOUT ME (CINEMATIC PROFILE HIGHLIGHT)
            ================================================================== */}
        <section id="about" className={styles.aboutSection} aria-label="About">
          <div className="container">
            <div className={styles.aboutGrid}>
              {/* Left Column: Narrative */}
              <div className={styles.aboutNarrative}>
                <div className="label-uppercase">ABOUT ME</div>
                <h2 className="heading-lg">Turning complex requirements into resilient software.</h2>

                <p className={styles.aboutText}>
                  Hi, I’m Kandhi Surya Atmadja, an Information Systems graduate from UPN &ldquo;Veteran&rdquo;
                  Jawa Timur based in Surabaya (GPA 3.69 / 4.00). My primary engineering focus revolves around{' '}
                  <strong>Full Stack Web and Mobile Application Development</strong>, managing centralized databases,
                  and optimizing cloud infrastructure.
                </p>

                <p className={styles.aboutText}>
                  At <strong>Dinas Sosial Provinsi Jawa Timur</strong>, I contributed to two key digital platforms:
                  developing the centralized web-based Bansos recipient data collection system with Next.js, Supabase, and RBAC,
                  as well as building the public information center mobile app with React, Expo Go, Laravel, and an AI virtual assistant.
                </p>

                <p className={styles.aboutText}>
                  Through <strong>Bangkit Academy by Google, GoTo, and Traveloka</strong>, I strengthened production-ready
                  cloud architecture on Google Cloud Platform (GCP), REST API design, and collaborative software engineering.
                </p>

                <div className={styles.aboutHighlights}>
                  <div className={styles.highlightCard}>
                    <CheckCircle2 size={18} className={styles.highlightIcon} />
                    <div>
                      <h4 className={styles.highlightTitle}>Full Stack Web &amp; Mobile Engineering</h4>
                      <p className={styles.highlightDesc}>
                        Skilled in Next.js, React.js, Expo Go, Laravel, and Supabase to deliver robust user-facing applications.
                      </p>
                    </div>
                  </div>

                  <div className={styles.highlightCard}>
                    <CheckCircle2 size={18} className={styles.highlightIcon} />
                    <div>
                      <h4 className={styles.highlightTitle}>Centralized Databases &amp; AI Integration</h4>
                      <p className={styles.highlightDesc}>
                        Structuring PostgreSQL/Supabase relational schemas, role-based access control, and embedding AI APIs for automated services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Portrait Card */}
              <div className={styles.aboutPortraitCard}>
                <TiltCard maxTilt={6} scale={1.02} className={styles.portraitTilt}>
                  <div className={styles.portraitFrame}>
                    <Image
                      src="/images/kandhi-hd.jpg"
                      alt="Kandhi Surya Atmadja"
                      fill
                      className={styles.portraitImg}
                      sizes="(max-width: 900px) 100vw, 450px"
                    />
                    <div className={styles.portraitVignette} />
                  </div>
                  <div className={styles.portraitCaption}>
                    <span className={styles.captionName}>Kandhi Surya Atmadja, S.Kom</span>
                    <span className={styles.captionRole}>Full Stack Web &amp; Mobile Developer</span>
                    <span className={styles.captionLoc}>Surabaya, East Java, Indonesia</span>
                  </div>
                </TiltCard>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. PROJECTS SECTION - EDITORIAL BENTO SHOWCASE & FILTERS
            ================================================================== */}
        <section id="projects" className={styles.projectsSection} aria-label="Projects">
          <div className="container">
            {/* Header & Filter Bar */}
            <div className={styles.projectsHeaderRow}>
              <div>
                <div className="label-uppercase">FEATURED ENGINEERING</div>
                <h2 className="heading-lg">Selected Production Systems.</h2>
                <p className={styles.projectsSubheader}>
                  Real-world systems engineered for provincial public services, AI assistant integration, and scalable cloud infrastructure.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className={styles.filterPillsRow}>
                <button
                  type="button"
                  onClick={() => setProjectFilter('all')}
                  className={`${styles.filterPillBtn} ${projectFilter === 'all' ? styles.filterPillBtnActive : ''}`}
                >
                  All ({PROJECTS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setProjectFilter('web')}
                  className={`${styles.filterPillBtn} ${projectFilter === 'web' ? styles.filterPillBtnActive : ''}`}
                >
                  Web Platforms
                </button>
                <button
                  type="button"
                  onClick={() => setProjectFilter('mobile')}
                  className={`${styles.filterPillBtn} ${projectFilter === 'mobile' ? styles.filterPillBtnActive : ''}`}
                >
                  Mobile &amp; AI
                </button>
                <button
                  type="button"
                  onClick={() => setProjectFilter('cloud')}
                  className={`${styles.filterPillBtn} ${projectFilter === 'cloud' ? styles.filterPillBtnActive : ''}`}
                >
                  Cloud Systems
                </button>
              </div>
            </div>

            {/* Editorial Bento Grid */}
            <div className={styles.bentoProjectsGrid}>
              {filteredProjects.map((proj, idx) => {
                const isHeroCard = proj.id === 'si-bansos';

                return (
                  <TiltCard
                    key={proj.id}
                    maxTilt={5}
                    scale={1.01}
                    className={`${styles.bentoProjectCardWrapper} ${
                      isHeroCard ? styles.bentoCardHero : styles.bentoCardRegular
                    }`}
                  >
                    <article className={styles.bentoProjectCard}>
                      {/* Top Mockup Header Bar */}
                      {proj.mockupType === 'browser' && (
                        <div className={styles.browserHeaderBar}>
                          <div className={styles.browserDots}>
                            <span />
                            <span />
                            <span />
                          </div>
                          <div className={styles.browserUrlBox}>
                            <span>{proj.browserUrl || 'https://dinsos.jatimprov.go.id'}</span>
                          </div>
                        </div>
                      )}

                      {proj.mockupType === 'mobile' && (
                        <div className={styles.mobileMockupBar}>
                          <span className={styles.mobileSpeakerNotch} />
                          <span className={styles.mobileAppBadge}>EXPO GO • REACT NATIVE</span>
                        </div>
                      )}

                      {proj.mockupType === 'cloud' && (
                        <div className={styles.cloudMockupBar}>
                          <span className={styles.cloudIconDot} />
                          <span className={styles.cloudConsoleBadge}>GCP INFRASTRUCTURE CONSOLE</span>
                        </div>
                      )}

                      {/* Visual Image Preview */}
                      <div
                        className={styles.bentoImageFrame}
                        onClick={() => setSelectedProject(proj)}
                        role="button"
                        tabIndex={0}
                        title={`Click to view architectural details for ${proj.title}`}
                      >
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          className={styles.bentoCoverImage}
                          sizes={isHeroCard ? '100vw' : '(max-width: 900px) 100vw, 50vw'}
                        />
                        <div className={styles.bentoHoverOverlay} />
                        <button
                          type="button"
                          className={styles.bentoOpenIndicator}
                          aria-label="View Project Details"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(proj);
                          }}
                        >
                          <ArrowUpRight size={18} />
                        </button>
                      </div>

                      {/* Content Area */}
                      <div className={styles.bentoCardContent}>
                        <div className={styles.bentoMetaRow}>
                          <span className={styles.bentoCategoryBadge}>{proj.categoryLabel}</span>
                          <span className={styles.bentoPeriodText}>{proj.period}</span>
                        </div>

                        <h3 className={styles.bentoProjectTitle}>
                          <button
                            type="button"
                            onClick={() => setSelectedProject(proj)}
                            className={styles.bentoTitleBtn}
                          >
                            {proj.title}
                          </button>
                        </h3>

                        <p className={styles.bentoAssociation}>{proj.association}</p>

                        <p className={styles.bentoSummaryText}>{proj.summary}</p>

                        {/* Impact highlight pill */}
                        <div className={styles.bentoImpactBox}>
                          <CheckCircle2 size={15} className={styles.bentoImpactIcon} />
                          <span>{proj.impact}</span>
                        </div>

                        {/* Tech tags */}
                        <div className={styles.bentoTagsRow}>
                          {proj.tags.map((tag) => (
                            <span key={tag} className="tag-pill">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className={styles.bentoActionsRow}>
                          <button
                            type="button"
                            onClick={() => setSelectedProject(proj)}
                            className={styles.bentoDetailBtn}
                          >
                            <span>Architecture &amp; Details</span>
                            <ArrowUpRight size={14} />
                          </button>

                          {proj.demoUrl && (
                            <a
                              href={proj.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.bentoExternalBtn}
                            >
                              <span>Live Platform</span>
                              <ExternalLink size={13} />
                            </a>
                          )}

                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.bentoExternalBtn}
                          >
                            <GithubIcon size={14} />
                            <span>Source</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. TECHNICAL SKILLS - 4-CARD BENTO MATRIX
            ================================================================== */}
        <section id="skills" className={styles.skillsSection} aria-label="Skills">
          <div className="container">
            <div className={styles.skillsHeader}>
              <div className="label-uppercase">CORE COMPETENCIES</div>
              <h2 className="heading-lg">Interactive Technical Matrix.</h2>
              <p className={styles.skillsSubtitle}>
                A structured engineering toolkit validated through institutional deployment and cloud certification programs.
              </p>
            </div>

            {/* 4-Card Bento Matrix */}
            <div className={styles.skillsBentoGrid}>
              {SKILLS_BENTO.map((bento) => {
                const IconComponent = bento.icon;
                return (
                  <TiltCard key={bento.id} maxTilt={6} scale={1.015} className={styles.skillBentoCardWrapper}>
                    <div className={styles.skillBentoCard}>
                      <div className={styles.bentoSkillTop}>
                        <div className={styles.bentoSkillIconWrap}>
                          <IconComponent size={20} />
                        </div>
                        <span className="tag-pill">{bento.badge}</span>
                      </div>

                      <h3 className={styles.bentoSkillTitle}>{bento.title}</h3>
                      <p className={styles.bentoSkillSummary}>{bento.summary}</p>

                      <div className={styles.bentoSkillItemsList}>
                        {bento.skills.map((s) => (
                          <div key={s.name} className={styles.skillRowItem}>
                            <span className={styles.skillItemName}>{s.name}</span>
                            <span className={styles.skillItemTag}>{s.highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. EXPERIENCE & EDUCATION - CAREER TIMELINE & CREDENTIAL VAULT
            ================================================================== */}
        <section id="experience" className={styles.experienceSection} aria-label="Experience">
          <div className="container">
            <div className={styles.experienceHeader}>
              <div className="label-uppercase">CAREER &amp; EDUCATION</div>
              <h2 className="heading-lg">Work Experience &amp; Academic Track.</h2>
              <p className={styles.experienceSubtitle}>
                A chronological record of public sector development, industry study programs, and formal degree studies.
              </p>
            </div>

            {/* Work Experiences */}
            <div className={styles.experienceCardsList}>
              {EXPERIENCES.map((item) => (
                <div key={item.idx} className={styles.experienceCard}>
                  <div className={styles.expCardHeader}>
                    <div className={styles.expRoleBlock}>
                      <span className={styles.expPeriodBadge}>{item.period}</span>
                      <h3 className={styles.expRoleTitle}>{item.role}</h3>
                      <p className={styles.expOrgName}>
                        {item.org} • {item.location}
                      </p>
                    </div>
                    <span className="tag-pill">{item.kind}</span>
                  </div>

                  <p className={styles.expSummaryText}>{item.summary}</p>

                  <details className={styles.experienceDisclosure}>
                    <summary className={styles.disclosureSummary}>
                      <span>Explore key contributions &amp; impact</span>
                      <ChevronDown size={16} className={styles.disclosureChevron} />
                    </summary>
                    <ul className={styles.contributionsList}>
                      {item.contributions.map((bullet, bIdx) => (
                        <li key={bIdx} className={styles.contributionItem}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </details>

                  <div className={styles.expTagsRow}>
                    {item.tags.map((t) => (
                      <span key={t} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education Sub-block */}
            <div className={styles.educationBlock}>
              <h3 className={styles.educationHeading}>
                <GraduationCap size={22} className={styles.eduIcon} />
                <span>Education Background</span>
              </h3>

              <div className={styles.educationGrid}>
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className={styles.educationCard}>
                    <div className={styles.eduTopRow}>
                      <span className={styles.eduDegree}>{edu.degree}</span>
                      <span className="tag-pill">{edu.period}</span>
                    </div>
                    <p className={styles.eduInstitution}>{edu.institution}</p>
                    <p className={styles.eduGpa}>
                      GPA: <strong>{edu.gpa}</strong> • {edu.location}
                    </p>
                    <ul className={styles.eduList}>
                      {edu.details.map((d, dIdx) => (
                        <li key={dIdx}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials Section */}
            <div className={styles.credentialsVault}>
              <div className={styles.vaultHeader}>
                <div className="label-uppercase">CERTIFICATIONS</div>
                <h3 className={styles.vaultTitle}>Professional Credentials &amp; Certifications</h3>
                <p className={styles.vaultSubtitle}>
                  9 formal certifications across Google Cloud, machine learning, backend engineering, and core programming.
                </p>
              </div>

              <div className={styles.credentialsGrid}>
                {CERTIFICATIONS.map((cred, idx) => (
                  <TiltCard key={cred.id} maxTilt={6} scale={1.015} className={styles.credentialCardTiltWrapper}>
                    <div
                      className={styles.credentialCard}
                      onClick={() => setSelectedCertIndex(idx)}
                      role="button"
                      tabIndex={0}
                      title={`Click to preview certificate for ${cred.title}`}
                    >
                      {/* Mini Certificate Visual Mockup Preview */}
                      <div className={styles.certMiniMockup}>
                        <div className={styles.certMiniHeader}>
                          <Award size={14} className={styles.certMiniRibbon} />
                          <span className={styles.certMiniIssuer}>{cred.issuer}</span>
                          <span className={styles.certMiniYear}>{cred.year}</span>
                        </div>
                        <div className={styles.certMiniBody}>
                          <div className={styles.certMiniWatermark}>VERIFIED</div>
                          <p className={styles.certMiniRecipient}>Kandhi Surya Atmadja</p>
                          <h5 className={styles.certMiniTitle}>{cred.title}</h5>
                          <span className={styles.certMiniId}>{cred.credentialId}</span>
                        </div>
                        <div className={styles.certMiniHoverBar}>
                          <Eye size={13} />
                          <span>Preview Credential</span>
                        </div>
                      </div>

                      {/* Card Content & Meta */}
                      <div className={styles.credCardInfo}>
                        <div className={styles.credTop}>
                          <span className={styles.credCategoryBadge}>{cred.category}</span>
                          <span className="tag-pill">{cred.year}</span>
                        </div>
                        <h4 className={styles.credTitle}>{cred.title}</h4>
                        <p className={styles.credIssuer}>{cred.issuer}</p>
                        <p className={styles.credDesc}>{cred.desc}</p>

                        <div className={styles.certSkillsRow}>
                          {cred.skills.slice(0, 3).map((sk) => (
                            <span key={sk} className={styles.certSkillPill}>
                              {sk}
                            </span>
                          ))}
                          {cred.skills.length > 3 && (
                            <span className={styles.certSkillMore}>+{cred.skills.length - 3}</span>
                          )}
                        </div>

                        <button
                          type="button"
                          className={styles.certPreviewActionBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCertIndex(idx);
                          }}
                        >
                          <ZoomIn size={14} />
                          <span>Inspect Certificate</span>
                        </button>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            7. CONTACT & STORY FOOTER
            ================================================================== */}
        <Footer />
      </main>

      {/* ==================================================================
          PROJECT ARCHITECTURE MODAL DIALOG
          ================================================================== */}
      {selectedProject && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedProject(null)}>
          <div
            className={styles.modalDialog}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalCategory}>
                  {selectedProject.categoryLabel} • {selectedProject.period}
                </span>
                <h2 id="modal-title" className={styles.modalTitle}>
                  {selectedProject.title}
                </h2>
                <p className={styles.modalSubOrg}>{selectedProject.association}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className={styles.modalCloseBtn}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalImageWrapper}>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className={styles.modalImg}
                sizes="(max-width: 800px) 100vw, 760px"
              />
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <h4 className={styles.modalSubheading}>Background &amp; Problem Statement</h4>
                <p className={styles.modalParagraph}>{selectedProject.problem}</p>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSubheading}>Architectural Solution</h4>
                <p className={styles.modalParagraph}>{selectedProject.solution}</p>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSubheading}>Key Engineering Highlights</h4>
                <ul className={styles.modalHighlightsList}>
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSubheading}>Measurable Operational Impact</h4>
                <p className={styles.modalParagraphImpact}>
                  <CheckCircle2 size={16} className={styles.impactCheckIcon} />
                  <span>{selectedProject.impact}</span>
                </p>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSubheading}>Core Tech Stack</h4>
                <div className={styles.modalTagsRow}>
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.modalActions}>
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalPrimaryAction}
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink size={16} />
                  </a>
                )}
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalSecondaryAction}
                >
                  <GithubIcon size={16} />
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================
          CERTIFICATE PREVIEW LIGHTBOX MODAL
          ================================================================== */}
      {selectedCertIndex !== null && (
        <div className={styles.certModalBackdrop} onClick={() => setSelectedCertIndex(null)}>
          <div
            className={styles.certModalDialog}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
          >
            {/* Modal Header */}
            <div className={styles.certModalHeader}>
              <div className={styles.certModalMeta}>
                <div className={styles.certCounterPill}>
                  <span>CREDENTIAL PREVIEW {selectedCertIndex + 1} OF {CERTIFICATIONS.length}</span>
                </div>
                <h3 id="cert-modal-title" className={styles.certModalTitle}>
                  {CERTIFICATIONS[selectedCertIndex].title}
                </h3>
                <p className={styles.certModalSub}>
                  Issued by <strong>{CERTIFICATIONS[selectedCertIndex].issuer}</strong> • {CERTIFICATIONS[selectedCertIndex].year}
                </p>
              </div>

              <div className={styles.certModalHeaderActions}>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedCertIndex(
                      (selectedCertIndex - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length
                    )
                  }
                  className={styles.certNavBtn}
                  aria-label="Previous Certificate"
                  title="Previous Certificate (Left Arrow)"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedCertIndex((selectedCertIndex + 1) % CERTIFICATIONS.length)
                  }
                  className={styles.certNavBtn}
                  aria-label="Next Certificate"
                  title="Next Certificate (Right Arrow)"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCertIndex(null)}
                  className={styles.modalCloseBtn}
                  aria-label="Close Preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded Real PDF Certificate Showcase */}
            <div className={styles.certModalBody}>
              <div className={styles.certDisplayFrame}>
                {/* Official PDF Document Iframe */}
                <div className={styles.certPdfContainer}>
                  <iframe
                    src={`${CERTIFICATIONS[selectedCertIndex].pdfUrl}#toolbar=0&navpanes=0`}
                    className={styles.certPdfIframe}
                    title={CERTIFICATIONS[selectedCertIndex].title}
                  />
                </div>
              </div>

              {/* Action Buttons for Verification & Download */}
              <div className={styles.certActionToolbar}>
                {CERTIFICATIONS[selectedCertIndex].verificationUrl && (
                  <a
                    href={CERTIFICATIONS[selectedCertIndex].verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.certVerifyExternalBtn}
                  >
                    <ShieldCheck size={16} className={styles.verifyBtnIcon} />
                    <span>Verifikasi Resmi di Dicoding Portal</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                <a
                  href={CERTIFICATIONS[selectedCertIndex].pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.certOpenPdfBtn}
                >
                  <FileText size={15} />
                  <span>Buka PDF di Tab Baru</span>
                  <ExternalLink size={14} />
                </a>
                <a
                  href={CERTIFICATIONS[selectedCertIndex].pdfUrl}
                  download
                  className={styles.certDownloadBtn}
                >
                  <Download size={15} />
                  <span>Unduh File Asli</span>
                </a>
              </div>

              {/* Verified Credentials Details Strip */}
              <div className={styles.certCompetencyVault}>
                <div className={styles.certMetaRowGrid}>
                  <div className={styles.certMetaCol}>
                    <span className={styles.certMetaLabel}>NOMOR KREDENSIAL:</span>
                    <span className={styles.certMetaVal}>{CERTIFICATIONS[selectedCertIndex].credentialId}</span>
                  </div>
                  <div className={styles.certMetaCol}>
                    <span className={styles.certMetaLabel}>TANGGAL PENERBITAN:</span>
                    <span className={styles.certMetaVal}>{CERTIFICATIONS[selectedCertIndex].issueDate}</span>
                  </div>
                  {CERTIFICATIONS[selectedCertIndex].validUntil && (
                    <div className={styles.certMetaCol}>
                      <span className={styles.certMetaLabel}>BERLAKU HINGGA:</span>
                      <span className={styles.certMetaVal}>{CERTIFICATIONS[selectedCertIndex].validUntil}</span>
                    </div>
                  )}
                  {CERTIFICATIONS[selectedCertIndex].hours && (
                    <div className={styles.certMetaCol}>
                      <span className={styles.certMetaLabel}>DURASI BELAJAR:</span>
                      <span className={styles.certMetaVal}>{CERTIFICATIONS[selectedCertIndex].hours}</span>
                    </div>
                  )}
                  {CERTIFICATIONS[selectedCertIndex].score && (
                    <div className={styles.certMetaCol}>
                      <span className={styles.certMetaLabel}>HASIL KELULUSAN:</span>
                      <span className={styles.certMetaValHighlight}>{CERTIFICATIONS[selectedCertIndex].score}</span>
                    </div>
                  )}
                </div>

                <div className={styles.certCompetencyHead}>
                  <CheckCircle2 size={16} className={styles.compIcon} />
                  <span>Materi &amp; Kompetensi yang Divalidasi:</span>
                </div>
                <div className={styles.certCompetenciesList}>
                  {CERTIFICATIONS[selectedCertIndex].skills.map((skill) => (
                    <span key={skill} className={styles.competencyBadge}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Quick-Jump Thumbnail Strip */}
              <div className={styles.certThumbStripWrapper}>
                <span className={styles.certThumbStripLabel}>Navigasi 9 Sertifikat Resmi (Klik untuk beralih):</span>
                <div className={styles.certThumbStrip}>
                  {CERTIFICATIONS.map((cert, cIdx) => (
                    <button
                      key={cert.id}
                      type="button"
                      onClick={() => setSelectedCertIndex(cIdx)}
                      className={`${styles.certThumbBtn} ${
                        cIdx === selectedCertIndex ? styles.certThumbBtnActive : ''
                      }`}
                      title={cert.title}
                    >
                      <span className={styles.thumbNumber}>{cIdx + 1}</span>
                      <span className={styles.thumbTitle}>{cert.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
