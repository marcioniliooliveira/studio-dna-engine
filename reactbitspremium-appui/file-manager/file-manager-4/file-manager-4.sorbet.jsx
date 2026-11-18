/**
 * React Bits Pro — Application UI (file-manager-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_64801 = [["circle",{cx:"9.5",cy:"12.5",r:"1.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 21.5L14.2929 14.7071C14.7456 14.2544 15.3597 14 16 14C16.6403 14 17.2544 14.2544 17.7071 14.7071L19.8138 16.8138",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_19907 = [["path",{d:"M19 14.0052V10.6606C19 9.84276 19 9.43383 18.8478 9.06613C18.6955 8.69843 18.4065 8.40927 17.8284 7.83096L13.0919 3.09236C12.593 2.59325 12.3436 2.3437 12.0345 2.19583C11.9702 2.16508 11.9044 2.13778 11.8372 2.11406C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88646C4.26731 3.06554 4.06508 3.26787 3.88607 3.48998C3 4.58943 3 6.21265 3 9.45908V14.0052C3 17.7781 3 19.6645 4.17157 20.8366C5.11466 21.7801 6.52043 21.9641 9 22M12 2.50022V3.00043C12 5.83009 12 7.24492 12.8787 8.12398C13.7574 9.00304 15.1716 9.00304 18 9.00304H18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 19.5L19.4453 20.4635C20.1297 20.9198 20.4719 21.1479 20.7359 21.0066C21 20.8653 21 20.454 21 19.6315V18.3685C21 17.546 21 17.1347 20.7359 16.9934C20.4719 16.8521 20.1297 17.0802 19.4453 17.5365L18 18.5M18 19.5V18.5M18 19.5C18 20.4346 18 20.9019 17.799 21.25C17.6674 21.478 17.478 21.6674 17.25 21.799C16.9019 22 16.4346 22 15.5 22H15C13.5858 22 12.8787 22 12.4393 21.5607C12 21.1213 12 20.4142 12 19C12 17.5858 12 16.8787 12.4393 16.4393C12.8787 16 13.5858 16 15 16H15.5C16.4346 16 16.9019 16 17.25 16.201C17.478 16.3326 17.6674 16.522 17.799 16.75C18 17.0981 18 17.5654 18 18.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_95819 = [["path",{d:"M4 22V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.8971 21.7598 16.5144 21.9508 14.0919 21.9899M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 5.5H7M10 7.5H9.5M7.5 9.5H7M10 11.5226H9.5M7.5 13.5H7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 22.0001V19C11 17.8954 10.1046 17 9 17C7.89543 17 7 17.8954 7 19V22.0001H11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40190 = [["path",{d:"M17.4776 9.01106C17.485 9.01102 17.4925 9.01101 17.5 9.01101C19.9853 9.01101 22 11.0294 22 13.5193C22 15.8398 20.25 17.7508 18 18M17.4776 9.01106C17.4924 8.84606 17.5 8.67896 17.5 8.51009C17.5 5.46695 15.0376 3 12 3C9.12324 3 6.76233 5.21267 6.52042 8.03192M17.4776 9.01106C17.3753 10.1476 16.9286 11.1846 16.2428 12.0165M6.52042 8.03192C3.98398 8.27373 2 10.4139 2 13.0183C2 15.4417 3.71776 17.4632 6 17.9273M6.52042 8.03192C6.67826 8.01687 6.83823 8.00917 7 8.00917C8.12582 8.00917 9.16474 8.38194 10.0005 9.01101",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 13L12 21M12 13C11.2998 13 9.99153 14.9943 9.5 15.5M12 13C12.7002 13 14.0085 14.9943 14.5 15.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_81520 = [["path",{d:"M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let eQ = (...e)=>e.filter(Boolean).join(" ");

let eZ = "rounded-[var(--rb-r-4xl,18px)]";

let eJ = "text-neutral-900/62 dark:text-neutral-100/62";

let eX = "text-[15px]/[20px] font-bold";

let e0 = "text-[13px]/[16px] font-semibold tabular-nums";

let e1 = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let e2 = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]";

let e5 = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let e6 = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let e8 = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let e4 = eQ("text-[14px]/[20px] font-medium",eJ);

let e9 = eQ(e0,eJ);

let e3 = eQ("border-2 border-dashed border-neutral-900/16 dark:border-neutral-100/18",eZ,"hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6",e2,e1);

let e7 = eQ("border-2 border-neutral-900/30 dark:border-neutral-100/34",eZ,"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]",e2,e1);

let ae = [{id:"u1",name:"hero-still-a.png",mb:4.2,icon:Icon_64801,progress:100,state:"done"},{id:"u2",name:"campaign-brief.pdf",mb:1.1,icon:Icon_31964,progress:100,state:"done"},{id:"u3",name:"sizzle-30s.mp4",mb:164,icon:Icon_19907,progress:62,state:"uploading"},{id:"u4",name:"press-kit.zip",mb:240,icon:Icon_95819,progress:0,state:"queued"},{id:"u5",name:"billboard-2400.png",mb:12.4,icon:Icon_64801,progress:34,state:"failed"}];

let aa = [{name:"teaser-15s.mp4",mb:88,icon:Icon_19907},{name:"storyboard-v4.pdf",mb:6.7,icon:Icon_31964},{name:"hero-still-b.png",mb:3.9,icon:Icon_64801}];


export default function file_manager_4__Sorbet__Component(){
  let[e,a]=useState(false),[r,i]=useState(ae),o=useRef(0);
  useEffect(()=>{
    let e=setInterval(()=>{
      i(e=>e.some(e=>"uploading"===e.state)?e.map(e=>{
        if("uploading"!==e.state)return e;
        let a=e.progress+3;
        return a>=100?{...e,progress:100,state:"done"}:{...e,progress:a};
      }):e)
    },900);
    return ()=>clearInterval(e);
  }, []);
  let s=r.filter(e=>"done"===e.state).length,{ref:c,edges:d,onScroll:_}=function(e){
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
  }(r.map(e=>`${e.id}:${e.state}`).join()),b=r.reduce((e,a)=>e+a.mb,0),x=r.reduce((e,a)=>e+a.mb*a.progress/100,0),u=()=>{
    let e=aa[o.current%aa.length];
    o.current+=1,i(a=>[...a,{...e,id:`n${o.current}`,progress:0,state:a.some(e=>"uploading"===e.state)?"queued":"uploading"}])
  };
  return (
    <div className={eQ("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[720px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={eQ("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto min-h-0 w-full max-w-[720px] flex-1 gap-1")}>
          <div className={eQ("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","justify-between gap-3 py-3 has-[button]:pe-4")}>
            <div className="min-w-0">
              <h2 className={eQ("text-[17px]/[22px] font-extrabold","truncate")}>Upload to Spring Campaign</h2>
              <p className={eQ(e4,"mt-0.5 flex gap-x-3 truncate tabular-nums")}>
                <span>
                  {s}
                  {" of "}
                  {r.length}
                  {" complete"}
                </span>
                <span>
                  {b.toFixed(1)}
                  {" MB total"}
                </span>
              </p>
            </div>
            <button type="button" aria-label="Close uploader" className={eQ(e5,"size-10 rounded-[calc(var(--rb-r-full,999px))]")}>
              <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <div className={eQ(e8,"p-2.5")}>
            <button type="button" onClick={u} onDragOver={e=>{
              e.preventDefault(),a(true)
            }} onDragLeave={()=>a(false)} onDrop={e=>{
              e.preventDefault(),a(false),u()
            }} className={eQ(e?e7:e3,"flex w-full cursor-pointer flex-col items-center justify-center border-dashed px-4 py-7 text-center")}>
              <HugeiconsIcon icon={Icon_40190} size={24} strokeWidth={2} aria-hidden="true" className={eJ} />
              <p className={eQ(eX,"mt-2.5")}>Drop files here or click to browse</p>
              <p className={eQ(e4,"mt-1")}>Up to 2 GB per file. Images, video, PDF and archives.</p>
            </button>
          </div>
          <div className={eQ(e8,"relative min-h-0 flex-1")}>
            <div ref={c} onScroll={_} className="min-h-0 flex-1 overflow-y-auto">
              <p className={eQ(e9,"px-4 pt-3")}>Queue</p>
              {0===r.length?<div className="mt-2 flex flex-col items-center justify-center px-6 py-10 text-center">
                <HugeiconsIcon icon={Icon_40190} size={20} strokeWidth={2} aria-hidden="true" className={eJ} />
                <p className={eQ("text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100","mt-2")}>Queue is empty</p>
                <p className={eQ("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>Drop files above to start a new upload.</p>
              </div>:<ul className={eQ("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-2 px-1 pb-1")}>
                {r.map(e=>{
                  let a=(e=>{
                    if("done"===e.state)return ["Uploaded"];
                    if("failed"===e.state)return ["Connection lost"];
                    if("paused"===e.state)return [`Paused at ${Math.round(e.progress)}%`];
                    if("queued"===e.state)return ["Waiting"];
                    let a=Math.max(1,Math.round((100-e.progress)/100*60));
                    return [`${Math.round(e.progress)}%`,`${a} s left`];
                  })(e);
                  return (
                    <li key={e.id}>
                                    <div className={eQ("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","failed"===e.state&&"bg-[oklch(95.5%_0.03_26/0.55)] hover:bg-[oklch(95.5%_0.03_26/0.8)] dark:bg-[oklch(30%_0.065_26/0.4)] dark:hover:bg-[oklch(30%_0.065_26/0.6)]",eZ,"px-3")}>
                                      <HugeiconsIcon icon={e.icon} size={18} strokeWidth={2} aria-hidden="true" className={eQ(eJ,"shrink-0")} />
                                      <div className="min-w-0 flex-1">
                                        <p className="flex items-baseline justify-between gap-3">
                                          <span className={eQ(eX,"truncate")}>{e.name}</span>
                                          <span className={eQ(e9,"shrink-0")}>
                                            {e.mb.toFixed(1)}
                                            {" MB"}
                                          </span>
                                        </p>
                                        {"done"===e.state?<p className={eQ(e9,"mt-1 flex items-center gap-1.5")}>
                                          <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                                          {a[0]}
                                        </p>:<>
                                          <div role="progressbar" aria-valuenow={Math.round(e.progress)} aria-valuemin={0} aria-valuemax={100} aria-label={`Upload progress for ${e.name}`} className={eQ("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","mt-1.5")}>
                                            <div style={{width:`${e.progress}%`}} className={"failed"===e.state?eQ("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","h-full"):"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]"} />
                                          </div>
                                          <p className={eQ(e0,"failed"===e.state?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":eJ,"mt-1 flex gap-x-2")}>{a.map(e=><span key={e}>{e}</span>)}</p>
                                        </>}
                                      </div>
                                      <button type="button" onClick={()=>{
                                        i(a=>a.flatMap(a=>a.id!==e.id?[a]:"uploading"===a.state?[{...a,state:"paused"}]:"paused"===a.state||"queued"===a.state?[{...a,state:"uploading"}]:"failed"===a.state?[{...a,progress:0,state:"uploading"}]:[]))
                                      }} aria-label={"failed"===e.state?`Retry ${e.name}`:"uploading"===e.state?`Pause ${e.name}`:"paused"===e.state||"queued"===e.state?`Start ${e.name}`:`Remove ${e.name}`} className={eQ(e5,"size-8 rounded-[calc(var(--rb-r-full,999px))]")}>
                                        <HugeiconsIcon icon={"failed"===e.state?Icon_59157:"uploading"===e.state?Icon_81520:"paused"===e.state||"queued"===e.state?Icon_48318:Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                                      </button>
                                    </div>
                                  </li>
                  );
                })}
              </ul>}
            </div>
            <div aria-hidden="true" className={eQ("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",d.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={eQ("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={eQ("flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5","flex-wrap")}>
            <p className="me-auto tabular-nums">
              {x.toFixed(1)}
              {" MB of "}
              {b.toFixed(1)}
              {" MB transferred"}
            </p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>i([])} className={eQ("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",e6)}>Cancel all</button>
              <button type="button" onClick={()=>i(e=>e.filter(e=>"done"!==e.state))} className={eQ("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",e6)}>Clear completed</button>
            </div>
          </div>
        </div>
      </div>
  );
}
