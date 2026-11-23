'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, ArrowUp, Mail, PhoneCall } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import styles from './Footer.module.css';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kandhiatmadja@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className={styles.storyFooter}>
      <div className={styles.footerContent}>
        <div className={styles.labelUppercase}>NEXT VENTURE</div>
        <h2 className={styles.footerHeading}>
          <span>Your next project</span>
          <span>starts here.</span>
        </h2>
        <p className={styles.footerDescription}>
          From government enterprise platforms to intelligent AI services and distributed cloud backends,
          let&apos;s turn your next challenge into a reliable, high-performance solution.
        </p>

        {/* Primary CTA Button */}
        <a
          href="https://wa.me/6282232601115?text=Hello%20Kandhi,%20I%20am%20interested%20in%20discussing%20a%20project%20with%20you"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.projectCta}
        >
          <span>Discuss a project</span>
          <ArrowUpRight size={19} />
        </a>

        {/* Email Pill with 1-Click Copy */}
        <div className={styles.emailRow}>
          <a href="mailto:kandhiatmadja@gmail.com" className={styles.emailLink}>
            <span>kandhiatmadja@gmail.com</span>
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className={styles.copyBtn}
            title="Click to copy email address"
          >
            {copied ? (
              <>
                <Check size={14} className={styles.copyIcon} />
                <span>Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy size={14} className={styles.copyIcon} />
                <span>Copy email</span>
              </>
            )}
          </button>
        </div>

        {/* Social Chips & Sub-navigation */}
        <div className={styles.socialRow}>
          <a
            href="https://www.linkedin.com/in/kandhiatmadja"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialChip}
          >
            <LinkedinIcon size={16} />
            <span>LinkedIn</span>
            <ArrowUpRight size={12} />
          </a>
          <a
            href="https://github.com/KandhiSurya"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialChip}
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
            <ArrowUpRight size={12} />
          </a>
          <a
            href="https://wa.me/6282232601115"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialChip}
          >
            <PhoneCall size={16} />
            <span>WhatsApp</span>
            <ArrowUpRight size={12} />
          </a>
          <a
            href="/CV_Kandhi_Surya_Atmadja.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="CV_Kandhi_Surya_Atmadja.pdf"
            className={styles.socialChip}
          >
            <span>Resume (PDF)</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.brandCol}>
            <span className={styles.brandTitle}>Kandhi Surya Atmadja</span>
            <span className={styles.brandSub}>
              Full Stack Web &amp; Mobile Developer · UPN &ldquo;Veteran&rdquo; Jawa Timur · Surabaya, ID
            </span>
          </div>

          <div className={styles.copyrightCol}>
            <span>&copy; {currentYear} Kandhi Surya. Designed &amp; Engineered with precision.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className={styles.backToTop}
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
