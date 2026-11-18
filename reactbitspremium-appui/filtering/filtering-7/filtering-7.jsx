/**
 * React Bits Pro — Application UI (filtering-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { length, some, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_95518 = [["path",{d:"M7.84308 3.80211C9.8718 2.6007 10.8862 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C4.11384 6.01057 5.1282 5.40987 7.15692 4.20846L7.84308 3.80211Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_22776 = [["circle",{cx:"7.5",cy:"7.5",r:"1.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424",stroke:"currentColor",strokeWidth:"1.5",key:"2"}]];
const Icon_67251 = [["path",{d:"M3.89089 20.8727L3 21L3.12727 20.1091C3.32086 18.754 3.41765 18.0764 3.71832 17.4751C4.01899 16.8738 4.50296 16.3898 5.47091 15.4218L16.9827 3.91009C17.4062 3.48654 17.618 3.27476 17.8464 3.16155C18.2811 2.94615 18.7914 2.94615 19.2261 3.16155C19.4546 3.27476 19.6663 3.48654 20.0899 3.91009C20.5135 4.33365 20.7252 4.54543 20.8385 4.77389C21.0539 5.20856 21.0539 5.71889 20.8385 6.15356C20.7252 6.38201 20.5135 6.59379 20.0899 7.01735L8.57816 18.5291C7.61022 19.497 7.12625 19.981 6.52491 20.2817C5.92357 20.5823 5.246 20.6791 3.89089 20.8727Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6 15L9 18M8.5 12.5L11.5 15.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_52785 = [["path",{d:"M13.3382 10H10.6618C9.1273 10 8.36006 10 8.08543 9.49297C7.8108 8.98594 8.21743 8.32019 9.0307 6.9887L10.3689 4.79773C11.101 3.59924 11.467 3 12 3C12.533 3 12.899 3.59924 13.6311 4.79773L14.9693 6.9887C15.7826 8.32019 16.1892 8.98594 15.9146 9.49297C15.6399 10 14.8727 10 13.3382 10Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"17.5",cy:"17.5",r:"3.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.66294 20.1111C10 19.6067 10 18.9045 10 17.5C10 16.0955 10 15.3933 9.66294 14.8889C9.51702 14.6705 9.32952 14.483 9.11114 14.3371C8.60669 14 7.90446 14 6.5 14C5.09554 14 4.39331 14 3.88886 14.3371C3.67048 14.483 3.48298 14.6705 3.33706 14.8889C3 15.3933 3 16.0955 3 17.5C3 18.9045 3 19.6067 3.33706 20.1111C3.48298 20.3295 3.67048 20.517 3.88886 20.6629C4.39331 21 5.09554 21 6.5 21C7.90446 21 8.60669 21 9.11114 20.6629C9.32952 20.517 9.51702 20.3295 9.66294 20.1111Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_92916 = [["path",{d:"M17.7458 2.49963C19.3896 2.49963 20.2115 2.49963 20.7646 2.95361C20.8659 3.03672 20.9588 3.12958 21.0419 3.23085C21.4958 3.78402 21.4958 4.60589 21.4958 6.24963C21.4958 7.89338 21.4958 8.71525 21.0419 9.26842C20.9588 9.36969 20.8659 9.46255 20.7646 9.54566C20.2115 9.99963 19.3896 9.99963 17.7458 9.99963L6.74585 9.99963C5.10211 9.99963 4.28024 9.99963 3.72706 9.54565C3.62579 9.46255 3.53294 9.36969 3.44983 9.26842C2.99585 8.71525 2.99585 7.89337 2.99585 6.24963C2.99585 4.60589 2.99585 3.78402 3.44983 3.23085C3.53294 3.12958 3.62579 3.03672 3.72706 2.95361C4.28024 2.49963 5.10211 2.49963 6.74585 2.49963L17.7458 2.49963Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.7459 13.9998C19.3898 13.9997 20.2117 13.9997 20.7649 14.4537C20.8661 14.5368 20.959 14.6296 21.0421 14.7308C21.4961 15.284 21.4961 16.106 21.4961 17.7499C21.4961 19.3936 21.4961 20.2155 21.0421 20.7687C20.959 20.87 20.8662 20.9628 20.765 21.0459C20.2118 21.4999 19.3899 21.4999 17.7461 21.4999L15.7458 21.5C14.1019 21.5 13.28 21.5001 12.7268 21.046C12.6256 20.963 12.5327 20.8701 12.4496 20.7689C11.9956 20.2157 11.9956 19.3938 11.9956 17.7499C11.9956 16.1061 11.9956 15.2842 12.4496 14.731C12.5327 14.6298 12.6255 14.537 12.7267 14.4539C13.2799 13.9999 14.1018 13.9999 15.7456 13.9998L17.7459 13.9998Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5.24559 13.9999C5.94314 13.9999 6.29192 13.9999 6.57574 14.0859C7.21509 14.2798 7.71542 14.7801 7.9093 15.4195C7.99536 15.7033 7.99536 16.0521 7.99536 16.7496V18.7505C7.99536 19.4481 7.99536 19.7968 7.9093 20.0806C7.71542 20.72 7.2151 21.2203 6.57576 21.4142C6.29195 21.5003 5.94317 21.5003 5.24563 21.5003C4.54807 21.5003 4.19929 21.5003 3.91548 21.4142C3.27612 21.2203 2.77579 20.72 2.58191 20.0807C2.49585 19.7968 2.49585 19.4481 2.49585 18.7505L2.49585 16.7496C2.49585 16.0521 2.49585 15.7033 2.58191 15.4195C2.77579 14.7802 3.27611 14.2798 3.91545 14.086C4.19926 13.9999 4.54804 13.9999 5.24559 13.9999Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_19809 = [["path",{d:"M3.88884 9.66294C4.39329 10 5.09552 10 6.49998 10C7.90445 10 8.60668 10 9.11113 9.66294C9.32951 9.51702 9.51701 9.32952 9.66292 9.11114C9.99998 8.60669 9.99998 7.90446 9.99998 6.5C9.99998 5.09554 9.99998 4.39331 9.66292 3.88886C9.51701 3.67048 9.32951 3.48298 9.11113 3.33706C8.60668 3 7.90445 3 6.49998 3C5.09552 3 4.39329 3 3.88884 3.33706C3.67046 3.48298 3.48296 3.67048 3.33705 3.88886C2.99998 4.39331 2.99998 5.09554 2.99998 6.5C2.99998 7.90446 2.99998 8.60669 3.33705 9.11114C3.48296 9.32952 3.67046 9.51702 3.88884 9.66294Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.8888 9.66294C15.3933 10 16.0955 10 17.5 10C18.9044 10 19.6067 10 20.1111 9.66294C20.3295 9.51702 20.517 9.32952 20.6629 9.11114C21 8.60669 21 7.90446 21 6.5C21 5.09554 21 4.39331 20.6629 3.88886C20.517 3.67048 20.3295 3.48298 20.1111 3.33706C19.6067 3 18.9044 3 17.5 3C16.0955 3 15.3933 3 14.8888 3.33706C14.6705 3.48298 14.483 3.67048 14.337 3.88886C14 4.39331 14 5.09554 14 6.5C14 7.90446 14 8.60669 14.337 9.11114C14.483 9.32952 14.6705 9.51702 14.8888 9.66294Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3.88884 20.6629C4.39329 21 5.09552 21 6.49998 21C7.90445 21 8.60668 21 9.11113 20.6629C9.32951 20.517 9.51701 20.3295 9.66292 20.1111C9.99998 19.6067 9.99998 18.9045 9.99998 17.5C9.99998 16.0955 9.99998 15.3933 9.66292 14.8889C9.51701 14.6705 9.32951 14.483 9.11113 14.3371C8.60668 14 7.90445 14 6.49998 14C5.09552 14 4.39329 14 3.88884 14.3371C3.67046 14.483 3.48296 14.6705 3.33705 14.8889C2.99998 15.3933 2.99998 16.0955 2.99998 17.5C2.99998 18.9045 2.99998 19.6067 3.33705 20.1111C3.48296 20.3295 3.67046 20.517 3.88884 20.6629Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.8888 20.6629C15.3933 21 16.0955 21 17.5 21C18.9044 21 19.6067 21 20.1111 20.6629C20.3295 20.517 20.517 20.3295 20.6629 20.1111C21 19.6067 21 18.9045 21 17.5C21 16.0955 21 15.3933 20.6629 14.8889C20.517 14.6705 20.3295 14.483 20.1111 14.3371C19.6067 14 18.9044 14 17.5 14C16.0955 14 15.3933 14 14.8888 14.3371C14.6705 14.483 14.483 14.6705 14.337 14.8889C14 15.3933 14 16.0955 14 17.5C14 18.9045 14 19.6067 14.337 20.1111C14.483 20.3295 14.6705 20.517 14.8888 20.6629Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_96034 = [["path",{d:"M4.31802 19.682C5.63604 21 7.75736 21 12 21C16.2426 21 18.364 21 19.682 19.682C21 18.364 21 16.2426 21 12C21 7.75736 21 5.63604 19.682 4.31802C18.364 3 16.2426 3 12 3C7.75736 3 5.63604 3 4.31802 4.31802C3 5.63604 3 7.75736 3 12C3 16.2426 3 18.364 4.31802 19.682Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 3V21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21.0059 11.9941H3.00586",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let _ = (...e)=>e.filter(Boolean).join(" "),
  k = "text-neutral-900 dark:text-neutral-100",
  f = "text-neutral-900/66 dark:text-neutral-100/66",
  v = "text-[12px]/[16px] font-normal tabular-nums",
  w = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  y = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  j = "shrink-0 text-neutral-900/80 dark:text-neutral-100/80",
  N = "relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40",
  z = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  D = "min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",
  A = ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"],
  C = e=>{
  if(!A.includes(e.key))return;
  let t=Array.from(e.currentTarget.querySelectorAll('[role="radio"]')),a=t.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let r=t.length-1,n=a===r?0:a+1;
  "Home"===e.key?n=0:"End"===e.key?n=r:("ArrowLeft"===e.key||"ArrowUp"===e.key)&&(n=0===a?r:a-1),t[n].focus(),t[n].click()
};

function K({id:e,value:t,onChange:a,options:s,disabled:d,placeholder:c="Select…",className:u,triggerClassName:b,leading:p,ariaLabel:x}){
  let h=useId(),[m,g]=useState(false),[k,w]=useState(0),[y,N]=useState(false),[z,A]=useState(),C=useRef(null),K=useRef(null),E=useRef({buffer:"",at:0}),S=s.findIndex(e=>e.value===t),q=S>=0?s[S]:undefined,L=e=>{
    if(d)return;
    let t=C.current,a=t?.ownerDocument.defaultView;
    if(t&&a){
      let e=t.getBoundingClientRect(),r=0,n=a.innerHeight;
      for(let e=t.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let t=e.getBoundingClientRect();
        r=Math.max(r,t.top),n=Math.min(n,t.bottom);
        break
      }
      let l=n-e.bottom,i=e.top-r,o=Math.min(32*s.length+8,264),d=l<o+8&&i>l,c=(d?i:l)-8;
      N(d),A(c<o?Math.max(c,40):undefined)
    }
    w(e??(S>=0?S:0)),g(true)
  };
  useEffect(()=>{
    if(!m)return;
    let e=C.current,t=e?.ownerDocument;
    if(!t)return;
    let a=t=>{
      e.contains(t.target)||g(false)
    };
    return t.addEventListener("mousedown",a),t.addEventListener("touchstart",a),()=>{
      t.removeEventListener("mousedown",a),t.removeEventListener("touchstart",a)
    };
  }, [m]),useEffect(()=>{
    if(!m)return;
    let e=K.current,t=e?.querySelector(`[data-index="${k}"]`);
    if(!e||!t)return;
    let a=t.offsetTop,r=a+t.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:r>e.scrollTop+e.clientHeight&&(e.scrollTop=r-e.clientHeight)
  }, [m,k]);
  let T=e=>{
    let t=s[e];
    t&&(a(t.value),g(false),C.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={C} className={_("relative",u)}>
        <button id={e} type="button" role="combobox" aria-expanded={m} aria-controls={h} aria-haspopup="listbox" disabled={d} onClick={()=>m?g(false):L()} onKeyDown={e=>{
          if(!d){
            if(!m){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),L());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),g(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),w(e=>Math.min(e+1,s.length-1));else if("ArrowUp"===e.key)e.preventDefault(),w(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),w(0);else if("End"===e.key)e.preventDefault(),w(s.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),T(k);else if(1===e.key.length&&/\S/.test(e.key)){
              let t=Date.now(),a=E.current;
              a.buffer=t-a.at>700?e.key:a.buffer+e.key,a.at=t;
              let r=s.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              r>=0&&w(r)
            }
          }
        }} aria-label={x} className={_("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",b)}>
          <span className="flex min-w-0 items-center gap-2">
            {p}
            <span className={_("truncate",!q&&"text-neutral-900/66 dark:text-neutral-100/66")}>{q?q.label:c}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className={j} />
        </button>
        {m&&<ul ref={K} id={h} role="listbox" tabIndex={-1} style={{maxHeight:z}} className={_(D,"absolute z-30 max-h-[264px] w-full min-w-[100%]",y?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,a)=>{
            let n=e.value===t;
            return (
              <li key={e.value} role="option" aria-selected={n} data-index={a} data-highlighted={a===k||undefined} onMouseEnter={()=>w(a)} onClick={()=>T(a)} className={_("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={_(v,f,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let E = [{value:"logo",label:"Logo"},{value:"photo",label:"Photography"},{value:"illustration",label:"Illustration"},{value:"icon",label:"Icon"},{value:"template",label:"Template"}],
  S = [{value:"landscape",label:"Landscape"},{value:"square",label:"Square"},{value:"portrait",label:"Portrait"}],
  q = [{value:"brand",label:"Brand"},{value:"campaign",label:"Campaign"},{value:"product",label:"Product"},{value:"social",label:"Social"},{value:"web",label:"Web"}],
  L = [{value:"24h",label:"Today"},{value:"7d",label:"This week"},{value:"30d",label:"This month"},{value:"older",label:"Older"}],
  T = {logo:Icon_95518,photo:Icon_22776,illustration:Icon_67251,icon:Icon_52785,template:Icon_92916},
  M = {landscape:"aspect-[4/3]",square:"aspect-square",portrait:"aspect-[3/4]"},
  W = [{id:"a1",name:"Primary wordmark",ext:"svg",type:"logo",orientation:"square",tags:["brand"],updatedDays:2,width:512,height:512,sizeKb:28},{id:"a2",name:"Monogram mark",ext:"svg",type:"logo",orientation:"square",tags:["brand"],updatedDays:9,width:512,height:512,sizeKb:22},{id:"a3",name:"App icon rounded",ext:"png",type:"icon",orientation:"square",tags:["product","brand"],updatedDays:1,width:1024,height:1024,sizeKb:84},{id:"a4",name:"Hero banner autumn",ext:"jpg",type:"photo",orientation:"landscape",tags:["campaign","web"],updatedDays:3,width:2400,height:1600,sizeKb:3820},{id:"a5",name:"Team offsite group",ext:"jpg",type:"photo",orientation:"landscape",tags:["social"],updatedDays:14,width:2400,height:1600,sizeKb:4120},{id:"a6",name:"Founder portrait",ext:"jpg",type:"photo",orientation:"portrait",tags:["social","web"],updatedDays:6,width:1600,height:2400,sizeKb:2960},{id:"a7",name:"Product on desk",ext:"jpg",type:"photo",orientation:"square",tags:["product"],updatedDays:4,width:2e3,height:2e3,sizeKb:3510},{id:"a8",name:"Empty-state spot",ext:"png",type:"illustration",orientation:"landscape",tags:["web","product"],updatedDays:5,width:1800,height:1350,sizeKb:640},{id:"a9",name:"Onboarding scene",ext:"png",type:"illustration",orientation:"portrait",tags:["product"],updatedDays:20,width:1350,height:1800,sizeKb:720},{id:"a10",name:"Mesh pattern tile",ext:"png",type:"illustration",orientation:"square",tags:["brand"],updatedDays:45,width:1600,height:1600,sizeKb:540},{id:"a11",name:"Social card layout",ext:"fig",type:"template",orientation:"landscape",tags:["social","campaign"],updatedDays:2,width:1200,height:630,sizeKb:1180},{id:"a12",name:"Pitch deck cover",ext:"fig",type:"template",orientation:"landscape",tags:["brand"],updatedDays:30,width:1920,height:1080,sizeKb:1620},{id:"a13",name:"Story frame layout",ext:"fig",type:"template",orientation:"portrait",tags:["social"],updatedDays:8,width:1080,height:1920,sizeKb:1440},{id:"a14",name:"Favicon set",ext:"svg",type:"icon",orientation:"square",tags:["web"],updatedDays:12,width:256,height:256,sizeKb:16},{id:"a15",name:"Nav glyph sheet",ext:"svg",type:"icon",orientation:"square",tags:["web","product"],updatedDays:7,width:512,height:512,sizeKb:34},{id:"a16",name:"Campaign key visual",ext:"jpg",type:"photo",orientation:"portrait",tags:["campaign"],updatedDays:1,width:1600,height:2400,sizeKb:3240},{id:"a17",name:"Blog header abstract",ext:"png",type:"illustration",orientation:"landscape",tags:["web"],updatedDays:22,width:2e3,height:1e3,sizeKb:480},{id:"a18",name:"Secondary logo dark",ext:"svg",type:"logo",orientation:"landscape",tags:["brand","web"],updatedDays:40,width:800,height:300,sizeKb:30},{id:"a19",name:"Accent star icon",ext:"svg",type:"icon",orientation:"square",tags:["product"],updatedDays:60,width:128,height:128,sizeKb:8},{id:"a20",name:"Lifestyle wide shot",ext:"jpg",type:"photo",orientation:"landscape",tags:["campaign","social"],updatedDays:5,width:2400,height:1350,sizeKb:3980}],
  H = [{value:"recent",label:"Recently updated"},{value:"name",label:"Name A–Z"},{value:"large",label:"File size: large to small"},{value:"small",label:"File size: small to large"}],
  R = {type:[],orientation:[],tag:[],updated:[]},
  B = (e,t,a)=>{
  let r;
  return "type"===t?e.type===a:"orientation"===t?e.orientation===a:"tag"===t?e.tags.includes(a):((r=e.updatedDays)<=1?"24h":r<=7?"7d":r<=30?"30d":"older")===a;
},
  I = (e,t,a)=>{
  for(let r of["type","orientation","tag","updated"]){
    if(r===a)continue;
    let n=t[r];
    if(length&&!some(t=>B(e,r,t)))return false;
  }
  return true;
},
  F = {type:e=>E.find(t=>t.value===e)?.label??e,orientation:e=>S.find(t=>t.value===e)?.label??e,tag:e=>q.find(t=>t.value===e)?.label??e,updated:e=>L.find(t=>t.value===e)?.label??e};

function P({label:e,options:t,selected:a,onToggle:i,onClear:s,counts:d}){
  let[c,u]=useState(false),[b,x]=useState(false),h=useRef(null),m=a.length,g=()=>{
    u(false),x(false)
  };
  return useEffect(()=>{
    if(!c)return;
    let e=h.current,t=e?.ownerDocument;
    if(!t)return;
    let a=t=>{
      e.contains(t.target)||g()
    };
    return t.addEventListener("mousedown",a),t.addEventListener("touchstart",a),()=>{
      t.removeEventListener("mousedown",a),t.removeEventListener("touchstart",a)
    };
  }, [c]),useEffect(()=>{
    if(!c)return;
    let e=h.current?.ownerDocument.defaultView;
    if(!e)return;
    let t=e.requestAnimationFrame(()=>x(true));
    return ()=>e.cancelAnimationFrame(t);
  }, [c]),<div ref={h} className="relative">
    <button type="button" aria-expanded={c} aria-haspopup="true" onClick={()=>c?g():u(true)} className={_(w,y)}>
      {e}
      {m>0&&<span className={_(z,"bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>{m}</span>}
      <HugeiconsIcon icon={Icon_20148} size={16} strokeWidth={1.8} aria-hidden="true" className={_(j,c&&"rotate-180")} />
    </button>
    {c&&<div className={_(D,"transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute top-full left-0 z-30 mt-1.5 w-[240px] min-w-[240px]")} style={{opacity:+!!b}}>
      <ul className="space-y-0.5">
        {t.map(e=>{
          let t=d[e.value]??0,n=a.includes(e.value);
          return (
            <li key={e.value}>
                        <label className={_("flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",0===t&&!n&&"opacity-40")}>
                          <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                            <input type="checkbox" checked={n} onChange={()=>i(e.value)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                            <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{e.label}</span>
                          <span className={_("ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","shrink-0")}>{t}</span>
                        </label>
                      </li>
          );
        })}
      </ul>
      {m>0&&<div className="mt-1 px-1 pt-1">
        <button type="button" onClick={s} className={_(w,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]","w-full")}>
          {"Clear "}
          {e.toLowerCase()}
        </button>
      </div>}
    </div>}
  </div>;
}

let $ = [{key:"type",label:"Type",options:E},{key:"orientation",label:"Orientation",options:S},{key:"tag",label:"Tag",options:q},{key:"updated",label:"Updated",options:L}];

function U(){
  let[e,t]=useState(R),[a,i]=useState("recent"),[o,s]=useState(false),c=(e,a)=>t(t=>({...t,[e]:t[e].includes(a)?t[e].filter(e=>e!==a):[...t[e],a]})),u=useMemo(()=>{
    let t=W.filter(t=>I(t,e));
    return "name"===a?[...t].sort((e,t)=>e.name.localeCompare(t.name)):"large"===a?[...t].sort((e,t)=>t.sizeKb-e.sizeKb):"small"===a?[...t].sort((e,t)=>e.sizeKb-t.sizeKb):[...t].sort((e,t)=>e.updatedDays-t.updatedDays);
  }, [e,a]),b=["type","orientation","tag","updated"].flatMap(t=>e[t].map(e=>({key:`${t}:${e}`,label:F[t](e),clear:()=>c(t,e)})));
  return (
    <div className={_("bg-white dark:bg-neutral-950",k,"flex h-full min-h-[840px] w-full flex-col overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col">
          <header className="mb-5">
            <h2 className={_("text-[20px]/[24px] font-[450] tracking-[-0.015em]",k)}>Brand asset library</h2>
            <p role="status" className={_("text-[13px]/[18px] font-normal",f,"mt-1")}>
              <span className={_(k,"tabular-nums")}>{u.length}</span>
              {" "}
              {"of "}
              <span className="tabular-nums">{W.length}</span>
              {" assets"}
            </p>
          </header>
          <div className="flex flex-wrap items-center gap-2">
            {$.map(a=>(
              <P key={a.key} label={a.label} options={a.options} selected={e[a.key]} onToggle={e=>c(a.key,e)} onClear={()=>{
                        let e;
                        return e=a.key,t(t=>({...t,[e]:[]}));
                      }} counts={(t=>{
                        let a={};
                        for(let r of $.find(e=>e.key===t).options)a[r.value]=W.filter(a=>I(a,e,t)&&B(a,t,r.value)).length;
                        return a;
                      })(a.key)} />
            ))}
            <div className="ml-auto flex items-center gap-2">
              <div role="radiogroup" aria-label="Grid density" onKeyDown={C} className={_("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
                <button type="button" role="radio" aria-label="Comfortable grid" aria-checked={!o} tabIndex={o?-1:0} onClick={()=>s(false)} className={_(N,"aspect-square")}>
                  <HugeiconsIcon icon={Icon_19809} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                </button>
                <button type="button" role="radio" aria-label="Compact grid" aria-checked={o} tabIndex={o?0:-1} onClick={()=>s(true)} className={_(N,"aspect-square")}>
                  <HugeiconsIcon icon={Icon_96034} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                </button>
              </div>
              <K value={a} onChange={i} options={H} ariaLabel="Sort assets" className="w-[210px]" />
            </div>
          </div>
          {b.length>0&&<div className="mt-4 flex flex-wrap items-center gap-2">
            {b.map(e=>(
              <span key={e.key} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                        {e.label}
                        <button type="button" aria-label={`Remove ${e.label} filter`} onClick={e.clear} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                          <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                        </button>
                      </span>
            ))}
            <button type="button" onClick={()=>t(R)} className="inline-flex h-7 cursor-pointer items-center rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80 decoration-1 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100">Clear all</button>
          </div>}
          {0===u.length?<div className="mt-4 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center">
              <HugeiconsIcon icon={Icon_66575} size={20} strokeWidth={1.8} aria-hidden="true" className="text-neutral-900/80 dark:text-neutral-100/80" />
            </div>
            <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No assets match these filters</p>
            <p className={_("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-[300px]")}>Try a different type or clear a facet to see more of the library.</p>
            <button type="button" onClick={()=>t(R)} className={_("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",y,"mt-5")}>Clear all filters</button>
          </div>:<ul className={_("mt-5 grid items-start",o?"grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6":"grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4")}>
            {u.map(e=>{
              let t,a=T[e.type]??Icon_22776;
              return (
                <li key={e.id}>
                            <article className={_("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","cursor-pointer")}>
                              <div className={_("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 aspect-[4/3] items-center justify-center p-1")}>
                                <div className={_("bg-neutral-900/8 dark:bg-neutral-100/8","rounded-[var(--rb-r-sm,6px)]","relative flex h-full max-w-full items-center justify-center",M[e.orientation])}>
                                  <HugeiconsIcon icon={a} size={o?20:28} strokeWidth={1.8} aria-hidden="true" className={f} />
                                  <span className={_(z,"border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","absolute top-2 left-2")}>{e.ext}</span>
                                </div>
                              </div>
                              <div className={_("px-2.5 pt-2",o?"pb-2":"pb-2.5")}>
                                <p className={_("text-[14px]/[16px] font-[450]",k,"truncate")}>{e.name}</p>
                                {!o&&<div className={_(v,f,"mt-0.5 flex items-baseline justify-between gap-2")}>
                                  <span className="tabular-nums">
                                    {e.width}
                                    {" × "}
                                    {e.height}
                                  </span>
                                  <span className="shrink-0 tabular-nums">{(t=e.sizeKb)>=1024?`${(t/1024).toFixed(1)} MB`:`${t} KB`}</span>
                                </div>}
                              </div>
                            </article>
                          </li>
              );
            })}
          </ul>}
        </div>
      </div>
  );
}


export default U;
