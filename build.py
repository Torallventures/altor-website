import os,json,datetime
R=os.path.dirname(os.path.abspath(__file__));D='https://torallventures.com'
today=datetime.date.today().isoformat()
PAGES={
'home':('','Torall Ventures — Making your business everyone’s business','Miami web agency building fast websites, mobile apps and custom software for condos, restaurants, construction and small businesses. Websites from $1,800.'),
'demo':('demo','Live demo · Torall Ventures','Watch a resident portal, announcements, service requests and online ordering work, built by Torall Ventures in Miami.'),
'work':('work','Our work · Torall Ventures','Click through real working sample sites: a condo owner portal, a restaurant with online ordering, and a coffee shop with subscriptions and a back office.'),
'industries':('industries','Industries we build for · Torall Ventures','Websites, apps and portals for condos and HOAs, restaurants, construction, real estate, medical, law, retail and hospitality.'),
'services':('services','Websites, apps and custom software · Torall Ventures','Design and development, online ordering and booking, mobile apps, resident portals, admin dashboards and integrations.'),
'process':('process','How a project works · Torall Ventures','Talk, prototype, build, launch. See how a project with Torall Ventures runs and answers to common questions.'),
'pricing':('pricing','Pricing · Torall Ventures','Starter sites from $1,800, business sites from $4,500 and custom portals from $9,500. Fixed written quotes, no surprises.'),
'contact':('contact','Contact us · Torall Ventures','Tell us about your project and get a written proposal within one business day. Call or text (213) 606-5711.'),
'privacy':('privacy','Privacy Policy · Torall Ventures','What Torall Ventures collects through its website, why, and your choices.'),
'terms':('terms','Terms of Use · Torall Ventures','The terms for using the Torall Ventures website and demo sites.')}
GTAG='''<script async src="https://www.googletagmanager.com/gtag/js?id=GTM-NFGVBSSV"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>'''
LD={"@context":"https://schema.org","@type":"ProfessionalService","name":"Torall Ventures","url":D+"/","telephone":"+1-213-606-5711","email":"info@torallventures.com","description":"Websites, mobile apps and custom software for businesses.","priceRange":"$$","address":{"@type":"PostalAddress","addressLocality":"Miami","addressRegion":"FL","addressCountry":"US"},"areaServed":"Miami, Florida"}
tpl=open(R+'/_src/site.html').read()
for k,(path,t,d) in PAGES.items():
    u=D+('/'+path+'/' if path else '/')
    head=f'''{GTAG}
<title>{t}</title>
<meta name="description" content="{d}">
<link rel="canonical" href="{u}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website"><meta property="og:site_name" content="Torall Ventures"><meta property="og:title" content="{t}"><meta property="og:description" content="{d}"><meta property="og:url" content="{u}"><meta property="og:image" content="{D}/og-image.png"><meta name="twitter:card" content="summary_large_image">'''
    if k=='home': head+='\n<script type="application/ld+json">'+json.dumps(LD)+'</script>'
    h=tpl.replace('{{HEAD}}\n',head+'\n',1)
    assert '{{HEAD}}' not in h
    out=R+('/'+path if path else '')
    os.makedirs(out,exist_ok=True);open(out+'/index.html','w').write(h)
urls=''.join(f'<url><loc>{D+("/"+p+"/" if p else "/")}</loc><lastmod>{today}</lastmod></url>' for p,_,_ in PAGES.values())
open(R+'/sitemap.xml','w').write(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>\n')
open(R+'/robots.txt','w').write(f'User-agent: *\nAllow: /\n\nSitemap: {D}/sitemap.xml\n')
print('built',len(PAGES))
