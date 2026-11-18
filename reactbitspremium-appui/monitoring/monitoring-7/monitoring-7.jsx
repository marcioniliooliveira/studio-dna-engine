/**
 * React Bits Pro — Application UI (monitoring-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_36048 = [["path",{d:"M19 4H5C4.06812 4 3.60218 4 3.23463 4.15224C2.74458 4.35523 2.35523 4.74458 2.15224 5.23463C2 5.60218 2 6.06812 2 7C2 7.93188 2 8.39782 2.15224 8.76537C2.35523 9.25542 2.74458 9.64477 3.23463 9.84776C3.60218 10 4.06812 10 5 10H19C19.9319 10 20.3978 10 20.7654 9.84776C21.2554 9.64477 21.6448 9.25542 21.8478 8.76537C22 8.39782 22 7.93188 22 7C22 6.06812 22 5.60218 21.8478 5.23463C21.6448 4.74458 21.2554 4.35523 20.7654 4.15224C20.3978 4 19.9319 4 19 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 14H5C4.06812 14 3.60218 14 3.23463 14.1522C2.74458 14.3552 2.35523 14.7446 2.15224 15.2346C2 15.6022 2 16.0681 2 17C2 17.9319 2 18.3978 2.15224 18.7654C2.35523 19.2554 2.74458 19.6448 3.23463 19.8478C3.60218 20 4.06812 20 5 20H19C19.9319 20 20.3978 20 20.7654 19.8478C21.2554 19.6448 21.6448 19.2554 21.8478 18.7654C22 18.3978 22 17.9319 22 17C22 16.0681 22 15.6022 21.8478 15.2346C21.6448 14.7446 21.2554 14.3552 20.7654 14.1522C20.3978 14 19.9319 14 19 14Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.125 7H6M6.25 7C6.25 7.13807 6.13807 7.25 6 7.25C5.86193 7.25 5.75 7.13807 5.75 7C5.75 6.86193 5.86193 6.75 6 6.75C6.13807 6.75 6.25 6.86193 6.25 7Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10.125 7H10M10.25 7C10.25 7.13807 10.1381 7.25 10 7.25C9.86193 7.25 9.75 7.13807 9.75 7C9.75 6.86193 9.86193 6.75 10 6.75C10.1381 6.75 10.25 6.86193 10.25 7Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M6.125 17H6M6.25 17C6.25 17.1381 6.13807 17.25 6 17.25C5.86193 17.25 5.75 17.1381 5.75 17C5.75 16.8619 5.86193 16.75 6 16.75C6.13807 16.75 6.25 16.8619 6.25 17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10.125 17H10M10.25 17C10.25 17.1381 10.1381 17.25 10 17.25C9.86193 17.25 9.75 17.1381 9.75 17C9.75 16.8619 9.86193 16.75 10 16.75C10.1381 16.75 10.25 16.8619 10.25 17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900/80 dark:text-neutral-100/80",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "text-[13px]/[18px] font-normal",
  m = "text-[12px]/[16px] font-normal tabular-nums",
  f = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  g = "-mx-1.5 inline-flex h-7 min-w-0 cursor-pointer items-center gap-1 rounded-[var(--rb-r-sm,6px)] px-1.5 hover:bg-neutral-900/5 hover:text-neutral-900 data-sorted:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:data-sorted:text-neutral-100",
  k = x(b,p),
  v = [{id:"h1",name:"api-eu-01",role:"API",region:"eu-west-1",cpu:44,mem:62,disk:38,uptime:"34d",state:"healthy",note:"Serving 1.2k req/s with headroom on every dimension."},{id:"h2",name:"api-eu-02",role:"API",region:"eu-west-1",cpu:91,mem:78,disk:41,uptime:"34d",state:"critical",note:"CPU has been pinned above 88% for 22 minutes. Shed traffic or add a node."},{id:"h3",name:"worker-eu-01",role:"Worker",region:"eu-west-1",cpu:58,mem:71,disk:55,uptime:"12d",state:"healthy",note:"Draining the invoice backlog at 340 jobs per minute."},{id:"h4",name:"worker-us-01",role:"Worker",region:"us-east-1",cpu:36,mem:49,disk:87,uptime:"61d",state:"warning",note:"Disk at 87%. Rotate the job archive older than 30 days."},{id:"h5",name:"db-primary",role:"Database",region:"eu-west-1",cpu:52,mem:84,disk:66,uptime:"128d",state:"warning",note:"Buffer cache is under pressure during the nightly vacuum window."},{id:"h6",name:"db-replica-01",role:"Database",region:"us-east-1",cpu:21,mem:47,disk:64,uptime:"128d",state:"healthy",note:"Replication lag steady at 0.4s."},{id:"h7",name:"cache-eu-01",role:"Cache",region:"eu-west-1",cpu:18,mem:33,disk:12,uptime:"77d",state:"healthy",note:"Hit ratio 97.4% across the catalog keyspace."},{id:"h8",name:"edge-ap-01",role:"Edge",region:"ap-south-1",cpu:29,mem:41,disk:22,uptime:"9d",state:"healthy",note:"Newest node in the fleet, added during the Mumbai rollout."}],
  w = ["All regions","eu-west-1","us-east-1","ap-south-1"],
  _ = {healthy:"text-neutral-900/80 dark:text-neutral-100/80",warning:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",critical:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"},
  j = {healthy:"Healthy",warning:"Warning",critical:"Critical"};

function y({id:e,value:t,onChange:r,options:o}){
  let d=useId(),[c,u]=useState(false),[h,p]=useState(false),[b,m]=useState(0),[f,g]=useState(false),[k,v]=useState(),w=useRef(null),_=useRef(null),j=useRef({buffer:"",at:0}),y=o.indexOf(t),N=(e,t)=>{
    let r=w.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,n=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),n=Math.min(n,r.bottom);
        break
      }
      let l=n-e.bottom,s=e.top-t,i=Math.min(32*o.length+8,264),d=l<i+8&&s>l,c=(d?s:l)-8;
      g(d),v(c<i?Math.max(c,40):undefined)
    }
    p(e),m(t??(y>=0?y:0)),u(true)
  };
  useEffect(()=>{
    if(!c)return;
    let e=w.current,t=e?.ownerDocument;
    if(!t)return;
    let r=t=>{
      e.contains(t.target)||u(false)
    };
    return t.addEventListener("mousedown",r),t.addEventListener("touchstart",r),()=>{
      t.removeEventListener("mousedown",r),t.removeEventListener("touchstart",r)
    };
  }, [c]),useEffect(()=>{
    if(!c)return;
    let e=_.current,t=e?.querySelector(`[data-index="${b}"]`);
    if(!e||!t)return;
    let r=t.offsetTop,a=r+t.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:a>e.scrollTop+e.clientHeight&&(e.scrollTop=a-e.clientHeight)
  }, [c,b]);
  let S=e=>{
    let t=o[e];
    undefined!==t&&(r(t),u(false),w.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={w} className="relative">
        <button id={e} type="button" role="combobox" aria-expanded={c} aria-controls={d} aria-haspopup="listbox" onClick={()=>c?u(false):N(false)} onKeyDown={e=>{
          if(!c){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),N(true));
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),u(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),m(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),m(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),m(0);else if("End"===e.key)e.preventDefault(),m(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),S(b);else if(1===e.key.length&&/\S/.test(e.key)){
            let t=Date.now(),r=j.current;
            r.buffer=t-r.at>700?e.key:r.buffer+e.key,r.at=t;
            let a=o.findIndex(e=>e.toLowerCase().startsWith(r.buffer.toLowerCase()));
            a>=0&&m(a)
          }
        }} className="inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40">
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {o.map(e=><span key={e} aria-hidden="true" className="invisible truncate">{e}</span>)}
            <span className="truncate">{t}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {c&&<ul ref={_} id={d} role="listbox" tabIndex={-1} style={{maxHeight:k}} className={x("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",!h&&"transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute z-30 max-h-[264px] w-full min-w-[100%]",f?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,r)=>(
            <li key={e} role="option" aria-selected={e===t} data-index={r} data-highlighted={r===b?"":undefined} onMouseEnter={()=>m(r)} onClick={()=>S(r)} className={x("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                    <span className="truncate">{e}</span>
                    {e===t&&<span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
                      <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                    </span>}
                  </li>
          ))}
        </ul>}
      </div>
  );
}

function N({label:e,value:t}){
  let r=t>=85,n=t>=70;
  return (
    <div className="min-w-[64px]">
        <div className="flex items-baseline justify-between gap-2">
          <span className={x(m,p)}>{e}</span>
          <span className={x(m,r?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":h)}>
            {t}
            %
          </span>
        </div>
        <div role="progressbar" aria-valuenow={t} aria-valuemin={0} aria-valuemax={100} aria-label={e} className={x("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-1")}>
          <div style={{width:`${t}%`}} className={r?x("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","h-full rounded-[inherit]"):n?x("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","h-full rounded-[inherit]"):"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100"} />
        </div>
      </div>
  );
}

function S(){
  let[e,t]=useState(""),[r,i]=useState(w[0]),[S,z]=useState({key:"cpu",asc:false}),[A,R]=useState("h2"),{ref:C,edges:E,onScroll:M}=function(){
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
  }(),D=useMemo(()=>{
    let t=e.trim().toLowerCase(),a=v.filter(e=>(r===w[0]||e.region===r)&&(!t||e.name.toLowerCase().includes(t)||e.role.toLowerCase().includes(t))),n=S.asc?1:-1;
    return [...a].sort((e,t)=>"name"===S.key?e.name.localeCompare(t.name)*n:(e[S.key]-t[S.key])*n);
  }, [e,r,S]);
  useEffect(()=>M(), [D,A,M]);
  let W=v.filter(e=>"healthy"!==e.state).length,P=e=>z(t=>t.key===e?{key:e,asc:!t.asc}:{key:e,asc:false}),L=e=>S.key===e?S.asc?Icon_40972:Icon_54345:Icon_31517;
  return (
    <div className={x("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[720px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col gap-1")}>
          <div className="px-4 py-3.5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Fleet</h2>
                <p className={x(k,"mt-0.5 flex flex-wrap gap-x-3")}>
                  <span>
                    {v.length}
                    {" nodes"}
                  </span>
                  <span>
                    {W}
                    {" need attention"}
                  </span>
                  <span>sampled 30s ago</span>
                </p>
              </div>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <label htmlFor="monitoring-7-region" className="sr-only">Region</label>
                <y id="monitoring-7-region" value={r} onChange={i} options={w} />
                <div className="relative w-full sm:w-[200px]">
                  <label htmlFor="monitoring-7-search" className="sr-only">Search hosts</label>
                  <div className={x("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                    <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                      <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <input id="monitoring-7-search" value={e} onChange={e=>t(e.target.value)} placeholder="Search host or role" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={x("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
            <div ref={C} onScroll={M} className="h-full overflow-y-auto">
              {0===D.length?<div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                <HugeiconsIcon icon={Icon_36048} size={24} strokeWidth={1.8} aria-hidden="true" className={p} />
                <p className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-3")}>No matching nodes</p>
                <p className={x("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Adjust the region filter or clear the search.</p>
              </div>:<table className="w-full border-separate border-spacing-0 text-left text-[14px]/[20px]">
                <thead>
                  <tr>
                    <th scope="col" aria-sort={"name"===S.key?S.asc?"ascending":"descending":"none"} className={f}>
                      <button type="button" onClick={()=>P("name")} data-sorted={"name"===S.key?"":undefined} className={g}>
                        Node
                        <HugeiconsIcon icon={L("name")} size={12} strokeWidth={1.8} aria-hidden="true" />
                      </button>
                    </th>
                    <th scope="col" className={x(f,"hidden w-[120px] sm:table-cell md:w-[104px]")}>Status</th>
                    {[{key:"cpu",label:"CPU",cls:"hidden w-[132px] md:table-cell"},{key:"mem",label:"Memory",cls:"hidden w-[148px] md:table-cell lg:w-[132px]"},{key:"disk",label:"Disk",cls:"hidden w-[148px] lg:table-cell xl:w-[132px]"}].map(e=>(
                      <th key={e.key} scope="col" aria-sort={S.key===e.key?S.asc?"ascending":"descending":"none"} className={x(f,e.cls)}>
                                        <button type="button" onClick={()=>P(e.key)} data-sorted={S.key===e.key?"":undefined} className={g}>
                                          {e.label}
                                          <HugeiconsIcon icon={L(e.key)} size={12} strokeWidth={1.8} aria-hidden="true" />
                                        </button>
                                      </th>
                    ))}
                    <th scope="col" className={x(f,"hidden w-[100px] xl:table-cell")}><span className="block text-right">Uptime</span></th>
                  </tr>
                </thead>
                <tbody>
                  {D.map(e=>(
                    <tr key={e.id} aria-selected={A===e.id} className="group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9">
                                    <td colSpan={6} className="h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8">
                                      <button type="button" aria-expanded={A===e.id} onClick={()=>R(A===e.id?null:e.id)} className={x("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","block w-full cursor-pointer text-left")}>
                                        <span className="flex items-center gap-3 py-2.5">
                                          <span className="min-w-0 flex-1">
                                            <span className={x("text-[14px]/[16px] font-[450]","block truncate")}>{e.name}</span>
                                            <span className={x(k,"mt-0.5 flex min-w-0 gap-x-3")}>
                                              <span className="truncate">{e.role}</span>
                                              <span className="truncate">{e.region}</span>
                                            </span>
                                          </span>
                                          <span className={x("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",_[e.state],"w-[92px] shrink-0 max-sm:hidden")}>{j[e.state]}</span>
                                          <span className="hidden w-[120px] shrink-0 md:block"><N label="CPU" value={e.cpu} /></span>
                                          <span className="hidden w-[120px] shrink-0 md:block"><N label="Memory" value={e.mem} /></span>
                                          <span className="hidden w-[120px] shrink-0 lg:block"><N label="Disk" value={e.disk} /></span>
                                          <span className={x(m,p,"hidden w-[72px] shrink-0 text-right xl:block")}>{e.uptime}</span>
                                        </span>
                                      </button>
                                      {A===e.id&&<p className={x(b,h,"pb-3 whitespace-normal")}>{e.note}</p>}
                                    </td>
                                  </tr>
                  ))}
                </tbody>
              </table>}
            </div>
            <div aria-hidden="true" className={x("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",E.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",E.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={x("flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2","flex-wrap justify-between")}>
            <p className="text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">
              {"Showing "}
              {D.length}
              {" of "}
              {v.length}
              {" nodes"}
            </p>
            <p>Metrics refresh every 30 seconds</p>
          </div>
        </div>
      </div>
  );
}


export default S;
