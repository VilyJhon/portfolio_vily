import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, ArrowUpRight, Check, Copy, Mail, RotateCcw, Scissors, Send, X } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface ContactSectionProps {
  inquiryOpen: boolean;
  onSetInquiryOpen: (open: boolean) => void;
  prefilledTopic?: string;
}

const TOPICS = [
  'Website / Landing Page',
  'Student Collaboration',
  'Frontend Help',
  'General Question',
];

export default function ContactSection({
  inquiryOpen,
  onSetInquiryOpen,
  prefilledTopic,
}: ContactSectionProps) {
  const [stubDetached, setStubDetached] = useState(false);
  const [copied, setCopied] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [statusMessage, setStatusMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );

  useEffect(() => {
    if (prefilledTopic) {
      setMessage(`Hi Vily, I saw your "${prefilledTopic}" project and would love to chat about `);
    }
  }, [prefilledTopic]);

  useEffect(() => {
    if (!inquiryOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSetInquiryOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [inquiryOpen, onSetInquiryOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleOpenTicket = () => {
    setStubDetached(true);
    setTimeout(() => {
      onSetInquiryOpen(true);
    }, 260);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const nextErrors: { name?: string; email?: string; message?: string } = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (message.trim().length < 10) {
      nextErrors.message = 'Please write at least 10 characters so I know how to help.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`[Portfolio · ${topic}] Message from ${name.trim()}`);
    const body = encodeURIComponent(
      `From: ${name.trim()} (${email.trim()})\nTopic: ${topic}\n\n${message.trim()}`
    );

    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setStatusMessage({
      type: 'ok',
      text: `Your email app should open with your message ready to send to ${PROFILE.email}. If it does not open, copy the address directly.`,
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <section
        id="contact"
        className="relative z-10 border-t border-zinc-200/80 py-20 sm:py-28 dark:border-zinc-800/80"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono-num text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
            05. Ready to Collaborate?
          </p>
          <h2 className="font-display mx-auto mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
            Let&apos;s build something <span className="font-normal text-zinc-500 dark:text-zinc-400">useful</span> together
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Have a question, an idea, or a student project to collaborate on? Tear the pass stub
            below to open the inquiry form, or write directly.
          </p>

          {/* Interactive Two-Part Collaboration Pass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-10 max-w-xl"
          >
            <div className="relative flex flex-col items-stretch overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left shadow-lg sm:flex-row dark:border-zinc-800 dark:bg-[#0b0b0e]">
              {/* Main Ticket Left */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-mono-num">PASS · 2026</span>
                  <span>Manila, PH</span>
                </div>

                <div className="my-5">
                  <div className="font-display text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                    {PROFILE.fullName}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Project Collaboration · Web Builds · Learning
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-200/80 pt-3 text-xs text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
                  <span>{PROFILE.email}</span>
                  <span className="font-mono-num">{PROFILE.handle}</span>
                </div>
              </div>

              {/* Perforated Tear Divider */}
              <div className="relative flex items-center justify-center border-t border-dashed border-zinc-300 sm:border-t-0 sm:border-l dark:border-zinc-700">
                <span
                  aria-hidden="true"
                  className="hidden h-4 w-4 -translate-y-1/2 rounded-full bg-[#f8f8fa] sm:absolute sm:-top-0 sm:-left-2 sm:block dark:bg-[#050505]"
                />
                <span
                  aria-hidden="true"
                  className="hidden h-4 w-4 translate-y-1/2 rounded-full bg-[#f8f8fa] sm:absolute sm:-bottom-0 sm:-left-2 sm:block dark:bg-[#050505]"
                />
              </div>

              {/* Interactive Detachable Stub */}
              <motion.button
                type="button"
                onClick={handleOpenTicket}
                animate={
                  stubDetached
                    ? { x: 14, rotate: 4, opacity: 0.55 }
                    : { x: 0, rotate: 0, opacity: 1 }
                }
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-row items-center justify-between gap-3 bg-zinc-50 p-6 text-left transition-colors hover:bg-zinc-100 sm:w-44 sm:flex-col sm:items-start dark:bg-zinc-900/60 dark:hover:bg-zinc-900"
              >
                <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <Scissors className="h-3.5 w-3.5" />
                  <span>Tear Stub</span>
                </div>

                <div>
                  <div className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    Admit One
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                    Open message form
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Direct Action Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-xs font-medium text-zinc-800 transition-colors hover:border-zinc-950 whitespace-nowrap shrink-0 dark:border-zinc-800 dark:bg-[#0b0b0e] dark:text-zinc-200 dark:hover:border-zinc-500"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied {PROFILE.email}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>{PROFILE.email}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onSetInquiryOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 whitespace-nowrap shrink-0 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Send Interactive Message</span>
            </button>

            {stubDetached && (
              <button
                type="button"
                onClick={() => setStubDetached(false)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Restore Ticket</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Clean Minimal Footer */}
      <footer className="relative z-10 border-t border-zinc-200/80 py-10 dark:border-zinc-800/80">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <div>
            <div className="font-display text-base font-semibold text-zinc-950 dark:text-zinc-50">
              {PROFILE.fullName}
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} {PROFILE.fullName}. Built in Manila, Philippines.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#work" className="hover:text-zinc-950 dark:hover:text-zinc-100">
              Work
            </a>
            <a href="#stack" className="hover:text-zinc-950 dark:hover:text-zinc-100">
              Stack
            </a>
            <a href="#journey" className="hover:text-zinc-950 dark:hover:text-zinc-100">
              Journey
            </a>
            {PROFILE.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1 hover:text-zinc-950 dark:hover:text-zinc-100"
              >
                <span>{s.label}</span>
                <ArrowUpRight className="h-3 w-3 opacity-70" />
              </a>
            ))}
          </nav>
        </div>
      </footer>

      {/* Direct Inquiry Modal */}
      <AnimatePresence>
        {inquiryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs sm:p-6"
            onClick={() => onSetInquiryOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-zinc-800 dark:bg-[#0b0b0e]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Direct Inquiry
                  </p>
                  <h3
                    id="inquiry-modal-title"
                    className="font-display mt-1 text-3xl font-semibold text-zinc-950 dark:text-zinc-50"
                  >
                    Start a conversation
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onSetInquiryOpen(false)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                  aria-label="Close inquiry modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      aria-invalid={Boolean(errors.name)}
                      className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 outline-none transition-colors focus:border-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-300"
                    />
                    {errors.name && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      aria-invalid={Boolean(errors.email)}
                      className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 outline-none transition-colors focus:border-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-300"
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Topic
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {TOPICS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTopic(item)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          topic === item
                            ? 'border-zinc-950 bg-zinc-950 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950'
                            : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share what you're building, a question, or how we can collaborate..."
                    aria-invalid={Boolean(errors.message)}
                    className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 outline-none transition-colors focus:border-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-300"
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {statusMessage && (
                  <div
                    role="status"
                    className={`rounded-lg border p-3.5 text-xs leading-relaxed ${
                      statusMessage.type === 'ok'
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
                        : 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200'
                    }`}
                  >
                    {statusMessage.text}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Opens in your default mail client ({PROFILE.email})
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
