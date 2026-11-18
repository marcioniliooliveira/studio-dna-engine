/**
 * React Bits Pro — Application UI (filtering-8)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { key, left, preventDefault, useEffect, useId, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40296 = [["path",{d:"M10.637 16.8238L20.3868 7.07406C20.7794 6.68143 21 6.1489 21 5.59363C21 4.43735 20.0626 3.5 18.9064 3.5C18.3511 3.5 17.8186 3.72058 17.4259 4.11321L7.67619 13.863H5.63905C5.2648 13.863 5.07768 13.863 4.89646 13.8971C4.7879 13.9176 4.68124 13.9471 4.57761 13.9854C4.40465 14.0494 4.24419 14.1457 3.92328 14.3382C3.34739 14.6837 3.05945 14.8565 3.01249 15.0613C2.98553 15.1788 3.00255 15.3021 3.06032 15.408C3.16096 15.5924 3.48493 15.6807 4.13286 15.8574L7.67619 16.8238L8.64256 20.3671C8.81926 21.0151 8.90762 21.339 9.09202 21.4397C9.19787 21.4975 9.3212 21.5145 9.43874 21.4875C9.6435 21.4406 9.81626 21.1526 10.1618 20.5767C10.3543 20.2558 10.4506 20.0954 10.5146 19.9224C10.5529 19.8188 10.5824 19.7121 10.6029 19.6035C10.637 19.4223 10.637 19.2352 10.637 18.861V16.8238Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 10V17.9457C17.5 18.6356 17.3125 19.3125 16.9575 19.9041C16.5581 20.5698 15.5727 20.5029 15.2669 19.7893L13 14.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 7H6.55434C5.86444 7 5.18751 7.1875 4.59592 7.54245C3.93025 7.94186 3.99713 8.92734 4.71066 9.23314L10 11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[16px]/[22px] font-normal tracking-[-0.01em]",
  h = "text-[13px]/[18px] font-normal",
  _ = "text-[14px]/[16px] font-[450]",
  k = "text-[12px]/[16px] font-normal tabular-nums",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  m = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  g = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  w = "ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66",
  y = "inline-flex h-7 cursor-pointer items-center rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80 decoration-1 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100";

function j({id:e,value:r,onChange:a,options:o,disabled:d,placeholder:c="Select…",className:b,triggerClassName:x,leading:h,ariaLabel:_}){
  let f=useId(),[v,m]=useState(false),[g,w]=useState(0),[y,j]=useState(false),[N,C]=useState(),O=useRef(null),S=useRef(null),M=useRef({buffer:"",at:0}),z=o.findIndex(e=>e.value===r),A=z>=0?o[z]:undefined,D=e=>{
    if(d)return;
    let r=O.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,n=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),n=Math.min(n,r.bottom);
        break
      }
      let l=n-e.bottom,i=e.top-t,s=Math.min(32*o.length+8,264),d=l<s+8&&i>l,c=(d?i:l)-8;
      j(d),C(c<s?Math.max(c,40):undefined)
    }
    w(e??(z>=0?z:0)),m(true)
  };
  useEffect(()=>{
    if(!v)return;
    let e=O.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||m(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [v]),useEffect(()=>{
    if(!v)return;
    let e=S.current,r=e?.querySelector(`[data-index="${g}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [v,g]);
  let E=e=>{
    let r=o[e];
    r&&(a(r.value),m(false),O.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={O} className={u("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={v} aria-controls={f} aria-haspopup="listbox" disabled={d} onClick={()=>v?m(false):D()} onKeyDown={e=>{
          if(!d){
            if(!v){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),D());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),m(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),w(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),w(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),w(0);else if("End"===e.key)e.preventDefault(),w(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),E(g);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=M.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=o.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&w(t)
            }
          }
        }} aria-label={_} className={u("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",x)}>
          <span className="flex min-w-0 items-center gap-2">
            {h}
            <span className={u("truncate",!A&&"text-neutral-900/66 dark:text-neutral-100/66")}>{A?A.label:c}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {v&&<ul ref={S} id={f} role="listbox" tabIndex={-1} style={{maxHeight:N}} className={u("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",y?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,a)=>{
            let n=e.value===r;
            return (
              <li key={e.value} role="option" aria-selected={n} data-index={a} data-highlighted={a===g||undefined} onMouseEnter={()=>w(a)} onClick={()=>E(a)} className={u("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={u(k,p,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function N({min:e,max:r,step:a=1,value:l,onChange:i,format:s,labels:o}){
  let d=useRef(null),[c,u]=useState(null),b=t=>Math.min(r,Math.max(e,Math.round(t/a)*a)),p=a=>(a-e)/(r-e)*100,x=a=>{
    let t=d.current;
    if(!t)return e;
    let n=t.getBoundingClientRect();
    return 0===width?e:b(e+(a-left)/width*(r-e));
  },h=(e,r)=>{
    let[a,t]=l;
    0===e?i([Math.min(r,t),t]):i([a,Math.max(r,a)])
  },_=t=>({role:"slider",tabIndex:0,"aria-label":o[t],"aria-valuemin":e,"aria-valuemax":r,"aria-valuenow":l[t],"aria-valuetext":s(l[t]),style:{left:`${p(l[t])}%`,touchAction:"none"},onPointerDown:e=>{
    e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId),u(t)
  },onPointerMove:e=>{
    c===t&&h(t,x(e.clientX))
  },onLostPointerCapture:()=>u(null),onPointerUp:e=>{
    e.currentTarget.releasePointerCapture(e.pointerId),u(null)
  },onKeyDown:n=>{
    let i=Math.max(a,Math.round((r-e)/10)),s=l[t],o=null;
    "ArrowLeft"===key||"ArrowDown"===key?o=s-a:"ArrowRight"===key||"ArrowUp"===key?o=s+a:"PageDown"===key?o=s-i:"PageUp"===key?o=s+i:"Home"===key?o=e:"End"===key&&(o=r),null!==o&&(preventDefault(),h(t,b(o)))
  },className:"absolute top-1/2 block size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] shadow-[0_0_0_2px_white] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:shadow-[0_0_0_2px_var(--color-neutral-900)]"});
  return (
    <div ref={d} onPointerDown={e=>{
        let r=x(e.clientX);
        h(Math.abs(r-l[0])<=Math.abs(r-l[1])?0:1,r)
      }} className="relative flex h-4 w-full cursor-pointer touch-none items-center select-none">
        <span className="relative h-1 w-full grow rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8">
          <span className="absolute inset-y-0 rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))]" style={{left:`${p(l[0])}%`,width:`${p(l[1])-p(l[0])}%`}} />
        </span>
        <div {..._(0)} />
        <div {..._(1)} />
      </div>
  );
}

let C = [{value:"NW",label:"Northwind"},{value:"SV",label:"Silverline"},{value:"AP",label:"Apex Air"},{value:"CN",label:"Cascade"},{value:"MR",label:"Meridian"}],
  O = [{value:"any",label:"Any number of stops"},{value:"0",label:"Nonstop only"},{value:"1",label:"1 stop or fewer"},{value:"2",label:"2 stops or fewer"}],
  S = [{id:"f1",airline:"NW",depart:360,duration:330,stops:0,price:289,carryOn:true},{id:"f2",airline:"SV",depart:465,duration:335,stops:0,price:312,carryOn:true},{id:"f3",airline:"AP",depart:420,duration:470,stops:1,price:214,carryOn:false},{id:"f4",airline:"CN",depart:540,duration:505,stops:1,price:198,carryOn:true},{id:"f5",airline:"MR",depart:600,duration:340,stops:0,price:358,carryOn:true},{id:"f6",airline:"NW",depart:690,duration:455,stops:1,price:231,carryOn:false},{id:"f7",airline:"SV",depart:300,duration:620,stops:2,price:176,carryOn:false},{id:"f8",airline:"AP",depart:780,duration:345,stops:0,price:334,carryOn:true},{id:"f9",airline:"CN",depart:855,duration:590,stops:2,price:189,carryOn:false},{id:"f10",airline:"MR",depart:930,duration:480,stops:1,price:256,carryOn:true},{id:"f11",airline:"NW",depart:1020,duration:335,stops:0,price:372,carryOn:true},{id:"f12",airline:"SV",depart:1080,duration:500,stops:1,price:243,carryOn:false},{id:"f13",airline:"AP",depart:1170,duration:350,stops:0,price:298,carryOn:true},{id:"f14",airline:"CN",depart:1260,duration:610,stops:2,price:167,carryOn:false},{id:"f15",airline:"MR",depart:1320,duration:355,stops:0,price:405,carryOn:true}],
  M = [{value:"cheapest",label:"Cheapest"},{value:"fastest",label:"Fastest"},{value:"earliest",label:"Earliest departure"}],
  z = e=>e.toString().padStart(2,"0"),
  A = e=>{
  let r=(e%1440+1440)%1440;
  return `${z(Math.floor(r/60))}:${z(r%60)}`;
},
  D = e=>1440===e?"24:00":A(e),
  E = e=>{
  let r=Math.floor(e/60),a=e%60;
  return 0===a?`${r}h`:`${r}h ${a}m`;
},
  $ = e=>`$${e}`,
  P = {stops:"any",depart:[0,1440],duration:[300,660],airlines:[],carryOn:false},
  R = (e,r,a)=>{
  if("stops"!==a&&"any"!==r.stops){
    let a=Number(r.stops);
    if(0===a?0!==e.stops:e.stops>a)return false;
  }
  return ("depart"===a||!(e.depart<r.depart[0])&&!(e.depart>r.depart[1]))&&("duration"===a||!(e.duration<r.duration[0])&&!(e.duration>r.duration[1]))&&("airlines"===a||!r.airlines.length||!!r.airlines.includes(e.airline))&&("carryOn"===a||!r.carryOn||!!e.carryOn);
};

function W({label:e,children:r}){
  return (
    <section className="py-5 first:pt-0">
        <h3 className={u(_,b,"mb-3")}>{e}</h3>
        {r}
      </section>
  );
}

function L(){
  let[e,r]=useState(P),[a,i]=useState("cheapest"),[z,L]=useState(null),[T,F]=useState(false),H=useMemo(()=>{
    let r=S.filter(r=>R(r,e));
    return "fastest"===a?[...r].sort((e,r)=>e.duration-r.duration):"earliest"===a?[...r].sort((e,r)=>e.depart-r.depart):[...r].sort((e,r)=>e.price-r.price);
  }, [e,a]),I=S.filter(r=>R(r,e,"carryOn")&&r.carryOn).length,U=e=>r(r=>({...r,airlines:r.airlines.includes(e)?r.airlines.filter(r=>r!==e):[...r.airlines,e]})),B=0!==e.depart[0]||1440!==e.depart[1],V=300!==e.duration[0]||660!==e.duration[1],K=[..."any"!==e.stops?[{key:"stops",label:O.find(r=>r.value===e.stops)?.label??e.stops,clear:()=>r(e=>({...e,stops:"any"}))}]:[],...B?[{key:"depart",label:`Depart ${D(e.depart[0])} – ${D(e.depart[1])}`,clear:()=>r(e=>({...e,depart:[0,1440]}))}]:[],...V?[{key:"duration",label:`Under ${E(e.duration[1])}`,clear:()=>r(e=>({...e,duration:[300,660]}))}]:[],...e.airlines.map(e=>({key:`airline:${e}`,label:C.find(r=>r.value===e)?.label??e,clear:()=>U(e)})),...e.carryOn?[{key:"carryOn",label:"Carry-on included",clear:()=>r(e=>({...e,carryOn:false}))}]:[]],q=<div className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
    <W label="Stops">
      <div role="radiogroup" aria-label="Number of stops" className="-mx-2 space-y-0.5">
        {O.map(a=>{
          let n,l=(n=a.value,S.filter(r=>R(r,e,"stops")&&((e,r)=>{
            if("any"===r)return true;
            let a=Number(r);
            return 0===a?0===e.stops:e.stops<=a;
          })(r,n)).length),i=e.stops===a.value;
          return (
            <label key={a.value} className={u(g,0===l&&!i&&"opacity-40")}>
                        <input type="radio" name="stops" checked={i} onChange={()=>r(e=>({...e,stops:a.value}))} className="size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40" />
                        <span className="min-w-0 flex-1 truncate">{a.label}</span>
                        <span className={u(w,"shrink-0")}>{l}</span>
                      </label>
          );
        })}
      </div>
    </W>
    <W label="Departure time">
      <div className="mb-4 flex min-h-7 items-center justify-between">
        <span className={u(_,b,"tabular-nums")}>
          {D(e.depart[0])}
          {" – "}
          {D(e.depart[1])}
        </span>
        {B&&<button type="button" onClick={()=>r(e=>({...e,depart:[0,1440]}))} className={y}>Reset</button>}
      </div>
      <N min={0} max={1440} step={15} value={e.depart} onChange={e=>r(r=>({...r,depart:e}))} format={D} labels={["Earliest departure","Latest departure"]} />
    </W>
    <W label="Duration">
      <div className="mb-4 flex min-h-7 items-center justify-between">
        <span className={u(_,b,"tabular-nums")}>
          {E(e.duration[0])}
          {" –"}
          {" "}
          {E(e.duration[1])}
        </span>
        {V&&<button type="button" onClick={()=>r(e=>({...e,duration:[300,660]}))} className={y}>Reset</button>}
      </div>
      <N min={300} max={660} step={5} value={e.duration} onChange={e=>r(r=>({...r,duration:e}))} format={E} labels={["Shortest duration","Longest duration"]} />
    </W>
    <W label="Airlines">
      <ul className="-mx-2 space-y-0.5">
        {C.map(r=>{
          var a;
          let n,i,o=(n=r.value,S.filter(r=>R(r,e,"airlines")&&r.airline===n).length),d=(a=r.value,(i=S.filter(r=>R(r,e,"airlines")&&r.airline===a).map(e=>e.price)).length?Math.min(...i):null),c=e.airlines.includes(r.value);
          return (
            <li key={r.value}>
                        <label className={u(g,0===o&&!c&&"opacity-40")}>
                          <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                            <input type="checkbox" checked={c} onChange={()=>U(r.value)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                            <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{r.label}</span>
                          <span className={u(w,"shrink-0")}>{null!==d?`from ${$(d)}`:"None"}</span>
                        </label>
                      </li>
          );
        })}
      </ul>
    </W>
    <W label="Baggage">
      <label className="flex cursor-pointer items-center justify-between gap-3">
        <span className="min-w-0">
          <span className={u(_,b,"block")}>Carry-on included</span>
          <span className={u("max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 block")}>
            <span className="tabular-nums">{I}</span>
            {" fares with a free cabin bag"}
          </span>
        </span>
        <button type="button" role="switch" aria-checked={e.carryOn} aria-label="Carry-on included" onClick={()=>r(e=>({...e,carryOn:!e.carryOn}))} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
          <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
        </button>
      </label>
    </W>
  </div>;
  return (
    <div className={u("bg-white dark:bg-neutral-950",b,"flex h-full min-h-[960px] w-full flex-col overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className={u("text-[20px]/[24px] font-[450] tracking-[-0.015em]",b)}>San Francisco to New York</h2>
              <p className={u(h,p,"mt-1 flex flex-wrap gap-x-3")}>
                <span role="status">
                  <span className={u(b,"tabular-nums")}>{H.length}</span>
                  {" "}
                  {"of "}
                  <span className="tabular-nums">{S.length}</span>
                  {" "}
                  flights
                </span>
                <span>Thu, Jun 12</span>
                <span>SFO → JFK</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-expanded={T} onClick={()=>F(e=>!e)} className={u(v,m,"md:hidden")}>
                <HugeiconsIcon icon={Icon_68656} size={16} strokeWidth={1.8} aria-hidden="true" />
                Filters
                {K.length>0&&<span className="tabular-nums">
                  (
                  {K.length}
                  )
                </span>}
              </button>
              <j value={a} onChange={i} options={M} ariaLabel="Sort flights" className="w-[200px]" />
            </div>
          </header>
          <div className="mt-6 flex flex-1 flex-col gap-6 md:flex-row md:gap-8">
            <aside className={u("w-full shrink-0 md:block md:w-[260px]",T?"block":"hidden")}>{q}</aside>
            <div className="flex min-w-0 flex-1 flex-col">
              {K.length>0&&<div className="mb-4 flex flex-wrap items-center gap-2">
                {K.map(e=>(
                  <span key={e.key} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                                {e.label}
                                <button type="button" aria-label={`Remove ${e.label} filter`} onClick={e.clear} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                                  <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                                </button>
                              </span>
                ))}
                <button type="button" onClick={()=>r(P)} className={y}>Clear all</button>
              </div>}
              {0===H.length?<div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No flights match these filters</p>
                <p className={u("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-[300px]")}>Allow more stops or widen the departure window to see more of the day.</p>
                <button type="button" onClick={()=>r(P)} className={u(f,m,"mt-5")}>Clear all filters</button>
              </div>:<ul className="space-y-3">
                {H.map(e=>{
                  let r,a=C.find(r=>r.value===e.airline),n=e.depart+e.duration,i=Math.floor(n/1440),o=z===e.id;
                  return (
                    <li key={e.id}>
                                    <article className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                                      <div className={u(o&&"bg-neutral-900/9 dark:bg-neutral-100/9","flex flex-wrap items-center gap-x-5 gap-y-3 p-4")}>
                                        <span className={u("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[var(--rb-r-sm,6px)] select-none","size-[40px]")}>
                                          <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.airline}</span>
                                        </span>
                                        <div className="min-w-0 grow basis-40">
                                          <div className={u(x,b,"flex items-baseline gap-1.5 tabular-nums")}>
                                            <span>{A(e.depart)}</span>
                                            <span className={p}>–</span>
                                            <span>{A(n)}</span>
                                            {i>0&&<span className={u(k,p)}>
                                              +
                                              {i}
                                            </span>}
                                          </div>
                                          <p className={u(k,p,"mt-0.5 truncate")}>{a?.label}</p>
                                        </div>
                                        <div className="basis-24 text-right sm:text-left">
                                          <p className={u(h,b)}>{0===(r=e.stops)?"Nonstop":1===r?"1 stop":`${r} stops`}</p>
                                          <p className={u(k,p,"mt-0.5")}>{E(e.duration)}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                          <div className="text-right">
                                            <p className={u(x,b,"tabular-nums")}>{$(e.price)}</p>
                                            <p className={u(k,p,"mt-0.5")}>{e.carryOn?"Carry-on":"Fare only"}</p>
                                          </div>
                                          <button type="button" aria-pressed={o} onClick={()=>L(r=>r===e.id?null:e.id)} className={u(o?f:v,m,"min-w-[114px]")}>
                                            {o?<>
                                              <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                                              Selected
                                            </>:<>
                                              <HugeiconsIcon icon={Icon_40296} size={16} strokeWidth={1.8} aria-hidden="true" />
                                              Select
                                            </>}
                                          </button>
                                        </div>
                                      </div>
                                    </article>
                                  </li>
                  );
                })}
              </ul>}
            </div>
          </div>
        </div>
      </div>
  );
}


export default L;
