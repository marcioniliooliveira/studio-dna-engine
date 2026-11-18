/**
 * React Bits Pro — Application UI (editor-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_28547 = [["path",{d:"M4 5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M17 19H18.5M20 19H18.5M18.5 19V11L17 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M4 12L14 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_75794 = [["path",{d:"M3.5 5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13.5 5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 19H16.5V18.6907C16.5 18.2521 16.5 18.0327 16.5865 17.8385C16.673 17.6443 16.836 17.4976 17.1621 17.2041L19.7671 14.8596C20.2336 14.4397 20.5 13.8416 20.5 13.214V13C20.5 11.8954 19.6046 11 18.5 11C17.3954 11 16.5 11.8954 16.5 13V13.4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3.5 12L13.5 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_30322 = [["path",{d:"M10 8C10 9.88562 10 10.8284 9.41421 11.4142C8.82843 12 7.88562 12 6 12C4.11438 12 3.17157 12 2.58579 11.4142C2 10.8284 2 9.88562 2 8C2 6.11438 2 5.17157 2.58579 4.58579C3.17157 4 4.11438 4 6 4C7.88562 4 8.82843 4 9.41421 4.58579C10 5.17157 10 6.11438 10 8Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 7L10 11.4821C10 15.4547 7.48429 18.8237 4 20",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M22 8C22 9.88562 22 10.8284 21.4142 11.4142C20.8284 12 19.8856 12 18 12C16.1144 12 15.1716 12 14.5858 11.4142C14 10.8284 14 9.88562 14 8C14 6.11438 14 5.17157 14.5858 4.58579C15.1716 4 16.1144 4 18 4C19.8856 4 20.8284 4 21.4142 4.58579C22 5.17157 22 6.11438 22 8Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M22 7L22 11.4821C22 15.4547 19.4843 18.8237 16 20",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_48240 = [["path",{d:"M8 5.5L20 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L20 12.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 19.5L20 19.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M4.375 5.5H4.25M4.5 5.5C4.5 5.63807 4.38807 5.75 4.25 5.75C4.11193 5.75 4 5.63807 4 5.5C4 5.36193 4.11193 5.25 4.25 5.25C4.38807 5.25 4.5 5.36193 4.5 5.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M4.375 12.5H4.25M4.5 12.5C4.5 12.6381 4.38807 12.75 4.25 12.75C4.11193 12.75 4 12.6381 4 12.5C4 12.3619 4.11193 12.25 4.25 12.25C4.38807 12.25 4.5 12.3619 4.5 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M4.375 19.5H4.25M4.5 19.5C4.5 19.6381 4.38807 19.75 4.25 19.75C4.11193 19.75 4 19.6381 4 19.5C4 19.3619 4.11193 19.25 4.25 19.25C4.38807 19.25 4.5 19.3619 4.5 19.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_39425 = [["path",{d:"M11 6L21 6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 12L21 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 18L21 18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 15H4.5C4.77879 15 4.91819 15 5.03411 15.0231C5.51014 15.1177 5.88225 15.4899 5.97694 15.9659C6 16.0818 6 16.2212 6 16.5C6 16.7788 6 16.9182 5.97694 17.0341C5.88225 17.5101 5.51014 17.8823 5.03411 17.9769C4.91819 18 4.77879 18 4.5 18C4.22121 18 4.08181 18 3.96589 18.0231C3.48986 18.1177 3.11775 18.4899 3.02306 18.9659C3 19.0818 3 19.2212 3 19.5V20.4C3 20.6828 3 20.8243 3.08787 20.9121C3.17574 21 3.31716 21 3.6 21H6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 3H4.2C4.36569 3 4.5 3.13431 4.5 3.3V9M4.5 9H3M4.5 9H6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_64132 = [["path",{d:"M5 6C5 4.58579 5 3.87868 5.43934 3.43934C5.87868 3 6.58579 3 8 3H12.5789C15.0206 3 17 5.01472 17 7.5C17 9.98528 15.0206 12 12.5789 12H5V6Z",stroke:"currentColor",fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.4286 12H13.6667C16.0599 12 18 14.0147 18 16.5C18 18.9853 16.0599 21 13.6667 21H8C6.58579 21 5.87868 21 5.43934 20.5607C5 20.1213 5 19.4142 5 18V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_17771 = [["path",{d:"M12 4H19",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 20L16 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 20H12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_22244 = [["path",{d:"M4 12H20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 7.66667C17.5 5.08934 15.0376 3 12 3C8.96243 3 6.5 5.08934 6.5 7.66667C6.5 8.15279 6.55336 8.59783 6.6668 9M6 16.3333C6 18.9107 8.68629 21 12 21C15.3137 21 18 19.6667 18 16.3333C18 13.9404 16.9693 12.5782 14.9079 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_81320 = [["path",{d:"M17 8L18.8398 9.85008C19.6133 10.6279 20 11.0168 20 11.5C20 11.9832 19.6133 12.3721 18.8398 13.1499L17 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 8L5.16019 9.85008C4.38673 10.6279 4 11.0168 4 11.5C4 11.9832 4.38673 12.3721 5.16019 13.1499L7 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 4L9.5 20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_33786 = [["path",{d:"M14.9961 17H16.9961C19.7575 17 21.9961 14.7614 21.9961 12C21.9961 9.23858 19.7575 7 16.9961 7H14.9961M8.99609 17H6.99609C4.23467 17 1.99609 14.7614 1.99609 12C1.99609 9.23858 4.23467 7 6.99609 7H8.99609",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.49609 12H15.4961",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_62955 = [["path",{d:"M3 8H15C18.3137 8 21 10.6863 21 14C21 17.3137 18.3137 20 15 20H11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 4L5.8462 4.87652C3.94873 6.31801 3 7.03875 3 8C3 8.96125 3.94873 9.68199 5.8462 11.1235L7 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_88353 = [["path",{d:"M21 8H9C5.68629 8 3 10.6863 3 14C3 17.3137 5.68629 20 9 20H13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 4L18.1538 4.87652C20.0513 6.31801 21 7.03875 21 8C21 8.96125 20.0513 9.68199 18.1538 11.1235L17 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let y = (...e)=>e.filter(Boolean).join(" "),
  j = "text-neutral-900 dark:text-neutral-100",
  N = "text-neutral-900/66 dark:text-neutral-100/66",
  S = "border-r border-neutral-900/8 dark:border-neutral-100/8",
  z = "rounded-[var(--rb-r-sm,6px)]",
  A = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  R = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  E = "size-7 rounded-[var(--rb-r-sm,6px)]",
  W = y("text-[24px]/[28px] font-[450] tracking-[-0.015em]",j),
  C = y("text-[13px]/[18px] font-normal",N),
  D = y("text-[16px]/[22px] font-normal tracking-[-0.01em]","text-neutral-900/80 dark:text-neutral-100/80"),
  M = y("text-[12px]/[16px] font-normal tabular-nums",N),
  O = [{id:"p",label:"Paragraph",icon:null},{id:"h1",label:"Heading 1",icon:Icon_28547},{id:"h2",label:"Heading 2",icon:Icon_75794},{id:"quote",label:"Quote",icon:Icon_30322},{id:"ul",label:"Bulleted list",icon:Icon_48240},{id:"ol",label:"Numbered list",icon:Icon_39425}],
  $ = [{id:"bold",label:"Bold",icon:Icon_64132,keys:"Ctrl B"},{id:"italic",label:"Italic",icon:Icon_17771,keys:"Ctrl I"},{id:"strike",label:"Strikethrough",icon:Icon_22244,keys:"Ctrl S"},{id:"code",label:"Inline code",icon:Icon_81320,keys:"Ctrl E"},{id:"link",label:"Link",icon:Icon_33786,keys:"Ctrl K"}],
  I = [{label:"Undo",icon:Icon_62955},{label:"Redo",icon:Icon_88353}],
  H = `Halcyon writes every permission change to an append-only ledger. Each entry records the actor, the resource, the previous value and the reason supplied at the time of the change.

Entries are immutable. A correction is a new entry that supersedes the old one, which means the history of a resource can always be replayed exactly as it happened.

Retention follows the workspace plan: ninety days on Team, one year on Scale, and seven years on Enterprise.`;

function T(){
  let e=useReducedMotion(),[t,r]=useState(H),[d,c]=useState("p"),[u,x]=useState(["bold"]),[p,h]=useState(false),[b,m]=useState(false),[f,v]=useState(0),[k,g]=useState("saved"),T=useRef(null),L=useRef(null),P=useRef([]),B=useRef(null),{ref:U,edges:q,onScroll:F}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollLeft:a,scrollWidth:n,clientWidth:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),{ref:V,edges:K,onScroll:J}=function(e){
    let t=useRef(null),[r,a]=useState({start:false,end:false}),i=useCallback(()=>{
      let e=t.current;
      if(!e)return;
      let{scrollTop:r,scrollHeight:n,clientHeight:i}=e;
      a({start:r>1,end:Math.ceil(r+i)<n-1})
    }, []);
    return useEffect(()=>{
      i();
      let e=t.current,r=e?.ownerDocument.defaultView;
      if(!e||!r?.ResizeObserver)return;
      let a=new r.ResizeObserver(i);
      return a.observe(e),()=>a.disconnect();
    }, [e,i]),{ref:t,edges:r,onScroll:i};
  }(t),Q=useMemo(()=>{
    let e=t.trim()?t.trim().split(/\s+/).length:0;
    return {words:e,chars:t.length,read:Math.max(1,Math.round(e/220))};
  }, [t]);
  useEffect(()=>{
    if(!p)return;
    let e=T.current,t=e?.ownerDocument??document,r=t=>{
      e&&!e.contains(t.target)&&h(false)
    },a=e=>{
      "Escape"===e.key&&(h(false),L.current?.focus({preventScroll:true}))
    };
    return t.addEventListener("mousedown",r),t.addEventListener("keydown",a),()=>{
      t.removeEventListener("mousedown",r),t.removeEventListener("keydown",a)
    };
  }, [p]),useEffect(()=>{
    p&&P.current[f]?.focus({preventScroll:true})
  }, [p,f]),useEffect(()=>{
    if("saving"!==k)return;
    let e=window.setTimeout(()=>g("saved"),900);
    return ()=>window.clearTimeout(e);
  }, [k,t]);
  let G=e=>{
    m(e),v(Math.max(0,O.findIndex(e=>e.id===d))),h(true)
  },X=O.find(e=>e.id===d);
  return (
    <div className={y("bg-white dark:bg-neutral-950",j,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <div className={y("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","flex shrink-0 items-center gap-1 px-2 py-1")}>
          <div className="relative shrink-0" ref={T}>
            <button ref={L} type="button" aria-haspopup="menu" aria-expanded={p} onClick={e=>p?h(false):G(0===e.detail)} onKeyDown={e=>{
              ("ArrowDown"===e.key||"ArrowUp"===e.key)&&(e.preventDefault(),G(true))
            }} className={y("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]","min-w-[132px]")}>
              <span className="flex-1 text-left">{X.label}</span>
              <HugeiconsIcon icon={Icon_20148} size={12} strokeWidth={1.8} aria-hidden="true" className={y(N,"shrink-0",p&&"rotate-180")} />
            </button>
            <AnimatePresence>
              {p&&<motion.div role="menu" aria-label="Block type" initial={!e&&!b&&{opacity:0}} animate={{opacity:1,transition:{duration:.16,ease:[.2,0,0,1]}}} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:[.2,0,0,1]}}} onKeyDown={e=>{
                "ArrowDown"===e.key?(e.preventDefault(),v(e=>(e+1)%O.length)):"ArrowUp"===e.key?(e.preventDefault(),v(e=>(e-1+O.length)%O.length)):"Home"===e.key?(e.preventDefault(),v(0)):"End"===e.key?(e.preventDefault(),v(O.length-1)):"Tab"===e.key&&h(false)
              }} className={y("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute top-[calc(100%+6px)] left-0 z-30 w-[180px] min-w-[180px]")}>
                {O.map((e,t)=>{
                  let r=e.id===d;
                  return (
                    <button key={e.id} ref={e=>{
                                    P.current[t]=e
                                  }} role="menuitemradio" aria-checked={r} type="button" tabIndex={t===f?0:-1} onFocus={()=>v(t)} onClick={()=>{
                                    c(e.id),h(false),L.current?.focus({preventScroll:true})
                                  }} className="relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40">
                                    {e.icon?<HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" />:<span className="size-4 shrink-0" />}
                                    <span className="flex-1">{e.label}</span>
                                    {r&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />}
                                  </button>
                  );
                })}
              </motion.div>}
            </AnimatePresence>
          </div>
          <span aria-hidden="true" className={y(S,"ml-1 h-5 w-px shrink-0")} />
          <div className="relative min-w-0 flex-1">
            <div ref={U} onScroll={F} className="flex items-center gap-1 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {$.map(e=>{
                let t=u.includes(e.id);
                return (
                  <button key={e.id} type="button" aria-pressed={t} title={`${e.label} (${e.keys})`} onClick={()=>{
                                let t;
                                return t=e.id,x(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t]);
                              }} className={y(R,E)}>
                                <HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                                <span className="sr-only">{e.label}</span>
                              </button>
                );
              })}
              <span aria-hidden="true" className={y(S,"mx-1 h-5 w-px shrink-0")} />
              {I.map(e=><button key={e.label} type="button" aria-label={e.label} className={y(R,E)}><HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" /></button>)}
            </div>
            <div aria-hidden="true" className={y("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 left-0 w-8",q.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={y("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 right-0 w-8",q.end?"opacity-100":"opacity-0")} />
          </div>
          <span className={y(M,"shrink-0 pr-3")}>{"saved"===k?"Saved":"Saving…"}</span>
        </div>
        <div className="relative min-h-0 flex-1">
          <div ref={V} onScroll={J} className="h-full overflow-y-auto">
            <div className="mx-auto w-full max-w-[720px] px-6 py-8 sm:px-8">
              <input aria-label="Document title" defaultValue="Audit ledger design notes" onChange={()=>g("saving")} className={y(W,A,z,"w-full")} placeholder="Untitled" />
              <p className={y(C,"mt-1.5 flex flex-wrap gap-x-3 gap-y-1")}>
                <span>Draft by Ana Reyes</span>
                <span>Last edited 4 minutes ago</span>
              </p>
              <textarea ref={B} aria-label="Document body" value={t} onChange={e=>{
                r(e.target.value),g("saving")
              }} spellCheck={false} className={y(D,A,z,"mt-6 min-h-[320px] w-full resize-none field-sizing-content")} placeholder="Start writing…" />
            </div>
          </div>
          <div aria-hidden="true" className={y("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",K.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={y("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",K.end?"opacity-100":"opacity-0")} />
        </div>
        <footer className={y("border-t border-neutral-900/8 dark:border-neutral-100/8",M,"flex shrink-0 items-center gap-4 px-5 py-2.5")}>
          <span className="tabular-nums">
            {Q.words}
            {" words"}
          </span>
          <span className="tabular-nums">
            {Q.chars}
            {" characters"}
          </span>
          <span className="tabular-nums">
            {Q.read}
            {" min read"}
          </span>
          <span className="ml-auto hidden sm:inline">Markdown shortcuts are on</span>
        </footer>
      </div>
  );
}


export default T;
