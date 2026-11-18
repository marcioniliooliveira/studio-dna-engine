/**
 * React Bits Pro — Application UI (forms-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { postalHint, postalLabel, postalPattern, regionLabel, regions, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_64739 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_67358 = [["path",{d:"M12 14.5V17.5M13 14.5C13 15.0523 12.5523 15.5 12 15.5C11.4477 15.5 11 15.0523 11 14.5C11 13.9477 11.4477 13.5 12 13.5C12.5523 13.5 13 13.9477 13 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.5 9V6.5C16.5 4.01472 14.4853 2 12 2C9.51471 2 7.49999 4.01472 7.49999 6.5V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

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

let aB = (...e)=>e.filter(Boolean).join(" ");

let aH = "bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]";

let a$ = "rounded-[var(--rb-r-4xl,18px)]";

let aI = "text-neutral-900 dark:text-neutral-100";

let aP = "text-neutral-900/78 dark:text-neutral-100/78";

let aq = "text-neutral-900/62 dark:text-neutral-100/62";

let aU = "text-[17px]/[22px] font-extrabold";

let aO = "text-[14px]/[20px] font-medium";

let aK = "text-[15px]/[20px] font-bold";

let aV = "text-[13px]/[16px] font-semibold tabular-nums";

let aY = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let aG = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let aJ = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let aQ = "relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40";

let aZ = "h-10";

let aX = "h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]";

let a0 = "flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let a1 = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let a2 = "min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100";

let a5 = "text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78";

function a6({id:e,value:a,defaultValue:r,onChange:s,options:c,disabled:d,placeholder:_="Select…",className:b,triggerClassName:x,leading:u,ariaLabel:h}){
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
    <div ref={S} className={aB("relative",b)}>
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
        }} className={aB("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",x)}>
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {u}
            <span className="grid min-w-0 flex-1 text-left">
              {c.map(e=><span key={e.value} aria-hidden="true" className="invisible col-start-1 row-start-1 truncate">{e.label}</span>)}
              <span className={aB("col-start-1 row-start-1 truncate",!M&&"text-neutral-900/62 dark:text-neutral-100/62")}>{M?M.label:_}</span>
            </span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {m&&<ul ref={z} id={p} role="listbox" tabIndex={-1} style={{maxHeight:j}} className={aB("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {c.map((e,a)=>{
            let r=e.value===E;
            return (
              <li key={e.value} role="option" aria-selected={r} data-index={a} data-highlighted={a===v?"":undefined} onMouseEnter={()=>f(a)} onClick={()=>L(a)} className={aB("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={aB(aV,aq,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {r&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let a8 = [{code:"US",name:"United States",regionLabel:"State",regions:["California","New York","Texas","Washington","Illinois","Massachusetts"],postalLabel:"ZIP code",postalHint:"5 digits, e.g. 94103",postalPattern:/^\d{5}$/},{code:"CA",name:"Canada",regionLabel:"Province",regions:["Ontario","Quebec","British Columbia","Alberta","Nova Scotia"],postalLabel:"Postal code",postalHint:"Format A1A 1A1",postalPattern:/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/},{code:"IE",name:"Ireland",regionLabel:"County",regions:["Dublin","Cork","Galway","Limerick","Kerry","Mayo"],postalLabel:"Eircode",postalHint:"Format D02 X285",postalPattern:/^[A-Za-z]\d{2} ?[A-Za-z0-9]{4}$/},{code:"SG",name:"Singapore",regionLabel:null,regions:null,postalLabel:"Postal code",postalHint:"6 digits, e.g. 049483",postalPattern:/^\d{6}$/}];

let a4 = e=>a8.find(a=>a.code===e)??a8[0];

let a9 = e=>({fullName:"",line1:"",line2:"",city:"",country:e,region:"",postal:""});

function a3(e){
  let a=a4(e.country),r=a.regions?""!==e.region:""!==e.line1;
  return ""!==e.fullName.trim()&&""!==e.line1.trim()&&""!==e.city.trim()&&r&&a.postalPattern.test(e.postal.trim());
}

let a7 = [{name:"Merino wool throw blanket",qty:1,unit:12800},{name:"Ceramic pour-over set",qty:2,unit:4600},{name:"Linen tea towels, set of 4",qty:1,unit:3400}];

let re = [{id:"standard",label:"Standard",note:"5 to 7 business days",cents:0},{id:"express",label:"Express",note:"2 to 3 business days",cents:1400},{id:"priority",label:"Priority",note:"Next business day",cents:2800}];

let ra = e=>`$${(e/100).toFixed(2)}`;

function rr({idPrefix:e,value:a,onChange:r}){
  let l=a4(a.country),o=""!==a.postal.trim()&&!postalPattern.test(a.postal.trim());
  return (
    <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor={`${e}-name`} className={a0}>Full name</label>
          <div className={aB(aQ,aZ)}>
            <input id={`${e}-name`} value={a.fullName} onChange={e=>r({fullName:e.target.value})} placeholder="Recipient name" className={aX} />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor={`${e}-line1`} className={a0}>Street address</label>
          <div className={aB(aQ,aZ)}>
            <input id={`${e}-line1`} value={a.line1} onChange={e=>r({line1:e.target.value})} placeholder="Number and street" className={aX} />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor={`${e}-line2`} className={a0}>Apartment or unit</label>
          <div className={aB(aQ,aZ)}>
            <input id={`${e}-line2`} value={a.line2} onChange={e=>r({line2:e.target.value})} placeholder="Optional" className={aX} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${e}-country`} className={a0}>Country</label>
          <a6 id={`${e}-country`} value={a.country} onChange={e=>r({country:e,region:"",postal:""})} options={a8.map(e=>({value:e.code,label:e.name}))} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${e}-city`} className={a0}>City</label>
          <div className={aB(aQ,aZ)}>
            <input id={`${e}-city`} value={a.city} onChange={e=>r({city:e.target.value})} placeholder="City or town" className={aX} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${e}-region`} className={a0}>{regionLabel??"Region"}</label>
          {regions?<a6 id={`${e}-region`} value={a.region} onChange={e=>r({region:e})} options={regions.map(e=>({value:e,label:e}))} placeholder={`Select ${regionLabel.toLowerCase()}`} />:<div className={aB(aQ,aZ)}>
            <input id={`${e}-region`} value={a.region} onChange={e=>r({region:e.target.value})} placeholder="District or area" className={aX} />
          </div>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${e}-postal`} className={a0}>{postalLabel}</label>
          <div className={aB(aQ,aZ)}>
            <input id={`${e}-postal`} value={a.postal} onChange={e=>r({postal:e.target.value})} aria-invalid={o} aria-describedby={`${e}-postal-help`} placeholder={postalLabel} className={aX} />
          </div>
          <p id={`${e}-postal-help`} className={o?"flex items-start gap-2 text-[14px]/[20px] font-bold text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":"max-w-[60ch] text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78"}>
            {o&&<HugeiconsIcon icon={Icon_27476} size={18} strokeWidth={2} aria-hidden="true" className="mt-px shrink-0" />}
            {o?`Enter a valid ${postalLabel.toLowerCase()}.`:postalHint}
          </p>
        </div>
      </div>
  );
}


export default function forms_6__Sorbet__Component(){
  let[e,a]=useState(""),[r,o]=useState(a9("US")),[s,c]=useState(true),[d,_]=useState(a9("US")),[b,x]=useState("standard"),[u,h]=useState(""),[p,m]=useState(""),[k,v]=useState(""),[f,g]=useState(false),[w,j]=useState(false),y=function(e){
    if(""===e)return "";
    let a=e[0];
    return "4"===a?"Visa":"5"===a?"Mastercard":"3"===a?"Amex":"";
  }(u.replace(/\D/g,"")),N=u.replace(/\D/g,""),C=f?[]:a7,S=C.reduce((e,a)=>e+a.qty*a.unit,0),z=re.find(e=>e.id===b)?.cents??0,A=Math.round(.085*S),E=S+z+A,D=re.find(e=>e.id===b)?.label??"Standard",M=N.slice(-4),W=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()),L=N.length>=15,R=4===p.replace(/\D/g,"").length,T=k.length>=3,F=!f&&W&&a3(r)&&(s||a3(d))&&L&&R&&T;
  return (
    <div className={aB("bg-white dark:bg-neutral-950",aI,"relative flex h-full min-h-[1160px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[1100px]">
          {w?<div className={a1}>
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center">
                <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={2} aria-hidden="true" className={aP} />
              </span>
              <h2 className={aB(aU,aI,"mt-4")}>Order confirmed</h2>
              <p className={aB("text-[15px]/[22px] font-medium",aP,"mt-1 max-w-sm")}>
                {"We sent a receipt to "}
                {e||"your inbox"}
                . Your order ships once payment settles.
              </p>
              <dl className={aB(aH,a$,"mt-5 w-full max-w-sm space-y-2.5 p-4 text-left")}>
                <div className={aB(aO,"flex items-center justify-between")}>
                  <dt className={aq}>Order reference</dt>
                  <dd className={aB("font-mono text-[12px]/[16px] tabular-nums",aI)}>ORD-2026-5821</dd>
                </div>
                <div className={aB(aO,"flex items-center justify-between")}>
                  <dt className={aq}>Amount charged</dt>
                  <dd className={aB(aI,"tabular-nums")}>{ra(E)}</dd>
                </div>
                <div className={aB(aO,"flex items-center justify-between")}>
                  <dt className={aq}>Shipping</dt>
                  <dd className={aI}>{D}</dd>
                </div>
                <div className={aB(aO,"flex items-center justify-between")}>
                  <dt className={aq}>Card charged</dt>
                  <dd className={aB(aI,"tabular-nums")}>
                    {"•••• "}
                    {M}
                  </dd>
                </div>
              </dl>
              <button type="button" onClick={()=>j(false)} className={aB(aY,aJ,"mt-6")}>Back to checkout</button>
            </div>
          </div>:<div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className={a1}>
              <div className={aB("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex items-start justify-between gap-4 px-4 py-3")}>
                <div className="min-w-0">
                  <h2 className={aB(aU,aI)}>Checkout</h2>
                  <p className={aB(a5,"mt-0.5")}>Enter delivery and payment details to complete your order.</p>
                </div>
                <span className={aB(aO,aq,"hidden shrink-0 items-center gap-1.5 sm:inline-flex")}>
                  <HugeiconsIcon icon={Icon_67358} size={16} strokeWidth={2} aria-hidden="true" />
                  Secure
                </span>
              </div>
              <div className="space-y-8 p-4 sm:p-5">
                <section>
                  <div className="mb-3">
                    <h3 className={a2}>Delivery address</h3>
                    <p className={aB(a5,"mt-0.5")}>Where should we send this order?</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="frm6-email" className={a0}>Email for updates</label>
                      <div className={aB(aQ,aZ)}>
                        <input id="frm6-email" type="email" value={e} onChange={e=>a(e.target.value)} aria-invalid={""!==e&&!W} placeholder="you@example.com" className={aX} />
                      </div>
                    </div>
                    <rr idPrefix="frm6-del" value={r} onChange={e=>o(a=>({...a,...e}))} />
                  </div>
                </section>
                <section>
                  <label className={aB(aH,a$,"flex cursor-pointer items-center gap-2 px-3 py-2.5")}>
                    <span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
                      <input type="checkbox" checked={s} onChange={e=>c(e.target.checked)} className="peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[calc(var(--rb-r-sm,6px))] border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(84%_0.15_165))] checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] indeterminate:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:bg-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:indeterminate:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:shadow-none dark:indeterminate:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:bg-neutral-100/28" />
                      <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute scale-50 text-[var(--rb-accent-fg,oklch(26%_0.06_168))] opacity-0 transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:scale-100 peer-indeterminate:opacity-100 peer-active:scale-[0.86] motion-reduce:transition-none dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))]" />
                    </span>
                    <span className={aB(aK,aI)}>Billing address matches delivery</span>
                  </label>
                  <div className="grid" style={{gridTemplateRows:s?"0fr":"1fr"}}>
                    <div className={aB("overflow-hidden",s&&"invisible")}>
                      <div className="pt-6">
                        <div className="mb-3">
                          <h3 className={a2}>Billing address</h3>
                          <p className={aB(a5,"mt-0.5")}>The address on your payment method.</p>
                        </div>
                        <rr idPrefix="frm6-bill" value={d} onChange={e=>_(a=>({...a,...e}))} />
                      </div>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="mb-3">
                    <h3 className={a2}>Payment</h3>
                    <p className={aB(a5,"mt-0.5")}>Your card is charged when the order ships.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label htmlFor="frm6-card" className={a0}>Card number</label>
                      <div className={aB(aQ,aZ)}>
                        <input id="frm6-card" inputMode="numeric" value={u} onChange={e=>h(e.target.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim())} placeholder="1234 5678 9012 3456" className={aB(aX,"tabular-nums")} />
                        {y&&<span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">{y}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="frm6-exp" className={a0}>Expiry</label>
                      <div className={aB(aQ,aZ)}>
                        <input id="frm6-exp" inputMode="numeric" value={p} onChange={e=>{
                          let a;
                          return m((a=e.target.value.replace(/\D/g,"").slice(0,4)).length<=2?a:`${a.slice(0,2)} / ${a.slice(2)}`);
                        }} placeholder="MM / YY" className={aB(aX,"tabular-nums")} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="frm6-cvc" className={a0}>CVC</label>
                      <div className={aB(aQ,aZ)}>
                        <input id="frm6-cvc" inputMode="numeric" value={k} onChange={e=>v(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="123" className={aB(aX,"tabular-nums")} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className={aB("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex flex-col-reverse items-stretch gap-2 px-4 py-3 sm:min-h-11 sm:flex-row sm:items-center sm:justify-between sm:p-2")}>
                <button type="button" disabled={f} onClick={()=>g(true)} className={aB(aY,aG)}>Back to cart</button>
                <div className="flex items-center gap-3">
                  {!F&&<span className={aB(aO,aq,"hidden sm:inline")}>{f?"Your cart is empty":"Complete the required fields to pay"}</span>}
                  <button type="button" disabled={!F} onClick={()=>j(true)} className={aB("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",aG,"flex-1 sm:flex-none")}>
                    {"Pay "}
                    {ra(E)}
                  </button>
                </div>
              </div>
            </div>
            <aside className={aB(a1,"p-4 sm:p-5")}>
              <div>
                <h3 className={a2}>Order summary</h3>
                {f?<div className="mt-3 flex flex-col items-center px-4 py-8 text-center">
                  <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">Your cart is empty.</p>
                  <p className={aB("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5")}>Restore your items to continue checking out.</p>
                  <button type="button" onClick={()=>g(false)} className={aB(aY,aJ,"mt-3")}>Restore items</button>
                </div>:<>
                  <ul className="mt-3 space-y-2.5">
                    {C.map(e=>(
                      <li key={e.name} className="flex items-start justify-between gap-3">
                                        <span className={aB(aO,aP,"min-w-0 flex-1")}>
                                          <span className="block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]">{e.name}</span>
                                          <span className={aB(aV,aq,"flex flex-wrap gap-x-2")}>
                                            <span>
                                              {"Qty "}
                                              {e.qty}
                                            </span>
                                            <span>
                                              {ra(e.unit)}
                                              {" each"}
                                            </span>
                                          </span>
                                        </span>
                                        <span className={aB(aO,aI,"shrink-0 tabular-nums")}>{ra(e.qty*e.unit)}</span>
                                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <p className={aB(aV,aq,"mb-2")}>Shipping speed</p>
                    <div className={aB("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","-mx-2 flex flex-col")}>
                      {re.map(e=>(
                        <div key={e.id}>
                                            <label className={aB("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10",a$,"px-2")}>
                                              <input type="radio" name="frm6-shipping" value={e.id} checked={b===e.id} onChange={()=>x(e.id)} className={aB("size-[18px] shrink-0 cursor-pointer appearance-none rounded-full border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,border-width,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-[6px] checked:border-[var(--rb-accent,oklch(84%_0.15_165))] checked:bg-white checked:shadow-[0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:border-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:bg-neutral-900 dark:checked:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:border-neutral-100/28","mt-px self-start")} />
                                              <span className="min-w-0 flex-1">
                                                <span className={aB(aO,aI,"block")}>{e.label}</span>
                                                <span className={aB(aV,aq,"block")}>{e.note}</span>
                                              </span>
                                              <span className={aB(aO,aP,"shrink-0 self-start tabular-nums")}>{0===e.cents?"Free":ra(e.cents)}</span>
                                            </label>
                                          </div>
                      ))}
                    </div>
                  </div>
                  <dl className="mt-4 space-y-2">
                    <div className={aB(aO,"flex items-center justify-between")}>
                      <dt className={aq}>Subtotal</dt>
                      <dd className={aB(aI,"tabular-nums")}>{ra(S)}</dd>
                    </div>
                    <div className={aB(aO,"flex items-center justify-between")}>
                      <dt className={aq}>Shipping</dt>
                      <dd className={aB(aI,"tabular-nums")}>{0===z?"Free":ra(z)}</dd>
                    </div>
                    <div className={aB(aO,"flex items-center justify-between")}>
                      <dt className={aq}>
                        Tax (
                        8.5
                        %)
                      </dt>
                      <dd className={aB(aI,"tabular-nums")}>{ra(A)}</dd>
                    </div>
                    <div className={aB(aH,a$,aK,"mt-1 flex items-center justify-between gap-4 px-3 py-2.5")}>
                      <dt className={aI}>Total</dt>
                      <dd className={aB(aI,"tabular-nums")}>{ra(E)}</dd>
                    </div>
                  </dl>
                </>}
              </div>
            </aside>
          </div>}
        </div>
      </div>
  );
}
