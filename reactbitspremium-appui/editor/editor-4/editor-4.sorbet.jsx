/**
 * React Bits Pro — Application UI (editor-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { after, before, id, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62955 = [["path",{d:"M3 8H15C18.3137 8 21 10.6863 21 14C21 17.3137 18.3137 20 15 20H11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 4L5.8462 4.87652C3.94873 6.31801 3 7.03875 3 8C3 8.96125 3.94873 9.68199 5.8462 11.1235L7 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let em = (...e)=>e.filter(Boolean).join(" ");

let ef = "bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]";

let ek = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let ev = "bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]";

let eg = "text-neutral-900 dark:text-neutral-100";

let ew = "text-neutral-900/78 dark:text-neutral-100/78";

let ey = "text-neutral-900/62 dark:text-neutral-100/62";

let ej = "rounded-[var(--rb-r-4xl,18px)]";

let eN = "text-[14px]/[20px] font-medium";

let eS = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let ez = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let eA = "flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5";

let eR = "mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:last-child]:mb-1";

let eE = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let eW = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let eC = em("text-[17px]/[22px] font-extrabold",eg);

let eD = em(eN,ey);

let eM = em("text-[17px]/[26px] font-medium",ew);

let eO = em("text-[15px]/[20px] font-bold",eg);

let e$ = em(eN,ew);

let eI = [{id:"s1",author:"Priya Nandakumar",kind:"edit",before:"should probably be rolled out slowly",after:"rolls out in three stages",note:"Hedging. State the plan.",time:"2h ago"},{id:"s2",author:"Marco Silva",kind:"comment",before:"a drift of under 0.5%",note:"Where does 0.5% come from? Link the comparison run so support can quote it.",time:"3h ago"},{id:"s3",author:"Wei Chen",kind:"edit",before:"customers on the bigger plans",after:"Scale and Enterprise workspaces",note:"Use the plan names we sell.",time:"yesterday"}];

let eT = [{text:"The nightly aggregation job is being replaced by a streaming counter. Usage updates within about ten seconds instead of once per night."},{text:"The change {{s1}}, starting with internal workspaces and ending with everyone on a paid plan.",mark:"s1"},{text:"During the overlap window both systems run side by side. {{s2}} between them is expected and does not need a ticket.",mark:"s2"},{text:"We move {{s3}} first, because their invoices are generated from the same rollup table.",mark:"s3"}];

function eL(e){
  let r=useRef(null),[t,a]=useState({start:false,end:false}),i=useCallback(()=>{
    let e=r.current;
    if(!e)return;
    let{scrollTop:t,scrollHeight:n,clientHeight:i}=e;
    a({start:t>1,end:Math.ceil(t+i)<n-1})
  }, []);
  return useEffect(()=>{
    i();
    let e=r.current,t=e?.ownerDocument.defaultView;
    if(!e||!t?.ResizeObserver)return;
    let a=new t.ResizeObserver(i);
    return a.observe(e),()=>a.disconnect();
  }, [e,i]),{ref:r,edges:t,onScroll:i};
}


export default function editor_4__Sorbet__Component(){
  let e=useId(),r=useReducedMotion(),[t,c]=useState(eI),[d,_]=useState({}),[x,u]=useState("s1"),{ref:b,edges:p,onScroll:h}=eL(t.length),{ref:m,edges:f,onScroll:v}=eL(t.length),g=(e,r)=>{
    r&&_(r=>({...r,[e]:true})),c(r=>{
      let t=r.filter(r=>r.id!==e);
      return u(t[0]?.id??null),t;
    })
  };
  return (
    <div className={em(ek,eg,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden lg:flex-row")}>
        <div className="flex min-h-0 flex-1 flex-col">
          <header className={em(eA,"h-[52px] justify-between lg:h-[60px]")}>
            <div className="min-w-0">
              <h2 className={em(eC,"truncate")}>Streaming meter rollout</h2>
              <p className={em(eD,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>Reviewing</span>
                <span>3 contributors</span>
              </p>
            </div>
            <span className={em("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.09),0_1px_2px_rgb(84_62_32/0.08)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.55)] dark:bg-neutral-800")}>
              <HugeiconsIcon icon={Icon_36586} size={14} strokeWidth={2} aria-hidden="true" />
              <span className="tabular-nums">{t.length}</span>
              {" open"}
            </span>
          </header>
          <div className={em(eR,"lg:me-0")}>
            <div className="relative min-h-0 flex-1">
              <div ref={b} onScroll={h} className="h-full overflow-y-auto px-5 py-6 sm:px-8">
                <div className="mx-auto max-w-[620px] space-y-4">
                  {eT.map((e,r)=>(
                    <p key={r} className={eM}>
                                    {((e,r)=>{
                                      if(!e.mark)return <span key={`t${r}`}>{e.text}</span>;
                                      let n=eI.find(r=>r.id===e.mark),i=t.some(e=>e.id===id),[l,o]=e.text.split(`{{${e.mark}}}`),s=d[id]&&after?after:before,c=/^[,.;:]/.test(o)?o[0]:"";
                                      return (
                                        <span key={`t${r}`}>
                                                            {l}
                                                            <span className="whitespace-nowrap">
                                                              <button type="button" onClick={()=>i&&u(id)} className={em("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","rounded-[var(--rb-r-sm,6px)]","px-0.5 text-left whitespace-normal",i?em("cursor-pointer",eg,x===id?ev:ef):em("cursor-default",d[id]&&eg))}>{s}</button>
                                                              {c}
                                                            </span>
                                                            {o.slice(c.length)}
                                                          </span>
                                      );
                                    })(e,r)}
                                  </p>
                  ))}
                </div>
              </div>
              <div aria-hidden="true" className={em(eE,"pointer-events-none absolute inset-x-0 top-0 h-8",p.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={em(eW,"pointer-events-none absolute inset-x-0 bottom-0 h-8",p.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
        <aside className={em(ek,"flex min-h-0 flex-1 flex-col lg:w-[336px] lg:flex-none")}>
          <span className="sr-only" aria-live="polite" id={`${e}-live`}>
            {t.length}
            {" suggestions remaining"}
          </span>
          <div className={em(eA,"h-[52px] justify-between lg:h-[60px]")}>
            <span className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">Suggestions</span>
            {t.length>0&&<button type="button" onClick={()=>{
              _(Object.fromEntries(t.filter(e=>e.after).map(e=>[e.id,true]))),c([]),u(null)
            }} className={em(eS,ez)}>Accept all</button>}
          </div>
          <div className={eR}>
            <div className="relative min-h-0 flex-1">
              <div ref={m} onScroll={v} className={em("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","h-full overflow-y-auto px-1.5 py-0.5")}>
                <AnimatePresence initial={false}>
                  {t.map(e=>{
                    let t=e.id===x;
                    return (
                      <motion.article key={e.id} initial={!r&&{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:.18,ease:[.2,0,0,1]}} onMouseEnter={()=>u(e.id)} className="overflow-hidden py-1">
                                        <div className={em(t&&ev,ej,"p-2.5")}>
                                          <div className="flex items-center gap-2">
                                            <span aria-hidden="true" className={em("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                                              <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{e.author.charAt(0)}</span>
                                            </span>
                                            <span className={em(eO,"min-w-0 flex-1 truncate")}>{e.author}</span>
                                            <span className="shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e.time}</span>
                                          </div>
                                          {"edit"===e.kind&&e.after?<div className={em(ef,ej,eN,"mt-3 space-y-1 p-2")}>
                                            <p className={em(ey,"line-through")}>{e.before}</p>
                                            <p className={eg}>{e.after}</p>
                                          </div>:<p className={em(ef,ej,eN,ey,"mt-3 p-2")}>
                                            “
                                            {e.before}
                                            ”
                                          </p>}
                                          <p className={em(e$,"mt-2")}>{e.note}</p>
                                          <div className="mt-3 flex items-center gap-1.5">
                                            <button type="button" onClick={()=>g(e.id,true)} className={em(t?"relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none":eS,ez,"flex-1")}>
                                              <HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" />
                                              {"edit"===e.kind?"Accept":"Resolve"}
                                            </button>
                                            <button type="button" onClick={()=>g(e.id,false)} className={em(eS,ez)}>
                                              <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                                              Dismiss
                                            </button>
                                          </div>
                                        </div>
                                      </motion.article>
                    );
                  })}
                </AnimatePresence>
                {0===t.length&&<motion.div initial={!r&&{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:.18,ease:[.2,0,0,1]}} className="flex flex-col items-center px-6 py-14 text-center">
                  <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">Review complete</p>
                  <p className={em("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>Every suggestion on this draft has been handled.</p>
                  <button type="button" onClick={()=>{
                    c(eI),_({}),u("s1")
                  }} className={em(eS,"h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","mt-4")}>
                    <HugeiconsIcon icon={Icon_62955} size={18} strokeWidth={2} aria-hidden="true" />
                    Restore
                  </button>
                </motion.div>}
              </div>
              <div aria-hidden="true" className={em(eE,"pointer-events-none absolute inset-x-0 top-0 h-8",f.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={em(eW,"pointer-events-none absolute inset-x-0 bottom-0 h-8",f.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </aside>
      </div>
  );
}
