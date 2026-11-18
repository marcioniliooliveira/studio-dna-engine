/**
 * React Bits Pro — Application UI (forms-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_64739 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_17601 = [["path",{d:"M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 9L11 9M8 13L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 22L22 22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_83605 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10 18.5002L9.99999 13.8474C9.99999 13.6557 9.86325 13.5002 9.69458 13.5002H9M14 18.4983L15.4855 13.8923C15.4951 13.8626 15.5 13.8315 15.5 13.8002C15.5 13.6346 15.3657 13.5002 15.2 13.5002L13 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let m = (...e)=>e.filter(Boolean).join(" ");

let k = "rounded-[var(--rb-r-4xl,18px)]";

let v = "text-neutral-900/62 dark:text-neutral-100/62";

let f = "text-[13px]/[16px] font-semibold tabular-nums";

let g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let w = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let j = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let y = "relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40";

let N = "h-10";

let C = "h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]";

let S = "flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1";

let z = "relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3 text-[13px]/[16px] font-bold tabular-nums text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40";

let A = "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0";

function E({id:e,value:a,defaultValue:r,onChange:s,options:c,disabled:d,placeholder:_="Select…",className:b,triggerClassName:x,leading:u,ariaLabel:h}){
  let p=useId(),[k,g]=useState(false),[w,j]=useState(0),[y,N]=useState(false),[C,S]=useState(),[z,A]=useState(r??""),E=useRef(null),D=useRef(null),M=useRef({buffer:"",at:0}),W=a??z,L=c.findIndex(e=>e.value===W),R=L>=0?c[L]:undefined,T=()=>{
    if(d)return;
    let e=E.current,a=e?.ownerDocument.defaultView;
    if(e&&a){
      let r=e.getBoundingClientRect(),t=0,l=a.innerHeight;
      for(let r=e.parentElement;r;r=r.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(r).overflowY)){
        let e=r.getBoundingClientRect();
        t=Math.max(t,e.top),l=Math.min(l,e.bottom);
        break
      }
      let n=l-r.bottom,o=r.top-t,i=Math.min(32*c.length+8,264),s=n<i+8&&o>n,d=(s?o:n)-8;
      N(s),S(d<i?Math.max(d,40):undefined)
    }
    j(L>=0?L:0),g(true)
  };
  useEffect(()=>{
    if(!k)return;
    let e=E.current;
    if(!e)return;
    let a=e.ownerDocument,r=a=>{
      e.contains(a.target)||g(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [k]),useEffect(()=>{
    if(!k)return;
    let e=D.current,a=e?.querySelector(`[data-index="${w}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [k,w]);
  let F=e=>{
    let r=c[e];
    r&&(undefined===a&&A(r.value),s?.(r.value),g(false),E.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={E} className={m("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={k} aria-controls={p} aria-haspopup="listbox" aria-label={h} disabled={d} onClick={()=>k?g(false):T()} onKeyDown={e=>{
          if(!d){
            if(!k){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),T());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),g(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),j(e=>Math.min(e+1,c.length-1));else if("ArrowUp"===e.key)e.preventDefault(),j(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),j(0);else if("End"===e.key)e.preventDefault(),j(c.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),F(w);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=M.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=c.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&j(t)
            }
          }
        }} className={m("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",x)}>
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {u}
            <span className="grid min-w-0 flex-1 text-left">
              {c.map(e=><span key={e.value} aria-hidden="true" className="invisible col-start-1 row-start-1 truncate">{e.label}</span>)}
              <span className={m("col-start-1 row-start-1 truncate",!R&&"text-neutral-900/62 dark:text-neutral-100/62")}>{R?R.label:_}</span>
            </span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {k&&<ul ref={D} id={p} role="listbox" tabIndex={-1} style={{maxHeight:C}} className={m("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",y?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {c.map((e,a)=>{
            let r=e.value===W;
            return (
              <li key={e.value} role="option" aria-selected={r} data-index={a} data-highlighted={a===w?"":undefined} onMouseEnter={()=>j(a)} onClick={()=>F(a)} className={m("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={m(f,v,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {r&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let D = ["Coastal survey team","Estuary monitoring team","Upland transect team"];

let M = [{value:"internal",label:"Institute only"},{value:"partners",label:"Institute and partners"},{value:"open",label:"Open data portal"}];

let W = ["Benthic cores","Water column","Sediment traps"];

let L = {title:"Halcyon Bank autumn sampling",station:"HB-14",vessel:"RV Silverling",deployDate:"2026-09-14",recoverDate:"2026-09-27",window:"06:30",crew:D[0],methods:["Benthic cores","Water column"],visibility:"partners",embargo:true,photo:"HB"};

let R = ["title","station","vessel","deployDate","recoverDate","window","crew","methods","visibility","photo"];

function T({label:e,htmlFor:a,hint:r,top:l,children:o}){
  return (
    <div className={m("grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:gap-4",l?"sm:items-start":"sm:items-center")}>
        <label htmlFor={a} className={m("flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100",l&&"sm:pt-2")}>
          {e}
          {r&&<span title={r} className={m(v,"inline-flex cursor-help")}>
            <HugeiconsIcon icon={Icon_64739} size={16} strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">{r}</span>
          </span>}
        </label>
        <div className="min-w-0">{o}</div>
      </div>
  );
}

let ef = (...e)=>e.filter(Boolean).join(" ");

let eg = "bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]";

let ew = "rounded-[var(--rb-r-4xl,18px)]";

let ej = "text-neutral-900 dark:text-neutral-100";

let ey = "text-neutral-900/78 dark:text-neutral-100/78";

let eN = "text-neutral-900/62 dark:text-neutral-100/62";

let eC = "border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7";

let eS = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let ez = "text-[17px]/[22px] font-extrabold";

let eA = "text-[14px]/[20px] font-medium";

let eE = "text-[15px]/[20px] font-bold";

let eD = "text-[13px]/[16px] font-semibold tabular-nums";

let eM = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eW = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let eL = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eR = "relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40";

let eT = "h-10";

let eF = "h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]";

let eB = "flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1";

let eH = "flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let e$ = "inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums";

let eI = "bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12";

let eP = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let eq = "min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100";

let eU = "text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78";

let eO = "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0";

function eK({id:e,value:a,defaultValue:r,onChange:s,options:c,disabled:d,placeholder:_="Select…",className:b,triggerClassName:x,leading:u,ariaLabel:h}){
  let p=useId(),[m,k]=useState(false),[v,f]=useState(0),[g,w]=useState(false),[j,y]=useState(),[N,C]=useState(r??""),S=useRef(null),z=useRef(null),A=useRef({buffer:"",at:0}),E=a??N,D=c.findIndex(e=>e.value===E),M=D>=0?c[D]:undefined,W=()=>{
    if(d)return;
    let e=S.current,a=e?.ownerDocument.defaultView;
    if(e&&a){
      let r=e.getBoundingClientRect(),t=0,l=a.innerHeight;
      for(let r=e.parentElement;r;r=r.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(r).overflowY)){
        let e=r.getBoundingClientRect();
        t=Math.max(t,e.top),l=Math.min(l,e.bottom);
        break
      }
      let n=l-r.bottom,o=r.top-t,i=Math.min(32*c.length+8,264),s=n<i+8&&o>n,d=(s?o:n)-8;
      w(s),y(d<i?Math.max(d,40):undefined)
    }
    f(D>=0?D:0),k(true)
  };
  useEffect(()=>{
    if(!m)return;
    let e=S.current;
    if(!e)return;
    let a=e.ownerDocument,r=a=>{
      e.contains(a.target)||k(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [m]),useEffect(()=>{
    if(!m)return;
    let e=z.current,a=e?.querySelector(`[data-index="${v}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [m,v]);
  let L=e=>{
    let r=c[e];
    r&&(undefined===a&&C(r.value),s?.(r.value),k(false),S.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={S} className={ef("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={m} aria-controls={p} aria-haspopup="listbox" aria-label={h} disabled={d} onClick={()=>m?k(false):W()} onKeyDown={e=>{
          if(!d){
            if(!m){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),W());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),k(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),f(e=>Math.min(e+1,c.length-1));else if("ArrowUp"===e.key)e.preventDefault(),f(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),f(0);else if("End"===e.key)e.preventDefault(),f(c.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),L(v);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=A.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=c.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&f(t)
            }
          }
        }} className={ef("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",x)}>
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {u}
            <span className="grid min-w-0 flex-1 text-left">
              {c.map(e=><span key={e.value} aria-hidden="true" className="invisible col-start-1 row-start-1 truncate">{e.label}</span>)}
              <span className={ef("col-start-1 row-start-1 truncate",!M&&"text-neutral-900/62 dark:text-neutral-100/62")}>{M?M.label:_}</span>
            </span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {m&&<ul ref={z} id={p} role="listbox" tabIndex={-1} style={{maxHeight:j}} className={ef("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {c.map((e,a)=>{
            let r=e.value===E;
            return (
              <li key={e.value} role="option" aria-selected={r} data-index={a} data-highlighted={a===v?"":undefined} onMouseEnter={()=>f(a)} onClick={()=>L(a)} className={ef("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={ef(eD,eN,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {r&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let eV = [{value:"palletised",label:"Palletised dry goods"},{value:"reefer",label:"Temperature-controlled"},{value:"hazmat",label:"Hazardous, class 3"},{value:"machinery",label:"Machinery and parts"},{value:"textiles",label:"Baled textiles"}];

let eY = [{value:"northwind",label:"Northwind Traders",origin:"Rotterdam, NL",destination:"Gdansk, PL"},{value:"meridian",label:"Meridian Logistics",origin:"Felixstowe, GB",destination:"Bilbao, ES"},{value:"parcelworks",label:"Parcelworks BV",origin:"Antwerp, BE",destination:"Marseille, FR"}];

let eG = [{value:0,label:"0% exempt"},{value:.05,label:"5% reduced"},{value:.12,label:"12% standard"},{value:.18,label:"18% elevated"}];

let eJ = [{id:1,cargo:"palletised",qty:"18",rate:"42.50",duty:.05},{id:2,cargo:"reefer",qty:"6",rate:"128.00",duty:.12},{id:3,cargo:"machinery",qty:"2",rate:"540.00",duty:.18}];

let eQ = e=>e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});

let eZ = e=>Math.round(100*e)/100;

let eX = e=>{
  let a=Number.parseFloat(e);
  return Number.isFinite(a)?a:0;
};

let e0 = e=>eZ(eX(e.qty)*eX(e.rate));

let e1 = e=>eZ(e0(e)*e.duty);


export default function forms_3__Sorbet__Component(){
  let[e,a]=useState(false),[r,o]=useState("northwind"),[s,c]=useState("SHP-4471"),[b,x]=useState("GB 842 5591 07"),[u,h]=useState("Lena Ostrowski"),[p,m]=useState("2026-08-14"),[k,v]=useState("2026-08-21"),[f,g]=useState("DAP"),[w,j]=useState("standard"),[y,N]=useState("EUR"),[C,S]=useState(eJ),[z,A]=useState(4),[E,D]=useState(false),[M,W]=useState(false),L=useRef(null);
  useEffect(()=>()=>{
    L.current&&clearTimeout(L.current)
  }, []);
  let R=useMemo(()=>{
    let e=0,a=0;
    for(let r of C)e+=e0(r),a+=e1(r);
    return {subtotal:e,dutyTotal:a,grand:e+a};
  }, [C]),T=()=>{
    a(true),W(false)
  },F=(e,a)=>{
    S(r=>r.map(r=>r.id===e?{...r,...a}:r)),T()
  },B=eY.find(e=>e.value===r)??eY[0];
  return (
    <div className={ef("bg-white dark:bg-neutral-950",ej,"flex h-full min-h-[1120px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[1100px]">
          {E?<div className={ef(eP,"mx-auto max-w-[520px] items-center px-6 py-14 text-center")}>
            <span className="flex h-12 w-12 items-center justify-center">
              <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={2} aria-hidden="true" className={ey} />
            </span>
            <h2 className={ef(ez,ej,"mt-4")}>Shipment booked</h2>
            <p className={ef(eA,ey,"mt-1.5 max-w-sm")}>
              Booking
              {" "}
              <span className={ef("rounded-[calc(var(--rb-r-sm,6px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] px-1.5 py-px font-mono text-[0.88em] leading-none text-neutral-900 dark:text-neutral-100 [box-decoration-break:clone] dark:bg-neutral-100/10","tabular-nums")}>{s}</span>
              {" "}
              {"is confirmed on the "}
              {B.origin}
              {" to"}
              {" "}
              {B.destination}
              {" lane. The carrier will send collection details shortly."}
            </p>
            <div className={ef(eg,ew,eE,"mt-4 flex w-full max-w-[280px] items-center justify-between gap-6 px-3 py-2")}>
              <span className={ej}>Total booked</span>
              <span className={ef(ej,"tabular-nums")}>
                {y}
                {" "}
                {eQ(R.grand)}
              </span>
            </div>
            <button type="button" onClick={()=>{
              o("northwind"),c("SHP-4471"),x("GB 842 5591 07"),h("Lena Ostrowski"),m("2026-08-14"),v("2026-08-21"),g("DAP"),j("standard"),N("EUR"),S(eJ),A(4),a(false),W(false),D(false)
            }} className={ef(eM,eL,"mt-5")}>Book another shipment</button>
          </div>:<div className={eP}>
            <div className={ef(eC,"flex items-start justify-between gap-4 px-4 py-3")}>
              <div className="min-w-0">
                <h2 className={ef(ez,ej)}>New freight booking</h2>
                <p className={ef(eU,"mt-0.5")}>Consignor, route and cargo for a single shipment.</p>
              </div>
              <span className={ef(e$,eI)}>Draft</span>
            </div>
            <div className={ef(eS,"flex flex-col")}>
              <section className="p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className={eq}>Consignor</h3>
                    <p className={ef(eU,"mt-0.5")}>Who is sending the goods and how to reach them.</p>
                  </div>
                  <span className={ef(e$,eI)}>Shipper</span>
                </div>
                <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-account" className={eH}>Account</label>
                    <eK id="frm3-account" value={r} onChange={e=>{
                      o(e),T()
                    }} options={eY.map(e=>({value:e.value,label:e.label}))} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-reference" className={eH}>Booking reference</label>
                    <div className={ef(eR,eT)}>
                      <input id="frm3-reference" value={s} onChange={e=>{
                        c(e.target.value),T()
                      }} className={ef(eF,"tabular-nums")} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-taxid" className={eH}>Tax identifier</label>
                    <div className={ef(eR,eT)}>
                      <span data-affix className={eB}>
                        <HugeiconsIcon icon={Icon_17601} size={18} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <input id="frm3-taxid" value={b} onChange={e=>{
                        x(e.target.value),T()
                      }} className={ef(eF,"tabular-nums")} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-contact" className={eH}>Booking contact</label>
                    <div className={ef(eR,eT)}>
                      <input id="frm3-contact" value={u} onChange={e=>{
                        h(e.target.value),T()
                      }} className={eF} />
                    </div>
                  </div>
                </div>
              </section>
              <section className="p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className={eq}>Route and terms</h3>
                    <p className={ef(eU,"mt-0.5")}>Collection window, delivery terms and settlement currency.</p>
                  </div>
                  <span className={ef(e$,eI)}>Transit</span>
                </div>
                <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-pickup" className={eH}>Pickup date</label>
                    <div className={ef(eR,eT)}>
                      <input id="frm3-pickup" type="date" value={p} onChange={e=>{
                        m(e.target.value),T()
                      }} className={ef(eF,eO,"tabular-nums")} />
                      <span data-affix className={eB}>
                        <HugeiconsIcon icon={Icon_83605} size={18} strokeWidth={2} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-delivery" className={eH}>Delivery date</label>
                    <div className={ef(eR,eT)}>
                      <input id="frm3-delivery" type="date" value={k} onChange={e=>{
                        v(e.target.value),T()
                      }} className={ef(eF,eO,"tabular-nums")} />
                      <span data-affix className={eB}>
                        <HugeiconsIcon icon={Icon_83605} size={18} strokeWidth={2} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-incoterm" className={eH}>Incoterm</label>
                    <eK id="frm3-incoterm" value={f} onChange={e=>{
                      g(e),T()
                    }} options={[{value:"EXW",label:"EXW, ex works"},{value:"FCA",label:"FCA, free carrier"},{value:"DAP",label:"DAP, delivered at place"},{value:"DDP",label:"DDP, delivered duty paid"}]} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-service" className={eH}>Service level</label>
                    <eK id="frm3-service" value={w} onChange={e=>{
                      j(e),T()
                    }} options={[{value:"economy",label:"Economy road"},{value:"standard",label:"Standard groupage"},{value:"express",label:"Express dedicated"}]} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-currency" className={eH}>Currency</label>
                    <eK id="frm3-currency" value={y} onChange={e=>{
                      N(e),T()
                    }} options={[{value:"EUR",label:"EUR, euro"},{value:"GBP",label:"GBP, pound sterling"},{value:"USD",label:"USD, US dollar"}]} />
                  </div>
                </div>
              </section>
              <section className="p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className={eq}>Cargo lines</h3>
                    <p className={ef(eU,"mt-0.5")}>Amount per line is quantity times unit rate plus duty.</p>
                  </div>
                  <span className={ef(e$,eI)}>
                    {C.length}
                    {" "}
                    {1===C.length?"line":"lines"}
                  </span>
                </div>
                <div className={ef(eC,"hidden grid-cols-[minmax(0,1fr)_72px_104px_168px_112px_32px] items-center gap-2 px-1 pb-2 md:grid")}>
                  <span className={ef(eD,eN,"ps-3")}>Description</span>
                  <span className={ef(eD,eN,"pe-3 text-right")}>Qty</span>
                  <span className={ef(eD,eN,"pe-3 text-right")}>Unit rate</span>
                  <span className={ef(eD,eN,"ps-3")}>Duty</span>
                  <span className={ef(eD,eN,"pe-1 text-right")}>Amount</span>
                  <span className="sr-only">Actions</span>
                </div>
                <div className={ef(eS,"flex flex-col")}>
                  {C.map(e=>{
                    let a=1===C.length;
                    return (
                      <div key={e.id} className="grid grid-cols-[80px_minmax(0,1fr)_72px] items-center gap-2 px-1 py-3 md:grid-cols-[minmax(0,1fr)_72px_104px_168px_112px_32px] md:py-1.5">
                                        <div className="col-span-2 min-w-0 md:col-span-1">
                                          <eK ariaLabel="Cargo description" value={e.cargo} onChange={a=>F(e.id,{cargo:a})} options={eV} />
                                        </div>
                                        <div className={ef(eR,eT)}>
                                          <span data-affix className={ef(eB,"md:hidden")}>Qty</span>
                                          <input aria-label="Quantity" inputMode="numeric" value={e.qty} onChange={a=>F(e.id,{qty:a.target.value.replace(/[^0-9]/g,"")})} className={ef(eF,"text-right tabular-nums")} />
                                        </div>
                                        <div className={ef(eR,eT,"col-span-2 md:col-span-1")}>
                                          <span data-affix className={ef(eB,"md:hidden")}>Unit rate</span>
                                          <input aria-label="Unit rate" inputMode="decimal" value={e.rate} onChange={a=>F(e.id,{rate:a.target.value.replace(/[^0-9.]/g,"")})} className={ef(eF,"text-right tabular-nums")} />
                                        </div>
                                        <eK ariaLabel="Duty rate" className="col-span-2 md:col-span-1" triggerClassName="tabular-nums" value={String(e.duty)} onChange={a=>F(e.id,{duty:Number.parseFloat(a)})} options={eG.map(e=>({value:String(e.value),label:e.label}))} />
                                        <span className={ef(eA,ej,"pr-1 text-right tabular-nums")}>{eQ(eZ(e0(e)+e1(e)))}</span>
                                        <button type="button" onClick={()=>{
                                          var a;
                                          return a=e.id,void(S(e=>e.length>1?e.filter(e=>e.id!==a):e),T());
                                        }} disabled={a} title={a?"A booking needs at least one cargo line":"Remove line"} className={ef("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-10 rounded-[calc(var(--rb-r-full,999px))]","col-start-3 row-start-1 justify-self-end md:col-start-auto md:row-start-auto")}>
                                          <HugeiconsIcon icon={Icon_96037} size={18} strokeWidth={2} aria-hidden="true" />
                                          <span className="sr-only">Remove line</span>
                                        </button>
                                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <button type="button" onClick={()=>{
                    S(e=>[...e,{id:z,cargo:"palletised",qty:"1",rate:"0.00",duty:.12}]),A(e=>e+1),T()
                  }} className={ef(eM,eL)}>
                    <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
                    Add line
                  </button>
                  <div className="w-full max-w-[280px] space-y-1.5 sm:w-auto">
                    <div className={ef(eA,"flex items-center justify-between gap-6 px-3 py-2")}>
                      <span className={eN}>Subtotal</span>
                      <span className={ef(ej,"tabular-nums")}>
                        {y}
                        {" "}
                        {eQ(R.subtotal)}
                      </span>
                    </div>
                    <div className={ef(eA,"flex items-center justify-between gap-6 px-3 py-2")}>
                      <span className={eN}>Duty total</span>
                      <span className={ef(ej,"tabular-nums")}>
                        {y}
                        {" "}
                        {eQ(R.dutyTotal)}
                      </span>
                    </div>
                    <div className={ef(eg,ew,eE,"flex items-center justify-between gap-6 px-3 py-2")}>
                      <span className={ej}>Grand total</span>
                      <span className={ef(ej,"tabular-nums")}>
                        {y}
                        {" "}
                        {eQ(R.grand)}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className={ef("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex flex-col-reverse items-stretch justify-between gap-3 px-4 py-3 sm:min-h-11 sm:flex-row sm:items-center sm:py-2 sm:pe-2")}>
              <p className={ef(eA,M?ey:eN)} aria-live="polite">{M?"Draft saved":"Rates are indicative until the carrier confirms capacity."}</p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={()=>{
                  a(false),W(true),L.current&&clearTimeout(L.current),L.current=setTimeout(()=>W(false),2500)
                }} className={ef(eM,eW)}>Save draft</button>
                <button type="button" disabled={!e} onClick={()=>D(true)} className={ef("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",eW)}>Book shipment</button>
              </div>
            </div>
          </div>}
        </div>
      </div>
  );
}
