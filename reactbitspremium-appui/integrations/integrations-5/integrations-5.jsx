/**
 * React Bits Pro — Application UI (integrations-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_67358 = [["path",{d:"M12 14.5V17.5M13 14.5C13 15.0523 12.5523 15.5 12 15.5C11.4477 15.5 11 15.0523 11 14.5C11 13.9477 11.4477 13.5 12 13.5C12.5523 13.5 13 13.9477 13 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.5 9V6.5C16.5 4.01472 14.4853 2 12 2C9.51471 2 7.49999 4.01472 7.49999 6.5V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  h = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-[var(--rb-r-sm,6px)] select-none",
  m = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  _ = "text-neutral-900/66 dark:text-neutral-100/66",
  k = "text-[20px]/[24px] font-[450] tracking-[-0.015em]",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  v = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  g = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  w = p("text-[13px]/[18px] font-normal",_),
  j = p("text-[12px]/[16px] font-normal tabular-nums",_),
  y = [{id:"profile",label:"Read your profile",detail:"Name, email address and avatar."},{id:"projects",label:"Read your projects",detail:"Names, settings and member lists for 6 projects."},{id:"deploys",label:"Trigger deploys",detail:"Start a deploy on your behalf and read its result."}],
  N = [{id:"w1",name:"Halcyon",role:"Owner",seats:24},{id:"w2",name:"Halcyon Labs",role:"Admin",seats:6},{id:"w3",name:"Personal",role:"Owner",seats:1}];

function z(){
  let e=useReducedMotion(),[r,a]=useState(N[0]),[z,A]=useState(false),[S,C]=useState("idle");
  useEffect(()=>{
    if("working"!==S)return;
    let e=window.setTimeout(()=>C("done"),1100);
    return ()=>window.clearTimeout(e);
  }, [S]);
  let R={initial:!e&&{opacity:0},animate:{opacity:1,transition:{duration:.18,ease:[.2,0,0,1]}},exit:e?undefined:{opacity:0,transition:{duration:.12,ease:[.2,0,0,1]}}};
  return (
    <div className={p("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[680px] w-full items-center-safe justify-center overflow-y-auto py-8")}>
        <div className="w-full max-w-[452px] px-4">
          <AnimatePresence mode="wait" initial={false}>
            {"done"===S?<motion.div key={"done"} {...R} className={p(g,"p-6 text-center")}>
              <span aria-hidden="true" className={p("text-neutral-900/80 dark:text-neutral-100/80","mx-auto inline-flex h-11 w-11 items-center justify-center")}><HugeiconsIcon icon={Icon_90987} size={20} strokeWidth={1.8} /></span>
              <h2 className={p(k,"mt-3.5")}>Northwind is connected</h2>
              <p className={p(w,"mt-1.5")}>
                You can close this window. Access can be revoked at any time from workspace settings.
              </p>
              <button type="button" onClick={()=>C("idle")} className={p(f,v,"mt-5 w-full")}>Back to review</button>
            </motion.div>:<motion.div key={"consent"} {...R} className={p(g,"p-6")}>
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden="true" className={p(h,"size-10")}><span className={m}>NW</span></span>
                <span aria-hidden="true" className={p(_,"flex items-center gap-1 px-1")}>
                  <span className="size-1 bg-current" />
                  <span className="size-1 bg-current" />
                  <span className="size-1 bg-current" />
                </span>
                <span aria-hidden="true" className={p("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","text-[12px]/[16px] font-[450] tabular-nums","size-10")}>HL</span>
              </div>
              <h2 className={p(k,"mt-4 text-center")}>Northwind wants access to your Halcyon workspace</h2>
              <p className={p(w,"mt-1.5 text-center")}>Review what Northwind will be able to do before you continue.</p>
              <div className="relative mt-5">
                <label htmlFor="consent-workspace" className="flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Workspace</label>
                <button id="consent-workspace" type="button" aria-haspopup="listbox" aria-expanded={z} onClick={()=>A(e=>!e)} className={p("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","mt-2 w-full")}>
                  <span aria-hidden="true" className={p(h,"size-[24px]")}><span className={m}>{r.name.slice(0,2).toUpperCase()}</span></span>
                  <span className="min-w-0 flex-1"><span className="block truncate">{r.name}</span></span>
                  <span className={p(j,"shrink-0")}>{r.role}</span>
                  <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
                </button>
                <AnimatePresence>
                  {z&&<motion.ul role="listbox" initial={!e&&{opacity:0}} animate={{opacity:1,transition:{duration:.16,ease:[.2,0,0,1]}}} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:[.2,0,0,1]}}} className={p("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute top-[calc(100%+6px)] right-0 left-0 z-30")}>
                    {N.map(e=>{
                      let n=e.id===r.id;
                      return (
                        <li key={e.id} role="presentation">
                                            <button type="button" role="option" aria-selected={n} onClick={()=>{
                                              a(e),A(false)
                                            }} className={p("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                                              <span className="min-w-0 flex-1 truncate">{e.name}</span>
                                              <span className={p(j,"shrink-0")}>
                                                {e.seats}
                                                {" seats"}
                                              </span>
                                              {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="absolute end-2" />}
                                            </button>
                                          </li>
                      );
                    })}
                  </motion.ul>}
                </AnimatePresence>
              </div>
              <ul className={p("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","mt-4 space-y-2.5 p-3.5")}>
                {y.map(e=>(
                  <li key={e.id} className="flex gap-2.5">
                                <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={1.8} aria-hidden="true" className={p(_,"mt-px shrink-0")} />
                                <div className="min-w-0">
                                  <p className="text-[14px]/[16px] font-[450]">{e.label}</p>
                                  <p className={p(w,"mt-0.5")}>{e.detail}</p>
                                </div>
                              </li>
                ))}
              </ul>
              <p className={p(w,"mt-3 flex items-start gap-2")}>
                <HugeiconsIcon icon={Icon_20484} size={14} strokeWidth={1.8} aria-hidden="true" className="mt-[2px] shrink-0" />
                Northwind never receives your password, and cannot read billing details or delete projects.
              </p>
              <div className="mt-5 flex gap-2">
                <button type="button" className={p(f,v,"flex-1")}>Cancel</button>
                <button type="button" onClick={()=>{
                  "working"!==S&&C("working")
                }} aria-busy={"working"===S} className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",v,"flex-1")}>
                  <span className="grid place-items-center *:[grid-area:1/1]">
                    <span className={p("inline-flex items-center gap-2","working"===S&&"invisible")}>Authorize</span>
                    {"working"===S&&<span className="inline-flex items-center gap-2">
                      <HugeiconsIcon icon={Icon_79715} size={16} strokeWidth={1.8} aria-hidden="true" className="animate-spin [animation-duration:800ms] motion-reduce:animate-none" />
                      Authorizing
                    </span>}
                  </span>
                </button>
              </div>
              <p className={p(j,"mt-4 flex items-center justify-center gap-1.5")}>
                <HugeiconsIcon icon={Icon_67358} size={12} strokeWidth={1.8} aria-hidden="true" />
                Redirects to northwind.dev
              </p>
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>
  );
}


export default z;
