/**
 * React Bits Pro — Application UI (app-dialog-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_22670 = [["path",{d:"M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900/80 dark:text-neutral-100/80",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[13px]/[18px] font-normal",
  _ = "text-[12px]/[16px] font-normal tabular-nums",
  m = "font-mono text-[12px]/[16px] tabular-nums",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  v = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  k = [.2,0,0,1],
  g = "SOC2-2024",
  w = "SOC 2 Type II report",
  y = "PDF",
  j = "Priya Raman",
  N = "4.2 MB",
  S = "Jun 18, 2024",
  z = "Vanta",
  E = "7 years",
  C = "Current",
  D = "Independent audit of security, availability, and confidentiality controls for the 2024 reporting period.",
  R = [{id:"AC-2",name:"Account management"},{id:"CC6.1",name:"Logical access controls"},{id:"CC7.2",name:"Security monitoring"},{id:"A1.2",name:"Availability commitments"}],
  A = [{date:"Jun 18, 2024",label:"Report uploaded by Priya Raman"},{date:"Jun 14, 2024",label:"Audit period closed"},{date:"Jan 2, 2024",label:"Evidence collection started"}];

function T(e){
  return Array.from(e?.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')??[]);
}

function P(){
  let e,t,r,{ref:P,edges:I,onScroll:W}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=t;
      r({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),K=useReducedMotion(),[L,M]=useState(true),[H,F]=useState(null),O=useRef(false),[B,V]=useState(false),q=useCallback(()=>M(false), []),{panelRef:U,triggerRef:$}=(e=useRef(null),t=useRef(null),r=useRef(L),useEffect(()=>{
    if(!L)return;
    let t=e.current,r=t?.ownerDocument??document;
    (T(t)[0]??t)?.focus({preventScroll:true});
    let a=e=>{
      if("Escape"===e.key){
        e.preventDefault(),q();
        return
      }
      if("Tab"!==e.key)return;
      let a=T(t);
      if(0===a.length)return;
      let n=a[0],l=a[a.length-1],i=r.activeElement;
      e.shiftKey&&i===n?(e.preventDefault(),l.focus({preventScroll:true})):e.shiftKey||i!==l||(e.preventDefault(),focus({preventScroll:true}))
    };
    return r.addEventListener("keydown",a),()=>r.removeEventListener("keydown",a);
  }, [L,q]),useEffect(()=>{
    r.current&&!L&&t.current?.focus({preventScroll:true}),r.current=L
  }, [L]),{panelRef:e,triggerRef:t});
  useEffect(()=>{
    if(!H)return;
    let e=setTimeout(()=>F(null),2600);
    return ()=>clearTimeout(e);
  }, [H]);
  let J=!K&&!B,Y=J?{initial:{opacity:0,x:8},animate:{opacity:1,x:0},exit:{opacity:0,x:8,transition:{duration:.12,ease:k}},transition:{duration:.18,ease:k}}:{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.12,ease:k}},transition:{duration:0}};
  return (
    <div className={x("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={$} type="button" onPointerDown={()=>{
          O.current=false
        }} onKeyDown={e=>{
          ("Enter"===e.key||" "===e.key)&&(O.current=true)
        }} onClick={()=>{
          F(null),V(O.current),M(true)
        }} className={x(f,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>View evidence details</button>
        <AnimatePresence initial={false}>
          {L&&<>
            <motion.div aria-hidden="true" className={x("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-30")} onClick={q} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:k}}} transition={{duration:.18*!!J,ease:k}} />
            <motion.aside ref={U} role="dialog" aria-modal="true" aria-labelledby="app-dialog-6-title" tabIndex={-1} className={x("flex h-full min-h-0 flex-col bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","absolute inset-y-0 right-0 z-40 w-full max-w-md overflow-hidden")} {...Y}>
              <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
                <header className={x("relative flex flex-col gap-1.5 px-5 pt-5 pb-5 has-[button]:pe-14 [&:has(+*)]:pb-0","shrink-0")}>
                  <h2 id="app-dialog-6-title" className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","truncate")}>{w}</h2>
                  <div className="absolute end-4 top-4 flex">
                    <button type="button" aria-label="Close panel" onClick={q} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}>
                      <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                    </button>
                  </div>
                </header>
                <div className="relative min-h-0 flex-1">
                  <div ref={P} onScroll={W} className={x("flex min-w-0 flex-col gap-4 p-5 pt-6","h-full overflow-y-auto")}>
                    <div>
                      <div className={x(b,"flex items-baseline gap-2")}>
                        <span className={x("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums","text-neutral-900/80 dark:text-neutral-100/80")}>{C}</span>
                        <span className={x(m,"truncate")}>{g}</span>
                      </div>
                      <p className={x(h,b,"mt-2")}>{D}</p>
                    </div>
                    <dl className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
                      {[{label:"Owner",values:[j]},{label:"File",values:[y,N]},{label:"Updated",values:[S]},{label:"Source",values:[z]},{label:"Retention",values:[E]}].map(e=>(
                        <div key={e.label} className={x("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","justify-between")}>
                                            <dt className={x("min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66","shrink-0")}>{e.label}</dt>
                                            <dd className={x("flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","tabular-nums")}>{e.values.map(e=><span key={e}>{e}</span>)}</dd>
                                          </div>
                      ))}
                    </dl>
                    <div>
                      <h3 className={x(_,p)}>Controls covered</h3>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {R.map(e=>(
                          <li key={e.id} className={x("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>
                                                <span className={m}>{e.id}</span>
                                                {e.name}
                                              </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className={x(_,p)}>History</h3>
                      <ol className="mt-2 space-y-2.5">
                        {A.map(e=>(
                          <li key={e.date} className={x(h,"flex items-baseline gap-3")}>
                                                <span className={x(p,"w-24 shrink-0 tabular-nums")}>{e.date}</span>
                                                <span className="min-w-0">{e.label}</span>
                                              </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div aria-hidden="true" className={x("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",I.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",I.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
              <footer className={x("flex min-h-11 flex-wrap items-center justify-end gap-2 px-4 py-2 pe-2","shrink-0 flex-col-reverse max-sm:ps-2 sm:flex-row")}>
                <button type="button" onClick={()=>F("Report archived")} className={x(f,v,"w-full sm:w-auto")}>
                  <HugeiconsIcon icon={Icon_22670} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                  Archive
                </button>
                <button type="button" onClick={()=>F("Download started")} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",v,"w-full sm:w-auto")}>
                  <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                  Download
                </button>
              </footer>
            </motion.aside>
          </>}
        </AnimatePresence>
        <div aria-live="polite" className="pointer-events-none absolute bottom-4 left-4 right-4 z-[60] flex flex-col gap-2 sm:left-auto sm:w-full sm:max-w-sm">
          {H&&<div className={x("pointer-events-auto grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-3 overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 py-3 ps-4 pe-2 text-neutral-900 dark:text-neutral-100 shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none")}>
            <div className="min-w-0">
              <p className="text-[14px]/[16px] font-[450]">{H}</p>
              <p className={x("mt-0.5 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","flex flex-wrap gap-x-2")}>
                <span>{w}</span>
                <span>{y}</span>
                <span>{N}</span>
              </p>
            </div>
          </div>}
        </div>
      </div>
  );
}


export default P;
