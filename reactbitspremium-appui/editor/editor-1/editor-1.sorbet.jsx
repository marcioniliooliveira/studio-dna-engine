/**
 * React Bits Pro — Application UI (editor-1 (Sorbet))
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
const Icon_84831 = [["path",{d:"M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_15304 = [["path",{d:"M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 2.5V21.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_2301 = [["path",{d:"M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let y = (...e)=>e.filter(Boolean).join(" ");

let j = "text-neutral-900 dark:text-neutral-100";

let N = "text-neutral-900/62 dark:text-neutral-100/62";

let S = "border-r border-transparent";

let z = "rounded-[var(--rb-r-4xl,18px)]";

let A = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let R = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let E = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let W = y("text-[26px]/[32px] font-extrabold tracking-[-0.015em]",j);

let C = y("text-[14px]/[20px] font-medium",N);

let D = y("text-[17px]/[26px] font-medium","text-neutral-900/78 dark:text-neutral-100/78");

let M = y("text-[13px]/[16px] font-semibold tabular-nums",N);

let O = [{id:"p",label:"Paragraph",icon:null},{id:"h1",label:"Heading 1",icon:Icon_28547},{id:"h2",label:"Heading 2",icon:Icon_75794},{id:"quote",label:"Quote",icon:Icon_30322},{id:"ul",label:"Bulleted list",icon:Icon_48240},{id:"ol",label:"Numbered list",icon:Icon_39425}];

let $ = [{id:"bold",label:"Bold",icon:Icon_64132,keys:"Ctrl B"},{id:"italic",label:"Italic",icon:Icon_17771,keys:"Ctrl I"},{id:"strike",label:"Strikethrough",icon:Icon_22244,keys:"Ctrl S"},{id:"code",label:"Inline code",icon:Icon_81320,keys:"Ctrl E"},{id:"link",label:"Link",icon:Icon_33786,keys:"Ctrl K"}];

let I = [{label:"Undo",icon:Icon_62955},{label:"Redo",icon:Icon_88353}];

let T = `Halcyon writes every permission change to an append-only ledger. Each entry records the actor, the resource, the previous value and the reason supplied at the time of the change.

Entries are immutable. A correction is a new entry that supersedes the old one, which means the history of a resource can always be replayed exactly as it happened.

Retention follows the workspace plan: ninety days on Team, one year on Scale, and seven years on Enterprise.`;

let U = (...e)=>e.filter(Boolean).join(" ");

let H = "text-neutral-900 dark:text-neutral-100";

let q = "text-neutral-900/78 dark:text-neutral-100/78";

let F = "text-neutral-900/62 dark:text-neutral-100/62";

let V = U("text-[17px]/[22px] font-extrabold",H);

let K = U("text-[14px]/[20px] font-medium",F);

let J = U("text-[13px]/[16px] font-semibold tabular-nums",F);

let Q = U("font-mono text-[13px]/[20px] tabular-nums",q);

let G = [{id:"write",label:"Write",icon:Icon_84831},{id:"split",label:"Split",icon:Icon_15304},{id:"preview",label:"Preview",icon:Icon_2301}];

let X = `# Migrating to the streaming meter

The nightly aggregation job is being replaced by a streaming counter. This note covers what changes for existing workspaces and what to do if a number looks wrong.

## What changes

- Usage updates within about **ten seconds** instead of once per night.
- Historical rows are *unchanged*; only new events take the new path.
- The \`v1/usage\` endpoint keeps its shape and stays supported until March.

## Rollout

1. Enable the flag for internal workspaces.
2. Backfill the previous 30 days and compare against the old totals.
3. Move Scale customers, then everyone else.

> A drift of under 0.5% between the two systems is expected during the overlap window.

Reach out to Wei Chen if a workspace shows a larger gap.`;


export default function editor_1__Sorbet__Component(){
  let e=useReducedMotion(),[r,t]=useState(T),[c,d]=useState("p"),[_,x]=useState(["bold"]),[u,b]=useState(false),[p,h]=useState(false),[m,f]=useState(0),[k,v]=useState("saved"),L=useRef(null),P=useRef(null),B=useRef([]),U=useRef(null),{ref:H,edges:q,onScroll:F}=function(){
    let e=useRef(null),[r,t]=useState({start:false,end:false}),a=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollLeft:a,scrollWidth:n,clientWidth:i}=r;
      t({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let r=e.current,t=r?.ownerDocument.defaultView;
      if(!r||!t?.ResizeObserver)return;
      let n=new t.ResizeObserver(a);
      return observe(r),()=>disconnect();
    }, [a]),{ref:e,edges:r,onScroll:a};
  }(),{ref:V,edges:K,onScroll:J}=function(e){
    let r=useRef(null),[t,a]=useState({start:false,end:false}),i=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:i}=e;
      a({start:t>1,end:Math.ceil(t+i)<n-1})
    }, []);
    return useEffect(()=>{
      i();
      let e=r.current,t=e?.ownerDocument.defaultView;
      if(!e||!t?.ResizeObserver)return;
      let a=new t.ResizeObserver(i);
      return a.observe(e),()=>a.disconnect();
    }, [e,i]),{ref:r,edges:t,onScroll:i};
  }(r),Q=useMemo(()=>{
    let e=r.trim()?r.trim().split(/\s+/).length:0;
    return {words:e,chars:r.length,read:Math.max(1,Math.round(e/220))};
  }, [r]);
  useEffect(()=>{
    if(!u)return;
    let e=L.current,r=e?.ownerDocument??document,t=r=>{
      e&&!e.contains(r.target)&&b(false)
    },a=e=>{
      "Escape"===e.key&&(b(false),P.current?.focus({preventScroll:true}))
    };
    return r.addEventListener("mousedown",t),r.addEventListener("keydown",a),()=>{
      r.removeEventListener("mousedown",t),r.removeEventListener("keydown",a)
    };
  }, [u]),useEffect(()=>{
    u&&B.current[m]?.focus({preventScroll:true})
  }, [u,m]),useEffect(()=>{
    if("saving"!==k)return;
    let e=window.setTimeout(()=>v("saved"),900);
    return ()=>window.clearTimeout(e);
  }, [k,r]);
  let G=e=>{
    h(e),f(Math.max(0,O.findIndex(e=>e.id===c))),b(true)
  },X=O.find(e=>e.id===c);
  return (
    <div className={y("bg-white dark:bg-neutral-950",j,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <div className={y("border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex shrink-0 items-center gap-1 px-2 py-1")}>
          <div className="relative shrink-0" ref={L}>
            <button ref={P} type="button" aria-haspopup="menu" aria-expanded={u} onClick={e=>u?b(false):G(0===e.detail)} onKeyDown={e=>{
              ("ArrowDown"===e.key||"ArrowUp"===e.key)&&(e.preventDefault(),G(true))
            }} className={y("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold","min-w-[132px]")}>
              <span className="flex-1 text-left">{X.label}</span>
              <HugeiconsIcon icon={Icon_20148} size={14} strokeWidth={2} aria-hidden="true" className={y(N,"shrink-0",u&&"rotate-180")} />
            </button>
            <AnimatePresence>
              {u&&<motion.div role="menu" aria-label="Block type" initial={!e&&!p&&{opacity:0}} animate={{opacity:1,transition:{duration:.16,ease:[.2,0,0,1]}}} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:[.2,0,0,1]}}} onKeyDown={e=>{
                "ArrowDown"===e.key?(e.preventDefault(),f(e=>(e+1)%O.length)):"ArrowUp"===e.key?(e.preventDefault(),f(e=>(e-1+O.length)%O.length)):"Home"===e.key?(e.preventDefault(),f(0)):"End"===e.key?(e.preventDefault(),f(O.length-1)):"Tab"===e.key&&b(false)
              }} className={y("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute top-[calc(100%+6px)] left-0 z-30 w-[180px] min-w-[180px]")}>
                {O.map((e,r)=>{
                  let t=e.id===c;
                  return (
                    <button key={e.id} ref={e=>{
                                    B.current[r]=e
                                  }} role="menuitemradio" aria-checked={t} type="button" tabIndex={r===m?0:-1} onFocus={()=>f(r)} onClick={()=>{
                                    d(e.id),b(false),P.current?.focus({preventScroll:true})
                                  }} className="relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40">
                                    {e.icon?<HugeiconsIcon icon={e.icon} size={18} strokeWidth={2} aria-hidden="true" />:<span className="size-4 shrink-0" />}
                                    <span className="flex-1">{e.label}</span>
                                    {t&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" />}
                                  </button>
                  );
                })}
              </motion.div>}
            </AnimatePresence>
          </div>
          <span aria-hidden="true" className={y(S,"ml-1 h-5 w-px shrink-0")} />
          <div className="relative min-w-0 flex-1">
            <div ref={H} onScroll={F} className="flex items-center gap-1 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {$.map(e=>{
                let r=_.includes(e.id);
                return (
                  <button key={e.id} type="button" aria-pressed={r} title={`${e.label} (${e.keys})`} onClick={()=>{
                                let r;
                                return r=e.id,x(e=>e.includes(r)?e.filter(e=>e!==r):[...e,r]);
                              }} className={y(R,E)}>
                                <HugeiconsIcon icon={e.icon} size={18} strokeWidth={2} aria-hidden="true" />
                                <span className="sr-only">{e.label}</span>
                              </button>
                );
              })}
              <span aria-hidden="true" className={y(S,"mx-1 h-5 w-px shrink-0")} />
              {I.map(e=><button key={e.label} type="button" aria-label={e.label} className={y(R,E)}><HugeiconsIcon icon={e.icon} size={18} strokeWidth={2} aria-hidden="true" /></button>)}
            </div>
            <div aria-hidden="true" className={y("bg-linear-to-r from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 left-0 w-8",q.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={y("bg-linear-to-l from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 right-0 w-8",q.end?"opacity-100":"opacity-0")} />
          </div>
          <span className={y(M,"shrink-0 pr-3")}>{"saved"===k?"Saved":"Saving…"}</span>
        </div>
        <div className="relative min-h-0 flex-1">
          <div ref={V} onScroll={J} className="h-full overflow-y-auto">
            <div className="mx-auto w-full max-w-[720px] px-6 py-8 sm:px-8">
              <input aria-label="Document title" defaultValue="Audit ledger design notes" onChange={()=>v("saving")} className={y(W,A,z,"w-full")} placeholder="Untitled" />
              <p className={y(C,"mt-1.5 flex flex-wrap gap-x-3 gap-y-1")}>
                <span>Draft by Ana Reyes</span>
                <span>Last edited 4 minutes ago</span>
              </p>
              <textarea ref={U} aria-label="Document body" value={r} onChange={e=>{
                t(e.target.value),v("saving")
              }} spellCheck={false} className={y(D,A,z,"mt-6 min-h-[320px] w-full resize-none field-sizing-content")} placeholder="Start writing…" />
            </div>
          </div>
          <div aria-hidden="true" className={y("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",K.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={y("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",K.end?"opacity-100":"opacity-0")} />
        </div>
        <footer className={y("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7",M,"flex shrink-0 items-center gap-4 px-5 py-2.5")}>
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
