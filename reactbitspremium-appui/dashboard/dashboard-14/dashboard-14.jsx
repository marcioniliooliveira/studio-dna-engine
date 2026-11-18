/**
 * React Bits Pro — Application UI (dashboard-14)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, label, observe, spark, tone, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_94089 = [["path",{d:"M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L10.5 15L16 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_24580 = [["path",{d:"M5.25 5L19.25 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M22.25 12C22.25 6.47715 17.7728 2 12.25 2C6.72715 2 2.25 6.47715 2.25 12C2.25 17.5228 6.72715 22 12.25 22C17.7728 22 22.25 17.5228 22.25 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_36048 = [["path",{d:"M19 4H5C4.06812 4 3.60218 4 3.23463 4.15224C2.74458 4.35523 2.35523 4.74458 2.15224 5.23463C2 5.60218 2 6.06812 2 7C2 7.93188 2 8.39782 2.15224 8.76537C2.35523 9.25542 2.74458 9.64477 3.23463 9.84776C3.60218 10 4.06812 10 5 10H19C19.9319 10 20.3978 10 20.7654 9.84776C21.2554 9.64477 21.6448 9.25542 21.8478 8.76537C22 8.39782 22 7.93188 22 7C22 6.06812 22 5.60218 21.8478 5.23463C21.6448 4.74458 21.2554 4.35523 20.7654 4.15224C20.3978 4 19.9319 4 19 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 14H5C4.06812 14 3.60218 14 3.23463 14.1522C2.74458 14.3552 2.35523 14.7446 2.15224 15.2346C2 15.6022 2 16.0681 2 17C2 17.9319 2 18.3978 2.15224 18.7654C2.35523 19.2554 2.74458 19.6448 3.23463 19.8478C3.60218 20 4.06812 20 5 20H19C19.9319 20 20.3978 20 20.7654 19.8478C21.2554 19.6448 21.6448 19.2554 21.8478 18.7654C22 18.3978 22 17.9319 22 17C22 16.0681 22 15.6022 21.8478 15.2346C21.6448 14.7446 21.2554 14.3552 20.7654 14.1522C20.3978 14 19.9319 14 19 14Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.125 7H6M6.25 7C6.25 7.13807 6.13807 7.25 6 7.25C5.86193 7.25 5.75 7.13807 5.75 7C5.75 6.86193 5.86193 6.75 6 6.75C6.13807 6.75 6.25 6.86193 6.25 7Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10.125 7H10M10.25 7C10.25 7.13807 10.1381 7.25 10 7.25C9.86193 7.25 9.75 7.13807 9.75 7C9.75 6.86193 9.86193 6.75 10 6.75C10.1381 6.75 10.25 6.86193 10.25 7Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M6.125 17H6M6.25 17C6.25 17.1381 6.13807 17.25 6 17.25C5.86193 17.25 5.75 17.1381 5.75 17C5.75 16.8619 5.86193 16.75 6 16.75C6.13807 16.75 6.25 16.8619 6.25 17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10.125 17H10M10.25 17C10.25 17.1381 10.1381 17.25 10 17.25C9.86193 17.25 9.75 17.1381 9.75 17C9.75 16.8619 9.86193 16.75 10 16.75C10.1381 16.75 10.25 16.8619 10.25 17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_33126 = [["path",{d:"M7 19H13C15.8284 19 17.2426 19 18.1213 18.1213C19 17.2426 19 15.8284 19 13V10M19 10C19.7002 10 21.0085 11.9943 21.5 12.5M19 10C18.2998 10 16.9915 11.9943 16.5 12.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5 7L5 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"5",cy:"5",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["circle",{cx:"19",cy:"5",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["circle",{cx:"5",cy:"19",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_52975 = [["path",{d:"M15 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V9M20 4L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20 13C20 16.7712 20 18.6569 18.8284 19.8284C17.6569 21 15.7712 21 12 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V12C3 8.22876 3 6.34315 4.17157 5.17157C5.34315 4 7.22876 4 11 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let g = (...e)=>e.filter(Boolean).join(" "),
  f = "text-neutral-900 dark:text-neutral-100",
  v = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "rounded-[var(--rb-r-sm,6px)]",
  y = "text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",
  w = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  j = "font-mono text-[12px]/[16px] tabular-nums",
  N = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  A = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  R = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  M = "inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",
  z = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  S = "relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",
  C = "flex min-w-0 flex-1 flex-col gap-0.5",
  L = "flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  B = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  W = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950";

function P(){
  let e=useRef(null),[t,a]=useState({start:false,end:false}),r=useCallback(()=>{
    let t=e.current;
    if(!t)return;
    let{scrollTop:r,scrollHeight:n,clientHeight:i}=t;
    a({start:r>1,end:Math.ceil(r+i)<n-1})
  }, []);
  return useEffect(()=>{
    r();
    let t=e.current,a=t?.ownerDocument.defaultView;
    if(!t||!a?.ResizeObserver)return;
    let n=new a.ResizeObserver(r);
    return observe(t),()=>disconnect();
  }, [r]),{ref:e,edges:t,onScroll:r};
}

let D = (e,t,a,r,n)=>r+(e-t)/(a-t||1)*(n-r),
  I = (e,t,a)=>Math.min(a,Math.max(t,e)),
  E = [{id:"s1",name:"Checkout API",repo:"core/checkout",region:"eu-west-1",health:"healthy",rps:4820,p95:118,errorRate:.14,saturation:61,version:"v4.18.2",deployedBy:"Ines Halvorsen",deployedAt:"2h ago"},{id:"s2",name:"Ledger writer",repo:"core/ledger",region:"eu-west-1",health:"watch",rps:1290,p95:402,errorRate:1.9,saturation:88,version:"v2.7.0",deployedBy:"Dovid Aranyi",deployedAt:"26m ago"},{id:"s3",name:"Media pipeline",repo:"media/encode",region:"us-east-2",health:"healthy",rps:640,p95:1140,errorRate:.32,saturation:44,version:"v9.3.1",deployedBy:"Runa Petit",deployedAt:"1d ago"},{id:"s4",name:"Search index",repo:"search/index",region:"us-east-2",health:"healthy",rps:3410,p95:74,errorRate:.08,saturation:52,version:"v1.22.9",deployedBy:"Marta L\xf8ken",deployedAt:"5h ago"},{id:"s5",name:"Webhook relay",repo:"core/relay",region:"ap-south-1",health:"down",rps:210,p95:2960,errorRate:14.6,saturation:97,version:"v3.0.4",deployedBy:"Kwame Osei",deployedAt:"12m ago"},{id:"s6",name:"Identity gateway",repo:"core/identity",region:"eu-west-1",health:"healthy",rps:5960,p95:61,errorRate:.05,saturation:39,version:"v6.11.0",deployedBy:"Ines Halvorsen",deployedAt:"3d ago"},{id:"s7",name:"Notification fan-out",repo:"growth/notify",region:"us-east-2",health:"watch",rps:880,p95:318,errorRate:2.4,saturation:79,version:"v5.2.3",deployedBy:"Priya Sundar",deployedAt:"8h ago"},{id:"s8",name:"Billing sync",repo:"core/billing",region:"eu-west-1",health:"healthy",rps:430,p95:205,errorRate:.21,saturation:33,version:"v2.14.6",deployedBy:"Dovid Aranyi",deployedAt:"2d ago"},{id:"s9",name:"Asset CDN edge",repo:"media/edge",region:"global",health:"healthy",rps:9120,p95:28,errorRate:.02,saturation:47,version:"v11.0.1",deployedBy:"Marta L\xf8ken",deployedAt:"6d ago"}],
  $ = {healthy:{label:"Healthy",Icon:Icon_94089,tone:"text-neutral-900/80 dark:text-neutral-100/80",spark:v},watch:{label:"Degraded",Icon:Icon_36474,tone:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",spark:y},down:{label:"Failing",Icon:Icon_24580,tone:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",spark:w}},
  O = {s1:[{id:"e1",text:"Rolled v4.18.2 to 100% of eu-west-1",meta:["2h ago","deploy"],kind:"healthy"},{id:"e2",text:"Canary held for 14 minutes, no regression",meta:["2h ago","canary"],kind:"healthy"},{id:"e3",text:"Card token cache warmed after restart",meta:["5h ago","runtime"],kind:"healthy"},{id:"e4",text:"p95 crossed 200ms for 3 minutes",meta:["9h ago","latency"],kind:"watch"}],s2:[{id:"e1",text:"Write queue depth above threshold",meta:["26m ago","saturation"],kind:"watch"},{id:"e2",text:"Shipped v2.7.0 with batched commits",meta:["26m ago","deploy"],kind:"healthy"},{id:"e3",text:"Replica lag peaked at 4.2s",meta:["1h ago","database"],kind:"watch"},{id:"e4",text:"Nightly reconciliation finished clean",meta:["7h ago","job"],kind:"healthy"}],s3:[{id:"e1",text:"Encoder pool scaled to 24 workers",meta:["40m ago","autoscale"],kind:"healthy"},{id:"e2",text:"Long-form transcode backlog cleared",meta:["3h ago","queue"],kind:"healthy"},{id:"e3",text:"Two jobs retried after codec timeout",meta:["6h ago","retry"],kind:"watch"}],s4:[{id:"e1",text:"Reindexed 1.4M documents",meta:["5h ago","job"],kind:"healthy"},{id:"e2",text:"Query cache hit rate settled at 94%",meta:["5h ago","runtime"],kind:"healthy"},{id:"e3",text:"Shard rebalance completed",meta:["1d ago","cluster"],kind:"healthy"}],s5:[{id:"e1",text:"Outbound deliveries failing at the edge",meta:["12m ago","incident"],kind:"down"},{id:"e2",text:"Retry budget exhausted for 3 tenants",meta:["18m ago","retry"],kind:"down"},{id:"e3",text:"Deployed v3.0.4 with new signing key",meta:["22m ago","deploy"],kind:"watch"},{id:"e4",text:"Paged the on-call responder",meta:["24m ago","alert"],kind:"down"}],s6:[{id:"e1",text:"Token issuance steady across regions",meta:["1h ago","runtime"],kind:"healthy"},{id:"e2",text:"Rotated signing keys without downtime",meta:["3d ago","security"],kind:"healthy"},{id:"e3",text:"Session store compacted",meta:["3d ago","job"],kind:"healthy"}],s7:[{id:"e1",text:"Provider throttled push delivery",meta:["35m ago","upstream"],kind:"watch"},{id:"e2",text:"Digest batch delayed by 6 minutes",meta:["2h ago","queue"],kind:"watch"},{id:"e3",text:"Template cache invalidated",meta:["8h ago","deploy"],kind:"healthy"}],s8:[{id:"e1",text:"Invoice sync matched 4,182 records",meta:["1h ago","job"],kind:"healthy"},{id:"e2",text:"Dunning retries paused for review",meta:["1d ago","policy"],kind:"healthy"},{id:"e3",text:"Currency table refreshed",meta:["2d ago","job"],kind:"healthy"}],s9:[{id:"e1",text:"Purged 82GB of stale objects",meta:["4h ago","cache"],kind:"healthy"},{id:"e2",text:"Origin shield hit rate at 99.1%",meta:["4h ago","runtime"],kind:"healthy"},{id:"e3",text:"Added two edge locations",meta:["6d ago","network"],kind:"healthy"}]},
  T = e=>{
  let t=.9*e.id.charCodeAt(1),a="down"===e.health?.55:"watch"===e.health?.3:.16;
  return Array.from({length:40},(r,n)=>Math.max(e.rps*(1+(.5*Math.sin(.38*n+t)+.32*Math.sin(.15*n+1.7*t))*a),.25*e.rps));
},
  q = e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)}k`:`${Math.round(e)}`;

function F({values:e,tone:t}){
  let a=Math.min(...e),i=Math.max(...e),s=useMemo(()=>line().x((t,a)=>D(a,0,e.length-1,.75,59.25)).y(e=>D(e,a,i,18.5,1.5)).curve(b.G)(e)??"", [e,a,i]);
  return (
    <svg width={60} height={20} aria-hidden="true" className={g(t,"shrink-0 overflow-visible")}>
        <path d={s} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
  );
}

function G(){
  let[e,t]=useState(""),[a,s]=useState(E[1].id),[l,o]=useState(null),[G,H]=function(){
    let e=useRef(null),[t,a]=useState({width:0,height:0});
    return useEffect(()=>{
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(([e])=>{
        let t=e.contentRect;
        a({width:t.width,height:t.height})
      });
      return observe(t),()=>disconnect();
    }, []),[e,t];
  }(),{ref:K,edges:V,onScroll:Q}=P(),{ref:U,edges:X,onScroll:J}=P(),{ref:Y,edges:Z,onScroll:ee}=P(),et=useMemo(()=>{
    let t=e.trim().toLowerCase();
    return t?E.filter(e=>e.name.toLowerCase().includes(t)||e.repo.toLowerCase().includes(t)||e.region.toLowerCase().includes(t)):E;
  }, [e]),ea=E.find(e=>e.id===a)??E[0],er=useMemo(()=>T(ea), [ea]),en=O[ea.id]??[],ei=H.width,es=H.height,el=Math.max(ei-36-8,1),eo=Math.max(es-12-20,1),ed=useMemo(()=>{
    let e=1.12*Math.max(...er)/2,t=10**Math.floor(Math.log10(e)),a=e/t,r=(a<=1?1:a<=2?2:a<=5?5:10)*t;
    return Math.ceil(1.12*Math.max(...er)/r)*r;
  }, [er]),ec=useMemo(()=>{
    if(0===ei)return null;
    let e=e=>36+D(e,0,39,0,el),t=e=>12+eo-D(e,0,ed,0,eo);
    return {x:e,y:t,linePath:line().x((t,a)=>e(a)).y(e=>t(e)).curve(b.G)(er)??"",areaPath:area().x((t,a)=>e(a)).y0(12+eo).y1(e=>t(e)).curve(b.G)(er)??""};
  }, [ei,el,eo,ed,er]),eh=null===l?er[39]:er[l],eu=$[ea.health],ex=eu.Icon,ep=[{label:"Requests",value:`${q(ea.rps)}/s`},{label:"p95 latency",value:`${ea.p95.toLocaleString("en-US")}ms`},{label:"Error rate",value:`${ea.errorRate}%`,tone:ea.errorRate>=5?w:ea.errorRate>=1?y:undefined},{label:"Saturation",value:`${ea.saturation}%`}];
  return (
    <div className={g("bg-white dark:bg-neutral-950",f,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <HugeiconsIcon icon={Icon_36048} size={16} strokeWidth={1.8} aria-hidden="true" className={g(v,"shrink-0")} />
            <h1 className={g("text-[20px]/[24px] font-[450] tracking-[-0.015em]",f,"truncate")}>Service health</h1>
            <span className={g("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>{E.length}</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className={g("text-[12px]/[16px] font-normal tabular-nums",v,"hidden items-center gap-1.5 sm:inline-flex")}>
              <span>Live</span>
              <span>5s</span>
            </span>
            <button type="button" className={g(A,R)}>
              <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
              Refresh
            </button>
          </div>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div ref={Y} onScroll={ee} className="flex min-h-0 flex-1 flex-col max-lg:overflow-y-auto">
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 px-4 pb-4 max-lg:flex-none lg:grid-cols-[320px_minmax(0,1fr)] sm:px-6 sm:pb-6">
              <div className={g("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","lg:min-h-0")}>
                <div className="shrink-0 p-2">
                  <div className={g("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                    <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                      <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <input type="search" value={e} onChange={e=>t(e.target.value)} placeholder="Filter services" aria-label="Filter services" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                  </div>
                </div>
                <div className="relative min-h-0 flex-1">
                  <div ref={K} onScroll={Q} className="h-full overflow-y-auto">
                    {0===et.length?<div className="flex h-full flex-col items-center justify-center px-6 text-center">
                      <HugeiconsIcon icon={Icon_66575} size={20} strokeWidth={1.8} aria-hidden="true" className={v} />
                      <p className={g("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-2")}>No services match</p>
                      <p className={g("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>Try a repo path or a region.</p>
                    </div>:<ul className="space-y-0.5 px-2 pb-2">
                      {et.map(e=>{
                        let t=e.id===a,n=$[e.health];
                        return (
                          <li key={e.id}>
                                                <button type="button" aria-current={t?"true":undefined} onClick={()=>{
                                                  s(e.id),o(null)
                                                }} className={g(S,t?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8",N,_,"px-2")}>
                                                  <span className={C}>
                                                    <span className={L}><span className="truncate">{e.name}</span></span>
                                                    <span data-description className={g(j,v,"flex min-w-0 gap-2")}>
                                                      <span className="truncate">{e.repo}</span>
                                                      <span className="shrink-0">{e.region}</span>
                                                    </span>
                                                  </span>
                                                  <span className="flex shrink-0 flex-col items-end gap-0.5">
                                                    <span className={g(M,tone)}>{label}</span>
                                                    <F values={T(e)} tone={spark} />
                                                  </span>
                                                </button>
                                              </li>
                        );
                      })}
                    </ul>}
                  </div>
                  <div aria-hidden="true" className={g("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",V.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={g("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",V.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
              <div className={g("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","lg:min-h-0")}>
                <div className={g("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","flex-wrap justify-between py-3 has-[button]:pe-4")}>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className={z}>{ea.name}</h2>
                      <span className={g("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",eu.tone,"shrink-0")}>
                        <HugeiconsIcon icon={ex} size={14} strokeWidth={1.8} aria-hidden="true" />
                        {eu.label}
                      </span>
                    </div>
                    <p className={g("text-[13px]/[18px] font-normal",v,"mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5")}>
                      <span className={g(j,"inline-flex items-center gap-1")}>
                        <HugeiconsIcon icon={Icon_33126} size={12} strokeWidth={1.8} aria-hidden="true" />
                        {ea.repo}
                      </span>
                      <span className={j}>{ea.version}</span>
                      <span>
                        {ea.deployedBy}
                        {", "}
                        {ea.deployedAt}
                      </span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button type="button" className={g(A,R)}>
                      <HugeiconsIcon icon={Icon_52975} size={16} strokeWidth={1.8} aria-hidden="true" />
                      Logs
                    </button>
                    <button type="button" className={g("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",R)}>
                      Roll back
                      <HugeiconsIcon icon={Icon_1497} size={16} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className={g("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","min-h-0 flex-1")}>
                  <div className="shrink-0 p-1">
                    <dl className="grid grid-cols-2 gap-1 md:grid-cols-4">
                      {ep.map(e=>(
                        <div key={e.label} className={g("flex min-w-0 flex-col gap-2 px-4 py-3",_)}>
                                            <dt className={g("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","truncate")}>{e.label}</dt>
                                            <dd className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.tone?<span className={e.tone}>{e.value}</span>:e.value}</dd>
                                          </div>
                      ))}
                    </dl>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col px-1.5">
                    <div className="flex shrink-0 items-baseline justify-between gap-2 px-2.5 pt-3 pb-1.5">
                      <h3 className={z}>Throughput</h3>
                      <span className={g("shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","flex gap-2")}>
                        <span>{null===l?"last 40 min":`t−${39-l} min`}</span>
                        <span className={f}>
                          {q(eh)}
                          /s
                        </span>
                      </span>
                    </div>
                    <div ref={G} role="application" tabIndex={0} aria-label={`Throughput for ${ea.name} over the last 40 minutes`} onPointerMove={e=>{
                      let t=G.current;
                      if(!t||el<=0)return;
                      let a=t.getBoundingClientRect();
                      o(I(Math.round((e.clientX-a.left-36)/el*39),0,39))
                    }} onPointerLeave={()=>o(null)} onKeyDown={e=>{
                      ("ArrowLeft"===e.key||"ArrowRight"===e.key)&&(e.preventDefault(),o(t=>I((t??39)+("ArrowRight"===e.key?1:-1),0,39)))
                    }} onBlur={()=>o(null)} className={g(N,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","relative min-h-[130px] flex-1 px-1 pb-1")}>
                      {ec&&<svg width={ei} height={es} className="overflow-visible" aria-hidden="true">
                        {[0,.5,1].map(e=>(
                          <g key={e}>
                                                <line x1={36} x2={ei-8} y1={ec.y(ed*e)} y2={ec.y(ed*e)} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/5 dark:stroke-neutral-100/5" />
                                                <text x={0} y={ec.y(ed*e)} dy={-4} textAnchor="start" className="fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66">{q(ed*e)}</text>
                                              </g>
                        ))}
                        <path d={ec.areaPath} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
                        <path d={ec.linePath} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-neutral-900 dark:stroke-neutral-100" />
                        {null!==l&&<g>
                          <line x1={ec.x(l)} x2={ec.x(l)} y1={12} y2={12+eo} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900 dark:stroke-neutral-100" />
                          <rect x={ec.x(l)-4} y={ec.y(er[l])-4} width={8} height={8} className="fill-neutral-900 stroke-white stroke-2 dark:fill-neutral-100 dark:stroke-neutral-900" />
                        </g>}
                      </svg>}
                    </div>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col">
                    <h3 className={g(z,"shrink-0 px-4 pt-2.5 pb-1.5")}>Recent activity</h3>
                    <div className="relative min-h-0 flex-1">
                      <div ref={U} onScroll={J} className="h-full overflow-y-auto">
                        <ul className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
                          {en.map(e=>(
                            <li key={e.id} className={g(S,"px-4")}>
                                                    <span className={C}>
                                                      <span className={L}><span className="truncate">{e.text}</span></span>
                                                      <span data-description className={g("line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","truncate")}>
                                                        <span>{e.meta[0]}</span>
                                                        <span className="ms-2">{e.meta[1]}</span>
                                                      </span>
                                                    </span>
                                                    <span className={g(M,$[e.kind].tone,"shrink-0")}>{$[e.kind].label}</span>
                                                  </li>
                          ))}
                        </ul>
                      </div>
                      <div aria-hidden="true" className={g(B,"pointer-events-none absolute inset-x-0 top-0 h-6",X.start?"opacity-100":"opacity-0")} />
                      <div aria-hidden="true" className={g(W,"pointer-events-none absolute inset-x-0 bottom-0 h-6",X.end?"opacity-100":"opacity-0")} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={g(B,"pointer-events-none absolute inset-x-0 top-0 h-8",Z.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={g(W,"pointer-events-none absolute inset-x-0 bottom-0 h-8",Z.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default G;
