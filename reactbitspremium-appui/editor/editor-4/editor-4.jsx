/**
 * React Bits Pro — Application UI (editor-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { after, before, id, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62955 = [["path",{d:"M3 8H15C18.3137 8 21 10.6863 21 14C21 17.3137 18.3137 20 15 20H11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 4L5.8462 4.87652C3.94873 6.31801 3 7.03875 3 8C3 8.96125 3.94873 9.68199 5.8462 11.1235L7 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  h = "bg-neutral-900/5 dark:bg-neutral-100/5",
  b = "bg-neutral-50 dark:bg-neutral-900",
  m = "bg-neutral-900/9 dark:bg-neutral-100/9",
  f = "text-neutral-900 dark:text-neutral-100",
  v = "text-neutral-900/80 dark:text-neutral-100/80",
  k = "text-neutral-900/66 dark:text-neutral-100/66",
  g = "rounded-[var(--rb-r-sm,6px)]",
  w = "text-[13px]/[18px] font-normal",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  y = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  j = "flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2",
  N = "mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950",
  S = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  z = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  A = p("text-[16px]/[20px] font-[450] tracking-[-0.015em]",f),
  R = p(w,k),
  E = p("text-[16px]/[22px] font-normal tracking-[-0.01em]",v),
  W = p("text-[14px]/[16px] font-[450]",f),
  C = p(w,v),
  D = [{id:"s1",author:"Priya Nandakumar",kind:"edit",before:"should probably be rolled out slowly",after:"rolls out in three stages",note:"Hedging. State the plan.",time:"2h ago"},{id:"s2",author:"Marco Silva",kind:"comment",before:"a drift of under 0.5%",note:"Where does 0.5% come from? Link the comparison run so support can quote it.",time:"3h ago"},{id:"s3",author:"Wei Chen",kind:"edit",before:"customers on the bigger plans",after:"Scale and Enterprise workspaces",note:"Use the plan names we sell.",time:"yesterday"}],
  M = [{text:"The nightly aggregation job is being replaced by a streaming counter. Usage updates within about ten seconds instead of once per night."},{text:"The change {{s1}}, starting with internal workspaces and ending with everyone on a paid plan.",mark:"s1"},{text:"During the overlap window both systems run side by side. {{s2}} between them is expected and does not need a ticket.",mark:"s2"},{text:"We move {{s3}} first, because their invoices are generated from the same rollup table.",mark:"s3"}];

function O(e){
  let t=useRef(null),[r,a]=useState({start:false,end:false}),i=useCallback(()=>{
    let e=t.current;
    if(!e)return;
    let{scrollTop:r,scrollHeight:n,clientHeight:i}=e;
    a({start:r>1,end:Math.ceil(r+i)<n-1})
  }, []);
  return useEffect(()=>{
    i();
    let e=t.current,r=e?.ownerDocument.defaultView;
    if(!e||!r?.ResizeObserver)return;
    let a=new r.ResizeObserver(i);
    return a.observe(e),()=>a.disconnect();
  }, [e,i]),{ref:t,edges:r,onScroll:i};
}

function $(){
  let e=useId(),t=useReducedMotion(),[r,v]=useState(D),[$,I]=useState({}),[H,T]=useState("s1"),{ref:L,edges:P,onScroll:B}=O(r.length),{ref:U,edges:q,onScroll:F}=O(r.length),V=(e,t)=>{
    t&&I(t=>({...t,[e]:true})),v(t=>{
      let r=t.filter(t=>t.id!==e);
      return T(r[0]?.id??null),r;
    })
  };
  return (
    <div className={p(b,f,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden lg:flex-row")}>
        <div className="flex min-h-0 flex-1 flex-col">
          <header className={p(j,"h-[52px] justify-between lg:h-[60px]")}>
            <div className="min-w-0">
              <h2 className={p(A,"truncate")}>Streaming meter rollout</h2>
              <p className={p(R,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>Reviewing</span>
                <span>3 contributors</span>
              </p>
            </div>
            <span className={p("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100")}>
              <HugeiconsIcon icon={Icon_36586} size={12} strokeWidth={1.8} aria-hidden="true" />
              <span className="tabular-nums">{r.length}</span>
              {" open"}
            </span>
          </header>
          <div className={p(N,"lg:me-0")}>
            <div className="relative min-h-0 flex-1">
              <div ref={L} onScroll={B} className="h-full overflow-y-auto px-5 py-6 sm:px-8">
                <div className="mx-auto max-w-[620px] space-y-4">
                  {M.map((e,t)=>(
                    <p key={t} className={E}>
                                    {((e,t)=>{
                                      if(!e.mark)return <span key={`t${t}`}>{e.text}</span>;
                                      let n=D.find(t=>t.id===e.mark),i=r.some(e=>e.id===id),[s,l]=e.text.split(`{{${e.mark}}}`),o=$[id]&&after?after:before,d=/^[,.;:]/.test(l)?l[0]:"";
                                      return (
                                        <span key={`t${t}`}>
                                                            {s}
                                                            <span className="whitespace-nowrap">
                                                              <button type="button" onClick={()=>i&&T(id)} className={p("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","rounded-[var(--rb-r-xs,4px)]","px-0.5 text-left whitespace-normal",i?p("cursor-pointer",f,H===id?m:h):p("cursor-default",$[id]&&f))}>{o}</button>
                                                              {d}
                                                            </span>
                                                            {l.slice(d.length)}
                                                          </span>
                                      );
                                    })(e,t)}
                                  </p>
                  ))}
                </div>
              </div>
              <div aria-hidden="true" className={p(S,"pointer-events-none absolute inset-x-0 top-0 h-8",P.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={p(z,"pointer-events-none absolute inset-x-0 bottom-0 h-8",P.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
        <aside className={p(b,"flex min-h-0 flex-1 flex-col lg:w-[336px] lg:flex-none")}>
          <span className="sr-only" aria-live="polite" id={`${e}-live`}>
            {r.length}
            {" suggestions remaining"}
          </span>
          <div className={p(j,"h-[52px] justify-between lg:h-[60px]")}>
            <span className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Suggestions</span>
            {r.length>0&&<button type="button" onClick={()=>{
              I(Object.fromEntries(r.filter(e=>e.after).map(e=>[e.id,true]))),v([]),T(null)
            }} className={p(_,y)}>Accept all</button>}
          </div>
          <div className={N}>
            <div className="relative min-h-0 flex-1">
              <div ref={U} onScroll={F} className={p("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","h-full overflow-y-auto px-1.5 py-0.5")}>
                <AnimatePresence initial={false}>
                  {r.map(e=>{
                    let r=e.id===H;
                    return (
                      <motion.article key={e.id} initial={!t&&{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:.18,ease:[.2,0,0,1]}} onMouseEnter={()=>T(e.id)} className="overflow-hidden py-1">
                                        <div className={p(r&&m,g,"p-2.5")}>
                                          <div className="flex items-center gap-2">
                                            <span aria-hidden="true" className={p("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                                              <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.author.charAt(0)}</span>
                                            </span>
                                            <span className={p(W,"min-w-0 flex-1 truncate")}>{e.author}</span>
                                            <span className="shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{e.time}</span>
                                          </div>
                                          {"edit"===e.kind&&e.after?<div className={p(h,g,w,"mt-3 space-y-1 p-2")}>
                                            <p className={p(k,"line-through")}>{e.before}</p>
                                            <p className={f}>{e.after}</p>
                                          </div>:<p className={p(h,g,w,k,"mt-3 p-2")}>
                                            “
                                            {e.before}
                                            ”
                                          </p>}
                                          <p className={p(C,"mt-2")}>{e.note}</p>
                                          <div className="mt-3 flex items-center gap-1.5">
                                            <button type="button" onClick={()=>V(e.id,true)} className={p(r?"relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none":_,y,"flex-1")}>
                                              <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                                              {"edit"===e.kind?"Accept":"Resolve"}
                                            </button>
                                            <button type="button" onClick={()=>V(e.id,false)} className={p(_,y)}>
                                              <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                                              Dismiss
                                            </button>
                                          </div>
                                        </div>
                                      </motion.article>
                    );
                  })}
                </AnimatePresence>
                {0===r.length&&<motion.div initial={!t&&{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:.18,ease:[.2,0,0,1]}} className="flex flex-col items-center px-6 py-14 text-center">
                  <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">Review complete</p>
                  <p className={p("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Every suggestion on this draft has been handled.</p>
                  <button type="button" onClick={()=>{
                    v(D),I({}),T("s1")
                  }} className={p(_,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-4")}>
                    <HugeiconsIcon icon={Icon_62955} size={16} strokeWidth={1.8} aria-hidden="true" />
                    Restore
                  </button>
                </motion.div>}
              </div>
              <div aria-hidden="true" className={p(S,"pointer-events-none absolute inset-x-0 top-0 h-8",q.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={p(z,"pointer-events-none absolute inset-x-0 bottom-0 h-8",q.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </aside>
      </div>
  );
}


export default $;
