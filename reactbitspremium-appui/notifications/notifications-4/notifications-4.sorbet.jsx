/**
 * React Bits Pro — Application UI (notifications-4 (Sorbet))
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

let k = (...e)=>e.filter(Boolean).join(" ");

let v = "text-neutral-900 dark:text-neutral-100";

let f = "text-neutral-900/78 dark:text-neutral-100/78";

let eS = (...e)=>e.filter(Boolean).join(" ");

let eC = "text-neutral-900 dark:text-neutral-100";

let eR = "text-neutral-900/78 dark:text-neutral-100/78";

let eE = "text-neutral-900/62 dark:text-neutral-100/62";

let eW = "text-[14px]/[20px] font-medium";

let eM = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eD = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eI = "text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100";

let eT = eS("text-[17px]/[22px] font-extrabold",eC);

let eO = eS(eW,eR);

let eL = eS(eW,eE);

let eq = eS("text-[13px]/[16px] font-bold tabular-nums",eE);

let eP = [.2,0,0,1];

let eU = ["Inbox","Snoozed","Archived"];

let eH = {review:Icon_3980,access:Icon_44647,incident:Icon_27476};

let e$ = [{id:"a1",kind:"access",actor:"Priya Nandakumar",summary:"requested admin access to",target:"Cedar Labs billing",time:"9m",view:"Inbox",unread:true,body:"Priya needs to reconcile the October statement and issue two credits before the close on Friday. Access can be time-boxed to 7 days.",meta:[{label:"Requested role",value:"Billing admin"},{label:"Current role",value:"Member"},{label:"Duration",value:"7 days"},{label:"Approver",value:"You"}],primary:"Grant access"},{id:"a2",kind:"review",actor:"Wei Chen",summary:"requested your review on",target:"Usage metering rewrite",time:"52m",view:"Inbox",unread:true,body:"Replaces the nightly aggregation job with a streaming counter. Adds a backfill script and a feature flag so we can roll back per workspace.",meta:[{label:"Repository",value:"halcyon/metering"},{label:"Files changed",value:"14"},{label:"Checks",value:"8 passing"},{label:"Base",value:"main"}],primary:"Start review"},{id:"a3",kind:"incident",actor:"Halcyon",summary:"raised a latency alert on",target:"eu-west ingest",time:"3h",view:"Inbox",unread:false,body:"p95 crossed 800ms for 12 minutes and recovered without intervention. The queue depth peaked at 4,120 messages during the window.",meta:[{label:"Severity",value:"Warning"},{label:"Duration",value:"12m"},{label:"Peak p95",value:"812ms"},{label:"Status",value:"Recovered"}],primary:"Open incident"},{id:"a4",kind:"review",actor:"Ana Reyes",summary:"left changes requested on",target:"Sidebar density pass",time:"1d",view:"Snoozed",unread:false,body:"Two comments on the collapsed rail widths and one on the tooltip delay. Everything else is approved.",meta:[{label:"Repository",value:"halcyon/web"},{label:"Comments",value:"3"},{label:"Checks",value:"6 passing"},{label:"Snoozed until",value:"Tomorrow 09:00"}],primary:"Open pull request"},{id:"a5",kind:"access",actor:"Marco Silva",summary:"was added to",target:"Northwind workspace",time:"2d",view:"Archived",unread:false,body:"Marco accepted the invite and completed device enrolment. No further action is needed.",meta:[{label:"Role",value:"Editor"},{label:"Invited by",value:"You"},{label:"Device",value:"Enrolled"},{label:"Status",value:"Active"}],primary:"View member"}];

let eB = ["Later today","Tomorrow 09:00","Next week","Pick a date"];

let eY = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[n].focus(),a[n].click()
};


export default function notifications_4__Sorbet__Component(){
  let e=useReducedMotion(),[r,a]=useState(e$),[c,d]=useState("Inbox"),[_,x]=useState("a1"),[b,u]=useState(false),p=useRef(null),m=useMemo(()=>r.filter(e=>e.view===c), [r,c]),k=r.find(e=>e.id===_)??null,v=null!==k&&k.view===c;
  useEffect(()=>{
    if(!b)return;
    let e=p.current,r=e?.ownerDocument??document,a=r=>{
      e&&!e.contains(r.target)&&u(false)
    },t=e=>{
      "Escape"===e.key&&u(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("keydown",t),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("keydown",t)
    };
  }, [b]);
  let f=(e,r)=>{
    a(a=>a.map(a=>a.id===e?{...a,view:r,unread:false}:a)),u(false)
  };
  return (
    <div className={eS("bg-white dark:bg-neutral-950",eC,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <header className={eS("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex flex-wrap items-center justify-between gap-3 px-5 py-3")}>
          <h2 className={eT}>Activity</h2>
          <div role="radiogroup" aria-label="Activity views" onKeyDown={eY} className={eS("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10")}>
            {eU.map(e=>{
              let a=e===c;
              return (
                <button key={e} type="button" role="radio" aria-checked={a} tabIndex={a?0:-1} onClick={()=>d(e)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">
                            {e}
                            <span className={eq}>{r.filter(r=>r.view===e).length}</span>
                          </button>
              );
            })}
          </div>
        </header>
        <div className="grid min-h-0 flex-1 md:grid-cols-[300px_1fr]">
          <div className={eS("border-r border-transparent","min-h-0 overflow-y-auto max-md:border-r-0",v?"hidden md:block":"block")}>
            {0===m.length?<div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 px-6 text-center">
              <span className="flex h-10 w-10 items-center justify-center">
                <HugeiconsIcon icon={Icon_22830} size={18} strokeWidth={2} aria-hidden="true" className={eR} />
              </span>
              <p className={eI}>
                {c}
                {" is empty"}
              </p>
            </div>:<ul className="p-2">
              {m.map(e=>{
                let r=e.id===_;
                return (
                  <li key={e.id}>
                                <button type="button" onClick={()=>{
                                  var r;
                                  x(r=e.id),a(e=>e.map(e=>e.id===r?{...e,unread:false}:e))
                                }} aria-current={r} className={eS("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",r?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","rounded-[var(--rb-r-4xl,18px)]","px-3")}>
                                  <span className={eS("flex size-9 shrink-0 items-center justify-center text-neutral-900/78 dark:text-neutral-100/78","h-[16px] w-[28px] self-start")}>
                                    <HugeiconsIcon icon={eH[e.kind]} size={16} strokeWidth={2} aria-hidden="true" />
                                  </span>
                                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                    <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100">
                                      {e.unread&&<span className="sr-only">{"Unread: "}</span>}
                                      {e.unread?<strong className={eS("font-bold","truncate")}>{e.actor}</strong>:<span className="truncate">{e.actor}</span>}
                                      <span className={eS("shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","ms-auto")}>{e.time}</span>
                                    </span>
                                    <span className={eS(e.unread?eO:eL,"block truncate")}>
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
          <div className={eS("min-h-0 overflow-y-auto",v?"block":"hidden md:block")}>
            {v?<article key={k.id} className="p-5">
              <button type="button" onClick={()=>x(null)} className={eS(eM,eD,"mb-3 md:hidden")}>
                <HugeiconsIcon icon={Icon_18976} size={18} strokeWidth={2} aria-hidden="true" />
                Back
              </button>
              <p className={eO}>
                <span className={eC}>{k.actor}</span>
                {" "}
                {k.summary}
              </p>
              <h3 className={eS(eT,"mt-1")}>{k.target}</h3>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button type="button" className={eS("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",eD)}>
                  <HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" />
                  {k.primary}
                </button>
                <div className="relative" ref={p}>
                  <button type="button" aria-haspopup="menu" aria-expanded={b} onClick={()=>u(e=>!e)} className={eS(eM,eD)}>
                    <HugeiconsIcon icon={Icon_29635} size={18} strokeWidth={2} aria-hidden="true" />
                    Snooze
                    <HugeiconsIcon icon={Icon_20148} size={14} strokeWidth={2} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {b&&<motion.div role="menu" initial={!e&&{opacity:0}} animate={{opacity:1}} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:eP}}} transition={{duration:.16,ease:eP}} className={eS("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute top-[calc(100%+6px)] left-0 z-30 w-[180px] min-w-[180px]")}>
                      {eB.map(e=><button key={e} role="menuitem" type="button" onClick={()=>f(k.id,"Snoozed")} className="relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40">{e}</button>)}
                    </motion.div>}
                  </AnimatePresence>
                </div>
                <button type="button" onClick={()=>f(k.id,"Archived")} className={eS(eM,eD)}>
                  <HugeiconsIcon icon={Icon_22670} size={18} strokeWidth={2} aria-hidden="true" />
                  Archive
                </button>
              </div>
              <p className={eS(eO,"mt-5 max-w-[64ch]")}>{k.body}</p>
              <div className={eS("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mt-5")}>
                <div className={eS("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","mt-1")}>
                  <div className="@container min-w-0">
                    <dl className={eS("grid min-w-0 grid-cols-1 @md:grid-cols-[fit-content(180px)_minmax(0,1fr)] @md:gap-x-5","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7")}>
                      {k.meta.map(e=>(
                        <div key={e.label} className={eS("col-span-full flex min-h-12 min-w-0 flex-col justify-center gap-y-1 py-2.5 @md:grid @md:grid-cols-subgrid @md:items-baseline","px-3 @md:gap-x-4")}>
                                            <dt className="min-w-0 text-[15px]/[20px] font-bold text-neutral-900/62 dark:text-neutral-100/62">{e.label}</dt>
                                            <dd className="flex min-w-0 flex-wrap items-center gap-2 text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{e.value}</dd>
                                          </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
              <a href="#" onClick={e=>e.preventDefault()} className={eS("inline-flex min-h-6 items-center gap-1 rounded-[calc(var(--rb-r-sm,6px))] text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100 underline decoration-[var(--rb-accent,oklch(84%_0.15_165))] decoration-[3px] underline-offset-[5px] transition-[text-decoration-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:decoration-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:decoration-[var(--rb-accent,oklch(81%_0.16_163))]","mt-4")}>
                {"Open in "}
                {"review"===k.kind?"repository":"console"}
                <HugeiconsIcon icon={Icon_52975} size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            </article>:<div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 px-6 text-center">
              <p className={eI}>Nothing selected</p>
              <div className="max-w-[30ch]">
                <p className="max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78">Choose an item from the list to see its context and actions.</p>
              </div>
            </div>}
          </div>
        </div>
      </div>
  );
}
