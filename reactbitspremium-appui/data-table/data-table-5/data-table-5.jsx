/**
 * React Bits Pro — Application UI (data-table-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';

let s = (...e)=>e.filter(Boolean).join(" "),
  l = "bg-white dark:bg-neutral-950",
  i = "bg-neutral-50 dark:bg-neutral-900",
  o = "text-neutral-900/80 dark:text-neutral-100/80",
  d = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  c = "text-right tabular-nums",
  u = "sm:first:ps-6 sm:last:pe-6",
  x = [{label:"Today",orders:[{id:"ORD-4418",customer:"Tidal Packworks",lane:"Oakland → Reno",status:"On time",pallets:18,eta:"11:30"},{id:"ORD-4419",customer:"Harborline Grocers",lane:"Tacoma → Boise",status:"Watch",pallets:26,eta:"13:45"},{id:"ORD-4420",customer:"Juniper Health Distribution",lane:"Dallas → Tulsa",status:"On time",pallets:12,eta:"16:10"},{id:"ORD-4421",customer:"Blue Orchard Cooperative",lane:"Fresno → Phoenix",status:"Delayed",pallets:31,eta:"18:20"}]},{label:"Tomorrow",orders:[{id:"ORD-4423",customer:"Cedar Mill Provisions",lane:"Portland → Eugene",status:"On time",pallets:14,eta:"08:15"},{id:"ORD-4424",customer:"Ridgeway Medical Supply",lane:"Denver → Cheyenne",status:"Watch",pallets:22,eta:"10:40"},{id:"ORD-4425",customer:"Marble Arch Importers",lane:"Newark → Hartford",status:"On time",pallets:7,eta:"12:00"}]},{label:"This week",orders:[{id:"ORD-4428",customer:"Bellwether Cold Storage",lane:"Atlanta → Nashville",status:"On time",pallets:24,eta:"Wed 09:20"},{id:"ORD-4429",customer:"Kestrel Outdoor",lane:"Salt Lake City → Boise",status:"On time",pallets:11,eta:"Thu 11:10"},{id:"ORD-4430",customer:"Vermillion Paper Mills",lane:"Duluth → Fargo",status:"Watch",pallets:33,eta:"Thu 15:45"}]}],
  h = {"On time":"text-neutral-900/80 dark:text-neutral-100/80",Watch:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Delayed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

function p({status:e,small:t}){
  return <span className={s(t?"inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums":"inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",h[e],"whitespace-nowrap")}>{e}</span>;
}

let b = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function m(){
  let{ref:e,edges:t,onScroll:r}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:s}=t;
      r({start:a>1,end:Math.ceil(a+s)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),[h,m]=useState(false),k=h?"h-8 border-b border-neutral-900/8 px-3 align-middle text-[13px]/[18px] whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8":"h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",f=x.reduce((e,t)=>e+t.orders.length,0);
  return (
    <div className={s(l,"text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={s(i,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <h2 className={s("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Dispatch board</h2>
            <div role="radiogroup" aria-label="Row density" onKeyDown={b} className={s("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {[{key:false,label:"Comfortable"},{key:true,label:"Compact"}].map(e=>{
                let t=h===e.key;
                return <button key={e.label} type="button" role="radio" aria-checked={t} tabIndex={t?0:-1} onClick={()=>m(e.key)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e.label}</button>;
              })}
            </div>
          </header>
          <div className="relative min-h-0 flex-1">
            <div ref={e} onScroll={r} className="h-full overflow-auto">
              <table className={s("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","min-w-[760px]")}>
                <caption className="sr-only">Dispatch orders grouped by day</caption>
                <thead className={s(l,"sticky top-0 z-20")}>
                  <tr>
                    <th scope="col" className={s(d,u)}>Order</th>
                    <th scope="col" className={s(d,u)}>Lane</th>
                    <th scope="col" className={s(d,u,"w-[140px]")}>Status</th>
                    <th scope="col" className={s(d,u,"w-[100px] text-right")}>Pallets</th>
                    <th scope="col" className={s(d,u,"w-[120px] text-right")}>ETA</th>
                  </tr>
                </thead>
                {x.map(e=>(
                  <tbody key={e.label}>
                                <tr>
                                  <th colSpan={5} scope="colgroup" className={s(d,i,u,"sticky top-8 z-10")}>
                                    <span className="sticky left-4 inline-flex gap-2 sm:left-6">
                                      <span className={o}>{e.label}</span>
                                      <span>{e.orders.length}</span>
                                    </span>
                                  </th>
                                </tr>
                                {e.orders.map(e=>(
                                  <tr key={e.id} className="group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9">
                                                  <td className={s(k,u,"max-w-[260px]",!h&&"py-1.5")}>
                                                    <span className={s("text-[14px]/[16px] font-[450]","block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]")}>{e.customer}</span>
                                                    {!h&&<span className={s("font-mono text-[12px]/[16px] tabular-nums","text-neutral-900/66 dark:text-neutral-100/66","block")}>{e.id}</span>}
                                                  </td>
                                                  <td className={s(k,u,"truncate")}><span className={o}>{e.lane}</span></td>
                                                  <td className={s(k,u)}><p status={e.status} small={h} /></td>
                                                  <td className={s(k,c,u)}>{e.pallets}</td>
                                                  <td className={s(k,c,u)}><span className={o}>{e.eta}</span></td>
                                                </tr>
                                ))}
                              </tbody>
                ))}
              </table>
            </div>
            <div aria-hidden="true" className={s("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={s(i,"text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","flex h-12 shrink-0 items-center px-4 sm:px-6")}>
            {f}
            {" orders across "}
            {x.length}
            {" windows"}
          </footer>
        </div>
      </div>
  );
}


export default m;
