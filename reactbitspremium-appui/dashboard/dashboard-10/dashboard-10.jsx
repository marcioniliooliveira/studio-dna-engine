/**
 * React Bits Pro — Application UI (dashboard-10)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_35619 = [["path",{d:"M17 21C18.8692 21 19.8038 21 20.5 20.5981C20.9561 20.3348 21.3348 19.9561 21.5981 19.5C22 18.8038 22 17.8692 22 16C22 14.1308 22 13.1962 21.5981 12.5C21.3348 12.0439 20.9561 11.6652 20.5 11.4019C19.8038 11 18.8692 11 17 11H7C5.13077 11 4.19615 11 3.5 11.4019C3.04394 11.6652 2.66523 12.0439 2.40192 12.5C2 13.1962 2 14.1308 2 16C2 17.8692 2 18.8038 2.40192 19.5C2.66523 19.9561 3.04394 20.3348 3.5 20.5981C4.19615 21 5.13077 21 7 21H17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16 6C15.0227 4.77354 13.5929 4 12 4C10.4071 4 8.97726 4.77354 8 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14 8C13.5114 7.38677 12.7965 7 12 7C11.2035 7 10.4886 7.38677 10 8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M5 14V18H6.5M19 18H17V16M17 16V14H19M17 16H18.5M9 14V18M11.5 14L13 18L14.5 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_99519 = [["path",{d:"M15.5 2V6M8.5 6V2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6.00446 7.61331C5.93719 6.74273 6.63957 6 7.53014 6H16.4699C17.3604 6 18.0628 6.74273 17.9955 7.61331L17.8117 9.99197C17.6796 11.7019 17.1011 13.3498 16.132 14.7773L15.5312 15.6622C14.9638 16.4979 14.0077 17 12.9838 17H11.0162C9.99228 17 9.03617 16.4979 8.46881 15.6622L7.86803 14.7773C6.89885 13.3498 6.32041 11.7019 6.18827 9.99197L6.00446 7.61331Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 17V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M11 9H13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_92881 = [["path",{d:"M3 19C3 18.535 3 18.3025 3.05111 18.1118C3.18981 17.5941 3.59413 17.1898 4.11177 17.0511C4.30252 17 4.53501 17 5 17H8C8.46499 17 8.69748 17 8.88823 17.0511C9.40587 17.1898 9.81019 17.5941 9.94889 18.1118C10 18.3025 10 18.535 10 19C10 19.465 10 19.6975 9.94889 19.8882C9.81019 20.4059 9.40587 20.8102 8.88823 20.9489C8.69748 21 8.46499 21 8 21H5C4.53501 21 4.30252 21 4.11177 20.9489C3.59413 20.8102 3.18981 20.4059 3.05111 19.8882C3 19.6975 3 19.465 3 19Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 5C14 4.53501 14 4.30252 14.0511 4.11177C14.1898 3.59413 14.5941 3.18981 15.1118 3.05111C15.3025 3 15.535 3 16 3H19C19.465 3 19.6975 3 19.8882 3.05111C20.4059 3.18981 20.8102 3.59413 20.9489 4.11177C21 4.30252 21 4.53501 21 5C21 5.46499 21 5.69748 20.9489 5.88823C20.8102 6.40587 20.4059 6.81019 19.8882 6.94889C19.6975 7 19.465 7 19 7H16C15.535 7 15.3025 7 15.1118 6.94889C14.5941 6.81019 14.1898 6.40587 14.0511 5.88823C14 5.69748 14 5.46499 14 5Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M9 12H8.5C6.567 12 5 10.433 5 8.5C5 6.567 6.56687 5 8.49987 5H14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10 19H15.5C17.433 19 19 17.433 19 15.5C19 13.567 17.4336 12 15.5006 12H15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10.6325 10.467C11.277 9.82235 11.5993 9.50001 11.9998 9.5C12.4003 9.49999 12.7226 9.82229 13.3672 10.4669L13.5332 10.6329C14.1777 11.2774 14.5 11.5997 14.5 12.0002C14.5 12.4007 14.1777 12.723 13.5331 13.3675L13.3673 13.5333C12.7227 14.1778 12.4005 14.5 12 14.5C11.5996 14.5 11.2773 14.1778 10.6328 13.5333L10.4669 13.3674C9.82231 12.7229 9.50003 12.4007 9.5 12.0002C9.49997 11.5997 9.82221 11.2774 10.4667 10.6329L10.6325 10.467Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_10303 = [["path",{d:"M6 12V8C6 7.05719 6 6.58579 6.29289 6.29289C6.58579 6 7.05719 6 8 6H12C12.9428 6 13.4142 6 13.7071 6.29289C14 6.58579 14 7.05719 14 8V12C14 12.9428 14 13.4142 13.7071 13.7071C13.4142 14 12.9428 14 12 14H8C7.05719 14 6.58579 14 6.29289 13.7071C6 13.4142 6 12.9428 6 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2 20V16C2 15.0572 2 14.5858 2.29289 14.2929C2.58579 14 3.05719 14 4 14H8C8.94281 14 9.41421 14 9.70711 14.2929C10 14.5858 10 15.0572 10 16V20C10 20.9428 10 21.4142 9.70711 21.7071C9.41421 22 8.94281 22 8 22H4C3.05719 22 2.58579 22 2.29289 21.7071C2 21.4142 2 20.9428 2 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M10 20V16C10 15.0572 10 14.5858 10.2929 14.2929C10.5858 14 11.0572 14 12 14H16C16.9428 14 17.4142 14 17.7071 14.2929C18 14.5858 18 15.0572 18 16V20C18 20.9428 18 21.4142 17.7071 21.7071C17.4142 22 16.9428 22 16 22H12C11.0572 22 10.5858 22 10.2929 21.7071C10 21.4142 10 20.9428 10 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 21.5L21.4142 18.0858C21.7032 17.7968 21.8478 17.6522 21.9239 17.4685C22 17.2847 22 17.0803 22 16.6716V12C22 11.0572 22 10.5858 21.7071 10.2929C21.4142 10 20.9428 10 20 10H18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M6 10L2.58579 13.4142C2.29676 13.7032 2.15224 13.8478 2.07612 14.0315C2 14.2153 2 14.4197 2 14.8284V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M14 13.5L17.317 10.5976C17.6532 10.3035 17.8213 10.1564 17.9106 9.95945C18 9.7625 18 9.53916 18 9.09246V4C18 3.05719 18 2.58579 17.7071 2.29289C17.4142 2 16.9428 2 16 2H11.2604C10.8845 2 10.6965 2 10.5248 2.06528C10.3531 2.13056 10.2126 2.25543 9.93167 2.50518L6.67127 5.40331C6.34077 5.69709 6.17552 5.84398 6.08776 6.03941C6 6.23484 6 6.45594 6 6.89813V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M14 6L17.5 2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M18 14L21.5 10.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_52975 = [["path",{d:"M15 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V9M20 4L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20 13C20 16.7712 20 18.6569 18.8284 19.8284C17.6569 21 15.7712 21 12 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V12C3 8.22876 3 6.34315 4.17157 5.17157C5.34315 4 7.22876 4 11 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  f = "text-neutral-900 dark:text-neutral-100",
  v = "text-neutral-900/66 dark:text-neutral-100/66",
  k = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  g = "text-[13px]/[18px] font-normal",
  _ = "text-[12px]/[16px] font-normal tabular-nums",
  j = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  w = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  N = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  y = "text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  M = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  A = "flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2",
  $ = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  S = "relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",
  z = "flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  D = "fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66",
  R = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  E = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  W = (e,a,t,r,l)=>r+(e-a)/(t-a||1)*(l-r),
  C = (e,a,t)=>Math.min(t,Math.max(a,e)),
  L = e=>e.toLocaleString("en-US");

function I(){
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

let B = Array.from({length:28},(e,a)=>{
  let t=28+a;
  return t>31?`${t-31} Sep`:`${t} Aug`;
}),
  F = (e,a,t)=>Array.from({length:28},(r,l)=>Math.round(a+(.5*Math.sin(.44*l+e)+.36*Math.sin(.17*l+1.6*e))*t)),
  O = e=>`${Math.floor(e/60)}:${String(Math.round(e%60)).padStart(2,"0")}`,
  P = [{key:"calls",label:"Calls",format:L,headline:L,series:F(1.2,77e3,6400)},{key:"duration",label:"Avg. duration",format:O,headline:O,series:F(3.4,171,22)},{key:"credits",label:"Total credits",unit:"credits",format:L,headline:L,series:F(5.1,33400,4800)},{key:"perCall",label:"Credits per call",unit:"credits",format:e=>e.toFixed(2),headline:e=>e.toFixed(2),series:F(7.6,43,7).map(e=>e/10)},{key:"llm",label:"Total LLM cost",format:e=>`$${L(e)}`,headline:e=>`$${L(e)}`,series:F(9.3,7258,980)},{key:"avgLlm",label:"Avg. LLM cost",format:e=>`$${e.toFixed(2)}`,headline:e=>`$${e.toFixed(2)}`,series:F(11.8,258,34).map(e=>e/1)}],
  U = [{name:"Docs support",scope:"help.center",calls:6424},{name:"Website concierge",scope:"www",calls:3942},{name:"Billing triage",scope:"billing",calls:1820},{name:"Onboarding guide",scope:"app.setup",calls:1194},{name:"Store assistant",scope:"shop",calls:1094},{name:"Returns desk",scope:"shop.returns",calls:812},{name:"Outage responder",scope:"status",calls:604},{name:"Renewal outreach",scope:"crm",calls:421}],
  H = [{name:"Transcript store",detail:"Response traces and grading",Icon:Icon_36586,live:true},{name:"Escalation channel",detail:"Handoff alerts to on-call",Icon:Icon_35619,live:true},{name:"Voice gateway",detail:"SIP routing and failover",Icon:Icon_99519,live:true},{name:"Workflow runner",detail:"Post-call actions and tickets",Icon:Icon_92881,live:false},{name:"Knowledge index",detail:"Retrieval corpus sync",Icon:Icon_10303,live:false}];

function T(){
  let[e,a]=useState("calls"),[t,n]=useState(null),[i,o]=function(){
    let e=useRef(null),[a,t]=useState({width:0,height:0});
    return useEffect(()=>{
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(([e])=>{
        let a=e.contentRect;
        t({width:a.width,height:a.height})
      });
      return observe(a),()=>disconnect();
    }, []),[e,a];
  }(),{ref:d,edges:c,onScroll:F}=I(),{ref:T,edges:K,onScroll:V}=I(),{ref:J,edges:G,onScroll:q}=I(),Y=P.find(a=>a.key===e)??P[0],Z=o.width,Q=o.height,X=Math.max(Z-40-1,1),ee=Math.max(Q-14-22,1),ea=useMemo(()=>{
    let e=Y.series;
    return {min:Math.min(...e),max:Math.max(...e),last:e[e.length-1]};
  }, [Y]),{base:et,top:er,ticks:el}=useMemo(()=>{
    let e=ea.max-ea.min||ea.max||1,a=Math.max(ea.max-ea.min,.08*ea.max),t=10**Math.floor(Math.log10(a/4||1)),r=a/4/t,l=(r<=1?1:r<=2?2:r<=5?5:10)*t,s=Math.max(Math.floor((ea.min-.35*e)/l)*l,0),n=Math.ceil((ea.max+.25*e)/l)*l,i=[];
    for(let e=s;e<=n+l/1e3;e+=l)i.push(e);
    return {base:s,top:n,ticks:i.length>6?i.filter((e,a)=>a%2==0):i};
  }, [ea.max,ea.min]),es=useMemo(()=>{
    if(0===Z)return null;
    let e=e=>40+W(e,0,Y.series.length-1,0,X),a=e=>14+ee-W(e,et,er,0,ee),t=line().x((a,t)=>e(t)).y(e=>a(e)).curve(p.G),r=area().x((a,t)=>e(t)).y0(14+ee).y1(e=>a(e)).curve(p.G);
    return {x:e,y:a,stroke:t(Y.series)??"",fill:r(Y.series)??""};
  }, [Z,X,ee,et,er,Y]),en=Math.ceil(28/C(Math.floor(X/64),2,7)),ei=Math.max(...U.map(e=>e.calls)),eo=U.reduce((e,a)=>e+a.calls,0),ed=null===t?ea.last:Y.series[t];
  return (
    <div className={b("bg-white dark:bg-neutral-950",f,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div ref={J} onScroll={q} className="flex min-h-0 flex-1 flex-col max-lg:overflow-y-auto">
            <div className={b(M,"shrink-0")}>
              <div role="tablist" aria-label="Metric" className="grid shrink-0 grid-cols-3 px-1 md:grid-cols-6">
                {P.map(t=>{
                  let l=t.key===e,s=t.series[t.series.length-1];
                  return (
                    <button key={t.key} type="button" role="tab" aria-selected={l} onClick={()=>{
                                    a(t.key),n(null)
                                  }} className={b("relative inline-flex min-h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900/80 select-none transition-[color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-neutral-900 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent aria-selected:text-neutral-900 aria-selected:after:bg-neutral-900 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-neutral-100 dark:disabled:text-neutral-100/40","py-3 text-left")}>
                                    <span className="flex w-full min-w-0 flex-col">
                                      <span className={b(g,"truncate")}>{t.label}</span>
                                      <span className="mt-1 flex items-baseline gap-1">
                                        <span className={b("text-[16px]/[20px] font-[450] tracking-[-0.015em]","shrink-0 tabular-nums")}>{t.headline(s)}</span>
                                        {t.unit&&<span className={b("ms-0.5 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","min-w-0 truncate")}>{t.unit}</span>}
                                      </span>
                                    </span>
                                  </button>
                  );
                })}
              </div>
              <div className={b($,"min-h-0 flex-1 p-4")}>
                <div className="flex shrink-0 flex-wrap items-end justify-between gap-x-3 gap-y-2">
                  <div className="min-w-0">
                    <p className={b(g,v,"flex min-w-0 gap-2")}>
                      <span className="truncate">{Y.label}</span>
                      <span className="shrink-0">{null===t?"last 28 days":B[t]}</span>
                    </p>
                    <p className={b("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[32px]/[36px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100","mt-0.5")}>{Y.format(ed)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <p className={b(_,v,"flex gap-3")}>
                      <span>
                        Min
                        {" "}
                        <span className={f}>{Y.format(ea.min)}</span>
                      </span>
                      <span>
                        Max
                        {" "}
                        <span className={f}>{Y.format(ea.max)}</span>
                      </span>
                    </p>
                    <button type="button" className={b(j,w)}>
                      Open report
                      <HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div ref={i} role="application" tabIndex={0} aria-label={`${Y.label} over the last 28 days`} onPointerMove={e=>{
                  let a=i.current;
                  if(!a||X<=0)return;
                  let t=a.getBoundingClientRect();
                  n(C(Math.round((e.clientX-t.left-40)/X*27),0,27))
                }} onPointerLeave={()=>n(null)} onKeyDown={e=>{
                  ("ArrowLeft"===e.key||"ArrowRight"===e.key)&&(e.preventDefault(),n(a=>C((a??27)+("ArrowRight"===e.key?1:-1),0,27)))
                }} onBlur={()=>n(null)} className={b("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","relative mt-3 h-[224px] shrink-0")}>
                  {es&&<svg width={Z} height={Q} className="overflow-visible" aria-hidden="true">
                    {el.map(e=>{
                      let a;
                      return (
                        <g key={e}>
                                            <line x1={40} x2={Z-1} y1={es.y(e)} y2={es.y(e)} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/5 dark:stroke-neutral-100/5" />
                                            <text x={0} y={es.y(e)} dy={-4} textAnchor="start" className={D}>
                                              {"duration"===Y.key?O(e):Math.abs(a=Math.round(100*e)/100)>=1e6?`${(a/1e6).toFixed(Math.abs(a)>=1e7?0:1)}M`:Math.abs(a)>=1e3?`${(a/1e3).toFixed(Math.abs(a)>=1e4?0:1)}k`:`${a}`}
                                            </text>
                                          </g>
                      );
                    })}
                    <path d={es.fill} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
                    <path d={es.stroke} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-neutral-900 dark:stroke-neutral-100" />
                    {B.map((e,a)=>a%en==0?<text key={e} x={es.x(a)} y={Q-4} textAnchor={0===a?"start":"middle"} className={D}>{e}</text>:null)}
                    {null!==t&&<g>
                      <line x1={es.x(t)} x2={es.x(t)} y1={14} y2={14+ee} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900 dark:stroke-neutral-100" />
                      <rect x={es.x(t)-4} y={es.y(Y.series[t])-4} width={8} height={8} className="fill-neutral-900 stroke-white stroke-2 dark:fill-neutral-100 dark:stroke-neutral-900" />
                    </g>}
                  </svg>}
                </div>
              </div>
            </div>
            <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 max-lg:flex-none lg:grid-cols-2">
              <div className={b(M,"lg:min-h-0")}>
                <div className={b(A,"justify-between py-3")}>
                  <div className="min-w-0">
                    <h3 className={N}>Busiest agents</h3>
                    <p className={b(y,"mt-0.5 flex min-w-0 gap-2")}>
                      <span className="truncate">Call volume</span>
                      <span className="shrink-0">
                        {L(eo)}
                        {" total"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={b($,"relative min-h-0 flex-1")}>
                  <div ref={d} onScroll={F} className="h-full overflow-y-auto">
                    <ul className={k}>
                      {U.map((e,a)=>(
                        <li key={e.name} className={b(S,"h-10 px-3")}>
                                            <span className={b(_,v,"w-4 shrink-0")}>{a+1}</span>
                                            <div className="relative min-w-0 flex-1">
                                              <span aria-hidden="true" className={b("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-xs,4px)]","absolute inset-y-0 left-0")} style={{width:`${e.calls/ei*100}%`}} />
                                              <span className={b(z,"relative px-2 py-1")}>
                                                <span className="truncate">{e.name}</span>
                                                <span className={b("font-mono text-[12px]/[16px] tabular-nums",v,"shrink-0 truncate")}>{e.scope}</span>
                                              </span>
                                            </div>
                                            <span className={b("text-[14px]/[16px] font-[450]","w-12 shrink-0 text-right tabular-nums")}>{L(e.calls)}</span>
                                          </li>
                      ))}
                    </ul>
                  </div>
                  <div aria-hidden="true" className={b(R,"pointer-events-none absolute inset-x-0 top-0 h-8",c.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={b(E,"pointer-events-none absolute inset-x-0 bottom-0 h-8",c.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
              <div className={b(M,"lg:min-h-0")}>
                <div className={b(A,"justify-between py-3 has-[button]:pe-4")}>
                  <div className="min-w-0">
                    <h3 className={N}>Integrations</h3>
                    <p className={b(y,"mt-0.5 truncate")}>
                      {H.filter(e=>e.live).length}
                      {" of"}
                      {" "}
                      {H.length}
                      {" connected"}
                    </p>
                  </div>
                  <button type="button" className={b(j,w)}>
                    Manage
                    <HugeiconsIcon icon={Icon_52975} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
                <div className={b($,"relative min-h-0 flex-1")}>
                  <div ref={T} onScroll={V} className="h-full overflow-y-auto">
                    <ul className={k}>
                      {H.map(e=>(
                        <li key={e.name} className={b(S,"h-[52px] px-3")}>
                                            <span className={b("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","size-9")}><HugeiconsIcon icon={e.Icon} size={16} strokeWidth={1.8} aria-hidden="true" /></span>
                                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                              <p className={z}><span className="truncate">{e.name}</span></p>
                                              <p className={b("line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","truncate")}>{e.detail}</p>
                                            </div>
                                            {e.live?<span className={b("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-neutral-900/80 dark:text-neutral-100/80")}>Connected</span>:<button type="button" className={b(j,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>Connect</button>}
                                          </li>
                      ))}
                    </ul>
                  </div>
                  <div aria-hidden="true" className={b(R,"pointer-events-none absolute inset-x-0 top-0 h-8",K.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={b(E,"pointer-events-none absolute inset-x-0 bottom-0 h-8",K.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={b(R,"pointer-events-none absolute inset-x-0 top-0 h-8",G.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={b(E,"pointer-events-none absolute inset-x-0 bottom-0 h-8",G.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default T;
