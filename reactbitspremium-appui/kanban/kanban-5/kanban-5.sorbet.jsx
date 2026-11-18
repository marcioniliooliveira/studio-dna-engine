/**
 * React Bits Pro — Application UI (kanban-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { assignee, blocked, col, getBoundingClientRect, i, index, left, length, map, points, querySelectorAll, ref, t, title, top, useCallback, useMemo, useRef, useState, width } from 'react';
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

let ez = (...e)=>e.filter(Boolean).join(" ");

let eI = "text-neutral-900 dark:text-neutral-100";

let eW = "text-neutral-900/62 dark:text-neutral-100/62";

let eB = "text-[14px]/[20px] font-medium";

let eX = "font-mono text-[12px]/[16px] tabular-nums";

let eY = "rounded-[var(--rb-r-4xl,18px)]";

let eH = "flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let eE = "relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]";

let eT = ez("text-[15px]/[20px] font-bold tabular-nums","text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]");

let eO = [.2,0,0,1];

let eU = {type:"spring",bounce:0,duration:.35};

let eq = [{id:"committed",name:"Committed",capacity:21},{id:"building",name:"Building",capacity:13},{id:"verifying",name:"Verifying",capacity:8},{id:"accepted",name:"Accepted",capacity:0}];

let eK = {s1:{id:"s1",ref:"MER-52",title:"Split the ingest queue by tenant",points:8,assignee:"Marco Silva"},s2:{id:"s2",ref:"MER-49",title:"Retry policy for failed exports",points:5,assignee:"Ana Reyes"},s3:{id:"s3",ref:"MER-47",title:"Surface sync errors in the header",points:3,assignee:"Priya Nandakumar"},s4:{id:"s4",ref:"MER-45",title:"Warm the report cache nightly",points:5,assignee:"Wei Chen",blocked:true},s5:{id:"s5",ref:"MER-43",title:"Per-workspace rate limits",points:8,assignee:"Marco Silva"},s6:{id:"s6",ref:"MER-40",title:"Trim the onboarding checklist",points:2,assignee:"Ana Reyes"},s7:{id:"s7",ref:"MER-38",title:"Signed URLs for shared exports",points:3,assignee:"Priya Nandakumar"},s8:{id:"s8",ref:"MER-35",title:"Collapse duplicate alert emails",points:5,assignee:"Wei Chen"},s9:{id:"s9",ref:"MER-31",title:"Timezone picker on scheduled reports",points:2,assignee:"Ana Reyes"},s10:{id:"s10",ref:"MER-28",title:"Backfill missing usage rows",points:3,assignee:"Marco Silva"}};

let eZ = {committed:["s1","s5","s9"],building:["s2","s4"],verifying:["s3","s7"],accepted:["s6","s8","s10"]};


export default function kanban_5__Sorbet__Component(){
  let e=useReducedMotion(),[t,r]=useState(eZ),[c,d]=useState(null),[x,p]=useState(null),[u,b]=useState({x:0,y:0,w:0}),[h,m]=useState(""),f=useRef(null),g=useRef(new Map),k=useRef(null),v=useCallback(e=>Object.keys(t).find(r=>t[r].includes(e))??"committed", [t]),w=useCallback((e,t,a)=>{
    r(r=>{
      let n={...r},i=null;
      for(let t of Object.keys(n))t.includes(e)&&(i=t);
      if(!i||i===t&&i.indexOf(e)===a)return r;
      i=i.filter(t=>t!==e);
      let l=i===t?i:[...t];
      return l.splice(Math.max(0,Math.min(a,l.length)),0,e),t=l,n;
    })
  }, []),y=useCallback((e,t,r)=>{
    for(let[a,n]of g.current){
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
  }, []),j=(e,t)=>{
    if(0!==e.button)return;
    let r=e.currentTarget.closest("[data-card]"),a=f.current;
    if(!r||!a)return;
    e.preventDefault();
    let n=r.getBoundingClientRect();
    k.current={id:t,dx:e.clientX-left,dy:e.clientY-top,w:width,active:false,startX:e.clientX,startY:e.clientY,pointerId:e.pointerId},a.setPointerCapture(e.pointerId),r.querySelector('[aria-roledescription="Draggable card"]')?.focus()
  },N=()=>{
    let e=k.current;
    if(!e)return;
    k.current=null;
    let t=f.current;
    t?.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),e.active&&m(`${eK[e.id].ref} moved to ${eq.find(t=>t.id===v(e.id))?.name}.`),d(null)
  },C=useMemo(()=>{
    let e={};
    for(let r of eq)e[r.id]=t[r.id].reduce((e,t)=>e+eK[t].points,0);
    return e;
  }, [t]),A=Object.values(C).reduce((e,t)=>e+t,0),R=C.accepted,P=A?Math.round(R/A*100):0;
  return (
    <div ref={f} onPointerMove={e=>{
        let t=k.current,r=f.current;
        if(!t||!r)return;
        if(!t.active){
          if(4>Math.hypot(e.clientX-t.startX,e.clientY-t.startY))return;
          t.active=true,p(null),d(t.id)
        }
        let a=r.getBoundingClientRect();
        b({x:e.clientX-a.left-t.dx,y:e.clientY-a.top-t.dy,w:t.w});
        let n=y(e.clientX,e.clientY,t.id);
        n&&w(t.id,col,index)
      }} onPointerUp={N} onPointerCancel={N} onLostPointerCapture={N} className={ez("bg-white dark:bg-neutral-950",eI,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden",c&&"touch-none select-none")}>
        <header className="shrink-0 px-6 pt-6 pb-4 sm:px-8">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={ez("text-[17px]/[22px] font-extrabold",eI,"flex flex-wrap gap-x-2")}>
                <span>Sprint 34</span>
                <span className={eW}>Meridian</span>
              </h2>
              <p className={ez(eB,eW,"mt-0.5 truncate")}>4 June to 18 June. Six days left. Columns show points against capacity.</p>
            </div>
          </div>
          <div className="@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1">
            <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
              {[{k:"Committed",v:A,unit:"pts"},{k:"Accepted",v:R,unit:"pts"},{k:"Burned",v:P,unit:"%"}].map(e=>(
                <div key={e.k} className="flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4">
                            <p className="text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78">{e.k}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100">
                              {e.v}
                              <span className="ms-0.5 text-[15px]/[20px] font-bold tracking-normal text-neutral-900/78 dark:text-neutral-100/78">{e.unit}</span>
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6 sm:px-8">
          <div className="flex h-full min-w-max gap-2.5">
            {eq.map(r=>{
              let n=t[r.id],i=C[r.id],o=r.capacity>0&&i>r.capacity,d=r.capacity?Math.min(100,i/r.capacity*100):0;
              return (
                <section key={r.id} aria-label={r.name} className={ez("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","h-full w-[244px] shrink-0")}>
                            <div className="shrink-0 px-4 py-2">
                              <div className="flex h-6 items-center gap-2">
                                <span className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">{r.name}</span>
                                <span className={ez(o?eT:"shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","ml-auto")}>
                                  {i}
                                  {r.capacity>0?` / ${r.capacity} pts`:" pts"}
                                </span>
                              </div>
                              <div className="mt-1.5">
                                {r.capacity>0?<div role="progressbar" aria-valuemin={0} aria-valuemax={r.capacity} aria-valuenow={i} aria-label={`${r.name} capacity`} className={eE}>
                                  <span style={{width:`${d}%`}} className={o?ez("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"):"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]"} />
                                </div>:<div aria-hidden="true" className={ez(eE,"invisible")} />}
                              </div>
                            </div>
                            <div ref={e=>{
                              e?g.current.set(r.id,e):g.current.delete(r.id)
                            }} className={ez("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","min-h-0 flex-1 overflow-y-auto p-1")}>
                              {map(r=>{
                                let n=eK[r],i=c===r,o=x===r;
                                return (
                                  <motion.div key={r} layout={!e&&"position"} transition={eU} data-card={r} className={ez(i&&ez("rounded-[calc(var(--rb-r-lg,10px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8",eY))}>
                                                    <div role="button" tabIndex={0} aria-roledescription="Draggable card" aria-label={`${ref}: ${title}, ${points} points${blocked?", blocked":""}.`} onPointerDown={e=>{
                                                      "mouse"===e.pointerType&&j(e,r)
                                                    }} onKeyDown={e=>((e,r)=>{
                                                      let a=v(r),n=t[a].indexOf(r),i=eq.findIndex(e=>e.id===a);
                                                      if(" "===e.key||"Enter"===e.key){
                                                        e.preventDefault();
                                                        let t=x===r?null:r;
                                                        p(t),m(t?`${eK[r].ref} grabbed. Arrow keys move it.`:`${eK[r].ref} dropped in ${eq[i].name}.`);
                                                        return
                                                      }
                                                      if("Escape"===e.key&&x===r){
                                                        e.preventDefault(),p(null),m("Move cancelled.");
                                                        return
                                                      }
                                                      if(x!==r)return;
                                                      let l=true;
                                                      "ArrowUp"===e.key?w(r,a,Math.max(0,n-1)):"ArrowDown"===e.key?w(r,a,n+1):"ArrowLeft"===e.key&&i>0?w(r,eq[i-1].id,t[eq[i-1].id].length):"ArrowRight"===e.key&&i<eq.length-1?w(r,eq[i+1].id,t[eq[i+1].id].length):l=false,l&&(e.preventDefault(),e.currentTarget.focus())
                                                    })(e,r)} className={ez("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",eY,o?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":ez("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10"),"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","cursor-grab px-2",i&&"invisible")}>
                                                      <div className="flex w-full items-center gap-1.5">
                                                        <span className={ez(eX,eW)}>{ref}</span>
                                                        {blocked&&<span className={ez("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums","text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]")}>Blocked</span>}
                                                        <span onPointerDown={e=>j(e,r)} style={{touchAction:"none"}} aria-hidden className={ez(eW,"ml-auto -mr-0.5 cursor-grab")}>
                                                          <HugeiconsIcon icon={Icon_60041} size={16} strokeWidth={2} aria-hidden="true" />
                                                        </span>
                                                      </div>
                                                      <p className={ez(eH,"w-full")}>{title}</p>
                                                      <div className="flex w-full items-center gap-2">
                                                        <span className={ez("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>{points}</span>
                                                        <span title={assignee} className={ez("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","ml-auto size-[24px]")}>
                                                          <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">
                                                            {assignee.split(/[\s-]+/).filter(Boolean).slice(0,1).map(e=>e[0]?.toUpperCase()).join("")}
                                                          </span>
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </motion.div>
                                );
                              })}
                              {0===length&&<p className={ez(eB,eW,"px-2 py-6 text-center")}>Nothing here yet</p>}
                            </div>
                          </section>
              );
            })}
          </div>
        </div>
        <AnimatePresence>
          {c&&<motion.div key={"ghost"} initial={{opacity:.9}} animate={e?{opacity:1}:{opacity:1,scale:1.02,rotate:-1.5}} exit={{opacity:0,transition:{duration:.12}}} transition={{duration:.16,ease:eO}} style={{left:u.x,top:u.y,width:u.w}} className="pointer-events-none absolute z-50">
            <div className={ez("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","gap-1 px-3 py-2")}>
              <span className={ez(eX,eW)}>{eK[c].ref}</span>
              <p className={eH}>{eK[c].title}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
        <p aria-live="polite" className="sr-only">{h}</p>
      </div>
  );
}
