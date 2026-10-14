'use client';

import React from 'react';
import { Mail, PhoneCall } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Kandhi<span className={styles.logoDot}>.si</span>
        </div>
        <p className={styles.text}>
          Fresh Graduate Sistem Informasi • UPN Veteran Jawa Timur
        </p>

        <div className={styles.socials}>
          <a
            href="https://www.linkedin.com/in/kandhiatmadja"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="https://github.com/KandhiSurya"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="mailto:kandhiatmadja@gmail.com"
            className={styles.socialLink}
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://wa.me/6282232601115"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="WhatsApp"
          >
            <PhoneCall size={18} />
          </a>
        </div>

        <p className={styles.copyright}>
          &copy; {currentYear} Kandhi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
