/**
 * React Bits Pro — Application UI (notifications-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_2605 = [["path",{d:"M15.6 8.40033V12.9003C15.6 14.3915 16.8088 15.6003 18.3 15.6003C19.7912 15.6003 21 14.3915 21 12.9003V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.0265 21 15.8965 20.3302 17.4009 19.2M15.6 12.0003C15.6 13.9886 13.9882 15.6003 12 15.6003C10.0118 15.6003 8.4 13.9886 8.4 12.0003C8.4 10.0121 10.0118 8.40033 12 8.40033C13.9882 8.40033 15.6 10.0121 15.6 12.0003Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_3980 = [["path",{d:"M6 8L6 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 16V12C18 9.17156 18 7.75735 17.1213 6.87867C16.2426 5.99999 14.8284 5.99999 12 5.99999L11 5.99999M11 5.99999C11 5.29976 12.9943 3.99152 13.5 3.49999M11 5.99999C11 6.70022 12.9943 8.00846 13.5 8.49999",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"6",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["circle",{cx:"6",cy:"6",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["circle",{cx:"18",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_44647 = [["path",{d:"M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 15.5V21.5M21 18.5L15 18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11",cy:"6.5",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_54810 = [["path",{d:"M2.5 13.8333L6 17.5L7.02402 16.4272M16.5 6.5L10.437 12.8517",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 13.8333L11 17.5L21.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let v = (...e)=>e.filter(Boolean).join(" "),
  k = "text-neutral-900 dark:text-neutral-100",
  _ = "text-neutral-900/80 dark:text-neutral-100/80",
  g = "text-neutral-900/66 dark:text-neutral-100/66",
  w = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  y = "size-7 rounded-[var(--rb-r-sm,6px)]",
  j = v("text-[16px]/[20px] font-[450] tracking-[-0.015em]",k),
  N = v("text-[13px]/[18px] font-normal",_),
  A = v("text-[12px]/[16px] font-normal tabular-nums",g),
  z = v("text-[12px]/[16px] font-[450] tabular-nums",g),
  S = v("font-medium",k),
  C = [.2,0,0,1],
  R = ["All","Unread","Mentions"],
  E = {mention:Icon_2605,comment:Icon_36586,review:Icon_3980,member:Icon_44647,security:Icon_20484},
  W = [{id:"n1",kind:"mention",actor:"Ana Reyes",action:"mentioned you in",target:"Q3 rollout plan",detail:"Can you confirm the migration window before we lock the schedule with Northwind?",time:"12m",group:"Today",unread:true},{id:"n2",kind:"review",actor:"Wei Chen",action:"requested review on",target:"Billing usage meter",detail:"14 files changed across the metering service and the invoice job.",time:"48m",group:"Today",unread:true},{id:"n3",kind:"comment",actor:"Marco Silva",action:"replied in",target:"Onboarding checklist",detail:"Moved the workspace step ahead of the invite step. Looks cleaner.",time:"2h",group:"Today",unread:true},{id:"n4",kind:"member",actor:"Priya Nandakumar",action:"joined",target:"Cedar Labs",detail:"Invited by you as an editor.",time:"5h",group:"Today",unread:false},{id:"n5",kind:"security",actor:"Halcyon",action:"signed in from a new device on",target:"macOS, Lisbon",detail:"If this was not you, revoke the session and rotate your keys.",time:"Yesterday",group:"Yesterday",unread:true},{id:"n6",kind:"mention",actor:"Sofia Alvarez",action:"mentioned you in",target:"Retention teardown",detail:"Pulled your cohort chart into the summary. Shout if that is stale.",time:"Yesterday",group:"Yesterday",unread:false},{id:"n7",kind:"comment",actor:"Marco Silva",action:"resolved your comment in",target:"Meridian import",time:"2d",group:"Earlier",unread:false},{id:"n8",kind:"review",actor:"Ana Reyes",action:"approved",target:"Sidebar density pass",time:"3d",group:"Earlier",unread:false}],
  M = ["Today","Yesterday","Earlier"],
  D = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let t=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=t.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?t.length-1:(a+r+t.length)%t.length;
  t[n].focus(),t[n].click()
};

function I({unread:e,children:r}){
  return e?<strong className={S}>{r}</strong>:<span className={k}>{r}</span>;
}

function T(){
  let e=useReducedMotion(),[r,t]=useState("All"),[d,c]=useState(W),u=d.filter(e=>e.unread).length,x=useMemo(()=>d.filter(e=>"Unread"===r?e.unread:"Mentions"!==r||"mention"===e.kind), [d,r]),{ref:b,edges:g,onScroll:S}=function(e){
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
    }, [i,e]),{ref:r,edges:t,onScroll:i};
  }(`${r}-${x.length}`),T=M.map(e=>({group:e,rows:x.filter(r=>r.group===e)})).filter(e=>e.rows.length>0);
  return (
    <div className={v("bg-white dark:bg-neutral-950",k,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <header className={v("border-b border-neutral-900/8 dark:border-neutral-100/8","flex flex-wrap items-center justify-between gap-3 px-5 py-4")}>
          <div className="flex items-center gap-2.5">
            <h2 className={j}>Notifications</h2>
            <AnimatePresence initial={false}>
              {u>0&&<motion.span key={"count"} initial={!e&&{opacity:0}} animate={{opacity:1}} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:C}}} transition={{duration:.16,ease:C}} className={v("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>{u}</motion.span>}
            </AnimatePresence>
          </div>
          <button type="button" onClick={()=>c(e=>e.map(e=>({...e,unread:false})))} disabled={0===u} className={v("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
            <HugeiconsIcon icon={Icon_54810} size={16} strokeWidth={1.8} aria-hidden="true" />
            Mark all read
          </button>
        </header>
        <div className="px-5 pt-4">
          <div role="radiogroup" aria-label="Filter notifications" onKeyDown={D} className={v("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
            {R.map(e=>{
              let n=e===r,i="Unread"===e?u:"Mentions"===e?d.filter(e=>"mention"===e.kind).length:d.length;
              return (
                <button key={e} type="button" role="radio" aria-checked={n} tabIndex={n?0:-1} onClick={()=>t(e)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">
                            {e}
                            <span className={z}>{i}</span>
                          </button>
              );
            })}
          </div>
        </div>
        <div className="relative min-h-0 flex-1">
          <div ref={b} onScroll={S} className="h-full overflow-y-auto px-5 py-4">
            {0===T.length?<div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 text-center">
              <span className="flex h-10 w-10 items-center justify-center">
                <HugeiconsIcon icon={Icon_13473} size={16} strokeWidth={1.8} aria-hidden="true" className={_} />
              </span>
              <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">Nothing here</p>
              <div className="max-w-[26ch]">
                <p className="max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">
                  {"You are caught up on "}
                  {r.toLowerCase()}
                  {" notifications."}
                </p>
              </div>
            </div>:<div className="space-y-5">
              {T.map(({group:r,rows:t})=>(
                <section key={r}>
                            <h3 className={v(A,"px-3 pb-2")}>{r}</h3>
                            <ul className="space-y-1">
                              <AnimatePresence initial={false}>
                                {t.map(r=>(
                                  <motion.li key={r.id} layout={!e&&"position"} initial={false} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:C}}} transition={{duration:.16,ease:C}} className="group/row relative overflow-hidden">
                                                    <div className={v("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","px-3")}>
                                                      <span className={v("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","h-[18px] w-[28px]",r.detail&&"self-start")}>
                                                        <HugeiconsIcon icon={E[r.kind]} size={14} strokeWidth={1.8} aria-hidden="true" />
                                                      </span>
                                                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                        <p className={N}>
                                                          {r.unread&&<span className="sr-only">{"Unread: "}</span>}
                                                          <I unread={r.unread}>{r.actor}</I>
                                                          {" "}
                                                          {r.action}
                                                          {" "}
                                                          <I unread={r.unread}>{r.target}</I>
                                                        </p>
                                                        {r.detail&&<p data-description className="line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">{r.detail}</p>}
                                                      </div>
                                                      <div className={v("relative flex min-w-12 shrink-0 justify-end",r.detail&&"self-start")}>
                                                        <span className={v("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","group-focus-within/row:opacity-0 group-hover/row:opacity-0")}>{r.time}</span>
                                                        <div className="absolute top-1/2 -right-1.5 flex -translate-y-1/2 items-center gap-1 opacity-0 group-focus-within/row:opacity-100 group-hover/row:opacity-100">
                                                          <button type="button" onClick={()=>{
                                                            let e;
                                                            return e=r.id,c(r=>r.map(r=>r.id===e?{...r,unread:!r.unread}:r));
                                                          }} aria-label={r.unread?"Mark as read":"Mark unread"} className={v(w,y)}>
                                                            <HugeiconsIcon icon={r.unread?Icon_90987:Icon_13473} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                          </button>
                                                          <button type="button" onClick={()=>{
                                                            let e;
                                                            return e=r.id,c(r=>r.filter(r=>r.id!==e));
                                                          }} aria-label="Dismiss notification" className={v(w,y)}>
                                                            <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </motion.li>
                                ))}
                              </AnimatePresence>
                            </ul>
                          </section>
              ))}
            </div>}
          </div>
          <div aria-hidden="true" className={v("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",g.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={v("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",g.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default T;
