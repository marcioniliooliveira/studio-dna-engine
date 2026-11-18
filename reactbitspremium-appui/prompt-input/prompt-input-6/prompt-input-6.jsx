/**
 * React Bits Pro — Application UI (prompt-input-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_15665 = [["path",{d:"M8 7L16 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 11L12 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5M20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2C8.22877 2 6.34315 2 5.17157 3.17157C4 4.34314 4 6.22876 4 10L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_4086 = [["path",{d:"M14 21L18 3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6 21L10 3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 8H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 16H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_2605 = [["path",{d:"M15.6 8.40033V12.9003C15.6 14.3915 16.8088 15.6003 18.3 15.6003C19.7912 15.6003 21 14.3915 21 12.9003V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.0265 21 15.8965 20.3302 17.4009 19.2M15.6 12.0003C15.6 13.9886 13.9882 15.6003 12 15.6003C10.0118 15.6003 8.4 13.9886 8.4 12.0003C8.4 10.0121 10.0118 8.40033 12 8.40033C13.9882 8.40033 15.6 10.0121 15.6 12.0003Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  p = "size-7 rounded-[var(--rb-r-sm,6px)]",
  h = b("text-[13px]/[18px] font-normal",x),
  m = {file:Icon_15665,channel:Icon_4086,person:Icon_34951},
  f = [{type:"file",label:"pricing.ts",group:"Files"},{type:"file",label:"checkout.tsx",group:"Files"},{type:"person",label:"Marcus Lindqvist",group:"People"},{type:"channel",label:"launch",group:"Channels"}],
  k = [{type:"file",label:"auth-service.ts"},{type:"channel",label:"billing"},{type:"person",label:"Dana Whitfield"}];

function v(){
  let[e,r]=useState(""),[t,i]=useState(k),[o,s]=useState(false),[v,g]=useState(0),[w,y]=useState(false),[j,N]=useState(),z=useRef(null),A=useRef(null),D=useRef(null),S=useRef(null),E=useId(),R=useRef(undefined);
  useEffect(()=>{
    let e=S.current;
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
  }, [e]),useEffect(()=>()=>clearTimeout(R.current), []);
  let W=useMemo(()=>{
    let r=e.match(/@(\w*)$/);
    return r?r[1].toLowerCase():null;
  }, [e]),C=useMemo(()=>null===W?[]:f.filter(e=>e.label.toLowerCase().includes(W)&&!t.some(r=>r.label===e.label)), [W,t]),M=C.length>0&&!w&&!o,$=Math.min(v,Math.max(0,C.length-1)),T=e.trim().length>0&&!w;
  useLayoutEffect(()=>{
    if(!M)return;
    let e=z.current,r=A.current;
    e&&r&&N(Math.min(140,Math.max(r.getBoundingClientRect().top-e.getBoundingClientRect().top-16,72)))
  }, [M,C.length]),useEffect(()=>{
    if(!M)return;
    let e=D.current,r=e?.children[$];
    if(!(r instanceof HTMLElement)||!e)return;
    let t=r.offsetTop,a=t+r.offsetHeight;
    t<e.scrollTop?e.scrollTop=t:a>e.scrollTop+e.clientHeight&&(e.scrollTop=a-e.clientHeight)
  }, [$,M]);
  let H=e=>{
    i(r=>[...r,{type:e.type,label:e.label}]),r(e=>e.replace(/@(\w*)$/,"")),S.current?.focus({preventScroll:true})
  },F=()=>{
    T&&(y(true),r(""),R.current=setTimeout(()=>y(false),1800))
  };
  return (
    <div ref={z} className={b("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full w-full min-h-[400px] flex-col overflow-hidden")}>
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-8 sm:px-6">
          <div ref={A} className="relative w-full">
            {M&&<div id={`${E}-menu`} ref={D} role="listbox" aria-label="Add context" style={{maxHeight:j}} className={b("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute bottom-full left-0 z-30 mb-2 max-h-[140px] w-[288px]")}>
              {C.map((e,r)=>(
                <button key={e.label} id={`${E}-option-${r}`} type="button" role="option" aria-selected={r===$} tabIndex={-1} onClick={()=>H(e)} onPointerMove={()=>g(r)} className={b("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","gap-2.5")}>
                            <HugeiconsIcon icon={m[e.type]} size={14} strokeWidth={1.8} aria-hidden="true" />
                            <span className="min-w-0 flex-1 truncate">{e.label}</span>
                            <span className={b("text-[12px]/[16px] font-normal tabular-nums",x,"shrink-0")}>{e.group}</span>
                          </button>
              ))}
            </div>}
            <div className="relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8">
              {t.length>0&&<div className="flex flex-wrap gap-1.5 px-4 pt-3">
                {t.map(e=>(
                  <span key={e.label} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                                <HugeiconsIcon icon={m[e.type]} size={14} strokeWidth={1.8} aria-hidden="true" className={x} />
                                <span className="min-w-0 truncate">{e.label}</span>
                                <button type="button" aria-label={`Remove ${e.label}`} onClick={()=>i(r=>r.filter(r=>r.label!==e.label))} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                                  <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                                </button>
                              </span>
                ))}
              </div>}
              <textarea ref={S} rows={1} value={e} onChange={e=>{
                var t;
                return t=e.target.value,void(s(false),g(0),r(t));
              }} onKeyDown={e=>{
                if(M)switch(e.key){case"Escape":e.preventDefault(),s(true);return;case"ArrowDown":e.preventDefault(),g(e=>(e+1)%C.length);return;case"ArrowUp":e.preventDefault(),g(e=>(e-1+C.length)%C.length);return;case"Home":e.preventDefault(),g(0);return;case"End":e.preventDefault(),g(C.length-1);return;case"Enter":case"Tab":e.preventDefault(),H(C[$]);return}
                "Enter"!==e.key||e.shiftKey||(e.preventDefault(),F())
              }} placeholder="Ask anything" aria-label="Message" role="combobox" aria-expanded={M} aria-controls={M?`${E}-menu`:undefined} aria-activedescendant={M?`${E}-option-${$}`:undefined} aria-autocomplete="list" className={b("max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66","block max-h-[200px] min-h-[52px] w-full px-4 py-3.5")} />
              <div className="flex items-center gap-1 pb-2.5 pe-2.5 ps-2 pt-1">
                <button type="button" onClick={()=>{
                  r(e=>`${e}@`),S.current?.focus({preventScroll:true})
                }} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-6 gap-1 rounded-[var(--rb-r-sm,6px)] px-2 text-[12px]/[16px] font-[450] tabular-nums")}>
                  <HugeiconsIcon icon={Icon_2605} size={14} strokeWidth={1.8} aria-hidden="true" />
                  Add context
                </button>
                {w?<button type="button" onClick={()=>{
                  clearTimeout(R.current),y(false)
                }} aria-label="Stop generating" className={b(_,p,"ml-auto")}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button type="button" aria-label="Send" disabled={!T} onClick={F} className={b(_,p,"ml-auto")}>
                  <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>}
              </div>
            </div>
            <p className={b(h,"mt-3 px-1")}>Type @ to pull a file, person, or channel into context.</p>
          </div>
        </div>
      </div>
  );
}


export default v;
