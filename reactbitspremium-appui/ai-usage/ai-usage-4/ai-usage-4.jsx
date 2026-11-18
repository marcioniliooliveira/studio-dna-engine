/**
 * React Bits Pro — Application UI (ai-usage-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let i = (...e)=>e.filter(Boolean).join(" "),
  o = "text-neutral-900/66 dark:text-neutral-100/66",
  d = "text-[14px]/[16px] font-[450]",
  c = i("text-[13px]/[18px] font-normal",o),
  u = i("text-[12px]/[16px] font-normal tabular-nums",o),
  x = e=>`$${e.toLocaleString("en-US",{maximumFractionDigits:0})}`,
  p = [{name:"Priya Nandakumar",email:"priya@northwind.io",team:"Platform",tokens:418e5,cost:384,seatCap:500},{name:"Marcus Bell",email:"marcus@northwind.io",team:"Support",tokens:284e5,cost:261,seatCap:300},{name:"Sofia Alvarez",email:"sofia@northwind.io",team:"Platform",tokens:221e5,cost:203,seatCap:500},{name:"Tom\xe1s Guerrero",email:"tomas@northwind.io",team:"Research",tokens:196e5,cost:180,seatCap:200},{name:"Wei Chen",email:"wei@northwind.io",team:"Support",tokens:112e5,cost:103,seatCap:300},{name:"Amelia Whitfield",email:"amelia@northwind.io",team:"Research",tokens:64e5,cost:59,seatCap:200},{name:"Jonas Vikander",email:"jonas@northwind.io",team:"Platform",tokens:29e5,cost:27,seatCap:500}],
  b = ["All teams","Platform","Support","Research"];

function h(){
  let[e,a]=useState("All teams"),[r,o]=useState(""),h=useMemo(()=>{
    let a=r.trim().toLowerCase();
    return p.filter(r=>("All teams"===e||r.team===e)&&(!a||r.name.toLowerCase().includes(a)||r.email.toLowerCase().includes(a)));
  }, [e,r]),m=h.reduce((e,a)=>e+a.cost,0);
  return (
    <div className={i("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[720px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Usage by member</h2>
              <p className={i(c,"mt-0.5 truncate")}>
                {x(m)}
                {" across "}
                {h.length}
                {" seat"}
                {1===h.length?"":"s"}
                {" this month."}
              </p>
            </div>
            <div className={i("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","shrink-0 sm:w-56")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <input type="search" value={r} onChange={e=>o(e.target.value)} placeholder="Search members" aria-label="Search members" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={i("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","mt-1")}>
              <div className={i("flex max-w-full min-w-0 items-center gap-1 overflow-x-auto shadow-[inset_0_-1px_0_color-mix(in_oklab,var(--color-neutral-900)_8%,transparent)] [scrollbar-width:none] dark:shadow-[inset_0_-1px_0_color-mix(in_oklab,var(--color-neutral-100)_8%,transparent)]","px-1 pt-1")} role="tablist" aria-label="Team" onKeyDown={r=>{
                var t,l,n;
                let s;
                return t=b.length,l=b.indexOf(e),n=e=>a(b[e]),void(!((s="ArrowRight"===r.key||"ArrowDown"===r.key?(l+1)%t:"ArrowLeft"===r.key||"ArrowUp"===r.key?(l-1+t)%t:"Home"===r.key?0:"End"===r.key?t-1:-1)<0)&&(r.preventDefault(),n(s),r.currentTarget.querySelectorAll('[role="tab"]')[s]?.focus()));
              }}>
                {b.map(r=><button key={r} type="button" role="tab" aria-selected={r===e} tabIndex={r===e?0:-1} onClick={()=>a(r)} className="relative inline-flex min-h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900/80 select-none transition-[color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-neutral-900 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent aria-selected:text-neutral-900 aria-selected:after:bg-neutral-900 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-neutral-100 dark:disabled:text-neutral-100/40">{r}</button>)}
              </div>
              <div className={i("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","min-h-[320px]")}>
                {0===h.length?<div className="flex h-[320px] flex-col items-center justify-center gap-1 px-6 text-center">
                  <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No members match</p>
                  <p className="max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">Try a different name or clear the team filter.</p>
                </div>:h.map(e=>{
                  let a,r=Math.min(100,e.cost/e.seatCap*100);
                  return (
                    <div key={e.email} className="p-1">
                                    <div className={i("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","rounded-[var(--rb-r-sm,6px)]","flex items-center gap-3 p-2")}>
                                      <span aria-hidden="true" className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
                                        <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                                          {e.name.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("")}
                                        </span>
                                      </span>
                                      <div className="min-w-0 flex-1">
                                        <p className={i(d,"truncate")}>{e.name}</p>
                                        <p className={i(u,"flex gap-x-3 truncate")}>
                                          <span>{e.team}</span>
                                          <span>
                                            {(a=e.tokens)>=1e6?`${(a/1e6).toFixed(a>=1e7?0:1)}M`:a>=1e3?`${(a/1e3).toFixed(a>=1e4?0:1)}k`:`${a}`}
                                            {" tokens"}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="hidden w-32 shrink-0 sm:block">
                                        <div className={i("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","h-1.5")}>
                                          <div className={r>=95?i("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full"):r>=80?i("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"):"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100"} style={{width:`${r}%`}} />
                                        </div>
                                        <p className={i(u,"mt-1")}>
                                          {Math.round(r)}
                                          {"% of "}
                                          {x(e.seatCap)}
                                          {" cap"}
                                        </p>
                                      </div>
                                      <p className={i(d,"w-16 shrink-0 text-right tabular-nums")}>{x(e.cost)}</p>
                                    </div>
                                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default h;
