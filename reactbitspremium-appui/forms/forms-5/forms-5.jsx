/**
 * React Bits Pro — Application UI (forms-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_56987 = [["path",{d:"M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 3L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_2301 = [["path",{d:"M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_78805 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 15H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 9H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/80 dark:text-neutral-100/80",
  m = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]",
  k = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  f = "text-[13px]/[18px] font-normal",
  v = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  g = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  w = "flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1",
  j = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  N = "max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  y = "flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  S = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100";

function z({id:e,value:a,defaultValue:r,onChange:o,options:d,disabled:c,placeholder:u="Select…",className:h,triggerClassName:x,leading:p,ariaLabel:_}){
  let k=useId(),[f,v]=useState(false),[g,w]=useState(0),[j,N]=useState(false),[y,S]=useState(),[z,C]=useState(r??""),A=useRef(null),E=useRef(null),W=useRef({buffer:"",at:0}),D=a??z,H=d.findIndex(e=>e.value===D),M=H>=0?d[H]:undefined,R=()=>{
    if(c)return;
    let e=A.current,a=e?.ownerDocument.defaultView;
    if(e&&a){
      let r=e.getBoundingClientRect(),t=0,s=a.innerHeight;
      for(let r=e.parentElement;r;r=r.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(r).overflowY)){
        let e=r.getBoundingClientRect();
        t=Math.max(t,e.top),s=Math.min(s,e.bottom);
        break
      }
      let l=s-r.bottom,n=r.top-t,i=Math.min(32*d.length+8,264),o=l<i+8&&n>l,c=(o?n:l)-8;
      N(o),S(c<i?Math.max(c,40):undefined)
    }
    w(H>=0?H:0),v(true)
  };
  useEffect(()=>{
    if(!f)return;
    let e=A.current;
    if(!e)return;
    let a=e.ownerDocument,r=a=>{
      e.contains(a.target)||v(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [f]),useEffect(()=>{
    if(!f)return;
    let e=E.current,a=e?.querySelector(`[data-index="${g}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [f,g]);
  let U=e=>{
    let r=d[e];
    r&&(undefined===a&&C(r.value),o?.(r.value),v(false),A.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={A} className={b("relative",h)}>
        <button id={e} type="button" role="combobox" aria-expanded={f} aria-controls={k} aria-haspopup="listbox" aria-label={_} disabled={c} onClick={()=>f?v(false):R()} onKeyDown={e=>{
          if(!c){
            if(!f){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),R());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),v(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),w(e=>Math.min(e+1,d.length-1));else if("ArrowUp"===e.key)e.preventDefault(),w(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),w(0);else if("End"===e.key)e.preventDefault(),w(d.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),U(g);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=W.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=d.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&w(t)
            }
          }
        }} className={b("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",x)}>
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {p}
            <span className="grid min-w-0 flex-1 text-left">
              {d.map(e=><span key={e.value} aria-hidden="true" className="invisible col-start-1 row-start-1 truncate">{e.label}</span>)}
              <span className={b("col-start-1 row-start-1 truncate",!M&&"text-neutral-900/66 dark:text-neutral-100/66")}>{M?M.label:u}</span>
            </span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {f&&<ul ref={E} id={k} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={b("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",j?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {d.map((e,a)=>{
            let r=e.value===D;
            return (
              <li key={e.value} role="option" aria-selected={r} data-index={a} data-highlighted={a===g?"":undefined} onMouseEnter={()=>w(a)} onClick={()=>U(a)} className={b("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={b("text-[12px]/[16px] font-normal tabular-nums",m,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {r&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let C = ["demo","admin","clinic","app","api","test"],
  A = [{value:"eu-west",label:"EU West, Dublin"},{value:"eu-central",label:"EU Central, Frankfurt"},{value:"uk-south",label:"UK South, London"},{value:"us-east",label:"US East, Virginia"}],
  E = [{value:"solo",name:"Solo clinic",description:"One location, up to 8 providers.",price:"$49/mo"},{value:"group",name:"Group practice",description:"Multi-site scheduling and shared rooms.",price:"$149/mo"},{value:"network",name:"Health network",description:"Unlimited sites with SSO and audit logs.",price:"$420/mo"}],
  W = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  D = [{id:"length",label:"At least 10 characters",test:e=>e.length>=10},{id:"case",label:"Upper and lower case",test:e=>/[a-z]/.test(e)&&/[A-Z]/.test(e)},{id:"digit",label:"A number",test:e=>/[0-9]/.test(e)},{id:"symbol",label:"A symbol",test:e=>/[^A-Za-z0-9]/.test(e)}];

function H(){
  let[e,a]=useState(false),[r,n]=useState(""),[H,M]=useState(false),[R,U]=useState(""),[F,L]=useState(""),[T,q]=useState(false),[B,P]=useState(""),[O,I]=useState(false),[$,V]=useState(""),[Z,K]=useState(false),[Y,G]=useState("eu-west"),[J,Q]=useState("group"),[X,ee]=useState(false),{ref:ea,edges:er,onScroll:et}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:s,clientHeight:l}=a;
      r({start:t>1,end:Math.ceil(t+l)<s-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let s=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),es=r.trim().length>=2,el=H&&!es,en=0===R.length?{ok:false,message:"Choose a subdomain for the workspace."}:R.length<3?{ok:false,message:"Use at least 3 characters."}:/[A-Z]/.test(R)?{ok:false,message:"Use lowercase letters only."}:/[^a-z0-9-]/.test(R)?{ok:false,message:"Only lowercase letters, digits and hyphens are allowed."}:R.startsWith("-")||R.endsWith("-")?{ok:false,message:"Cannot start or end with a hyphen."}:C.includes(R)?{ok:false,message:"That subdomain is already taken."}:{ok:true,message:"Available"},ei=R.length>0&&!en.ok,eo=R.length>0&&en.ok,ed=W.test(F),ec=T&&!ed,eu=useMemo(()=>D.map(e=>({...e,passed:e.test(B)})), [B]),eh=eu.filter(e=>e.passed).length,eb=eh===D.length,ex=$.length>0&&$===B,ep=Z&&!ex,em=es&&eo&&ed&&eb&&ex&&X,e_=["bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]",_,_,"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100"];
  return (
    <div className={b("bg-white dark:bg-neutral-950",x,"flex h-full min-h-[720px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className="mx-auto w-full max-w-[760px]">
          <div className={S}>
            <div className={b("border-b border-neutral-900/8 dark:border-neutral-100/8","px-4 py-3")}>
              <h2 className={b(k,x)}>Provision a workspace</h2>
              <p className={b("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>Stand up a new tenant for your clinical scheduling account.</p>
            </div>
            {e?<div className="flex min-h-[520px] flex-col items-center justify-center px-6 py-12 text-center">
              <span className="mb-4 flex h-12 w-12 items-center justify-center">
                <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={1.8} aria-hidden="true" className={p} />
              </span>
              <h3 className={b(k,x)}>Workspace created</h3>
              <p className={b(f,p,"mt-1.5 max-w-sm")}>
                <span className={b("rounded-[var(--rb-r-xs,4px)] bg-neutral-900/5 px-1 py-px font-mono text-[0.9em] leading-none text-neutral-900 dark:text-neutral-100 [box-decoration-break:clone] dark:bg-neutral-100/5","tabular-nums")}>
                  {R}
                  .med-sched.app
                </span>
                {" "}
                {"is provisioning now. The admin invite is on its way to "}
                {F}
                .
              </p>
              <button type="button" onClick={()=>{
                n(""),M(false),U(""),L(""),q(false),P(""),I(false),V(""),K(false),G("eu-west"),Q("group"),ee(false),a(false)
              }} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-5")}>Provision another</button>
            </div>:<>
              <div className="relative min-h-0">
                <div ref={ea} onScroll={et} style={{touchAction:"pan-y"}} className="max-h-[460px] space-y-6 overflow-y-auto px-4 py-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm5-org" className={j}>
                      <span>
                        Organisation name
                        <span aria-hidden="true" className={m}>
                          {" "}
                          *
                        </span>
                      </span>
                    </label>
                    <div className={b(v,"h-8")}>
                      <input id="frm5-org" value={r} required onChange={e=>n(e.target.value)} onBlur={()=>M(true)} aria-invalid={el||undefined} aria-describedby={el?"frm5-org-error":"frm5-org-help"} placeholder="Riverside Family Health" className={g} />
                    </div>
                    {el?<p id="frm5-org-error" className={y}>
                      <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                      Enter the clinic or organisation name, at least 2 characters.
                    </p>:<p id="frm5-org-help" className={N}>Shown to staff on the sign-in screen.</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm5-subdomain" className={j}>
                      <span>
                        Workspace address
                        <span aria-hidden="true" className={m}>
                          {" "}
                          *
                        </span>
                      </span>
                    </label>
                    <div className={b(v,"h-8")}>
                      <input id="frm5-subdomain" value={R} required onChange={e=>U(e.target.value.toLowerCase().trim())} aria-invalid={ei||undefined} aria-describedby="frm5-subdomain-msg" placeholder="riverside" className={g} />
                      <span data-affix className={b(w,"tabular-nums")}>.med-sched.app</span>
                    </div>
                    {ei?<p id="frm5-subdomain-msg" className={y}>
                      <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                      {en.message}
                    </p>:eo?<p id="frm5-subdomain-msg" className={b(N,"flex items-start gap-2")}>
                      <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                      Available
                    </p>:<p id="frm5-subdomain-msg" className={N}>Lowercase letters, digits and hyphens.</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm5-email" className={j}>
                      <span>
                        Admin email
                        <span aria-hidden="true" className={m}>
                          {" "}
                          *
                        </span>
                      </span>
                    </label>
                    <div className={b(v,"h-8")}>
                      <input id="frm5-email" type="email" value={F} required onChange={e=>L(e.target.value)} onBlur={()=>q(true)} aria-invalid={ec||undefined} aria-describedby={ec?"frm5-email-error":"frm5-email-help"} placeholder="admin@riverside.health" className={g} />
                    </div>
                    {ec?<p id="frm5-email-error" className={y}>
                      <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                      Enter a valid email such as name@clinic.com.
                    </p>:<p id="frm5-email-help" className={N}>Becomes the first workspace administrator.</p>}
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="frm5-password" className={j}>
                          <span>
                            Password
                            <span aria-hidden="true" className={m}>
                              {" "}
                              *
                            </span>
                          </span>
                        </label>
                        <div className={b(v,"h-8")}>
                          <input id="frm5-password" type={O?"text":"password"} value={B} required onChange={e=>P(e.target.value)} aria-describedby="frm5-password-rules" placeholder="Create a password" className={g} />
                          <span data-affix className={w}>
                            <button type="button" onClick={()=>I(e=>!e)} title={O?"Hide password":"Show password"} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-6 rounded-[var(--rb-r-sm,6px)]")}>
                              <HugeiconsIcon icon={O?Icon_56987:Icon_2301} size={16} strokeWidth={1.8} aria-hidden="true" />
                              <span className="sr-only">{O?"Hide password":"Show password"}</span>
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="frm5-confirm" className={j}>
                          <span>
                            Confirm password
                            <span aria-hidden="true" className={m}>
                              {" "}
                              *
                            </span>
                          </span>
                        </label>
                        <div className={b(v,"h-8")}>
                          <input id="frm5-confirm" type={O?"text":"password"} value={$} required onChange={e=>V(e.target.value)} onBlur={()=>K(true)} aria-invalid={ep||undefined} aria-describedby={ep?"frm5-confirm-error":"frm5-confirm-help"} placeholder="Re-enter password" className={g} />
                        </div>
                        {ep?<p id="frm5-confirm-error" className={y}>
                          <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                          Passwords do not match yet.
                        </p>:<p id="frm5-confirm-help" className={N}>Type it once more to confirm.</p>}
                      </div>
                    </div>
                    <div id="frm5-password-rules" className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        {D.map((e,a)=><span key={a} className={b("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","flex-1")}>{a<eh&&<span className={b(e_[eh-1],"block h-full w-full")} />}</span>)}
                      </div>
                      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                        {eu.map(e=>(
                          <li key={e.id} className={b(f,"flex items-center gap-1.5")}>
                                                <span className={b(e.passed?x:m,"flex h-4 w-4 shrink-0 items-center justify-center")}>
                                                  <HugeiconsIcon icon={e.passed?Icon_90987:Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                                                </span>
                                                <span className={e.passed?p:m}>{e.label}</span>
                                              </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm5-region" className={j}>Data region</label>
                    <z id="frm5-region" value={Y} onChange={e=>G(e)} options={A} leading={<HugeiconsIcon icon={Icon_78805} size={16} strokeWidth={1.8} aria-hidden="true" className={b(m,"shrink-0")} />} />
                    <p className={N}>Patient data stays in the selected region.</p>
                  </div>
                  <fieldset className="space-y-2">
                    <legend className={j}>Plan</legend>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {E.map(e=>{
                        let a=J===e.value;
                        return (
                          <label key={e.value} className={b(S,"cursor-pointer")}>
                                                <div className={b(a?"bg-neutral-900/9 dark:bg-neutral-100/9":"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","flex-1 p-3")}>
                                                  <div className="flex items-center justify-between gap-2">
                                                    <span className={b("text-[14px]/[16px] font-[450]",x)}>{e.name}</span>
                                                    <input type="radio" name="frm5-plan" value={e.value} checked={a} onChange={()=>Q(e.value)} className="size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40" />
                                                  </div>
                                                  <p className={b(f,p,"mt-1")}>{e.description}</p>
                                                  <p className={b(f,x,"mt-2 tabular-nums")}>{e.price}</p>
                                                </div>
                                              </label>
                        );
                      })}
                    </div>
                  </fieldset>
                  <label className={b("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","flex cursor-pointer items-start gap-2 p-3")}>
                    <span className={b("relative inline-flex size-4 shrink-0 items-center justify-center","mt-px")}>
                      <input type="checkbox" checked={X} onChange={e=>ee(e.target.checked)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                      <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                    </span>
                    <span className={b(f,p)}>
                      I confirm this workspace will handle protected health information under our signed data agreement.
                    </span>
                  </label>
                </div>
                <div aria-hidden="true" className={b("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",er.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={b("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",er.end?"opacity-100":"opacity-0")} />
              </div>
              <div className={b("border-t border-neutral-900/8 dark:border-neutral-100/8","flex flex-col gap-2 px-4 py-3")}>
                <button type="button" disabled={!em} onClick={()=>a(true)} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]","w-full")}>Create workspace</button>
                <p className={b(f,m,"text-center")}>
                  {em?"Everything checks out. You are ready to provision.":"Complete every required field to continue."}
                </p>
              </div>
            </>}
          </div>
        </div>
      </div>
  );
}


export default H;
