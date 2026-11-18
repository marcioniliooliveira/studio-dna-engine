/**
 * React Bits Pro — Application UI (support-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let ej = (...e)=>e.filter(Boolean).join(" ");

let ey = "text-neutral-900/62 dark:text-neutral-100/62";

let eN = "text-[14px]/[20px] font-medium";

let eC = "inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums";

let eL = {Open:ej(eC,"text-neutral-900 dark:text-neutral-100"),"Waiting on you":"inline-flex h-7 shrink-0 items-center whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] bg-white px-3 text-[14px]/[18px] font-bold tabular-nums text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.09),0_1px_2px_rgb(84_62_32/0.08)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.55)] dark:bg-neutral-800",Resolved:ej(eC,"text-neutral-900/78 dark:text-neutral-100/78")};

let ez = [{id:"4192",subject:"Scheduled export is empty",area:"Reports and exports",status:"Waiting on you",agent:"Sofia Alvarez",updated:"22m ago",replies:4},{id:"4188",subject:"SAML metadata upload fails validation",area:"Accounts and access",status:"Open",agent:"Marcus Bell",updated:"3h ago",replies:7},{id:"4171",subject:"Two invoices issued for March",area:"Billing and plans",status:"Open",agent:"Wei Chen",updated:"Yesterday",replies:2},{id:"4150",subject:"Webhook retries stop after one failure",area:"Integrations",status:"Resolved",agent:"Sofia Alvarez",updated:"4 Aug",replies:11},{id:"4133",subject:"Seat count did not drop after removing a user",area:"Billing and plans",status:"Resolved",agent:"Amelia Whitfield",updated:"1 Aug",replies:3},{id:"4110",subject:"Dashboard filter resets between tabs",area:"Dashboards",status:"Resolved",agent:"Marcus Bell",updated:"28 Jul",replies:5}];

let eW = ["All","Open","Resolved"];


export default function support_5__Sorbet__Component(){
  let[e,r]=useState("All"),{ref:a,edges:l,onScroll:i}=function(e){
    let r=useRef(null),[a,t]=useState({start:false,end:false}),n=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:a,scrollHeight:o,clientHeight:n}=e;
      t({start:a>1,end:Math.ceil(a+n)<o-1})
    }, []);
    return useEffect(()=>{
      n();
      let e=r.current,a=e?.ownerDocument.defaultView;
      if(!e||!a?.ResizeObserver)return;
      let t=new a.ResizeObserver(n);
      return t.observe(e),()=>t.disconnect();
    }, [n,e]),{ref:r,edges:a,onScroll:n};
  }(e),s=useMemo(()=>"Open"===e?ez.filter(e=>"Resolved"!==e.status):"Resolved"===e?ez.filter(e=>"Resolved"===e.status):ez, [e]),c={open:ez.filter(e=>"Resolved"!==e.status).length,waiting:ez.filter(e=>"Waiting on you"===e.status).length};
  return (
    <div className={ej("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className="mx-auto flex w-full max-w-[860px] min-h-0 flex-1 flex-col">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-[17px]/[22px] font-extrabold">Your requests</h2>
              <p className={ej(eN,ey,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>
                  {c.open}
                  {" open"}
                </span>
                <span>
                  {c.waiting}
                  {" waiting on your reply"}
                </span>
              </p>
            </div>
            <button type="button" className={ej("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","w-fit")}>
              <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
              New request
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div role="radiogroup" aria-label="Filter requests" className={ej("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10")}>
              {eW.map(a=>{
                let o=e===a;
                return <button key={a} type="button" role="radio" aria-checked={o} onClick={()=>r(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{a}</button>;
              })}
            </div>
            <div className={ej("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10","sm:w-[272px]")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <input id="support-5-search" type="search" placeholder="Search by subject or number" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
              <label htmlFor="support-5-search" className="sr-only">Search your requests</label>
            </div>
          </div>
          <div className={ej("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","mt-3 flex min-h-0 flex-1 flex-col")}>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className={ej("text-[13px]/[16px] font-semibold tabular-nums",ey,"border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","hidden h-8 items-center gap-3 px-4 sm:flex")}>
                <span className="w-14 shrink-0">Ticket</span>
                <span className="min-w-0 flex-1">Subject</span>
                <span className="w-32 shrink-0">Status</span>
                <span className="w-24 shrink-0 text-right">Updated</span>
                <span className="w-4 shrink-0" aria-hidden />
              </div>
              <div className="relative min-h-0 flex-1">
                <ul ref={a} onScroll={i} className={ej("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","h-full overflow-y-auto")}>
                  {s.map(e=>(
                    <li key={e.id}>
                                    <button type="button" className={ej("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","flex-col items-stretch px-4 sm:flex-row sm:items-center")}>
                                      <span className={ej("font-mono text-[12px]/[16px] tabular-nums",ey,"w-14 shrink-0")}>
                                        #
                                        {e.id}
                                      </span>
                                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                        <span className={ej("text-[15px]/[20px] font-bold","block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]")}>{e.subject}</span>
                                        <span data-description className={ej(eN,ey,"flex flex-wrap gap-x-3")}>
                                          <span>{e.area}</span>
                                          <span>{e.agent}</span>
                                          <span>
                                            {e.replies}
                                            {" replies"}
                                          </span>
                                        </span>
                                      </span>
                                      <span className="w-32 shrink-0"><span className={eL[e.status]}>{e.status}</span></span>
                                      <span className={ej("shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","w-24 sm:text-right")}>{e.updated}</span>
                                      <HugeiconsIcon icon={Icon_5042} size={18} strokeWidth={2} aria-hidden="true" className={ej(ey,"hidden shrink-0 sm:block")} />
                                    </button>
                                  </li>
                  ))}
                </ul>
                <div aria-hidden="true" className={ej("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 top-0 h-8",l.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={ej("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 bottom-0 h-8",l.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
          </div>
          <p className={ej(eN,ey,"mt-3 px-1")}>Resolved requests stay readable for 12 months. Replying to one reopens it.</p>
        </div>
      </div>
  );
}
