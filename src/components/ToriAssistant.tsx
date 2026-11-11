import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Send, Sparkles, X } from "lucide-react";
import { Link } from "react-router";
import "./ToriAssistant.css";

type Phase = "flying" | "greeting" | "ready";
type Message = { role: "user" | "assistant"; text: string };
const visitKey = "torall-tori-introduced";
const quickQuestions = ["What can Torall build?", "How do I start?", "Can you customize my site?"];
// Replace this preview reply with approved basic answers when they are ready.
const setupReply = "I'm still getting ready for launch! For help right now, contact our team or explore the services below.";

function initialPhase(): Phase {
  try {
    if (sessionStorage.getItem(visitKey)) return "ready";
  } catch { /* The introduction also works when storage is unavailable. */ }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "greeting" : "flying";
}

export function ToriAssistant() {
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const skipMotion = () => {
      if (motion.matches) setPhase((current) => current === "flying" ? "greeting" : current);
    };
    motion.addEventListener("change", skipMotion);
    return () => { observer.disconnect(); motion.removeEventListener("change", skipMotion); };
  }, []);

  useEffect(() => {
    if (phase !== "flying") {
      try { sessionStorage.setItem(visitKey, "yes"); } catch { /* Optional visit memory. */ }
    }
  }, [phase]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (historyRef.current) historyRef.current.scrollTop = historyRef.current.scrollHeight;
  }, [messages]);

  const openChat = () => { setPhase("ready"); setOpen(true); };
  const closeChat = () => { setOpen(false); avatarRef.current?.focus(); };
  const ask = (question: string) => {
    const text = question.trim();
    if (!text) return;
    setMessages((current) => [...current.slice(-6), { role: "user", text }, { role: "assistant", text: setupReply }]);
    setDraft("");
  };

  return (
    <div ref={rootRef} className="tori-assistant" data-visible={visible} data-phase={phase}>
      <div
        className={`tori-pilot ${phase === "flying" && loaded ? "tori-flight" : ""}`}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && phase === "flying") setPhase("greeting");
        }}
      >
        <button ref={avatarRef} type="button" className="tori-avatar" onClick={openChat} disabled={phase === "flying"} aria-label="Chat with Tori, your website assistant" aria-expanded={open} aria-controls="tori-chat" style={{ visibility: loaded ? "visible" : "hidden" }}>
          <img src="/mascots/tori.webp" alt="" width="384" height="417" onLoad={() => setLoaded(true)} draggable={false} />
          {phase !== "flying" && !open && <span className="tori-avatar-label">Ask Tori <Sparkles size={10} aria-hidden="true" /></span>}
        </button>
      </div>

      {phase === "flying" && <button type="button" className="tori-skip" onClick={() => setPhase("greeting")}>Skip flight</button>}

      {phase === "greeting" && !open && <div className="tori-greeting">
        <button type="button" className="tori-dismiss" aria-label="Dismiss Tori introduction" onClick={() => setPhase("ready")}><X size={14} aria-hidden="true" /></button>
        <p className="tori-eyebrow">Your co-pilot has arrived</p>
        <p className="tori-hello" role="status">Hi, I’m Tori!<br /><span>I’m your website assistant.</span></p>
        <p className="tori-greeting-copy">I’m getting ready for launch. Come say hello!</p>
        <button type="button" className="tori-meet" onClick={openChat}>Meet Tori <ArrowUpRight size={14} aria-hidden="true" /></button>
      </div>}

      {open && visible && <section id="tori-chat" role="dialog" aria-label="Chat with Tori" className="tori-chat" onKeyDown={(event) => { if (event.key === "Escape") closeChat(); }}>
        <header className="tori-chat-header">
          <div className="tori-chat-identity"><img src="/mascots/tori.webp" alt="" width="40" height="44" /><div><h2>Tori<span className="tori-status-dot" /></h2><p>Your website assistant</p></div></div>
          <button type="button" aria-label="Close Tori chat" className="tori-close" onClick={closeChat}><X size={17} aria-hidden="true" /></button>
        </header>
        <div className="tori-chat-content" ref={historyRef} data-lenis-prevent>
          <div className="tori-message tori-message-assistant">Hi, I’m Tori, your website assistant! My quick answers are coming soon. For help today, you can reach the Torall team.</div>
          <p className="tori-preview-label">A few things we’ll explore</p>
          <div className="tori-questions">{quickQuestions.map((question) => <button key={question} type="button" onClick={() => ask(question)}>{question}<ArrowUpRight size={12} aria-hidden="true" /></button>)}</div>
          <div className="tori-messages" role="log" aria-live="polite" aria-relevant="additions">{messages.map((message, index) => <div className={`tori-message tori-message-${message.role}`} key={`${index}-${message.text}`}>{message.text}</div>)}</div>
        </div>
        <div className="tori-chat-links"><a href="#services-teaser" onClick={closeChat}>Explore services</a><Link to="/contact" onClick={closeChat}>Contact our team <ArrowUpRight size={12} aria-hidden="true" /></Link></div>
        <form className="tori-chat-form" onSubmit={(event) => { event.preventDefault(); ask(draft); }}>
          <label htmlFor="tori-question" className="sr-only">Your question for Tori</label>
          <input ref={inputRef} id="tori-question" value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={300} placeholder="Say hello to Tori…" autoComplete="off" />
          <button type="submit" aria-label="Send question to Tori" disabled={!draft.trim()}><Send size={16} aria-hidden="true" /></button>
        </form>
        <p className="tori-chat-note">Tori is getting ready. Quick answers are coming soon.</p>
      </section>}
    </div>
  );
}
