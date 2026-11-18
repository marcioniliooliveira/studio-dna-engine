/**
 * React Bits Pro — Application UI (monitoring-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_84341 = [["path",{d:"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 10.875V13.125M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  b = "bg-white dark:bg-neutral-950",
  m = "text-neutral-900/80 dark:text-neutral-100/80",
  f = "text-neutral-900/66 dark:text-neutral-100/66",
  g = "text-[14px]/[16px] font-[450]",
  k = "text-[13px]/[18px] font-normal",
  v = "text-[12px]/[16px] font-normal tabular-nums",
  w = "inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",
  _ = "text-neutral-900/80 dark:text-neutral-100/80",
  j = "text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",
  y = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  N = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",
  S = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  z = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  A = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  R = p(k,f),
  C = p(v,f),
  E = ["Investigating","Identified","Monitoring","Resolved"],
  M = [{id:"e1",status:"Monitoring",who:"Priya Patel",initials:"PP",at:"09:41",body:"Connection pool raised to 240 and the failing region drained. Error rate is back under 0.2% and holding. Watching for one more cycle before we call it."},{id:"e2",status:"Identified",who:"Theo Park",initials:"TP",at:"09:18",body:"The charge worker exhausted its database pool after a migration left an index rebuild running against the orders table."},{id:"e3",status:"Investigating",who:"On-call rotation",initials:"OC",at:"09:04",body:"Automated alert fired on p99 checkout latency crossing 8s. Paging the payments team."}],
  D = [{label:"Detected",value:"09:04",icon:Icon_29635},{label:"Acknowledged",value:"09:06",icon:Icon_88366},{label:"Mitigated",value:"09:38",icon:Icon_20484},{label:"Duration",value:"37m",icon:Icon_84341}],
  W = [{name:"Checkout API",state:"Degraded",tone:"danger"},{name:"Payments worker",state:"Recovering",tone:"warning"},{name:"Order history",state:"Operational",tone:"ok"},{name:"Webhooks",state:"Operational",tone:"ok"}],
  P = {danger:y,warning:j,ok:_},
  L = {Investigating:y,Identified:j,Monitoring:_,Resolved:_};

function O(){
  let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
    let t=e.current;
    if(!t)return;
    let{scrollTop:a,scrollHeight:n,clientHeight:l}=t;
    r({start:a>1,end:Math.ceil(a+l)<n-1})
  }, []);
  return useEffect(()=>{
    a();
    let t=e.current,r=t?.ownerDocument.defaultView;
    if(!t||!r?.ResizeObserver)return;
    let n=new r.ResizeObserver(a);
    return observe(t),()=>disconnect();
  }, [a]),{ref:e,edges:t,onScroll:a};
}

function $({id:e,value:t,onChange:r,options:s}){
  let i=useId(),[o,d]=useState(false),[x,h]=useState(false),[b,m]=useState(0),[f,g]=useState(false),[k,v]=useState(),w=useRef(null),_=useRef(null),j=useRef({buffer:"",at:0}),y=s.indexOf(t),N=(e,t)=>{
    let r=w.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,n=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),n=Math.min(n,r.bottom);
        break
      }
      let l=n-e.bottom,i=e.top-t,o=Math.min(32*s.length+8,264),d=l<o+8&&i>l,c=(d?i:l)-8;
      g(d),v(c<o?Math.max(c,40):undefined)
    }
    h(e),m(t??(y>=0?y:0)),d(true)
  };
  useEffect(()=>{
    if(!o)return;
    let e=w.current,t=e?.ownerDocument;
    if(!t)return;
    let r=t=>{
      e.contains(t.target)||d(false)
    };
    return t.addEventListener("mousedown",r),t.addEventListener("touchstart",r),()=>{
      t.removeEventListener("mousedown",r),t.removeEventListener("touchstart",r)
    };
  }, [o]),useEffect(()=>{
    if(!o)return;
    let e=_.current,t=e?.querySelector(`[data-index="${b}"]`);
    if(!e||!t)return;
    let r=t.offsetTop,a=r+t.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:a>e.scrollTop+e.clientHeight&&(e.scrollTop=a-e.clientHeight)
  }, [o,b]);
  let S=e=>{
    let t=s[e];
    undefined!==t&&(r(t),d(false),w.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={w} className="relative">
        <button id={e} type="button" role="combobox" aria-expanded={o} aria-controls={i} aria-haspopup="listbox" onClick={()=>o?d(false):N(false)} onKeyDown={e=>{
          if(!o){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),N(true));
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),d(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),m(e=>Math.min(e+1,s.length-1));else if("ArrowUp"===e.key)e.preventDefault(),m(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),m(0);else if("End"===e.key)e.preventDefault(),m(s.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),S(b);else if(1===e.key.length&&/\S/.test(e.key)){
            let t=Date.now(),r=j.current;
            r.buffer=t-r.at>700?e.key:r.buffer+e.key,r.at=t;
            let a=s.findIndex(e=>e.toLowerCase().startsWith(r.buffer.toLowerCase()));
            a>=0&&m(a)
          }
        }} className="inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40">
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {s.map(e=><span key={e} aria-hidden="true" className="invisible truncate">{e}</span>)}
            <span className="truncate">{t}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {o&&<ul ref={_} id={i} role="listbox" tabIndex={-1} style={{maxHeight:k}} className={p("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",!x&&"transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute z-30 max-h-[264px] w-full min-w-[100%]",f?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,r)=>(
            <li key={e} role="option" aria-selected={e===t} data-index={r} data-highlighted={r===b?"":undefined} onMouseEnter={()=>m(r)} onClick={()=>S(r)} className={p("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                    <span className="truncate">{e}</span>
                    {e===t&&<span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
                      <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                    </span>}
                  </li>
          ))}
        </ul>}
      </div>
  );
}

function T(){
  let[e,t]=useState("Monitoring"),[r,s]=useState(""),[i,o]=useState(M),{ref:d,edges:c,onScroll:u}=O(),{ref:_,edges:j,onScroll:y}=O();
  return useEffect(()=>u(), [i,u]),<div className={p("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[680px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
    <div className={p("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto flex min-h-0 w-full max-w-[1000px] flex-1 flex-col gap-1")}>
      <div className="px-4 py-3.5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Icon_36474} size={16} strokeWidth={1.8} aria-hidden="true" className={p("text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","shrink-0")} />
              <h2 className={p("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Elevated checkout latency</h2>
            </div>
            <p className={p(R,"mt-1 flex flex-wrap gap-x-3")}>
              <span>INC-2841</span>
              <span>opened 09:04</span>
              <span>payments team</span>
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <label htmlFor="monitoring-3-status" className="sr-only">Incident status</label>
            <$ id="monitoring-3-status" value={e} onChange={e=>t(e)} options={E} />
            <button type="button" className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>Resolve</button>
          </div>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {D.map(({label:e,value:t,icon:r})=>(
            <div key={e}>
                        <dt className={p(C,"flex items-center gap-1.5")}>
                          <HugeiconsIcon icon={r} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                          {e}
                        </dt>
                        <dd className={p(g,"mt-1")}>{t}</dd>
                      </div>
          ))}
        </dl>
      </div>
      <div className={p("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","min-h-0 flex-1")}>
        <div className={p("bg-neutral-900/8 dark:bg-neutral-100/8","grid min-h-0 flex-1 gap-px lg:grid-cols-[1fr_280px]")}>
          <div className="flex min-h-[280px] min-w-0 flex-col gap-px lg:min-h-0">
            <div className={p(b,"relative min-h-0 flex-1")}>
              <div ref={d} onScroll={u} className="h-full overflow-y-auto p-4 pb-6">
                <h3 className={g}>Updates</h3>
                <ol className="mt-3 space-y-4">
                  {i.map((e,t)=>(
                    <li key={e.id} className="relative flex gap-3">
                                        {t<i.length-1&&<span aria-hidden className={p("border-r border-neutral-900/8 dark:border-neutral-100/8","absolute top-3.5 -bottom-[30px] left-[13px] w-0")} />}
                                        <span aria-hidden className={p(N,"z-10 size-[28px]")}><span className={S}>{e.initials}</span></span>
                                        <div className="min-w-0 flex-1 py-1">
                                          <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                            <span className={g}>{e.who}</span>
                                            <span className={p(w,L[e.status])}>{e.status}</span>
                                            <span className={p(v,f)}>{e.at}</span>
                                          </p>
                                          <p className={p(k,m,"mt-1")}>{e.body}</p>
                                        </div>
                                      </li>
                  ))}
                </ol>
              </div>
              <div aria-hidden="true" className={p(z,"pointer-events-none absolute inset-x-0 top-0 h-8",c.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={p(A,"pointer-events-none absolute inset-x-0 bottom-0 h-8",c.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={p(b,"p-2")}>
              <label htmlFor="monitoring-3-update" className="sr-only">Post an update</label>
              <div className={p("relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8","gap-1 p-1")}>
                <textarea id="monitoring-3-update" value={r} onChange={e=>s(e.target.value)} rows={2} placeholder="Post an update for subscribers…" className={p("max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66","min-h-12")} />
                <div className="flex items-center justify-between gap-2 ps-1.5">
                  <p className={p(R,"truncate")}>Sends to 1,204 status page subscribers</p>
                  <button type="button" onClick={()=>{
                    let t=r.trim();
                    t&&(o(r=>[{id:`n${r.length+1}`,status:e,who:"You",initials:"YO",at:"Just now",body:t},...r]),s(""))
                  }} disabled={!r.trim()} className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>
                    <HugeiconsIcon icon={Icon_55410} size={16} strokeWidth={1.8} aria-hidden="true" />
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          <aside className={p(b,"relative min-h-0")}>
            <div ref={_} onScroll={y} className="h-full overflow-y-auto p-4 pb-6">
              <h3 className={g}>Affected components</h3>
              <ul className="mt-3 space-y-2">
                {W.map(e=>(
                  <li key={e.name} className="flex items-center justify-between gap-3">
                                    <span className={p(k,m,"min-w-0 truncate")}>{e.name}</span>
                                    <span className={p(w,P[e.tone],"shrink-0")}>{e.state}</span>
                                  </li>
                ))}
              </ul>
              <h3 className={p(g,"mt-5")}>Responders</h3>
              <ul className="mt-3 space-y-2">
                {[{name:"Priya Patel",initials:"PP",role:"Incident lead"},{name:"Theo Park",initials:"TP",role:"Payments"},{name:"Nora Vale",initials:"NV",role:"Comms"}].map(e=>(
                  <li key={e.name} className="flex items-center gap-2.5">
                                    <span aria-hidden className={p(N,"size-[28px]")}><span className={S}>{e.initials}</span></span>
                                    <span className="min-w-0 flex-1">
                                      <span className={p(k,"block truncate")}>{e.name}</span>
                                      <span className={p(v,f,"block truncate")}>{e.role}</span>
                                    </span>
                                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <h3 className={g}>Error budget</h3>
                <div role="progressbar" aria-valuenow={38} aria-valuemin={0} aria-valuemax={100} aria-label="Error budget consumed" className={p("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-3")}>
                  <div style={{width:"38%"}} className={p("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","h-full rounded-[inherit]")} />
                </div>
                <p className={p(k,m,"mt-2")}>38% of the monthly budget spent by this incident.</p>
              </div>
            </div>
            <div aria-hidden="true" className={p(z,"pointer-events-none absolute inset-x-0 top-0 h-8",j.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={p(A,"pointer-events-none absolute inset-x-0 bottom-0 h-8",j.end?"opacity-100":"opacity-0")} />
          </aside>
        </div>
      </div>
    </div>
  </div>;
}


export default T;
