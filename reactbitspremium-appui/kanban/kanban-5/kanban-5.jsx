/**
 * React Bits Pro — Application UI (kanban-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { assignee, blocked, col, getBoundingClientRect, i, index, left, length, map, points, querySelectorAll, ref, t, title, top, useCallback, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_60041 = [["path",{d:"M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[13px]/[18px] font-normal",
  h = "font-mono text-[12px]/[16px] tabular-nums",
  m = "rounded-[var(--rb-r-sm,6px)]",
  f = "flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  b = "relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7",
  g = c("text-[14px]/[16px] font-[450] tabular-nums","text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]"),
  v = [.2,0,0,1],
  k = {type:"spring",bounce:0,duration:.35},
  w = [{id:"committed",name:"Committed",capacity:21},{id:"building",name:"Building",capacity:13},{id:"verifying",name:"Verifying",capacity:8},{id:"accepted",name:"Accepted",capacity:0}],
  y = {s1:{id:"s1",ref:"MER-52",title:"Split the ingest queue by tenant",points:8,assignee:"Marco Silva"},s2:{id:"s2",ref:"MER-49",title:"Retry policy for failed exports",points:5,assignee:"Ana Reyes"},s3:{id:"s3",ref:"MER-47",title:"Surface sync errors in the header",points:3,assignee:"Priya Nandakumar"},s4:{id:"s4",ref:"MER-45",title:"Warm the report cache nightly",points:5,assignee:"Wei Chen",blocked:true},s5:{id:"s5",ref:"MER-43",title:"Per-workspace rate limits",points:8,assignee:"Marco Silva"},s6:{id:"s6",ref:"MER-40",title:"Trim the onboarding checklist",points:2,assignee:"Ana Reyes"},s7:{id:"s7",ref:"MER-38",title:"Signed URLs for shared exports",points:3,assignee:"Priya Nandakumar"},s8:{id:"s8",ref:"MER-35",title:"Collapse duplicate alert emails",points:5,assignee:"Wei Chen"},s9:{id:"s9",ref:"MER-31",title:"Timezone picker on scheduled reports",points:2,assignee:"Ana Reyes"},s10:{id:"s10",ref:"MER-28",title:"Backfill missing usage rows",points:3,assignee:"Marco Silva"}},
  _ = {committed:["s1","s5","s9"],building:["s2","s4"],verifying:["s3","s7"],accepted:["s6","s8","s10"]};

function j(){
  let e=useReducedMotion(),[t,r]=useState(_),[j,N]=useState(null),[C,A]=useState(null),[R,P]=useState({x:0,y:0,w:0}),[S,M]=useState(""),$=useRef(null),D=useRef(new Map),z=useRef(null),I=useCallback(e=>Object.keys(t).find(r=>t[r].includes(e))??"committed", [t]),B=useCallback((e,t,a)=>{
    r(r=>{
      let n={...r},i=null;
      for(let t of Object.keys(n))t.includes(e)&&(i=t);
      if(!i||i===t&&i.indexOf(e)===a)return r;
      i=i.filter(t=>t!==e);
      let l=i===t?i:[...t];
      return l.splice(Math.max(0,Math.min(a,l.length)),0,e),t=l,n;
    })
  }, []),L=useCallback((e,t,r)=>{
    for(let[a,n]of D.current){
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
  }, []),H=(e,t)=>{
    if(0!==e.button)return;
    let r=e.currentTarget.closest("[data-card]"),a=$.current;
    if(!r||!a)return;
    e.preventDefault();
    let n=r.getBoundingClientRect();
    z.current={id:t,dx:e.clientX-left,dy:e.clientY-top,w:width,active:false,startX:e.clientX,startY:e.clientY,pointerId:e.pointerId},a.setPointerCapture(e.pointerId),r.querySelector('[aria-roledescription="Draggable card"]')?.focus()
  },W=()=>{
    let e=z.current;
    if(!e)return;
    z.current=null;
    let t=$.current;
    t?.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),e.active&&M(`${y[e.id].ref} moved to ${w.find(t=>t.id===I(e.id))?.name}.`),N(null)
  },X=useMemo(()=>{
    let e={};
    for(let r of w)e[r.id]=t[r.id].reduce((e,t)=>e+y[t].points,0);
    return e;
  }, [t]),Y=Object.values(X).reduce((e,t)=>e+t,0),E=X.accepted,T=Y?Math.round(E/Y*100):0;
  return (
    <div ref={$} onPointerMove={e=>{
        let t=z.current,r=$.current;
        if(!t||!r)return;
        if(!t.active){
          if(4>Math.hypot(e.clientX-t.startX,e.clientY-t.startY))return;
          t.active=true,A(null),N(t.id)
        }
        let a=r.getBoundingClientRect();
        P({x:e.clientX-a.left-t.dx,y:e.clientY-a.top-t.dy,w:t.w});
        let n=L(e.clientX,e.clientY,t.id);
        n&&B(t.id,col,index)
      }} onPointerUp={W} onPointerCancel={W} onLostPointerCapture={W} className={c("bg-white dark:bg-neutral-950",u,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden",j&&"touch-none select-none")}>
        <header className="shrink-0 px-6 pt-6 pb-4 sm:px-8">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={c("text-[16px]/[20px] font-[450] tracking-[-0.015em]",u,"flex flex-wrap gap-x-2")}>
                <span>Sprint 34</span>
                <span className={x}>Meridian</span>
              </h2>
              <p className={c(p,x,"mt-0.5 truncate")}>4 June to 18 June. Six days left. Columns show points against capacity.</p>
            </div>
          </div>
          <div className="@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900">
            <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
              {[{k:"Committed",v:Y,unit:"pts"},{k:"Accepted",v:E,unit:"pts"},{k:"Burned",v:T,unit:"%"}].map(e=>(
                <div key={e.k} className="flex min-w-0 flex-col gap-2 px-4 py-3">
                            <p className="text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">{e.k}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                              {e.v}
                              <span className="ms-0.5 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">{e.unit}</span>
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6 sm:px-8">
          <div className="flex h-full min-w-max gap-2.5">
            {w.map(r=>{
              let n=t[r.id],i=X[r.id],s=r.capacity>0&&i>r.capacity,u=r.capacity?Math.min(100,i/r.capacity*100):0;
              return (
                <section key={r.id} aria-label={r.name} className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","h-full w-[244px] shrink-0")}>
                            <div className="shrink-0 px-4 py-2">
                              <div className="flex h-6 items-center gap-2">
                                <span className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{r.name}</span>
                                <span className={c(s?g:"shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","ml-auto")}>
                                  {i}
                                  {r.capacity>0?` / ${r.capacity} pts`:" pts"}
                                </span>
                              </div>
                              <div className="mt-1.5">
                                {r.capacity>0?<div role="progressbar" aria-valuemin={0} aria-valuemax={r.capacity} aria-valuenow={i} aria-label={`${r.name} capacity`} className={b}>
                                  <span style={{width:`${u}%`}} className={s?c("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"):"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100"} />
                                </div>:<div aria-hidden="true" className={c(b,"invisible")} />}
                              </div>
                            </div>
                            <div ref={e=>{
                              e?D.current.set(r.id,e):D.current.delete(r.id)
                            }} className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","min-h-0 flex-1 overflow-y-auto p-1")}>
                              {map(r=>{
                                let n=y[r],i=j===r,s=C===r;
                                return (
                                  <motion.div key={r} layout={!e&&"position"} transition={k} data-card={r} className={c(i&&c("rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8",m))}>
                                                    <div role="button" tabIndex={0} aria-roledescription="Draggable card" aria-label={`${ref}: ${title}, ${points} points${blocked?", blocked":""}.`} onPointerDown={e=>{
                                                      "mouse"===e.pointerType&&H(e,r)
                                                    }} onKeyDown={e=>((e,r)=>{
                                                      let a=I(r),n=t[a].indexOf(r),i=w.findIndex(e=>e.id===a);
                                                      if(" "===e.key||"Enter"===e.key){
                                                        e.preventDefault();
                                                        let t=C===r?null:r;
                                                        A(t),M(t?`${y[r].ref} grabbed. Arrow keys move it.`:`${y[r].ref} dropped in ${w[i].name}.`);
                                                        return
                                                      }
                                                      if("Escape"===e.key&&C===r){
                                                        e.preventDefault(),A(null),M("Move cancelled.");
                                                        return
                                                      }
                                                      if(C!==r)return;
                                                      let l=true;
                                                      "ArrowUp"===e.key?B(r,a,Math.max(0,n-1)):"ArrowDown"===e.key?B(r,a,n+1):"ArrowLeft"===e.key&&i>0?B(r,w[i-1].id,t[w[i-1].id].length):"ArrowRight"===e.key&&i<w.length-1?B(r,w[i+1].id,t[w[i+1].id].length):l=false,l&&(e.preventDefault(),e.currentTarget.focus())
                                                    })(e,r)} className={c("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",m,s?"bg-neutral-900/9 dark:bg-neutral-100/9":c("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","active:bg-neutral-900/8 dark:active:bg-neutral-100/8"),"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","cursor-grab px-2",i&&"invisible")}>
                                                      <div className="flex w-full items-center gap-1.5">
                                                        <span className={c(h,x)}>{ref}</span>
                                                        {blocked&&<span className={c("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums","text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]")}>Blocked</span>}
                                                        <span onPointerDown={e=>H(e,r)} style={{touchAction:"none"}} aria-hidden className={c(x,"ml-auto -mr-0.5 cursor-grab")}>
                                                          <HugeiconsIcon icon={Icon_60041} size={14} strokeWidth={1.8} aria-hidden="true" />
                                                        </span>
                                                      </div>
                                                      <p className={c(f,"w-full")}>{title}</p>
                                                      <div className="flex w-full items-center gap-2">
                                                        <span className={c("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>{points}</span>
                                                        <span title={assignee} className={c("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","ml-auto size-[24px]")}>
                                                          <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                                                            {assignee.split(/[\s-]+/).filter(Boolean).slice(0,1).map(e=>e[0]?.toUpperCase()).join("")}
                                                          </span>
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </motion.div>
                                );
                              })}
                              {0===length&&<p className={c(p,x,"px-2 py-6 text-center")}>Nothing here yet</p>}
                            </div>
                          </section>
              );
            })}
          </div>
        </div>
        <AnimatePresence>
          {j&&<motion.div key={"ghost"} initial={{opacity:.9}} animate={e?{opacity:1}:{opacity:1,scale:1.02,rotate:-1.5}} exit={{opacity:0,transition:{duration:.12}}} transition={{duration:.16,ease:v}} style={{left:R.x,top:R.y,width:R.w}} className="pointer-events-none absolute z-50">
            <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","gap-1 px-3 py-2")}>
              <span className={c(h,x)}>{y[j].ref}</span>
              <p className={f}>{y[j].title}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
        <p aria-live="polite" className="sr-only">{S}</p>
      </div>
  );
}


export default j;
