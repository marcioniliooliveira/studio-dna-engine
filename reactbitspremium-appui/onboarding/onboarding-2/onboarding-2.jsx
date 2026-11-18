/**
 * React Bits Pro — Application UI (onboarding-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let s = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "text-[14px]/[16px] font-[450]",
  b = "text-[12px]/[16px] font-normal tabular-nums",
  x = "rounded-[var(--rb-r-sm,6px)]",
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  p = "h-11 gap-2 rounded-[var(--rb-r-sm,6px)] px-5 text-[16px]/[20px] font-[450] tracking-[-0.01em]",
  _ = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  k = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  m = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  f = "size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40",
  v = "relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",
  g = "cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8",
  w = "bg-neutral-900/9 dark:bg-neutral-100/9",
  j = [{id:"profile",label:"Profile",blurb:"Basic profile details."},{id:"role",label:"Role",blurb:"Tune starter views."},{id:"source",label:"Source",blurb:"Optional discovery signal."},{id:"workspace",label:"Workspace",blurb:"Name the workspace."},{id:"goals",label:"Goals",blurb:"Pick first workflows."},{id:"invite",label:"Invite",blurb:"Add teammates."}],
  y = ["Engineering","Design","Product","Operations"],
  N = ["Search","Social","A colleague","Conference talk"],
  S = ["Track work across teams","Automate handoffs","Report on delivery","Centralise documents"],
  z = {profile:{title:"Set up your profile",blurb:"Add the details teammates will see across the workspace."},role:{title:"What do you work on?",blurb:"We use this to pick the starter views you land on."},source:{title:"How did you find us?",blurb:"Optional, and it only ever shapes what we build next."},workspace:{title:"Name your workspace",blurb:"This appears in invitations and in the sidebar."},goals:{title:"What should we set up first?",blurb:"Pick as many as you like. You can change these later."},invite:{title:"Bring your team in",blurb:"Invitations stay open for 14 days."}};

function C(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=r;
      a({start:t>1,end:t+n<l-1})
    }, []);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      t();
      let a=r.ownerDocument.defaultView?.ResizeObserver,l=a?new a(t):null;
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),[C,A]=useState(0),[E,D]=useState("Sam Rivera"),[W,T]=useState("Product Lead"),[M,R]=useState("Product"),[H,L]=useState(""),[B,I]=useState("Northwind"),[P,F]=useState([S[0]]),[q,Y]=useState(["",""]),$=j[C],O=z[$.id],U=C===j.length-1,G=B.trim().toLowerCase().replace(/\s+/g,"-")||"workspace";
  return (
    <div className={s("bg-neutral-50 dark:bg-neutral-950",d,"relative flex h-full min-h-[720px] w-full overflow-hidden")}>
        <div className="hidden w-64 shrink-0 flex-col justify-center px-6 lg:flex">
          <ol className="space-y-0">
            {j.map((e,r)=>{
              let a=r<C,l=r===C;
              return (
                <li key={e.id}>
                            <button type="button" onClick={()=>A(r)} aria-current={l?"step":undefined} className={s("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",x,"flex w-full cursor-pointer items-start gap-3 px-1 py-1.5 text-left")}>
                              <span aria-hidden="true" className={s("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",a?"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14":l?"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100":"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14","mt-0.5")}>{a?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} />:r+1}</span>
                              <span className="min-w-0">
                                <span className={s(u,"block truncate",l||a?d:c)}>
                                  {e.label}
                                  {a&&<span className="sr-only">, done</span>}
                                  {l&&<span className="sr-only">, current</span>}
                                </span>
                                <span className={s(b,c,"block truncate")}>{e.blurb}</span>
                              </span>
                            </button>
                            {r<j.length-1&&<span aria-hidden="true" className={s("border-r border-neutral-900/8 dark:border-neutral-100/8","ml-4 block h-3 w-px")} />}
                          </li>
              );
            })}
          </ol>
        </div>
        <div className="flex min-w-0 flex-1 p-4 sm:p-6">
          <div className={s("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","min-w-0 flex-1")}>
            <form ref={e} onScroll={a} onSubmit={e=>{
              e.preventDefault(),U||A(e=>e+1)
            }} className="flex h-full w-full flex-col overflow-y-auto p-6 sm:p-10">
              <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col">
                <p className={s(b,c,"lg:hidden")}>
                  {"Step "}
                  {C+1}
                  {" of "}
                  {j.length}
                </p>
                <h2 className={s("text-[20px]/[24px] font-[450] tracking-[-0.015em]","mt-2 lg:mt-0")}>{O.title}</h2>
                <p className={s("text-[13px]/[18px] font-normal",c,"mt-1.5")}>{O.blurb}</p>
                <div className="mt-8 space-y-4">
                  {"profile"===$.id&&<>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ob2-name" className={m}>Full name</label>
                      <div className={s(_,"h-8")}>
                        <input id="ob2-name" value={E} onChange={e=>D(e.target.value)} placeholder="Your name" className={k} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ob2-title" className={m}>Job title</label>
                      <div className={s(_,"h-8")}>
                        <input id="ob2-title" value={W} onChange={e=>T(e.target.value)} placeholder="What you do" className={k} />
                      </div>
                    </div>
                  </>}
                  {"role"===$.id&&<div role="radiogroup" aria-label="Role" className="flex flex-col gap-1">
                    {y.map(e=>{
                      let r=e===M;
                      return (
                        <label key={e} className={s(v,r?w:g,x,"px-3")}>
                                            <input type="radio" name="ob2-role" value={e} checked={r} onChange={()=>R(e)} className={f} />
                                            <span className={s(u,"min-w-0 flex-1 truncate")}>{e}</span>
                                          </label>
                      );
                    })}
                  </div>}
                  {"source"===$.id&&<div role="radiogroup" aria-label="Source" className="flex flex-col gap-1">
                    {N.map(e=>{
                      let r=e===H;
                      return (
                        <label key={e} className={s(v,r?w:g,x,"px-3")}>
                                            <input type="radio" name="ob2-source" value={e} checked={r} onChange={()=>L(e)} className={f} />
                                            <span className={s(u,"min-w-0 flex-1 truncate")}>{e}</span>
                                          </label>
                      );
                    })}
                  </div>}
                  {"workspace"===$.id&&<div className="flex flex-col gap-2">
                    <label htmlFor="ob2-ws" className={m}>Workspace name</label>
                    <div className={s(_,"h-8")}>
                      <input id="ob2-ws" value={B} onChange={e=>I(e.target.value)} placeholder="Acme" aria-describedby="ob2-ws-hint" className={k} />
                    </div>
                    <p id="ob2-ws-hint" className="max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">
                      Your team will reach it at northwind.app/
                      {G}
                    </p>
                  </div>}
                  {"goals"===$.id&&<div className="flex flex-col gap-1">
                    {S.map(e=>{
                      let r=P.includes(e);
                      return (
                        <label key={e} className={s(v,r?w:g,x,"px-3")}>
                                            <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                                              <input type="checkbox" checked={r} onChange={()=>F(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e])} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                                              <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                                            </span>
                                            <span className={s(u,"min-w-0 flex-1 truncate")}>{e}</span>
                                          </label>
                      );
                    })}
                  </div>}
                  {"invite"===$.id&&<>
                    {q.map((e,r)=>(
                      <div key={r} className="flex flex-col gap-2">
                                        <label htmlFor={`ob2-invite-${r}`} className={m}>
                                          {"Email address "}
                                          {r+1}
                                        </label>
                                        <div className={s(_,"h-8")}>
                                          <input id={`ob2-invite-${r}`} type="email" value={e} onChange={e=>Y(a=>a.map((a,t)=>t===r?e.target.value:a))} placeholder="teammate@company.com" className={k} />
                                        </div>
                                      </div>
                    ))}
                    <button type="button" onClick={()=>Y(e=>[...e,""])} className={s(h,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                      <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                      Add another
                    </button>
                  </>}
                </div>
                <div className="mt-8 flex shrink-0 items-center gap-2 pt-4">
                  {C>0&&<button type="button" onClick={()=>A(e=>e-1)} className={s(h,p)}>Back</button>}
                  <button type="submit" className={s("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",p,"flex-1")}>{U?"Finish setup":"Continue"}</button>
                </div>
              </div>
            </form>
            <div aria-hidden="true" className={s("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={s("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default C;
