(function(){
  'use strict';
  const INTENTS=[
    {id:'comprar',label:'Comprar',eyebrow:'PARA CHAMAR DE SEU',title:'Um endereço que acompanha a sua próxima fase.',description:'Explore uma curadoria demonstrativa de casas e apartamentos para encontrar o ponto de partida da sua busca.',actionLabel:'Ver opções para comprar',image:'assets/integri-casa-01.svg',target:'#intermediary-comprar'},
    {id:'alugar',label:'Alugar',eyebrow:'PRONTO PARA VIVER AGORA',title:'O próximo capítulo pode começar mais perto do que você imagina.',description:'Veja uma seleção demonstrativa para orientar a sua conversa sobre localização, rotina e espaço.',actionLabel:'Encontrar um lugar para alugar',image:'assets/integri-casa-02.svg',target:'#intermediary-alugar'},
    {id:'investir',label:'Investir',eyebrow:'UMA DECISÃO COM CONTEXTO',title:'Leia a região antes de escolher o próximo movimento.',description:'Uma frente de apresentação para conversar sobre patrimônio, localização e oportunidades — sem promessa de retorno.',actionLabel:'Conversar sobre investir',image:'assets/integri-casa-03.svg',target:'#intermediary-investir'}
  ];
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  function initIntegriHero(root){
    const current=root.querySelector('[data-hero-current]'); const next=root.querySelector('[data-hero-next]');
    const eyebrow=root.querySelector('[data-hero-eyebrow]'); const title=root.querySelector('[data-hero-title]'); const description=root.querySelector('[data-hero-description]'); const cta=root.querySelector('[data-hero-cta]'); const fill=root.querySelector('[data-progress-fill]'); const currentLabel=root.querySelector('[data-progress-current]'); const buttons=[...root.querySelectorAll('[data-intent-button]')];
    let index=0; let timer=0; let paused=false; let transitioning=false;
    function setIntent(nextIndex,reason){
      if(transitioning||nextIndex===index&&!reason)return;
      const item=INTENTS[nextIndex]; if(!item)return;
      transitioning=true;
      eyebrow.textContent=item.eyebrow; title.textContent=item.title; description.textContent=item.description; cta.textContent=item.actionLabel+' ↗'; cta.href=item.target; cta.dataset.intentLink=item.id; currentLabel.textContent=String(nextIndex+1).padStart(2,'0'); fill.style.width=((nextIndex+1)/INTENTS.length*100)+'%';
      buttons.forEach((button,buttonIndex)=>{const active=buttonIndex===nextIndex;button.classList.toggle('is-active',active);button.setAttribute('aria-selected',String(active));});
      next.src=item.image; next.alt=''; root.classList.add('is-transitioning');
      const finish=()=>{current.src=item.image; index=nextIndex; root.classList.remove('is-transitioning'); next.removeEventListener('transitionend',finish); transitioning=false;};
      if(reduced.matches){finish();}else{next.addEventListener('transitionend',finish,{once:true});window.setTimeout(()=>{if(transitioning)finish();},1200);}
    }
    function nextIntent(){setIntent((index+1)%INTENTS.length,'autoplay');}
    function stop(){if(timer){window.clearInterval(timer);timer=0;}}
    function start(){stop();if(reduced.matches||paused||document.hidden)return;timer=window.setInterval(nextIntent,6200);}
    buttons.forEach((button,buttonIndex)=>button.addEventListener('click',()=>{setIntent(buttonIndex,'manual');start();}));
    root.addEventListener('mouseenter',()=>{paused=true;stop();}); root.addEventListener('mouseleave',()=>{paused=false;start();}); root.addEventListener('focusin',()=>{paused=true;stop();}); root.addEventListener('focusout',event=>{if(!root.contains(event.relatedTarget)){paused=false;start();}});
    document.addEventListener('visibilitychange',()=>document.hidden?stop():start()); reduced.addEventListener?.('change',()=>reduced.matches?stop():start());
    const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting)start();else stop();},{threshold:.2}); observer.observe(root); start();
    return {setIntent};
  }
  function initIntentLinks(){
    document.querySelectorAll('[data-intent-link]').forEach(link=>link.addEventListener('click',()=>{const intent=link.dataset.intentLink;document.querySelectorAll('[data-intermediary-panel]').forEach(panel=>{const active=panel.dataset.intermediaryPanel===intent;panel.hidden=!active;panel.classList.toggle('is-active',active);});}));
    document.querySelectorAll('[data-prepared-link]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();window.history.replaceState({},'',link.getAttribute('href'));}));
  }
  function initMenu(){const header=document.querySelector('[data-site-header]');const toggle=document.querySelector('[data-menu-toggle]');if(!header||!toggle)return;toggle.addEventListener('click',()=>{const open=header.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});}
  function init(){const hero=document.querySelector('[data-hero]');if(hero)initIntegriHero(hero);initIntentLinks();initMenu();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
