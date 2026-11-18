/**
 * React Bits Pro — Application UI (integrations-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_3815 = [["path",{d:"M19.5 4.5L21.5 2.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.5 21.5L4.5 19.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11.1497 15.3212L8.85034 13.0219C8.44485 12.6164 8.2421 12.4137 8.03374 12.2879C7.39802 11.904 6.60198 11.904 5.96626 12.2879C5.7579 12.4137 5.55515 12.6164 5.14966 13.0219C4.88327 13.2883 4.75007 13.4215 4.63794 13.5647C4.30099 13.995 4.088 14.5092 4.02197 15.0518C4 15.2323 4 15.4207 4 15.7974V16.7574C4 17.3342 4 17.6226 4.07661 17.8914C4.1187 18.039 4.17764 18.1814 4.25229 18.3155C4.38817 18.5597 4.59211 18.7637 5 19.1716C5.40789 19.5795 5.61184 19.7834 5.85606 19.9193C5.99022 19.9939 6.13253 20.0529 6.28018 20.095C6.54895 20.1716 6.83737 20.1716 7.41421 20.1716H8.37414C8.75087 20.1716 8.93924 20.1716 9.11979 20.1496C9.66234 20.0836 10.1765 19.8706 10.6069 19.5336C10.7501 19.4215 10.8833 19.2883 11.1497 19.0219C11.5551 18.6164 11.7579 18.4137 11.8837 18.2053C12.2675 17.5696 12.2675 16.7736 11.8837 16.1378C11.7579 15.9295 11.5551 15.7267 11.1497 15.3212Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M13.0005 5.12552C12.6035 5.5225 12.405 5.72099 12.2818 5.92498C11.9061 6.54735 11.9061 7.32668 12.2818 7.94904C12.405 8.15304 12.6035 8.35152 13.0005 8.7485L15.2515 10.9995C15.6485 11.3965 15.847 11.595 16.051 11.7182C16.6733 12.0939 17.4527 12.0939 18.075 11.7182C18.279 11.595 18.4775 11.3965 18.8745 10.9995C19.1353 10.7387 19.2657 10.6083 19.3755 10.4681C19.7053 10.0469 19.9138 9.54345 19.9785 9.01229C20 8.83553 20 8.65112 20 8.2823V7.34253C20 6.7778 20 6.49543 19.925 6.2323C19.8838 6.08775 19.8261 5.94843 19.753 5.81709C19.62 5.57799 19.4203 5.37833 19.021 4.979C18.6217 4.57968 18.422 4.38002 18.1829 4.24699C18.0516 4.17391 17.9122 4.11621 17.7677 4.075C17.5046 4 17.2222 4 16.6575 4L15.7177 4C15.3489 4 15.1645 4 14.9877 4.02151C14.4566 4.08615 13.9531 4.29467 13.5319 4.62455C13.3917 4.73432 13.2613 4.86472 13.0005 5.12552Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M8.5 12.5L10.5 10.5M11.5 15.5L13.5 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let h = (...e)=>e.filter(Boolean).join(" "),
  m = "text-neutral-900/80 dark:text-neutral-100/80",
  _ = "text-neutral-900/66 dark:text-neutral-100/66",
  k = "text-[13px]/[18px] font-normal",
  f = "text-[14px]/[16px] font-[450]",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-[oklch(60%_0.236_26)] bg-white text-[oklch(51%_0.18_26)] shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-[oklch(51%_0.18_26)] active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-[oklch(65.2%_0.219_26)] dark:bg-neutral-900 dark:text-[oklch(76%_0.14_26)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-[oklch(76%_0.14_26)] dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  w = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  j = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  y = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  N = h(k,_),
  z = h(k,m),
  A = h("text-[12px]/[16px] font-normal tabular-nums",_),
  S = [{id:"read",label:"Read repositories",detail:"Metadata, branches and commit status for 12 repositories.",required:true},{id:"issues",label:"Write issues",detail:"Create and comment on issues when a deploy check fails.",required:false},{id:"checks",label:"Write checks",detail:"Report build and policy results back onto pull requests.",required:false},{id:"members",label:"Read organization members",detail:"Match commit authors to workspace seats.",required:false}],
  C = [{at:"Today 09:41",text:"Scopes updated by Ana Reyes",tone:"neutral"},{at:"Yesterday 18:02",text:"Token refreshed automatically",tone:"ok"},{at:"Mar 12",text:"Rate limit reached, retried after 40s",tone:"warn"},{at:"Mar 04",text:"Connected by Marco Silva",tone:"neutral"}];

function R(){
  let e=useId(),r=useReducedMotion(),a=useRef(null),[k,R]=useState({read:true,issues:true,checks:true,members:false}),[W,L]=useState(false),[E,M]=useState("connected"),[P,$]=useState(false),{ref:D,edges:O,onScroll:H}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:s}=r;
      a({start:t>1,end:Math.ceil(t+s)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }();
  return useEffect(()=>{
    if(!P)return;
    let e=window.setTimeout(()=>$(false),1400);
    return ()=>window.clearTimeout(e);
  }, [P]),useEffect(()=>{
    if(!W)return;
    let e=a.current?.ownerDocument??document,r=e=>{
      "Escape"===e.key&&L(false)
    };
    return e.addEventListener("keydown",r),()=>e.removeEventListener("keydown",r);
  }, [W]),<div ref={a} className={h("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
    <header className={h("border-b border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0 flex-wrap items-start gap-3 px-5 py-4")}>
      <span aria-hidden="true" className={h("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[var(--rb-r-sm,6px)] select-none","size-11")}>
        <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">CL</span>
      </span>
      <div className="min-w-[220px] flex-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Cedar Labs</h2>
          <span className={h("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","connected"===E?"text-neutral-900/80 dark:text-neutral-100/80":"text-neutral-900/66 dark:text-neutral-100/66")}>{"connected"===E?"Connected":"Disconnected"}</span>
        </div>
        <p className={h(N,"mt-1")}>
          Opens an issue whenever a deploy check fails, and reports build results back onto pull requests.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button type="button" onClick={()=>{
          P||$(true)
        }} disabled={"connected"!==E} aria-busy={P} className={h(v,j)}>
          <span className="grid place-items-center *:[grid-area:1/1]">
            <span className={h("inline-flex items-center gap-2",P&&"invisible")}>
              <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
              Sync now
            </span>
            {P&&<span className="inline-flex items-center gap-2">
              <HugeiconsIcon icon={Icon_79715} size={16} strokeWidth={1.8} aria-hidden="true" className="animate-spin [animation-duration:800ms] motion-reduce:animate-none" />
              Syncing
            </span>}
          </span>
        </button>
        {"connected"===E?<button type="button" onClick={()=>L(true)} className={h(g,j)}>
          <HugeiconsIcon icon={Icon_3815} size={16} strokeWidth={1.8} aria-hidden="true" />
          Disconnect
        </button>:<button type="button" onClick={()=>M("connected")} className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",j)}>Reconnect</button>}
      </div>
    </header>
    <div className="relative min-h-0 flex-1">
      <div ref={D} onScroll={H} className="h-full overflow-y-auto px-5 py-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
          <section className={h(y,"p-4")}>
            <h3 className={f}>Permissions</h3>
            <p className={h(N,"mt-1")}>Cedar Labs only uses the scopes you leave enabled.</p>
            <ul className="mt-3.5 space-y-1">
              {S.map(e=>{
                let r=e.required||k[e.id];
                return (
                  <li key={e.id} className="flex items-center gap-3 py-2.5">
                                    <div className="min-w-0 flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className={f}>{e.label}</span>
                                        {e.required&&<span className={h("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>Required</span>}
                                      </div>
                                      <p className={h(N,"mt-0.5")}>{e.detail}</p>
                                    </div>
                                    <button type="button" role="switch" aria-checked={r} aria-label={e.label} disabled={e.required} onClick={()=>R(r=>({...r,[e.id]:!r[e.id]}))} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
                                      <span aria-hidden="true" className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
                                    </button>
                                  </li>
                );
              })}
            </ul>
          </section>
          <section className={h(y,"p-4")}>
            <h3 className={f}>Activity</h3>
            <ol className="mt-3 space-y-3">
              {C.map(e=>(
                <li key={e.at} className="flex gap-2.5">
                                <span aria-hidden="true" className={h("flex size-4 shrink-0 items-center justify-center","mt-px")}>
                                  {"ok"===e.tone&&<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} className={_} />}
                                  {"warn"===e.tone&&<HugeiconsIcon icon={Icon_36474} size={12} strokeWidth={1.8} className="text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]" />}
                                </span>
                                <div className="min-w-0">
                                  <p className={z}>{e.text}</p>
                                  <p className={h(A,"mt-0.5")}>{e.at}</p>
                                </div>
                              </li>
              ))}
            </ol>
            <a href="#" className={h("inline-flex min-h-6 items-center gap-1 rounded-[var(--rb-r-sm,6px)] text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","mt-4 self-start")}>
              Full audit log
              <HugeiconsIcon icon={Icon_1497} size={14} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </section>
        </div>
      </div>
      <div aria-hidden="true" className={h("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",O.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",O.end?"opacity-100":"opacity-0")} />
    </div>
    <AnimatePresence>
      {W&&<motion.div className="absolute inset-0 z-40 flex items-center justify-center p-5" initial={!r&&{opacity:0}} animate={{opacity:1,transition:{duration:.18,ease:[.2,0,0,1]}}} exit={r?undefined:{opacity:0,transition:{duration:.12,ease:[.2,0,0,1]}}}>
        <button type="button" aria-label="Close" onClick={()=>L(false)} className={h("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 cursor-default")} />
        <div role="dialog" aria-modal="true" aria-labelledby={`${e}-title`} className={h("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","relative max-h-full w-full max-w-[380px]")}>
          <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
            <div className="relative flex flex-col gap-1.5 px-5 pt-5 pb-5 has-[button]:pe-14 [&:has(+*)]:pb-0">
              <HugeiconsIcon icon={Icon_36474} size={16} strokeWidth={1.8} aria-hidden="true" className={h(m,"mb-1.5")} />
              <h3 id={`${e}-title`} className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">Disconnect Cedar Labs?</h3>
              <p className="text-[14px]/[20px] text-neutral-900/80 dark:text-neutral-100/80">
                Deploy checks stop reporting and the stored token is revoked. Existing issues stay where they are.
              </p>
            </div>
          </div>
          <div className="flex min-h-11 flex-wrap items-center justify-end gap-2 px-4 py-2 pe-2">
            <button type="button" autoFocus onClick={()=>L(false)} className={h(v,w)}>Keep connected</button>
            <button type="button" onClick={()=>{
              M("disconnected"),L(false)
            }} className={h(g,w)}>Disconnect</button>
          </div>
        </div>
      </motion.div>}
    </AnimatePresence>
    <p className="sr-only" aria-live="polite">{"connected"===E?"Cedar Labs is connected":"Cedar Labs is disconnected"}</p>
  </div>;
}


export default R;
