/**
 * React Bits Pro — Application UI (settings-form-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { useReducedMotion } from 'motion/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  b = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  h = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  p = "max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  m = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  f = "bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100",
  _ = c("text-[16px]/[20px] font-[450] tracking-[-0.015em]",u),
  k = c("text-[14px]/[16px] font-[450]",b),
  v = c("text-[13px]/[18px] font-normal",b),
  g = [{value:"system",label:"System"},{value:"light",label:"Light"},{value:"dark",label:"Dark"}],
  w = [{value:"comfortable",label:"Comfortable"},{value:"cozy",label:"Cozy"},{value:"compact",label:"Compact"}],
  j = [{value:"en",label:"English"},{value:"de",label:"German"},{value:"fr",label:"French"},{value:"ja",label:"Japanese"}];

function y({checked:e,onChange:r,labelledBy:a,describedBy:n}){
  return (
    <button type="button" role="switch" aria-checked={e} aria-labelledby={a} aria-describedby={n} onClick={()=>r(!e)} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
        <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
      </button>
  );
}

function N({id:e,label:r,description:a,badge:n,changed:l,native:i,inline:s,children:o}){
  return (
    <div className={c("px-3 py-2.5",s?"flex items-center justify-between gap-4":"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4")}>
        <div className="min-w-0 flex-1">
          <div className="flex min-h-5 flex-wrap items-center gap-2">
            {i?<label htmlFor={e} className={h}>{r}</label>:<span id={`${e}-label`} className={h}>{r}</span>}
            {n}
            {l?<span className={c(m,f)}>Changed</span>:null}
          </div>
          <p id={`${e}-hint`} className={c(p,"mt-0.5")}>{a}</p>
        </div>
        <div className={s?"shrink-0":"w-full sm:w-80 sm:shrink-0"}>{o}</div>
      </div>
  );
}

function C({id:e,value:r,onChange:a,options:l}){
  let d=useId(),[u,b]=useState(false),[x,h]=useState(false),[p,m]=useState(0),[f,_]=useState(false),[k,v]=useState(undefined),g=useRef(null),w=useRef(null),j=useRef({buffer:"",at:0}),y=l.findIndex(e=>e.value===r),N=y>=0?l[y]:undefined,C=e=>{
    let r=g.current;
    if(r){
      let{above:e,below:a}=function(e){
        let r=e.ownerDocument.defaultView,a=e.getBoundingClientRect(),t=0,n=r?r.innerHeight:a.bottom;
        for(let a=e.parentElement;a&&r;a=a.parentElement){
          if("visible"===r.getComputedStyle(a).overflowY)continue;
          let e=a.getBoundingClientRect();
          t=Math.max(t,e.top),n=Math.min(n,e.bottom)
        }
        return {above:a.top-t,below:n-a.bottom};
      }(r),t=Math.min(32*l.length+10,264),n=a<t+6&&e>a,i=(n?e:a)-10;
      _(n),v(i<t?Math.max(i,72):undefined)
    }
    h(e),m(y>=0?y:0),b(true)
  };
  useEffect(()=>{
    if(!u)return;
    let e=g.current,r=e?.ownerDocument;
    if(!e||!r)return;
    let a=r=>{
      e.contains(r.target)||b(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [u]),useEffect(()=>{
    if(!u)return;
    let e=w.current,r=e?.querySelector(`[data-index="${p}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [u,p]);
  let S=e=>{
    let r=l[e];
    r&&(a(r.value),b(false),g.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={g} className="relative flex">
        <button id={e} type="button" role="combobox" aria-expanded={u} aria-controls={d} aria-haspopup="listbox" aria-activedescendant={u?`${d}-${p}`:undefined} aria-describedby={`${e}-hint`} onClick={()=>u?b(false):C(false)} onKeyDown={e=>{
          if(!u){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),C(true));
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),b(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),m(e=>Math.min(e+1,l.length-1));else if("ArrowUp"===e.key)e.preventDefault(),m(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),m(0);else if("End"===e.key)e.preventDefault(),m(l.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),S(p);else if(1===e.key.length&&/\S/.test(e.key)){
            let r=Date.now(),a=j.current;
            a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
            let t=l.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
            t>=0&&m(t)
          }
        }} className={c("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","flex-1")}>
          <span className="truncate">{N?.label}</span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {u&&<ul ref={w} id={d} role="listbox" tabIndex={-1} style={k?{maxHeight:k}:undefined} className={c("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",!x&&"transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute left-0 z-30 max-h-[264px] w-full min-w-[100%]",f?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {l.map((e,a)=>{
            let n=e.value===r;
            return (
              <li key={e.value} id={`${d}-${a}`} role="option" aria-selected={n} data-highlighted={a===p?"":undefined} data-index={a} onMouseEnter={()=>m(a)} onClick={()=>S(a)} className={c("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let S = {theme:"system",density:"cozy",language:"en",weekly:true,mentions:true,comments:false,sounds:false};

function z(){
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
  }(),s=useReducedMotion(),[b,z]=useState({...S,theme:"dark",comments:true}),[D,E]=useState(S),[A,R]=useState(false),$=e=>r=>z(a=>({...a,[e]:r})),T=useMemo(()=>Object.keys(b).filter(e=>b[e]!==D[e]), [b,D]),M=T.length>0;
  return (
    <div className={c("bg-white dark:bg-neutral-950",u,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0 px-4 sm:px-6">
          <div className="mx-auto flex h-14 w-full max-w-2xl items-center"><h2 className={c(_,"truncate")}>Preferences</h2></div>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={a} className="h-full overflow-y-auto px-4 sm:px-6">
            <div className="mx-auto w-full max-w-2xl pb-4 sm:pb-6">
              <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
                <div className={c("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","py-3")}>
                  <div className="min-w-0">
                    <h3 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Workspace preferences</h3>
                    <p className={c("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>Defaults for appearance, editing, and notifications.</p>
                  </div>
                </div>
                <div className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8")}>
                  <N id="pref-theme" changed={T.includes("theme")} label="Theme" description="Choose how this device renders the interface." badge={<span className={c(m,f)}>This device</span>}>
                    <div role="radiogroup" aria-labelledby="pref-theme-label" aria-describedby="pref-theme-hint" className="grid grid-cols-3 gap-1.5">
                      {g.map(e=>(
                        <label key={e.value} className={c(k,"rounded-[var(--rb-r-sm,6px)]",b.theme===e.value?"bg-neutral-900/9 dark:bg-neutral-100/9":"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","h-8","flex cursor-pointer items-center gap-2 px-3")}>
                                            <input type="radio" name="theme" value={e.value} checked={b.theme===e.value} onChange={r=>{
                                              r.target.checked&&$("theme")(e.value)
                                            }} className="size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40" />
                                            {e.label}
                                          </label>
                      ))}
                    </div>
                  </N>
                  <N id="pref-density" changed={T.includes("density")} label="Density" description="Set the default spacing for tables and panels." badge={<span className={c(m,f)}>Recommended</span>} native><C id="pref-density" value={b.density} onChange={$("density")} options={w} /></N>
                  <N id="pref-language" changed={T.includes("language")} label="Language" description="Use this language for shared workspace screens." native>
                    <C id="pref-language" value={b.language} onChange={$("language")} options={j} />
                  </N>
                  <N id="pref-weekly" changed={T.includes("weekly")} label="Weekly summary" description="A digest of activity every Monday morning." badge={<span className={c(m,f)}>Recommended</span>} inline>
                    <y checked={b.weekly} onChange={$("weekly")} labelledBy="pref-weekly-label" describedBy="pref-weekly-hint" />
                  </N>
                  <N id="pref-mentions" changed={T.includes("mentions")} label="Mentions" description="Notify me when someone mentions my name." inline>
                    <y checked={b.mentions} onChange={$("mentions")} labelledBy="pref-mentions-label" describedBy="pref-mentions-hint" />
                  </N>
                  <N id="pref-comments" changed={T.includes("comments")} label="Comment replies" description="Replies to threads I have posted in." inline>
                    <y checked={b.comments} onChange={$("comments")} labelledBy="pref-comments-label" describedBy="pref-comments-hint" />
                  </N>
                  <div className="px-3 py-2.5">
                    <label className="flex cursor-pointer items-start gap-2">
                      <span className={c("relative inline-flex size-4 shrink-0 items-center justify-center","mt-0.5")}>
                        <input type="checkbox" checked={b.sounds} aria-describedby="pref-sounds-hint" onChange={e=>$("sounds")(e.target.checked)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                        <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                      </span>
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span className={c(h,"min-h-5")}>Play notification sounds</span>
                        <span id="pref-sounds-hint" className={p}>A short chime when something needs your attention.</span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className={c("flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2","max-sm:flex-col max-sm:items-stretch max-sm:has-[button]:pe-4")}>
                  <p aria-live="polite" className={c(v,"flex min-w-0 items-center gap-2 sm:me-auto")}>
                    {M?<span className="truncate">Unsaved preferences</span>:<>
                      <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className={c("text-neutral-900/66 dark:text-neutral-100/66","shrink-0")} />
                      <span className="truncate">Preferences saved</span>
                    </>}
                  </p>
                  <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <button type="button" onClick={()=>z(D)} disabled={!M||A} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",x,"w-full sm:w-auto")}>Cancel</button>
                    <button type="button" onClick={()=>{
                      M&&!A&&(R(true),window.setTimeout(()=>{
                        E(b),R(false)
                      },700*!s))
                    }} disabled={!M} aria-busy={A} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",x,"w-full min-w-[7.5rem] sm:w-auto")}>
                      <span className="grid place-items-center *:[grid-area:1/1]">
                        <span className={c("inline-flex items-center gap-2",A&&"invisible")}>Save changes</span>
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
          <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default z;
