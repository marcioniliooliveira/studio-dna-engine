/**
 * React Bits Pro — Application UI (kanban-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { col, getBoundingClientRect, id, index, lane, left, name, querySelectorAll, top, useCallback, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_60041 = [["path",{d:"M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "bg-white dark:bg-neutral-950",
  p = "text-neutral-900 dark:text-neutral-100",
  h = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "font-mono text-[12px]/[16px] tabular-nums",
  f = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  b = "shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66",
  g = "rounded-[var(--rb-r-sm,6px)]",
  v = "flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  k = [.2,0,0,1],
  w = {type:"spring",bounce:0,duration:.35},
  y = [{id:"todo",name:"To do"},{id:"progress",name:"In progress"},{id:"review",name:"In review"},{id:"shipped",name:"Shipped"}],
  _ = [{id:"billing",name:"Billing & invoicing",owner:"Ana Reyes"},{id:"identity",name:"Identity",owner:"Wei Chen"},{id:"platform",name:"Platform reliability",owner:"Marco Silva"}],
  j = {b1:{id:"b1",ref:"HAL-241",title:"Retry webhooks on timeout",points:3},b2:{id:"b2",ref:"HAL-238",title:"Seat drift after downgrade",points:5},b3:{id:"b3",ref:"HAL-231",title:"Proration preview in checkout",points:2},b4:{id:"b4",ref:"HAL-217",title:"Invoice PDF redesign",points:8},i1:{id:"i1",ref:"HAL-233",title:"SCIM group mapping",points:5},i2:{id:"i2",ref:"HAL-228",title:"Session revocation on role change",points:3},i3:{id:"i3",ref:"HAL-208",title:"Rotate signing keys live",points:8},p1:{id:"p1",ref:"HAL-236",title:"Audit export past 90 days",points:5},p2:{id:"p2",ref:"HAL-221",title:"Cache invalidation latency",points:3},p3:{id:"p3",ref:"HAL-214",title:"Backfill EU tenant regions",points:2},p4:{id:"p4",ref:"HAL-203",title:"Shard the events table",points:13}},
  N = {billing:{todo:["b3"],progress:["b1","b2"],review:[],shipped:["b4"]},identity:{todo:["i3"],progress:["i1"],review:["i2"],shipped:[]},platform:{todo:["p4"],progress:["p2"],review:["p1"],shipped:["p3"]}};

function C(){
  let e=useReducedMotion(),[t,r]=useState(N),[C,A]=useState([]),[R,P]=useState(null),[S,M]=useState(null),[$,D]=useState({x:0,y:0,w:0}),[z,I]=useState(""),B=useRef(null),L=useRef(new Map),H=useRef(null),W=useCallback(e=>{
    for(let r of _)for(let a of y){
      let n=t[r.id][a.id].indexOf(e);
      if(-1!==n)return {lane:r.id,col:a.id,index:n};
    }
    return null;
  }, [t]),X=useCallback((e,t,a,n)=>{
    r(r=>{
      let i={billing:{...r.billing},identity:{...r.identity},platform:{...r.platform}},l=null,s=null;
      for(let t of _)for(let r of y)i[t.id][r.id].includes(e)&&(l=t.id,s=r.id);
      if(!l||!s||l===t&&s===a&&i[l][s].indexOf(e)===n)return r;
      i[l][s]=i[l][s].filter(t=>t!==e);
      let o=[...i[t][a]];
      return o.splice(Math.max(0,Math.min(n,o.length)),0,e),i[t][a]=o,i;
    })
  }, []),Y=useCallback((e,t,r)=>{
    for(let[a,n]of L.current){
      let i=getBoundingClientRect();
      if(e<i.left||e>i.right||t<i.top||t>i.bottom)continue;
      let l=Array.from(querySelectorAll("[data-card]")).filter(e=>e.dataset.card!==r),s=l.length;
      for(let e=0;e<l.length;e++){
        let r=l[e].getBoundingClientRect();
        if(t<r.top+r.height/2){
          s=e;
          break
        }
      }
      let[o,d]=a.split("|");
      return {lane:o,col:d,index:s};
    }
    return null;
  }, []),E=(e,t)=>{
    if(0!==e.button)return;
    let r=e.currentTarget.closest("[data-card]"),a=B.current;
    if(!r||!a)return;
    e.preventDefault();
    let n=r.getBoundingClientRect();
    H.current={id:t,dx:e.clientX-left,dy:e.clientY-top,w:width,active:false,startX:e.clientX,startY:e.clientY,pointerId:e.pointerId},a.setPointerCapture(e.pointerId),r.querySelector('[aria-roledescription="Draggable card"]')?.focus()
  },T=()=>{
    let e=H.current;
    if(!e)return;
    H.current=null;
    let t=B.current;
    if(t?.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),e.active){
      let t=W(e.id);
      t&&I(`${j[e.id].ref} moved to ${y.find(e=>e.id===t.col)?.name} in ${_.find(e=>e.id===t.lane)?.name}.`)
    }
    P(null)
  },O=useMemo(()=>{
    let e={};
    for(let r of y)e[r.id]=_.reduce((e,a)=>e+t[a.id][r.id].length,0);
    return e;
  }, [t]);
  return (
    <div ref={B} onPointerMove={e=>{
        let t=H.current,r=B.current;
        if(!t||!r)return;
        if(!t.active){
          if(4>Math.hypot(e.clientX-t.startX,e.clientY-t.startY))return;
          t.active=true,M(null),P(t.id)
        }
        let a=r.getBoundingClientRect();
        D({x:e.clientX-a.left-t.dx,y:e.clientY-a.top-t.dy,w:t.w});
        let n=Y(e.clientX,e.clientY,t.id);
        n&&X(t.id,lane,col,index)
      }} onPointerUp={T} onPointerCancel={T} onLostPointerCapture={T} className={u(x,p,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden",R&&"touch-none select-none")}>
        <header className="flex shrink-0 flex-wrap items-end justify-between gap-3 px-6 pt-6 pb-4 sm:px-8">
          <div className="min-w-0">
            <h2 className={u("text-[16px]/[20px] font-[450] tracking-[-0.015em]",p)}>Workstreams</h2>
            <p className={u("text-[13px]/[18px] font-normal",h,"mt-0.5 truncate")}>
              Three lanes across four stages. Drag between any cell, or press space on a card to move it with the arrow keys.
            </p>
          </div>
          <button type="button" onClick={()=>A(e=>e.length===_.length?[]:_.map(e=>e.id))} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>{C.length===_.length?"Expand all":"Collapse all"}</button>
        </header>
        <div className="min-h-0 flex-1 overflow-auto px-6 pb-6 sm:px-8">
          <div className="min-w-max">
            <div className={u(x,"sticky top-0 z-20 grid grid-cols-[repeat(4,240px)] gap-2.5 px-1.5 pb-2")}>
              {y.map(e=>(
                <div key={e.id} className="flex items-center gap-2 px-3">
                            <span className={f}>{e.name}</span>
                            <span className={b}>{O[e.id]}</span>
                          </div>
              ))}
            </div>
            <div className="space-y-2">
              {_.map(r=>{
                let n=!C.includes(r.id),i=y.reduce((e,a)=>e+t[r.id][a.id].length,0),s=t[r.id].shipped.length;
                return (
                  <section key={r.id} aria-label={r.name} className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
                                <div className={u("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","py-1")}>
                                  <button type="button" onClick={()=>{
                                    let e;
                                    return e=r.id,A(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);
                                  }} aria-expanded={n} className="group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">
                                    <span className="flex size-4 items-center justify-center">
                                      <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                    </span>
                                    <span className={f}>{r.name}</span>
                                  </button>
                                  <span className={b}>
                                    {s}
                                    /
                                    {i}
                                    {" shipped"}
                                  </span>
                                  <span title={r.owner} className={u("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","ml-auto size-[24px]")}>
                                    <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                                      {r.owner.split(/[\s-]+/).filter(Boolean).slice(0,1).map(e=>e[0]?.toUpperCase()).join("")}
                                    </span>
                                  </span>
                                </div>
                                {n&&<div className="mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950">
                                  <div className="grid grid-cols-[repeat(4,240px)] gap-2.5 p-1">
                                    {y.map(n=>{
                                      let i=t[r.id][id];
                                      return (
                                        <div key={id} ref={e=>{
                                                              let t,a,i=(t=r.id,a=id,`${t}|${a}`);
                                                              e?L.current.set(i,e):L.current.delete(i)
                                                            }} aria-label={`${r.name}, ${name}`} className={u("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","min-h-[92px]")}>
                                                              {i.map(i=>{
                                                                let s=j[i],d=R===i,x=S===i;
                                                                return (
                                                                  <motion.div key={i} layout={!e&&"position"} transition={w} data-card={i} className={u(d&&u("rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8",g))}>
                                                                                            <div role="button" tabIndex={0} aria-roledescription="Draggable card" aria-label={`${s.ref}: ${s.title}, ${s.points} points, ${name} in ${r.name}.`} onPointerDown={e=>{
                                                                                              "mouse"===e.pointerType&&E(e,i)
                                                                                            }} onKeyDown={e=>((e,r)=>{
                                                                                              let a=W(r);
                                                                                              if(!a)return;
                                                                                              let n=_.findIndex(e=>e.id===a.lane),i=y.findIndex(e=>e.id===a.col);
                                                                                              if(" "===e.key||"Enter"===e.key){
                                                                                                e.preventDefault();
                                                                                                let t=S===r?null:r;
                                                                                                M(t),I(t?`${j[r].ref} grabbed. Arrow keys move it between columns and lanes.`:`${j[r].ref} dropped.`);
                                                                                                return
                                                                                              }
                                                                                              if("Escape"===e.key&&S===r){
                                                                                                e.preventDefault(),M(null),I("Move cancelled.");
                                                                                                return
                                                                                              }
                                                                                              if(S!==r)return;
                                                                                              let l=true;
                                                                                              "ArrowLeft"===e.key&&i>0?X(r,a.lane,y[i-1].id,t[a.lane][y[i-1].id].length):"ArrowRight"===e.key&&i<y.length-1?X(r,a.lane,y[i+1].id,t[a.lane][y[i+1].id].length):"ArrowUp"===e.key?a.index>0?X(r,a.lane,a.col,a.index-1):n>0?X(r,_[n-1].id,a.col,t[_[n-1].id][a.col].length):l=false:"ArrowDown"===e.key?a.index<t[a.lane][a.col].length-1?X(r,a.lane,a.col,a.index+1):n<_.length-1?X(r,_[n+1].id,a.col,0):l=false:l=false,l&&(e.preventDefault(),e.currentTarget.focus())
                                                                                            })(e,i)} className={u("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",g,x?"bg-neutral-900/9 dark:bg-neutral-100/9":u("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","active:bg-neutral-900/8 dark:active:bg-neutral-100/8"),"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","cursor-grab px-2",d&&"invisible")}>
                                                                                              <div className="flex w-full items-center gap-1.5">
                                                                                                <span className={u(m,h)}>{s.ref}</span>
                                                                                                <span onPointerDown={e=>E(e,i)} style={{touchAction:"none"}} aria-hidden className={u(h,"ml-auto -mr-0.5 cursor-grab")}>
                                                                                                  <HugeiconsIcon icon={Icon_60041} size={14} strokeWidth={1.8} aria-hidden="true" />
                                                                                                </span>
                                                                                              </div>
                                                                                              <p className={u(v,"w-full")}>{s.title}</p>
                                                                                              <span className={u("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>
                                                                                                {s.points}
                                                                                                {" pts"}
                                                                                              </span>
                                                                                            </div>
                                                                                          </motion.div>
                                                                );
                                                              })}
                                                            </div>
                                      );
                                    })}
                                  </div>
                                </div>}
                              </section>
                );
              })}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {R&&<motion.div key={"ghost"} initial={{opacity:.9}} animate={e?{opacity:1}:{opacity:1,scale:1.02,rotate:-1.5}} exit={{opacity:0,transition:{duration:.12}}} transition={{duration:.16,ease:k}} style={{left:$.x,top:$.y,width:$.w}} className="pointer-events-none absolute z-50">
            <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","gap-1 px-3 py-2")}>
              <span className={u(m,h)}>{j[R].ref}</span>
              <p className={v}>{j[R].title}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
        <p aria-live="polite" className="sr-only">{z}</p>
      </div>
  );
}


export default C;
