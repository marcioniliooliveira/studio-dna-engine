/**
 * React Bits Pro — Application UI (support-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_94089 = [["path",{d:"M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L10.5 15L16 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_48094 = [["path",{d:"M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_67358 = [["path",{d:"M12 14.5V17.5M13 14.5C13 15.0523 12.5523 15.5 12 15.5C11.4477 15.5 11 15.0523 11 14.5C11 13.9477 11.4477 13.5 12 13.5C12.5523 13.5 13 13.9477 13 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.5 9V6.5C16.5 4.01472 14.4853 2 12 2C9.51471 2 7.49999 4.01472 7.49999 6.5V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  p = "text-[13px]/[18px] font-normal",
  h = "text-[12px]/[16px] font-normal tabular-nums",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  m = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  f = [{id:"m1",from:"you",name:"You",time:"Mon 09:12",body:"The Monday revenue export landed with headers but no rows. It ran at 06:00 as usual and the run log says it succeeded.",attachment:"export-log-1104.txt"},{id:"m2",from:"agent",name:"Sofia Alvarez",time:"Mon 09:31",body:"Thanks for the log. The job completed against a filter that excluded every row, which is why it reported success. Was the saved view edited on Sunday?",attachment:null},{id:"m3",from:"you",name:"You",time:"Mon 10:04",body:"Yes, someone narrowed the date range to a single day while testing and left it that way.",attachment:null},{id:"m4",from:"agent",name:"Sofia Alvarez",time:"Mon 10:22",body:"That explains it. I have added a warning on scheduled runs that return zero rows, shipping this week. In the meantime the schedule will email you instead of writing an empty file.",attachment:null},{id:"m5",from:"you",name:"You",time:"Mon 11:15",body:"Restored the range and re-ran it, 14,208 rows this time. Is there a way to lock a saved view so a schedule cannot be changed underneath it?",attachment:null},{id:"m6",from:"agent",name:"Sofia Alvarez",time:"Mon 11:40",body:"Yes. Open the view, choose Lock for schedules, and edits then require an admin. I have attached the steps for your workspace.",attachment:"lock-a-saved-view.pdf"}],
  k = [{label:"Opened",value:"Mon 09:12"},{label:"First reply",value:"19m later"},{label:"Assigned to",value:"Sofia Alvarez"},{label:"Last update",value:"Mon 10:22"}];

function v(){
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
}

function g(){
  let[e,r]=useState(""),{ref:a,edges:g,onScroll:w}=v(),{ref:j,edges:y,onScroll:N}=v();
  return (
    <div className={c("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Scheduled export is empty</h2>
              <span className="inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">Awaiting your reply</span>
            </div>
            <p className={c(p,x,"mt-0.5 flex flex-wrap gap-x-3")}>
              <span>Ticket #4192</span>
              <span>Reports and exports</span>
              <span>Normal priority</span>
            </p>
          </div>
          <button type="button" className={c(_,m,"w-fit")}>
            <HugeiconsIcon icon={Icon_94089} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
            Mark resolved
          </button>
        </div>
        <div className="mt-3 flex min-h-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[1fr_240px]">
            <div className="flex min-h-[420px] min-w-0 flex-col gap-2 lg:min-h-0">
              <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","min-h-0 flex-1")}>
                <div className="relative min-h-0 flex-1">
                  <div ref={a} onScroll={w} className="h-full space-y-4 overflow-y-auto p-4">
                    {f.map(e=>{
                      let r="you"===e.from;
                      return (
                        <article key={e.id} className="flex gap-3">
                                            <span aria-hidden="true" className={c("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[28px]")}>
                                              <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{r?"Y":"SA"}</span>
                                            </span>
                                            <div className="min-w-0 flex-1">
                                              <div className="flex items-baseline gap-2">
                                                <span className="text-[14px]/[16px] font-[450]">{e.name}</span>
                                                {!r&&<span className={c(h,x)}>Support</span>}
                                                <span className={c(h,x,"ml-auto shrink-0")}>{e.time}</span>
                                              </div>
                                              <p className={c(p,u,"mt-1")}>{e.body}</p>
                                              {e.attachment&&<span className={c("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","mt-2")}>
                                                <HugeiconsIcon icon={Icon_48094} size={12} strokeWidth={1.8} aria-hidden="true" />
                                                {e.attachment}
                                              </span>}
                                            </div>
                                          </article>
                      );
                    })}
                  </div>
                  <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",g.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",g.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
              <div className="relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8">
                <label htmlFor="support-3-reply" className="sr-only">Write a reply</label>
                <div className="flex min-w-0 items-end gap-1 p-2">
                  <textarea id="support-3-reply" value={e} onChange={e=>r(e.target.value)} rows={2} placeholder="Reply to Sofia" className={c("max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66","field-sizing-content min-h-12")} />
                </div>
                <div className="flex items-center justify-between gap-2 px-2 pb-2">
                  <button type="button" aria-label="Attach a file" className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}>
                    <HugeiconsIcon icon={Icon_48094} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  <button type="button" disabled={0===e.trim().length} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>
                    <HugeiconsIcon icon={Icon_55410} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                    Send reply
                  </button>
                </div>
              </div>
            </div>
            <div className="relative min-h-0">
              <aside ref={j} onScroll={N} className="flex max-h-[200px] flex-col gap-1 overflow-y-auto lg:max-h-none lg:overflow-visible">
                <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
                  <div className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",b,"mt-1")}>
                    <div className="pt-3">
                      <p className={c(h,x,"px-3")}>Timeline</p>
                      <dl className={c(b,"mt-1")}>
                        {k.map(e=>(
                          <div key={e.label} className="flex min-h-10 items-center justify-between gap-4 px-3 py-2">
                                                <dt className="min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66">{e.label}</dt>
                                                <dd className={c("flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","justify-end text-right")}>{e.value}</dd>
                                              </div>
                        ))}
                      </dl>
                    </div>
                    <div className="p-3">
                      <p className={c(h,x)}>Related article</p>
                      <p className={c(p,"mt-2")}>Why a scheduled export can succeed with zero rows</p>
                      <button type="button" className={c(_,m,"mt-3")}>Open article</button>
                    </div>
                    <div className="flex items-start gap-2 p-3">
                      <HugeiconsIcon icon={Icon_67358} size={14} strokeWidth={1.8} aria-hidden="true" className={c(x,"mt-0.5 shrink-0")} />
                      <p className={c(p,u)}>Only workspace admins and the assigned agent can read this thread.</p>
                    </div>
                  </div>
                </div>
              </aside>
              <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",y.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",y.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
      </div>
  );
}


export default g;
