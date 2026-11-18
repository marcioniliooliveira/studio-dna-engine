/**
 * React Bits Pro — Application UI (ai-usage-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { left, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-[14px]/[16px] font-[450]",
  u = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  x = o("text-[13px]/[18px] font-normal","text-neutral-900/66 dark:text-neutral-100/66"),
  p = e=>`$${e.toLocaleString("en-US",{maximumFractionDigits:0})}`;

function b({value:e,min:a,max:r,step:n,onChange:s,labelledBy:i}){
  let d=useRef(null),[c,u]=useState(false),x=(e-a)/(r-a)*100,b=e=>Math.min(r,Math.max(a,a+Math.round((e-a)/n)*n)),h=e=>{
    let t=d.current;
    if(!t)return;
    let l=t.getBoundingClientRect();
    width<=0||s(b(a+(e-left)/width*(r-a)))
  };
  return (
    <div className="relative flex h-4 min-w-0 flex-1 cursor-pointer touch-none items-center" onPointerDown={e=>{
        e.currentTarget.setPointerCapture(e.pointerId),e.currentTarget.querySelector('[role="slider"]')?.focus({preventScroll:true}),u(true),h(e.clientX)
      }} onPointerMove={e=>c&&h(e.clientX)} onPointerUp={()=>u(false)} onPointerCancel={()=>u(false)}>
        <div ref={d} className="relative h-1 w-full grow rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8">
          <span className={o("absolute inset-y-0 rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))]","left-0")} style={{width:`${x}%`}} />
          <span role="slider" tabIndex={0} aria-labelledby={i} aria-valuemin={a} aria-valuemax={r} aria-valuenow={e} aria-valuetext={p(e)} onKeyDown={t=>{
            let l="ArrowRight"===t.key||"ArrowUp"===t.key?e+n:"ArrowLeft"===t.key||"ArrowDown"===t.key?e-n:"PageUp"===t.key?e+4*n:"PageDown"===t.key?e-4*n:"Home"===t.key?a:"End"===t.key?r:null;
            null!==l&&(t.preventDefault(),s(b(l)))
          }} className="absolute top-1/2 block size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] shadow-[0_0_0_2px_white] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:shadow-[0_0_0_2px_var(--color-neutral-900)]" style={{left:`${x}%`}} />
        </div>
      </div>
  );
}

let h = [50,75,90];

function m(){
  let[e,a]=useState(2500),[r,m]=useState([75,90]),[k,f]=useState(true),[_,g]=useState(false),v=Math.min(100,1840/e*100),w=Math.round(2612.7999999999997),j=w>e;
  return (
    <div className={o("bg-white dark:bg-neutral-950",d,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[640px]">
          <div className="mb-3">
            <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Budget and alerts</h2>
            <p className={o(x,"mt-0.5")}>Cap monthly model spend and decide who hears about it.</p>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
              <div className="p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className={x}>This month</p>
                  <p className={o(x,"tabular-nums")}>
                    <span className={o("text-[20px]/[24px] font-[450] tracking-[-0.015em]",d)}>{p(1840)}</span>
                    {" "}
                    {"of "}
                    {p(e)}
                  </p>
                </div>
                <div role="progressbar" aria-valuenow={Math.round(v)} aria-valuemin={0} aria-valuemax={100} aria-label="Budget consumed" className={o("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-3 h-2")}>
                  <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${v}%`}} />
                </div>
                <div className={o(x,"mt-3 flex items-start gap-2")}>
                  {j&&<HugeiconsIcon icon={Icon_36474} size={14} strokeWidth={1.8} aria-hidden="true" className={o("text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","mt-0.5 shrink-0")} />}
                  <span className="min-w-0">
                    {"Projected "}
                    {p(w)}
                    {" at current pace"}
                    {j?", over budget on the 26th":", within budget"}
                    .
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p id="ai-usage-5-budget" className={u}>Monthly cap</p>
                <div className="mt-2 flex items-center gap-3">
                  <b value={e} min={500} max={1e4} step={250} onChange={a} labelledBy="ai-usage-5-budget" />
                  <span className={o(c,"w-16 shrink-0 text-right tabular-nums")}>{p(e)}</span>
                </div>
                <p className={o(u,"mt-6")}>Notify at</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {h.map(e=>{
                    let a=r.includes(e);
                    return (
                      <button key={e} type="button" aria-pressed={a} onClick={()=>m(a=>a.includes(e)?a.filter(a=>a!==e):[...a,e].sort((e,a)=>e-a))} className={o("relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40","tabular-nums")}>
                                        {a&&<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" />}
                                        {e}
                                        % of cap
                                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                {[["Pause requests at 100%","New calls return a quota error until the next cycle.",k,f],["Weekly spend digest","Sent to workspace admins every Monday.",_,g]].map(([e,a,r,l])=>(
                  <div key={e} className="flex items-center justify-between gap-4 px-3 py-3">
                                <div className="min-w-0">
                                  <p className={o(c,"truncate")}>{e}</p>
                                  <p className={o(x,"truncate")}>{a}</p>
                                </div>
                                <button type="button" role="switch" aria-checked={r} aria-label={e} onClick={()=>l(!r)} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
                                  <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
                                </button>
                              </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default m;
