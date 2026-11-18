/**
 * React Bits Pro — Application UI (ai-usage-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let n = (...e)=>e.filter(Boolean).join(" ");

let o = "text-neutral-900 dark:text-neutral-100";

let i = "text-neutral-900/62 dark:text-neutral-100/62";

let B = (...e)=>e.filter(Boolean).join(" ");

let H = "text-neutral-900/62 dark:text-neutral-100/62";

let O = "text-[15px]/[20px] font-bold";

let K = B("text-[14px]/[20px] font-medium",H);

let J = B("text-[13px]/[16px] font-semibold tabular-nums",H);

let Z = e=>`$${e.toLocaleString("en-US",{maximumFractionDigits:0})}`;

let Q = [{name:"Priya Nandakumar",email:"priya@northwind.io",team:"Platform",tokens:418e5,cost:384,seatCap:500},{name:"Marcus Bell",email:"marcus@northwind.io",team:"Support",tokens:284e5,cost:261,seatCap:300},{name:"Sofia Alvarez",email:"sofia@northwind.io",team:"Platform",tokens:221e5,cost:203,seatCap:500},{name:"Tom\xe1s Guerrero",email:"tomas@northwind.io",team:"Research",tokens:196e5,cost:180,seatCap:200},{name:"Wei Chen",email:"wei@northwind.io",team:"Support",tokens:112e5,cost:103,seatCap:300},{name:"Amelia Whitfield",email:"amelia@northwind.io",team:"Research",tokens:64e5,cost:59,seatCap:200},{name:"Jonas Vikander",email:"jonas@northwind.io",team:"Platform",tokens:29e5,cost:27,seatCap:500}];

let V = ["All teams","Platform","Support","Research"];


export default function ai_usage_4__Sorbet__Component(){
  let[e,a]=useState("All teams"),[r,n]=useState(""),o=useMemo(()=>{
    let a=r.trim().toLowerCase();
    return Q.filter(r=>("All teams"===e||r.team===e)&&(!a||r.name.toLowerCase().includes(a)||r.email.toLowerCase().includes(a)));
  }, [e,r]),i=o.reduce((e,a)=>e+a.cost,0);
  return (
    <div className={B("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[720px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[17px]/[22px] font-extrabold">Usage by member</h2>
              <p className={B(K,"mt-0.5 truncate")}>
                {Z(i)}
                {" across "}
                {o.length}
                {" seat"}
                {1===o.length?"":"s"}
                {" this month."}
              </p>
            </div>
            <div className={B("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10","shrink-0 sm:w-56")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <input type="search" value={r} onChange={e=>n(e.target.value)} placeholder="Search members" aria-label="Search members" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
            <div className={B("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","mt-1")}>
              <div className={B("flex max-w-full min-w-0 items-center gap-1.5 overflow-x-auto shadow-[inset_0_-2px_0_color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] [scrollbar-width:none] dark:shadow-[inset_0_-2px_0_color-mix(in_oklab,var(--color-neutral-100)_9%,transparent)]","px-1 pt-1")} role="tablist" aria-label="Team" onKeyDown={r=>{
                var t,l,n;
                let o;
                return t=V.length,l=V.indexOf(e),n=e=>a(V[e]),void(!((o="ArrowRight"===r.key||"ArrowDown"===r.key?(l+1)%t:"ArrowLeft"===r.key||"ArrowUp"===r.key?(l-1+t)%t:"Home"===r.key?0:"End"===r.key?t-1:-1)<0)&&(r.preventDefault(),n(o),r.currentTarget.querySelectorAll('[role="tab"]')[o]?.focus()));
              }}>
                {V.map(r=><button key={r} type="button" role="tab" aria-selected={r===e} tabIndex={r===e?0:-1} onClick={()=>a(r)} className="relative inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[calc(var(--rb-r-lg,10px))] px-3 text-[15px]/[20px] font-bold whitespace-nowrap text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-neutral-900 after:absolute after:inset-x-2.5 after:bottom-0 after:h-[3px] after:rounded-[calc(var(--rb-r-full,999px))] after:bg-transparent after:transition-[background-color] aria-selected:text-neutral-900 aria-selected:after:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:disabled:text-neutral-100/40">{r}</button>)}
              </div>
              <div className={B("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","min-h-[320px]")}>
                {0===o.length?<div className="flex h-[320px] flex-col items-center justify-center gap-1 px-6 text-center">
                  <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No members match</p>
                  <p className="max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78">Try a different name or clear the team filter.</p>
                </div>:o.map(e=>{
                  let a,r=Math.min(100,e.cost/e.seatCap*100);
                  return (
                    <div key={e.email} className="p-1">
                                    <div className={B("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","rounded-[var(--rb-r-4xl,18px)]","flex items-center gap-3 p-2")}>
                                      <span aria-hidden="true" className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
                                        <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">
                                          {e.name.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("")}
                                        </span>
                                      </span>
                                      <div className="min-w-0 flex-1">
                                        <p className={B(O,"truncate")}>{e.name}</p>
                                        <p className={B(J,"flex gap-x-3 truncate")}>
                                          <span>{e.team}</span>
                                          <span>
                                            {(a=e.tokens)>=1e6?`${(a/1e6).toFixed(a>=1e7?0:1)}M`:a>=1e3?`${(a/1e3).toFixed(a>=1e4?0:1)}k`:`${a}`}
                                            {" tokens"}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="hidden w-32 shrink-0 sm:block">
                                        <div className={B("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","h-1.5")}>
                                          <div className={r>=95?B("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full"):r>=80?B("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"):"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]"} style={{width:`${r}%`}} />
                                        </div>
                                        <p className={B(J,"mt-1")}>
                                          {Math.round(r)}
                                          {"% of "}
                                          {Z(e.seatCap)}
                                          {" cap"}
                                        </p>
                                      </div>
                                      <p className={B(O,"w-16 shrink-0 text-right tabular-nums")}>{Z(e.cost)}</p>
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
