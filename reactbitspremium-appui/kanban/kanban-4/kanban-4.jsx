/**
 * React Bits Pro — Application UI (kanban-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { col, getBoundingClientRect, i, index, left, length, map, querySelectorAll, t, top, useCallback, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_60041 = [["path",{d:"M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  p = "text-neutral-900 dark:text-neutral-100",
  h = "text-neutral-900/80 dark:text-neutral-100/80",
  m = "text-neutral-900/66 dark:text-neutral-100/66",
  f = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  b = "text-[13px]/[18px] font-normal",
  g = "text-[12px]/[16px] font-[450] tabular-nums",
  v = "text-[12px]/[16px] font-normal tabular-nums",
  k = "font-mono text-[12px]/[16px] tabular-nums",
  w = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  y = "bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100",
  _ = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",
  j = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  N = "flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2",
  C = "rounded-[var(--rb-r-sm,6px)]",
  A = "flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  R = [.2,0,0,1],
  P = {type:"spring",bounce:0,duration:.35},
  S = [{id:"todo",name:"To do"},{id:"progress",name:"In progress"},{id:"review",name:"In review"},{id:"done",name:"Done"}],
  M = {k1:{id:"k1",ref:"CDR-118",title:"Recover partial uploads after a dropped connection",summary:"Large uploads restart from zero when the socket drops. Store the chunk offset so the client can resume where it left off.",assignee:"Ana Reyes",priority:"Urgent",points:8,comments:[{who:"Marco Silva",when:"2 days ago",text:"Reproduced on a 400 MB file over a throttled connection."},{who:"Ana Reyes",when:"yesterday",text:"Chunk offsets are already stored. The client just never reads them back."}]},k2:{id:"k2",ref:"CDR-114",title:"Trash keeps deleted folders for 30 days",summary:"Restoring a folder should bring its children back with the original hierarchy intact.",assignee:"Priya Nandakumar",priority:"High",points:5,comments:[{who:"Priya Nandakumar",when:"3 days ago",text:"Retention job is written. Restore path still flattens nested folders."}]},k3:{id:"k3",ref:"CDR-109",title:"Bulk share links expire on a schedule",summary:"Owners want an expiry they can set once and apply to every link in a folder.",assignee:"Wei Chen",priority:"Normal",points:3,comments:[]},k4:{id:"k4",ref:"CDR-104",title:"Preview HEIC images without downloading",summary:"Convert on the fly at request time and cache the result for a week.",assignee:"Marco Silva",priority:"Normal",points:5,comments:[{who:"Wei Chen",when:"last week",text:"Conversion adds about 180 ms on a cold cache. Acceptable."}]},k5:{id:"k5",ref:"CDR-98",title:"Audit trail for permission changes",summary:"Every grant and revoke needs an immutable entry with the actor and the reason.",assignee:"Ana Reyes",priority:"High",points:8,comments:[]},k6:{id:"k6",ref:"CDR-91",title:"Drag files straight onto a folder row",summary:"The row should accept a drop and show a clear target state while hovering.",assignee:"Priya Nandakumar",priority:"Normal",points:2,comments:[{who:"Ana Reyes",when:"4 days ago",text:"Shipped behind a flag. Waiting on copy for the empty folder case."}]},k7:{id:"k7",ref:"CDR-87",title:"Storage meter in the sidebar footer",summary:"Show used against plan, and link to the upgrade page past 80%.",assignee:"Wei Chen",priority:"Normal",points:2,comments:[]}},
  $ = {todo:["k3","k5"],progress:["k1","k2"],review:["k4"],done:["k6","k7"]},
  D = e=>e.split(/[\s-]+/).filter(Boolean).slice(0,1).map(e=>e[0]?.toUpperCase()).join(""),
  z = {Urgent:p,High:h,Normal:m};

function I(){
  let e=useReducedMotion(),[t,r]=useState($),[I,B]=useState("k1"),[L,H]=useState(null),[W,X]=useState({x:0,y:0,w:0}),[Y,E]=useState(""),T=useRef(null),O=useRef(new Map),U=useRef(null),q=useCallback(e=>Object.keys(t).find(r=>t[r].includes(e))??"todo", [t]),K=useCallback((e,t,a)=>{
    r(r=>{
      let n={...r},i=null;
      for(let t of Object.keys(n))t.includes(e)&&(i=t);
      if(!i||i===t&&i.indexOf(e)===a)return r;
      i=i.filter(t=>t!==e);
      let l=i===t?i:[...t];
      return l.splice(Math.max(0,Math.min(a,l.length)),0,e),t=l,n;
    })
  }, []),F=useCallback((e,t,r)=>{
    for(let[a,n]of O.current){
      let i=getBoundingClientRect();
      if(e<i.left||e>i.right)continue;
      let l=Array.from(querySelectorAll("[data-card]")).filter(e=>e.dataset.card!==r),s=l.length;
      for(let e=0;e<l.length;e++){
        let r=l[e].getBoundingClientRect();
        if(t<r.top+r.height/2){
          s=e;
          break
        }
      }
      return {col:a,index:s};
    }
    return null;
  }, []),G=(e,t)=>{
    if(0!==e.button)return;
    let r=e.currentTarget.closest("[data-card]"),a=T.current;
    if(!r||!a)return;
    e.preventDefault();
    let n=r.getBoundingClientRect();
    U.current={id:t,dx:e.clientX-left,dy:e.clientY-top,w:width,active:false,startX:e.clientX,startY:e.clientY,pointerId:e.pointerId},a.setPointerCapture(e.pointerId),r.querySelector('[aria-roledescription="Draggable card"]')?.focus()
  },J=()=>{
    let e=U.current;
    if(!e)return;
    U.current=null;
    let t=T.current;
    t?.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),e.active?E(`${M[e.id].ref} moved to ${S.find(t=>t.id===q(e.id))?.name}.`):B(e.id),H(null)
  },Q=I?M[I]:null,V=I?q(I):"todo",Z=useMemo(()=>Object.values(t).reduce((e,t)=>e+t.length,0), [t]);
  return (
    <div ref={T} onPointerMove={e=>{
        let t=U.current,r=T.current;
        if(!t||!r)return;
        if(!t.active){
          if(4>Math.hypot(e.clientX-t.startX,e.clientY-t.startY))return;
          t.active=true,H(t.id)
        }
        let a=r.getBoundingClientRect();
        X({x:e.clientX-a.left-t.dx,y:e.clientY-a.top-t.dy,w:t.w});
        let n=F(e.clientX,e.clientY,t.id);
        n&&K(t.id,col,index)
      }} onPointerUp={J} onPointerCancel={J} onLostPointerCapture={J} className={x("bg-white dark:bg-neutral-950",p,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden",L&&"touch-none select-none")}>
        <header className="shrink-0 px-6 pt-6 pb-4 sm:px-8">
          <h2 className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em]",p)}>Cedar Labs delivery</h2>
          <p className={x(b,m,"mt-0.5 truncate")}>
            {Z}
            {" items. Click a card to open it, or drag it to another column."}
          </p>
        </header>
        <div className="relative flex min-h-0 flex-1">
          <motion.div layout={!e} transition={P} className={x("min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6 sm:px-8",Q&&"border-r border-neutral-900/8 dark:border-neutral-100/8")}>
            <div className="flex h-full min-w-max gap-2.5">
              {S.map(r=>{
                let n=t[r.id];
                return (
                  <section key={r.id} aria-label={r.name} className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","h-full w-[236px] shrink-0")}>
                                <div className={N}>
                                  <span className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{r.name}</span>
                                  <span className="shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{length}</span>
                                </div>
                                <div ref={e=>{
                                  e?O.current.set(r.id,e):O.current.delete(r.id)
                                }} className={x("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",f,"min-h-0 flex-1 overflow-y-auto p-1")}>
                                  {map(t=>{
                                    let r=M[t],n=L===t,i=I===t;
                                    return (
                                      <motion.div key={t} layout={!e&&"position"} transition={P} data-card={t} className={x(n&&x("rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8",C))}>
                                                          <div role="button" tabIndex={0} aria-pressed={i} aria-roledescription="Draggable card" aria-label={`${r.ref}: ${r.title}`} onPointerDown={e=>{
                                                            "mouse"===e.pointerType&&G(e,t)
                                                          }} onClick={()=>B(t)} onKeyDown={e=>{
                                                            ("Enter"===e.key||" "===e.key)&&(e.preventDefault(),B(t))
                                                          }} className={x("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",C,i?x("bg-neutral-900/9 dark:bg-neutral-100/9","cursor-pointer"):"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","px-2",n&&"invisible")}>
                                                            <div className="flex w-full items-center gap-2">
                                                              <span className={x(g,z[r.priority])}>{r.priority}</span>
                                                              <span className={x(k,m)}>{r.ref}</span>
                                                              <span onPointerDown={e=>G(e,t)} style={{touchAction:"none"}} aria-hidden className={x(m,"ml-auto -mr-0.5 cursor-grab")}>
                                                                <HugeiconsIcon icon={Icon_60041} size={14} strokeWidth={1.8} aria-hidden="true" />
                                                              </span>
                                                            </div>
                                                            <p className={x(A,"w-full")}>{r.title}</p>
                                                            <div className="flex w-full items-center gap-2">
                                                              <span className={x(w,y)}>
                                                                {r.points}
                                                                {" pts"}
                                                              </span>
                                                              {r.comments.length>0&&<span className={x(g,m,"inline-flex items-center gap-1")}>
                                                                <HugeiconsIcon icon={Icon_36586} size={12} strokeWidth={1.8} aria-hidden="true" />
                                                                {r.comments.length}
                                                              </span>}
                                                              <span title={r.assignee} className={x(_,"ml-auto size-[24px]")}><span className={j}>{D(r.assignee)}</span></span>
                                                            </div>
                                                          </div>
                                                        </motion.div>
                                    );
                                  })}
                                </div>
                              </section>
                );
              })}
            </div>
          </motion.div>
          <AnimatePresence>
            {Q&&<motion.button key={"scrim"} type="button" aria-label="Close details" onClick={()=>B(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e}}} transition={{duration:.18*!e,ease:R}} className={x("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-30 cursor-pointer lg:hidden")} />}
          </AnimatePresence>
          <AnimatePresence>
            {Q&&<motion.aside key={"detail"} aria-label={`${Q.ref} details`} initial={e?{opacity:0}:{x:8,opacity:0}} animate={e?{opacity:1}:{x:0,opacity:1}} exit={e?{opacity:0,transition:{duration:0}}:{x:8,opacity:0,transition:{duration:.12,ease:R}}} transition={{duration:.18*!e,ease:R}} className={x("flex h-full min-h-0 flex-col bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","absolute inset-y-0 right-0 z-40 w-[min(100%,360px)] lg:relative lg:z-auto lg:w-[320px] lg:shrink-0")}>
              <div className={x(N,"h-12")}>
                <span className={x(k,m)}>{Q.ref}</span>
                <span className={x(w,y)}>{S.find(e=>e.id===V)?.name}</span>
                <button type="button" onClick={()=>B(null)} aria-label="Close details" className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]","ml-auto")}>
                  <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
              <div className={x("mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950","space-y-3 p-4")}>
                <h3 className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">{Q.title}</h3>
                <dl className={f}>
                  {[{k:"Assignee",v:Q.assignee},{k:"Priority",v:Q.priority},{k:"Estimate",v:`${Q.points} points`}].map(e=>(
                    <div key={e.k} className="flex min-h-10 items-center justify-between gap-4 py-2">
                                    <dt className="min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66">{e.k}</dt>
                                    <dd className="flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{e.v}</dd>
                                  </div>
                  ))}
                </dl>
                <div>
                  <p className={x(v,m,"mb-1.5")}>Move to</p>
                  <div className="grid grid-cols-2 gap-1">
                    {S.map(e=>(
                      <button key={e.id} type="button" aria-pressed={e.id===V} onClick={()=>{
                                        K(Q.id,e.id,t[e.id].length),E(`${Q.ref} moved to ${e.name}.`)
                                      }} className={x("relative inline-flex h-6 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40","justify-center")}>{e.name}</button>
                    ))}
                  </div>
                </div>
                <p className={x(b,h)}>{Q.summary}</p>
                <div>
                  <p className={x(v,m,"mb-1.5")}>Activity</p>
                  {0===Q.comments.length?<p className={x(b,m,"px-3 py-4 text-center")}>No comments yet</p>:<ul className={f}>
                    {Q.comments.map((e,t)=>(
                      <li key={t} className="py-2.5">
                                        <div className="flex items-center gap-2">
                                          <span className={x(_,"size-[20px]")}><span className={j}>{D(e.who)}</span></span>
                                          <span className={x("text-[14px]/[16px] font-[450]",p)}>{e.who}</span>
                                          <span className={x(v,m)}>{e.when}</span>
                                        </div>
                                        <p className={x(b,h,"mt-1.5")}>{e.text}</p>
                                      </li>
                    ))}
                  </ul>}
                </div>
              </div>
            </motion.aside>}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {L&&<motion.div key={"ghost"} initial={{opacity:.9}} animate={e?{opacity:1}:{opacity:1,scale:1.02,rotate:-1.5}} exit={{opacity:0,transition:{duration:.12}}} transition={{duration:.16,ease:R}} style={{left:W.x,top:W.y,width:W.w}} className="pointer-events-none absolute z-50">
            <div className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","gap-1 px-3 py-2")}>
              <span className={x(k,m)}>{M[L].ref}</span>
              <p className={A}>{M[L].title}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
        <p aria-live="polite" className="sr-only">{Y}</p>
      </div>
  );
}


export default I;
