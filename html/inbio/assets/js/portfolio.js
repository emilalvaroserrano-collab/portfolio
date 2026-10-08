/* Local, buildless portfolio interactions. No backend or fictitious form sends. */
(() => {
  'use strict';
  const base = document.body.dataset.assetBase || '';
  const source = window.PORTFOLIO_DATA || {projects: [], articles: []};
  const registry = window.PROJECT_REGISTRY || {projects: []};
  const $ = selector => document.querySelector(selector);
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const asset = value => base + value;
  const safeUrl = value => {
    try {const u = new URL(value); return u.protocol === 'https:' ? u.href : null;} catch {return null;}
  };
  const redrawIcons = () => window.feather?.replace({'stroke-width':1.7});
  const makeTags = items => '<div class="tech-tags">' + items.map(x => '<span>'+escapeHtml(x)+'</span>').join('') + '</div>';
  const makeLink = (label, url, className='') => {
    const u=safeUrl(url); return u ? `<a class="${className}" href="${escapeHtml(u)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>` : '';
  };
  redrawIcons();

  const menuButton=$('.menu-toggle'), menu=$('#mobile-nav');
  menuButton?.addEventListener('click', () => {
    const open=menuButton.getAttribute('aria-expanded')==='true';
    menuButton.setAttribute('aria-expanded',String(!open));
    menuButton.setAttribute('aria-label',open?'Open navigation':'Close navigation');
    menu.hidden=open;
  });
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && !menu.hidden){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.focus();}});

  // Every modal replaces its full content, avoiding stale project images or copy.
  const projectModal=$('#project-modal');
  function populateProject(id) {
    const p=source.projects.find(x=>x.id===id); if(!p)return false;
    $('#project-modal-image').src=asset('assets/images/'+p.image);
    $('#project-modal-image').alt=p.alt;
    $('#project-image-note').textContent=p.image_note;
    $('#project-modal-category').textContent=p.category;
    $('#project-modal-title').textContent=p.name+' — '+p.title;
    $('#project-modal-description').textContent=p.description;
    $('#project-modal-detail').textContent=p.detail;
    $('#project-modal-tags').innerHTML=makeTags(p.tech);
    const registered=registry.projects.find(x=>x.id===id);
    const available=[];
    if(registered && isLive(registered))available.push([registered.actionLabel||'Launch App',registered.liveUrl]);
    if(registered && publicSource(registered))available.push(['View Source',registered.repoUrl]);
    if(registered?.storeUrl && isLive(registered))available.push(['Google Play',registered.storeUrl]);
    available.push(...p.links);
    const seen=new Set();
    $('#project-modal-links').innerHTML=available.filter(([,url])=>{const normalized=safeUrl(url);if(!normalized||seen.has(normalized))return false;seen.add(normalized);return true;}).map(([label,url])=>makeLink(label,url)).join('');
    const evidence=$('#project-modal-evidence');
    if(evidence){
      evidence.innerHTML=registered?`<p class="project-verification">${escapeHtml(registered.verificationNote)}</p>`:'';
      if(registered?.screenshots.length)evidence.innerHTML+='<h3>Product screenshots</h3><div class="project-evidence-grid">'+registered.screenshots.map(s=>`<figure><img src="${escapeHtml(asset(s.src))}" alt="${escapeHtml(s.caption)}" loading="lazy"><figcaption>${escapeHtml(s.caption)} · ${escapeHtml(s.capturedAt)} ${makeLink('Source',s.sourceUrl)}</figcaption></figure>`).join('')+'</div>';
    }
    return true;
  }
  projectModal?.addEventListener('show.bs.modal',e=>{
    const id=e.relatedTarget?.dataset.project || e.relatedTarget?.closest('[data-project]')?.dataset.project;
    if(id)populateProject(id);
  });
  const articleModal=$('#article-modal');
  articleModal?.addEventListener('show.bs.modal',e=>{
    const id=e.relatedTarget?.dataset.article || e.relatedTarget?.closest('[data-article]')?.dataset.article;
    const a=source.articles.find(x=>x.id===id);if(!a)return;
    $('#article-modal-image').src=asset('assets/images/'+a.image);$('#article-modal-image').alt=a.alt;
    $('#article-image-note').textContent=a.image_note;$('#article-modal-category').textContent=a.category;
    $('#article-modal-title').textContent=a.title;
    // Article bodies are authored static content, not remote HTML.
    $('#article-modal-body').innerHTML=a.body;
  });

  // The phone is a product registry browser; it never presents a mock app as a live one.
  const perPage=12;
  let filter='All', pageIndex=0, selectedId=null, lastTrigger=null;
  const home=$('#phone-home'), detail=$('#phone-detail'), appGrid=$('#phone-app-grid'), pages=$('#phone-pages');
  const statusNames={'live':'Public page checked','source-available':'Public source','private-source':'Private source','case-study':'Case study','unavailable':'Unavailable','unverified':'Unverified'};
  const isLive=p=>p.deploymentStatus==='live' && Boolean(safeUrl(p.liveUrl));
  const publicSource=p=>p.repoVisibility==='public' && Boolean(safeUrl(p.repoUrl));
  const iconMarkup=(p,cls='phone-app-icon')=>`<span class="${cls}${isLive(p)?' live':''}">${p.logo ? `<img src="${escapeHtml(asset(p.logo))}" alt="${escapeHtml(p.name)} mark">` : `<i data-feather="${escapeHtml(p.icon||'grid')}" aria-hidden="true"></i>`}</span>`;
  const filtered=()=>registry.projects.filter(p=>filter==='Pending'?p.pendingDetails:!p.pendingDetails&&(filter==='All'||filter==='Live'&&isLive(p)||p.category===filter));
  function setFilter(value){
    filter=value;pageIndex=0;selectedId=null;home.hidden=false;detail.hidden=true;
    document.querySelectorAll('[data-library-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.libraryFilter===value)));
    renderApps();
  }
  function renderApps(){
    const items=filtered();const pageCount=Math.max(1,Math.ceil(items.length/perPage));pageIndex=Math.min(pageIndex,pageCount-1);
    const visible=items.slice(pageIndex*perPage,(pageIndex+1)*perPage);
    $('#phone-subtitle').textContent=filter==='Pending'?'Projects awaiting implementation evidence.':filter==='Live'?'Projects with a checked public page.':'Select an app to explore its details.';
    appGrid.innerHTML=visible.length?visible.map(p=>`<button type="button" class="phone-app" data-open-app="${escapeHtml(p.id)}" aria-label="Explore ${escapeHtml(p.name)}">${iconMarkup(p)}<span class="phone-app-label">${escapeHtml(p.name)}</span></button>`).join(''):'<div class="phone-empty">No projects in this category.</div>';
    pages.innerHTML=Array.from({length:pageCount},(_,i)=>`<button type="button" data-app-page="${i}" aria-label="Application page ${i+1} of ${pageCount}" aria-current="${i===pageIndex}"></button>`).join('');
    const picks=$('#library-picks');
    picks.innerHTML=items.slice(0,4).map(p=>`<button type="button" class="library-pick" data-open-app="${escapeHtml(p.id)}" aria-label="Explore ${escapeHtml(p.name)}">${iconMarkup(p,'pick-icon')}<span><span class="pick-name">${escapeHtml(p.name)}</span><span class="pick-category">${escapeHtml(p.category)}</span></span><span class="pick-status${isLive(p)?' live':''}">${p.pendingDetails?'Pending':isLive(p)?'Checked':p.repoVisibility==='public'?'Source':'Case study'}</span></button>`).join('');
    redrawIcons();
  }
  function openApp(id, trigger){
    const p=registry.projects.find(x=>x.id===id);if(!p)return;
    selectedId=id;lastTrigger=trigger||lastTrigger;
    home.hidden=true;detail.hidden=false;
    $('#phone-toolbar-title').textContent=p.name;
    let body=`<div class="phone-detail-heading">${iconMarkup(p)}<div><h3 tabindex="-1" id="phone-project-title">${escapeHtml(p.name)}</h3><span>${escapeHtml(p.category)}</span></div></div><div class="phone-deployment${isLive(p)?' live':''}"><strong>${escapeHtml(p.pendingDetails?'Details pending':statusNames[p.deploymentStatus]||'Unverified')}</strong><br>${escapeHtml(p.verificationNote)}<br>Checked ${escapeHtml(p.checkedAt)}</div><p>${escapeHtml(p.description)}</p>`;
    if(p.screenshots.length){
      body+='<h4>Actual public screenshots</h4>'+p.screenshots.map(s=>`<figure class="phone-screenshot"><img src="${escapeHtml(asset(s.src))}" alt="${escapeHtml(s.caption)}" loading="lazy"><figcaption>${escapeHtml(s.caption)} · ${escapeHtml(s.capturedAt)}</figcaption></figure>`).join('');
    } else if(p.architecture){
      body+=`<h4>Architecture overview</h4><figure class="phone-screenshot"><img src="${escapeHtml(asset(p.architecture))}" alt="${escapeHtml(p.name)} architecture overview"><figcaption>Résumé-based architecture diagram</figcaption></figure>`;
    } else {
      body+='<div class="phone-screenshot-empty">No verified product screenshot is available for this entry.</div>';
    }
    if(p.technology.length)body+='<h4>Engineering scope</h4>'+makeTags(p.technology);
    if(p.codeReferences.length)body+='<h4>Code references</h4><div class="phone-code-links">'+p.codeReferences.map(r=>makeLink(r.label,r.url)).join('')+'</div>';
    const scroll=$('#phone-detail-scroll');scroll.innerHTML=body;scroll.scrollTop=0;
    let actions='';
    if(isLive(p))actions+=makeLink(p.actionLabel||'Launch App',p.liveUrl);
    if(p.storeUrl && isLive(p))actions+=makeLink('Google Play',p.storeUrl,'outline-action');
    if(publicSource(p))actions+=makeLink('View Source',p.repoUrl,actions?'outline-action':'');
    if(p.caseStudyId && source.projects.some(x=>x.id===p.caseStudyId))actions+=`<button type="button" data-phone-case="${escapeHtml(p.caseStudyId)}" class="${actions?'outline-action':''}">View Case Study</button>`;
    if(!actions)actions='<a href="#contacts" class="outline-action">Request project details</a>';
    $('#phone-detail-actions').innerHTML=actions;redrawIcons();
    $('#phone-project-title').focus({preventScroll:true});
  }
  function goHome(){
    selectedId=null;home.hidden=false;detail.hidden=true;renderApps();
    const returnTarget=appGrid.querySelector(`[data-open-app="${lastTrigger?.dataset.openApp||''}"]`);
    returnTarget?.focus({preventScroll:true});
  }
  document.querySelectorAll('[data-library-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.libraryFilter)));
  $('#phone-all-apps')?.addEventListener('click',()=>setFilter('All'));
  $('#phone-live-apps')?.addEventListener('click',()=>setFilter('Live'));
  $('#phone-back')?.addEventListener('click',goHome);$('#phone-home-button')?.addEventListener('click',goHome);
  $('#app-library')?.addEventListener('click',e=>{
    const open=e.target.closest('[data-open-app]');if(open){openApp(open.dataset.openApp,open);return;}
    const pg=e.target.closest('[data-app-page]');if(pg){pageIndex=Number(pg.dataset.appPage);renderApps();return;}
    const cs=e.target.closest('[data-phone-case]');if(cs && populateProject(cs.dataset.phoneCase))bootstrap.Modal.getOrCreateInstance(projectModal).show(cs);
  });
  // Horizontal swipes page the home grid; vertical page scrolling stays native.
  let startX=0,startY=0;
  appGrid?.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY;},{passive:true});
  appGrid?.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;const count=Math.ceil(filtered().length/perPage);if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4){pageIndex=Math.max(0,Math.min(count-1,pageIndex+(dx<0?1:-1)));renderApps();}},{passive:true});
  const phoneClock=$('#phone-clock');
  const updateClock=()=>{if(phoneClock)phoneClock.textContent=new Date().toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit',hour12:false});};
  updateClock();setInterval(updateClock,60000);renderApps();

  // Form opens an email draft, with copy fallback when no mail handler is installed.
  const form=$('#contact-form');
  form?.addEventListener('submit',event=>{
    event.preventDefault();if(!form.reportValidity())return;
    const name=$('#contact-name').value.trim(),email=$('#contact-email').value.trim(),phone=$('#contact-phone').value.trim(),subject=$('#contact-subject').value.trim(),message=$('#contact-message').value.trim();
    const body=`Name: ${name}\nEmail: ${email}${phone?'\nPhone / WhatsApp: '+phone:''}\n\n${message}`;
    $('#draft-copy').value=`To: emilalvaroserrano@gmail.com\nSubject: ${subject}\n\n${body}`;
    $('#draft-fallback').hidden=false;
    $('#contact-status').textContent='Email draft prepared. If your email app does not open, copy the draft below.';
    const url='mailto:emilalvaroserrano@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    const a=document.createElement('a');a.href=url;a.style.display='none';document.body.append(a);a.click();a.remove();
  });
  $('#copy-draft')?.addEventListener('click',async()=>{
    const text=$('#draft-copy').value;
    try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);$('#contact-status').textContent='Draft copied. Paste it into your email app.';}catch{const field=$('#draft-copy');field.focus();field.select();$('#contact-status').textContent='Draft selected. Copy it and paste it into your email app.';}
  });
  // Maintain native keyboard behavior for Bootstrap tab groups.
  document.querySelectorAll('[role=tablist]').forEach(list=>list.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    const tabs=[...list.querySelectorAll('[role=tab]')],current=tabs.indexOf(document.activeElement);if(current<0)return;
    event.preventDefault();let next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(current+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
    bootstrap.Tab.getOrCreateInstance(tabs[next]).show();tabs[next].focus();
  }));
})();
