import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { ArrowRight, ArrowUpRight, CheckCircle2, Copy } from 'lucide-react';
import { services } from '@/data/services';

type Field = 'name' | 'email' | 'message';
type Errors = Partial<Record<Field, string>>;

export function StudioContact() {
  const [params] = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(() => services.some(item => item.slug === params.get('service')) ? params.get('service')! : '');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [showCopy, setShowCopy] = useState(false);
  const readyRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const copyRef = useRef<HTMLTextAreaElement>(null);
  const dirty = !!(name || email || company || message);
  useEffect(() => {
    if (!dirty || ready) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty, ready]);
  useEffect(() => { if (ready) readyRef.current?.focus(); }, [ready]);
  useEffect(() => { if (showCopy) { copyRef.current?.focus(); copyRef.current?.select(); } }, [showCopy]);

  const projectType = services.find(item => item.slug === service)?.title || 'A project to discuss';
  const subject = `Project inquiry: ${projectType}`;
  const brief = `Hello Torall,\n\n${message.trim()}\n\nName: ${name.trim()}\nEmail: ${email.trim()}${company.trim() ? `\nCompany: ${company.trim()}` : ''}\nInterested in: ${projectType}`;
  const mailto = `mailto:info@torallventures.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Enter your name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address, such as name@company.com.';
    if (message.trim().length < 10) next.message = 'Add a little more detail (at least 10 characters).';
    setErrors(next);
    const first = (['name', 'email', 'message'] as const).find(field => next[field]);
    if (first) { formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    setReady(true);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(`${subject}\n\n${brief}`); setCopyStatus('Project details copied. Paste them into an email to info@torallventures.com.'); }
    catch { setShowCopy(true); setCopyStatus('Select and copy your details below, then paste them into your email.'); }
  };

  return <section className="studio-contact studio-wrap"><div className="studio-contact-heading"><div><p className="studio-label">Start a conversation</p><h1>Tell us what<br/>you have in mind.</h1></div><p>Something new to build, or something that could work better. We’d like to hear about it.</p></div><div className="studio-contact-grid"><aside className="studio-contact-info"><a href="mailto:info@torallventures.com">info@torallventures.com <ArrowUpRight aria-hidden="true"/></a><a href="tel:+12136065711">+1 (213) 606-5711 <ArrowUpRight aria-hidden="true"/></a><p>Florida, USA<br/>Working with businesses and communities everywhere.</p><h2>A useful first conversation.</h2><ol><li>Tell us about your business and who the project is for.</li><li>Share what needs to work better and what matters most.</li><li>We’ll discuss the possibilities and agree on a next step.</li></ol></aside>
    {ready ? <div className="studio-contact-ready"><CheckCircle2 aria-hidden="true"/><h2 tabIndex={-1} ref={readyRef}>Your introduction is ready.</h2><p>Open your email app to review and send it to Torall. Nothing has been sent yet.</p><div className="studio-actions"><a href={mailto} className="studio-button">Open email app <ArrowUpRight aria-hidden="true"/></a><button type="button" className="studio-link" onClick={() => void copy()}>Copy project details <Copy aria-hidden="true"/></button></div><p role="status" className="studio-form-note">{copyStatus}</p>{showCopy && <textarea ref={copyRef} readOnly value={`${subject}\n\n${brief}`} aria-label="Project details to copy"/>}<button className="studio-link" type="button" onClick={() => { setReady(false); setCopyStatus(''); setShowCopy(false); }}>Edit your details <ArrowRight aria-hidden="true"/></button></div> :
      <form ref={formRef} className="studio-form" onSubmit={submit} noValidate><div className="studio-form-row"><div className="studio-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" value={name} onChange={event => setName(event.target.value)} autoComplete="name" required minLength={2} maxLength={100} placeholder="Alex Morgan…" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'error-name' : undefined}/>{errors.name && <p className="studio-error" id="error-name" role="alert">{errors.name}</p>}</div><div className="studio-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" spellCheck={false} required maxLength={254} placeholder="alex@company.com…" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'error-email' : undefined}/>{errors.email && <p className="studio-error" id="error-email" role="alert">{errors.email}</p>}</div></div><div className="studio-form-row"><div className="studio-field"><label htmlFor="contact-company">Company <span>(optional)</span></label><input id="contact-company" name="company" value={company} onChange={event => setCompany(event.target.value)} autoComplete="organization" maxLength={150} placeholder="Your business or community…"/></div><div className="studio-field"><label htmlFor="contact-service">What are you exploring?</label><select id="contact-service" name="service" value={service} onChange={event => setService(event.target.value)}><option value="">Let’s figure it out</option>{services.map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></div></div><div className="studio-field"><label htmlFor="contact-message">A little about your project</label><textarea id="contact-message" name="message" value={message} onChange={event => setMessage(event.target.value)} required minLength={10} maxLength={1800} rows={6} placeholder="What would you like to build or improve? Share your priorities, audience, and any timing you have in mind…" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'error-message' : undefined}/>{errors.message && <p className="studio-error" id="error-message" role="alert">{errors.message}</p>}</div><button type="submit" className="studio-button">Prepare project email <ArrowUpRight aria-hidden="true"/></button><p className="studio-form-note">Your details stay in this browser until you send them using your email app. Prefer to write directly? Email info@torallventures.com.</p></form>}
  </div></section>;
}
