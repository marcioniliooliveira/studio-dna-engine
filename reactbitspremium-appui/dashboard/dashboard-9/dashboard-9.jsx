/**
 * React Bits Pro — Application UI (dashboard-9)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, push, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_78805 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 15H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 9H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_18327 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M12.1258 14H12.0008M12.1258 18H12.0008M7.625 14H7.5M7.625 18H7.5M16.625 14H16.5M12.2508 14C12.2508 14.1381 12.1389 14.25 12.0008 14.25C11.8628 14.25 11.7508 14.1381 11.7508 14C11.7508 13.8619 11.8628 13.75 12.0008 13.75C12.1389 13.75 12.2508 13.8619 12.2508 14ZM12.2508 18C12.2508 18.1381 12.1389 18.25 12.0008 18.25C11.8628 18.25 11.7508 18.1381 11.7508 18C11.7508 17.8619 11.8628 17.75 12.0008 17.75C12.1389 17.75 12.2508 17.8619 12.2508 18ZM7.75 14C7.75 14.1381 7.63807 14.25 7.5 14.25C7.36193 14.25 7.25 14.1381 7.25 14C7.25 13.8619 7.36193 13.75 7.5 13.75C7.63807 13.75 7.75 13.8619 7.75 14ZM7.75 18C7.75 18.1381 7.63807 18.25 7.5 18.25C7.36193 18.25 7.25 18.1381 7.25 18C7.25 17.8619 7.36193 17.75 7.5 17.75C7.63807 17.75 7.75 17.8619 7.75 18ZM16.75 14C16.75 14.1381 16.6381 14.25 16.5 14.25C16.3619 14.25 16.25 14.1381 16.25 14C16.25 13.8619 16.3619 13.75 16.5 13.75C16.6381 13.75 16.75 13.8619 16.75 14Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_12556 = [["path",{d:"M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_58661 = [["path",{d:"M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  m = "bg-white dark:bg-neutral-950",
  b = "text-neutral-900 dark:text-neutral-100",
  f = "text-neutral-900/66 dark:text-neutral-100/66",
  v = "text-[13px]/[18px] font-normal",
  k = "text-[14px]/[16px] font-[450]",
  g = "text-[12px]/[16px] font-normal tabular-nums",
  _ = "bg-[oklch(86%_0.12_195)] dark:bg-[oklch(86%_0.12_195)]",
  j = "bg-[oklch(82%_0.08_320)] dark:bg-[oklch(82%_0.08_320)]",
  w = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  N = "size-8 rounded-[var(--rb-r-sm,6px)]",
  y = "inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",
  M = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",
  A = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  $ = "flex items-center *:not-first:-ms-1.5 *:not-last:[mask-image:radial-gradient(50%_50%_at_calc(150%-6px)_50%,transparent_calc(100%+1.5px),#000_calc(100%+2px))]",
  S = "text-neutral-900/66 dark:text-neutral-100/66 select-none",
  z = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  D = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  R = "inline-block size-2 shrink-0",
  E = (e,a,t)=>Math.min(t,Math.max(a,e)),
  W = e=>e.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join(""),
  C = (e,a)=>.5*Math.sin(1.13*a+e)+.31*Math.sin(.41*a+2.3*e),
  L = ["Overview","Worklog","Files","Reports"],
  I = {client:_,internal:j},
  B = [{id:"p1",name:"Amara Ortiz",role:"Client delivery lead",target:32},{id:"p2",name:"Theo Mercer",role:"Platform engineer",target:40},{id:"p3",name:"Lena Hoffman",role:"Content systems editor",target:30},{id:"p4",name:"Idris Bello",role:"Integration engineer",target:38},{id:"p5",name:"Marta Kovac",role:"QA analyst",target:34},{id:"p6",name:"Rhys Calloway",role:"Solutions architect",target:24},{id:"p7",name:"Junia Alves",role:"Data migration lead",target:36}],
  F = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  O = ["Mar","Apr"],
  P = Array.from({length:4},(e,a)=>{
  let t=9+7*a;
  return {label:`${O[+(t>31)]} ${t>31?t-31:t} – ${O[+(t+6>31)]} ${t+6>31?t+6-31:t+6}`,dates:Array.from({length:7},(e,a)=>{
    let r=t+a;
    return r>31?`${O[1]} ${r-31}`:`${O[0]} ${r}`;
  }),cells:function(e){
    let a={};
    for(let[t,r]of B.entries()){
      let l=[];
      for(let a=0;a<7;a+=1){
        if(a>=5){
          push({hours:0,kind:"off"});
          continue
        }
        let s=C(1.7*t+3.1*e,a),n=E(Math.round(2*(r.target/5+2.6*s))/2,0,9);
        push({hours:n,kind:s>.42?"internal":"client"})
      }
      a[r.id]=l
    }
    return a;
  }(a)};
}),
  U = e=>{
  let a=Math.floor(e);
  return e-a>=.5?`${a}h 30m`:`${a}h`;
},
  H = [{label:"Account",icon:Icon_62714,title:"Northstar Commerce",meta:"Enterprise rollout",trailing:"flag"},{label:"Workspace",icon:Icon_78805,title:"portal.northstar.io",meta:"124k requests / day",trailing:"badge",badge:"Running"},{label:"Next review",icon:Icon_18327,title:"Apr 3, 2026",meta:"Client steering",trailing:"avatars"},{label:"Owner",icon:Icon_34951,title:"Amara Ortiz",meta:"Delivery lead",trailing:"avatar"}];

function T(){
  let[e,a]=useState("Overview"),[t,n]=useState(1),[i,o]=useState(false),[d,C]=useState(null),{ref:O,edges:T,onScroll:K}=function(){
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
  }(),V=P[t],J=useMemo(()=>{
    let e={};
    for(let a of B){
      let t=V.cells[a.id].reduce((e,a)=>e+a.hours,0);
      e[a.id]={hours:t,pct:Math.round(t/a.target*100)}
    }
    return e;
  }, [V]),G=B.reduce((e,a)=>e+J[a.id].hours,0),q=Math.round(B.reduce((e,a)=>e+V.cells[a.id].filter(e=>"client"===e.kind).reduce((e,a)=>e+a.hours,0),0)/(G||1)*100);
  return (
    <div className={p("bg-white dark:bg-neutral-950",b,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0 px-4 pt-5 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className={p("text-[20px]/[24px] font-[450] tracking-[-0.015em]",b)}>Delivery board</h1>
              <nav aria-label="Breadcrumb" className="mt-1">
                <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">
                  <li>Accounts</li>
                  <li aria-hidden="true" className={S}>/</li>
                  <li>Delivery</li>
                  <li aria-hidden="true" className={S}>/</li>
                  <li className={p("text-neutral-900 dark:text-neutral-100","truncate")}>Northstar rollout</li>
                </ol>
              </nav>
            </div>
            <button type="button" aria-label={i?"Unpin board":"Pin board"} aria-pressed={i} onClick={()=>o(e=>!e)} className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",N)}>
              <HugeiconsIcon icon={Icon_12556} size={16} strokeWidth={1.8} aria-hidden="true" className={p(i&&"[&_path]:fill-current")} />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div role="tablist" aria-label="Board sections" className="flex gap-4">
              {L.map(t=><button key={t} type="button" role="tab" aria-selected={t===e} onClick={()=>a(t)} className="relative inline-flex min-h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900/80 select-none transition-[color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-neutral-900 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent aria-selected:text-neutral-900 aria-selected:after:bg-neutral-900 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-neutral-100 dark:disabled:text-neutral-100/40">{t}</button>)}
            </div>
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <button type="button" aria-label="Add member" className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","size-7 rounded-[var(--rb-r-sm,6px)]")}>
                <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <div className={$}>
                {B.slice(0,3).map(e=><span key={e.id} title={e.name} className={p(M,"size-[28px]")}><span className={A}>{W(e.name).charAt(0)}</span></span>)}
                <span className={p(M,"size-[28px]")}><span className={A}>+6</span></span>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={p("border-b border-neutral-900/8 dark:border-neutral-100/8","h-px")} />
        </header>
        <div className="grid shrink-0 grid-cols-2 gap-3 px-4 py-5 md:grid-cols-4 sm:px-6">
          {H.map(e=>(
            <div key={e.label} className={p("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","p-3.5")}>
                    <div className="flex items-center justify-between gap-2">
                      <span className={p(v,f,"truncate")}>{e.label}</span>
                      <HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" className={p(f,"shrink-0")} />
                    </div>
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-2 pt-5">
                      <div className="min-w-0">
                        <p className={p(k,b,"truncate")}>{e.title}</p>
                        <p className={p(g,f,"mt-0.5 truncate")}>{e.meta}</p>
                      </div>
                      {"badge"===e.trailing&&<span className={p(y,"text-neutral-900 dark:text-neutral-100","shrink-0")}>
                        <span className="flex h-lh shrink-0 items-center">
                          <span className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" aria-hidden="true" />
                        </span>
                        {e.badge}
                      </span>}
                      {"flag"===e.trailing&&<span className={p(y,"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","shrink-0")}>At risk</span>}
                      {"avatars"===e.trailing&&<div className={p($,"shrink-0")}>
                        {B.slice(0,2).map(e=><span key={e.id} className={p(M,"size-[28px]")}><span className={A}>{W(e.name).charAt(0)}</span></span>)}
                        <span className={p(M,"size-[28px]")}><span className={A}>+1</span></span>
                      </div>}
                      {"avatar"===e.trailing&&<span className={p(M,"size-[28px]")}><span className={A}>{W(e.title)}</span></span>}
                    </div>
                  </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 sm:px-6 sm:pb-6">
          <div className={p("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
            <div className={p("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","flex-wrap justify-between py-3 has-[button]:pe-4")}>
              <div className="min-w-0">
                <h2 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Worklogs</h2>
                <p className={p("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 flex flex-wrap gap-x-2")}>
                  <span>
                    {U(G)}
                    {" logged"}
                  </span>
                  <span>
                    {q}
                    % client billable
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button type="button" aria-label="Previous week" disabled={0===t} onClick={()=>n(e=>Math.max(0,e-1))} className={p(w,N)}>
                  <HugeiconsIcon icon={Icon_58661} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <span aria-live="polite" className={p(k,b,"inline-flex h-8 min-w-[132px] items-center justify-center px-2.5 tabular-nums")}>{V.label}</span>
                <button type="button" aria-label="Next week" disabled={t===P.length-1} onClick={()=>n(e=>Math.min(P.length-1,e+1))} className={p(w,N)}>
                  <HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className={p("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
              <div ref={O} onScroll={K} className="h-full overflow-x-auto overflow-y-auto">
                <table className={p("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","min-w-[860px]")}>
                  <thead className={p(m,"sticky top-0 z-10")}>
                    <tr>
                      <th scope="col" className="sticky left-0 z-10 w-[212px]">
                        <div className={m}><div className={p(z,"flex h-9 items-center")}>People</div></div>
                      </th>
                      {V.dates.map((e,a)=>(
                        <th key={e} scope="col" className={p(z,"h-9")}>
                                            <span className="block text-center">
                                              {F[a]}
                                              {", "}
                                              {e}
                                            </span>
                                          </th>
                      ))}
                      <th scope="col" className={p(z,"h-9 w-[120px] text-right")}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {B.map(e=>{
                      let a=V.cells[e.id],t=J[e.id],l=d===e.id;
                      return (
                        <tr key={e.id} onPointerEnter={()=>C(e.id)} onPointerLeave={()=>C(null)} className={p("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-[78px]")}>
                                            <th scope="row" className={p(D,!l&&m,"sticky left-0 z-10 text-left")}>
                                              <div className="flex items-center gap-2.5">
                                                <span aria-hidden="true" className={M}><span className={A}>{W(e.name)}</span></span>
                                                <div className="min-w-0">
                                                  <p className={p(k,b,"truncate")}>{e.name}</p>
                                                  <p className={p(g,f,"mt-0.5 truncate")}>{e.role}</p>
                                                </div>
                                              </div>
                                            </th>
                                            {a.map((e,a)=>(
                                              <td key={a} className={D}>
                                                                    <div className="flex flex-col items-center gap-1.5">
                                                                      <span className={p(k,"off"===e.kind?f:b,"min-h-4 tabular-nums")}>
                                                                        {(e=>{
                                                                          if(0===e)return "";
                                                                          let a=Math.floor(e);
                                                                          return 0===a?"30m":e-a>=.5?`${a}h 30m`:`${a}h`;
                                                                        })(e.hours)}
                                                                      </span>
                                                                      <span aria-hidden="true" className={p("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","max-w-[76px]")}>
                                                                        <span className={p("off"!==e.kind&&I[e.kind],"block h-full")} style={{width:`${E(e.hours/9*100,0,100)}%`}} />
                                                                      </span>
                                                                      <span className={p(g,f)}>{"off"===e.kind?"Off":"client"===e.kind?"Client":"Internal"}</span>
                                                                    </div>
                                                                  </td>
                                            ))}
                                            <td className={p(D,"text-right tabular-nums")}>
                                              <p className={p(k,b)}>{U(t.hours)}</p>
                                              <p className={p(g,t.pct<75?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":f,"mt-0.5")}>
                                                {t.pct}
                                                {"% of "}
                                                {e.target}
                                                h
                                              </p>
                                            </td>
                                          </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div aria-hidden="true" className={p("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-10 h-8",T.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={p("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",T.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={p("flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2","shrink-0 flex-wrap justify-between")}>
              <div className={p(g,f,"flex items-center gap-4")}>
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className={p(R,_,"h-1 w-4")} />
                  Client
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className={p(R,j,"h-1 w-4")} />
                  Internal
                </span>
              </div>
              <p className={p(v,f,"flex flex-wrap gap-x-2")}>
                <span>
                  {B.length}
                  {" people"}
                </span>
                <span>
                  <span className={b}>{U(G)}</span>
                  {" this week"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}


export default T;
