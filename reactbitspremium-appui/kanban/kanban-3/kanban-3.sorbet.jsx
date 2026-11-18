/**
 * React Bits Pro — Application UI (kanban-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { filter, getBoundingClientRect, index, indexOf, left, length, querySelectorAll, top, useCallback, useId, useMemo, useRef, useState, value, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_60041 = [["path",{d:"M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];

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

let S = e=>e.split(/[\s-]+/).filter(Boolean).slice(0,1).map(e=>e[0]?.toUpperCase()).join("");

let F = (...e)=>e.filter(Boolean).join(" ");

let G = "text-neutral-900 dark:text-neutral-100";

let V = "text-neutral-900/62 dark:text-neutral-100/62";

let J = "text-[14px]/[20px] font-medium";

let Q = "font-mono text-[12px]/[16px] tabular-nums";

let ee = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none";

let et = "flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]";

let er = "rounded-[var(--rb-r-4xl,18px)]";

let ea = "flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let en = [.2,0,0,1];

let ei = {type:"spring",bounce:0,duration:.35};

let el = [{id:"c1",ref:"NW-412",title:"Rate-limit the public search API",tag:"API"},{id:"c2",ref:"NW-408",title:"Draft the Q3 reliability review",tag:"Docs"},{id:"c3",ref:"NW-401",title:"Fix flaky checkout integration test",tag:"Quality"},{id:"c4",ref:"NW-397",title:"Region failover runbook",tag:"Infra"},{id:"c5",ref:"NW-392",title:"Compress asset uploads on ingest",tag:"Media"},{id:"c6",ref:"NW-388",title:"Warn before destructive bulk edits",tag:"Safety"},{id:"c7",ref:"NW-380",title:"Import contacts from CSV",tag:"Growth"},{id:"c8",ref:"NW-374",title:"Retire the legacy search index",tag:"Infra"},{id:"c9",ref:"NW-369",title:"Keyboard shortcuts help sheet",tag:"Craft"}];

let eo = {c1:{status:"Building",assignee:"Marco Silva",priority:"Urgent"},c2:{status:"Triage",assignee:"Ana Reyes",priority:"Normal"},c3:{status:"Review",assignee:"Priya Nandakumar",priority:"High"},c4:{status:"Building",assignee:"Marco Silva",priority:"High"},c5:{status:"Triage",assignee:"Priya Nandakumar",priority:"Normal"},c6:{status:"Live",assignee:"Ana Reyes",priority:"High"},c7:{status:"Review",assignee:"Ana Reyes",priority:"Normal"},c8:{status:"Building",assignee:"Priya Nandakumar",priority:"Urgent"},c9:{status:"Live",assignee:"Marco Silva",priority:"Normal"}};

let es = [{id:"status",label:"Status",values:["Triage","Building","Review","Live"]},{id:"assignee",label:"Assignee",values:["Ana Reyes","Priya Nandakumar","Marco Silva"]},{id:"priority",label:"Priority",values:["Urgent","High","Normal"]}];

let ec = Object.fromEntries(el.map(e=>[e.id,e]));

let ed = e=>e.split(/[\s-]+/).filter(Boolean).slice(0,1).map(e=>e[0]?.toUpperCase()).join("");

let e_ = {Urgent:G,High:"text-neutral-900/78 dark:text-neutral-100/78",Normal:V};


export default function kanban_3__Sorbet__Component(){
  let e=useId(),t=useReducedMotion(),[r,c]=useState("status"),[d,x]=useState(eo),[p,u]=useState(el.map(e=>e.id)),[b,h]=useState(null),[m,f]=useState(null),[g,k]=useState({x:0,y:0,w:0}),[v,w]=useState(""),y=useRef(null),j=useRef(new Map),N=useRef(null),C=es.find(e=>e.id===r),A=useMemo(()=>{
    let e=new Map;
    for(let t of C.values)e.set(t,[]);
    for(let t of p){
      let a=d[t][r];
      e.get(a)?.push(t)
    }
    return e;
  }, [C.values,r,d,p]),R=useCallback((e,t,a)=>{
    x(a=>a[e][r]===t?a:{...a,[e]:{...a[e],[r]:t}}),u(n=>{
      let i=filter(t=>t!==e),l=i.filter(a=>(a===e?t:d[a][r])===t),o=l[a],s=o?i.indexOf(o):-1,c=[...i];
      if(-1===s){
        let t=l[l.length-1];
        c.splice(t?i.indexOf(t)+1:c.length,0,e)
      }else c.splice(s,0,e);
      return c;
    })
  }, [d,r]),P=useCallback((e,t,r)=>{
    for(let[a,n]of j.current){
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
      return {value:a,index:o};
    }
    return null;
  }, []),M=(e,t)=>{
    if(0!==e.button)return;
    let r=e.currentTarget.closest("[data-card]"),a=y.current;
    if(!r||!a)return;
    e.preventDefault();
    let n=r.getBoundingClientRect();
    N.current={id:t,dx:e.clientX-left,dy:e.clientY-top,w:width,active:false,startX:e.clientX,startY:e.clientY,pointerId:e.pointerId},a.setPointerCapture(e.pointerId),r.querySelector('[aria-roledescription="Draggable card"]')?.focus()
  },S=()=>{
    let e=N.current;
    if(!e)return;
    N.current=null;
    let t=y.current;
    t?.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),e.active&&w(`${ec[e.id].ref} ${C.label.toLowerCase()} set to ${d[e.id][r]}.`),h(null)
  };
  return (
    <div ref={y} onPointerMove={e=>{
        let t=N.current,r=y.current;
        if(!t||!r)return;
        if(!t.active){
          if(4>Math.hypot(e.clientX-t.startX,e.clientY-t.startY))return;
          t.active=true,f(null),h(t.id)
        }
        let a=r.getBoundingClientRect();
        k({x:e.clientX-a.left-t.dx,y:e.clientY-a.top-t.dy,w:t.w});
        let n=P(e.clientX,e.clientY,t.id);
        n&&R(t.id,value,index)
      }} onPointerUp={S} onPointerCancel={S} onLostPointerCapture={S} className={F("bg-white dark:bg-neutral-950",G,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden",b&&"touch-none select-none")}>
        <header className="flex shrink-0 flex-wrap items-end justify-between gap-3 px-6 pt-6 pb-4 sm:px-8">
          <div className="min-w-0">
            <h2 className={F("text-[17px]/[22px] font-extrabold",G)}>Northwind roadmap</h2>
            <p className={F(J,V,"mt-0.5 truncate")}>
              Regroup the board on any field. Dropping a card into a column sets that field on it.
            </p>
          </div>
          <div role="radiogroup" aria-label="Group by" className={F("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
            {es.map(e=><button key={e.id} type="button" role="radio" aria-checked={e.id===r} onClick={()=>c(e.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{e.label}</button>)}
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6 sm:px-8">
          <div className="flex h-full min-w-max gap-2.5">
            {C.values.map(n=>{
              let i=A.get(n)??[];
              return (
                <section key={`${r}-${n}`} aria-label={n} className={F("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","h-full w-[260px] shrink-0")}>
                            <div className="flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5">
                              {"assignee"===r&&<span className={F(ee,"size-[20px]")}><span className={et}>{ed(n)}</span></span>}
                              <span className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">{n}</span>
                              <span className={F("shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","ml-auto")}>{i.length}</span>
                            </div>
                            <div ref={e=>{
                              e?j.current.set(n,e):j.current.delete(n)
                            }} className={F("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","min-h-0 flex-1 overflow-y-auto p-1")}>
                              {i.map(i=>{
                                let o=ec[i],c=b===i,x=m===i;
                                return (
                                  <motion.div key={i} layoutId={t?undefined:`${e}-${i}`} transition={ei} data-card={i} className={F(c&&F("rounded-[calc(var(--rb-r-lg,10px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8",er))}>
                                                    <div role="button" tabIndex={0} aria-roledescription="Draggable card" aria-label={`${o.ref}: ${o.title}. ${C.label} ${n}.`} onPointerDown={e=>{
                                                      "mouse"===e.pointerType&&M(e,i)
                                                    }} onKeyDown={e=>((e,t)=>{
                                                      let a=d[t][r],n=A.get(a)??[],i=indexOf(t),l=C.values.indexOf(a);
                                                      if(" "===e.key||"Enter"===e.key){
                                                        e.preventDefault();
                                                        let r=m===t?null:t;
                                                        f(r),w(r?`${ec[t].ref} grabbed. Left and right change ${C.label.toLowerCase()}.`:`${ec[t].ref} dropped in ${a}.`);
                                                        return
                                                      }
                                                      if("Escape"===e.key&&m===t){
                                                        e.preventDefault(),f(null),w("Move cancelled.");
                                                        return
                                                      }
                                                      if(m!==t)return;
                                                      let o=true;
                                                      "ArrowLeft"===e.key&&l>0?R(t,C.values[l-1],(A.get(C.values[l-1])??[]).length):"ArrowRight"===e.key&&l<C.values.length-1?R(t,C.values[l+1],(A.get(C.values[l+1])??[]).length):"ArrowUp"===e.key&&i>0?R(t,a,i-1):"ArrowDown"===e.key&&i<length-1?R(t,a,i+1):o=false,o&&(e.preventDefault(),e.currentTarget.focus())
                                                    })(e,i)} className={F("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",er,x?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":F("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10"),"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","cursor-grab px-2",c&&"invisible")}>
                                                      <div className="flex w-full items-center gap-2">
                                                        <span className={F("text-[13px]/[16px] font-bold tabular-nums",e_[d[i].priority])}>{d[i].priority}</span>
                                                        <span className={F(Q,V)}>{o.ref}</span>
                                                        <span onPointerDown={e=>M(e,i)} style={{touchAction:"none"}} aria-hidden className={F(V,"ml-auto -mr-0.5 cursor-grab")}>
                                                          <HugeiconsIcon icon={Icon_60041} size={16} strokeWidth={2} aria-hidden="true" />
                                                        </span>
                                                      </div>
                                                      <p className={F(ea,"w-full")}>{o.title}</p>
                                                      <div className="flex w-full items-center gap-2">
                                                        <span className={F("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>{o.tag}</span>
                                                        {"assignee"!==r&&<span title={d[i].assignee} className={F(ee,"ml-auto size-[24px]")}><span className={et}>{ed(d[i].assignee)}</span></span>}
                                                      </div>
                                                    </div>
                                                  </motion.div>
                                );
                              })}
                              {0===i.length&&<p className={F(J,V,"px-3 py-6 text-center")}>Nothing here yet</p>}
                            </div>
                          </section>
              );
            })}
          </div>
        </div>
        <AnimatePresence>
          {b&&<motion.div key={"ghost"} initial={{opacity:.9}} animate={t?{opacity:1}:{opacity:1,scale:1.02,rotate:-1.5}} exit={{opacity:0,transition:{duration:.12}}} transition={{duration:.16,ease:en}} style={{left:g.x,top:g.y,width:g.w}} className="pointer-events-none absolute z-50">
            <div className={F("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","gap-1 px-3 py-2")}>
              <span className={F(Q,V)}>{ec[b].ref}</span>
              <p className={ea}>{ec[b].title}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
        <p aria-live="polite" className="sr-only">{v}</p>
      </div>
  );
}
