/**
 * React Bits Pro — Application UI (agent-activity-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900 dark:text-neutral-100",
  b = "text-neutral-900/80 dark:text-neutral-100/80",
  m = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "bg-[oklch(94.5%_0.027_26)] dark:bg-[oklch(29%_0.06_26)]",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  v = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  g = "flex min-w-full items-start gap-3 px-4 font-mono text-[13px]/[20px] tabular-nums",
  k = "shrink-0 text-neutral-900/66 dark:text-neutral-100/66 max-sm:hidden",
  w = x("text-[13px]/[18px] font-normal",m),
  _ = [{at:0,sev:"info",text:"Starting run for workspace acme-analytics"},{at:.6,sev:"info",text:"Loaded 3 source connectors"},{at:1.4,sev:"info",text:"Connector postgres queued 1,284 rows"},{at:2.1,sev:"info",text:"Connector halcyon queued 642 records"},{at:2.9,sev:"info",text:"Connector lumendesk queued 318 tickets"},{at:3.7,sev:"info",text:"Fetching postgres batch 1 of 3"},{at:4.5,sev:"info",text:"Fetched 512 rows in 0.8s"},{at:5.2,sev:"warning",text:"Rate limit hit on halcyon, backing off 2s"},{at:7.3,sev:"info",text:"Resumed halcyon after backoff"},{at:8,sev:"info",text:"Fetched 642 halcyon records"},{at:8.8,sev:"info",text:"Transforming records to the canonical schema"},{at:9.6,sev:"info",text:"Dropped 14 rows that failed validation"},{at:10.4,sev:"warning",text:"Missing owner on 6 accounts, defaulting to unassigned"},{at:11.2,sev:"info",text:"Writing batch to the warehouse"},{at:12,sev:"error",text:"Write to reporting.accounts timed out after 30s"},{at:12.4,sev:"info",text:"Retrying write with a smaller batch size"},{at:13.9,sev:"info",text:"Write succeeded on retry"},{at:14.6,sev:"info",text:"Indexed 2,244 documents"},{at:15.3,sev:"info",text:"Building embeddings for 318 tickets"},{at:17.1,sev:"info",text:"Embeddings complete"},{at:17.8,sev:"info",text:"Refreshing materialised views"},{at:18.5,sev:"info",text:"View account_health refreshed"},{at:19.2,sev:"info",text:"View revenue_daily refreshed"},{at:19.9,sev:"info",text:"Verifying row counts against the sources"},{at:20.6,sev:"info",text:"Row counts match across 3 connectors"},{at:21.3,sev:"info",text:"Run complete, 2,244 records processed"}],
  j = [{id:"all",label:"All",short:"All"},{id:"info",label:"Info",short:"Info"},{id:"warning",label:"Warnings",short:"Warn"},{id:"error",label:"Errors",short:"Err"}],
  N = {info:{word:"Info",tone:m},warning:{word:"Warn",tone:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]"},error:{word:"Error",tone:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"}};

function y(e){
  let t=Math.floor(e),r=Math.floor(t/60),a=Math.round((e-t)*10);
  return `${r}:${String(t%60).padStart(2,"0")}.${a}`;
}

function z({sev:e}){
  return <span className={x("inline-flex w-[5ch] shrink-0",N[e].tone)}>{N[e].word}</span>;
}

function S(){
  let e=useReducedMotion(),{text:t,done:r,push:N,end:S,reset:R}=function(){
    let[e,t]=useState(""),[r,a]=useState(false),l=useRef(""),i=useRef(0),o=useRef(false),d=useReducedMotion();
    return useEffect(()=>{
      let e=0,r=performance.now(),n=s=>{
        let c=Math.min(s-r,64);
        r=s;
        let u=l.current,x=u.length-i.current;
        if(x>0){
          i.current=d?u.length:Math.min(u.length,i.current+x*(1-Math.exp(-c/180))+55*c/1e3);
          let e=Math.floor(i.current),r=o.current&&e>=u.length,n=r?u.length:function(e,t){
            if(t>=e.length)return e.length;
            let r=e.lastIndexOf(" ",t);
            return -1===r?0:r;
          }(u,e);
          t(u.slice(0,n)),r&&a(true)
        }
        e=requestAnimationFrame(n)
      };
      return e=requestAnimationFrame(n),()=>cancelAnimationFrame(e);
    }, [d]),{text:e,done:r,push:useCallback(e=>{
      l.current+=e
    }, []),end:useCallback(()=>{
      o.current=true
    }, []),reset:useCallback(()=>{
      l.current="",i.current=0,o.current=false,t(""),a(false)
    }, [])};
  }(),[A,C]=useState(()=>Array.from({length:22},(e,t)=>t)),[E,W]=useState(22),[M,$]=useState(false),[D,I]=useState("all"),O=useRef([]),{ref:q,edges:H,onScroll:F}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:s}=t;
      r({start:a>1,end:Math.ceil(a+s)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),T=useRef(true),[V,B]=useState(false),L=E>=_.length||M;
  useEffect(()=>{
    E>=_.length||M||(R(),N(_[E].text),S())
  }, [E,M,R,N,S]),useEffect(()=>{
    if(!r||E>=_.length||M)return;
    let e=setTimeout(()=>{
      R(),C(e=>e.includes(E)?e:[...e,E]),W(e=>e+1)
    },260);
    return ()=>clearTimeout(e);
  }, [r,E,M,R]),useEffect(()=>{
    let e=q.current,t=e?.ownerDocument.defaultView;
    if(!e||!t)return;
    let r=()=>{
      let t=e.scrollHeight-e.clientHeight>1,r=e.scrollHeight-e.scrollTop-e.clientHeight,a=!t||r<24;
      T.current=a,B(t&&!a)
    },a=t=>{
      (!("deltaY"in t)||t.deltaY<0)&&e.scrollHeight-e.clientHeight>1&&e.scrollTop>0&&(T.current=false)
    },n=new t.ResizeObserver(()=>{
      T.current&&(e.scrollTop=e.scrollHeight),r()
    });
    return observe(e),e.firstElementChild&&observe(e.firstElementChild),e.addEventListener("wheel",a,{passive:true}),e.addEventListener("touchmove",a,{passive:true}),e.addEventListener("scroll",r,{passive:true}),e.scrollTop=e.scrollHeight,r(),()=>{
      disconnect(),e.removeEventListener("wheel",a),e.removeEventListener("touchmove",a),e.removeEventListener("scroll",r)
    };
  }, [q]);
  let P=A.filter(e=>"all"===D||_[e].sev===D),G=L||"all"!==D&&_[E]?.sev!==D?null:_[E];
  return (
    <div className={x("bg-white dark:bg-neutral-950",h,"relative flex h-full min-h-[640px] w-full flex-col gap-3 overflow-hidden p-4 sm:gap-4 sm:p-6")}>
        <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 sm:flex-nowrap">
          <div className="order-1 flex min-w-0 items-center gap-2">
            <span className="flex size-4 shrink-0 items-center justify-center">
              {L?<HugeiconsIcon icon={M?Icon_99199:Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" className={m} />:<span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />}
              <span className="sr-only">{M?"Stopped":L?"Done":"Running"}</span>
            </span>
            <h2 className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Run log</h2>
          </div>
          <div className="order-3 flex w-full sm:order-2 sm:ml-auto sm:w-auto">
            <div role="radiogroup" aria-label="Filter log by severity" onKeyDown={e=>{
              let t=j.findIndex(e=>e.id===D),r=-1;
              "ArrowRight"===e.key||"ArrowDown"===e.key?r=(t+1)%j.length:"ArrowLeft"===e.key||"ArrowUp"===e.key?r=(t-1+j.length)%j.length:"Home"===e.key?r=0:"End"===e.key&&(r=j.length-1),-1!==r&&(e.preventDefault(),I(j[r].id),O.current[r]?.focus({preventScroll:true}))
            }} className={x("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","flex-1")}>
              {j.map((e,t)=>{
                let r=D===e.id;
                return (
                  <button key={e.id} type="button" ref={e=>{
                                O.current[t]=e
                              }} role="radio" aria-checked={r} tabIndex={r?0:-1} onClick={()=>I(e.id)} className={x("relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40","flex-1 sm:flex-none")}>
                                <span className="sm:hidden">{e.short}</span>
                                <span className="hidden sm:inline">{e.label}</span>
                              </button>
                );
              })}
            </div>
          </div>
          <div className="order-2 ml-auto flex w-[76px] shrink-0 justify-end sm:order-3 sm:ml-0 sm:w-[86px]">
            {L?<span className={x(w,"truncate tabular-nums")}>
              {A.length}
              {" lines"}
            </span>:<>
              <span className="contents sm:hidden">
                <button type="button" aria-label="Stop" onClick={()=>$(true)} className={x(f,"size-8 rounded-[var(--rb-r-sm,6px)]")}>
                  <HugeiconsIcon icon={Icon_63163} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </span>
              <span className="hidden sm:contents">
                <button type="button" onClick={()=>$(true)} className={x(f,v)}>
                  <HugeiconsIcon icon={Icon_63163} size={16} strokeWidth={1.8} aria-hidden="true" />
                  Stop
                </button>
              </span>
            </>}
          </div>
        </div>
        <div className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className={x("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
            <div ref={q} onScroll={F} className="h-full overflow-y-auto overscroll-contain py-3 [overflow-anchor:none]">
              <ol>
                {0===P.length&&!G&&<li className="mt-2 p-4 text-center">
                  <p className={x("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mx-auto")}>
                    {"No "}
                    {D}
                    {" entries in this run."}
                  </p>
                  <button type="button" onClick={()=>I("all")} className={x(f,v,"mt-3")}>Clear filter</button>
                </li>}
                {P.map(e=>(
                  <li key={e} className={x(g,"error"===_[e].sev&&p,"py-0.5")}>
                                <span className={k}>{y(_[e].at)}</span>
                                <z sev={_[e].sev} />
                                <span className={x("min-w-0 flex-1","error"===_[e].sev?h:b)}>{_[e].text}</span>
                              </li>
                ))}
                {G&&<li className={x(g,"error"===G.sev&&p,"py-0.5")}>
                  <span className={k}>{y(G.at)}</span>
                  <z sev={G.sev} />
                  <span className={x("min-w-0 flex-1","error"===G.sev?h:b)}>{t}</span>
                </li>}
              </ol>
            </div>
            <div aria-hidden="true" className={x("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",H.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",H.end?"opacity-100":"opacity-0")} />
            {V&&<div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <motion.button type="button" onClick={()=>{
                let e=q.current;
                e&&(T.current=true,B(false),e.scrollTop=e.scrollHeight)
              }} initial={!e&&{opacity:0}} animate={{opacity:1}} transition={{duration:.16,ease:[.2,0,0,1]}} className={x(f,v)}>
                <HugeiconsIcon icon={Icon_54345} size={16} strokeWidth={1.8} aria-hidden="true" />
                Jump to latest
              </motion.button>
            </div>}
          </div>
        </div>
      </div>
  );
}


export default S;
