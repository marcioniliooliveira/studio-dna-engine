/**
 * React Bits Pro — Application UI (kanban-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { col, getBoundingClientRect, i, id, index, left, length, map, name, querySelectorAll, t, top, useCallback, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_60041 = [["path",{d:"M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58661 = [["path",{d:"M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900 dark:text-neutral-100",
  m = "text-neutral-900/66 dark:text-neutral-100/66",
  f = "text-[13px]/[18px] font-normal",
  b = "text-[12px]/[16px] font-normal tabular-nums",
  g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  v = "size-7 rounded-[var(--rb-r-sm,6px)]",
  k = "rounded-[var(--rb-r-sm,6px)]",
  w = "flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  y = [.2,0,0,1],
  _ = {type:"spring",bounce:0,duration:.35},
  j = [{id:"inbox",name:"Inbox"},{id:"today",name:"Today"},{id:"doing",name:"Doing"},{id:"done",name:"Done"}],
  N = {t1:{id:"t1",title:"Rewrite the welcome email",list:"Lifecycle",done:3,total:4,assignee:"Ana Reyes"},t2:{id:"t2",title:"Cut the trial banner on paid plans",list:"Billing",done:0,total:2,assignee:"Wei Chen"},t3:{id:"t3",title:"Reconcile refund webhooks",list:"Billing",done:1,total:5,assignee:"Marco Silva"},t4:{id:"t4",title:"Ship the changelog RSS feed",list:"Growth",done:2,total:2,assignee:"Priya Nandakumar"},t5:{id:"t5",title:"Prune stale invite tokens",list:"Platform",done:0,total:3,assignee:"Wei Chen"},t6:{id:"t6",title:"Add a keyboard hint to search",list:"Craft",done:1,total:1,assignee:"Ana Reyes"},t7:{id:"t7",title:"Document the export limits",list:"Docs",done:0,total:4,assignee:"Priya Nandakumar"},t8:{id:"t8",title:"Move avatars to the CDN",list:"Platform",done:4,total:4,assignee:"Marco Silva"},t9:{id:"t9",title:"Retire the old status widget",list:"Craft",done:2,total:3,assignee:"Ana Reyes"},t10:{id:"t10",title:"Weekly digest opt-out",list:"Lifecycle",done:1,total:2,assignee:"Wei Chen"}},
  C = {inbox:["t5","t7","t2"],today:["t3","t9"],doing:["t1","t10"],done:["t4","t6","t8"]};

function A(){
  let e=useReducedMotion(),[t,r]=useState(C),[A,R]=useState("inbox"),[P,S]=useState(null),[M,$]=useState({x:0,y:0,w:0}),[D,z]=useState(""),I=useRef(null),B=useRef(new Map),L=useRef(null),H=useCallback(e=>Object.keys(t).find(r=>t[r].includes(e))??"inbox", [t]),W=useCallback((e,t,a)=>{
    r(r=>{
      let n={...r},i=null;
      for(let t of Object.keys(n))t.includes(e)&&(i=t);
      if(!i||i===t&&i.indexOf(e)===a)return r;
      i=i.filter(t=>t!==e);
      let l=i===t?i:[...t];
      return l.splice(Math.max(0,Math.min(a,l.length)),0,e),t=l,n;
    })
  }, []),X=(e,r)=>{
    let a=j.findIndex(t=>t.id===H(e)),n=j[a+r];
    n&&(W(e,id,t[id].length),z(`${N[e].title} moved to ${name}.`))
  },Y=useCallback((e,t,r)=>{
    for(let[a,n]of B.current){
      let i=getBoundingClientRect();
      if(e<i.left||e>i.right||0===i.width||0===i.height)continue;
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
  }, []),E=(e,t)=>{
    if(0!==e.button)return;
    let r=e.currentTarget.closest("[data-card]"),a=I.current;
    if(!r||!a)return;
    e.preventDefault();
    let n=r.getBoundingClientRect();
    L.current={id:t,dx:e.clientX-left,dy:e.clientY-top,w:width,active:false,startX:e.clientX,startY:e.clientY,pointerId:e.pointerId},a.setPointerCapture(e.pointerId),r.querySelector('[aria-roledescription="Draggable card"]')?.focus()
  },T=()=>{
    let e=L.current;
    if(!e)return;
    L.current=null;
    let t=I.current;
    t?.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),e.active&&z(`${N[e.id].title} moved to ${j.find(t=>t.id===H(e.id))?.name}.`),S(null)
  },O=useMemo(()=>Object.values(t).reduce((e,t)=>e+t.length,0), [t]);
  return (
    <div ref={I} onPointerMove={e=>{
        let t=L.current,r=I.current;
        if(!t||!r)return;
        if(!t.active){
          if(4>Math.hypot(e.clientX-t.startX,e.clientY-t.startY))return;
          t.active=true,S(t.id)
        }
        let a=r.getBoundingClientRect();
        $({x:e.clientX-a.left-t.dx,y:e.clientY-a.top-t.dy,w:t.w});
        let n=Y(e.clientX,e.clientY,t.id);
        n&&W(t.id,col,index)
      }} onPointerUp={T} onPointerCancel={T} onLostPointerCapture={T} className={p("bg-white dark:bg-neutral-950",h,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden",P&&"touch-none select-none")}>
        <header className="shrink-0 px-6 pt-6 pb-3 sm:px-8">
          <h2 className={p("text-[16px]/[20px] font-[450] tracking-[-0.015em]",h)}>Harbor tasks</h2>
          <p className={p(f,m,"mt-0.5 truncate")}>
            {O}
            {" tasks. Drag on a wide screen, or use the arrows on a card to move it one column at a time."}
          </p>
        </header>
        <div className="mx-6 mb-3 shrink-0 sm:mx-8 md:hidden">
          <div role="radiogroup" aria-label="Column" className={p("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","w-full overflow-x-auto")}>
            {j.map(e=>(
              <button key={e.id} type="button" role="radio" aria-checked={e.id===A} onClick={()=>R(e.id)} className={p("relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40","flex-1")}>
                        {e.name}
                        <span className="ms-0.5 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{t[e.id].length}</span>
                      </button>
            ))}
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6 sm:px-8">
          <div className="flex h-full gap-2.5 md:min-w-max">
            {j.map(r=>{
              let n=t[r.id],i=j.findIndex(e=>e.id===r.id),s=r.id===A;
              return (
                <section key={r.id} aria-label={r.name} className={p("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","h-full md:w-[248px] md:shrink-0",s?"w-full":"max-md:hidden")}>
                            <div className={p("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","max-md:hidden")}>
                              <span className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{r.name}</span>
                              <span className="shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{length}</span>
                            </div>
                            <div ref={e=>{
                              e?B.current.set(r.id,e):B.current.delete(r.id)
                            }} className={p("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","min-h-0 flex-1 overflow-y-auto p-1 max-md:mt-1")}>
                              {map(t=>{
                                let r=N[t],n=P===t;
                                return (
                                  <motion.div key={t} layout={!e&&"position"} transition={_} data-card={t} className={p(n&&p("rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8",k))}>
                                                    <div className={p("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",k,"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","px-2",n&&"invisible")}>
                                                      <div role="button" tabIndex={0} aria-roledescription="Draggable card" aria-label={`${r.title}. ${r.done} of ${r.total} subtasks done.`} onPointerDown={e=>{
                                                        "mouse"===e.pointerType&&E(e,t)
                                                      }} className={p("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","flex w-full cursor-grab flex-col gap-1.5 text-left")}>
                                                        <div className="flex items-center gap-1.5">
                                                          <span className={p(b,m,"truncate")}>{r.list}</span>
                                                          <span onPointerDown={e=>E(e,t)} style={{touchAction:"none"}} aria-hidden className={p(m,"ml-auto -mr-0.5 hidden cursor-grab md:inline")}>
                                                            <HugeiconsIcon icon={Icon_60041} size={14} strokeWidth={1.8} aria-hidden="true" />
                                                          </span>
                                                        </div>
                                                        <p className={w}>{r.title}</p>
                                                      </div>
                                                      <div className="flex w-full items-center gap-2">
                                                        <span className={p("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>
                                                          {r.done===r.total&&<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" />}
                                                          {r.done}
                                                          /
                                                          {r.total}
                                                        </span>
                                                        <span title={r.assignee} className={p("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                                                          <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                                                            {r.assignee.split(/[\s-]+/).filter(Boolean).slice(0,1).map(e=>e[0]?.toUpperCase()).join("")}
                                                          </span>
                                                        </span>
                                                        <div className="ml-auto flex items-center gap-0.5">
                                                          <button type="button" disabled={0===i} onClick={()=>X(t,-1)} aria-label={`Move ${r.title} to ${j[i-1]?.name??"previous column"}`} className={p(g,v)}>
                                                            <HugeiconsIcon icon={Icon_58661} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                          </button>
                                                          <button type="button" disabled={i===j.length-1} onClick={()=>X(t,1)} aria-label={`Move ${r.title} to ${j[i+1]?.name??"next column"}`} className={p(g,v)}>
                                                            <HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </motion.div>
                                );
                              })}
                              {0===length&&<p className={p(f,m,"px-3 py-6 text-center")}>Nothing here yet</p>}
                            </div>
                          </section>
              );
            })}
          </div>
        </div>
        <AnimatePresence>
          {P&&<motion.div key={"ghost"} initial={{opacity:.9}} animate={e?{opacity:1}:{opacity:1,scale:1.02,rotate:-1.5}} exit={{opacity:0,transition:{duration:.12}}} transition={{duration:.16,ease:y}} style={{left:M.x,top:M.y,width:M.w}} className="pointer-events-none absolute z-50">
            <div className={p("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","gap-1 px-3 py-2")}>
              <span className={p(b,m)}>{N[P].list}</span>
              <p className={w}>{N[P].title}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
        <p aria-live="polite" className="sr-only">{D}</p>
      </div>
  );
}


export default A;
