/**
 * React Bits Pro — Application UI (data-table-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_22670 = [["path",{d:"M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58661 = [["path",{d:"M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  b = "bg-white dark:bg-neutral-950",
  m = "bg-neutral-50 dark:bg-neutral-900",
  k = "text-neutral-900 dark:text-neutral-100",
  f = "text-neutral-900/80 dark:text-neutral-100/80",
  g = "text-neutral-900/66 dark:text-neutral-100/66",
  v = "text-[13px]/[18px] font-normal",
  w = "text-[14px]/[16px] font-[450]",
  _ = "text-[12px]/[16px] font-normal tabular-nums",
  j = "relative -ml-px inline-flex h-8 min-w-8 cursor-pointer items-center justify-center border border-neutral-900/12 bg-white dark:bg-neutral-900 px-2 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100 first:ml-0 first:rounded-l-[var(--rb-r-sm,6px)] last:rounded-r-[var(--rb-r-sm,6px)] transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:z-10 hover:border-neutral-900/32 hover:bg-neutral-900/5 aria-[current=page]:z-10 aria-[current=page]:border-neutral-900/32 aria-[current=page]:bg-neutral-900/9 aria-disabled:pointer-events-none aria-disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/14 dark:hover:border-neutral-100/32 dark:hover:bg-neutral-100/5 dark:aria-[current=page]:border-neutral-100/32 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40",
  N = "text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66",
  y = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  S = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  A = "text-right tabular-nums",
  C = "inline-flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-white/10 px-3 text-[14px]/[16px] font-[450] transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-white/16 active:bg-white/28 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent-fg,oklch(100%_0_0))] dark:bg-neutral-900/10 dark:hover:bg-neutral-900/16 dark:active:bg-neutral-900/28 dark:focus-visible:outline-[var(--rb-accent-fg,oklch(20.5%_0_0))]",
  D = "sm:first:ps-6 sm:last:pe-6",
  z = [{id:"PAY-0182",vendor:"Pilot Fiber Transit",owner:"Iris Woods",status:"Needs approval",amount:6420,due:"Aug 6"},{id:"PAY-0183",vendor:"Granite Switchgear Supply",owner:"Niko Bryant",status:"Scheduled",amount:18200,due:"Aug 7"},{id:"PAY-0184",vendor:"Beacon Yard Services",owner:"Marisol Vale",status:"Paid",amount:3140,due:"Aug 9"},{id:"PAY-0185",vendor:"Atlas Thermal Controls",owner:"Jun Park",status:"Scheduled",amount:9880,due:"Aug 11"},{id:"PAY-0186",vendor:"Silverline Security Review Partners",owner:"Mara Singh",status:"Needs approval",amount:2760,due:"Aug 15"},{id:"PAY-0187",vendor:"Lowland Metering Group",owner:"Theo Grant",status:"Paid",amount:14050,due:"Aug 18"},{id:"PAY-0188",vendor:"Cedarworks Freight",owner:"Asha Malik",status:"Scheduled",amount:5310,due:"Aug 20"},{id:"PAY-0189",vendor:"Halden Instrument Rental",owner:"Camille Hart",status:"Paid",amount:1980,due:"Aug 22"},{id:"PAY-0190",vendor:"Northwind Facilities",owner:"Iris Woods",status:"Needs approval",amount:22400,due:"Aug 25"},{id:"PAY-0191",vendor:"Riverbend Testing Lab",owner:"Niko Bryant",status:"Scheduled",amount:7640,due:"Aug 27"},{id:"PAY-0192",vendor:"Cascade Pallet Works",owner:"Marisol Vale",status:"Paid",amount:4380,due:"Aug 28"},{id:"PAY-0193",vendor:"Ironvale Coatings",owner:"Theo Grant",status:"Scheduled",amount:12740,due:"Sep 1"},{id:"PAY-0194",vendor:"Dockside Calibration Services",owner:"Mara Singh",status:"Needs approval",amount:8150,due:"Sep 2"},{id:"PAY-0195",vendor:"Alder Route Analytics",owner:"Jun Park",status:"Scheduled",amount:3290,due:"Sep 4"},{id:"PAY-0196",vendor:"Fenwick Packaging",owner:"Camille Hart",status:"Paid",amount:6710,due:"Sep 5"},{id:"PAY-0197",vendor:"Harborlight Cold Chain",owner:"Iris Woods",status:"Scheduled",amount:19430,due:"Sep 8"},{id:"PAY-0198",vendor:"Quarry Bend Materials",owner:"Niko Bryant",status:"Needs approval",amount:5040,due:"Sep 9"},{id:"PAY-0199",vendor:"Westline Fleet Care",owner:"Asha Malik",status:"Paid",amount:2260,due:"Sep 11"},{id:"PAY-0200",vendor:"Stonecrest Utility Partners",owner:"Marisol Vale",status:"Scheduled",amount:15870,due:"Sep 12"},{id:"PAY-0201",vendor:"Meridian Trade Compliance",owner:"Jun Park",status:"Needs approval",amount:9320,due:"Sep 15"},{id:"PAY-0202",vendor:"Blackpine Yard Equipment",owner:"Theo Grant",status:"Scheduled",amount:7180,due:"Sep 16"},{id:"PAY-0203",vendor:"Verity Audit Group",owner:"Mara Singh",status:"Paid",amount:11600,due:"Sep 18"},{id:"PAY-0204",vendor:"Copperfield Signage",owner:"Camille Hart",status:"Scheduled",amount:1840,due:"Sep 19"},{id:"PAY-0205",vendor:"Northgate Waste Services",owner:"Niko Bryant",status:"Needs approval",amount:4960,due:"Sep 22"},{id:"PAY-0206",vendor:"Trellis Facility Software",owner:"Iris Woods",status:"Paid",amount:20510,due:"Sep 23"},{id:"PAY-0207",vendor:"Sunfield Grounds Care",owner:"Asha Malik",status:"Scheduled",amount:3470,due:"Sep 25"},{id:"PAY-0208",vendor:"Larkspur Legal Retainer",owner:"Jun Park",status:"Needs approval",amount:13250,due:"Sep 26"},{id:"PAY-0209",vendor:"Beacon Ridge Insurance",owner:"Marisol Vale",status:"Scheduled",amount:27890,due:"Sep 29"}],
  R = e=>e.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}),
  P = {Scheduled:"text-neutral-900 dark:text-neutral-100","Needs approval":k,Paid:"text-neutral-900/80 dark:text-neutral-100/80","On hold":"text-neutral-900/66 dark:text-neutral-100/66"};

function L({status:e}){
  return <span className={p("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",P[e],"whitespace-nowrap")}>{e}</span>;
}

function E({checked:e,indeterminate:t,onChange:r,label:o}){
  let d=useRef(null),c=!!t&&!e;
  return useEffect(()=>{
    d.current&&(d.current.indeterminate=c)
  }, [c]),<span className="relative inline-flex size-4 shrink-0 items-center justify-center">
    <input ref={d} type="checkbox" checked={e} onChange={r} aria-label={o} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
    <HugeiconsIcon icon={c?Icon_99199:Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={p("pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","peer-indeterminate:opacity-100")} />
  </span>;
}

function O({id:e,value:t,onChange:r,options:l,disabled:d,placeholder:c="Select…",className:u,triggerClassName:x,ariaLabel:h}){
  let b=useId(),[m,k]=useState(false),[f,v]=useState(0),[w,_]=useState(false),[j,N]=useState(),y=useRef(null),S=useRef(null),A=useRef({buffer:"",at:0}),C=l.findIndex(e=>e.value===t),D=C>=0?l[C]:undefined,z=e=>{
    if(d)return;
    let t=y.current,r=t?.ownerDocument.defaultView;
    if(t&&r){
      let e=t.getBoundingClientRect(),a=0,n=r.innerHeight;
      for(let e=t.parentElement;e;e=e.parentElement)if(/(auto|scroll|hidden|clip)/.test(r.getComputedStyle(e).overflowY)){
        let t=e.getBoundingClientRect();
        a=Math.max(a,t.top),n=Math.min(n,t.bottom);
        break
      }
      let s=n-e.bottom,i=e.top-a,o=Math.min(32*l.length+10,264),d=s<o+8&&i>s,c=(d?i:s)-8;
      _(d),N(c<o?Math.max(c,40):undefined)
    }
    v(e??(C>=0?C:0)),k(true)
  };
  useEffect(()=>{
    if(!m)return;
    let e=y.current,t=e?.ownerDocument;
    if(!t)return;
    let r=t=>{
      e.contains(t.target)||k(false)
    };
    return t.addEventListener("mousedown",r),t.addEventListener("touchstart",r),()=>{
      t.removeEventListener("mousedown",r),t.removeEventListener("touchstart",r)
    };
  }, [m]),useEffect(()=>{
    if(!m)return;
    let e=S.current,t=e?.querySelector(`[data-index="${f}"]`);
    if(!e||!t)return;
    let r=t.offsetTop,a=r+t.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:a>e.scrollTop+e.clientHeight&&(e.scrollTop=a-e.clientHeight)
  }, [m,f]);
  let R=e=>{
    let t=l[e];
    t&&(r(t.value),k(false),y.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={y} className={p("relative",u)}>
        <button id={e} type="button" role="combobox" aria-expanded={m} aria-controls={b} aria-haspopup="listbox" aria-activedescendant={m?`${b}-${f}`:undefined} aria-label={h} disabled={d} onClick={()=>m?k(false):z()} onKeyDown={e=>{
          if(!d){
            if(!m){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),z());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),k(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),v(e=>Math.min(e+1,l.length-1));else if("ArrowUp"===e.key)e.preventDefault(),v(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),v(0);else if("End"===e.key)e.preventDefault(),v(l.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),R(f);else if(1===e.key.length&&/\S/.test(e.key)){
              let t=Date.now(),r=A.current;
              r.buffer=t-r.at>700?e.key:r.buffer+e.key,r.at=t;
              let a=l.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              a>=0&&v(a)
            }
          }
        }} className={p("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",x)}>
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {l.map(e=>(
              <span key={e.value} aria-hidden="true" className="invisible flex min-w-0 items-baseline gap-2">
                        <span className="truncate">{e.label}</span>
                        {e.hint&&<span className="truncate">{e.hint}</span>}
                      </span>
            ))}
            <span className="flex min-w-0 items-baseline gap-2">
              {D?<>
                <span className="truncate">{D.label}</span>
                {D.hint&&<span className={p(g,"truncate")}>{D.hint}</span>}
              </>:<span className={p("text-neutral-900/66 dark:text-neutral-100/66","truncate")}>{c}</span>}
            </span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {m&&<ul ref={S} id={b} role="listbox" tabIndex={-1} style={{maxHeight:j}} className={p("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute z-30 max-h-[264px] w-full min-w-[100%]",w?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {l.map((e,r)=>{
            let n=e.value===t;
            return (
              <li key={e.value} id={`${b}-${r}`} role="option" aria-selected={n} data-index={r} data-highlighted={r===f?"":undefined} onMouseEnter={()=>v(r)} onClick={()=>R(r)} className={p("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={g}>{e.hint}</span>}
                        </span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let M = [10,25];

function T(){
  let{ref:e,edges:t,onScroll:r}=function(){
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
  }(),[l,i]=useState(new Set),[o,P]=useState(new Set(["PAY-0182","PAY-0185"])),[T,W]=useState(10),[H,B]=useState(1),F=Math.max(1,Math.ceil(z.length/T)),I=Math.min(H,F),Y=(I-1)*T,U=z.slice(Y,Y+T),G=U.map(e=>e.id),V=G.filter(e=>o.has(e)).length,K=V===G.length&&G.length>0,$=useMemo(()=>z.filter(e=>o.has(e.id)).reduce((e,t)=>e+t.amount,0), [o]),q=()=>P(new Set),J=e=>B(Math.min(Math.max(e,1),F));
  return (
    <div className={p(b,k,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={p(m,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <h2 className={p("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Outgoing payments</h2>
            <span className={p(_,g,"shrink-0")}>
              {z.length}
              {" pending"}
            </span>
          </header>
          {o.size>0?<div className={p("bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900","flex h-12 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <span aria-live="polite" className={w}>
              {o.size}
              {" selected"}
            </span>
            <span className={_}>{R($)}</span>
            <div className="ml-auto flex items-center gap-1">
              <button type="button" onClick={()=>{
                i(e=>new Set([...e,...o])),q()
              }} className={C}>
                <HugeiconsIcon icon={Icon_22670} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                <span className="max-sm:sr-only">Hold</span>
              </button>
              <button type="button" className={C}>
                <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                <span className="max-sm:sr-only">Export</span>
              </button>
              <button type="button" onClick={q} aria-label="Clear selection" className={C}>
                <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>:<div className={p(m,v,f,"flex h-12 shrink-0 items-center px-4 sm:px-6")}>Select rows to approve, hold, or export a batch.</div>}
          <div className="relative min-h-0 flex-1">
            <div ref={e} onScroll={r} className="h-full overflow-auto">
              <table className={p("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","min-w-[720px]")}>
                <caption className="sr-only">Outgoing vendor payments</caption>
                <thead className={p(b,"sticky top-0 z-20")}>
                  <tr>
                    <th scope="col" className={p(y,D,"w-12")}>
                      <E checked={K} indeterminate={V>0&&!K} onChange={()=>P(e=>{
                        let t=new Set(e);
                        return K?G.forEach(e=>t.delete(e)):G.forEach(e=>t.add(e)),t;
                      })} label="Select all payments on this page" />
                    </th>
                    <th scope="col" className={p(y,D)}>Vendor</th>
                    <th scope="col" className={p(y,D,"w-[160px]")}>Owner</th>
                    <th scope="col" className={p(y,D,"w-[150px]")}>Status</th>
                    <th scope="col" className={p(y,D,"w-[120px] text-right")}>Amount</th>
                    <th scope="col" className={p(y,D,"w-[90px] text-right")}>Due</th>
                  </tr>
                </thead>
                <tbody>
                  {U.map(e=>{
                    let t=o.has(e.id);
                    return (
                      <tr key={e.id} aria-selected={t} className="group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9">
                                        <td className={p(S,D,"w-12")}>
                                          <E checked={t} onChange={()=>{
                                            let t;
                                            return t=e.id,P(e=>{
                                              let r=new Set(e);
                                              return r.has(t)?r.delete(t):r.add(t),r;
                                            });
                                          }} label={`Select ${e.vendor}`} />
                                        </td>
                                        <td className={p(S,D,"max-w-[260px] py-1.5")}>
                                          <span className={p(w,"block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]")}>{e.vendor}</span>
                                          <span className={p("font-mono text-[12px]/[16px] tabular-nums",g,"block")}>{e.id}</span>
                                        </td>
                                        <td className={p(S,D,"truncate")}><span className={f}>{e.owner}</span></td>
                                        <td className={p(S,D)}><L status={l.has(e.id)?"On hold":e.status} /></td>
                                        <td className={p(S,A,D)}>{R(e.amount)}</td>
                                        <td className={p(S,A,D)}><span className={f}>{e.due}</span></td>
                                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div aria-hidden="true" className={p("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={p(m,"flex h-12 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <div className={p(v,f,"hidden items-center gap-2 sm:flex")}>
              Rows per page
              <O value={String(T)} onChange={e=>{
                W(Number(e)),B(1)
              }} options={M.map(e=>({value:String(e),label:String(e)}))} ariaLabel="Rows per page" triggerClassName="min-w-[0px]" />
            </div>
            <span className={N}>
              <span className={k}>
                {Y+1}
                –
                {Y+U.length}
              </span>
              {" "}
              {"of "}
              {z.length}
            </span>
            <div className="ml-auto flex items-center gap-1">
              <span className={p(N,"sm:hidden")}>
                {I}
                {" / "}
                {F}
              </span>
              <div className="flex items-stretch">
                <button type="button" aria-disabled={1===I} onClick={()=>J(I-1)} aria-label="Previous page" className={j}>
                  <HugeiconsIcon icon={Icon_58661} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                {Array.from({length:F},(e,t)=>t+1).map(e=><button key={e} type="button" onClick={()=>J(e)} aria-current={e===I?"page":undefined} className={p(j,"max-sm:hidden")}>{e}</button>)}
                <button type="button" aria-disabled={I===F} onClick={()=>J(I+1)} aria-label="Next page" className={j}>
                  <HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
  );
}


export default T;
