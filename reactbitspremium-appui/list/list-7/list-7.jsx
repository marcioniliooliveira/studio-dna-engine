/**
 * React Bits Pro — Application UI (list-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_73516 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let h = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  m = "text-neutral-900/80 dark:text-neutral-100/80",
  f = "text-neutral-900/66 dark:text-neutral-100/66",
  k = "text-[13px]/[18px] font-normal",
  v = "text-[14px]/[16px] font-[450]",
  g = "flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1",
  w = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  _ = {active:"text-neutral-900/80 dark:text-neutral-100/80",draft:"text-neutral-900/66 dark:text-neutral-100/66",expiring:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",expired:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"},
  y = [{id:"northwind",name:"Northwind Freight Co.",initials:"NF",location:"Rotterdam, NL",since:"Onboarded Mar 2021",category:"Logistics",contract:"active",contractLabel:"Active",spend:"$1,240,000",delta:"+8.2%",up:true},{id:"kraft",name:"Kraft & Hollow Packaging",initials:"KH",location:"Portland, US",since:"Onboarded Jul 2019",category:"Packaging",contract:"expiring",contractLabel:"Expiring",spend:"$486,500",delta:"-3.1%",up:false},{id:"meridian",name:"Meridian Cloud Systems",initials:"MC",location:"Dublin, IE",since:"Onboarded Jan 2022",category:"Cloud",contract:"active",contractLabel:"Active",spend:"$918,300",delta:"+14.6%",up:true},{id:"brightledger",name:"Brightledger Advisory",initials:"BA",location:"London, UK",since:"Onboarded Sep 2020",category:"Professional",contract:"active",contractLabel:"Active",spend:"$212,750",delta:"+2.4%",up:true},{id:"parcelworks",name:"Parcelworks Logistics",initials:"PL",location:"Memphis, US",since:"Onboarded Nov 2018",category:"Logistics",contract:"expired",contractLabel:"Expired",spend:"$74,900",delta:"-18.9%",up:false},{id:"atlas",name:"Atlas Component Works",initials:"AC",location:"Stuttgart, DE",since:"Onboarded Feb 2020",category:"Manufacturing",contract:"active",contractLabel:"Active",spend:"$1,506,200",delta:"+6.7%",up:true},{id:"verdant",name:"Verdant Materials",initials:"VM",location:"Malm\xf6, SE",since:"Onboarded May 2023",category:"Manufacturing",contract:"draft",contractLabel:"In review",spend:"$0",delta:"0.0%",up:true},{id:"harborlight",name:"Harborlight Freight",initials:"HF",location:"Singapore, SG",since:"Onboarded Aug 2021",category:"Logistics",contract:"active",contractLabel:"Active",spend:"$643,100",delta:"+11.3%",up:true},{id:"corvid",name:"Corvid Cloud Infrastructure",initials:"CC",location:"Ashburn, US",since:"Onboarded Oct 2022",category:"Cloud",contract:"expiring",contractLabel:"Expiring",spend:"$355,000",delta:"-5.4%",up:false},{id:"fold",name:"Fold & Crease Cartons",initials:"FC",location:"Guadalajara, MX",since:"Onboarded Apr 2019",category:"Packaging",contract:"active",contractLabel:"Active",spend:"$298,400",delta:"+4.1%",up:true},{id:"sterling",name:"Sterling Tax Partners",initials:"ST",location:"Toronto, CA",since:"Onboarded Dec 2020",category:"Professional",contract:"active",contractLabel:"Active",spend:"$164,000",delta:"+1.2%",up:true},{id:"ironvale",name:"Ironvale Fabrication",initials:"IF",location:"Sheffield, UK",since:"Onboarded Jun 2017",category:"Manufacturing",contract:"active",contractLabel:"Active",spend:"$822,600",delta:"+3.8%",up:true},{id:"swiftload",name:"Swiftload Distribution",initials:"SD",location:"Lyon, FR",since:"Onboarded Feb 2024",category:"Logistics",contract:"draft",contractLabel:"In review",spend:"$0",delta:"0.0%",up:true},{id:"nimbus",name:"Nimbus Data Platform",initials:"ND",location:"Sydney, AU",since:"Onboarded Mar 2023",category:"Cloud",contract:"active",contractLabel:"Active",spend:"$531,900",delta:"+9.5%",up:true}],
  j = ["All categories","Logistics","Packaging","Cloud","Manufacturing","Professional"].map(e=>({value:e,label:e})),
  N = "grid grid-cols-[minmax(0,1fr)_72px_88px] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_120px_120px] sm:gap-4 md:grid-cols-[minmax(0,1fr)_130px_130px_140px]";

function A({value:e,onChange:t,options:r,ariaLabel:o}){
  let d=useId(),[c,u]=useState(false),[x,p]=useState(0),[b,m]=useState(false),[f,k]=useState(),v=useRef(null),g=useRef(null),w=useRef({buffer:"",at:0}),_=r.findIndex(t=>t.value===e),y=_>=0?r[_]:undefined,j=()=>{
    let e=v.current,t=e?.ownerDocument.defaultView;
    if(e&&t){
      let a=e.getBoundingClientRect(),n=0,i=t.innerHeight;
      for(let r=e.parentElement;r;r=r.parentElement)if(/auto|scroll|hidden|clip/.test(t.getComputedStyle(r).overflowY)){
        let e=r.getBoundingClientRect();
        n=Math.max(n,e.top),i=Math.min(i,e.bottom);
        break
      }
      let l=i-a.bottom,s=a.top-n,o=Math.min(32*r.length+8,264),d=l<o+8&&s>l,c=(d?s:l)-8;
      m(d),k(c<o?Math.max(c,40):undefined)
    }
    p(_>=0?_:0),u(true)
  };
  useEffect(()=>{
    if(!c)return;
    let e=v.current,t=e?.ownerDocument;
    if(!e||!t)return;
    let r=t=>{
      e.contains(t.target)||u(false)
    };
    return t.addEventListener("mousedown",r),t.addEventListener("touchstart",r),()=>{
      t.removeEventListener("mousedown",r),t.removeEventListener("touchstart",r)
    };
  }, [c]),useEffect(()=>{
    if(!c)return;
    let e=g.current,t=e?.querySelector(`[data-index="${x}"]`);
    if(!e||!t)return;
    let r=t.offsetTop,a=r+t.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:a>e.scrollTop+e.clientHeight&&(e.scrollTop=a-e.clientHeight)
  }, [c,x]);
  let N=e=>{
    let a=r[e];
    a&&(t(a.value),u(false),v.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={v} className="relative">
        <button type="button" role="combobox" aria-expanded={c} aria-controls={d} aria-haspopup="listbox" aria-label={o} onClick={()=>c?u(false):j()} onKeyDown={e=>{
          if(!c){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),j());
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),u(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),p(e=>Math.min(e+1,r.length-1));else if("ArrowUp"===e.key)e.preventDefault(),p(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),p(0);else if("End"===e.key)e.preventDefault(),p(r.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),N(x);else if(1===e.key.length&&/\S/.test(e.key)){
            let t=Date.now(),a=w.current;
            a.buffer=t-a.at>700?e.key:a.buffer+e.key,a.at=t;
            let n=r.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
            n>=0&&p(n)
          }
        }} className="inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40">
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {r.map(e=><span key={e.value} aria-hidden="true" className="invisible truncate">{e.label}</span>)}
            <span className="truncate">{y?.label}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {c&&<ul ref={g} id={d} role="listbox" tabIndex={-1} style={{maxHeight:f}} className={h("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",b?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {r.map((t,r)=>(
            <li key={t.value} role="option" aria-selected={t.value===e} data-index={r} data-highlighted={r===x?"":undefined} onMouseEnter={()=>p(r)} onClick={()=>N(r)} className={h("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                    <span className="truncate">{t.label}</span>
                    {t.value===e&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                  </li>
          ))}
        </ul>}
      </div>
  );
}

function z(){
  let[e,t]=useState(""),[r,l]=useState("All categories"),{ref:s,edges:z,onScroll:S}=function(){
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
  }(),C=e.trim().toLowerCase(),R=y.filter(e=>{
    let t=!C||e.name.toLowerCase().includes(C)||e.category.toLowerCase().includes(C),a="All categories"===r||e.category===r;
    return t&&a;
  });
  return (
    <div className={h("bg-white dark:bg-neutral-950",b,"flex h-full min-h-[640px] w-full flex-col overflow-hidden p-6 sm:p-8")}>
        <div className="mx-auto flex h-full w-full max-w-[1100px] flex-col">
          <div className={h("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
            <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className={h("text-[16px]/[20px] font-[450] tracking-[-0.015em]",b)}>Suppliers</h2>
                <p className={h(k,f,"mt-0.5 tabular-nums")}>
                  {R.length}
                  {" of "}
                  {y.length}
                  {" suppliers"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className={h("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","flex-1 sm:w-64 sm:flex-none")}>
                  <span data-affix className={g}>
                    <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <input type="text" value={e} onChange={e=>t(e.target.value)} placeholder="Search name or category" aria-label="Search suppliers" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                  <span data-affix className={g}>
                    {e?<button type="button" onClick={()=>t("")} aria-label="Clear search" className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-6 rounded-[var(--rb-r-sm,6px)]")}>
                      <HugeiconsIcon icon={Icon_89289} size={14} strokeWidth={1.8} aria-hidden="true" />
                    </button>:<kbd aria-hidden="true" className="inline-flex min-h-5 min-w-5 w-fit items-center justify-center gap-1 rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1 font-mono text-[12px]/[16px] tabular-nums text-neutral-900/80 dark:text-neutral-100/80 select-none">⌘K</kbd>}
                  </span>
                </div>
                <div className="shrink-0"><A value={r} onChange={l} options={j} ariaLabel="Filter by category" /></div>
              </div>
            </div>
            <div className={h(N,"text-[12px]/[16px] font-normal tabular-nums",f,"px-4 pb-2")}>
              <span>Supplier</span>
              <span className="hidden md:block">Category</span>
              <span>Contract</span>
              <span className="text-right">Spend</span>
            </div>
            {0===R.length?<div className={h(w,"flex-1 items-center justify-center px-6 py-12 text-center")}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center">
                <HugeiconsIcon icon={Icon_73516} size={20} strokeWidth={1.8} aria-hidden="true" className={m} />
              </div>
              <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No suppliers found</p>
              <p className={h("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>
                Nothing matches
                {" "}
                <span className={b}>
                  “
                  {e||r}
                  ”
                </span>
                . Try a different name or category.
              </p>
              <button type="button" onClick={()=>{
                t(""),l("All categories")
              }} className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-4")}>Clear search</button>
            </div>:<div className={h(w,"relative min-h-0 flex-1")}>
              <div ref={s} onScroll={S} style={{touchAction:"pan-y"}} className={h("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex h-full flex-col overflow-y-auto p-1")}>
                {R.map(t=>{
                  let r=0===parseFloat(t.delta);
                  return (
                    <div key={t.id} className={h("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","rounded-[var(--rb-r-sm,6px)]","hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","h-16 shrink-0 px-2")}>
                                    <div className={h(N,"w-full")}>
                                      <div className="flex min-w-0 items-center gap-3">
                                        <span aria-hidden="true" className={h("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[var(--rb-r-sm,6px)] select-none","size-10")}>
                                          <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{t.initials}</span>
                                        </span>
                                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                          <p className={h(v,b,"truncate")}>
                                            {function(e,t){
                                              let r=t.trim();
                                              if(!r)return e;
                                              let i=e.toLowerCase(),l=r.toLowerCase(),s=[],o=0,d=i.indexOf(l,o),c=0;
                                              for(;-1!==d;)d>o&&s.push(e.slice(o,d)),s.push(<mark key={c++} className={h("bg-neutral-900/9 dark:bg-neutral-100/9",b,"rounded-[var(--rb-r-xs,4px)]")}>{e.slice(d,d+l.length)}</mark>),o=d+l.length,d=i.indexOf(l,o);
                                              return o<e.length&&s.push(e.slice(o)),s.map((e,t)=><Fragment key={t}>{e}</Fragment>);
                                            }(t.name,e)}
                                          </p>
                                          <p data-description className={h(k,f,"truncate")}>
                                            <span>{t.location}</span>
                                            <span className="ms-3">{t.since}</span>
                                          </p>
                                        </div>
                                      </div>
                                      <span className={h(k,m,"hidden truncate md:block")}>{t.category}</span>
                                      <span className={h("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",_[t.contract],"min-w-0")}><span className="truncate">{t.contractLabel}</span></span>
                                      <span className="text-right">
                                        <span className={h(v,b,"block tabular-nums")}>{t.spend}</span>
                                        <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80">
                                          <HugeiconsIcon icon={r?Icon_5042:t.up?Icon_1497:Icon_37502} size={12} strokeWidth={1.8} aria-hidden="true" />
                                          <span className="sr-only">{r?"No change":t.up?"Up":"Down"}</span>
                                          {t.delta}
                                          {" YoY"}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                  );
                })}
              </div>
              <div aria-hidden="true" className={h("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",z.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",z.end?"opacity-100":"opacity-0")} />
            </div>}
          </div>
        </div>
      </div>
  );
}


export default z;
