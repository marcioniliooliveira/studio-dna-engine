/**
 * React Bits Pro — Application UI (filtering-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, key, left, observe, preventDefault, useCallback, useEffect, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_24437 = [["path",{d:"M5.5 20.75C7.433 20.75 9 19.183 9 17.25C9 15.317 7.433 13.75 5.5 13.75C3.567 13.75 2 15.317 2 17.25C2 19.183 3.567 20.75 5.5 20.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18.5 20.75C20.433 20.75 22 19.183 22 17.25C22 15.317 20.433 13.75 18.5 13.75C16.567 13.75 15 15.317 15 17.25C15 19.183 16.567 20.75 18.5 20.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11.9986 19V16.433C11.9986 15.8816 11.9986 15.6059 11.9272 15.3484C11.8838 15.1918 11.821 15.0411 11.7404 14.8997C11.6079 14.6675 11.412 14.4725 11.0201 14.0826L10.9325 13.9955C10.7793 13.8431 10.6398 13.7043 10.5132 13.5763M19.9971 11H18.6523C17.936 11 17.5778 11 17.2526 10.8836C17.1522 10.8477 17.0548 10.8038 16.9615 10.7522C16.6593 10.5854 16.3532 10.4295 15.8814 9.89313L15.6377 9.61598C14.8646 8.73692 14.478 8.2974 14.0073 8.12342C13.6378 7.98687 13.2358 7.96302 12.8526 8.0549C12.3644 8.17197 11.9281 8.56267 11.0554 9.34406C10.1519 10.1531 9.70012 10.5576 9.53345 11.0424C9.40273 11.4226 9.39187 11.8334 9.50232 12.2199C9.61806 12.6249 9.92895 12.9858 10.5132 13.5763M14.9717 9.63338L10.5132 13.5763M10.5132 13.5763L10.5121 13.5772",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["circle",{cx:"16.5",cy:"4.75",r:"1.5",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];
const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  u = "bg-white dark:bg-neutral-950",
  b = "text-neutral-900 dark:text-neutral-100",
  p = "border-t border-neutral-900/8 dark:border-neutral-100/8",
  x = "text-[14px]/[16px] font-[450]",
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  v = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  m = "relative inline-flex size-4 shrink-0 items-center justify-center",
  _ = "peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40",
  g = "pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]",
  f = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  k = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  w = "ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66",
  j = "inline-flex h-7 cursor-pointer items-center rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80 decoration-1 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100";

function y({min:e,max:r,step:a=1,value:n,onChange:l,format:s,labels:o}){
  let c=useRef(null),[d,u]=useState(null),b=t=>Math.min(r,Math.max(e,Math.round(t/a)*a)),p=a=>(a-e)/(r-e)*100,x=a=>{
    let t=c.current;
    if(!t)return e;
    let i=t.getBoundingClientRect();
    return 0===width?e:b(e+(a-left)/width*(r-e));
  },h=(e,r)=>{
    let[a,t]=n;
    0===e?l([Math.min(r,t),t]):l([a,Math.max(r,a)])
  },v=t=>({role:"slider",tabIndex:0,"aria-label":o[t],"aria-valuemin":e,"aria-valuemax":r,"aria-valuenow":n[t],"aria-valuetext":s(n[t]),style:{left:`${p(n[t])}%`,touchAction:"none"},onPointerDown:e=>{
    e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId),u(t)
  },onPointerMove:e=>{
    d===t&&h(t,x(e.clientX))
  },onLostPointerCapture:()=>u(null),onPointerUp:e=>{
    e.currentTarget.releasePointerCapture(e.pointerId),u(null)
  },onKeyDown:i=>{
    let l=Math.max(a,Math.round((r-e)/10)),s=n[t],o=null;
    "ArrowLeft"===key||"ArrowDown"===key?o=s-a:"ArrowRight"===key||"ArrowUp"===key?o=s+a:"PageDown"===key?o=s-l:"PageUp"===key?o=s+l:"Home"===key?o=e:"End"===key&&(o=r),null!==o&&(preventDefault(),h(t,b(o)))
  },className:"absolute top-1/2 block size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] shadow-[0_0_0_2px_white] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:shadow-[0_0_0_2px_var(--color-neutral-900)]"});
  return (
    <div ref={c} onPointerDown={e=>{
        let r=x(e.clientX);
        h(Math.abs(r-n[0])<=Math.abs(r-n[1])?0:1,r)
      }} className="relative flex h-4 w-full cursor-pointer touch-none items-center select-none">
        <div className="relative h-1 w-full grow rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8">
          <span className="absolute inset-y-0 rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))]" style={{left:`${p(n[0])}%`,width:`${p(n[1])-p(n[0])}%`}} />
          <div {...v(0)} />
          <div {...v(1)} />
        </div>
      </div>
  );
}

let N = [{value:"all",label:"All"},{value:"road",label:"Road"},{value:"gravel",label:"Gravel"},{value:"mountain",label:"Mountain"},{value:"city",label:"City"}],
  z = [{value:"xs",label:"48 cm"},{value:"s",label:"51 cm"},{value:"m",label:"54 cm"},{value:"l",label:"56 cm"},{value:"xl",label:"58 cm"}],
  C = [{value:"likenew",label:"Like new"},{value:"excellent",label:"Excellent"},{value:"good",label:"Good"},{value:"fair",label:"Fair"}],
  S = [{value:"105",label:"Shimano 105"},{value:"grx",label:"Shimano GRX"},{value:"deore",label:"Shimano Deore"},{value:"rival",label:"SRAM Rival"},{value:"gx",label:"SRAM GX"}],
  A = [{id:"b1",name:"Canyon Endurace 7",discipline:"road",size:"m",price:1450,condition:"excellent",groupset:"105"},{id:"b2",name:"Specialized Allez",discipline:"road",size:"s",price:780,condition:"good",groupset:"105"},{id:"b3",name:"Trek \xc9monda SL",discipline:"road",size:"l",price:2100,condition:"likenew",groupset:"105"},{id:"b4",name:"Giant TCR Advanced",discipline:"road",size:"m",price:1650,condition:"excellent",groupset:"rival"},{id:"b5",name:"Cannondale CAAD13",discipline:"road",size:"s",price:1200,condition:"good",groupset:"rival"},{id:"b6",name:"Bianchi Via Nirone",discipline:"road",size:"xl",price:690,condition:"fair",groupset:"105"},{id:"b7",name:"Cerv\xe9lo \xc1spero",discipline:"gravel",size:"l",price:2600,condition:"likenew",groupset:"grx"},{id:"b8",name:"Salsa Warbird",discipline:"gravel",size:"m",price:1900,condition:"excellent",groupset:"grx"},{id:"b9",name:"Cannondale Topstone",discipline:"gravel",size:"s",price:1350,condition:"good",groupset:"rival"},{id:"b10",name:"Kona Rove AL",discipline:"gravel",size:"l",price:850,condition:"fair",groupset:"grx"},{id:"b11",name:"Santa Cruz Tallboy",discipline:"mountain",size:"l",price:3200,condition:"excellent",groupset:"gx"},{id:"b12",name:"Trek Fuel EX 8",discipline:"mountain",size:"m",price:2400,condition:"good",groupset:"deore"},{id:"b13",name:"Specialized Rockhopper",discipline:"mountain",size:"s",price:620,condition:"good",groupset:"deore"},{id:"b14",name:"Giant Trance X",discipline:"mountain",size:"xl",price:2850,condition:"likenew",groupset:"gx"},{id:"b15",name:"Kona Process 134",discipline:"mountain",size:"m",price:1750,condition:"fair",groupset:"deore"},{id:"b16",name:"Brompton C Line",discipline:"city",size:"m",price:1100,condition:"excellent",groupset:"deore"},{id:"b17",name:"Trek FX 3 Disc",discipline:"city",size:"s",price:480,condition:"good",groupset:"deore"},{id:"b18",name:"Priority Continuum",discipline:"city",size:"l",price:720,condition:"likenew",groupset:"deore"}],
  H = e=>`$${e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`,
  L = {size:[],condition:[],groupset:[],price:[400,3500]},
  D = (e,r,a,t)=>("all"===r||e.discipline===r)&&("size"===t||!a.size.length||!!a.size.includes(e.size))&&("condition"===t||!a.condition.length||!!a.condition.includes(e.condition))&&("groupset"===t||!a.groupset.length||!!a.groupset.includes(e.groupset))&&("price"===t||!(e.price<a.price[0])&&!(e.price>a.price[1]))&&true;

function M({label:e,children:r}){
  return (
    <section className="py-5">
        <h3 className={d(x,"mb-3")}>{e}</h3>
        {r}
      </section>
  );
}

function R(){
  let[e,r]=useState(true),[a,R]=useState("all"),[E,P]=useState(L),{ref:B,edges:T,onScroll:W}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:i,clientHeight:n}=r;
      a({start:t>1,end:Math.ceil(t+n)<i-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let i=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),$=(e,r)=>P(a=>({...a,[e]:a[e].includes(r)?a[e].filter(e=>e!==r):[...a[e],r]})),F=useMemo(()=>A.filter(e=>D(e,a,E)), [a,E]),U=(e,r)=>A.filter(t=>D(t,a,E,e)&&t[e]===r).length,G=400!==E.price[0]||3500!==E.price[1],I=E.size.length+E.condition.length+E.groupset.length+ +("all"!==a)+ +!!G,V=()=>{
    R("all"),P(L)
  };
  return e?<div className={d(u,b,"relative flex h-full min-h-[760px] w-full flex-col items-center overflow-hidden p-8 sm:p-10")}>
    <div className={d(f,"w-full max-w-[420px] flex-1")}>
      <header className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Filters</h2>
          <p className={d("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 flex flex-wrap gap-x-3")}>
            <span>Second-hand bikes</span>
            {I>0&&<span>
              <span className="tabular-nums">{I}</span>
              {" active"}
            </span>}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={V} disabled={0===I} className={d(j,"disabled:pointer-events-none disabled:opacity-40")}>Clear all</button>
          <button type="button" aria-label="Close filters" onClick={()=>r(false)} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]")}>
            <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className={d(p,"relative min-h-0 flex-1")}>
        <div ref={B} onScroll={W} className="h-full overflow-y-auto px-5">
          <div className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
            <M label="Discipline">
              <div role="radiogroup" aria-label="Discipline" className={d("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","w-full")}>
                {N.map(e=>{
                  let r=a===e.value;
                  return <button key={e.value} type="button" role="radio" aria-checked={r} onClick={()=>R(e.value)} className={d("relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40","grow")}>{e.label}</button>;
                })}
              </div>
            </M>
            <M label="Frame size">
              <ul className="-mx-2 space-y-0.5">
                {z.map(e=>{
                  let r=U("size",e.value),a=E.size.includes(e.value);
                  return (
                    <li key={e.value}>
                                        <label className={d(k,"h-9",0===r&&!a&&"opacity-40")}>
                                          <span className={m}>
                                            <input type="checkbox" checked={a} onChange={()=>$("size",e.value)} className={_} />
                                            <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={g} />
                                          </span>
                                          <span className="min-w-0 flex-1 truncate">{e.label}</span>
                                          <span className={d(w,"shrink-0")}>{r}</span>
                                        </label>
                                      </li>
                  );
                })}
              </ul>
            </M>
            <M label="Price">
              <div className="mb-4 flex min-h-7 items-center justify-between">
                <span className={d(x,"tabular-nums")}>
                  {H(E.price[0])}
                  {" – "}
                  {H(E.price[1])}
                </span>
                {G&&<button type="button" onClick={()=>P(e=>({...e,price:[400,3500]}))} className={j}>Reset</button>}
              </div>
              <y min={400} max={3500} step={50} value={E.price} onChange={e=>P(r=>({...r,price:e}))} format={H} labels={["Minimum price","Maximum price"]} />
            </M>
            <M label="Condition">
              <div className="flex flex-wrap gap-2">
                {C.map(e=>{
                  let r=E.condition.includes(e.value),a=U("condition",e.value);
                  return <button key={e.value} type="button" aria-pressed={r} onClick={()=>$("condition",e.value)} className={d("relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40",0===a&&!r&&"opacity-40")}>{e.label}</button>;
                })}
              </div>
            </M>
            <M label="Groupset">
              <ul className="-mx-2 space-y-0.5">
                {S.map(e=>{
                  let r=U("groupset",e.value),a=E.groupset.includes(e.value);
                  return (
                    <li key={e.value}>
                                        <label className={d(k,"h-9",0===r&&!a&&"opacity-40")}>
                                          <span className={m}>
                                            <input type="checkbox" checked={a} onChange={()=>$("groupset",e.value)} className={_} />
                                            <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={g} />
                                          </span>
                                          <span className="min-w-0 flex-1 truncate">{e.label}</span>
                                          <span className={d(w,"shrink-0")}>{r}</span>
                                        </label>
                                      </li>
                  );
                })}
              </ul>
            </M>
          </div>
        </div>
        <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",T.start?"opacity-100":"opacity-0")} />
        <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",T.end?"opacity-100":"opacity-0")} />
      </div>
      <div className={d(p,"flex items-center gap-2 p-2 ps-3")}>
        <button type="button" onClick={V} disabled={0===I} className={d(j,"disabled:pointer-events-none disabled:opacity-40")}>Reset</button>
        <button type="button" onClick={()=>r(false)} disabled={0===F.length} className={d(h,v,"flex-1")}>
          {0===F.length?"No bikes match":<span>
            {"Show "}
            <span className="tabular-nums">{F.length}</span>
            {" "}
            {1===F.length?"result":"results"}
          </span>}
        </button>
      </div>
    </div>
  </div>:<div className={d(u,b,"relative flex h-full min-h-[760px] w-full flex-col items-center justify-center overflow-hidden p-8 sm:p-10")}>
    <div className={d(f,"w-full max-w-[420px] items-center px-6 py-10 text-center")}>
      <div className={d("text-neutral-900/80 dark:text-neutral-100/80","mb-3 flex h-10 w-10 items-center justify-center")}>
        <HugeiconsIcon icon={Icon_24437} size={20} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">Filters hidden</p>
      <p className={d("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-xs")}>
        <span className="tabular-nums">{F.length}</span>
        {" of"}
        {" "}
        <span className="tabular-nums">{A.length}</span>
        {" bikes match your current filters."}
      </p>
      <button type="button" onClick={()=>r(true)} className={d(h,v,"mt-5")}>
        <HugeiconsIcon icon={Icon_68656} size={16} strokeWidth={1.8} aria-hidden="true" />
        Show filters
      </button>
    </div>
  </div>;
}


export default R;
