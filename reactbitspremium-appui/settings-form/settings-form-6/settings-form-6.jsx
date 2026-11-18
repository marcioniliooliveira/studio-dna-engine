/**
 * React Bits Pro — Application UI (settings-form-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { useReducedMotion } from 'motion/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/80 dark:text-neutral-100/80",
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  p = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  m = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  f = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  _ = "flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  k = u("text-[16px]/[20px] font-[450] tracking-[-0.015em]",b),
  v = u("text-[13px]/[18px] font-normal",x),
  g = "northwind",
  w = [{value:"devan",label:"Devan Rao"},{value:"priyanka",label:"Priyanka Balasubramanian"},{value:"sofia",label:"Sofia Castellano"}];

function j({id:e,value:r,onChange:a,options:l}){
  let d=useId(),[c,b]=useState(false),[x,h]=useState(false),[p,m]=useState(0),[f,_]=useState(false),[k,v]=useState(undefined),g=useRef(null),w=useRef(null),j=useRef({buffer:"",at:0}),y=l.findIndex(e=>e.value===r),N=y>=0?l[y]:undefined,C=e=>{
    let r=g.current;
    if(r){
      let{above:e,below:a}=function(e){
        let r=e.ownerDocument.defaultView,a=e.getBoundingClientRect(),t=0,n=r?r.innerHeight:a.bottom;
        for(let a=e.parentElement;a&&r;a=a.parentElement){
          if("visible"===r.getComputedStyle(a).overflowY)continue;
          let e=a.getBoundingClientRect();
          t=Math.max(t,e.top),n=Math.min(n,e.bottom)
        }
        return {above:a.top-t,below:n-a.bottom};
      }(r),t=Math.min(32*l.length+10,264),n=a<t+6&&e>a,i=(n?e:a)-10;
      _(n),v(i<t?Math.max(i,72):undefined)
    }
    h(e),m(y>=0?y:0),b(true)
  };
  useEffect(()=>{
    if(!c)return;
    let e=g.current,r=e?.ownerDocument;
    if(!e||!r)return;
    let a=r=>{
      e.contains(r.target)||b(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [c]),useEffect(()=>{
    if(!c)return;
    let e=w.current,r=e?.querySelector(`[data-index="${p}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [c,p]);
  let S=e=>{
    let r=l[e];
    r&&(a(r.value),b(false),g.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={g} className="relative flex">
        <button id={e} type="button" role="combobox" aria-expanded={c} aria-controls={d} aria-haspopup="listbox" aria-activedescendant={c?`${d}-${p}`:undefined} onClick={()=>c?b(false):C(false)} onKeyDown={e=>{
          if(!c){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),C(true));
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),b(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),m(e=>Math.min(e+1,l.length-1));else if("ArrowUp"===e.key)e.preventDefault(),m(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),m(0);else if("End"===e.key)e.preventDefault(),m(l.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),S(p);else if(1===e.key.length&&/\S/.test(e.key)){
            let r=Date.now(),a=j.current;
            a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
            let t=l.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
            t>=0&&m(t)
          }
        }} className={u("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","flex-1")}>
          <span className="truncate">{N?.label}</span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {c&&<ul ref={w} id={d} role="listbox" tabIndex={-1} style={k?{maxHeight:k}:undefined} className={u("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",!x&&"transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute left-0 z-30 max-h-[264px] w-full min-w-[100%]",f?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {l.map((e,a)=>{
            let n=e.value===r;
            return (
              <li key={e.value} id={`${d}-${a}`} role="option" aria-selected={n} data-highlighted={a===p?"":undefined} data-index={a} onMouseEnter={()=>m(a)} onClick={()=>S(a)} className={u("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function y({title:e,description:r,action:a,children:n}){
  return (
    <div className="px-3 py-2.5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className={_}>{e}</p>
            <p className={u("max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>{r}</p>
          </div>
          {a?<div className="sm:shrink-0">{a}</div>:null}
        </div>
        {n}
      </div>
  );
}

function N(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:t+l<n-1})
    }, []);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      t();
      let a=r.ownerDocument.defaultView?.ResizeObserver,n=a?new a(t):null;
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),s=useReducedMotion(),[N,C]=useState("You"),[S,z]=useState(false),[D,E]=useState(w[0].value),[A,R]=useState(false),[$,T]=useState(true),[M,L]=useState(""),[W,U]=useState(false),[H,I]=useState(false),[B,P]=useState(false),F=M.trim()===g,O=(B||M.trim().length>0)&&!F;
  return (
    <div className={u("bg-white dark:bg-neutral-950",b,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0 px-4 sm:px-6">
          <div className="mx-auto flex h-14 w-full max-w-2xl items-center"><h2 className={u(k,"truncate")}>Danger zone</h2></div>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={a} className="h-full overflow-y-auto px-4 sm:px-6">
            <div className="mx-auto w-full max-w-2xl pb-4 sm:pb-6">
              <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
                <div className={u("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","py-3")}>
                  <div className="min-w-0">
                    <h3 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Workspace controls</h3>
                    <p className={u("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>These actions affect everyone in the workspace. Review before you confirm.</p>
                  </div>
                </div>
                {H?<div className={u(f,"items-center gap-3 px-4 py-12 text-center")}>
                  <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className={x} />
                  <div>
                    <p role="status" className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">northwind was deleted</p>
                    <p className={u("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>All 24 members have lost access. Data is held for 30 days before it is erased.</p>
                  </div>
                  <button type="button" onClick={()=>{
                    I(false),T(true)
                  }} className={u(h,p,"mt-1")}>Restore workspace</button>
                </div>:<div className={u(f,"divide-y divide-neutral-900/8 dark:divide-neutral-100/8")}>
                  <y title="Transfer ownership" description={"You"===N?"Hand the workspace to another admin. You keep your account.":`${N} owns this workspace. You keep your account.`} action={S?null:<button type="button" onClick={()=>z(true)} className={u(h,p,"w-full sm:w-auto")}>{"You"===N?"Transfer":"Change owner"}</button>}>
                    {S?<div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <label htmlFor="next-owner" className={m}>New owner</label>
                        <j id="next-owner" value={D} onChange={E} options={w} />
                      </div>
                      <div className="flex flex-col-reverse gap-2 sm:flex-row">
                        <button type="button" onClick={()=>z(false)} className={u(h,p,"w-full sm:w-auto")}>Cancel</button>
                        <button type="button" onClick={()=>{
                          C(w.find(e=>e.value===D)?.label??"You"),z(false)
                        }} className={u(h,p,"w-full sm:w-auto")}>Confirm transfer</button>
                      </div>
                    </div>:null}
                  </y>
                  <y title="Export and archive" description={A?"The workspace is read-only. Members can view but not edit.":"Download all data, then make the workspace read-only."} action={<button type="button" onClick={()=>R(e=>!e)} className={u(h,p,"w-full sm:w-auto")}>{A?"Restore access":"Archive workspace"}</button>} />
                  <y title="Delete workspace" description="Permanently remove northwind and everything in it." action={$?null:<button type="button" onClick={()=>T(true)} className={u(h,p,"w-full sm:w-auto")}>Review deletion</button>}>
                    {$?<div className="mt-3">
                      <p className={_}>Deleting removes, for all 24 members:</p>
                      <ul className={u(v,"mt-2 space-y-1.5")}>
                        {["1,284 projects and their history","All API keys and connected integrations","The northwind.app subdomain, released for reuse"].map(e=>(
                          <li key={e} className="flex items-start gap-2">
                                                <span aria-hidden="true" className="mt-[0.5lh] size-1.5 shrink-0 -translate-y-1/2 bg-neutral-900 dark:bg-neutral-100" />
                                                <span>{e}</span>
                                              </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-col gap-2">
                        <label htmlFor="confirm-name" className={m}>
                          <span>
                            Type
                            {" "}
                            <span className="rounded-[var(--rb-r-xs,4px)] bg-neutral-900/5 px-1 py-px font-mono text-[0.9em] leading-none text-neutral-900 dark:text-neutral-100 [box-decoration-break:clone] dark:bg-neutral-100/5">{g}</span>
                            {" to confirm"}
                          </span>
                        </label>
                        <div className={u("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                          <input id="confirm-name" value={M} autoComplete="off" spellCheck={false} aria-invalid={!!O||undefined} aria-describedby={O?"confirm-name-error":undefined} onChange={e=>{
                            L(e.target.value),B&&P(false)
                          }} className={u("h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]","font-mono text-[13px]/[20px] tabular-nums")} />
                        </div>
                        {O?<p id="confirm-name-error" role="alert" className="flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]">
                          <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                          {0===M.trim().length?`Type ${g} to confirm deletion.`:`The name does not match ${g}.`}
                        </p>:null}
                      </div>
                      <div className="mt-3 flex flex-col-reverse gap-2 pb-1.5 sm:flex-row sm:justify-end">
                        <button type="button" onClick={()=>{
                          T(false),L(""),P(false)
                        }} className={u(h,p,"w-full sm:w-auto")}>Cancel</button>
                        <button type="button" onClick={()=>{
                          if(!W){
                            if(!F)return void P(true);
                            U(true),window.setTimeout(()=>{
                              U(false),I(true),L(""),P(false)
                            },900*!s)
                          }
                        }} aria-busy={W} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-[oklch(60%_0.236_26)] bg-white text-[oklch(51%_0.18_26)] shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-[oklch(51%_0.18_26)] active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-[oklch(65.2%_0.219_26)] dark:bg-neutral-900 dark:text-[oklch(76%_0.14_26)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-[oklch(76%_0.14_26)] dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",p,"w-full min-w-[10rem] sm:w-auto")}>
                          <span className="grid place-items-center *:[grid-area:1/1]">
                            <span className={u("inline-flex items-center gap-2",W&&"invisible")}>Delete this workspace</span>
                            {W&&<span className="inline-flex items-center gap-2">
                              <HugeiconsIcon icon={Icon_79715} size={16} strokeWidth={1.8} aria-hidden="true" className="animate-spin [animation-duration:800ms] motion-reduce:animate-none" />
                              Deleting
                            </span>}
                          </span>
                        </button>
                      </div>
                    </div>:null}
                  </y>
                </div>}
                <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">Export data before irreversible workspace changes.</div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default N;
