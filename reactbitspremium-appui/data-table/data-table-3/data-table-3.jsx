/**
 * React Bits Pro — Application UI (data-table-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_66654 = [["path",{d:"M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 20H17",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "bg-white dark:bg-neutral-950",
  u = "bg-neutral-50 dark:bg-neutral-900",
  x = "text-neutral-900/80 dark:text-neutral-100/80",
  h = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[13px]/[18px] font-normal",
  b = "text-[14px]/[16px] font-[450]",
  m = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  k = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  f = "text-right tabular-nums",
  g = "sm:first:ps-6 sm:last:pe-6",
  v = [{id:"AL-104",workstream:"Warehouse cutover rehearsal",owner:"Priya Rao",hours:38,rate:145,status:"Draft"},{id:"AL-105",workstream:"Carrier exception rules",owner:"Mateo Silva",hours:22,rate:160,status:"Needs review"},{id:"AL-106",workstream:"International receiving controls",owner:"Nora Jensen",hours:44,rate:135,status:"Draft"},{id:"AL-107",workstream:"Executive weekly operating packet",owner:"Samir Patel",hours:16,rate:175,status:"Locked"},{id:"AL-108",workstream:"Cold-chain compliance evidence library",owner:"Elena Rossi",hours:31,rate:150,status:"Draft"},{id:"AL-109",workstream:"Returns triage automation",owner:"Devon Okafor",hours:27,rate:140,status:"Draft"},{id:"AL-110",workstream:"Peak season staffing model",owner:"Ivy Zhang",hours:19,rate:165,status:"Needs review"},{id:"AL-111",workstream:"Dock scheduling rewrite",owner:"Marcus Lund",hours:52,rate:155,status:"Draft"},{id:"AL-112",workstream:"Vendor onboarding checklist",owner:"Asha Malik",hours:12,rate:130,status:"Locked"},{id:"AL-113",workstream:"Inventory count reconciliation",owner:"Theo Grant",hours:34,rate:150,status:"Draft"},{id:"AL-114",workstream:"Freight audit dispute pipeline",owner:"Camille Hart",hours:29,rate:170,status:"Needs review"}],
  w = e=>e.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}),
  _ = {Draft:"text-neutral-900/66 dark:text-neutral-100/66","Needs review":"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Locked:"text-neutral-900/80 dark:text-neutral-100/80"};

function j({status:e}){
  return <span className={d("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",_[e],"whitespace-nowrap")}>{e}</span>;
}

function N(){
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
  }(),[_,N]=useState(v),[y,S]=useState({}),[A,C]=useState(null),[D,z]=useState(""),R=useRef([]);
  useEffect(()=>{
    let e=R.current;
    return ()=>e.forEach(clearTimeout);
  }, []);
  let P=()=>{
    if(!A)return;
    let{id:e,field:t}=A,r=Math.max(0,Math.round(Number(D)||0));
    N(a=>a.map(a=>a.id===e?{...a,[t]:r}:a)),C(null),S(t=>({...t,[e]:"saving"})),R.current.push(window.setTimeout(()=>{
      S(t=>({...t,[e]:"saved"})),R.current.push(window.setTimeout(()=>S(t=>({...t,[e]:"idle"})),1600))
    },550))
  },L=_.reduce((e,t)=>e+t.hours*t.rate,0),E=(e,t)=>{
    let r=A?.id===e.id&&A.field===t,n="hours"===t?e.hours:e.rate,i="hours"===t?String(n):w(n);
    return r?<span className="ms-auto block w-20">
      <span className={d("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-7")}>
        <input autoFocus type="text" inputMode="numeric" value={D} onChange={e=>z(e.target.value.replace(/[^0-9]/g,""))} onBlur={P} onKeyDown={e=>{
          "Enter"===e.key&&P(),"Escape"===e.key&&C(null)
        }} aria-label={`Edit ${t} for ${e.workstream}`} className={d("h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]","text-right")} />
      </span>
    </span>:"Locked"===e.status?<span className={d(b,f,h,"inline-flex h-7 w-20 items-center justify-end pe-[13px]")}>{i}</span>:<button type="button" onClick={()=>{
      var r;
      return r=e.id,void(_.find(e=>e.id===r)?.status!=="Locked"&&(C({id:r,field:t}),z(String(n))));
    }} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",f,"group/edit w-20 justify-end")}>
      <HugeiconsIcon icon={Icon_66654} size={16} strokeWidth={1.8} aria-hidden="true" className={d(h,"shrink-0 md:opacity-0 md:group-hover/edit:opacity-100 md:group-focus-visible/edit:opacity-100")} />
      {i}
    </button>;
  };
  return (
    <div className={d(c,"text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={d(u,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <div className="min-w-0 flex-1">
              <h2 className={d("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Budget allocation</h2>
              <p className={d(p,x,"truncate")}>Click hours or rate to edit</p>
            </div>
          </header>
          <div className="relative min-h-0 flex-1">
            <div ref={e} onScroll={r} className="h-full overflow-auto">
              <table className={d("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","min-w-[760px]")}>
                <caption className="sr-only">Editable workstream budget allocation</caption>
                <thead className={d(c,"sticky top-0 z-20")}>
                  <tr>
                    <th scope="col" className={d(m,g)}>Workstream</th>
                    <th scope="col" className={d(m,g,"w-[160px]")}>Owner</th>
                    <th scope="col" className={d(m,g,"w-[150px]")}>Status</th>
                    <th scope="col" className={d(m,g,"w-[116px] text-right")}>Hours</th>
                    <th scope="col" className={d(m,g,"w-[116px] text-right")}>Rate</th>
                    <th scope="col" className={d(m,g,"w-[120px] text-right")}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(e=>{
                    let t=y[e.id]??"idle";
                    return (
                      <tr key={e.id} className="group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9">
                                        <td className={d(k,g,"max-w-[280px]")}>
                                          <div className="flex items-center gap-2">
                                            <span className={d(b,"block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]","flex-1")}>{e.workstream}</span>
                                            {"saving"===t&&<HugeiconsIcon icon={Icon_79715} size={14} strokeWidth={1.8} aria-label="Saving" className={d("animate-spin [animation-duration:800ms] motion-reduce:animate-none",h,"shrink-0")} />}
                                            {"saved"===t&&<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={1.8} aria-label="Saved" className={d(h,"shrink-0")} />}
                                          </div>
                                        </td>
                                        <td className={d(k,g,"truncate")}><span className={x}>{e.owner}</span></td>
                                        <td className={d(k,g)}><j status={e.status} /></td>
                                        <td className={d(k,g,"text-right")}>{E(e,"hours")}</td>
                                        <td className={d(k,g,"text-right")}>{E(e,"rate")}</td>
                                        <td className={d(k,f,b,g)}>{w(e.hours*e.rate)}</td>
                                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={d(u,"flex h-12 shrink-0 items-center justify-between px-4 sm:px-6")}>
            <span className="text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">
              {_.length}
              {" workstreams"}
            </span>
            <span className={d(p,f)}>
              <span className={h}>{"Total budget "}</span>
              {w(L)}
            </span>
          </footer>
        </div>
      </div>
  );
}


export default N;
