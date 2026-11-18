/**
 * React Bits Pro — Application UI (list-7 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_97872 = [["path",{d:"M21 7V12M3 7C3 10.0645 3 16.7742 3 17.1613C3 18.5438 4.94564 19.3657 8.83693 21.0095C10.4002 21.6698 11.1818 22 12 22L12 11.3548",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 19C15 19 15.875 19 16.75 21C16.75 21 19.5294 16 22 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8.32592 9.69138L5.40472 8.27785C3.80157 7.5021 3 7.11423 3 6.5C3 5.88577 3.80157 5.4979 5.40472 4.72215L8.32592 3.30862C10.1288 2.43621 11.0303 2 12 2C12.9697 2 13.8712 2.4362 15.6741 3.30862L18.5953 4.72215C20.1984 5.4979 21 5.88577 21 6.5C21 7.11423 20.1984 7.5021 18.5953 8.27785L15.6741 9.69138C13.8712 10.5638 12.9697 11 12 11C11.0303 11 10.1288 10.5638 8.32592 9.69138Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L8 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M17 4L7 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_59309 = [["path",{d:"M2.01733 15C4.2169 15 6.00001 16.7831 6.00001 18.9827",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 18.9827V18.8908C18 16.742 19.742 15 21.8908 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.00001 5.01733C6.00001 7.2169 4.2169 9.00001 2.01733 9.00001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 5.01733C18 7.19765 19.769 8.96876 21.9423 8.9996",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 5H8C5.17157 5 3.75736 5 2.87868 5.87868C2 6.75736 2 8.17157 2 11V13C2 15.8284 2 17.2426 2.87868 18.1213C3.75736 19 5.17157 19 8 19H16C18.8284 19 20.2426 19 21.1213 18.1213C22 17.2426 22 15.8284 22 13V11C22 8.17157 22 6.75736 21.1213 5.87868C20.2426 5 18.8284 5 16 5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_3810 = [["path",{d:"M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.79275 3 5.97733 4.67765 4.38341 7.20327M3.29339 3.00076L3.46556 5.05452C3.58958 6.53384 3.65159 7.27349 4.13359 7.68914C4.61559 8.10479 5.32673 8.03185 6.74899 7.88595L8.79339 7.67625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62955 = [["path",{d:"M3 8H15C18.3137 8 21 10.6863 21 14C21 17.3137 18.3137 20 15 20H11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 4L5.8462 4.87652C3.94873 6.31801 3 7.03875 3 8C3 8.96125 3.94873 9.68199 5.8462 11.1235L7 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_73516 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

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

let g = (...e)=>e.filter(Boolean).join(" ");

let v = "text-neutral-900 dark:text-neutral-100";

let w = [{id:"compute",name:"Container compute",initials:"CC",team:"Platform",by:{month:{spend:42180,delta:4.2,units:"18,400 vCPU hrs"},quarter:{spend:121460,delta:9.6,units:"54,900 vCPU hrs"}}},{id:"storage",name:"Object storage",initials:"OS",team:"Data",by:{month:{spend:18740,delta:-1.8,units:"312 TB stored"},quarter:{spend:57120,delta:2.4,units:"938 TB stored"}}},{id:"warehouse",name:"Query warehouse",initials:"QW",team:"Analytics",by:{month:{spend:15390,delta:12.7,units:"9,860 credits"},quarter:{spend:41870,delta:21.3,units:"27,140 credits"}}},{id:"egress",name:"Network egress",initials:"NE",team:"Platform",by:{month:{spend:9260,delta:-6.4,units:"74 TB transferred"},quarter:{spend:30480,delta:-3.1,units:"241 TB transferred"}}},{id:"search",name:"Search cluster",initials:"SC",team:"Product",by:{month:{spend:7420,delta:.9,units:"6 nodes"},quarter:{spend:22010,delta:5.5,units:"6 nodes"}}},{id:"observability",name:"Observability",initials:"OB",team:"Platform",by:{month:{spend:5130,delta:3.6,units:"1.4 TB ingested"},quarter:{spend:14980,delta:7.2,units:"4.1 TB ingested"}}}];

let eI = (...e)=>e.filter(Boolean).join(" ");

let eH = "text-neutral-900 dark:text-neutral-100";

let eF = "text-neutral-900/78 dark:text-neutral-100/78";

let eq = "text-neutral-900/62 dark:text-neutral-100/62";

let eK = "text-[14px]/[20px] font-medium";

let eU = "text-[15px]/[20px] font-bold";

let eV = "flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1";

let eY = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let eG = {active:"text-neutral-900/78 dark:text-neutral-100/78",draft:"text-neutral-900/62 dark:text-neutral-100/62",expiring:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",expired:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

let eQ = [{id:"northwind",name:"Northwind Freight Co.",initials:"NF",location:"Rotterdam, NL",since:"Onboarded Mar 2021",category:"Logistics",contract:"active",contractLabel:"Active",spend:"$1,240,000",delta:"+8.2%",up:true},{id:"kraft",name:"Kraft & Hollow Packaging",initials:"KH",location:"Portland, US",since:"Onboarded Jul 2019",category:"Packaging",contract:"expiring",contractLabel:"Expiring",spend:"$486,500",delta:"-3.1%",up:false},{id:"meridian",name:"Meridian Cloud Systems",initials:"MC",location:"Dublin, IE",since:"Onboarded Jan 2022",category:"Cloud",contract:"active",contractLabel:"Active",spend:"$918,300",delta:"+14.6%",up:true},{id:"brightledger",name:"Brightledger Advisory",initials:"BA",location:"London, UK",since:"Onboarded Sep 2020",category:"Professional",contract:"active",contractLabel:"Active",spend:"$212,750",delta:"+2.4%",up:true},{id:"parcelworks",name:"Parcelworks Logistics",initials:"PL",location:"Memphis, US",since:"Onboarded Nov 2018",category:"Logistics",contract:"expired",contractLabel:"Expired",spend:"$74,900",delta:"-18.9%",up:false},{id:"atlas",name:"Atlas Component Works",initials:"AC",location:"Stuttgart, DE",since:"Onboarded Feb 2020",category:"Manufacturing",contract:"active",contractLabel:"Active",spend:"$1,506,200",delta:"+6.7%",up:true},{id:"verdant",name:"Verdant Materials",initials:"VM",location:"Malm\xf6, SE",since:"Onboarded May 2023",category:"Manufacturing",contract:"draft",contractLabel:"In review",spend:"$0",delta:"0.0%",up:true},{id:"harborlight",name:"Harborlight Freight",initials:"HF",location:"Singapore, SG",since:"Onboarded Aug 2021",category:"Logistics",contract:"active",contractLabel:"Active",spend:"$643,100",delta:"+11.3%",up:true},{id:"corvid",name:"Corvid Cloud Infrastructure",initials:"CC",location:"Ashburn, US",since:"Onboarded Oct 2022",category:"Cloud",contract:"expiring",contractLabel:"Expiring",spend:"$355,000",delta:"-5.4%",up:false},{id:"fold",name:"Fold & Crease Cartons",initials:"FC",location:"Guadalajara, MX",since:"Onboarded Apr 2019",category:"Packaging",contract:"active",contractLabel:"Active",spend:"$298,400",delta:"+4.1%",up:true},{id:"sterling",name:"Sterling Tax Partners",initials:"ST",location:"Toronto, CA",since:"Onboarded Dec 2020",category:"Professional",contract:"active",contractLabel:"Active",spend:"$164,000",delta:"+1.2%",up:true},{id:"ironvale",name:"Ironvale Fabrication",initials:"IF",location:"Sheffield, UK",since:"Onboarded Jun 2017",category:"Manufacturing",contract:"active",contractLabel:"Active",spend:"$822,600",delta:"+3.8%",up:true},{id:"swiftload",name:"Swiftload Distribution",initials:"SD",location:"Lyon, FR",since:"Onboarded Feb 2024",category:"Logistics",contract:"draft",contractLabel:"In review",spend:"$0",delta:"0.0%",up:true},{id:"nimbus",name:"Nimbus Data Platform",initials:"ND",location:"Sydney, AU",since:"Onboarded Mar 2023",category:"Cloud",contract:"active",contractLabel:"Active",spend:"$531,900",delta:"+9.5%",up:true}];

let eJ = ["All categories","Logistics","Packaging","Cloud","Manufacturing","Professional"].map(e=>({value:e,label:e}));

let eX = "grid grid-cols-[minmax(0,1fr)_72px_88px] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_120px_120px] sm:gap-4 md:grid-cols-[minmax(0,1fr)_130px_130px_140px]";

function eZ({value:e,onChange:r,options:a,ariaLabel:l}){
  let o=useId(),[s,d]=useState(false),[c,_]=useState(0),[u,x]=useState(false),[b,p]=useState(),h=useRef(null),m=useRef(null),k=useRef({buffer:"",at:0}),f=a.findIndex(r=>r.value===e),g=f>=0?a[f]:undefined,v=()=>{
    let e=h.current,r=e?.ownerDocument.defaultView;
    if(e&&r){
      let t=e.getBoundingClientRect(),n=0,i=r.innerHeight;
      for(let a=e.parentElement;a;a=a.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(a).overflowY)){
        let e=a.getBoundingClientRect();
        n=Math.max(n,e.top),i=Math.min(i,e.bottom);
        break
      }
      let l=i-t.bottom,o=t.top-n,s=Math.min(32*a.length+8,264),d=l<s+8&&o>l,c=(d?o:l)-8;
      x(d),p(c<s?Math.max(c,40):undefined)
    }
    _(f>=0?f:0),d(true)
  };
  useEffect(()=>{
    if(!s)return;
    let e=h.current,r=e?.ownerDocument;
    if(!e||!r)return;
    let a=r=>{
      e.contains(r.target)||d(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [s]),useEffect(()=>{
    if(!s)return;
    let e=m.current,r=e?.querySelector(`[data-index="${c}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [s,c]);
  let w=e=>{
    let t=a[e];
    t&&(r(t.value),d(false),h.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={h} className="relative">
        <button type="button" role="combobox" aria-expanded={s} aria-controls={o} aria-haspopup="listbox" aria-label={l} onClick={()=>s?d(false):v()} onKeyDown={e=>{
          if(!s){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),v());
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),d(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),_(e=>Math.min(e+1,a.length-1));else if("ArrowUp"===e.key)e.preventDefault(),_(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),_(0);else if("End"===e.key)e.preventDefault(),_(a.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),w(c);else if(1===e.key.length&&/\S/.test(e.key)){
            let r=Date.now(),t=k.current;
            t.buffer=r-t.at>700?e.key:t.buffer+e.key,t.at=r;
            let n=a.findIndex(e=>e.label.toLowerCase().startsWith(t.buffer.toLowerCase()));
            n>=0&&_(n)
          }
        }} className="inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40">
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {a.map(e=><span key={e.value} aria-hidden="true" className="invisible truncate">{e.label}</span>)}
            <span className="truncate">{g?.label}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {s&&<ul ref={m} id={o} role="listbox" tabIndex={-1} style={{maxHeight:b}} className={eI("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",u?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {a.map((r,a)=>(
            <li key={r.value} role="option" aria-selected={r.value===e} data-index={a} data-highlighted={a===c?"":undefined} onMouseEnter={()=>_(a)} onClick={()=>w(a)} className={eI("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                    <span className="truncate">{r.label}</span>
                    {r.value===e&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                  </li>
          ))}
        </ul>}
      </div>
  );
}


export default function list_7__Sorbet__Component(){
  let[e,r]=useState(""),[a,l]=useState("All categories"),{ref:o,edges:s,onScroll:d}=function(){
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
  }(),x=e.trim().toLowerCase(),b=eQ.filter(e=>{
    let r=!x||e.name.toLowerCase().includes(x)||e.category.toLowerCase().includes(x),t="All categories"===a||e.category===a;
    return r&&t;
  });
  return (
    <div className={eI("bg-white dark:bg-neutral-950",eH,"flex h-full min-h-[640px] w-full flex-col overflow-hidden p-6 sm:p-8")}>
        <div className="mx-auto flex h-full w-full max-w-[1100px] flex-col">
          <div className={eI("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
            <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className={eI("text-[17px]/[22px] font-extrabold",eH)}>Suppliers</h2>
                <p className={eI(eK,eq,"mt-0.5 tabular-nums")}>
                  {b.length}
                  {" of "}
                  {eQ.length}
                  {" suppliers"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className={eI("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10","flex-1 sm:w-64 sm:flex-none")}>
                  <span data-affix className={eV}>
                    <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <input type="text" value={e} onChange={e=>r(e.target.value)} placeholder="Search name or category" aria-label="Search suppliers" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
                  <span data-affix className={eV}>
                    {e?<button type="button" onClick={()=>r("")} aria-label="Clear search" className={eI("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-7 rounded-[calc(var(--rb-r-full,999px))]")}>
                      <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={2} aria-hidden="true" />
                    </button>:<kbd aria-hidden="true" className="inline-flex min-h-5.5 min-w-5.5 w-fit items-center justify-center gap-1 rounded-[calc(var(--rb-r-md,8px))] bg-white px-1.5 font-mono text-[12px]/[16px] font-semibold tabular-nums text-neutral-900/78 dark:text-neutral-100/78 shadow-[0_0_0_1px_rgb(84_62_32/0.14),inset_0_-2px_0_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.06)] select-none dark:bg-neutral-800 dark:shadow-[0_0_0_1px_rgb(0_0_0/0.6),inset_0_-2px_0_rgb(0_0_0/0.4),inset_0_1px_0_rgb(255_255_255/0.08)]">⌘K</kbd>}
                  </span>
                </div>
                <div className="shrink-0"><eZ value={a} onChange={l} options={eJ} ariaLabel="Filter by category" /></div>
              </div>
            </div>
            <div className={eI(eX,"text-[13px]/[16px] font-semibold tabular-nums",eq,"px-4 pb-2")}>
              <span>Supplier</span>
              <span className="hidden md:block">Category</span>
              <span>Contract</span>
              <span className="text-right">Spend</span>
            </div>
            {0===b.length?<div className={eI(eY,"flex-1 items-center justify-center px-6 py-12 text-center")}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center">
                <HugeiconsIcon icon={Icon_73516} size={20} strokeWidth={2} aria-hidden="true" className={eF} />
              </div>
              <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No suppliers found</p>
              <p className={eI("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>
                Nothing matches
                {" "}
                <span className={eH}>
                  “
                  {e||a}
                  ”
                </span>
                . Try a different name or category.
              </p>
              <button type="button" onClick={()=>{
                r(""),l("All categories")
              }} className={eI("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","mt-4")}>Clear search</button>
            </div>:<div className={eI(eY,"relative min-h-0 flex-1")}>
              <div ref={o} onScroll={d} style={{touchAction:"pan-y"}} className={eI("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","flex h-full flex-col overflow-y-auto p-1")}>
                {b.map(r=>{
                  let a=0===parseFloat(r.delta);
                  return (
                    <div key={r.id} className={eI("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","rounded-[var(--rb-r-4xl,18px)]","hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","h-16 shrink-0 px-2")}>
                                    <div className={eI(eX,"w-full")}>
                                      <div className="flex min-w-0 items-center gap-3">
                                        <span aria-hidden="true" className={eI("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] select-none","size-10")}>
                                          <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{r.initials}</span>
                                        </span>
                                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                          <p className={eI(eU,eH,"truncate")}>
                                            {function(e,r){
                                              let a=r.trim();
                                              if(!a)return e;
                                              let i=e.toLowerCase(),l=a.toLowerCase(),o=[],s=0,d=i.indexOf(l,s),c=0;
                                              for(;-1!==d;)d>s&&o.push(e.slice(s,d)),o.push(<mark key={c++} className={eI("bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]",eH,"rounded-[var(--rb-r-sm,6px)]")}>{e.slice(d,d+l.length)}</mark>),s=d+l.length,d=i.indexOf(l,s);
                                              return s<e.length&&o.push(e.slice(s)),o.map((e,r)=><Fragment key={r}>{e}</Fragment>);
                                            }(r.name,e)}
                                          </p>
                                          <p data-description className={eI(eK,eq,"truncate")}>
                                            <span>{r.location}</span>
                                            <span className="ms-3">{r.since}</span>
                                          </p>
                                        </div>
                                      </div>
                                      <span className={eI(eK,eF,"hidden truncate md:block")}>{r.category}</span>
                                      <span className={eI("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",eG[r.contract],"min-w-0")}><span className="truncate">{r.contractLabel}</span></span>
                                      <span className="text-right">
                                        <span className={eI(eU,eH,"block tabular-nums")}>{r.spend}</span>
                                        <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78">
                                          <HugeiconsIcon icon={a?Icon_5042:r.up?Icon_1497:Icon_37502} size={14} strokeWidth={2} aria-hidden="true" />
                                          <span className="sr-only">{a?"No change":r.up?"Up":"Down"}</span>
                                          {r.delta}
                                          {" YoY"}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                  );
                })}
              </div>
              <div aria-hidden="true" className={eI("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",s.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={eI("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",s.end?"opacity-100":"opacity-0")} />
            </div>}
          </div>
        </div>
      </div>
  );
}
