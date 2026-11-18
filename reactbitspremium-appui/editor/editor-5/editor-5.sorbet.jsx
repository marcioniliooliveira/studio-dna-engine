/**
 * React Bits Pro — Application UI (editor-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_97040 = [["path",{d:"M2 12C2 8.25027 2 6.3754 2.95491 5.06107C3.26331 4.6366 3.6366 4.26331 4.06107 3.95491C5.3754 3 7.25027 3 11 3H13C16.7497 3 18.6246 3 19.9389 3.95491C20.3634 4.26331 20.7367 4.6366 21.0451 5.06107C22 6.3754 22 8.25027 22 12C22 15.7497 22 17.6246 21.0451 18.9389C20.7367 19.3634 20.3634 19.7367 19.9389 20.0451C18.6246 21 16.7497 21 13 21H11C7.25027 21 5.3754 21 4.06107 20.0451C3.6366 19.7367 3.26331 19.3634 2.95491 18.9389C2 17.6246 2 15.7497 2 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 3.5L9.5 20.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 7C5 7 5.91421 7 6.5 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M5 11H6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M17 10L15.7735 11.0572C15.2578 11.5016 15 11.7239 15 12C15 12.2761 15.2578 12.4984 15.7735 12.9428L17 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_40279 = [["path",{d:"M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 3L9.5 21",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 7H6M5 10H6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_53889 = [["path",{d:"M9.13432 2.5C6.46805 2.56075 4.9107 2.81456 3.84664 3.87493C2.91537 4.80297 2.60406 6.10756 2.5 8.2M14.8657 2.5C17.532 2.56075 19.0893 2.81456 20.1534 3.87493C21.0846 4.80297 21.3959 6.10756 21.5 8.2M14.8657 21.5C17.532 21.4392 19.0893 21.1854 20.1534 20.1251C21.0846 19.197 21.3959 17.8924 21.5 15.8M9.13432 21.5C6.46805 21.4392 4.9107 21.1854 3.84664 20.1251C2.91537 19.197 2.60406 17.8924 2.5 15.8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let eH = (...e)=>e.filter(Boolean).join(" ");

let eq = "text-neutral-900 dark:text-neutral-100";

let eF = eH("text-[13px]/[16px] font-semibold tabular-nums","text-neutral-900/62 dark:text-neutral-100/62");

let eV = eH("text-[26px]/[32px] font-extrabold tracking-[-0.015em]",eq);

let eK = eH("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",eq);

let eJ = eH("text-[17px]/[26px] font-medium","text-neutral-900/78 dark:text-neutral-100/78");

let eQ = [{id:"overview",level:1,title:"Access ledger",body:["Every permission change in Halcyon is written to an append-only ledger. Each entry records the actor, the resource, the previous value and the reason supplied at the time of the change."]},{id:"immutability",level:2,title:"Immutability",body:["Entries are never edited. A correction is a new entry that supersedes the old one, so the history of a resource can always be replayed exactly as it happened.","This is why the ledger is the only source support quotes from during an incident review."]},{id:"retention",level:2,title:"Retention",body:["Retention follows the workspace plan: ninety days on Team, one year on Scale and seven years on Enterprise. Expired entries are removed by a nightly sweep that itself writes a summary entry."]},{id:"export",level:2,title:"Export",body:["Workspace owners can export the ledger as newline-delimited JSON. Exports are generated asynchronously and expire after 24 hours.","Large workspaces are chunked at one million entries per file so the download survives a flaky connection."]},{id:"api",level:1,title:"Reading the ledger",body:["The read API is cursor paginated and ordered by sequence, not timestamp, because two entries can share a millisecond."]},{id:"filters",level:2,title:"Filters",body:["Filters compose with AND. Filtering by actor and resource together is the common case for support, and both are indexed."]},{id:"limits",level:2,title:"Rate limits",body:["Reads are limited to sixty requests per minute per token. A 429 carries a Retry-After header, and clients should honour it rather than backing off on their own schedule."]}];

function eG(){
  let e=useRef(null),[r,t]=useState({start:false,end:false}),a=useCallback(()=>{
    let r=e.current;
    if(!r)return;
    let{scrollTop:a,scrollHeight:n,clientHeight:i}=r;
    t({start:a>1,end:Math.ceil(a+i)<n-1})
  }, []);
  return useEffect(()=>{
    a();
    let r=e.current,t=r?.ownerDocument.defaultView;
    if(!r||!t?.ResizeObserver)return;
    let n=new t.ResizeObserver(a);
    return observe(r),()=>disconnect();
  }, [a]),{ref:e,edges:r,onScroll:a};
}


export default function editor_5__Sorbet__Component(){
  let e=useReducedMotion(),[r,t]=useState(true),[l,c]=useState(true),[d,_]=useState("immutability"),{ref:x,edges:u,onScroll:b}=eG(),{ref:p,edges:h,onScroll:m}=eG();
  return (
    <div className={eH("bg-white dark:bg-neutral-950",eq,"relative flex h-full min-h-[680px] w-full overflow-hidden")}>
        <motion.aside initial={false} animate={{width:232*!!r}} transition={e?{duration:0}:{duration:.18,ease:[.2,0,0,1]}} className={eH("border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","hidden shrink-0 overflow-hidden md:block")}>
          <div className="flex h-full w-[232px] flex-col">
            <div className={eH(eF,"flex h-[52px] shrink-0 items-center px-4")}>Outline</div>
            <div className="relative min-h-0 flex-1">
              <nav ref={x} onScroll={b} aria-label="Document outline" className="h-full overflow-y-auto px-2 pb-3">
                {eQ.map(e=>{
                  let r=e.id===d;
                  return <button key={e.id} type="button" onClick={()=>_(e.id)} aria-current={r?"page":undefined} className={eH("flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]",2===e.level&&"ps-6")}><span className="truncate">{e.title}</span></button>;
                })}
              </nav>
              <div aria-hidden="true" className={eH("bg-linear-to-b from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={eH("bg-linear-to-t from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={eH(eF,"shrink-0 px-4 py-3")}>
              <span className="tabular-nums">{eQ.length}</span>
              {" sections"}
            </div>
          </div>
        </motion.aside>
        <div className={eH("bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex min-w-0 flex-1 flex-col")}>
          <header className={eH("border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex h-[52px] shrink-0 items-center gap-2 px-3")}>
            <button type="button" onClick={()=>t(e=>!e)} aria-pressed={r} className={eH("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-8 rounded-[calc(var(--rb-r-full,999px))]","max-md:hidden")}>
              <HugeiconsIcon icon={r?Icon_97040:Icon_40279} size={18} strokeWidth={2} aria-hidden="true" />
              <span className="sr-only">Toggle outline</span>
            </button>
            <p className={eH("flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[15px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78","flex-1")}>
              Halcyon handbook
              <span className="text-neutral-900/62 dark:text-neutral-100/62 select-none">/</span>
              <span className="font-bold text-neutral-900 dark:text-neutral-100">Access ledger</span>
            </p>
            <button type="button" onClick={()=>c(e=>!e)} aria-pressed={l} className="relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40">
              <HugeiconsIcon icon={Icon_53889} size={18} strokeWidth={2} aria-hidden="true" />
              Focus
            </button>
          </header>
          <div className="flex min-h-0 flex-1 flex-col p-2">
            <div className={eH("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","min-h-0 flex-1")}>
              <div className="relative min-h-0 flex-1">
                <div ref={p} onScroll={m} className="h-full overflow-y-auto px-5 py-8 sm:px-10">
                  <article className="mx-auto max-w-[620px] space-y-6">
                    {eQ.map(r=>{
                      let t=l&&r.id!==d;
                      return (
                        <motion.section key={r.id} initial={false} animate={{opacity:t?.32:1}} transition={{duration:.16*!e,ease:[.2,0,0,1]}} onClick={()=>_(r.id)} className="cursor-default space-y-3">
                                            {1===r.level?<h2 className={eV}>{r.title}</h2>:<h3 className={eK}>{r.title}</h3>}
                                            {r.body.map((e,r)=><p key={r} className={eJ}>{e}</p>)}
                                          </motion.section>
                      );
                    })}
                  </article>
                </div>
                <div aria-hidden="true" className={eH("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 top-0 h-8",h.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={eH("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 bottom-0 h-8",h.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
