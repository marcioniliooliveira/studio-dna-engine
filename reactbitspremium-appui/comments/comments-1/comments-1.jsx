/**
 * React Bits Pro — Application UI (comments-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_49322 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.625 8.387V8.91649M8.375 8.387V8.91649M8.75 8.75C8.75 8.33579 8.58211 8 8.375 8C8.16789 8 8 8.33579 8 8.75C8 9.16421 8.16789 9.5 8.375 9.5C8.58211 9.5 8.75 9.16421 8.75 8.75ZM16 8.75C16 8.33579 15.8321 8 15.625 8C15.4179 8 15.25 8.33579 15.25 8.75C15.25 9.16421 15.4179 9.5 15.625 9.5C15.8321 9.5 16 9.16421 16 8.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_39893 = [["path",{d:"M5 9H12C15.7712 9 17.6569 9 18.8284 10.1716C20 11.3431 20 13.2288 20 17V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.99996 4C8.99996 4 4.00001 7.68245 4 9.00004C3.99999 10.3176 9 14 9 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "text-[13px]/[18px] font-normal",
  h = "text-[14px]/[16px] font-[450]",
  p = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  m = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",
  f = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  _ = (e,r=2)=>e.split(/[\s-]+/).filter(Boolean).slice(0,r).map(e=>e[0]?.toUpperCase()).join(""),
  v = [{id:"t1",author:"Priya Nandakumar",role:"Platform",time:"2h ago",body:"The cutover window is tight. If we hold the read replica until the backfill drains we lose the rollback path, so I would rather split this into two deploys.",reactions:4,replies:[{id:"t1r1",author:"Marcus Bell",role:"Infrastructure",time:"1h ago",body:"Agreed. Two deploys also means the schema change lands on a quiet day instead of during the migration itself."},{id:"t1r2",author:"Sofia Alvarez",role:"Platform",time:"48m ago",body:"I can prepare the second deploy behind a flag so we can flip it without another release."}]},{id:"t2",author:"Wei Chen",role:"Data",time:"36m ago",body:"One caveat: the backfill job reads from the same connection pool as the API. We should cap it at eight workers or the request latency will spike during business hours.",reactions:2,replies:[]},{id:"t3",author:"Tom\xe1s Guerrero",role:"Reliability",time:"12m ago",body:"Added a dashboard for pool saturation so we can watch it live. Alert fires at 80 percent for five minutes.",reactions:1,replies:[]}],
  k = ["Newest","Oldest"],
  g = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let t=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=t.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?t.length-1:(a+r+t.length)%t.length;
  t[n].focus(),t[n].click()
};

function w(){
  let[e,r]=useState("Oldest"),[t,w]=useState(["t1"]),[j,y]=useState(""),{ref:N,edges:z,onScroll:S}=function(){
    let e=useRef(null),[r,t]=useState({start:false,end:false}),a=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=r;
      t({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let r=e.current,t=r?.ownerDocument.defaultView;
      if(!r||!t?.ResizeObserver)return;
      let n=new t.ResizeObserver(a);
      return observe(r),()=>disconnect();
    }, [a]),{ref:e,edges:r,onScroll:a};
  }(),A=useMemo(()=>"Oldest"===e?v:[...v].reverse(), [e]),C=v.reduce((e,r)=>e+1+r.replies.length,0),R=({id:e,reactions:r})=>{
    let n=t.includes(e);
    return (
      <div className="mt-2 flex items-center gap-1">
            <button type="button" aria-pressed={n} onClick={()=>w(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e])} className={d("relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40","tabular-nums")}>
              <HugeiconsIcon icon={Icon_49322} size={14} strokeWidth={1.8} aria-hidden="true" />
              {r+ +!!n}
            </button>
            <button type="button" className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",p)}>
              <HugeiconsIcon icon={Icon_39893} size={16} strokeWidth={1.8} aria-hidden="true" />
              Reply
            </button>
          </div>
    );
  };
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[720px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={d("text-[16px]/[20px] font-[450] tracking-[-0.015em]",c)}>Migration plan feedback</h2>
              <p className={d(b,x,"mt-0.5 flex gap-3 truncate")}>
                <span>
                  {C}
                  {" comments"}
                </span>
                <span>4 participants</span>
              </p>
            </div>
            <div role="radiogroup" aria-label="Sort comments" onKeyDown={g} className={d("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {k.map(t=><button key={t} type="button" role="radio" aria-checked={t===e} tabIndex={t===e?0:-1} onClick={()=>r(t)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{t}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={d("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1")}>
              <div ref={N} onScroll={S} className={d("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","max-h-[280px] overflow-y-auto sm:max-h-[368px]")}>
                {A.map(e=>(
                  <article key={e.id} className="flex gap-3 p-3">
                                <div className="flex shrink-0 flex-col items-center">
                                  <span aria-hidden className={m}><span className={f}>{_(e.author)}</span></span>
                                  {e.replies.length>0&&<span aria-hidden className={d("border-r border-neutral-900/8 dark:border-neutral-100/8","mt-2 w-px flex-1")} />}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="flex min-h-7 min-w-0 flex-wrap content-center items-baseline gap-x-2">
                                      <p className={d(h,c,"min-w-0 truncate")}>{e.author}</p>
                                      <p className={d(b,x,"flex gap-x-2")}>
                                        <span>{e.role}</span>
                                        <span>{e.time}</span>
                                      </p>
                                    </div>
                                    <button type="button" aria-label={`More actions on ${e.author}'s comment`} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}>
                                      <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
                                    </button>
                                  </div>
                                  <p className={d(b,u,"mt-1")}>{e.body}</p>
                                  <R id={e.id} reactions={e.reactions} />
                                  {e.replies.length>0&&<div className="mt-3 space-y-3">
                                    {e.replies.map(e=>(
                                      <div key={e.id} className="flex gap-2">
                                                          <span aria-hidden className={d(m,"size-[24px]")}><span className={f}>{_(e.author,1)}</span></span>
                                                          <div className="min-w-0 flex-1">
                                                            <div className="flex min-h-6 min-w-0 flex-wrap content-center items-baseline gap-x-2">
                                                              <p className={d(h,c,"min-w-0 truncate")}>{e.author}</p>
                                                              <span className={d(b,x)}>{e.time}</span>
                                                            </div>
                                                            <p className={d(b,u,"mt-0.5")}>{e.body}</p>
                                                          </div>
                                                        </div>
                                    ))}
                                  </div>}
                                </div>
                              </article>
                ))}
              </div>
              <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",z.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",z.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
          <div className={d("relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8","mt-2 p-3")}>
            <label htmlFor="comments-1-draft" className="sr-only">Write a comment</label>
            <textarea id="comments-1-draft" value={j} onChange={e=>y(e.target.value)} rows={2} placeholder="Write a comment" className={d("max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66","field-sizing-content min-h-12 w-full")} />
            <div className="mt-2 flex items-center justify-between gap-3 ps-1.5">
              <p className={d(b,x,"truncate")}>Mention a teammate with @ to notify them.</p>
              <button type="button" disabled={0===j.trim().length} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",p)}>Comment</button>
            </div>
          </div>
        </div>
      </div>
  );
}


export default w;
