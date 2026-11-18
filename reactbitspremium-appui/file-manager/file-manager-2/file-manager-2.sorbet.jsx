/**
 * React Bits Pro — Application UI (file-manager-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_64801 = [["circle",{cx:"9.5",cy:"12.5",r:"1.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 21.5L14.2929 14.7071C14.7456 14.2544 15.3597 14 16 14C16.6403 14 17.2544 14.2544 17.7071 14.7071L19.8138 16.8138",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_19907 = [["path",{d:"M19 14.0052V10.6606C19 9.84276 19 9.43383 18.8478 9.06613C18.6955 8.69843 18.4065 8.40927 17.8284 7.83096L13.0919 3.09236C12.593 2.59325 12.3436 2.3437 12.0345 2.19583C11.9702 2.16508 11.9044 2.13778 11.8372 2.11406C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88646C4.26731 3.06554 4.06508 3.26787 3.88607 3.48998C3 4.58943 3 6.21265 3 9.45908V14.0052C3 17.7781 3 19.6645 4.17157 20.8366C5.11466 21.7801 6.52043 21.9641 9 22M12 2.50022V3.00043C12 5.83009 12 7.24492 12.8787 8.12398C13.7574 9.00304 15.1716 9.00304 18 9.00304H18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 19.5L19.4453 20.4635C20.1297 20.9198 20.4719 21.1479 20.7359 21.0066C21 20.8653 21 20.454 21 19.6315V18.3685C21 17.546 21 17.1347 20.7359 16.9934C20.4719 16.8521 20.1297 17.0802 19.4453 17.5365L18 18.5M18 19.5V18.5M18 19.5C18 20.4346 18 20.9019 17.799 21.25C17.6674 21.478 17.478 21.6674 17.25 21.799C16.9019 22 16.4346 22 15.5 22H15C13.5858 22 12.8787 22 12.4393 21.5607C12 21.1213 12 20.4142 12 19C12 17.5858 12 16.8787 12.4393 16.4393C12.8787 16 13.5858 16 15 16H15.5C16.4346 16 16.9019 16 17.25 16.201C17.478 16.3326 17.6674 16.522 17.799 16.75C18 17.0981 18 17.5654 18 18.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_95819 = [["path",{d:"M4 22V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.8971 21.7598 16.5144 21.9508 14.0919 21.9899M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 5.5H7M10 7.5H9.5M7.5 9.5H7M10 11.5226H9.5M7.5 13.5H7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 22.0001V19C11 17.8954 10.1046 17 9 17C7.89543 17 7 17.8954 7 19V22.0001H11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_27323 = [["path",{d:"M4 14H8.42109C9.35119 14 9.81624 14 9.94012 14.2801C10.064 14.5603 9.74755 14.8963 9.11466 15.5684L5.47691 19.4316C4.84402 20.1037 4.52757 20.4397 4.65145 20.7199C4.77533 21 5.24038 21 6.17048 21H10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 9L6.10557 4.30527C6.49585 3.43509 6.69098 3 7 3C7.30902 3 7.50415 3.43509 7.89443 4.30527L10 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M17.5 20V4M17.5 20C16.7998 20 15.4915 18.0057 15 17.5M17.5 20C18.2002 20 19.5085 18.0057 20 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_92652 = [["path",{d:"M4 3H8.42109C9.35119 3 9.81624 3 9.94012 3.28013C10.064 3.56026 9.74755 3.89632 9.11466 4.56842L5.47691 8.43158C4.84402 9.10368 4.52757 9.43974 4.65145 9.71987C4.77533 10 5.24038 10 6.17048 10H10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 21L6.10557 16.3053C6.49585 15.4351 6.69098 15 7 15C7.30902 15 7.50415 15.4351 7.89443 16.3053L10 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M17.5 20V3.99999M17.5 20C16.7998 20 15.4915 18.0057 15 17.5M17.5 20C18.2002 20 19.5085 18.0057 20 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_8051 = [["path",{d:"M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_71497 = [["path",{d:"M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let en = (...e)=>e.filter(Boolean).join(" ");

let ei = "bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8";

let eo = "text-neutral-900 dark:text-neutral-100";

let es = "rounded-[var(--rb-r-4xl,18px)]";

let ec = "text-neutral-900/62 dark:text-neutral-100/62";

let ed = "text-[15px]/[20px] font-bold";

let e_ = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let eb = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]";

let ex = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let eu = "inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-[calc(var(--rb-r-full,999px))] bg-white/12 px-3.5 text-[14px]/[18px] font-bold transition-[background-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:bg-white/20 active:scale-[0.96] active:bg-white/28 motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(84%_0.15_165))] dark:bg-neutral-900/10 dark:hover:bg-neutral-900/16 dark:active:bg-neutral-900/24 dark:focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)]";

let ep = en("text-[14px]/[20px] font-medium",ec);

let eh = en("text-[13px]/[16px] font-semibold tabular-nums",ec);

let em = en("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10",eb);

let ek = en("bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]",eb);

let ev = en("bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","border-2 border-neutral-900/30 dark:border-neutral-100/34","rounded-[var(--rb-r-6xl,26px)]",eo);

let ef = ["Halcyon Drive","Spring Campaign","Assets"];

let eg = [{id:"d1",name:"Key art"},{id:"d2",name:"Social cutdowns"},{id:"d3",name:"Print exports"}];

let ew = [{id:"f1",name:"hero-still-a.png",ext:"PNG",bytes:4.2,icon:Icon_64801,kind:"image",folder:"d1"},{id:"f2",name:"hero-still-b.png",ext:"PNG",bytes:3.9,icon:Icon_64801,kind:"image",folder:"d1"},{id:"f3",name:"teaser-15s.mp4",ext:"MP4",bytes:88,icon:Icon_19907,kind:"video",folder:"d2"},{id:"f4",name:"campaign-brief.pdf",ext:"PDF",bytes:1.1,icon:Icon_31964,kind:"doc",folder:"d1"},{id:"f5",name:"billboard-2400.png",ext:"PNG",bytes:12.4,icon:Icon_64801,kind:"image",folder:"d3"},{id:"f6",name:"press-kit.zip",ext:"ZIP",bytes:240,icon:Icon_95819,kind:"archive",folder:"d3"},{id:"f7",name:"storyboard-v4.pdf",ext:"PDF",bytes:6.7,icon:Icon_31964,kind:"doc",folder:"d3"},{id:"f8",name:"sizzle-30s.mp4",ext:"MP4",bytes:164,icon:Icon_19907,kind:"video",folder:"d2"}];

let ej = [{label:"All",kind:null},{label:"Images",kind:"image"},{label:"Video",kind:"video"},{label:"Documents",kind:"doc"}];

let ey = e=>{
  let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!a&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=r.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?r.length-1:(t+a+r.length)%r.length;
  r[l].focus(),r[l].click()
};


export default function file_manager_2__Sorbet__Component(){
  let[e,a]=useState(ew),[r,o]=useState(null),[c,d]=useState("All"),[_,b]=useState(true),[x,p]=useState(["f1","f3"]),h=eg.find(e=>e.id===r),m=h?[...ef,h.name]:ef,k=useMemo(()=>{
    let a=ej.find(e=>e.label===c)?.kind??null;
    return [...e.filter(e=>(null===r||e.folder===r)&&(null===a||e.kind===a))].sort((e,a)=>e.name.localeCompare(a.name)*(_?1:-1));
  }, [e,r,c,_]),v=null===r?eg.length:0,f=k.reduce((e,a)=>e+a.bytes,0),{ref:g,edges:w,onScroll:j}=function(e){
    let a=useRef(null),[r,t]=useState({start:false,end:false}),n=useCallback(()=>{
      let e=a.current;
      if(!e)return;
      let{scrollTop:r,scrollHeight:l,clientHeight:n}=e;
      t({start:r>1,end:Math.ceil(r+n)<l-1})
    }, []);
    return useEffect(()=>{
      n();
      let e=a.current,r=e?.ownerDocument.defaultView;
      if(!e||!r?.ResizeObserver)return;
      let t=new r.ResizeObserver(n);
      return t.observe(e),()=>t.disconnect();
    }, [e,n]),{ref:a,edges:r,onScroll:n};
  }(`${r}:${k.map(e=>e.id).join()}`),y=e=>{
    o(e),p([]),d("All")
  };
  return (
    <div className={en("bg-white dark:bg-neutral-950",eo,"flex h-full min-h-[740px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={en("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1 gap-1")}>
          <div className="px-4 py-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[15px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78">
                {m.map((e,a)=>(
                  <li key={e} className="flex items-center gap-2">
                                {a>0&&<span aria-hidden="true" className="text-neutral-900/62 dark:text-neutral-100/62 select-none">/</span>}
                                {a===m.length-1?<span aria-current="page" className="font-bold text-neutral-900 dark:text-neutral-100">{e}</span>:<button type="button" onClick={()=>y(null)} className={en("rounded-[calc(var(--rb-r-sm,6px))] transition-[color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:text-neutral-100","cursor-pointer")}>{e}</button>}
                              </li>
                ))}
              </ol>
            </nav>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className={en("text-[17px]/[22px] font-extrabold","truncate")}>{h?h.name:"Assets"}</h2>
                <p className={en(ep,"mt-0.5 flex flex-wrap gap-x-3 tabular-nums")}>
                  <span>
                    {v}
                    {" folders"}
                  </span>
                  <span>
                    {k.length}
                    {" files"}
                  </span>
                  <span>
                    {f.toFixed(1)}
                    {" MB"}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div role="radiogroup" aria-label="Filter by type" onKeyDown={ey} className={en("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","max-sm:hidden")}>
                  {ej.map(e=><button key={e.label} type="button" role="radio" aria-checked={c===e.label} tabIndex={c===e.label?0:-1} onClick={()=>d(e.label)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{e.label}</button>)}
                </div>
                <button type="button" onClick={()=>b(e=>!e)} aria-label={`Sort by name, ${_?"ascending":"descending"}`} className={en("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
                  <HugeiconsIcon icon={_?Icon_27323:Icon_92652} size={18} strokeWidth={2} aria-hidden="true" />
                  Name
                </button>
              </div>
            </div>
          </div>
          <div className={en("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative min-h-0 flex-1")}>
            <div ref={g} onScroll={j} className="min-h-0 flex-1 overflow-y-auto p-3">
              {null===r&&<>
                <p className={eh}>Folders</p>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {eg.map(a=>{
                    let r=e.filter(e=>e.folder===a.id).length;
                    return (
                      <li key={a.id}>
                                        <button type="button" onClick={()=>y(a.id)} className={en(ex,e_,"w-full cursor-pointer text-left")}>
                                          <span className={en(em,"flex items-center gap-3 p-2 pe-4")}>
                                            <span aria-hidden className={en(ei,es,ec,"flex size-11 shrink-0 items-center justify-center")}><HugeiconsIcon icon={Icon_8051} size={20} strokeWidth={2} /></span>
                                            <span className="min-w-0">
                                              <span className={en(ed,"block truncate")}>{a.name}</span>
                                              <span className={en(eh,"mt-0.5 block")}>
                                                {r}
                                                {" items"}
                                              </span>
                                            </span>
                                          </span>
                                        </button>
                                      </li>
                    );
                  })}
                </ul>
              </>}
              <p className={en(eh,null===r&&"mt-5")}>Files</p>
              {0===k.length?<div className="mt-2 flex flex-col items-center justify-center px-6 py-10 text-center">
                <HugeiconsIcon icon={Icon_64801} size={20} strokeWidth={2} aria-hidden="true" className={ec} />
                <p className={en("text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100","mt-2")}>No files to show</p>
                <p className={en("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>
                  Nothing here matches the “
                  {c}
                  ” filter.
                </p>
              </div>:<ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {k.map(e=>{
                  let a=x.includes(e.id);
                  return (
                    <li key={e.id}>
                                    <button type="button" aria-pressed={a} onClick={()=>{
                                      let a;
                                      return a=e.id,p(e=>e.includes(a)?e.filter(e=>e!==a):[...e,a]);
                                    }} className={en(a?ev:ex,e_,"relative flex w-full min-w-0 cursor-pointer flex-col overflow-hidden text-left")}>
                                      <span className={en(a?ek:em,"flex flex-col p-2")}>
                                        <span className={en(ei,es,"flex aspect-[4/3] items-center justify-center")}>
                                          <HugeiconsIcon icon={e.icon} size={24} strokeWidth={2} aria-hidden="true" className={ec} />
                                        </span>
                                        <span className="block px-2 pt-3 pb-2">
                                          <span className={en(ed,"block truncate")}>{e.name}</span>
                                          <span className={en(eh,"mt-0.5 flex gap-x-2 truncate")}>
                                            <span>{e.ext}</span>
                                            <span>
                                              {e.bytes.toFixed(1)}
                                              {" MB"}
                                            </span>
                                          </span>
                                        </span>
                                      </span>
                                    </button>
                                  </li>
                  );
                })}
              </ul>}
            </div>
            <div aria-hidden="true" className={en("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",w.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={en("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",w.end?"opacity-100":"opacity-0")} />
          </div>
          {x.length>0&&<div role="status" className={en("flex h-12 max-w-full items-center gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(8px,var(--rb-r-full,999px)))] bg-neutral-900 py-2 ps-5 pe-2 font-bold text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","mx-2 mb-2 justify-between gap-2")}>
            <p className={ed}>
              <span className="tabular-nums">{x.length}</span>
              {" selected"}
            </p>
            <div className="flex items-center gap-1.5">
              {[{icon:Icon_71497,label:"Share",onClick:()=>{}},{icon:Icon_96037,label:"Delete",onClick:()=>{
                a(e=>e.filter(e=>!x.includes(e.id))),p([])
              }},{icon:Icon_59649,label:"More",onClick:()=>{}}].map(({icon:e,label:a,onClick:r})=>(
                <button key={a} type="button" onClick={r} className={eu}>
                            <HugeiconsIcon icon={e} size={18} strokeWidth={2} aria-hidden="true" />
                            <span className="max-sm:sr-only">{a}</span>
                          </button>
              ))}
              <button type="button" aria-label="Clear selection" onClick={()=>p([])} className={eu}>
                <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>}
        </div>
      </div>
  );
}
