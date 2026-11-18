/**
 * React Bits Pro — Application UI (dashboard-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[13px]/[18px] font-normal",
  p = "rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8",
  m = [{label:"Active users",value:"8,472",delta:"+3.2%",positive:true,spark:[40,44,42,48,52,50,58,62]},{label:"Sessions",value:"21,908",delta:"+5.1%",positive:true,spark:[60,62,66,64,70,74,78,83]},{label:"Avg. session",value:"4m 12s",delta:"−1.4%",positive:false,spark:[55,54,56,52,51,50,49,47]},{label:"Bounce rate",value:"38.6%",delta:"+0.9 pp",positive:false,spark:[30,31,33,32,34,35,37,39]}],
  b = [520,486,543,610,588,640,705,672,718,690,748,760,795,812],
  f = [{path:"/",views:"48,210"},{path:"/pricing",views:"22,984"},{path:"/docs/quickstart",views:"18,663"},{path:"/changelog",views:"9,120"},{path:"/blog/series-b",views:"6,845"}],
  v = [{label:"Desktop",pct:62},{label:"Mobile",pct:31},{label:"Tablet",pct:7}],
  k = [{label:"Visited",value:"21,908"},{label:"Signed up",value:"3,914"},{label:"Activated",value:"2,180"},{label:"Subscribed",value:"1,024"}];

function g({values:e}){
  let a=Math.min(...e),t=Math.max(...e)-a||1,l=e.map((r,l)=>{
    let s=l/(e.length-1)*100;
    return `${s.toFixed(2)},${(92-(r-a)/t*84).toFixed(2)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="hidden h-8 w-16 shrink-0 @min-[13rem]:block">
        <polyline points={l} fill="none" vectorEffect="non-scaling-stroke" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
  );
}

function _({className:e}){
  return <span className={d(p,"block h-3",e)} />;
}

function j({title:e,onRefresh:a,onHide:t}){
  let i=[{label:"Refresh data",run:a},{label:"Hide widget",run:t}],[o,c]=useState(false),[u,x]=useState(false),[h,p]=useState(0),m=useRef(null),b=useRef(null),f=useRef(null);
  useEffect(()=>{
    if(!o)return;
    let e=m.current?.ownerDocument??document,a=e=>{
      m.current?.contains(e.target)||c(false)
    };
    return e.addEventListener("pointerdown",a),()=>e.removeEventListener("pointerdown",a);
  }, [o]),useEffect(()=>{
    o&&f.current?.focus({preventScroll:true})
  }, [o]);
  let v=(e,a)=>{
    p(e),x(a),c(true)
  },k=(e=true)=>{
    c(false),e&&b.current?.focus({preventScroll:true})
  },g=e=>{
    k(),i[e].run()
  };
  return (
    <div ref={m} className="relative shrink-0">
        <button ref={b} type="button" aria-label={`${e} options`} aria-haspopup="menu" aria-expanded={o} onClick={()=>o?k():v(0,true)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),v(0,false)):"ArrowUp"===e.key&&(e.preventDefault(),v(i.length-1,false))
        }} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}>
          <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
        {o&&<div ref={f} role="menu" aria-label={`${e} options`} tabIndex={-1} onKeyDown={e=>{
          switch(e.key){case"Escape":e.preventDefault(),k();break;case"ArrowDown":e.preventDefault(),p(e=>(e+1)%i.length);break;case"ArrowUp":e.preventDefault(),p(e=>(e-1+i.length)%i.length);break;case"Home":e.preventDefault(),p(0);break;case"End":e.preventDefault(),p(i.length-1);break;case"Enter":case" ":e.preventDefault(),g(h);break;case"Tab":k(false)}
        }} className={d("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",u&&"transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute right-0 top-full z-30 mt-1.5 w-[160px] min-w-[160px]")}>
          {i.map((e,a)=><button key={e.label} type="button" role="menuitem" tabIndex={-1} data-highlighted={a===h?"":undefined} onClick={()=>g(a)} onPointerMove={()=>p(a)} className="relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40">{e.label}</button>)}
        </div>}
      </div>
  );
}

function w({id:e,title:a,className:t,refreshing:l,skeleton:s,onRefresh:n,onHide:i,children:o}){
  return (
    <section className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","p-4",t)} aria-busy={l}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{a}</h2>
          <j title={a} onRefresh={()=>n(e)} onHide={()=>i(e)} />
        </div>
        {l?<div aria-hidden>{s}</div>:o}
      </section>
  );
}

function N(){
  let{ref:e,edges:a,onScroll:t}=function(){
    let e=useRef(null),[a,t]=useState({start:false,end:false}),r=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:r,scrollHeight:l,clientHeight:s}=a;
      t({start:r>1,end:Math.ceil(r+s)<l-1})
    }, []);
    return useEffect(()=>{
      r();
      let a=e.current,t=a?.ownerDocument.defaultView;
      if(!a||!t?.ResizeObserver)return;
      let l=new t.ResizeObserver(r);
      return observe(a),()=>disconnect();
    }, [r]),{ref:e,edges:a,onScroll:r};
  }(),[n,j]=useState([]),[N,y]=useState(null),M=useRef(undefined),A=Math.max(...b);
  useEffect(()=>()=>window.clearTimeout(M.current), []);
  let $=e=>{
    window.clearTimeout(M.current),y(e),M.current=window.setTimeout(()=>y(null),900)
  },S=e=>j(a=>[...a,e]),z=e=>({id:e,refreshing:N===e,onRefresh:$,onHide:S});
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className={d("border-b border-neutral-900/8 dark:border-neutral-100/8","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
          <h1 className={d("text-[20px]/[24px] font-[450] tracking-[-0.015em]",c,"truncate")}>Web analytics</h1>
          {n.length>0?<button type="button" onClick={()=>j([])} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
            {"Show "}
            {n.length}
            {" hidden"}
          </button>:<span className={d(h,x,"shrink-0")}>Updated 2 min ago</span>}
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={t} className="h-full overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className={d("@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","col-span-full")}>
                <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
                  {m.map(e=>{
                    let a,t=(a=e.delta,/^[−-]/.test(a));
                    return (
                      <div key={e.label} className={d("flex min-w-0 flex-col gap-2 px-4 py-3","@container")}>
                                        <p className={d("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","text-pretty")}>{e.label}</p>
                                        <div className="mt-auto flex items-end justify-between gap-3">
                                          <p className={d("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[32px]/[36px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100","truncate")}>{e.value}</p>
                                          <g values={e.spark} />
                                        </div>
                                        <p className={d("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80","truncate")}>
                                          <HugeiconsIcon icon={t?Icon_37502:Icon_1497} size={12} strokeWidth={1.8} aria-hidden="true" />
                                          <span className="sr-only">{t?"Down":"Up"}</span>
                                          {e.delta}
                                          <span className={x}>vs. last week</span>
                                        </p>
                                      </div>
                    );
                  })}
                </div>
              </div>
              {!n.includes("sessions")&&<w {...z("sessions")} title="Sessions, last 14 days" className="col-span-2 flex flex-col" skeleton={<>
                <div className={d(p,"mt-4 h-40")} />
                <div className="mt-2 flex justify-between">
                  <_ className="w-10" />
                  <_ className="w-10" />
                </div>
              </>}>
                <div className="mt-4 flex h-40 items-end gap-1.5">
                  {b.map((e,a)=>(
                    <svg key={a} aria-hidden="true" className="block min-w-0 flex-1" style={{height:`${e/A*100}%`}}>
                                    <rect width="100%" height="100%" className="fill-neutral-900 dark:fill-neutral-100" />
                                  </svg>
                  ))}
                </div>
                <div className={d("text-[12px]/[16px] font-normal tabular-nums",x,"mt-2 flex justify-between")}>
                  <span>Mar 1</span>
                  <span>Mar 14</span>
                </div>
              </w>}
              {!n.includes("pages")&&<w {...z("pages")} title="Top pages" className="col-span-2" skeleton={<div className="mt-3 flex flex-col gap-1.5">{f.map(e=><div key={e.path} className={d(p,"h-9")} />)}</div>}>
                <ul className={d("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-3 flex flex-col")}>
                  {f.map(e=>(
                    <li key={e.path} className={d("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","min-h-[36px] justify-between")}>
                                    <span className={d("font-mono text-[12px]/[16px] tabular-nums",u,"min-w-0 flex-1 truncate")}>{e.path}</span>
                                    <span className={d(h,c,"shrink-0 tabular-nums")}>{e.views}</span>
                                  </li>
                  ))}
                </ul>
              </w>}
              {!n.includes("devices")&&<w {...z("devices")} title="Devices" className="col-span-2" skeleton={<div className="mt-3 space-y-3">
                {v.map(e=>(
                  <div key={e.label}>
                                <div className="flex items-center justify-between">
                                  <_ className="w-16" />
                                  <_ className="w-8" />
                                </div>
                                <div className={d(p,"mt-1.5 h-1.5")} />
                              </div>
                ))}
              </div>}>
                <ul className="mt-3 space-y-3">
                  {v.map(e=>(
                    <li key={e.label}>
                                    <div className={d(h,"flex items-center justify-between")}>
                                      <span className={u}>{e.label}</span>
                                      <span className={d(c,"tabular-nums")}>
                                        {e.pct}
                                        %
                                      </span>
                                    </div>
                                    <div className={d("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-1.5 h-1.5")}>
                                      <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${e.pct}%`}} />
                                    </div>
                                  </li>
                  ))}
                </ul>
              </w>}
              {!n.includes("funnel")&&<w {...z("funnel")} title="Signup funnel" className="col-span-2" skeleton={<div className="mt-3 space-y-3">
                {k.map(e=>(
                  <div key={e.label} className="flex items-center justify-between">
                                <_ className="w-24" />
                                <_ className="w-14" />
                              </div>
                ))}
              </div>}>
                <ul className="mt-3 space-y-3">
                  {k.map((e,a)=>(
                    <li key={e.label} className="flex items-center justify-between gap-3">
                                    <span className={d(h,u,"inline-flex items-center gap-2")}>
                                      <span className={d(x,"w-4 tabular-nums")}>{a+1}</span>
                                      {e.label}
                                    </span>
                                    <span className={d(h,c,"tabular-nums")}>{e.value}</span>
                                  </li>
                  ))}
                </ul>
              </w>}
              {4===n.length&&<div className="col-span-full flex flex-col items-center justify-center px-6 py-12 text-center">
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">All widgets hidden</p>
                <p className={d("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-xs")}>
                  Restore them from the button in the header to see traffic, pages, devices and funnel again.
                </p>
              </div>}
            </div>
          </div>
          <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",a.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",a.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default N;
