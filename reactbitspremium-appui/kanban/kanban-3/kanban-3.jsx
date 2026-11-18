/**
 * React Bits Pro — Application UI (kanban-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { filter, getBoundingClientRect, index, indexOf, left, length, querySelectorAll, top, useCallback, useId, useMemo, useRef, useState, value, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_60041 = [["path",{d:"M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[13px]/[18px] font-normal",
  h = "font-mono text-[12px]/[16px] tabular-nums",
  m = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",
  f = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  b = "rounded-[var(--rb-r-sm,6px)]",
  g = "flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  v = [.2,0,0,1],
  k = {type:"spring",bounce:0,duration:.35},
  w = [{id:"c1",ref:"NW-412",title:"Rate-limit the public search API",tag:"API"},{id:"c2",ref:"NW-408",title:"Draft the Q3 reliability review",tag:"Docs"},{id:"c3",ref:"NW-401",title:"Fix flaky checkout integration test",tag:"Quality"},{id:"c4",ref:"NW-397",title:"Region failover runbook",tag:"Infra"},{id:"c5",ref:"NW-392",title:"Compress asset uploads on ingest",tag:"Media"},{id:"c6",ref:"NW-388",title:"Warn before destructive bulk edits",tag:"Safety"},{id:"c7",ref:"NW-380",title:"Import contacts from CSV",tag:"Growth"},{id:"c8",ref:"NW-374",title:"Retire the legacy search index",tag:"Infra"},{id:"c9",ref:"NW-369",title:"Keyboard shortcuts help sheet",tag:"Craft"}],
  y = {c1:{status:"Building",assignee:"Marco Silva",priority:"Urgent"},c2:{status:"Triage",assignee:"Ana Reyes",priority:"Normal"},c3:{status:"Review",assignee:"Priya Nandakumar",priority:"High"},c4:{status:"Building",assignee:"Marco Silva",priority:"High"},c5:{status:"Triage",assignee:"Priya Nandakumar",priority:"Normal"},c6:{status:"Live",assignee:"Ana Reyes",priority:"High"},c7:{status:"Review",assignee:"Ana Reyes",priority:"Normal"},c8:{status:"Building",assignee:"Priya Nandakumar",priority:"Urgent"},c9:{status:"Live",assignee:"Marco Silva",priority:"Normal"}},
  _ = [{id:"status",label:"Status",values:["Triage","Building","Review","Live"]},{id:"assignee",label:"Assignee",values:["Ana Reyes","Priya Nandakumar","Marco Silva"]},{id:"priority",label:"Priority",values:["Urgent","High","Normal"]}],
  j = Object.fromEntries(w.map(e=>[e.id,e])),
  N = e=>e.split(/[\s-]+/).filter(Boolean).slice(0,1).map(e=>e[0]?.toUpperCase()).join(""),
  C = {Urgent:u,High:"text-neutral-900/80 dark:text-neutral-100/80",Normal:x};

function A(){
  let e=useId(),t=useReducedMotion(),[r,A]=useState("status"),[R,P]=useState(y),[S,M]=useState(w.map(e=>e.id)),[$,D]=useState(null),[z,I]=useState(null),[B,L]=useState({x:0,y:0,w:0}),[H,W]=useState(""),X=useRef(null),Y=useRef(new Map),E=useRef(null),T=_.find(e=>e.id===r),O=useMemo(()=>{
    let e=new Map;
    for(let t of T.values)e.set(t,[]);
    for(let t of S){
      let a=R[t][r];
      e.get(a)?.push(t)
    }
    return e;
  }, [T.values,r,R,S]),U=useCallback((e,t,a)=>{
    P(a=>a[e][r]===t?a:{...a,[e]:{...a[e],[r]:t}}),M(n=>{
      let i=filter(t=>t!==e),l=i.filter(a=>(a===e?t:R[a][r])===t),s=l[a],o=s?i.indexOf(s):-1,d=[...i];
      if(-1===o){
        let t=l[l.length-1];
        d.splice(t?i.indexOf(t)+1:d.length,0,e)
      }else d.splice(o,0,e);
      return d;
    })
  }, [R,r]),q=useCallback((e,t,r)=>{
    for(let[a,n]of Y.current){
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
      return {value:a,index:s};
    }
    return null;
  }, []),K=(e,t)=>{
    if(0!==e.button)return;
    let r=e.currentTarget.closest("[data-card]"),a=X.current;
    if(!r||!a)return;
    e.preventDefault();
    let n=r.getBoundingClientRect();
    E.current={id:t,dx:e.clientX-left,dy:e.clientY-top,w:width,active:false,startX:e.clientX,startY:e.clientY,pointerId:e.pointerId},a.setPointerCapture(e.pointerId),r.querySelector('[aria-roledescription="Draggable card"]')?.focus()
  },F=()=>{
    let e=E.current;
    if(!e)return;
    E.current=null;
    let t=X.current;
    t?.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),e.active&&W(`${j[e.id].ref} ${T.label.toLowerCase()} set to ${R[e.id][r]}.`),D(null)
  };
  return (
    <div ref={X} onPointerMove={e=>{
        let t=E.current,r=X.current;
        if(!t||!r)return;
        if(!t.active){
          if(4>Math.hypot(e.clientX-t.startX,e.clientY-t.startY))return;
          t.active=true,I(null),D(t.id)
        }
        let a=r.getBoundingClientRect();
        L({x:e.clientX-a.left-t.dx,y:e.clientY-a.top-t.dy,w:t.w});
        let n=q(e.clientX,e.clientY,t.id);
        n&&U(t.id,value,index)
      }} onPointerUp={F} onPointerCancel={F} onLostPointerCapture={F} className={c("bg-white dark:bg-neutral-950",u,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden",$&&"touch-none select-none")}>
        <header className="flex shrink-0 flex-wrap items-end justify-between gap-3 px-6 pt-6 pb-4 sm:px-8">
          <div className="min-w-0">
            <h2 className={c("text-[16px]/[20px] font-[450] tracking-[-0.015em]",u)}>Northwind roadmap</h2>
            <p className={c(p,x,"mt-0.5 truncate")}>
              Regroup the board on any field. Dropping a card into a column sets that field on it.
            </p>
          </div>
          <div role="radiogroup" aria-label="Group by" className={c("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
            {_.map(e=><button key={e.id} type="button" role="radio" aria-checked={e.id===r} onClick={()=>A(e.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e.label}</button>)}
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6 sm:px-8">
          <div className="flex h-full min-w-max gap-2.5">
            {T.values.map(n=>{
              let i=O.get(n)??[];
              return (
                <section key={`${r}-${n}`} aria-label={n} className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","h-full w-[260px] shrink-0")}>
                            <div className="flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2">
                              {"assignee"===r&&<span className={c(m,"size-[20px]")}><span className={f}>{N(n)}</span></span>}
                              <span className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{n}</span>
                              <span className={c("shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","ml-auto")}>{i.length}</span>
                            </div>
                            <div ref={e=>{
                              e?Y.current.set(n,e):Y.current.delete(n)
                            }} className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","min-h-0 flex-1 overflow-y-auto p-1")}>
                              {i.map(i=>{
                                let s=j[i],u=$===i,p=z===i;
                                return (
                                  <motion.div key={i} layoutId={t?undefined:`${e}-${i}`} transition={k} data-card={i} className={c(u&&c("rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8",b))}>
                                                    <div role="button" tabIndex={0} aria-roledescription="Draggable card" aria-label={`${s.ref}: ${s.title}. ${T.label} ${n}.`} onPointerDown={e=>{
                                                      "mouse"===e.pointerType&&K(e,i)
                                                    }} onKeyDown={e=>((e,t)=>{
                                                      let a=R[t][r],n=O.get(a)??[],i=indexOf(t),l=T.values.indexOf(a);
                                                      if(" "===e.key||"Enter"===e.key){
                                                        e.preventDefault();
                                                        let r=z===t?null:t;
                                                        I(r),W(r?`${j[t].ref} grabbed. Left and right change ${T.label.toLowerCase()}.`:`${j[t].ref} dropped in ${a}.`);
                                                        return
                                                      }
                                                      if("Escape"===e.key&&z===t){
                                                        e.preventDefault(),I(null),W("Move cancelled.");
                                                        return
                                                      }
                                                      if(z!==t)return;
                                                      let s=true;
                                                      "ArrowLeft"===e.key&&l>0?U(t,T.values[l-1],(O.get(T.values[l-1])??[]).length):"ArrowRight"===e.key&&l<T.values.length-1?U(t,T.values[l+1],(O.get(T.values[l+1])??[]).length):"ArrowUp"===e.key&&i>0?U(t,a,i-1):"ArrowDown"===e.key&&i<length-1?U(t,a,i+1):s=false,s&&(e.preventDefault(),e.currentTarget.focus())
                                                    })(e,i)} className={c("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",b,p?"bg-neutral-900/9 dark:bg-neutral-100/9":c("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","active:bg-neutral-900/8 dark:active:bg-neutral-100/8"),"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","cursor-grab px-2",u&&"invisible")}>
                                                      <div className="flex w-full items-center gap-2">
                                                        <span className={c("text-[12px]/[16px] font-[450] tabular-nums",C[R[i].priority])}>{R[i].priority}</span>
                                                        <span className={c(h,x)}>{s.ref}</span>
                                                        <span onPointerDown={e=>K(e,i)} style={{touchAction:"none"}} aria-hidden className={c(x,"ml-auto -mr-0.5 cursor-grab")}>
                                                          <HugeiconsIcon icon={Icon_60041} size={14} strokeWidth={1.8} aria-hidden="true" />
                                                        </span>
                                                      </div>
                                                      <p className={c(g,"w-full")}>{s.title}</p>
                                                      <div className="flex w-full items-center gap-2">
                                                        <span className={c("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>{s.tag}</span>
                                                        {"assignee"!==r&&<span title={R[i].assignee} className={c(m,"ml-auto size-[24px]")}><span className={f}>{N(R[i].assignee)}</span></span>}
                                                      </div>
                                                    </div>
                                                  </motion.div>
                                );
                              })}
                              {0===i.length&&<p className={c(p,x,"px-3 py-6 text-center")}>Nothing here yet</p>}
                            </div>
                          </section>
              );
            })}
          </div>
        </div>
        <AnimatePresence>
          {$&&<motion.div key={"ghost"} initial={{opacity:.9}} animate={t?{opacity:1}:{opacity:1,scale:1.02,rotate:-1.5}} exit={{opacity:0,transition:{duration:.12}}} transition={{duration:.16,ease:v}} style={{left:B.x,top:B.y,width:B.w}} className="pointer-events-none absolute z-50">
            <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","gap-1 px-3 py-2")}>
              <span className={c(h,x)}>{j[$].ref}</span>
              <p className={g}>{j[$].title}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
        <p aria-live="polite" className="sr-only">{H}</p>
      </div>
  );
}


export default A;
