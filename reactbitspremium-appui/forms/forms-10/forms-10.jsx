/**
 * React Bits Pro — Application UI (forms-10)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_94089 = [["path",{d:"M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L10.5 15L16 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[13px]/[18px] font-normal",
  h = "text-[12px]/[16px] font-normal tabular-nums",
  p = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  k = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  f = "max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  m = "relative inline-flex size-4 shrink-0 items-center justify-center",
  v = "peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40",
  g = "pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]";

function w({id:e,value:r,onChange:a,options:i,disabled:c,placeholder:u="Select…",className:x,triggerClassName:p,leading:_,ariaLabel:k}){
  let f=useId(),[m,v]=useState(false),[g,w]=useState(0),[y,j]=useState(false),[N,S]=useState(),z=useRef(null),C=useRef(null),A=useRef({buffer:"",at:0}),E=i.findIndex(e=>e.value===r),D=E>=0?i[E]:undefined,H=e=>{
    if(c)return;
    let r=z.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,l=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),l=Math.min(l,r.bottom);
        break
      }
      let n=l-e.bottom,o=e.top-t,s=Math.min(32*i.length+8,264),d=n<s+8&&o>n,c=(d?o:n)-8;
      j(d),S(c<s?Math.max(c,40):undefined)
    }
    w(e??(E>=0?E:0)),v(true)
  };
  useEffect(()=>{
    if(!m)return;
    let e=z.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||v(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [m]),useEffect(()=>{
    if(!m)return;
    let e=C.current,r=e?.querySelector(`[data-index="${g}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [m,g]);
  let R=e=>{
    let r=i[e];
    r&&(a(r.value),v(false),z.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={z} className={d("relative",x)}>
        <button id={e} type="button" role="combobox" aria-expanded={m} aria-controls={f} aria-haspopup="listbox" aria-label={k} disabled={c} onClick={()=>m?v(false):H()} onKeyDown={e=>{
          if(!c){
            if(!m){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),H());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),v(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),w(e=>Math.min(e+1,i.length-1));else if("ArrowUp"===e.key)e.preventDefault(),w(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),w(0);else if("End"===e.key)e.preventDefault(),w(i.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),R(g);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=A.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=i.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&w(t)
            }
          }
        }} className={d("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",p)}>
          <span className="flex min-w-0 items-center gap-2">
            {_}
            <span className={d("truncate",!D&&"text-neutral-900/66 dark:text-neutral-100/66")}>{D?D.label:u}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {m&&<ul ref={C} id={f} role="listbox" tabIndex={-1} style={{maxHeight:N}} className={d("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",y?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {i.map((e,a)=>{
            let l=e.value===r;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={a} data-highlighted={a===g?"":undefined} onMouseEnter={()=>w(a)} onClick={()=>R(a)} className={d("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={d(h,b,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let y = [{value:"harbour-court",label:"Harbour Court, Bristol"},{value:"the-old-mill",label:"The Old Mill, Bath"},{value:"west-quay",label:"West Quay, Falmouth"},{value:"granary-house",label:"Granary House, York"}],
  j = ["The room was clean and well kept","Check-in and check-out were smooth","Staff were attentive and helpful","Breakfast met your expectations"],
  N = ["Poor","Fair","Good","Very good","Excellent"],
  S = [{value:"location",label:"The location"},{value:"housekeeping",label:"Housekeeping"},{value:"front-desk",label:"The front desk team"},{value:"breakfast",label:"Breakfast"},{value:"value",label:"Value for money"}],
  z = "nothing";

function C({value:e,onChange:r}){
  let a=useRef([]),n=e??0;
  return (
    <div role="radiogroup" aria-label="How likely are you to recommend us" onKeyDown={e=>{
        if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","Home","End"].includes(e.key))return;
        e.preventDefault();
        let t=n;
        ("ArrowRight"===e.key||"ArrowUp"===e.key)&&(t=Math.min(10,n+1)),("ArrowLeft"===e.key||"ArrowDown"===e.key)&&(t=Math.max(0,n-1)),"Home"===e.key&&(t=0),"End"===e.key&&(t=10),r(t),a.current[t]?.focus({preventScroll:true})
      }} className="flex flex-wrap gap-2">
        {Array.from({length:11},(l,o)=>{
          let s=e===o;
          return (
            <button key={o} ref={e=>{
                    a.current[o]=e
                  }} type="button" role="radio" aria-checked={s} aria-label={`${o} out of 10`} tabIndex={o===n?0:-1} onClick={()=>r(o)} className={d(s?p:_,"size-8 rounded-[var(--rb-r-sm,6px)]","text-[14px]/[16px] font-[450]","tabular-nums")}>{o}</button>
          );
        })}
      </div>
  );
}

function A(){
  let[e,r]=useState(false),[a,o]=useState(""),[A,E]=useState(""),[D,H]=useState(null),[R,T]=useState([null,null,null,null]),[M,W]=useState([]),[L,q]=useState(""),{ref:B,edges:F,onScroll:$}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollLeft:t,scrollWidth:l,clientWidth:n}=r;
      a({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let l=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),I=null!==D&&D<=6,O=e=>{
    e===z?W(e=>e.includes(z)?[]:[z]):W(r=>r.includes(e)?r.filter(r=>r!==e):[...r.filter(e=>e!==z),e])
  },U=useMemo(()=>{
    let e=[""!==a,null!==D,null!==R[0],null!==R[1],null!==R[2],null!==R[3],M.length>0];
    return I&&e.push(""!==L.trim()),e;
  }, [a,D,R,M,I,L]),V=U.filter(Boolean).length,P=U.length,G=V===P;
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"flex h-full min-h-[1080px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className="mx-auto w-full max-w-[760px]">
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
            {e?<div className="flex flex-col items-center px-6 py-16 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center">
                <HugeiconsIcon icon={Icon_94089} size={24} strokeWidth={1.8} aria-hidden="true" className={u} />
              </div>
              <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Thank you for your feedback</h2>
              <p className={d(x,u,"mt-1.5 max-w-sm")}>
                We logged your visit to
                {" "}
                {y.find(e=>e.value===a)?.label??"our property"}
                {" "}
                with a recommendation score of
                {" "}
                <span className={d(c,"tabular-nums")}>{D}</span>
                {" out of 10. The property manager reads every response."}
              </p>
              <button type="button" onClick={()=>r(false)} className={d(_,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-5")}>Edit my answers</button>
            </div>:<>
              <div className={d("border-b border-neutral-900/8 dark:border-neutral-100/8","flex items-start justify-between gap-4 px-5 py-4")}>
                <div className="min-w-0">
                  <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">How was your stay</h2>
                  <p className={d("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>A few questions about your recent visit.</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">
                    <span className={c}>{V}</span>
                    {" / "}
                    {P}
                    {" answered"}
                  </p>
                  <div className="mt-1.5 w-28">
                    <div className={d("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","h-1.5")}>
                      <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${V/P*100}%`}} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 px-5 py-5">
                <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="survey-property" className={k}>
                      <span>
                        Property visited
                        <span aria-hidden="true" className={b}>
                          {" "}
                          *
                        </span>
                      </span>
                    </label>
                    <w id="survey-property" value={a} onChange={e=>o(e)} options={y.map(e=>({value:e.value,label:e.label}))} placeholder="Select a property" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="survey-reference" className={k}>Reservation reference</label>
                    <div className={d("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                      <input id="survey-reference" value={A} onChange={e=>E(e.target.value)} placeholder="e.g. HC-48213" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                    </div>
                    <p className={f}>Optional. Found on your booking email.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className={k}>
                    <span>
                      How likely are you to recommend us to a friend
                      <span aria-hidden="true" className={b}>
                        {" "}
                        *
                      </span>
                    </span>
                  </label>
                  <div className="flex w-fit max-w-full flex-col gap-2">
                    <C value={D} onChange={H} />
                    <div className={d(h,b,"flex justify-between gap-2")}>
                      <span>0: Would not recommend</span>
                      <span>10: Would recommend</span>
                    </div>
                  </div>
                </div>
                {I&&<div className="flex flex-col gap-2">
                  <label htmlFor="survey-followup" className={k}>
                    <span>
                      What would have made your stay better
                      <span aria-hidden="true" className={b}>
                        {" "}
                        *
                      </span>
                    </span>
                  </label>
                  <textarea id="survey-followup" value={L} maxLength={300} onChange={e=>q(e.target.value)} aria-describedby="survey-followup-help" placeholder="Tell us what fell short so we can put it right." className={d("block max-h-[256px] min-h-[76px] w-full min-w-48 resize-none rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 py-2 text-[14px]/[20px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none field-sizing-content transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-neutral-900/66 hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none read-only:border-transparent read-only:bg-neutral-900/5 read-only:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:placeholder:text-neutral-100/66 dark:hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40 dark:read-only:bg-neutral-100/5","min-h-[80px]")} />
                  <div className="flex items-center justify-between">
                    <p id="survey-followup-help" className={f}>Required because you scored 6 or below.</p>
                    <p className={d(h,b)}>
                      {L.length}
                      {" / "}
                      300
                    </p>
                  </div>
                </div>}
                <div className="flex flex-col gap-2">
                  <p className={k}>
                    <span>
                      Rate the following
                      <span aria-hidden="true" className={b}>
                        {" "}
                        *
                      </span>
                    </span>
                  </p>
                  <div className="relative overflow-hidden">
                    <div ref={B} onScroll={$} style={{touchAction:"pan-x"}} className="overflow-x-auto">
                      <div className="min-w-[460px]">
                        <div className="grid grid-cols-[minmax(140px,1.4fr)_repeat(5,minmax(52px,1fr))] items-end gap-y-2">
                          <span aria-hidden="true" />
                          {N.map(e=><span key={e} aria-hidden="true" className={d(h,b,"px-1 text-center")}>{e}</span>)}
                          {j.map((e,r)=>(
                            <div key={e} role="radiogroup" aria-label={e} className="col-span-6 grid grid-cols-subgrid items-center py-2">
                                                    <span className={d(x,"pr-2")}>{e}</span>
                                                    {N.map((a,l)=>(
                                                      <label key={a} className="flex cursor-pointer items-center justify-center">
                                                                                <span className="sr-only">
                                                                                  {e}
                                                                                  {": "}
                                                                                  {a}
                                                                                </span>
                                                                                <input type="radio" name={`survey-matrix-${r}`} checked={R[r]===l} onChange={()=>{
                                                                                  T(e=>e.map((e,a)=>a===r?l:e))
                                                                                }} className="size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40" />
                                                                              </label>
                                                    ))}
                                                  </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div aria-hidden="true" className={d("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 left-0 w-8",F.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={d("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 right-0 w-8",F.end?"opacity-100":"opacity-0")} />
                  </div>
                </div>
                <fieldset className="space-y-2">
                  <legend className={k}>
                    <span>
                      What stood out
                      <span aria-hidden="true" className={b}>
                        {" "}
                        *
                      </span>
                    </span>
                  </legend>
                  <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {S.map(e=>{
                      let r=M.includes(z);
                      return (
                        <label key={e.value} className={d(x,"flex items-center gap-2 py-2",r?d("text-neutral-900/40 dark:text-neutral-100/40","cursor-not-allowed"):"cursor-pointer")}>
                                            <span className={m}>
                                              <input type="checkbox" checked={M.includes(e.value)} disabled={r} onChange={()=>O(e.value)} className={v} />
                                              <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={g} />
                                            </span>
                                            {e.label}
                                          </label>
                      );
                    })}
                    <label className={d(x,"flex cursor-pointer items-center gap-2 py-2 sm:col-span-2")}>
                      <span className={m}>
                        <input type="checkbox" checked={M.includes(z)} onChange={()=>O(z)} className={v} />
                        <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={g} />
                      </span>
                      Nothing in particular
                    </label>
                  </div>
                </fieldset>
              </div>
              <div className={d("border-t border-neutral-900/8 dark:border-neutral-100/8","flex items-center justify-between gap-3 py-3.5 ps-5 pe-3.5")}>
                <p className={d(x,b)}>{G?"Ready to send.":`${P-V} question${P-V==1?"":"s"} left.`}</p>
                <button type="button" onClick={()=>G&&r(true)} disabled={!G} title={G?undefined:"Answer every required question to submit."} className={d(p,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>Submit feedback</button>
              </div>
            </>}
          </div>
        </div>
      </div>
  );
}


export default A;
