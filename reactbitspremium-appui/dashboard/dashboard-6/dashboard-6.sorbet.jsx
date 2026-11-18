/**
 * React Bits Pro — Application UI (dashboard-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, key, label, observe, useCallback, useEffect, useId, useRef, useState } from 'react';

let d = (...e)=>e.filter(Boolean).join(" ");

let x = "text-neutral-900 dark:text-neutral-100";

let eP = [{key:"views",label:"Views"},{key:"signups",label:"Signups"},{key:"revenue",label:"Revenue"}];

let eO = (...e)=>e.filter(Boolean).join(" ");

let eF = "bg-white dark:bg-neutral-950";

let eT = "text-neutral-900 dark:text-neutral-100";

let eU = "text-neutral-900/78 dark:text-neutral-100/78";

let eV = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let eH = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let eK = "text-right tabular-nums";

let eJ = [30,33,32,38,42,47,52];

let eG = [52,50,51,47,44,40,37];

let eq = [40,42,41,43,42,44,43];

let eQ = (e,a)=>({v:e,d:a,s:eJ});

let eX = (e,a)=>({v:e,d:a,s:eG});

let eY = (e,a)=>({v:e,d:a,s:eq});

let eZ = [{name:"Organic search",views:eQ("182,400","+9.2%"),signups:eQ("5,140","+7.4%"),revenue:eQ("$128,900","+11.1%")},{name:"Paid search",views:eQ("96,200","+3.1%"),signups:eQ("3,082","+2.4%"),revenue:eQ("$77,400","+5.0%")},{name:"Direct",views:eX("71,300","−1.8%"),signups:eX("2,190","−2.2%"),revenue:eX("$58,600","−0.9%")},{name:"Email",views:eQ("33,900","+6.7%"),signups:eQ("1,000","+8.1%"),revenue:eQ("$41,200","+9.4%")},{name:"Referral",views:eQ("22,800","+4.3%"),signups:eQ("690","+3.0%"),revenue:eQ("$18,400","+2.6%")},{name:"Social organic",views:eX("18,400","−5.1%"),signups:eX("420","−6.8%"),revenue:eX("$9,800","−4.2%")},{name:"Social paid",views:eQ("14,600","+12.9%"),signups:eQ("315","+10.4%"),revenue:eQ("$12,600","+14.2%")},{name:"Affiliates",views:eY("9,200","+0.4%"),signups:eY("240","−0.2%"),revenue:eY("$14,900","+0.6%")},{name:"Marketplace",views:eQ("6,400","+18.3%"),signups:eQ("180","+16.0%"),revenue:eQ("$22,300","+21.5%")},{name:"Podcast ads",views:eQ("12,800","+7.7%"),signups:eQ("300","+5.9%"),revenue:eQ("$19,400","+8.8%")},{name:"Webinars",views:eQ("8,600","+2.0%"),signups:eQ("260","+3.6%"),revenue:eQ("$16,800","+4.9%")},{name:"Partnerships",views:eY("5,900","+0.9%"),signups:eY("150","+0.0%"),revenue:eY("$11,200","+1.3%")},{name:"Community",views:eX("4,100","−3.4%"),signups:eX("120","−4.1%"),revenue:eX("$3,600","−2.8%")},{name:"Press mentions",views:eX("3,200","−8.9%"),signups:eX("95","−7.2%"),revenue:eX("$2,100","−6.0%")},{name:"Newsletter sponsorships",views:eQ("7,300","+6.2%"),signups:eQ("205","+4.8%"),revenue:eQ("$13,700","+7.9%")},{name:"Conferences",views:eX("2,600","−2.5%"),signups:eX("88","−3.3%"),revenue:eX("$8,400","−1.7%")}];

function e0({value:e,onChange:a,baseId:r,panelId:n}){
  let s=useRef([]),i=e=>{
    let r=(e+eP.length)%eP.length;
    a(eP[r].key),s.current[r]?.focus({preventScroll:true})
  };
  return (
    <div role="radiogroup" aria-label="Metric" onKeyDown={a=>{
        let r=eP.findIndex(a=>a.key===e);
        "ArrowRight"===a.key||"ArrowDown"===a.key?(a.preventDefault(),i(r+1)):"ArrowLeft"===a.key||"ArrowUp"===a.key?(a.preventDefault(),i(r-1)):"Home"===a.key?(a.preventDefault(),i(0)):"End"===a.key&&(a.preventDefault(),i(eP.length-1))
      }} className={eO("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
        {eP.map((l,i)=>{
          let o=key===e;
          return (
            <button key={key} ref={e=>{
                    s.current[i]=e
                  }} type="button" role="radio" id={`${r}-${i}`} aria-checked={o} aria-controls={n} tabIndex={o?0:-1} onClick={()=>a(key)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{label}</button>
          );
        })}
      </div>
  );
}


export default function dashboard_6__Sorbet__Component(){
  let{ref:e,edges:a,onScroll:r}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),[n,s]=useState("signups"),[i,o]=useState(true),c=eP.find(e=>e.key===n).label,d=useId(),x=`${d}-panel`;
  return (
    <div className={eO(eF,eT,"relative flex h-full min-h-[860px] w-full flex-col overflow-hidden")}>
        <header className={eO("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
          <h1 className={eO("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",eT,"truncate")}>Channels</h1>
          <e0 value={n} onChange={s} baseId={d} panelId={x} />
        </header>
        <div className="flex h-12 shrink-0 items-center justify-between gap-2 px-4 sm:px-6">
          <span className={eO("text-[14px]/[20px] font-medium","text-neutral-900/62 dark:text-neutral-100/62","flex min-w-0 gap-2")}>
            <span className="shrink-0">
              {eZ.length}
              {" channels"}
            </span>
            <span className="truncate">Mar 1 – Mar 31</span>
          </span>
          <div className="inline-flex items-center gap-2">
            <span className={eO("text-[15px]/[20px] font-bold",eU)}>Compare to previous</span>
            <button type="button" role="switch" aria-checked={i} aria-label="Compare to previous" onClick={()=>o(e=>!e)} className="group relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] p-0.5 shadow-[inset_0_1px_2px_rgb(84_62_32/0.14),inset_0_0_0_1px_rgb(84_62_32/0.05)] transition-[background-color,box-shadow,outline-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:aria-[checked=false]:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_94%,black)] aria-checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] aria-checked:shadow-[inset_0_1px_2px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_75%,black)] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-neutral-100/16 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)] dark:hover:aria-[checked=false]:not-disabled:bg-neutral-100/24 dark:aria-checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-checked:shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)]">
              <span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[translate,width] duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-active:w-6 group-aria-checked:translate-x-4 group-aria-checked:group-active:translate-x-3 group-disabled:shadow-none dark:bg-white" />
            </button>
          </div>
        </div>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={r} role="region" id={x} aria-labelledby={`${d}-${eP.findIndex(e=>e.key===n)}`} tabIndex={0} className={eO("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","h-full overflow-y-auto")}>
            <table className="w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium">
              <caption className="sr-only">
                {c}
                {" by channel"}
              </caption>
              <thead className={eO(eF,"sticky top-0 z-20")}>
                <tr>
                  <th scope="col" className={eO(eV,"h-9 w-full sm:first:pl-6")}>Channel</th>
                  <th scope="col" className={eO(eV,eK,"h-9 w-28")}>{c}</th>
                  {i&&<th scope="col" className={eO(eV,eK,"h-9 w-24")}>Change</th>}
                  <th scope="col" className={eO(eV,"hidden h-9 w-28 text-right sm:table-cell sm:last:pr-6")}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {eZ.map(e=>{
                  var a;
                  let r,l,s=e[n];
                  return (
                    <tr key={e.name} className={eO("group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","h-11")}>
                                    <td className={eO(eH,"truncate sm:first:pl-6")}>{e.name}</td>
                                    <td className={eO(eH,eK)}>{s.v}</td>
                                    {i&&<td className={eO(eH,eK)}><span className={eU}>{s.d}</span></td>}
                                    <td className={eO(eH,"hidden text-right sm:table-cell sm:last:pr-6")}>
                                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="ml-auto h-5 w-16">
                                        <polyline points={r=Math.min(...a=s.s),l=Math.max(...a)-r||1,a.map((e,t)=>{
                                          let n=t/(a.length-1)*100;
                                          return `${n.toFixed(2)},${(92-(e-r)/l*84).toFixed(2)}`;
                                        }).join(" ")} fill="none" vectorEffect="non-scaling-stroke" className="stroke-neutral-900/40 dark:stroke-neutral-100/45" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </td>
                                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div aria-hidden="true" className={eO("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",a.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
