/**
 * React Bits Pro — Application UI (scheduling-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58661 = [["path",{d:"M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_87924 = [["path",{d:"M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-neutral-900/40 dark:text-neutral-100/40",
  _ = "text-[13px]/[18px] font-normal",
  f = "text-[12px]/[16px] font-normal tabular-nums",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  k = "size-8 rounded-[var(--rb-r-sm,6px)]",
  g = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  w = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  y = [31],
  j = Array.from({length:30},(e,r)=>r+1),
  N = [1,2,3,4],
  z = new Set([4,8,9,10,11,13,21,24,25,28]),
  S = [{id:"handoff",title:"Mobile QA handoff",state:"Upcoming",time:"2:30 pm",place:"Remote",people:["RS","MK","TA"]},{id:"allhands",title:"Quarterly all-hands",state:"Upcoming",time:"4:00 pm",place:"Main hall",people:["DV"]},{id:"campaign",title:"Campaign review",state:"Upcoming",time:"10:30 am",place:"Video call",people:["LM","PN","JR"]},{id:"panel",title:"Hiring panel: Design",state:"Confirmed",time:"11:00 am",place:"Room 4B",people:["AO","SE"]},{id:"retro",title:"Platform retro",state:"Confirmed",time:"5:15 pm",place:"Video call",people:["KT","BR"]},{id:"sync",title:"Support escalation sync",state:"Tentative",time:"6:00 pm",place:"Remote",people:["WH"]}];

function A({id:e,value:r,defaultValue:a,onChange:s,options:d,disabled:c,placeholder:u="Select…",className:b,triggerClassName:p,ariaLabel:h}){
  let _=useId(),[f,m]=useState(false),[v,k]=useState(0),[g,w]=useState(false),[y,j]=useState(),[N,z]=useState(a??""),S=useRef(null),A=useRef(null),E=useRef({buffer:"",at:0}),D=r??N,C=d.findIndex(e=>e.value===D),M=C>=0?d[C]:undefined,T=()=>{
    if(c)return;
    let e=S.current,r=e?.ownerDocument.defaultView;
    if(e&&r){
      let a=e.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let a=e.parentElement;a;a=a.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(a).overflowY)){
        let e=a.getBoundingClientRect();
        t=Math.max(t,e.top),l=Math.min(l,e.bottom);
        break
      }
      let n=l-a.bottom,i=a.top-t,o=Math.min(32*d.length+8,264),s=n<o+8&&i>n,c=(s?i:n)-8;
      w(s),j(c<o?Math.max(c,40):undefined)
    }
    k(C>=0?C:0),m(true)
  };
  useEffect(()=>{
    if(!f)return;
    let e=S.current;
    if(!e)return;
    let r=e.ownerDocument,a=r=>{
      e.contains(r.target)||m(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [f]),useEffect(()=>{
    if(!f)return;
    let e=A.current,r=e?.querySelector(`[data-index="${v}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [f,v]);
  let R=e=>{
    let a=d[e];
    a&&(undefined===r&&z(a.value),s?.(a.value),m(false),S.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={S} className={x("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={f} aria-controls={_} aria-haspopup="listbox" aria-label={h} disabled={c} onClick={()=>f?m(false):T()} onKeyDown={e=>{
          if(!c){
            if(!f){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),T());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),m(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),k(e=>Math.min(e+1,d.length-1));else if("ArrowUp"===e.key)e.preventDefault(),k(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),k(0);else if("End"===e.key)e.preventDefault(),k(d.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),R(v);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=E.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=d.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&k(t)
            }
          }
        }} className={x("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",p)}>
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {d.map(e=><span key={e.value} aria-hidden="true" className="invisible truncate">{e.label}</span>)}
            <span className={x("truncate",!M&&"text-neutral-900/66 dark:text-neutral-100/66")}>{M?M.label:u}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {f&&<ul ref={A} id={_} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={x("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {d.map((e,r)=>{
            let a=e.value===D;
            return (
              <li key={e.value} role="option" aria-selected={a} data-index={r} data-highlighted={r===v?"":undefined} onMouseEnter={()=>k(r)} onClick={()=>R(r)} className={x("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {a&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function E(){
  let[e,r]=useState(10),{ref:a,edges:i,onScroll:o}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=r;
      a({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let l=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }();
  return (
    <div className={x("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative h-full min-h-[720px] w-full overflow-y-auto p-6 sm:p-8")}>
        <section className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-5xl")}>
          <div className={x("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","mt-1")}>
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-[336px_1fr]">
              <div className="p-4">
                <div className="flex items-center gap-1.5">
                  <button type="button" aria-label="Previous month" className={x(v,k)}>
                    <HugeiconsIcon icon={Icon_58661} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  <A ariaLabel="Month" defaultValue="June" options={["April","May","June","July"].map(e=>({value:e,label:e}))} className="min-w-0 flex-1" />
                  <A ariaLabel="Year" defaultValue="2026" options={["2025","2026","2027"].map(e=>({value:e,label:e}))} className="shrink-0" triggerClassName="tabular-nums" />
                  <button type="button" aria-label="Next month" className={x(v,k)}>
                    <HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-7 justify-items-center gap-1">
                  {g.map(e=><div key={e} className={x(f,p,"pb-1 text-center")}>{e.slice(0,3)}</div>)}
                  {y.map(e=><div key={`lead-${e}`} aria-hidden="true" className={x(_,h,"flex size-8 items-center justify-center self-center tabular-nums")}>{e}</div>)}
                  {j.map(a=>{
                    let l=a===e;
                    return (
                      <button key={a} type="button" aria-pressed={l} onClick={()=>r(a)} className={x(l?m:v,k,_,"tabular-nums")}>
                                        {z.has(a)&&<span aria-hidden="true" className={x(!l&&p,"absolute top-1 size-1 bg-current")} />}
                                        {a}
                                      </button>
                    );
                  })}
                  {N.map(e=><div key={`trail-${e}`} aria-hidden="true" className={x(_,h,"flex size-8 items-center justify-center self-center tabular-nums")}>{e}</div>)}
                </div>
              </div>
              <div className="flex min-h-0 flex-col">
                <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-3 pt-4">
                  <div className="min-w-0">
                    <h2 className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>
                      {w[e%7]}
                      {", June "}
                      {e}
                    </h2>
                    <p className={x(f,p,"mt-0.5 flex min-w-0 gap-x-2")}>
                      <span className="truncate">
                        {S.length}
                        {" events"}
                      </span>
                      <span className="truncate">3 need a reply</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <A ariaLabel="Filter events" defaultValue="All events" options={["All events","Only mine","Needs reply"].map(e=>({value:e,label:e}))} className="hidden sm:block" />
                    <button type="button" className={x(m,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                      <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                      Add
                    </button>
                  </div>
                </div>
                <div className="relative min-h-0 flex-1">
                  <div ref={a} onScroll={o} className={x("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","h-full overflow-y-auto pb-4")}>
                    {S.map(e=>(
                      <div key={e.id} className="px-2 py-1">
                                        <article className={x("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","rounded-[var(--rb-r-sm,6px)]","px-2")}>
                                          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                            <h3 className={x("text-[14px]/[16px] font-[450]","truncate")}>{e.title}</h3>
                                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                                              <span className={x("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>{e.state}</span>
                                              <span className="flex items-center *:not-first:-ms-1 *:not-last:[mask-image:radial-gradient(50%_50%_at_calc(150%-4px)_50%,transparent_calc(100%+1.5px),#000_calc(100%+2px))]">
                                                {e.people.map(e=>(
                                                  <span key={e} role="img" aria-label={e} title={e} className={x("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[20px]")}>
                                                                              <span aria-hidden="true" className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.charAt(0)}</span>
                                                                            </span>
                                                ))}
                                              </span>
                                              <span className={x(f,p,"flex items-center gap-1.5")}>
                                                <HugeiconsIcon icon={Icon_29635} size={14} strokeWidth={1.8} aria-hidden="true" />
                                                {e.time}
                                              </span>
                                              <span className={x(f,p,"flex min-w-0 items-center gap-1.5")}>
                                                <HugeiconsIcon icon={Icon_87924} size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                                                <span className="truncate">{e.place}</span>
                                              </span>
                                            </div>
                                          </div>
                                        </article>
                                      </div>
                    ))}
                  </div>
                  <div aria-hidden="true" className={x("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",i.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}


export default E;
