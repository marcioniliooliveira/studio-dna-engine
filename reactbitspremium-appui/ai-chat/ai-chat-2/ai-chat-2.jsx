/**
 * React Bits Pro — Application UI (ai-chat-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_80969 = [["path",{d:"M20 15.0057V10.6606C20 9.84276 20 9.43383 19.8478 9.06613C19.6955 8.69843 19.4065 8.40927 18.8284 7.83096L14.0919 3.09236C13.593 2.59325 13.3436 2.3437 13.0345 2.19583C12.9702 2.16508 12.9044 2.13778 12.8372 2.11406C12.5141 2 12.1614 2 11.4558 2C8.21082 2 6.58831 2 5.48933 2.88646C5.26731 3.06554 5.06508 3.26787 4.88607 3.48998C4 4.58943 4 6.21265 4 9.45908V14.0052C4 17.7781 4 19.6645 5.17157 20.8366C6.11466 21.7801 7.52043 21.9641 10 22M13 2.50022V3.00043C13 5.83009 13 7.24492 13.8787 8.12398C14.7574 9.00304 16.1716 9.00304 19 9.00304H19.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.3267 22L13.1155 20.9142C12.3718 20.2475 12 19.9142 12 19.5C12 19.0858 12.3718 18.7525 13.1155 18.0858L14.3267 17M17.6733 22L18.8845 20.9142C19.6282 20.2475 20 19.9142 20 19.5C20 19.0858 19.6282 18.7525 18.8845 18.0858L17.6733 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let m = (...e)=>e.filter(Boolean).join(" "),
  f = "text-neutral-900/80 dark:text-neutral-100/80",
  _ = "text-neutral-900/66 dark:text-neutral-100/66",
  v = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  g = "font-mono text-[12px]/[16px] tabular-nums",
  k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  w = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  j = "size-6 rounded-[var(--rb-r-sm,6px)]",
  y = "size-7 rounded-[var(--rb-r-sm,6px)]",
  N = "inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5",
  z = "relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-2 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40",
  S = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  C = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950";

function A(){
  let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
    let t=e.current;
    if(!t)return;
    let{scrollTop:a,scrollHeight:n,clientHeight:l}=t;
    r({start:a>1,end:Math.ceil(a+l)<n-1})
  }, []);
  return useEffect(()=>{
    a();
    let t=e.current,r=t?.ownerDocument.defaultView;
    if(!t||!r?.ResizeObserver)return;
    let n=new r.ResizeObserver(a);
    return observe(t),()=>disconnect();
  }, [a]),{ref:e,edges:t,onScroll:a};
}

let E = `type Plan = {
  name: string
  price: string
  period: string
  cta: string
}

export function PricingTable({
  plans,
}: {
  plans: Plan[]
}) {
  return (
    <div className="grid gap-4">
      {plans.map((plan) => (
        <article key={plan.name}>
          <h3>{plan.name}</h3>
          <p>{plan.price}</p>
          <span>{plan.period}</span>
          <button>{plan.cta}</button>
        </article>
      ))}
    </div>
  )
}`,
  R = ["Three tiers, billed monthly or annually. Annual saves two months.","Starter covers a single project and one editor seat.","Growth adds unlimited projects, five seats, and priority review.","Scale adds SSO, audit logs, and a named contact.","Every tier includes the component library and future updates."],
  H = ["v3","v2","v1"],
  I = "I marked Growth as the recommended plan without leaning on colour: it now carries a small “Recommended” label, a slightly heavier border, and a touch more vertical padding so it reads as primary.",
  M = [{id:"u1",role:"user",text:"Build a three-tier pricing table component for the marketing site."},{id:"a1",role:"assistant",text:"Here is a responsive pricing table with Starter, Growth, and Scale. It maps over a plans array so you can edit copy without touching markup.",file:"pricing-table.tsx"},{id:"u2",role:"user",text:"Add a short plan description under each price."},{id:"a2",role:"assistant",text:"Done. I added a description line beneath each price and wrote the copy for all three tiers. This is version 3, so compare it against the earlier versions from the panel."},{id:"u3",role:"user",text:"Can you make the middle plan stand out?"},{id:"a3",role:"assistant",text:I}];

function D(){
  let e=useReducedMotion(),[t,r]=useState(M),[D,T]=useState(false),[L,W]=useState("code"),[O,$]=useState("v3"),[q,F]=useState(false),[P,K]=useState(""),[B,Y]=useState(0),{text:V,done:J,push:G,end:Q,reset:U}=function(){
    let[e,t]=useState(""),[r,a]=useState(false),i=useRef(""),s=useRef(0),o=useRef(false),c=useReducedMotion();
    useEffect(()=>{
      let e=0,r=performance.now(),n=l=>{
        let d=Math.min(l-r,64);
        r=l;
        let u=i.current,x=u.length-s.current;
        if(x>0){
          s.current=c?u.length:Math.min(u.length,s.current+x*(1-Math.exp(-d/180))+45*d/1e3);
          let e=Math.floor(s.current),r=o.current&&e>=u.length,n=r?u.length:function(e,t){
            if(t>=e.length)return e.length;
            let r=e.lastIndexOf(" ",t);
            return -1===r?0:r;
          }(u,e);
          t(u.slice(0,n)),r&&a(true)
        }
        e=requestAnimationFrame(n)
      };
      return e=requestAnimationFrame(n),()=>cancelAnimationFrame(e);
    }, [c]);
    let d=useCallback(e=>{
      i.current+=e
    }, []);
    return {text:e,done:r,push:d,end:useCallback(()=>{
      o.current=true
    }, []),reset:useCallback(()=>{
      i.current="",s.current=0,o.current=false,t(""),a(false)
    }, [])};
  }(),{ref:X,edges:Z,onScroll:ee}=A(),{ref:et,edges:er,onScroll:ea}=A(),{showJump:en,jumpToLatest:el}=function(e){
    let t=useRef(true),[r,a]=useState(false);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      let n=()=>{
        let e=r.scrollHeight-r.clientHeight>1,n=r.scrollHeight-r.scrollTop-r.clientHeight,l=!e||n<24;
        t.current=l,a(e&&!l)
      },l=e=>{
        (!("deltaY"in e)||e.deltaY<0)&&r.scrollHeight-r.clientHeight>1&&r.scrollTop>0&&(t.current=false)
      },i=new ResizeObserver(()=>{
        t.current&&(r.scrollTop=r.scrollHeight),n()
      });
      return i.observe(r),r.firstElementChild&&i.observe(r.firstElementChild),r.addEventListener("wheel",l,{passive:true}),r.addEventListener("touchmove",l,{passive:true}),r.addEventListener("scroll",n,{passive:true}),r.scrollTop=r.scrollHeight,n(),()=>{
        i.disconnect(),r.removeEventListener("wheel",l),r.removeEventListener("touchmove",l),r.removeEventListener("scroll",n)
      };
    }, [e]),{showJump:r,jumpToLatest:useCallback(()=>{
      let r=e.current;
      r&&(t.current=true,a(false),r.scrollTop=r.scrollHeight)
    }, [e])};
  }(X),ei=useRef(null),es=useRef(null),eo=!J&&!D;
  useEffect(()=>{
    if(e){
      G(I),Q();
      return
    }
    let t=I.match(/\S+\s*/g)??[],r=0;
    return es.current=window.setInterval(()=>{
      let e=1+Math.floor(3*Math.random());
      G(t.slice(r,r+e).join("")),(r+=e)>=t.length&&(Q(),es.current&&window.clearInterval(es.current),es.current=null)
    },130),()=>{
      es.current&&window.clearInterval(es.current)
    };
  }, [e,G,Q,B]),useEffect(()=>{
    if(!q)return;
    let e=window.setTimeout(()=>F(false),1600);
    return ()=>window.clearTimeout(e);
  }, [q]);
  let ec=useCallback(e=>{
    let t=e.trim();
    t&&(r(e=>[...e,{id:`u-${Date.now()}`,role:"user",text:t}]),K(""))
  }, []),ed=useCallback(()=>{
    es.current&&(window.clearInterval(es.current),es.current=null),Q(),T(true)
  }, [Q]),eu=useCallback(()=>{
    U(),T(false),Y(e=>e+1)
  }, [U]);
  return (
    <div className={m("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full min-w-0 flex-col overflow-hidden lg:flex-row")}>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="shrink-0">
            <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-3 px-4 sm:px-6">
              <h1 className={v}>Build assistant</h1>
              <span className={m("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-neutral-900/66 dark:text-neutral-100/66")}>Draft</span>
            </div>
          </header>
          <div className="relative flex min-h-0 flex-1 flex-col">
            <div ref={X} onScroll={ee} className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-y-auto overscroll-contain [overflow-anchor:none]">
              <div className="mt-auto flex w-full flex-col gap-6 px-4 py-6 sm:px-6">
                {t.map(e=>{
                  if("user"===e.role)return (
                    <div key={e.id} className="flex">
                                    <div className="ml-auto max-w-[85%]">
                                      <div className="w-fit max-w-full rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-3.5 py-2 text-[14px]/[20px] whitespace-pre-wrap text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{e.text}</div>
                                    </div>
                                  </div>
                  );
                  let t="a3"===e.id&&eo,r="a3"===e.id&&!eo;
                  return (
                    <div key={e.id} className="group space-y-3">
                                    <p className={m("flex min-w-0 flex-col gap-3 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","max-w-prose")}>{t?V:e.text}</p>
                                    {e.file&&<button type="button" onClick={()=>W("code")} className={m("group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","w-[calc(100%+16px)]")}>
                                      <span className="flex size-4 shrink-0 items-center justify-center">
                                        <HugeiconsIcon icon={Icon_80969} size={14} strokeWidth={1.8} aria-hidden="true" className={_} />
                                      </span>
                                      <span className={m("min-w-[6ch] truncate text-neutral-900 dark:text-neutral-100",g)}>{e.file}</span>
                                      <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/66 dark:text-neutral-100/66">Open in panel</span>
                                      <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={1.8} aria-hidden="true" className={m(_,"shrink-0")} />
                                    </button>}
                                    {r&&<div className="-ms-2 flex min-h-8 min-w-0 items-center gap-0.5 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 [@media(pointer:fine)]:*:data-reveal:opacity-0 [@media(pointer:fine)]:group-hover:*:data-reveal:opacity-100 *:data-reveal:focus-visible:opacity-100 *:data-reveal:transition-opacity">
                                      <button type="button" data-reveal onClick={eu} className={m(w,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>Regenerate</button>
                                    </div>}
                                  </div>
                  );
                })}
              </div>
            </div>
            <div aria-hidden="true" className={m(S,"pointer-events-none absolute inset-x-0 top-0 h-8",Z.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={m(C,"pointer-events-none absolute inset-x-0 bottom-0 h-8",Z.end?"opacity-100":"opacity-0")} />
            {en&&<div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
              <motion.button type="button" onClick={el} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.15}} className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                <HugeiconsIcon icon={Icon_54345} size={16} strokeWidth={1.8} aria-hidden="true" />
                Jump to latest
              </motion.button>
            </div>}
          </div>
          <div className="shrink-0">
            <div className="mx-auto w-full max-w-3xl px-4 pb-4 sm:px-6">
              <div className={m("relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8","p-2")}>
                <textarea ref={ei} rows={1} value={P} onChange={e=>{
                  let t;
                  K(e.target.value),(t=ei.current)&&(t.style.height="auto",t.style.height=`${Math.min(t.scrollHeight,160)}px`)
                }} onKeyDown={e=>{
                  "Enter"!==e.key||e.shiftKey||(e.preventDefault(),ec(P))
                }} placeholder="Ask anything" className="max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
                <div className="flex items-center gap-1 pt-1">
                  <button type="button" aria-label="Add attachment" className={m(w,y)}>
                    <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  <div className="ml-auto flex items-center gap-1">
                    {eo?<button key={"stop"} type="button" onClick={ed} aria-label="Stop generating" className={m(k,y)}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button key={"send"} type="button" onClick={()=>ec(P)} aria-label="Send" disabled={0===P.trim().length} className={m(k,y)}>
                      <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
                    </button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="hidden min-h-0 shrink-0 flex-col p-4 lg:flex lg:w-96">
          <div className={m("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
            <div className="flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2">
              <span className={m(g,f,"truncate")}>{"code"===L?"pricing-table.tsx":"pricing-copy.md"}</span>
              <div className="ms-auto flex shrink-0 items-center gap-1">
                <button type="button" aria-label="Copy artifact" onClick={()=>F(true)} className={m(w,j)}>
                  <HugeiconsIcon icon={q?Icon_90987:Icon_62714} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <button type="button" aria-label="Download artifact" className={m(w,j)}>
                  <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
              <span role="status" className="sr-only">{q?"Copied":""}</span>
            </div>
            <div className="flex min-w-0 shrink-0 items-center gap-2 px-4 pb-2">
              <div role="radiogroup" aria-label="Artifact view" className={m(N,"h-7")}>
                {["code","doc"].map(e=><button key={e} type="button" role="radio" aria-checked={L===e} onClick={()=>W(e)} className={z}>{"code"===e?"Code":"Document"}</button>)}
              </div>
              <div role="radiogroup" aria-label="Version" className={m(N,"h-7","ml-auto")}>
                {H.map(e=><button key={e} type="button" role="radio" aria-checked={O===e} onClick={()=>$(e)} className={z}>{e}</button>)}
              </div>
            </div>
            <div className={m("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
              <div ref={et} onScroll={ea} className="h-full overflow-y-auto p-3">
                {"code"===L?<pre className={m("font-mono text-[13px]/[20px] tabular-nums",f,"overflow-x-auto")}>{E}</pre>:<div className="space-y-3">
                  <h3 className={v}>Plans and pricing</h3>
                  {R.map(e=><p key={e} className={m("text-[13px]/[18px] font-normal",f)}>{e}</p>)}
                </div>}
              </div>
              <div aria-hidden="true" className={m(S,"pointer-events-none absolute inset-x-0 top-0 h-8",er.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={m(C,"pointer-events-none absolute inset-x-0 bottom-0 h-8",er.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </aside>
      </div>
  );
}


export default D;
