/**
 * React Bits Pro — Application UI (monitoring-7 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_36048 = [["path",{d:"M19 4H5C4.06812 4 3.60218 4 3.23463 4.15224C2.74458 4.35523 2.35523 4.74458 2.15224 5.23463C2 5.60218 2 6.06812 2 7C2 7.93188 2 8.39782 2.15224 8.76537C2.35523 9.25542 2.74458 9.64477 3.23463 9.84776C3.60218 10 4.06812 10 5 10H19C19.9319 10 20.3978 10 20.7654 9.84776C21.2554 9.64477 21.6448 9.25542 21.8478 8.76537C22 8.39782 22 7.93188 22 7C22 6.06812 22 5.60218 21.8478 5.23463C21.6448 4.74458 21.2554 4.35523 20.7654 4.15224C20.3978 4 19.9319 4 19 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 14H5C4.06812 14 3.60218 14 3.23463 14.1522C2.74458 14.3552 2.35523 14.7446 2.15224 15.2346C2 15.6022 2 16.0681 2 17C2 17.9319 2 18.3978 2.15224 18.7654C2.35523 19.2554 2.74458 19.6448 3.23463 19.8478C3.60218 20 4.06812 20 5 20H19C19.9319 20 20.3978 20 20.7654 19.8478C21.2554 19.6448 21.6448 19.2554 21.8478 18.7654C22 18.3978 22 17.9319 22 17C22 16.0681 22 15.6022 21.8478 15.2346C21.6448 14.7446 21.2554 14.3552 20.7654 14.1522C20.3978 14 19.9319 14 19 14Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.125 7H6M6.25 7C6.25 7.13807 6.13807 7.25 6 7.25C5.86193 7.25 5.75 7.13807 5.75 7C5.75 6.86193 5.86193 6.75 6 6.75C6.13807 6.75 6.25 6.86193 6.25 7Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10.125 7H10M10.25 7C10.25 7.13807 10.1381 7.25 10 7.25C9.86193 7.25 9.75 7.13807 9.75 7C9.75 6.86193 9.86193 6.75 10 6.75C10.1381 6.75 10.25 6.86193 10.25 7Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M6.125 17H6M6.25 17C6.25 17.1381 6.13807 17.25 6 17.25C5.86193 17.25 5.75 17.1381 5.75 17C5.75 16.8619 5.86193 16.75 6 16.75C6.13807 16.75 6.25 16.8619 6.25 17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10.125 17H10M10.25 17C10.25 17.1381 10.1381 17.25 10 17.25C9.86193 17.25 9.75 17.1381 9.75 17C9.75 16.8619 9.86193 16.75 10 16.75C10.1381 16.75 10.25 16.8619 10.25 17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];

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

let al = (...e)=>e.filter(Boolean).join(" ");

let ai = "text-neutral-900/78 dark:text-neutral-100/78";

let as = "text-neutral-900/62 dark:text-neutral-100/62";

let ao = "text-[14px]/[20px] font-medium";

let ac = "text-[13px]/[16px] font-semibold tabular-nums";

let ad = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let a_ = "-mx-1.5 inline-flex h-8 min-w-0 cursor-pointer items-center gap-1 rounded-[calc(var(--rb-r-full,999px))] px-1.5 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 data-sorted:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:data-sorted:text-neutral-100";

let ax = al(ao,as);

let au = [{id:"h1",name:"api-eu-01",role:"API",region:"eu-west-1",cpu:44,mem:62,disk:38,uptime:"34d",state:"healthy",note:"Serving 1.2k req/s with headroom on every dimension."},{id:"h2",name:"api-eu-02",role:"API",region:"eu-west-1",cpu:91,mem:78,disk:41,uptime:"34d",state:"critical",note:"CPU has been pinned above 88% for 22 minutes. Shed traffic or add a node."},{id:"h3",name:"worker-eu-01",role:"Worker",region:"eu-west-1",cpu:58,mem:71,disk:55,uptime:"12d",state:"healthy",note:"Draining the invoice backlog at 340 jobs per minute."},{id:"h4",name:"worker-us-01",role:"Worker",region:"us-east-1",cpu:36,mem:49,disk:87,uptime:"61d",state:"warning",note:"Disk at 87%. Rotate the job archive older than 30 days."},{id:"h5",name:"db-primary",role:"Database",region:"eu-west-1",cpu:52,mem:84,disk:66,uptime:"128d",state:"warning",note:"Buffer cache is under pressure during the nightly vacuum window."},{id:"h6",name:"db-replica-01",role:"Database",region:"us-east-1",cpu:21,mem:47,disk:64,uptime:"128d",state:"healthy",note:"Replication lag steady at 0.4s."},{id:"h7",name:"cache-eu-01",role:"Cache",region:"eu-west-1",cpu:18,mem:33,disk:12,uptime:"77d",state:"healthy",note:"Hit ratio 97.4% across the catalog keyspace."},{id:"h8",name:"edge-ap-01",role:"Edge",region:"ap-south-1",cpu:29,mem:41,disk:22,uptime:"9d",state:"healthy",note:"Newest node in the fleet, added during the Mumbai rollout."}];

let ab = ["All regions","eu-west-1","us-east-1","ap-south-1"];

let ah = {healthy:"text-neutral-900/78 dark:text-neutral-100/78",warning:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",critical:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

let ap = {healthy:"Healthy",warning:"Warning",critical:"Critical"};

function am({id:e,value:a,onChange:r,options:l}){
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
        {s&&<ul ref={f} id={i} role="listbox" tabIndex={-1} style={{maxHeight:p}} className={al("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",!d&&"transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","absolute z-30 max-h-[264px] w-full min-w-[100%]",b?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {l.map((e,r)=>(
            <li key={e} role="option" aria-selected={e===a} data-index={r} data-highlighted={r===x?"":undefined} onMouseEnter={()=>u(r)} onClick={()=>j(r)} className={al("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
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

function ak({label:e,value:a}){
  let r=a>=85,n=a>=70;
  return (
    <div className="min-w-[64px]">
        <div className="flex items-baseline justify-between gap-2">
          <span className={al(ac,as)}>{e}</span>
          <span className={al(ac,r?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":ai)}>
            {a}
            %
          </span>
        </div>
        <div role="progressbar" aria-valuenow={a} aria-valuemin={0} aria-valuemax={100} aria-label={e} className={al("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","mt-1")}>
          <div style={{width:`${a}%`}} className={r?al("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","h-full rounded-[inherit]"):n?al("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","h-full rounded-[inherit]"):"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]"} />
        </div>
      </div>
  );
}


export default function monitoring_7__Sorbet__Component(){
  let[e,a]=useState(""),[r,l]=useState(ab[0]),[i,s]=useState({key:"cpu",asc:false}),[c,d]=useState("h2"),{ref:_,edges:x,onScroll:u}=function(){
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
  }(),b=useMemo(()=>{
    let a=e.trim().toLowerCase(),t=au.filter(e=>(r===ab[0]||e.region===r)&&(!a||e.name.toLowerCase().includes(a)||e.role.toLowerCase().includes(a))),n=i.asc?1:-1;
    return [...t].sort((e,a)=>"name"===i.key?e.name.localeCompare(a.name)*n:(e[i.key]-a[i.key])*n);
  }, [e,r,i]);
  useEffect(()=>u(), [b,c,u]);
  let h=au.filter(e=>"healthy"!==e.state).length,p=e=>s(a=>a.key===e?{key:e,asc:!a.asc}:{key:e,asc:false}),m=e=>i.key===e?i.asc?Icon_40972:Icon_54345:Icon_31517;
  return (
    <div className={al("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[760px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={al("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col gap-1")}>
          <div className="px-4 py-3.5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className={al("text-[17px]/[22px] font-extrabold","truncate")}>Fleet</h2>
                <p className={al(ax,"mt-0.5 flex flex-wrap gap-x-3")}>
                  <span>
                    {au.length}
                    {" nodes"}
                  </span>
                  <span>
                    {h}
                    {" need attention"}
                  </span>
                  <span>sampled 30s ago</span>
                </p>
              </div>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <label htmlFor="monitoring-7-region" className="sr-only">Region</label>
                <am id="monitoring-7-region" value={r} onChange={l} options={ab} />
                <div className="relative w-full sm:w-[200px]">
                  <label htmlFor="monitoring-7-search" className="sr-only">Search hosts</label>
                  <div className={al("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10")}>
                    <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                      <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <input id="monitoring-7-search" value={e} onChange={e=>a(e.target.value)} placeholder="Search host or role" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={al("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative min-h-0 flex-1")}>
            <div ref={_} onScroll={u} className="h-full overflow-y-auto">
              {0===b.length?<div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                <HugeiconsIcon icon={Icon_36048} size={24} strokeWidth={2} aria-hidden="true" className={as} />
                <p className={al("text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100","mt-3")}>No matching nodes</p>
                <p className={al("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>Adjust the region filter or clear the search.</p>
              </div>:<table className="w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium">
                <thead>
                  <tr>
                    <th scope="col" aria-sort={"name"===i.key?i.asc?"ascending":"descending":"none"} className={ad}>
                      <button type="button" onClick={()=>p("name")} data-sorted={"name"===i.key?"":undefined} className={a_}>
                        Node
                        <HugeiconsIcon icon={m("name")} size={14} strokeWidth={2} aria-hidden="true" />
                      </button>
                    </th>
                    <th scope="col" className={al(ad,"hidden w-[120px] sm:table-cell md:w-[104px]")}>Status</th>
                    {[{key:"cpu",label:"CPU",cls:"hidden w-[132px] md:table-cell"},{key:"mem",label:"Memory",cls:"hidden w-[148px] md:table-cell lg:w-[132px]"},{key:"disk",label:"Disk",cls:"hidden w-[148px] lg:table-cell xl:w-[132px]"}].map(e=>(
                      <th key={e.key} scope="col" aria-sort={i.key===e.key?i.asc?"ascending":"descending":"none"} className={al(ad,e.cls)}>
                                        <button type="button" onClick={()=>p(e.key)} data-sorted={i.key===e.key?"":undefined} className={a_}>
                                          {e.label}
                                          <HugeiconsIcon icon={m(e.key)} size={14} strokeWidth={2} aria-hidden="true" />
                                        </button>
                                      </th>
                    ))}
                    <th scope="col" className={al(ad,"hidden w-[100px] xl:table-cell")}><span className="block text-right">Uptime</span></th>
                  </tr>
                </thead>
                <tbody>
                  {b.map(e=>(
                    <tr key={e.id} aria-selected={c===e.id} className="group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]">
                                    <td colSpan={6} className="h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6">
                                      <button type="button" aria-expanded={c===e.id} onClick={()=>d(c===e.id?null:e.id)} className={al("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","block w-full cursor-pointer text-left")}>
                                        <span className="flex items-center gap-3 py-2.5">
                                          <span className="min-w-0 flex-1">
                                            <span className={al("text-[15px]/[20px] font-bold","block truncate")}>{e.name}</span>
                                            <span className={al(ax,"mt-0.5 flex min-w-0 gap-x-3")}>
                                              <span className="truncate">{e.role}</span>
                                              <span className="truncate">{e.region}</span>
                                            </span>
                                          </span>
                                          <span className={al("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",ah[e.state],"w-[92px] shrink-0 max-sm:hidden")}>{ap[e.state]}</span>
                                          <span className="hidden w-[120px] shrink-0 md:block"><ak label="CPU" value={e.cpu} /></span>
                                          <span className="hidden w-[120px] shrink-0 md:block"><ak label="Memory" value={e.mem} /></span>
                                          <span className="hidden w-[120px] shrink-0 lg:block"><ak label="Disk" value={e.disk} /></span>
                                          <span className={al(ac,as,"hidden w-[72px] shrink-0 text-right xl:block")}>{e.uptime}</span>
                                        </span>
                                      </button>
                                      {c===e.id&&<p className={al(ao,ai,"pb-3 whitespace-normal")}>{e.note}</p>}
                                    </td>
                                  </tr>
                  ))}
                </tbody>
              </table>}
            </div>
            <div aria-hidden="true" className={al("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",x.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={al("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",x.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={al("flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5","flex-wrap justify-between")}>
            <p className="text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">
              {"Showing "}
              {b.length}
              {" of "}
              {au.length}
              {" nodes"}
            </p>
            <p>Metrics refresh every 30 seconds</p>
          </div>
        </div>
      </div>
  );
}
