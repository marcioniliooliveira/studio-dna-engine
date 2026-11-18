/**
 * React Bits Pro — Application UI (mobile-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { badge, icon, id, label, useId, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_17384 = [["path",{d:"M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_2139 = [["path",{d:"M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 7H20",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let h = (...e)=>e.filter(Boolean).join(" ");

let m = "bg-white dark:bg-neutral-950";

let k = "hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6";

let f = "rounded-[var(--rb-r-4xl,18px)]";

let v = "text-neutral-900 dark:text-neutral-100";

let g = "text-neutral-900/78 dark:text-neutral-100/78";

let w = "text-neutral-900/62 dark:text-neutral-100/62";

let y = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let j = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]";

let N = h(f,j,y);

let A = {type:"spring",bounce:0,duration:.35};

let z = [.2,0,0,1];

let C = [{id:"home",label:"Home",icon:Icon_17384,badge:0},{id:"search",label:"Search",icon:Icon_66575,badge:0},{id:"activity",label:"Activity",icon:Icon_13473,badge:3},{id:"saved",label:"Saved",icon:Icon_2139,badge:0},{id:"profile",label:"You",icon:Icon_34951,badge:0}];

let S = {home:{title:"Today",caption:"4 updates since you last looked",rows:[{title:"Northwind renewed for 12 months",meta:["Deals","8m ago"]},{title:"Weekly summary is ready",meta:["Reports","40m ago"]},{title:"Cedar Labs opened a ticket",meta:["Support","1h ago"]},{title:"Payout of $4,120 settled",meta:["Billing","3h ago"]},{title:"Harbor Coffee added two seats",meta:["Accounts","5h ago"]},{title:"Two invoices moved to overdue",meta:["Billing","6h ago"]},{title:"Meridian pilot enters week three",meta:["Deals","9h ago"]}]},search:{title:"Recent searches",caption:"Tap a term to run it again",rows:[{title:"invoices status:overdue",meta:["Saved filter"]},{title:"Meridian",meta:["Account"]},{title:"renewal Q3",meta:["12 results"]},{title:"owner:me updated:7d",meta:["Saved filter"]},{title:"Cedar Labs",meta:["Account"]},{title:"seats > 20",meta:["31 results"]},{title:"payout july",meta:["6 results"]}]},activity:{title:"Activity",caption:"3 items need a reply",rows:[{title:"Priya mentioned you on Deal 4192",meta:["Needs reply","12m"]},{title:"Approval requested: refund $240",meta:["Needs reply","55m"]},{title:"Ana assigned you a ticket",meta:["Needs reply","2h"]},{title:"Import finished with 2 warnings",meta:["System","4h"]},{title:"Deal 4188 moved to Contract sent",meta:["System","5h"]},{title:"Marco left a note on Alder Group",meta:["System","7h"]},{title:"Weekly export delivered",meta:["System","9h"]}]},saved:{title:"Saved",caption:"Pinned records and views",rows:[{title:"Enterprise pipeline",meta:["View","34 records"]},{title:"Alder Group",meta:["Account"]},{title:"Churn risk this month",meta:["View","9 records"]},{title:"Northwind Supply",meta:["Account"]},{title:"Invoices awaiting approval",meta:["View","6 records"]},{title:"Q3 renewal calls",meta:["View","18 records"]},{title:"Harbor Coffee",meta:["Account"]}]},profile:{title:"Ana Reyes",caption:"Operations, Meridian workspace",rows:[{title:"Notifications",meta:["Push, email"]},{title:"Appearance",meta:["Match system"]},{title:"Connected accounts",meta:["2 linked"]},{title:"Language and region",meta:["English","UTC+1"]},{title:"Offline data",meta:["Sync on Wi-Fi"]},{title:"Privacy",meta:["Reviewed in June"]},{title:"Sign out",meta:[]}]}};


export default function mobile_1__Sorbet__Component(){
  let e=useReducedMotion(),a=useId(),[t,c]=useState("home"),d=S[t];
  return (
    <div className={h(m,v,"relative flex h-full min-h-[680px] w-full justify-center overflow-hidden p-5")}>
        <div className={h("border border-transparent ring-1 ring-[rgb(84_62_32/0.1)] dark:ring-neutral-100/12",m,"relative flex h-full w-full max-w-[390px] flex-col overflow-hidden rounded-[28px]")}>
          <header className="flex h-14 shrink-0 items-center justify-between gap-2 px-4">
            <p className={h("text-[17px]/[22px] font-extrabold",v,"min-w-0 truncate")}>Meridian</p>
            <div className="flex shrink-0 items-center gap-1">
              <button type="button" aria-label="Filters" className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-10 rounded-[calc(var(--rb-r-full,999px))]")}>
                <HugeiconsIcon icon={Icon_68656} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
              <span aria-hidden className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
                <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">AR</span>
              </span>
            </div>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={t} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:z}}} transition={{duration:.16*!e,ease:z}}>
                <h2 className={h("text-[26px]/[32px] font-extrabold tracking-[-0.015em]",v)}>{d.title}</h2>
                <p className={h("text-[14px]/[20px] font-medium",g,"mt-1")}>{d.caption}</p>
                <ul className="mt-4 space-y-1">
                  {d.rows.map(e=>(
                    <li key={e.title}>
                                    <button type="button" className={h(f,k,"active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10",j,y,"flex min-h-[56px] w-full min-w-0 cursor-pointer items-center gap-3 px-3 text-left")}>
                                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                        <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.title}</span></span>
                                        {e.meta.length>0?<span data-description className={h("text-[13px]/[16px] font-semibold tabular-nums",w,"flex min-w-0 gap-2")}>
                                          {e.meta.map((e,a)=><span key={e} className={0===a?"shrink-0":"min-w-0 truncate"}>{e}</span>)}
                                        </span>:null}
                                      </span>
                                      <HugeiconsIcon icon={Icon_5042} size={18} strokeWidth={2} aria-hidden="true" className={h(w,"shrink-0")} />
                                    </button>
                                  </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
          <nav aria-label="Primary" role="tablist" onKeyDown={e=>{
            let a=C.findIndex(e=>e.id===t),r=a;
            if("ArrowRight"===e.key)r=(a+1)%C.length;else if("ArrowLeft"===e.key)r=(a-1+C.length)%C.length;else if("Home"===e.key)r=0;else{
              if("End"!==e.key)return;
              r=C.length-1
            }
            e.preventDefault(),c(C[r].id)
          }} className={h("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","relative z-20 flex shrink-0 items-stretch gap-0.5 p-3")}>
            {C.map(i=>{
              let n=id===t;
              return (
                <button key={id} type="button" role="tab" aria-selected={n} tabIndex={n?0:-1} onClick={()=>c(id)} className={h(N,n?v:h(g,k),"relative flex min-h-[48px] flex-1 cursor-pointer flex-col items-center justify-center gap-1 px-1")}>
                            {n&&<motion.span aria-hidden layoutId={`${a}-tab`} transition={e?{duration:0}:A} className={h("bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","absolute inset-0 rounded-[inherit]")} />}
                            <span className="relative">
                              <HugeiconsIcon icon={icon} size={18} strokeWidth={2} aria-hidden="true" className={h(j,n&&!e&&"scale-[1.06]")} />
                              {badge>0&&<span className={h("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.09),0_1px_2px_rgb(84_62_32/0.08)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.55)] dark:bg-neutral-800","absolute -top-1 left-3 h-[16px] min-w-[16px] px-[3px]")}>{badge}</span>}
                            </span>
                            <span className={h("text-[13px]/[16px] font-bold tabular-nums","relative")}>{label}</span>
                          </button>
              );
            })}
          </nav>
        </div>
      </div>
  );
}
