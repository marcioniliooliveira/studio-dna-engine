/**
 * React Bits Pro — Application UI (data-table-1 (Sorbet))
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

let h = (...e)=>e.filter(Boolean).join(" ");

let p = "bg-white dark:bg-neutral-950";

let b = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let m = "text-neutral-900/78 dark:text-neutral-100/78";

let k = "text-[15px]/[20px] font-bold";

let f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let v = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let g = "relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40";

let w = "block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]";

let j = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let y = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let N = "text-right tabular-nums";

let C = "sm:first:ps-6 sm:last:pe-6";

let S = [{name:"Sable Ridge Energy",owner:"Mina Kapoor",plan:"Enterprise",status:"Needs review",region:"EMEA",mrr:18420,renewalOn:"2025-08-12"},{name:"North Pier Robotics",owner:"Tomasz Nowak",plan:"Scale",status:"Active",region:"North America",mrr:9860,renewalOn:"2025-09-03"},{name:"Longleaf Clinical Research Network International",owner:"Ari Chen",plan:"Enterprise",status:"Active",region:"APAC",mrr:22190,renewalOn:"2025-09-19"},{name:"Cobalt Field Labs",owner:"Rhea Flores",plan:"Growth",status:"Paused",region:"North America",mrr:4210,renewalOn:"2025-10-01"},{name:"Kite Harbor Logistics",owner:"Devon Okafor",plan:"Scale",status:"Active",region:"LATAM",mrr:7540,renewalOn:"2025-10-08"},{name:"Mossbank Archive Trust",owner:"Lena Ortiz",plan:"Growth",status:"Needs review",region:"EMEA",mrr:3980,renewalOn:"2025-10-22"},{name:"Vantage Grid Systems",owner:"Priya Rao",plan:"Enterprise",status:"Active",region:"North America",mrr:26740,renewalOn:"2025-11-04"},{name:"Harbor & Vale Freight",owner:"Marcus Lund",plan:"Scale",status:"Active",region:"EMEA",mrr:11230,renewalOn:"2025-11-11"},{name:"Tidewater Instruments",owner:"Sofia Martins",plan:"Growth",status:"Active",region:"APAC",mrr:5620,renewalOn:"2025-11-18"},{name:"Redwood Payments",owner:"Jun Park",plan:"Enterprise",status:"Needs review",region:"North America",mrr:19870,renewalOn:"2025-11-29"}];

let A = ["Owner","Plan","Region","Renewal"];

let L = {Active:"text-neutral-900/78 dark:text-neutral-100/78","Needs review":"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Paused:"text-neutral-900/62 dark:text-neutral-100/62"};

function M({status:e,small:r}){
  return <span className={h(r?"inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums":"inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",L[e],"whitespace-nowrap")}>{e}</span>;
}

let D = e=>e.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});

let z = e=>new Date(`${e}T00:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric"});

function R({label:e,sortKey:r,sort:a,onSort:n,align:c="left",className:d}){
  let u=a.key===r,x=u?"asc"===a.dir?Icon_24513:Icon_20148:Icon_31517;
  return (
    <th scope="col" aria-sort={u?"asc"===a.dir?"ascending":"descending":"none"} className={h(j,C,"right"===c&&"text-right",d)}>
        <button type="button" data-sorted={u?"true":undefined} onClick={()=>n(r)} className={h("-mx-1.5 inline-flex h-8 min-w-0 cursor-pointer items-center gap-1 rounded-[calc(var(--rb-r-full,999px))] px-1.5 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 data-sorted:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:data-sorted:text-neutral-100","max-w-full","right"===c&&"flex-row-reverse")}>
          <span className="truncate">{e}</span>
          <HugeiconsIcon icon={x} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0" />
        </button>
      </th>
  );
}

let H = (...e)=>e.filter(Boolean).join(" ");

let B = "bg-white dark:bg-neutral-950";

let F = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let I = "text-neutral-900 dark:text-neutral-100";

let Y = "text-neutral-900/78 dark:text-neutral-100/78";

let V = "text-neutral-900/62 dark:text-neutral-100/62";

let U = "text-[14px]/[20px] font-medium";

let G = "text-[15px]/[20px] font-bold";

let K = "text-[13px]/[16px] font-semibold tabular-nums";

let $ = "relative inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-[calc(var(--rb-r-full,999px))] border border-transparent px-3 text-[15px]/[20px] font-bold tabular-nums text-neutral-900 dark:text-neutral-100 transition-[background-color,box-shadow,color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.94] motion-reduce:active:scale-100 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-[current=page]:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] aria-[current=page]:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-disabled:pointer-events-none aria-disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/8 dark:aria-[current=page]:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:aria-disabled:text-neutral-100/40";

let q = "text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";

let Z = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let J = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let Q = "text-right tabular-nums";


export default function data_table_1__Sorbet__Component(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollLeft:t,scrollWidth:n,clientWidth:l}=r;
      a({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),{ref:o,edges:i,onScroll:L}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),[P,W]=useState(""),[E,O]=useState(null),[T,H]=useState({Owner:true,Plan:true,Region:true,Renewal:true}),[B,F]=useState(false),[I,Y]=useState({key:"mrr",dir:"desc"}),V=useRef([]),U=useRef(null),G=useRef(null),[K,$]=useState(false);
  useEffect(()=>{
    if(!B)return;
    let e=requestAnimationFrame(()=>$(true)),r=G.current?.ownerDocument,a=e=>{
      let r=e.target;
      U.current?.contains(r)||G.current?.contains(r)||($(false),F(false))
    },t=e=>{
      "Escape"===e.key&&(e.preventDefault(),$(false),F(false),G.current?.focus({preventScroll:true}))
    };
    return r?.addEventListener("pointerdown",a),r?.addEventListener("keydown",t),()=>{
      cancelAnimationFrame(e),r?.removeEventListener("pointerdown",a),r?.removeEventListener("keydown",t)
    };
  }, [B]);
  let q=e=>{
    $(false),F(false),e&&G.current?.focus({preventScroll:true})
  },Z=e=>Y(r=>r.key===e?{key:e,dir:"asc"===r.dir?"desc":"asc"}:{key:e,dir:"name"===e?"asc":"desc"}),J=useMemo(()=>{
    let e=P.trim().toLowerCase(),r=S.filter(r=>(!E||r.plan===E)&&(!e||r.name.toLowerCase().includes(e)||r.owner.toLowerCase().includes(e))),a="asc"===I.dir?1:-1;
    return [...r].sort((e,r)=>"mrr"===I.key?(e.mrr-r.mrr)*a:String(e[I.key]).localeCompare(String(r[I.key]))*a);
  }, [P,E,I]),Q=e=>V.current[(e+A.length)%A.length]?.focus({preventScroll:true});
  return (
    <div className={h(p,"text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={h(b,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <h2 className={h("text-[17px]/[22px] font-extrabold","min-w-0 flex-1 truncate")}>Accounts</h2>
            <button type="button" className={h(f,v,"max-sm:hidden")}>
              <HugeiconsIcon icon={Icon_92752} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
              Export
            </button>
          </header>
          <div className={h(b,"flex shrink-0 flex-wrap items-center gap-2 px-4 py-2 sm:h-12 sm:flex-nowrap sm:px-6 sm:py-0")}>
            <label className={h("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-8","flex-1 sm:max-w-xs")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <input value={P} onChange={e=>W(e.target.value)} placeholder="Search accounts" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
              <span className="sr-only">Search accounts</span>
            </label>
            <div className="relative -mx-4 order-last w-[calc(100%+2rem)] sm:order-none sm:mx-0 sm:w-auto">
              <div ref={e} onScroll={a} className="flex items-center gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible sm:px-0">
                <button type="button" aria-pressed={null===E} onClick={()=>O(null)} className={g}>All plans</button>
                {["Enterprise","Scale","Growth"].map(e=>{
                  let r=E===e;
                  return <button key={e} type="button" aria-pressed={r} onClick={()=>O(r?null:e)} className={g}>{e}</button>;
                })}
              </div>
              <div aria-hidden="true" className={h("bg-linear-to-r from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 left-0 w-8 sm:hidden",r.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={h("bg-linear-to-l from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 right-0 w-8 sm:hidden",r.end?"opacity-100":"opacity-0")} />
            </div>
            <div className="relative ml-auto" onKeyDown={e=>{
              if(!B)return;
              let r=e.currentTarget.ownerDocument.activeElement,a=V.current.findIndex(e=>e===r);
              "Tab"===e.key&&q(false),"ArrowDown"===e.key&&(e.preventDefault(),Q(a+1)),"ArrowUp"===e.key&&(e.preventDefault(),Q(a<0?A.length-1:a-1)),"Home"===e.key&&(e.preventDefault(),Q(0)),"End"===e.key&&(e.preventDefault(),Q(A.length-1))
            }}>
              <button ref={G} type="button" aria-haspopup="menu" aria-expanded={B} onClick={()=>{
                B?q(false):F(true)
              }} className={h(f,"h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold")}>
                <HugeiconsIcon icon={Icon_62995} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                <span className="max-sm:sr-only">Columns</span>
                <HugeiconsIcon icon={Icon_20148} size={18} strokeWidth={2} aria-hidden="true" className={h("shrink-0",B&&"rotate-180")} />
              </button>
              {B&&<div ref={U} role="menu" aria-label="Toggle columns" className={h("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","absolute right-0 top-9 z-30 w-48",K?"opacity-100":"opacity-0")}>
                {A.map((e,r)=>(
                  <button key={e} ref={e=>{
                                V.current[r]=e
                              }} type="button" role="menuitemcheckbox" aria-checked={T[e]} onClick={()=>H(r=>({...r,[e]:!r[e]}))} className={h("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","ps-9")}>
                                <span aria-hidden="true" className="pointer-events-none absolute start-3 flex size-[18px] items-center justify-center">{T[e]&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} />}</span>
                                {e}
                              </button>
                ))}
              </div>}
            </div>
          </div>
          <div className="relative min-h-0 flex-1">
            <div ref={o} onScroll={L} className="h-full overflow-auto">
              <table className={h("w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium","hidden min-w-[820px] md:table")}>
                <caption className="sr-only">Customer accounts</caption>
                <thead className={h(p,"sticky top-0 z-20")}>
                  <tr>
                    <R label="Account" sortKey="name" sort={I} onSort={Z} />
                    {T.Owner&&<th scope="col" className={h(j,C)}>Owner</th>}
                    {T.Plan&&<th scope="col" className={h(j,C,"w-[110px]")}>Plan</th>}
                    <th scope="col" className={h(j,C,"w-[140px]")}>Status</th>
                    {T.Region&&<th scope="col" className={h(j,C,"w-[150px]")}>Region</th>}
                    <R label="MRR" sortKey="mrr" sort={I} onSort={Z} align="right" className="w-[110px]" />
                    {T.Renewal&&<R label="Renewal" sortKey="renewalOn" sort={I} onSort={Z} align="right" className="w-[120px]" />}
                  </tr>
                </thead>
                <tbody>
                  {J.map(e=>(
                    <tr key={e.name} className="group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]">
                                    <td className={h(y,C,"max-w-[280px]")}><span className={h(k,w)}>{e.name}</span></td>
                                    {T.Owner&&<td className={h(y,C)}><span className={m}>{e.owner}</span></td>}
                                    {T.Plan&&<td className={h(y,C)}><span className={m}>{e.plan}</span></td>}
                                    <td className={h(y,C)}><M status={e.status} /></td>
                                    {T.Region&&<td className={h(y,C)}><span className={m}>{e.region}</span></td>}
                                    <td className={h(y,N,C)}>{D(e.mrr)}</td>
                                    {T.Renewal&&<td className={h(y,N,C)}><span className={m}>{z(e.renewalOn)}</span></td>}
                                  </tr>
                  ))}
                </tbody>
              </table>
              <div className="space-y-2 p-4 md:hidden">
                {J.length>0&&<div className={h("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7")}>
                  {J.map(e=>(
                    <div key={e.name} className={h("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","px-4")}>
                                    <div className="flex w-full items-center justify-between gap-3">
                                      <p className={h(k,w,"flex-1")}>{e.name}</p>
                                      <span className={h("text-[15px]/[22px] font-medium",N,"shrink-0")}>{D(e.mrr)}</span>
                                    </div>
                                    <div className="flex w-full items-center justify-between gap-3">
                                      <M status={e.status} small />
                                      <span className={h("shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","flex gap-2")}>
                                        <span>{e.plan}</span>
                                        <span>
                                          {"Renews "}
                                          {z(e.renewalOn)}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                  ))}
                </div>}
              </div>
              {0===J.length&&<div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
                <span aria-hidden="true" className={h(m,"mb-3 flex h-10 w-10 items-center justify-center")}><HugeiconsIcon icon={Icon_73516} size={20} strokeWidth={2} /></span>
                <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No matching accounts</p>
                <p className={h("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>Try a different search, or clear the plan filter.</p>
                <button type="button" onClick={()=>{
                  W(""),O(null)
                }} className={h(f,v,"mt-4")}>Clear filters</button>
              </div>}
            </div>
            <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={h(b,"text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","flex h-12 shrink-0 items-center px-4 sm:px-6")}>
            {"Showing "}
            {J.length}
            {" of "}
            {S.length}
            {" accounts"}
          </footer>
        </div>
      </div>
  );
}
