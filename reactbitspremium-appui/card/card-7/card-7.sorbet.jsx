/**
 * React Bits Pro — Application UI (card-7 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_2139 = [["path",{d:"M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 7H20",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];

let J = (...e)=>e.filter(Boolean).join(" ");

let Q = "text-neutral-900 dark:text-neutral-100";

let X = "text-neutral-900/78 dark:text-neutral-100/78";

let Z = "text-neutral-900/62 dark:text-neutral-100/62";

let ee = "text-[13px]/[16px] font-semibold tabular-nums";

let ea = [{id:"2-9",version:"2.9",date:"12 March",title:"Scheduled exports",excerpt:"Any saved view can now run on a schedule and drop a CSV into your warehouse without a manual export step.",author:"Nina S\xf8rensen",initials:"NS",readTime:"3 min read"},{id:"2-8",version:"2.8",date:"27 February",title:"Faster search across long-running workspaces",excerpt:"Search now returns in under 200ms on workspaces with more than a million records, and matches highlight in place.",author:"Dmitri Oyelaran",initials:"DO",readTime:"4 min read"},{id:"2-7",version:"2.7",date:"9 February",title:"Roles you can define yourself",excerpt:"Build a role from individual permissions instead of choosing between admin and member, and apply it per project.",author:"Rita Marchetti",initials:"RM",readTime:"6 min read"},{id:"2-6",version:"2.6",date:"22 January",title:"Comment threads on every record",excerpt:"Discussion moved out of the activity feed and onto the record itself, so context stays where the work happens.",author:"Tomas Alvarez",initials:"TA",readTime:"2 min read"},{id:"2-5",version:"2.5",date:"8 January",title:"Offline drafts",excerpt:"Edits made without a connection are kept locally and merged when you reconnect, with conflicts surfaced inline.",author:"Iris Haddad",initials:"IH",readTime:"5 min read"},{id:"2-4",version:"2.4",date:"18 December",title:"A quieter notification model",excerpt:"Notifications group by project and collapse duplicates, so a busy morning arrives as four items instead of forty.",author:"Nina S\xf8rensen",initials:"NS",readTime:"3 min read"}];


export default function card_7__Sorbet__Component(){
  let[e,a]=useState(()=>new Set(["2-8"]));
  return (
    <div className={J("bg-white dark:bg-neutral-950",Q,"h-full min-h-[600px] w-full overflow-y-auto p-6 sm:p-8")}>
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {ea.map(r=>{
            let t=e.has(r.id);
            return (
              <li key={r.id} className={J("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","h-full p-5")}>
                        <div className="flex items-center justify-between gap-3">
                          <p className={J(ee,Z,"flex gap-2")}>
                            <span>{r.version}</span>
                            <span>{r.date}</span>
                          </p>
                          <button type="button" aria-pressed={t} onClick={()=>{
                            let e;
                            return e=r.id,a(a=>{
                              let r=new Set(a);
                              return r.has(e)?r.delete(e):r.add(e),r;
                            });
                          }} className={J("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-8 rounded-[calc(var(--rb-r-full,999px))]","relative z-10 -mr-1 -mt-1")}>
                            <HugeiconsIcon icon={Icon_2139} size={18} strokeWidth={2} aria-hidden="true" className={J(t&&"[&_path]:fill-current")} />
                            <span className="sr-only">
                              {t?"Remove bookmark from":"Bookmark"}
                              {" "}
                              {r.title}
                            </span>
                          </button>
                        </div>
                        <h3 className={J("text-[17px]/[22px] font-extrabold",Q,"mt-2")}>
                          <a href="#" className={J("min-w-0 truncate outline-none after:absolute after:inset-0 after:rounded-[calc(var(--rb-r-lg,10px))] after:content-[''] focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:after:outline-[var(--rb-accent,oklch(81%_0.16_163))]","whitespace-normal")}>{r.title}</a>
                        </h3>
                        <p className={J("text-[14px]/[20px] font-medium",X,"mt-2 line-clamp-2")}>{r.excerpt}</p>
                        <div className="mt-4 flex items-center gap-2 pt-1">
                          <span aria-hidden="true" className={J("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                            <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{r.initials.charAt(0)}</span>
                          </span>
                          <p className={J(ee,X,"min-w-0 truncate")}>{r.author}</p>
                          <p className={J(ee,Z,"shrink-0")}>{r.readTime}</p>
                        </div>
                      </li>
            );
          })}
        </ul>
      </div>
  );
}
