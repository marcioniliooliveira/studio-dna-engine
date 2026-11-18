/**
 * React Bits Pro — Application UI (dashboard-11)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31453 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21 13V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 16L18 19M18 19L15 22M18 19L21 22M18 19L15 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_57466 = [["path",{d:"M4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 14L9.79289 11.2071C10.1834 10.8166 10.8166 10.8166 11.2071 11.2071L12.7929 12.7929C13.1834 13.1834 13.8166 13.1834 14.2071 12.7929L17 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_67812 = [["path",{d:"M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_87924 = [["path",{d:"M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_33786 = [["path",{d:"M14.9961 17H16.9961C19.7575 17 21.9961 14.7614 21.9961 12C21.9961 9.23858 19.7575 7 16.9961 7H14.9961M8.99609 17H6.99609C4.23467 17 1.99609 14.7614 1.99609 12C1.99609 9.23858 4.23467 7 6.99609 7H8.99609",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.49609 12H15.4961",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_52038 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20.8985 8C20.7706 6.69989 20.4816 5.82475 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C4.97975 21.6366 6.1277 21.8873 8 21.965",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 13V16L18 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let k = (...e)=>e.filter(Boolean).join(" "),
  j = "bg-neutral-900/8 dark:bg-neutral-100/8",
  w = "text-neutral-900 dark:text-neutral-100",
  N = "text-neutral-900/66 dark:text-neutral-100/66",
  y = "text-neutral-900 dark:text-neutral-100",
  A = "text-[14px]/[16px] font-[450]",
  S = "text-[12px]/[16px] font-normal tabular-nums",
  z = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  C = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  I = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  M = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  W = "text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  $ = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  D = "flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2",
  R = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  P = "relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7",
  U = "block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100",
  B = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  E = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  L = "text-right tabular-nums",
  T = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  H = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950";

function O(){
  let e=useRef(null),[a,t]=useState({start:false,end:false}),r=useCallback(()=>{
    let a=e.current;
    if(!a)return;
    let{scrollTop:r,scrollHeight:l,clientHeight:s}=a;
    t({start:r>1,end:Math.ceil(r+s)<l-1})
  }, []);
  return useEffect(()=>{
    r();
    let a=e.current,t=a?.ownerDocument.defaultView;
    if(!a||!t?.ResizeObserver)return;
    let l=new t.ResizeObserver(r);
    return observe(a),()=>disconnect();
  }, [r]),{ref:e,edges:a,onScroll:r};
}

let q = [{label:"Open gaps",Icon:Icon_31453,value:"11",meta:"before kickoff",delta:"−4",positive:true},{label:"Standby pool",Icon:Icon_88366,value:"24",meta:"ready workers",delta:"+7",positive:true},{label:"Swap risk",Icon:Icon_36474,value:"8%",meta:"of open requests",delta:"−2 pp",positive:true},{label:"Check score",Icon:Icon_20484,value:"4.8",meta:"site average",delta:"+0.3",positive:true},{label:"Crew tenure",Icon:Icon_57466,value:"146d",meta:"rolling median",delta:"+6d",positive:true}],
  J = {stable:"Stable",watch:"Watch",critical:"Critical",pending:"Pending"},
  Q = {stable:"text-neutral-900/80 dark:text-neutral-100/80",pending:"text-neutral-900 dark:text-neutral-100",watch:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",critical:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"},
  F = [{id:"c1",lead:"Mira Stone",role:"Harbor lead",coverage:94,note:"Adds two closers",relief:6,handoffs:2,health:"stable"},{id:"c2",lead:"Leo Grant",role:"Dispatch owner",coverage:81,note:"Driver window tight",relief:3,handoffs:5,health:"watch"},{id:"c3",lead:"Nora Vale",role:"Inventory coach",coverage:72,note:"Cycle count open",relief:2,handoffs:6,health:"critical"},{id:"c4",lead:"Theo Park",role:"Ramp lead",coverage:89,note:"Training overlap",relief:5,handoffs:3,health:"stable"},{id:"c5",lead:"Sana Qureshi",role:"Uptown floater",coverage:78,note:"Awaiting confirm",relief:4,handoffs:4,health:"pending"},{id:"c6",lead:"Alex Johnson",role:"Harbor stock",coverage:91,note:"Backfill locked",relief:7,handoffs:1,health:"stable"},{id:"c7",lead:"Priya Raman",role:"Night dispatch",coverage:86,note:"Two shifts merged",relief:5,handoffs:2,health:"stable"},{id:"c8",lead:"Dominic Hale",role:"Airport close",coverage:68,note:"Lead unassigned",relief:1,handoffs:8,health:"critical"}],
  V = [{id:"a1",Icon:Icon_59157,title:"3 swap approvals",detail:"Before 2 PM",cta:"Review"},{id:"a2",Icon:Icon_67812,title:"6 standby invites",detail:"North route",cta:"Invite"},{id:"a3",Icon:Icon_87924,title:"1 lead missing",detail:"Uptown close",cta:"Assign"},{id:"a4",Icon:Icon_33786,title:"Timecard sync",detail:"After approvals",cta:"Sync"},{id:"a5",Icon:Icon_52038,title:"2 route gaps",detail:"Airport, noon",cta:"Fill"},{id:"a6",Icon:Icon_20484,title:"Break audit",detail:"Two sites",cta:"Check"},{id:"a7",Icon:Icon_88366,title:"4 onboarding checks",detail:"New harbor crew",cta:"Open"}],
  G = (e,a)=>.5*Math.sin(.58*a+e)+.33*Math.sin(.21*a+1.4*e),
  K = Array.from({length:21},(e,a)=>Math.round(148+78*G(2.2,a))),
  X = Array.from({length:21},(e,a)=>Math.round(141+62*G(5.9,a))),
  Y = 1.06*Math.max(...K,...X);

function Z(){
  let[e,a]=useState({}),[t,n]=useState(null),{ref:i,edges:c,onScroll:o}=O(),{ref:d,edges:x,onScroll:h}=O(),{ref:u,edges:p,onScroll:b}=O(),G=V.filter(a=>!e[a.id]),Z=useMemo(()=>{
    let e=K.reduce((e,a)=>e+a,0),a=X.reduce((e,a)=>e+a,0);
    return {supply:e,forecast:a,gap:e-a};
  }, []),ee=t??20;
  return (
    <div className={k("bg-white dark:bg-neutral-950",w,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">
              <li>Workforce</li>
              <li aria-hidden="true" className="text-neutral-900/66 dark:text-neutral-100/66 select-none">/</li>
              <li aria-current="page" className={k("text-neutral-900 dark:text-neutral-100","truncate")}>Coverage</li>
            </ol>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <span className={k(I,"border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","h-auto self-stretch max-sm:hidden")}>Jun 22 – Jul 12</span>
            <button type="button" className={k("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",C)}>
              <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" />
              Export
            </button>
          </div>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div ref={u} onScroll={b} className="flex min-h-0 flex-1 flex-col max-lg:overflow-y-auto">
            <div className="shrink-0 px-4 pb-4 sm:px-6">
              <div className="@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900">
                <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
                  {q.map(e=>{
                    let a=e.delta.startsWith("−")||e.delta.startsWith("-");
                    return (
                      <div key={e.label} className="flex min-w-0 flex-col gap-2 px-4 py-3">
                                        <div className={k("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","flex items-start gap-2")}>
                                          <span className="flex h-lh shrink-0 items-center"><HugeiconsIcon icon={e.Icon} size={16} strokeWidth={1.8} aria-hidden="true" /></span>
                                          <span className="min-w-0 text-pretty">{e.label}</span>
                                        </div>
                                        <p className={k("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[32px]/[36px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100","mt-auto")}>{e.value}</p>
                                        <div className="flex items-baseline justify-between gap-2">
                                          <span className={k("text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66","truncate")}>{e.meta}</span>
                                          <span className={k("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80","shrink-0")}>
                                            <HugeiconsIcon icon={a?Icon_37502:Icon_1497} size={12} strokeWidth={1.8} aria-hidden="true" />
                                            <span className="sr-only">{a?"Down":"Up"}</span>
                                            {e.delta}
                                          </span>
                                        </div>
                                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 px-4 pb-4 max-lg:flex-none lg:grid-cols-[minmax(0,1fr)_320px] sm:px-6 sm:pb-6">
              <div className="flex flex-col gap-4 lg:min-h-0">
                <div className={k($,"min-h-0 flex-1")}>
                  <div className={k(D,"justify-between py-3")}>
                    <div className="min-w-0">
                      <h2 className={M}>Coverage review</h2>
                      <p className={k(W,"mt-0.5 truncate")}>Crew health by district</p>
                    </div>
                    <span className={k(I,"bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>
                      {F.length}
                      {" crews"}
                    </span>
                  </div>
                  <div className={k(R,"relative min-h-0 flex-1")}>
                    <div ref={i} onScroll={o} className="h-full overflow-y-auto">
                      <table className="w-full border-separate border-spacing-0 text-left text-[14px]/[20px]">
                        <thead className={k("bg-white dark:bg-neutral-950","sticky top-0 z-10")}>
                          <tr className="h-9">
                            <th scope="col" className={B}>Crew lead</th>
                            <th scope="col" className={B}>Coverage</th>
                            <th scope="col" className={k(B,"hidden w-[76px] sm:table-cell")}><span className="block text-right">Relief</span></th>
                            <th scope="col" className={k(B,"hidden w-[88px] sm:table-cell")}><span className="block text-right">Handoffs</span></th>
                            <th scope="col" className={k(B,"w-[112px]")}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {F.map(e=>(
                            <tr key={e.id} className={k("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-[62px]")}>
                                                    <td className={E}>
                                                      <div className="flex items-center gap-2.5">
                                                        <span aria-hidden="true" className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
                                                          <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                                                            {e.lead.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("")}
                                                          </span>
                                                        </span>
                                                        <div className="min-w-0">
                                                          <p className={k(A,"truncate")}>{e.lead}</p>
                                                          <p className={k(S,N,"mt-0.5 truncate")}>{e.role}</p>
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td className={E}>
                                                      <div className="flex items-baseline justify-between gap-3">
                                                        <span className={k(A,"tabular-nums")}>
                                                          {e.coverage}
                                                          %
                                                        </span>
                                                        <span className={k(S,N,"truncate max-sm:hidden")}>{e.note}</span>
                                                      </div>
                                                      <span aria-hidden="true" className={k(P,"mt-1.5")}>
                                                        <span className={"critical"===e.health?k("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full"):"watch"===e.health?k("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"):U} style={{width:`${Math.min(100,Math.max(0,e.coverage))}%`}} />
                                                      </span>
                                                    </td>
                                                    <td className={k(E,L,"hidden sm:table-cell")}>
                                                      {e.relief}
                                                      h
                                                    </td>
                                                    <td className={k(E,L,"hidden sm:table-cell")}>{e.handoffs}</td>
                                                    <td className={E}>
                                                      <span className={k("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",Q[e.health])}>{J[e.health]}</span>
                                                    </td>
                                                  </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div aria-hidden="true" className={k(T,"pointer-events-none absolute inset-x-0 top-10 h-8",c.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={k(H,"pointer-events-none absolute inset-x-0 bottom-0 h-8",c.end?"opacity-100":"opacity-0")} />
                  </div>
                </div>
                <div className={k("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shrink-0 p-4")}>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className={M}>Demand mix</h2>
                      <p className={k(W,"mt-0.5 flex min-w-0 gap-2")}>
                        <span className="truncate">Scheduled supply against forecast</span>
                        <span className="shrink-0">21 days</span>
                      </p>
                    </div>
                    <div className={k(S,N,"flex shrink-0 items-center gap-4")}>
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className={k(j,"h-2 w-4")} />
                        Supply
                        {" "}
                        <span className={w}>{Z.supply.toLocaleString("en-US")}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className={k(y,"h-0.5 w-4 bg-current")} />
                        Forecast
                        {" "}
                        <span className={w}>{Z.forecast.toLocaleString("en-US")}</span>
                      </span>
                      <span className={w}>
                        +
                        {Z.gap.toLocaleString("en-US")}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex h-[108px] items-end gap-[3px]" onPointerLeave={()=>n(null)}>
                    {K.map((e,a)=>{
                      let l=X[a],s=t===a;
                      return (
                        <div key={a} onPointerEnter={()=>n(a)} title={`Day ${a+1}: ${e} scheduled, ${l} forecast`} className={k(s&&"bg-neutral-900/9 dark:bg-neutral-100/9","relative flex h-full flex-1 cursor-default flex-col justify-end")}>
                                            <span aria-hidden="true" className={k(y,"absolute inset-x-0 h-[2px] bg-current")} style={{bottom:`${l/Y*100}%`}} />
                                            <span aria-hidden="true" className={k(j,"w-full")} style={{height:`${e/Y*100}%`}} />
                                          </div>
                      );
                    })}
                  </div>
                  <p aria-live="polite" className={k("text-[13px]/[18px] font-normal",N,"mt-2 flex gap-2 tabular-nums")}>
                    <span>
                      {"Day "}
                      {ee+1}
                    </span>
                    <span>
                      {K[ee]}
                      {" scheduled vs "}
                      {X[ee]}
                      {" "}
                      forecast
                    </span>
                  </p>
                </div>
              </div>
              <div className={k($,"lg:min-h-0")}>
                <div className={k(D,"justify-between py-3 has-[button]:pe-4")}>
                  <div className="min-w-0">
                    <h2 className={M}>Action queue</h2>
                    <p className={k(W,"mt-0.5 truncate")}>{0===G.length?"Nothing left before cutoff":`${G.length} before cutoff`}</p>
                  </div>
                  <button type="button" aria-label="Queue options" className={k("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]")}>
                    <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
                <div className={k(R,"relative min-h-0 flex-1")}>
                  <div ref={d} onScroll={h} className="h-full overflow-y-auto">
                    {0===G.length?<div className="flex h-full min-h-[220px] flex-col items-center justify-center px-6 text-center">
                      <HugeiconsIcon icon={Icon_90987} size={20} strokeWidth={1.8} aria-hidden="true" className={N} />
                      <p className={k("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-3")}>Queue is clear</p>
                      <p className={k("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Every item was handled before the cutoff.</p>
                      <button type="button" onClick={()=>a({})} className={k(z,C,"mt-4")}>Restore queue</button>
                    </div>:<ul className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
                      {G.map(e=>(
                        <li key={e.id} className={k("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","px-3")}>
                                            <span className={k("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","size-9")}><HugeiconsIcon icon={e.Icon} size={16} strokeWidth={1.8} aria-hidden="true" /></span>
                                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                              <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.title}</span></p>
                                              <p data-description className={k("line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","truncate")}>{e.detail}</p>
                                            </div>
                                            <button type="button" onClick={()=>a(a=>({...a,[e.id]:true}))} aria-label={`${e.cta}: ${e.title}`} className={k(z,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>{e.cta}</button>
                                          </li>
                      ))}
                    </ul>}
                  </div>
                  <div aria-hidden="true" className={k(T,"pointer-events-none absolute inset-x-0 top-0 h-8",x.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={k(H,"pointer-events-none absolute inset-x-0 bottom-0 h-8",x.end?"opacity-100":"opacity-0")} />
                </div>
                <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap gap-x-2 tabular-nums">
                      <span>Cutoff 2:00 PM</span>
                      <span>
                        {V.length-G.length}
                        {" of "}
                        {V.length}
                        {" cleared"}
                      </span>
                    </p>
                    <span aria-hidden="true" className={k(P,"mt-2")}><span className={U} style={{width:`${(V.length-G.length)/V.length*100}%`}} /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={k(T,"pointer-events-none absolute inset-x-0 top-0 h-8",p.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={k(H,"pointer-events-none absolute inset-x-0 bottom-0 h-8",p.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default Z;
