/**
 * React Bits Pro — Application UI (monitoring-9)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_95735 = [["path",{d:"M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 16H11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 16L18 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 9H22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_86829 = [["ellipse",{cx:"12",cy:"5",rx:"8",ry:"3",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_27151 = [["path",{d:"M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_58770 = [["path",{d:"M8.85746 12.5061C6.36901 10.6456 4.59564 8.59915 3.62734 7.44867C3.3276 7.09253 3.22938 6.8319 3.17033 6.3728C2.96811 4.8008 2.86701 4.0148 3.32795 3.5074C3.7889 3 4.60404 3 6.23433 3H17.7657C19.396 3 20.2111 3 20.672 3.5074C21.133 4.0148 21.0319 4.8008 20.8297 6.37281C20.7706 6.83191 20.6724 7.09254 20.3726 7.44867C19.403 8.60062 17.6261 10.6507 15.1326 12.5135C14.907 12.6821 14.7583 12.9567 14.7307 13.2614C14.4837 15.992 14.2559 17.4876 14.1141 18.2442C13.8853 19.4657 12.1532 20.2006 11.226 20.8563C10.6741 21.2466 10.0043 20.782 9.93278 20.1778C9.79643 19.0261 9.53961 16.6864 9.25927 13.2614C9.23409 12.9539 9.08486 12.6761 8.85746 12.5061Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let m = (...e)=>e.filter(Boolean).join(" "),
  f = "rounded-[var(--rb-r-sm,6px)]",
  g = "text-neutral-900 dark:text-neutral-100",
  k = "text-neutral-900/66 dark:text-neutral-100/66",
  v = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  w = "text-[12px]/[16px] font-[450] tabular-nums",
  _ = "text-[12px]/[16px] font-normal tabular-nums",
  j = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  y = "inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",
  N = "text-neutral-900 dark:text-neutral-100",
  S = "text-neutral-900 dark:text-neutral-100",
  z = "text-neutral-900/66 dark:text-neutral-100/66",
  A = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  R = "flex h-lh shrink-0 items-center",
  C = "inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none",
  E = m("text-[13px]/[18px] font-normal",k),
  M = [{id:"r1",group:"running",icon:Icon_95735,title:"Refund duplicate charge on ORD-99214",step:"Step 4 of 6",detail:"Matching the second transaction in the payout file",initials:"PP",env:"Production",at:"2m ago",progress:62,flag:"on-track"},{id:"r2",group:"running",icon:Icon_55410,title:"Draft renewal outreach for 38 Q3 accounts",step:"Step 2 of 5",detail:"Pulling usage summaries for segment B",initials:"TP",env:"Production",at:"8m ago",progress:35,flag:"on-track"},{id:"r3",group:"running",icon:Icon_86829,title:"Dedupe 412 contacts imported from the spring list",step:"Step 3 of 4",detail:"Merging 57 confirmed duplicate pairs",initials:"NV",env:"Staging",at:"14m ago",progress:70,flag:"on-track"},{id:"r4",group:"running",icon:Icon_95735,title:"Refund damaged item claim on ORD-99187",step:"Step 5 of 6",detail:"Waiting on finance approval for the €1,240 credit",initials:"MS",env:"Production",at:"22m ago",progress:81,flag:"needs-approval"},{id:"r5",group:"running",icon:Icon_31964,title:"Summarise the Meridian master services agreement",step:"Step 1 of 3",detail:"Splitting 84 pages into clause sections",initials:"KT",env:"Development",at:"31m ago",progress:15,flag:"on-track"},{id:"r6",group:"waiting",icon:Icon_31964,title:"Reconcile 23 June freight invoices",step:"Queued 18 min",detail:"Position 2 in the finance lane",initials:"LG",env:"Production",at:"18m ago",progress:null,flag:"on-track"},{id:"r7",group:"waiting",icon:Icon_55410,title:"Send onboarding nudges to 112 trial signups",step:"Step 1 of 4",detail:"Rate limited by the email provider, retry at 13:40",initials:"PP",env:"Production",at:"26m ago",progress:10,flag:"retrying"},{id:"r8",group:"waiting",icon:Icon_27151,title:"Enrich 64 new leads from the partner webinar",step:"Queued 32 min",detail:"Waiting for the enrichment API window",initials:"TP",env:"Staging",at:"32m ago",progress:null,flag:"on-track"},{id:"r9",group:"waiting",icon:Icon_86829,title:"Archive conversations older than 180 days",step:"Queued 1 h",detail:"Scheduled for the low traffic window at 02:00",initials:"NV",env:"Production",at:"1h ago",progress:null,flag:"on-track"},{id:"r10",group:"failed",icon:Icon_95735,title:"Refund partial return on ORD-99102 for Cedar Labs",step:"Failed at step 3 of 6",detail:"The processor declined the partial capture",initials:"MS",env:"Production",at:"1h ago",progress:48,flag:"escalated"},{id:"r11",group:"failed",icon:Icon_31964,title:"Match 9 supplier invoices to June purchase orders",step:"Failed at step 2 of 5",detail:"Two invoices reference a closed PO",initials:"LG",env:"Production",at:"2h ago",progress:32,flag:"escalated"},{id:"r12",group:"failed",icon:Icon_27151,title:"Classify 240 support threads for the quarterly review",step:"Failed at step 1 of 2",detail:"The label schema no longer matches",initials:"KT",env:"Staging",at:"3h ago",progress:12,flag:"retrying"}],
  D = [{id:"running",label:"Running",hint:"Live executions streaming steps right now"},{id:"waiting",label:"Waiting",hint:"Queued behind approvals, rate limits or schedules"},{id:"failed",label:"Failed",hint:"Stopped runs awaiting retry or escalation"}],
  W = {running:N,waiting:S,failed:A},
  P = {"on-track":"On track","needs-approval":"Needs approval",retrying:"Retrying",escalated:"Escalated"},
  L = {"on-track":z,"needs-approval":S,retrying:z,escalated:A},
  O = {neutral:g,danger:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",warning:g};

function $({value:e}){
  let t=2*Math.PI*8;
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" aria-hidden>
        <circle cx={10} cy={10} r={8} fill="none" strokeWidth={2.5} className="stroke-neutral-900/8 dark:stroke-neutral-100/8" />
        <circle cx={10} cy={10} r={8} fill="none" strokeWidth={2.5} strokeLinecap="round" strokeDasharray={`${e/100*t} ${t}`} transform="rotate(-90 10 10)" className="stroke-neutral-900 dark:stroke-neutral-100" />
      </svg>
  );
}

function T(){
  let e=useRef(null),[t,r]=useState(""),[s,i]=useState(false),[o,d]=useState([]),[c,S]=useState(()=>Object.fromEntries(M.filter(e=>null!==e.progress).map(e=>[e.id,e.progress]))),{ref:z,edges:A,onScroll:T}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=t;
      r({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }();
  useEffect(()=>{
    let t=e.current?.ownerDocument.defaultView??window,r=t.setInterval(()=>{
      S(e=>{
        let t={...e};
        return M.filter(e=>"running"===e.group&&null!==e.progress).forEach(e=>{
          t[e.id]=t[e.id]>=97?e.progress:t[e.id]+1
        }),t;
      })
    },1400);
    return ()=>t.clearInterval(r);
  }, []);
  let I=useMemo(()=>{
    let e=t.trim().toLowerCase();
    return M.filter(t=>(!s||"escalated"===t.flag||"needs-approval"===t.flag)&&(!e||t.title.toLowerCase().includes(e)||t.step.toLowerCase().includes(e)||t.detail.toLowerCase().includes(e)));
  }, [t,s]);
  useEffect(()=>T(), [I,o,T]);
  let F=[{label:"Runs",value:I.length,tone:"neutral"},{label:"Escalated",value:I.filter(e=>"escalated"===e.flag).length,tone:"danger"},{label:"Needs approval",value:I.filter(e=>"needs-approval"===e.flag).length,tone:"warning"},{label:"Retrying",value:I.filter(e=>"retrying"===e.flag).length,tone:"neutral"}],H=o.length===D.length;
  return (
    <div ref={e} className={m("bg-white dark:bg-neutral-950",g,"flex h-full min-h-[800px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={m("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","flex min-h-0 flex-1 flex-col gap-1")}>
          <div className="px-4 py-3.5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className={m("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Run queue</h2>
                  <span className={m(y,N)}>
                    <span className={R}><span aria-hidden="true" className={C} /></span>
                    Live
                  </span>
                </div>
                <p className={m(E,"mt-0.5 truncate")}>Triage the live agent run backlog.</p>
              </div>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {F.map(e=>(
                  <li key={e.label} className="flex items-baseline gap-1.5">
                                <span className={m(_,k)}>{e.label}</span>
                                <span className={m(w,0===e.value?k:O[e.tone])}>{e.value}</span>
                              </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="relative min-w-0 flex-1 max-sm:basis-full sm:max-w-[300px]">
                <label htmlFor="monitoring-9-search" className="sr-only">Search runs</label>
                <div className={m("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-7")}>
                  <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                    <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <input id="monitoring-9-search" value={t} onChange={e=>r(e.target.value)} placeholder="Search runs…" className="h-full w-full min-w-0 flex-1 bg-transparent px-2 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                </div>
              </div>
              <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
                <button type="button" aria-pressed={s} onClick={()=>i(e=>!e)} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                  <HugeiconsIcon icon={Icon_58770} size={16} strokeWidth={1.8} aria-hidden="true" />
                  Attention
                </button>
                <button type="button" onClick={()=>d(H?[]:D.map(e=>e.id))} className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",j)}>{H?"Expand groups":"Collapse groups"}</button>
                <button type="button" className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",j)}>
                  <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                  New run
                </button>
              </div>
            </div>
          </div>
          <div className={m("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
            <div ref={z} onScroll={T} className="h-full overflow-y-auto">
              {0===I.length?<div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">Queue is clear</p>
                <p className={m("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>No runs match this view. Everything else is progressing on its own.</p>
              </div>:<div className={m(v,"p-1")}>
                {D.map(e=>{
                  let t=I.filter(t=>t.group===e.id);
                  if(0===t.length)return null;
                  let r=!o.includes(e.id);
                  return (
                    <section key={e.id} className={v}>
                                    <button type="button" aria-expanded={r} onClick={()=>d(t=>t.includes(e.id)?t.filter(t=>t!==e.id):[...t,e.id])} className={m("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",f,"group px-2")}>
                                      <span className="flex size-4 shrink-0 items-center justify-center">
                                        <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                      </span>
                                      <span className={m(y,W[e.id])}>
                                        {"running"===e.id&&<span className={R}><span aria-hidden="true" className={C} /></span>}
                                        {e.label}
                                      </span>
                                      <span className={m(w,k)}>{t.length}</span>
                                      <span className={m(E,"ml-auto hidden truncate md:block")}>{e.hint}</span>
                                    </button>
                                    {r&&<ul className={v}>
                                      {t.map(e=>{
                                        let t=c[e.id];
                                        return (
                                          <li key={e.id}>
                                                                <div className={m("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",f,"px-2")}>
                                                                  <HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" className={m(k,"shrink-0")} />
                                                                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                                    <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="min-w-0 truncate">{e.title}</span></p>
                                                                    <p className={m(E,"flex min-w-0 gap-x-3")}>
                                                                      <span className="shrink-0">{e.step}</span>
                                                                      <span className="min-w-0 truncate">{e.detail}</span>
                                                                    </p>
                                                                  </div>
                                                                  <span aria-hidden className={m("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px] max-sm:hidden")}>
                                                                    <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.initials.charAt(0)}</span>
                                                                  </span>
                                                                  <span className={m(_,k,"hidden w-[104px] shrink-0 items-center lg:inline-flex")}>{e.env}</span>
                                                                  <span className={m(_,k,"hidden w-[64px] shrink-0 xl:block")}>{e.at}</span>
                                                                  <span className="flex w-[62px] shrink-0 items-center justify-end gap-1.5">
                                                                    {undefined!==t&&<>
                                                                      <$ value={t} />
                                                                      <span className={m(_,"text-neutral-900/80 dark:text-neutral-100/80")}>
                                                                        {Math.round(t)}
                                                                        %
                                                                      </span>
                                                                    </>}
                                                                  </span>
                                                                  <span className={m("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",L[e.flag],"w-[104px] shrink-0 justify-end text-right max-sm:hidden")}>{P[e.flag]}</span>
                                                                  <button type="button" aria-label={`Actions for ${e.title}`} className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}>
                                                                    <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                                  </button>
                                                                </div>
                                                              </li>
                                        );
                                      })}
                                    </ul>}
                                  </section>
                  );
                })}
              </div>}
            </div>
            <div aria-hidden="true" className={m("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",A.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={m("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",A.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default T;
