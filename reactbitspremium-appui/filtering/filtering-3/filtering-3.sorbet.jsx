/**
 * React Bits Pro — Application UI (filtering-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, key, kind, label, left, observe, operators, options, preventDefault, useCallback, useEffect, useId, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_58770 = [["path",{d:"M8.85746 12.5061C6.36901 10.6456 4.59564 8.59915 3.62734 7.44867C3.3276 7.09253 3.22938 6.8319 3.17033 6.3728C2.96811 4.8008 2.86701 4.0148 3.32795 3.5074C3.7889 3 4.60404 3 6.23433 3H17.7657C19.396 3 20.2111 3 20.672 3.5074C21.133 4.0148 21.0319 4.8008 20.8297 6.37281C20.7706 6.83191 20.6724 7.09254 20.3726 7.44867C19.403 8.60062 17.6261 10.6507 15.1326 12.5135C14.907 12.6821 14.7583 12.9567 14.7307 13.2614C14.4837 15.992 14.2559 17.4876 14.1141 18.2442C13.8853 19.4657 12.1532 20.2006 11.226 20.8563C10.6741 21.2466 10.0043 20.782 9.93278 20.1778C9.79643 19.0261 9.53961 16.6864 9.25927 13.2614C9.23409 12.9539 9.08486 12.6761 8.85746 12.5061Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" ");

let _ = "text-neutral-900/62 dark:text-neutral-100/62";

let b = "border border-neutral-900/12 dark:border-neutral-100/14";

let u = "text-[15px]/[20px] font-bold";

let x = "text-[14px]/[20px] font-medium";

let p = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let h = "relative inline-flex size-[18px] shrink-0 items-center justify-center";

let k = "peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[calc(var(--rb-r-sm,6px))] border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(84%_0.15_165))] checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] indeterminate:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:bg-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:indeterminate:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:shadow-none dark:indeterminate:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:bg-neutral-100/28";

let m = "pointer-events-none absolute scale-50 text-[var(--rb-accent-fg,oklch(26%_0.06_168))] opacity-0 transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:scale-100 peer-indeterminate:opacity-100 peer-active:scale-[0.86] motion-reduce:transition-none dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))]";

let v = "relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40";

let g = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let f = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let w = "ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";

let y = "inline-flex h-8 cursor-pointer items-center rounded-[calc(var(--rb-r-full,999px))] px-3 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100";

let j = d(x,_);

let N = d("text-[13px]/[16px] font-semibold tabular-nums",_);

function z({id:e,value:a,onChange:r,options:s,disabled:c,placeholder:_="Select…",className:b,triggerClassName:u,leading:x,ariaLabel:p}){
  let h=useId(),[k,m]=useState(false),[v,g]=useState(0),[f,w]=useState(false),[y,j]=useState(),z=useRef(null),C=useRef(null),S=useRef({buffer:"",at:0}),A=s.findIndex(e=>e.value===a),D=A>=0?Icon_68656:undefined,E=e=>{
    if(c)return;
    let a=z.current,r=a?.ownerDocument.defaultView;
    if(a&&r){
      let e=a.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        t=Math.max(t,a.top),l=Math.min(l,a.bottom);
        break
      }
      let n=l-e.bottom,i=e.top-t,o=Math.min(32*s.length+8,264),c=n<o+8&&i>n,d=(c?i:n)-8;
      w(c),j(d<o?Math.max(d,40):undefined)
    }
    g(e??(A>=0?A:0)),m(true)
  };
  useEffect(()=>{
    if(!k)return;
    let e=z.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||m(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [k]),useEffect(()=>{
    if(!k)return;
    let e=C.current,a=e?.querySelector(`[data-index="${v}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [k,v]);
  let M=e=>{
    let a=s[e];
    a&&(r(a.value),m(false),z.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={z} className={d("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={k} aria-controls={h} aria-haspopup="listbox" disabled={c} onClick={()=>k?m(false):E()} onKeyDown={e=>{
          if(!c){
            if(!k){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),E());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),m(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),g(e=>Math.min(e+1,s.length-1));else if("ArrowUp"===e.key)e.preventDefault(),g(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),g(0);else if("End"===e.key)e.preventDefault(),g(s.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),M(v);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=S.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=s.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&g(t)
            }
          }
        }} aria-label={p} className={d("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",u)}>
          <span className="flex min-w-0 items-center gap-2">
            {x}
            <span className={d("truncate",!D&&"text-neutral-900/62 dark:text-neutral-100/62")}>{D?D.label:_}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {k&&<ul ref={C} id={h} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={d("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",f?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,r)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={r} data-highlighted={r===v||undefined} onMouseEnter={()=>g(r)} onClick={()=>M(r)} className={d("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={d(N,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function C({min:e,max:a,step:r=1,value:n,onChange:i,format:o,labels:s}){
  let c=useRef(null),[d,_]=useState(null),b=t=>Math.min(a,Math.max(e,Math.round(t/r)*r)),u=r=>(r-e)/(a-e)*100,x=r=>{
    let t=c.current;
    if(!t)return e;
    let l=t.getBoundingClientRect();
    return 0===width?e:b(e+(r-left)/width*(a-e));
  },p=(e,a)=>{
    let[r,t]=n;
    0===e?i([Math.min(a,t),t]):i([r,Math.max(a,r)])
  },h=t=>({role:"slider",tabIndex:0,"aria-label":s[t],"aria-valuemin":e,"aria-valuemax":a,"aria-valuenow":n[t],"aria-valuetext":o(n[t]),style:{left:`${u(n[t])}%`,touchAction:"none"},onPointerDown:e=>{
    e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId),_(t)
  },onPointerMove:e=>{
    d===t&&p(t,x(e.clientX))
  },onLostPointerCapture:()=>_(null),onPointerUp:e=>{
    e.currentTarget.releasePointerCapture(e.pointerId),_(null)
  },onKeyDown:l=>{
    let i=Math.max(r,Math.round((a-e)/10)),o=n[t],s=null;
    "ArrowLeft"===key||"ArrowDown"===key?s=o-r:"ArrowRight"===key||"ArrowUp"===key?s=o+r:"PageDown"===key?s=o-i:"PageUp"===key?s=o+i:"Home"===key?s=e:"End"===key&&(s=a),null!==s&&(preventDefault(),p(t,b(s)))
  },className:"absolute top-1/2 block size-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[scale] duration-[240ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-110 active:cursor-grabbing motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-white"});
  return (
    <div ref={c} onPointerDown={e=>{
        let a=x(e.clientX);
        p(Math.abs(a-n[0])<=Math.abs(a-n[1])?0:1,a)
      }} className="relative flex h-4 w-full cursor-pointer touch-none items-center select-none">
        <div className="relative h-2 w-full grow rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/14 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
          <span className="absolute inset-y-0 rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{left:`${u(n[0])}%`,width:`${u(n[1])-u(n[0])}%`}} />
          <div {...h(0)} />
          <div {...h(1)} />
        </div>
      </div>
  );
}

let S = [{value:"dinnerware",label:"Dinnerware"},{value:"drinkware",label:"Drinkware"},{value:"vases",label:"Vases"},{value:"planters",label:"Planters"},{value:"serveware",label:"Serveware"}];

let A = [{value:"chalk",label:"Chalk",hex:"#ece5d8",light:true},{value:"sand",label:"Sand",hex:"#c9b193",light:true},{value:"moss",label:"Moss",hex:"#5a6647",light:false},{value:"slate",label:"Slate",hex:"#3b4b5a",light:false},{value:"clay",label:"Clay",hex:"#a05a41",light:false},{value:"ink",label:"Ink",hex:"#2a2724",light:false}];

let D = [{value:"s",label:"Small"},{value:"m",label:"Medium"},{value:"l",label:"Large"}];

let E = [{value:"kilnhouse",label:"Kilnhouse"},{value:"muro",label:"Muro Studio"},{value:"terra",label:"Terra & Ash"},{value:"nine",label:"Nine Fields"}];

let M = [{id:"p1",name:"Ridge dinner plate",category:"dinnerware",price:38,glaze:"chalk",size:"l",maker:"kilnhouse"},{id:"p2",name:"Ridge side plate",category:"dinnerware",price:26,glaze:"chalk",size:"m",maker:"kilnhouse"},{id:"p3",name:"Coil cereal bowl",category:"dinnerware",price:32,glaze:"sand",size:"m",maker:"muro"},{id:"p4",name:"Ember pasta bowl",category:"dinnerware",price:44,glaze:"clay",size:"l",maker:"terra"},{id:"p5",name:"Halo charger plate",category:"dinnerware",price:52,glaze:"ink",size:"l",maker:"nine"},{id:"p6",name:"Tuck mug",category:"drinkware",price:28,glaze:"moss",size:"s",maker:"kilnhouse"},{id:"p7",name:"Stack tumbler",category:"drinkware",price:22,glaze:"slate",size:"s",maker:"muro"},{id:"p8",name:"Pour carafe",category:"drinkware",price:68,glaze:"chalk",size:"l",maker:"terra"},{id:"p9",name:"Field cup",category:"drinkware",price:19,glaze:"sand",size:"s",maker:"nine"},{id:"p10",name:"Bell teapot",category:"drinkware",price:94,glaze:"ink",size:"l",maker:"kilnhouse"},{id:"p11",name:"Column vase",category:"vases",price:76,glaze:"slate",size:"l",maker:"muro"},{id:"p12",name:"Pebble bud vase",category:"vases",price:34,glaze:"chalk",size:"s",maker:"terra"},{id:"p13",name:"Fold vase",category:"vases",price:58,glaze:"clay",size:"m",maker:"nine"},{id:"p14",name:"Basin planter",category:"planters",price:62,glaze:"sand",size:"l",maker:"kilnhouse"},{id:"p15",name:"Rim planter",category:"planters",price:41,glaze:"moss",size:"m",maker:"muro"},{id:"p16",name:"Trace wall planter",category:"planters",price:29,glaze:"ink",size:"s",maker:"terra"},{id:"p17",name:"Crest platter",category:"serveware",price:88,glaze:"chalk",size:"l",maker:"nine"},{id:"p18",name:"Ladle serving bowl",category:"serveware",price:54,glaze:"moss",size:"m",maker:"kilnhouse"}];

let eb = (...e)=>e.filter(Boolean).join(" ");

let eu = "bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]";

let ex = "text-neutral-900/62 dark:text-neutral-100/62";

let ep = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eh = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let ek = "relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40";

let em = "h-10";

let ev = "h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]";

let eg = "flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1";

let ef = "text-neutral-900 dark:text-neutral-100";

let ew = "min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]";

let ey = "relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40";

let ej = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let eN = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let ez = "text-right tabular-nums";

let eC = eb("text-[14px]/[20px] font-medium",ex);

let eS = eb("text-[13px]/[16px] font-semibold tabular-nums",ex);

let eA = eb(eu,"border border-transparent ring-1 ring-[rgb(84_62_32/0.1)] dark:ring-neutral-100/12","rounded-[var(--rb-r-6xl,26px)]","shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]");

function eD({id:e,value:a,onChange:r,options:s,disabled:c,placeholder:d="Select…",className:_,triggerClassName:b,leading:u,ariaLabel:x}){
  let p=useId(),[h,k]=useState(false),[m,v]=useState(0),[g,f]=useState(false),[w,y]=useState(),j=useRef(null),N=useRef(null),z=useRef({buffer:"",at:0}),C=s.findIndex(e=>e.value===a),S=C>=0?s[C]:undefined,A=e=>{
    if(c)return;
    let a=j.current,r=a?.ownerDocument.defaultView;
    if(a&&r){
      let e=a.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        t=Math.max(t,a.top),l=Math.min(l,a.bottom);
        break
      }
      let n=l-e.bottom,i=e.top-t,o=Math.min(32*s.length+8,264),c=n<o+8&&i>n,d=(c?i:n)-8;
      f(c),y(d<o?Math.max(d,40):undefined)
    }
    v(e??(C>=0?C:0)),k(true)
  };
  useEffect(()=>{
    if(!h)return;
    let e=j.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||k(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [h]),useEffect(()=>{
    if(!h)return;
    let e=N.current,a=e?.querySelector(`[data-index="${m}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [h,m]);
  let D=e=>{
    let a=s[e];
    a&&(r(a.value),k(false),j.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={j} className={eb("relative",_)}>
        <button id={e} type="button" role="combobox" aria-expanded={h} aria-controls={p} aria-haspopup="listbox" disabled={c} onClick={()=>h?k(false):A()} onKeyDown={e=>{
          if(!c){
            if(!h){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),A());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),k(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),v(e=>Math.min(e+1,s.length-1));else if("ArrowUp"===e.key)e.preventDefault(),v(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),v(0);else if("End"===e.key)e.preventDefault(),v(s.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),D(m);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=z.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=s.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&v(t)
            }
          }
        }} aria-label={x} className={eb("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",b)}>
          <span className="flex min-w-0 items-center gap-2">
            {u}
            <span className={eb("truncate",!S&&"text-neutral-900/62 dark:text-neutral-100/62")}>{S?S.label:d}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {h&&<ul ref={N} id={p} role="listbox" tabIndex={-1} style={{maxHeight:w}} className={eb(ew,"absolute z-30 max-h-[264px] w-full min-w-[100%]",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,r)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={r} data-highlighted={r===m||undefined} onMouseEnter={()=>v(r)} onClick={()=>D(r)} className={eb(ey,"pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={eb(eS,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let eE = [{value:"lead",label:"Lead"},{value:"qualified",label:"Qualified"},{value:"proposal",label:"Proposal"},{value:"negotiation",label:"Negotiation"},{value:"won",label:"Won"},{value:"lost",label:"Lost"}];

let eM = {lead:ef,qualified:ef,proposal:ef,negotiation:ef,won:"text-neutral-900/78 dark:text-neutral-100/78",lost:"text-neutral-900/62 dark:text-neutral-100/62"};

let eL = [{value:"amara",label:"Amara Osei",initials:"AO"},{value:"raj",label:"Raj Patel",initials:"RP"},{value:"lena",label:"Lena Fischer",initials:"LF"},{value:"marco",label:"Marco Bianchi",initials:"MB"}];

let eR = eL.map(e=>({value:e.value,label:e.label}));

let eP = [{id:"d1",name:"Harborline renewal",company:"Harborline Supply",stage:"negotiation",owner:"amara",value:48e3,close:"Aug 14",probability:70},{id:"d2",name:"Meridian expansion",company:"Meridian Labs",stage:"proposal",owner:"raj",value:32e3,close:"Aug 22",probability:55},{id:"d3",name:"Kestrel pilot",company:"Kestrel Robotics",stage:"qualified",owner:"lena",value:12e3,close:"Sep 03",probability:30},{id:"d4",name:"Foxglove migration",company:"Foxglove Media",stage:"negotiation",owner:"marco",value:76e3,close:"Aug 09",probability:80},{id:"d5",name:"Anvil onboarding",company:"Anvil Logistics",stage:"lead",owner:"amara",value:8e3,close:"Sep 18",probability:15},{id:"d6",name:"Cobalt upsell",company:"Cobalt Health",stage:"proposal",owner:"raj",value:21e3,close:"Aug 28",probability:50},{id:"d7",name:"Rivermark deal",company:"Rivermark Foods",stage:"won",owner:"lena",value:54e3,close:"Jul 30",probability:100},{id:"d8",name:"Two Rivers expansion",company:"Two Rivers Coffee",stage:"qualified",owner:"marco",value:15500,close:"Sep 11",probability:35},{id:"d9",name:"Stonepath platform",company:"Stonepath Systems",stage:"negotiation",owner:"amara",value:12e4,close:"Aug 05",probability:65},{id:"d10",name:"Verdant build",company:"Verdant Studio",stage:"lead",owner:"raj",value:6500,close:"Sep 25",probability:10},{id:"d11",name:"Silt & Vine renewal",company:"Silt & Vine",stage:"proposal",owner:"lena",value:28e3,close:"Aug 19",probability:60},{id:"d12",name:"Summit Chalet retrofit",company:"Summit Chalet",stage:"lost",owner:"marco",value:4e4,close:"Jul 22",probability:0},{id:"d13",name:"Skyward rollout",company:"Skyward Air",stage:"negotiation",owner:"amara",value:95e3,close:"Aug 12",probability:75},{id:"d14",name:"Marginalia upgrade",company:"Marginalia Press",stage:"qualified",owner:"raj",value:18e3,close:"Sep 08",probability:40},{id:"d15",name:"Longitude booking suite",company:"Longitude Travel",stage:"proposal",owner:"lena",value:24500,close:"Aug 30",probability:45},{id:"d16",name:"Thornbury financing",company:"Thornbury Bank",stage:"won",owner:"marco",value:67e3,close:"Jul 28",probability:100},{id:"d17",name:"Halden Research POC",company:"Halden Research",stage:"lead",owner:"amara",value:9500,close:"Sep 20",probability:20},{id:"d18",name:"Fine Arts curriculum",company:"Fine Arts Collective",stage:"qualified",owner:"raj",value:13500,close:"Sep 14",probability:25}];

let eT = [{value:"stage",label:"Stage",kind:"enum",operators:["is","is_not"],options:eE},{value:"owner",label:"Owner",kind:"enum",operators:["is","is_not"],options:eR},{value:"company",label:"Company",kind:"text",operators:["contains","not_contains"]},{value:"value",label:"Deal value",kind:"number",operators:["gt","lt"]},{value:"probability",label:"Probability",kind:"number",operators:["gt","lt"]}];

let eW = {is:"is",is_not:"is not",contains:"contains",not_contains:"does not contain",gt:"greater than",lt:"less than"};

let eH = eT.map(e=>({value:e.value,label:e.label}));

let e$ = e=>eT.find(a=>a.value===e);

let eq = e=>`$${e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`;

let eI = e=>{
  let a=e$(e);
  return "enum"===a.kind?a.options?.[0]?.value??"":"";
};

let eF = ()=>`q${eB+=1}`;

let eK = [{value:"all",label:"All deals",build:()=>[]},{value:"mine",label:"My deals",build:()=>[{id:eF(),field:"owner",operator:"is",value:"amara"}]},{value:"late",label:"Late stage",build:()=>[{id:eF(),field:"stage",operator:"is",value:"negotiation"}]},{value:"high",label:"High value",build:()=>[{id:eF(),field:"value",operator:"gt",value:"50000"}]}];


export default function filtering_3__Sorbet__Component(){
  let e=useRef(null),a=useRef(null),{ref:r,edges:i,onScroll:o}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),[s,d]=useState("all"),[_,b]=useState(()=>[{id:eF(),field:"stage",operator:"is_not",value:"lost"},{id:eF(),field:"value",operator:"gt",value:"10000"}]),[u,x]=useState(""),[p,h]=useState(null);
  useEffect(()=>{
    if(!p)return;
    let r=e.current?.ownerDocument;
    if(!r)return;
    let t=e=>{
      a.current&&!a.current.contains(e.target)&&h(null)
    },l=e=>{
      "Escape"===e.key&&h(null)
    };
    return r.addEventListener("mousedown",t),r.addEventListener("touchstart",t),r.addEventListener("keydown",l),()=>{
      r.removeEventListener("mousedown",t),r.removeEventListener("touchstart",t),r.removeEventListener("keydown",l)
    };
  }, [p]);
  let k=(e,a)=>{
    b(r=>r.map(r=>r.id===e?{...r,...a}:r)),d("")
  },m=()=>{
    b([]),x(""),d("all"),h(null)
  },v=useMemo(()=>{
    let e=u.trim().toLowerCase();
    return eP.filter(a=>(!e||!!a.name.toLowerCase().includes(e)||!!a.company.toLowerCase().includes(e))&&_.every(e=>((e,a)=>{
      let r=e$(a.field);
      if("enum"===r.kind){
        let r=String(e[a.field]);
        return "is"===a.operator?r===a.value:r!==a.value;
      }
      if("text"===r.kind){
        let r=a.value.trim().toLowerCase();
        if(!r)return true;
        let t=String(e[a.field]).toLowerCase();
        return "contains"===a.operator?t.includes(r):!t.includes(r);
      }
      if(""===a.value.trim())return true;
      let t=Number(a.value);
      if(Number.isNaN(t))return true;
      let l=Number(e[a.field]);
      return "gt"===a.operator?l>t:l<t;
    })(a,e)));
  }, [_,u]),g=useMemo(()=>v.reduce((e,a)=>e+a.value,0), [v]),f=_.length>0||""!==u.trim();
  return (
    <div ref={e} className={eb("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[960px] w-full flex-col overflow-hidden p-6 sm:p-8")}>
        <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col">
          <header className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-[22px]/[28px] font-extrabold tracking-[-0.01em]">Deal pipeline</h2>
              <p className={eb(eC,"mt-1 flex flex-wrap gap-x-3")}>
                <span>
                  <span className="tabular-nums">{v.length}</span>
                  {" of"}
                  {" "}
                  <span className="tabular-nums">{eP.length}</span>
                  {" deals"}
                </span>
                <span>
                  <span className="tabular-nums">{eq(g)}</span>
                  {" "}
                  weighted
                </span>
              </p>
            </div>
            <div className="-m-1 max-w-[calc(100%+8px)] overflow-x-auto p-1 [scrollbar-width:none]">
              <div className="w-max">
                <div role="radiogroup" aria-label="Saved views" className={eb("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10")}>
                  {eK.map(e=>{
                    let a=s===e.value;
                    return (
                      <button key={e.value} type="button" role="radio" aria-checked={a} onClick={()=>{
                                        var a;
                                        let r;
                                        return d(a=e.value),void(b((r=eK.find(e=>e.value===a))?r.build():[]),h(null));
                                      }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{e.label}</button>
                    );
                  })}
                </div>
              </div>
            </div>
          </header>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px] flex-1">
              <div className={eb(ek,em)}>
                <span data-affix className={eg}>
                  <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
                </span>
                <input type="text" value={u} onChange={e=>x(e.target.value)} placeholder="Search deals or companies…" aria-label="Search deals" className={ev} />
                {u&&<span data-affix className={eg}>
                  <button type="button" aria-label="Clear search" onClick={()=>x("")} className={eb("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-7 rounded-[calc(var(--rb-r-full,999px))]")}>
                    <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                </span>}
              </div>
            </div>
            <div className="relative" ref={"add"===p?a:undefined}>
              <button type="button" aria-haspopup="menu" aria-expanded={"add"===p} onClick={()=>h(e=>"add"===e?null:"add")} className={eb(ep,eh)}>
                <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
                Add filter
              </button>
              {"add"===p&&<div role="menu" className={eb(ew,"absolute top-full right-0 z-30 mt-1.5 w-52")}>
                <p className="px-3 pt-2.5 pb-1 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">Filter by field</p>
                {eT.map(e=>(
                  <button key={e.value} type="button" role="menuitem" onClick={()=>{
                                var a;
                                let r,t;
                                return r=e$(a=e.value),t={id:eF(),field:a,operator:r.operators[0],value:eI(a)},void(b(e=>[...e,t]),d(""),h(t.id));
                              }} className={ey}>
                                <HugeiconsIcon icon={Icon_58770} size={16} strokeWidth={2} aria-hidden="true" />
                                {e.label}
                              </button>
                ))}
              </div>}
            </div>
          </div>
          {_.length>0&&<div className="mt-3 flex flex-wrap items-center gap-2">
            {_.map(e=>{
              let r,l=e$(e.field),i=p===e.id;
              return (
                <div key={e.id} className="relative" ref={i?a:undefined}>
                            <div className="relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40">
                              <button type="button" aria-haspopup="dialog" aria-expanded={i} onClick={()=>h(a=>a===e.id?null:e.id)} className={eb("min-w-0 truncate outline-none after:absolute after:inset-0 after:rounded-[calc(var(--rb-r-lg,10px))] after:content-[''] focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:after:outline-[var(--rb-accent,oklch(81%_0.16_163))]","flex h-full items-center gap-1.5")}>
                                <span className={ex}>{label}</span>
                                <span className={ex}>{eW[e.operator]}</span>
                                <span className="tabular-nums">
                                  {"enum"===(r=e$(e.field)).kind?r.options?.find(a=>a.value===e.value)?.label??e.value:""===e.value.trim()?"…":"number"===r.kind&&"value"===e.field?eq(Number(e.value)):"number"===r.kind&&"probability"===e.field?`${e.value}%`:e.value}
                                </span>
                              </button>
                              <button type="button" aria-label={`Remove ${label} filter`} onClick={()=>{
                                var a;
                                return a=e.id,void(b(e=>e.filter(e=>e.id!==a)),d(""),p===a&&h(null));
                              }} className={eb("-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[calc(var(--rb-r-full,999px))] text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/8 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/12 dark:hover:text-neutral-100","relative")}>
                                <HugeiconsIcon icon={Icon_89289} size={14} strokeWidth={2} aria-hidden="true" />
                              </button>
                            </div>
                            {i&&<div role="dialog" aria-label={`Edit ${label} filter`} className={eb(eA,"absolute top-full left-0 z-30 mt-1.5 w-64 p-3")}>
                              <div className="space-y-2">
                                <eD value={e.field} onChange={a=>{
                                  var r;
                                  let t;
                                  return r=e.id,t=e$(a),void k(r,{field:a,operator:t.operators[0],value:eI(a)});
                                }} options={eH} ariaLabel="Field" />
                                <eD value={e.operator} onChange={a=>k(e.id,{operator:a})} options={operators.map(e=>({value:e,label:eW[e]}))} ariaLabel="Operator" />
                                {"enum"===kind?<eD value={e.value} onChange={a=>k(e.id,{value:a})} options={options??[]} ariaLabel="Value" />:<div className={eb(ek,em)}>
                                  <input type={"number"===kind?"number":"text"} value={e.value} onChange={a=>k(e.id,{value:a.target.value})} placeholder={"number"===kind?"Enter a number":"Enter text"} aria-label="Value" className={ev} />
                                </div>}
                              </div>
                            </div>}
                          </div>
              );
            })}
            <button type="button" onClick={m} className="inline-flex h-8 cursor-pointer items-center rounded-[calc(var(--rb-r-full,999px))] px-3 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100">Clear all</button>
          </div>}
          <div className={eb("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","mt-4 min-h-0 flex-1")}>
            <div ref={r} onScroll={o} className="min-h-0 flex-1 overflow-auto">
              {0===v.length?<div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                <div className={eb("text-neutral-900/78 dark:text-neutral-100/78","mb-3 flex h-10 w-10 items-center justify-center")}>
                  <HugeiconsIcon icon={Icon_58770} size={20} strokeWidth={2} aria-hidden="true" />
                </div>
                <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No deals match this query</p>
                <p className={eb("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1 max-w-xs")}>Loosen an operator or remove a filter to widen the pipeline.</p>
                {f&&<button type="button" onClick={m} className={eb(ep,eh,"mt-4")}>Clear all filters</button>}
              </div>:<table className="w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium">
                <caption className="sr-only">Filtered deals</caption>
                <thead>
                  <tr className={eb(eu,"sticky top-0 z-20")}>
                    <th scope="col" className={eb(ej,"h-9 min-w-[180px] sm:first:ps-5")}>Deal</th>
                    <th scope="col" className={eb(ej,"h-9 min-w-[140px]")}>Stage</th>
                    <th scope="col" className={eb(ej,"h-9 min-w-[150px]")}>Owner</th>
                    <th scope="col" className={eb(ej,"h-9")}><span className={eb(ez,"block")}>Value</span></th>
                    <th scope="col" className={eb(ej,"h-9")}><span className={eb(ez,"block")}>Prob.</span></th>
                    <th scope="col" className={eb(ej,"h-9 sm:last:pe-5")}><span className={eb(ez,"block")}>Close</span></th>
                  </tr>
                </thead>
                <tbody>
                  {v.map(e=>{
                    let a,r=eL.find(a=>a.value===e.owner);
                    return (
                      <tr key={e.id} className={eb("group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","h-11")}>
                                        <td className={eb(eN,"sm:first:ps-5")}>
                                          <span className={eb("text-[15px]/[20px] font-bold","block truncate")}>{e.name}</span>
                                          <span className={eb(eS,"block truncate")}>{e.company}</span>
                                        </td>
                                        <td className={eN}>
                                          <span className={eb("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",eM[e.stage])}>{a=e.stage,eE.find(e=>e.value===a)?.label??a}</span>
                                        </td>
                                        <td className={eN}>
                                          <span className="inline-flex items-center gap-2">
                                            <span className={eb("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                                              <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{r?.initials.charAt(0)}</span>
                                            </span>
                                            <span className="truncate">{r?.label}</span>
                                          </span>
                                        </td>
                                        <td className={eb(eN,ez)}>{eq(e.value)}</td>
                                        <td className={eb(eN,ez)}>
                                          {e.probability}
                                          %
                                        </td>
                                        <td className={eb(eN,ez,"sm:last:pe-5")}>{e.close}</td>
                                      </tr>
                    );
                  })}
                </tbody>
              </table>}
            </div>
            <div aria-hidden="true" className={eb("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 top-9 h-8",i.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={eb("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
