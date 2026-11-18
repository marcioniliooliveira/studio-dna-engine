/**
 * React Bits Pro — Application UI (scheduling-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, duration, from, observe, push, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58661 = [["path",{d:"M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let h = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  f = "text-[12px]/[16px] font-[450] tabular-nums",
  m = "text-[12px]/[16px] font-normal tabular-nums",
  _ = "bg-neutral-50 dark:bg-neutral-900",
  k = "border-t border-neutral-900/8 dark:border-neutral-100/8",
  v = "border-r border-neutral-900/8 dark:border-neutral-100/8",
  g = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  w = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  y = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  j = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  N = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  z = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  C = "size-8 rounded-[var(--rb-r-sm,6px)]",
  S = Array.from({length:10},(e,r)=>8+r),
  D = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  M = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
  E = e=>e-(e-1)%7,
  $ = [{label:"30 min",value:.5},{label:"45 min",value:.75},{label:"1 hour",value:1},{label:"90 min",value:1.5},{label:"2 hours",value:2}],
  A = [{id:"e1",date:8,from:9,duration:.5,title:"Standup"},{id:"e2",date:8,from:11,duration:1.5,title:"Roadmap shaping"},{id:"e3",date:9,from:10,duration:1,title:"1:1 with Nadia"},{id:"e4",date:9,from:10.5,duration:1,title:"Vendor call"},{id:"e5",date:9,from:14,duration:2,title:"Design critique"},{id:"e6",date:10,from:9.5,duration:1,title:"Mobile QA handoff"},{id:"e7",date:10,from:13,duration:1,title:"All-hands"},{id:"e8",date:11,from:11,duration:1,title:"Hiring panel"},{id:"e9",date:11,from:15,duration:1,title:"Platform retro"},{id:"e10",date:12,from:9,duration:3,title:"Focus block"},{id:"e11",date:12,from:14,duration:1,title:"Customer demo"}],
  W = (e,r,t)=>Math.min(t,Math.max(r,e)),
  T = e=>.25*Math.round(e/.25);

function R(e){
  let r=Math.floor(e),t=Math.round((e-r)*60);
  return `${r>12?r-12:r}:${String(t).padStart(2,"0")} ${r>=12?"pm":"am"}`;
}

function P(e){
  let r=Math.round(60*e);
  if(r<60)return `${r} min`;
  let t=Math.floor(r/60),a=r%60;
  return a?`${t} h ${a} min`:`${t} h`;
}

function I({id:e,value:r,defaultValue:t,onChange:s,options:d,disabled:u,placeholder:c="Select…",className:b,triggerClassName:x,ariaLabel:p}){
  let f=useId(),[m,_]=useState(false),[k,v]=useState(0),[g,w]=useState(false),[y,j]=useState(),[N,z]=useState(t??""),C=useRef(null),S=useRef(null),D=useRef({buffer:"",at:0}),M=r??N,E=d.findIndex(e=>e.value===M),$=E>=0?d[E]:undefined,A=()=>{
    if(u)return;
    let e=C.current,r=e?.ownerDocument.defaultView;
    if(e&&r){
      let t=e.getBoundingClientRect(),a=0,n=r.innerHeight;
      for(let t=e.parentElement;t;t=t.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(t).overflowY)){
        let e=t.getBoundingClientRect();
        a=Math.max(a,e.top),n=Math.min(n,e.bottom);
        break
      }
      let l=n-t.bottom,i=t.top-a,o=Math.min(32*d.length+8,264),s=l<o+8&&i>l,u=(s?i:l)-8;
      w(s),j(u<o?Math.max(u,40):undefined)
    }
    v(E>=0?E:0),_(true)
  };
  useEffect(()=>{
    if(!m)return;
    let e=C.current;
    if(!e)return;
    let r=e.ownerDocument,t=r=>{
      e.contains(r.target)||_(false)
    };
    return r.addEventListener("mousedown",t),r.addEventListener("touchstart",t),()=>{
      r.removeEventListener("mousedown",t),r.removeEventListener("touchstart",t)
    };
  }, [m]),useEffect(()=>{
    if(!m)return;
    let e=S.current,r=e?.querySelector(`[data-index="${k}"]`);
    if(!e||!r)return;
    let t=r.offsetTop,a=t+r.offsetHeight;
    t<e.scrollTop?e.scrollTop=t:a>e.scrollTop+e.clientHeight&&(e.scrollTop=a-e.clientHeight)
  }, [m,k]);
  let W=e=>{
    let t=d[e];
    t&&(undefined===r&&z(t.value),s?.(t.value),_(false),C.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={C} className={h("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={m} aria-controls={f} aria-haspopup="listbox" aria-label={p} disabled={u} onClick={()=>m?_(false):A()} onKeyDown={e=>{
          if(!u){
            if(!m){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),A());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),_(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),v(e=>Math.min(e+1,d.length-1));else if("ArrowUp"===e.key)e.preventDefault(),v(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),v(0);else if("End"===e.key)e.preventDefault(),v(d.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),W(k);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),t=D.current;
              t.buffer=r-t.at>700?e.key:t.buffer+e.key,t.at=r;
              let a=d.findIndex(e=>e.label.toLowerCase().startsWith(t.buffer.toLowerCase()));
              a>=0&&v(a)
            }
          }
        }} className={h("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",x)}>
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {d.map(e=><span key={e.value} aria-hidden="true" className="invisible truncate">{e.label}</span>)}
            <span className={h("truncate",!$&&"text-neutral-900/66 dark:text-neutral-100/66")}>{$?$.label:c}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {m&&<ul ref={S} id={f} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={h("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {d.map((e,r)=>{
            let t=e.value===M;
            return (
              <li key={e.value} role="option" aria-selected={t} data-index={r} data-highlighted={r===k?"":undefined} onMouseEnter={()=>v(r)} onClick={()=>W(r)} className={h("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {t&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function H(){
  let[e,r]=useState("Week"),[t,i]=useState(E(10)),[o,H]=useState(10),[L,U]=useState(A),[B,q]=useState(null),[F,J]=useState(false),V=useRef(null),Y=useRef(false),K=useRef(null),{ref:O,edges:X,onScroll:Q}=function(){
    let e=useRef(null),[r,t]=useState({start:false,end:false}),a=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=r;
      t({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let r=e.current,t=r?.ownerDocument.defaultView;
      if(!r||!t?.ResizeObserver)return;
      let n=new t.ResizeObserver(a);
      return observe(r),()=>disconnect();
    }, [a]),{ref:e,edges:r,onScroll:a};
  }(),G=useMemo(()=>"Week"===e?Array.from({length:5},(e,r)=>t+r):[o], [e,t,o]),Z=L.find(e=>e.id===B)??null,ee=(e,r)=>{
    let t=K.current;
    if(!t)return null;
    let a=t.getBoundingClientRect(),n=W(Math.floor((e-a.left)/a.width*G.length),0,G.length-1),l=8+(r-a.top)/56;
    return {date:G[n],time:l};
  },er=(e,r)=>U(t=>t.map(t=>t.id===e?{...t,...r}:t)),et=e=>{
    V.current&&(e.currentTarget.hasPointerCapture(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId),V.current=null,J(false))
  },ea=r=>{
    if(q(null),"Week"===e){
      let e=W(t+7*r,1,22);
      i(e),H(e+2);
      return
    }
    let a=W(o+r,1,26);
    H(a),i(W(E(a),1,22))
  },en="Week"===e?`${t} – ${t+4} June`:`${o} June`,el=`${M[(o-1)%7]}, `;
  return (
    <div className={h("bg-white dark:bg-neutral-950",x,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className={h("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","flex h-14 shrink-0 items-center gap-2 px-4 sm:px-5")}>
          <div className="flex shrink-0 items-center gap-0.5">
            <button type="button" onClick={()=>ea(-1)} aria-label={"Week"===e?"Previous week":"Previous day"} className={h(N,C)}>
              <HugeiconsIcon icon={Icon_58661} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" onClick={()=>ea(1)} aria-label={"Week"===e?"Next week":"Next day"} className={h(N,C)}>
              <HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <button type="button" onClick={()=>{
            i(E(10)),H(10),q(null)
          }} className={h(j,z)}>Today</button>
          <h1 className={h("text-[14px]/[16px] font-[450]","min-w-0 flex-1 truncate px-1 tabular-nums")}>
            {"Day"===e&&<span className="max-sm:hidden">{el}</span>}
            {en}
            <span className="max-sm:hidden">{" 2026"}</span>
          </h1>
          <div role="radiogroup" aria-label="Calendar view" className={h("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0 max-sm:hidden")}>
            {["Day","Week"].map(t=>(
              <button key={t} type="button" role="radio" aria-checked={t===e} onClick={()=>{
                        r(t),q(null)
                      }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{t}</button>
            ))}
          </div>
          <button type="button" onClick={()=>{
            let e=G.includes(o)?o:G[0],r=`draft-${Date.now()}`;
            U(t=>[...t,{id:r,date:e,from:9,duration:1,title:"Untitled"}]),q(r)
          }} className={h(y,z)}>
            <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
            New
          </button>
        </header>
        <div className={h("border-b border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0")}>
          <div className="w-14 shrink-0" />
          <div className="grid flex-1" style={{gridTemplateColumns:`repeat(${G.length}, minmax(0, 1fr))`}}>
            {G.map(e=>{
              let t=10===e;
              return (
                <button key={e} type="button" onClick={()=>{
                            H(e),r("Day"),q(null)
                          }} className={h("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",w,g,"rounded-[var(--rb-r-sm,6px)]","m-1 flex cursor-pointer items-center justify-center gap-1.5 py-1.5")}>
                            <span className={h(m,p)}>{D[(e-1)%7]}</span>
                            <span className={t?h("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100"):f}>{e}</span>
                          </button>
              );
            })}
          </div>
        </div>
        <div className="relative min-h-0 flex-1">
          <div ref={O} onScroll={Q} className="h-full overflow-y-auto">
            <div className="flex select-none py-4">
              <div className={h(v,"w-14 shrink-0")}>
                {S.map(e=>(
                  <div key={e} style={{height:56}} className="relative">
                                <span className={h(m,p,"absolute -top-1.5 right-3")}>{12===e?"12 pm":e>12?`${e-12} pm`:`${e} am`}</span>
                              </div>
                ))}
              </div>
              <div ref={K} onPointerDown={e=>{
                if(0!==e.button)return;
                let r=ee(e.clientX,e.clientY);
                if(!r)return;
                let t=e.target,a=t.closest("[data-event-id]"),n=a?.dataset.eventId;
                if(e.currentTarget.setPointerCapture(e.pointerId),e.preventDefault(),Y.current=false,J(true),n){
                  let e=L.find(e=>e.id===n);
                  if(!e)return;
                  q(n),V.current=t.closest("[data-resize]")?{mode:"resize",id:n}:{mode:"move",id:n,grab:r.time-e.from};
                  return
                }
                let l=W(T(r.time),8,17.5),i={id:`draft-${Date.now()}`,date:r.date,from:l,duration:.5,title:"Untitled"};
                U(e=>[...e,i]),q(i.id),V.current={mode:"resize",id:i.id}
              }} onPointerMove={e=>{
                let r=V.current;
                if(!r)return;
                let t=ee(e.clientX,e.clientY);
                if(!t)return;
                Y.current=true;
                let a=L.find(e=>e.id===r.id);
                if(!a)return;
                if("move"===r.mode){
                  let e=W(T(t.time-r.grab),8,18-a.duration);
                  (e!==a.from||t.date!==a.date)&&er(r.id,{from:e,date:t.date});
                  return
                }
                let n=W(T(t.time-a.from),.5,18-a.from);
                n!==a.duration&&er(r.id,{duration:n})
              }} onPointerUp={et} onPointerCancel={et} style={{gridTemplateColumns:`repeat(${G.length}, minmax(0, 1fr))`,touchAction:"none"}} className={h("grid flex-1",F?"cursor-grabbing":"cursor-cell")}>
                {G.map((e,r)=>{
                  let t,n,l,i,o;
                  return (
                    <div key={e} className={h(r<G.length-1&&v,"relative")} style={{height:560}}>
                                    {S.slice(1).map(e=><div key={e} aria-hidden="true" style={{top:(e-8)*56}} className={h(k,"pointer-events-none absolute inset-x-0")} />)}
                                    {10===e&&<div aria-hidden="true" style={{top:131.59999999999997}} className={h(x,"pointer-events-none absolute inset-x-0 z-[3] flex -translate-y-1/2 items-center")}>
                                      <span className="size-1.5 shrink-0 bg-current" />
                                      <span className="h-px flex-1 bg-current" />
                                    </div>}
                                    {(t=[...L.filter(r=>r.date===e)].sort((e,r)=>e.from-r.from||r.duration-e.duration),n=[],l=[],i=-1/0,o=()=>{
                                      if(!l.length)return;
                                      let e=[];
                                      l.map(r=>{
                                        let t=e.findIndex(e=>e<=r.from+1e-6);
                                        return -1===t?(e.push(r.from+r.duration),t=e.length-1):e[t]=r.from+r.duration,{event:r,lane:t};
                                      }).forEach(r=>push({...r,lanes:Math.max(1,e.length)})),l=[],i=-1/0
                                    },t.forEach(e=>{
                                      l.length&&e.from>=i-1e-6&&o(),l.push(e),i=Math.max(i,e.from+e.duration)
                                    }),o(),n).map(({event:e,lane:r,lanes:t})=>{
                                      let n=e.id===B,l=56*e.duration-3;
                                      return (
                                        <button key={e.id} type="button" data-event-id={e.id} aria-pressed={n} onClick={()=>q(e.id)} onKeyDown={r=>{
                                                            if("ArrowUp"===r.key||"ArrowDown"===r.key){
                                                              var t,a;
                                                              let n;
                                                              r.preventDefault(),t=e.id,a="ArrowUp"===r.key?-1:1,(n=L.find(e=>e.id===t))&&er(t,{from:W(from+.25*a,8,18-duration)})
                                                            }
                                                          }} style={{top:(e.from-8)*56,height:l,left:`calc(${r/t*100}% + 3px)`,width:`calc(${100/t}% - 6px)`}} className={h(n?"bg-[oklch(86%_0.12_195)] dark:bg-[oklch(86%_0.12_195)]":"bg-[oklch(96.5%_0.04_195)] dark:bg-[oklch(31%_0.06_195)]",n?"text-neutral-900 dark:text-neutral-900":x,"rounded-[var(--rb-r-xs,4px)]",g,w,"group @container absolute overflow-hidden px-2 py-1 text-left",F?"cursor-grabbing":"cursor-grab",n?"z-[2]":"z-[1]")}>
                                                            <span className={h(f,"block truncate")}>{e.title}</span>
                                                            {l>34&&<span className={h(m,!n&&p,"block whitespace-nowrap @max-[72px]:hidden")}>{R(e.from)}</span>}
                                                            <span data-resize="true" aria-hidden="true" className={h(w,"absolute inset-x-0 bottom-0 flex h-3 cursor-ns-resize items-end justify-center pb-0.5 opacity-0 group-hover:opacity-100 group-aria-pressed:opacity-100")}><span className={h(!n&&p,"h-0.5 w-6 rounded-[1px] bg-current")} /></span>
                                                          </button>
                                      );
                                    })}
                                  </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={h("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 z-10 h-8",X.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8",X.end?"opacity-100":"opacity-0")} />
        </div>
        {Z?<div className={h(k,_,"flex h-[60px] shrink-0 items-center gap-2 px-4 sm:px-5")}>
          <div className={h("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","min-w-0 flex-1")}>
            <input value={Z.title} onChange={e=>er(Z.id,{title:e.target.value})} aria-label="Event title" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
          </div>
          <I ariaLabel="Duration" value={String(Z.duration)} placeholder={P(Z.duration)} onChange={e=>er(Z.id,{duration:W(Number(e),.5,18-Z.from)})} options={$.map(e=>({value:String(e.value),label:e.label}))} className="hidden shrink-0 sm:block" />
          <p className={h(m,p,"hidden shrink-0 gap-2 px-1 md:flex")}>
            <span>
              {"June "}
              {Z.date}
            </span>
            <span>{R(Z.from)}</span>
            <span>{P(Z.duration)}</span>
          </p>
          <button type="button" onClick={()=>{
            U(e=>e.filter(e=>e.id!==Z.id)),q(null)
          }} aria-label="Delete event" className={h(j,C)}>
            <HugeiconsIcon icon={Icon_96037} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button type="button" onClick={()=>q(null)} aria-label="Close editor" className={h(y,C)}>
            <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>:<div className={h(k,_,"flex h-[60px] shrink-0 items-center px-4 sm:px-5")}>
          <p className={h("text-[13px]/[18px] font-normal",p,"line-clamp-2")}>
            Drag on the grid to block out time. Drag an event to move it, or its bottom edge to resize.
          </p>
        </div>}
      </div>
  );
}


export default H;
