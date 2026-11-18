/**
 * React Bits Pro — Application UI (command-menu-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, getElementById, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_92881 = [["path",{d:"M3 19C3 18.535 3 18.3025 3.05111 18.1118C3.18981 17.5941 3.59413 17.1898 4.11177 17.0511C4.30252 17 4.53501 17 5 17H8C8.46499 17 8.69748 17 8.88823 17.0511C9.40587 17.1898 9.81019 17.5941 9.94889 18.1118C10 18.3025 10 18.535 10 19C10 19.465 10 19.6975 9.94889 19.8882C9.81019 20.4059 9.40587 20.8102 8.88823 20.9489C8.69748 21 8.46499 21 8 21H5C4.53501 21 4.30252 21 4.11177 20.9489C3.59413 20.8102 3.18981 20.4059 3.05111 19.8882C3 19.6975 3 19.465 3 19Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 5C14 4.53501 14 4.30252 14.0511 4.11177C14.1898 3.59413 14.5941 3.18981 15.1118 3.05111C15.3025 3 15.535 3 16 3H19C19.465 3 19.6975 3 19.8882 3.05111C20.4059 3.18981 20.8102 3.59413 20.9489 4.11177C21 4.30252 21 4.53501 21 5C21 5.46499 21 5.69748 20.9489 5.88823C20.8102 6.40587 20.4059 6.81019 19.8882 6.94889C19.6975 7 19.465 7 19 7H16C15.535 7 15.3025 7 15.1118 6.94889C14.5941 6.81019 14.1898 6.40587 14.0511 5.88823C14 5.69748 14 5.46499 14 5Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M9 12H8.5C6.567 12 5 10.433 5 8.5C5 6.567 6.56687 5 8.49987 5H14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10 19H15.5C17.433 19 19 17.433 19 15.5C19 13.567 17.4336 12 15.5006 12H15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10.6325 10.467C11.277 9.82235 11.5993 9.50001 11.9998 9.5C12.4003 9.49999 12.7226 9.82229 13.3672 10.4669L13.5332 10.6329C14.1777 11.2774 14.5 11.5997 14.5 12.0002C14.5 12.4007 14.1777 12.723 13.5331 13.3675L13.3673 13.5333C12.7227 14.1778 12.4005 14.5 12 14.5C11.5996 14.5 11.2773 14.1778 10.6328 13.5333L10.4669 13.3674C9.82231 12.7229 9.50003 12.4007 9.5 12.0002C9.49997 11.5997 9.82221 11.2774 10.4667 10.6329L10.6325 10.467Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_68820 = [["path",{d:"M5 15H12C15.7712 15 17.6569 15 18.8284 13.8284C20 12.6569 20 10.7712 20 7V4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.99996 20C8.99996 20 4.00001 16.3176 4 15C3.99999 13.6824 9 10 9 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-[13px]/[18px] font-normal",
  b = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  p = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  m = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  f = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  v = u(x,"text-neutral-900/80 dark:text-neutral-100/80"),
  k = u(x,"text-neutral-900/66 dark:text-neutral-100/66");

function g(){
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
}

let _ = {Doc:Icon_31964,Person:Icon_34951,Workflow:Icon_92881},
  w = {Doc:"bg-[oklch(89%_0.05_195)] text-[oklch(38%_0.062_195)] dark:bg-[oklch(30%_0.045_195)] dark:text-[oklch(88%_0.055_195)]",Person:"bg-[oklch(89%_0.05_320)] text-[oklch(38%_0.062_320)] dark:bg-[oklch(30%_0.045_320)] dark:text-[oklch(88%_0.055_320)]",Workflow:"bg-[oklch(89%_0.05_250)] text-[oklch(38%_0.062_250)] dark:bg-[oklch(30%_0.045_250)] dark:text-[oklch(88%_0.055_250)]"},
  y = [{id:"r-readiness",kind:"Doc",title:"Launch readiness review",subtitle:["Runbook","Aurora mobile 2.4"],facts:[{label:"Owner",value:"Priya Anand"},{label:"Section",value:"Release"},{label:"Updated",value:"6m ago"}],summary:"Gate checklist covering rollout stages, alerting thresholds, and the rollback owner for the 2.4 launch."},{id:"r-latency",kind:"Doc",title:"Checkout latency postmortem",subtitle:["Incident 4821"],facts:[{label:"Owner",value:"Marcus Reed"},{label:"Section",value:"Reliability"},{label:"Updated",value:"1h ago"}],summary:"Root cause of the p95 spike at checkout, the mitigation shipped, and follow-up work to prevent recurrence."},{id:"r-rollback",kind:"Doc",title:"Rollback procedure for staged deploys",subtitle:["Runbook","Platform"],facts:[{label:"Owner",value:"Priya Anand"},{label:"Section",value:"Release"},{label:"Updated",value:"3 days ago"}],summary:"Step-by-step revert for a canary that fails its error gate, including who to page and what to post."},{id:"r-priya",kind:"Person",title:"Priya Anand",subtitle:["Staff engineer","Release"],facts:[{label:"Team",value:"Release"},{label:"Timezone",value:"GMT+1"},{label:"Reviews",value:"18"}],summary:"Owns launch readiness for mobile. Point of contact for rollout gates and staged deploys."},{id:"r-marcus",kind:"Person",title:"Marcus Reed",subtitle:["Senior engineer","Reliability"],facts:[{label:"Team",value:"Reliability"},{label:"Timezone",value:"GMT−5"},{label:"Reviews",value:"24"}],summary:"Runs the incident rotation this week. Best reached in the reliability channel for pages."},{id:"r-deploy",kind:"Workflow",title:"Staged deploy to production",subtitle:["Runs on merge to main"],facts:[{label:"Last run",value:"Passed"},{label:"Duration",value:"6m 40s"},{label:"Steps",value:"9"}],summary:"Promotes a build through canary and full rollout with automatic rollback if error rate exceeds the gate."},{id:"r-rotate",kind:"Workflow",title:"Rotate signing keys",subtitle:["Runs weekly, Mondays"],facts:[{label:"Last run",value:"Passed"},{label:"Duration",value:"48s"},{label:"Steps",value:"4"}],summary:"Issues a fresh signing key, updates the secret store, and revokes the previous key after a grace window."},{id:"r-backup",kind:"Workflow",title:"Nightly database backup",subtitle:["Runs daily, 02:00 UTC"],facts:[{label:"Last run",value:"Passed"},{label:"Duration",value:"11m 02s"},{label:"Steps",value:"3"}],summary:"Snapshots the primary cluster to cold storage and verifies the restore path against a scratch instance."}],
  j = [{id:"all",label:"All"},{id:"Doc",label:"Docs"},{id:"Person",label:"People"},{id:"Workflow",label:"Workflows"}];

function N({children:e}){
  return <kbd className="inline-flex min-h-5 min-w-5 w-fit items-center justify-center gap-1 rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1 font-mono text-[12px]/[16px] tabular-nums text-neutral-900/80 dark:text-neutral-100/80 select-none">{e}</kbd>;
}

function S(){
  let e=useId(),t=useRef(null),r=useRef(null),{ref:o,edges:i,onScroll:s}=g(),{ref:x,edges:S,onScroll:D}=g(),A=useRef(null),C=useRef(null),R=useRef(undefined),z=useRef(undefined),[$,E]=useState(true),[T,M]=useState(true),[K,L]=useState(""),[W,I]=useState("all"),[F,H]=useState(0),P=`${e}-listbox`,B=useMemo(()=>{
    let e=K.trim().toLowerCase();
    return y.filter(t=>("all"===W||t.kind===W)&&(!e||`${t.title} ${t.subtitle.join(" ")} ${t.summary}`.toLowerCase().includes(e)));
  }, [K,W]),O=Math.min(F,Math.max(B.length-1,0)),q=B[O],U=q?`${e}-${q.id}`:undefined;
  useEffect(()=>{
    $&&A.current?.focus({preventScroll:true})
  }, [$]),useEffect(()=>{
    let e=o.current,t=e?.querySelector('[data-active="true"]');
    if(!e||!t)return;
    let r=e.getBoundingClientRect(),a=t.getBoundingClientRect();
    if(a.top<r.top+32){
      let t=e.scrollTop-(r.top+32-a.top);
      e.scrollTop=t<32?0:t
    }else if(a.bottom>r.bottom-32){
      let t=e.scrollHeight-e.clientHeight,l=e.scrollTop+(a.bottom-r.bottom+32);
      e.scrollTop=l>t-32?t:l
    }
  }, [O,K,W,o]),useEffect(()=>()=>{
    cancelAnimationFrame(R.current??0),clearTimeout(z.current)
  }, []);
  let V=useCallback(e=>{
    clearTimeout(z.current),E(true),e?(M(false),R.current=requestAnimationFrame(()=>M(true))):M(true)
  }, []),G=useCallback(()=>{
    M(false),clearTimeout(z.current),z.current=setTimeout(()=>{
      E(false),C.current?.focus({preventScroll:true})
    },140)
  }, []);
  useEffect(()=>{
    let e=t.current?.ownerDocument??document,r=e=>{
      (e.metaKey||e.ctrlKey)&&"k"===e.key.toLowerCase()&&(e.preventDefault(),V(false))
    };
    return e.addEventListener("keydown",r),()=>e.removeEventListener("keydown",r);
  }, [V]);
  let Q=useCallback(()=>{
    L(""),H(0),G()
  }, [G]),J=e=>{
    let t=B.length;
    0!==t&&H((O+e+t)%t)
  };
  return (
    <section ref={t} className={u("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={C} type="button" aria-haspopup="dialog" aria-expanded={$} onClick={()=>V(true)} className={u(h,p,"w-80 max-w-full")}>
          <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
          <span className="min-w-0 flex-1 truncate text-left">Search docs, people, workflows</span>
          <N>⌘K</N>
        </button>
        {$&&<>
          <button type="button" tabIndex={-1} aria-label="Close search" onClick={G} className={u("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-40 cursor-default",T?"opacity-100":u(b,"opacity-0"))} />
          <div ref={r} role="dialog" aria-modal="true" aria-labelledby={`${e}-title`} onKeyDown={e=>{
            if("Escape"===e.key){
              e.preventDefault(),G();
              return
            }
            if("Tab"!==e.key)return;
            let t=r.current;
            if(!t)return;
            let a=Array.from(t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
            if(0===a.length)return;
            let l=a[0],n=a[a.length-1],o=t.ownerDocument.activeElement;
            e.shiftKey&&o===l?(e.preventDefault(),n.focus({preventScroll:true})):e.shiftKey||o!==n||(e.preventDefault(),focus({preventScroll:true}))
          }} className={u("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","absolute left-1/2 top-[10%] z-50 max-h-[min(80%,calc(100%-4rem))] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2",T?"opacity-100":u(b,"opacity-0"))}>
            <h2 id={`${e}-title`} className="sr-only">Search everything</h2>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
              <div className={u("flex min-h-10 shrink-0 items-center gap-2 border-b border-neutral-900/8 ps-4 pe-2 text-neutral-900/66 dark:text-neutral-100/66 has-[input:focus-visible]:border-transparent has-[input:focus-visible]:shadow-[inset_0_0_0_1px_var(--rb-accent,oklch(20.5%_0_0))] dark:border-neutral-100/8 dark:has-[input:focus-visible]:shadow-[inset_0_0_0_1px_var(--rb-accent,oklch(100%_0_0))]","h-12")}>
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                <label htmlFor={`${e}-input`} className="sr-only">Search everything</label>
                <input ref={A} id={`${e}-input`} role="combobox" aria-expanded="true" aria-controls={P} aria-activedescendant={U} aria-autocomplete="list" value={K} onChange={e=>{
                  L(e.target.value),H(0)
                }} onKeyDown={e=>{
                  switch(e.key){case"ArrowDown":e.preventDefault(),J(1);break;case"ArrowUp":e.preventDefault(),J(-1);break;case"Home":e.preventDefault(),H(0);break;case"End":e.preventDefault(),H(Math.max(B.length-1,0));break;case"Enter":if(!q)break;e.preventDefault(),Q()}
                }} placeholder="Search everything" className="h-full min-w-0 flex-1 bg-transparent text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
              </div>
              <div className="shrink-0 px-4 py-2">
                <div role="radiogroup" aria-label="Result type" className={u("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
                  {j.map((t,r)=>{
                    let l=W===t.id;
                    return (
                      <button key={t.id} id={`${e}-filter-${t.id}`} type="button" role="radio" aria-checked={l} tabIndex={l?0:-1} onClick={()=>{
                                        I(t.id),H(0)
                                      }} onKeyDown={t=>((t,r)=>{
                                        if("ArrowRight"!==t.key&&"ArrowLeft"!==t.key)return;
                                        t.preventDefault();
                                        let a=(r+("ArrowRight"===t.key?1:-1)+j.length)%j.length;
                                        I(j[a].id),H(0);
                                        let l=t.currentTarget.ownerDocument;
                                        getElementById(`${e}-filter-${j[a].id}`)?.focus({preventScroll:true})
                                      })(t,r)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{t.label}</button>
                    );
                  })}
                </div>
              </div>
              <div className="flex min-h-0 flex-1">
                <div className="relative min-h-0 w-full sm:w-1/2 sm:shrink-0">
                  <div ref={o} onScroll={s} className="h-full overflow-y-auto p-2">
                    {B.length>0?<div id={P} role="listbox" aria-label="Results">
                      {B.map((t,r)=>{
                        let l=r===O;
                        return (
                          <button key={t.id} id={`${e}-${t.id}`} role="option" aria-selected={l} data-active={l} data-highlighted={l||undefined} type="button" tabIndex={-1} onPointerMove={()=>H(r)} onMouseDown={e=>{
                                                e.preventDefault(),H(r),Q()
                                              }} className={u("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","min-h-11")}>
                                                <HugeiconsIcon icon={_[t.kind]} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                  <span className="truncate">{t.title}</span>
                                                  <span className={u(v,"flex min-w-0 gap-3")}>{t.subtitle.map(e=><span key={e} className="truncate">{e}</span>)}</span>
                                                </span>
                                              </button>
                        );
                      })}
                    </div>:<div className="flex flex-col items-center px-2.5 py-10 text-center">
                      <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">
                        No matches in
                        {" "}
                        {"all"===W?"anything":"this type"}
                      </p>
                      <p className={u("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-xs text-balance")}>Try another term, or widen the filter back to everything.</p>
                      <button type="button" onMouseDown={e=>{
                        e.preventDefault(),L(""),I("all"),H(0),A.current?.focus({preventScroll:true})
                      }} className={u(h,p,"mt-4")}>Reset search</button>
                    </div>}
                  </div>
                  <div aria-hidden="true" className={u(m,"pointer-events-none absolute inset-x-0 top-0 h-8",i.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={u(f,"pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
                </div>
                <div className="relative my-2 hidden min-h-0 min-w-0 flex-1 overflow-hidden sm:block">
                  <div ref={x} onScroll={D} aria-live="polite" className="h-full overflow-y-auto px-4 pt-1.5 pb-4">
                    {q?<div className="flex flex-col">
                      <p className={u("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",w[q.kind])}>{q.kind}</p>
                      <h3 className={u("text-[16px]/[20px] font-[450] tracking-[-0.015em]","mt-1")}>{q.title}</h3>
                      <p className={u(v,"mt-0.5 flex flex-wrap gap-x-3")}>{q.subtitle.map(e=><span key={e}>{e}</span>)}</p>
                      <dl className={u("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-4 flex flex-col")}>
                        {q.facts.map(e=>(
                          <div key={e.label} className="flex min-h-10 min-w-0 items-center justify-between gap-4">
                                                <dt className={u("min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66","shrink-0")}>{e.label}</dt>
                                                <dd className={u("flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","justify-end text-right tabular-nums")}>{e.value}</dd>
                                              </div>
                        ))}
                      </dl>
                      <p className={u(v,"mt-4")}>{q.summary}</p>
                    </div>:<div className={u(k,"flex h-full items-center justify-center px-6 text-center")}>Nothing to preview yet.</div>}
                  </div>
                  <div aria-hidden="true" className={u(m,"pointer-events-none absolute inset-x-0 top-0 h-8",S.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={u(f,"pointer-events-none absolute inset-x-0 bottom-0 h-8",S.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
            </div>
            <div className={u(k,"flex h-10 shrink-0 items-center gap-4 px-5")}>
              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <N>↑</N>
                <N>↓</N>
                to move
              </span>
              <span className="inline-flex items-center gap-1.5">
                <N>
                  <HugeiconsIcon icon={Icon_68820} size={12} strokeWidth={1.8} aria-hidden="true" />
                </N>
                to open
              </span>
              <span className="inline-flex items-center gap-1.5">
                <N>esc</N>
                to close
              </span>
              <span className="ml-auto shrink-0 tabular-nums">
                {B.length}
                {" of "}
                {y.length}
              </span>
            </div>
          </div>
        </>}
      </section>
  );
}


export default S;
