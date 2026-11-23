'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Pause, Play, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMotionPaused, setIsMotionPaused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check saved motion preference
    const storedMotion = localStorage.getItem('motion_preference');
    if (storedMotion === 'paused') {
      setIsMotionPaused(true);
      document.documentElement.setAttribute('data-motion', 'paused');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMotion = () => {
    const nextState = !isMotionPaused;
    setIsMotionPaused(nextState);
    if (nextState) {
      document.documentElement.setAttribute('data-motion', 'paused');
      localStorage.setItem('motion_preference', 'paused');
    } else {
      document.documentElement.removeAttribute('data-motion');
      localStorage.setItem('motion_preference', 'normal');
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`${styles.siteHeader} ${isScrolled ? styles.headerScrolled : ''}`}>
      <nav className={styles.navbarShell} aria-label="Main navigation">
        {/* Brand / Logo */}
        <Link href="/" className={styles.brand} onClick={closeMenu}>
          <span className={styles.statusDot} title="Available for engineering opportunities" />
          <span className={styles.brandName}>KANDHI SURYA</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className={styles.navbarLinks}>
          <Link href="#hero" className={styles.navGhost}>
            Home
          </Link>
          <Link href="#about" className={styles.navGhost}>
            About
          </Link>
          <Link href="#skills" className={styles.navGhost}>
            Skills
          </Link>
          <Link href="#projects" className={styles.navGhost}>
            Projects
          </Link>
          <Link href="#experience" className={styles.navGhost}>
            Experience
          </Link>
          <Link href="#contact" className={styles.navGhost}>
            Contact
          </Link>
        </div>

        {/* Action Tools */}
        <div className={styles.navbarTools}>
          {/* Motion Pause Toggle */}
          <button
            type="button"
            onClick={toggleMotion}
            className={styles.toolBtn}
            aria-label={isMotionPaused ? 'Play animations' : 'Pause animations'}
            title={isMotionPaused ? 'Resume animations' : 'Pause animations'}
          >
            {isMotionPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className={styles.toolBtn}
            aria-label="Switch theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Let's Talk CTA */}
          <a
            href="https://wa.me/6282232601115?text=Halo%20Kandhi,%20saya%20tertarik%20dengan%20portofolio%20Anda"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.headerCta}
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight size={15} />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={toggleMenu}
            className={styles.menuTrigger}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <aside className={styles.mobileOverlay}>
          <div className={styles.mobileHeader}>
            <span className={styles.mobileBrand}>KANDHI SURYA ATMADJA // MENU</span>
            <button onClick={closeMenu} className={styles.mobileCloseBtn} aria-label="Close Menu">
              <X size={18} /> Close
            </button>
          </div>

          <nav className={styles.mobileLinks}>
            <Link href="#hero" className={styles.mobileLink} onClick={closeMenu}>
              <span className={styles.linkNum}>01</span>
              <span>Home</span>
            </Link>
            <Link href="#about" className={styles.mobileLink} onClick={closeMenu}>
              <span className={styles.linkNum}>02</span>
              <span>About</span>
            </Link>
            <Link href="#skills" className={styles.mobileLink} onClick={closeMenu}>
              <span className={styles.linkNum}>03</span>
              <span>Skills &amp; Capabilities</span>
            </Link>
            <Link href="#projects" className={styles.mobileLink} onClick={closeMenu}>
              <span className={styles.linkNum}>04</span>
              <span>Selected Projects</span>
            </Link>
            <Link href="#experience" className={styles.mobileLink} onClick={closeMenu}>
              <span className={styles.linkNum}>05</span>
              <span>Experience &amp; Education</span>
            </Link>
            <Link href="#contact" className={styles.mobileLink} onClick={closeMenu}>
              <span className={styles.linkNum}>06</span>
              <span>Get in Touch</span>
            </Link>
          </nav>

          <div className={styles.mobileFooter}>
            <div className={styles.mobileSocials}>
              <a href="https://www.linkedin.com/in/kandhiatmadja" target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
              <a href="https://github.com/KandhiSurya" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <a href="mailto:kandhiatmadja@gmail.com">Email ↗</a>
              <a href="/CV_Kandhi_Surya_Atmadja.pdf" target="_blank" rel="noopener noreferrer" download="CV_Kandhi_Surya_Atmadja.pdf">
                Resume PDF ↗
              </a>
            </div>
            <p className={styles.mobileFootnote}>SURABAYA, JAWA TIMUR · INDONESIA</p>
          </div>
        </aside>
      )}
    </header>
  );
}
