/**
 * React Bits Pro — Application UI (file-manager-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_64801 = [["circle",{cx:"9.5",cy:"12.5",r:"1.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 21.5L14.2929 14.7071C14.7456 14.2544 15.3597 14 16 14C16.6403 14 17.2544 14.2544 17.7071 14.7071L19.8138 16.8138",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_19907 = [["path",{d:"M19 14.0052V10.6606C19 9.84276 19 9.43383 18.8478 9.06613C18.6955 8.69843 18.4065 8.40927 17.8284 7.83096L13.0919 3.09236C12.593 2.59325 12.3436 2.3437 12.0345 2.19583C11.9702 2.16508 11.9044 2.13778 11.8372 2.11406C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88646C4.26731 3.06554 4.06508 3.26787 3.88607 3.48998C3 4.58943 3 6.21265 3 9.45908V14.0052C3 17.7781 3 19.6645 4.17157 20.8366C5.11466 21.7801 6.52043 21.9641 9 22M12 2.50022V3.00043C12 5.83009 12 7.24492 12.8787 8.12398C13.7574 9.00304 15.1716 9.00304 18 9.00304H18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 19.5L19.4453 20.4635C20.1297 20.9198 20.4719 21.1479 20.7359 21.0066C21 20.8653 21 20.454 21 19.6315V18.3685C21 17.546 21 17.1347 20.7359 16.9934C20.4719 16.8521 20.1297 17.0802 19.4453 17.5365L18 18.5M18 19.5V18.5M18 19.5C18 20.4346 18 20.9019 17.799 21.25C17.6674 21.478 17.478 21.6674 17.25 21.799C16.9019 22 16.4346 22 15.5 22H15C13.5858 22 12.8787 22 12.4393 21.5607C12 21.1213 12 20.4142 12 19C12 17.5858 12 16.8787 12.4393 16.4393C12.8787 16 13.5858 16 15 16H15.5C16.4346 16 16.9019 16 17.25 16.201C17.478 16.3326 17.6674 16.522 17.799 16.75C18 17.0981 18 17.5654 18 18.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_71497 = [["path",{d:"M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];
const Icon_67358 = [["path",{d:"M12 14.5V17.5M13 14.5C13 15.0523 12.5523 15.5 12 15.5C11.4477 15.5 11 15.0523 11 14.5C11 13.9477 11.4477 13.5 12 13.5C12.5523 13.5 13 13.9477 13 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.5 9V6.5C16.5 4.01472 14.4853 2 12 2C9.51471 2 7.49999 4.01472 7.49999 6.5V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_78805 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 15H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 9H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_33786 = [["path",{d:"M14.9961 17H16.9961C19.7575 17 21.9961 14.7614 21.9961 12C21.9961 9.23858 19.7575 7 16.9961 7H14.9961M8.99609 17H6.99609C4.23467 17 1.99609 14.7614 1.99609 12C1.99609 9.23858 4.23467 7 6.99609 7H8.99609",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.49609 12H15.4961",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let eC = (...e)=>e.filter(Boolean).join(" ");

let eP = "rounded-[var(--rb-r-4xl,18px)]";

let eB = "text-neutral-900 dark:text-neutral-100";

let eT = "text-neutral-900/62 dark:text-neutral-100/62";

let eD = "text-[14px]/[20px] font-medium";

let eW = "text-[15px]/[20px] font-bold";

let eL = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let e$ = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eO = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let eR = eC(eD,eT);

let eF = eC("text-[13px]/[16px] font-semibold tabular-nums",eT);

let eG = {name:"Priya Patel",initials:"PP",role:"Owner"};

let eV = {name:"Theo Park",initials:"TP",role:"Can edit"};

let eI = {name:"Nora Vale",initials:"NV",role:"Can view"};

let eE = {name:"Mira Stone",initials:"MS",role:"Can comment"};

let eK = [{id:"a1",name:"Northwind key visual.png",meta:["PNG","12.4 MB"],icon:Icon_64801,version:["Version 4","12.4 MB"],details:[{label:"Type",value:"PNG image"},{label:"Size",value:"12.4 MB"},{label:"Dimensions",value:"4000 \xd7 2500"},{label:"Owner",value:"Priya Patel"},{label:"Modified",value:"Today, 09:24"},{label:"Location",value:"Client Deliverables"}],people:[eG,eV,eI],activity:[{id:"v1",who:"Priya Patel",what:"uploaded version 4",at:"Today"},{id:"v2",who:"Theo Park",what:"left a comment",at:"Yesterday"},{id:"v3",who:"Nora Vale",what:"shared with the studio",at:"Tue"}]},{id:"a2",name:"Brand guidelines.pdf",meta:["PDF","8.1 MB"],icon:Icon_31964,version:["Version 12","8.1 MB"],details:[{label:"Type",value:"PDF document"},{label:"Size",value:"8.1 MB"},{label:"Pages",value:"64"},{label:"Owner",value:"Theo Park"},{label:"Modified",value:"Yesterday, 17:02"},{label:"Location",value:"Client Deliverables"}],people:[eV,eG,eE],activity:[{id:"v1",who:"Theo Park",what:"replaced page 41",at:"Yesterday"},{id:"v2",who:"Mira Stone",what:"resolved 3 comments",at:"Mon"}]},{id:"a3",name:"Launch film master.mp4",meta:["MP4","1.2 GB"],icon:Icon_19907,version:["Version 2","1.2 GB"],details:[{label:"Type",value:"MP4 video"},{label:"Size",value:"1.2 GB"},{label:"Duration",value:"1:48"},{label:"Owner",value:"Leo Grant"},{label:"Modified",value:"2 days ago"},{label:"Location",value:"Client Deliverables"}],people:[{name:"Leo Grant",initials:"LG",role:"Owner"},eG,eI,eE],activity:[{id:"v1",who:"Leo Grant",what:"uploaded the grade",at:"2d ago"},{id:"v2",who:"Priya Patel",what:"requested captions",at:"2d ago"}]},{id:"a4",name:"Typography specimen.pdf",meta:["PDF","2.6 MB"],icon:Icon_31964,version:["Version 1","2.6 MB"],details:[{label:"Type",value:"PDF document"},{label:"Size",value:"2.6 MB"},{label:"Pages",value:"18"},{label:"Owner",value:"Kenji Tan"},{label:"Modified",value:"Last week"},{label:"Location",value:"Brand Library"}],people:[{name:"Kenji Tan",initials:"KT",role:"Owner"},eI],activity:[{id:"v1",who:"Kenji Tan",what:"created the file",at:"Last week"}]},{id:"a5",name:"Packaging mock.png",meta:["PNG","9.8 MB"],icon:Icon_64801,version:["Version 7","9.8 MB"],details:[{label:"Type",value:"PNG image"},{label:"Size",value:"9.8 MB"},{label:"Dimensions",value:"3200 \xd7 3200"},{label:"Owner",value:"Mira Stone"},{label:"Modified",value:"Today, 08:10"},{label:"Location",value:"Client Deliverables"}],people:[eE,eG,eV,eI],activity:[{id:"v1",who:"Mira Stone",what:"uploaded version 7",at:"Today"},{id:"v2",who:"Theo Park",what:"approved the mock",at:"Today"}]}];


export default function file_manager_3__Sorbet__Component(){
  let[e,a]=useState("a1"),[r,i]=useState(true),[o,s]=useState(false),c=useRef(null);
  useEffect(()=>()=>{
    c.current&&clearTimeout(c.current)
  }, []);
  let d=eK.find(a=>a.id===e)??eK[0],{ref:_,edges:b,onScroll:x}=function(e){
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
  }(e);
  return (
    <div className={eC("bg-white dark:bg-neutral-950",eB,"flex h-full min-h-[720px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={eC("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","grid min-h-0 flex-1 lg:grid-cols-[1fr_320px]")}>
          <div className="flex min-h-[300px] min-w-0 flex-col gap-1 lg:min-h-0">
            <div className="px-4 py-3">
              <h2 className="text-[17px]/[22px] font-extrabold">Client Deliverables</h2>
              <p className={eC(eR,"mt-0.5 flex gap-x-3 tabular-nums")}>
                <span>
                  {eK.length}
                  {" files"}
                </span>
                <span>1.24 GB</span>
              </p>
            </div>
            <div className={eC(eO,"min-h-0 flex-1 overflow-y-auto lg:me-0")}>
              <ul className={eC("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","p-1")}>
                {eK.map(r=>{
                  let l=r.id===e;
                  return (
                    <li key={r.id}>
                                    <button type="button" aria-current={l?"true":undefined} onClick={()=>{
                                      a(r.id),s(false)
                                    }} className={eC("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",l?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]",eP,"px-3")}>
                                      <HugeiconsIcon icon={r.icon} size={18} strokeWidth={2} aria-hidden="true" className={eC(eT,"shrink-0")} />
                                      <span className="min-w-0 flex-1">
                                        <span className={eC(eW,"block truncate")}>{r.name}</span>
                                        <span className={eC(eF,"mt-0.5 flex gap-x-2 truncate")}>{r.meta.map(e=><span key={e}>{e}</span>)}</span>
                                      </span>
                                    </button>
                                  </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <aside className="flex min-h-0 min-w-0 flex-col gap-1">
            <div className={eC(eO,"shrink-0 p-2.5 lg:mt-1")}>
              <div className={eC("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8",eP,"flex aspect-[4/3] items-center justify-center max-lg:max-h-32")}>
                <HugeiconsIcon icon={d.icon} size={28} strokeWidth={2} aria-hidden="true" className={eT} />
              </div>
              <h3 className={eC(eW,"mt-3 truncate")}>{d.name}</h3>
              <p className={eC(eF,"mt-0.5 flex gap-x-2")}>{d.version.map(e=><span key={e}>{e}</span>)}</p>
              <div className="mt-3 flex items-center gap-2">
                <button type="button" className={eC("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",e$,"flex-1")}>
                  <HugeiconsIcon icon={Icon_92752} size={18} strokeWidth={2} aria-hidden="true" />
                  Download
                </button>
                <button type="button" aria-label={`Share ${d.name}`} className={eC(eL,"size-10 rounded-[calc(var(--rb-r-full,999px))]")}>
                  <HugeiconsIcon icon={Icon_71497} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className={eC(eO,"relative min-h-0 flex-1")}>
              <div ref={_} onScroll={x} className="min-h-0 flex-1 overflow-y-auto p-3">
                <h4 className={eF}>Details</h4>
                <dl className="mt-2 space-y-1.5">
                  {d.details.map(e=>(
                    <div key={e.label} className="flex items-baseline gap-3">
                                    <dt className={eC("min-w-0 text-[15px]/[20px] font-bold text-neutral-900/62 dark:text-neutral-100/62","w-[86px] shrink-0")}>{e.label}</dt>
                                    <dd className={eC("flex min-w-0 flex-wrap items-center gap-2 text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","flex-1")}>{e.value}</dd>
                                  </div>
                  ))}
                </dl>
                <h4 className={eC(eF,"mt-5")}>Shared with</h4>
                <ul className="mt-2 space-y-1.5">
                  {d.people.map(e=>(
                    <li key={e.name} className="flex items-center gap-2.5">
                                    <span aria-hidden className={eC("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[28px]")}>
                                      <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{e.initials}</span>
                                    </span>
                                    <span className={eC(eD,"min-w-0 flex-1 truncate")}>{e.name}</span>
                                    <span className={eC(eF,"shrink-0")}>{e.role}</span>
                                  </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center gap-2">
                  <button type="button" aria-pressed={!r} onClick={()=>i(e=>!e)} className={eC("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900/78 dark:text-neutral-100/78 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] hover:not-disabled:text-neutral-900 active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:hover:not-disabled:bg-neutral-100/8 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:bg-neutral-100/12 dark:aria-expanded:bg-neutral-100/8 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-7 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-[13px]/[16px] font-bold tabular-nums","-ms-2 min-w-0 flex-1 justify-start")}>
                    <HugeiconsIcon icon={r?Icon_67358:Icon_78805} size={16} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                    <span className="min-w-0 flex-1 truncate text-left">{r?"Restricted to invited people":"Anyone with the link can view"}</span>
                  </button>
                  <button type="button" aria-label="Copy link" onClick={()=>{
                    s(true),c.current&&clearTimeout(c.current),c.current=setTimeout(()=>s(false),1600)
                  }} className={eC("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-8 rounded-[calc(var(--rb-r-full,999px))]","-me-1.5")}>
                    <HugeiconsIcon icon={o?Icon_90987:Icon_33786} size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
                <p role="status" className={eC(eF,"mt-1 h-4")}>{o?"Link copied to clipboard":""}</p>
                <h4 className={eC(eF,"mt-4")}>Activity</h4>
                <ul className="mt-2 space-y-2">
                  {d.activity.map(e=>(
                    <li key={e.id} className={eC(eD,"text-neutral-900/78 dark:text-neutral-100/78","flex items-start gap-2")}>
                                    <span aria-hidden className="mt-[0.5lh] size-2 shrink-0 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" />
                                    <p>
                                      <span className={eB}>{e.who}</span>
                                      {" "}
                                      {e.what}
                                      <span className={eC(eT,"ms-2")}>{e.at}</span>
                                    </p>
                                  </li>
                  ))}
                </ul>
                <button type="button" className={eC(eL,e$,"mt-4 w-full")}>
                  <HugeiconsIcon icon={Icon_62714} size={18} strokeWidth={2} aria-hidden="true" />
                  Make a copy
                </button>
              </div>
              <div aria-hidden="true" className={eC("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",b.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={eC("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",b.end?"opacity-100":"opacity-0")} />
            </div>
          </aside>
        </div>
      </div>
  );
}
