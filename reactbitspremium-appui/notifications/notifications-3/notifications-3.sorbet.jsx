/**
 * React Bits Pro — Application UI (notifications-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { key, label, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_67812 = [["path",{d:"M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_20320 = [["path",{d:"M13.5 2H10.5C8.14298 2 6.96447 2 6.23223 2.73223C5.5 3.46447 5.5 4.64298 5.5 7V17C5.5 19.357 5.5 20.5355 6.23223 21.2678C6.96447 22 8.14298 22 10.5 22H13.5C15.857 22 17.0355 22 17.7678 21.2678C18.5 20.5355 18.5 19.357 18.5 17V7C18.5 4.64298 18.5 3.46447 17.7678 2.73223C17.0355 2 15.857 2 13.5 2Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.125 19H12M12.25 19C12.25 19.1381 12.1381 19.25 12 19.25C11.8619 19.25 11.75 19.1381 11.75 19C11.75 18.8619 11.8619 18.75 12 18.75C12.1381 18.75 12.25 18.8619 12.25 19Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_48419 = [["path",{d:"M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let ea = (...e)=>e.filter(Boolean).join(" ");

let et = "bg-white dark:bg-neutral-950";

let en = "text-neutral-900 dark:text-neutral-100";

let ei = "text-neutral-900/62 dark:text-neutral-100/62";

let el = "text-[14px]/[20px] font-medium";

let eo = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let es = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let ec = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]";

let ed = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let e_ = ea("text-[17px]/[22px] font-extrabold",en);

let ex = ea(el,ei);

let eb = ea(el,"text-neutral-900/78 dark:text-neutral-100/78");

let eu = ea("text-[13px]/[16px] font-semibold tabular-nums",ei);

let ep = ea("text-[15px]/[20px] font-bold",en);

let eh = [{key:"inApp",label:"In-app",icon:Icon_13473},{key:"email",label:"Email",icon:Icon_67812},{key:"push",label:"Push",icon:Icon_20320}];

let em = [{id:"mention",group:"Collaboration",label:"Mentions and replies",hint:"Someone names you in a comment or thread."},{id:"assign",group:"Collaboration",label:"Assigned to you",hint:"A task, review or ticket lands in your queue."},{id:"share",group:"Collaboration",label:"Shared with you",hint:"A board, document or dashboard is shared."},{id:"invoice",group:"Account",label:"Invoices and receipts",hint:"Monthly statements for Cedar Labs."},{id:"seats",group:"Account",label:"Seat changes",hint:"A member joins, leaves or changes role."},{id:"signin",group:"Security",label:"New sign-in",hint:"A session starts on an unrecognised device."},{id:"keys",group:"Security",label:"API key activity",hint:"A key is created, rotated or revoked."}];

let ek = {mention:{inApp:true,email:true,push:true},assign:{inApp:true,email:true,push:false},share:{inApp:true,email:false,push:false},invoice:{inApp:false,email:true,push:false},seats:{inApp:true,email:true,push:false},signin:{inApp:true,email:true,push:true},keys:{inApp:true,email:true,push:false}};

let ev = ["Collaboration","Account","Security"];

let ef = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function eg({checked:e,onChange:r,label:a}){
  return (
    <button type="button" role="switch" aria-checked={e} aria-label={a} onClick={()=>r(!e)} className="group relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] p-0.5 shadow-[inset_0_1px_2px_rgb(84_62_32/0.14),inset_0_0_0_1px_rgb(84_62_32/0.05)] transition-[background-color,box-shadow,outline-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:aria-[checked=false]:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_94%,black)] aria-checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] aria-checked:shadow-[inset_0_1px_2px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_75%,black)] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-neutral-100/16 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)] dark:hover:aria-[checked=false]:not-disabled:bg-neutral-100/24 dark:aria-checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-checked:shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)]">
        <span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[translate,width] duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-active:w-6 group-aria-checked:translate-x-4 group-aria-checked:group-active:translate-x-3 group-disabled:shadow-none dark:bg-white" />
      </button>
  );
}


export default function notifications_3__Sorbet__Component(){
  let[e,r]=useState(ek),[a,i]=useState(true),[l,o]=useState(["Sat","Sun"]),[c,d]=useState(true),{ref:_,edges:x,onScroll:b}=function(e){
    let r=useRef(null),[a,t]=useState({start:false,end:false}),i=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=e;
      t({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      i();
      let e=r.current,a=e?.ownerDocument.defaultView;
      if(!e||!a?.ResizeObserver)return;
      let t=new a.ResizeObserver(i);
      return t.observe(e),()=>t.disconnect();
    }, [i,e]),{ref:r,edges:a,onScroll:i};
  }(a?"quiet":"always"),u=useMemo(()=>{
    let r={};
    for(let a of ev){
      let t=em.filter(e=>e.group===a);
      r[a]={inApp:t.every(r=>e[r.id].inApp),email:t.every(r=>e[r.id].email),push:t.every(r=>e[r.id].push)}
    }
    return r;
  }, [e]),p=useMemo(()=>em.reduce((r,a)=>r+eh.filter(r=>e[a.id][r.key]).length,0), [e]);
  return (
    <div className={ea(et,en,"relative flex h-full min-h-[840px] w-full flex-col overflow-hidden")}>
        <header className={ea("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","px-5 py-4")}>
          <h2 className={e_}>Notification preferences</h2>
          <p className={ea(ex,"mt-1")}>
            {p}
            {" of "}
            {em.length*eh.length}
            {" deliveries enabled for this workspace."}
          </p>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={_} onScroll={b} className="h-full overflow-y-auto px-5 pb-4">
            <div className={ea(et,"sticky top-0 z-20 grid grid-cols-[1fr_repeat(3,48px)] items-center gap-2 px-4.5 pt-4 pb-2 sm:grid-cols-[1fr_repeat(3,72px)]")}>
              <span className={eu}>Event</span>
              {eh.map(e=>(
                <span key={e.key} className={ea(eu,"flex items-center justify-center gap-1.5")}>
                            <HugeiconsIcon icon={e.icon} size={14} strokeWidth={2} aria-hidden="true" className="max-sm:hidden" />
                            {e.label}
                          </span>
              ))}
            </div>
            <div className="space-y-4">
              {ev.map(a=>(
                <section key={a} className={ec}>
                            <div className="flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5">
                              <div className="grid w-full grid-cols-[1fr_repeat(3,48px)] items-center gap-2 pe-2 sm:grid-cols-[1fr_repeat(3,72px)]">
                                <span className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">{a}</span>
                                {eh.map(e=>(
                                  <div key={e.key} className="flex justify-center">
                                                    <button type="button" onClick={()=>{
                                                      var t,n;
                                                      return t=e.key,n=!u[a][e.key],void(r(e=>{
                                                        let r={...e};
                                                        for(let e of em)e.group===a&&(r[e.id]={...r[e.id],[t]:n});
                                                        return r;
                                                      }),d(false));
                                                    }} className={ea(eo,"h-7 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-[13px]/[16px] font-bold tabular-nums")}>{u[a][e.key]?"None":"All"}</button>
                                                  </div>
                                ))}
                              </div>
                            </div>
                            <ul className={ea(ed,"divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7")}>
                              {em.filter(e=>e.group===a).map(a=>(
                                <li key={a.id} className="grid grid-cols-[1fr_repeat(3,48px)] items-center gap-2 px-3 py-3 sm:grid-cols-[1fr_repeat(3,72px)]">
                                                <div className="min-w-0 sm:pr-4">
                                                  <p id={`${a.id}-label`} className={ea(ep,"truncate")}>{a.label}</p>
                                                  <p className={ea(eb,"truncate")}>{a.hint}</p>
                                                </div>
                                                {eh.map(n=>(
                                                  <div key={key} className="flex justify-center">
                                                                    <eg checked={e[a.id][key]} onChange={e=>{
                                                                      var t,i;
                                                                      return t=a.id,i=key,void(r(r=>({...r,[t]:{...r[t],[i]:e}})),d(false));
                                                                    }} label={`${a.label}: ${label}`} />
                                                                  </div>
                                                ))}
                                              </li>
                              ))}
                            </ul>
                          </section>
              ))}
            </div>
            <div className={ea(ec,"mt-4")}>
              <div className={ea(ed,"mt-1 px-3 py-3")}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={ea("flex size-9 shrink-0 items-center justify-center text-neutral-900/78 dark:text-neutral-100/78","size-[28px]")}>
                      <HugeiconsIcon icon={Icon_48419} size={16} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <div>
                      <p className={ep}>Quiet hours</p>
                      <p className={ea(eb,"mt-0.5")}>Hold email and push between 20:00 and 08:00. In-app stays on.</p>
                    </div>
                  </div>
                  <div className="flex w-12 shrink-0 justify-center sm:w-[72px]">
                    <eg checked={a} onChange={e=>{
                      i(e),d(false)
                    }} label="Quiet hours" />
                  </div>
                </div>
                {a&&<div className="flex flex-wrap gap-1.5 pt-4">
                  {ef.map(e=>{
                    let r=l.includes(e);
                    return (
                      <button key={e} type="button" aria-pressed={r} onClick={()=>{
                                        o(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e]),d(false)
                                      }} className="relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40">{e}</button>
                    );
                  })}
                </div>}
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={ea("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-10 z-10 h-8",x.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={ea("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8",x.end?"opacity-100":"opacity-0")} />
        </div>
        <footer className={ea("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex items-center justify-between gap-3 px-5 py-3")}>
          <span className={ex}>{c?"All changes saved":"Unsaved changes"}</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={()=>{
              r(ek),i(true),o(["Sat","Sun"]),d(true)
            }} className={ea(eo,es)}>Reset</button>
            <button type="button" onClick={()=>d(true)} disabled={c} className={ea("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",es)}>Save preferences</button>
          </div>
        </footer>
      </div>
  );
}
