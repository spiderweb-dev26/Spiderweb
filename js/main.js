/* ============ CONFIG ============ */
const CONFIG = {
  email: 'hello@spiderweb.dev',        // TODO: real email
  phone: '+251-969004030',
  location: 'Addis Ababa, Ethiopia',
  telegramHandle: '@spiderwebhst',
  telegramUrl: 'https://t.me/spiderwebhst',
  botToken: '',                        // keep empty; the API holds the token now
  chatId: ''
};
const API_URL = 'https://spiderweb-api.onrender.com';   // after DNS: https://api.spiderweb.lol
const FB_PROJECT = 'spiderweb-d10c7';
const FB_KEY = 'AIzaSyAVp_wqzt5gn54y0-0hFf7u9GrTgV_xEls';

/* ============ PORTFOLIO defaults (admin can override) ============ */
const PORTFOLIO = [
  { title:'Casmash Pastry', url:'https://casmash.store', cat:'web', img:'img/work/casmash.png',
    tags:['Store','Custom design','Order flow','Gallery'],
    blurb:'A warm, script-led storefront for an artisan bakery — built around frictionless ordering, a gallery that does the selling, and a quote flow that turns cravings into confirmed bookings.' }
];

const LOGO='img/logo.png';
const CAT_LABEL={web:'Website',shop:'E-Commerce',bot:'Telegram Bot',webapp:'Web App'};
const WEB_CORNER='<svg viewBox="0 0 600 600" fill="none"><g stroke="rgba(230,36,46,.35)" stroke-width="1"><path d="M0 0L600 0M0 0L580 155M0 0L520 300M0 0L424 424M0 0L300 520M0 0L155 580M0 0L0 600"/><path d="M150 0L145 39L130 75L106 106L75 130L39 145L0 150"/><path d="M280 0L270 72L242 140L198 198L140 242L72 270L0 280"/><path d="M410 0L396 106L355 205L290 290L205 355L106 396L0 410"/><path d="M540 0L522 140L468 270L382 382L270 468L140 522L0 540"/></g></svg>';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=matchMedia('(pointer: fine)').matches;
document.querySelectorAll('.web-corner').forEach(el=>el.innerHTML=WEB_CORNER);

document.querySelectorAll('[data-cfg]').forEach(el=>{el.textContent=CONFIG[el.dataset.cfg];});
const cleanTel=(CONFIG.phone||'').replace(/[^\d+]/g,'');
document.querySelectorAll('[data-tg]').forEach(a=>a.href=CONFIG.telegramUrl);
document.querySelectorAll('[data-mail]').forEach(a=>a.href='mailto:'+CONFIG.email);
document.querySelectorAll('[data-tel]').forEach(a=>a.href='tel:'+cleanTel);

const currentPage=document.body.dataset.page;
document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===currentPage));

const burger=document.getElementById('burger'),mMenu=document.getElementById('mMenu');
function closeMenu(){burger.classList.remove('open');mMenu.classList.remove('open');burger.setAttribute('aria-expanded','false');}
burger.addEventListener('click',()=>{const o=mMenu.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);});
mMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
function startReveals(){document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}

const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting||e.target.dataset.done)return;e.target.dataset.done=1;const t=+e.target.dataset.count,s=e.target.dataset.suffix||'',t0=performance.now();(function tick(x){const p=Math.min((x-t0)/1300,1);e.target.textContent=Math.round(t*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(tick);})(t0);}),{threshold:.4});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

const gThread=document.querySelector('#globalSpider .thread'),scrollThread=document.getElementById('scrollThread');
let ticking=false;
function onScroll(){const y=window.scrollY;if(gThread)gThread.style.height=(70+Math.min(y*.18,260))+'px';if(scrollThread){const h=document.documentElement.scrollHeight-window.innerHeight;scrollThread.style.width=(h>0?(y/h)*100:0)+'%';}}
window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{onScroll();ticking=false;});},{passive:true});onScroll();

