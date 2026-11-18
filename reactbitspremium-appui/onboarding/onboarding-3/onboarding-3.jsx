/**
 * React Bits Pro — Application UI (onboarding-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let s = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "text-[13px]/[18px] font-normal",
  u = s(c,d,"line-clamp-2"),
  b = [{id:"profile",title:"Complete your profile",blurb:"A name and photo make review threads easier to follow.",action:"Edit profile"},{id:"workspace",title:"Name your workspace",blurb:"Appears in invitations and in everyone's sidebar.",action:"Rename"},{id:"import",title:"Import your first project",blurb:"Bring in a CSV or connect an existing tracker.",action:"Start import"},{id:"invite",title:"Invite two teammates",blurb:"Workspaces with three or more people get shared views.",action:"Send invites"},{id:"integration",title:"Connect your repository",blurb:"Link branches and pull requests to the work that opened them.",action:"Connect"},{id:"notifications",title:"Choose how you're notified",blurb:"Pick the events worth interrupting you for.",action:"Open settings"}];

function x(){
  let[e,r]=useState(()=>new Set(["profile","workspace"])),a=Math.round(e.size/b.length*100);
  return (
    <div className={s("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative h-full min-h-[640px] w-full overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-2xl">
          <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Get set up</h2>
          <p className={s(c,"text-neutral-900/80 dark:text-neutral-100/80","mt-1.5")}>Six things that take about ten minutes and make everything after them easier.</p>
          <div className="mt-5 flex items-center gap-3">
            <div role="progressbar" aria-valuenow={a} aria-valuemin={0} aria-valuemax={100} aria-label="Setup progress" className={s("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","min-w-0 flex-1")}>
              <div style={{width:`${a}%`}} className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" />
            </div>
            <p className={s("text-[12px]/[16px] font-normal tabular-nums",d,"shrink-0")}>
              {e.size}
              {" of "}
              {b.length}
              {" done"}
            </p>
          </div>
          <ul className={s("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-5")}>
            {b.map(a=>{
              let l=e.has(a.id);
              return (
                <li key={a.id} className={s("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","px-4 py-3")}>
                            <span className={s("relative inline-flex size-4 shrink-0 items-center justify-center","size-5")}>
                              <input type="checkbox" checked={l} onChange={()=>{
                                let e;
                                return e=a.id,r(r=>{
                                  let a=new Set(r);
                                  return a.has(e)?a.delete(e):a.add(e),a;
                                });
                              }} aria-label={`Mark ${a.title} complete`} className={s("peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40","size-5")} />
                              <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                            </span>
                            <div className={s("flex min-w-0 flex-1 flex-col gap-0.5","max-sm:basis-[calc(100%-2rem)]")}>
                              <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className={s("truncate",l&&s(d,"line-through"))}>{a.title}</span></p>
                              <p data-description className={l?u:"line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80"}>{a.blurb}</p>
                            </div>
                            <a href="#" className={s("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]","max-sm:ms-8")}>
                              {a.action}
                              <HugeiconsIcon icon={Icon_1497} size={14} strokeWidth={1.8} aria-hidden="true" />
                            </a>
                          </li>
              );
            })}
          </ul>
          <p className={s(c,d,"mt-4")}>You can leave this and come back to it from the workspace menu.</p>
        </div>
      </div>
  );
}


export default x;
