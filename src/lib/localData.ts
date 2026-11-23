// Local Storage Data Provider for Portfolio Contact Messages
// Completely client-side, zero backend / Supabase dependencies required.

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

const CONTACT_KEY = 'contact_messages_local';

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
