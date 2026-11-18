/**
 * React Bits Pro — Application UI (dashboard-8)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_24513 = [["path",{d:"M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_91162 = [["path",{d:"M7 4V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 19L17 4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M10 6.99998C10 6.99998 7.79053 4.00001 6.99998 4C6.20942 3.99999 4 7 4 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M20 17C20 17 17.7905 20 17 20C16.2094 20 14 17 14 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_12556 = [["path",{d:"M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let v = (...e)=>e.filter(Boolean).join(" "),
  w = "text-neutral-900 dark:text-neutral-100",
  j = "text-neutral-900/66 dark:text-neutral-100/66",
  N = "text-[14px]/[16px] font-[450]",
  y = "text-[12px]/[16px] font-normal tabular-nums",
  A = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  M = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  S = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  z = "size-7 rounded-[var(--rb-r-sm,6px)]",
  C = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",
  L = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  W = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  B = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  E = "stroke-neutral-900 dark:stroke-neutral-100",
  R = (e,a,t)=>Math.min(t,Math.max(a,e)),
  D = (e,a)=>.5*Math.sin(.82*a+e)+.34*Math.sin(.29*a+1.9*e),
  F = [{label:"Net revenue",scope:"atlas.dev",period:"28 days",value:"$6.2k",delta:12.4,series:Array.from({length:28},(e,a)=>R(58+34*D(1.4,a),8,100))},{label:"Signups",scope:"All channels",period:"28 days",value:4238..toLocaleString("en-US"),delta:6.1,series:Array.from({length:28},(e,a)=>R(54+38*D(4.1,a),8,100))},{label:"Active licenses",scope:"Atlas Cloud",period:"28 days",value:1907..toLocaleString("en-US"),delta:-2.3,series:Array.from({length:28},(e,a)=>R(62+30*D(7.7,a),8,100))}],
  $ = {progress:"In progress",planned:"Planned",backlog:"Backlog",blocked:"Blocked"},
  I = {progress:"text-neutral-900 dark:text-neutral-100",planned:"text-neutral-900 dark:text-neutral-100",backlog:"text-neutral-900/66 dark:text-neutral-100/66",blocked:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]"},
  U = [{id:"m1",name:"Access Matrix",kind:"System",owner:"Nora Vale",host:"admin.atlas.dev",done:11,total:26,start:"Apr 22",end:"May 06",window:14,stage:"progress",starred:true},{id:"m2",name:"API Console",kind:"Feature",owner:"Lena Wade",host:"api.atlas.dev",done:29,total:32,start:"Apr 12",end:"Apr 26",window:14,stage:"progress",starred:true},{id:"m3",name:"Block Library",kind:"Feature",owner:"Sofia Romero",host:"blocks.atlas.dev",done:10,total:30,start:"Apr 24",end:"May 10",window:16,stage:"planned",starred:false},{id:"m4",name:"Data Retention",kind:"System",owner:"Kenji Tan",host:"privacy.atlas.dev",done:7,total:32,start:"Apr 27",end:"May 14",window:17,stage:"backlog",starred:false},{id:"m5",name:"Docs Portal",kind:"Area",owner:"Nina Santos",host:"docs.atlas.dev",done:2,total:14,start:"Apr 21",end:"May 05",window:14,stage:"blocked",starred:false},{id:"m6",name:"Help Center",kind:"Area",owner:"Sofia Romero",host:"help.atlas.dev",done:9,total:23,start:"Apr 23",end:"May 11",window:18,stage:"planned",starred:false},{id:"m7",name:"Identity Broker",kind:"System",owner:"Kenji Tan",host:"id.atlas.dev",done:24,total:27,start:"Apr 08",end:"Apr 25",window:17,stage:"progress",starred:false},{id:"m8",name:"Ledger Export",kind:"Feature",owner:"Marco Bianchi",host:"billing.atlas.dev",done:5,total:21,start:"Apr 29",end:"May 19",window:20,stage:"backlog",starred:false},{id:"m9",name:"Notification Hub",kind:"Feature",owner:"Lena Wade",host:"notify.atlas.dev",done:18,total:24,start:"Apr 15",end:"Apr 30",window:15,stage:"progress",starred:true},{id:"m10",name:"Search Index",kind:"System",owner:"Nora Vale",host:"search.atlas.dev",done:13,total:19,start:"Apr 18",end:"May 02",window:14,stage:"progress",starred:false},{id:"m11",name:"Usage Meter",kind:"Feature",owner:"Marco Bianchi",host:"meter.atlas.dev",done:3,total:18,start:"May 02",end:"May 22",window:20,stage:"planned",starred:false},{id:"m12",name:"Webhook Relay",kind:"System",owner:"Nina Santos",host:"hooks.atlas.dev",done:16,total:20,start:"Apr 11",end:"Apr 28",window:17,stage:"progress",starred:false}],
  P = e=>e.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join(""),
  T = {blocked:0,progress:1,planned:2,backlog:3};

function O({series:e}){
  let{stroke:a,fill:t}=useMemo(()=>{
    let a=Math.max(...e),t=Math.min(...e),r=a=>a/(e.length-1)*130+1,n=e=>37-(e-t)/(a-t||1)*32,s=line().x((e,a)=>r(a)).y(e=>n(e)).curve(_.G),l=area().x((e,a)=>r(a)).y0(40).y1(e=>n(e)).curve(_.G);
    return {stroke:s(e)??"",fill:l(e)??""};
  }, [e]);
  return (
    <svg aria-hidden="true" viewBox="0 0 132 40" preserveAspectRatio="none" className="h-10 w-full overflow-visible">
        <path d={t} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
        <path d={a} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={E} />
      </svg>
  );
}

let V = 2*Math.PI*14;

function H({pct:e}){
  return (
    <svg aria-hidden="true" width={34} height={34} viewBox="0 0 34 34" className="shrink-0 -rotate-90">
        <circle cx={17} cy={17} r={14} fill="none" strokeWidth={3} className="stroke-neutral-900/8 dark:stroke-neutral-100/8" />
        <circle cx={17} cy={17} r={14} fill="none" strokeWidth={3} strokeLinecap="round" strokeDasharray={V} strokeDashoffset={V-R(e,0,100)/100*V} className={E} />
      </svg>
  );
}

function K(){
  let e=useRef(null),[a,t]=useState(""),[f,_]=useState("name"),[g,E]=useState(true),[R,D]=useState(()=>Object.fromEntries(U.map(e=>[e.id,e.starred]))),[V,K]=useState(null),[G,q]=useState(false),{ref:J,edges:Q,onScroll:X}=function(){
    let e=useRef(null),[a,t]=useState({start:false,end:false}),r=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:r,scrollHeight:n,clientHeight:s}=a;
      t({start:r>1,end:Math.ceil(r+s)<n-1})
    }, []);
    return useEffect(()=>{
      r();
      let a=e.current,t=a?.ownerDocument.defaultView;
      if(!a||!t?.ResizeObserver)return;
      let n=new t.ResizeObserver(r);
      return observe(a),()=>disconnect();
    }, [r]),{ref:e,edges:a,onScroll:r};
  }();
  useEffect(()=>{
    if(!V)return;
    let a=e.current?.ownerDocument;
    if(!a)return;
    let t=e=>{
      let a=e.target;
      a?.closest("[data-row-menu]")||K(null)
    },r=e=>{
      "Escape"===e.key&&K(null)
    };
    return a.addEventListener("pointerdown",t),a.addEventListener("keydown",r),()=>{
      a.removeEventListener("pointerdown",t),a.removeEventListener("keydown",r)
    };
  }, [V]);
  let Y=useMemo(()=>{
    let e=a.trim().toLowerCase(),t=U.filter(a=>""===e||a.name.toLowerCase().includes(e)||a.owner.toLowerCase().includes(e)||a.host.toLowerCase().includes(e)),r=g?1:-1;
    return [...t].sort((e,a)=>"progress"===f?(e.done/e.total-a.done/a.total)*r:"window"===f?(e.window-a.window)*r:"stage"===f?(T[e.stage]-T[a.stage])*r:e.name.localeCompare(a.name)*r);
  }, [a,f,g]),Z=(e,a,t)=>(
    <th scope="col" aria-sort={f===e?g?"ascending":"descending":undefined} className={v(W,t)}>
        <button type="button" onClick={()=>{
          f===e?E(e=>!e):(_(e),E(true))
        }} aria-label={`Sort by ${a.toLowerCase()}`} data-sorted={f===e?"":undefined} className="-mx-1.5 inline-flex h-7 min-w-0 cursor-pointer items-center gap-1 rounded-[var(--rb-r-sm,6px)] px-1.5 hover:bg-neutral-900/5 hover:text-neutral-900 data-sorted:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:data-sorted:text-neutral-100">
          {a}
          <HugeiconsIcon icon={f===e?g?Icon_24513:Icon_20148:Icon_31517} size={12} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </th>
  );
  return (
    <div ref={e} className={v("bg-white dark:bg-neutral-950",w,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">
              <li>
                <a href="#" className="rounded-[var(--rb-r-sm,6px)] hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100">Home</a>
              </li>
              <li aria-hidden="true" className="text-neutral-900/66 dark:text-neutral-100/66 select-none">/</li>
              <li className={v("text-neutral-900 dark:text-neutral-100","truncate")}>Atlas</li>
            </ol>
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <div className={v("flex items-center *:not-first:-ms-1.5 *:not-last:[mask-image:radial-gradient(50%_50%_at_calc(150%-6px)_50%,transparent_calc(100%+1.5px),#000_calc(100%+2px))]","hidden sm:flex")}>
              {["Nora Vale","Lena Wade","Kenji Tan"].map(e=><span key={e} title={e} className={v(C,"size-[28px]")}><span className={L}>{P(e).charAt(0)}</span></span>)}
              <span className={v(C,"size-[28px]")}><span className={L}>+8</span></span>
            </div>
            <button type="button" className={v(A,S,"max-sm:hidden")}>
              <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
              Invite
            </button>
            <button type="button" className={v("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",S)}>
              <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
              Add module
            </button>
          </div>
        </header>
        <div className="shrink-0 px-4 pb-5 sm:px-6">
          <div className="@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900">
            <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
              {F.map(e=>(
                <div key={e.label} className={v("flex min-w-0 flex-col gap-2 px-4 py-3","@container")}>
                            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                              <h3 className={v("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","min-w-0 text-pretty")}>{e.label}</h3>
                              <span className={v("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80","shrink-0")}>
                                <HugeiconsIcon icon={e.delta>=0?Icon_1497:Icon_37502} size={12} strokeWidth={1.8} aria-hidden="true" />
                                <span className="sr-only">{e.delta>=0?"Up":"Down"}</span>
                                {e.delta>=0?"+":"−"}
                                {Math.abs(e.delta).toFixed(1)}
                                %
                              </span>
                            </div>
                            <div className="mt-auto flex items-end justify-between gap-4">
                              <div className="min-w-0">
                                <p className={v(y,j,"flex min-w-0 gap-2")}>
                                  <span className="truncate">{e.scope}</span>
                                  <span className="shrink-0">{e.period}</span>
                                </p>
                                <p className={v("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[32px]/[36px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100","mt-1")}>{e.value}</p>
                              </div>
                              <div className="hidden w-[132px] shrink-0 @min-[17rem]:block"><O series={e.series} /></div>
                            </div>
                          </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 sm:px-6 sm:pb-6">
          <div className={v("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
            <div className={v("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","flex-wrap justify-between py-3 has-[button]:pe-4")}>
              <div className="flex min-w-0 items-center gap-2">
                <h2 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Modules</h2>
                <span className={v("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>{Y.length}</span>
              </div>
              <div className="flex flex-1 items-center justify-end gap-2">
                <div className={v("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","w-full max-w-[260px] min-w-[140px]")}>
                  <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                    <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <input value={a} onChange={e=>t(e.target.value)} placeholder="Search modules" aria-label="Search modules" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                </div>
                <button type="button" onClick={()=>E(e=>!e)} className={v(A,S)}>
                  <HugeiconsIcon icon={Icon_91162} size={16} strokeWidth={1.8} aria-hidden="true" />
                  <span className="max-sm:sr-only">{g?"Ascending":"Descending"}</span>
                </button>
                <button type="button" className={v(A,S)}>
                  <HugeiconsIcon icon={Icon_68656} size={16} strokeWidth={1.8} aria-hidden="true" />
                  <span className="max-sm:sr-only">Filters</span>
                </button>
              </div>
            </div>
            <div className={v("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
              <div ref={J} onScroll={X} className="h-full overflow-y-auto">
                <table className="w-full border-separate border-spacing-0 text-left text-[14px]/[20px]">
                  <thead className={v("bg-white dark:bg-neutral-950","sticky top-0 z-10")}>
                    <tr className="h-9">
                      {Z("progress","Progress","sm:w-[190px]")}
                      {Z("name","Module")}
                      {Z("window","Window","hidden md:table-cell w-[190px]")}
                      {Z("stage","Status","hidden sm:table-cell w-[150px]")}
                      <th scope="col" className={v(W,"w-[112px] text-right")}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Y.map(e=>{
                      let a=Math.round(e.done/e.total*100);
                      return (
                        <tr key={e.id} className={v("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-[68px]")}>
                                            <td className={B}>
                                              <div className="flex items-center gap-2.5">
                                                <H pct={a} />
                                                <div className="min-w-0 max-sm:sr-only">
                                                  <p className={v(N,w,"tabular-nums")}>
                                                    {a}
                                                    % ready
                                                  </p>
                                                  <p className={v(y,j,"mt-0.5")}>
                                                    {e.done}
                                                    /
                                                    {e.total}
                                                    {" tasks"}
                                                  </p>
                                                </div>
                                              </div>
                                            </td>
                                            <td className={v(B,"w-full max-w-0")}>
                                              <p className={v(N,w,"truncate")}>{e.name}</p>
                                              <div className={v(y,j,"mt-1 flex items-center gap-1.5")}>
                                                <span className="shrink-0">{e.kind}</span>
                                                <span aria-hidden="true" className={v(C,"size-[16px]")}><span className={L}>{P(e.owner).charAt(0)}</span></span>
                                                <span className="truncate">{e.owner}</span>
                                                <span className={v("font-mono text-[12px]/[16px] tabular-nums","hidden truncate lg:inline")}>{e.host}</span>
                                              </div>
                                            </td>
                                            <td className={v(B,"hidden md:table-cell")}>
                                              <p className="tabular-nums">
                                                {e.start}
                                                {" – "}
                                                {e.end}
                                              </p>
                                              <p className={v(y,j,"mt-0.5")}>
                                                {e.window}
                                                -day window
                                              </p>
                                            </td>
                                            <td className={v(B,"hidden sm:table-cell")}>
                                              <span className={v("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",I[e.stage])}>
                                                {"progress"===e.stage&&<span className="flex h-lh shrink-0 items-center">
                                                  <span className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" aria-hidden="true" />
                                                </span>}
                                                {$[e.stage]}
                                              </span>
                                            </td>
                                            <td className={B}>
                                              <div className="flex items-center justify-end gap-0.5">
                                                <button type="button" aria-label={`Open ${e.name} spec`} className={v(M,z)}>
                                                  <HugeiconsIcon icon={Icon_31964} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                </button>
                                                <button type="button" aria-label={`${R[e.id]?"Unstar":"Star"} ${e.name}`} aria-pressed={R[e.id]} onClick={()=>D(a=>({...a,[e.id]:!a[e.id]}))} className={v(M,z)}>
                                                  <HugeiconsIcon icon={Icon_12556} size={16} strokeWidth={1.8} aria-hidden="true" className={v(R[e.id]&&"[&_path]:fill-current")} />
                                                </button>
                                                <div className="relative" data-row-menu>
                                                  <button type="button" aria-label={`More actions for ${e.name}`} aria-haspopup="menu" aria-expanded={V===e.id} onClick={a=>{
                                                    q((J.current?J.current.getBoundingClientRect().bottom-a.currentTarget.getBoundingClientRect().bottom:1/0)<152),K(a=>a===e.id?null:e.id)
                                                  }} className={v(M,z)}>
                                                    <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                  </button>
                                                  {V===e.id&&<div role="menu" aria-label={`${e.name} actions`} className={v("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute right-0 z-30 w-[168px] min-w-[168px]",G?"bottom-full mb-1":"top-full mt-1")}>
                                                    {["Rename module","Duplicate","Move to area","Archive"].map(e=><button key={e} type="button" role="menuitem" onClick={()=>K(null)} className="relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40">{e}</button>)}
                                                  </div>}
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                      );
                    })}
                  </tbody>
                </table>
                {0===Y.length&&<div className="flex h-[280px] flex-col items-center justify-center px-6 text-center">
                  <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">
                    No modules match “
                    {a}
                    ”
                  </p>
                  <p className={v("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Try a module name, an owner, or a hostname.</p>
                  <button type="button" onClick={()=>t("")} className={v(A,S,"mt-4")}>Clear search</button>
                </div>}
              </div>
              <div aria-hidden="true" className={v("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-10 h-8",Q.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={v("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",Q.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
      </div>
  );
}


export default K;
