/**
 * React Bits Pro — Application UI (filtering-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { label, useCallback, useEffect, useId, useMemo, useRef, useState, value } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90089 = [["path",{d:"M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  h = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  p = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  v = "flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1",
  m = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  g = "inline-flex h-7 cursor-pointer items-center rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80 decoration-1 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100",
  f = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900",
  _ = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900",
  k = u("text-[13px]/[18px] font-normal",b),
  w = u("text-[12px]/[16px] font-normal tabular-nums",b);

function y({id:e,value:r,onChange:a,options:o,disabled:d,placeholder:c="Select…",className:b,triggerClassName:x,leading:h,ariaLabel:p}){
  let v=useId(),[m,g]=useState(false),[f,_]=useState(0),[k,y]=useState(false),[j,N]=useState(),A=useRef(null),C=useRef(null),S=useRef({buffer:"",at:0}),E=o.findIndex(e=>e.value===r),z=E>=0?o[E]:undefined,L=e=>{
    if(d)return;
    let r=A.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,s=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),s=Math.min(s,r.bottom);
        break
      }
      let l=s-e.bottom,n=e.top-t,i=Math.min(32*o.length+8,264),d=l<i+8&&n>l,c=(d?n:l)-8;
      y(d),N(c<i?Math.max(c,40):undefined)
    }
    _(e??(E>=0?E:0)),g(true)
  };
  useEffect(()=>{
    if(!m)return;
    let e=A.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||g(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [m]),useEffect(()=>{
    if(!m)return;
    let e=C.current,r=e?.querySelector(`[data-index="${f}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [m,f]);
  let q=e=>{
    let r=o[e];
    r&&(a(r.value),g(false),A.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={A} className={u("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={m} aria-controls={v} aria-haspopup="listbox" disabled={d} onClick={()=>m?g(false):L()} onKeyDown={e=>{
          if(!d){
            if(!m){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),L());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),g(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),_(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),_(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),_(0);else if("End"===e.key)e.preventDefault(),_(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),q(f);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=S.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=o.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&_(t)
            }
          }
        }} aria-label={p} className={u("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",x)}>
          <span className="flex min-w-0 items-center gap-2">
            {h}
            <span className={u("truncate",!z&&"text-neutral-900/66 dark:text-neutral-100/66")}>{z?z.label:c}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {m&&<ul ref={C} id={v} role="listbox" tabIndex={-1} style={{maxHeight:j}} className={u("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",k?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,a)=>{
            let s=e.value===r;
            return (
              <li key={e.value} role="option" aria-selected={s} data-index={a} data-highlighted={a===f||undefined} onMouseEnter={()=>_(a)} onClick={()=>q(a)} className={u("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={u(w,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {s&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function j(e=true){
  let r=useRef(null),[a,t]=useState({start:false,end:false}),l=useCallback(()=>{
    let e=r.current;
    if(!e)return;
    let{scrollTop:a,scrollHeight:s,clientHeight:l}=e;
    t({start:a>1,end:Math.ceil(a+l)<s-1})
  }, []);
  return useEffect(()=>{
    l();
    let e=r.current,a=e?.ownerDocument.defaultView;
    if(!e||!a?.ResizeObserver)return;
    let t=new a.ResizeObserver(l);
    return t.observe(e),()=>t.disconnect();
  }, [l,e]),{ref:r,edges:a,onScroll:l};
}

let N = [{value:"debug",label:"Debug",tone:b},{value:"info",label:"Info",tone:"text-neutral-900/80 dark:text-neutral-100/80"},{value:"warn",label:"Warn",tone:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]"},{value:"error",label:"Error",tone:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"}],
  A = Object.fromEntries(N.map(e=>[e.value,e])),
  C = [{value:"api-gateway",label:"api-gateway"},{value:"auth-service",label:"auth-service"},{value:"payments",label:"payments"},{value:"checkout",label:"checkout"},{value:"search-indexer",label:"search-indexer"},{value:"notifications",label:"notifications"},{value:"scheduler",label:"scheduler"},{value:"cdn-edge",label:"cdn-edge"}],
  S = [{value:"15",label:"Last 15 minutes"},{value:"60",label:"Last hour"},{value:"240",label:"Last 4 hours"},{value:"1440",label:"Last 24 hours"}],
  E = [{id:"l01",minutesAgo:1,sec:8,level:"error",service:"payments",message:"Charge declined: gateway returned 402 for intent pi_3Qa"},{id:"l02",minutesAgo:2,sec:41,level:"info",service:"checkout",message:"Order osq_8841 moved to state confirmed"},{id:"l03",minutesAgo:3,sec:12,level:"warn",service:"api-gateway",message:"Upstream latency 1420ms exceeded p95 budget of 800ms"},{id:"l04",minutesAgo:4,sec:55,level:"info",service:"auth-service",message:"Issued access token for user 44182, scope read:profile"},{id:"l05",minutesAgo:5,sec:3,level:"debug",service:"search-indexer",message:"Flushed 512 documents to shard idx-03 in 84ms"},{id:"l06",minutesAgo:6,sec:27,level:"info",service:"notifications",message:"Delivered email receipt to queue, template order_paid"},{id:"l07",minutesAgo:8,sec:19,level:"warn",service:"auth-service",message:"Rate limit reached for client mobile-ios, throttling 30s"},{id:"l08",minutesAgo:9,sec:46,level:"info",service:"api-gateway",message:"Routed GET /v2/catalog to region eu-west-1"},{id:"l09",minutesAgo:11,sec:2,level:"debug",service:"scheduler",message:"Tick 90210 processed 3 due jobs, next run in 60s"},{id:"l10",minutesAgo:12,sec:33,level:"error",service:"search-indexer",message:"Reindex job failed: connection reset by shard idx-07"},{id:"l11",minutesAgo:14,sec:9,level:"info",service:"payments",message:"Refund rf_2210 settled for order osq_8109"},{id:"l12",minutesAgo:16,sec:51,level:"info",service:"cdn-edge",message:"Cache hit ratio 0.94 for asset bundle app.4c2.js"},{id:"l13",minutesAgo:18,sec:24,level:"debug",service:"checkout",message:"Validated cart snapshot with 4 line items, subtotal 128.40"},{id:"l14",minutesAgo:21,sec:7,level:"warn",service:"payments",message:"Retrying webhook delivery to merchant m_5521, attempt 2 of 5"},{id:"l15",minutesAgo:23,sec:38,level:"info",service:"notifications",message:"Push token refreshed for device 8f21ac, platform android"},{id:"l16",minutesAgo:26,sec:14,level:"info",service:"api-gateway",message:"Handled 1284 requests in window, error rate 0.3%"},{id:"l17",minutesAgo:29,sec:59,level:"debug",service:"auth-service",message:"Rotated signing key kid-19, previous kept for 24h grace"},{id:"l18",minutesAgo:33,sec:5,level:"error",service:"checkout",message:"Inventory oversold for sku TS-114, reserved 3 over stock"},{id:"l19",minutesAgo:37,sec:42,level:"info",service:"scheduler",message:"Enqueued nightly digest job for 12840 subscribers"},{id:"l20",minutesAgo:41,sec:18,level:"warn",service:"cdn-edge",message:"Origin fetch slow: 2100ms for region ap-south-1"},{id:"l21",minutesAgo:45,sec:30,level:"info",service:"payments",message:"Captured payment pi_3Qb for amount 64.00 USD"},{id:"l22",minutesAgo:49,sec:11,level:"debug",service:"search-indexer",message:"Merged segments on idx-01, freed 240MB of heap"},{id:"l23",minutesAgo:54,sec:47,level:"info",service:"auth-service",message:"Password reset link generated for user 20915"},{id:"l24",minutesAgo:58,sec:22,level:"warn",service:"api-gateway",message:"Circuit half-open for upstream catalog after 3 failures"},{id:"l25",minutesAgo:64,sec:6,level:"info",service:"notifications",message:"SMS provider switched to fallback carrier for +44 numbers"},{id:"l26",minutesAgo:71,sec:39,level:"error",service:"auth-service",message:"Token verification failed: signature mismatch on kid-17"},{id:"l27",minutesAgo:78,sec:15,level:"info",service:"checkout",message:"Coupon SPRING20 applied to order osq_7742"},{id:"l28",minutesAgo:85,sec:52,level:"debug",service:"scheduler",message:"Skipped job cleanup-tmp, already ran this hour"},{id:"l29",minutesAgo:92,sec:28,level:"info",service:"cdn-edge",message:"Purged 812 objects for tag release-2024-06"},{id:"l30",minutesAgo:100,sec:4,level:"warn",service:"payments",message:"Fraud score 0.72 above threshold for order osq_7610"},{id:"l31",minutesAgo:108,sec:44,level:"info",service:"api-gateway",message:"TLS handshake renegotiated for client edge-pool-2"},{id:"l32",minutesAgo:117,sec:20,level:"debug",service:"search-indexer",message:"Warm query cache primed with 1280 top terms"},{id:"l33",minutesAgo:126,sec:57,level:"info",service:"notifications",message:"Batched 340 in-app notices for digest window"},{id:"l34",minutesAgo:135,sec:33,level:"error",service:"cdn-edge",message:"Edge node ap-1 unreachable, draining traffic to ap-2"},{id:"l35",minutesAgo:146,sec:9,level:"info",service:"checkout",message:"Guest session upgraded to account for user 45120"},{id:"l36",minutesAgo:158,sec:48,level:"warn",service:"scheduler",message:"Job queue depth 1420 growing, workers scaled to 12"},{id:"l37",minutesAgo:170,sec:25,level:"info",service:"payments",message:"Payout batch pb_0912 initiated for 84 merchants"},{id:"l38",minutesAgo:183,sec:1,level:"debug",service:"auth-service",message:"Session store evicted 90 idle entries older than 30m"},{id:"l39",minutesAgo:197,sec:36,level:"info",service:"api-gateway",message:"Config reloaded, 6 routes updated without downtime"},{id:"l40",minutesAgo:210,sec:13,level:"warn",service:"search-indexer",message:"Query timeout on idx-05, returned partial results to caller"},{id:"l41",minutesAgo:224,sec:50,level:"info",service:"notifications",message:"Webhook subscriber wh_44 re-subscribed to order events"},{id:"l42",minutesAgo:236,sec:17,level:"info",service:"cdn-edge",message:"Compression enabled for text assets on region us-east-1"}],
  z = e=>String(e).padStart(2,"0"),
  L = {levels:[],services:[],range:"240",query:""},
  q = (e,r,a)=>!("levels"!==a&&r.levels.length&&!r.levels.includes(e.level)||"services"!==a&&r.services.length&&!r.services.includes(e.service)||"range"!==a&&e.minutesAgo>Number(r.range)||"query"!==a&&r.query.trim()&&!e.message.toLowerCase().includes(r.query.trim().toLowerCase()));

function M({selected:e,counts:r,onToggle:a,onClear:n}){
  let[c,b]=useState(false),[m,w]=useState(""),y=useRef(null),{ref:N,edges:A,onScroll:S}=j(c);
  useEffect(()=>{
    if(!c)return;
    let e=y.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||b(false)
    },t=e=>{
      "Escape"===e.key&&b(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),r.addEventListener("keydown",t),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a),r.removeEventListener("keydown",t)
    };
  }, [c]);
  let E=C.filter(e=>e.label.toLowerCase().includes(m.trim().toLowerCase()));
  return (
    <div ref={y} className="relative">
        <button type="button" aria-expanded={c} aria-haspopup="dialog" onClick={()=>b(e=>!e)} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",x)}>
          <HugeiconsIcon icon={Icon_90089} size={16} strokeWidth={1.8} aria-hidden="true" />
          Services
          {e.length>0&&<span className={u("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>{e.length}</span>}
        </button>
        {c&&<div role="dialog" aria-label="Filter by service" className={u("flex max-h-80 w-72 max-w-[calc(100vw-2rem)] flex-col gap-3 overflow-y-auto rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-4 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute left-0 top-full z-30 mt-1.5 w-[264px] max-h-[none]")}>
          <div className={u(h,"h-8")}>
            <span data-affix className={v}>
              <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <input value={m} onChange={e=>w(e.target.value)} placeholder="Search services…" aria-label="Search services" className={p} />
          </div>
          <div className="relative -mx-2">
            <ul ref={N} onScroll={S} className="max-h-[220px] space-y-0.5 overflow-y-auto">
              {E.map(s=>{
                let n=e.includes(value),o=r[value]??0;
                return (
                  <li key={value}>
                                <label className={u("flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",0===o&&!n&&"opacity-40")}>
                                  <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                                    <input type="checkbox" checked={n} onChange={()=>a(value)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                                    <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                                  </span>
                                  <span className={u("font-mono text-[12px]/[16px] tabular-nums","min-w-0 flex-1 truncate")}>{label}</span>
                                  <span className={u("ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","shrink-0")}>{o}</span>
                                </label>
                              </li>
                );
              })}
              {0===E.length&&<li className={u(k,"px-2 py-6 text-center")}>
                No services match “
                {m}
                ”
              </li>}
            </ul>
            <div aria-hidden="true" className={u(f,"pointer-events-none absolute inset-x-0 top-0 h-8",A.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={u(_,"pointer-events-none absolute inset-x-0 bottom-0 h-8",A.end?"opacity-100":"opacity-0")} />
          </div>
          {e.length>0&&<div className={u("border-t border-neutral-900/8 dark:border-neutral-100/8","flex justify-end pt-1.5")}><button type="button" onClick={n} className={g}>Clear services</button></div>}
        </div>}
      </div>
  );
}

function D(){
  let[e,r]=useState(L),{ref:a,edges:n,onScroll:i}=j(),o=useMemo(()=>E.filter(r=>q(r,e)).sort((e,r)=>e.minutesAgo-r.minutesAgo), [e]),D=useMemo(()=>{
    let r={};
    for(let a of C)r[a.value]=E.filter(r=>q(r,e,"services")&&r.service===a.value).length;
    return r;
  }, [e]),R=useMemo(()=>{
    let r=Number(e.range),a=Array(30).fill(0);
    for(let e of o){
      let t=Math.min(29,Math.max(0,Math.floor((1-e.minutesAgo/r)*29)));
      a[t]+=1
    }
    return a;
  }, [o,e.range]),T=Math.max(1,...R),W=e.levels.length+e.services.length+ +!!e.query.trim(),I=S.find(r=>r.value===e.range)?.label??"range";
  return (
    <div className={u("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[920px] w-full flex-col overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col">
          <header className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Log explorer</h2>
              <p className={u(k,"mt-1")}>
                <span className="tabular-nums">{o.length}</span>
                {" events over"}
                {" "}
                {I.toLowerCase()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <M selected={e.services} counts={D} onToggle={e=>r(r=>({...r,services:r.services.includes(e)?r.services.filter(r=>r!==e):[...r.services,e]}))} onClear={()=>r(e=>({...e,services:[]}))} />
              <y value={e.range} onChange={e=>r(r=>({...r,range:e}))} options={S} ariaLabel="Time range" className="w-[168px]" />
            </div>
          </header>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <div role="group" aria-label="Severity" className="flex flex-wrap items-center gap-1.5">
              {N.map(a=>{
                let s,l=e.levels.includes(a.value),n=(s=a.value,E.filter(r=>q(r,e,"levels")&&r.level===s).length);
                return (
                  <button key={a.value} type="button" aria-pressed={l} onClick={()=>{
                                let e;
                                return e=a.value,r(r=>({...r,levels:r.levels.includes(e)?r.levels.filter(r=>r!==e):[...r.levels,e]}));
                              }} className={u("relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40",0===n&&!l&&"opacity-40")}>
                                {a.label}
                                <span className="ms-0.5 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{n}</span>
                              </button>
                );
              })}
            </div>
            <div className="relative ml-auto w-full sm:w-[280px]">
              <div className={u(h,"h-8")}>
                <span data-affix className={v}>
                  <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <input value={e.query} onChange={e=>r(r=>({...r,query:e.target.value}))} placeholder="Filter messages…" aria-label="Filter messages" className={p} />
                {e.query&&<span data-affix className={v}>
                  <button type="button" aria-label="Clear message filter" onClick={()=>r(e=>({...e,query:""}))} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-6 rounded-[var(--rb-r-sm,6px)]")}>
                    <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </span>}
              </div>
            </div>
          </div>
          <section aria-label="Matched volume" className={u(m,"mt-4 p-4")}>
            <div className="mb-2.5 flex items-center justify-between">
              <span className={u(w,"flex flex-wrap gap-x-3")}>
                <span>Volume</span>
                <span>{I.toLowerCase()}</span>
              </span>
              <span className={w}>
                {"peak "}
                {T}
                /bucket
              </span>
            </div>
            <div className="flex h-14 items-end gap-[3px]">
              {R.map((e,r)=>e>0?<div key={r} className={u("text-neutral-900 dark:text-neutral-100","flex-1 rounded-[2px] bg-current")} style={{height:`${Math.max(3,e/T*100)}%`}} />:<div key={r} className={u("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","flex-1 rounded-[2px]")} style={{height:"3%"}} />)}
            </div>
            <div className={u(w,"mt-2 flex items-center justify-between")}>
              <span>oldest</span>
              <span>now</span>
            </div>
          </section>
          <div className="mt-4 flex min-h-0 flex-1 flex-col">
            {0===o.length?<div className={u(m,"flex-1 items-center justify-center px-6 py-16 text-center")}>
              <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No log lines match these filters</p>
              <p className={u("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-[300px]")}>
                Widen the time range, clear a severity, or loosen the message query to see more events.
              </p>
              <button type="button" onClick={()=>r(L)} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",x,"mt-5")}>Reset filters</button>
            </div>:<div className={u(m,"min-h-0 flex-1")}>
              <div ref={a} onScroll={i} className="h-full overflow-y-auto">
                <ul className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
                  {o.map(e=>{
                    var r,a;
                    let s,l=A[e.level];
                    return (
                      <li key={e.id} className={u("flex min-w-full items-start gap-3 px-4 font-mono text-[13px]/[20px] tabular-nums","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","error"===e.level?"bg-[oklch(94.5%_0.027_26/0.4)] hover:bg-[oklch(94.5%_0.027_26/0.6)] dark:bg-[oklch(29%_0.06_26/0.4)] dark:hover:bg-[oklch(29%_0.06_26/0.6)]":"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","py-2.5")}>
                                        <span className={u(b,"shrink-0")}>{r=e.minutesAgo,a=e.sec,s=872-r,`${z(Math.floor(s/60))}:${z(s%60)}:${z(a)}`}</span>
                                        <span className={u("inline-flex w-[5ch] shrink-0","w-[52px]")}><span className={l.tone}>{e.level}</span></span>
                                        <span className={u(b,"hidden w-[124px] shrink-0 truncate sm:block")}>{e.service}</span>
                                        <span className="min-w-0 flex-1">{e.message}</span>
                                      </li>
                    );
                  })}
                </ul>
              </div>
              <div aria-hidden="true" className={u(f,"pointer-events-none absolute inset-x-0 top-0 h-8",n.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={u(_,"pointer-events-none absolute inset-x-0 bottom-0 h-8",n.end?"opacity-100":"opacity-0")} />
            </div>}
            <div className={u(k,"mt-3 flex min-h-7 items-center justify-between")}>
              <span>
                {W>0?<>
                  <span className="tabular-nums">{W}</span>
                  {" active filter"}
                  {1===W?"":"s"}
                </>:"No filters applied"}
              </span>
              {W>0&&<button type="button" onClick={()=>r(L)} className={g}>Clear all</button>}
            </div>
          </div>
        </div>
      </div>
  );
}


export default D;
