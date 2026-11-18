/**
 * React Bits Pro — Application UI (kanban-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { col, getBoundingClientRect, i, index, left, length, map, querySelectorAll, t, top, useCallback, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_60041 = [["path",{d:"M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

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

let R = {h1:{id:"h1",ref:"HAL-241",title:"Retry billing webhooks that fail on timeout",tag:"Billing",assignee:"Ana Reyes",comments:4,files:1,priority:"High"},h2:{id:"h2",ref:"HAL-238",title:"Seat count drifts after a downgrade",tag:"Billing",assignee:"Priya Nandakumar",comments:2,files:0,priority:"High"},h3:{id:"h3",ref:"HAL-236",title:"Audit log export times out past 90 days",tag:"Platform",assignee:"Marco Silva",comments:0,files:3,priority:"Medium"},h4:{id:"h4",ref:"HAL-233",title:"Add SCIM group mapping to the admin console",tag:"Identity",assignee:"Wei Chen",comments:6,files:2,priority:"Medium"},h5:{id:"h5",ref:"HAL-229",title:"Deprecate the v1 usage endpoint",tag:"API",assignee:"Sofia Alvarez",comments:1,files:0,priority:"Low"},h6:{id:"h6",ref:"HAL-226",title:"Rework the empty state on first workspace",tag:"Growth",assignee:"Ana Reyes",comments:3,files:1,priority:"Medium"},h7:{id:"h7",ref:"HAL-221",title:"Cache invalidation on role change is slow",tag:"Platform",assignee:"Marco Silva",comments:8,files:0,priority:"High"},h8:{id:"h8",ref:"HAL-217",title:"Ship the invoice PDF redesign",tag:"Billing",assignee:"Priya Nandakumar",comments:2,files:4,priority:"Low"},h9:{id:"h9",ref:"HAL-214",title:"Backfill workspace regions for EU tenants",tag:"Platform",assignee:"Wei Chen",comments:0,files:0,priority:"Medium"},h10:{id:"h10",ref:"HAL-208",title:"Rotate signing keys without downtime",tag:"Identity",assignee:"Sofia Alvarez",comments:5,files:1,priority:"High"}};

let P = [{id:"backlog",name:"Backlog",limit:0},{id:"progress",name:"In progress",limit:4},{id:"review",name:"In review",limit:3},{id:"done",name:"Done",limit:0}];

let M = {backlog:["h1","h5","h9"],progress:["h2","h7","h4"],review:["h3","h10"],done:["h6","h8"]};

let ex = (...e)=>e.filter(Boolean).join(" ");

let ep = "text-neutral-900 dark:text-neutral-100";

let eu = "text-neutral-900/78 dark:text-neutral-100/78";

let eb = "text-neutral-900/62 dark:text-neutral-100/62";

let eh = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let em = "text-[14px]/[20px] font-medium";

let ef = "text-[13px]/[16px] font-bold tabular-nums";

let eg = "text-[13px]/[16px] font-semibold tabular-nums";

let ek = "font-mono text-[12px]/[16px] tabular-nums";

let ev = "inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums";

let ew = "bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12";

let ey = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none";

let ej = "flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]";

let eN = "flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5";

let eC = "rounded-[var(--rb-r-4xl,18px)]";

let eA = "flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let eR = [.2,0,0,1];

let eP = {type:"spring",bounce:0,duration:.35};

let eM = [{id:"todo",name:"To do"},{id:"progress",name:"In progress"},{id:"review",name:"In review"},{id:"done",name:"Done"}];

let eS = {k1:{id:"k1",ref:"CDR-118",title:"Recover partial uploads after a dropped connection",summary:"Large uploads restart from zero when the socket drops. Store the chunk offset so the client can resume where it left off.",assignee:"Ana Reyes",priority:"Urgent",points:8,comments:[{who:"Marco Silva",when:"2 days ago",text:"Reproduced on a 400 MB file over a throttled connection."},{who:"Ana Reyes",when:"yesterday",text:"Chunk offsets are already stored. The client just never reads them back."}]},k2:{id:"k2",ref:"CDR-114",title:"Trash keeps deleted folders for 30 days",summary:"Restoring a folder should bring its children back with the original hierarchy intact.",assignee:"Priya Nandakumar",priority:"High",points:5,comments:[{who:"Priya Nandakumar",when:"3 days ago",text:"Retention job is written. Restore path still flattens nested folders."}]},k3:{id:"k3",ref:"CDR-109",title:"Bulk share links expire on a schedule",summary:"Owners want an expiry they can set once and apply to every link in a folder.",assignee:"Wei Chen",priority:"Normal",points:3,comments:[]},k4:{id:"k4",ref:"CDR-104",title:"Preview HEIC images without downloading",summary:"Convert on the fly at request time and cache the result for a week.",assignee:"Marco Silva",priority:"Normal",points:5,comments:[{who:"Wei Chen",when:"last week",text:"Conversion adds about 180 ms on a cold cache. Acceptable."}]},k5:{id:"k5",ref:"CDR-98",title:"Audit trail for permission changes",summary:"Every grant and revoke needs an immutable entry with the actor and the reason.",assignee:"Ana Reyes",priority:"High",points:8,comments:[]},k6:{id:"k6",ref:"CDR-91",title:"Drag files straight onto a folder row",summary:"The row should accept a drop and show a clear target state while hovering.",assignee:"Priya Nandakumar",priority:"Normal",points:2,comments:[{who:"Ana Reyes",when:"4 days ago",text:"Shipped behind a flag. Waiting on copy for the empty folder case."}]},k7:{id:"k7",ref:"CDR-87",title:"Storage meter in the sidebar footer",summary:"Show used against plan, and link to the upgrade page past 80%.",assignee:"Wei Chen",priority:"Normal",points:2,comments:[]}};

let eL = {todo:["k3","k5"],progress:["k1","k2"],review:["k4"],done:["k6","k7"]};

let e$ = e=>e.split(/[\s-]+/).filter(Boolean).slice(0,1).map(e=>e[0]?.toUpperCase()).join("");

let eD = {Urgent:ep,High:eu,Normal:eb};


export default function kanban_4__Sorbet__Component(){
  let e=useReducedMotion(),[t,r]=useState(eL),[c,p]=useState("k1"),[u,b]=useState(null),[h,m]=useState({x:0,y:0,w:0}),[f,g]=useState(""),k=useRef(null),v=useRef(new Map),w=useRef(null),y=useCallback(e=>Object.keys(t).find(r=>t[r].includes(e))??"todo", [t]),j=useCallback((e,t,a)=>{
    r(r=>{
      let n={...r},i=null;
      for(let t of Object.keys(n))t.includes(e)&&(i=t);
      if(!i||i===t&&i.indexOf(e)===a)return r;
      i=i.filter(t=>t!==e);
      let l=i===t?i:[...t];
      return l.splice(Math.max(0,Math.min(a,l.length)),0,e),t=l,n;
    })
  }, []),N=useCallback((e,t,r)=>{
    for(let[a,n]of v.current){
      let i=getBoundingClientRect();
      if(e<i.left||e>i.right)continue;
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
  }, []),C=(e,t)=>{
    if(0!==e.button)return;
    let r=e.currentTarget.closest("[data-card]"),a=k.current;
    if(!r||!a)return;
    e.preventDefault();
    let n=r.getBoundingClientRect();
    w.current={id:t,dx:e.clientX-left,dy:e.clientY-top,w:width,active:false,startX:e.clientX,startY:e.clientY,pointerId:e.pointerId},a.setPointerCapture(e.pointerId),r.querySelector('[aria-roledescription="Draggable card"]')?.focus()
  },A=()=>{
    let e=w.current;
    if(!e)return;
    w.current=null;
    let t=k.current;
    t?.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),e.active?g(`${eS[e.id].ref} moved to ${eM.find(t=>t.id===y(e.id))?.name}.`):p(e.id),b(null)
  },R=c?eS[c]:null,P=c?y(c):"todo",M=useMemo(()=>Object.values(t).reduce((e,t)=>e+t.length,0), [t]);
  return (
    <div ref={k} onPointerMove={e=>{
        let t=w.current,r=k.current;
        if(!t||!r)return;
        if(!t.active){
          if(4>Math.hypot(e.clientX-t.startX,e.clientY-t.startY))return;
          t.active=true,b(t.id)
        }
        let a=r.getBoundingClientRect();
        m({x:e.clientX-a.left-t.dx,y:e.clientY-a.top-t.dy,w:t.w});
        let n=N(e.clientX,e.clientY,t.id);
        n&&j(t.id,col,index)
      }} onPointerUp={A} onPointerCancel={A} onLostPointerCapture={A} className={ex("bg-white dark:bg-neutral-950",ep,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden",u&&"touch-none select-none")}>
        <header className="shrink-0 px-6 pt-6 pb-4 sm:px-8">
          <h2 className={ex("text-[17px]/[22px] font-extrabold",ep)}>Cedar Labs delivery</h2>
          <p className={ex(em,eb,"mt-0.5 truncate")}>
            {M}
            {" items. Click a card to open it, or drag it to another column."}
          </p>
        </header>
        <div className="relative flex min-h-0 flex-1">
          <motion.div layout={!e} transition={eP} className={ex("min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6 sm:px-8",R&&"border-r border-transparent")}>
            <div className="flex h-full min-w-max gap-2.5">
              {eM.map(r=>{
                let n=t[r.id];
                return (
                  <section key={r.id} aria-label={r.name} className={ex("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","h-full w-[236px] shrink-0")}>
                                <div className={eN}>
                                  <span className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">{r.name}</span>
                                  <span className="shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{length}</span>
                                </div>
                                <div ref={e=>{
                                  e?v.current.set(r.id,e):v.current.delete(r.id)
                                }} className={ex("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0",eh,"min-h-0 flex-1 overflow-y-auto p-1")}>
                                  {map(t=>{
                                    let r=eS[t],n=u===t,i=c===t;
                                    return (
                                      <motion.div key={t} layout={!e&&"position"} transition={eP} data-card={t} className={ex(n&&ex("rounded-[calc(var(--rb-r-lg,10px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8",eC))}>
                                                          <div role="button" tabIndex={0} aria-pressed={i} aria-roledescription="Draggable card" aria-label={`${r.ref}: ${r.title}`} onPointerDown={e=>{
                                                            "mouse"===e.pointerType&&C(e,t)
                                                          }} onClick={()=>p(t)} onKeyDown={e=>{
                                                            ("Enter"===e.key||" "===e.key)&&(e.preventDefault(),p(t))
                                                          }} className={ex("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",eC,i?ex("bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","cursor-pointer"):"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","px-2",n&&"invisible")}>
                                                            <div className="flex w-full items-center gap-2">
                                                              <span className={ex(ef,eD[r.priority])}>{r.priority}</span>
                                                              <span className={ex(ek,eb)}>{r.ref}</span>
                                                              <span onPointerDown={e=>C(e,t)} style={{touchAction:"none"}} aria-hidden className={ex(eb,"ml-auto -mr-0.5 cursor-grab")}>
                                                                <HugeiconsIcon icon={Icon_60041} size={16} strokeWidth={2} aria-hidden="true" />
                                                              </span>
                                                            </div>
                                                            <p className={ex(eA,"w-full")}>{r.title}</p>
                                                            <div className="flex w-full items-center gap-2">
                                                              <span className={ex(ev,ew)}>
                                                                {r.points}
                                                                {" pts"}
                                                              </span>
                                                              {r.comments.length>0&&<span className={ex(ef,eb,"inline-flex items-center gap-1")}>
                                                                <HugeiconsIcon icon={Icon_36586} size={14} strokeWidth={2} aria-hidden="true" />
                                                                {r.comments.length}
                                                              </span>}
                                                              <span title={r.assignee} className={ex(ey,"ml-auto size-[24px]")}><span className={ej}>{e$(r.assignee)}</span></span>
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
            {R&&<motion.button key={"scrim"} type="button" aria-label="Close details" onClick={()=>p(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e}}} transition={{duration:.18*!e,ease:eR}} className={ex("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70","absolute inset-0 z-30 cursor-pointer lg:hidden")} />}
          </AnimatePresence>
          <AnimatePresence>
            {R&&<motion.aside key={"detail"} aria-label={`${R.ref} details`} initial={e?{opacity:0}:{x:8,opacity:0}} animate={e?{opacity:1}:{x:0,opacity:1}} exit={e?{opacity:0,transition:{duration:0}}:{x:8,opacity:0,transition:{duration:.12,ease:eR}}} transition={{duration:.18*!e,ease:eR}} className={ex("flex h-full min-h-0 flex-col bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute inset-y-0 right-0 z-40 w-[min(100%,360px)] lg:relative lg:z-auto lg:w-[320px] lg:shrink-0")}>
              <div className={ex(eN,"h-12")}>
                <span className={ex(ek,eb)}>{R.ref}</span>
                <span className={ex(ev,ew)}>{eM.find(e=>e.id===P)?.name}</span>
                <button type="button" onClick={()=>p(null)} aria-label="Close details" className={ex("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-8 rounded-[calc(var(--rb-r-full,999px))]","ml-auto")}>
                  <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              <div className={ex("mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:last-child]:mb-1","space-y-3 p-4")}>
                <h3 className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">{R.title}</h3>
                <dl className={eh}>
                  {[{k:"Assignee",v:R.assignee},{k:"Priority",v:R.priority},{k:"Estimate",v:`${R.points} points`}].map(e=>(
                    <div key={e.k} className="flex min-h-10 items-center justify-between gap-4 py-2">
                                    <dt className="min-w-0 text-[15px]/[20px] font-bold text-neutral-900/62 dark:text-neutral-100/62">{e.k}</dt>
                                    <dd className="flex min-w-0 flex-wrap items-center gap-2 text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{e.v}</dd>
                                  </div>
                  ))}
                </dl>
                <div>
                  <p className={ex(eg,eb,"mb-1.5")}>Move to</p>
                  <div className="grid grid-cols-2 gap-1">
                    {eM.map(e=>(
                      <button key={e.id} type="button" aria-pressed={e.id===P} onClick={()=>{
                                        j(R.id,e.id,t[e.id].length),g(`${R.ref} moved to ${e.name}.`)
                                      }} className={ex("relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3 text-[13px]/[16px] font-bold tabular-nums text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40","justify-center")}>{e.name}</button>
                    ))}
                  </div>
                </div>
                <p className={ex(em,eu)}>{R.summary}</p>
                <div>
                  <p className={ex(eg,eb,"mb-1.5")}>Activity</p>
                  {0===R.comments.length?<p className={ex(em,eb,"px-3 py-4 text-center")}>No comments yet</p>:<ul className={eh}>
                    {R.comments.map((e,t)=>(
                      <li key={t} className="py-2.5">
                                        <div className="flex items-center gap-2">
                                          <span className={ex(ey,"size-[20px]")}><span className={ej}>{e$(e.who)}</span></span>
                                          <span className={ex("text-[15px]/[20px] font-bold",ep)}>{e.who}</span>
                                          <span className={ex(eg,eb)}>{e.when}</span>
                                        </div>
                                        <p className={ex(em,eu,"mt-1.5")}>{e.text}</p>
                                      </li>
                    ))}
                  </ul>}
                </div>
              </div>
            </motion.aside>}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {u&&<motion.div key={"ghost"} initial={{opacity:.9}} animate={e?{opacity:1}:{opacity:1,scale:1.02,rotate:-1.5}} exit={{opacity:0,transition:{duration:.12}}} transition={{duration:.16,ease:eR}} style={{left:h.x,top:h.y,width:h.w}} className="pointer-events-none absolute z-50">
            <div className={ex("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","gap-1 px-3 py-2")}>
              <span className={ex(ek,eb)}>{eS[u].ref}</span>
              <p className={eA}>{eS[u].title}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
        <p aria-live="polite" className="sr-only">{f}</p>
      </div>
  );
}
