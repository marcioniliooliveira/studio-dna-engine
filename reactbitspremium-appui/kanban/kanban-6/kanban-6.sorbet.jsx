/**
 * React Bits Pro — Application UI (kanban-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { col, getBoundingClientRect, i, id, index, left, length, map, name, querySelectorAll, t, top, useCallback, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_60041 = [["path",{d:"M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58661 = [["path",{d:"M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" ");

let b = "text-neutral-900 dark:text-neutral-100";

let h = "text-neutral-900/62 dark:text-neutral-100/62";

let m = "text-[14px]/[20px] font-medium";

let f = "text-[13px]/[16px] font-bold tabular-nums";

let g = "font-mono text-[12px]/[16px] tabular-nums";

let k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let v = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none";

let w = "flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]";

let y = "rounded-[var(--rb-r-4xl,18px)]";

let j = "flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let N = u("text-[15px]/[20px] font-bold tabular-nums","text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]");

let C = [.2,0,0,1];

let A = {type:"spring",bounce:0,duration:.35};

let eV = (...e)=>e.filter(Boolean).join(" ");

let eJ = "text-neutral-900 dark:text-neutral-100";

let eQ = "text-neutral-900/62 dark:text-neutral-100/62";

let e0 = "text-[14px]/[20px] font-medium";

let e1 = "text-[13px]/[16px] font-semibold tabular-nums";

let e2 = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let e5 = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let e6 = "rounded-[var(--rb-r-4xl,18px)]";

let e8 = "flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let e4 = [.2,0,0,1];

let e9 = {type:"spring",bounce:0,duration:.35};

let e3 = [{id:"inbox",name:"Inbox"},{id:"today",name:"Today"},{id:"doing",name:"Doing"},{id:"done",name:"Done"}];

let e7 = {t1:{id:"t1",title:"Rewrite the welcome email",list:"Lifecycle",done:3,total:4,assignee:"Ana Reyes"},t2:{id:"t2",title:"Cut the trial banner on paid plans",list:"Billing",done:0,total:2,assignee:"Wei Chen"},t3:{id:"t3",title:"Reconcile refund webhooks",list:"Billing",done:1,total:5,assignee:"Marco Silva"},t4:{id:"t4",title:"Ship the changelog RSS feed",list:"Growth",done:2,total:2,assignee:"Priya Nandakumar"},t5:{id:"t5",title:"Prune stale invite tokens",list:"Platform",done:0,total:3,assignee:"Wei Chen"},t6:{id:"t6",title:"Add a keyboard hint to search",list:"Craft",done:1,total:1,assignee:"Ana Reyes"},t7:{id:"t7",title:"Document the export limits",list:"Docs",done:0,total:4,assignee:"Priya Nandakumar"},t8:{id:"t8",title:"Move avatars to the CDN",list:"Platform",done:4,total:4,assignee:"Marco Silva"},t9:{id:"t9",title:"Retire the old status widget",list:"Craft",done:2,total:3,assignee:"Ana Reyes"},t10:{id:"t10",title:"Weekly digest opt-out",list:"Lifecycle",done:1,total:2,assignee:"Wei Chen"}};

let te = {inbox:["t5","t7","t2"],today:["t3","t9"],doing:["t1","t10"],done:["t4","t6","t8"]};


export default function kanban_6__Sorbet__Component(){
  let e=useReducedMotion(),[t,r]=useState(te),[c,d]=useState("inbox"),[x,p]=useState(null),[u,b]=useState({x:0,y:0,w:0}),[h,m]=useState(""),f=useRef(null),g=useRef(new Map),k=useRef(null),v=useCallback(e=>Object.keys(t).find(r=>t[r].includes(e))??"inbox", [t]),w=useCallback((e,t,a)=>{
    r(r=>{
      let n={...r},i=null;
      for(let t of Object.keys(n))t.includes(e)&&(i=t);
      if(!i||i===t&&i.indexOf(e)===a)return r;
      i=i.filter(t=>t!==e);
      let l=i===t?i:[...t];
      return l.splice(Math.max(0,Math.min(a,l.length)),0,e),t=l,n;
    })
  }, []),y=(e,r)=>{
    let a=e3.findIndex(t=>t.id===v(e)),n=e3[a+r];
    n&&(w(e,id,t[id].length),m(`${e7[e].title} moved to ${name}.`))
  },j=useCallback((e,t,r)=>{
    for(let[a,n]of g.current){
      let i=getBoundingClientRect();
      if(e<i.left||e>i.right||0===i.width||0===i.height)continue;
      let l=Array.from(querySelectorAll("[data-card]")).filter(e=>e.dataset.card!==r),o=l.length;
      for(let e=0;e<l.length;e++){
        let r=l[e].getBoundingClientRect();
        if(t<r.top+r.height/2){
          o=e;
          break
        }
      }
      return {col:a,index:o};
    }
    return null;
  }, []),N=(e,t)=>{
    if(0!==e.button)return;
    let r=e.currentTarget.closest("[data-card]"),a=f.current;
    if(!r||!a)return;
    e.preventDefault();
    let n=r.getBoundingClientRect();
    k.current={id:t,dx:e.clientX-left,dy:e.clientY-top,w:width,active:false,startX:e.clientX,startY:e.clientY,pointerId:e.pointerId},a.setPointerCapture(e.pointerId),r.querySelector('[aria-roledescription="Draggable card"]')?.focus()
  },C=()=>{
    let e=k.current;
    if(!e)return;
    k.current=null;
    let t=f.current;
    t?.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),e.active&&m(`${e7[e.id].title} moved to ${e3.find(t=>t.id===v(e.id))?.name}.`),p(null)
  },A=useMemo(()=>Object.values(t).reduce((e,t)=>e+t.length,0), [t]);
  return (
    <div ref={f} onPointerMove={e=>{
        let t=k.current,r=f.current;
        if(!t||!r)return;
        if(!t.active){
          if(4>Math.hypot(e.clientX-t.startX,e.clientY-t.startY))return;
          t.active=true,p(t.id)
        }
        let a=r.getBoundingClientRect();
        b({x:e.clientX-a.left-t.dx,y:e.clientY-a.top-t.dy,w:t.w});
        let n=j(e.clientX,e.clientY,t.id);
        n&&w(t.id,col,index)
      }} onPointerUp={C} onPointerCancel={C} onLostPointerCapture={C} className={eV("bg-white dark:bg-neutral-950",eJ,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden",x&&"touch-none select-none")}>
        <header className="shrink-0 px-6 pt-6 pb-3 sm:px-8">
          <h2 className={eV("text-[17px]/[22px] font-extrabold",eJ)}>Harbor tasks</h2>
          <p className={eV(e0,eQ,"mt-0.5 truncate")}>
            {A}
            {" tasks. Drag on a wide screen, or use the arrows on a card to move it one column at a time."}
          </p>
        </header>
        <div className="mx-6 mb-3 shrink-0 sm:mx-8 md:hidden">
          <div role="radiogroup" aria-label="Column" className={eV("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","w-full overflow-x-auto")}>
            {e3.map(e=>(
              <button key={e.id} type="button" role="radio" aria-checked={e.id===c} onClick={()=>d(e.id)} className={eV("relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40","flex-1")}>
                        {e.name}
                        <span className="ms-0.5 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{t[e.id].length}</span>
                      </button>
            ))}
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6 sm:px-8">
          <div className="flex h-full gap-2.5 md:min-w-max">
            {e3.map(r=>{
              let n=t[r.id],i=e3.findIndex(e=>e.id===r.id),o=r.id===c;
              return (
                <section key={r.id} aria-label={r.name} className={eV("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","h-full md:w-[248px] md:shrink-0",o?"w-full":"max-md:hidden")}>
                            <div className={eV("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","max-md:hidden")}>
                              <span className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">{r.name}</span>
                              <span className="shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{length}</span>
                            </div>
                            <div ref={e=>{
                              e?g.current.set(r.id,e):g.current.delete(r.id)
                            }} className={eV("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","min-h-0 flex-1 overflow-y-auto p-1 max-md:mt-1")}>
                              {map(t=>{
                                let r=e7[t],n=x===t;
                                return (
                                  <motion.div key={t} layout={!e&&"position"} transition={e9} data-card={t} className={eV(n&&eV("rounded-[calc(var(--rb-r-lg,10px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8",e6))}>
                                                    <div className={eV("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",e6,"hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","px-2",n&&"invisible")}>
                                                      <div role="button" tabIndex={0} aria-roledescription="Draggable card" aria-label={`${r.title}. ${r.done} of ${r.total} subtasks done.`} onPointerDown={e=>{
                                                        "mouse"===e.pointerType&&N(e,t)
                                                      }} className={eV("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","flex w-full cursor-grab flex-col gap-1.5 text-left")}>
                                                        <div className="flex items-center gap-1.5">
                                                          <span className={eV(e1,eQ,"truncate")}>{r.list}</span>
                                                          <span onPointerDown={e=>N(e,t)} style={{touchAction:"none"}} aria-hidden className={eV(eQ,"ml-auto -mr-0.5 hidden cursor-grab md:inline")}>
                                                            <HugeiconsIcon icon={Icon_60041} size={16} strokeWidth={2} aria-hidden="true" />
                                                          </span>
                                                        </div>
                                                        <p className={e8}>{r.title}</p>
                                                      </div>
                                                      <div className="flex w-full items-center gap-2">
                                                        <span className={eV("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>
                                                          {r.done===r.total&&<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} aria-hidden="true" />}
                                                          {r.done}
                                                          /
                                                          {r.total}
                                                        </span>
                                                        <span title={r.assignee} className={eV("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                                                          <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">
                                                            {r.assignee.split(/[\s-]+/).filter(Boolean).slice(0,1).map(e=>e[0]?.toUpperCase()).join("")}
                                                          </span>
                                                        </span>
                                                        <div className="ml-auto flex items-center gap-0.5">
                                                          <button type="button" disabled={0===i} onClick={()=>y(t,-1)} aria-label={`Move ${r.title} to ${e3[i-1]?.name??"previous column"}`} className={eV(e2,e5)}>
                                                            <HugeiconsIcon icon={Icon_58661} size={18} strokeWidth={2} aria-hidden="true" />
                                                          </button>
                                                          <button type="button" disabled={i===e3.length-1} onClick={()=>y(t,1)} aria-label={`Move ${r.title} to ${e3[i+1]?.name??"next column"}`} className={eV(e2,e5)}><HugeiconsIcon icon={Icon_5042} size={18} strokeWidth={2} aria-hidden="true" /></button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </motion.div>
                                );
                              })}
                              {0===length&&<p className={eV(e0,eQ,"px-3 py-6 text-center")}>Nothing here yet</p>}
                            </div>
                          </section>
              );
            })}
          </div>
        </div>
        <AnimatePresence>
          {x&&<motion.div key={"ghost"} initial={{opacity:.9}} animate={e?{opacity:1}:{opacity:1,scale:1.02,rotate:-1.5}} exit={{opacity:0,transition:{duration:.12}}} transition={{duration:.16,ease:e4}} style={{left:u.x,top:u.y,width:u.w}} className="pointer-events-none absolute z-50">
            <div className={eV("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","gap-1 px-3 py-2")}>
              <span className={eV(e1,eQ)}>{e7[x].list}</span>
              <p className={e8}>{e7[x].title}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
        <p aria-live="polite" className="sr-only">{h}</p>
      </div>
  );
}
