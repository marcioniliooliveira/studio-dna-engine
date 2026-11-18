/**
 * React Bits Pro — Application UI (monitoring-8)
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

let x = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  m = "text-[13px]/[18px] font-normal",
  f = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  g = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  k = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  v = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  w = "text-right tabular-nums",
  _ = x(m,p),
  j = ["0–50","50–100","100–200","200–300","300–500","500–800","0.8–1.2s","1.2–2s","2–4s","4s+"],
  y = [{id:"e1",route:"/v2/checkout",method:"POST",rps:184,p50:412,p90:1180,p99:8420,errorRate:2.4,budget:2e3,shape:[2,6,14,22,26,18,12,9,7,6]},{id:"e2",route:"/v2/orders",method:"GET",rps:942,p50:42,p90:96,p99:214,errorRate:.1,budget:500,shape:[48,32,18,9,5,3,1,1,0,0]},{id:"e3",route:"/v2/search",method:"GET",rps:618,p50:128,p90:384,p99:1240,errorRate:.4,budget:1e3,shape:[12,26,34,22,14,9,6,4,2,1]},{id:"e4",route:"/v2/invoices",method:"POST",rps:76,p50:288,p90:640,p99:1810,errorRate:.9,budget:1500,shape:[6,14,24,26,20,13,8,5,3,2]},{id:"e5",route:"/v2/profile",method:"PUT",rps:31,p50:66,p90:148,p99:322,errorRate:.2,budget:800,shape:[30,34,22,11,6,3,2,1,0,0]},{id:"e6",route:"/v2/webhooks",method:"POST",rps:208,p50:74,p90:190,p99:486,errorRate:.3,budget:900,shape:[26,30,24,13,7,4,2,1,1,0]}],
  N = [{key:"rps",label:"Req/s",cls:"hidden sm:table-cell"},{key:"p50",label:"p50",cls:""},{key:"p90",label:"p90",cls:"hidden md:table-cell"},{key:"p99",label:"p99",cls:""},{key:"errorRate",label:"Errors",cls:"hidden lg:table-cell"}],
  S = e=>e>=1e3?`${(e/1e3).toFixed(2)}s`:`${e}ms`,
  z = e=>/[s+]$/.test(j[e])?j[e]:`${j[e]}ms`;

function A(){
  let[e,t]=useState("e1"),[r,A]=useState(null),[R,C]=useState({key:"p99",asc:false}),{ref:E,edges:M,onScroll:D}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=t;
      r({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),W=y.find(t=>t.id===e)??y[0],P=Math.max(...W.shape),L=W.shape.reduce((e,t)=>e+t,0),O=useMemo(()=>{
    let e=R.asc?1:-1;
    return [...y].sort((t,r)=>(t[R.key]-r[R.key])*e);
  }, [R]),$=[{label:"p50",value:W.p50,delta:-3.1},{label:"p90",value:W.p90,delta:6.4},{label:"p99",value:W.p99,delta:21.8}],T=W.p99>W.budget;
  return (
    <div className={x("bg-white dark:bg-neutral-950",h,"flex h-full min-h-[720px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col gap-1")}>
          <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <h2 className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Response times</h2>
              <p className={x(_,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>Last 24 hours</span>
                <span>2.06M requests</span>
                <span>
                  {y.length}
                  {" routes"}
                </span>
              </p>
            </div>
            <p className={x(m,T?b:p,"inline-flex shrink-0 items-center gap-1.5")}>
              {T&&<HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />}
              {T?`p99 over the ${S(W.budget)} budget`:`Within the ${S(W.budget)} budget`}
            </p>
          </div>
          <div className={x(g,"@container p-0.75")}>
            <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
              {$.map(e=>(
                <div key={e.label} className={x("flex min-w-0 flex-col gap-2 px-4 py-3","ps-3 pe-3")}>
                            <p className={x("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","flex flex-wrap gap-x-2")}>
                              <span>{e.label}</span>
                              <span>{W.route}</span>
                            </p>
                            <div className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                              <p>{S(e.value)}</p>
                              <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80">
                                <HugeiconsIcon icon={e.delta<=0?Icon_37502:Icon_1497} size={12} strokeWidth={1.8} aria-hidden="true" />
                                <span className="sr-only">{e.delta<=0?"Down":"Up"}</span>
                                {Math.abs(e.delta).toFixed(1)}
                                %
                              </span>
                            </div>
                          </div>
              ))}
            </div>
          </div>
          <div className={x(g,"p-4")}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[14px]/[16px] font-[450]">Latency distribution</h3>
              <p className={x(_,"flex flex-wrap gap-x-3")}>
                {null===r?`${L}% of requests plotted`:<>
                  <span>{z(r)}</span>
                  <span>
                    {W.shape[r]}
                    % of requests
                  </span>
                </>}
              </p>
            </div>
            <div role="img" aria-label={`Latency histogram for ${W.route}`} onPointerLeave={()=>A(null)} className="mt-3 flex h-[120px] items-end gap-1.5">
              {W.shape.map((e,t)=>(
                <button key={j[t]} type="button" aria-label={`${z(t)}, ${e}% of requests`} onPointerEnter={()=>A(t)} onFocus={()=>A(t)} onBlur={()=>A(null)} className={x(f,"flex h-full min-w-0 flex-1 cursor-pointer items-end")}>
                            <span style={{height:`${Math.max(3,e/P*100)}%`}} className={x("w-full rounded-[2px]",t>=7?"bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]":r===t?"bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900":"bg-neutral-900/8 dark:bg-neutral-100/8")} />
                          </button>
              ))}
            </div>
            <div className="mt-2 flex gap-1.5">
              {j.map((e,t)=><span key={e} className={x("text-[12px]/[16px] font-normal tabular-nums",r===t?h:p,"min-w-0 flex-1 truncate text-center")}>{e}</span>)}
            </div>
          </div>
          <div className={x(g,"relative min-h-0 flex-1")}>
            <div ref={E} onScroll={D} className="h-full overflow-y-auto">
              <table className="w-full border-separate border-spacing-0 text-left text-[14px]/[20px]">
                <thead>
                  <tr>
                    <th scope="col" className={k}>Route</th>
                    {N.map(e=>(
                      <th key={e.key} scope="col" aria-sort={R.key===e.key?R.asc?"ascending":"descending":"none"} className={x(k,"w-[88px]",e.cls)}>
                                        <span className="flex justify-end">
                                          <button type="button" onClick={()=>{
                                            let t;
                                            return t=e.key,C(e=>e.key===t?{key:t,asc:!e.asc}:{key:t,asc:false});
                                          }} data-sorted={R.key===e.key?"":undefined} className="-mx-1.5 inline-flex h-7 min-w-0 cursor-pointer items-center gap-1 rounded-[var(--rb-r-sm,6px)] px-1.5 hover:bg-neutral-900/5 hover:text-neutral-900 data-sorted:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:data-sorted:text-neutral-100">
                                            {e.label}
                                            <HugeiconsIcon icon={R.key===e.key?R.asc?Icon_40972:Icon_54345:Icon_31517} size={12} strokeWidth={1.8} aria-hidden="true" />
                                          </button>
                                        </span>
                                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {O.map(r=>{
                    let n=r.id===e;
                    return (
                      <tr key={r.id} aria-selected={n} onClick={()=>{
                                        t(r.id),A(null)
                                      }} className={x("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","cursor-pointer")}>
                                        <td className={v}>
                                          <button type="button" aria-pressed={n} onClick={e=>{
                                            e.stopPropagation(),t(r.id),A(null)
                                          }} className={x(f,"flex min-w-0 cursor-pointer items-center gap-2 text-left")}>
                                            <span className={x("inline-flex h-5 min-w-5 shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 font-mono text-[12px]/[16px] tabular-nums text-neutral-900 dark:text-neutral-100","bg-neutral-900/9 dark:bg-neutral-100/9","w-[38px]")}>{r.method}</span>
                                            <span className={x("font-mono text-[12px]/[16px] tabular-nums","truncate")}>{r.route}</span>
                                          </button>
                                        </td>
                                        <td className={x(v,w,"hidden sm:table-cell")}>{r.rps}</td>
                                        <td className={x(v,w)}>{S(r.p50)}</td>
                                        <td className={x(v,w,"hidden md:table-cell")}>{S(r.p90)}</td>
                                        <td className={x(v,w)}><span className={x(r.p99>r.budget&&b)}>{S(r.p99)}</span></td>
                                        <td className={x(v,w,"hidden lg:table-cell")}>
                                          {r.errorRate.toFixed(1)}
                                          %
                                        </td>
                                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div aria-hidden="true" className={x("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",M.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",M.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default A;
