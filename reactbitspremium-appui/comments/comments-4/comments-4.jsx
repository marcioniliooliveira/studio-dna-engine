/**
 * React Bits Pro — Application UI (comments-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_48094 = [["path",{d:"M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_64132 = [["path",{d:"M5 6C5 4.58579 5 3.87868 5.43934 3.43934C5.87868 3 6.58579 3 8 3H12.5789C15.0206 3 17 5.01472 17 7.5C17 9.98528 15.0206 12 12.5789 12H5V6Z",stroke:"currentColor",fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.4286 12H13.6667C16.0599 12 18 14.0147 18 16.5C18 18.9853 16.0599 21 13.6667 21H8C6.58579 21 5.87868 21 5.43934 20.5607C5 20.1213 5 19.4142 5 18V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_17771 = [["path",{d:"M12 4H19",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 20L16 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 20H12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_33786 = [["path",{d:"M14.9961 17H16.9961C19.7575 17 21.9961 14.7614 21.9961 12C21.9961 9.23858 19.7575 7 16.9961 7H14.9961M8.99609 17H6.99609C4.23467 17 1.99609 14.7614 1.99609 12C1.99609 9.23858 4.23467 7 6.99609 7H8.99609",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.49609 12H15.4961",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_2605 = [["path",{d:"M15.6 8.40033V12.9003C15.6 14.3915 16.8088 15.6003 18.3 15.6003C19.7912 15.6003 21 14.3915 21 12.9003V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.0265 21 15.8965 20.3302 17.4009 19.2M15.6 12.0003C15.6 13.9886 13.9882 15.6003 12 15.6003C10.0118 15.6003 8.4 13.9886 8.4 12.0003C8.4 10.0121 10.0118 8.40033 12 8.40033C13.9882 8.40033 15.6 10.0121 15.6 12.0003Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  h = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[13px]/[18px] font-normal",
  m = "text-[12px]/[16px] font-normal tabular-nums",
  f = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",
  _ = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  v = "rounded-[var(--rb-r-lg,10px)]",
  k = (e,r=2)=>e.split(/[\s-]+/).filter(Boolean).slice(0,r).map(e=>e[0]?.toUpperCase()).join(""),
  g = [{name:"Priya Nandakumar",handle:"priya",team:"Platform"},{name:"Marcus Bell",handle:"marcus",team:"Infrastructure"},{name:"Sofia Alvarez",handle:"sofia",team:"Platform"},{name:"Wei Chen",handle:"wei",team:"Data"},{name:"Tom\xe1s Guerrero",handle:"tomas",team:"Reliability"}],
  w = ["pool-saturation.png","backfill-plan.md"],
  j = [{author:"Wei Chen",time:"4h ago",body:"Hard-coding eight workers will bite us when the pool size changes. Read it from the pool config so the two never drift apart."},{author:"Marcus Bell",time:"2h ago",body:"Agreed, and the same argument applies to the timeout. A slow region should not silently inherit the default."},{author:"Sofia Alvarez",time:"38m ago",body:"I pulled both values into the region config so there is one place to change them. Screenshot of the saturation graph is attached."}];

function y(e){
  let r=useRef(null),[t,a]=useState({start:false,end:false}),l=useCallback(()=>{
    let e=r.current;
    if(!e)return;
    let{scrollTop:t,scrollHeight:n,clientHeight:l}=e;
    a({start:t>1,end:Math.ceil(t+l)<n-1})
  }, []);
  return useEffect(()=>{
    l();
    let e=r.current,t=e?.ownerDocument.defaultView;
    if(!e||!t?.ResizeObserver)return;
    let a=new t.ResizeObserver(l);
    return a.observe(e),()=>a.disconnect();
  }, [e,l]),{ref:r,edges:t,onScroll:l};
}

function N(){
  let[e,r]=useState("Nice catch on the pool cap. @"),[t,N]=useState(w),[z,S]=useState(0),A=useRef(null),{ref:C,edges:R,onScroll:W}=y(),M=useMemo(()=>{
    let r=e.lastIndexOf("@");
    if(-1===r)return null;
    let t=e.slice(r+1);
    return /\s/.test(t)?null:t.toLowerCase();
  }, [e]),I=useMemo(()=>null===M?[]:g.filter(e=>e.handle.startsWith(M)||e.name.toLowerCase().includes(M)), [M]),{ref:O,edges:D,onScroll:T}=y(I.map(e=>e.handle).join());
  useEffect(()=>{
    let e=O.current,r=e?.querySelector('[aria-selected="true"]');
    if(!e||!r)return;
    let t=r.offsetTop,a=t+r.offsetHeight;
    t<e.scrollTop?e.scrollTop=t:a>e.scrollTop+e.clientHeight&&(e.scrollTop=a-e.clientHeight)
  }, [z,I,O]);
  let E=t=>{
    let a=e.lastIndexOf("@");
    r(`${e.slice(0,a)}@${t.handle} `),S(0),A.current?.focus()
  };
  return (
    <div className={x("bg-white dark:bg-neutral-950",b,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[620px]">
          <div className="mb-3">
            <h2 className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em]",b)}>Leave a comment</h2>
            <p className={x(p,h,"mt-0.5")}>Type @ to mention a teammate. They are notified once you post.</p>
          </div>
          <div className={x("relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8","z-10 p-3")}>
            <div className="flex gap-3">
              <span aria-hidden className={f}><span className={_}>AW</span></span>
              <div className="min-w-0 flex-1">
                <label htmlFor="comments-4-draft" className="sr-only">Write a comment</label>
                <textarea id="comments-4-draft" ref={A} value={e} onChange={e=>{
                  r(e.target.value),S(0)
                }} onKeyDown={e=>{
                  0!==I.length&&("ArrowDown"===e.key?(e.preventDefault(),S(e=>(e+1)%I.length)):"ArrowUp"===e.key?(e.preventDefault(),S(e=>(e-1+I.length)%I.length)):"Enter"!==e.key||e.shiftKey||(e.preventDefault(),E(I[z])))
                }} rows={2} placeholder="Write a comment" className={x("max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66","field-sizing-content min-h-12 w-full")} />
                {t.length>0&&<div className="mt-1 flex flex-wrap gap-1.5 px-1.5">
                  {t.map(e=>(
                    <span key={e} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                                    <HugeiconsIcon icon={Icon_48094} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                                    <span className="max-w-[140px] truncate">{e}</span>
                                    <button type="button" aria-label={`Remove ${e}`} onClick={()=>N(r=>r.filter(r=>r!==e))} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                                      <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                                    </button>
                                  </span>
                  ))}
                </div>}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-0.5">
                {[[Icon_64132,"Bold"],[Icon_17771,"Italic"],[Icon_33786,"Add link"],[Icon_2605,"Mention someone"],[Icon_48094,"Attach a file"]].map(([e,r])=><button key={r} type="button" aria-label={r} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}><HugeiconsIcon icon={e} size={16} strokeWidth={1.8} aria-hidden="true" /></button>)}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className={x(p,h,"hidden sm:inline")}>Enter to post</span>
                <button type="button" disabled={0===e.trim().length} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>Comment</button>
              </div>
            </div>
            {I.length>0&&<div className="absolute top-[calc(100%-6px)] left-[52px] z-20 w-[min(260px,calc(100%-52px))]">
              <div ref={O} onScroll={T} role="listbox" aria-label="Mention suggestions" className={x("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","relative max-h-[200px]")}>
                {I.map((e,r)=>(
                  <button key={e.handle} type="button" role="option" aria-selected={r===z} onMouseEnter={()=>S(r)} onClick={()=>E(e)} className="relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40">
                                <span aria-hidden className={x(f,"size-[24px]")}><span className={_}>{k(e.name,1)}</span></span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate">{e.name}</span>
                                  <span className={x(m,h,"flex min-w-0 gap-2")}>
                                    <span className="truncate">
                                      @
                                      {e.handle}
                                    </span>
                                    <span className="truncate">{e.team}</span>
                                  </span>
                                </span>
                              </button>
                ))}
              </div>
              <div aria-hidden="true" className={x("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900",v,"pointer-events-none absolute inset-x-px top-px h-8",D.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900",v,"pointer-events-none absolute inset-x-px bottom-px h-8",D.end?"opacity-100":"opacity-0")} />
            </div>}
          </div>
          <p className={x(m,h,"mt-4 mb-2 px-1")}>Earlier in this thread</p>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={x("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1")}>
              <div ref={C} onScroll={W} className={x("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","max-h-[200px] overflow-y-auto sm:max-h-none")}>
                {j.map(e=>(
                  <article key={e.author} className="flex gap-3 p-3">
                                <span aria-hidden className={x(f,"size-[28px]")}><span className={_}>{k(e.author)}</span></span>
                                <div className="min-w-0 flex-1">
                                  <div className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                                    <p className={x("text-[14px]/[16px] font-[450]",b,"min-w-0 truncate")}>{e.author}</p>
                                    <span className={x(p,h)}>{e.time}</span>
                                  </div>
                                  <p className={x(p,"text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>{e.body}</p>
                                </div>
                              </article>
                ))}
              </div>
              <div aria-hidden="true" className={x("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",R.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",R.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
      </div>
  );
}


export default N;
