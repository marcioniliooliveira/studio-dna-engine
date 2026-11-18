/**
 * React Bits Pro — Application UI (prompt-input-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_78805 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 15H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 9H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  x = "h-6 gap-1 rounded-[var(--rb-r-sm,6px)] px-2 text-[12px]/[16px] font-[450] tabular-nums",
  _ = "size-7 rounded-[var(--rb-r-sm,6px)]",
  p = d("text-[13px]/[18px] font-normal",u),
  h = [{name:"Atlas",hint:"Best for coding"},{name:"Ember",hint:"Fast, general purpose"},{name:"Atlas Long",hint:"Long context"}];

function m({label:e,options:r,value:t,onChange:s,triggerMaxWidth:c}){
  let[u,b]=useState(false),[_,h]=useState(false),[m,f]=useState(0),k=useRef(null),v=useRef(null),g=useRef(null),w=useRef(undefined);
  useEffect(()=>{
    if(!u)return;
    let e=k.current?.ownerDocument??document,r=e=>{
      k.current?.contains(e.target)||(b(false),h(false))
    };
    return e.addEventListener("pointerdown",r),()=>e.removeEventListener("pointerdown",r);
  }, [u]),useEffect(()=>{
    u&&g.current?.focus({preventScroll:true})
  }, [u]),useEffect(()=>()=>cancelAnimationFrame(w.current??0), []);
  let y=(e,r)=>{
    f(e),b(true),r?(h(false),w.current=requestAnimationFrame(()=>h(true))):h(true)
  },j=(e=true)=>{
    b(false),h(false),e&&v.current?.focus({preventScroll:true})
  },N=e=>{
    s(r[e].name),j()
  };
  return (
    <div ref={k} className="relative">
        {u&&<div ref={g} role="listbox" aria-label={e} tabIndex={-1} onKeyDown={e=>{
          switch(e.key){case"Escape":e.preventDefault(),j();break;case"ArrowDown":e.preventDefault(),f(e=>(e+1)%r.length);break;case"ArrowUp":e.preventDefault(),f(e=>(e-1+r.length)%r.length);break;case"Home":e.preventDefault(),f(0);break;case"End":e.preventDefault(),f(r.length-1);break;case"Enter":case" ":e.preventDefault(),N(m);break;case"Tab":j(false)}
        }} className={d("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","absolute bottom-full left-0 z-30 mb-2 w-[256px]",_?"opacity-100":"opacity-0")}>
          {r.map((e,r)=>{
            let n=e.name===t;
            return (
              <button key={e.name} type="button" role="option" aria-selected={n} data-highlighted={r===m||undefined} tabIndex={-1} onClick={()=>N(r)} onPointerMove={()=>f(r)} className={d("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","gap-2.5 pe-8")}>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{e.name}</span>
                          <span className={d(p,"block truncate")}>{e.hint}</span>
                        </span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="absolute end-2" />}
                      </button>
            );
          })}
        </div>}
        <button ref={v} type="button" aria-haspopup="listbox" aria-expanded={u} aria-label={`${e}: ${t}`} onClick={()=>u?j():y(0,true)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),y(0,false)):"ArrowUp"===e.key&&(e.preventDefault(),y(r.length-1,false))
        }} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40",x)}>
          <span className={d("truncate",c)}>{t}</span>
          <HugeiconsIcon icon={Icon_20148} size={12} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
  );
}

function f(){
  let[e,r]=useState("Refactor the checkout flow to use the new pricing service.\nKeep the existing analytics events intact, add a feature flag for a 10% rollout, and write a short migration note for the on-call engineer covering the rollback steps."),[t,i]=useState(h[0].name),[o,f]=useState(true),[k,v]=useState(false),g=useRef(null),w=useRef(undefined);
  useEffect(()=>{
    let e=g.current;
    if(!e)return;
    let r=()=>{
      e.style.height="auto",0!==e.scrollHeight&&(e.style.height=`${Math.min(e.scrollHeight,200)}px`)
    };
    r();
    let t=requestAnimationFrame(r);
    e.ownerDocument.fonts?.ready.then(r).catch(()=>{});
    let a=e.clientWidth,n=new ResizeObserver(()=>{
      e.clientWidth!==a&&(a=e.clientWidth,r())
    });
    return observe(e),()=>{
      cancelAnimationFrame(t),disconnect()
    };
  }, [e]),useEffect(()=>()=>clearTimeout(w.current), []);
  let y=useMemo(()=>Math.min(8e3,128+6*(e.trim()?e.trim().split(/\s+/).length:0)), [e]),j=e.trim().length>0&&!k,N=()=>{
    j&&(v(true),r(""),w.current=setTimeout(()=>v(false),1800))
  };
  return (
    <div className={d("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full w-full min-h-[400px] flex-col overflow-hidden")}>
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-8 sm:px-6">
          <div className="relative w-full">
            <div className="relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8">
              <textarea ref={g} rows={1} value={e} onChange={e=>r(e.target.value)} onKeyDown={e=>{
                "Enter"!==e.key||e.shiftKey||(e.preventDefault(),N())
              }} placeholder="Ask anything" aria-label="Message" className={d("max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66","block max-h-[200px] min-h-[52px] w-full px-4 py-3.5")} />
              <div className="flex flex-wrap items-center gap-1 pb-2.5 pe-2.5 ps-2 pt-1">
                <m label="Model" options={h} value={t} onChange={i} triggerMaxWidth="max-w-[9rem]" />
                <button type="button" aria-pressed={o} onClick={()=>f(e=>!e)} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",x)}>
                  <HugeiconsIcon icon={Icon_78805} size={14} strokeWidth={1.8} aria-hidden="true" />
                  Search
                </button>
                <div className="ml-auto flex items-center gap-2.5">
                  <span className={d("text-[12px]/[16px] font-normal tabular-nums",u,"min-w-[4.5rem] text-right")}>
                    {y.toLocaleString()}
                    {" / 8K"}
                  </span>
                  {k?<button type="button" onClick={()=>{
                    clearTimeout(w.current),v(false)
                  }} aria-label="Stop generating" className={d(b,_)}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button type="button" aria-label="Send" disabled={!j} onClick={N} className={d(b,_)}>
                    <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>}
                </div>
              </div>
            </div>
            <p className={d(p,"mt-3 px-1")}>Responses can be inaccurate: check anything important.</p>
          </div>
        </div>
      </div>
  );
}


export default f;
