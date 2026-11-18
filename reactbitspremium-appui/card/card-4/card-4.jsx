/**
 * React Bits Pro — Application UI (card-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_87924 = [["path",{d:"M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "text-[12px]/[16px] font-normal tabular-nums",
  x = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  b = "relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40",
  p = [{id:"roadmap",title:"Roadmap review",day:"14",weekday:"Mon",window:"09:30 – 10:15",place:"Studio A",invited:7},{id:"standup",title:"Platform standup",day:"14",weekday:"Mon",window:"11:00 – 11:15",place:"Video call",invited:8},{id:"design",title:"Design critique",day:"14",weekday:"Mon",window:"14:00 – 15:00",place:"Studio B",invited:4},{id:"pricing",title:"Pricing working group",day:"15",weekday:"Tue",window:"10:00 – 10:50",place:"Video call",invited:5},{id:"retro",title:"Sprint retrospective",day:"17",weekday:"Thu",window:"16:00 – 16:45",place:"Studio A",invited:8},{id:"onsite",title:"Customer onsite prep",day:"18",weekday:"Fri",window:"08:30 – 09:00",place:"Video call",invited:2}];

function _(){
  let[e,r]=useState({roadmap:"going"}),a=(e,a)=>r(r=>({...r,[e]:r[e]===a?null:a}));
  return (
    <div className={o("bg-white dark:bg-neutral-950",d,"h-full min-h-[560px] w-full overflow-y-auto p-6 sm:p-8")}>
        <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {p.map(r=>{
            let l=e[r.id]??null,p="going"===l;
            return (
              <li key={r.id} className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","grid grid-cols-[auto_1fr]")}>
                        <div className="row-span-2 flex w-16 flex-col items-center justify-center">
                          <span className={o("text-[20px]/[24px] font-[450] tracking-[-0.015em]",d,"tabular-nums")}>{r.day}</span>
                          <span className={o(u,c,"mt-1")}>{r.weekday}</span>
                        </div>
                        <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","mt-1 px-4 py-3")}>
                          <p className={o("text-[14px]/[16px] font-[450]",d,"truncate")}>{r.title}</p>
                          <p className={o(u,c,"mt-1 flex flex-wrap items-center gap-x-3 gap-y-1")}>
                            <span className="tabular-nums">{r.window}</span>
                            <span className="inline-flex items-center gap-1.5">
                              <HugeiconsIcon icon={Icon_87924} size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                              {r.place}
                            </span>
                            <span className="inline-flex items-center gap-1.5 tabular-nums">
                              <HugeiconsIcon icon={Icon_88366} size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                              {r.invited}
                            </span>
                          </p>
                        </div>
                        <div className="mx-1 mt-1 mb-1 flex gap-1">
                          <button type="button" aria-pressed={p} onClick={()=>a(r.id,"going")} className={o(p?"relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none":b,x,"flex-1 justify-center")}>
                            Going
                            <span className="sr-only">
                              {" to "}
                              {r.title}
                            </span>
                          </button>
                          <button type="button" aria-pressed={"declined"===l} onClick={()=>a(r.id,"declined")} className={o(b,x,"flex-1 justify-center")}>
                            Decline
                            <span className="sr-only">
                              {" "}
                              {r.title}
                            </span>
                          </button>
                        </div>
                      </li>
            );
          })}
        </ul>
      </div>
  );
}


export default _;
