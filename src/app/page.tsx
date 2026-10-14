'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  LayoutGrid,
  X,
  Copy,
  Check,
  Download,
  MessageCircle,
} from 'lucide-react';
import styles from './page.module.css';

// Authentic Projects Data from CV
const PROJECTS = [
  {
    id: 'sys-01',
    code: '01 // GOV PLATFORM',
    title: 'SISTEM BANSOS JATIM',
    subtitle:
      'Platform digital terpusat untuk Dinas Sosial Provinsi Jawa Timur guna memvalidasi dan memonitor data penerima bantuan sosial skala besar. Dilengkapi dasbor superadmin real-time, manajemen hak akses berjenjang (RBAC), dan basis data relasional teruji.',
    year: '2025',
    image: '/images/project-1.jpg',
    tags: ['Next.js', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS', 'REST API'],
    demoUrl: 'https://dinsos.jatimprov.go.id',
    githubUrl: 'https://github.com/KandhiSurya',
  },
  {
    id: 'sys-02',
    code: '02 // AI SERVICE',
    title: 'VIRTUAL ASSISTANT AI',
    subtitle:
      'Portal layanan informasi publik komprehensif yang diintegrasikan dengan asisten virtual Artificial Intelligence (AI). AI merespons aduan dan pertanyaan warga secara otomatis 24/7 dan real-time, memangkas beban kerja administratif kantor dinas.',
    year: '2025',
    image: '/images/project-2.jpg',
    tags: ['Artificial Intelligence', 'FastAPI', 'Python', 'AI API Integration', 'GCP'],
    demoUrl: 'https://dinsos.jatimprov.go.id',
    githubUrl: 'https://github.com/KandhiSurya',
  },
  {
    id: 'sys-03',
    code: '03 // ACADEMIC SYSTEM',
    title: 'SIAM AKADEMIK UPNVJT',
    subtitle:
      'Portal administrasi perkuliahan terpadu civitas akademika UPN Veteran Jawa Timur. Menangani pengisian KRS online multi-user dengan algoritma validasi bentrok jadwal, visualisasi grafik IPK semester, dan manajemen presensi real-time.',
    year: '2024',
    image: '/images/project-3.jpg',
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'Chart.js', 'REST API'],
    demoUrl: 'https://upnjatim.ac.id',
    githubUrl: 'https://github.com/KandhiSurya',
  },
  {
    id: 'sys-04',
    code: '04 // CLOUD BACKEND',
    title: 'MICROSERVICES GATEWAY',
    subtitle:
      'Mesin terdistribusi dan API Gateway berkemampuan throughput tinggi dengan Redis in-memory caching, JWT authentication terenkripsi, rate limiting cerdas, dan orkestrasi microservices kontainer.',
    year: '2024',
    image: '/images/project-4.jpg',
    tags: ['Node.js', 'Redis', 'Docker', 'Microservices', 'PostgreSQL', 'GCP'],
    demoUrl: 'https://github.com/KandhiSurya',
    githubUrl: 'https://github.com/KandhiSurya',
  },
];

// Timeline & Experience Data from CV
const TIMELINE = [
  {
    idx: '01',
    org: 'DINAS SOSIAL PROVINSI JAWA TIMUR',
    period: 'FEB 2025 — JUL 2025',
    role: 'FULL STACK WEB & MOBILE AI DEVELOPER',
    description:
      'Mengembangkan arsitektur frontend dan backend Website Sistem Informasi Pendataan Penerima Bantuan Sosial (Bansos). Membangun dasbor superadmin untuk memonitor data pengajuan lintas wilayah administratif secara real-time, profiling data hak akses berjenjang, dan integrasi Artificial Intelligence (AI) virtual assistant publik.',
    tags: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Prisma ORM', 'AI Integration', 'RBAC'],
  },
  {
    idx: '02',
    org: 'BANGKIT ACADEMY BY GOOGLE, GOTO, TRAVELOKA',
    period: 'AGU 2024 — JAN 2025',
    role: 'CLOUD COMPUTING COHORT GRADUATE (MSIB)',
    description:
      'Program studi independen intensif berstandar industri dengan spesialisasi Cloud Computing. Menguasai arsitektur Google Cloud Platform (GCP), backend service deployment, containerization, dan lulus 8 modul sertifikasi Dicoding & Google.',
    tags: ['Google Cloud Platform', 'Cloud Computing', 'Docker', 'Microservices', 'Backend Engineering'],
  },
  {
    idx: '03',
    org: 'UPN "VETERAN" JAWA TIMUR',
    period: '2021 — 2025',
    role: 'SARJANA KOMPUTER (S.KOM) — SISTEM INFORMASI',
    description:
      'Lulus dengan predikat sangat memuaskan (IPK 3.69 / 4.00). Berfokus pada perancangan arsitektur sistem informasi enterprise, pemodelan proses bisnis (BPMN 2.0), rekayasa perangkat lunak modern, dan manajemen basis data relasional.',
    tags: ['IPK 3.69 / 4.00', 'Enterprise Architecture', 'BPMN 2.0', 'Database Design', 'Software Engineering'],
  },
];

