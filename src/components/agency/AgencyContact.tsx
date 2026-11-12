import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { ArrowRight, ArrowUpRight, Check, Copy, Download, Paperclip, X } from 'lucide-react';
import { getService, services } from '@/data/services';

function base64(bytes: Uint8Array) {
  let binary = '';
  for (let start = 0; start < bytes.length; start += 8192) binary += String.fromCharCode(...bytes.subarray(start, start + 8192));
  return btoa(binary);
}
const encoded = (text: string) => base64(new TextEncoder().encode(text));
const wrapped = (text: string) => text.match(/.{1,76}/g)?.join('\r\n') || '';

export function AgencyContact({ standalone = false }: { standalone?: boolean }) {
  const [params] = useSearchParams();
  const [interest, setInterest] = useState(() => getService(params.get('service') || '')?.title || 'Let’s explore an idea');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [prepared, setPrepared] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'manual'>('idle');
  const [draftState, setDraftState] = useState<'idle' | 'preparing' | 'downloaded' | 'error'>('idle');
  const resultRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const brief = `Hello Torall Ventures,\n\nI'm interested in: ${interest}\n\n${message.trim()}\n\nName: ${name.trim()}\nCompany: ${company.trim() || 'Not specified'}\nReply to: ${email.trim()}${phone.trim() ? `\nPhone: ${phone.trim()}` : ''}${file ? `\nSupporting file: ${file.name}` : ''}`;
  const subject = `Project inquiry — ${interest}`;
  const mailto = `mailto:info@torallventures.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;

  useEffect(() => {
    if (prepared) {
      resultRef.current?.focus({ preventScroll: true });
      resultRef.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
  }, [prepared]);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2 || message.trim().length < 10) {
      const field = event.currentTarget.elements.namedItem(name.trim().length < 2 ? 'name' : 'message') as HTMLInputElement;
      field.setCustomValidity(name.trim().length < 2 ? 'Please enter at least two characters for your name.' : 'Please add a little more detail about your project.');
      field.reportValidity();
      return;
    }
    if (fileError) return;
    setPrepared(true);
    setCopyState('idle');
    setDraftState('idle');
  }

  async function copyBrief() {
    try { await navigator.clipboard.writeText(brief); setCopyState('copied'); }
    catch { setCopyState('manual'); }
  }

  async function downloadDraft() {
    setDraftState('preparing');
    try {
      const boundary = `torall-${crypto.randomUUID()}`;
      const headers = [`To: info@torallventures.com`, `Reply-To: ${email.trim().replace(/[\r\n]/g, '')}`, `Subject: =?UTF-8?B?${encoded(subject)}?=`, 'MIME-Version: 1.0', 'X-Unsent: 1'];
      const textPart = `Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${wrapped(encoded(brief))}`;
      let content: string;
      if (file) {
        const safeName = file.name.replace(/[\r\n"\\]/g, '_');
        headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
        const data = wrapped(base64(new Uint8Array(await file.arrayBuffer())));
        content = `${headers.join('\r\n')}\r\n\r\n--${boundary}\r\n${textPart}\r\n--${boundary}\r\nContent-Type: application/octet-stream\r\nContent-Disposition: attachment; filename*=UTF-8''${encodeURIComponent(safeName)}\r\nContent-Transfer-Encoding: base64\r\n\r\n${data}\r\n--${boundary}--\r\n`;
      } else content = `${headers.join('\r\n')}\r\n${textPart}\r\n`;
      const url = URL.createObjectURL(new Blob([content], { type: 'message/rfc822' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Torall-project-inquiry.eml';
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 10000);
      setDraftState('downloaded');
    } catch { setDraftState('error'); }
  }

  const title = standalone ? <h1 className="agency-heading">Let’s build<br />something great.</h1> : <h2 className="agency-heading">Get in touch</h2>;
  return <section id="get-in-touch" className={`agency-contact ${standalone ? 'is-standalone' : ''}`}><div className="agency-container">
    {title}
    <p className="agency-contact-intro">A new idea, a better website, or a system that finally fits. <a href="mailto:info@torallventures.com">info@torallventures.com</a></p>
    {prepared ? <div ref={resultRef} tabIndex={-1} className="agency-inquiry-ready">
      <Check className="inquiry-check" aria-hidden="true"/><h2>Your next chapter is ready to send.</h2>
      <p>Review your project inquiry in your email app, then send it to Torall. Nothing has been sent yet.</p>
      <div className="agency-inquiry-actions"><a className="agency-pill is-solid" href={mailto}>Open email app <ArrowUpRight aria-hidden="true"/></a><button type="button" className="agency-pill" disabled={draftState === 'preparing'} onClick={() => void downloadDraft()}>{draftState === 'preparing' ? 'Preparing…' : 'Download email draft'} <Download aria-hidden="true"/></button><button type="button" className="agency-pill" onClick={() => void copyBrief()}>{copyState === 'copied' ? 'Copied' : 'Copy project brief'} <Copy aria-hidden="true"/></button></div>
      {file && <p className="agency-form-note">Your downloaded email draft includes <strong>{file.name}</strong>. If you use “Open email app” or webmail instead, attach the file before sending.</p>}
      <p role="status" className="agency-form-note">{draftState === 'downloaded' ? 'The .eml draft is downloaded. Open it in a compatible email app, review, and send.' : draftState === 'error' ? 'The draft could not be created. Open your email app or copy the brief instead.' : copyState === 'copied' ? 'Paste the brief into an email to info@torallventures.com.' : copyState === 'manual' ? 'Select and copy the brief below.' : 'Prefer webmail? Copy the brief and paste it into your email.'}</p>
      {copyState === 'manual' && <textarea aria-label="Prepared project brief" value={brief} readOnly rows={10}/>}
      <button type="button" className="agency-text-link" onClick={() => setPrepared(false)}>Edit your details <ArrowRight aria-hidden="true"/></button>
    </div> : <form className="agency-inquiry-form" onSubmit={prepare}>
      <div><label htmlFor="inquiry-name">Name <small>(Required)</small></label><input id="inquiry-name" name="name" placeholder="Your name" value={name} onChange={e => { e.target.setCustomValidity(''); setName(e.target.value); }} required minLength={2} maxLength={100} autoComplete="name"/></div>
      <div><label htmlFor="inquiry-company">Company</label><input id="inquiry-company" name="company" placeholder="Your business" value={company} onChange={e => setCompany(e.target.value)} maxLength={150} autoComplete="organization"/></div>
      <div><label htmlFor="inquiry-phone">Phone number <small>(Optional)</small></label><input id="inquiry-phone" name="phone" type="tel" placeholder="(000) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} maxLength={40} autoComplete="tel"/></div>
      <div><label htmlFor="inquiry-email">Email <small>(Required)</small></label><input id="inquiry-email" name="email" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required maxLength={180} autoComplete="email"/></div>
      <div><label htmlFor="inquiry-interest">What can we help with?</label><select id="inquiry-interest" name="interest" value={interest} onChange={e => setInterest(e.target.value)}><option>Let’s explore an idea</option>{services.map(service => <option key={service.slug}>{service.title}</option>)}</select></div>
      <div><label htmlFor="inquiry-file">Supporting docs / project brief</label><div className="agency-file-control"><Paperclip aria-hidden="true"/><input ref={fileRef} id="inquiry-file" type="file" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" aria-describedby="file-guidance" onChange={event => {
        const chosen = event.target.files?.[0] || null;
        if (chosen && chosen.size > 8 * 1024 * 1024) { setFileError('Please choose a file smaller than 8 MB.'); setFile(null); event.target.value = ''; }
        else { setFile(chosen); setFileError(''); }
      }}/>{file && <button type="button" aria-label="Remove supporting file" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ''; }}><X aria-hidden="true"/></button>}</div><p id="file-guidance" className="agency-form-note">Up to 8 MB. Included in your email draft; never uploaded here.</p>{fileError && <p role="alert" className="agency-form-error">{fileError}</p>}</div>
      <div className="agency-message-field"><label htmlFor="inquiry-message">Tell us what you have in mind <small>(Required)</small></label><textarea id="inquiry-message" name="message" placeholder="Your idea, your priorities, and what success would look like…" rows={4} required minLength={10} maxLength={2000} value={message} onChange={e => { e.target.setCustomValidity(''); setMessage(e.target.value); }}/><p className="agency-form-note">{message.length} of 2,000 characters</p></div>
      <div className="agency-form-submit"><button className="agency-pill" type="submit">Prepare project email <ArrowUpRight aria-hidden="true"/></button><p className="agency-form-note">You review and send from your email app.</p></div>
    </form>}
  </div></section>;
}
