/**
 * React Bits Pro — Application UI (settings-form-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { useReducedMotion } from 'motion/react';

const Icon_6097 = [["path",{d:"M5.25 21H18.75C18.9822 21 19.0983 21 19.196 20.9904C20.1456 20.8968 20.8968 20.1456 20.9904 19.196C21 19.0983 21 18.9822 21 18.75C21 18.5178 21 18.4017 20.9904 18.304C20.8968 17.3544 20.1456 16.6032 19.196 16.5096C19.0983 16.5 18.9822 16.5 18.75 16.5H17.0607C16.8324 16.5 16.7182 16.5 16.6087 16.5121C16.2317 16.5538 15.8742 16.7018 15.5781 16.939C15.4921 17.0079 15.4114 17.0886 15.25 17.25C15.0886 17.4114 15.0079 17.4921 14.9219 17.561C14.6258 17.7982 14.2683 17.9462 13.8913 17.9879C13.7818 18 13.6676 18 13.4393 18H10.5607C10.3324 18 10.2182 18 10.1087 17.9879C9.73165 17.9462 9.37423 17.7982 9.07814 17.561C8.99213 17.4921 8.91142 17.4114 8.75 17.25C8.58858 17.0886 8.50787 17.0079 8.42186 16.939C8.12577 16.7018 7.76835 16.5538 7.3913 16.5121C7.28177 16.5 7.16763 16.5 6.93934 16.5H5.25C5.01783 16.5 4.90175 16.5 4.80397 16.5096C3.85441 16.6032 3.10315 17.3544 3.00963 18.304C3 18.4017 3 18.5178 3 18.75C3 18.9822 3 19.0983 3.00963 19.196C3.10315 20.1456 3.85441 20.8968 4.80397 20.9904C4.90175 21 5.01783 21 5.25 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.5 7.49996C16.5 7.49996 13.1858 3.00001 12 3C10.8141 2.99999 7.5 7.5 7.5 7.5M12 4V15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  p = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  m = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  f = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  _ = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  k = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  v = "max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  g = "flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  w = b("text-[16px]/[20px] font-[450] tracking-[-0.015em]",x),
  j = b("text-[13px]/[18px] font-normal","text-neutral-900/80 dark:text-neutral-100/80"),
  y = {name:"Mara Whitfield",username:"mara.whitfield",email:"mara.whitfield@northwind.co",role:"Product designer",bio:"Designing the tools our operations team uses every day. Previously at Fieldbase."};

function N({id:e,label:r,description:a,native:n,changed:l,children:i}){
  return (
    <div className="flex flex-col gap-3 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex min-h-5 items-center gap-2">
            {n?<label htmlFor={e} className={k}>{r}</label>:<span id={`${e}-label`} className={k}>{r}</span>}
            {l?<span className={b("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>Changed</span>:null}
          </div>
          <p id={`${e}-hint`} className={b(v,"mt-0.5")}>{a}</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-80 sm:shrink-0">{i}</div>
      </div>
  );
}

function C(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:t+l<n-1})
    }, []);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      t();
      let a=r.ownerDocument.defaultView?.ResizeObserver,n=a?new a(t):null;
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),C=useReducedMotion(),[S,z]=useState({...y,username:"mara"}),[D,E]=useState(y),[A,R]=useState(false),[$,T]=useState(null),M=useRef(null);
  useEffect(()=>{
    if($)return ()=>URL.revokeObjectURL($);
  }, [$]);
  let L=e=>r=>z(a=>({...a,[e]:r})),W=useMemo(()=>{
    let e=S.username.trim();
    return e.length<3?"Use at least 3 characters.":/^[a-z0-9-]+$/.test(e)?"mara"===e?"mara is taken. Try another handle.":undefined:"Use lowercase letters, numbers, and hyphens only.";
  }, [S.username]),U=S.bio.length>160?`Remove ${S.bio.length-160} characters to fit the limit.`:undefined,H=useMemo(()=>Object.keys(S).filter(e=>S[e]!==D[e]), [S,D]),I=H.length>0,B=I&&!W&&!U;
  return (
    <div className={b("bg-white dark:bg-neutral-950",x,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0 px-4 sm:px-6">
          <div className="mx-auto flex h-14 w-full max-w-2xl items-center"><h2 className={b(w,"truncate")}>Public profile</h2></div>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={a} className="h-full overflow-y-auto px-4 sm:px-6">
            <div className="mx-auto w-full max-w-2xl pb-4 sm:pb-6">
              <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
                <div className={b("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","py-3")}>
                  <div className="min-w-0">
                    <h3 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Account</h3>
                    <p className={b("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>The profile other people see when you collaborate.</p>
                  </div>
                </div>
                <div className={b("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8")}>
                  <div className="flex flex-col gap-3 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex min-h-5 items-center"><p className={k}>Profile photo</p></div>
                      <p className={b(v,"mt-0.5")}>JPG, PNG, or GIF up to 2 MB.</p>
                    </div>
                    <div className="flex w-full items-center gap-3 sm:w-80 sm:shrink-0 sm:justify-end">
                      <input ref={M} type="file" accept="image/png,image/jpeg,image/gif" className="sr-only" aria-label="Upload a profile photo" onChange={e=>{
                        let r=e.target.files?.[0];
                        r&&T(URL.createObjectURL(r)),e.target.value=""
                      }} />
                      <span className={b("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-10")}>
                        {$?<img src={$} alt="Your profile photo" className="size-full object-cover" />:<span aria-hidden="true" className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">MW</span>}
                      </span>
                      <div className="flex min-w-0 flex-1 flex-wrap justify-end gap-2 sm:flex-none">
                        <button type="button" className={b(h,m)} onClick={()=>M.current?.click()}>
                          <HugeiconsIcon icon={Icon_6097} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                          Change
                        </button>
                        {$?<button type="button" className={b(h,m)} onClick={()=>T(null)}>
                          <HugeiconsIcon icon={Icon_34951} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                          Remove
                        </button>:null}
                      </div>
                    </div>
                  </div>
                  <N id="pf-name" changed={H.includes("name")} label="Full name" description="Shown with comments, edits, and shared documents." native>
                    <div className={b(f,"h-8")}>
                      <input id="pf-name" value={S.name} aria-describedby="pf-name-hint" onChange={e=>L("name")(e.target.value)} className={_} />
                    </div>
                  </N>
                  <N id="pf-role" changed={H.includes("role")} label="Title" description="A short role that appears beneath your name." native>
                    <div className={b(f,"h-8")}>
                      <input id="pf-role" value={S.role} aria-describedby="pf-role-hint" onChange={e=>L("role")(e.target.value)} className={_} />
                    </div>
                  </N>
                  <N id="pf-username" changed={H.includes("username")} label="Username" description="This is the address of your public profile." native>
                    <div className={b(f,"h-8")}>
                      <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">northwind.co/</span>
                      <input id="pf-username" value={S.username} aria-invalid={!!W||undefined} aria-describedby={W?"pf-username-error pf-username-hint":"pf-username-hint"} onChange={e=>L("username")(e.target.value)} className={_} />
                    </div>
                    {W?<p id="pf-username-error" role="alert" className={g}>
                      <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                      {W}
                    </p>:null}
                  </N>
                  <N id="pf-email" changed={H.includes("email")} label="Email" description="Used for sign-in and account notices." native>
                    <div className={b(f,"h-8")}>
                      <input id="pf-email" type="email" value={S.email} aria-describedby="pf-email-hint pf-email-help" onChange={e=>L("email")(e.target.value)} className={_} />
                    </div>
                    <p id="pf-email-help" className={v}>Never shown publicly.</p>
                  </N>
                  <N id="pf-bio" changed={H.includes("bio")} label="Bio" description="A short line under your name." native>
                    <textarea id="pf-bio" rows={3} value={S.bio} aria-invalid={!!U||undefined} aria-describedby={U?"pf-bio-error pf-bio-hint":"pf-bio-hint pf-bio-count"} onChange={e=>L("bio")(e.target.value)} className="block max-h-[256px] min-h-[76px] w-full min-w-48 resize-none rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 py-2 text-[14px]/[20px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none field-sizing-content transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-neutral-900/66 hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none read-only:border-transparent read-only:bg-neutral-900/5 read-only:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:placeholder:text-neutral-100/66 dark:hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40 dark:read-only:bg-neutral-100/5" />
                    {U?<p id="pf-bio-error" role="alert" className={g}>
                      <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                      {U}
                    </p>:<p id="pf-bio-count" className={b(v,"text-right")}>
                      <span className="tabular-nums">{S.bio.length}</span>
                      {" "}
                      {"of "}
                      <span className="tabular-nums">160</span>
                      {" "}
                      characters
                    </p>}
                  </N>
                </div>
                <div className={b("flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2","max-sm:flex-col max-sm:items-stretch max-sm:has-[button]:pe-4")}>
                  <p aria-live="polite" className={b(j,"flex min-w-0 items-center gap-2 sm:me-auto")}>
                    {I?<span className="truncate">Unsaved profile changes</span>:<>
                      <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className={b("text-neutral-900/66 dark:text-neutral-100/66","shrink-0")} />
                      <span className="truncate">Profile up to date</span>
                    </>}
                  </p>
                  <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <button type="button" onClick={()=>z(D)} disabled={!I||A} className={b(h,p,"w-full sm:w-auto")}>Cancel</button>
                    <button type="button" onClick={()=>{
                      B&&!A&&(R(true),window.setTimeout(()=>{
                        E(S),R(false)
                      },700*!C))
                    }} disabled={!B} aria-busy={A} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",p,"w-full min-w-[7.5rem] sm:w-auto")}>
                      <span className="grid place-items-center *:[grid-area:1/1]">
                        <span className={b("inline-flex items-center gap-2",A&&"invisible")}>Save profile</span>
                        {A&&<span className="inline-flex items-center gap-2">
                          <HugeiconsIcon icon={Icon_79715} size={16} strokeWidth={1.8} aria-hidden="true" className="animate-spin [animation-duration:800ms] motion-reduce:animate-none" />
                          Saving
                        </span>}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={b("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={b("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default C;
