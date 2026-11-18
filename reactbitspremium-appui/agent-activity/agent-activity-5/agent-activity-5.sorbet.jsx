/**
 * React Bits Pro — Application UI (agent-activity-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let c = (...e)=>e.filter(Boolean).join(" ");

let d = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/78 dark:text-neutral-100/78";

let x = "text-neutral-900/62 dark:text-neutral-100/62";

let u = "text-[14px]/[20px] font-medium";

let b = "inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none";

let p = c(u,x);

let h = [{label:"Loaded October general ledger",state:"done",seconds:.4},{label:"Pulled bank statement export",state:"done",seconds:1.3},{label:"Normalised 1,284 transactions",state:"done",seconds:2.1},{label:"Split multi-currency lines",state:"done",seconds:1.7},{label:"Matched transactions to ledger",state:"done",seconds:3.6},{label:"Flagged 12 unmatched entries",state:"done",seconds:.8},{label:"Grouped duplicates by reference",state:"done",seconds:.5},{label:"Reconciling flagged entries",state:"running"},{label:"Resolve foreign-exchange rounding",state:"queued"},{label:"Post adjustments to the ledger",state:"queued"},{label:"Generate the reconciliation report",state:"queued"},{label:"Archive the reconciliation run",state:"queued"},{label:"Notify the finance team",state:"queued"}];

let m = h.reduce((e,r)=>e+(r.seconds??0),0);

function f(e){
  return `${e.toFixed(1)}s`;
}

let g = (...e)=>e.filter(Boolean).join(" ");

let v = "text-neutral-900/62 dark:text-neutral-100/62";

let w = "text-[14px]/[20px] font-medium";

let j = "shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";

let N = g(w,v);

let y = [{label:"Prepare export",seconds:4.2,subSteps:[{label:"Validate source schema",seconds:1.1},{label:"Snapshot three tables",seconds:2.4},{label:"Acquire export lock",seconds:.7}]},{label:"Extract records",seconds:12.8,subSteps:[{label:"Read customers",seconds:3.1},{label:"Read subscriptions",seconds:6.4},{label:"Read invoices",seconds:3.3}]},{label:"Transform rows",seconds:8.3,subSteps:[{label:"Normalise currencies",seconds:2.2},{label:"Resolve account owners",seconds:4},{label:"Drop test accounts",seconds:2.1}]},{label:"Load warehouse",seconds:5.1,subSteps:[{label:"Stage to temp table",seconds:1.8},{label:"Merge into reporting schema",seconds:3.3}]},{label:"Verify output",seconds:2,subSteps:[{label:"Compare row counts",seconds:.9},{label:"Check referential integrity",seconds:1.1}]}];

let C = Math.max(...y.flatMap(e=>e.subSteps.map(e=>e.seconds)));

let z = y.reduce((e,r)=>e+r.seconds,0);

function S(e){
  return `${e.toFixed(1)}s`;
}

let es = (...e)=>e.filter(Boolean).join(" ");

let el = "text-neutral-900 dark:text-neutral-100";

let eo = "text-neutral-900/78 dark:text-neutral-100/78";

let ei = "text-neutral-900/62 dark:text-neutral-100/62";

let ec = "bg-[oklch(95.5%_0.03_26)] dark:bg-[oklch(30%_0.065_26)]";

let ed = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let e_ = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let ex = "flex min-w-full items-start gap-3 px-4 font-mono text-[13px]/[21px] tabular-nums";

let eu = "shrink-0 text-neutral-900/62 dark:text-neutral-100/62 max-sm:hidden";

let eb = es("text-[14px]/[20px] font-medium",ei);

let ep = [{at:0,sev:"info",text:"Starting run for workspace acme-analytics"},{at:.6,sev:"info",text:"Loaded 3 source connectors"},{at:1.4,sev:"info",text:"Connector postgres queued 1,284 rows"},{at:2.1,sev:"info",text:"Connector halcyon queued 642 records"},{at:2.9,sev:"info",text:"Connector lumendesk queued 318 tickets"},{at:3.7,sev:"info",text:"Fetching postgres batch 1 of 3"},{at:4.5,sev:"info",text:"Fetched 512 rows in 0.8s"},{at:5.2,sev:"warning",text:"Rate limit hit on halcyon, backing off 2s"},{at:7.3,sev:"info",text:"Resumed halcyon after backoff"},{at:8,sev:"info",text:"Fetched 642 halcyon records"},{at:8.8,sev:"info",text:"Transforming records to the canonical schema"},{at:9.6,sev:"info",text:"Dropped 14 rows that failed validation"},{at:10.4,sev:"warning",text:"Missing owner on 6 accounts, defaulting to unassigned"},{at:11.2,sev:"info",text:"Writing batch to the warehouse"},{at:12,sev:"error",text:"Write to reporting.accounts timed out after 30s"},{at:12.4,sev:"info",text:"Retrying write with a smaller batch size"},{at:13.9,sev:"info",text:"Write succeeded on retry"},{at:14.6,sev:"info",text:"Indexed 2,244 documents"},{at:15.3,sev:"info",text:"Building embeddings for 318 tickets"},{at:17.1,sev:"info",text:"Embeddings complete"},{at:17.8,sev:"info",text:"Refreshing materialised views"},{at:18.5,sev:"info",text:"View account_health refreshed"},{at:19.2,sev:"info",text:"View revenue_daily refreshed"},{at:19.9,sev:"info",text:"Verifying row counts against the sources"},{at:20.6,sev:"info",text:"Row counts match across 3 connectors"},{at:21.3,sev:"info",text:"Run complete, 2,244 records processed"}];

let eh = [{id:"all",label:"All",short:"All"},{id:"info",label:"Info",short:"Info"},{id:"warning",label:"Warnings",short:"Warn"},{id:"error",label:"Errors",short:"Err"}];

let em = {info:{word:"Info",tone:ei},warning:{word:"Warn",tone:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]"},error:{word:"Error",tone:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"}};

function ef(e){
  let r=Math.floor(e),t=Math.floor(r/60),a=Math.round((e-r)*10);
  return `${t}:${String(r%60).padStart(2,"0")}.${a}`;
}

function ek({sev:e}){
  return <span className={es("inline-flex w-[5ch] shrink-0 font-bold",em[e].tone)}>{em[e].word}</span>;
}


export default function agent_activity_5__Sorbet__Component(){
  let e=useReducedMotion(),{text:r,done:t,push:c,end:d,reset:_}=function(){
    let[e,r]=useState(""),[t,a]=useState(false),s=useRef(""),l=useRef(0),o=useRef(false),i=useReducedMotion();
    return useEffect(()=>{
      let e=0,t=performance.now(),n=c=>{
        let d=Math.min(c-t,64);
        t=c;
        let _=s.current,x=_.length-l.current;
        if(x>0){
          l.current=i?_.length:Math.min(_.length,l.current+x*(1-Math.exp(-d/180))+55*d/1e3);
          let e=Math.floor(l.current),t=o.current&&e>=_.length,n=t?_.length:function(e,r){
            if(r>=e.length)return e.length;
            let t=e.lastIndexOf(" ",r);
            return -1===t?0:t;
          }(_,e);
          r(_.slice(0,n)),t&&a(true)
        }
        e=requestAnimationFrame(n)
      };
      return e=requestAnimationFrame(n),()=>cancelAnimationFrame(e);
    }, [i]),{text:e,done:t,push:useCallback(e=>{
      s.current+=e
    }, []),end:useCallback(()=>{
      o.current=true
    }, []),reset:useCallback(()=>{
      s.current="",l.current=0,o.current=false,r(""),a(false)
    }, [])};
  }(),[x,u]=useState(()=>Array.from({length:22},(e,r)=>r)),[b,p]=useState(22),[h,m]=useState(false),[f,k]=useState("all"),g=useRef([]),{ref:v,edges:w,onScroll:j}=function(){
    let e=useRef(null),[r,t]=useState({start:false,end:false}),a=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:s}=r;
      t({start:a>1,end:Math.ceil(a+s)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let r=e.current,t=r?.ownerDocument.defaultView;
      if(!r||!t?.ResizeObserver)return;
      let n=new t.ResizeObserver(a);
      return observe(r),()=>disconnect();
    }, [a]),{ref:e,edges:r,onScroll:a};
  }(),N=useRef(true),[y,C]=useState(false),z=b>=ep.length||h;
  useEffect(()=>{
    b>=ep.length||h||(_(),c(ep[b].text),d())
  }, [b,h,_,c,d]),useEffect(()=>{
    if(!t||b>=ep.length||h)return;
    let e=setTimeout(()=>{
      _(),u(e=>e.includes(b)?e:[...e,b]),p(e=>e+1)
    },260);
    return ()=>clearTimeout(e);
  }, [t,b,h,_]),useEffect(()=>{
    let e=v.current,r=e?.ownerDocument.defaultView;
    if(!e||!r)return;
    let t=()=>{
      let r=e.scrollHeight-e.clientHeight>1,t=e.scrollHeight-e.scrollTop-e.clientHeight,a=!r||t<24;
      N.current=a,C(r&&!a)
    },a=r=>{
      (!("deltaY"in r)||r.deltaY<0)&&e.scrollHeight-e.clientHeight>1&&e.scrollTop>0&&(N.current=false)
    },n=new r.ResizeObserver(()=>{
      N.current&&(e.scrollTop=e.scrollHeight),t()
    });
    return observe(e),e.firstElementChild&&observe(e.firstElementChild),e.addEventListener("wheel",a,{passive:true}),e.addEventListener("touchmove",a,{passive:true}),e.addEventListener("scroll",t,{passive:true}),e.scrollTop=e.scrollHeight,t(),()=>{
      disconnect(),e.removeEventListener("wheel",a),e.removeEventListener("touchmove",a),e.removeEventListener("scroll",t)
    };
  }, [v]);
  let S=x.filter(e=>"all"===f||ep[e].sev===f),R=z||"all"!==f&&ep[b]?.sev!==f?null:ep[b];
  return (
    <div className={es("bg-white dark:bg-neutral-950",el,"relative flex h-full min-h-[700px] w-full flex-col gap-3 overflow-hidden p-4 sm:gap-4 sm:p-6")}>
        <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 sm:flex-nowrap">
          <div className="order-1 flex min-w-0 items-center gap-2">
            <span className="flex size-[18px] shrink-0 items-center justify-center">
              {z?<HugeiconsIcon icon={h?Icon_99199:Icon_90987} size={14} strokeWidth={2} aria-hidden="true" className={ei} />:<span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />}
              <span className="sr-only">{h?"Stopped":z?"Done":"Running"}</span>
            </span>
            <h2 className={es("text-[17px]/[22px] font-extrabold","truncate")}>Run log</h2>
          </div>
          <div className="order-3 flex w-full sm:order-2 sm:ml-auto sm:w-auto">
            <div role="radiogroup" aria-label="Filter log by severity" onKeyDown={e=>{
              let r=eh.findIndex(e=>e.id===f),t=-1;
              "ArrowRight"===e.key||"ArrowDown"===e.key?t=(r+1)%eh.length:"ArrowLeft"===e.key||"ArrowUp"===e.key?t=(r-1+eh.length)%eh.length:"Home"===e.key?t=0:"End"===e.key&&(t=eh.length-1),-1!==t&&(e.preventDefault(),k(eh[t].id),g.current[t]?.focus({preventScroll:true}))
            }} className={es("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","flex-1")}>
              {eh.map((e,r)=>{
                let t=f===e.id;
                return (
                  <button key={e.id} type="button" ref={e=>{
                                g.current[r]=e
                              }} role="radio" aria-checked={t} tabIndex={t?0:-1} onClick={()=>k(e.id)} className={es("relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40","flex-1 sm:flex-none")}>
                                <span className="sm:hidden">{e.short}</span>
                                <span className="hidden sm:inline">{e.label}</span>
                              </button>
                );
              })}
            </div>
          </div>
          <div className="order-2 ml-auto flex w-[76px] shrink-0 justify-end sm:order-3 sm:ml-0 sm:w-[86px]">
            {z?<span className={es(eb,"truncate tabular-nums")}>
              {x.length}
              {" lines"}
            </span>:<>
              <span className="contents sm:hidden">
                <button type="button" aria-label="Stop" onClick={()=>m(true)} className={es(ed,"size-10 rounded-[calc(var(--rb-r-full,999px))]")}>
                  <HugeiconsIcon icon={Icon_63163} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </span>
              <span className="hidden sm:contents">
                <button type="button" onClick={()=>m(true)} className={es(ed,e_)}>
                  <HugeiconsIcon icon={Icon_63163} size={18} strokeWidth={2} aria-hidden="true" />
                  Stop
                </button>
              </span>
            </>}
          </div>
        </div>
        <div className={es("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
          <div className={es("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1 min-h-0 flex-1")}>
            <div ref={v} onScroll={j} className="h-full overflow-y-auto overscroll-contain py-3 [overflow-anchor:none]">
              <ol>
                {0===S.length&&!R&&<li className="mt-2 p-4 text-center">
                  <p className={es("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mx-auto")}>
                    {"No "}
                    {f}
                    {" entries in this run."}
                  </p>
                  <button type="button" onClick={()=>k("all")} className={es(ed,e_,"mt-3")}>Clear filter</button>
                </li>}
                {S.map(e=>(
                  <li key={e} className={es(ex,"error"===ep[e].sev&&ec,"py-0.5")}>
                                <span className={eu}>{ef(ep[e].at)}</span>
                                <ek sev={ep[e].sev} />
                                <span className={es("min-w-0 flex-1","error"===ep[e].sev?el:eo)}>{ep[e].text}</span>
                              </li>
                ))}
                {R&&<li className={es(ex,"error"===R.sev&&ec,"py-0.5")}>
                  <span className={eu}>{ef(R.at)}</span>
                  <ek sev={R.sev} />
                  <span className={es("min-w-0 flex-1","error"===R.sev?el:eo)}>{r}</span>
                </li>}
              </ol>
            </div>
            <div aria-hidden="true" className={es("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",w.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={es("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",w.end?"opacity-100":"opacity-0")} />
            {y&&<div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <motion.button type="button" onClick={()=>{
                let e=v.current;
                e&&(N.current=true,C(false),e.scrollTop=e.scrollHeight)
              }} initial={!e&&{opacity:0}} animate={{opacity:1}} transition={{duration:.16,ease:[.2,0,0,1]}} className={es(ed,e_)}>
                <HugeiconsIcon icon={Icon_54345} size={18} strokeWidth={2} aria-hidden="true" />
                Jump to latest
              </motion.button>
            </div>}
          </div>
        </div>
      </div>
  );
}
