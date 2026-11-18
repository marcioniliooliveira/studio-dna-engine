/**
 * React Bits Pro — Application UI (filtering-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { key, left, preventDefault, useEffect, useId, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_63188 = [["path",{d:"M22 17.5H2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 12V10.2134C11 9.83272 10.9428 9.70541 10.6497 9.55538C10.0395 9.24292 9.29865 9 8.5 9C7.70135 9 6.96055 9.24292 6.35025 9.55538C6.05721 9.70541 6 9.83272 6 10.2134L6 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 12V10.2134C18 9.83272 17.9428 9.70541 17.6497 9.55538C17.0395 9.24292 16.2987 9 15.5 9C14.7013 9 13.9605 9.24292 13.3503 9.55538C13.0572 9.70541 13 9.83272 13 10.2134L13 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M21 12V7.36057C21 6.66893 21 6.32311 20.8079 5.99653C20.6157 5.66995 20.342 5.50091 19.7944 5.16283C17.5869 3.79978 14.8993 3 12 3C9.10067 3 6.41314 3.79978 4.20558 5.16283C3.65804 5.50091 3.38427 5.66995 3.19213 5.99653C3 6.32311 3 6.66893 3 7.36057V12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_86153 = [["path",{d:"M6 20L5 21M18 20L19 21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M2 12H22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M8 6L10.5 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_10498 = [["path",{d:"M17.5 10.5L19.5 12.5M14 14L16 16M10.5 17.5L12.5 19.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.5355 4.67767C11.9002 3.31296 12.5826 2.6306 13.3438 2.3153C14.3587 1.8949 15.4991 1.8949 16.5141 2.3153C17.2753 2.6306 17.9576 3.31296 19.3223 4.67767C20.687 6.04238 21.3694 6.72474 21.6847 7.48594C22.1051 8.50088 22.1051 9.64126 21.6847 10.6562C21.3694 11.4174 20.687 12.0998 19.3223 13.4645L13.4645 19.3223C12.0998 20.687 11.4174 21.3694 10.6562 21.6847C9.64126 22.1051 8.50088 22.1051 7.48594 21.6847C6.72474 21.3694 6.04238 20.687 4.67767 19.3223C3.31296 17.9576 2.6306 17.2753 2.3153 16.5141C1.8949 15.4991 1.8949 14.3587 2.3153 13.3438C2.6306 12.5826 3.31296 11.9002 4.67767 10.5355L10.5355 4.67767Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  m = "text-neutral-900/66 dark:text-neutral-100/66",
  v = "text-[14px]/[16px] font-[450]",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  f = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  k = "size-8 rounded-[var(--rb-r-sm,6px)]",
  g = "relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40",
  y = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  w = "inline-flex h-7 cursor-pointer items-center rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80 decoration-1 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100",
  j = x("text-[13px]/[18px] font-normal",m),
  N = x("text-[12px]/[16px] font-normal tabular-nums",m);

function D({id:e,value:a,onChange:t,options:o,disabled:d,placeholder:c="Select…",className:u,triggerClassName:b,leading:h,ariaLabel:p}){
  let m=useId(),[v,_]=useState(false),[f,k]=useState(0),[g,y]=useState(false),[w,j]=useState(),D=useRef(null),C=useRef(null),I=useRef({buffer:"",at:0}),A=o.findIndex(e=>e.value===a),M=A>=0?Icon_99199:undefined,S=e=>{
    if(d)return;
    let a=D.current,t=a?.ownerDocument.defaultView;
    if(a&&t){
      let e=a.getBoundingClientRect(),r=0,l=t.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(t.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        r=Math.max(r,a.top),l=Math.min(l,a.bottom);
        break
      }
      let i=l-e.bottom,n=e.top-r,s=Math.min(32*o.length+8,264),d=i<s+8&&n>i,c=(d?n:i)-8;
      y(d),j(c<s?Math.max(c,40):undefined)
    }
    k(e??(A>=0?A:0)),_(true)
  };
  useEffect(()=>{
    if(!v)return;
    let e=D.current,a=e?.ownerDocument;
    if(!a)return;
    let t=a=>{
      e.contains(a.target)||_(false)
    };
    return a.addEventListener("mousedown",t),a.addEventListener("touchstart",t),()=>{
      a.removeEventListener("mousedown",t),a.removeEventListener("touchstart",t)
    };
  }, [v]),useEffect(()=>{
    if(!v)return;
    let e=C.current,a=e?.querySelector(`[data-index="${f}"]`);
    if(!e||!a)return;
    let t=a.offsetTop,r=t+a.offsetHeight;
    t<e.scrollTop?e.scrollTop=t:r>e.scrollTop+e.clientHeight&&(e.scrollTop=r-e.clientHeight)
  }, [v,f]);
  let q=e=>{
    let a=o[e];
    a&&(t(a.value),_(false),D.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={D} className={x("relative",u)}>
        <button id={e} type="button" role="combobox" aria-expanded={v} aria-controls={m} aria-haspopup="listbox" disabled={d} onClick={()=>v?_(false):S()} onKeyDown={e=>{
          if(!d){
            if(!v){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),S());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),_(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),k(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),k(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),k(0);else if("End"===e.key)e.preventDefault(),k(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),q(f);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),t=I.current;
              t.buffer=a-t.at>700?e.key:t.buffer+e.key,t.at=a;
              let r=o.findIndex(e=>e.label.toLowerCase().startsWith(t.buffer.toLowerCase()));
              r>=0&&k(r)
            }
          }
        }} aria-label={p} className={x("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",b)}>
          <span className="flex min-w-0 items-center gap-2">
            {h}
            <span className={x("truncate",!M&&"text-neutral-900/66 dark:text-neutral-100/66")}>{M?M.label:c}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {v&&<ul ref={C} id={m} role="listbox" tabIndex={-1} style={{maxHeight:w}} className={x("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,t)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={t} data-highlighted={t===f||undefined} onMouseEnter={()=>k(t)} onClick={()=>q(t)} className={x("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={x(N,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function C({min:e,max:a,step:t=1,value:i,onChange:n,format:s,labels:o}){
  let d=useRef(null),[c,u]=useState(null),b=r=>Math.min(a,Math.max(e,Math.round(r/t)*t)),h=t=>(t-e)/(a-e)*100,p=t=>{
    let r=d.current;
    if(!r)return e;
    let l=r.getBoundingClientRect();
    return 0===width?e:b(e+(t-left)/width*(a-e));
  },x=(e,a)=>{
    let[t,r]=i;
    0===e?n([Math.min(a,r),r]):n([t,Math.max(a,t)])
  },m=r=>({role:"slider",tabIndex:0,"aria-label":o[r],"aria-valuemin":e,"aria-valuemax":a,"aria-valuenow":i[r],"aria-valuetext":s(i[r]),style:{left:`${h(i[r])}%`,touchAction:"none"},onPointerDown:e=>{
    e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId),u(r)
  },onPointerMove:e=>{
    c===r&&x(r,p(e.clientX))
  },onLostPointerCapture:()=>u(null),onPointerUp:e=>{
    e.currentTarget.releasePointerCapture(e.pointerId),u(null)
  },onKeyDown:l=>{
    let n=Math.max(t,Math.round((a-e)/10)),s=i[r],o=null;
    "ArrowLeft"===key||"ArrowDown"===key?o=s-t:"ArrowRight"===key||"ArrowUp"===key?o=s+t:"PageDown"===key?o=s-n:"PageUp"===key?o=s+n:"Home"===key?o=e:"End"===key&&(o=a),null!==o&&(preventDefault(),x(r,b(o)))
  },className:"absolute top-1/2 block size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] shadow-[0_0_0_2px_white] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:shadow-[0_0_0_2px_var(--color-neutral-900)]"});
  return (
    <div ref={d} onPointerDown={e=>{
        let a=p(e.clientX);
        x(Math.abs(a-i[0])<=Math.abs(a-i[1])?0:1,a)
      }} className="relative flex h-4 w-full cursor-pointer touch-none items-center select-none">
        <div className="relative h-1 w-full grow rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8">
          <span className="absolute inset-y-0 rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))]" style={{left:`${h(i[0])}%`,width:`${h(i[1])-h(i[0])}%`}} />
          <div {...m(0)} />
          <div {...m(1)} />
        </div>
      </div>
  );
}

let I = [{value:"all",label:"All"},{value:"apartment",label:"Apartment"},{value:"house",label:"House"},{value:"condo",label:"Condo"},{value:"studio",label:"Studio"},{value:"townhouse",label:"Townhouse"}],
  A = {apartment:"Apartment",house:"House",condo:"Condo",studio:"Studio",townhouse:"Townhouse"},
  M = [{value:"laundry",label:"Laundry"},{value:"parking",label:"Parking"},{value:"pets",label:"Pets OK"},{value:"dishwasher",label:"Dishwasher"},{value:"ac",label:"Central air"},{value:"balcony",label:"Balcony"},{value:"gym",label:"Gym"},{value:"doorman",label:"Doorman"},{value:"elevator",label:"Elevator"},{value:"hardwood",label:"Hardwood"}],
  S = Object.fromEntries(M.map(e=>[e.value,e.label])),
  q = [{value:"any",label:"Any time"},{value:"30",label:"Within 30 days"},{value:"60",label:"Within 60 days"},{value:"90",label:"Within 90 days"}],
  B = e=>`$${e.toLocaleString("en-US")}`,
  z = [{id:"r01",title:"Sunlit corner one-bed",neighbourhood:"Mission District",type:"apartment",beds:1,baths:1,sqft:720,price:2650,availableInDays:12,amenities:["laundry","dishwasher","hardwood","elevator"]},{id:"r02",title:"Renovated garden flat",neighbourhood:"Noe Valley",type:"apartment",beds:2,baths:1,sqft:940,price:3450,availableInDays:45,amenities:["parking","pets","dishwasher","balcony"]},{id:"r03",title:"Compact studio near transit",neighbourhood:"SoMa",type:"studio",beds:0,baths:1,sqft:460,price:1950,availableInDays:7,amenities:["laundry","gym","elevator","doorman"]},{id:"r04",title:"Craftsman three-bed house",neighbourhood:"Bernal Heights",type:"house",beds:3,baths:2,sqft:1680,price:5200,availableInDays:60,amenities:["parking","pets","ac","hardwood","dishwasher"]},{id:"r05",title:"Bright top-floor condo",neighbourhood:"Hayes Valley",type:"condo",beds:2,baths:2,sqft:1120,price:4100,availableInDays:21,amenities:["gym","elevator","doorman","balcony","ac"]},{id:"r06",title:"Quiet studio with alcove",neighbourhood:"Inner Richmond",type:"studio",beds:0,baths:1,sqft:500,price:2100,availableInDays:30,amenities:["hardwood","elevator"]},{id:"r07",title:"Modern townhouse end unit",neighbourhood:"Dogpatch",type:"townhouse",beds:3,baths:3,sqft:1740,price:5650,availableInDays:75,amenities:["parking","laundry","ac","balcony","dishwasher"]},{id:"r08",title:"Classic Edwardian one-bed",neighbourhood:"Pacific Heights",type:"apartment",beds:1,baths:1,sqft:780,price:3100,availableInDays:18,amenities:["hardwood","pets","dishwasher"]},{id:"r09",title:"Family four-bed with yard",neighbourhood:"Outer Sunset",type:"house",beds:4,baths:3,sqft:2200,price:6e3,availableInDays:90,amenities:["parking","pets","laundry","ac","dishwasher","hardwood"]},{id:"r10",title:"Loft-style two-bed",neighbourhood:"Potrero Hill",type:"condo",beds:2,baths:2,sqft:1180,price:4300,availableInDays:40,amenities:["gym","elevator","parking","balcony"]},{id:"r11",title:"Cozy junior studio",neighbourhood:"Nob Hill",type:"studio",beds:0,baths:1,sqft:420,price:1850,availableInDays:9,amenities:["laundry","elevator","doorman"]},{id:"r12",title:"Updated two-bed apartment",neighbourhood:"Cole Valley",type:"apartment",beds:2,baths:1,sqft:900,price:3300,availableInDays:33,amenities:["dishwasher","hardwood","pets","laundry"]},{id:"r13",title:"Split-level townhouse",neighbourhood:"Glen Park",type:"townhouse",beds:2,baths:2,sqft:1360,price:4650,availableInDays:55,amenities:["parking","ac","balcony","dishwasher"]},{id:"r14",title:"Penthouse-floor condo",neighbourhood:"Rincon Hill",type:"condo",beds:1,baths:1,sqft:820,price:3800,availableInDays:15,amenities:["gym","doorman","elevator","ac","balcony"]},{id:"r15",title:"Bungalow with home office",neighbourhood:"Excelsior",type:"house",beds:3,baths:2,sqft:1560,price:4400,availableInDays:48,amenities:["parking","pets","hardwood","laundry"]},{id:"r16",title:"Airy one-bed near park",neighbourhood:"Duboce Triangle",type:"apartment",beds:1,baths:1,sqft:690,price:2850,availableInDays:24,amenities:["hardwood","dishwasher","elevator"]},{id:"r17",title:"Roomy studio conversion",neighbourhood:"Tenderloin",type:"studio",beds:0,baths:1,sqft:540,price:1700,availableInDays:5,amenities:["laundry","elevator"]},{id:"r18",title:"Two-bed with private deck",neighbourhood:"Bernal Heights",type:"apartment",beds:2,baths:2,sqft:1050,price:3900,availableInDays:36,amenities:["balcony","pets","dishwasher","hardwood","parking"]},{id:"r19",title:"Detached three-bed home",neighbourhood:"West Portal",type:"house",beds:3,baths:2,sqft:1820,price:5100,availableInDays:70,amenities:["parking","ac","laundry","dishwasher"]},{id:"r20",title:"Corner townhouse with garage",neighbourhood:"Mission Bay",type:"townhouse",beds:4,baths:3,sqft:2050,price:5900,availableInDays:82,amenities:["parking","gym","elevator","ac","balcony","dishwasher"]},{id:"r21",title:"Light-filled loft condo",neighbourhood:"SoMa",type:"condo",beds:1,baths:1,sqft:760,price:3550,availableInDays:20,amenities:["gym","doorman","elevator","hardwood"]},{id:"r22",title:"Two-bed garden apartment",neighbourhood:"Inner Sunset",type:"apartment",beds:2,baths:1,sqft:970,price:3600,availableInDays:52,amenities:["pets","laundry","dishwasher","balcony"]}],
  E = {type:"all",minBeds:0,minBaths:0,price:[1e3,6e3],amenities:[],availability:"any"},
  P = (e,a,t)=>!("type"!==t&&"all"!==a.type&&e.type!==a.type||"minBeds"!==t&&e.beds<a.minBeds||"minBaths"!==t&&e.baths<a.minBaths||"price"!==t&&(e.price<a.price[0]||e.price>a.price[1])||"availability"!==t&&"any"!==a.availability&&e.availableInDays>Number(a.availability))&&("amenities"===t||!a.amenities.length||!!a.amenities.every(a=>e.amenities.includes(a)));

function H({label:e,value:a,max:t,onChange:l,icon:n}){
  let s=0===a?"Any":`${a}+`;
  return (
    <div className="flex items-center justify-between gap-3">
        <span className="flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">
          <span className={m}>{n}</span>
          {e}
        </span>
        <div className="flex items-center gap-2">
          <button type="button" aria-label={`Decrease minimum ${e.toLowerCase()}`} disabled={0===a} onClick={()=>l(Math.max(0,a-1))} className={x(_,k)}>
            <HugeiconsIcon icon={Icon_99199} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <span className={x(v,"w-10 text-center tabular-nums")}>{s}</span>
          <button type="button" aria-label={`Increase minimum ${e.toLowerCase()}`} disabled={a===t} onClick={()=>l(Math.min(t,a+1))} className={x(_,k)}>
            <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
  );
}

function W({label:e,children:a}){
  return (
    <section className="py-5 first:pt-0">
        <h3 className={x(v,"mb-3")}>{e}</h3>
        {a}
      </section>
  );
}

function L(){
  let[e,a]=useState(E),[t,n]=useState(false),o=e=>a(a=>({...a,amenities:a.amenities.includes(e)?a.amenities.filter(a=>a!==e):[...a.amenities,e]})),d=useMemo(()=>z.filter(a=>P(a,e)).sort((e,a)=>e.price-a.price), [e]),k=1e3!==e.price[0]||6e3!==e.price[1],L=[..."all"!==e.type?[{key:"type",label:A[e.type]??e.type,clear:()=>a(e=>({...e,type:"all"}))}]:[],...e.minBeds>0?[{key:"beds",label:`${e.minBeds}+ beds`,clear:()=>a(e=>({...e,minBeds:0}))}]:[],...e.minBaths>0?[{key:"baths",label:`${e.minBaths}+ baths`,clear:()=>a(e=>({...e,minBaths:0}))}]:[],...k?[{key:"price",label:`${B(e.price[0])} – ${B(e.price[1])}`,clear:()=>a(e=>({...e,price:[1e3,6e3]}))}]:[],..."any"!==e.availability?[{key:"availability",label:q.find(a=>a.value===e.availability)?.label??e.availability,clear:()=>a(e=>({...e,availability:"any"}))}]:[],...e.amenities.map(e=>({key:`amenity:${e}`,label:S[e]??e,clear:()=>o(e)}))],R=<div className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
    <W label="Property type">
      <div className="flex flex-wrap gap-1.5">
        {I.map(t=>{
          let l=e.type===t.value;
          return <button key={t.value} type="button" aria-pressed={l} onClick={()=>a(e=>({...e,type:t.value}))} className={g}>{t.label}</button>;
        })}
      </div>
    </W>
    <W label="Rooms">
      <div className="space-y-3">
        <H label="Beds" value={e.minBeds} max={4} onChange={e=>a(a=>({...a,minBeds:e}))} icon={<HugeiconsIcon icon={Icon_63188} size={16} strokeWidth={1.8} aria-hidden="true" />} />
        <H label="Baths" value={e.minBaths} max={3} onChange={e=>a(a=>({...a,minBaths:e}))} icon={<HugeiconsIcon icon={Icon_86153} size={16} strokeWidth={1.8} aria-hidden="true" />} />
      </div>
    </W>
    <W label="Monthly rent">
      <div className="mb-4 flex min-h-7 items-center justify-between">
        <span className={x(v,"tabular-nums")}>
          {B(e.price[0])}
          {" – "}
          {B(e.price[1])}
          {6e3===e.price[1]?"+":""}
        </span>
        {k&&<button type="button" onClick={()=>a(e=>({...e,price:[1e3,6e3]}))} className={w}>Reset</button>}
      </div>
      <C min={1e3} max={6e3} step={50} value={e.price} onChange={e=>a(a=>({...a,price:e}))} format={B} labels={["Minimum rent","Maximum rent"]} />
    </W>
    <W label="Amenities">
      <ul className="-mx-2 grid grid-cols-1 gap-x-2 gap-y-0.5 sm:grid-cols-2">
        {M.map(a=>{
          let t,l=e.amenities.includes(a.value),n=(t=a.value,z.filter(a=>P(a,e,"amenities")&&a.amenities.includes(t)).length);
          return (
            <li key={a.value}>
                        <label className={x("flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",0===n&&!l&&"opacity-40")}>
                          <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                            <input type="checkbox" checked={l} onChange={()=>o(a.value)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                            <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{a.label}</span>
                          <span className={x("ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","shrink-0")}>{n}</span>
                        </label>
                      </li>
          );
        })}
      </ul>
    </W>
    <W label="Available from">
      <D value={e.availability} onChange={e=>a(a=>({...a,availability:e}))} options={q} ariaLabel="Available from" />
    </W>
  </div>;
  return (
    <div className={x("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[920px] w-full flex-col overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col">
          <header className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Rentals in San Francisco</h2>
              <p className={x(j,"mt-1")}>
                <span className="tabular-nums">{d.length}</span>
                {" of"}
                {" "}
                <span className="tabular-nums">{z.length}</span>
                {" homes match"}
              </p>
            </div>
            <button type="button" aria-expanded={t} onClick={()=>n(e=>!e)} className={x(_,f,"md:hidden")}>
              <HugeiconsIcon icon={Icon_68656} size={16} strokeWidth={1.8} aria-hidden="true" />
              Filters
              {L.length>0&&<span className="tabular-nums">
                (
                {L.length}
                )
              </span>}
            </button>
          </header>
          <div className="mt-6 flex flex-1 flex-col gap-6 md:flex-row md:gap-8">
            <aside className={x("w-full shrink-0 md:block md:w-[320px]",t?"block":"hidden")}>{R}</aside>
            <div className="flex min-w-0 flex-1 flex-col">
              {L.length>0&&<div className="mb-4 flex flex-wrap items-center gap-2">
                {L.map(e=>(
                  <span key={e.key} className={g}>
                                {e.label}
                                <button type="button" aria-label={`Remove ${e.label} filter`} onClick={e.clear} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                                  <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                                </button>
                              </span>
                ))}
                <button type="button" onClick={()=>a(E)} className={w}>Clear all</button>
              </div>}
              {0===d.length?<div className={x(y,"flex-1 items-center justify-center px-6 py-16 text-center")}>
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No rentals match these filters</p>
                <p className={x("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-[300px]")}>Try fewer amenities, lower the bed or bath minimum, or widen the rent range.</p>
                <button type="button" onClick={()=>a(E)} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",f,"mt-5")}>Clear all filters</button>
              </div>:<ul className="space-y-2">
                {d.map(e=>(
                  <li key={e.id}>
                                <article className={x(y,"cursor-pointer")}>
                                  <div className="flex items-center gap-4 px-4 py-3">
                                    <div className="min-w-0 flex-1">
                                      <p className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{e.title}</p>
                                      <p className={x(N,"mt-0.5 flex min-w-0 gap-x-3")}>
                                        <span className="truncate">{e.neighbourhood}</span>
                                        <span className="shrink-0">{A[e.type]}</span>
                                      </p>
                                    </div>
                                    <div className={x(N,"hidden shrink-0 items-center gap-4 sm:flex")}>
                                      <span className="inline-flex min-w-[56px] items-center gap-1.5">
                                        <HugeiconsIcon icon={Icon_63188} size={14} strokeWidth={1.8} aria-hidden="true" />
                                        {0===e.beds?"Studio":e.beds}
                                      </span>
                                      <span className="inline-flex min-w-[28px] items-center gap-1.5">
                                        <HugeiconsIcon icon={Icon_86153} size={14} strokeWidth={1.8} aria-hidden="true" />
                                        {e.baths}
                                      </span>
                                      <span className="inline-flex min-w-[80px] items-center gap-1.5">
                                        <HugeiconsIcon icon={Icon_10498} size={14} strokeWidth={1.8} aria-hidden="true" />
                                        {e.sqft.toLocaleString("en-US")}
                                        {" sqft"}
                                      </span>
                                    </div>
                                    <div className="min-w-[88px] shrink-0 text-right">
                                      <p className={x(v,"tabular-nums")}>
                                        {B(e.price)}
                                        <span className={m}>/mo</span>
                                      </p>
                                      <p className={x(N,"mt-0.5")}>{e.availableInDays<=14?"Available now":`In ${e.availableInDays} days`}</p>
                                    </div>
                                  </div>
                                </article>
                              </li>
                ))}
              </ul>}
            </div>
          </div>
        </div>
      </div>
  );
}


export default L;
