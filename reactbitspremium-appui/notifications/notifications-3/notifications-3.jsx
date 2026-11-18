/**
 * React Bits Pro — Application UI (notifications-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { key, label, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_67812 = [["path",{d:"M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_20320 = [["path",{d:"M13.5 2H10.5C8.14298 2 6.96447 2 6.23223 2.73223C5.5 3.46447 5.5 4.64298 5.5 7V17C5.5 19.357 5.5 20.5355 6.23223 21.2678C6.96447 22 8.14298 22 10.5 22H13.5C15.857 22 17.0355 22 17.7678 21.2678C18.5 20.5355 18.5 19.357 18.5 17V7C18.5 4.64298 18.5 3.46447 17.7678 2.73223C17.0355 2 15.857 2 13.5 2Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.125 19H12M12.25 19C12.25 19.1381 12.1381 19.25 12 19.25C11.8619 19.25 11.75 19.1381 11.75 19C11.75 18.8619 11.8619 18.75 12 18.75C12.1381 18.75 12.25 18.8619 12.25 19Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_48419 = [["path",{d:"M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "bg-white dark:bg-neutral-950",
  x = "text-neutral-900 dark:text-neutral-100",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[13px]/[18px] font-normal",
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  m = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  f = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  v = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  k = c("text-[16px]/[20px] font-[450] tracking-[-0.015em]",x),
  _ = c(p,b),
  g = c(p,"text-neutral-900/80 dark:text-neutral-100/80"),
  w = c("text-[12px]/[16px] font-normal tabular-nums",b),
  y = c("text-[14px]/[16px] font-[450]",x),
  j = [{key:"inApp",label:"In-app",icon:Icon_13473},{key:"email",label:"Email",icon:Icon_67812},{key:"push",label:"Push",icon:Icon_20320}],
  N = [{id:"mention",group:"Collaboration",label:"Mentions and replies",hint:"Someone names you in a comment or thread."},{id:"assign",group:"Collaboration",label:"Assigned to you",hint:"A task, review or ticket lands in your queue."},{id:"share",group:"Collaboration",label:"Shared with you",hint:"A board, document or dashboard is shared."},{id:"invoice",group:"Account",label:"Invoices and receipts",hint:"Monthly statements for Cedar Labs."},{id:"seats",group:"Account",label:"Seat changes",hint:"A member joins, leaves or changes role."},{id:"signin",group:"Security",label:"New sign-in",hint:"A session starts on an unrecognised device."},{id:"keys",group:"Security",label:"API key activity",hint:"A key is created, rotated or revoked."}],
  A = {mention:{inApp:true,email:true,push:true},assign:{inApp:true,email:true,push:false},share:{inApp:true,email:false,push:false},invoice:{inApp:false,email:true,push:false},seats:{inApp:true,email:true,push:false},signin:{inApp:true,email:true,push:true},keys:{inApp:true,email:true,push:false}},
  z = ["Collaboration","Account","Security"],
  S = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function C(){
  let[e,r]=useState(A),[t,l]=useState(true),[s,o]=useState(["Sat","Sun"]),[b,p]=useState(true),{ref:C,edges:E,onScroll:W}=function(e){
    let r=useRef(null),[t,a]=useState({start:false,end:false}),i=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:i}=e;
      a({start:t>1,end:Math.ceil(t+i)<n-1})
    }, []);
    return useEffect(()=>{
      i();
      let e=r.current,t=e?.ownerDocument.defaultView;
      if(!e||!t?.ResizeObserver)return;
      let a=new t.ResizeObserver(i);
      return a.observe(e),()=>a.disconnect();
    }, [i,e]),{ref:r,edges:t,onScroll:i};
  }(t?"quiet":"always"),M=useMemo(()=>{
    let r={};
    for(let t of z){
      let a=N.filter(e=>e.group===t);
      r[t]={inApp:a.every(r=>e[r.id].inApp),email:a.every(r=>e[r.id].email),push:a.every(r=>e[r.id].push)}
    }
    return r;
  }, [e]),D=useMemo(()=>N.reduce((r,t)=>r+j.filter(r=>e[t.id][r.key]).length,0), [e]);
  return (
    <div className={c(u,x,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <header className={c("border-b border-neutral-900/8 dark:border-neutral-100/8","px-5 py-4")}>
          <h2 className={k}>Notification preferences</h2>
          <p className={c(_,"mt-1")}>
            {D}
            {" of "}
            {N.length*j.length}
            {" deliveries enabled for this workspace."}
          </p>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={C} onScroll={W} className="h-full overflow-y-auto px-5 pb-4">
            <div className={c(u,"sticky top-0 z-20 grid grid-cols-[1fr_repeat(3,48px)] items-center gap-2 px-4.5 pt-4 pb-2 sm:grid-cols-[1fr_repeat(3,72px)]")}>
              <span className={w}>Event</span>
              {j.map(e=>(
                <span key={e.key} className={c(w,"flex items-center justify-center gap-1.5")}>
                            <HugeiconsIcon icon={e.icon} size={12} strokeWidth={1.8} aria-hidden="true" className="max-sm:hidden" />
                            {e.label}
                          </span>
              ))}
            </div>
            <div className="space-y-4">
              {z.map(t=>(
                <section key={t} className={f}>
                            <div className="flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2">
                              <div className="grid w-full grid-cols-[1fr_repeat(3,48px)] items-center gap-2 pe-2 sm:grid-cols-[1fr_repeat(3,72px)]">
                                <span className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{t}</span>
                                {j.map(e=>(
                                  <div key={e.key} className="flex justify-center">
                                                    <button type="button" onClick={()=>{
                                                      var a,n;
                                                      return a=e.key,n=!M[t][e.key],void(r(e=>{
                                                        let r={...e};
                                                        for(let e of N)e.group===t&&(r[e.id]={...r[e.id],[a]:n});
                                                        return r;
                                                      }),p(false));
                                                    }} className={c(h,"h-6 gap-1 rounded-[var(--rb-r-sm,6px)] px-2 text-[12px]/[16px] font-[450] tabular-nums")}>{M[t][e.key]?"None":"All"}</button>
                                                  </div>
                                ))}
                              </div>
                            </div>
                            <ul className={c(v,"divide-y divide-neutral-900/8 dark:divide-neutral-100/8")}>
                              {N.filter(e=>e.group===t).map(t=>(
                                <li key={t.id} className="grid grid-cols-[1fr_repeat(3,48px)] items-center gap-2 px-3 py-3 sm:grid-cols-[1fr_repeat(3,72px)]">
                                                <div className="min-w-0 sm:pr-4">
                                                  <p id={`${t.id}-label`} className={c(y,"truncate")}>{t.label}</p>
                                                  <p className={c(g,"truncate")}>{t.hint}</p>
                                                </div>
                                                {j.map(n=>(
                                                  <div key={key} className="flex justify-center">
                                                                    <R checked={e[t.id][key]} onChange={e=>{
                                                                      var a,i;
                                                                      return a=t.id,i=key,void(r(r=>({...r,[a]:{...r[a],[i]:e}})),p(false));
                                                                    }} label={`${t.label}: ${label}`} />
                                                                  </div>
                                                ))}
                                              </li>
                              ))}
                            </ul>
                          </section>
              ))}
            </div>
            <div className={c(f,"mt-4")}>
              <div className={c(v,"mt-1 px-3 py-3")}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={c("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","size-[28px]")}>
                      <HugeiconsIcon icon={Icon_48419} size={14} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <div>
                      <p className={y}>Quiet hours</p>
                      <p className={c(g,"mt-0.5")}>Hold email and push between 20:00 and 08:00. In-app stays on.</p>
                    </div>
                  </div>
                  <div className="flex w-12 shrink-0 justify-center sm:w-[72px]">
                    <R checked={t} onChange={e=>{
                      l(e),p(false)
                    }} label="Quiet hours" />
                  </div>
                </div>
                {t&&<div className="flex flex-wrap gap-1.5 pt-4">
                  {S.map(e=>{
                    let r=s.includes(e);
                    return (
                      <button key={e} type="button" aria-pressed={r} onClick={()=>{
                                        o(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e]),p(false)
                                      }} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">{e}</button>
                    );
                  })}
                </div>}
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-10 z-10 h-8",E.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8",E.end?"opacity-100":"opacity-0")} />
        </div>
        <footer className={c("border-t border-neutral-900/8 dark:border-neutral-100/8","flex items-center justify-between gap-3 px-5 py-3")}>
          <span className={_}>{b?"All changes saved":"Unsaved changes"}</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={()=>{
              r(A),l(true),o(["Sat","Sun"]),p(true)
            }} className={c(h,m)}>Reset</button>
            <button type="button" onClick={()=>p(true)} disabled={b} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",m)}>Save preferences</button>
          </div>
        </footer>
      </div>
  );
}

function R({checked:e,onChange:r,label:t}){
  return (
    <button type="button" role="switch" aria-checked={e} aria-label={t} onClick={()=>r(!e)} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
        <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
      </button>
  );
}


export default C;
