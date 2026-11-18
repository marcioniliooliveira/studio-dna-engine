/**
 * React Bits Pro — Application UI (onboarding-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let s = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "text-[13px]/[18px] font-normal",
  b = "text-[14px]/[16px] font-[450]",
  x = "h-11 gap-2 rounded-[var(--rb-r-sm,6px)] px-5 text-[16px]/[20px] font-[450] tracking-[-0.01em]",
  h = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  p = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  _ = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  k = "max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80";

function m({id:e,value:r,onChange:a,options:d,disabled:u,placeholder:b="Select…",className:x,triggerClassName:h,leading:p,ariaLabel:_}){
  let k=useId(),[m,f]=useState(false),[v,g]=useState(0),[w,j]=useState(false),[y,N]=useState(),S=useRef(null),z=useRef(null),C=useRef({buffer:"",at:0}),A=d.findIndex(e=>e.value===r),E=A>=0?d[A]:undefined,D=e=>{
    if(u)return;
    let r=S.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,l=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),l=Math.min(l,r.bottom);
        break
      }
      let n=l-e.bottom,o=e.top-t,i=Math.min(32*d.length+8,264),s=n<i+8&&o>n,c=(s?o:n)-8;
      j(s),N(c<i?Math.max(c,40):undefined)
    }
    g(e??(A>=0?A:0)),f(true)
  };
  useEffect(()=>{
    if(!m)return;
    let e=S.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||f(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [m]),useEffect(()=>{
    if(!m)return;
    let e=z.current,r=e?.querySelector(`[data-index="${v}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [m,v]);
  let W=e=>{
    let r=d[e];
    r&&(a(r.value),f(false),S.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={S} className={s("relative",x)}>
        <button id={e} type="button" role="combobox" aria-expanded={m} aria-controls={k} aria-haspopup="listbox" disabled={u} onClick={()=>m?f(false):D()} onKeyDown={e=>{
          if(!u){
            if(!m){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),D());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),f(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),g(e=>Math.min(e+1,d.length-1));else if("ArrowUp"===e.key)e.preventDefault(),g(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),g(0);else if("End"===e.key)e.preventDefault(),g(d.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),W(v);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=C.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=d.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&g(t)
            }
          }
        }} aria-label={_} className={s("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",h)}>
          <span className="flex min-w-0 items-center gap-2">
            {p}
            <span className={s("truncate",!E&&"text-neutral-900/66 dark:text-neutral-100/66")}>{E?E.label:b}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {m&&<ul ref={z} id={k} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={s("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",w?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {d.map((e,a)=>{
            let l=e.value===r;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={a} data-highlighted={a===v?"":undefined} onMouseEnter={()=>g(a)} onClick={()=>W(a)} className={s("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={s("text-[12px]/[16px] font-normal tabular-nums",c,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let f = ["Account","Workspace","Team","Finish"],
  v = ["United States (us-east)","Europe (eu-central)","Asia Pacific (ap-southeast)"],
  g = v.map(e=>({value:e,label:e}));

function w(){
  let[e,r]=useState(1),[a,o]=useState("Northwind"),[w,j]=useState("northwind"),[y,N]=useState(v[1]),[S,z]=useState(true),C=w.trim().toLowerCase().replace(/\s+/g,"-")||"workspace";
  return (
    <div className={s("bg-white dark:bg-neutral-950",d,"relative flex h-full min-h-[640px] w-full flex-col overflow-y-auto")}>
        <header className={s("border-b border-neutral-900/10 dark:border-neutral-100/14","shrink-0 px-6 py-5 sm:px-8")}>
          <ol className="mx-auto flex w-full max-w-[640px] items-center">
            {f.map((a,l)=>{
              let o=l<e,u=l===e;
              return (
                <li key={a} className={s("flex min-w-0 items-center gap-2",l<f.length-1&&"flex-1")}>
                            <button type="button" onClick={()=>r(l)} aria-current={u?"step":undefined} className={s("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","rounded-[var(--rb-r-sm,6px)]","flex min-w-0 cursor-pointer items-center gap-2 px-1 py-0.5")}>
                              <span aria-hidden="true" className={s("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",o?"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14":u?"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100":"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14")}>{o?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} />:l+1}</span>
                              <span className={s(b,"hidden truncate sm:block",o||u?d:c)}>
                                {a}
                                {o&&<span className="sr-only">, done</span>}
                                {u&&<span className="sr-only">, current</span>}
                              </span>
                            </button>
                            {l<f.length-1&&<span aria-hidden="true" className={o?"h-px min-w-4 flex-1 bg-neutral-900 dark:bg-neutral-100":"h-px min-w-4 flex-1 bg-neutral-900/8 dark:bg-neutral-100/8"} />}
                          </li>
              );
            })}
          </ol>
        </header>
        <div className="flex flex-1 items-center justify-center p-6 sm:p-8">
          <form onSubmit={e=>e.preventDefault()} className="mx-auto w-full max-w-[440px]">
            <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Create your workspace</h2>
            <p className={s(u,"text-neutral-900/80 dark:text-neutral-100/80","mt-1.5")}>This is the container for your projects, documents and members.</p>
            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="ob7-name" className={_}>Workspace name</label>
                <div className={s(h,"h-8")}>
                  <input id="ob7-name" value={a} onChange={e=>o(e.target.value)} placeholder="Acme" className={p} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ob7-slug" className={_}>Workspace URL</label>
                <div className={s(h,"h-8")}>
                  <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">northwind.app/</span>
                  <input id="ob7-slug" value={w} onChange={e=>j(e.target.value)} placeholder="workspace" aria-describedby="ob7-slug-hint" className={p} />
                </div>
                <p id="ob7-slug-hint" className={k}>
                  Members will reach it at northwind.app/
                  {C}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ob7-region" className={_}>Data region</label>
                <m id="ob7-region" value={y} onChange={N} options={g} />
                <p className={k}>Region is permanent once the workspace is created.</p>
              </div>
              <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                <div className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className={b}>Private workspace</p>
                    <p className={s(u,c,"mt-0.5")}>Only invited members can find or join it.</p>
                  </div>
                  <button type="button" role="switch" aria-checked={S} aria-label="Private workspace" onClick={()=>z(e=>!e)} className={s("group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40","-mt-0.5")}>
                    <span aria-hidden="true" className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <button type="button" onClick={()=>r(e=>Math.max(0,e-1))} className={s("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",x)}>Back</button>
              <button type="submit" onClick={()=>r(e=>Math.min(f.length-1,e+1))} className={s("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",x,"flex-1")}>Continue</button>
            </div>
          </form>
        </div>
      </div>
  );
}


export default w;
