/**
 * React Bits Pro — Application UI (editor-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_97040 = [["path",{d:"M2 12C2 8.25027 2 6.3754 2.95491 5.06107C3.26331 4.6366 3.6366 4.26331 4.06107 3.95491C5.3754 3 7.25027 3 11 3H13C16.7497 3 18.6246 3 19.9389 3.95491C20.3634 4.26331 20.7367 4.6366 21.0451 5.06107C22 6.3754 22 8.25027 22 12C22 15.7497 22 17.6246 21.0451 18.9389C20.7367 19.3634 20.3634 19.7367 19.9389 20.0451C18.6246 21 16.7497 21 13 21H11C7.25027 21 5.3754 21 4.06107 20.0451C3.6366 19.7367 3.26331 19.3634 2.95491 18.9389C2 17.6246 2 15.7497 2 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 3.5L9.5 20.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 7C5 7 5.91421 7 6.5 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M5 11H6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M17 10L15.7735 11.0572C15.2578 11.5016 15 11.7239 15 12C15 12.2761 15.2578 12.4984 15.7735 12.9428L17 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_40279 = [["path",{d:"M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 3L9.5 21",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 7H6M5 10H6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_53889 = [["path",{d:"M9.13432 2.5C6.46805 2.56075 4.9107 2.81456 3.84664 3.87493C2.91537 4.80297 2.60406 6.10756 2.5 8.2M14.8657 2.5C17.532 2.56075 19.0893 2.81456 20.1534 3.87493C21.0846 4.80297 21.3959 6.10756 21.5 8.2M14.8657 21.5C17.532 21.4392 19.0893 21.1854 20.1534 20.1251C21.0846 19.197 21.3959 17.8924 21.5 15.8M9.13432 21.5C6.46805 21.4392 4.9107 21.1854 3.84664 20.1251C2.91537 19.197 2.60406 17.8924 2.5 15.8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  p = u("text-[12px]/[16px] font-normal tabular-nums","text-neutral-900/66 dark:text-neutral-100/66"),
  h = u("text-[24px]/[28px] font-[450] tracking-[-0.015em]",x),
  b = u("text-[20px]/[24px] font-[450] tracking-[-0.015em]",x),
  m = u("text-[16px]/[22px] font-normal tracking-[-0.01em]","text-neutral-900/80 dark:text-neutral-100/80"),
  f = [{id:"overview",level:1,title:"Access ledger",body:["Every permission change in Halcyon is written to an append-only ledger. Each entry records the actor, the resource, the previous value and the reason supplied at the time of the change."]},{id:"immutability",level:2,title:"Immutability",body:["Entries are never edited. A correction is a new entry that supersedes the old one, so the history of a resource can always be replayed exactly as it happened.","This is why the ledger is the only source support quotes from during an incident review."]},{id:"retention",level:2,title:"Retention",body:["Retention follows the workspace plan: ninety days on Team, one year on Scale and seven years on Enterprise. Expired entries are removed by a nightly sweep that itself writes a summary entry."]},{id:"export",level:2,title:"Export",body:["Workspace owners can export the ledger as newline-delimited JSON. Exports are generated asynchronously and expire after 24 hours.","Large workspaces are chunked at one million entries per file so the download survives a flaky connection."]},{id:"api",level:1,title:"Reading the ledger",body:["The read API is cursor paginated and ordered by sequence, not timestamp, because two entries can share a millisecond."]},{id:"filters",level:2,title:"Filters",body:["Filters compose with AND. Filtering by actor and resource together is the common case for support, and both are indexed."]},{id:"limits",level:2,title:"Rate limits",body:["Reads are limited to sixty requests per minute per token. A 429 carries a Retry-After header, and clients should honour it rather than backing off on their own schedule."]}];

function v(){
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
}

function k(){
  let e=useReducedMotion(),[t,r]=useState(true),[k,g]=useState(true),[w,_]=useState("immutability"),{ref:y,edges:j,onScroll:N}=v(),{ref:S,edges:z,onScroll:A}=v();
  return (
    <div className={u("bg-white dark:bg-neutral-950",x,"relative flex h-full min-h-[680px] w-full overflow-hidden")}>
        <motion.aside initial={false} animate={{width:232*!!t}} transition={e?{duration:0}:{duration:.18,ease:[.2,0,0,1]}} className={u("border-r border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","hidden shrink-0 overflow-hidden md:block")}>
          <div className="flex h-full w-[232px] flex-col">
            <div className={u(p,"flex h-[52px] shrink-0 items-center px-4")}>Outline</div>
            <div className="relative min-h-0 flex-1">
              <nav ref={y} onScroll={N} aria-label="Document outline" className="h-full overflow-y-auto px-2 pb-3">
                {f.map(e=>{
                  let t=e.id===w;
                  return <button key={e.id} type="button" onClick={()=>_(e.id)} aria-current={t?"page":undefined} className={u("flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",2===e.level&&"ps-6")}><span className="truncate">{e.title}</span></button>;
                })}
              </nav>
              <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",j.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",j.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={u(p,"shrink-0 px-4 py-3")}>
              <span className="tabular-nums">{f.length}</span>
              {" sections"}
            </div>
          </div>
        </motion.aside>
        <div className={u("bg-neutral-50 dark:bg-neutral-950","flex min-w-0 flex-1 flex-col")}>
          <header className={u("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","flex h-[52px] shrink-0 items-center gap-2 px-3")}>
            <button type="button" onClick={()=>r(e=>!e)} aria-pressed={t} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]","max-md:hidden")}>
              <HugeiconsIcon icon={t?Icon_97040:Icon_40279} size={16} strokeWidth={1.8} aria-hidden="true" />
              <span className="sr-only">Toggle outline</span>
            </button>
            <p className={u("flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","flex-1")}>
              Halcyon handbook
              <span className="text-neutral-900/66 dark:text-neutral-100/66 select-none">/</span>
              <span className="text-neutral-900 dark:text-neutral-100">Access ledger</span>
            </p>
            <button type="button" onClick={()=>g(e=>!e)} aria-pressed={k} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
              <HugeiconsIcon icon={Icon_53889} size={16} strokeWidth={1.8} aria-hidden="true" />
              Focus
            </button>
          </header>
          <div className="flex min-h-0 flex-1 flex-col p-2">
            <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","min-h-0 flex-1")}>
              <div className="relative min-h-0 flex-1">
                <div ref={S} onScroll={A} className="h-full overflow-y-auto px-5 py-8 sm:px-10">
                  <article className="mx-auto max-w-[620px] space-y-6">
                    {f.map(t=>{
                      let r=k&&t.id!==w;
                      return (
                        <motion.section key={t.id} initial={false} animate={{opacity:r?.32:1}} transition={{duration:.16*!e,ease:[.2,0,0,1]}} onClick={()=>_(t.id)} className="cursor-default space-y-3">
                                            {1===t.level?<h2 className={h}>{t.title}</h2>:<h3 className={b}>{t.title}</h3>}
                                            {t.body.map((e,t)=><p key={t} className={m}>{e}</p>)}
                                          </motion.section>
                      );
                    })}
                  </article>
                </div>
                <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",z.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",z.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default k;
