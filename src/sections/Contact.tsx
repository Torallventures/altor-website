import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArrowRight, ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react';
import { services, getService } from '@/data/services';

const fieldClass='w-full rounded-md border border-border bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export function Contact() {
  const [params]=useSearchParams();
  const [interest,setInterest]=useState(()=>getService(params.get('service') || '')?.title || 'Not sure yet');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [message,setMessage]=useState('');
  const [prepared,setPrepared]=useState(false);
  const [copyState,setCopyState]=useState<'idle'|'copied'|'manual'>('idle');
  const resultRef=useRef<HTMLDivElement>(null);
  const brief=`Hello Torall Ventures,\n\nI'm interested in: ${interest}\n\n${message.trim()}\n\nName: ${name.trim()}\nReply to: ${email.trim()}`;
  const mailto=`mailto:info@torallventures.com?subject=${encodeURIComponent(`Project inquiry — ${interest}`)}&body=${encodeURIComponent(brief)}`;
  useEffect(()=>{
    if(prepared) {
      resultRef.current?.focus({preventScroll:true});
      resultRef.current?.scrollIntoView({block:'nearest',behavior:'instant'});
    }
  },[prepared]);
  function prepare(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(!name.trim() || message.trim().length<10) {
      const field=event.currentTarget.elements.namedItem(!name.trim() ? 'name' : 'message') as HTMLInputElement | HTMLTextAreaElement;
      field.setCustomValidity(!name.trim() ? 'Please enter your name.' : 'Please add at least 10 characters about your project.');
      field.reportValidity();
      return;
    }
    setPrepared(true);
    setCopyState('idle');
  }
  async function copyBrief() {
    try { await navigator.clipboard.writeText(brief); setCopyState('copied'); }
    catch { setCopyState('manual'); }
  }
  return <section id="contact" className="relative pb-24 pt-20 sm:pb-32 sm:pt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="mb-6 font-mono text-xs uppercase tracking-[.22em] text-primary">Start a conversation</p>
          <h1 className="font-display text-5xl font-bold leading-[1.06] tracking-tight sm:text-6xl">Your next chapter.<br /><span className="text-primary">Let’s build it.</span></h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">Tell us what you have in mind, what needs to work better, or where you want to go. You don’t need a technical brief to begin.</p>
          <div className="mt-10 space-y-5">
            <a href="mailto:info@torallventures.com" className="inline-flex max-w-full items-center gap-3 rounded-sm text-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Mail className="h-5 w-5 shrink-0" aria-hidden="true"/><span className="break-all">info@torallventures.com</span><ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true"/></a>
            <p className="flex items-center gap-3 text-sm leading-6 text-muted-foreground"><MapPin className="h-5 w-5 shrink-0" aria-hidden="true"/>Florida, USA · Working with clients everywhere</p>
          </div>
          <div className="mt-12 border-t border-border pt-7">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">A useful starting point</p>
            <ol className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground"><li><span className="mr-3 text-primary">01</span>What would you like to create or improve?</li><li><span className="mr-3 text-primary">02</span>Who will use it, and what should it help them do?</li><li><span className="mr-3 text-primary">03</span>Any priorities, examples, or timing to keep in mind?</li></ol>
            <Link to="/portfolio" className="mt-7 inline-flex items-center gap-3 rounded-sm text-sm font-semibold focus-visible:ring-2 focus-visible:ring-ring">Explore an example first <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true"/></Link>
          </div>
        </div>
        <div className="rounded-xl border border-primary/20 bg-card/85 p-6 sm:p-9">
          {prepared ? <div ref={resultRef} tabIndex={-1} className="outline-none">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10"><Check className="h-6 w-6 text-primary" aria-hidden="true"/></span>
            <h2 className="mt-7 font-display text-3xl font-bold">Your project brief is ready.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Open your email app to review and send it to Torall. Nothing has been sent yet.</p>
            <a href={mailto} className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-card">Open email app <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>
            <button type="button" onClick={()=>void copyBrief()} className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-border px-5 py-3 text-sm hover:border-primary focus-visible:ring-2 focus-visible:ring-ring"><Copy className="h-4 w-4" aria-hidden="true"/>{copyState==='copied' ? 'Project brief copied' : 'Copy project brief'}</button>
            <p role="status" className="mt-4 text-sm leading-6 text-muted-foreground">{copyState==='copied' ? 'Paste it into an email to info@torallventures.com.' : copyState==='manual' ? 'Select and copy the brief below into your email.' : 'Prefer webmail? Copy the brief and paste it into your email.'}</p>
            {copyState==='manual' && <textarea aria-label="Your prepared project brief" readOnly value={brief} rows={10} className={`${fieldClass} mt-4`}/>}
            <button type="button" onClick={()=>setPrepared(false)} className="mt-8 rounded-sm text-sm text-primary underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring">Edit your details</button>
          </div> : <form onSubmit={prepare}>
            <h2 className="font-display text-2xl font-bold">Tell us about your project.</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">A few details make a better first conversation. We’ll prepare an email for you to review and send.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div><label htmlFor="contact-name" className="mb-2 block text-sm">Your name <span aria-hidden="true" className="text-primary">*</span></label><input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} value={name} onChange={e=>{e.target.setCustomValidity('');setName(e.target.value);}} placeholder="Your name" className={fieldClass}/></div>
              <div><label htmlFor="contact-email" className="mb-2 block text-sm">Email address <span aria-hidden="true" className="text-primary">*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={180} value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" className={fieldClass}/></div>
            </div>
            <div className="mt-5"><label htmlFor="contact-interest" className="mb-2 block text-sm">What are you interested in?</label><select id="contact-interest" name="interest" value={interest} onChange={e=>setInterest(e.target.value)} className={fieldClass}><option>Not sure yet</option>{services.map(s=><option key={s.slug}>{s.title}</option>)}</select></div>
            <div className="mt-5"><label htmlFor="contact-message" className="mb-2 block text-sm">What would you like to build? <span aria-hidden="true" className="text-primary">*</span></label><textarea id="contact-message" name="message" required minLength={10} maxLength={2000} rows={6} value={message} onChange={e=>{e.target.setCustomValidity('');setMessage(e.target.value);}} placeholder="A little about your idea, your business, and what success would look like…" className={`${fieldClass} resize-y`}/></div>
            <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-card">Prepare project email <ArrowRight className="h-4 w-4" aria-hidden="true"/></button>
            <p className="mt-4 text-center text-xs leading-6 text-muted-foreground">You review and send from your email app.</p>
          </form>}
        </div>
      </div>
    </div>
  </section>;
}
