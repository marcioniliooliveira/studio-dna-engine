/**
 * React Bits Pro — Application UI (list-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1209 = [["path",{d:"M19.8598 15.8599C20.5537 14.5522 21 13.0186 21 11.2371L21 7.74821C21 6.34255 21 5.63972 20.5504 4.91385C20.1008 4.18797 19.6368 3.95712 18.7088 3.4954C16.8165 2.55388 14.5009 2.00006 12 2.00006C10.1475 2.00006 8.3966 2.30394 6.84414 2.8442M4.1416 4.14166C3.8764 4.33979 3.6614 4.57189 3.4496 4.91385C3 5.63972 3 6.34254 3 7.7482V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4339C10.9067 21.8113 11.2735 22.0001 12 22.0001C12.7265 22.0001 13.0933 21.8113 13.8269 21.4339C15.0804 20.789 16.7679 19.734 18.1912 18.1913",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2 2.00006L22 22.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_20320 = [["path",{d:"M13.5 2H10.5C8.14298 2 6.96447 2 6.23223 2.73223C5.5 3.46447 5.5 4.64298 5.5 7V17C5.5 19.357 5.5 20.5355 6.23223 21.2678C6.96447 22 8.14298 22 10.5 22H13.5C15.857 22 17.0355 22 17.7678 21.2678C18.5 20.5355 18.5 19.357 18.5 17V7C18.5 4.64298 18.5 3.46447 17.7678 2.73223C17.0355 2 15.857 2 13.5 2Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.125 19H12M12.25 19C12.25 19.1381 12.1381 19.25 12 19.25C11.8619 19.25 11.75 19.1381 11.75 19C11.75 18.8619 11.8619 18.75 12 18.75C12.1381 18.75 12.25 18.8619 12.25 19Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_79698 = [["path",{d:"M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 6.5L16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_78062 = [["path",{d:"M6 18C6 18.4644 6 18.6965 6.022 18.8918C6.20482 20.5145 7.48545 21.7952 9.10814 21.978C9.30345 22 9.53562 22 9.99998 22H13C16.2998 22 17.9497 22 18.9749 20.9749C20 19.9498 20 18.2998 20 15L20 8.99998C20 5.70016 20 4.05024 18.9748 3.02512C17.9497 2 16.2998 2 13 2H9.99998C9.53563 2 9.30345 2 9.10814 2.02201C7.48545 2.20483 6.20482 3.48547 6.022 5.10816C6 5.30347 6 5.53565 6 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.07612 11.1183C4 11.3021 4 11.535 4 12.001C4 12.4669 4 12.6999 4.07612 12.8837C4.17761 13.1287 4.37229 13.3234 4.61732 13.4249C4.80109 13.501 5.03406 13.501 5.5 13.501H10.5C10.5002 15.2503 10.511 16.1299 11.0623 16.3858C11.0829 16.3954 11.1037 16.4042 11.1249 16.4124C11.7045 16.6353 12.3999 16.0139 13.7907 14.7711C15.2576 13.4602 15.9912 12.7851 16 11.957C15.9912 11.1289 15.2576 10.4538 13.7907 9.14301C12.3999 7.90018 11.7045 7.27876 11.1249 7.50171C11.1037 7.50985 11.0829 7.51869 11.0623 7.52822C10.5018 7.78844 10.5 8.69318 10.5 10.501H5.5C5.03406 10.501 4.80109 10.501 4.61732 10.5771C4.37229 10.6786 4.17761 10.8733 4.07612 11.1183Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_25136 = [["path",{d:"M12.495 14.0662L11.5 13.9999C11.1446 14.0096 10.8134 14.0225 10.5008 14.0378C6.8 14.2192 3.78417 17.3057 3.5 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20.5 15.9999L18 18.4999M18 18.4999L15.5 20.9999M18 18.4999L20.5 20.9999M18 18.4999L15.5 15.9999",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11.5",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_27796 = [["path",{d:"M2.5 8.18677C2.60406 6.08705 2.91537 4.77792 3.84664 3.84664C4.77792 2.91537 6.08705 2.60406 8.18677 2.5M21.5 8.18677C21.3959 6.08705 21.0846 4.77792 20.1534 3.84664C19.2221 2.91537 17.9129 2.60406 15.8132 2.5M15.8132 21.5C17.9129 21.3959 19.2221 21.0846 20.1534 20.1534C21.0846 19.2221 21.3959 17.9129 21.5 15.8132M8.18676 21.5C6.08705 21.3959 4.77792 21.0846 3.84664 20.1534C2.91537 19.2221 2.60406 17.9129 2.5 15.8132",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 17L17.2978 16.1511C17.1307 15.4497 16.5989 14.8925 15.9061 14.6929L13.5 13.9994L13.4997 12.5318C14.3964 11.9266 14.9997 10.7955 14.9997 9.5C14.9997 7.567 13.6565 6 11.9997 6C10.3428 6 8.99966 7.567 8.99966 9.5C8.99966 10.7955 9.60296 11.9266 10.4997 12.5318L10.5 13.9994L8.10885 14.6994C7.43747 14.896 6.91757 15.429 6.73787 16.1051L6.5 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_85585 = [["path",{d:"M5.0249 21C5.04385 19.2643 5.04366 17.5541 5.0366 15.9209M5.0366 15.9209C5.01301 10.4614 4.91276 5.86186 5.19475 4.04271C5.5611 1.67939 9.39301 3.82993 13.9703 5.59842L16.0328 6.48729C17.5508 7.1415 19.7187 8.30352 18.7662 9.66084C18.3738 10.22 17.56 10.8596 16.0575 11.567L5.0366 15.9209Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let h = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  m = "text-neutral-900/80 dark:text-neutral-100/80",
  f = "text-neutral-900/66 dark:text-neutral-100/66",
  k = "text-[13px]/[18px] font-normal",
  v = [{day:"Today",events:[{id:"e-01",kind:"signin",icon:Icon_1209,title:"Impossible-travel sign-in blocked",actor:"priya.nair@northwind.co",target:["Krak\xf3w, PL then Austin, US in 22 min"],time:"2m ago",anomaly:true},{id:"e-02",kind:"device",icon:Icon_20320,title:"New device approved",actor:"marcus.hale",target:["iPhone 15","iOS 18.2"],time:"16m ago"},{id:"e-03",kind:"permission",icon:Icon_20484,title:"Role raised to Workspace admin",actor:"granted by dana.okafor",target:["for lars.eriksson"],time:"48m ago"},{id:"e-04",kind:"permission",icon:Icon_79698,title:"Personal access token issued",actor:"marcus.hale",target:["scope: repo, read:org","expires in 90d"],time:"1h ago"},{id:"e-05",kind:"signin",icon:Icon_78062,title:"Sign-in from a new location",actor:"dana.okafor",target:["Lisbon, PT","Chrome on macOS"],time:"2h ago"}]},{day:"Yesterday",events:[{id:"e-06",kind:"permission",icon:Icon_20484,title:"SSO enforcement enabled",actor:"dana.okafor",target:["SAML now required for all members"],time:"18:24"},{id:"e-07",kind:"device",icon:Icon_20320,title:"Device signed out remotely",actor:"revoked by dana.okafor",target:["Pixel 8","last seen 6d ago"],time:"14:07"},{id:"e-08",kind:"permission",icon:Icon_25136,title:"Member removed from workspace",actor:"removed by dana.okafor",target:["contractor.wei, access revoked"],time:"11:52"},{id:"e-09",kind:"signin",icon:Icon_27796,title:"Passkey enrolled",actor:"lars.eriksson",target:["Touch ID","MacBook Pro"],time:"09:31"}]},{day:"Tue 3 Feb",events:[{id:"e-10",kind:"permission",icon:Icon_79698,title:"API key rotated",actor:"automation",target:["nightly job","billing-service, previous key revoked"],time:"03:00"},{id:"e-11",kind:"signin",icon:Icon_78062,title:"Sign-in from a trusted device",actor:"priya.nair",target:["Krak\xf3w, PL","Firefox on Windows"],time:"08:14"},{id:"e-12",kind:"permission",icon:Icon_20484,title:"Recovery codes regenerated",actor:"marcus.hale",target:["10 new single-use codes"],time:"16:45"}]}],
  g = [{id:"all",label:"All"},{id:"signin",label:"Sign-ins"},{id:"permission",label:"Permissions"},{id:"device",label:"Devices"}],
  w = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function _(){
  let[e,t]=useState("all"),[r,l]=useState(false),{ref:s,edges:d,onScroll:c}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),u=useMemo(()=>"all"!==e||r?v.map(t=>({day:t.day,events:t.events.filter(t=>("all"===e||t.kind===e)&&(!r||true===t.anomaly))})).filter(e=>e.events.length>0):v, [e,r]),x=useMemo(()=>u.reduce((e,t)=>e+t.events.length,0), [u]);
  return (
    <div className={h("bg-white dark:bg-neutral-950",b,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className="mx-auto flex w-full max-w-[720px] shrink-0 flex-col">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={h("text-[20px]/[24px] font-[450] tracking-[-0.015em]",b)}>Security activity</h2>
              <p className={h(k,f,"mt-1")}>Access, sign-in and permission events across the workspace.</p>
            </div>
            <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2">
              <button type="button" aria-pressed={r} onClick={()=>l(e=>!e)} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                <HugeiconsIcon icon={Icon_85585} size={14} strokeWidth={1.8} aria-hidden="true" />
                Flagged
              </button>
              <div role="radiogroup" aria-label="Filter events" onKeyDown={w} className={h("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-7","shrink-0")}>
                {g.map(r=>{
                  let n=e===r.id;
                  return <button key={r.id} type="button" role="radio" aria-checked={n} tabIndex={n?0:-1} onClick={()=>t(r.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{r.label}</button>;
                })}
              </div>
            </div>
          </div>
          <div className={h("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","relative mt-4 shrink-0")}>
            <div ref={s} onScroll={c} className="h-[432px] overflow-y-auto px-2 pb-1">
              {0===x?<div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <span className="flex h-10 w-10 items-center justify-center">
                  <HugeiconsIcon icon={Icon_20484} size={20} strokeWidth={1.8} aria-hidden="true" className={m} />
                </span>
                <p className={h("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-3")}>No matching events</p>
                <p className={h("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Nothing matches this category and flag combination.</p>
                <button type="button" onClick={()=>{
                  t("all"),l(false)
                }} className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-4")}>Clear filters</button>
              </div>:u.map(e=>(
                <section key={e.day}>
                            <div className={h("bg-white dark:bg-neutral-900","text-[12px]/[16px] font-normal tabular-nums",f,"sticky top-0 z-20 px-3 pb-1.5 pt-2")}>{e.day}</div>
                            <ul className={h("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex flex-col px-0 pb-1")}>
                              {e.events.map(e=>(
                                <li key={e.id}>
                                                <div className={h("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","rounded-[var(--rb-r-sm,6px)]",e.anomaly?"bg-[oklch(94.5%_0.027_26/0.4)] hover:bg-[oklch(94.5%_0.027_26/0.6)] dark:bg-[oklch(29%_0.06_26/0.4)] dark:hover:bg-[oklch(29%_0.06_26/0.6)]":"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","h-14 px-3")}>
                                                  <span className={h("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","size-10")}>
                                                    <HugeiconsIcon icon={e.icon} size={18} strokeWidth={1.8} aria-hidden="true" className={e.anomaly?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":undefined} />
                                                  </span>
                                                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                    <div className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">
                                                      <p className="truncate">{e.title}</p>
                                                      {e.anomaly&&<span className={h("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]","shrink-0")}>Blocked</span>}
                                                    </div>
                                                    <p data-description className={h(k,f,"truncate")}>
                                                      <span className={m}>{e.actor}</span>
                                                      {e.target.map(e=><span key={e} className="ms-3">{e}</span>)}
                                                    </p>
                                                  </div>
                                                  <time className="shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{e.time}</time>
                                                </div>
                                              </li>
                              ))}
                            </ul>
                          </section>
              ))}
            </div>
            <div aria-hidden="true" className={h("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 z-10 h-8",d.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8",d.end?"opacity-100":"opacity-0")} />
          </div>
          <p className={h(k,f,"mt-3 px-1 tabular-nums")}>
            {x}
            {" "}
            {1===x?"event":"events"}
            {" shown"}
          </p>
        </div>
      </div>
  );
}


export default _;
