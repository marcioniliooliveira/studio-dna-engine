/**
 * React Bits Pro — Application UI (wizard-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let s = (...e)=>e.filter(Boolean).join(" ");

let d = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/62 dark:text-neutral-100/62";

let b = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let x = "relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40";

let u = "h-10";

let h = "h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]";

let k = "flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1";

let p = "flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let m = s("text-[14px]/[20px] font-medium",_);

function v({id:e,value:r,onChange:a,options:c,className:d}){
  let _=useId(),[b,x]=useState(false),[u,h]=useState(0),[k,p]=useState(false),[m,v]=useState(),g=useRef(null),f=useRef(null),w=useRef({buffer:"",at:0}),j=c.indexOf(r),y=e=>{
    let r=g.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,o=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),o=Math.min(o,r.bottom);
        break
      }
      let n=o-e.bottom,l=e.top-t,i=Math.min(32*c.length+8,264),s=n<i+8&&l>n,d=(s?l:n)-8;
      p(s),v(d<i?Math.max(d,40):undefined)
    }
    h(e??(j>=0?j:0)),x(true)
  };
  useEffect(()=>{
    if(!b)return;
    let e=g.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||x(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [b]),useEffect(()=>{
    if(!b)return;
    let e=f.current,r=e?.querySelector(`[data-index="${u}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [b,u]);
  let N=e=>{
    let r=c[e];
    undefined!==r&&(a(r),x(false),g.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={g} className={s("relative",d)}>
        <button id={e} type="button" role="combobox" aria-expanded={b} aria-controls={_} aria-haspopup="listbox" onClick={()=>b?x(false):y()} onKeyDown={e=>{
          if(!b){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),y());
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),x(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),h(e=>Math.min(e+1,c.length-1));else if("ArrowUp"===e.key)e.preventDefault(),h(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),h(0);else if("End"===e.key)e.preventDefault(),h(c.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),N(u);else if(1===e.key.length&&/\S/.test(e.key)){
            let r=Date.now(),a=w.current;
            a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
            let t=c.findIndex(e=>e.toLowerCase().startsWith(a.buffer.toLowerCase()));
            t>=0&&h(t)
          }
        }} className={s("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]")}>
          <span className="truncate">{r}</span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {b&&<ul ref={f} id={_} role="listbox" tabIndex={-1} style={{maxHeight:m}} className={s("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",k?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {c.map((e,a)=>{
            let o=e===r;
            return (
              <li key={e} role="option" aria-selected={o} data-index={a} data-highlighted={a===u?"":undefined} onMouseEnter={()=>h(a)} onClick={()=>N(a)} className={s("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e}</span>
                        {o&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let g = ["Information","Payment","Completed"];

let f = ["Procurement owner","Finance","Engineering","Founder"];

let w = ["United States","Portugal","Germany","Japan"];

function j(){
  return <span aria-hidden="true" className={s(_,"ms-0.5")}>*</span>;
}


export default function wizard_1__Sorbet__Component(){
  let[e,r]=useState(0),[a,l]=useState(f[0]),[y,N]=useState(w[0]);
  return (
    <div className={s("bg-white dark:bg-neutral-950",d,"relative h-full min-h-[660px] w-full overflow-y-auto p-6 sm:p-8")}>
        <form onSubmit={e=>e.preventDefault()} className={s("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","mx-auto w-full max-w-3xl")}>
          <ol className={s("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex shrink-0 items-center gap-3 px-6 py-4")}>
            {g.map((a,o)=>{
              let l=o<e,c=o===e;
              return (
                <li key={a} className={s("flex min-w-0 items-center gap-3",o<g.length-1&&"flex-1")}>
                            <button type="button" onClick={()=>r(o)} aria-current={c?"step":undefined} className={s("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","rounded-[var(--rb-r-4xl,18px)]","flex min-w-0 cursor-pointer items-center gap-2.5 py-0.5")}>
                              <span aria-hidden="true" className={s("grid size-7 shrink-0 place-items-center rounded-full border-2 text-[13px]/[16px] font-extrabold tabular-nums",l?"border-transparent bg-[var(--rb-accent,oklch(84%_0.15_165))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-none":c?"border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] text-neutral-900 dark:text-neutral-100 dark:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"border-transparent bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900/62 dark:text-neutral-100/62 dark:bg-neutral-100/10")}>{l?<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} />:o+1}</span>
                              <span className={s("text-[15px]/[20px] font-bold",l||c?d:_,"hidden truncate sm:block")}>
                                {a}
                                <span className="sr-only">{l?", done":c?", current":""}</span>
                              </span>
                            </button>
                            {o<g.length-1&&<span aria-hidden="true" className={l?"h-1 min-w-4 flex-1 rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]":"h-1 min-w-4 flex-1 rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:bg-neutral-100/10"} />}
                          </li>
              );
            })}
          </ol>
          <div className="min-h-0 flex-1 px-6 py-5">
            <h2 className="text-[17px]/[22px] font-extrabold">Your information</h2>
            <p className={s(m,"mt-1")}>Billing owner details. These appear on every receipt.</p>
            <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-first" className={p}>
                  <span>
                    First name
                    <j />
                  </span>
                </label>
                <div className={s(x,u)}><input id="wz1-first" defaultValue="Mara" className={h} /></div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-last" className={p}>
                  <span>
                    Last name
                    <j />
                  </span>
                </label>
                <div className={s(x,u)}><input id="wz1-last" defaultValue="Chen" className={h} /></div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-company" className={p}>
                  <span>
                    Company
                    <j />
                  </span>
                </label>
                <div className={s(x,u)}><input id="wz1-company" defaultValue="Kepler Works" className={h} /></div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-handle" className={p}>Public handle</label>
                <div className={s(x,u)}>
                  <span aria-hidden="true" data-affix className={k}>@</span>
                  <input id="wz1-handle" defaultValue="kepler-works" className={h} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-role" className={p}>Role</label>
                <v id="wz1-role" value={a} onChange={l} options={f} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-country" className={p}>Country</label>
                <v id="wz1-country" value={y} onChange={N} options={w} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-email" className={p}>
                  <span>
                    Email address
                    <j />
                  </span>
                </label>
                <div className={s(x,u)}>
                  <input id="wz1-email" type="email" defaultValue="mara@kepler.works" className={h} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-mobile" className={p}>Mobile</label>
                <div className={s(x,u)}>
                  <span aria-hidden="true" data-affix className={k}>US</span>
                  <input id="wz1-mobile" defaultValue="+1 415 5151" className={h} />
                </div>
              </div>
            </div>
            <p className={s(m,"mt-4")}>Receipts and payment failures go to this address.</p>
          </div>
          <div className={s("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex shrink-0 items-center justify-between gap-3 px-6 py-4")}>
            <button type="button" onClick={()=>r(e=>Math.max(0,e-1))} disabled={0===e} className={s("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",b)}>Back</button>
            <button type="submit" onClick={()=>r(e=>Math.min(g.length-1,e+1))} className={s("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",b)}>
              Next step
              <HugeiconsIcon icon={Icon_55299} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
  );
}
