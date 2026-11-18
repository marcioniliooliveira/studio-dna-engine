/**
 * React Bits Pro — Application UI (list-8)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_2605 = [["path",{d:"M15.6 8.40033V12.9003C15.6 14.3915 16.8088 15.6003 18.3 15.6003C19.7912 15.6003 21 14.3915 21 12.9003V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.0265 21 15.8965 20.3302 17.4009 19.2M15.6 12.0003C15.6 13.9886 13.9882 15.6003 12 15.6003C10.0118 15.6003 8.4 13.9886 8.4 12.0003C8.4 10.0121 10.0118 8.40033 12 8.40033C13.9882 8.40033 15.6 10.0121 15.6 12.0003Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_3980 = [["path",{d:"M6 8L6 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 16V12C18 9.17156 18 7.75735 17.1213 6.87867C16.2426 5.99999 14.8284 5.99999 12 5.99999L11 5.99999M11 5.99999C11 5.29976 12.9943 3.99152 13.5 3.49999M11 5.99999C11 6.70022 12.9943 8.00846 13.5 8.49999",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"6",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["circle",{cx:"6",cy:"6",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["circle",{cx:"18",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_55599 = [["path",{d:"M6.21875 11.618L3.31189 11.2378C2.71644 11.1606 2.31883 10.5841 2.58348 10.0458C3.42523 8.33365 5.6195 6.35437 9.73988 6.68079M6.21875 11.618C7.27445 9.85426 8.57175 8.00435 9.73988 6.68079M6.21875 11.618L11.882 17.2812M9.73988 6.68079C13.4105 2.58986 17.1745 1.728 19.5937 2.06685C20.5508 2.2009 21.2991 2.94917 21.4332 3.90626C21.772 6.32551 20.9101 10.0895 16.8192 13.7601M11.882 17.2812L12.2622 20.1881C12.3394 20.7836 12.9159 21.1812 13.4542 20.9165C15.1664 20.0748 17.1456 17.8805 16.8192 13.7601M11.882 17.2812C13.6457 16.2255 15.4956 14.9282 16.8192 13.7601",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 8C17.5 6.89543 16.6046 6 15.5 6C14.3954 6 13.5 6.89543 13.5 8C13.5 9.10457 14.3954 10 15.5 10C16.6046 10 17.5 9.10457 17.5 8Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 22L8 18M4 17L5.5 15.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_22830 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_22670 = [["path",{d:"M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];

let h = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  m = "text-neutral-900/66 dark:text-neutral-100/66",
  f = "text-[13px]/[18px] font-normal",
  k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  g = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  w = "size-7 rounded-[var(--rb-r-sm,6px)]",
  _ = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  y = [{id:"n1",icon:Icon_2605,title:"Priya Nair mentioned you in Checkout v3",preview:"Can you take the payment-intent race here? I left a thread on the retry logic and tagged you for the final call.",time:"2m"},{id:"n2",icon:Icon_3980,title:"Review requested on “Split ledger writes”",preview:"Marcus Feld opened a pull request in billing-core and asked for your review before the freeze.",time:"11m"},{id:"n3",icon:Icon_55599,title:"Deploy succeeded, web-app 4.18.0",preview:"Production rollout finished across all three regions. Error rate is flat and latency is within budget.",time:"38m"},{id:"n4",icon:Icon_36474,title:"API usage at 82% of your monthly quota",preview:"At the current rate you will reach the plan limit around Aug 24. Raise the cap to avoid throttled requests.",time:"1h"},{id:"n5",icon:Icon_2605,title:"Dana Okafor mentioned you in Design review",preview:"The empty states look great now. One note on the toast timing that I think is worth a quick pass.",time:"3h"},{id:"n6",icon:Icon_3980,title:"Your pull request was approved and merged",preview:"“Cache supplier lookups” passed review from two reviewers and merged into main a moment ago.",time:"5h"},{id:"n7",icon:Icon_55599,title:"Staging deploy started, api-gateway 2.9.1",preview:"Build 4821 is rolling out to staging. You will get a follow-up when smoke tests complete.",time:"Yesterday"},{id:"n8",icon:Icon_36474,title:"Certificate for hooks.northwind.io renews in 6 days",preview:"Auto-renewal is enabled, but the last attempt was rate-limited. Confirm DNS still points to the load balancer.",time:"2d"}],
  j = new Set(["n3","n6","n7"]),
  N = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function A(){
  let[e,t]=useState("all"),[r,l]=useState(()=>new Set(j)),[s,o]=useState(()=>new Set),[d,A]=useState(()=>new Set),[z,S]=useState(null),C=useRef(null),R=useRef(null),{ref:M,edges:T,onScroll:D}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }();
  useEffect(()=>()=>{
    C.current&&clearTimeout(C.current),R.current&&clearTimeout(R.current)
  }, []);
  let O=y.filter(e=>!s.has(e.id)&&!r.has(e.id)).length,P=y.filter(t=>!(s.has(t.id)||"unread"===e&&r.has(t.id)&&!d.has(t.id))),E=0===P.length&&"all"===e,W=0===P.length&&"unread"===e;
  return (
    <div className={h("bg-white dark:bg-neutral-950",b,"flex h-full min-h-[560px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex h-full w-full max-w-[720px] flex-col">
          <header className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
            <div className="min-w-0">
              <h2 className={h("text-[20px]/[24px] font-[450] tracking-[-0.015em]",b)}>Inbox</h2>
              <p className={h(f,m,"mt-0.5 tabular-nums")}>{O>0?`${O} unread`:"You're all caught up"}</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>l(()=>new Set(y.map(e=>e.id)))} disabled={0===O} className={h(v,g)}>Mark all read</button>
              <div role="radiogroup" aria-label="Filter notifications" onKeyDown={N} className={h("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
                {["all","unread"].map(r=>{
                  let n=e===r;
                  return <button key={r} type="button" role="radio" aria-checked={n} tabIndex={n?0:-1} onClick={()=>t(r)} className={h("relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40","capitalize")}>{r}</button>;
                })}
              </div>
            </div>
          </header>
          <div className="relative min-h-0 flex-1">
            {E||W?<div className={h(_,"h-full items-center justify-center px-6 text-center")}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center">
                <HugeiconsIcon icon={Icon_22830} size={20} strokeWidth={1.8} aria-hidden="true" className="text-neutral-900/80 dark:text-neutral-100/80" />
              </div>
              <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">{W?"No unread messages":"Inbox zero"}</p>
              <p className={h("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>
                {W?"Everything here has been read. Switch to all to see the full history.":"You've archived everything. Restore a message to bring it back."}
              </p>
              <button type="button" onClick={()=>W?t("all"):o(new Set)} className={h(v,g,"mt-4")}>{W?"View all":"Restore archived"}</button>
            </div>:<div className={h(_,"relative h-full")}>
              <ul ref={M} onScroll={D} style={{touchAction:"pan-y"}} className={h("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","h-full overflow-y-auto p-2")}>
                {P.map(e=>{
                  let t=r.has(e.id),n=d.has(e.id);
                  return (
                    <li key={e.id} hidden={n} className="grid">
                                    <div className="overflow-hidden">
                                      <div className={h("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","rounded-[var(--rb-r-sm,6px)]","hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","group px-2 py-2 has-[[data-description]]:min-h-16")}>
                                        {!t&&<span className="sr-only">Unread</span>}
                                        <span aria-hidden="true" className={h("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","size-10")}>
                                          <HugeiconsIcon icon={e.icon} size={18} strokeWidth={1.8} className={t?m:undefined} />
                                        </span>
                                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                          <p className={h("text-[14px]/[16px] font-[450]",t?m:b,"truncate")}>{e.title}</p>
                                          <p data-description className={t?h(f,m,"line-clamp-2"):"line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80"}>{e.preview}</p>
                                        </div>
                                        <time className={h("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","self-start pt-0.5")}>{e.time}</time>
                                        <div className={h("flex items-center justify-end gap-0.5 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-[120ms]","shrink-0")}>
                                          <button type="button" onClick={()=>{
                                            let t;
                                            return t=e.id,l(e=>{
                                              let r=new Set(e);
                                              return r.has(t)?r.delete(t):r.add(t),r;
                                            });
                                          }} aria-label={t?"Mark as unread":"Mark as read"} className={h(k,w)}>
                                            <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                                          </button>
                                          <button type="button" aria-label="Snooze" className={h(k,w)}>
                                            <HugeiconsIcon icon={Icon_29635} size={16} strokeWidth={1.8} aria-hidden="true" />
                                          </button>
                                          <button type="button" onClick={()=>{
                                            var t;
                                            return t=e.id,void(C.current&&clearTimeout(C.current),A(e=>new Set(e).add(t)),R.current&&clearTimeout(R.current),R.current=setTimeout(()=>{
                                              o(e=>new Set(e).add(t)),A(e=>{
                                                let r=new Set(e);
                                                return r.delete(t),r;
                                              })
                                            },200),S(t),C.current=setTimeout(()=>S(null),5e3));
                                          }} aria-label="Archive" className={h(k,w)}>
                                            <HugeiconsIcon icon={Icon_22670} size={16} strokeWidth={1.8} aria-hidden="true" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                  );
                })}
              </ul>
              <div aria-hidden="true" className={h("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",T.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",T.end?"opacity-100":"opacity-0")} />
            </div>}
            <div aria-live="polite" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3">
              {z&&<div>
                <div className={h("pointer-events-auto grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-3 overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 py-3 ps-4 pe-2 text-neutral-900 dark:text-neutral-100 shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","h-10 py-[7px]")}>
                  <span className={h("text-[14px]/[16px] font-[450]","self-center")}>Message archived</span>
                  <button type="button" onClick={()=>{
                    z&&(C.current&&clearTimeout(C.current),R.current&&clearTimeout(R.current),o(e=>{
                      let t=new Set(e);
                      return t.delete(z),t;
                    }),A(e=>{
                      let t=new Set(e);
                      return t.delete(z),t;
                    }),S(null))
                  }} className={h(v,"h-6 gap-1 rounded-[var(--rb-r-sm,6px)] px-2 text-[12px]/[16px] font-[450] tabular-nums")}>Undo</button>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
  );
}


export default A;
