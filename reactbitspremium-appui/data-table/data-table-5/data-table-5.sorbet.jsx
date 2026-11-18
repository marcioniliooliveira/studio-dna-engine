/**
 * React Bits Pro — Application UI (data-table-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';

let eT = (...e)=>e.filter(Boolean).join(" ");

let eH = "bg-white dark:bg-neutral-950";

let eB = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let eF = "text-neutral-900/78 dark:text-neutral-100/78";

let eI = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let eY = "text-right tabular-nums";

let eV = "sm:first:ps-6 sm:last:pe-6";

let eU = [{label:"Today",orders:[{id:"ORD-4418",customer:"Tidal Packworks",lane:"Oakland → Reno",status:"On time",pallets:18,eta:"11:30"},{id:"ORD-4419",customer:"Harborline Grocers",lane:"Tacoma → Boise",status:"Watch",pallets:26,eta:"13:45"},{id:"ORD-4420",customer:"Juniper Health Distribution",lane:"Dallas → Tulsa",status:"On time",pallets:12,eta:"16:10"},{id:"ORD-4421",customer:"Blue Orchard Cooperative",lane:"Fresno → Phoenix",status:"Delayed",pallets:31,eta:"18:20"}]},{label:"Tomorrow",orders:[{id:"ORD-4423",customer:"Cedar Mill Provisions",lane:"Portland → Eugene",status:"On time",pallets:14,eta:"08:15"},{id:"ORD-4424",customer:"Ridgeway Medical Supply",lane:"Denver → Cheyenne",status:"Watch",pallets:22,eta:"10:40"},{id:"ORD-4425",customer:"Marble Arch Importers",lane:"Newark → Hartford",status:"On time",pallets:7,eta:"12:00"}]},{label:"This week",orders:[{id:"ORD-4428",customer:"Bellwether Cold Storage",lane:"Atlanta → Nashville",status:"On time",pallets:24,eta:"Wed 09:20"},{id:"ORD-4429",customer:"Kestrel Outdoor",lane:"Salt Lake City → Boise",status:"On time",pallets:11,eta:"Thu 11:10"},{id:"ORD-4430",customer:"Vermillion Paper Mills",lane:"Duluth → Fargo",status:"Watch",pallets:33,eta:"Thu 15:45"}]}];

let eG = {"On time":"text-neutral-900/78 dark:text-neutral-100/78",Watch:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Delayed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

function eK({status:e,small:r}){
  return <span className={eT(r?"inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums":"inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",eG[e],"whitespace-nowrap")}>{e}</span>;
}

let e$ = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[n].focus(),a[n].click()
};


export default function data_table_5__Sorbet__Component(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),[l,o]=useState(false),s=l?"h-10 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle text-[14px]/[20px] whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6":"h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6",i=eU.reduce((e,r)=>e+r.orders.length,0);
  return (
    <div className={eT(eH,"text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[760px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={eT(eB,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <h2 className={eT("text-[17px]/[22px] font-extrabold","min-w-0 flex-1 truncate")}>Dispatch board</h2>
            <div role="radiogroup" aria-label="Row density" onKeyDown={e$} className={eT("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
              {[{key:false,label:"Comfortable"},{key:true,label:"Compact"}].map(e=>{
                let r=l===e.key;
                return <button key={e.label} type="button" role="radio" aria-checked={r} tabIndex={r?0:-1} onClick={()=>o(e.key)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{e.label}</button>;
              })}
            </div>
          </header>
          <div className="relative min-h-0 flex-1">
            <div ref={e} onScroll={a} className="h-full overflow-auto">
              <table className={eT("w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium","min-w-[760px]")}>
                <caption className="sr-only">Dispatch orders grouped by day</caption>
                <thead className={eT(eH,"sticky top-0 z-20")}>
                  <tr>
                    <th scope="col" className={eT(eI,eV)}>Order</th>
                    <th scope="col" className={eT(eI,eV)}>Lane</th>
                    <th scope="col" className={eT(eI,eV,"w-[140px]")}>Status</th>
                    <th scope="col" className={eT(eI,eV,"w-[100px] text-right")}>Pallets</th>
                    <th scope="col" className={eT(eI,eV,"w-[120px] text-right")}>ETA</th>
                  </tr>
                </thead>
                {eU.map(e=>(
                  <tbody key={e.label}>
                                <tr>
                                  <th colSpan={5} scope="colgroup" className={eT(eI,eB,eV,"sticky top-8 z-10")}>
                                    <span className="sticky left-4 inline-flex gap-2 sm:left-6">
                                      <span className={eF}>{e.label}</span>
                                      <span>{e.orders.length}</span>
                                    </span>
                                  </th>
                                </tr>
                                {e.orders.map(e=>(
                                  <tr key={e.id} className="group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]">
                                                  <td className={eT(s,eV,"max-w-[260px]",!l&&"py-1.5")}>
                                                    <span className={eT("text-[15px]/[20px] font-bold","block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]")}>{e.customer}</span>
                                                    {!l&&<span className={eT("font-mono text-[12px]/[16px] tabular-nums","text-neutral-900/62 dark:text-neutral-100/62","block")}>{e.id}</span>}
                                                  </td>
                                                  <td className={eT(s,eV,"truncate")}><span className={eF}>{e.lane}</span></td>
                                                  <td className={eT(s,eV)}><eK status={e.status} small={l} /></td>
                                                  <td className={eT(s,eY,eV)}>{e.pallets}</td>
                                                  <td className={eT(s,eY,eV)}><span className={eF}>{e.eta}</span></td>
                                                </tr>
                                ))}
                              </tbody>
                ))}
              </table>
            </div>
            <div aria-hidden="true" className={eT("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={eT(eB,"text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","flex h-12 shrink-0 items-center px-4 sm:px-6")}>
            {i}
            {" orders across "}
            {eU.length}
            {" windows"}
          </footer>
        </div>
      </div>
  );
}
