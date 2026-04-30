"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const LINK_REGEX = /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

function renderContent(content: string) {
  return content.split(LINK_REGEX).map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      const url = part.replace(/[.,!?:;]+$/, "");
      const trailing = part.slice(url.length);
      return (
        <Fragment key={i}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75 transition-opacity">
            {url}
          </a>
          {trailing}
        </Fragment>
      );
    }
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className="underline underline-offset-2 hover:opacity-75 transition-opacity">
          {part}
        </a>
      );
    }
    return part;
  });
}

const SUGGESTED_QUESTIONS = [
  "What's your biggest engineering win?",
  "What stack do you work with daily?",
  "What kind of role are you looking for?",
  "Tell me something fun about Nikhil",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! I'm an AI that knows everything about Nikhil. Ask me about his projects, tech stack, career background, or what kind of roles he's looking for. What would you like to know?",
        },
      ]);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setShowSuggestions(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (data.message) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I ran into an issue. Feel free to reach out to Nikhil directly at nikhilendra7@gmail.com!",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops, something went wrong. You can always reach Nikhil at nikhilendra7@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Responsive panel styles
  const panelStyle: React.CSSProperties = isMobile
    ? { maxHeight: "70vh" }
    : { maxHeight: "520px" };

  const panelPositionClass = isMobile
    ? "fixed bottom-20 left-4 right-4 z-[150] w-auto max-w-full"
    : "fixed bottom-24 right-6 z-[150] w-[360px] max-w-[calc(100vw-2rem)]";

  const panelMotion = prefersReduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 20, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 20, scale: 0.97 }, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            {...panelMotion}
            role="dialog"
            aria-modal="true"
            aria-label="Chat with AI about Nikhil"
            className={`${panelPositionClass} bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden flex flex-col`}
            style={panelStyle}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="w-8 h-8 rounded-full bg-[#3B5BDB] flex items-center justify-center text-white text-xs font-display font-bold"
                >
                  NR
                </div>
                <div>
                  <div className="text-sm font-display font-bold text-zinc-900 leading-none">
                    Ask about Nikhil
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-xs text-zinc-600 font-mono">
                      AI · Powered by Claude
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 text-sm transition-colors"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0" aria-live="polite" aria-label="Chat messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] text-sm leading-relaxed px-4 py-2.5 rounded-2xl break-words ${
                      msg.role === "user"
                        ? "bg-[#3B5BDB] text-white rounded-br-sm"
                        : "bg-zinc-50 border border-zinc-100 text-zinc-800 rounded-bl-sm"
                    }`}
                  >
                    {renderContent(msg.content)}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start" aria-label="AI is typing">
                  <div className="bg-zinc-50 border border-zinc-100 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested questions */}
              {showSuggestions && messages.length === 1 && (
                <div className="flex flex-col gap-2 pt-1" role="group" aria-label="Suggested questions">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left text-xs text-[#3B5BDB] border border-[#C5D0FA] bg-[#EEF2FF] px-3 py-2 rounded-xl hover:bg-[#e0e7ff] transition-colors duration-150 leading-snug"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-zinc-100 flex-shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={loading}
                aria-label="Type your message"
                style={{ fontSize: "16px" }}
                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 focus:border-[#3B5BDB] focus:bg-white transition-all duration-200 placeholder:text-zinc-400 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="w-9 h-9 bg-[#3B5BDB] hover:bg-[#2C44B8] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors duration-200 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-[#3B5BDB] focus-visible:ring-offset-2"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M1 7h12M7 1l6 6-6 6"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        className={`fixed bottom-6 right-6 z-[150] w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 ${
          open
            ? "bg-zinc-800 hover:bg-zinc-900"
            : "bg-[#3B5BDB] hover:bg-[#2C44B8]"
        }`}
        whileHover={prefersReduced ? {} : { scale: 1.05 }}
        whileTap={prefersReduced ? {} : { scale: 0.95 }}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={prefersReduced ? { opacity: 1 } : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.15 }}
              className="text-white text-xl leading-none"
              aria-hidden="true"
            >
              ×
            </motion.span>
          ) : (
            <motion.svg
              key="chat"
              initial={prefersReduced ? { opacity: 1 } : { scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { scale: 0.7, opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.15 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="11" r="1" fill="white" />
              <circle cx="12" cy="11" r="1" fill="white" />
              <circle cx="15" cy="11" r="1" fill="white" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip (first visit) */}
      <AnimatePresence>
        {!open && (
          <motion.div
            aria-hidden="true"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={prefersReduced ? { duration: 0 } : { delay: 2, duration: 0.4 }}
            className="fixed bottom-8 right-24 z-[149] bg-zinc-900 text-white text-xs font-mono px-3 py-2 rounded-xl pointer-events-none whitespace-nowrap"
          >
            Ask me about Nikhil ✨
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-zinc-900 border-y-[5px] border-y-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
