/**
 * React Bits Pro — Application UI (dashboard-12)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_59309 = [["path",{d:"M2.01733 15C4.2169 15 6.00001 16.7831 6.00001 18.9827",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 18.9827V18.8908C18 16.742 19.742 15 21.8908 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.00001 5.01733C6.00001 7.2169 4.2169 9.00001 2.01733 9.00001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 5.01733C18 7.19765 19.769 8.96876 21.9423 8.9996",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 5H8C5.17157 5 3.75736 5 2.87868 5.87868C2 6.75736 2 8.17157 2 11V13C2 15.8284 2 17.2426 2.87868 18.1213C3.75736 19 5.17157 19 8 19H16C18.8284 19 20.2426 19 21.1213 18.1213C22 17.2426 22 15.8284 22 13V11C22 8.17157 22 6.75736 21.1213 5.87868C20.2426 5 18.8284 5 16 5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_82270 = [["path",{d:"M12.125 5.75H12M12.25 5.75C12.25 5.88807 12.1381 6 12 6C11.8619 6 11.75 5.88807 11.75 5.75C11.75 5.61193 11.8619 5.5 12 5.5C12.1381 5.5 12.25 5.61193 12.25 5.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5 9V19M9 9V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15 9V19M19 9V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21.3518 9H2.64822C2.29022 9 2 8.70651 2 8.34447C2 8.12259 2.11099 7.91577 2.29495 7.79485L8.73007 3.56485C10.3171 2.52162 11.1107 2 12 2C12.8893 2 13.6829 2.52162 15.2699 3.56485L21.7051 7.79485C21.889 7.91577 22 8.12259 22 8.34447C22 8.70651 21.7098 9 21.3518 9Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M21.0397 20.2929L20.3519 19.5858C20.0707 19.2968 19.9301 19.1522 19.7514 19.0761C19.5726 19 19.3738 19 18.9762 19H5.02382C4.62621 19 4.4274 19 4.24863 19.0761C4.06987 19.1522 3.92929 19.2968 3.64814 19.5858L2.9603 20.2929C2.25356 21.0194 1.9002 21.3827 2.02456 21.6913C2.14893 22 2.64867 22 3.64814 22H20.3519C21.3513 22 21.8511 22 21.9754 21.6913C22.0998 21.3827 21.7464 21.0194 21.0397 20.2929Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_92190 = [["path",{d:"M11 6L21 6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 12L21 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 18L21 18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_95735 = [["path",{d:"M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 16H11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 16L18 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 9H22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_83838 = [["path",{d:"M14 3H5C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7H18C18 6.07003 18 5.60504 17.8978 5.22354C17.6204 4.18827 16.8117 3.37962 15.7765 3.10222C15.395 3 14.93 3 14 3Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V13C21 10.1716 21 8.75736 20.1213 7.87868C19.2426 7 17.8284 7 15 7H7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12H19C18.535 12 18.3025 12 18.1118 12.0511C17.5941 12.1898 17.1898 12.5941 17.0511 13.1118C17 13.3025 17 13.535 17 14C17 14.465 17 14.6975 17.0511 14.8882C17.1898 15.4059 17.5941 15.8102 18.1118 15.9489C18.3025 16 18.535 16 19 16H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let k = (...e)=>e.filter(Boolean).join(" "),
  _ = "text-neutral-900 dark:text-neutral-100",
  v = "text-neutral-900/66 dark:text-neutral-100/66",
  g = "text-[13px]/[18px] font-normal",
  j = "text-[14px]/[16px] font-[450]",
  w = "text-[12px]/[16px] font-normal tabular-nums",
  N = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  y = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  M = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  A = "bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100",
  R = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  S = "text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  z = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  $ = "flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2",
  B = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  I = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  L = "fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66",
  V = "fill-neutral-900 stroke-white stroke-2 dark:fill-neutral-100 dark:stroke-neutral-900",
  W = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  C = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950";

function D(){
  let e=useRef(null),[t,a]=useState({start:false,end:false}),r=useCallback(()=>{
    let t=e.current;
    if(!t)return;
    let{scrollTop:r,scrollHeight:n,clientHeight:s}=t;
    a({start:r>1,end:Math.ceil(r+s)<n-1})
  }, []);
  return useEffect(()=>{
    r();
    let t=e.current,a=t?.ownerDocument.defaultView;
    if(!t||!a?.ResizeObserver)return;
    let n=new a.ResizeObserver(r);
    return observe(t),()=>disconnect();
  }, [r]),{ref:e,edges:t,onScroll:r};
}

let E = (e,t,a,r,n)=>r+(e-t)/(a-t||1)*(n-r),
  P = (e,t,a)=>Math.min(a,Math.max(t,e)),
  F = e=>Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`,
  O = e=>`$${e.toLocaleString("en-US")}`,
  H = (e,t)=>.5*Math.sin(.36*t+e)+.34*Math.sin(.14*t+1.8*e),
  J = Array.from({length:30},(e,t)=>{
  let a=12+t;
  return a>30?`Jun ${a-30}`:`May ${a}`;
}),
  q = Array.from({length:30},(e,t)=>Math.round(41e3+12500*H(2.6,t))),
  G = Array.from({length:30},(e,t)=>Math.round(9400+3100*H(6.4,t))),
  T = [{label:"Released today",meta:"17 payouts",value:O(212480),Icon:Icon_59309},{label:"Buffer",meta:"Under review",value:O(83040),Icon:Icon_20484},{label:"Sweep lanes",meta:"Funds moving",value:"3",Icon:Icon_82270},{label:"Moves",meta:"Ledger depth",value:"11",Icon:Icon_92190}],
  U = [{id:"l1",name:"Studio card",meta:["Daily clear","today"],amount:284650,mask:"•••• 4576",Icon:Icon_95735},{id:"l2",name:"Royalty vault",meta:["Weekly sweep","Friday"],amount:153980,mask:"•••• 9132",Icon:Icon_82270},{id:"l3",name:"Collab wallet",meta:["Creator split","queued"],amount:67240,mask:"•••• 2841",Icon:Icon_83838},{id:"l4",name:"Reserve account",meta:["Month end","holding"],amount:41500,mask:"•••• 7710",Icon:Icon_20484}],
  K = [{id:"m1",ref:"MV-40812",party:"Halvorsen Studio",channel:"Bank transfer",amount:84200,state:"settled",when:"09:41"},{id:"m2",ref:"MV-40811",party:"Petit Sound Co.",channel:"Instant card",amount:12640,state:"settled",when:"09:12"},{id:"m3",ref:"MV-40809",party:"Aranyi Collective",channel:"Bank transfer",amount:46900,state:"clearing",when:"08:55"},{id:"m4",ref:"MV-40806",party:"L\xf8ken Media",channel:"Wallet split",amount:9180,state:"settled",when:"08:30"},{id:"m5",ref:"MV-40804",party:"Osei & Partners",channel:"Bank transfer",amount:31450,state:"held",when:"08:04"},{id:"m6",ref:"MV-40801",party:"Sundar Archive",channel:"Instant card",amount:5720,state:"settled",when:"07:48"},{id:"m7",ref:"MV-40799",party:"Miralles Press",channel:"Wallet split",amount:18330,state:"clearing",when:"07:22"},{id:"m8",ref:"MV-40795",party:"Brekke Audio",channel:"Bank transfer",amount:24060,state:"settled",when:"06:59"},{id:"m9",ref:"MV-40792",party:"Northlight Rooms",channel:"Instant card",amount:7410,state:"settled",when:"06:31"},{id:"m10",ref:"MV-40788",party:"Fern & Object",channel:"Wallet split",amount:15880,state:"held",when:"06:05"},{id:"m11",ref:"MV-40784",party:"Quiet Harbour Ltd",channel:"Bank transfer",amount:39720,state:"settled",when:"05:44"}],
  Q = {settled:{label:"Settled",tone:"text-neutral-900/80 dark:text-neutral-100/80"},clearing:{label:"Clearing",tone:"text-neutral-900 dark:text-neutral-100"},held:{label:"Held",tone:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]"}};

function X(){
  let[e,t]=useState(null),[a,l]=useState(false),[d,c]=function(){
    let e=useRef(null),[t,a]=useState({width:0,height:0});
    return useEffect(()=>{
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(([e])=>{
        let t=e.contentRect;
        a({width:t.width,height:t.height})
      });
      return observe(t),()=>disconnect();
    }, []),[e,t];
  }(),{ref:o,edges:x,onScroll:H}=D(),{ref:X,edges:Y,onScroll:Z}=D(),{ref:ee,edges:et,onScroll:ea}=D(),er=c.width,en=c.height,es=Math.max(er-46-6,1),el=Math.max(en-12-22,1),{top:ei,ticks:ed}=useMemo(()=>(function(e,t=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let a=e/t,r=10**Math.floor(Math.log10(a)),n=a/r,s=(n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*r,l=Math.ceil(e/s)*s,i=[];
    for(let e=0;e<=l+s/1e3;e+=s)i.push(e);
    return {top:l,ticks:i};
  })(1.1*Math.max(...q),4), []),ec=useMemo(()=>{
    if(0===er)return null;
    let e=e=>46+E(e,0,29,0,es),t=e=>12+el-E(e,0,ei,0,el),a=line().x((t,a)=>e(a)).y(e=>t(e)).curve(b.G),r=area().x((t,a)=>e(a)).y0(12+el).y1(e=>t(e)).curve(b.G);
    return {x:e,y:t,receiptsLine:a(q)??"",receiptsArea:r(q)??"",bufferLine:a(G)??""};
  }, [er,es,el,ei]),eo=Math.round(96370/225e3*100),ex=U.reduce((e,t)=>e+t.amount,0),eu=es/(29/7)<72?14:7;
  return (
    <div className={k("bg-white dark:bg-neutral-950",_,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">
              <li>Finance</li>
              <li aria-hidden="true" className="text-neutral-900/66 dark:text-neutral-100/66 select-none">/</li>
              <li aria-current="page" className={k("text-neutral-900 dark:text-neutral-100","truncate")}>Payout studio</li>
            </ol>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <span className={k(M,"border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","h-auto self-stretch max-sm:hidden")}>May 12 – Jun 10</span>
            <button type="button" className={k(N,y)}>
              <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" />
              Export
            </button>
          </div>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div ref={ee} onScroll={ea} className="flex min-h-0 flex-1 flex-col max-lg:overflow-y-auto">
            <div className="flex shrink-0 flex-col gap-4 px-4 pt-1 pb-4 sm:px-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h1 className={k("text-[20px]/[24px] font-[450] tracking-[-0.015em]",_)}>Royalty desk</h1>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={k(M,A)}>Creator finance</span>
                    <span className={k(g,v,"truncate")}>Thursday, Jun 25</span>
                  </div>
                  <p className={k(g,v,"mt-0.5")}>Next payout closes at 4:00 PM.</p>
                </div>
                <div className="flex min-w-0 flex-wrap items-end gap-4">
                  <div className="min-w-0 text-right">
                    <p className={k(g,v)}>Clear to release</p>
                    <p className={k("text-[40px]/[44px] font-[450] tabular-nums",_,"mt-0.5")}>{O(505870)}</p>
                    <p className={k(g,v,"mt-0.5 tabular-nums")}>
                      {O(49300)}
                      {" still settling"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 pb-1">
                    <button type="button" className={k("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",y)}>
                      <HugeiconsIcon icon={Icon_55410} size={16} strokeWidth={1.8} aria-hidden="true" />
                      Split
                    </button>
                    <button type="button" onClick={()=>l(true)} className={k(N,y)}>
                      <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" className={a?v:undefined} />
                      {a?"Synced":"Sync"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900">
                <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
                  {T.map(e=>(
                    <div key={e.label} className="flex min-w-0 flex-col gap-2 px-4 py-3">
                                    <div className={k("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","flex items-start gap-2")}>
                                      <span className="flex h-lh shrink-0 items-center"><HugeiconsIcon icon={e.Icon} size={16} strokeWidth={1.8} aria-hidden="true" /></span>
                                      <span className="min-w-0 text-pretty">{e.label}</span>
                                    </div>
                                    <div className="mt-auto flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
                                      <span className={k("text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66","truncate")}>{e.meta}</span>
                                      <span className={k("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100","shrink-0")}>{e.value}</span>
                                    </div>
                                  </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 px-4 pb-4 max-lg:flex-none lg:grid-cols-[minmax(0,1fr)_336px] sm:px-6 sm:pb-6">
              <div className={k(z,"lg:min-h-0")}>
                <div className={k($,"flex-wrap justify-between py-3")}>
                  <div className="min-w-0">
                    <h2 className={R}>Royalty pace</h2>
                    <p className={k(S,"mt-0.5 truncate")}>{null===e?"Daily receipts against buffer draw":J[e]}</p>
                  </div>
                  <div className={k(w,v,"flex shrink-0 items-center gap-4")}>
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true" className={k("text-neutral-900 dark:text-neutral-100","h-1 w-4 bg-current")} />
                      Receipts
                      {" "}
                      <span className={_}>{null===e?`$${F(q[29])}`:`$${F(q[e])}`}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true" className={k("text-neutral-900/66 dark:text-neutral-100/66","h-1 w-4 bg-current")} />
                      Buffer
                      {" "}
                      <span className={_}>{null===e?`$${F(G[29])}`:`$${F(G[e])}`}</span>
                    </span>
                  </div>
                </div>
                <div className={k(B,"min-h-0 flex-1")}>
                  <div ref={d} role="application" tabIndex={0} aria-label="Daily receipts against buffer draw over 30 days" onPointerMove={e=>{
                    let a=d.current;
                    if(!a||es<=0)return;
                    let r=a.getBoundingClientRect();
                    t(P(Math.round((e.clientX-r.left-46)/es*29),0,29))
                  }} onPointerLeave={()=>t(null)} onKeyDown={e=>{
                    ("ArrowLeft"===e.key||"ArrowRight"===e.key)&&(e.preventDefault(),t(t=>P((t??29)+("ArrowRight"===e.key?1:-1),0,29)))
                  }} onBlur={()=>t(null)} className={k("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","relative h-[244px] shrink-0 px-3 pt-3 pb-1")}>
                    {ec&&<svg width={er} height={en} className="overflow-visible" aria-hidden="true">
                      {ed.map(e=>(
                        <g key={e}>
                                            <line x1={46} x2={er-6} y1={ec.y(e)} y2={ec.y(e)} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/5 dark:stroke-neutral-100/5" />
                                            <text x={38} y={ec.y(e)} dy={3.5} textAnchor="end" className={L}>
                                              $
                                              {F(e)}
                                            </text>
                                          </g>
                      ))}
                      <path d={ec.receiptsArea} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
                      <path d={ec.bufferLine} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-neutral-900/66 dark:stroke-neutral-100/66" />
                      <path d={ec.receiptsLine} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-neutral-900 dark:stroke-neutral-100" />
                      {J.map((e,t)=>t%eu==0&&t<27||29===t?<text key={e} x={ec.x(t)} y={en-2} textAnchor={0===t?"start":29===t?"end":"middle"} className={L}>{e}</text>:null)}
                      {null!==e&&<g>
                        <line x1={ec.x(e)} x2={ec.x(e)} y1={12} y2={12+el} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900 dark:stroke-neutral-100" />
                        <rect x={ec.x(e)-4} y={ec.y(G[e])-4} width={8} height={8} className={V} />
                        <rect x={ec.x(e)-4} y={ec.y(q[e])-4} width={8} height={8} className={V} />
                      </g>}
                    </svg>}
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col">
                    <div className="flex shrink-0 items-center justify-between gap-2 px-4 pt-3 pb-2">
                      <h3 className={R}>Recent moves</h3>
                      <span className="shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">
                        {K.length}
                        {" today"}
                      </span>
                    </div>
                    <div className="relative min-h-0 flex-1">
                      <div ref={o} onScroll={H} className="h-full overflow-y-auto">
                        <table className="w-full border-separate border-spacing-0 text-left text-[14px]/[20px]">
                          <thead className={k("bg-white dark:bg-neutral-950","sticky top-0 z-10")}>
                            <tr>
                              {["Reference","Recipient","Route","State","Amount"].map((e,t)=><th key={e} scope="col" className={k("h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",(2===t||3===t)&&"hidden sm:table-cell")}>{4===t?<span className="block text-right">{e}</span>:e}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {K.map(e=>(
                              <tr key={e.id} className="group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9">
                                                        <td className={k(I,"h-11")}>
                                                          <span className={k("inline-flex h-5 min-w-5 shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 font-mono text-[12px]/[16px] tabular-nums text-neutral-900 dark:text-neutral-100","bg-neutral-900/9 dark:bg-neutral-100/9")}>{e.ref}</span>
                                                        </td>
                                                        <td className={k(I,"h-11")}>
                                                          <span className={k(j,"block truncate")}>{e.party}</span>
                                                          <span className={k(w,v,"mt-0.5 block")}>{e.when}</span>
                                                        </td>
                                                        <td className={k(I,"hidden h-11 sm:table-cell")}>{e.channel}</td>
                                                        <td className={k(I,"hidden h-11 sm:table-cell")}>
                                                          <span className={k("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",Q[e.state].tone)}>
                                                            {"clearing"===e.state&&<span className="flex h-lh shrink-0 items-center">
                                                              <span className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" aria-hidden="true" />
                                                            </span>}
                                                            {Q[e.state].label}
                                                          </span>
                                                        </td>
                                                        <td className={k(I,"text-right tabular-nums","h-11")}>{O(e.amount)}</td>
                                                      </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div aria-hidden="true" className={k(W,"pointer-events-none absolute inset-x-0 top-10 h-8",x.start?"opacity-100":"opacity-0")} />
                      <div aria-hidden="true" className={k(C,"pointer-events-none absolute inset-x-0 bottom-0 h-8",x.end?"opacity-100":"opacity-0")} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={k(z,"lg:min-h-0")}>
                <div className={k($,"justify-between py-3")}>
                  <div className="min-w-0">
                    <h2 className={R}>Release room</h2>
                    <p className={k(S,"mt-0.5 truncate")}>Buffer and sweep lanes</p>
                  </div>
                  <span className={k(M,A)}>Vault sweep</span>
                </div>
                <div className={k(B,"min-h-0 flex-1")}>
                  <div className="shrink-0 px-3 py-3.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className={k(g,"text-neutral-900/80 dark:text-neutral-100/80")}>Buffer drawn</span>
                      <span className={k(j,"tabular-nums")}>
                        {eo}
                        %
                      </span>
                    </div>
                    <span aria-hidden="true" className={k("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-2 h-1.5")}>
                      <span className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${eo}%`}} />
                    </span>
                    <div className={k(w,v,"mt-2 flex items-baseline justify-between gap-2")}>
                      <span>
                        {O(96370)}
                        {" held"}
                      </span>
                      <span>
                        {O(225e3)}
                        {" limit"}
                      </span>
                    </div>
                    <button type="button" className={k(N,y,"mt-3.5 w-full")}>
                      <HugeiconsIcon icon={Icon_20484} size={16} strokeWidth={1.8} aria-hidden="true" />
                      Tune buffer
                    </button>
                  </div>
                  <div className="relative min-h-0 flex-1">
                    <div ref={X} onScroll={Z} className="h-full overflow-y-auto">
                      <ul className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
                        {U.map(e=>(
                          <li key={e.id} className={k("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","px-3")}>
                                                <span className={k("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","size-9")}><HugeiconsIcon icon={e.Icon} size={16} strokeWidth={1.8} aria-hidden="true" /></span>
                                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                  <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.name}</span></p>
                                                  <p data-description className={k("line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","truncate")}>
                                                    <span>{e.meta[0]}</span>
                                                    <span className="ms-2">{e.meta[1]}</span>
                                                  </p>
                                                </div>
                                                <div className="shrink-0 text-right">
                                                  <p className={k(j,"tabular-nums")}>{O(e.amount)}</p>
                                                  <p className={k("font-mono text-[12px]/[16px] tabular-nums",v,"mt-0.5")}>{e.mask}</p>
                                                </div>
                                              </li>
                        ))}
                      </ul>
                    </div>
                    <div aria-hidden="true" className={k(W,"pointer-events-none absolute inset-x-0 top-0 h-8",Y.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={k(C,"pointer-events-none absolute inset-x-0 bottom-0 h-8",Y.end?"opacity-100":"opacity-0")} />
                  </div>
                </div>
                <div className={k("flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2","justify-between")}>
                  <span>
                    {U.length}
                    {" lanes queued"}
                  </span>
                  <span className={k(j,_,"tabular-nums")}>{O(ex)}</span>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={k(W,"pointer-events-none absolute inset-x-0 top-0 h-8",et.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={k(C,"pointer-events-none absolute inset-x-0 bottom-0 h-8",et.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default X;
