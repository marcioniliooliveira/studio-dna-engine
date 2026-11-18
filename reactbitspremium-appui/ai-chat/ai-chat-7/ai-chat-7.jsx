/**
 * React Bits Pro — Application UI (ai-chat-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_90227 = [["path",{d:"M12 16V21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 5.2918C8 5.02079 8 4.88529 8.01312 4.77132C8.1194 3.84789 8.84789 3.1194 9.77133 3.01312C9.88529 3 10.0208 3 10.2918 3H13.7082C13.9792 3 14.1147 3 14.2287 3.01312C15.1521 3.1194 15.8806 3.84789 15.9869 4.77132C16 4.88529 16 5.02079 16 5.2918C16 5.37885 16 5.42237 15.9967 5.46264C15.9708 5.78281 15.7927 6.07104 15.5179 6.2374C15.4834 6.25832 15.4444 6.27779 15.3666 6.31672L15.1055 6.44726C14.7021 6.64897 14.5003 6.74983 14.3681 6.90564C14.26 7.03286 14.1856 7.18509 14.1515 7.34846C14.1097 7.54854 14.1539 7.76968 14.2424 8.21197L15 12H15.3333C15.9533 12 16.2633 12 16.5176 12.0681C17.2078 12.2531 17.7469 12.7922 17.9319 13.4824C18 13.7367 18 14.0467 18 14.6667C18 14.9767 18 15.1317 17.9659 15.2588C17.8735 15.6039 17.6039 15.8735 17.2588 15.9659C17.1317 16 16.9767 16 16.6667 16H7.33333C7.02334 16 6.86835 16 6.74118 15.9659C6.39609 15.8735 6.12654 15.6039 6.03407 15.2588C6 15.1317 6 14.9767 6 14.6667C6 14.0467 6 13.7367 6.06815 13.4824C6.25308 12.7922 6.79218 12.2531 7.48236 12.0681C7.73669 12 8.04669 12 8.66667 12H9L9.75761 8.21197C9.84606 7.76968 9.89029 7.54854 9.84852 7.34846C9.81441 7.18509 9.73995 7.03286 9.63194 6.90564C9.49965 6.74983 9.29794 6.64897 8.89452 6.44726L8.63344 6.31672C8.55558 6.27779 8.51665 6.25832 8.48208 6.2374C8.20731 6.07104 8.02917 5.78281 8.00326 5.46264C8 5.42237 8 5.37885 8 5.2918Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[14px]/[16px] font-[450]",
  p = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  f = "size-7 rounded-[var(--rb-r-sm,6px)]",
  _ = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  v = "bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100",
  g = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  k = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  w = x("text-[13px]/[18px] font-normal",b);

function j(){
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

let y = [{n:1,name:"q3-board-deck.pdf",type:"PDF",meta:"24 pages"},{n:2,name:"revenue-model.xlsx",type:"Spreadsheet",meta:"Updated Oct 2"},{n:3,name:"churn-analysis.md",type:"Note",meta:"1,200 words"},{n:4,name:"renewals-export.csv",type:"Data",meta:"8,400 rows"},{n:5,name:"qbr-notes.md",type:"Note",meta:"640 words"},{n:6,name:"pricing-change-brief.pdf",type:"PDF",meta:"6 pages"},{n:7,name:"support-tickets.csv",type:"Data",meta:"2,100 rows"},{n:8,name:"win-back-playbook.md",type:"Note",meta:"900 words"},{n:9,name:"exec-summary.docx",type:"Doc",meta:"3 pages"},{n:10,name:"segment-cohorts.xlsx",type:"Spreadsheet",meta:"14 tabs"}],
  N = e=>({cite:e}),
  z = "Net revenue retention slipped to 104% in Q3 after two mid-market downgrades. A renewal-timed win-back should recover most of the gap.",
  S = [{id:"u1",role:"user",text:"Summarize why net revenue retention dropped in Q3."},{id:"a1",role:"assistant",segments:[{text:"Net revenue retention fell to 104% from 111% the prior quarter."},N(1),{text:" The decline is concentrated in the mid-market segment, where two large accounts downgraded after a reorganization."},N(2),{text:" Expansion held up in enterprise, but new upsells slowed after the pricing change."},N(3)]},{id:"u2",role:"user",text:"What would recover it fastest?"},{id:"a2",role:"assistant",segments:[{text:"The quickest lever is re-engaging the two downgraded mid-market accounts, which together account for four of the seven points lost."},N(2),{text:" A targeted win-back offer before renewal would address most of the gap, and reversing the upsell slowdown means revisiting the new tiers."},N(3)]},{id:"u2b",role:"user",text:"Which segment held up best?"},{id:"a2b",role:"assistant",segments:[{text:"Enterprise held up best: expansion there was roughly flat, so almost all of the drag is coming from mid-market rather than a broad-based decline."},N(3),{text:" Gross retention in enterprise actually improved slightly, which is why the net number didn't fall further."},N(4)]},{id:"u3",role:"user",text:"Draft a one-line summary for the board."},{id:"a3",role:"assistant",segments:[{text:"Net revenue retention slipped to 104% in Q3 after two mid-market downgrades."},N(1),{text:" A renewal-timed win-back should recover most of the gap."},N(2)]}];

function C({n:e}){
  return <button type="button" aria-label={`Source ${e}`} className={x(_,v,"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","ml-0.5 translate-y-[-1px] cursor-pointer align-middle")}>{e}</button>;
}

function A(){
  let e=useReducedMotion(),[t,r]=useState(S),[N,A]=useState(false),[E,R]=useState(""),[H,I]=useState(0),{text:M,done:D,push:T,end:L,reset:W}=function(){
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
  }(),{ref:O,edges:$,onScroll:q}=j(),{ref:F,edges:P,onScroll:K}=j(),{showJump:B,jumpToLatest:Y}=function(e){
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
  }(F),V=useRef(null),J=useRef(null),G=!D&&!N;
  useEffect(()=>{
    if(e){
      T(z),L();
      return
    }
    let t=z.match(/\S+\s*/g)??[],r=0;
    return J.current=window.setInterval(()=>{
      let e=1+Math.floor(3*Math.random());
      T(t.slice(r,r+e).join("")),(r+=e)>=t.length&&(L(),J.current&&window.clearInterval(J.current),J.current=null)
    },130),()=>{
      J.current&&window.clearInterval(J.current)
    };
  }, [e,T,L,H]);
  let Q=useCallback(e=>{
    let t=e.trim();
    t&&(r(e=>[...e,{id:`u-${Date.now()}`,role:"user",text:t}]),R(""))
  }, []),U=useCallback(()=>{
    J.current&&(window.clearInterval(J.current),J.current=null),L(),A(true)
  }, [L]),X=useCallback(()=>{
    W(),A(false),I(e=>e+1)
  }, [W]);
  return (
    <div className={x("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full min-w-0 flex-col overflow-hidden lg:flex-row")}>
        <aside className="hidden shrink-0 flex-col p-4 lg:flex lg:w-80">
          <h2 className={x(h,"mb-2 flex items-center gap-2 px-1")}>
            <HugeiconsIcon icon={Icon_90227} size={14} strokeWidth={1.8} aria-hidden="true" className={x(b,"shrink-0")} />
            Pinned sources
          </h2>
          <div className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
            <div className={x("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
              <div ref={O} onScroll={q} className={x("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex h-full flex-col overflow-y-auto")}>
                {y.map(e=>(
                  <div key={e.n} className="shrink-0 p-1">
                                <button type="button" className={x("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","rounded-[var(--rb-r-sm,6px)]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","px-2")}>
                                  <span className="flex w-6 shrink-0 justify-center"><span className={x(_,v)}>{e.n}</span></span>
                                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                    <span className={x(h,"block truncate")}>{e.name}</span>
                                    <span data-description className={x("text-[12px]/[16px] font-normal tabular-nums",b,"flex min-w-0 gap-2")}>
                                      <span className="shrink-0">{e.type}</span>
                                      <span className="truncate">{e.meta}</span>
                                    </span>
                                  </span>
                                </button>
                              </div>
                ))}
              </div>
              <div aria-hidden="true" className={x(g,"pointer-events-none absolute inset-x-0 top-0 h-8",$.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={x(k,"pointer-events-none absolute inset-x-0 bottom-0 h-8",$.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </aside>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="shrink-0">
            <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-3 px-4 sm:px-6">
              <h1 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Q3 retention review</h1>
              <span className={x(w,"flex items-center gap-3")}>
                <span>6 sources</span>
                <span>Cited</span>
              </span>
            </div>
          </header>
          <div className="relative flex min-h-0 flex-1 flex-col">
            <div ref={F} onScroll={K} className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-y-auto overscroll-contain [overflow-anchor:none]">
              <div className="mt-auto flex w-full flex-col gap-6 px-4 py-6 sm:px-6">
                {t.map(e=>{
                  if("user"===e.role)return (
                    <div key={e.id} className="flex">
                                    <div className="ml-auto max-w-[85%]">
                                      <div className="w-fit max-w-full rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-3.5 py-2 text-[14px]/[20px] whitespace-pre-wrap text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{e.text}</div>
                                    </div>
                                  </div>
                  );
                  let t="a3"===e.id&&G,r="a3"===e.id&&!G;
                  return (
                    <div key={e.id} className="group space-y-3">
                                    <div className={x("flex min-w-0 flex-col gap-3 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","max-w-prose")}>
                                      <p>
                                        {t?M:e.segments.map((e,t)=>"cite"in e?<C key={t} n={e.cite} />:<span key={t}>{e.text}</span>)}
                                      </p>
                                    </div>
                                    {r&&<div className="-ms-2 flex min-h-8 min-w-0 items-center gap-0.5 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 [@media(pointer:fine)]:*:data-reveal:opacity-0 [@media(pointer:fine)]:group-hover:*:data-reveal:opacity-100 *:data-reveal:focus-visible:opacity-100 *:data-reveal:transition-opacity">
                                      <button type="button" data-reveal onClick={X} className={x(m,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>Regenerate</button>
                                    </div>}
                                  </div>
                  );
                })}
              </div>
            </div>
            <div aria-hidden="true" className={x(g,"pointer-events-none absolute inset-x-0 top-0 h-8",P.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={x(k,"pointer-events-none absolute inset-x-0 bottom-0 h-8",P.end?"opacity-100":"opacity-0")} />
            {B&&<div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
              <motion.button type="button" onClick={Y} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.15}} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                <HugeiconsIcon icon={Icon_54345} size={16} strokeWidth={1.8} aria-hidden="true" />
                Jump to latest
              </motion.button>
            </div>}
          </div>
          <div className="shrink-0">
            <div className="mx-auto w-full max-w-3xl px-4 pb-4 sm:px-6">
              <div className={x("relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8","p-2")}>
                <textarea ref={V} rows={1} value={E} onChange={e=>{
                  let t;
                  R(e.target.value),(t=V.current)&&(t.style.height="auto",t.style.height=`${Math.min(t.scrollHeight,160)}px`)
                }} onKeyDown={e=>{
                  "Enter"!==e.key||e.shiftKey||(e.preventDefault(),Q(E))
                }} placeholder="Ask anything" className="max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
                <div className="flex items-center gap-1 pt-1">
                  <button type="button" aria-label="Add attachment" className={x(m,f)}>
                    <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  <div className="ml-auto flex items-center gap-1">
                    {G?<button key={"stop"} type="button" onClick={U} aria-label="Stop generating" className={x(p,f)}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button key={"send"} type="button" onClick={()=>Q(E)} aria-label="Send" disabled={0===E.trim().length} className={x(p,f)}>
                      <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
                    </button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default A;