const SERVICES = [
  'FULL STACK WEB DEVELOPMENT',
  'CLOUD SYSTEMS & GCP ARCHITECTURE',
  'ENTERPRISE DATA & RBAC SYSTEMS',
  'ARTIFICIAL INTELLIGENCE & API INTEGRATION',
  'RELATIONAL DATABASE & BACKEND ENGINES',
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // In-View Elements Tracker
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});
  const [revealedTimeline, setRevealedTimeline] = useState<Record<string, boolean>>({});

  // 1. Mount & Scroll Listener for Framer-Grade Parallax
  useEffect(() => {
    setMounted(true);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrollY(currentY);
          setIsScrolled(currentY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Intersection Observer for Scroll Reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            const rowIdx = entry.target.getAttribute('data-row-idx');
            if (cardId) {
              setRevealedCards((prev) => ({ ...prev, [cardId]: true }));
            }
            if (rowIdx) {
              setRevealedTimeline((prev) => ({ ...prev, [rowIdx]: true }));
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('[data-card-id]').forEach((el) => observer.observe(el));
    document.querySelectorAll('[data-row-idx]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kandhiatmadja@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className={styles.page} id="top">
      {/* ======================================================================
          1. FLOATING PILL NAVBAR
          ====================================================================== */}
      <header
        className={`${styles.navbarContainer} ${isScrolled ? styles.navbarScrolled : ''}`}
      >
        <nav className={styles.navbarPill} aria-label="Main Navigation">
          <a href="#top" className={styles.brandLink}>
            <span className={styles.statusDot} title="Open to Work" />
            <span>KANDHI SURYA</span>
          </a>

          <div className={styles.navLinksDesktop}>
            <button onClick={() => scrollTo('works')} className={styles.navLink}>
              Works
            </button>
            <button onClick={() => scrollTo('about')} className={styles.navLink}>
              About
            </button>
            <button onClick={() => scrollTo('services')} className={styles.navLink}>
              Services
            </button>
            <button onClick={() => scrollTo('timeline')} className={styles.navLink}>
              Career
            </button>
            <button onClick={() => scrollTo('contact')} className={styles.navLink}>
              Contact
            </button>
          </div>

          <a
            href="https://wa.me/6282232601115?text=Halo%20Kandhi,%20saya%20tertarik%20dengan%20portofolio%20Anda"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navCtaBtn}
          >
            Let&apos;s Talk
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className={styles.menuTriggerBtn}
            aria-label="Open Menu"
            title="Open Menu"
          >
            <LayoutGrid size={20} />
          </button>
        </nav>
      </header>

      {/* ======================================================================
          FULLSCREEN SWISS MENU OVERLAY
          ====================================================================== */}
      {menuOpen && (
        <aside className={styles.menuOverlay} aria-modal="true" role="dialog">
          <div className={styles.menuHeader}>
            <span className={styles.menuBrand}>KANDHI SURYA ATMADJA // MENU</span>
            <button
              onClick={() => setMenuOpen(false)}
              className={styles.menuCloseBtn}
              aria-label="Close Menu"
            >
              <X size={16} /> [ CLOSE ]
            </button>
          </div>

          <nav className={styles.menuList}>
            <a
              href="#works"
              onClick={() => scrollTo('works')}
              className={styles.menuItemLink}
            >
              <span className={styles.menuItemNum}>01</span>
              <span>SELECTED WORKS</span>
            </a>
            <a
              href="#about"
              onClick={() => scrollTo('about')}
              className={styles.menuItemLink}
            >
              <span className={styles.menuItemNum}>02</span>
              <span>THE MIND BEHIND IT</span>
            </a>
            <a
              href="#services"
              onClick={() => scrollTo('services')}
              className={styles.menuItemLink}
            >
              <span className={styles.menuItemNum}>03</span>
              <span>SERVICES &amp; EXPERTISE</span>
            </a>
            <a
              href="#timeline"
              onClick={() => scrollTo('timeline')}
              className={styles.menuItemLink}
            >
              <span className={styles.menuItemNum}>04</span>
              <span>CAREER &amp; EDUCATION</span>
            </a>
            <a
              href="#contact"
              onClick={() => scrollTo('contact')}
              className={styles.menuItemLink}
            >
              <span className={styles.menuItemNum}>05</span>
              <span>GET IN TOUCH</span>
            </a>
          </nav>

          <div className={styles.menuFooter}>
            <div className={styles.menuSocialLinks}>
              <a
                href="https://www.linkedin.com/in/kandhiatmadja"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/KandhiSurya"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a href="mailto:kandhiatmadja@gmail.com">Email ↗</a>
              <a href="/CV_KANDHI_SURYA_ATMADJA.docx" download>
                CV (DOCX) ↗
              </a>
            </div>
            <span className={styles.footerCopyright}>
              SURABAYA, JAWA TIMUR · INDONESIA
            </span>
          </div>
        </aside>
      )}

      {/* ======================================================================
          2. HERO SECTION (KERN STYLE WITH PARALLAX & MASKED ENTRANCE)
          ====================================================================== */}
      <section className={styles.heroSection} aria-label="Hero Section">
        {/* Background Grayscale Portrait with Scroll Parallax */}
        <div
          className={styles.heroBackground}
          style={{
            transform: `translate3d(0, ${scrollY * 0.25}px, 0)`,
          }}
        >
          <Image
            src="/images/kandhi-hd.jpg"
            alt="Kandhi Surya Atmadja Portrait"
            fill
            priority
            className={styles.heroPortraitImg}
            sizes="100vw"
          />
          <div className={styles.heroOverlayVignette} />
          <div className={styles.heroGradientBottom} />
        </div>

        {/* Floating Stamp Seal with Scroll-Driven Rotation */}
        <div
          className={styles.floatingStamp}
          style={{
            transform: `rotate(${scrollY * 0.18 - 10}deg) translate3d(0, ${Math.sin(scrollY * 0.006) * 12}px, 0)`,
          }}
        >
          <div className={styles.stampInner}>
            <span className={styles.stampTag}>UPNVJT &apos;25</span>
            <span className={styles.stampScore}>IPK 3.69</span>
            <span className={styles.stampTag}>BANGKIT &apos;24</span>
          </div>
        </div>

        {/* Hero Content & Giant Typography with Staggered Entrance */}
        <div
          className={styles.heroContent}
          style={{
            transform: `translate3d(0, ${scrollY * -0.1}px, 0)`,
          }}
        >
          <div
            className={`${styles.heroTaglineBlock} ${
              mounted ? styles.heroTaglineBlockLoaded : ''
            }`}
          >
            <span className={styles.heroTaglineRole}>
              FULL STACK DEVELOPER &amp; CLOUD SYSTEMS
            </span>
            <span className={styles.heroTaglineLoc}>
              BASED IN SURABAYA — OPEN TO FULL-TIME &amp; FREELANCE
            </span>
          </div>

          <div className={styles.heroTitleMask}>
            <h1
              className={`${styles.heroGiantTitle} ${
                mounted ? styles.heroGiantTitleLoaded : ''
              }`}
            >
              KANDHI SURYA
            </h1>
          </div>

          <div
            className={`${styles.heroBottomTicker} ${
              mounted ? styles.heroBottomTickerLoaded : ''
            }`}
          >
            <span>[ NEXT.JS // POSTGRESQL // GCP // ARTIFICIAL INTELLIGENCE ]</span>
            <div className={styles.scrollIndicator}>
              <span>SCROLL</span>
              <div className={styles.scrollBarLine} />
            </div>
            <span>[ S1 SISTEM INFORMASI · UPNVJT ]</span>
          </div>
        </div>
      </section>

      {/* ======================================================================
          3. SECTION: SELECTED WORKS (WHITE EDITORIAL BLOCK)
          ====================================================================== */}
      <section id="works" className={styles.worksSection}>
        <div className={styles.worksHeader}>
          <div>
            <span className={styles.worksCategory}>PROJECTS</span>
            <h2 className={styles.worksMainTitle}>Selected Works</h2>
          </div>
          <a
            href="https://github.com/KandhiSurya"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.worksHeaderLink}
          >
            <span>SEE ALL 4 PROJECTS</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* 2-Column Editorial Grid with Scroll-Triggered Staggered Reveals */}
        <div className={styles.worksGrid}>
          {PROJECTS.map((proj, idx) => (
            <article
              key={proj.id}
              data-card-id={proj.id}
              className={`${styles.workCard} ${
                revealedCards[proj.id] ? styles.workCardRevealed : ''
              }`}
              style={{
                transitionDelay: `${idx * 0.12}s`,
              }}
            >
              <div className={styles.workImageWrapper}>
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className={styles.workImg}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <div className={styles.workHoverBadge}>
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>

              <div className={styles.workMetaRow}>
                <h3 className={styles.workTitle}>{proj.title}</h3>
                <span className={styles.workYear}>{proj.year}</span>
              </div>

              <p className={styles.workSubtitle}>{proj.subtitle}</p>

              <div className={styles.workTagsList}>
                {proj.tags.map((tag) => (
                  <span key={tag} className={styles.workTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ======================================================================
          4. SECTION: ABOUT / THE MIND BEHIND IT (KERN TEMPLATE MATCH)
          ====================================================================== */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutLayout}>
          <div className={styles.aboutTextCol}>
            <span className={styles.aboutCategoryLabel}>ABOUT</span>
            <h2 className={styles.aboutHeadline}>The mind behind it.</h2>

            <p className={styles.aboutParagraph}>
              Saya Kandhi Surya Atmadja — Sarjana Komputer S1 Sistem Informasi dari
              UPN &ldquo;Veteran&rdquo; Jawa Timur (IPK 3.69) dan alumni program
              prestisius Bangkit Academy 2024 spesialisasi Cloud Computing yang dipimpin
              oleh Google, GoTo, dan Traveloka.
            </p>

            <p className={styles.aboutParagraph}>
              Berpengalaman merancang arsitektur perangkat lunak skala instansi di
              Dinas Sosial Provinsi Jawa Timur. Mulai dari sistem pendataan bansos
              multi-tier, integrasi model Artificial Intelligence untuk pelayanan
              warga otomatis 24/7, hingga orkestrasi backend microservices modern.
            </p>

            <button onClick={() => scrollTo('contact')} className={styles.aboutContactLink}>
              <span>CONTACT ME</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className={styles.aboutStatsCard}>
            <div className={styles.aboutImageWrap}>
              <Image
                src="/images/kandhi-hd.jpg"
                alt="Kandhi Surya Atmadja"
                fill
                className={styles.aboutPortraitImg}
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>3.69</span>
                <span className={styles.statLabel}>IPK Kelulusan (Honors)</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>8+</span>
                <span className={styles.statLabel}>Sertifikasi Cloud &amp; Dev</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>4+</span>
                <span className={styles.statLabel}>Sistem Enterprise Siap Produksi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          5. SECTION: SERVICES & EXPERTISE (DAMASK BACKGROUND + FOCUS SPOTLIGHT)
          ====================================================================== */}
      <section id="services" className={styles.servicesSection}>
        <div
          className={styles.servicesBackground}
          style={{
            transform: `translate3d(0, ${Math.max(0, scrollY - 1400) * 0.12}px, 0)`,
          }}
        >
          <Image
            src="/images/damask.jpg"
            alt="Damask Texture Background"
            fill
            className={styles.servicesDamaskImg}
            sizes="100vw"
          />
          <div className={styles.servicesOverlay} />
        </div>

        <div className={styles.servicesContent}>
          <span className={styles.servicesCategoryLabel}>
            SERVICES &amp; CORE COMPETENCIES
          </span>

          <div className={styles.servicesList}>
            {SERVICES.map((srv) => (
              <div key={srv} className={styles.serviceItem}>
                {srv}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          6. SECTION: CAREER & ACADEMIC BACKGROUND (TIMELINE)
          ====================================================================== */}
      <section id="timeline" className={styles.timelineSection}>
        <div className={styles.timelineContainer}>
          <div className={styles.sectionHeaderRow}>
            <span className={styles.sectionCategoryTitle}>
              EXPERIENCE &amp; EDUCATION
            </span>
            <h2 className={styles.sectionHeadline}>Proven Track Record</h2>
          </div>

          <div className={styles.timelineRows}>
            {TIMELINE.map((item) => (
              <div
                key={item.idx}
                data-row-idx={item.idx}
                className={`${styles.timelineRow} ${
                  revealedTimeline[item.idx] ? styles.timelineRowRevealed : ''
                }`}
              >
                <span className={styles.timelineIdx}>[ {item.idx} ]</span>

                <div className={styles.timelineOrgBlock}>
                  <h3 className={styles.timelineOrgName}>{item.org}</h3>
                  <span className={styles.timelinePeriod}>{item.period}</span>
                </div>

                <div className={styles.timelineRoleDesc}>
                  <span className={styles.timelineRole}>{item.role}</span>
                  <p className={styles.timelineDesc}>{item.description}</p>
                  <div className={styles.timelineTags}>
                    {item.tags.map((t) => (
                      <span key={t} className={styles.timelineTag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          7. SECTION: CONTACT ("GET IN TOUCH")
          ====================================================================== */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.giantTouchWrap}>
          <h2 className={styles.giantTouchTitle}>GET IN TOUCH</h2>
        </div>

        <div className={styles.contactLayout}>
          {/* Left Column: Direct Statement & Pitch */}
          <div className={styles.contactCol}>
            <p className={styles.contactPitch}>
              Lulusan S1 Sistem Informasi UPN Veteran Jawa Timur dengan predikat
              sangat memuaskan (IPK 3.69) &amp; alumni Bangkit 2024 Cloud
              Computing. Terbuka untuk kesempatan kerja full-time, proyek enterprise,
              atau kolaborasi rekayasa perangkat lunak.
            </p>

            <div className={styles.contactMetaBadge}>
              <span className={styles.statusDotLive} />
              <span>SURABAYA, JAWA TIMUR · SIAP BEKERJA SEGERA</span>
            </div>

            <a
              href="/CV_KANDHI_SURYA_ATMADJA.docx"
              download
              className={styles.cvDownloadBtn}
            >
              <Download size={18} /> DOWNLOAD RESUME (CV DOCX) ↗
            </a>
          </div>

          {/* Right Column: Direct Reach Out Hub (Zero Forms) */}
          <div className={styles.contactCol}>
            {/* 1. Direct WhatsApp Button */}
            <a
              href="https://wa.me/6282232601115?text=Halo%20Kandhi,%20saya%20tertarik%20dengan%20portofolio%20Anda"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactActionCardPrimary}
            >
              <div className={styles.cardActionInfo}>
                <span className={styles.cardActionLabel}>DIRECT WHATSAPP CHAT</span>
                <span className={styles.cardActionVal}>+62 822-3260-1115</span>
              </div>
              <ArrowUpRight size={24} className={styles.cardActionIcon} />
            </a>

            {/* 2. Direct Email Box with Click-to-Copy */}
            <div
              onClick={handleCopyEmail}
              className={styles.contactActionCard}
              role="button"
              tabIndex={0}
              title="Click to copy email"
            >
              <div className={styles.cardActionInfo}>
                <span className={styles.cardActionLabel}>EMAIL INQUIRY (CLICK TO COPY)</span>
                <span className={styles.cardActionVal}>kandhiatmadja@gmail.com</span>
              </div>
              <span className={styles.cardActionBadge}>
                {copiedEmail ? (
                  <>
                    <Check size={14} style={{ display: 'inline', marginRight: 4 }} />
                    COPIED!
                  </>
                ) : (
                  <>
                    <Copy size={14} style={{ display: 'inline', marginRight: 4 }} />
                    COPY
                  </>
                )}
              </span>
            </div>

            {/* 3. Direct Social Professional Cards */}
            <div className={styles.contactSocialGrid}>
              <a
                href="https://www.linkedin.com/in/kandhiatmadja"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactSocialTile}
              >
                <span>LINKEDIN</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="https://github.com/KandhiSurya"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactSocialTile}
              >
                <span>GITHUB</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <footer className={styles.footerBar}>
          <div className={styles.footerSocialLinks}>
            <a
              href="https://www.linkedin.com/in/kandhiatmadja"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/KandhiSurya"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://wa.me/6282232601115"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a href="mailto:kandhiatmadja@gmail.com">Email</a>
          </div>

          <span className={styles.footerCopyright}>
            KANDHI SURYA ATMADJA 2026© — ALL RIGHTS RESERVED
          </span>
        </footer>
      </section>
    </main>
  );
}
