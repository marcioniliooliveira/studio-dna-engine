/**
 * React Bits Pro — Application UI (list-9)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_67812 = [["path",{d:"M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[13px]/[18px] font-normal",
  p = "text-[12px]/[16px] font-normal tabular-nums",
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  m = [{first:"Amara",last:"Adeyemi",role:"VP Operations",company:"Northwind Trading",kind:"customer"},{first:"Priya",last:"Anand",role:"Head of Procurement",company:"Kestrel Labs",kind:"prospect"},{first:"Marcus",last:"Bello",role:"Finance Director",company:"Atlas Freight",kind:"customer"},{first:"Elena",last:"Brandt",role:"Account Owner",company:"Bright Harbor",kind:"customer"},{first:"Sofia",last:"Cardenas",role:"IT Manager",company:"Cedar & Vale",kind:"prospect"},{first:"Daniel",last:"Cho",role:"Ops Lead",company:"Meridian Health",kind:"customer"},{first:"Nadia",last:"Duarte",role:"Head of Sales",company:"Pinewood Foods",kind:"customer"},{first:"Grace",last:"Fenwick",role:"CFO",company:"Riverbank Capital",kind:"customer"},{first:"Oscar",last:"Fontaine",role:"Procurement Lead",company:"Solstice Energy",kind:"prospect"},{first:"Leah",last:"Granger",role:"VP Operations",company:"Tidewater Logistics",kind:"customer"},{first:"Tomas",last:"Guerra",role:"Founder",company:"Umbra Studio",kind:"prospect"},{first:"Ravi",last:"Hemani",role:"IT Director",company:"Vantage Aero",kind:"customer"},{first:"Imani",last:"Hollis",role:"Head of Finance",company:"Wexford Group",kind:"customer"},{first:"Yusuf",last:"Kaya",role:"Ops Manager",company:"Ovato Retail",kind:"prospect"},{first:"Wren",last:"Kowalski",role:"Account Owner",company:"Quill Media",kind:"customer"},{first:"Bianca",last:"Lindqvist",role:"VP Finance",company:"Lumen Robotics",kind:"customer"},{first:"Aaron",last:"Mbeki",role:"Head of Procurement",company:"Northwind Trading",kind:"customer"},{first:"Chloe",last:"Marchetti",role:"Buyer",company:"Cedar & Vale",kind:"prospect"},{first:"Felix",last:"Moreau",role:"Operations Lead",company:"Atlas Freight",kind:"customer"},{first:"Sasha",last:"Novak",role:"Head of IT",company:"Kestrel Labs",kind:"prospect"},{first:"Dana",last:"Okonkwo",role:"CFO",company:"Bright Harbor",kind:"customer"},{first:"Julian",last:"Pereira",role:"Account Owner",company:"Meridian Health",kind:"customer"},{first:"Nora",last:"Pashkov",role:"VP Growth",company:"Pinewood Foods",kind:"prospect"},{first:"Idris",last:"Rahman",role:"Finance Director",company:"Riverbank Capital",kind:"customer"},{first:"Camila",last:"Rossi",role:"Procurement Lead",company:"Solstice Energy",kind:"customer"},{first:"Hana",last:"Sato",role:"Head of Operations",company:"Tidewater Logistics",kind:"prospect"},{first:"Victor",last:"Salgado",role:"IT Manager",company:"Umbra Studio",kind:"customer"},{first:"Marta",last:"Toledo",role:"Account Owner",company:"Vantage Aero",kind:"customer"},{first:"Leon",last:"Vasquez",role:"Founder",company:"Wexford Group",kind:"prospect"},{first:"Greta",last:"Wallace",role:"VP Operations",company:"Ovato Retail",kind:"customer"},{first:"Owen",last:"Whitfield",role:"Head of Sales",company:"Quill Media",kind:"customer"}],
  f = [{id:"all",label:"All"},{id:"customer",label:"Customers"},{id:"prospect",label:"Prospects"}],
  k = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function v(){
  let[e,t]=useState("all"),[r,v]=useState("A"),{ref:g,edges:w,onScroll:_}=function(){
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
  }(),y=useRef({}),j=useRef(null),N=useRef(false),A=useMemo(()=>{
    let t="all"===e?m:m.filter(t=>t.kind===e),r=new Map;
    for(let e of t){
      let t=e.last[0].toUpperCase();
      (r.get(t)??r.set(t,[]).get(t)).push(e)
    }
    return [...r.entries()].map(([e,t])=>({letter:e,people:t.sort((e,t)=>e.last.localeCompare(t.last))})).sort((e,t)=>e.letter.localeCompare(t.letter));
  }, [e]),z=useMemo(()=>new Set(A.map(e=>e.letter)), [A]),S=useMemo(()=>A.reduce((e,t)=>e+t.people.length,0), [A]),C=useCallback(e=>{
    let t=g.current,r=y.current[e];
    t&&r&&(t.scrollTop=r.getBoundingClientRect().top-t.getBoundingClientRect().top+t.scrollTop)
  }, [g]),R=useCallback(()=>{
    let e=g.current;
    if(!e)return;
    let t=e.getBoundingClientRect().top,r=A[0]?.letter??"A";
    for(let e of A){
      let a=y.current[e.letter];
      if(a)if(a.getBoundingClientRect().top-t<=12)r=e.letter;else break
    }
    v(r)
  }, [A,g]);
  useEffect(()=>{
    let e=requestAnimationFrame(R);
    return ()=>cancelAnimationFrame(e);
  }, [R]);
  let M=useCallback(e=>{
    let t=j.current;
    if(!t)return null;
    let r=t.getBoundingClientRect(),a=(e-r.top)/r.height,n=Math.max(0,Math.min(b.length-1,Math.floor(a*b.length)));
    return b[n];
  }, []),T=useCallback(e=>{
    let t=M(e);
    t&&z.has(t)&&C(t)
  }, [M,z,C]);
  return (
    <div className={o("bg-white dark:bg-neutral-950",c,"flex h-full min-h-[640px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex h-full w-full max-w-[720px] flex-col">
          <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={o("text-[16px]/[20px] font-[450] tracking-[-0.015em]",c)}>Account contacts</h2>
              <p className={o(x,u,"mt-0.5 tabular-nums")}>
                {S}
                {" "}
                {1===S?"person":"people"}
                {" across your book"}
              </p>
            </div>
            <div role="radiogroup" aria-label="Filter by relationship" onKeyDown={k} className={o("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {f.map(r=>{
                let n=r.id===e;
                return <button key={r.id} type="button" role="radio" aria-checked={n} tabIndex={n?0:-1} onClick={()=>t(r.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{r.label}</button>;
              })}
            </div>
          </div>
          <div className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","relative min-h-0 flex-1")}>
            {0===A.length?<div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center">
                <HugeiconsIcon icon={Icon_88366} size={20} strokeWidth={1.8} aria-hidden="true" className="text-neutral-900/80 dark:text-neutral-100/80" />
              </div>
              <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No contacts in this view</p>
              <p className={o("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Nobody in your book matches this relationship yet.</p>
              <button type="button" onClick={()=>t("all")} className={o(h,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-4")}>Show everyone</button>
            </div>:<div ref={g} onScroll={()=>{
              _(),R()
            }} style={{touchAction:"pan-y",scrollbarWidth:"none"}} className="min-h-0 flex-1 space-y-2 overflow-y-auto pt-1 pr-8 pb-2 pl-2 [&::-webkit-scrollbar]:hidden">
              {A.map(e=>(
                <div key={e.letter} ref={t=>{
                            y.current[e.letter]=t
                          }}>
                            <div className={o("bg-white dark:bg-neutral-900",p,u,"sticky top-0 z-20 px-3 pb-1 pt-1")}>{e.letter}</div>
                            <div className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
                              {e.people.map(e=>(
                                <div key={`${e.first}-${e.last}`} className={o("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","rounded-[var(--rb-r-sm,6px)]",d,"h-14 px-3")}>
                                                <span aria-hidden="true" className={o("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-10")}>
                                                  <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{`${e.first[0]}${e.last[0]}`}</span>
                                                </span>
                                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                  <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">
                                                    <span className="truncate">
                                                      {e.first}
                                                      {" "}
                                                      {e.last}
                                                    </span>
                                                  </p>
                                                  <p data-description className={o(x,u,"truncate")}>
                                                    <span>{e.role}</span>
                                                    <span className="ms-3">{e.company}</span>
                                                  </p>
                                                </div>
                                                <button type="button" aria-label={`Email ${e.first} ${e.last}`} className={o(h,"size-7 rounded-[var(--rb-r-sm,6px)]")}>
                                                  <HugeiconsIcon icon={Icon_67812} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                </button>
                                              </div>
                              ))}
                            </div>
                          </div>
              ))}
            </div>}
            <div aria-hidden="true" className={o("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 z-10 h-8",w.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={o("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8",w.end?"opacity-100":"opacity-0")} />
            {A.length>0&&<div ref={j} role="navigation" aria-label="Jump to letter" onPointerDown={e=>{
              N.current=true,e.currentTarget.setPointerCapture(e.pointerId),T(e.clientY)
            }} onPointerMove={e=>{
              N.current&&T(e.clientY)
            }} onPointerUp={e=>{
              N.current=false,e.currentTarget.releasePointerCapture(e.pointerId)
            }} style={{touchAction:"none"}} className="absolute inset-y-2 right-2.5 z-20 flex w-4 select-none flex-col items-center justify-between">
              {b.map(e=>{
                let t=z.has(e),n=e===r&&t;
                return t?<button key={e} type="button" aria-label={`Jump to ${e}`} onClick={()=>C(e)} className={o(p,n?c:u,d,"rounded-[var(--rb-r-xs,4px)]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","flex size-4 items-center justify-center")}>{e}</button>:<span key={e} aria-hidden="true" className={o(p,"text-neutral-900/40 dark:text-neutral-100/40")}>{e}</span>;
              })}
            </div>}
          </div>
        </div>
      </div>
  );
}


export default v;
