/**
 * React Bits Pro — Application UI (ai-chat-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_97838 = [["path",{d:"M13.5 16.5L15 18M14 14.5C14 15.8807 12.8807 17 11.5 17C10.1193 17 9 15.8807 9 14.5C9 13.1193 10.1193 12 11.5 12C12.8807 12 14 13.1193 14 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_3980 = [["path",{d:"M6 8L6 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 16V12C18 9.17156 18 7.75735 17.1213 6.87867C16.2426 5.99999 14.8284 5.99999 12 5.99999L11 5.99999M11 5.99999C11 5.29976 12.9943 3.99152 13.5 3.49999M11 5.99999C11 6.70022 12.9943 8.00846 13.5 8.49999",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"6",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["circle",{cx:"6",cy:"6",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["circle",{cx:"18",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_92190 = [["path",{d:"M11 6L21 6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 12L21 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 18L21 18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let p = (...e)=>e.filter(Boolean).join(" ");

let h = "text-neutral-900/62 dark:text-neutral-100/62";

let m = "text-[14px]/[20px] font-medium";

let k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let f = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let g = "shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90";

let w = "flex size-[18px] shrink-0 items-center justify-center";

let y = p(m,h);

let j = "By plan, Growth accounted for $5,180 of the refunds and Scale for $3,240, with Starter under $900. The renewal failures cluster on Growth annual plans billed on the 12th, so retrying those cards a day later would recover most of the amount.";

let N = [{id:"u1",role:"user",text:"Why did refunds spike last week?"},{id:"a1",role:"assistant",reasoning:"The refund total moved with two things last week: a pricing change that shipped on the 12th, and a batch of failed renewals that were auto-refunded. I checked both before answering.",tool:{name:"Searched 1,284 refunds",result:"reason              count     amount\nRenewal failed         84    $6,240\nDowngrade credit       31    $1,905\nDuplicate charge        9      $612\nCustomer request        7      $438",duration:"1.2s",done:true},text:"Refunds rose 38% week over week, from $6,730 to $9,290. Almost all of the increase came from failed renewals after the card-retry window was shortened on the 12th. Downgrade credits were flat, and duplicate charges stayed in the single digits.",sources:[{id:"1",title:"Billing events"},{id:"2",title:"Pricing change, Jun 12"}]},{id:"u2",role:"user",text:"Break it down by plan tier."},{id:"a2",role:"assistant",text:j}];

function z({text:e}){
  let[r,a]=useState(false);
  return (
    <div className="flex flex-col">
        <button type="button" onClick={()=>a(e=>!e)} aria-expanded={r} className="group -mx-2 flex min-h-9 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[calc(var(--rb-r-lg,10px))] px-2 text-left text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:hover:bg-neutral-100/6 dark:active:bg-neutral-100/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]">
          <span className={w}>
            <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className={g} />
          </span>
          <span>
            {"Thought for "}
            <span className="tabular-nums">4s</span>
          </span>
        </button>
        {r&&<p className={p(m,"text-neutral-900/78 dark:text-neutral-100/78","mt-2 max-w-prose")}>{e}</p>}
      </div>
  );
}

function S({tool:e}){
  let[r,a]=useState(false);
  return (
    <div>
        <button type="button" onClick={()=>a(e=>!e)} aria-expanded={r} className={p("group -mx-2 flex min-h-9 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[calc(var(--rb-r-lg,10px))] px-2 text-left text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:hover:bg-neutral-100/6 dark:active:bg-neutral-100/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","w-[calc(100%+16px)]")}>
          <span className={w}>
            <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className={g} />
          </span>
          <span className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78">{e.name}</span>
          <span className={p(h,"min-w-14")}>{e.done?"Done":"Running"}</span>
          <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e.duration}</span>
        </button>
        {r&&<div className={p("flex min-w-0 flex-col gap-3 rounded-[calc(var(--rb-r-xl,12px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 py-2.5","mt-2 max-h-40 overflow-y-auto")}>
          <pre className="min-w-0 overflow-x-auto font-mono text-[12px]/[18px] whitespace-pre-wrap text-neutral-900/78 dark:text-neutral-100/78 [overflow-wrap:anywhere]">{e.result}</pre>
        </div>}
      </div>
  );
}

function C({sources:e}){
  return (
    <div className="flex flex-wrap items-center gap-1.5">
        <span className={p("text-[13px]/[16px] font-semibold tabular-nums",h)}>Sources</span>
        {e.map(e=><span key={e.id} className={p("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12","h-6")}>{e.title}</span>)}
      </div>
  );
}

let I = (...e)=>e.filter(Boolean).join(" ");

let M = "text-neutral-900/78 dark:text-neutral-100/78";

let D = "text-neutral-900/62 dark:text-neutral-100/62";

let ee = (...e)=>e.filter(Boolean).join(" ");

let er = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let ea = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let et = [{icon:Icon_97838,label:"Summarize the latest release notes"},{icon:Icon_3980,label:"What changed in this pull request?"},{icon:Icon_92190,label:"Draft acceptance criteria for the new filter"}];

let en = "The latest release centered on the new filter panel, faster search indexing, and a set of smaller fixes for keyboard navigation. I can pull the full changelog, or turn any part of it into acceptance criteria: just tell me which area to focus on.";

let el = [{id:"u-1",role:"user",text:"Summarize the latest release notes"},{id:"a-1",role:"assistant",text:"Version 2.4 focused on the new filter panel, faster search indexing, and keyboard-navigation fixes."},{id:"u-2",role:"user",text:"What changed in the filter panel?"},{id:"a-2",role:"assistant",text:"It moved into a docked sidebar, gained saved views, and now remembers your last query per project."},{id:"u-3",role:"user",text:"Draft acceptance criteria for the new filter"},{id:"a-seed",role:"assistant",text:"Filters apply instantly, saved views persist per project, and every control stays reachable by keyboard."}];


export default function ai_chat_3__Sorbet__Component(){
  let e=useReducedMotion(),[r,a]=useState(el),[s,c]=useState(null),[_,x]=useState(false),[b,p]=useState(""),[h,m]=useState(0),{text:k,done:v,push:f,end:g,reset:w}=function(){
    let[e,r]=useState(""),[a,t]=useState(false),o=useRef(""),i=useRef(0),s=useRef(false),c=useReducedMotion();
    useEffect(()=>{
      let e=0,a=performance.now(),n=l=>{
        let _=Math.min(l-a,64);
        a=l;
        let d=o.current,x=d.length-i.current;
        if(x>0){
          i.current=c?d.length:Math.min(d.length,i.current+x*(1-Math.exp(-_/180))+45*_/1e3);
          let e=Math.floor(i.current),a=s.current&&e>=d.length,n=a?d.length:function(e,r){
            if(r>=e.length)return e.length;
            let a=e.lastIndexOf(" ",r);
            return -1===a?0:a;
          }(d,e);
          r(d.slice(0,n)),a&&t(true)
        }
        e=requestAnimationFrame(n)
      };
      return e=requestAnimationFrame(n),()=>cancelAnimationFrame(e);
    }, [c]);
    let _=useCallback(e=>{
      o.current+=e
    }, []);
    return {text:e,done:a,push:_,end:useCallback(()=>{
      s.current=true
    }, []),reset:useCallback(()=>{
      o.current="",i.current=0,s.current=false,r(""),t(false)
    }, [])};
  }(),{ref:y,edges:j,onScroll:N}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),{showJump:z,jumpToLatest:S}=function(e){
    let r=useRef(true),[a,t]=useState(false);
    return useEffect(()=>{
      let a=e.current;
      if(!a)return;
      let n=()=>{
        let e=a.scrollHeight-a.clientHeight>1,n=a.scrollHeight-a.scrollTop-a.clientHeight,l=!e||n<24;
        r.current=l,t(e&&!l)
      },l=e=>{
        (!("deltaY"in e)||e.deltaY<0)&&a.scrollHeight-a.clientHeight>1&&a.scrollTop>0&&(r.current=false)
      },o=new ResizeObserver(()=>{
        r.current&&(a.scrollTop=a.scrollHeight),n()
      });
      return o.observe(a),a.firstElementChild&&o.observe(a.firstElementChild),a.addEventListener("wheel",l,{passive:true}),a.addEventListener("touchmove",l,{passive:true}),a.addEventListener("scroll",n,{passive:true}),a.scrollTop=a.scrollHeight,n(),()=>{
        o.disconnect(),a.removeEventListener("wheel",l),a.removeEventListener("touchmove",l),a.removeEventListener("scroll",n)
      };
    }, [e]),{showJump:a,jumpToLatest:useCallback(()=>{
      let a=e.current;
      a&&(r.current=true,t(false),a.scrollTop=a.scrollHeight)
    }, [e])};
  }(y),C=useRef(null),A=useRef(null),E=null!==s&&!v&&!_,R=E&&""===k;
  useEffect(()=>{
    if(!s)return;
    if(e){
      f(en),g();
      return
    }
    let r=en.match(/\S+\s*/g)??[],a=0;
    return A.current=window.setInterval(()=>{
      let e=1+Math.floor(3*Math.random());
      f(r.slice(a,a+e).join("")),(a+=e)>=r.length&&(g(),A.current&&window.clearInterval(A.current),A.current=null)
    },130),()=>{
      A.current&&window.clearInterval(A.current)
    };
  }, [s,h,e,f,g]);
  let I=useCallback(e=>{
    let r=e.trim();
    if(!r)return;
    let t=`u-${Date.now()}`,n=`a-${Date.now()}`;
    w(),x(false),a(e=>[...e,{id:t,role:"user",text:r},{id:n,role:"assistant",text:en}]),c(n),m(e=>e+1),p("")
  }, [w]),M=useCallback(()=>{
    A.current&&(window.clearInterval(A.current),A.current=null),g(),x(true)
  }, [g]),D=0===r.length;
  return (
    <div className={ee("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[620px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={ee("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-sm flex-1")}>
          <div className={ee("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","h-12")}>
            <span className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">Assistant</span>
            <span className={ee("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums","text-neutral-900/62 dark:text-neutral-100/62","ml-auto")}>Ready</span>
          </div>
          <div className={ee("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","min-h-0 flex-1")}>
            <div className="relative flex min-h-0 flex-1 flex-col">
              <div ref={y} onScroll={N} className="min-h-0 flex-1 overflow-y-auto overscroll-contain [overflow-anchor:none]">
                <div className="flex min-h-full flex-col px-3 py-3">
                  {D?<div className="m-auto w-full">
                    <div className="space-y-1.5">
                      <h2 className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">How can I help?</h2>
                      <p className="max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78">Ask about the repository, or start from an example.</p>
                    </div>
                    <div className={ee("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","-mx-2.5 mt-5")}>
                      {et.map(({icon:e,label:r})=>(
                        <div key={r} className="p-1">
                                            <button type="button" onClick={()=>I(r)} className={ee("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]","cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","rounded-[var(--rb-r-4xl,18px)]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","px-1.5")}>
                                              <HugeiconsIcon icon={e} size={18} strokeWidth={2} aria-hidden="true" className={ee("text-neutral-900/62 dark:text-neutral-100/62","shrink-0")} />
                                              <span className={ee("text-[14px]/[20px] font-medium","text-neutral-900/78 dark:text-neutral-100/78","min-w-0 flex-1 truncate")}>{r}</span>
                                            </button>
                                          </div>
                      ))}
                    </div>
                  </div>:<div className="flex flex-col gap-4">
                    {r.map(e=>{
                      if("user"===e.role)return (
                        <div key={e.id} className="flex">
                                            <div className="ml-auto max-w-[85%]">
                                              <div className="w-fit max-w-full rounded-[calc(var(--rb-r-6xl,26px))] rounded-br-[var(--rb-r-xs,4px)] border border-transparent bg-[var(--rb-accent,oklch(84%_0.15_165))] px-4 py-2.5 text-[15px]/[22px] font-medium whitespace-pre-wrap text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_2px_6px_-3px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,transparent)] [overflow-wrap:anywhere] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-none">{e.text}</div>
                                            </div>
                                          </div>
                      );
                      let r=e.id===s;
                      return (
                        <div key={e.id} className="min-h-[1.25rem]">
                                            {r&&R?<div className={ee("relative flex w-fit max-w-full min-w-0 items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100","h-5")}>
                                              <span className="flex h-lh shrink-0 items-center">
                                                <span className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" aria-hidden="true" />
                                              </span>
                                              Thinking
                                            </div>:<p className="flex min-w-0 flex-col gap-4 text-[15px]/[24px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{r&&E?k:e.text}</p>}
                                          </div>
                      );
                    })}
                  </div>}
                </div>
              </div>
              <div aria-hidden="true" className={ee("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",j.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={ee("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",j.end?"opacity-100":"opacity-0")} />
              {z&&<div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
                <motion.button type="button" onClick={S} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.15}} className={ee("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
                  <HugeiconsIcon icon={Icon_54345} size={18} strokeWidth={2} aria-hidden="true" />
                  Jump to latest
                </motion.button>
              </div>}
            </div>
          </div>
          <div className="shrink-0 p-1">
            <div className="relative flex w-full min-w-0 flex-col rounded-[calc(min(var(--rb-r-6xl,26px),min(var(--rb-r-full,999px),16px)_+_8px))] border border-transparent bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] transition-[box-shadow] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:shadow-[0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent),0_8px_22px_-10px_rgb(84_62_32/0.2)] dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] dark:focus-within:shadow-[0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163)),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]">
              <div className="flex min-w-0 items-end gap-1 p-2">
                <textarea ref={C} rows={1} value={b} onChange={e=>{
                  let r;
                  p(e.target.value),(r=C.current)&&(r.style.height="auto",r.style.height=`${Math.min(r.scrollHeight,160)}px`)
                }} onKeyDown={e=>{
                  "Enter"!==e.key||e.shiftKey||(e.preventDefault(),I(b))
                }} placeholder="Ask anything" className="max-h-40 min-h-6 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1.5 field-sizing-content text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/55 dark:placeholder:text-neutral-100/55" />
                {E?<button key={"stop"} type="button" onClick={M} aria-label="Stop generating" className={ee(er,ea)}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button key={"send"} type="button" onClick={()=>I(b)} aria-label="Send" disabled={0===b.trim().length} className={ee(er,ea)}>
                  <HugeiconsIcon icon={Icon_40972} size={18} strokeWidth={2} aria-hidden="true" />
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
