// Local Storage Data Provider for Portfolio
// Completely client-side, zero backend / Supabase dependencies required.

export type GuestbookEntry = {
  id: string;
  name: string;
  comment: string;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

const GUESTBOOK_KEY = 'guestbook_messages_local';
const CONTACT_KEY = 'contact_messages_local';

export const INITIAL_GUESTBOOK_DATA: GuestbookEntry[] = [
  {
    id: 'msg-1',
    name: 'Budi Santoso (Senior Software Engineer)',
    comment: 'Portofolio arsitektur sistem yang sangat terstruktur dan rapi. Pengalaman di Bangkit 2024 dan sistem informasi bansos sangat relevan dengan industri modern!',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'msg-2',
    name: 'Dewi Lestari (Dosen Pembimbing UPNVJT)',
    comment: 'Kombinasi kompetensi Sistem Informasi, Cloud Computing, dan Machine Learning yang sangat solid. Sukses selalu untuk karirmu, Kandhi!',
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
  {
    id: 'msg-3',
    name: 'Rian Pratama (Tech Recruiter)',
    comment: 'Desain editorial yang clean, responsif, dan performa website-nya sangat cepat. Portofolio berbobot teknis tinggi!',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];

export function getLocalGuestbook(): GuestbookEntry[] {
  if (typeof window === 'undefined') return INITIAL_GUESTBOOK_DATA;
  try {
    const raw = localStorage.getItem(GUESTBOOK_KEY);
    if (!raw) {
      localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(INITIAL_GUESTBOOK_DATA));
      return INITIAL_GUESTBOOK_DATA;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_GUESTBOOK_DATA;
  }
}

export function saveLocalGuestbook(name: string, comment: string): GuestbookEntry[] {
  const current = getLocalGuestbook();
  const newEntry: GuestbookEntry = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `msg-${Date.now()}`,
    name: name.trim(),
    comment: comment.trim(),
    created_at: new Date().toISOString(),
  };
  const updated = [newEntry, ...current];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save guestbook locally:', e);
    }
  }
  return updated;
}

export function saveLocalContact(name: string, email: string, message: string): ContactMessage {
  const newMsg: ContactMessage = {
    id: `contact-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    created_at: new Date().toISOString(),
  };
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(CONTACT_KEY);
      const existing = raw ? JSON.parse(raw) : [];
      localStorage.setItem(CONTACT_KEY, JSON.stringify([newMsg, ...existing]));
    } catch (e) {
      console.error('Failed to save contact message locally:', e);
    }
  }
  return newMsg;
}
