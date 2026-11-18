/**
 * React Bits Pro — Application UI (forms-8 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { label, length, options, slice, type, unit, useEffect, useId, useMemo, useRef, useState,  } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_64739 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_10303 = [["path",{d:"M6 12V8C6 7.05719 6 6.58579 6.29289 6.29289C6.58579 6 7.05719 6 8 6H12C12.9428 6 13.4142 6 13.7071 6.29289C14 6.58579 14 7.05719 14 8V12C14 12.9428 14 13.4142 13.7071 13.7071C13.4142 14 12.9428 14 12 14H8C7.05719 14 6.58579 14 6.29289 13.7071C6 13.4142 6 12.9428 6 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2 20V16C2 15.0572 2 14.5858 2.29289 14.2929C2.58579 14 3.05719 14 4 14H8C8.94281 14 9.41421 14 9.70711 14.2929C10 14.5858 10 15.0572 10 16V20C10 20.9428 10 21.4142 9.70711 21.7071C9.41421 22 8.94281 22 8 22H4C3.05719 22 2.58579 22 2.29289 21.7071C2 21.4142 2 20.9428 2 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M10 20V16C10 15.0572 10 14.5858 10.2929 14.2929C10.5858 14 11.0572 14 12 14H16C16.9428 14 17.4142 14 17.7071 14.2929C18 14.5858 18 15.0572 18 16V20C18 20.9428 18 21.4142 17.7071 21.7071C17.4142 22 16.9428 22 16 22H12C11.0572 22 10.5858 22 10.2929 21.7071C10 21.4142 10 20.9428 10 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 21.5L21.4142 18.0858C21.7032 17.7968 21.8478 17.6522 21.9239 17.4685C22 17.2847 22 17.0803 22 16.6716V12C22 11.0572 22 10.5858 21.7071 10.2929C21.4142 10 20.9428 10 20 10H18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M6 10L2.58579 13.4142C2.29676 13.7032 2.15224 13.8478 2.07612 14.0315C2 14.2153 2 14.4197 2 14.8284V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M14 13.5L17.317 10.5976C17.6532 10.3035 17.8213 10.1564 17.9106 9.95945C18 9.7625 18 9.53916 18 9.09246V4C18 3.05719 18 2.58579 17.7071 2.29289C17.4142 2 16.9428 2 16 2H11.2604C10.8845 2 10.6965 2 10.5248 2.06528C10.3531 2.13056 10.2126 2.25543 9.93167 2.50518L6.67127 5.40331C6.34077 5.69709 6.17552 5.84398 6.08776 6.03941C6 6.23484 6 6.45594 6 6.89813V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M14 6L17.5 2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M18 14L21.5 10.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];

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

let rW = (...e)=>e.filter(Boolean).join(" ");

let rL = "text-neutral-900/78 dark:text-neutral-100/78";

let rR = "text-neutral-900/62 dark:text-neutral-100/62";

let rT = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let rF = "bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]";

let rB = "rounded-[var(--rb-r-4xl,18px)]";

let rH = "text-[14px]/[20px] font-medium";

let r$ = "text-[15px]/[20px] font-bold";

let rI = "text-[13px]/[16px] font-semibold tabular-nums";

let rP = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let rq = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let rU = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let rO = "relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40";

let rK = "h-10";

let rV = "h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]";

let rY = "max-w-[60ch] text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78";

let rG = "inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1";

let rJ = "h-10";

let rQ = "relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40";

let rZ = rW(rH,rR,"shrink-0");

function rX(e){
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=a.indexOf(e.target);
  if(r<0)return;
  let t=r;
  if("ArrowRight"===e.key||"ArrowDown"===e.key)t=(r+1)%a.length;else if("ArrowLeft"===e.key||"ArrowUp"===e.key)t=(r-1+a.length)%a.length;else if("Home"===e.key)t=0;else{
    if("End"!==e.key)return;
    t=a.length-1
  }
  e.preventDefault(),a[t].focus(),a[t].click()
}

let r0 = [{id:"weight",label:"Pallet weight",type:"number",unit:"kg"},{id:"height",label:"Pallet height",type:"number",unit:"cm"},{id:"category",label:"SKU category",type:"enum",options:["Ambient","Chilled","Frozen","Hazardous","Fragile"]},{id:"zone",label:"Destination zone",type:"enum",options:["Bay 1","Bay 2","Bay 3","Bay 4","Cold store","Overflow"]},{id:"carrier",label:"Carrier name",type:"text"},{id:"reference",label:"Reference code",type:"text"},{id:"hazard",label:"Hazardous flag",type:"boolean"}];

let r1 = e=>r0.find(a=>a.id===e)??r0[0];

let r2 = {text:[{id:"is",label:"is"},{id:"is_not",label:"is not"},{id:"contains",label:"contains"}],number:[{id:"equals",label:"equals"},{id:"greater",label:"greater than"},{id:"between",label:"between"}],enum:[{id:"is",label:"is"},{id:"is_not",label:"is not"},{id:"any_of",label:"is any of"}],boolean:[{id:"is",label:"is"}]};

let r5 = [{id:"route",label:"Route to zone",param:"select",options:["Bay 1","Bay 2","Bay 3","Bay 4","Cold store","Overflow"],phrase:e=>`route it to ${e}`,emptyPhrase:"route it to a zone"},{id:"notify",label:"Notify",param:"select",options:["the floor lead","the receiving team","the shift manager","the cold-chain lead"],phrase:e=>`notify ${e}`,emptyPhrase:"notify someone"},{id:"priority",label:"Set priority",param:"select",options:["Standard","High","Urgent"],phrase:e=>`set priority to ${e.toLowerCase()}`,emptyPhrase:"set a priority"},{id:"hold",label:"Place on hold",param:"none",phrase:()=>"place it on hold",emptyPhrase:"place it on hold"},{id:"note",label:"Add a note",param:"text",placeholder:"Note text",phrase:e=>`add the note "${e}"`,emptyPhrase:"add a note"}];

let r6 = e=>r5.find(a=>a.id===e)??r5[0];

function r8(e){
  let a=r1(e.field).type;
  return "text"===a?""===e.value.trim():"number"===a?"between"===e.operator?""===e.value.trim()||""===e.value2.trim():""===e.value.trim():"enum"===a&&("any_of"===e.operator?0===e.values.length:""===e.value);
}

let r4 = [{id:"PLT-1042",weight:620,height:142,category:"Frozen",zone:"Cold store",carrier:"Nordic Freight",reference:"INB-77201",hazard:false},{id:"PLT-1043",weight:480,height:118,category:"Frozen",zone:"Bay 3",carrier:"Harbor Logistics",reference:"INB-77202",hazard:false},{id:"PLT-1044",weight:905,height:168,category:"Frozen",zone:"Overflow",carrier:"Nordic Freight",reference:"INB-77203",hazard:true},{id:"PLT-1045",weight:750,height:150,category:"Frozen",zone:"Cold store",carrier:"Meridian Cargo",reference:"INB-77204",hazard:false},{id:"PLT-1046",weight:300,height:96,category:"Ambient",zone:"Bay 1",carrier:"Harbor Logistics",reference:"INB-77205",hazard:false},{id:"PLT-1047",weight:1200,height:184,category:"Frozen",zone:"Cold store",carrier:"Nordic Freight",reference:"INB-77206",hazard:false},{id:"PLT-1048",weight:540,height:128,category:"Chilled",zone:"Bay 2",carrier:"Meridian Cargo",reference:"INB-77207",hazard:false},{id:"PLT-1049",weight:610,height:134,category:"Frozen",zone:"Bay 4",carrier:"Harbor Logistics",reference:"INB-77208",hazard:false}];

function r9(e,a){
  let r=r1(e.field),t=a[r.id];
  if("text"===r.type){
    let a=String(t??"").toLowerCase(),r=e.value.trim().toLowerCase();
    return ""!==r&&("is_not"===e.operator?a!==r:"contains"===e.operator?a.includes(r):a===r);
  }
  if("number"===r.type){
    let a=Number(t),r=parseFloat(e.value);
    if(Number.isNaN(r))return false;
    if("greater"===e.operator)return a>r;
    if("between"===e.operator){
      let t=parseFloat(e.value2);
      return !Number.isNaN(t)&&a>=Math.min(r,t)&&a<=Math.max(r,t);
    }
    return a===r;
  }
  if("enum"===r.type){
    let a=String(t??"");
    return "any_of"===e.operator?e.values.includes(a):""!==e.value&&("is_not"===e.operator?a!==e.value:a===e.value);
  }
  return !!t===e.bool;
}

function r3({id:e,value:a,onChange:r,options:s,disabled:c,placeholder:d="Select…",className:_,triggerClassName:b,leading:x,ariaLabel:u}){
  let h=useId(),[p,m]=useState(false),[k,v]=useState(0),[f,g]=useState(false),[w,j]=useState(),y=useRef(null),N=useRef(null),C=useRef({buffer:"",at:0}),S=s.findIndex(e=>e.value===a),z=S>=0?s[S]:undefined,A=e=>{
    if(c)return;
    let a=y.current,r=a?.ownerDocument.defaultView;
    if(a&&r){
      let e=a.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        t=Math.max(t,a.top),l=Math.min(l,a.bottom);
        break
      }
      let n=l-e.bottom,o=e.top-t,i=Math.min(32*s.length+8,264),c=n<i+8&&o>n,d=(c?o:n)-8;
      g(c),j(d<i?Math.max(d,40):undefined)
    }
    v(e??(S>=0?S:0)),m(true)
  };
  useEffect(()=>{
    if(!p)return;
    let e=y.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||m(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [p]),useEffect(()=>{
    if(!p)return;
    let e=N.current,a=e?.querySelector(`[data-index="${k}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [p,k]);
  let E=e=>{
    let a=s[e];
    a&&(r(a.value),m(false),y.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={y} className={rW("relative",_)}>
        <button id={e} type="button" role="combobox" aria-expanded={p} aria-controls={h} aria-haspopup="listbox" aria-label={u} disabled={c} onClick={()=>p?m(false):A()} onKeyDown={e=>{
          if(!c){
            if(!p){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),A());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),m(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),v(e=>Math.min(e+1,s.length-1));else if("ArrowUp"===e.key)e.preventDefault(),v(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),v(0);else if("End"===e.key)e.preventDefault(),v(s.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),E(k);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=C.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=s.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&v(t)
            }
          }
        }} className={rW("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",b)}>
          <span className="flex min-w-0 items-center gap-2">
            {x}
            <span className={rW("truncate",!z&&"text-neutral-900/62 dark:text-neutral-100/62")}>{z?z.label:d}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {p&&<ul ref={N} id={h} role="listbox" tabIndex={-1} style={{maxHeight:w}} className={rW("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",f?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,r)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={r} data-highlighted={r===k?"":undefined} onMouseEnter={()=>v(r)} onClick={()=>E(r)} className={rW("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={rW(rI,rR,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let r7 = [{id:"c1",field:"weight",operator:"greater",value:"500",value2:"",values:[],bool:true},{id:"c2",field:"category",operator:"is",value:"Frozen",value2:"",values:[],bool:true},{id:"c3",field:"hazard",operator:"is",value:"",value2:"",values:[],bool:false}];

let te = [{id:"a1",action:"route",value:"Cold store"},{id:"a2",action:"notify",value:"the cold-chain lead"}];


export default function forms_8__Sorbet__Component(){
  let[e,a]=useState(r7),[r,o]=useState("all"),[i,s]=useState(te),[c,d]=useState(null),_=useRef(4),[b,x]=useState(false);
  useEffect(()=>{
    if(!b)return;
    let e=window.setTimeout(()=>x(false),2500);
    return ()=>window.clearTimeout(e);
  }, [b]);
  let u=(e,r)=>{
    d(null),a(a=>a.map(a=>a.id===e?{...a,...r}:a))
  },h=()=>{
    d(null);
    let e=`c${_.current++}`;
    a(a=>{
      let r;
      return [...a,{id:e,field:(r=r0[0]).id,operator:r2[r.type][0].id,value:"",value2:"",values:[],bool:true}];
    })
  },p=(e,a)=>s(r=>r.map(r=>r.id===e?{...r,...a}:r)),m=useMemo(()=>{
    let a=e.length;
    if(0===a)return "";
    let t=1===a?"When the condition matches":"all"===r?`When all ${a} conditions match`:`When any of the ${a} conditions match`,l=i.map(e=>{
      let a=r6(e.action);
      return "none"===a.param?a.phrase(""):""!==e.value.trim()?a.phrase(e.value):a.emptyPhrase;
    });
    return `${t}, ${0===length?"":1===length?l[0]:2===length?`${l[0]} and ${l[1]}`:`${slice(0, -1).join(", ")} and ${l[length-1]}`}.`;
  }, [e.length,r,i]),k=0===e.length||e.some(r8),v=e.length<2;
  return (
    <div className={rW("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[800px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[1100px] shrink-0">
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]">
            <div className={rW("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex items-start justify-between gap-4 px-4 py-3")}>
              <div className="min-w-0">
                <h2 className="text-[17px]/[22px] font-extrabold">Inbound pallet routing rule</h2>
                <p className={rW("text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5 truncate")}>Match arriving pallets, then decide where they go.</p>
              </div>
            </div>
            <div className="space-y-6 p-4">
              <section>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className={r$}>When</h3>
                  <div role="radiogroup" aria-label="Match mode" title={v?"Add a second condition to choose how they combine":undefined} onKeyDown={rX} className={rW(rG,rJ)}>
                    {[{id:"all",label:"Match all"},{id:"any",label:"Match any"}].map(e=>{
                      let a=r===e.id;
                      return (
                        <button key={e.id} type="button" role="radio" aria-checked={a} tabIndex={a?0:-1} disabled={v} onClick={()=>{
                                            var a;
                                            return a=e.id,void(d(null),o(a));
                                          }} className={rQ}>{e.label}</button>
                      );
                    })}
                  </div>
                </div>
                {0===e.length?<div className="flex flex-col items-center px-6 py-12 text-center">
                  <span className="flex h-10 w-10 items-center justify-center">
                    <HugeiconsIcon icon={Icon_10303} size={20} strokeWidth={2} aria-hidden="true" className={rL} />
                  </span>
                  <p className={rW("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-3")}>This rule has no conditions, so it never runs.</p>
                  <button type="button" onClick={h} className={rW(rP,rU,"mt-4")}>
                    <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
                    Add the first condition
                  </button>
                </div>:<div className={rW(rT,"flex flex-col")}>
                  {e.map(e=>{
                    var r;
                    let l,o=r1(e.field);
                    return (
                      <div key={e.id} className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center">
                                        <r3 value={e.field} onChange={a=>{
                                          var r;
                                          let t;
                                          return r=e.id,t=r1(a).type,void u(r,{field:a,operator:r2[t][0].id,value:"",value2:"",values:[],bool:true});
                                        }} options={r0.map(e=>({value:e.id,label:e.label}))} className="sm:w-[168px] sm:shrink-0" />
                                        <r3 value={e.operator} onChange={a=>u(e.id,{operator:a,value:"",value2:"",values:[]})} options={r2[o.type].map(e=>({value:e.id,label:e.label}))} className="sm:w-[150px] sm:shrink-0" />
                                        <div className="min-w-0 flex-1">
                                          {"text"===(l=r1((r=e).field)).type?<div className={rW(rO,rK)}>
                                            <input value={r.value} onChange={e=>u(r.id,{value:e.target.value})} aria-label={`${label} value`} placeholder="Enter a value" className={rV} />
                                          </div>:"number"===type?"between"===r.operator?<div className="flex items-center gap-2">
                                            <div className={rW(rO,rK)}>
                                              <input value={r.value} onChange={e=>u(r.id,{value:e.target.value.replace(/[^\d.]/g,"")})} inputMode="decimal" aria-label={`${label} lower bound`} placeholder="Min" className={rW(rV,"tabular-nums")} />
                                            </div>
                                            <span className={rZ}>and</span>
                                            <div className={rW(rO,rK)}>
                                              <input value={r.value2} onChange={e=>u(r.id,{value2:e.target.value.replace(/[^\d.]/g,"")})} inputMode="decimal" aria-label={`${label} upper bound`} placeholder="Max" className={rW(rV,"tabular-nums")} />
                                            </div>
                                            {unit&&<span className={rZ}>{unit}</span>}
                                          </div>:<div className={rW(rO,rK)}>
                                            <input value={r.value} onChange={e=>u(r.id,{value:e.target.value.replace(/[^\d.]/g,"")})} inputMode="decimal" aria-label={`${label} value`} placeholder="0" className={rW(rV,"tabular-nums")} />
                                            {unit&&<span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">{unit}</span>}
                                          </div>:"enum"===type?"any_of"===r.operator?<div className="flex flex-wrap gap-1.5">
                                            {options.map(e=>{
                                              let a=r.values.includes(e);
                                              return <button key={e} type="button" aria-pressed={a} onClick={()=>u(r.id,{values:a?r.values.filter(a=>a!==e):[...r.values,e]})} className="relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40">{e}</button>;
                                            })}
                                          </div>:<r3 value={r.value} onChange={e=>u(r.id,{value:e})} options={(options??[]).map(e=>({value:e,label:e}))} placeholder="Select a value" />:<div role="radiogroup" aria-label={`${label} value`} onKeyDown={rX} className={rW(rG,rJ)}>
                                            {[{on:true,label:"Yes"},{on:false,label:"No"}].map(e=>{
                                              let a=r.bool===e.on;
                                              return <button key={e.label} type="button" role="radio" aria-checked={a} tabIndex={a?0:-1} onClick={()=>u(r.id,{bool:e.on})} className={rQ}>{e.label}</button>;
                                            })}
                                          </div>}
                                        </div>
                                        <button type="button" onClick={()=>{
                                          var r;
                                          return r=e.id,void(d(null),a(e=>e.filter(e=>e.id!==r)));
                                        }} className={rW("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-10 rounded-[calc(var(--rb-r-full,999px))]","self-end sm:self-auto")}>
                                          <HugeiconsIcon icon={Icon_96037} size={18} strokeWidth={2} aria-hidden="true" />
                                          <span className="sr-only">Remove condition</span>
                                        </button>
                                      </div>
                    );
                  })}
                </div>}
                {e.length>0&&<button type="button" onClick={h} className={rW(rP,rU,"mt-2")}>
                  <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
                  Add condition
                </button>}
                {c&&<div role="status" className={rW(rF,rB,"mt-3 px-4 py-3")}>
                  <p className={rW(r$,"tabular-nums")}>
                    {c.count}
                    {" of "}
                    {r4.length}
                    {" sample pallets match"}
                  </p>
                  <p className={rW(rH,rL,"mt-1")}>{0===c.count?"No sample pallets satisfy the current rule.":c.ids.join(", ")}</p>
                </div>}
              </section>
              <section>
                <div className="mb-2">
                  <h3 className={r$}>Then</h3>
                  <p className={rW(rY,"mt-0.5")}>Actions run in order when the conditions match.</p>
                </div>
                <div className={rW(rT,"flex flex-col")}>
                  {i.map(e=>{
                    let a=r6(e.action);
                    return (
                      <div key={e.id} className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center">
                                        <r3 value={e.action} onChange={a=>p(e.id,{action:a,value:""})} options={r5.map(e=>({value:e.id,label:e.label}))} className="sm:w-[200px] sm:shrink-0" />
                                        <div className="min-w-0 flex-1">
                                          {"select"===a.param&&<r3 value={e.value} onChange={a=>p(e.id,{value:a})} options={(a.options??[]).map(e=>({value:e,label:e}))} placeholder="Choose" />}
                                          {"text"===a.param&&<div className={rW(rO,rK)}>
                                            <input value={e.value} onChange={a=>p(e.id,{value:a.target.value})} aria-label="Action parameter" placeholder={a.placeholder} className={rV} />
                                          </div>}
                                          {"none"===a.param&&<p className={rW(rY,"px-1")}>No parameters for this action.</p>}
                                        </div>
                                      </div>
                    );
                  })}
                </div>
              </section>
              <section>
                <div className={rW(rF,rB,"px-4 py-3")}>
                  <p className={rW(rI,rR)}>Summary</p>
                  <p className={rW("text-[15px]/[22px] font-medium","mt-1")}>{0===e.length?"Add a condition to describe when this rule runs.":m}</p>
                </div>
              </section>
            </div>
            <div className={rW("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex flex-col-reverse gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between")}>
              <button type="button" onClick={()=>{
                let a=r4.filter(a=>"all"===r?e.every(e=>r9(e,a)):e.some(e=>r9(e,a)));
                d({count:a.length,ids:a.map(e=>e.id)})
              }} disabled={k} className={rW(rP,rq)}>Test rule</button>
              <div className="flex items-center gap-3">
                {k&&<span className={rW(rH,rR,"hidden sm:inline")}>{0===e.length?"Add at least one condition":"Fill in every condition value"}</span>}
                <button type="button" onClick={()=>x(true)} disabled={k} className={rW("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",rq,"flex-1 sm:flex-none")}>{b?"Rule saved":"Save rule"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
