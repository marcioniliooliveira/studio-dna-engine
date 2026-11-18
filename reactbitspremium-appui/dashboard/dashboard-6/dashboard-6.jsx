/**
 * React Bits Pro — Application UI (dashboard-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, key, label, observe, useCallback, useEffect, useId, useRef, useState } from 'react';

let s = [{key:"views",label:"Views"},{key:"signups",label:"Signups"},{key:"revenue",label:"Revenue"}],
  n = (...e)=>e.filter(Boolean).join(" "),
  i = "bg-white dark:bg-neutral-950",
  o = "text-neutral-900 dark:text-neutral-100",
  d = "text-neutral-900/80 dark:text-neutral-100/80",
  c = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  u = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  x = "text-right tabular-nums",
  h = [30,33,32,38,42,47,52],
  p = [52,50,51,47,44,40,37],
  m = [40,42,41,43,42,44,43],
  b = (e,a)=>({v:e,d:a,s:h}),
  f = (e,a)=>({v:e,d:a,s:p}),
  v = (e,a)=>({v:e,d:a,s:m}),
  k = [{name:"Organic search",views:b("182,400","+9.2%"),signups:b("5,140","+7.4%"),revenue:b("$128,900","+11.1%")},{name:"Paid search",views:b("96,200","+3.1%"),signups:b("3,082","+2.4%"),revenue:b("$77,400","+5.0%")},{name:"Direct",views:f("71,300","−1.8%"),signups:f("2,190","−2.2%"),revenue:f("$58,600","−0.9%")},{name:"Email",views:b("33,900","+6.7%"),signups:b("1,000","+8.1%"),revenue:b("$41,200","+9.4%")},{name:"Referral",views:b("22,800","+4.3%"),signups:b("690","+3.0%"),revenue:b("$18,400","+2.6%")},{name:"Social organic",views:f("18,400","−5.1%"),signups:f("420","−6.8%"),revenue:f("$9,800","−4.2%")},{name:"Social paid",views:b("14,600","+12.9%"),signups:b("315","+10.4%"),revenue:b("$12,600","+14.2%")},{name:"Affiliates",views:v("9,200","+0.4%"),signups:v("240","−0.2%"),revenue:v("$14,900","+0.6%")},{name:"Marketplace",views:b("6,400","+18.3%"),signups:b("180","+16.0%"),revenue:b("$22,300","+21.5%")},{name:"Podcast ads",views:b("12,800","+7.7%"),signups:b("300","+5.9%"),revenue:b("$19,400","+8.8%")},{name:"Webinars",views:b("8,600","+2.0%"),signups:b("260","+3.6%"),revenue:b("$16,800","+4.9%")},{name:"Partnerships",views:v("5,900","+0.9%"),signups:v("150","+0.0%"),revenue:v("$11,200","+1.3%")},{name:"Community",views:f("4,100","−3.4%"),signups:f("120","−4.1%"),revenue:f("$3,600","−2.8%")},{name:"Press mentions",views:f("3,200","−8.9%"),signups:f("95","−7.2%"),revenue:f("$2,100","−6.0%")},{name:"Newsletter sponsorships",views:b("7,300","+6.2%"),signups:b("205","+4.8%"),revenue:b("$13,700","+7.9%")},{name:"Conferences",views:f("2,600","−2.5%"),signups:f("88","−3.3%"),revenue:f("$8,400","−1.7%")}];

function g({value:e,onChange:a,baseId:t,panelId:i}){
  let o=useRef([]),d=e=>{
    let t=(e+s.length)%s.length;
    a(s[t].key),o.current[t]?.focus({preventScroll:true})
  };
  return (
    <div role="radiogroup" aria-label="Metric" onKeyDown={a=>{
        let t=s.findIndex(a=>a.key===e);
        "ArrowRight"===a.key||"ArrowDown"===a.key?(a.preventDefault(),d(t+1)):"ArrowLeft"===a.key||"ArrowUp"===a.key?(a.preventDefault(),d(t-1)):"Home"===a.key?(a.preventDefault(),d(0)):"End"===a.key&&(a.preventDefault(),d(s.length-1))
      }} className={n("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
        {s.map((l,s)=>{
          let n=key===e;
          return (
            <button key={key} ref={e=>{
                    o.current[s]=e
                  }} type="button" role="radio" id={`${t}-${s}`} aria-checked={n} aria-controls={i} tabIndex={n?0:-1} onClick={()=>a(key)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{label}</button>
          );
        })}
      </div>
  );
}

function _(){
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
  }(),[h,p]=useState("signups"),[m,b]=useState(true),f=s.find(e=>e.key===h).label,v=useId(),_=`${v}-panel`;
  return (
    <div className={n(i,o,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className={n("border-b border-neutral-900/8 dark:border-neutral-100/8","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
          <h1 className={n("text-[20px]/[24px] font-[450] tracking-[-0.015em]",o,"truncate")}>Channels</h1>
          <g value={h} onChange={p} baseId={v} panelId={_} />
        </header>
        <div className="flex h-12 shrink-0 items-center justify-between gap-2 px-4 sm:px-6">
          <span className={n("text-[13px]/[18px] font-normal","text-neutral-900/66 dark:text-neutral-100/66","flex min-w-0 gap-2")}>
            <span className="shrink-0">
              {k.length}
              {" channels"}
            </span>
            <span className="truncate">Mar 1 – Mar 31</span>
          </span>
          <div className="inline-flex items-center gap-2">
            <span className={n("text-[14px]/[16px] font-[450]",d)}>Compare to previous</span>
            <button type="button" role="switch" aria-checked={m} aria-label="Compare to previous" onClick={()=>b(e=>!e)} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
              <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
            </button>
          </div>
        </div>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={t} role="region" id={_} aria-labelledby={`${v}-${s.findIndex(e=>e.key===h)}`} tabIndex={0} className={n("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","h-full overflow-y-auto")}>
            <table className="w-full border-separate border-spacing-0 text-left text-[14px]/[20px]">
              <caption className="sr-only">
                {f}
                {" by channel"}
              </caption>
              <thead className={n(i,"sticky top-0 z-20")}>
                <tr>
                  <th scope="col" className={n(c,"h-9 w-full sm:first:pl-6")}>Channel</th>
                  <th scope="col" className={n(c,x,"h-9 w-28")}>{f}</th>
                  {m&&<th scope="col" className={n(c,x,"h-9 w-24")}>Change</th>}
                  <th scope="col" className={n(c,"hidden h-9 w-28 text-right sm:table-cell sm:last:pr-6")}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {k.map(e=>{
                  var a;
                  let t,l,s=e[h];
                  return (
                    <tr key={e.name} className={n("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-11")}>
                                    <td className={n(u,"truncate sm:first:pl-6")}>{e.name}</td>
                                    <td className={n(u,x)}>{s.v}</td>
                                    {m&&<td className={n(u,x)}><span className={d}>{s.d}</span></td>}
                                    <td className={n(u,"hidden text-right sm:table-cell sm:last:pr-6")}>
                                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="ml-auto h-5 w-16">
                                        <polyline points={t=Math.min(...a=s.s),l=Math.max(...a)-t||1,a.map((e,r)=>{
                                          let s=r/(a.length-1)*100;
                                          return `${s.toFixed(2)},${(92-(e-t)/l*84).toFixed(2)}`;
                                        }).join(" ")} fill="none" vectorEffect="non-scaling-stroke" className="stroke-neutral-900/66 dark:stroke-neutral-100/66" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </td>
                                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div aria-hidden="true" className={n("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",a.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default _;
