/**
 * React Bits Pro — Application UI (integrations-5 (Sorbet))
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

let c = (...e)=>e.filter(Boolean).join(" ");

let d = "text-neutral-900/62 dark:text-neutral-100/62";

let _ = "text-[14px]/[20px] font-medium";

let eL = (...e)=>e.filter(Boolean).join(" ");

let ez = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] select-none";

let eW = "flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]";

let eA = "text-neutral-900/62 dark:text-neutral-100/62";

let eM = "text-[22px]/[28px] font-extrabold tracking-[-0.01em]";

let eS = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eR = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eV = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let eE = eL("text-[14px]/[20px] font-medium",eA);

let eP = eL("text-[13px]/[16px] font-semibold tabular-nums",eA);

let e$ = [{id:"profile",label:"Read your profile",detail:"Name, email address and avatar."},{id:"projects",label:"Read your projects",detail:"Names, settings and member lists for 6 projects."},{id:"deploys",label:"Trigger deploys",detail:"Start a deploy on your behalf and read its result."}];

let eH = [{id:"w1",name:"Halcyon",role:"Owner",seats:24},{id:"w2",name:"Halcyon Labs",role:"Admin",seats:6},{id:"w3",name:"Personal",role:"Owner",seats:1}];


export default function integrations_5__Sorbet__Component(){
  let e=useReducedMotion(),[r,a]=useState(eH[0]),[l,s]=useState(false),[c,d]=useState("idle");
  useEffect(()=>{
    if("working"!==c)return;
    let e=window.setTimeout(()=>d("done"),1100);
    return ()=>window.clearTimeout(e);
  }, [c]);
  let _={initial:!e&&{opacity:0},animate:{opacity:1,transition:{duration:.18,ease:[.2,0,0,1]}},exit:e?undefined:{opacity:0,transition:{duration:.12,ease:[.2,0,0,1]}}};
  return (
    <div className={eL("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[700px] w-full items-center-safe justify-center overflow-y-auto py-8")}>
        <div className="w-full max-w-[452px] px-4">
          <AnimatePresence mode="wait" initial={false}>
            {"done"===c?<motion.div key={"done"} {..._} className={eL(eV,"p-6 text-center")}>
              <span aria-hidden="true" className={eL("text-neutral-900/78 dark:text-neutral-100/78","mx-auto inline-flex h-11 w-11 items-center justify-center")}><HugeiconsIcon icon={Icon_90987} size={20} strokeWidth={2} /></span>
              <h2 className={eL(eM,"mt-3.5")}>Northwind is connected</h2>
              <p className={eL(eE,"mt-1.5")}>
                You can close this window. Access can be revoked at any time from workspace settings.
              </p>
              <button type="button" onClick={()=>d("idle")} className={eL(eS,eR,"mt-5 w-full")}>Back to review</button>
            </motion.div>:<motion.div key={"consent"} {..._} className={eL(eV,"p-6")}>
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden="true" className={eL(ez,"size-10")}><span className={eW}>NW</span></span>
                <span aria-hidden="true" className={eL(eA,"flex items-center gap-1 px-1")}>
                  <span className="size-1 bg-current" />
                  <span className="size-1 bg-current" />
                  <span className="size-1 bg-current" />
                </span>
                <span aria-hidden="true" className={eL("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] select-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black)]","text-[13px]/[16px] font-bold tabular-nums","size-10")}>HL</span>
              </div>
              <h2 className={eL(eM,"mt-4 text-center")}>Northwind wants access to your Halcyon workspace</h2>
              <p className={eL(eE,"mt-1.5 text-center")}>Review what Northwind will be able to do before you continue.</p>
              <div className="relative mt-5">
                <label htmlFor="consent-workspace" className="flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100">Workspace</label>
                <button id="consent-workspace" type="button" aria-haspopup="listbox" aria-expanded={l} onClick={()=>s(e=>!e)} className={eL("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","mt-2 w-full")}>
                  <span aria-hidden="true" className={eL(ez,"size-[24px]")}><span className={eW}>{r.name.slice(0,2).toUpperCase()}</span></span>
                  <span className="min-w-0 flex-1"><span className="block truncate">{r.name}</span></span>
                  <span className={eL(eP,"shrink-0")}>{r.role}</span>
                  <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
                </button>
                <AnimatePresence>
                  {l&&<motion.ul role="listbox" initial={!e&&{opacity:0}} animate={{opacity:1,transition:{duration:.16,ease:[.2,0,0,1]}}} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:[.2,0,0,1]}}} className={eL("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute top-[calc(100%+6px)] right-0 left-0 z-30")}>
                    {eH.map(e=>{
                      let n=e.id===r.id;
                      return (
                        <li key={e.id} role="presentation">
                                            <button type="button" role="option" aria-selected={n} onClick={()=>{
                                              a(e),s(false)
                                            }} className={eL("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                                              <span className="min-w-0 flex-1 truncate">{e.name}</span>
                                              <span className={eL(eP,"shrink-0")}>
                                                {e.seats}
                                                {" seats"}
                                              </span>
                                              {n&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="absolute end-2" />}
                                            </button>
                                          </li>
                      );
                    })}
                  </motion.ul>}
                </AnimatePresence>
              </div>
              <ul className={eL("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]","rounded-[var(--rb-r-4xl,18px)]","mt-4 space-y-2.5 p-3.5")}>
                {e$.map(e=>(
                  <li key={e.id} className="flex gap-2.5">
                                <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={2} aria-hidden="true" className={eL(eA,"mt-px shrink-0")} />
                                <div className="min-w-0">
                                  <p className="text-[15px]/[20px] font-bold">{e.label}</p>
                                  <p className={eL(eE,"mt-0.5")}>{e.detail}</p>
                                </div>
                              </li>
                ))}
              </ul>
              <p className={eL(eE,"mt-3 flex items-start gap-2")}>
                <HugeiconsIcon icon={Icon_20484} size={16} strokeWidth={2} aria-hidden="true" className="mt-[2px] shrink-0" />
                Northwind never receives your password, and cannot read billing details or delete projects.
              </p>
              <div className="mt-5 flex gap-2">
                <button type="button" className={eL(eS,eR,"flex-1")}>Cancel</button>
                <button type="button" onClick={()=>{
                  "working"!==c&&d("working")
                }} aria-busy={"working"===c} className={eL("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",eR,"flex-1")}>
                  <span className="grid place-items-center *:[grid-area:1/1]">
                    <span className={eL("inline-flex items-center gap-2","working"===c&&"invisible")}>Authorize</span>
                    {"working"===c&&<span className="inline-flex items-center gap-2">
                      <HugeiconsIcon icon={Icon_79715} size={18} strokeWidth={2} aria-hidden="true" className="animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
                      Authorizing
                    </span>}
                  </span>
                </button>
              </div>
              <p className={eL(eP,"mt-4 flex items-center justify-center gap-1.5")}>
                <HugeiconsIcon icon={Icon_67358} size={14} strokeWidth={2} aria-hidden="true" />
                Redirects to northwind.dev
              </p>
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>
  );
}
