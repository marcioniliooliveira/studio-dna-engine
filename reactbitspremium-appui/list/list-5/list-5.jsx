/**
 * React Bits Pro — Application UI (list-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { add, delete, disconnect, has, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_19907 = [["path",{d:"M19 14.0052V10.6606C19 9.84276 19 9.43383 18.8478 9.06613C18.6955 8.69843 18.4065 8.40927 17.8284 7.83096L13.0919 3.09236C12.593 2.59325 12.3436 2.3437 12.0345 2.19583C11.9702 2.16508 11.9044 2.13778 11.8372 2.11406C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88646C4.26731 3.06554 4.06508 3.26787 3.88607 3.48998C3 4.58943 3 6.21265 3 9.45908V14.0052C3 17.7781 3 19.6645 4.17157 20.8366C5.11466 21.7801 6.52043 21.9641 9 22M12 2.50022V3.00043C12 5.83009 12 7.24492 12.8787 8.12398C13.7574 9.00304 15.1716 9.00304 18 9.00304H18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 19.5L19.4453 20.4635C20.1297 20.9198 20.4719 21.1479 20.7359 21.0066C21 20.8653 21 20.454 21 19.6315V18.3685C21 17.546 21 17.1347 20.7359 16.9934C20.4719 16.8521 20.1297 17.0802 19.4453 17.5365L18 18.5M18 19.5V18.5M18 19.5C18 20.4346 18 20.9019 17.799 21.25C17.6674 21.478 17.478 21.6674 17.25 21.799C16.9019 22 16.4346 22 15.5 22H15C13.5858 22 12.8787 22 12.4393 21.5607C12 21.1213 12 20.4142 12 19C12 17.5858 12 16.8787 12.4393 16.4393C12.8787 16 13.5858 16 15 16H15.5C16.4346 16 16.9019 16 17.25 16.201C17.478 16.3326 17.6674 16.522 17.799 16.75C18 17.0981 18 17.5654 18 18.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_22776 = [["circle",{cx:"7.5",cy:"7.5",r:"1.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424",stroke:"currentColor",strokeWidth:"1.5",key:"2"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_76021 = [["path",{d:"M17 21C16.3932 20.4102 14 18.8403 14 18C14 17.1597 16.3932 15.5898 17 15M15 18H22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 21C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12V14",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let h = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  m = "text-neutral-900/80 dark:text-neutral-100/80",
  f = "text-neutral-900/66 dark:text-neutral-100/66",
  k = "text-[13px]/[18px] font-normal",
  v = "text-[14px]/[16px] font-[450]",
  g = "text-[12px]/[16px] font-normal tabular-nums",
  w = "relative inline-flex size-4 shrink-0 items-center justify-center",
  _ = "peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40",
  y = "pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]",
  j = "inline-flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-white/10 px-3 text-[14px]/[16px] font-[450] transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-white/16 active:bg-white/28 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent-fg,oklch(100%_0_0))] dark:bg-neutral-900/10 dark:hover:bg-neutral-900/16 dark:active:bg-neutral-900/28 dark:focus-visible:outline-[var(--rb-accent-fg,oklch(20.5%_0_0))]",
  N = [{id:"hero-loop",name:"hero-launch-loop.mp4",kind:"video",spec:["1920 \xd7 1080","1:12"],size:"142 MB",uploader:"Nadia Whitfield",initials:"NW",date:"Feb 6, 2026",status:"review"},{id:"pricing-dark",name:"pricing-table-dark.png",kind:"image",spec:["2560 \xd7 1440"],size:"1.8 MB",uploader:"Owen Castellano",initials:"OC",date:"Feb 6, 2026",status:"approved"},{id:"onboard-3",name:"onboarding-step-3.png",kind:"image",spec:["1440 \xd7 900"],size:"820 KB",uploader:"Priya Raman",initials:"PR",date:"Feb 5, 2026",status:"approved"},{id:"tour-full",name:"product-tour-full.mp4",kind:"video",spec:["3840 \xd7 2160","3:48"],size:"512 MB",uploader:"Theo Marsh",initials:"TM",date:"Feb 5, 2026",status:"review"},{id:"testimonial",name:"testimonial-mara-lindqvist.mp4",kind:"video",spec:["1920 \xd7 1080","0:42"],size:"88 MB",uploader:"Sasha Bloom",initials:"SB",date:"Feb 4, 2026",status:"approved"},{id:"og-spring",name:"og-card-spring.png",kind:"image",spec:["1200 \xd7 630"],size:"340 KB",uploader:"Devon Ashby",initials:"DA",date:"Feb 4, 2026",status:"approved"},{id:"changelog-hd",name:"changelog-header.png",kind:"image",spec:["2880 \xd7 1620"],size:"2.4 MB",uploader:"Nadia Whitfield",initials:"NW",date:"Feb 3, 2026",status:"approved"},{id:"feature-grid",name:"feature-grid-anim.mp4",kind:"video",spec:["2560 \xd7 1440","1:56"],size:"268 MB",uploader:"Owen Castellano",initials:"OC",date:"Feb 3, 2026",status:"review"},{id:"avatars",name:"avatar-set-neutral.png",kind:"image",spec:["512 \xd7 512"],size:"96 KB",uploader:"Priya Raman",initials:"PR",date:"Feb 2, 2026",status:"approved"},{id:"docs-auth",name:"docs-diagram-auth.png",kind:"image",spec:["2048 \xd7 1536"],size:"1.1 MB",uploader:"Theo Marsh",initials:"TM",date:"Feb 2, 2026",status:"approved"},{id:"recap-q1",name:"release-recap-q1.mp4",kind:"video",spec:["1920 \xd7 1080","4:20"],size:"356 MB",uploader:"Sasha Bloom",initials:"SB",date:"Jan 30, 2026",status:"approved"}],
  A = {video:Icon_19907,image:Icon_22776},
  z = [{id:"all",label:"All"},{id:"review",label:"Needs review"},{id:"approved",label:"Approved"}],
  S = (e,t)=>e.filter(e=>"all"===t||e.status===t),
  C = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function R(){
  let[e,t]=useState(N),[r,l]=useState("all"),[R,M]=useState(()=>new Set),T=useRef(null),D=useRef(null),{ref:O,edges:P,onScroll:E}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),W=useMemo(()=>S(e,r), [e,r]),H=R.size,B=W.length>0&&W.every(e=>R.has(e.id)),L=H>0&&!B;
  useEffect(()=>{
    D.current&&(D.current.indeterminate=L)
  }, [L]);
  let $=(e,t)=>{
    let r=W[e]?.id;
    r&&(M(a=>{
      let n=new Set(a),i=T.current;
      if(t&&null!==i){
        let t=Math.min(i,e),a=Math.max(i,e),l=!has(r);
        for(let e=t;e<=a;e+=1){
          let t=W[e].id;
          l?add(t):delete(t)
        }
      }else has(r)?delete(r):add(r);
      return n;
    }),T.current=e)
  };
  return (
    <div className={h("bg-white dark:bg-neutral-950",b,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto flex w-full max-w-[1100px] shrink-0 flex-col">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={h("text-[20px]/[24px] font-[450] tracking-[-0.015em]",b)}>Asset library</h2>
              <p className={h(k,f,"mt-1")}>Uploaded media awaiting review before it ships to production.</p>
            </div>
            <div role="radiogroup" aria-label="Filter by status" onKeyDown={C} className={h("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {z.map(t=>{
                let n=r===t.id;
                return (
                  <button key={t.id} type="button" role="radio" aria-checked={n} tabIndex={n?0:-1} onClick={()=>{
                                var r;
                                let a;
                                return l(r=t.id),a=new Set(S(e,r).map(e=>e.id)),void(M(e=>{
                                  let t=false,r=new Set;
                                  return e.forEach(e=>{
                                    a.has(e)?r.add(e):t=true
                                  }),t?r:e;
                                }),T.current=null);
                              }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{t.label}</button>
                );
              })}
            </div>
          </div>
          <div className="relative mt-4 flex h-11 items-center justify-between gap-3 px-4.25">
            <label className={h(v,m,"inline-flex cursor-pointer items-center gap-2.5 select-none")}>
              <span className={w}>
                <input ref={D} type="checkbox" checked={B} onChange={()=>{
                  M(()=>B?new Set:new Set(W.map(e=>e.id))),T.current=null
                }} aria-label="Select all assets" className={_} />
                {B?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={y} />:L?<HugeiconsIcon icon={Icon_99199} size={12} strokeWidth={2.5} aria-hidden="true" className={y} />:null}
              </span>
              <span className={h(H>0&&"max-sm:sr-only")}>Select all</span>
            </label>
            <div className="flex items-center">
              <span aria-hidden={H>0} className={h(g,f,H>0?"opacity-0":"opacity-100")}>
                {W.length}
                {" "}
                {1===W.length?"asset":"assets"}
              </span>
              <div aria-hidden={0===H} className={h("flex h-11 max-w-full items-center gap-1 rounded-[var(--rb-r-lg,10px)] bg-neutral-900 py-2 ps-4 pe-2 text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute right-0",H>0?"opacity-100":"pointer-events-none opacity-0")}>
                <span className={h(v,"mr-1 whitespace-nowrap tabular-nums")}>
                  {H}
                  {" selected"}
                </span>
                <button type="button" tabIndex={H>0?0:-1} className={j}>
                  <HugeiconsIcon icon={Icon_92752} size={14} strokeWidth={1.8} aria-hidden="true" />
                  <span className="max-sm:sr-only">Download</span>
                </button>
                <button type="button" tabIndex={H>0?0:-1} className={j}>
                  <HugeiconsIcon icon={Icon_76021} size={14} strokeWidth={1.8} aria-hidden="true" />
                  <span className="max-sm:sr-only">Move</span>
                </button>
                <button type="button" onClick={()=>{
                  t(e=>e.filter(e=>!R.has(e.id))),M(new Set),T.current=null
                }} tabIndex={H>0?0:-1} className={j}>
                  <HugeiconsIcon icon={Icon_96037} size={14} strokeWidth={1.8} aria-hidden="true" />
                  <span className="max-sm:sr-only">Delete</span>
                </button>
                <button type="button" onClick={()=>{
                  M(new Set),T.current=null
                }} tabIndex={H>0?0:-1} aria-label="Clear selection" className={h(j,"ml-0.5")}>
                  <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className={h("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","relative mt-1 shrink-0")}>
            <div ref={O} onScroll={E} className="h-[454px] overflow-y-auto p-2">
              {0===W.length?<div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <span className="flex h-10 w-10 items-center justify-center">
                  <HugeiconsIcon icon={Icon_22776} size={20} strokeWidth={1.8} aria-hidden="true" className={m} />
                </span>
                <p className={h("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-3")}>{0===e.length?"The library is empty":"No assets in this view"}</p>
                <p className={h("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>
                  {0===e.length?"Every asset has been deleted.":"Nothing matches this status right now."}
                </p>
                <button type="button" onClick={()=>{
                  t(N),l("all"),M(new Set),T.current=null
                }} className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-3")}>Restore library</button>
              </div>:<ul className={h("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex flex-col")}>
                {W.map((e,t)=>{
                  let r=R.has(e.id);
                  return (
                    <li key={e.id}>
                                    <label className={h("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","rounded-[var(--rb-r-sm,6px)]",r?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","h-16 cursor-pointer px-2 select-none")}>
                                      <span className={w}>
                                        <input type="checkbox" checked={r} onChange={()=>$(t,false)} onClick={e=>{
                                          e.shiftKey&&(e.preventDefault(),$(t,true))
                                        }} aria-label={`Select ${e.name}`} className={_} />
                                        <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={y} />
                                      </span>
                                      <span className={h("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","size-10")}>
                                        <HugeiconsIcon icon={A[e.kind]} size={18} strokeWidth={1.8} aria-hidden="true" />
                                      </span>
                                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                        <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.name}</span></p>
                                        <p data-description className={h(k,f,"truncate tabular-nums")}>
                                          {[...e.spec,e.size].map((e,t)=><span key={e} className={t>0?"ms-3":undefined}>{e}</span>)}
                                        </p>
                                      </div>
                                      <div className="hidden w-40 shrink-0 items-center gap-2 lg:flex">
                                        <span aria-hidden="true" className={h("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                                          <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.initials.charAt(0)}</span>
                                        </span>
                                        <span className={h(g,m,"min-w-0 truncate")}>{e.uploader}</span>
                                      </div>
                                      <time className={h("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","hidden w-24 sm:block")}>{e.date}</time>
                                      <span className={h("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","review"===e.status?"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]":"text-neutral-900/80 dark:text-neutral-100/80","w-24 shrink-0 sm:w-32")}>{"review"===e.status?"Needs review":"Approved"}</span>
                                    </label>
                                  </li>
                  );
                })}
              </ul>}
            </div>
            <div aria-hidden="true" className={h("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 z-10 h-8",P.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8",P.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default R;
