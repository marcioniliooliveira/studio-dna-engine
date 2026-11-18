/**
 * React Bits Pro — Application UI (forms-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_6097 = [["path",{d:"M5.25 21H18.75C18.9822 21 19.0983 21 19.196 20.9904C20.1456 20.8968 20.8968 20.1456 20.9904 19.196C21 19.0983 21 18.9822 21 18.75C21 18.5178 21 18.4017 20.9904 18.304C20.8968 17.3544 20.1456 16.6032 19.196 16.5096C19.0983 16.5 18.9822 16.5 18.75 16.5H17.0607C16.8324 16.5 16.7182 16.5 16.6087 16.5121C16.2317 16.5538 15.8742 16.7018 15.5781 16.939C15.4921 17.0079 15.4114 17.0886 15.25 17.25C15.0886 17.4114 15.0079 17.4921 14.9219 17.561C14.6258 17.7982 14.2683 17.9462 13.8913 17.9879C13.7818 18 13.6676 18 13.4393 18H10.5607C10.3324 18 10.2182 18 10.1087 17.9879C9.73165 17.9462 9.37423 17.7982 9.07814 17.561C8.99213 17.4921 8.91142 17.4114 8.75 17.25C8.58858 17.0886 8.50787 17.0079 8.42186 16.939C8.12577 16.7018 7.76835 16.5538 7.3913 16.5121C7.28177 16.5 7.16763 16.5 6.93934 16.5H5.25C5.01783 16.5 4.90175 16.5 4.80397 16.5096C3.85441 16.6032 3.10315 17.3544 3.00963 18.304C3 18.4017 3 18.5178 3 18.75C3 18.9822 3 19.0983 3.00963 19.196C3.10315 20.1456 3.85441 20.8968 4.80397 20.9904C4.90175 21 5.01783 21 5.25 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.5 7.49996C16.5 7.49996 13.1858 3.00001 12 3C10.8141 2.99999 7.5 7.5 7.5 7.5M12 4V15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  x = "bg-neutral-900/9 dark:bg-neutral-100/9",
  h = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/80 dark:text-neutral-100/80",
  m = "text-neutral-900/66 dark:text-neutral-100/66",
  f = "rounded-[var(--rb-r-sm,6px)]",
  _ = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  k = "text-[14px]/[20px] font-normal",
  v = "text-[13px]/[18px] font-normal",
  g = "text-[12px]/[16px] font-normal tabular-nums",
  w = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  j = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  y = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  N = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  z = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  S = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  C = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  D = "max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  A = "flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  E = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  M = b("border border-dashed border-neutral-900/20 dark:border-neutral-100/20",f,w),
  R = b("border border-neutral-900/50 dark:border-neutral-100/50",f,x,w);

function W({id:e,value:r,onChange:a,options:o,disabled:d,placeholder:c="Select…",className:u,triggerClassName:x,leading:h,ariaLabel:p}){
  let f=useId(),[_,k]=useState(false),[v,w]=useState(0),[j,y]=useState(false),[N,z]=useState(),S=useRef(null),C=useRef(null),D=useRef({buffer:"",at:0}),A=o.findIndex(e=>e.value===r),E=A>=0?Icon_27476:undefined,M=e=>{
    if(d)return;
    let r=S.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,l=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),l=Math.min(l,r.bottom);
        break
      }
      let n=l-e.bottom,s=e.top-t,i=Math.min(32*o.length+8,264),d=n<i+8&&s>n,c=(d?s:n)-8;
      y(d),z(c<i?Math.max(c,40):undefined)
    }
    w(e??(A>=0?A:0)),k(true)
  };
  useEffect(()=>{
    if(!_)return;
    let e=S.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||k(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [_]),useEffect(()=>{
    if(!_)return;
    let e=C.current,r=e?.querySelector(`[data-index="${v}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [_,v]);
  let R=e=>{
    let r=o[e];
    r&&(a(r.value),k(false),S.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={S} className={b("relative",u)}>
        <button id={e} type="button" role="combobox" aria-expanded={_} aria-controls={f} aria-haspopup="listbox" disabled={d} onClick={()=>_?k(false):M()} onKeyDown={e=>{
          if(!d){
            if(!_){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),M());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),k(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),w(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),w(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),w(0);else if("End"===e.key)e.preventDefault(),w(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),R(v);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=D.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=o.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&w(t)
            }
          }
        }} aria-label={p} className={b("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",x)}>
          <span className="flex min-w-0 items-center gap-2">
            {h}
            <span className={b("truncate",!E&&"text-neutral-900/66 dark:text-neutral-100/66")}>{E?E.label:c}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {_&&<ul ref={C} id={f} role="listbox" tabIndex={-1} style={{maxHeight:N}} className={b("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",j?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,a)=>{
            let l=e.value===r;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={a} data-highlighted={a===v?"":undefined} onMouseEnter={()=>w(a)} onClick={()=>R(a)} className={b("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={b(g,m,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let $ = ["Visual arts","Performing arts","Music and sound","Literary arts","Community media"],
  T = [{id:"seed",name:"Seed grant",blurb:"Early-stage work and prototypes",amount:"$2,500"},{id:"project",name:"Project grant",blurb:"A full season or production run",amount:"$10,000"},{id:"residency",name:"Residency grant",blurb:"A funded studio placement",amount:"$25,000"}],
  B = e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()),
  F = [{name:"project-budget-2026.pdf",size:184320},{name:"community-letters-of-support.pdf",size:962560}];

function L(){
  let[e,r]=useState(""),[a,s]=useState(""),[L,H]=useState(""),[I,P]=useState(""),[K,O]=useState(""),[q,V]=useState(""),[U,Y]=useState(false),[G,J]=useState([]),[Q,X]=useState(""),[Z,ee]=useState(""),[er,ea]=useState(F),[et,el]=useState(false),en=useRef(null),[es,ei]=useState(false),[eo,ed]=useState(false);
  useEffect(()=>{
    if(!eo)return;
    let e=window.setTimeout(()=>ed(false),2500);
    return ()=>window.clearTimeout(e);
  }, [eo]);
  let{ref:ec,edges:eu,onScroll:eb}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=r;
      a({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      t();
      let a=r.ownerDocument.defaultView?.ResizeObserver,l=a?new a(t):null;
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),ex=400-q.length,eh=ex<0,ep=""!==L&&!B(L),em=useMemo(()=>[""!==e.trim(),""!==a.trim(),B(L),""!==I,G.length>0,""!==K,""!==q.trim()&&!eh,U], [e,a,L,I,G.length,K,q,eh,U]),ef=em.filter(Boolean).length,e_=Math.round(ef/em.length*100),ek=ef===em.length,ev=e=>{
    e&&ea(r=>{
      let a=[...r];
      for(let r of Array.from(e)){
        if(a.length>=5)break;
        a.some(e=>e.name===r.name)||a.push({name:r.name,size:r.size})
      }
      return a;
    })
  },eg=er.length>=5;
  return (
    <div className={b("bg-white dark:bg-neutral-950",h,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex min-h-0 w-full max-w-[760px] flex-1 flex-col">
          <div className={b(E,"min-h-0 flex-1")}>
            {es?<div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center">
                <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={1.8} aria-hidden="true" className={p} />
              </span>
              <h2 className={b(_,h,"mt-4")}>Application received</h2>
              <p className={b(k,p,"mt-1 max-w-sm")}>
                Our panel reviews new applications within ten working days. Keep your reference code for any follow-up.
              </p>
              <div className={b("bg-neutral-900/5 dark:bg-neutral-100/5",f,"mt-4 px-4 py-2.5")}>
                <span className={b(g,m)}>Reference code</span>
                <p className={b("font-mono text-[13px]/[20px] tabular-nums",h)}>ARTS-2026-4718</p>
              </div>
              <button type="button" onClick={()=>{
                r(""),s(""),H(""),P(""),O(""),V(""),Y(false),J([]),X(""),ee(""),ea(F),ei(false)
              }} className={b(j,N,"mt-6")}>Start another application</button>
            </div>:<>
              <div className={b("border-b border-neutral-900/8 dark:border-neutral-100/8","px-4 py-3")}>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className={b(_,h)}>Community arts fund application</h2>
                    <p className={b("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>Tell us about your project and the support you need.</p>
                  </div>
                  <span className="shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">
                    {e_}
                    %
                  </span>
                </div>
                <div className={b("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-2.5 h-1.5")}>
                  <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${e_}%`}} />
                </div>
              </div>
              <div className="relative min-h-0 flex-1">
                <div ref={ec} onScroll={eb} className="h-full space-y-6 overflow-y-auto px-4 py-5">
                  <section className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="frm7-title" className={C}>
                        <span>
                          Project title
                          <span aria-hidden="true" className={m}>
                            {" "}
                            *
                          </span>
                        </span>
                      </label>
                      <div className={b(z,"h-8")}>
                        <input id="frm7-title" value={e} onChange={e=>r(e.target.value)} placeholder="A short, memorable name" className={S} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="frm7-org" className={C}>
                          <span>
                            Organization or artist
                            <span aria-hidden="true" className={m}>
                              {" "}
                              *
                            </span>
                          </span>
                        </label>
                        <div className={b(z,"h-8")}>
                          <input id="frm7-org" value={a} onChange={e=>s(e.target.value)} placeholder="Who is applying" className={S} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="frm7-email" className={C}>
                          <span>
                            Contact email
                            <span aria-hidden="true" className={m}>
                              {" "}
                              *
                            </span>
                          </span>
                        </label>
                        <div className={b(z,"h-8")}>
                          <input id="frm7-email" type="email" value={L} onChange={e=>H(e.target.value)} aria-invalid={ep} aria-describedby={ep?"frm7-email-error":undefined} placeholder="you@example.org" className={S} />
                        </div>
                        {ep&&<p id="frm7-email-error" className={A}>
                          <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                          Enter a valid email, like you@example.org.
                        </p>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="frm7-focus" className={C}>
                        <span>
                          Focus area
                          <span aria-hidden="true" className={m}>
                            {" "}
                            *
                          </span>
                        </span>
                      </label>
                      <W id="frm7-focus" value={I} onChange={e=>P(e)} options={$.map(e=>({value:e,label:e}))} placeholder="Select a focus area" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="frm7-tags" className={C}>
                        <span>
                          Discipline tags
                          <span aria-hidden="true" className={m}>
                            {" "}
                            *
                          </span>
                        </span>
                      </label>
                      <div data-concentric className={b(z,"min-h-8","flex-wrap gap-1 px-1 py-0.5")}>
                        {G.map(e=>(
                          <span key={e} className="relative inline-flex h-6 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                                                {e}
                                                <button type="button" onClick={()=>{
                                                  J(r=>r.filter(r=>r!==e)),ee("")
                                                }} className="-me-1 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                                                  <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                                                  <span className="sr-only">
                                                    {"Remove "}
                                                    {e}
                                                  </span>
                                                </button>
                                              </span>
                        ))}
                        <input id="frm7-tags" value={Q} onChange={e=>{
                          X(e.target.value),Z&&ee("")
                        }} onKeyDown={e=>{
                          "Enter"===e.key?(e.preventDefault(),(()=>{
                            let e=Q.trim();
                            if(""!==e){
                              if(G.some(r=>r.toLowerCase()===e.toLowerCase()))return ee(`"${e}" is already added.`);
                              J(r=>[...r,e]),X(""),ee("")
                            }
                          })()):"Backspace"===e.key&&""===Q&&G.length>0&&(J(e=>e.slice(0,-1)),ee(""))
                        }} placeholder={0===G.length?"Add a tag and press Enter":""} aria-invalid={!!Z||undefined} aria-describedby="frm7-tags-help" className={b("h-full w-full min-w-0 flex-1 bg-transparent px-2 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]","min-w-[8rem]")} />
                      </div>
                      {Z?<p id="frm7-tags-help" className={A}>
                        <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                        {Z}
                      </p>:<p id="frm7-tags-help" className={D}>Press Enter to add, Backspace to remove the last tag.</p>}
                    </div>
                  </section>
                  <section className="flex flex-col gap-2">
                    <p className={C}>
                      <span>
                        Funding tier
                        <span aria-hidden="true" className={m}>
                          {" "}
                          *
                        </span>
                      </span>
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {T.map(e=>{
                        let r=K===e.id;
                        return (
                          <label key={e.id} className={b(E,"cursor-pointer")}>
                                                <input type="radio" name="frm7-tier" value={e.id} checked={r} onChange={()=>O(e.id)} className={b("size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40","absolute end-3 top-3")} />
                                                <span className={b(r?x:"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",w,"flex-1 p-3")}>
                                                  <span className={b("text-[14px]/[16px] font-[450]",h,"block")}>{e.name}</span>
                                                  <span className={b(v,p,"mt-0.5 block")}>{e.blurb}</span>
                                                  <span className={b(k,h,"mt-2 block tabular-nums")}>{e.amount}</span>
                                                </span>
                                              </label>
                        );
                      })}
                    </div>
                  </section>
                  <section className="flex flex-col gap-2">
                    <label htmlFor="frm7-summary" className={C}>
                      <span>
                        Project summary
                        <span aria-hidden="true" className={m}>
                          {" "}
                          *
                        </span>
                      </span>
                    </label>
                    <textarea id="frm7-summary" value={q} onChange={e=>V(e.target.value)} aria-invalid={eh} placeholder="Describe the work, who it reaches, and what the funding covers." className={b("block max-h-[256px] min-h-[76px] w-full min-w-48 resize-none rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 py-2 text-[14px]/[20px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none field-sizing-content transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-neutral-900/66 hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none read-only:border-transparent read-only:bg-neutral-900/5 read-only:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:placeholder:text-neutral-100/66 dark:hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40 dark:read-only:bg-neutral-100/5","min-h-[96px]")} />
                    <div className="flex items-center justify-between">
                      <p className={D}>A panel reads this first.</p>
                      <p className={b(g,eh?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":m)}>{eh?`${Math.abs(ex)} over limit`:`${ex} left`}</p>
                    </div>
                  </section>
                  <section className="flex flex-col gap-2">
                    <p className={C}>Supporting documents</p>
                    <div onDragOver={e=>{
                      e.preventDefault(),eg||el(true)
                    }} onDragLeave={()=>el(false)} onDrop={e=>{
                      e.preventDefault(),el(false),er.length>=5||ev(e.dataTransfer.files)
                    }} style={{touchAction:"pan-y"}} className={b(et?R:M,"flex flex-col items-center px-4 py-6 text-center",eg&&"opacity-60")}>
                      <span className={b(p,"flex h-9 w-9 items-center justify-center")}>
                        <HugeiconsIcon icon={Icon_6097} size={16} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <p className={b(v,p,"mt-2")}>Drag files here to attach</p>
                      <p className={b(v,m,"mt-0.5")}>
                        Budgets, work samples or letters of support, up to
                        {" "}
                        5
                        {" files."}
                      </p>
                      <button type="button" disabled={eg} onClick={()=>en.current?.click()} className={b(j,N,"mt-3")}>Choose files</button>
                      <input ref={en} type="file" multiple className="hidden" onChange={e=>{
                        ev(e.target.files),e.target.value=""
                      }} />
                    </div>
                    {er.length>0&&<ul className={b("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex flex-col")}>
                      {er.map(e=>{
                        var r;
                        return (
                          <li key={e.name} className="relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]">
                                                <HugeiconsIcon icon={Icon_31964} size={16} strokeWidth={1.8} aria-hidden="true" className={b(m,"shrink-0")} />
                                                <span className={b("block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]",v,h,"flex-1")}>{e.name}</span>
                                                <span className={b(g,m,"shrink-0")}>
                                                  {(r=e.size)<1024?`${r} B`:r<1048576?`${Math.round(r/1024)} KB`:`${(r/1048576).toFixed(1)} MB`}
                                                </span>
                                                <button type="button" onClick={()=>ea(r=>r.filter(r=>r.name!==e.name))} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-6 rounded-[var(--rb-r-sm,6px)]")}>
                                                  <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                  <span className="sr-only">
                                                    {"Remove "}
                                                    {e.name}
                                                  </span>
                                                </button>
                                              </li>
                        );
                      })}
                    </ul>}
                    {eg&&<p className={D}>
                      {"Maximum of "}
                      5
                      {" files reached. Remove one to add another."}
                    </p>}
                  </section>
                  <section>
                    <label className="flex cursor-pointer items-start gap-2">
                      <span className={b("relative inline-flex size-4 shrink-0 items-center justify-center","mt-px")}>
                        <input type="checkbox" checked={U} onChange={e=>Y(e.target.checked)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                        <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                      </span>
                      <span className={b(v,p)}>
                        I confirm the information here is accurate and I am authorized to apply on behalf of the organization.
                      </span>
                    </label>
                  </section>
                </div>
                <div aria-hidden="true" className={b("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",eu.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={b("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",eu.end?"opacity-100":"opacity-0")} />
              </div>
              <div className={b("border-t border-neutral-900/8 dark:border-neutral-100/8","flex flex-col-reverse gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between")}>
                <button type="button" onClick={()=>ed(true)} className={b(j,y)}>{eo?"Draft saved":"Save draft"}</button>
                <div className="flex items-center gap-3">
                  {!ek&&<span className={b(v,m,"hidden sm:inline")}>
                    {ef}
                    {" of "}
                    {em.length}
                    {" required fields complete"}
                  </span>}
                  <button type="button" disabled={!ek} onClick={()=>ei(true)} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",y,"flex-1 sm:flex-none")}>Submit application</button>
                </div>
              </div>
            </>}
          </div>
        </div>
      </div>
  );
}


export default L;
