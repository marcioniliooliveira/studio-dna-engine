/**
 * React Bits Pro — Application UI (tool-calls-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" ");

let _ = "text-neutral-900 dark:text-neutral-100";

let x = "text-neutral-900/78 dark:text-neutral-100/78";

let p = "text-neutral-900/62 dark:text-neutral-100/62";

let b = "text-[13px]/[16px] font-semibold tabular-nums";

let h = "font-mono text-[12px]/[16px] tabular-nums";

let m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let k = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let f = "text-neutral-900 dark:text-neutral-100";

let v = "flex min-w-0 flex-col gap-3 rounded-[calc(var(--rb-r-xl,12px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 py-2.5";

let g = u("text-[17px]/[22px] font-extrabold",_);

let w = u(b,p);

let y = u(h,x,"min-w-0 flex-1 whitespace-pre");

let j = [.2,0,0,1];

let N = `{
  "workspace": "northstar-prod",
  "query": "open incidents touching checkout latency",
  "include": ["timeline", "owners", "recent_deploys"],
  "window": "last 24h",
  "limit": 5
}`;

let C = `{
  "incidents": [
    {
      "id": "INC-2487",
      "service": "checkout-api",
      "owner": "Payments Platform",
      "status": "mitigated",
      "startedAt": "10:42 UTC",
      "summary": "p95 latency rose after retry backoff was lowered"
    },
    {
      "id": "INC-2485",
      "service": "cart-sync",
      "owner": "Storefront Reliability",
      "status": "watching",
      "summary": "queue depth normalized after a worker pool resize"
    }
  ],
  "count": 2
}`;

let A = [{id:"call_a1",name:"read_file",status:"done",duration:"38ms",startedAt:"14:08:22.041",input:'{ "path": "services/payments/retry.ts" }',output:"120 lines; exported withRetry, isRetryable, RetryError"},{id:"call_a2",name:"grep",status:"done",duration:"112ms",startedAt:"14:08:24.900",input:'{ "pattern": "RETRY_BACKOFF_MS", "path": "services" }',output:"3 matches across 2 files"},{id:"call_a3",name:"list_dir",status:"done",duration:"12ms",startedAt:"14:08:25.204",input:'{ "path": "services/checkout" }',output:"9 entries; latency.ts, handler.ts, __tests__/"},{id:"call_a4",name:"read_file",status:"done",duration:"41ms",startedAt:"14:08:25.660",input:'{ "path": "services/checkout/latency.ts" }',output:"88 lines; p95 timer wraps the retry path"},{id:"call_a5",name:"run_tests",status:"failed",duration:"2.30s",startedAt:"14:08:26.010",input:'{ "suite": "checkout", "grep": "retry" }',output:"1 failing; backoff ceiling exceeded under sustained load"},{id:"call_a6",name:"read_deploys",status:"done",duration:"88ms",startedAt:"14:08:28.400",input:'{ "service": "checkout-api", "window": "24h" }',output:"2 deploys; retry backoff lowered at 10:31 UTC"},{id:"call_a7",name:"git_blame",status:"done",duration:"64ms",startedAt:"14:08:29.020",input:'{ "path": "services/payments/retry.ts", "line": 88 }',output:'changed by a.rivera in 4f2c1de; "tune backoff"'},{id:"call_a8",name:"fetch_dashboard",status:"done",duration:"210ms",startedAt:"14:08:29.310",input:'{ "panel": "p95-latency", "service": "checkout-api" }',output:`p95 780ms → 1.42s starting 10:42 UTC`},{id:"call_a9",name:"read_config",status:"done",duration:"22ms",startedAt:"14:08:29.410",input:'{ "path": "services/payments/retry.config.json" }',output:"backoff ceiling 800ms; maxRetries 4"},{id:"call_a10",name:"query_logs",status:"done",duration:"173ms",startedAt:"14:08:29.490",input:'{ "service": "checkout-api", "level": "error", "window": "1h" }',output:"41 errors; 38 RetryError, 3 timeouts"},{id:"call_a11",name:"list_owners",status:"running",startedAt:"14:08:29.610",input:'{ "service": "checkout-api" }'}];

let z = {id:"call_live",name:"search_incidents",status:"streaming",startedAt:"14:08:30.118"};

let S = {streaming:"Streaming",running:"Running",done:"Done",failed:"Failed"};

let R = {streaming:f,running:f,done:"text-neutral-900/78 dark:text-neutral-100/78",failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

function E({label:e,value:t}){
  return (
    <div className="flex items-center gap-2">
        <dt className={p}>{e}</dt>
        <dd className={x}>{t}</dd>
      </div>
  );
}

let W = (...e)=>e.filter(Boolean).join(" ");

let q = "text-neutral-900 dark:text-neutral-100";

let H = "text-neutral-900/62 dark:text-neutral-100/62";

let D = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let O = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let F = "text-neutral-900 dark:text-neutral-100";

let B = "text-neutral-900/78 dark:text-neutral-100/78";


export default function tool_calls_1__Sorbet__Component(){
  let e=useId(),[t,r]=useState("streaming"),[x,p]=useState("call_live"),{text:f,done:T,push:L,end:M}=function(){
    let[e,t]=useState(""),[r,a]=useState(false),l=useRef(""),s=useRef(0),o=useRef(false),c=useReducedMotion();
    return useEffect(()=>{
      let e=0,r=performance.now(),n=i=>{
        let d=Math.min(i-r,64);
        r=i;
        let u=l.current,_=u.length-s.current;
        if(_>0){
          s.current=c?u.length:Math.min(u.length,s.current+_*(1-Math.exp(-d/180))+45*d/1e3);
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
    }, [c]),{text:e,done:r,push:useCallback(e=>{
      l.current+=e
    }, []),end:useCallback(()=>{
      o.current=true
    }, []),reset:useCallback(()=>{
      l.current="",s.current=0,o.current=false,t(""),a(false)
    }, [])};
  }(),{ref:I,edges:W,onScroll:q}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),{showJump:H,jump:D}=function(e){
    let t=useRef(true),[r,a]=useState(false);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      let n=()=>{
        let e=r.scrollHeight-r.clientHeight>1,n=r.scrollHeight-r.scrollTop-r.clientHeight,i=!e||n<24;
        t.current=i,a(e&&!i)
      },i=e=>{
        (!("deltaY"in e)||e.deltaY<0)&&r.scrollHeight-r.clientHeight>1&&r.scrollTop>0&&(t.current=false)
      },l=new ResizeObserver(()=>{
        t.current&&(r.scrollTop=r.scrollHeight),n()
      });
      return l.observe(r),r.firstElementChild&&l.observe(r.firstElementChild),r.addEventListener("wheel",i,{passive:true}),r.addEventListener("touchmove",i,{passive:true}),r.addEventListener("scroll",n,{passive:true}),r.scrollTop=r.scrollHeight,n(),()=>{
        l.disconnect(),r.removeEventListener("wheel",i),r.removeEventListener("touchmove",i),r.removeEventListener("scroll",n)
      };
    }, [e]),{showJump:r,jump:useCallback(()=>{
      let r=e.current;
      r&&(t.current=true,a(false),r.scrollTop=r.scrollHeight)
    }, [e])};
  }(I),O=useReducedMotion();
  useEffect(()=>{
    let e;
    if(O){
      L(N),M();
      return
    }
    let t=0,r=()=>{
      if(t>=N.length)return void M();
      let a=3+Math.floor(8*Math.random());
      L(N.slice(t,t+a)),t+=a,e=setTimeout(r,40+90*Math.random())
    };
    return e=setTimeout(r,260),()=>clearTimeout(e);
  }, [L,M,O]),useEffect(()=>{
    if(!T)return;
    let e=setTimeout(()=>r("running"),0),t=setTimeout(()=>r("done"),700);
    return ()=>{
      clearTimeout(e),clearTimeout(t)
    };
  }, [T]);
  let F=useCallback(()=>{
    M(),r("done")
  }, [M]),B=[...A,{...z,status:t,input:"streaming"===t?f:N,output:"done"===t?C:undefined,duration:"done"===t?"1.46s":undefined}];
  return (
    <div className={u("bg-white dark:bg-neutral-950",_,"relative flex h-full min-h-[700px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex min-h-8 shrink-0 items-center justify-between gap-3">
          <h2 className={g}>Tool calls</h2>
          {"done"!==t?<button type="button" onClick={F} className={u(m,k)}>
            <HugeiconsIcon icon={Icon_63163} size={18} strokeWidth={2} aria-hidden="true" />
            Stop
          </button>:<span className={w}>
            {B.length}
            {" calls"}
          </span>}
        </header>
        <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
          <div className={u("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1 min-h-0 flex-1")}>
            <div ref={I} onScroll={q} className="min-h-0 flex-1 overflow-y-auto overscroll-contain [overflow-anchor:none]">
              <div className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
                {B.map(t=>{
                  let r,n=x===t.id,i=!!t.input,l=!!t.output,o=`${e}-${t.id}`;
                  return (
                    <div key={t.id}>
                                    <div className="flex px-3 py-1">
                                      <button type="button" aria-expanded={n} aria-controls={o} onClick={()=>p(n?"":t.id)} className={u("group -mx-2 flex min-h-9 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[calc(var(--rb-r-lg,10px))] px-2 text-left text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:hover:bg-neutral-100/6 dark:active:bg-neutral-100/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","flex-1")}>
                                        <span className="flex size-[18px] shrink-0 items-center justify-center">
                                          <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                        </span>
                                        <span className={u("min-w-[6ch] truncate font-bold text-neutral-900 dark:text-neutral-100",h)}>{t.name}</span>
                                        <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/62 dark:text-neutral-100/62">
                                          <span>{t.duration}</span>
                                          <span className={u("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",R[t.status],"w-24 shrink-0 justify-end")}>
                                            {("streaming"===(r=t.status)||"running"===r)&&<span className="flex h-lh shrink-0 items-center">
                                              <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
                                            </span>}
                                            {S[t.status]}
                                          </span>
                                        </span>
                                      </button>
                                    </div>
                                    {n&&<div id={o} className="space-y-3 px-3 pt-1 pb-3">
                                      <dl className={u(b,"flex flex-wrap gap-x-8 gap-y-1")}>
                                        {t.startedAt&&<E label="Started" value={t.startedAt} />}
                                        {t.duration&&<E label="Duration" value={t.duration} />}
                                      </dl>
                                      {i&&<div>
                                        <p className={u(w,"mb-1.5")}>Arguments</p>
                                        <div className={u(v,"max-h-40 overflow-y-auto")}><pre className={y}>{t.input??""}</pre></div>
                                      </div>}
                                      {l&&<div>
                                        <p className={u(w,"mb-1.5")}>Result</p>
                                        <div className={u(v,"max-h-40 overflow-y-auto")}><pre className={y}>{t.output}</pre></div>
                                      </div>}
                                    </div>}
                                  </div>
                  );
                })}
              </div>
            </div>
            <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",W.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",W.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
        {H&&<motion.div initial={!O&&{opacity:0}} animate={{opacity:1}} transition={{duration:.16,ease:j}} className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <button type="button" onClick={D} className={u(m,k)}>
            <HugeiconsIcon icon={Icon_54345} size={18} strokeWidth={2} aria-hidden="true" />
            Jump to latest
          </button>
        </motion.div>}
      </div>
  );
}