if(finePointer&&!reduce){
  const g=document.getElementById('globalSpider');
  if(g){const eyes=g.querySelectorAll('.eye');let ex=0,ey=0,raf=0;const ap=()=>{eyes.forEach(e=>e.style.transform=`translate(${ex}px,${ey}px)`);raf=0;};
    window.addEventListener('pointermove',ev=>{const r=g.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=ev.clientX-cx,dy=ev.clientY-cy,d=Math.hypot(dx,dy)||1,f=Math.min(d/240,1);ex=dx/d*2.4*f;ey=dy/d*2.4*f;if(!raf)raf=requestAnimationFrame(ap);});
    document.addEventListener('pointerleave',()=>{ex=0;ey=0;if(!raf)raf=requestAnimationFrame(ap);});}
  const hero=document.querySelector('.hero'),stage=document.querySelector('.web-stage');
  if(hero&&stage){stage.style.transition='transform .15s ease-out';hero.addEventListener('pointermove',ev=>{const r=hero.getBoundingClientRect(),rx=(ev.clientY-r.top)/r.height-.5,ry=(ev.clientX-r.left)/r.width-.5;stage.style.transform=`rotateX(${(-rx*8).toFixed(2)}deg) rotateY(${(ry*10).toFixed(2)}deg)`;});hero.addEventListener('pointerleave',()=>{stage.style.transform='';});}
}

function pfImgFail(img){const m=img.closest('.pf-media');if(!m||m.dataset.fell)return;m.dataset.fell='1';m.classList.add('brand-tile');const t=img.getAttribute('data-title')||'';const c=m.querySelector('.pf-cat'),g=m.querySelector('.pf-go, .pf-soon');m.innerHTML=(c?c.outerHTML:'')+'<img src="'+LOGO+'" alt=""><span class="bt-name">'+t+'</span><span style="font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);opacity:.85">Preview on its way ✦</span>'+(g?g.outerHTML:'');}

/* ---------- portfolio render (callable, so admin edits re-render) ---------- */
const pfGrid=document.getElementById('pfGrid');
function renderPortfolio(){
  if(!pfGrid)return;
  const media=p=>{const cat=`<span class="pf-cat">${CAT_LABEL[p.cat]||'Project'}</span>`;const go=(p.url&&p.url!=='none')?`<span class="pf-go">Visit site ↗</span>`:`<span class="pf-soon">Coming soon</span>`;return p.img?`<div class="pf-media">${cat}<img src="${p.img}" alt="${p.title} — screenshot" loading="lazy" data-title="${p.title}" onerror="pfImgFail(this)">${go}</div>`:`<div class="pf-media brand-tile">${cat}<img src="${LOGO}" alt=""><span class="bt-name">${p.title}</span>${go}</div>`;};
  const card=(p,i)=>{const f=i===0;const tags=(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('');const blurb=p.blurb?`<p class="pf-blurb">${p.blurb}</p>`:'';const inner=media(p)+`<div class="pf-body">${f?'<span class="pf-flag-feat">★ Featured build</span>':''}<h3>${p.title}</h3>${blurb}<div class="tags">${tags}</div>${f?'<span class="pf-feat-cta">View case ↗</span>':''}</div>`;const cls='pf-card reveal'+(f?' featured':'');return (p.url&&p.url!=='none')?`<article class="${cls}" data-cat="${p.cat}"><a href="${p.url}" target="_blank" rel="noopener">${inner}</a></article>`:`<article class="${cls} soon" data-cat="${p.cat}"><div class="pf-static">${inner}</div></article>`;};
  const ph=i=>`<article class="pf-card placeholder reveal" data-cat="placeholder"><div class="pf-media"><span class="ph-label">SLOT RESERVED</span></div><div class="pf-body"><h3>Project ${String(i+1).padStart(2,'0')}</h3><p class="pf-blurb">A new build is on its way to the web. Slots like this fill the moment a client says yes.</p></div></article>`;
  const fill=Math.max(0,6-PORTFOLIO.length);
  pfGrid.innerHTML=PORTFOLIO.map(card).join('')+Array.from({length:fill},(_,i)=>ph(PORTFOLIO.length+i)).join('');
  const c=document.getElementById('pfCount');if(c)c.innerHTML=`<span class="live-dot"></span><b>${PORTFOLIO.length}</b> live · <b>${fill}</b> incoming`;
  pfGrid.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}
renderPortfolio();
document.querySelectorAll('.chip').forEach(ch=>ch.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));ch.classList.add('active');const f=ch.dataset.filter;pfGrid.classList.toggle('filtered',f!=='all');pfGrid.querySelectorAll('.pf-card').forEach(c=>{c.style.display=(f==='all'||c.dataset.cat===f||c.dataset.cat==='placeholder')?'':'none';});}));

