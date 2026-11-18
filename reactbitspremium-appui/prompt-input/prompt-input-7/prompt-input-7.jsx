/**
 * React Bits Pro — Application UI (prompt-input-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_56988 = [["path",{d:"M20.4999 16.5V8.5C20.4999 6.14298 20.4999 4.96447 19.7676 4.23223C19.0354 3.5 17.8569 3.5 15.4999 3.5H8.49988C6.14286 3.5 4.96434 3.5 4.23211 4.23223C3.49988 4.96447 3.49988 6.14298 3.49988 8.5V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.9841 20.5H2.01567C1.63273 20.5 1.38367 20.1088 1.55493 19.7764L3.49988 16.5H20.4999L22.4448 19.7764C22.6161 20.1088 22.367 20.5 21.9841 20.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_22151 = [["path",{d:"M17.4776 10.0001C17.485 10 17.4925 10 17.5 10C19.9853 10 22 12.0147 22 14.5C22 16.9853 19.9853 19 17.5 19H7C4.23858 19 2 16.7614 2 14C2 11.4003 3.98398 9.26407 6.52042 9.0227M17.4776 10.0001C17.4924 9.83536 17.5 9.66856 17.5 9.5C17.5 6.46243 15.0376 4 12 4C9.12324 4 6.76233 6.20862 6.52042 9.0227M17.4776 10.0001C17.3753 11.1345 16.9286 12.1696 16.2428 13M6.52042 9.0227C6.67826 9.00768 6.83823 9 7 9C8.12582 9 9.16474 9.37209 10.0005 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  b = "text-[13px]/[18px] font-normal",
  x = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  _ = "size-7 rounded-[var(--rb-r-sm,6px)]",
  p = "inline-flex min-h-5 min-w-5 w-fit items-center justify-center gap-1 rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1 font-mono text-[12px]/[16px] tabular-nums text-neutral-900/80 dark:text-neutral-100/80 select-none",
  h = u(b,"text-neutral-900/66 dark:text-neutral-100/66"),
  m = ["Ask","Agent","Edit"],
  f = {Ask:"Answer from the model only. No tools run and nothing is changed.",Agent:"Plan and run tools to work through the task end to end.",Edit:"Apply changes straight to the files currently in context."},
  k = [{name:"Local",hint:"Runs on this machine",icon:Icon_56988},{name:"Cloud",hint:"Runs on a hosted sandbox",icon:Icon_22151}],
  v = [{name:"Atlas",hint:"Balanced speed and depth"},{name:"Atlas Pro",hint:"Deepest reasoning"},{name:"Quill",hint:"Fastest, for short tasks"}];

function g({label:e,options:r,value:t,onChange:i,showSelectedIcon:o=false,triggerMaxWidth:d}){
  let[b,x]=useState(false),[_,p]=useState(false),[m,f]=useState(0),k=useRef(null),v=useRef(null),g=useRef(null),w=useRef(undefined);
  useEffect(()=>{
    if(!b)return;
    let e=k.current?.ownerDocument??document,r=e=>{
      k.current?.contains(e.target)||(x(false),p(false))
    };
    return e.addEventListener("pointerdown",r),()=>e.removeEventListener("pointerdown",r);
  }, [b]),useEffect(()=>{
    b&&g.current?.focus({preventScroll:true})
  }, [b]),useEffect(()=>()=>cancelAnimationFrame(w.current??0), []);
  let y=(e,r)=>{
    f(e),x(true),r?(p(false),w.current=requestAnimationFrame(()=>p(true))):p(true)
  },j=(e=true)=>{
    x(false),p(false),e&&v.current?.focus({preventScroll:true})
  },N=e=>{
    i(r[e].name),j()
  },z=r.find(e=>e.name===t)?.icon;
  return (
    <div ref={k} className="relative">
        {b&&<div ref={g} role="listbox" aria-label={e} tabIndex={-1} onKeyDown={e=>{
          switch(e.key){case"Escape":e.preventDefault(),j();break;case"ArrowDown":e.preventDefault(),f(e=>(e+1)%r.length);break;case"ArrowUp":e.preventDefault(),f(e=>(e-1+r.length)%r.length);break;case"Home":e.preventDefault(),f(0);break;case"End":e.preventDefault(),f(r.length-1);break;case"Enter":case" ":e.preventDefault(),N(m);break;case"Tab":j(false)}
        }} className={u("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","absolute bottom-full left-0 z-30 mb-2 w-[256px]",_?"opacity-100":"opacity-0")}>
          {r.map((e,r)=>{
            let n=e.name===t;
            return (
              <button key={e.name} type="button" role="option" aria-selected={n} data-highlighted={r===m||undefined} tabIndex={-1} onClick={()=>N(r)} onPointerMove={()=>f(r)} className={u("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","gap-2.5 pe-8")}>
                        {e.icon&&<HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" />}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{e.name}</span>
                          <span className={u(h,"block truncate")}>{e.hint}</span>
                        </span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="absolute end-2" />}
                      </button>
            );
          })}
        </div>}
        <button ref={v} type="button" aria-haspopup="listbox" aria-expanded={b} aria-label={`${e}: ${t}`} onClick={()=>b?j():y(0,true)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),y(0,false)):"ArrowUp"===e.key&&(e.preventDefault(),y(r.length-1,false))
        }} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>
          {o&&z&&<HugeiconsIcon icon={z} size={16} strokeWidth={1.8} aria-hidden="true" />}
          <span className={u("truncate",d)}>{t}</span>
          <HugeiconsIcon icon={Icon_20148} size={12} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
  );
}

function w(){
  let[e,r]=useState(""),[t,i]=useState("Agent"),[o,s]=useState(k[0].name),[c,w]=useState(v[0].name),[y,j]=useState(false),N=useRef(null),z=useRef(undefined);
  useEffect(()=>{
    let e=N.current;
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
  }, [e]),useEffect(()=>()=>clearTimeout(z.current), []);
  let A=e.trim().length>0&&!y,D=()=>{
    A&&(j(true),r(""),z.current=setTimeout(()=>j(false),1800))
  };
  return (
    <div className={u("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full w-full min-h-[400px] flex-col overflow-hidden")}>
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-8 sm:px-6">
          <div className="relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8">
            <textarea ref={N} rows={1} value={e} onChange={e=>r(e.target.value)} onKeyDown={e=>{
              "Enter"!==e.key||e.shiftKey||(e.preventDefault(),D())
            }} placeholder="Ask anything" aria-label="Message" className={u("max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66","block max-h-[200px] min-h-[116px] w-full px-4 pb-2 pt-4")} />
            <div className="flex flex-wrap items-center gap-2 px-4 pb-4 pt-1">
              <div role="radiogroup" aria-label="Response mode" onKeyDown={e=>{
                let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
                if(0===r)return;
                e.preventDefault();
                let a=m.indexOf(t),n=m[(a+r+m.length)%m.length];
                i(n);
                let l=e.currentTarget;
                l.querySelectorAll("button")[m.indexOf(n)]?.focus({preventScroll:true})
              }} className={u("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-7")}>
                {m.map(e=>{
                  let r=e===t;
                  return <button key={e} type="button" role="radio" aria-checked={r} tabIndex={r?0:-1} onClick={()=>i(e)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e}</button>;
                })}
              </div>
              <g label="Runtime" options={k} value={o} onChange={s} showSelectedIcon />
              <g label="Model" options={v} value={c} onChange={w} triggerMaxWidth="max-w-[9rem]" />
              {y?<button type="button" onClick={()=>{
                clearTimeout(z.current),j(false)
              }} aria-label="Stop generating" className={u(x,_,"ml-auto")}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button type="button" aria-label="Send" disabled={!A} onClick={D} className={u(x,_,"ml-auto")}>
                <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>}
            </div>
          </div>
          <div className="mt-3 space-y-2 px-4">
            <p className={u(b,"text-neutral-900/80 dark:text-neutral-100/80")}>{f[t]}</p>
            <div className={u(h,"flex flex-wrap items-center gap-x-4 gap-y-2")}>
              <span className="inline-flex items-center gap-1.5">
                <kbd className={p}>Enter</kbd>
                to send
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className={p}>Shift Enter</kbd>
                for a new line
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}


export default w;
