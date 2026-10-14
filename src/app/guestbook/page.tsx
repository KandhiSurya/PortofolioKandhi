'use client';

import React, { useEffect, useState } from 'react';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { GuestbookEntry, getLocalGuestbook, saveLocalGuestbook } from '@/lib/localData';
import styles from './guestbook.module.css';

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMessages(getLocalGuestbook());
    setLoading(false);
  }, []);

  // Submit new message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 300));

    const updated = saveLocalGuestbook(name, comment);
    setMessages(updated);

    setName('');
    setComment('');
    setSubmitting(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.guestbook}>
      <div className={styles.glow}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Guestbook</h1>
          <p className={styles.subtitle}>Tinggalkan pesan, kritik, saran, atau sekadar sapaan hangat!</p>
        </div>

        <div className={styles.layout}>
          {/* Form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>
              <MessageSquare size={20} style={{ color: 'var(--accent)' }} /> Kirim Pesan
            </h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="gb-name" className={styles.label}>Nama Pengunjung</label>
                <input
                  type="text"
                  id="gb-name"
                  required
                  placeholder="Masukkan nama atau nama perusahaan Anda"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="gb-comment" className={styles.label}>Pesan</label>
                <textarea
                  id="gb-comment"
                  required
                  placeholder="Tulis pesan Anda di sini..."
                  className={`${styles.input} ${styles.textarea}`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button type="submit" disabled={submitting} className={styles.submitBtn}>
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Mengirim...
                  </>
                ) : (
                  <>
                    Kirim <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* List */}
          <div className={styles.messagesList}>
            <h2 className={styles.messagesHeader}>Semua Pesan ({messages.length})</h2>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <Loader2 size={24} className="animate-spin" style={{ color: 'var(--accent)', margin: '0 auto' }} />
              </div>
            ) : messages.length === 0 ? (
              <p className={styles.emptyState}>Belum ada pesan. Jadilah yang pertama mengirim!</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={styles.messageCard}>
                  <div className={styles.messageMeta}>
                    <span className={styles.messageName}>{msg.name}</span>
                    <span className={styles.messageDate}>{formatDate(msg.created_at)}</span>
                  </div>
                  <p className={styles.messageComment}>{msg.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
