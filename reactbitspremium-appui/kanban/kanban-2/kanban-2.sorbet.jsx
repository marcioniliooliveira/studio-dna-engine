/**
 * React Bits Pro — Application UI (kanban-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { col, getBoundingClientRect, id, index, lane, left, name, querySelectorAll, top, useCallback, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
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

let D = (...e)=>e.filter(Boolean).join(" ");

let z = "bg-white dark:bg-neutral-950";

let I = "text-neutral-900 dark:text-neutral-100";

let W = "text-neutral-900/62 dark:text-neutral-100/62";

let B = "font-mono text-[12px]/[16px] tabular-nums";

let X = "min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100";

let Y = "shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";

let H = "rounded-[var(--rb-r-4xl,18px)]";

let E = "flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let T = [.2,0,0,1];

let O = {type:"spring",bounce:0,duration:.35};

let U = [{id:"todo",name:"To do"},{id:"progress",name:"In progress"},{id:"review",name:"In review"},{id:"shipped",name:"Shipped"}];

let q = [{id:"billing",name:"Billing & invoicing",owner:"Ana Reyes"},{id:"identity",name:"Identity",owner:"Wei Chen"},{id:"platform",name:"Platform reliability",owner:"Marco Silva"}];

let K = {b1:{id:"b1",ref:"HAL-241",title:"Retry webhooks on timeout",points:3},b2:{id:"b2",ref:"HAL-238",title:"Seat drift after downgrade",points:5},b3:{id:"b3",ref:"HAL-231",title:"Proration preview in checkout",points:2},b4:{id:"b4",ref:"HAL-217",title:"Invoice PDF redesign",points:8},i1:{id:"i1",ref:"HAL-233",title:"SCIM group mapping",points:5},i2:{id:"i2",ref:"HAL-228",title:"Session revocation on role change",points:3},i3:{id:"i3",ref:"HAL-208",title:"Rotate signing keys live",points:8},p1:{id:"p1",ref:"HAL-236",title:"Audit export past 90 days",points:5},p2:{id:"p2",ref:"HAL-221",title:"Cache invalidation latency",points:3},p3:{id:"p3",ref:"HAL-214",title:"Backfill EU tenant regions",points:2},p4:{id:"p4",ref:"HAL-203",title:"Shard the events table",points:13}};

let Z = {billing:{todo:["b3"],progress:["b1","b2"],review:[],shipped:["b4"]},identity:{todo:["i3"],progress:["i1"],review:["i2"],shipped:[]},platform:{todo:["p4"],progress:["p2"],review:["p1"],shipped:["p3"]}};


export default function kanban_2__Sorbet__Component(){
  let e=useReducedMotion(),[t,r]=useState(Z),[c,d]=useState([]),[x,p]=useState(null),[u,b]=useState(null),[h,m]=useState({x:0,y:0,w:0}),[f,g]=useState(""),k=useRef(null),v=useRef(new Map),w=useRef(null),y=useCallback(e=>{
    for(let r of q)for(let a of U){
      let n=t[r.id][a.id].indexOf(e);
      if(-1!==n)return {lane:r.id,col:a.id,index:n};
    }
    return null;
  }, [t]),j=useCallback((e,t,a,n)=>{
    r(r=>{
      let i={billing:{...r.billing},identity:{...r.identity},platform:{...r.platform}},l=null,o=null;
      for(let t of q)for(let r of U)i[t.id][r.id].includes(e)&&(l=t.id,o=r.id);
      if(!l||!o||l===t&&o===a&&i[l][o].indexOf(e)===n)return r;
      i[l][o]=i[l][o].filter(t=>t!==e);
      let s=[...i[t][a]];
      return s.splice(Math.max(0,Math.min(n,s.length)),0,e),i[t][a]=s,i;
    })
  }, []),N=useCallback((e,t,r)=>{
    for(let[a,n]of v.current){
      let i=getBoundingClientRect();
      if(e<i.left||e>i.right||t<i.top||t>i.bottom)continue;
      let l=Array.from(querySelectorAll("[data-card]")).filter(e=>e.dataset.card!==r),o=l.length;
      for(let e=0;e<l.length;e++){
        let r=l[e].getBoundingClientRect();
        if(t<r.top+r.height/2){
          o=e;
          break
        }
      }
      let[s,c]=a.split("|");
      return {lane:s,col:c,index:o};
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
    if(t?.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),e.active){
      let t=y(e.id);
      t&&g(`${K[e.id].ref} moved to ${U.find(e=>e.id===t.col)?.name} in ${q.find(e=>e.id===t.lane)?.name}.`)
    }
    p(null)
  },R=useMemo(()=>{
    let e={};
    for(let r of U)e[r.id]=q.reduce((e,a)=>e+t[a.id][r.id].length,0);
    return e;
  }, [t]);
  return (
    <div ref={k} onPointerMove={e=>{
        let t=w.current,r=k.current;
        if(!t||!r)return;
        if(!t.active){
          if(4>Math.hypot(e.clientX-t.startX,e.clientY-t.startY))return;
          t.active=true,b(null),p(t.id)
        }
        let a=r.getBoundingClientRect();
        m({x:e.clientX-a.left-t.dx,y:e.clientY-a.top-t.dy,w:t.w});
        let n=N(e.clientX,e.clientY,t.id);
        n&&j(t.id,lane,col,index)
      }} onPointerUp={A} onPointerCancel={A} onLostPointerCapture={A} className={D(z,I,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden",x&&"touch-none select-none")}>
        <header className="flex shrink-0 flex-wrap items-end justify-between gap-3 px-6 pt-6 pb-4 sm:px-8">
          <div className="min-w-0">
            <h2 className={D("text-[17px]/[22px] font-extrabold",I)}>Workstreams</h2>
            <p className={D("text-[14px]/[20px] font-medium",W,"mt-0.5 truncate")}>
              Three lanes across four stages. Drag between any cell, or press space on a card to move it with the arrow keys.
            </p>
          </div>
          <button type="button" onClick={()=>d(e=>e.length===q.length?[]:q.map(e=>e.id))} className={D("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>{c.length===q.length?"Expand all":"Collapse all"}</button>
        </header>
        <div className="min-h-0 flex-1 overflow-auto px-6 pb-6 sm:px-8">
          <div className="min-w-max">
            <div className={D(z,"sticky top-0 z-20 grid grid-cols-[repeat(4,240px)] gap-2.5 px-1.5 pb-2")}>
              {U.map(e=>(
                <div key={e.id} className="flex items-center gap-2 px-3">
                            <span className={X}>{e.name}</span>
                            <span className={Y}>{R[e.id]}</span>
                          </div>
              ))}
            </div>
            <div className="space-y-2">
              {q.map(r=>{
                let n=!c.includes(r.id),i=U.reduce((e,a)=>e+t[r.id][a.id].length,0),o=t[r.id].shipped.length;
                return (
                  <section key={r.id} aria-label={r.name} className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
                                <div className={D("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","py-1")}>
                                  <button type="button" onClick={()=>{
                                    let e;
                                    return e=r.id,d(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);
                                  }} aria-expanded={n} className="group -mx-2 flex min-h-9 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[calc(var(--rb-r-lg,10px))] px-2 text-left text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:hover:bg-neutral-100/6 dark:active:bg-neutral-100/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]">
                                    <span className="flex size-4 items-center justify-center">
                                      <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                    </span>
                                    <span className={X}>{r.name}</span>
                                  </button>
                                  <span className={Y}>
                                    {o}
                                    /
                                    {i}
                                    {" shipped"}
                                  </span>
                                  <span title={r.owner} className={D("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","ml-auto size-[24px]")}>
                                    <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">
                                      {r.owner.split(/[\s-]+/).filter(Boolean).slice(0,1).map(e=>e[0]?.toUpperCase()).join("")}
                                    </span>
                                  </span>
                                </div>
                                {n&&<div className="mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0">
                                  <div className="grid grid-cols-[repeat(4,240px)] gap-2.5 p-1">
                                    {U.map(n=>{
                                      let i=t[r.id][id];
                                      return (
                                        <div key={id} ref={e=>{
                                                              let t,a,i=(t=r.id,a=id,`${t}|${a}`);
                                                              e?v.current.set(i,e):v.current.delete(i)
                                                            }} aria-label={`${r.name}, ${name}`} className={D("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","min-h-[92px]")}>
                                                              {i.map(i=>{
                                                                let o=K[i],c=x===i,d=u===i;
                                                                return (
                                                                  <motion.div key={i} layout={!e&&"position"} transition={O} data-card={i} className={D(c&&D("rounded-[calc(var(--rb-r-lg,10px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8",H))}>
                                                                                            <div role="button" tabIndex={0} aria-roledescription="Draggable card" aria-label={`${o.ref}: ${o.title}, ${o.points} points, ${name} in ${r.name}.`} onPointerDown={e=>{
                                                                                              "mouse"===e.pointerType&&C(e,i)
                                                                                            }} onKeyDown={e=>((e,r)=>{
                                                                                              let a=y(r);
                                                                                              if(!a)return;
                                                                                              let n=q.findIndex(e=>e.id===a.lane),i=U.findIndex(e=>e.id===a.col);
                                                                                              if(" "===e.key||"Enter"===e.key){
                                                                                                e.preventDefault();
                                                                                                let t=u===r?null:r;
                                                                                                b(t),g(t?`${K[r].ref} grabbed. Arrow keys move it between columns and lanes.`:`${K[r].ref} dropped.`);
                                                                                                return
                                                                                              }
                                                                                              if("Escape"===e.key&&u===r){
                                                                                                e.preventDefault(),b(null),g("Move cancelled.");
                                                                                                return
                                                                                              }
                                                                                              if(u!==r)return;
                                                                                              let l=true;
                                                                                              "ArrowLeft"===e.key&&i>0?j(r,a.lane,U[i-1].id,t[a.lane][U[i-1].id].length):"ArrowRight"===e.key&&i<U.length-1?j(r,a.lane,U[i+1].id,t[a.lane][U[i+1].id].length):"ArrowUp"===e.key?a.index>0?j(r,a.lane,a.col,a.index-1):n>0?j(r,q[n-1].id,a.col,t[q[n-1].id][a.col].length):l=false:"ArrowDown"===e.key?a.index<t[a.lane][a.col].length-1?j(r,a.lane,a.col,a.index+1):n<q.length-1?j(r,q[n+1].id,a.col,0):l=false:l=false,l&&(e.preventDefault(),e.currentTarget.focus())
                                                                                            })(e,i)} className={D("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",H,d?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":D("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10"),"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","cursor-grab px-2",c&&"invisible")}>
                                                                                              <div className="flex w-full items-center gap-1.5">
                                                                                                <span className={D(B,W)}>{o.ref}</span>
                                                                                                <span onPointerDown={e=>C(e,i)} style={{touchAction:"none"}} aria-hidden className={D(W,"ml-auto -mr-0.5 cursor-grab")}>
                                                                                                  <HugeiconsIcon icon={Icon_60041} size={16} strokeWidth={2} aria-hidden="true" />
                                                                                                </span>
                                                                                              </div>
                                                                                              <p className={D(E,"w-full")}>{o.title}</p>
                                                                                              <span className={D("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>
                                                                                                {o.points}
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
          {x&&<motion.div key={"ghost"} initial={{opacity:.9}} animate={e?{opacity:1}:{opacity:1,scale:1.02,rotate:-1.5}} exit={{opacity:0,transition:{duration:.12}}} transition={{duration:.16,ease:T}} style={{left:h.x,top:h.y,width:h.w}} className="pointer-events-none absolute z-50">
            <div className={D("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","gap-1 px-3 py-2")}>
              <span className={D(B,W)}>{K[x].ref}</span>
              <p className={E}>{K[x].title}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
        <p aria-live="polite" className="sr-only">{f}</p>
      </div>
  );
}
