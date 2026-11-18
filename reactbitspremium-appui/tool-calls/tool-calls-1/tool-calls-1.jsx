/**
 * React Bits Pro — Application UI (tool-calls-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/80 dark:text-neutral-100/80",
  m = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "text-[12px]/[16px] font-normal tabular-nums",
  h = "font-mono text-[12px]/[16px] tabular-nums",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  k = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  v = "text-neutral-900 dark:text-neutral-100",
  g = "flex min-w-0 flex-col gap-3 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 px-3 py-2 dark:bg-neutral-100/5",
  _ = u("text-[16px]/[20px] font-[450] tracking-[-0.015em]",x),
  w = u(b,m),
  y = u(h,p,"min-w-0 flex-1 whitespace-pre"),
  j = [.2,0,0,1],
  N = `{
  "workspace": "northstar-prod",
  "query": "open incidents touching checkout latency",
  "include": ["timeline", "owners", "recent_deploys"],
  "window": "last 24h",
  "limit": 5
}`,
  z = `{
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
}`,
  S = [{id:"call_a1",name:"read_file",status:"done",duration:"38ms",startedAt:"14:08:22.041",input:'{ "path": "services/payments/retry.ts" }',output:"120 lines; exported withRetry, isRetryable, RetryError"},{id:"call_a2",name:"grep",status:"done",duration:"112ms",startedAt:"14:08:24.900",input:'{ "pattern": "RETRY_BACKOFF_MS", "path": "services" }',output:"3 matches across 2 files"},{id:"call_a3",name:"list_dir",status:"done",duration:"12ms",startedAt:"14:08:25.204",input:'{ "path": "services/checkout" }',output:"9 entries; latency.ts, handler.ts, __tests__/"},{id:"call_a4",name:"read_file",status:"done",duration:"41ms",startedAt:"14:08:25.660",input:'{ "path": "services/checkout/latency.ts" }',output:"88 lines; p95 timer wraps the retry path"},{id:"call_a5",name:"run_tests",status:"failed",duration:"2.30s",startedAt:"14:08:26.010",input:'{ "suite": "checkout", "grep": "retry" }',output:"1 failing; backoff ceiling exceeded under sustained load"},{id:"call_a6",name:"read_deploys",status:"done",duration:"88ms",startedAt:"14:08:28.400",input:'{ "service": "checkout-api", "window": "24h" }',output:"2 deploys; retry backoff lowered at 10:31 UTC"},{id:"call_a7",name:"git_blame",status:"done",duration:"64ms",startedAt:"14:08:29.020",input:'{ "path": "services/payments/retry.ts", "line": 88 }',output:'changed by a.rivera in 4f2c1de; "tune backoff"'},{id:"call_a8",name:"fetch_dashboard",status:"done",duration:"210ms",startedAt:"14:08:29.310",input:'{ "panel": "p95-latency", "service": "checkout-api" }',output:`p95 780ms → 1.42s starting 10:42 UTC`},{id:"call_a9",name:"read_config",status:"done",duration:"22ms",startedAt:"14:08:29.410",input:'{ "path": "services/payments/retry.config.json" }',output:"backoff ceiling 800ms; maxRetries 4"},{id:"call_a10",name:"query_logs",status:"done",duration:"173ms",startedAt:"14:08:29.490",input:'{ "service": "checkout-api", "level": "error", "window": "1h" }',output:"41 errors; 38 RetryError, 3 timeouts"},{id:"call_a11",name:"list_owners",status:"running",startedAt:"14:08:29.610",input:'{ "service": "checkout-api" }'}],
  A = {id:"call_live",name:"search_incidents",status:"streaming",startedAt:"14:08:30.118"},
  R = {streaming:"Streaming",running:"Running",done:"Done",failed:"Failed"},
  C = {streaming:v,running:v,done:"text-neutral-900/80 dark:text-neutral-100/80",failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

function T({label:e,value:t}){
  return (
    <div className="flex items-center gap-2">
        <dt className={m}>{e}</dt>
        <dd className={p}>{t}</dd>
      </div>
  );
}

function E(){
  let e=useId(),[t,r]=useState("streaming"),[p,m]=useState("call_live"),{text:v,done:E,push:H,end:I}=function(){
    let[e,t]=useState(""),[r,a]=useState(false),i=useRef(""),l=useRef(0),o=useRef(false),d=useReducedMotion();
    return useEffect(()=>{
      let e=0,r=performance.now(),n=s=>{
        let c=Math.min(s-r,64);
        r=s;
        let u=i.current,x=u.length-l.current;
        if(x>0){
          l.current=d?u.length:Math.min(u.length,l.current+x*(1-Math.exp(-c/180))+45*c/1e3);
          let e=Math.floor(l.current),r=o.current&&e>=u.length,n=r?u.length:function(e,t){
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
      i.current+=e
    }, []),end:useCallback(()=>{
      o.current=true
    }, []),reset:useCallback(()=>{
      i.current="",l.current=0,o.current=false,t(""),a(false)
    }, [])};
  }(),{ref:q,edges:D,onScroll:M}=function(){
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
  }(),{showJump:O,jump:F}=function(e){
    let t=useRef(true),[r,a]=useState(false);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      let n=()=>{
        let e=r.scrollHeight-r.clientHeight>1,n=r.scrollHeight-r.scrollTop-r.clientHeight,s=!e||n<24;
        t.current=s,a(e&&!s)
      },s=e=>{
        (!("deltaY"in e)||e.deltaY<0)&&r.scrollHeight-r.clientHeight>1&&r.scrollTop>0&&(t.current=false)
      },i=new ResizeObserver(()=>{
        t.current&&(r.scrollTop=r.scrollHeight),n()
      });
      return i.observe(r),r.firstElementChild&&i.observe(r.firstElementChild),r.addEventListener("wheel",s,{passive:true}),r.addEventListener("touchmove",s,{passive:true}),r.addEventListener("scroll",n,{passive:true}),r.scrollTop=r.scrollHeight,n(),()=>{
        i.disconnect(),r.removeEventListener("wheel",s),r.removeEventListener("touchmove",s),r.removeEventListener("scroll",n)
      };
    }, [e]),{showJump:r,jump:useCallback(()=>{
      let r=e.current;
      r&&(t.current=true,a(false),r.scrollTop=r.scrollHeight)
    }, [e])};
  }(q),P=useReducedMotion();
  useEffect(()=>{
    let e;
    if(P){
      H(N),I();
      return
    }
    let t=0,r=()=>{
      if(t>=N.length)return void I();
      let a=3+Math.floor(8*Math.random());
      H(N.slice(t,t+a)),t+=a,e=setTimeout(r,40+90*Math.random())
    };
    return e=setTimeout(r,260),()=>clearTimeout(e);
  }, [H,I,P]),useEffect(()=>{
    if(!E)return;
    let e=setTimeout(()=>r("running"),0),t=setTimeout(()=>r("done"),700);
    return ()=>{
      clearTimeout(e),clearTimeout(t)
    };
  }, [E]);
  let W=useCallback(()=>{
    I(),r("done")
  }, [I]),$=[...S,{...A,status:t,input:"streaming"===t?v:N,output:"done"===t?z:undefined,duration:"done"===t?"1.46s":undefined}];
  return (
    <div className={u("bg-white dark:bg-neutral-950",x,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex min-h-8 shrink-0 items-center justify-between gap-3">
          <h2 className={_}>Tool calls</h2>
          {"done"!==t?<button type="button" onClick={W} className={u(f,k)}>
            <HugeiconsIcon icon={Icon_63163} size={16} strokeWidth={1.8} aria-hidden="true" />
            Stop
          </button>:<span className={w}>
            {$.length}
            {" calls"}
          </span>}
        </header>
        <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className={u("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
            <div ref={q} onScroll={M} className="min-h-0 flex-1 overflow-y-auto overscroll-contain [overflow-anchor:none]">
              <div className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
                {$.map(t=>{
                  let r,n=p===t.id,s=!!t.input,i=!!t.output,o=`${e}-${t.id}`;
                  return (
                    <div key={t.id}>
                                    <div className="flex px-3 py-1">
                                      <button type="button" aria-expanded={n} aria-controls={o} onClick={()=>m(n?"":t.id)} className={u("group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","flex-1")}>
                                        <span className="flex size-4 shrink-0 items-center justify-center">
                                          <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                        </span>
                                        <span className={u("min-w-[6ch] truncate text-neutral-900 dark:text-neutral-100",h)}>{t.name}</span>
                                        <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/66 dark:text-neutral-100/66">
                                          <span>{t.duration}</span>
                                          <span className={u("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",C[t.status],"w-24 shrink-0 justify-end")}>
                                            {("streaming"===(r=t.status)||"running"===r)&&<span className="flex h-lh shrink-0 items-center">
                                              <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
                                            </span>}
                                            {R[t.status]}
                                          </span>
                                        </span>
                                      </button>
                                    </div>
                                    {n&&<div id={o} className="space-y-3 px-3 pt-1 pb-3">
                                      <dl className={u(b,"flex flex-wrap gap-x-8 gap-y-1")}>
                                        {t.startedAt&&<T label="Started" value={t.startedAt} />}
                                        {t.duration&&<T label="Duration" value={t.duration} />}
                                      </dl>
                                      {s&&<div>
                                        <p className={u(w,"mb-1.5")}>Arguments</p>
                                        <div className={u(g,"max-h-40 overflow-y-auto")}><pre className={y}>{t.input??""}</pre></div>
                                      </div>}
                                      {i&&<div>
                                        <p className={u(w,"mb-1.5")}>Result</p>
                                        <div className={u(g,"max-h-40 overflow-y-auto")}><pre className={y}>{t.output}</pre></div>
                                      </div>}
                                    </div>}
                                  </div>
                  );
                })}
              </div>
            </div>
            <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",D.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",D.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
        {O&&<motion.div initial={!P&&{opacity:0}} animate={{opacity:1}} transition={{duration:.16,ease:j}} className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <button type="button" onClick={F} className={u(f,k)}>
            <HugeiconsIcon icon={Icon_54345} size={16} strokeWidth={1.8} aria-hidden="true" />
            Jump to latest
          </button>
        </motion.div>}
      </div>
  );
}


export default E;
