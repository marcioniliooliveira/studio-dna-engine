/**
 * React Bits Pro — Application UI (card-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_2139 = [["path",{d:"M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 7H20",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];

let s = (...e)=>e.filter(Boolean).join(" "),
  o = "text-neutral-900 dark:text-neutral-100",
  d = "text-neutral-900/80 dark:text-neutral-100/80",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "text-[12px]/[16px] font-normal tabular-nums",
  x = [{id:"2-9",version:"2.9",date:"12 March",title:"Scheduled exports",excerpt:"Any saved view can now run on a schedule and drop a CSV into your warehouse without a manual export step.",author:"Nina S\xf8rensen",initials:"NS",readTime:"3 min read"},{id:"2-8",version:"2.8",date:"27 February",title:"Faster search across long-running workspaces",excerpt:"Search now returns in under 200ms on workspaces with more than a million records, and matches highlight in place.",author:"Dmitri Oyelaran",initials:"DO",readTime:"4 min read"},{id:"2-7",version:"2.7",date:"9 February",title:"Roles you can define yourself",excerpt:"Build a role from individual permissions instead of choosing between admin and member, and apply it per project.",author:"Rita Marchetti",initials:"RM",readTime:"6 min read"},{id:"2-6",version:"2.6",date:"22 January",title:"Comment threads on every record",excerpt:"Discussion moved out of the activity feed and onto the record itself, so context stays where the work happens.",author:"Tomas Alvarez",initials:"TA",readTime:"2 min read"},{id:"2-5",version:"2.5",date:"8 January",title:"Offline drafts",excerpt:"Edits made without a connection are kept locally and merged when you reconnect, with conflicts surfaced inline.",author:"Iris Haddad",initials:"IH",readTime:"5 min read"},{id:"2-4",version:"2.4",date:"18 December",title:"A quieter notification model",excerpt:"Notifications group by project and collapse duplicates, so a busy morning arrives as four items instead of forty.",author:"Nina S\xf8rensen",initials:"NS",readTime:"3 min read"}];

function b(){
  let[e,r]=useState(()=>new Set(["2-8"]));
  return (
    <div className={s("bg-white dark:bg-neutral-950",o,"h-full min-h-[560px] w-full overflow-y-auto p-6 sm:p-8")}>
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {x.map(a=>{
            let l=e.has(a.id);
            return (
              <li key={a.id} className={s("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","h-full p-5")}>
                        <div className="flex items-center justify-between gap-3">
                          <p className={s(u,c,"flex gap-2")}>
                            <span>{a.version}</span>
                            <span>{a.date}</span>
                          </p>
                          <button type="button" aria-pressed={l} onClick={()=>{
                            let e;
                            return e=a.id,r(r=>{
                              let a=new Set(r);
                              return a.has(e)?a.delete(e):a.add(e),a;
                            });
                          }} className={s("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]","relative z-10 -mr-1 -mt-1")}>
                            <HugeiconsIcon icon={Icon_2139} size={16} strokeWidth={1.8} aria-hidden="true" className={s(l&&"[&_path]:fill-current")} />
                            <span className="sr-only">
                              {l?"Remove bookmark from":"Bookmark"}
                              {" "}
                              {a.title}
                            </span>
                          </button>
                        </div>
                        <h3 className={s("text-[16px]/[20px] font-[450] tracking-[-0.015em]",o,"mt-2")}>
                          <a href="#" className={s("min-w-0 truncate outline-none after:absolute after:inset-0 after:rounded-[var(--rb-r-sm,6px)] after:content-[''] focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:after:outline-[var(--rb-accent,oklch(100%_0_0))]","whitespace-normal")}>{a.title}</a>
                        </h3>
                        <p className={s("text-[13px]/[18px] font-normal",d,"mt-2 line-clamp-2")}>{a.excerpt}</p>
                        <div className="mt-4 flex items-center gap-2 pt-1">
                          <span aria-hidden="true" className={s("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                            <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{a.initials.charAt(0)}</span>
                          </span>
                          <p className={s(u,d,"min-w-0 truncate")}>{a.author}</p>
                          <p className={s(u,c,"shrink-0")}>{a.readTime}</p>
                        </div>
                      </li>
            );
          })}
        </ul>
      </div>
  );
}


export default b;
