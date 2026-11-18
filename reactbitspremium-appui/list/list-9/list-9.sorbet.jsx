/**
 * React Bits Pro — Application UI (list-9 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_97872 = [["path",{d:"M21 7V12M3 7C3 10.0645 3 16.7742 3 17.1613C3 18.5438 4.94564 19.3657 8.83693 21.0095C10.4002 21.6698 11.1818 22 12 22L12 11.3548",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 19C15 19 15.875 19 16.75 21C16.75 21 19.5294 16 22 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8.32592 9.69138L5.40472 8.27785C3.80157 7.5021 3 7.11423 3 6.5C3 5.88577 3.80157 5.4979 5.40472 4.72215L8.32592 3.30862C10.1288 2.43621 11.0303 2 12 2C12.9697 2 13.8712 2.4362 15.6741 3.30862L18.5953 4.72215C20.1984 5.4979 21 5.88577 21 6.5C21 7.11423 20.1984 7.5021 18.5953 8.27785L15.6741 9.69138C13.8712 10.5638 12.9697 11 12 11C11.0303 11 10.1288 10.5638 8.32592 9.69138Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L8 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M17 4L7 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_59309 = [["path",{d:"M2.01733 15C4.2169 15 6.00001 16.7831 6.00001 18.9827",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 18.9827V18.8908C18 16.742 19.742 15 21.8908 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.00001 5.01733C6.00001 7.2169 4.2169 9.00001 2.01733 9.00001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 5.01733C18 7.19765 19.769 8.96876 21.9423 8.9996",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 5H8C5.17157 5 3.75736 5 2.87868 5.87868C2 6.75736 2 8.17157 2 11V13C2 15.8284 2 17.2426 2.87868 18.1213C3.75736 19 5.17157 19 8 19H16C18.8284 19 20.2426 19 21.1213 18.1213C22 17.2426 22 15.8284 22 13V11C22 8.17157 22 6.75736 21.1213 5.87868C20.2426 5 18.8284 5 16 5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_3810 = [["path",{d:"M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.79275 3 5.97733 4.67765 4.38341 7.20327M3.29339 3.00076L3.46556 5.05452C3.58958 6.53384 3.65159 7.27349 4.13359 7.68914C4.61559 8.10479 5.32673 8.03185 6.74899 7.88595L8.79339 7.67625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62955 = [["path",{d:"M3 8H15C18.3137 8 21 10.6863 21 14C21 17.3137 18.3137 20 15 20H11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 4L5.8462 4.87652C3.94873 6.31801 3 7.03875 3 8C3 8.96125 3.94873 9.68199 5.8462 11.1235L7 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_67812 = [["path",{d:"M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" ");

let b = "text-neutral-900 dark:text-neutral-100";

let p = "text-[14px]/[20px] font-medium";

let h = [{id:"7d",label:"7 days"},{id:"28d",label:"28 days"},{id:"qtd",label:"Quarter"}];

let m = [{id:"fulfilled",label:"Orders fulfilled",icon:Icon_97872,caption:"Picked, packed and handed to a carrier",by:{"7d":{value:"1,284",delta:6.4},"28d":{value:"5,109",delta:11.2},qtd:{value:"14,730",delta:18.9}}},{id:"net",label:"Net revenue",icon:Icon_59309,caption:"Gross receipts less discounts and refunds",by:{"7d":{value:"$92.4k",delta:3.1},"28d":{value:"$374.8k",delta:7.8},qtd:{value:"$1.09M",delta:12.4}}},{id:"basket",label:"Average basket",icon:Icon_3810,caption:"Net revenue divided by fulfilled orders",by:{"7d":{value:"$71.96",delta:-2.9},"28d":{value:"$73.36",delta:-1.4},qtd:{value:"$74.02",delta:.6}}},{id:"returns",label:"Return rate",icon:Icon_62955,caption:"Units sent back within the 30 day window",by:{"7d":{value:"4.1%",delta:-.8},"28d":{value:"4.6%",delta:.5},qtd:{value:"5.2%",delta:1.7}}}];

let k = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[n].focus(),a[n].click()
};

let r_ = (...e)=>e.filter(Boolean).join(" ");

let ru = "hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6";

let rx = "text-neutral-900 dark:text-neutral-100";

let rb = "text-neutral-900/62 dark:text-neutral-100/62";

let rp = "text-[14px]/[20px] font-medium";

let rh = "text-[13px]/[16px] font-semibold tabular-nums";

let rm = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let rk = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let rf = [{first:"Amara",last:"Adeyemi",role:"VP Operations",company:"Northwind Trading",kind:"customer"},{first:"Priya",last:"Anand",role:"Head of Procurement",company:"Kestrel Labs",kind:"prospect"},{first:"Marcus",last:"Bello",role:"Finance Director",company:"Atlas Freight",kind:"customer"},{first:"Elena",last:"Brandt",role:"Account Owner",company:"Bright Harbor",kind:"customer"},{first:"Sofia",last:"Cardenas",role:"IT Manager",company:"Cedar & Vale",kind:"prospect"},{first:"Daniel",last:"Cho",role:"Ops Lead",company:"Meridian Health",kind:"customer"},{first:"Nadia",last:"Duarte",role:"Head of Sales",company:"Pinewood Foods",kind:"customer"},{first:"Grace",last:"Fenwick",role:"CFO",company:"Riverbank Capital",kind:"customer"},{first:"Oscar",last:"Fontaine",role:"Procurement Lead",company:"Solstice Energy",kind:"prospect"},{first:"Leah",last:"Granger",role:"VP Operations",company:"Tidewater Logistics",kind:"customer"},{first:"Tomas",last:"Guerra",role:"Founder",company:"Umbra Studio",kind:"prospect"},{first:"Ravi",last:"Hemani",role:"IT Director",company:"Vantage Aero",kind:"customer"},{first:"Imani",last:"Hollis",role:"Head of Finance",company:"Wexford Group",kind:"customer"},{first:"Yusuf",last:"Kaya",role:"Ops Manager",company:"Ovato Retail",kind:"prospect"},{first:"Wren",last:"Kowalski",role:"Account Owner",company:"Quill Media",kind:"customer"},{first:"Bianca",last:"Lindqvist",role:"VP Finance",company:"Lumen Robotics",kind:"customer"},{first:"Aaron",last:"Mbeki",role:"Head of Procurement",company:"Northwind Trading",kind:"customer"},{first:"Chloe",last:"Marchetti",role:"Buyer",company:"Cedar & Vale",kind:"prospect"},{first:"Felix",last:"Moreau",role:"Operations Lead",company:"Atlas Freight",kind:"customer"},{first:"Sasha",last:"Novak",role:"Head of IT",company:"Kestrel Labs",kind:"prospect"},{first:"Dana",last:"Okonkwo",role:"CFO",company:"Bright Harbor",kind:"customer"},{first:"Julian",last:"Pereira",role:"Account Owner",company:"Meridian Health",kind:"customer"},{first:"Nora",last:"Pashkov",role:"VP Growth",company:"Pinewood Foods",kind:"prospect"},{first:"Idris",last:"Rahman",role:"Finance Director",company:"Riverbank Capital",kind:"customer"},{first:"Camila",last:"Rossi",role:"Procurement Lead",company:"Solstice Energy",kind:"customer"},{first:"Hana",last:"Sato",role:"Head of Operations",company:"Tidewater Logistics",kind:"prospect"},{first:"Victor",last:"Salgado",role:"IT Manager",company:"Umbra Studio",kind:"customer"},{first:"Marta",last:"Toledo",role:"Account Owner",company:"Vantage Aero",kind:"customer"},{first:"Leon",last:"Vasquez",role:"Founder",company:"Wexford Group",kind:"prospect"},{first:"Greta",last:"Wallace",role:"VP Operations",company:"Ovato Retail",kind:"customer"},{first:"Owen",last:"Whitfield",role:"Head of Sales",company:"Quill Media",kind:"customer"}];

let rg = [{id:"all",label:"All"},{id:"customer",label:"Customers"},{id:"prospect",label:"Prospects"}];

let rv = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[n].focus(),a[n].click()
};


export default function list_9__Sorbet__Component(){
  let[e,r]=useState("all"),[a,l]=useState("A"),{ref:o,edges:s,onScroll:d}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:i}=r;
      a({start:t>1,end:Math.ceil(t+i)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),c=useRef({}),_=useRef(null),u=useRef(false),x=useMemo(()=>{
    let r="all"===e?rf:rf.filter(r=>r.kind===e),a=new Map;
    for(let e of r){
      let r=e.last[0].toUpperCase();
      (a.get(r)??a.set(r,[]).get(r)).push(e)
    }
    return [...a.entries()].map(([e,r])=>({letter:e,people:r.sort((e,r)=>e.last.localeCompare(r.last))})).sort((e,r)=>e.letter.localeCompare(r.letter));
  }, [e]),b=useMemo(()=>new Set(x.map(e=>e.letter)), [x]),p=useMemo(()=>x.reduce((e,r)=>e+r.people.length,0), [x]),h=useCallback(e=>{
    let r=o.current,a=c.current[e];
    r&&a&&(r.scrollTop=a.getBoundingClientRect().top-r.getBoundingClientRect().top+r.scrollTop)
  }, [o]),m=useCallback(()=>{
    let e=o.current;
    if(!e)return;
    let r=e.getBoundingClientRect().top,a=x[0]?.letter??"A";
    for(let e of x){
      let t=c.current[e.letter];
      if(t)if(t.getBoundingClientRect().top-r<=12)a=e.letter;else break
    }
    l(a)
  }, [x,o]);
  useEffect(()=>{
    let e=requestAnimationFrame(m);
    return ()=>cancelAnimationFrame(e);
  }, [m]);
  let k=useCallback(e=>{
    let r=_.current;
    if(!r)return null;
    let a=r.getBoundingClientRect(),t=(e-a.top)/a.height,n=Math.max(0,Math.min(rk.length-1,Math.floor(t*rk.length)));
    return rk[n];
  }, []),f=useCallback(e=>{
    let r=k(e);
    r&&b.has(r)&&h(r)
  }, [k,b,h]);
  return (
    <div className={r_("bg-white dark:bg-neutral-950",rx,"flex h-full min-h-[640px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex h-full w-full max-w-[720px] flex-col">
          <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={r_("text-[17px]/[22px] font-extrabold",rx)}>Account contacts</h2>
              <p className={r_(rp,rb,"mt-0.5 tabular-nums")}>
                {p}
                {" "}
                {1===p?"person":"people"}
                {" across your book"}
              </p>
            </div>
            <div role="radiogroup" aria-label="Filter by relationship" onKeyDown={rv} className={r_("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
              {rg.map(a=>{
                let n=a.id===e;
                return <button key={a.id} type="button" role="radio" aria-checked={n} tabIndex={n?0:-1} onClick={()=>r(a.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{a.label}</button>;
              })}
            </div>
          </div>
          <div className={r_("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","relative min-h-0 flex-1")}>
            {0===x.length?<div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center">
                <HugeiconsIcon icon={Icon_88366} size={20} strokeWidth={2} aria-hidden="true" className="text-neutral-900/78 dark:text-neutral-100/78" />
              </div>
              <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No contacts in this view</p>
              <p className={r_("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>Nobody in your book matches this relationship yet.</p>
              <button type="button" onClick={()=>r("all")} className={r_(rm,"h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","mt-4")}>Show everyone</button>
            </div>:<div ref={o} onScroll={()=>{
              d(),m()
            }} style={{touchAction:"pan-y",scrollbarWidth:"none"}} className="min-h-0 flex-1 space-y-2 overflow-y-auto pt-1 pr-8 pb-2 pl-2 [&::-webkit-scrollbar]:hidden">
              {x.map(e=>(
                <div key={e.letter} ref={r=>{
                            c.current[e.letter]=r
                          }}>
                            <div className={r_("bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]",rh,rb,"sticky top-0 z-20 px-3 pb-1 pt-1")}>{e.letter}</div>
                            <div className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
                              {e.people.map(e=>(
                                <div key={`${e.first}-${e.last}`} className={r_("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","rounded-[var(--rb-r-4xl,18px)]",ru,"h-14 px-3")}>
                                                <span aria-hidden="true" className={r_("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-10")}>
                                                  <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{`${e.first[0]}${e.last[0]}`}</span>
                                                </span>
                                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                  <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100">
                                                    <span className="truncate">
                                                      {e.first}
                                                      {" "}
                                                      {e.last}
                                                    </span>
                                                  </p>
                                                  <p data-description className={r_(rp,rb,"truncate")}>
                                                    <span>{e.role}</span>
                                                    <span className="ms-3">{e.company}</span>
                                                  </p>
                                                </div>
                                                <button type="button" aria-label={`Email ${e.first} ${e.last}`} className={r_(rm,"size-8 rounded-[calc(var(--rb-r-full,999px))]")}>
                                                  <HugeiconsIcon icon={Icon_67812} size={18} strokeWidth={2} aria-hidden="true" />
                                                </button>
                                              </div>
                              ))}
                            </div>
                          </div>
              ))}
            </div>}
            <div aria-hidden="true" className={r_("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 top-0 z-10 h-8",s.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={r_("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8",s.end?"opacity-100":"opacity-0")} />
            {x.length>0&&<div ref={_} role="navigation" aria-label="Jump to letter" onPointerDown={e=>{
              u.current=true,e.currentTarget.setPointerCapture(e.pointerId),f(e.clientY)
            }} onPointerMove={e=>{
              u.current&&f(e.clientY)
            }} onPointerUp={e=>{
              u.current=false,e.currentTarget.releasePointerCapture(e.pointerId)
            }} style={{touchAction:"none"}} className="absolute inset-y-2 right-2.5 z-20 flex w-4 select-none flex-col items-center justify-between">
              {rk.map(e=>{
                let r=b.has(e),n=e===a&&r;
                return r?<button key={e} type="button" aria-label={`Jump to ${e}`} onClick={()=>h(e)} className={r_(rh,n?rx:rb,ru,"rounded-[var(--rb-r-sm,6px)]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","flex size-4 items-center justify-center")}>{e}</button>:<span key={e} aria-hidden="true" className={r_(rh,"text-neutral-900/40 dark:text-neutral-100/40")}>{e}</span>;
              })}
            </div>}
          </div>
        </div>
      </div>
  );
}
