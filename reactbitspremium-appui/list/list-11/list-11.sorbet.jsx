/**
 * React Bits Pro — Application UI (list-11 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, forEach, observe, sort, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_97872 = [["path",{d:"M21 7V12M3 7C3 10.0645 3 16.7742 3 17.1613C3 18.5438 4.94564 19.3657 8.83693 21.0095C10.4002 21.6698 11.1818 22 12 22L12 11.3548",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 19C15 19 15.875 19 16.75 21C16.75 21 19.5294 16 22 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8.32592 9.69138L5.40472 8.27785C3.80157 7.5021 3 7.11423 3 6.5C3 5.88577 3.80157 5.4979 5.40472 4.72215L8.32592 3.30862C10.1288 2.43621 11.0303 2 12 2C12.9697 2 13.8712 2.4362 15.6741 3.30862L18.5953 4.72215C20.1984 5.4979 21 5.88577 21 6.5C21 7.11423 20.1984 7.5021 18.5953 8.27785L15.6741 9.69138C13.8712 10.5638 12.9697 11 12 11C11.0303 11 10.1288 10.5638 8.32592 9.69138Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L8 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M17 4L7 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_59309 = [["path",{d:"M2.01733 15C4.2169 15 6.00001 16.7831 6.00001 18.9827",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 18.9827V18.8908C18 16.742 19.742 15 21.8908 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.00001 5.01733C6.00001 7.2169 4.2169 9.00001 2.01733 9.00001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 5.01733C18 7.19765 19.769 8.96876 21.9423 8.9996",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 5H8C5.17157 5 3.75736 5 2.87868 5.87868C2 6.75736 2 8.17157 2 11V13C2 15.8284 2 17.2426 2.87868 18.1213C3.75736 19 5.17157 19 8 19H16C18.8284 19 20.2426 19 21.1213 18.1213C22 17.2426 22 15.8284 22 13V11C22 8.17157 22 6.75736 21.1213 5.87868C20.2426 5 18.8284 5 16 5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_3810 = [["path",{d:"M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.79275 3 5.97733 4.67765 4.38341 7.20327M3.29339 3.00076L3.46556 5.05452C3.58958 6.53384 3.65159 7.27349 4.13359 7.68914C4.61559 8.10479 5.32673 8.03185 6.74899 7.88595L8.79339 7.67625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62955 = [["path",{d:"M3 8H15C18.3137 8 21 10.6863 21 14C21 17.3137 18.3137 20 15 20H11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 4L5.8462 4.87652C3.94873 6.31801 3 7.03875 3 8C3 8.96125 3.94873 9.68199 5.8462 11.1235L7 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let x = (...e)=>e.filter(Boolean).join(" ");

let b = "text-neutral-900 dark:text-neutral-100";

let p = "text-[14px]/[20px] font-medium";

let h = [{id:"7d",label:"7 days"},{id:"28d",label:"28 days"},{id:"qtd",label:"Quarter"}];

let m = [{id:"fulfilled",label:"Orders fulfilled",icon:Icon_97872,caption:"Picked, packed and handed to a carrier",by:{"7d":{value:"1,284",delta:6.4},"28d":{value:"5,109",delta:11.2},qtd:{value:"14,730",delta:18.9}}},{id:"net",label:"Net revenue",icon:Icon_59309,caption:"Gross receipts less discounts and refunds",by:{"7d":{value:"$92.4k",delta:3.1},"28d":{value:"$374.8k",delta:7.8},qtd:{value:"$1.09M",delta:12.4}}},{id:"basket",label:"Average basket",icon:Icon_3810,caption:"Net revenue divided by fulfilled orders",by:{"7d":{value:"$71.96",delta:-2.9},"28d":{value:"$73.36",delta:-1.4},qtd:{value:"$74.02",delta:.6}}},{id:"returns",label:"Return rate",icon:Icon_62955,caption:"Units sent back within the 30 day window",by:{"7d":{value:"4.1%",delta:-.8},"28d":{value:"4.6%",delta:.5},qtd:{value:"5.2%",delta:1.7}}}];

let k = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[n].focus(),a[n].click()
};

let rM = (...e)=>e.filter(Boolean).join(" ");

let rT = "text-neutral-900 dark:text-neutral-100";

let rD = "text-neutral-900/78 dark:text-neutral-100/78";

let rO = "text-neutral-900/62 dark:text-neutral-100/62";

let rP = "text-[14px]/[20px] font-medium";

let rE = "border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7";

let rW = "inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1";

let rB = "h-10";

let rL = "relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40";

let r$ = [{id:"nair",name:"Priya Nair",initials:"PN",team:"Tier 2 support",w:{r:172,rt:96,cs:4.9},wd:{r:14,rt:-12,cs:.2},m:{r:712,rt:108,cs:4.8},md:{r:40,rt:-18,cs:.1}},{id:"bello",name:"Marcus Bello",initials:"MB",team:"Escalations",w:{r:168,rt:132,cs:4.7},wd:{r:9,rt:8,cs:0},m:{r:690,rt:140,cs:4.7},md:{r:22,rt:10,cs:0}},{id:"sato",name:"Hana Sato",initials:"HS",team:"Tier 1 support",w:{r:151,rt:118,cs:4.8},wd:{r:-6,rt:-5,cs:.1},m:{r:640,rt:122,cs:4.8},md:{r:-18,rt:-8,cs:.1}},{id:"ramos",name:"Diego Ramos",initials:"DR",team:"Billing",w:{r:149,rt:205,cs:4.5},wd:{r:21,rt:-22,cs:-.1},m:{r:705,rt:190,cs:4.6},md:{r:64,rt:-30,cs:-.1}},{id:"okoye",name:"Amara Okoye",initials:"AO",team:"Onboarding",w:{r:138,rt:176,cs:4.6},wd:{r:-3,rt:6,cs:.2},m:{r:588,rt:168,cs:4.5},md:{r:-11,rt:9,cs:.1}},{id:"fischer",name:"Lena Fischer",initials:"LF",team:"Tier 2 support",w:{r:131,rt:149,cs:4.7},wd:{r:12,rt:-9,cs:.1},m:{r:559,rt:155,cs:4.7},md:{r:33,rt:-12,cs:.1}},{id:"whitfield",name:"Sam Whitfield",initials:"SW",team:"Tier 1 support",w:{r:120,rt:221,cs:4.4},wd:{r:-8,rt:14,cs:-.2},m:{r:512,rt:210,cs:4.4},md:{r:-25,rt:20,cs:-.2}},{id:"tanaka",name:"Yuki Tanaka",initials:"YT",team:"Escalations",w:{r:109,rt:163,cs:4.6},wd:{r:4,rt:-3,cs:.1},m:{r:470,rt:172,cs:4.5},md:{r:12,rt:-6,cs:0}},{id:"haddad",name:"Omar Haddad",initials:"OH",team:"Billing",w:{r:96,rt:258,cs:4.3},wd:{r:18,rt:-18,cs:.3},m:{r:604,rt:226,cs:4.4},md:{r:48,rt:-24,cs:.2}}];

let rI = [{id:"resolved",label:"Resolved"},{id:"response",label:"Response time"},{id:"csat",label:"Satisfaction"}];

let rH = [{id:"w",label:"This week"},{id:"m",label:"This month"}];

let rF = {resolved:"r",response:"rt",csat:"cs"};

let rq = {resolved:false,response:true,csat:false};

let rK = e=>Math.round(10*e)/10;

let rU = e=>`${Math.floor(e/60)}:${String(Math.round(e)%60).padStart(2,"0")}`;

let rV = (e,r)=>"w"===r?e.w:e.m;

let rY = (e,r)=>"w"===r?e.wd:e.md;

let rG = "grid-cols-[28px_36px_minmax(0,1fr)_72px] sm:grid-cols-[28px_60px_minmax(0,1fr)_96px_104px_76px]";

function rQ({children:e,right:r,className:a}){
  return <span className={rM("text-[13px]/[16px] font-semibold tabular-nums",rO,r&&"text-right",a)}>{e}</span>;
}

function rJ(e,r,a){
  let t=rF[r],n=r$.map(r=>{
    let n=rV(r,e)[t],i=a?rK(n-rY(r,e)[t]):n;
    return {id:r.id,val:i};
  });
  sort((e,a)=>rq[r]?e.val-a.val:a.val-e.val);
  let i={};
  return forEach((e,r)=>i[e.id]=r+1),i;
}

let rX = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[n].focus(),a[n].click()
};


export default function list_11__Sorbet__Component(){
  let[e,r]=useState("resolved"),[a,l]=useState("w"),[o,s]=useState(null),{ref:d,edges:c,onScroll:_}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:i}=r;
      a({start:t>1,end:Math.ceil(t+i)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),u=useMemo(()=>rJ(a,e,false), [a,e]),x=useMemo(()=>rJ(a,e,true), [a,e]),b=useMemo(()=>Math.max(...r$.map(e=>rV(e,a).r)), [a]),p=useMemo(()=>{
    let e=r$.reduce((e,r)=>e+rV(r,a).r,0);
    return {resolved:e,rt:r$.reduce((e,r)=>e+rV(r,a).rt,0)/r$.length,cs:rK(r$.reduce((e,r)=>e+rV(r,a).cs,0)/r$.length)};
  }, [a]);
  return (
    <div className={rM("bg-white dark:bg-neutral-950",rT,"flex h-full min-h-[640px] w-full flex-col overflow-hidden p-6 sm:p-8")}>
        <div className="mx-auto flex h-full w-full max-w-[1100px] flex-col">
          <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={rM("text-[17px]/[22px] font-extrabold",rT)}>Support leaderboard</h2>
              <p className={rM(rP,rO,"mt-0.5")}>Ranked by conversations resolved</p>
            </div>
            <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2">
              <div role="radiogroup" aria-label="Sort by" onKeyDown={rX} className={rM(rW,rB)}>
                {rI.map(a=>{
                  let n=a.id===e;
                  return <button key={a.id} type="button" role="radio" aria-checked={n} tabIndex={n?0:-1} onClick={()=>r(a.id)} className={rL}>{a.label}</button>;
                })}
              </div>
              <div role="radiogroup" aria-label="Period" onKeyDown={rX} className={rM(rW,rB)}>
                {rH.map(e=>{
                  let r=e.id===a;
                  return <button key={e.id} type="button" role="radio" aria-checked={r} tabIndex={r?0:-1} onClick={()=>l(e.id)} className={rL}>{e.label}</button>;
                })}
              </div>
            </div>
          </div>
          <div className={rM("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","min-h-0 flex-1")}>
            <div className={rM(rE,rG,"grid shrink-0 items-center gap-3 px-4 py-2")}>
              <rQ>#</rQ>
              <rQ>Trend</rQ>
              <rQ>Agent</rQ>
              <rQ right className={"resolved"!==e&&"max-sm:hidden"}>Resolved</rQ>
              <rQ right className={"response"!==e&&"max-sm:hidden"}>Median FRT</rQ>
              <rQ right className={"csat"!==e&&"max-sm:hidden"}>CSAT</rQ>
            </div>
            <div className="relative min-h-0 flex-1">
              <div ref={d} onScroll={_} style={{touchAction:"pan-y"}} className="h-full overflow-y-auto">
                <div className="relative" style={{height:64*r$.length}}>
                  {r$.map(r=>{
                    let n=u[r.id],l=x[r.id]-n,d=rV(r,a),c=rY(r,a),_=n<=3,p=Math.round(d.r/b*100),h=o===r.id,m=c[rF[e]],k="resolved"===e?`${m>0?"+":"−"}${Math.abs(m)} resolved`:"response"===e?`${m>0?"+":"−"}${Math.abs(m)}s response`:`${m>0?"+":"−"}${Math.abs(rK(m))} CSAT`;
                    return (
                      <div key={r.id} style={{transform:`translateY(${(n-1)*64}px)`,zIndex:h?10:1}} className="absolute inset-x-0 top-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none">
                                        <div onPointerEnter={()=>s(r.id)} onPointerLeave={()=>s(e=>e===r.id?null:e)} className={rM("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6",n<r$.length&&rE,"h-16 overflow-hidden")}>
                                          <div aria-hidden="true" className={rM("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]","rounded-[var(--rb-r-4xl,18px)]","pointer-events-none absolute inset-y-1.5 left-1.5")} style={{width:`max(0px, calc(${p}% - 12px))`}} />
                                          <div className={rM(rG,"relative z-10 grid w-full items-center gap-3 px-4")}>
                                            <span className={rM(rP,_?rT:rO,"tabular-nums")}>{n}</span>
                                            <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78">
                                              {l>0?<>
                                                <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={2} aria-hidden="true" />
                                                <span className="sr-only">Up</span>
                                                {l}
                                              </>:l<0?<>
                                                <HugeiconsIcon icon={Icon_54345} size={16} strokeWidth={2} aria-hidden="true" />
                                                <span className="sr-only">Down</span>
                                                {Math.abs(l)}
                                              </>:<>
                                                <HugeiconsIcon icon={Icon_99199} size={16} strokeWidth={2} aria-hidden="true" />
                                                <span className="sr-only">No change</span>
                                              </>}
                                            </span>
                                            <div className="flex min-w-0 items-center gap-3">
                                              <span aria-hidden="true" className={rM("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-10")}>
                                                <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{r.initials}</span>
                                              </span>
                                              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="truncate">{r.name}</span></p>
                                                <p data-description className={rM(rP,rO,"flex items-center gap-3 truncate")}>
                                                  <span className="truncate">{r.team}</span>
                                                  <span className={rM("transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","shrink-0 tabular-nums max-sm:hidden",h?"opacity-100":"opacity-0")}>
                                                    {k}
                                                    {" vs last"}
                                                  </span>
                                                </p>
                                              </div>
                                            </div>
                                            <span className={rM(rP,rT,"resolved"!==e&&"max-sm:hidden","text-right tabular-nums")}>{d.r}</span>
                                            <span className={rM(rP,rD,"response"!==e&&"max-sm:hidden","text-right tabular-nums")}>{rU(d.rt)}</span>
                                            <span className={rM(rP,rD,"csat"!==e&&"max-sm:hidden","text-right tabular-nums")}>{d.cs.toFixed(1)}</span>
                                          </div>
                                        </div>
                                      </div>
                    );
                  })}
                </div>
              </div>
              <div aria-hidden="true" className={rM("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 top-0 h-8",c.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={rM("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 bottom-0 h-8",c.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={rM("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7",rG,"grid shrink-0 items-center gap-3 px-4 py-2.5")}>
              <span className={rM("text-[13px]/[16px] font-bold tabular-nums",rT,"col-span-3 flex gap-3")}>
                <span>Team totals</span>
                <span>
                  {r$.length}
                  {" agents"}
                </span>
              </span>
              <span className={rM(rP,rT,"resolved"!==e&&"max-sm:hidden","text-right tabular-nums")}>{p.resolved.toLocaleString("en-US")}</span>
              <span className={rM(rP,rO,"response"!==e&&"max-sm:hidden","text-right tabular-nums")}>{rU(p.rt)}</span>
              <span className={rM(rP,rO,"csat"!==e&&"max-sm:hidden","text-right tabular-nums")}>{p.cs.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
  );
}
