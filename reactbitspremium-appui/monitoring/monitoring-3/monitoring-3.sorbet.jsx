/**
 * React Bits Pro — Application UI (monitoring-3 (Sorbet))
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

let u = (...e)=>e.filter(Boolean).join(" ");

let b = "bg-white dark:bg-neutral-950";

let h = "text-neutral-900/62 dark:text-neutral-100/62";

let p = "text-[15px]/[20px] font-bold";

let m = "text-[14px]/[20px] font-medium";

let k = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let f = "flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100";

let g = u(m,h);

let v = u("text-[13px]/[16px] font-semibold tabular-nums",h);

let w = (e,a,r)=>Math.min(r,Math.max(a,e));

let j = (e,a,r,t)=>Array.from({length:t},(n,l)=>Math.round(a*(1+l/(t-1)*r+.09*(.5*Math.sin(.7*l+e)+.34*Math.sin(.23*l+2.1*e)))));

let ea = (...e)=>e.filter(Boolean).join(" ");

let er = "bg-white dark:bg-neutral-950";

let et = "text-neutral-900/78 dark:text-neutral-100/78";

let en = "text-neutral-900/62 dark:text-neutral-100/62";

let el = "text-[15px]/[20px] font-bold";

let ei = "text-[14px]/[20px] font-medium";

let es = "text-[13px]/[16px] font-semibold tabular-nums";

let eo = "inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums";

let ec = "text-neutral-900/78 dark:text-neutral-100/78";

let ed = "text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]";

let e_ = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]";

let ex = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none";

let eu = "flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]";

let eb = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let eh = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let ep = ea(ei,en);

let em = ea(es,en);

let ek = ["Investigating","Identified","Monitoring","Resolved"];

let ef = [{id:"e1",status:"Monitoring",who:"Priya Patel",initials:"PP",at:"09:41",body:"Connection pool raised to 240 and the failing region drained. Error rate is back under 0.2% and holding. Watching for one more cycle before we call it."},{id:"e2",status:"Identified",who:"Theo Park",initials:"TP",at:"09:18",body:"The charge worker exhausted its database pool after a migration left an index rebuild running against the orders table."},{id:"e3",status:"Investigating",who:"On-call rotation",initials:"OC",at:"09:04",body:"Automated alert fired on p99 checkout latency crossing 8s. Paging the payments team."}];

let eg = [{label:"Detected",value:"09:04",icon:Icon_29635},{label:"Acknowledged",value:"09:06",icon:Icon_88366},{label:"Mitigated",value:"09:38",icon:Icon_20484},{label:"Duration",value:"37m",icon:Icon_84341}];

let ev = [{name:"Checkout API",state:"Degraded",tone:"danger"},{name:"Payments worker",state:"Recovering",tone:"warning"},{name:"Order history",state:"Operational",tone:"ok"},{name:"Webhooks",state:"Operational",tone:"ok"}];

let ew = {danger:e_,warning:ed,ok:ec};

let ej = {Investigating:e_,Identified:ed,Monitoring:ec,Resolved:ec};

function ey(){
  let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
    let a=e.current;
    if(!a)return;
    let{scrollTop:t,scrollHeight:n,clientHeight:l}=a;
    r({start:t>1,end:Math.ceil(t+l)<n-1})
  }, []);
  return useEffect(()=>{
    t();
    let a=e.current,r=a?.ownerDocument.defaultView;
    if(!a||!r?.ResizeObserver)return;
    let n=new r.ResizeObserver(t);
    return observe(a),()=>disconnect();
  }, [t]),{ref:e,edges:a,onScroll:t};
}

function eN({id:e,value:a,onChange:r,options:l}){
  let i=useId(),[s,c]=useState(false),[d,_]=useState(false),[x,u]=useState(0),[b,h]=useState(false),[p,m]=useState(),k=useRef(null),f=useRef(null),g=useRef({buffer:"",at:0}),v=l.indexOf(a),w=(e,a)=>{
    let r=k.current,t=r?.ownerDocument.defaultView;
    if(r&&t){
      let e=r.getBoundingClientRect(),a=0,n=t.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(t.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        a=Math.max(a,r.top),n=Math.min(n,r.bottom);
        break
      }
      let i=n-e.bottom,s=e.top-a,o=Math.min(32*l.length+8,264),c=i<o+8&&s>i,d=(c?s:i)-8;
      h(c),m(d<o?Math.max(d,40):undefined)
    }
    _(e),u(a??(v>=0?v:0)),c(true)
  };
  useEffect(()=>{
    if(!s)return;
    let e=k.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||c(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [s]),useEffect(()=>{
    if(!s)return;
    let e=f.current,a=e?.querySelector(`[data-index="${x}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [s,x]);
  let j=e=>{
    let a=l[e];
    undefined!==a&&(r(a),c(false),k.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={k} className="relative">
        <button id={e} type="button" role="combobox" aria-expanded={s} aria-controls={i} aria-haspopup="listbox" onClick={()=>s?c(false):w(false)} onKeyDown={e=>{
          if(!s){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),w(true));
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),c(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),u(e=>Math.min(e+1,l.length-1));else if("ArrowUp"===e.key)e.preventDefault(),u(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),u(0);else if("End"===e.key)e.preventDefault(),u(l.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),j(x);else if(1===e.key.length&&/\S/.test(e.key)){
            let a=Date.now(),r=g.current;
            r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
            let t=l.findIndex(e=>e.toLowerCase().startsWith(r.buffer.toLowerCase()));
            t>=0&&u(t)
          }
        }} className="inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40">
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {l.map(e=><span key={e} aria-hidden="true" className="invisible truncate">{e}</span>)}
            <span className="truncate">{a}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {s&&<ul ref={f} id={i} role="listbox" tabIndex={-1} style={{maxHeight:p}} className={ea("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",!d&&"transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","absolute z-30 max-h-[264px] w-full min-w-[100%]",b?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {l.map((e,r)=>(
            <li key={e} role="option" aria-selected={e===a} data-index={r} data-highlighted={r===x?"":undefined} onMouseEnter={()=>u(r)} onClick={()=>j(r)} className={ea("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                    <span className="truncate">{e}</span>
                    {e===a&&<span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
                      <HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" />
                    </span>}
                  </li>
          ))}
        </ul>}
      </div>
  );
}


export default function monitoring_3__Sorbet__Component(){
  let[e,a]=useState("Monitoring"),[r,l]=useState(""),[i,s]=useState(ef),{ref:c,edges:d,onScroll:_}=ey(),{ref:x,edges:u,onScroll:b}=ey();
  return useEffect(()=>_(), [i,_]),<div className={ea("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[680px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
    <div className={ea("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto flex min-h-0 w-full max-w-[1000px] flex-1 flex-col gap-1")}>
      <div className="px-4 py-3.5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Icon_36474} size={18} strokeWidth={2} aria-hidden="true" className={ea("text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","shrink-0")} />
              <h2 className={ea("text-[17px]/[22px] font-extrabold","truncate")}>Elevated checkout latency</h2>
            </div>
            <p className={ea(ep,"mt-1 flex flex-wrap gap-x-3")}>
              <span>INC-2841</span>
              <span>opened 09:04</span>
              <span>payments team</span>
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <label htmlFor="monitoring-3-status" className="sr-only">Incident status</label>
            <eN id="monitoring-3-status" value={e} onChange={e=>a(e)} options={ek} />
            <button type="button" className={ea("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>Resolve</button>
          </div>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {eg.map(({label:e,value:a,icon:r})=>(
            <div key={e}>
                        <dt className={ea(em,"flex items-center gap-1.5")}>
                          <HugeiconsIcon icon={r} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                          {e}
                        </dt>
                        <dd className={ea(el,"mt-1")}>{a}</dd>
                      </div>
          ))}
        </dl>
      </div>
      <div className={ea("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","min-h-0 flex-1")}>
        <div className={ea("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8","grid min-h-0 flex-1 gap-px lg:grid-cols-[1fr_280px]")}>
          <div className="flex min-h-[280px] min-w-0 flex-col gap-px lg:min-h-0">
            <div className={ea(er,"relative min-h-0 flex-1")}>
              <div ref={c} onScroll={_} className="h-full overflow-y-auto p-4 pb-6">
                <h3 className={el}>Updates</h3>
                <ol className="mt-3 space-y-4">
                  {i.map((e,a)=>(
                    <li key={e.id} className="relative flex gap-3">
                                        {a<i.length-1&&<span aria-hidden className={ea("border-r border-transparent","absolute top-3.5 -bottom-[30px] left-[13px] w-0")} />}
                                        <span aria-hidden className={ea(ex,"z-10 size-[28px]")}><span className={eu}>{e.initials}</span></span>
                                        <div className="min-w-0 flex-1 py-1">
                                          <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                            <span className={el}>{e.who}</span>
                                            <span className={ea(eo,ej[e.status])}>{e.status}</span>
                                            <span className={ea(es,en)}>{e.at}</span>
                                          </p>
                                          <p className={ea(ei,et,"mt-1")}>{e.body}</p>
                                        </div>
                                      </li>
                  ))}
                </ol>
              </div>
              <div aria-hidden="true" className={ea(eb,"pointer-events-none absolute inset-x-0 top-0 h-8",d.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={ea(eh,"pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={ea(er,"p-2")}>
              <label htmlFor="monitoring-3-update" className="sr-only">Post an update</label>
              <div className={ea("relative flex w-full min-w-0 flex-col rounded-[calc(min(var(--rb-r-6xl,26px),min(var(--rb-r-full,999px),16px)_+_8px))] border border-transparent bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] transition-[box-shadow] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:shadow-[0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent),0_8px_22px_-10px_rgb(84_62_32/0.2)] dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] dark:focus-within:shadow-[0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163)),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","gap-1 p-1")}>
                <textarea id="monitoring-3-update" value={r} onChange={e=>l(e.target.value)} rows={2} placeholder="Post an update for subscribers…" className={ea("max-h-40 min-h-6 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1.5 field-sizing-content text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/55 dark:placeholder:text-neutral-100/55","min-h-12")} />
                <div className="flex items-center justify-between gap-2 ps-1.5">
                  <p className={ea(ep,"truncate")}>Sends to 1,204 status page subscribers</p>
                  <button type="button" onClick={()=>{
                    let a=r.trim();
                    a&&(s(r=>[{id:`n${r.length+1}`,status:e,who:"You",initials:"YO",at:"Just now",body:a},...r]),l(""))
                  }} disabled={!r.trim()} className={ea("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold")}>
                    <HugeiconsIcon icon={Icon_55410} size={18} strokeWidth={2} aria-hidden="true" />
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          <aside className={ea(er,"relative min-h-0")}>
            <div ref={x} onScroll={b} className="h-full overflow-y-auto p-4 pb-6">
              <h3 className={el}>Affected components</h3>
              <ul className="mt-3 space-y-2">
                {ev.map(e=>(
                  <li key={e.name} className="flex items-center justify-between gap-3">
                                    <span className={ea(ei,et,"min-w-0 truncate")}>{e.name}</span>
                                    <span className={ea(eo,ew[e.tone],"shrink-0")}>{e.state}</span>
                                  </li>
                ))}
              </ul>
              <h3 className={ea(el,"mt-5")}>Responders</h3>
              <ul className="mt-3 space-y-2">
                {[{name:"Priya Patel",initials:"PP",role:"Incident lead"},{name:"Theo Park",initials:"TP",role:"Payments"},{name:"Nora Vale",initials:"NV",role:"Comms"}].map(e=>(
                  <li key={e.name} className="flex items-center gap-2.5">
                                    <span aria-hidden className={ea(ex,"size-[28px]")}><span className={eu}>{e.initials}</span></span>
                                    <span className="min-w-0 flex-1">
                                      <span className={ea(ei,"block truncate")}>{e.name}</span>
                                      <span className={ea(es,en,"block truncate")}>{e.role}</span>
                                    </span>
                                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <h3 className={el}>Error budget</h3>
                <div role="progressbar" aria-valuenow={38} aria-valuemin={0} aria-valuemax={100} aria-label="Error budget consumed" className={ea("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","mt-3")}>
                  <div style={{width:"38%"}} className={ea("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","h-full rounded-[inherit]")} />
                </div>
                <p className={ea(ei,et,"mt-2")}>38% of the monthly budget spent by this incident.</p>
              </div>
            </div>
            <div aria-hidden="true" className={ea(eb,"pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={ea(eh,"pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
          </aside>
        </div>
      </div>
    </div>
  </div>;
}
