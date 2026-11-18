/**
 * React Bits Pro — Application UI (kanban-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { assignee, col, comments, files, getBoundingClientRect, i, id, index, left, limit, name, priority, querySelectorAll, ref, t, tag, title, top, useCallback, useId, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_60041 = [["path",{d:"M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_48094 = [["path",{d:"M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

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

let L = {High:b,Medium:"text-neutral-900/78 dark:text-neutral-100/78",Low:h};

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


export default function kanban_1__Sorbet__Component(){
  let e=useId(),t=useReducedMotion(),[r,$]=useState(M),[D,z]=useState(R),[I,W]=useState(null),[B,X]=useState(null),[Y,H]=useState({x:0,y:0,w:0}),[E,T]=useState(null),[O,U]=useState(""),[q,K]=useState(""),Z=useRef(null),F=useRef(new Map),G=useRef(0),V=useRef(null),J=useCallback(e=>Object.keys(r).find(t=>r[t].includes(e))??"backlog", [r]),Q=useCallback((e,t,r)=>{
    $(a=>{
      let n={...a},i=null;
      for(let t of Object.keys(n))t.includes(e)&&(i=t);
      if(!i)return a;
      let l=i.indexOf(e);
      if(i===t&&l===r)return a;
      i=i.filter(t=>t!==e);
      let o=i===t?i:[...t];
      return o.splice(Math.max(0,Math.min(r,o.length)),0,e),t=o,n;
    })
  }, []),ee=useCallback((e,t,r)=>{
    for(let[a,n]of F.current){
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
  }, []),et=(e,t)=>{
    if(0!==e.button)return;
    let r=e.currentTarget.closest("[data-card]"),a=Z.current;
    if(!r||!a)return;
    e.preventDefault();
    let n=r.getBoundingClientRect();
    V.current={id:t,dx:e.clientX-left,dy:e.clientY-top,w:width,active:false,startX:e.clientX,startY:e.clientY,pointerId:e.pointerId},a.setPointerCapture(e.pointerId),r.querySelector('[aria-roledescription="Draggable card"]')?.focus()
  },er=()=>{
    let e=V.current;
    if(!e)return;
    V.current=null;
    let t=Z.current;
    if(t?.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),e.active){
      let t=P.find(t=>t.id===J(e.id));
      K(`${D[e.id]?.ref} moved to ${t?.name}.`)
    }
    W(null)
  },ea=e=>{
    let t=O.trim();
    if(!t)return void T(null);
    let r=242+G.current,a=`n${r}`;
    G.current+=1,z(e=>({...e,[a]:{id:a,ref:`HAL-${r}`,title:t,tag:"Triage",assignee:"Ana Reyes",comments:0,files:0,priority:"Medium"}})),$(t=>({...t,[e]:[a,...t[e]]})),U(""),T(null),K(`Added ${t}.`)
  },en=useMemo(()=>Object.values(r).reduce((e,t)=>e+t.length,0), [r]);
  return (
    <div ref={Z} onPointerMove={e=>{
        let t=V.current,r=Z.current;
        if(!t||!r)return;
        if(!t.active){
          if(4>Math.hypot(e.clientX-t.startX,e.clientY-t.startY))return;
          t.active=true,X(null),W(t.id)
        }
        let a=r.getBoundingClientRect();
        H({x:e.clientX-a.left-t.dx,y:e.clientY-a.top-t.dy,w:t.w});
        let n=ee(e.clientX,e.clientY,t.id);
        n&&Q(t.id,col,index)
      }} onPointerUp={er} onPointerCancel={er} onLostPointerCapture={er} className={u("bg-white dark:bg-neutral-950",b,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden",I&&"touch-none select-none")}>
        <header className="flex shrink-0 flex-wrap items-end justify-between gap-3 px-6 pt-6 pb-4 sm:px-8">
          <div className="min-w-0">
            <h2 className={u("text-[17px]/[22px] font-extrabold",b)}>Platform board</h2>
            <p className={u(m,h,"mt-0.5 truncate")}>
              {en}
              {" open items. Drag a card, or focus one and press space to move it with the arrow keys."}
            </p>
          </div>
          <div className={u("flex items-center *:not-first:-ms-1.5 *:not-last:[mask-image:radial-gradient(50%_50%_at_calc(150%-6px)_50%,transparent_calc(100%+1.5px),#000_calc(100%+2px))]","shrink-0")}>
            {["Ana Reyes","Priya Nandakumar","Marco Silva","Wei Chen"].map(e=><span key={e} title={e} className={u(v,"size-[28px]")}><span className={w}>{S(e)}</span></span>)}
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6 sm:px-8">
          <div className="flex h-full min-w-max gap-2.5">
            {P.map(n=>{
              let i=r[id],o=limit>0&&i.length>limit;
              return (
                <section key={id} aria-label={name} className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","h-full w-[264px] shrink-0")}>
                            <div className="flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5">
                              <span className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">{name}</span>
                              <span className={u(o?N:"shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","shrink-0")}>
                                {i.length}
                                {limit>0?`/${limit}`:""}
                              </span>
                              <button type="button" onClick={()=>{
                                T(id),U("")
                              }} aria-label={`Add a card to ${name}`} className={u(k,"size-7 rounded-[calc(var(--rb-r-full,999px))]","ml-auto")}>
                                <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
                              </button>
                            </div>
                            <div ref={e=>{
                              e?F.current.set(id,e):F.current.delete(id)
                            }} className={u("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","min-h-0 flex-1 overflow-y-auto")}>
                              {E===id&&<div className={u("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","px-3 py-2")}>
                                <label htmlFor={`${e}-${id}-draft`} className="sr-only">
                                  {"New card in "}
                                  {name}
                                </label>
                                <div className={u("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10")}>
                                  <input id={`${e}-${id}-draft`} autoFocus value={O} onChange={e=>U(e.target.value)} onKeyDown={e=>{
                                    "Enter"===e.key&&ea(id),"Escape"===e.key&&T(null)
                                  }} placeholder="What needs doing?" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
                                </div>
                                <div className="mt-2 flex items-center gap-1">
                                  <button type="button" onClick={()=>ea(id)} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold")}>Add</button>
                                  <button type="button" onClick={()=>T(null)} aria-label="Cancel" className={u(k,"size-8 rounded-[calc(var(--rb-r-full,999px))]")}>
                                    <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                                  </button>
                                </div>
                              </div>}
                              <ul className={u("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","p-1")}>
                                {i.map(e=>{
                                  let n=D[e];
                                  if(!n)return null;
                                  let i=I===e,o=B===e;
                                  return (
                                    <motion.li key={e} layout={!t&&"position"} transition={A} data-card={e} className={u(i&&u("rounded-[calc(var(--rb-r-lg,10px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8",y))}>
                                                        <div role="button" tabIndex={0} aria-roledescription="Draggable card" aria-label={`${ref}: ${title}. ${priority} priority, assigned to ${assignee}.`} onPointerDown={t=>{
                                                          "mouse"===t.pointerType&&et(t,e)
                                                        }} onKeyDown={t=>((e,t)=>{
                                                          let a=J(t),n=r[a].indexOf(t),i=P.findIndex(e=>e.id===a);
                                                          if(" "===e.key||"Enter"===e.key){
                                                            e.preventDefault();
                                                            let r=B===t?null:t;
                                                            X(r),K(r?`${D[t].ref} grabbed. Use the arrow keys to move it, then press space to drop.`:`${D[t].ref} dropped in ${P[i].name}.`);
                                                            return
                                                          }
                                                          if("Escape"===e.key&&B===t){
                                                            e.preventDefault(),X(null),K("Move cancelled.");
                                                            return
                                                          }
                                                          if(B!==t)return;
                                                          let l=true;
                                                          "ArrowUp"===e.key?Q(t,a,Math.max(0,n-1)):"ArrowDown"===e.key?Q(t,a,n+1):"ArrowLeft"===e.key&&i>0?Q(t,P[i-1].id,r[P[i-1].id].length):"ArrowRight"===e.key&&i<P.length-1?Q(t,P[i+1].id,r[P[i+1].id].length):l=false,l&&(e.preventDefault(),e.currentTarget.focus())
                                                        })(t,e)} className={u("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",y,o?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":u("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10"),"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","cursor-grab px-2",i&&"invisible")}>
                                                          <div className="flex w-full items-center gap-2">
                                                            <span className={u(f,L[priority])}>{priority}</span>
                                                            <span className={u(g,h)}>{ref}</span>
                                                            <span onPointerDown={t=>et(t,e)} style={{touchAction:"none"}} aria-hidden className={u(h,"ml-auto -mr-0.5 cursor-grab")}>
                                                              <HugeiconsIcon icon={Icon_60041} size={16} strokeWidth={2} aria-hidden="true" />
                                                            </span>
                                                          </div>
                                                          <p className={u(j,"w-full")}>{title}</p>
                                                          <div className="flex w-full items-center gap-2">
                                                            <span className={u("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>{tag}</span>
                                                            {comments>0&&<span className={u(f,h,"inline-flex items-center gap-1")}>
                                                              <HugeiconsIcon icon={Icon_36586} size={14} strokeWidth={2} aria-hidden="true" />
                                                              {comments}
                                                            </span>}
                                                            {files>0&&<span className={u(f,h,"inline-flex items-center gap-1")}>
                                                              <HugeiconsIcon icon={Icon_48094} size={14} strokeWidth={2} aria-hidden="true" />
                                                              {files}
                                                            </span>}
                                                            <span title={assignee} className={u(v,"ml-auto size-[24px]")}><span className={w}>{S(assignee)}</span></span>
                                                          </div>
                                                        </div>
                                                      </motion.li>
                                  );
                                })}
                              </ul>
                              {0===i.length&&E!==id&&<p className={u(m,h,"px-3 py-6 text-center")}>Nothing here yet</p>}
                            </div>
                          </section>
              );
            })}
          </div>
        </div>
        <AnimatePresence>
          {I&&D[I]&&<motion.div key={"ghost"} initial={t?{opacity:.9}:{opacity:.9,scale:1}} animate={t?{opacity:1}:{opacity:1,scale:1.02,rotate:-1.5}} exit={{opacity:0,transition:{duration:.12}}} transition={{duration:.16,ease:C}} style={{left:Y.x,top:Y.y,width:Y.w}} className="pointer-events-none absolute z-50">
            <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","gap-1 px-3 py-2")}>
              <div className="flex items-center gap-2">
                <span className={u(f,L[D[I].priority])}>{D[I].priority}</span>
                <span className={u(g,h)}>{D[I].ref}</span>
              </div>
              <p className={j}>{D[I].title}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
        <p aria-live="polite" className="sr-only">{q}</p>
      </div>
  );
}
