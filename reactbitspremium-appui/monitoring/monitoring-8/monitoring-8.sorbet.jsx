/**
 * React Bits Pro — Application UI (monitoring-8 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" ");

let b = "bg-white dark:bg-neutral-950";

let h = "text-neutral-900/62 dark:text-neutral-100/62";

let p = "text-[15px]/[20px] font-bold";

let m = "text-[14px]/[20px] font-medium";

let k = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let f = "flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100";

let af = (...e)=>e.filter(Boolean).join(" ");

let ag = "text-neutral-900 dark:text-neutral-100";

let av = "text-neutral-900/62 dark:text-neutral-100/62";

let aw = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]";

let aj = "text-[14px]/[20px] font-medium";

let ay = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let aN = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let az = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let aS = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let aA = "text-right tabular-nums";

let aR = af(aj,av);

let aC = ["0–50","50–100","100–200","200–300","300–500","500–800","0.8–1.2s","1.2–2s","2–4s","4s+"];

let aE = [{id:"e1",route:"/v2/checkout",method:"POST",rps:184,p50:412,p90:1180,p99:8420,errorRate:2.4,budget:2e3,shape:[2,6,14,22,26,18,12,9,7,6]},{id:"e2",route:"/v2/orders",method:"GET",rps:942,p50:42,p90:96,p99:214,errorRate:.1,budget:500,shape:[48,32,18,9,5,3,1,1,0,0]},{id:"e3",route:"/v2/search",method:"GET",rps:618,p50:128,p90:384,p99:1240,errorRate:.4,budget:1e3,shape:[12,26,34,22,14,9,6,4,2,1]},{id:"e4",route:"/v2/invoices",method:"POST",rps:76,p50:288,p90:640,p99:1810,errorRate:.9,budget:1500,shape:[6,14,24,26,20,13,8,5,3,2]},{id:"e5",route:"/v2/profile",method:"PUT",rps:31,p50:66,p90:148,p99:322,errorRate:.2,budget:800,shape:[30,34,22,11,6,3,2,1,0,0]},{id:"e6",route:"/v2/webhooks",method:"POST",rps:208,p50:74,p90:190,p99:486,errorRate:.3,budget:900,shape:[26,30,24,13,7,4,2,1,1,0]}];

let aM = [{key:"rps",label:"Req/s",cls:"hidden sm:table-cell"},{key:"p50",label:"p50",cls:""},{key:"p90",label:"p90",cls:"hidden md:table-cell"},{key:"p99",label:"p99",cls:""},{key:"errorRate",label:"Errors",cls:"hidden lg:table-cell"}];

let aD = e=>e>=1e3?`${(e/1e3).toFixed(2)}s`:`${e}ms`;

let aW = e=>/[s+]$/.test(aC[e])?aC[e]:`${aC[e]}ms`;


export default function monitoring_8__Sorbet__Component(){
  let[e,a]=useState("e1"),[r,l]=useState(null),[i,s]=useState({key:"p99",asc:false}),{ref:c,edges:d,onScroll:u}=function(){
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
  }(),b=aE.find(a=>a.id===e)??aE[0],h=Math.max(...b.shape),p=b.shape.reduce((e,a)=>e+a,0),m=useMemo(()=>{
    let e=i.asc?1:-1;
    return [...aE].sort((a,r)=>(a[i.key]-r[i.key])*e);
  }, [i]),k=[{label:"p50",value:b.p50,delta:-3.1},{label:"p90",value:b.p90,delta:6.4},{label:"p99",value:b.p99,delta:21.8}],f=b.p99>b.budget;
  return (
    <div className={af("bg-white dark:bg-neutral-950",ag,"flex h-full min-h-[720px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={af("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col gap-1")}>
          <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <h2 className={af("text-[17px]/[22px] font-extrabold","truncate")}>Response times</h2>
              <p className={af(aR,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>Last 24 hours</span>
                <span>2.06M requests</span>
                <span>
                  {aE.length}
                  {" routes"}
                </span>
              </p>
            </div>
            <p className={af(aj,f?aw:av,"inline-flex shrink-0 items-center gap-1.5")}>
              {f&&<HugeiconsIcon icon={Icon_27476} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />}
              {f?`p99 over the ${aD(b.budget)} budget`:`Within the ${aD(b.budget)} budget`}
            </p>
          </div>
          <div className={af(aN,"@container p-0.75")}>
            <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
              {k.map(e=>(
                <div key={e.label} className={af("flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4","ps-3 pe-3")}>
                            <p className={af("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","flex flex-wrap gap-x-2")}>
                              <span>{e.label}</span>
                              <span>{b.route}</span>
                            </p>
                            <div className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100">
                              <p>{aD(e.value)}</p>
                              <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78">
                                <HugeiconsIcon icon={e.delta<=0?Icon_37502:Icon_1497} size={14} strokeWidth={2} aria-hidden="true" />
                                <span className="sr-only">{e.delta<=0?"Down":"Up"}</span>
                                {Math.abs(e.delta).toFixed(1)}
                                %
                              </span>
                            </div>
                          </div>
              ))}
            </div>
          </div>
          <div className={af(aN,"p-4")}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[15px]/[20px] font-bold">Latency distribution</h3>
              <p className={af(aR,"flex flex-wrap gap-x-3")}>
                {null===r?`${p}% of requests plotted`:<>
                  <span>{aW(r)}</span>
                  <span>
                    {b.shape[r]}
                    % of requests
                  </span>
                </>}
              </p>
            </div>
            <div role="img" aria-label={`Latency histogram for ${b.route}`} onPointerLeave={()=>l(null)} className="mt-3 flex h-[120px] items-end gap-1.5">
              {b.shape.map((e,a)=>(
                <button key={aC[a]} type="button" aria-label={`${aW(a)}, ${e}% of requests`} onPointerEnter={()=>l(a)} onFocus={()=>l(a)} onBlur={()=>l(null)} className={af(ay,"flex h-full min-w-0 flex-1 cursor-pointer items-end")}>
                            <span style={{height:`${Math.max(3,e/h*100)}%`}} className={af("w-full rounded-[2px]",a>=7?"bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]":r===a?"bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900":"bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8")} />
                          </button>
              ))}
            </div>
            <div className="mt-2 flex gap-1.5">
              {aC.map((e,a)=><span key={e} className={af("text-[13px]/[16px] font-semibold tabular-nums",r===a?ag:av,"min-w-0 flex-1 truncate text-center")}>{e}</span>)}
            </div>
          </div>
          <div className={af(aN,"relative min-h-0 flex-1")}>
            <div ref={c} onScroll={u} className="h-full overflow-y-auto">
              <table className="w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium">
                <thead>
                  <tr>
                    <th scope="col" className={az}>Route</th>
                    {aM.map(e=>(
                      <th key={e.key} scope="col" aria-sort={i.key===e.key?i.asc?"ascending":"descending":"none"} className={af(az,"w-[88px]",e.cls)}>
                                        <span className="flex justify-end">
                                          <button type="button" onClick={()=>{
                                            let a;
                                            return a=e.key,s(e=>e.key===a?{key:a,asc:!e.asc}:{key:a,asc:false});
                                          }} data-sorted={i.key===e.key?"":undefined} className="-mx-1.5 inline-flex h-8 min-w-0 cursor-pointer items-center gap-1 rounded-[calc(var(--rb-r-full,999px))] px-1.5 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 data-sorted:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:data-sorted:text-neutral-100">
                                            {e.label}
                                            <HugeiconsIcon icon={i.key===e.key?i.asc?Icon_40972:Icon_54345:Icon_31517} size={14} strokeWidth={2} aria-hidden="true" />
                                          </button>
                                        </span>
                                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {m.map(r=>{
                    let n=r.id===e;
                    return (
                      <tr key={r.id} aria-selected={n} onClick={()=>{
                                        a(r.id),l(null)
                                      }} className={af("group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","cursor-pointer")}>
                                        <td className={aS}>
                                          <button type="button" aria-pressed={n} onClick={e=>{
                                            e.stopPropagation(),a(r.id),l(null)
                                          }} className={af(ay,"flex min-w-0 cursor-pointer items-center gap-2 text-left")}>
                                            <span className={af("inline-flex h-5.5 min-w-5.5 shrink-0 items-center justify-center whitespace-nowrap rounded-[calc(var(--rb-r-md,8px))] px-2 font-mono text-[12px]/[16px] font-medium tabular-nums text-neutral-900 dark:text-neutral-100","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:bg-neutral-100/10","w-[38px]")}>{r.method}</span>
                                            <span className={af("font-mono text-[12px]/[16px] tabular-nums","truncate")}>{r.route}</span>
                                          </button>
                                        </td>
                                        <td className={af(aS,aA,"hidden sm:table-cell")}>{r.rps}</td>
                                        <td className={af(aS,aA)}>{aD(r.p50)}</td>
                                        <td className={af(aS,aA,"hidden md:table-cell")}>{aD(r.p90)}</td>
                                        <td className={af(aS,aA)}><span className={af(r.p99>r.budget&&aw)}>{aD(r.p99)}</span></td>
                                        <td className={af(aS,aA,"hidden lg:table-cell")}>
                                          {r.errorRate.toFixed(1)}
                                          %
                                        </td>
                                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div aria-hidden="true" className={af("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",d.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={af("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
