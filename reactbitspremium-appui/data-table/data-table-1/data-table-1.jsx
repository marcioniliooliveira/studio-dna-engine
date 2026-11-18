/**
 * React Bits Pro — Application UI (data-table-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_24513 = [["path",{d:"M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_62995 = [["path",{d:"M20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.5 2.5V21.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.5 2.5V21.5",stroke:"currentColor",strokeWidth:"1.5",key:"2"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_73516 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  b = "bg-white dark:bg-neutral-950",
  m = "bg-neutral-50 dark:bg-neutral-900",
  k = "text-neutral-900/80 dark:text-neutral-100/80",
  f = "text-[14px]/[16px] font-[450]",
  g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  v = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  w = "relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40",
  _ = "block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]",
  j = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  N = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  y = "text-right tabular-nums",
  S = "sm:first:ps-6 sm:last:pe-6",
  A = [{name:"Sable Ridge Energy",owner:"Mina Kapoor",plan:"Enterprise",status:"Needs review",region:"EMEA",mrr:18420,renewalOn:"2025-08-12"},{name:"North Pier Robotics",owner:"Tomasz Nowak",plan:"Scale",status:"Active",region:"North America",mrr:9860,renewalOn:"2025-09-03"},{name:"Longleaf Clinical Research Network International",owner:"Ari Chen",plan:"Enterprise",status:"Active",region:"APAC",mrr:22190,renewalOn:"2025-09-19"},{name:"Cobalt Field Labs",owner:"Rhea Flores",plan:"Growth",status:"Paused",region:"North America",mrr:4210,renewalOn:"2025-10-01"},{name:"Kite Harbor Logistics",owner:"Devon Okafor",plan:"Scale",status:"Active",region:"LATAM",mrr:7540,renewalOn:"2025-10-08"},{name:"Mossbank Archive Trust",owner:"Lena Ortiz",plan:"Growth",status:"Needs review",region:"EMEA",mrr:3980,renewalOn:"2025-10-22"},{name:"Vantage Grid Systems",owner:"Priya Rao",plan:"Enterprise",status:"Active",region:"North America",mrr:26740,renewalOn:"2025-11-04"},{name:"Harbor & Vale Freight",owner:"Marcus Lund",plan:"Scale",status:"Active",region:"EMEA",mrr:11230,renewalOn:"2025-11-11"},{name:"Tidewater Instruments",owner:"Sofia Martins",plan:"Growth",status:"Active",region:"APAC",mrr:5620,renewalOn:"2025-11-18"},{name:"Redwood Payments",owner:"Jun Park",plan:"Enterprise",status:"Needs review",region:"North America",mrr:19870,renewalOn:"2025-11-29"}],
  C = ["Owner","Plan","Region","Renewal"],
  D = {Active:"text-neutral-900/80 dark:text-neutral-100/80","Needs review":"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Paused:"text-neutral-900/66 dark:text-neutral-100/66"};

function z({status:e,small:t}){
  return <span className={p(t?"inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums":"inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",D[e],"whitespace-nowrap")}>{e}</span>;
}

let R = e=>e.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}),
  P = e=>new Date(`${e}T00:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric"});

function L({label:e,sortKey:t,sort:r,onSort:n,align:d="left",className:c}){
  let u=r.key===t,x=u?"asc"===r.dir?Icon_24513:Icon_20148:Icon_31517;
  return (
    <th scope="col" aria-sort={u?"asc"===r.dir?"ascending":"descending":"none"} className={p(j,S,"right"===d&&"text-right",c)}>
        <button type="button" data-sorted={u?"true":undefined} onClick={()=>n(t)} className={p("-mx-1.5 inline-flex h-7 min-w-0 cursor-pointer items-center gap-1 rounded-[var(--rb-r-sm,6px)] px-1.5 hover:bg-neutral-900/5 hover:text-neutral-900 data-sorted:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:data-sorted:text-neutral-100","max-w-full","right"===d&&"flex-row-reverse")}>
          <span className="truncate">{e}</span>
          <HugeiconsIcon icon={x} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
        </button>
      </th>
  );
}

function E(){
  let{ref:e,edges:t,onScroll:r}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollLeft:a,scrollWidth:n,clientWidth:s}=t;
      r({start:a>1,end:Math.ceil(a+s)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),{ref:l,edges:o,onScroll:D}=function(){
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
  }(),[E,O]=useState(""),[M,T]=useState(null),[W,H]=useState({Owner:true,Plan:true,Region:true,Renewal:true}),[B,F]=useState(false),[I,Y]=useState({key:"mrr",dir:"desc"}),U=useRef([]),G=useRef(null),V=useRef(null),[K,$]=useState(false);
  useEffect(()=>{
    if(!B)return;
    let e=requestAnimationFrame(()=>$(true)),t=V.current?.ownerDocument,r=e=>{
      let t=e.target;
      G.current?.contains(t)||V.current?.contains(t)||($(false),F(false))
    },a=e=>{
      "Escape"===e.key&&(e.preventDefault(),$(false),F(false),V.current?.focus({preventScroll:true}))
    };
    return t?.addEventListener("pointerdown",r),t?.addEventListener("keydown",a),()=>{
      cancelAnimationFrame(e),t?.removeEventListener("pointerdown",r),t?.removeEventListener("keydown",a)
    };
  }, [B]);
  let q=e=>{
    $(false),F(false),e&&V.current?.focus({preventScroll:true})
  },J=e=>Y(t=>t.key===e?{key:e,dir:"asc"===t.dir?"desc":"asc"}:{key:e,dir:"name"===e?"asc":"desc"}),Q=useMemo(()=>{
    let e=E.trim().toLowerCase(),t=A.filter(t=>(!M||t.plan===M)&&(!e||t.name.toLowerCase().includes(e)||t.owner.toLowerCase().includes(e))),r="asc"===I.dir?1:-1;
    return [...t].sort((e,t)=>"mrr"===I.key?(e.mrr-t.mrr)*r:String(e[I.key]).localeCompare(String(t[I.key]))*r);
  }, [E,M,I]),Z=e=>U.current[(e+C.length)%C.length]?.focus({preventScroll:true});
  return (
    <div className={p(b,"text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={p(m,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <h2 className={p("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Accounts</h2>
            <button type="button" className={p(g,v,"max-sm:hidden")}>
              <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
              Export
            </button>
          </header>
          <div className={p(m,"flex shrink-0 flex-wrap items-center gap-2 px-4 py-2 sm:h-12 sm:flex-nowrap sm:px-6 sm:py-0")}>
            <label className={p("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-7","flex-1 sm:max-w-xs")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <input value={E} onChange={e=>O(e.target.value)} placeholder="Search accounts" className="h-full w-full min-w-0 flex-1 bg-transparent px-2 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
              <span className="sr-only">Search accounts</span>
            </label>
            <div className="relative -mx-4 order-last w-[calc(100%+2rem)] sm:order-none sm:mx-0 sm:w-auto">
              <div ref={e} onScroll={r} className="flex items-center gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible sm:px-0">
                <button type="button" aria-pressed={null===M} onClick={()=>T(null)} className={w}>All plans</button>
                {["Enterprise","Scale","Growth"].map(e=>{
                  let t=M===e;
                  return <button key={e} type="button" aria-pressed={t} onClick={()=>T(t?null:e)} className={w}>{e}</button>;
                })}
              </div>
              <div aria-hidden="true" className={p("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 left-0 w-8 sm:hidden",t.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={p("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 right-0 w-8 sm:hidden",t.end?"opacity-100":"opacity-0")} />
            </div>
            <div className="relative ml-auto" onKeyDown={e=>{
              if(!B)return;
              let t=e.currentTarget.ownerDocument.activeElement,r=U.current.findIndex(e=>e===t);
              "Tab"===e.key&&q(false),"ArrowDown"===e.key&&(e.preventDefault(),Z(r+1)),"ArrowUp"===e.key&&(e.preventDefault(),Z(r<0?C.length-1:r-1)),"Home"===e.key&&(e.preventDefault(),Z(0)),"End"===e.key&&(e.preventDefault(),Z(C.length-1))
            }}>
              <button ref={V} type="button" aria-haspopup="menu" aria-expanded={B} onClick={()=>{
                B?q(false):F(true)
              }} className={p(g,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>
                <HugeiconsIcon icon={Icon_62995} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                <span className="max-sm:sr-only">Columns</span>
                <HugeiconsIcon icon={Icon_20148} size={16} strokeWidth={1.8} aria-hidden="true" className={p("shrink-0",B&&"rotate-180")} />
              </button>
              {B&&<div ref={G} role="menu" aria-label="Toggle columns" className={p("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute right-0 top-9 z-30 w-48",K?"opacity-100":"opacity-0")}>
                {C.map((e,t)=>(
                  <button key={e} ref={e=>{
                                U.current[t]=e
                              }} type="button" role="menuitemcheckbox" aria-checked={W[e]} onClick={()=>H(t=>({...t,[e]:!t[e]}))} className={p("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","ps-8")}>
                                <span aria-hidden="true" className="pointer-events-none absolute start-2 flex size-4 items-center justify-center">{W[e]&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} />}</span>
                                {e}
                              </button>
                ))}
              </div>}
            </div>
          </div>
          <div className="relative min-h-0 flex-1">
            <div ref={l} onScroll={D} className="h-full overflow-auto">
              <table className={p("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","hidden min-w-[820px] md:table")}>
                <caption className="sr-only">Customer accounts</caption>
                <thead className={p(b,"sticky top-0 z-20")}>
                  <tr>
                    <L label="Account" sortKey="name" sort={I} onSort={J} />
                    {W.Owner&&<th scope="col" className={p(j,S)}>Owner</th>}
                    {W.Plan&&<th scope="col" className={p(j,S,"w-[110px]")}>Plan</th>}
                    <th scope="col" className={p(j,S,"w-[140px]")}>Status</th>
                    {W.Region&&<th scope="col" className={p(j,S,"w-[150px]")}>Region</th>}
                    <L label="MRR" sortKey="mrr" sort={I} onSort={J} align="right" className="w-[110px]" />
                    {W.Renewal&&<L label="Renewal" sortKey="renewalOn" sort={I} onSort={J} align="right" className="w-[120px]" />}
                  </tr>
                </thead>
                <tbody>
                  {Q.map(e=>(
                    <tr key={e.name} className="group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9">
                                    <td className={p(N,S,"max-w-[280px]")}><span className={p(f,_)}>{e.name}</span></td>
                                    {W.Owner&&<td className={p(N,S)}><span className={k}>{e.owner}</span></td>}
                                    {W.Plan&&<td className={p(N,S)}><span className={k}>{e.plan}</span></td>}
                                    <td className={p(N,S)}><z status={e.status} /></td>
                                    {W.Region&&<td className={p(N,S)}><span className={k}>{e.region}</span></td>}
                                    <td className={p(N,y,S)}>{R(e.mrr)}</td>
                                    {W.Renewal&&<td className={p(N,y,S)}><span className={k}>{P(e.renewalOn)}</span></td>}
                                  </tr>
                  ))}
                </tbody>
              </table>
              <div className="space-y-2 p-4 md:hidden">
                {Q.length>0&&<div className={p("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","divide-y divide-neutral-900/8 dark:divide-neutral-100/8")}>
                  {Q.map(e=>(
                    <div key={e.name} className={p("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","px-4")}>
                                    <div className="flex w-full items-center justify-between gap-3">
                                      <p className={p(f,_,"flex-1")}>{e.name}</p>
                                      <span className={p("text-[14px]/[20px] font-normal",y,"shrink-0")}>{R(e.mrr)}</span>
                                    </div>
                                    <div className="flex w-full items-center justify-between gap-3">
                                      <z status={e.status} small />
                                      <span className={p("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","flex gap-2")}>
                                        <span>{e.plan}</span>
                                        <span>
                                          {"Renews "}
                                          {P(e.renewalOn)}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                  ))}
                </div>}
              </div>
              {0===Q.length&&<div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
                <span aria-hidden="true" className={p(k,"mb-3 flex h-10 w-10 items-center justify-center")}><HugeiconsIcon icon={Icon_73516} size={20} strokeWidth={1.8} /></span>
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No matching accounts</p>
                <p className={p("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Try a different search, or clear the plan filter.</p>
                <button type="button" onClick={()=>{
                  O(""),T(null)
                }} className={p(g,v,"mt-4")}>Clear filters</button>
              </div>}
            </div>
            <div aria-hidden="true" className={p("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",o.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={p(m,"text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","flex h-12 shrink-0 items-center px-4 sm:px-6")}>
            {"Showing "}
            {Q.length}
            {" of "}
            {A.length}
            {" accounts"}
          </footer>
        </div>
      </div>
  );
}


export default E;
