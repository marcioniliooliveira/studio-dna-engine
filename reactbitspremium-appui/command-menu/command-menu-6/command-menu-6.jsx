/**
 * React Bits Pro — Application UI (command-menu-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_4086 = [["path",{d:"M14 21L18 3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6 21L10 3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 8H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 16H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_68820 = [["path",{d:"M5 15H12C15.7712 15 17.6569 15 18.8284 13.8284C20 12.6569 20 10.7712 20 7V4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.99996 20C8.99996 20 4.00001 16.3176 4 15C3.99999 13.6824 9 10 9 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[13px]/[18px] font-normal",
  b = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  p = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  m = d(x,"text-neutral-900/80 dark:text-neutral-100/80"),
  f = d(x,u),
  v = [{id:"northwind",name:"Northwind",meta:"Active now",shortcut:"1"},{id:"aurora",name:"Aurora mobile",meta:"Active 4m ago",shortcut:"2"},{id:"ledger",name:"Ledger billing",meta:"Active 1h ago",shortcut:"3"},{id:"atlas",name:"Atlas search platform",meta:"Active yesterday",shortcut:"4"},{id:"relay",name:"Relay notifications",meta:"Active 2 days ago",shortcut:"5"},{id:"vault",name:"Vault access control",meta:"Active last week",shortcut:"6"}];

function k({children:e}){
  return <kbd className="inline-flex min-h-5 min-w-5 w-fit items-center justify-center gap-1 rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1 font-mono text-[12px]/[16px] tabular-nums text-neutral-900/80 dark:text-neutral-100/80 select-none">{e}</kbd>;
}

function g(){
  let e=useId(),t=useRef(null),r=useRef(null),{ref:x,edges:g,onScroll:_}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:l,clientHeight:n}=t;
      r({start:a>1,end:Math.ceil(a+n)<l-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),w=useRef(null),y=useRef(null),j=useRef(undefined),N=useRef(undefined),[S,D]=useState(true),[A,C]=useState(true),[R,z]=useState("northwind"),[$,E]=useState(""),[T,M]=useState(0),K=`${e}-listbox`,L=useMemo(()=>{
    let e=$.trim().toLowerCase();
    return e?v.filter(t=>t.name.toLowerCase().includes(e)):v;
  }, [$]),W=Math.min(T,Math.max(L.length-1,0)),I=L[W],F=I?`${e}-${I.id}`:undefined,H=v.find(e=>e.id===R)??v[0];
  useEffect(()=>{
    S&&w.current?.focus({preventScroll:true})
  }, [S]),useEffect(()=>{
    let e=x.current,t=e?.querySelector('[data-active="true"]');
    if(!e||!t)return;
    let r=e.getBoundingClientRect(),a=t.getBoundingClientRect();
    if(a.top<r.top+32){
      let t=e.scrollTop-(r.top+32-a.top);
      e.scrollTop=t<32?0:t
    }else if(a.bottom>r.bottom-32){
      let t=e.scrollHeight-e.clientHeight,l=e.scrollTop+(a.bottom-r.bottom+32);
      e.scrollTop=l>t-32?t:l
    }
  }, [W,$,x]),useEffect(()=>()=>{
    cancelAnimationFrame(j.current??0),clearTimeout(N.current)
  }, []);
  let P=useCallback(e=>{
    clearTimeout(N.current),D(true),e?(C(false),j.current=requestAnimationFrame(()=>C(true))):C(true)
  }, []),B=useCallback(()=>{
    C(false),clearTimeout(N.current),N.current=setTimeout(()=>{
      D(false),y.current?.focus({preventScroll:true})
    },140)
  }, []);
  useEffect(()=>{
    let e=t.current?.ownerDocument??document,r=e=>{
      (e.metaKey||e.ctrlKey)&&"k"===e.key.toLowerCase()&&(e.preventDefault(),P(false))
    };
    return e.addEventListener("keydown",r),()=>e.removeEventListener("keydown",r);
  }, [P]);
  let O=useCallback(e=>{
    z(e.id),E(""),M(0),B()
  }, [B]),q=e=>{
    let t=L.length;
    0!==t&&M((W+e+t)%t)
  };
  return (
    <section ref={t} className={d("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={y} type="button" aria-haspopup="dialog" aria-expanded={S} onClick={()=>P(true)} className={d(h,p,"max-w-full")}>
          <span className="max-w-40 truncate">{H.name}</span>
          <HugeiconsIcon icon={Icon_20148} size={16} strokeWidth={1.8} aria-hidden="true" className={d(u,"shrink-0")} />
          <k>⌘K</k>
        </button>
        {S&&<>
          <button type="button" tabIndex={-1} aria-label="Close menu" onClick={B} className={d("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-40 cursor-default",A?"opacity-100":d(b,"opacity-0"))} />
          <div ref={r} role="dialog" aria-modal="true" aria-labelledby={`${e}-title`} onKeyDown={e=>{
            if("Escape"===e.key){
              e.preventDefault(),B();
              return
            }
            if("Tab"!==e.key)return;
            let t=r.current;
            if(!t)return;
            let a=Array.from(t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
            if(0===a.length)return;
            let l=a[0],n=a[a.length-1],o=t.ownerDocument.activeElement;
            e.shiftKey&&o===l?(e.preventDefault(),n.focus({preventScroll:true})):e.shiftKey||o!==n||(e.preventDefault(),focus({preventScroll:true}))
          }} className={d("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","absolute left-1/2 top-[10%] z-50 max-h-[min(86%,calc(100%-4rem))] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2",A?"opacity-100":d(b,"opacity-0"))}>
            <h2 id={`${e}-title`} className="sr-only">Switch room</h2>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
              <div className={d("flex min-h-10 shrink-0 items-center gap-2 border-b border-neutral-900/8 ps-4 pe-2 text-neutral-900/66 dark:text-neutral-100/66 has-[input:focus-visible]:border-transparent has-[input:focus-visible]:shadow-[inset_0_0_0_1px_var(--rb-accent,oklch(20.5%_0_0))] dark:border-neutral-100/8 dark:has-[input:focus-visible]:shadow-[inset_0_0_0_1px_var(--rb-accent,oklch(100%_0_0))]","h-12")}>
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                <label htmlFor={`${e}-input`} className="sr-only">Find a room</label>
                <input ref={w} id={`${e}-input`} role="combobox" aria-expanded="true" aria-controls={K} aria-activedescendant={F} aria-autocomplete="list" value={$} onChange={e=>{
                  E(e.target.value),M(0)
                }} onKeyDown={e=>{
                  if(""===$&&/^[1-6]$/.test(e.key)){
                    let t=v.find(t=>t.shortcut===e.key);
                    if(t){
                      e.preventDefault(),O(t);
                      return
                    }
                  }
                  switch(e.key){case"ArrowDown":e.preventDefault(),q(1);break;case"ArrowUp":e.preventDefault(),q(-1);break;case"Home":e.preventDefault(),M(0);break;case"End":e.preventDefault(),M(Math.max(L.length-1,0));break;case"Enter":if(!I)break;e.preventDefault(),O(I)}
                }} placeholder="Find a room" className="h-full min-w-0 flex-1 bg-transparent text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
              </div>
              <div className="relative min-h-0 flex-1">
                <div ref={x} onScroll={_} className="h-full overflow-y-auto p-2">
                  {L.length>0?<div id={K} role="listbox" aria-label="Rooms">
                    {L.map((t,r)=>{
                      let l=r===W,o=t.id===R;
                      return (
                        <button key={t.id} id={`${e}-${t.id}`} role="option" aria-selected={l} data-active={l} data-highlighted={l||undefined} type="button" tabIndex={-1} onPointerMove={()=>M(r)} onMouseDown={e=>{
                                            e.preventDefault(),O(t)
                                          }} className={d("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","min-h-11")}>
                                            <HugeiconsIcon icon={Icon_4086} size={16} strokeWidth={1.8} aria-hidden="true" />
                                            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                              <span className="truncate">{t.name}</span>
                                              <span className={d(m,"truncate")}>{o?"Current room":t.meta}</span>
                                            </span>
                                            <k>{t.shortcut}</k>
                                          </button>
                      );
                    })}
                  </div>:<div className="flex flex-col items-center px-2.5 py-10 text-center">
                    <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No room by that name</p>
                    <p className={d("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-xs text-balance")}>Clear the search to see all six rooms.</p>
                    <button type="button" onMouseDown={e=>{
                      e.preventDefault(),E(""),M(0),w.current?.focus({preventScroll:true})
                    }} className={d(h,p,"mt-4")}>Clear search</button>
                  </div>}
                </div>
                <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",g.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",g.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
            <div className={d(f,"flex h-10 shrink-0 items-center gap-4 px-5")}>
              <span className="inline-flex items-center gap-1.5">
                <k>
                  <HugeiconsIcon icon={Icon_68820} size={12} strokeWidth={1.8} aria-hidden="true" />
                </k>
                to switch
              </span>
              <span className="ml-auto inline-flex shrink-0 items-center gap-1.5">
                <k>1</k>
                <span aria-hidden="true">–</span>
                <k>6</k>
                to jump
              </span>
            </div>
          </div>
        </>}
      </section>
  );
}


export default g;
