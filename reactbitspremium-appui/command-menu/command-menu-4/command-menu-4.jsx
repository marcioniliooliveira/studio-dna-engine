/**
 * React Bits Pro — Application UI (command-menu-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_44647 = [["path",{d:"M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 15.5V21.5M21 18.5L15 18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11",cy:"6.5",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_22670 = [["path",{d:"M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_68820 = [["path",{d:"M5 15H12C15.7712 15 17.6569 15 18.8284 13.8284C20 12.6569 20 10.7712 20 7V4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.99996 20C8.99996 20 4.00001 16.3176 4 15C3.99999 13.6824 9 10 9 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[13px]/[18px] font-normal",
  _ = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  v = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  k = "mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950",
  g = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  w = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  j = x(h,"text-neutral-900/80 dark:text-neutral-100/80"),
  y = x(h,p);

function N(){
  let e=useRef(null),[r,t]=useState({start:false,end:false}),a=useCallback(()=>{
    let r=e.current;
    if(!r)return;
    let{scrollTop:a,scrollHeight:n,clientHeight:l}=r;
    t({start:a>1,end:Math.ceil(a+l)<n-1})
  }, []);
  return useEffect(()=>{
    a();
    let r=e.current,t=r?.ownerDocument.defaultView;
    if(!r||!t?.ResizeObserver)return;
    let n=new t.ResizeObserver(a);
    return observe(r),()=>disconnect();
  }, [a]),{ref:e,edges:r,onScroll:a};
}

let S = [{id:"invite",title:"Invite a teammate",detail:"Add someone to Northwind",icon:Icon_44647,cta:"Send invite",fields:[{id:"email",label:"Email address",kind:"text",placeholder:"name@company.com"},{id:"role",label:"Role",kind:"select",options:["Viewer","Editor","Admin"]}],summary:e=>`Invite ${e.email||"this person"} to Northwind as ${(e.role||"a member").toLowerCase()}.`},{id:"rerun",title:"Rerun a workflow",detail:"Trigger a fresh run",icon:Icon_59157,cta:"Start run",fields:[{id:"workflow",label:"Workflow",kind:"select",options:["Staged deploy","Rotate signing keys","Nightly backup"]},{id:"ref",label:"Git ref",kind:"text",placeholder:"main"}],summary:e=>`Run ${e.workflow||"a workflow"} on ${e.ref||"main"}.`},{id:"archive",title:"Archive a project",detail:"Hide it from the workspace",icon:Icon_22670,cta:"Archive project",destructive:true,fields:[{id:"project",label:"Project",kind:"select",options:["Ledger billing","Relay notifications","Beacon status page"]}],summary:e=>`Archive ${e.project||"a project"}. Members lose access until it is restored.`}],
  $ = {invite:{email:"erin.walsh@northwind.io",role:"Editor"},rerun:{workflow:"Staged deploy",ref:"main"},archive:{project:"Ledger billing"}};

function C({children:e}){
  return <kbd className="inline-flex min-h-5 min-w-5 w-fit items-center justify-center gap-1 rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1 font-mono text-[12px]/[16px] tabular-nums text-neutral-900/80 dark:text-neutral-100/80 select-none">{e}</kbd>;
}

function z(){
  let e=useId(),r=useRef(null),t=useRef(null),{ref:i,edges:o,onScroll:s}=N(),{ref:z,edges:A,onScroll:D}=N(),R=useRef(null),E=useRef(null),T=useRef(null),F=useRef(undefined),L=useRef(undefined),[K,M]=useState(true),[W,B]=useState(true),[I,H]=useState("form"),[O,q]=useState("invite"),[J,P]=useState(""),[V,G]=useState(0),[U,Q]=useState(()=>JSON.parse(JSON.stringify($))),X=`${e}-listbox`,Y=S.find(e=>e.id===O)??S[0],Z=U[O]??{},ee=useMemo(()=>{
    let e=J.trim().toLowerCase();
    return e?S.filter(r=>`${r.title} ${r.detail}`.toLowerCase().includes(e)):S;
  }, [J]),er=ee[V],et=er?`${e}-${er.id}`:undefined;
  useEffect(()=>{
    K&&("select"===I?R.current?.focus({preventScroll:true}):T.current?.focus({preventScroll:true}))
  }, [K,I]),useEffect(()=>{
    let e=i.current,r=e?.querySelector('[data-active="true"]');
    if(!e||!r)return;
    let t=e.getBoundingClientRect(),a=r.getBoundingClientRect();
    if(a.top<t.top+32){
      let r=e.scrollTop-(t.top+32-a.top);
      e.scrollTop=r<32?0:r
    }else if(a.bottom>t.bottom-32){
      let r=e.scrollHeight-e.clientHeight,n=e.scrollTop+(a.bottom-t.bottom+32);
      e.scrollTop=n>r-32?r:n
    }
  }, [V,J,I,i]),useEffect(()=>()=>{
    cancelAnimationFrame(F.current??0),clearTimeout(L.current)
  }, []);
  let ea=useCallback(e=>{
    clearTimeout(L.current),M(true),e?(B(false),F.current=requestAnimationFrame(()=>B(true))):B(true)
  }, []),en=useCallback(()=>{
    B(false),clearTimeout(L.current),L.current=setTimeout(()=>{
      M(false),E.current?.focus({preventScroll:true})
    },140)
  }, []);
  useEffect(()=>{
    let e=r.current?.ownerDocument??document,t=e=>{
      (e.metaKey||e.ctrlKey)&&"k"===e.key.toLowerCase()&&(e.preventDefault(),ea(false))
    };
    return e.addEventListener("keydown",t),()=>e.removeEventListener("keydown",t);
  }, [ea]);
  let el=useCallback(e=>{
    q(e.id),H("form"),P("")
  }, []),ei=(e,r)=>{
    Q(t=>({...t,[O]:{...t[O],[e]:r}}))
  },eo=e=>{
    let r=ee.length;
    0!==r&&G(t=>(t+e+r)%r)
  };
  return (
    <section ref={r} className={x("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[400px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={E} type="button" aria-haspopup="dialog" aria-expanded={K} onClick={()=>ea(true)} className={x(m,v)}>
          Run an action
          <C>⌘K</C>
        </button>
        {K&&<>
          <button type="button" tabIndex={-1} aria-label="Close menu" onClick={en} className={x("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-40 cursor-default",W?"opacity-100":x(_,"opacity-0"))} />
          <div ref={t} role="dialog" aria-modal="true" aria-labelledby={`${e}-title`} onKeyDown={e=>{
            if("Escape"===e.key){
              e.preventDefault(),en();
              return
            }
            if("Tab"!==e.key)return;
            let r=t.current;
            if(!r)return;
            let a=Array.from(r.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
            if(0===a.length)return;
            let n=a[0],l=a[a.length-1],i=r.ownerDocument.activeElement;
            e.shiftKey&&i===n?(e.preventDefault(),l.focus({preventScroll:true})):e.shiftKey||i!==l||(e.preventDefault(),focus({preventScroll:true}))
          }} className={x("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","absolute left-1/2 top-[12%] z-50 max-h-[min(76%,calc(100%-4rem))] w-[calc(100%-2rem)] max-w-md -translate-x-1/2",W?"opacity-100":x(_,"opacity-0"))}>
            {"select"===I?<>
              <h2 id={`${e}-title`} className="sr-only">Run an action</h2>
              <div className={k}>
                <div className={x("flex min-h-10 shrink-0 items-center gap-2 border-b border-neutral-900/8 ps-4 pe-2 text-neutral-900/66 dark:text-neutral-100/66 has-[input:focus-visible]:border-transparent has-[input:focus-visible]:shadow-[inset_0_0_0_1px_var(--rb-accent,oklch(20.5%_0_0))] dark:border-neutral-100/8 dark:has-[input:focus-visible]:shadow-[inset_0_0_0_1px_var(--rb-accent,oklch(100%_0_0))]","h-12")}>
                  <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                  <label htmlFor={`${e}-input`} className="sr-only">Find an action</label>
                  <input ref={R} id={`${e}-input`} role="combobox" aria-expanded="true" aria-controls={X} aria-activedescendant={et} aria-autocomplete="list" value={J} onChange={e=>{
                    P(e.target.value),G(0)
                  }} onKeyDown={e=>{
                    switch(e.key){case"ArrowDown":e.preventDefault(),eo(1);break;case"ArrowUp":e.preventDefault(),eo(-1);break;case"Home":e.preventDefault(),G(0);break;case"End":e.preventDefault(),G(Math.max(ee.length-1,0));break;case"Enter":if(!er)break;e.preventDefault(),el(er)}
                  }} placeholder="Find an action" className="h-full min-w-0 flex-1 bg-transparent text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
                </div>
                <div className="relative min-h-0 flex-1">
                  <div ref={i} onScroll={s} className="h-full overflow-y-auto p-2">
                    {ee.length>0?<div id={X} role="listbox" aria-label="Actions">
                      {ee.map((r,t)=>{
                        let n=t===V;
                        return (
                          <button key={r.id} id={`${e}-${r.id}`} role="option" aria-selected={n} data-active={n} data-highlighted={n||undefined} type="button" tabIndex={-1} onPointerMove={()=>G(t)} onMouseDown={e=>{
                                                e.preventDefault(),el(r)
                                              }} className={x("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","min-h-11")}>
                                                <HugeiconsIcon icon={r.icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                  <span className="truncate">{r.title}</span>
                                                  <span className={x(j,"truncate")}>{r.detail}</span>
                                                </span>
                                              </button>
                        );
                      })}
                    </div>:<div className="flex flex-col items-center px-2.5 py-8 text-center">
                      <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">
                        No action matches “
                        {J.trim()}
                        ”
                      </p>
                      <button type="button" onMouseDown={e=>{
                        e.preventDefault(),P(""),G(0),R.current?.focus({preventScroll:true})
                      }} className={x(m,v,"mt-3")}>Clear search</button>
                    </div>}
                  </div>
                  <div aria-hidden="true" className={x(g,"pointer-events-none absolute inset-x-0 top-0 h-8",o.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={x(w,"pointer-events-none absolute inset-x-0 bottom-0 h-8",o.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
            </>:<form onSubmit={e=>{
              e.preventDefault(),"form"===I?H("confirm"):en()
            }} className="flex min-h-0 flex-1 flex-col">
              <div className={k}>
                <div className="flex h-12 shrink-0 items-center gap-3 px-4">
                  <button type="button" aria-label={"confirm"===I?"Back to details":"Back to actions"} onClick={()=>"confirm"===I?H("form"):H("select")} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]","-ml-1.5")}>
                    <HugeiconsIcon icon={Icon_18976} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  <h2 id={`${e}-title`} className={x("min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","flex-1")}>{Y.title}</h2>
                  <span className={x("text-[12px]/[16px] font-normal tabular-nums",p,"shrink-0")}>{"form"===I?"Step 1 of 2":"Step 2 of 2"}</span>
                </div>
                <div className="relative min-h-0 flex-1">
                  <div ref={z} onScroll={D} className="h-full overflow-y-auto px-4 pt-1 pb-4">
                    {"form"===I?<div className="flex flex-col gap-4">
                      {Y.fields.map((r,t)=>(
                        <div key={r.id} className="flex flex-col gap-2">
                                            <label htmlFor={`${e}-${r.id}`} className="flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{r.label}</label>
                                            {"text"===r.kind?<div className={x("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                                              <input ref={0===t?T:undefined} id={`${e}-${r.id}`} value={Z[r.id]??""} onChange={e=>ei(r.id,e.target.value)} placeholder={r.placeholder} className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                                            </div>:<div className="relative">
                                              <select ref={0===t?T:undefined} id={`${e}-${r.id}`} value={Z[r.id]??r.options[0]} onChange={e=>ei(r.id,e.target.value)} className={x("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full appearance-none pr-8")}>{r.options.map(e=><option key={e} value={e}>{e}</option>)}</select>
                                              <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className={x("shrink-0 text-neutral-900/80 dark:text-neutral-100/80","pointer-events-none absolute right-3 top-1/2 -translate-y-1/2")} />
                                            </div>}
                                          </div>
                      ))}
                    </div>:<div>
                      <p className={h}>{Y.summary(Z)}</p>
                      <dl className={x("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-3 flex flex-col")}>
                        {Y.fields.map(e=>(
                          <div key={e.id} className="flex min-h-10 min-w-0 items-center justify-between gap-4">
                                                <dt className={x("min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66","shrink-0")}>{e.label}</dt>
                                                <dd className={x("flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","justify-end text-right")}>
                                                  {Z[e.id]||<span className="text-neutral-900/66 dark:text-neutral-100/66">None</span>}
                                                </dd>
                                              </div>
                        ))}
                      </dl>
                    </div>}
                  </div>
                  <div aria-hidden="true" className={x(g,"pointer-events-none absolute inset-x-0 top-0 h-8",A.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={x(w,"pointer-events-none absolute inset-x-0 bottom-0 h-8",A.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
              <div className={x(y,"flex h-14 shrink-0 items-center gap-4 ps-5 pe-3")}>
                <span className="inline-flex items-center gap-1.5">
                  <C>
                    <HugeiconsIcon icon={Icon_68820} size={12} strokeWidth={1.8} aria-hidden="true" />
                  </C>
                  {"form"===I?"to review":"to confirm"}
                </span>
                <span className="hidden items-center gap-1.5 sm:inline-flex">
                  <C>esc</C>
                  to close
                </span>
                {"form"===I?<button type="submit" className={x(f,v,"ml-auto")}>Review</button>:<button type="button" onClick={en} className={x(Y.destructive?"relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-[oklch(60%_0.236_26)] bg-white text-[oklch(51%_0.18_26)] shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-[oklch(51%_0.18_26)] active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-[oklch(65.2%_0.219_26)] dark:bg-neutral-900 dark:text-[oklch(76%_0.14_26)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-[oklch(76%_0.14_26)] dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40":f,v,"ml-auto")}>{Y.cta}</button>}
              </div>
            </form>}
            {"select"===I&&<div className={x(y,"flex h-10 shrink-0 items-center gap-4 px-5")}>
              <span className="inline-flex items-center gap-1.5">
                <C>
                  <HugeiconsIcon icon={Icon_68820} size={12} strokeWidth={1.8} aria-hidden="true" />
                </C>
                to choose
              </span>
              <span className="inline-flex items-center gap-1.5">
                <C>esc</C>
                to close
              </span>
            </div>}
          </div>
        </>}
      </section>
  );
}


export default z;
