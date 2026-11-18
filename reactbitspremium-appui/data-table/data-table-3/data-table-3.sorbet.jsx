/**
 * React Bits Pro — Application UI (data-table-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_66654 = [["path",{d:"M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 20H17",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let h = (...e)=>e.filter(Boolean).join(" ");

let p = "bg-white dark:bg-neutral-950";

let b = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let m = "text-neutral-900/78 dark:text-neutral-100/78";

let k = "text-[15px]/[20px] font-bold";

let ed = (...e)=>e.filter(Boolean).join(" ");

let eu = "bg-white dark:bg-neutral-950";

let ex = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let e_ = "text-neutral-900/78 dark:text-neutral-100/78";

let eh = "text-neutral-900/62 dark:text-neutral-100/62";

let ep = "text-[14px]/[20px] font-medium";

let eb = "text-[15px]/[20px] font-bold";

let em = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let ek = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let ef = "text-right tabular-nums";

let ev = "sm:first:ps-6 sm:last:pe-6";

let eg = [{id:"AL-104",workstream:"Warehouse cutover rehearsal",owner:"Priya Rao",hours:38,rate:145,status:"Draft"},{id:"AL-105",workstream:"Carrier exception rules",owner:"Mateo Silva",hours:22,rate:160,status:"Needs review"},{id:"AL-106",workstream:"International receiving controls",owner:"Nora Jensen",hours:44,rate:135,status:"Draft"},{id:"AL-107",workstream:"Executive weekly operating packet",owner:"Samir Patel",hours:16,rate:175,status:"Locked"},{id:"AL-108",workstream:"Cold-chain compliance evidence library",owner:"Elena Rossi",hours:31,rate:150,status:"Draft"},{id:"AL-109",workstream:"Returns triage automation",owner:"Devon Okafor",hours:27,rate:140,status:"Draft"},{id:"AL-110",workstream:"Peak season staffing model",owner:"Ivy Zhang",hours:19,rate:165,status:"Needs review"},{id:"AL-111",workstream:"Dock scheduling rewrite",owner:"Marcus Lund",hours:52,rate:155,status:"Draft"},{id:"AL-112",workstream:"Vendor onboarding checklist",owner:"Asha Malik",hours:12,rate:130,status:"Locked"},{id:"AL-113",workstream:"Inventory count reconciliation",owner:"Theo Grant",hours:34,rate:150,status:"Draft"},{id:"AL-114",workstream:"Freight audit dispute pipeline",owner:"Camille Hart",hours:29,rate:170,status:"Needs review"}];

let ew = e=>e.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});

let ej = {Draft:"text-neutral-900/62 dark:text-neutral-100/62","Needs review":"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Locked:"text-neutral-900/78 dark:text-neutral-100/78"};

function ey({status:e}){
  return <span className={ed("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",ej[e],"whitespace-nowrap")}>{e}</span>;
}


export default function data_table_3__Sorbet__Component(){
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
  }(),[o,s]=useState(eg),[i,c]=useState({}),[d,u]=useState(null),[_,h]=useState(""),p=useRef([]);
  useEffect(()=>{
    let e=p.current;
    return ()=>e.forEach(clearTimeout);
  }, []);
  let b=()=>{
    if(!d)return;
    let{id:e,field:r}=d,a=Math.max(0,Math.round(Number(_)||0));
    s(t=>t.map(t=>t.id===e?{...t,[r]:a}:t)),u(null),c(r=>({...r,[e]:"saving"})),p.current.push(window.setTimeout(()=>{
      c(r=>({...r,[e]:"saved"})),p.current.push(window.setTimeout(()=>c(r=>({...r,[e]:"idle"})),1600))
    },550))
  },m=o.reduce((e,r)=>e+r.hours*r.rate,0),k=(e,r)=>{
    let a=d?.id===e.id&&d.field===r,n="hours"===r?e.hours:e.rate,s="hours"===r?String(n):ew(n);
    return a?<span className="ms-auto block w-20">
      <span className={ed("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-8")}>
        <input autoFocus type="text" inputMode="numeric" value={_} onChange={e=>h(e.target.value.replace(/[^0-9]/g,""))} onBlur={b} onKeyDown={e=>{
          "Enter"===e.key&&b(),"Escape"===e.key&&u(null)
        }} aria-label={`Edit ${r} for ${e.workstream}`} className={ed("h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]","text-right")} />
      </span>
    </span>:"Locked"===e.status?<span className={ed(eb,ef,eh,"inline-flex h-7 w-20 items-center justify-end pe-[13px]")}>{s}</span>:<button type="button" onClick={()=>{
      var a;
      return a=e.id,void(o.find(e=>e.id===a)?.status!=="Locked"&&(u({id:a,field:r}),h(String(n))));
    }} className={ed("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold",ef,"group/edit w-20 justify-end")}>
      <HugeiconsIcon icon={Icon_66654} size={18} strokeWidth={2} aria-hidden="true" className={ed(eh,"shrink-0 md:opacity-0 md:group-hover/edit:opacity-100 md:group-focus-visible/edit:opacity-100")} />
      {s}
    </button>;
  };
  return (
    <div className={ed(eu,"text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={ed(ex,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <div className="min-w-0 flex-1">
              <h2 className={ed("text-[17px]/[22px] font-extrabold","truncate")}>Budget allocation</h2>
              <p className={ed(ep,e_,"truncate")}>Click hours or rate to edit</p>
            </div>
          </header>
          <div className="relative min-h-0 flex-1">
            <div ref={e} onScroll={a} className="h-full overflow-auto">
              <table className={ed("w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium","min-w-[760px]")}>
                <caption className="sr-only">Editable workstream budget allocation</caption>
                <thead className={ed(eu,"sticky top-0 z-20")}>
                  <tr>
                    <th scope="col" className={ed(em,ev)}>Workstream</th>
                    <th scope="col" className={ed(em,ev,"w-[160px]")}>Owner</th>
                    <th scope="col" className={ed(em,ev,"w-[150px]")}>Status</th>
                    <th scope="col" className={ed(em,ev,"w-[116px] text-right")}>Hours</th>
                    <th scope="col" className={ed(em,ev,"w-[116px] text-right")}>Rate</th>
                    <th scope="col" className={ed(em,ev,"w-[120px] text-right")}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {o.map(e=>{
                    let r=i[e.id]??"idle";
                    return (
                      <tr key={e.id} className="group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]">
                                        <td className={ed(ek,ev,"max-w-[280px]")}>
                                          <div className="flex items-center gap-2">
                                            <span className={ed(eb,"block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]","flex-1")}>{e.workstream}</span>
                                            {"saving"===r&&<HugeiconsIcon icon={Icon_79715} size={16} strokeWidth={2} aria-label="Saving" className={ed("animate-spin [animation-duration:700ms] motion-reduce:animate-none",eh,"shrink-0")} />}
                                            {"saved"===r&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={2} aria-label="Saved" className={ed(eh,"shrink-0")} />}
                                          </div>
                                        </td>
                                        <td className={ed(ek,ev,"truncate")}><span className={e_}>{e.owner}</span></td>
                                        <td className={ed(ek,ev)}><ey status={e.status} /></td>
                                        <td className={ed(ek,ev,"text-right")}>{k(e,"hours")}</td>
                                        <td className={ed(ek,ev,"text-right")}>{k(e,"rate")}</td>
                                        <td className={ed(ek,ef,eb,ev)}>{ew(e.hours*e.rate)}</td>
                                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div aria-hidden="true" className={ed("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={ed(ex,"flex h-12 shrink-0 items-center justify-between px-4 sm:px-6")}>
            <span className="text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">
              {o.length}
              {" workstreams"}
            </span>
            <span className={ed(ep,ef)}>
              <span className={eh}>{"Total budget "}</span>
              {ew(m)}
            </span>
          </footer>
        </div>
      </div>
  );
}
