/**
 * React Bits Pro — Application UI (list-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_97872 = [["path",{d:"M21 7V12M3 7C3 10.0645 3 16.7742 3 17.1613C3 18.5438 4.94564 19.3657 8.83693 21.0095C10.4002 21.6698 11.1818 22 12 22L12 11.3548",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 19C15 19 15.875 19 16.75 21C16.75 21 19.5294 16 22 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8.32592 9.69138L5.40472 8.27785C3.80157 7.5021 3 7.11423 3 6.5C3 5.88577 3.80157 5.4979 5.40472 4.72215L8.32592 3.30862C10.1288 2.43621 11.0303 2 12 2C12.9697 2 13.8712 2.4362 15.6741 3.30862L18.5953 4.72215C20.1984 5.4979 21 5.88577 21 6.5C21 7.11423 20.1984 7.5021 18.5953 8.27785L15.6741 9.69138C13.8712 10.5638 12.9697 11 12 11C11.0303 11 10.1288 10.5638 8.32592 9.69138Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L8 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M17 4L7 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_59309 = [["path",{d:"M2.01733 15C4.2169 15 6.00001 16.7831 6.00001 18.9827",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 18.9827V18.8908C18 16.742 19.742 15 21.8908 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.00001 5.01733C6.00001 7.2169 4.2169 9.00001 2.01733 9.00001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 5.01733C18 7.19765 19.769 8.96876 21.9423 8.9996",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 5H8C5.17157 5 3.75736 5 2.87868 5.87868C2 6.75736 2 8.17157 2 11V13C2 15.8284 2 17.2426 2.87868 18.1213C3.75736 19 5.17157 19 8 19H16C18.8284 19 20.2426 19 21.1213 18.1213C22 17.2426 22 15.8284 22 13V11C22 8.17157 22 6.75736 21.1213 5.87868C20.2426 5 18.8284 5 16 5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_3810 = [["path",{d:"M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.79275 3 5.97733 4.67765 4.38341 7.20327M3.29339 3.00076L3.46556 5.05452C3.58958 6.53384 3.65159 7.27349 4.13359 7.68914C4.61559 8.10479 5.32673 8.03185 6.74899 7.88595L8.79339 7.67625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62955 = [["path",{d:"M3 8H15C18.3137 8 21 10.6863 21 14C21 17.3137 18.3137 20 15 20H11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 4L5.8462 4.87652C3.94873 6.31801 3 7.03875 3 8C3 8.96125 3.94873 9.68199 5.8462 11.1235L7 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_81515 = [["path",{d:"M5.062 13C3.83229 13.6824 3 14.994 3 16.5C3 18.7091 4.79086 20.5 7 20.5C9.20914 20.5 11 18.7091 11 16.5H17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 7.5L15.0571 13.0027C15.6323 12.6825 16.2949 12.5 17 12.5C19.2091 12.5 21 14.2909 21 16.5C21 18.7091 19.2091 20.5 17 20.5C16.0541 20.5 15.1848 20.1716 14.5 19.6227",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 8.5C12.5523 8.5 13 8.05228 13 7.5C13 6.94772 12.5523 6.5 12 6.5M12 8.5C11.4477 8.5 11 8.05228 11 7.5C11 6.94772 11.4477 6.5 12 6.5M12 8.5V6.5",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 17.5C7.55228 17.5 8 17.0523 8 16.5C8 15.9477 7.55228 15.5 7 15.5M7 17.5C6.44772 17.5 6 17.0523 6 16.5C6 15.9477 6.44772 15.5 7 15.5M7 17.5V15.5",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["path",{d:"M17 17.5C17.5523 17.5 18 17.0523 18 16.5C18 15.9477 17.5523 15.5 17 15.5M17 17.5C16.4477 17.5 16 17.0523 16 16.5C16 15.9477 16.4477 15.5 17 15.5M17 17.5V15.5",stroke:"currentColor",strokeWidth:"1.5",key:"4"}],["path",{d:"M16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.004 8.83007 10.3141 10.0571 10.9973L7 16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let x = (...e)=>e.filter(Boolean).join(" ");

let b = "text-neutral-900 dark:text-neutral-100";

let p = "text-[14px]/[20px] font-medium";

let h = [{id:"7d",label:"7 days"},{id:"28d",label:"28 days"},{id:"qtd",label:"Quarter"}];

let m = [{id:"fulfilled",label:"Orders fulfilled",icon:Icon_97872,caption:"Picked, packed and handed to a carrier",by:{"7d":{value:"1,284",delta:6.4},"28d":{value:"5,109",delta:11.2},qtd:{value:"14,730",delta:18.9}}},{id:"net",label:"Net revenue",icon:Icon_59309,caption:"Gross receipts less discounts and refunds",by:{"7d":{value:"$92.4k",delta:3.1},"28d":{value:"$374.8k",delta:7.8},qtd:{value:"$1.09M",delta:12.4}}},{id:"basket",label:"Average basket",icon:Icon_3810,caption:"Net revenue divided by fulfilled orders",by:{"7d":{value:"$71.96",delta:-2.9},"28d":{value:"$73.36",delta:-1.4},qtd:{value:"$74.02",delta:.6}}},{id:"returns",label:"Return rate",icon:Icon_62955,caption:"Units sent back within the 30 day window",by:{"7d":{value:"4.1%",delta:-.8},"28d":{value:"4.6%",delta:.5},qtd:{value:"5.2%",delta:1.7}}}];

let k = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[n].focus(),a[n].click()
};

let g = (...e)=>e.filter(Boolean).join(" ");

let v = "text-neutral-900 dark:text-neutral-100";

let w = [{id:"compute",name:"Container compute",initials:"CC",team:"Platform",by:{month:{spend:42180,delta:4.2,units:"18,400 vCPU hrs"},quarter:{spend:121460,delta:9.6,units:"54,900 vCPU hrs"}}},{id:"storage",name:"Object storage",initials:"OS",team:"Data",by:{month:{spend:18740,delta:-1.8,units:"312 TB stored"},quarter:{spend:57120,delta:2.4,units:"938 TB stored"}}},{id:"warehouse",name:"Query warehouse",initials:"QW",team:"Analytics",by:{month:{spend:15390,delta:12.7,units:"9,860 credits"},quarter:{spend:41870,delta:21.3,units:"27,140 credits"}}},{id:"egress",name:"Network egress",initials:"NE",team:"Platform",by:{month:{spend:9260,delta:-6.4,units:"74 TB transferred"},quarter:{spend:30480,delta:-3.1,units:"241 TB transferred"}}},{id:"search",name:"Search cluster",initials:"SC",team:"Product",by:{month:{spend:7420,delta:.9,units:"6 nodes"},quarter:{spend:22010,delta:5.5,units:"6 nodes"}}},{id:"observability",name:"Observability",initials:"OB",team:"Platform",by:{month:{spend:5130,delta:3.6,units:"1.4 TB ingested"},quarter:{spend:14980,delta:7.2,units:"4.1 TB ingested"}}}];

let eN = (...e)=>e.filter(Boolean).join(" ");

let ez = "text-neutral-900 dark:text-neutral-100";

let eA = "text-neutral-900/62 dark:text-neutral-100/62";

let eS = "text-[14px]/[20px] font-medium";

let eC = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eR = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eM = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let eT = "rounded-[var(--rb-r-4xl,18px)]";

let eD = [{id:"msg_2Rk9",event:"invoice.finalized",host:"hooks.northwind.io",attempt:1,status:"200 OK",code:200,duration:"142 ms",outcome:"delivered",request:`POST /v2/events HTTP/1.1
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
}`}];

let eO = [{id:"all",label:"All"},{id:"delivered",label:"Delivered"},{id:"failed",label:"Failed"}];

let eP = [{value:"all",label:"All endpoints"},...eD.reduce((e,r)=>(e.includes(r.host)||e.push(r.host),e),[]).map(e=>({value:e,label:e}))];

let eE = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[n].focus(),a[n].click()
};

function eW({value:e,onChange:r,options:a,ariaLabel:l}){
  let o=useId(),[s,d]=useState(false),[c,_]=useState(0),[u,x]=useState(false),[b,p]=useState(),h=useRef(null),m=useRef(null),k=useRef({buffer:"",at:0}),f=a.findIndex(r=>r.value===e),g=f>=0?a[f]:undefined,v=()=>{
    let e=h.current,r=e?.ownerDocument.defaultView;
    if(e&&r){
      let t=e.getBoundingClientRect(),n=0,i=r.innerHeight;
      for(let a=e.parentElement;a;a=a.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(a).overflowY)){
        let e=a.getBoundingClientRect();
        n=Math.max(n,e.top),i=Math.min(i,e.bottom);
        break
      }
      let l=i-t.bottom,o=t.top-n,s=Math.min(32*a.length+8,264),d=l<s+8&&o>l,c=(d?o:l)-8;
      x(d),p(c<s?Math.max(c,40):undefined)
    }
    _(f>=0?f:0),d(true)
  };
  useEffect(()=>{
    if(!s)return;
    let e=h.current,r=e?.ownerDocument;
    if(!e||!r)return;
    let a=r=>{
      e.contains(r.target)||d(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [s]),useEffect(()=>{
    if(!s)return;
    let e=m.current,r=e?.querySelector(`[data-index="${c}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [s,c]);
  let w=e=>{
    let t=a[e];
    t&&(r(t.value),d(false),h.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={h} className="relative">
        <button type="button" role="combobox" aria-expanded={s} aria-controls={o} aria-haspopup="listbox" aria-label={l} onClick={()=>s?d(false):v()} onKeyDown={e=>{
          if(!s){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),v());
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),d(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),_(e=>Math.min(e+1,a.length-1));else if("ArrowUp"===e.key)e.preventDefault(),_(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),_(0);else if("End"===e.key)e.preventDefault(),_(a.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),w(c);else if(1===e.key.length&&/\S/.test(e.key)){
            let r=Date.now(),t=k.current;
            t.buffer=r-t.at>700?e.key:t.buffer+e.key,t.at=r;
            let n=a.findIndex(e=>e.label.toLowerCase().startsWith(t.buffer.toLowerCase()));
            n>=0&&_(n)
          }
        }} className="inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40">
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {a.map(e=><span key={e.value} aria-hidden="true" className="invisible truncate">{e.label}</span>)}
            <span className="truncate">{g?.label}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {s&&<ul ref={m} id={o} role="listbox" tabIndex={-1} style={{maxHeight:b}} className={eN("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",u?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {a.map((r,a)=>(
            <li key={r.value} role="option" aria-selected={r.value===e} data-index={a} data-highlighted={a===c?"":undefined} onMouseEnter={()=>_(a)} onClick={()=>w(a)} className={eN("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                    <span className="truncate">{r.label}</span>
                    {r.value===e&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                  </li>
          ))}
        </ul>}
      </div>
  );
}

function eB({label:e,body:r}){
  let{ref:a,edges:i,onScroll:l}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollLeft:t,scrollWidth:n,clientWidth:i}=r;
      a({start:t>1,end:Math.ceil(t+i)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }();
  return (
    <div>
        <p className={eN("text-[13px]/[16px] font-semibold tabular-nums",eA,"mb-1")}>{e}</p>
        <div className={eN(eT,"relative overflow-hidden")}>
          <pre ref={a} onScroll={l} style={{touchAction:"pan-x"}} className={eN("overflow-auto bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] py-3.5 font-mono text-[13px]/[21px] tabular-nums text-neutral-900 dark:text-neutral-100 [scrollbar-width:thin] dark:bg-neutral-950/60","whitespace-pre px-3")}>{r}</pre>
          <div aria-hidden="true" className={eN("bg-linear-to-r from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 left-0 w-8",i.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={eN("bg-linear-to-l from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 right-0 w-8",i.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default function list_6__Sorbet__Component(){
  let[e,r]=useState("all"),[a,l]=useState("all"),[o,s]=useState(null),d=eD.filter(r=>("all"===e||r.outcome===e)&&("all"===a||r.host===a)),c=(e,a)=>{
    if(r(e),l(a),o){
      let r=eD.find(e=>e.id===o);
      r&&("all"===e||r.outcome===e)&&("all"===a||r.host===a)||s(null)
    }
  };
  return (
    <div className={eN("bg-white dark:bg-neutral-950",ez,"flex h-full min-h-[740px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className="mx-auto w-full max-w-[720px] shrink-0">
          <header className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
            <div className="min-w-0">
              <h2 className={eN("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",ez)}>Webhook deliveries</h2>
              <p className={eN(eS,eA,"mt-0.5 truncate")}>Outbound attempts to your customer endpoints</p>
            </div>
            <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2">
              <eW value={a} onChange={r=>c(e,r)} options={eP} ariaLabel="Filter by destination endpoint" />
              <div role="radiogroup" aria-label="Filter by delivery outcome" onKeyDown={eE} className={eN("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10")}>
                {eO.map(r=>{
                  let n=e===r.id;
                  return <button key={r.id} type="button" role="radio" aria-checked={n} tabIndex={n?0:-1} onClick={()=>c(r.id,a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{r.label}</button>;
                })}
              </div>
            </div>
          </header>
          {0===d.length?<div className={eN(eM,"shrink-0 items-center px-6 py-16 text-center")}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center">
              <HugeiconsIcon icon={Icon_81515} size={20} strokeWidth={2} aria-hidden="true" className="text-neutral-900/78 dark:text-neutral-100/78" />
            </div>
            <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No deliveries to show</p>
            <p className={eN("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>
              No attempts match this outcome and endpoint. Reset the filters to see every delivery.
            </p>
            <button type="button" onClick={()=>c("all","all")} className={eN(eC,eR,"mt-4")}>Show all deliveries</button>
          </div>:<ul className={eN(eM,"divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","shrink-0 p-2")}>
            {d.map(e=>{
              let r=o===e.id,a="failed"===e.outcome;
              return (
                <li key={e.id} className="overflow-hidden">
                            <button type="button" aria-expanded={r} aria-controls={`delivery-${e.id}`} onClick={()=>s(r?null:e.id)} className={eN("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",eT,"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","group h-[56px] px-2")}>
                              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <span className={eN("font-mono text-[12px]/[16px] tabular-nums",ez,"block truncate")}>{e.event}</span>
                                <span data-description className={eN(eS,eA,"block truncate")}>
                                  <span>{e.host}</span>
                                  <span className="ms-3">
                                    {"attempt "}
                                    {e.attempt}
                                  </span>
                                </span>
                              </span>
                              <span className="shrink-0 text-right">
                                <span className={eN("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",a?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":"text-neutral-900/78 dark:text-neutral-100/78")}>{e.status}</span>
                                <span className={eN("shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","mt-0.5 block")}>{e.duration}</span>
                              </span>
                              <span className="flex size-4 shrink-0 items-center justify-center">
                                <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                              </span>
                            </button>
                            <div id={`delivery-${e.id}`} className="grid" style={{gridTemplateRows:r?"1fr":"0fr"}}>
                              <div hidden={!r} className="overflow-hidden">
                                <div className="space-y-3 px-2 pt-1 pb-3">
                                  <eB label="Request" body={e.request} />
                                  <eB label="Response" body={e.response} />
                                  <div className="flex justify-end">
                                    <button type="button" className={eN(eC,eR)}>
                                      <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" className={eA} />
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
