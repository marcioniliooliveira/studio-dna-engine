/**
 * React Bits Pro — Application UI (wizard-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  x = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  h = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  p = "flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1",
  _ = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  m = d("text-[13px]/[18px] font-normal",u);

function k({id:e,value:r,onChange:a,options:o,className:c}){
  let u=useId(),[b,x]=useState(false),[h,p]=useState(0),[_,m]=useState(false),[k,f]=useState(),v=useRef(null),g=useRef(null),w=useRef({buffer:"",at:0}),j=o.indexOf(r),N=e=>{
    let r=v.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,l=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),l=Math.min(l,r.bottom);
        break
      }
      let n=l-e.bottom,s=e.top-t,i=Math.min(32*o.length+8,264),d=n<i+8&&s>n,c=(d?s:n)-8;
      m(d),f(c<i?Math.max(c,40):undefined)
    }
    p(e??(j>=0?j:0)),x(true)
  };
  useEffect(()=>{
    if(!b)return;
    let e=v.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||x(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [b]),useEffect(()=>{
    if(!b)return;
    let e=g.current,r=e?.querySelector(`[data-index="${h}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [b,h]);
  let y=e=>{
    let r=o[e];
    undefined!==r&&(a(r),x(false),v.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={v} className={d("relative",c)}>
        <button id={e} type="button" role="combobox" aria-expanded={b} aria-controls={u} aria-haspopup="listbox" onClick={()=>b?x(false):N()} onKeyDown={e=>{
          if(!b){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),N());
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),x(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),p(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),p(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),p(0);else if("End"===e.key)e.preventDefault(),p(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),y(h);else if(1===e.key.length&&/\S/.test(e.key)){
            let r=Date.now(),a=w.current;
            a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
            let t=o.findIndex(e=>e.toLowerCase().startsWith(a.buffer.toLowerCase()));
            t>=0&&p(t)
          }
        }} className={d("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]")}>
          <span className="truncate">{r}</span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {b&&<ul ref={g} id={u} role="listbox" tabIndex={-1} style={{maxHeight:k}} className={d("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",_?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,a)=>{
            let l=e===r;
            return (
              <li key={e} role="option" aria-selected={l} data-index={a} data-highlighted={a===h?"":undefined} onMouseEnter={()=>p(a)} onClick={()=>y(a)} className={d("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e}</span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let f = ["Information","Payment","Completed"],
  v = ["Procurement owner","Finance","Engineering","Founder"],
  g = ["United States","Portugal","Germany","Japan"];

function w(){
  return <span aria-hidden="true" className={d(u,"ms-0.5")}>*</span>;
}

function j(){
  let[e,r]=useState(0),[a,s]=useState(v[0]),[j,N]=useState(g[0]);
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"relative h-full min-h-[640px] w-full overflow-y-auto p-6 sm:p-8")}>
        <form onSubmit={e=>e.preventDefault()} className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","mx-auto w-full max-w-3xl")}>
          <ol className={d("border-b border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0 items-center gap-3 px-6 py-4")}>
            {f.map((a,l)=>{
              let s=l<e,o=l===e;
              return (
                <li key={a} className={d("flex min-w-0 items-center gap-3",l<f.length-1&&"flex-1")}>
                            <button type="button" onClick={()=>r(l)} aria-current={o?"step":undefined} className={d("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","rounded-[var(--rb-r-sm,6px)]","flex min-w-0 cursor-pointer items-center gap-2.5 py-0.5")}>
                              <span aria-hidden="true" className={d("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",s?"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14":o?"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100":"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14")}>{s?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} />:l+1}</span>
                              <span className={d("text-[14px]/[16px] font-[450]",s||o?c:u,"hidden truncate sm:block")}>
                                {a}
                                <span className="sr-only">{s?", done":o?", current":""}</span>
                              </span>
                            </button>
                            {l<f.length-1&&<span aria-hidden="true" className={s?"h-px min-w-4 flex-1 bg-neutral-900 dark:bg-neutral-100":"h-px min-w-4 flex-1 bg-neutral-900/8 dark:bg-neutral-100/8"} />}
                          </li>
              );
            })}
          </ol>
          <div className="min-h-0 flex-1 px-6 py-5">
            <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Your information</h2>
            <p className={d(m,"mt-1")}>Billing owner details. These appear on every receipt.</p>
            <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-first" className={_}>
                  <span>
                    First name
                    <w />
                  </span>
                </label>
                <div className={d(x,"h-8")}><input id="wz1-first" defaultValue="Mara" className={h} /></div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-last" className={_}>
                  <span>
                    Last name
                    <w />
                  </span>
                </label>
                <div className={d(x,"h-8")}><input id="wz1-last" defaultValue="Chen" className={h} /></div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-company" className={_}>
                  <span>
                    Company
                    <w />
                  </span>
                </label>
                <div className={d(x,"h-8")}><input id="wz1-company" defaultValue="Kepler Works" className={h} /></div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-handle" className={_}>Public handle</label>
                <div className={d(x,"h-8")}>
                  <span aria-hidden="true" data-affix className={p}>@</span>
                  <input id="wz1-handle" defaultValue="kepler-works" className={h} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-role" className={_}>Role</label>
                <k id="wz1-role" value={a} onChange={s} options={v} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-country" className={_}>Country</label>
                <k id="wz1-country" value={j} onChange={N} options={g} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-email" className={_}>
                  <span>
                    Email address
                    <w />
                  </span>
                </label>
                <div className={d(x,"h-8")}>
                  <input id="wz1-email" type="email" defaultValue="mara@kepler.works" className={h} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="wz1-mobile" className={_}>Mobile</label>
                <div className={d(x,"h-8")}>
                  <span aria-hidden="true" data-affix className={p}>US</span>
                  <input id="wz1-mobile" defaultValue="+1 415 5151" className={h} />
                </div>
              </div>
            </div>
            <p className={d(m,"mt-4")}>Receipts and payment failures go to this address.</p>
          </div>
          <div className={d("border-t border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0 items-center justify-between gap-3 px-6 py-4")}>
            <button type="button" onClick={()=>r(e=>Math.max(0,e-1))} disabled={0===e} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",b)}>Back</button>
            <button type="submit" onClick={()=>r(e=>Math.min(f.length-1,e+1))} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",b)}>
              Next step
              <HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
  );
}


export default j;
