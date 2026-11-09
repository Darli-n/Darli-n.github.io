function artwork(type){const base='<rect x="25" y="10" width="350" height="135" rx="8" fill="white" fill-opacity=".85"/>';let body='';if(type==='bars'){body='<rect x="42" y="27" width="94" height="12" rx="4" fill="#ded9eb"/>';[45,80,58,95,69,104,87].forEach((h,i)=>body+=`<rect x="${48+i*43}" y="${130-h*.7}" width="23" height="${h*.7}" rx="3" fill="${i%2?'#b5c7d7':'#a38cc8'}"/>`)}else if(type==='line'){body='<path d="M49 117L96 104L143 109L190 75L237 85L284 52L346 32" stroke="#987ac2" stroke-width="4" fill="none"/><path d="M49 125L96 118L143 121L190 108L237 113L284 95L346 82" stroke="#b6b1cb" stroke-width="3" fill="none"/>'}else if(type==='table'){for(let i=0;i<5;i++)body+=`<rect x="44" y="${29+i*22}" width="310" height="16" rx="3" fill="${i===0?'#c7b28e':'#eee8dc'}"/><path d="M140 ${29+i*22}v16 M245 ${29+i*22}v16" stroke="white" stroke-width="3"/>`}else{for(let i=0;i<25;i++)body+=`<circle cx="${55+(i*37)%125}" cy="${40+(i*23)%80}" r="4" fill="#a68abe"/><circle cx="${215+(i*31)%125}" cy="${35+(i*17)%85}" r="4" fill="#bd8c9c"/>`}return `<svg viewBox="0 0 400 155" aria-hidden="true">${base}${body}</svg>`}

const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeURL(value, image=false){
 if(!value)return '';
 try {const u=new URL(value,location.href);if(!['https:','http:'].includes(u.protocol))return '';if(image&&u.origin!==location.origin&&u.protocol!=='https:')return '';return escapeHTML(u.href);}catch{return '';}
}
const projects=window.PORTFOLIO_PROJECTS || [];
document.getElementById('projectgrid').innerHTML=projects.map(p=>{
 const image=safeURL(p.image,true), dashboard=safeURL(p.dashboard);
 const repo=p.repo?'https://github.com/Darli-n/'+encodeURIComponent(p.repo):'';
 return `<article class="project" data-category="${escapeHTML(p.filter)}"><div class="cover" style="--tint:${/^#[0-9a-f]{6}$/i.test(p.tint)?p.tint:'#eee8f7'}">${image?`<a href="${image}" target="_blank" rel="noopener noreferrer" class="project-image-link" aria-label="Ampliar imagem: ${escapeHTML(p.title)}"><img class="project-image" src="${image}" alt="${escapeHTML(p.imageAlt||p.title)}" loading="lazy"></a>`:artwork(p.art)}<span class="coverlabel">${image?'Captura do projeto · clique para ampliar':'Ilustração do tema'}</span></div><div class="projectbody"><div class="category">${escapeHTML(p.category)}</div><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.description)}</p><div class="tags">${(p.tags||[]).map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div>${(p.gallery||[]).length?`<div class="project-gallery" aria-label="Galeria do projeto">${p.gallery.map(g=>{const src=safeURL(g.src,true);return src?`<a href="${src}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar: ${escapeHTML(g.alt)}"><img src="${src}" alt="${escapeHTML(g.alt)}" loading="lazy"></a>`:'';}).join('')}</div>`:''}<details><summary>Sobre o projeto</summary><p>${escapeHTML(p.detail)}</p></details>${dashboard?`<a class="repo" href="${dashboard}" target="_blank" rel="noopener noreferrer">Abrir dashboard <span>↗</span></a>`:''}${repo?`<a class="repo" href="${repo}" target="_blank" rel="noopener noreferrer">Explorar no GitHub <span>↗</span></a>`:''}</div></article>`;
}).join('');
document.querySelectorAll('.project-image').forEach(img=>img.addEventListener('error',()=>{const cover=img.closest('.cover');cover.innerHTML='<span>Imagem indisponível</span>'; }));
const track=document.getElementById('projectgrid');
const previous=document.getElementById('projects-prev');
const next=document.getElementById('projects-next');
const position=document.getElementById('projects-position');
const motion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';
function visibleProjects(){return Array.from(track.querySelectorAll('.project')).filter(card=>!card.hidden);}
function updateCarousel(){
 if(!track||!previous||!next||!position)return;
 const cards=visibleProjects();
 if(!cards.length){position.textContent='0 projetos';previous.disabled=true;next.disabled=true;return;}
 const bounds=track.getBoundingClientRect();
 const shown=cards.map((card,index)=>({index,rect:card.getBoundingClientRect()})).filter(({rect})=>rect.right>bounds.left+12&&rect.left<bounds.right-12);
 position.textContent=shown.length?`${shown[0].index+1}${shown.length>1?'–'+(shown[shown.length-1].index+1):''} de ${cards.length}`:`${cards.length} projetos`;
 previous.disabled=track.scrollLeft<=2;
 next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-2;
}
function moveCarousel(direction){
 const cards=visibleProjects();if(!cards.length)return;
 const bounds=track.getBoundingClientRect();
 let current=0;let distance=Infinity;
 cards.forEach((card,index)=>{const delta=Math.abs(card.getBoundingClientRect().left-bounds.left-4);if(delta<distance){distance=delta;current=index;}});
 const target=cards[Math.max(0,Math.min(cards.length-1,current+direction))];
 track.scrollTo({left:track.scrollLeft+target.getBoundingClientRect().left-bounds.left-4,behavior:motion()});
}
if(track&&previous&&next){
 previous.addEventListener('click',()=>moveCarousel(-1));next.addEventListener('click',()=>moveCarousel(1));
 let timer;track.addEventListener('scroll',()=>{clearTimeout(timer);timer=setTimeout(updateCarousel,120);},{passive:true});
 window.addEventListener('resize',updateCarousel);
 track.addEventListener('keydown',event=>{if(event.target!==track)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();moveCarousel(event.key==='ArrowRight'?1:-1);}if(event.key==='Home'||event.key==='End'){event.preventDefault();track.scrollTo({left:event.key==='Home'?0:track.scrollWidth,behavior:motion()});}});
 track.querySelectorAll('img').forEach(img=>img.addEventListener('load',updateCarousel));
 updateCarousel();
}
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelectorAll('.project').forEach(p=>p.hidden=button.dataset.filter!=='all'&&p.dataset.category!==button.dataset.filter);
 if(track)track.scrollTo({left:0,behavior:'instant'});updateCarousel();
}));
const profile=window.PORTFOLIO_PROFILE;
if(profile){
 document.querySelectorAll('[data-contact]').forEach(a=>{const kind=a.dataset.contact;const url=kind==='email'?(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)?'mailto:'+profile.email:''):safeURL(profile[kind]);if(url)a.setAttribute('href',url);});
 const photo=safeURL(profile.photo,true);if(photo){const img=document.createElement('img');img.src=photo;img.alt=profile.photoAlt||profile.name;img.className='profile-photo';document.querySelector('#sobre .aboutgrid > div').prepend(img);img.addEventListener('error',()=>img.remove());}
}

