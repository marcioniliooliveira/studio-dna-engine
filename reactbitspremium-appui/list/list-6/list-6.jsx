/**
 * React Bits Pro — Application UI (list-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_81515 = [["path",{d:"M5.062 13C3.83229 13.6824 3 14.994 3 16.5C3 18.7091 4.79086 20.5 7 20.5C9.20914 20.5 11 18.7091 11 16.5H17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 7.5L15.0571 13.0027C15.6323 12.6825 16.2949 12.5 17 12.5C19.2091 12.5 21 14.2909 21 16.5C21 18.7091 19.2091 20.5 17 20.5C16.0541 20.5 15.1848 20.1716 14.5 19.6227",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 8.5C12.5523 8.5 13 8.05228 13 7.5C13 6.94772 12.5523 6.5 12 6.5M12 8.5C11.4477 8.5 11 8.05228 11 7.5C11 6.94772 11.4477 6.5 12 6.5M12 8.5V6.5",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 17.5C7.55228 17.5 8 17.0523 8 16.5C8 15.9477 7.55228 15.5 7 15.5M7 17.5C6.44772 17.5 6 17.0523 6 16.5C6 15.9477 6.44772 15.5 7 15.5M7 17.5V15.5",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["path",{d:"M17 17.5C17.5523 17.5 18 17.0523 18 16.5C18 15.9477 17.5523 15.5 17 15.5M17 17.5C16.4477 17.5 16 17.0523 16 16.5C16 15.9477 16.4477 15.5 17 15.5M17 17.5V15.5",stroke:"currentColor",strokeWidth:"1.5",key:"4"}],["path",{d:"M16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.004 8.83007 10.3141 10.0571 10.9973L7 16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[13px]/[18px] font-normal",
  b = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  m = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  f = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  k = "rounded-[var(--rb-r-sm,6px)]",
  v = [{id:"msg_2Rk9",event:"invoice.finalized",host:"hooks.northwind.io",attempt:1,status:"200 OK",code:200,duration:"142 ms",outcome:"delivered",request:`POST /v2/events HTTP/1.1
Host: hooks.northwind.io
Content-Type: application/json
Webhook-Id: msg_2Rk9
Webhook-Signature: v1,4f2a8c…9de1`,response:`{
  "received": true,
  "event_id": "evt_1P8kQz",
  "queued_at": "2026-08-07T20:14:11Z"
}`},{id:"msg_2Rk8",event:"customer.subscription.updated",host:"api.brightledger.com",attempt:1,status:"202 Accepted",code:202,duration:"318 ms",outcome:"delivered",request:`POST /webhooks/billing HTTP/1.1
Host: api.brightledger.com
Content-Type: application/json
Webhook-Id: msg_2Rk8
Webhook-Signature: v1,7b1e0a…c42f`,response:`{
  "received": true,
  "handler": "billing.sync",
  "duration_ms": 311
}`},{id:"msg_2Rk7",event:"payout.paid",host:"hooks.meridian.app",attempt:3,status:"500 Server Error",code:500,duration:"1.24 s",outcome:"failed",request:`POST /hooks/payouts HTTP/1.1
Host: hooks.meridian.app
Content-Type: application/json
Webhook-Id: msg_2Rk7
Webhook-Signature: v1,d90c31…1aa7`,response:`{
  "error": {
    "type": "endpoint_error",
    "message": "Internal server error",
    "status": 500
  }
}`},{id:"msg_2Rk6",event:"charge.refunded",host:"hooks.northwind.io",attempt:1,status:"200 OK",code:200,duration:"96 ms",outcome:"delivered",request:`POST /v2/events HTTP/1.1
Host: hooks.northwind.io
Content-Type: application/json
Webhook-Id: msg_2Rk6
Webhook-Signature: v1,52ff7c…8b03`,response:`{
  "received": true,
  "event_id": "evt_1P8jTa"
}`},{id:"msg_2Rk5",event:"customer.created",host:"ingest.parcelworks.dev",attempt:1,status:"201 Created",code:201,duration:"204 ms",outcome:"delivered",request:`POST /ingest HTTP/1.1
Host: ingest.parcelworks.dev
Content-Type: application/json
Webhook-Id: msg_2Rk5
Webhook-Signature: v1,ab3419…67cd`,response:`{
  "received": true,
  "record_id": "cus_9Qh2Lm",
  "created": true
}`},{id:"msg_2Rk4",event:"invoice.payment_failed",host:"api.brightledger.com",attempt:2,status:"204 No Content",code:204,duration:"173 ms",outcome:"delivered",request:`POST /webhooks/billing HTTP/1.1
Host: api.brightledger.com
Content-Type: application/json
Webhook-Id: msg_2Rk4
Webhook-Signature: v1,10ce88…44b2`,response:`{
  "received": true,
  "handler": "billing.dunning"
}`},{id:"msg_2Rk3",event:"checkout.session.completed",host:"hooks.meridian.app",attempt:5,status:"Timed out",code:null,duration:"30.00 s",outcome:"failed",request:`POST /hooks/checkout HTTP/1.1
Host: hooks.meridian.app
Content-Type: application/json
Webhook-Id: msg_2Rk3
Webhook-Signature: v1,c7e204…39f0`,response:`{
  "error": {
    "type": "timeout",
    "message": "No response after 30000 ms",
    "attempts": 5
  }
}`},{id:"msg_2Rk2",event:"account.updated",host:"ingest.parcelworks.dev",attempt:1,status:"200 OK",code:200,duration:"128 ms",outcome:"delivered",request:`POST /ingest HTTP/1.1
Host: ingest.parcelworks.dev
Content-Type: application/json
Webhook-Id: msg_2Rk2
Webhook-Signature: v1,90ab12…7e5c`,response:`{
  "received": true,
  "record_id": "acct_4Tz8Wp"
}`}],
  g = [{id:"all",label:"All"},{id:"delivered",label:"Delivered"},{id:"failed",label:"Failed"}],
  w = [{value:"all",label:"All endpoints"},...v.reduce((e,t)=>(e.includes(t.host)||e.push(t.host),e),[]).map(e=>({value:e,label:e}))],
  _ = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function y({value:e,onChange:t,options:r,ariaLabel:o}){
  let d=useId(),[c,x]=useState(false),[p,h]=useState(0),[b,m]=useState(false),[f,k]=useState(),v=useRef(null),g=useRef(null),w=useRef({buffer:"",at:0}),_=r.findIndex(t=>t.value===e),y=_>=0?r[_]:undefined,j=()=>{
    let e=v.current,t=e?.ownerDocument.defaultView;
    if(e&&t){
      let a=e.getBoundingClientRect(),n=0,i=t.innerHeight;
      for(let r=e.parentElement;r;r=r.parentElement)if(/auto|scroll|hidden|clip/.test(t.getComputedStyle(r).overflowY)){
        let e=r.getBoundingClientRect();
        n=Math.max(n,e.top),i=Math.min(i,e.bottom);
        break
      }
      let l=i-a.bottom,s=a.top-n,o=Math.min(32*r.length+8,264),d=l<o+8&&s>l,c=(d?s:l)-8;
      m(d),k(c<o?Math.max(c,40):undefined)
    }
    h(_>=0?_:0),x(true)
  };
  useEffect(()=>{
    if(!c)return;
    let e=v.current,t=e?.ownerDocument;
    if(!e||!t)return;
    let r=t=>{
      e.contains(t.target)||x(false)
    };
    return t.addEventListener("mousedown",r),t.addEventListener("touchstart",r),()=>{
      t.removeEventListener("mousedown",r),t.removeEventListener("touchstart",r)
    };
  }, [c]),useEffect(()=>{
    if(!c)return;
    let e=g.current,t=e?.querySelector(`[data-index="${p}"]`);
    if(!e||!t)return;
    let r=t.offsetTop,a=r+t.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:a>e.scrollTop+e.clientHeight&&(e.scrollTop=a-e.clientHeight)
  }, [c,p]);
  let N=e=>{
    let a=r[e];
    a&&(t(a.value),x(false),v.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={v} className="relative">
        <button type="button" role="combobox" aria-expanded={c} aria-controls={d} aria-haspopup="listbox" aria-label={o} onClick={()=>c?x(false):j()} onKeyDown={e=>{
          if(!c){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),j());
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),x(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),h(e=>Math.min(e+1,r.length-1));else if("ArrowUp"===e.key)e.preventDefault(),h(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),h(0);else if("End"===e.key)e.preventDefault(),h(r.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),N(p);else if(1===e.key.length&&/\S/.test(e.key)){
            let t=Date.now(),a=w.current;
            a.buffer=t-a.at>700?e.key:a.buffer+e.key,a.at=t;
            let n=r.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
            n>=0&&h(n)
          }
        }} className="inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40">
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {r.map(e=><span key={e.value} aria-hidden="true" className="invisible truncate">{e.label}</span>)}
            <span className="truncate">{y?.label}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {c&&<ul ref={g} id={d} role="listbox" tabIndex={-1} style={{maxHeight:f}} className={u("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",b?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {r.map((t,r)=>(
            <li key={t.value} role="option" aria-selected={t.value===e} data-index={r} data-highlighted={r===p?"":undefined} onMouseEnter={()=>h(r)} onClick={()=>N(r)} className={u("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                    <span className="truncate">{t.label}</span>
                    {t.value===e&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                  </li>
          ))}
        </ul>}
      </div>
  );
}

function j({label:e,body:t}){
  let{ref:r,edges:i,onScroll:l}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollLeft:a,scrollWidth:n,clientWidth:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }();
  return (
    <div>
        <p className={u("text-[12px]/[16px] font-normal tabular-nums",p,"mb-1")}>{e}</p>
        <div className={u(k,"relative overflow-hidden")}>
          <pre ref={r} onScroll={l} style={{touchAction:"pan-x"}} className={u("overflow-auto bg-neutral-900/5 py-3 font-mono text-[13px]/[20px] tabular-nums text-neutral-900 dark:text-neutral-100 [scrollbar-width:thin] dark:bg-neutral-100/5","whitespace-pre px-3")}>{t}</pre>
          <div aria-hidden="true" className={u("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 left-0 w-8",i.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={u("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 right-0 w-8",i.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}

function N(){
  let[e,t]=useState("all"),[r,l]=useState("all"),[s,N]=useState(null),A=v.filter(t=>("all"===e||t.outcome===e)&&("all"===r||t.host===r)),z=(e,r)=>{
    if(t(e),l(r),s){
      let t=v.find(e=>e.id===s);
      t&&("all"===e||t.outcome===e)&&("all"===r||t.host===r)||N(null)
    }
  };
  return (
    <div className={u("bg-white dark:bg-neutral-950",x,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className="mx-auto w-full max-w-[720px] shrink-0">
          <header className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
            <div className="min-w-0">
              <h2 className={u("text-[20px]/[24px] font-[450] tracking-[-0.015em]",x)}>Webhook deliveries</h2>
              <p className={u(h,p,"mt-0.5 truncate")}>Outbound attempts to your customer endpoints</p>
            </div>
            <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2">
              <y value={r} onChange={t=>z(e,t)} options={w} ariaLabel="Filter by destination endpoint" />
              <div role="radiogroup" aria-label="Filter by delivery outcome" onKeyDown={_} className={u("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
                {g.map(t=>{
                  let n=e===t.id;
                  return <button key={t.id} type="button" role="radio" aria-checked={n} tabIndex={n?0:-1} onClick={()=>z(t.id,r)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{t.label}</button>;
                })}
              </div>
            </div>
          </header>
          {0===A.length?<div className={u(f,"shrink-0 items-center px-6 py-16 text-center")}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center">
              <HugeiconsIcon icon={Icon_81515} size={20} strokeWidth={1.8} aria-hidden="true" className="text-neutral-900/80 dark:text-neutral-100/80" />
            </div>
            <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No deliveries to show</p>
            <p className={u("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>
              No attempts match this outcome and endpoint. Reset the filters to see every delivery.
            </p>
            <button type="button" onClick={()=>z("all","all")} className={u(b,m,"mt-4")}>Show all deliveries</button>
          </div>:<ul className={u(f,"divide-y divide-neutral-900/8 dark:divide-neutral-100/8","shrink-0 p-2")}>
            {A.map(e=>{
              let t=s===e.id,r="failed"===e.outcome;
              return (
                <li key={e.id} className="overflow-hidden">
                            <button type="button" aria-expanded={t} aria-controls={`delivery-${e.id}`} onClick={()=>N(t?null:e.id)} className={u("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",k,"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","group h-[56px] px-2")}>
                              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <span className={u("font-mono text-[12px]/[16px] tabular-nums",x,"block truncate")}>{e.event}</span>
                                <span data-description className={u(h,p,"block truncate")}>
                                  <span>{e.host}</span>
                                  <span className="ms-3">
                                    {"attempt "}
                                    {e.attempt}
                                  </span>
                                </span>
                              </span>
                              <span className="shrink-0 text-right">
                                <span className={u("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",r?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":"text-neutral-900/80 dark:text-neutral-100/80")}>{e.status}</span>
                                <span className={u("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","mt-0.5 block")}>{e.duration}</span>
                              </span>
                              <span className="flex size-4 shrink-0 items-center justify-center">
                                <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                              </span>
                            </button>
                            <div id={`delivery-${e.id}`} className="grid" style={{gridTemplateRows:t?"1fr":"0fr"}}>
                              <div hidden={!t} className="overflow-hidden">
                                <div className="space-y-3 px-2 pt-1 pb-3">
                                  <j label="Request" body={e.request} />
                                  <j label="Response" body={e.response} />
                                  <div className="flex justify-end">
                                    <button type="button" className={u(b,m)}>
                                      <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" className={p} />
                                      Replay delivery
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
              );
            })}
          </ul>}
        </div>
      </div>
  );
}


export default N;
