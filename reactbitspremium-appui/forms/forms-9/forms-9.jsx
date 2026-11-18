/**
 * React Bits Pro — Application UI (forms-9)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, from, observe, to, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_3810 = [["path",{d:"M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.79275 3 5.97733 4.67765 4.38341 7.20327M3.29339 3.00076L3.46556 5.05452C3.58958 6.53384 3.65159 7.27349 4.13359 7.68914C4.61559 8.10479 5.32673 8.03185 6.74899 7.88595L8.79339 7.67625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "border-b border-neutral-900/8 dark:border-neutral-100/8",
  m = "border-t border-neutral-900/8 dark:border-neutral-100/8",
  v = "text-[13px]/[18px] font-normal",
  f = "text-[14px]/[16px] font-[450]",
  k = "text-[12px]/[16px] font-normal tabular-nums",
  g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  _ = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  w = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]";

function y({id:e,value:a,onChange:r,options:o,disabled:d,invalid:c,describedBy:u,placeholder:b="Select…",className:h,triggerClassName:m,leading:v,ariaLabel:f}){
  let g=useId(),[_,w]=useState(false),[y,j]=useState(0),[N,S]=useState(false),[z,E]=useState(),A=useRef(null),C=useRef(null),M=useRef({buffer:"",at:0}),D=o.findIndex(e=>e.value===a),H=D>=0?o[D]:undefined,W=e=>{
    if(d)return;
    let a=A.current,r=a?.ownerDocument.defaultView;
    if(a&&r){
      let e=a.getBoundingClientRect(),t=0,n=r.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        t=Math.max(t,a.top),n=Math.min(n,a.bottom);
        break
      }
      let l=n-e.bottom,i=e.top-t,s=Math.min(32*o.length+8,264),d=l<s+8&&i>l,c=(d?i:l)-8;
      S(d),E(c<s?Math.max(c,40):undefined)
    }
    j(e??(D>=0?D:0)),w(true)
  };
  useEffect(()=>{
    if(!_)return;
    let e=A.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||w(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [_]),useEffect(()=>{
    if(!_)return;
    let e=C.current,a=e?.querySelector(`[data-index="${y}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [_,y]);
  let T=e=>{
    let a=o[e];
    a&&(r(a.value),w(false),A.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={A} className={p("relative",h)}>
        <button id={e} type="button" role="combobox" aria-expanded={_} aria-controls={g} aria-haspopup="listbox" aria-invalid={c||undefined} aria-describedby={u} disabled={d} onClick={()=>_?w(false):W()} onKeyDown={e=>{
          if(!d){
            if(!_){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),W());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),w(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),j(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),j(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),j(0);else if("End"===e.key)e.preventDefault(),j(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),T(y);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=M.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=o.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&j(t)
            }
          }
        }} aria-label={f} className={p("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",m)}>
          <span className="flex min-w-0 items-center gap-2">
            {v}
            <span className={p("truncate",!H&&"text-neutral-900/66 dark:text-neutral-100/66")}>{H?H.label:b}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {_&&<ul ref={C} id={g} role="listbox" tabIndex={-1} style={{maxHeight:z}} className={p("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",N?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,r)=>{
            let n=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={n} data-index={r} data-highlighted={r===y?"":undefined} onMouseEnter={()=>j(r)} onClick={()=>T(r)} className={p("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={p(k,x,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let j = [];

for(let e=0;e<=1440;e+=30){
  let a,r=Math.floor(e/60),t=e%60;
  if(0===e||1440===e)a="12:00 AM";else{
    let e=r<12?"AM":"PM",n=r%12==0?12:r%12;
    a=`${n}:${0===t?"00":t} ${e}`
  }
  j.push({value:e,label:a})
}

let N = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
  S = [1,2,3,4],
  z = [{open:true,intervals:[{from:480,to:720},{from:780,to:1080}]},{open:true,intervals:[{from:480,to:720},{from:780,to:1080}]},{open:true,intervals:[{from:480,to:720},{from:780,to:1080}]},{open:true,intervals:[{from:480,to:720},{from:780,to:1140}]},{open:true,intervals:[{from:480,to:720},{from:780,to:1020}]},{open:true,intervals:[{from:540,to:780}]},{open:false,intervals:[{from:540,to:780}]}],
  E = [{value:"america-new_york",label:"New York (GMT-05:00)"},{value:"america-chicago",label:"Chicago (GMT-06:00)"},{value:"america-denver",label:"Denver (GMT-07:00)"},{value:"america-los_angeles",label:"Los Angeles (GMT-08:00)"},{value:"europe-london",label:"London (GMT+00:00)"}],
  A = "america-chicago",
  C = e=>e.map(e=>({open:e.open,intervals:e.intervals.map(e=>({...e}))}));

function M(e){
  let a=new Set;
  if(!e.open)return {bad:a,message:null};
  let r=null;
  e.intervals.forEach((e,t)=>{
    e.to<=e.from&&(a.add(t),r||(r="End time must be later than the start time."))
  });
  for(let t=0;t<e.intervals.length;t++)for(let n=t+1;n<e.intervals.length;n++){
    let l=e.intervals[t],i=e.intervals[n];
    !(l.to<=l.from)&&!(i.to<=i.from)&&l.from<i.to&&i.from<l.to&&(a.add(t),a.add(n),r="These time ranges overlap. Adjust them so they do not clash.")
  }
  return {bad:a,message:r};
}

function D(e){
  return e.open?e.intervals.reduce((e,a)=>e+(a.to>a.from?a.to-a.from:0),0):0;
}

function H(e){
  let a=e/60;
  return Number.isInteger(a)?String(a):a.toFixed(1);
}

function W({id:e,value:a,invalid:r,describedBy:n,ariaLabel:l,onChange:i}){
  return <y id={e} value={String(a)} ariaLabel={l} invalid={r} describedBy={n} onChange={e=>i(Number(e))} options={j.map(e=>({value:String(e.value),label:e.label}))} className="min-w-0 flex-1" />;
}

function T(){
  let[e,a]=useState(()=>C(z)),[r,i]=useState(A),[j,T]=useState(false),[R,$]=useState(()=>({days:C(z),timezone:A,holidays:false})),[L,I]=useState(false),{ref:B,edges:O,onScroll:F}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=a;
      r({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }();
  useEffect(()=>{
    if(!L)return;
    let e=window.setTimeout(()=>I(false),2500);
    return ()=>window.clearTimeout(e);
  }, [L]);
  let q=useMemo(()=>e.map(M), [e]),G=q.some(e=>null!==e.message),J=useMemo(()=>e.reduce((e,a)=>e+D(a),0), [e]),K=useMemo(()=>r!==R.timezone||j!==R.holidays||JSON.stringify(e)!==JSON.stringify(R.days), [e,r,j,R]),U=(e,r)=>{
    a(a=>a.map((a,t)=>t===e?r(a):a))
  },P=(e,a,r,t)=>{
    U(e,e=>({...e,intervals:e.intervals.map((e,n)=>n===a?{...e,[r]:t}:e)}))
  };
  return (
    <div className={p("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[800px] w-full flex-col justify-center-safe overflow-y-auto p-4 sm:p-10")}>
        <div className="mx-auto w-full max-w-[760px]">
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
            <div className={p(h,"flex items-start justify-between gap-4 px-4 py-4 sm:px-5")}>
              <div className="min-w-0">
                <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Opening hours</h2>
                <p className={p("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>When your veterinary practice takes appointments.</p>
              </div>
              <div className="shrink-0 text-right">
                <p className={p(k,x)}>Weekly total</p>
                <p className={p(f,"tabular-nums")}>
                  {H(J)}
                  {" h"}
                </p>
              </div>
            </div>
            <div className={p(h,"flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5")}>
              <div className="flex min-w-0 items-center gap-2">
                <label htmlFor="hours-timezone" className={p("flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","shrink-0")}>Time zone</label>
                <y id="hours-timezone" value={r} onChange={e=>i(e)} options={E.map(e=>({value:e.value,label:e.label}))} className="min-w-0 flex-1 sm:w-56 sm:flex-none" />
              </div>
              <button type="button" onClick={()=>{
                a(e=>{
                  let a=e[0];
                  return e.map((e,r)=>S.includes(r)?{open:a.open,intervals:a.intervals.map(e=>({...e}))}:e);
                })
              }} className={p(g,w)}>
                <HugeiconsIcon icon={Icon_62714} size={16} strokeWidth={1.8} aria-hidden="true" />
                Copy Monday to weekdays
              </button>
            </div>
            <div className="relative">
              <div ref={B} onScroll={F} className="max-h-[404px] overflow-y-auto">
                <div className={p("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex flex-col")}>
                  {e.map((e,a)=>{
                    let r=q[a],n=D(e),i=`hours-day-${a}-error`;
                    return (
                      <div key={N[a]} className="px-4 py-3 sm:px-5">
                                        <div className="flex items-center gap-3">
                                          <button type="button" role="switch" aria-checked={e.open} aria-label={`${N[a]} open`} onClick={()=>{
                                            U(a,e=>({...e,open:!e.open}))
                                          }} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
                                            <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
                                          </button>
                                          <span className={p(f,"w-24 shrink-0")}>{N[a]}</span>
                                          <span className={p("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","ml-auto")}>{e.open?`${H(n)} h`:"Closed"}</span>
                                        </div>
                                        {e.open&&<div className="mt-3 space-y-2">
                                          {e.intervals.map((n,s)=>{
                                            let o=r.bad.has(s);
                                            return (
                                              <div key={s} className="flex items-center gap-2">
                                                                      <W id={`hours-${a}-${s}-from`} value={from} invalid={o} describedBy={o?i:undefined} ariaLabel={`${N[a]} interval ${s+1} opens at`} onChange={e=>P(a,s,"from",e)} />
                                                                      <span aria-hidden="true" className={p(v,x,"shrink-0")}>to</span>
                                                                      <W id={`hours-${a}-${s}-to`} value={to} invalid={o} describedBy={o?i:undefined} ariaLabel={`${N[a]} interval ${s+1} closes at`} onChange={e=>P(a,s,"to",e)} />
                                                                      <button type="button" onClick={()=>{
                                                                        U(a,e=>({...e,intervals:e.intervals.filter((e,a)=>a!==s)}))
                                                                      }} disabled={1===e.intervals.length} title={1===e.intervals.length?"Keep at least one time range, or close the day.":"Remove this time range"} className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]")}>
                                                                        <HugeiconsIcon icon={Icon_96037} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                                        <span className="sr-only">Remove time range</span>
                                                                      </button>
                                                                    </div>
                                            );
                                          })}
                                          {r.message&&<p id={i} className="flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]">
                                            <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                                            {r.message}
                                          </p>}
                                          <button type="button" onClick={()=>{
                                            U(a,e=>({...e,intervals:[...e.intervals,{from:780,to:1020}]}))
                                          }} className={p(g,w)}>
                                            <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                                            Add hours
                                          </button>
                                        </div>}
                                      </div>
                    );
                  })}
                </div>
              </div>
              <div aria-hidden="true" className={p("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",O.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={p("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",O.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={p(m,"px-4 py-3.5 sm:px-5")}>
              <label htmlFor="hours-holidays" className="flex cursor-pointer items-center gap-2">
                <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                  <input id="hours-holidays" type="checkbox" checked={j} onChange={e=>T(e.target.checked)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                  <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                </span>
                <span className={v}>Accept bookings on public holidays</span>
              </label>
            </div>
            <div className={p(m,"flex items-center justify-between gap-3 py-3.5 ps-4 pe-3.5 sm:ps-5")}>
              <p className={p(v,x)}>
                {G?"Fix the highlighted time ranges to save.":L?"Opening hours saved.":K?"You have unsaved changes.":"All hours are up to date."}
              </p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={()=>{
                  a(C(R.days)),i(R.timezone),T(R.holidays)
                }} disabled={!K} title={K?undefined:"No changes to reset"} className={p(g,_)}>
                  <HugeiconsIcon icon={Icon_3810} size={16} strokeWidth={1.8} aria-hidden="true" />
                  Reset
                </button>
                <button type="button" onClick={()=>{
                  $({days:C(e),timezone:r,holidays:j}),I(true)
                }} disabled={!K||G} title={G?"Resolve the errors above before saving.":K?undefined:"No changes to save"} className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",_)}>Save hours</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default T;
