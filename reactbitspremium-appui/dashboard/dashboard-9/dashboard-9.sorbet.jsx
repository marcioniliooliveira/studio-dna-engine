/**
 * React Bits Pro — Application UI (dashboard-9 (Sorbet))
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

let d = (...e)=>e.filter(Boolean).join(" ");

let x = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/62 dark:text-neutral-100/62";

let h = "text-[13px]/[16px] font-semibold tabular-nums";

let b = [28,31,30,36,34,41,44,43,49,52,58,61];

let p = [70,72,71,74,78,79,83,86,88,90,93,97];

let u = [61,59,60,58,57,55,56,54,53,52,51,49];

let m = [12,13,12,14,13,15,14,16,15,17,16,18];

let aZ = (...e)=>e.filter(Boolean).join(" ");

let a0 = "bg-white dark:bg-neutral-950";

let a1 = "text-neutral-900 dark:text-neutral-100";

let a2 = "text-neutral-900/62 dark:text-neutral-100/62";

let a5 = "text-[14px]/[20px] font-medium";

let a6 = "text-[15px]/[20px] font-bold";

let a8 = "text-[13px]/[16px] font-semibold tabular-nums";

let a4 = "bg-[oklch(80%_0.12_220)] dark:bg-[oklch(80%_0.12_220)]";

let a9 = "bg-[oklch(82%_0.11_345)] dark:bg-[oklch(82%_0.11_345)]";

let a3 = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let a7 = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let re = "inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums";

let ra = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none";

let rr = "flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]";

let rt = "flex items-center *:not-first:-ms-1.5 *:not-last:[mask-image:radial-gradient(50%_50%_at_calc(150%-6px)_50%,transparent_calc(100%+1.5px),#000_calc(100%+2px))]";

let rl = "text-neutral-900/62 dark:text-neutral-100/62 select-none";

let rn = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let rs = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let ri = "inline-block size-2.5 shrink-0 rounded-full";

let ro = (e,a,r)=>Math.min(r,Math.max(a,e));

let rc = e=>e.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("");

let rd = (e,a)=>.5*Math.sin(1.13*a+e)+.31*Math.sin(.41*a+2.3*e);

let rx = ["Overview","Worklog","Files","Reports"];

let r_ = {client:a4,internal:a9};

let rh = [{id:"p1",name:"Amara Ortiz",role:"Client delivery lead",target:32},{id:"p2",name:"Theo Mercer",role:"Platform engineer",target:40},{id:"p3",name:"Lena Hoffman",role:"Content systems editor",target:30},{id:"p4",name:"Idris Bello",role:"Integration engineer",target:38},{id:"p5",name:"Marta Kovac",role:"QA analyst",target:34},{id:"p6",name:"Rhys Calloway",role:"Solutions architect",target:24},{id:"p7",name:"Junia Alves",role:"Data migration lead",target:36}];

let rb = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

let rp = ["Mar","Apr"];

let ru = Array.from({length:4},(e,a)=>{
  let r=9+7*a;
  return {label:`${rp[+(r>31)]} ${r>31?r-31:r} – ${rp[+(r+6>31)]} ${r+6>31?r+6-31:r+6}`,dates:Array.from({length:7},(e,a)=>{
    let t=r+a;
    return t>31?`${rp[1]} ${t-31}`:`${rp[0]} ${t}`;
  }),cells:function(e){
    let a={};
    for(let[r,t]of rh.entries()){
      let l=[];
      for(let a=0;a<7;a+=1){
        if(a>=5){
          push({hours:0,kind:"off"});
          continue
        }
        let n=rd(1.7*r+3.1*e,a),s=ro(Math.round(2*(t.target/5+2.6*n))/2,0,9);
        push({hours:s,kind:n>.42?"internal":"client"})
      }
      a[t.id]=l
    }
    return a;
  }(a)};
});

let rm = e=>{
  let a=Math.floor(e);
  return e-a>=.5?`${a}h 30m`:`${a}h`;
};

let rk = [{label:"Account",icon:Icon_62714,title:"Northstar Commerce",meta:"Enterprise rollout",trailing:"flag"},{label:"Workspace",icon:Icon_78805,title:"portal.northstar.io",meta:"124k requests / day",trailing:"badge",badge:"Running"},{label:"Next review",icon:Icon_18327,title:"Apr 3, 2026",meta:"Client steering",trailing:"avatars"},{label:"Owner",icon:Icon_34951,title:"Amara Ortiz",meta:"Delivery lead",trailing:"avatar"}];


export default function dashboard_9__Sorbet__Component(){
  let[e,a]=useState("Overview"),[r,s]=useState(1),[i,o]=useState(false),[c,d]=useState(null),{ref:x,edges:_,onScroll:h}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),b=ru[r],p=useMemo(()=>{
    let e={};
    for(let a of rh){
      let r=b.cells[a.id].reduce((e,a)=>e+a.hours,0);
      e[a.id]={hours:r,pct:Math.round(r/a.target*100)}
    }
    return e;
  }, [b]),u=rh.reduce((e,a)=>e+p[a.id].hours,0),m=Math.round(rh.reduce((e,a)=>e+b.cells[a.id].filter(e=>"client"===e.kind).reduce((e,a)=>e+a.hours,0),0)/(u||1)*100);
  return (
    <div className={aZ("bg-white dark:bg-neutral-950",a1,"relative flex h-full min-h-[840px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0 px-4 pt-5 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className={aZ("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",a1)}>Delivery board</h1>
              <nav aria-label="Breadcrumb" className="mt-1">
                <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[15px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78">
                  <li>Accounts</li>
                  <li aria-hidden="true" className={rl}>/</li>
                  <li>Delivery</li>
                  <li aria-hidden="true" className={rl}>/</li>
                  <li className={aZ("font-bold text-neutral-900 dark:text-neutral-100","truncate")}>Northstar rollout</li>
                </ol>
              </nav>
            </div>
            <button type="button" aria-label={i?"Unpin board":"Pin board"} aria-pressed={i} onClick={()=>o(e=>!e)} className={aZ("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40",a7)}>
              <HugeiconsIcon icon={Icon_12556} size={18} strokeWidth={2} aria-hidden="true" className={aZ(i&&"[&_path]:fill-current")} />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div role="tablist" aria-label="Board sections" className="flex gap-4">
              {rx.map(r=><button key={r} type="button" role="tab" aria-selected={r===e} onClick={()=>a(r)} className="relative inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[calc(var(--rb-r-lg,10px))] px-3 text-[15px]/[20px] font-bold whitespace-nowrap text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-neutral-900 after:absolute after:inset-x-2.5 after:bottom-0 after:h-[3px] after:rounded-[calc(var(--rb-r-full,999px))] after:bg-transparent after:transition-[background-color] aria-selected:text-neutral-900 aria-selected:after:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:disabled:text-neutral-100/40">{r}</button>)}
            </div>
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <button type="button" aria-label="Add member" className={aZ("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","size-8 rounded-[calc(var(--rb-r-full,999px))]")}>
                <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
              <div className={rt}>
                {rh.slice(0,3).map(e=><span key={e.id} title={e.name} className={aZ(ra,"size-[28px]")}><span className={rr}>{rc(e.name).charAt(0)}</span></span>)}
                <span className={aZ(ra,"size-[28px]")}><span className={rr}>+6</span></span>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={aZ("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","h-px")} />
        </header>
        <div className="grid shrink-0 grid-cols-2 gap-3 px-4 py-5 md:grid-cols-4 sm:px-6">
          {rk.map(e=>(
            <div key={e.label} className={aZ("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","p-3.5")}>
                    <div className="flex items-center justify-between gap-2">
                      <span className={aZ(a5,a2,"truncate")}>{e.label}</span>
                      <HugeiconsIcon icon={e.icon} size={18} strokeWidth={2} aria-hidden="true" className={aZ(a2,"shrink-0")} />
                    </div>
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-2 pt-5">
                      <div className="min-w-0">
                        <p className={aZ(a6,a1,"truncate")}>{e.title}</p>
                        <p className={aZ(a8,a2,"mt-0.5 truncate")}>{e.meta}</p>
                      </div>
                      {"badge"===e.trailing&&<span className={aZ(re,"text-neutral-900 dark:text-neutral-100","shrink-0")}>
                        <span className="flex h-lh shrink-0 items-center">
                          <span className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" aria-hidden="true" />
                        </span>
                        {e.badge}
                      </span>}
                      {"flag"===e.trailing&&<span className={aZ(re,"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","shrink-0")}>At risk</span>}
                      {"avatars"===e.trailing&&<div className={aZ(rt,"shrink-0")}>
                        {rh.slice(0,2).map(e=><span key={e.id} className={aZ(ra,"size-[28px]")}><span className={rr}>{rc(e.name).charAt(0)}</span></span>)}
                        <span className={aZ(ra,"size-[28px]")}><span className={rr}>+1</span></span>
                      </div>}
                      {"avatar"===e.trailing&&<span className={aZ(ra,"size-[28px]")}><span className={rr}>{rc(e.title)}</span></span>}
                    </div>
                  </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 sm:px-6 sm:pb-6">
          <div className={aZ("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
            <div className={aZ("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","flex-wrap justify-between py-3 has-[button]:pe-4")}>
              <div className="min-w-0">
                <h2 className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">Worklogs</h2>
                <p className={aZ("text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5 flex flex-wrap gap-x-2")}>
                  <span>
                    {rm(u)}
                    {" logged"}
                  </span>
                  <span>
                    {m}
                    % client billable
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button type="button" aria-label="Previous week" disabled={0===r} onClick={()=>s(e=>Math.max(0,e-1))} className={aZ(a3,a7)}>
                  <HugeiconsIcon icon={Icon_58661} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <span aria-live="polite" className={aZ(a6,a1,"inline-flex h-8 min-w-[132px] items-center justify-center px-2.5 tabular-nums")}>{b.label}</span>
                <button type="button" aria-label="Next week" disabled={r===ru.length-1} onClick={()=>s(e=>Math.min(ru.length-1,e+1))} className={aZ(a3,a7)}><HugeiconsIcon icon={Icon_5042} size={18} strokeWidth={2} aria-hidden="true" /></button>
              </div>
            </div>
            <div className={aZ("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative min-h-0 flex-1")}>
              <div ref={x} onScroll={h} className="h-full overflow-x-auto overflow-y-auto">
                <table className={aZ("w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium","min-w-[860px]")}>
                  <thead className={aZ(a0,"sticky top-0 z-10")}>
                    <tr>
                      <th scope="col" className="sticky left-0 z-10 w-[212px]">
                        <div className={a0}><div className={aZ(rn,"flex h-9 items-center")}>People</div></div>
                      </th>
                      {b.dates.map((e,a)=>(
                        <th key={e} scope="col" className={aZ(rn,"h-9")}>
                                            <span className="block text-center">
                                              {rb[a]}
                                              {", "}
                                              {e}
                                            </span>
                                          </th>
                      ))}
                      <th scope="col" className={aZ(rn,"h-9 w-[120px] text-right")}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rh.map(e=>{
                      let a=b.cells[e.id],r=p[e.id],l=c===e.id;
                      return (
                        <tr key={e.id} onPointerEnter={()=>d(e.id)} onPointerLeave={()=>d(null)} className={aZ("group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","h-[78px]")}>
                                            <th scope="row" className={aZ(rs,!l&&a0,"sticky left-0 z-10 text-left")}>
                                              <div className="flex items-center gap-2.5">
                                                <span aria-hidden="true" className={ra}><span className={rr}>{rc(e.name)}</span></span>
                                                <div className="min-w-0">
                                                  <p className={aZ(a6,a1,"truncate")}>{e.name}</p>
                                                  <p className={aZ(a8,a2,"mt-0.5 truncate")}>{e.role}</p>
                                                </div>
                                              </div>
                                            </th>
                                            {a.map((e,a)=>(
                                              <td key={a} className={rs}>
                                                                    <div className="flex flex-col items-center gap-1.5">
                                                                      <span className={aZ(a6,"off"===e.kind?a2:a1,"min-h-4 tabular-nums")}>
                                                                        {(e=>{
                                                                          if(0===e)return "";
                                                                          let a=Math.floor(e);
                                                                          return 0===a?"30m":e-a>=.5?`${a}h 30m`:`${a}h`;
                                                                        })(e.hours)}
                                                                      </span>
                                                                      <span aria-hidden="true" className={aZ("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","max-w-[76px]")}>
                                                                        <span className={aZ("off"!==e.kind&&r_[e.kind],"block h-full")} style={{width:`${ro(e.hours/9*100,0,100)}%`}} />
                                                                      </span>
                                                                      <span className={aZ(a8,a2)}>{"off"===e.kind?"Off":"client"===e.kind?"Client":"Internal"}</span>
                                                                    </div>
                                                                  </td>
                                            ))}
                                            <td className={aZ(rs,"text-right tabular-nums")}>
                                              <p className={aZ(a6,a1)}>{rm(r.hours)}</p>
                                              <p className={aZ(a8,r.pct<75?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":a2,"mt-0.5")}>
                                                {r.pct}
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
              <div aria-hidden="true" className={aZ("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-10 h-8",_.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={aZ("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",_.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={aZ("flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5","shrink-0 flex-wrap justify-between")}>
              <div className={aZ(a8,a2,"flex items-center gap-4")}>
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className={aZ(ri,a4,"h-1 w-4")} />
                  Client
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className={aZ(ri,a9,"h-1 w-4")} />
                  Internal
                </span>
              </div>
              <p className={aZ(a5,a2,"flex flex-wrap gap-x-2")}>
                <span>
                  {rh.length}
                  {" people"}
                </span>
                <span>
                  <span className={a1}>{rm(u)}</span>
                  {" this week"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
