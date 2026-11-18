/**
 * React Bits Pro — Application UI (notifications-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_3980 = [["path",{d:"M6 8L6 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 16V12C18 9.17156 18 7.75735 17.1213 6.87867C16.2426 5.99999 14.8284 5.99999 12 5.99999L11 5.99999M11 5.99999C11 5.29976 12.9943 3.99152 13.5 3.49999M11 5.99999C11 6.70022 12.9943 8.00846 13.5 8.49999",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"6",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["circle",{cx:"6",cy:"6",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["circle",{cx:"18",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_44647 = [["path",{d:"M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 15.5V21.5M21 18.5L15 18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11",cy:"6.5",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_22830 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_22670 = [["path",{d:"M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_52975 = [["path",{d:"M15 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V9M20 4L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20 13C20 16.7712 20 18.6569 18.8284 19.8284C17.6569 21 15.7712 21 12 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V12C3 8.22876 3 6.34315 4.17157 5.17157C5.34315 4 7.22876 4 11 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];

let k = (...e)=>e.filter(Boolean).join(" "),
  _ = "text-neutral-900 dark:text-neutral-100",
  g = "text-neutral-900/80 dark:text-neutral-100/80",
  w = "text-neutral-900/66 dark:text-neutral-100/66",
  y = "text-[13px]/[18px] font-normal",
  j = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  N = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  A = "text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100",
  z = k("text-[16px]/[20px] font-[450] tracking-[-0.015em]",_),
  S = k(y,g),
  C = k(y,w),
  R = k("text-[12px]/[16px] font-[450] tabular-nums",w),
  E = [.2,0,0,1],
  W = ["Inbox","Snoozed","Archived"],
  M = {review:Icon_3980,access:Icon_44647,incident:Icon_27476},
  D = [{id:"a1",kind:"access",actor:"Priya Nandakumar",summary:"requested admin access to",target:"Cedar Labs billing",time:"9m",view:"Inbox",unread:true,body:"Priya needs to reconcile the October statement and issue two credits before the close on Friday. Access can be time-boxed to 7 days.",meta:[{label:"Requested role",value:"Billing admin"},{label:"Current role",value:"Member"},{label:"Duration",value:"7 days"},{label:"Approver",value:"You"}],primary:"Grant access"},{id:"a2",kind:"review",actor:"Wei Chen",summary:"requested your review on",target:"Usage metering rewrite",time:"52m",view:"Inbox",unread:true,body:"Replaces the nightly aggregation job with a streaming counter. Adds a backfill script and a feature flag so we can roll back per workspace.",meta:[{label:"Repository",value:"halcyon/metering"},{label:"Files changed",value:"14"},{label:"Checks",value:"8 passing"},{label:"Base",value:"main"}],primary:"Start review"},{id:"a3",kind:"incident",actor:"Halcyon",summary:"raised a latency alert on",target:"eu-west ingest",time:"3h",view:"Inbox",unread:false,body:"p95 crossed 800ms for 12 minutes and recovered without intervention. The queue depth peaked at 4,120 messages during the window.",meta:[{label:"Severity",value:"Warning"},{label:"Duration",value:"12m"},{label:"Peak p95",value:"812ms"},{label:"Status",value:"Recovered"}],primary:"Open incident"},{id:"a4",kind:"review",actor:"Ana Reyes",summary:"left changes requested on",target:"Sidebar density pass",time:"1d",view:"Snoozed",unread:false,body:"Two comments on the collapsed rail widths and one on the tooltip delay. Everything else is approved.",meta:[{label:"Repository",value:"halcyon/web"},{label:"Comments",value:"3"},{label:"Checks",value:"6 passing"},{label:"Snoozed until",value:"Tomorrow 09:00"}],primary:"Open pull request"},{id:"a5",kind:"access",actor:"Marco Silva",summary:"was added to",target:"Northwind workspace",time:"2d",view:"Archived",unread:false,body:"Marco accepted the invite and completed device enrolment. No further action is needed.",meta:[{label:"Role",value:"Editor"},{label:"Invited by",value:"You"},{label:"Device",value:"Enrolled"},{label:"Status",value:"Active"}],primary:"View member"}],
  I = ["Later today","Tomorrow 09:00","Next week","Pick a date"],
  T = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let t=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=t.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?t.length-1:(a+r+t.length)%t.length;
  t[n].focus(),t[n].click()
};

function O(){
  let e=useReducedMotion(),[r,t]=useState(D),[d,c]=useState("Inbox"),[u,w]=useState("a1"),[y,O]=useState(false),H=useRef(null),L=useMemo(()=>r.filter(e=>e.view===d), [r,d]),q=r.find(e=>e.id===u)??null,P=null!==q&&q.view===d;
  useEffect(()=>{
    if(!y)return;
    let e=H.current,r=e?.ownerDocument??document,t=r=>{
      e&&!e.contains(r.target)&&O(false)
    },a=e=>{
      "Escape"===e.key&&O(false)
    };
    return r.addEventListener("mousedown",t),r.addEventListener("keydown",a),()=>{
      r.removeEventListener("mousedown",t),r.removeEventListener("keydown",a)
    };
  }, [y]);
  let U=(e,r)=>{
    t(t=>t.map(t=>t.id===e?{...t,view:r,unread:false}:t)),O(false)
  };
  return (
    <div className={k("bg-white dark:bg-neutral-950",_,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <header className={k("border-b border-neutral-900/8 dark:border-neutral-100/8","flex flex-wrap items-center justify-between gap-3 px-5 py-3")}>
          <h2 className={z}>Activity</h2>
          <div role="radiogroup" aria-label="Activity views" onKeyDown={T} className={k("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
            {W.map(e=>{
              let t=e===d;
              return (
                <button key={e} type="button" role="radio" aria-checked={t} tabIndex={t?0:-1} onClick={()=>c(e)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">
                            {e}
                            <span className={R}>{r.filter(r=>r.view===e).length}</span>
                          </button>
              );
            })}
          </div>
        </header>
        <div className="grid min-h-0 flex-1 md:grid-cols-[300px_1fr]">
          <div className={k("border-r border-neutral-900/8 dark:border-neutral-100/8","min-h-0 overflow-y-auto max-md:border-r-0",P?"hidden md:block":"block")}>
            {0===L.length?<div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 px-6 text-center">
              <span className="flex h-10 w-10 items-center justify-center">
                <HugeiconsIcon icon={Icon_22830} size={16} strokeWidth={1.8} aria-hidden="true" className={g} />
              </span>
              <p className={A}>
                {d}
                {" is empty"}
              </p>
            </div>:<ul className="p-2">
              {L.map(e=>{
                let r=e.id===u;
                return (
                  <li key={e.id}>
                                <button type="button" onClick={()=>{
                                  var r;
                                  w(r=e.id),t(e=>e.map(e=>e.id===r?{...e,unread:false}:e))
                                }} aria-current={r} className={k("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",r?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","rounded-[var(--rb-r-sm,6px)]","px-3")}>
                                  <span className={k("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","h-[16px] w-[28px] self-start")}>
                                    <HugeiconsIcon icon={M[e.kind]} size={14} strokeWidth={1.8} aria-hidden="true" />
                                  </span>
                                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                    <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">
                                      {e.unread&&<span className="sr-only">{"Unread: "}</span>}
                                      {e.unread?<strong className={k("font-medium","truncate")}>{e.actor}</strong>:<span className="truncate">{e.actor}</span>}
                                      <span className={k("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","ms-auto")}>{e.time}</span>
                                    </span>
                                    <span className={k(e.unread?S:C,"block truncate")}>
                                      {e.summary}
                                      {" "}
                                      {e.target}
                                    </span>
                                  </span>
                                </button>
                              </li>
                );
              })}
            </ul>}
          </div>
          <div className={k("min-h-0 overflow-y-auto",P?"block":"hidden md:block")}>
            {P?<article key={q.id} className="p-5">
              <button type="button" onClick={()=>w(null)} className={k(j,N,"mb-3 md:hidden")}>
                <HugeiconsIcon icon={Icon_18976} size={16} strokeWidth={1.8} aria-hidden="true" />
                Back
              </button>
              <p className={S}>
                <span className={_}>{q.actor}</span>
                {" "}
                {q.summary}
              </p>
              <h3 className={k(z,"mt-1")}>{q.target}</h3>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button type="button" className={k("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",N)}>
                  <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                  {q.primary}
                </button>
                <div className="relative" ref={H}>
                  <button type="button" aria-haspopup="menu" aria-expanded={y} onClick={()=>O(e=>!e)} className={k(j,N)}>
                    <HugeiconsIcon icon={Icon_29635} size={16} strokeWidth={1.8} aria-hidden="true" />
                    Snooze
                    <HugeiconsIcon icon={Icon_20148} size={12} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {y&&<motion.div role="menu" initial={!e&&{opacity:0}} animate={{opacity:1}} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:E}}} transition={{duration:.16,ease:E}} className={k("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute top-[calc(100%+6px)] left-0 z-30 w-[180px] min-w-[180px]")}>
                      {I.map(e=><button key={e} role="menuitem" type="button" onClick={()=>U(q.id,"Snoozed")} className="relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40">{e}</button>)}
                    </motion.div>}
                  </AnimatePresence>
                </div>
                <button type="button" onClick={()=>U(q.id,"Archived")} className={k(j,N)}>
                  <HugeiconsIcon icon={Icon_22670} size={16} strokeWidth={1.8} aria-hidden="true" />
                  Archive
                </button>
              </div>
              <p className={k(S,"mt-5 max-w-[64ch]")}>{q.body}</p>
              <div className={k("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mt-5")}>
                <div className={k("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","mt-1")}>
                  <div className="@container min-w-0">
                    <dl className={k("grid min-w-0 grid-cols-1 @md:grid-cols-[fit-content(160px)_minmax(0,1fr)] @md:gap-x-4","divide-y divide-neutral-900/8 dark:divide-neutral-100/8")}>
                      {q.meta.map(e=>(
                        <div key={e.label} className={k("col-span-full flex min-h-10 min-w-0 flex-col justify-center gap-y-1 py-2 @md:grid @md:grid-cols-subgrid @md:items-baseline","px-3 @md:gap-x-4")}>
                                            <dt className="min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66">{e.label}</dt>
                                            <dd className="flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{e.value}</dd>
                                          </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
              <a href="#" onClick={e=>e.preventDefault()} className={k("inline-flex min-h-6 items-center gap-1 rounded-[var(--rb-r-sm,6px)] text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","mt-4")}>
                {"Open in "}
                {"review"===q.kind?"repository":"console"}
                <HugeiconsIcon icon={Icon_52975} size={14} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </article>:<div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 px-6 text-center">
              <p className={A}>Nothing selected</p>
              <div className="max-w-[30ch]">
                <p className="max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">Choose an item from the list to see its context and actions.</p>
              </div>
            </div>}
          </div>
        </div>
      </div>
  );
}


export default O;
