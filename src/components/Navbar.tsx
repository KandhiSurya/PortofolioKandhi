'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isGuestbook = pathname === '/guestbook';

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const getLinkHref = (anchor: string) => {
    return isGuestbook ? `/${anchor}` : anchor;
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          Kandhi<span className={styles.logoDot}>.si</span>
        </Link>

        <nav className={`${styles.navLinks} ${isOpen ? styles.navLinksActive : ''}`}>
          <Link href={getLinkHref('#home')} className={styles.navLink} onClick={closeMenu}>
            Home
          </Link>
          <Link href={getLinkHref('#about')} className={styles.navLink} onClick={closeMenu}>
            About
          </Link>
          <Link href={getLinkHref('#skills')} className={styles.navLink} onClick={closeMenu}>
            Skills
          </Link>
          <Link href={getLinkHref('#projects')} className={styles.navLink} onClick={closeMenu}>
            Projects
          </Link>
          <Link href={getLinkHref('#experience')} className={styles.navLink} onClick={closeMenu}>
            Experience
          </Link>
          <Link href={getLinkHref('#contact')} className={styles.navLink} onClick={closeMenu}>
            Contact
          </Link>
          <Link href="/guestbook" className={styles.guestbookBtn} onClick={closeMenu}>
            Guestbook
          </Link>
        </nav>

        <div className={styles.actions}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={toggleMenu}
            className={styles.menuToggle}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