/* ---------- live content from Firestore (admin edits) ---------- */
(async()=>{try{
  const r=await fetch(`https://firestore.googleapis.com/v1/projects/${FB_PROJECT}/databases/%28default%29/documents/content/site?key=${FB_KEY}`);
  if(!r.ok)return;const d=await r.json();const j=d.fields&&d.fields.json&&d.fields.json.stringValue;if(!j)return;
  const c=JSON.parse(j);
  if(Array.isArray(c.portfolio)&&c.portfolio.length){PORTFOLIO.length=0;c.portfolio.forEach(p=>PORTFOLIO.push(p));renderPortfolio();}
  if(typeof c.taking==='boolean'){const s=document.querySelector('.status');if(s)s.innerHTML=c.taking?'<span class="dot"></span> Now taking projects · '+new Date().getFullYear():'<span class="dot" style="background:#f5a623"></span> Currently booked — join the waitlist';}
}catch(e){}})();

function showToast(m){const t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),4200);}

/* ---------- contact form → API (server-side Telegram) ---------- */
const contactForm=document.getElementById('contactForm');
if(contactForm){contactForm.addEventListener('submit',async e=>{e.preventDefault();const f=e.target;
  if(!f.name.value.trim()||!f.contact.value.trim()||!f.message.value.trim()){showToast('🕷 A few fields are still empty — the web needs all its strands.');return;}
  const payload={name:f.name.value,contact:f.contact.value,service:f.service.value,budget:f.budget.value,message:f.message.value};
  try{const r=await fetch(API_URL+'/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    if(r.ok){showToast('✅ Web shot! Message delivered — we\'ll reply within 48h.');f.reset();}
    else throw 0;
  }catch{showToast('⚠ Delivery hiccup — try us directly on Telegram.');}
});}

const yr=document.getElementById('year');if(yr)yr.textContent=new Date().getFullYear();

(function faviconGuard(){const svg="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#14070C'/><g stroke='#e6242e' stroke-width='3' stroke-linecap='round' fill='none'><path d='M24 30Q12 22 10 12'/><path d='M22 38Q8 34 6 24'/><path d='M22 44Q10 50 8 58'/><path d='M40 30Q52 22 54 12'/><path d='M42 38Q56 34 58 24'/><path d='M42 44Q54 50 56 58'/></g><circle cx='32' cy='26' r='6' fill='#e6242e'/><ellipse cx='32' cy='40' rx='10' ry='12' fill='#e6242e'/></svg>";const u='data:image/svg+xml,'+encodeURIComponent(svg);const t=new Image();t.onerror=()=>{let l=document.querySelector('link[rel="icon"]');if(!l){l=document.createElement('link');l.rel='icon';document.head.appendChild(l);}l.type='image/svg+xml';l.href=u;};t.src=LOGO;})();

function ready(){document.body.classList.add('loaded');if(!reduce)startReveals();else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));}
if(reduce||document.readyState==='complete')setTimeout(ready,reduce?0:450);
window.addEventListener('load',()=>setTimeout(ready,450));setTimeout(ready,2500);