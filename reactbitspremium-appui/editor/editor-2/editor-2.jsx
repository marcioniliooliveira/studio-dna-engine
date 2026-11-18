/**
 * React Bits Pro — Application UI (editor-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_84831 = [["path",{d:"M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_15304 = [["path",{d:"M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 2.5V21.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_2301 = [["path",{d:"M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  p = d("text-[16px]/[20px] font-[450] tracking-[-0.015em]",c),
  h = d("text-[13px]/[18px] font-normal",x),
  b = d("text-[12px]/[16px] font-normal tabular-nums",x),
  m = d("font-mono text-[13px]/[20px] tabular-nums",u),
  f = [{id:"write",label:"Write",icon:Icon_84831},{id:"split",label:"Split",icon:Icon_15304},{id:"preview",label:"Preview",icon:Icon_2301}],
  v = `# Migrating to the streaming meter

The nightly aggregation job is being replaced by a streaming counter. This note covers what changes for existing workspaces and what to do if a number looks wrong.

## What changes

- Usage updates within about **ten seconds** instead of once per night.
- Historical rows are *unchanged*; only new events take the new path.
- The \`v1/usage\` endpoint keeps its shape and stays supported until March.

## Rollout

1. Enable the flag for internal workspaces.
2. Backfill the previous 30 days and compare against the old totals.
3. Move Scale customers, then everyone else.

> A drift of under 0.5% between the two systems is expected during the overlap window.

Reach out to Wei Chen if a workspace shows a larger gap.`;

function k({text:e}){
  let t=e.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
        {t.map((e,t)=>e.startsWith("**")&&e.endsWith("**")?<strong key={t} className="font-medium">{e.slice(2,-2)}</strong>:e.startsWith("*")&&e.endsWith("*")?<em key={t} className="italic">{e.slice(1,-1)}</em>:e.startsWith("`")&&e.endsWith("`")?<code key={t} className="rounded-[var(--rb-r-xs,4px)] bg-neutral-900/5 px-1 py-px font-mono text-[0.9em] leading-none text-neutral-900 dark:text-neutral-100 [box-decoration-break:clone] dark:bg-neutral-100/5">{e.slice(1,-1)}</code>:<span key={t}>{e}</span>)}
      </>
  );
}

function g(){
  let[e,t]=useState("split"),[r,s]=useState(v),l=useRef([]),{ref:o,edges:g,onScroll:w}=function(e){
    let t=useRef(null),[r,a]=useState({start:false,end:false}),i=useCallback(()=>{
      let e=t.current;
      if(!e)return;
      let{scrollTop:r,scrollHeight:n,clientHeight:i}=e;
      a({start:r>1,end:Math.ceil(r+i)<n-1})
    }, []);
    return useEffect(()=>{
      i();
      let e=t.current,r=e?.ownerDocument.defaultView;
      if(!e||!r?.ResizeObserver)return;
      let a=new r.ResizeObserver(i);
      return a.observe(e),()=>a.disconnect();
    }, [e,i]),{ref:t,edges:r,onScroll:i};
  }(`${e}:${r}`),_=useMemo(()=>(function(e){
    let t=[];
    for(let r of e.split(/\n{2,}/)){
      let e=r.trim();
      if(!e)continue;
      let a=e.split("\n");
      a.every(e=>/^[-*]\s+/.test(e))?t.push({kind:"ul",items:a.map(e=>e.replace(/^[-*]\s+/,""))}):a.every(e=>/^\d+\.\s+/.test(e))?t.push({kind:"ol",items:a.map(e=>e.replace(/^\d+\.\s+/,""))}):e.startsWith("## ")?t.push({kind:"h2",text:e.slice(3)}):e.startsWith("# ")?t.push({kind:"h1",text:e.slice(2)}):e.startsWith("> ")?t.push({kind:"quote",text:e.slice(2)}):t.push({kind:"p",text:e.replace(/\n/g," ")})
    }
    return t;
  })(r), [r]),y=r.trim()?r.trim().split(/\s+/).length:0,j="preview"!==e,N="write"!==e;
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <header className={d("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","flex shrink-0 flex-wrap items-center justify-between gap-3 px-4 py-3")}>
          <div className="min-w-0">
            <h2 className={d(p,"truncate")}>streaming-meter.md</h2>
            <p className={d(h,"mt-0.5 flex flex-wrap gap-x-3")}>
              <span className="tabular-nums">
                {y}
                {" words"}
              </span>
              <span>Markdown</span>
            </p>
          </div>
          <div role="radiogroup" aria-label="Editor view" className={d("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
            {f.map((r,n)=>{
              let s=r.id===e;
              return (
                <button key={r.id} ref={e=>{
                            l.current[n]=e
                          }} role="radio" type="button" aria-checked={s} tabIndex={s?0:-1} onClick={()=>t(r.id)} onKeyDown={e=>((e,r)=>{
                            let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
                            if(!a)return;
                            e.preventDefault();
                            let n=(r+a+f.length)%f.length;
                            t(f[n].id),l.current[n]?.focus()
                          })(e,n)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">
                            <HugeiconsIcon icon={r.icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                            {r.label}
                          </button>
              );
            })}
          </div>
        </header>
        <div className="grid min-h-0 flex-1 md:grid-cols-2">
          {j&&<div className={d("relative flex min-h-0 flex-col","write"===e&&"md:col-span-2")}>
            {N&&<span aria-hidden="true" className={d("border-r border-neutral-900/8 dark:border-neutral-100/8","pointer-events-none absolute inset-y-0 right-0 hidden md:block")} />}
            <div className={d(b,"flex h-8 shrink-0 items-center px-4")}>Source</div>
            <textarea aria-label="Markdown source" value={r} onChange={e=>s(e.target.value)} spellCheck={false} className={d(m,"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","min-h-0 flex-1 resize-none px-4 pb-4")} />
          </div>}
          {N&&<div className={d("flex min-h-0 flex-col","preview"===e&&"md:col-span-2",j&&"split"===e&&"hidden md:flex")}>
            <div className={d(b,"flex h-8 shrink-0 items-center px-4")}>Preview</div>
            <div className="relative min-h-0 flex-1">
              <div ref={o} onScroll={w} className="h-full overflow-y-auto px-4 pb-6">
                <div className={d("flex min-w-0 flex-col gap-3 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","mx-auto max-w-[640px]")}>
                  {_.map((e,t)=>"h1"===e.kind?<h3 key={t} className="text-[20px]/[24px] font-[450] tracking-[-0.015em]"><k text={e.text} /></h3>:"h2"===e.kind?<h4 key={t} className="pt-1 text-[16px]/[20px] font-[450] tracking-[-0.015em]"><k text={e.text} /></h4>:"quote"===e.kind?<p key={t} className={d("bg-neutral-900/5 dark:bg-neutral-100/5",u,"rounded-[var(--rb-r-sm,6px)]","px-4 py-3")}><k text={e.text} /></p>:"ul"===e.kind?<ul key={t} className="space-y-1.5">
                    {e.items.map((e,t)=>(
                      <li key={t} className="flex gap-2.5">
                                        <span aria-hidden="true" className="mt-[0.5lh] size-1.5 shrink-0 -translate-y-1/2 bg-neutral-900 dark:bg-neutral-100" />
                                        <span><k text={e} /></span>
                                      </li>
                    ))}
                  </ul>:"ol"===e.kind?<ol key={t} className="space-y-1.5">
                    {e.items.map((e,t)=>(
                      <li key={t} className="flex gap-2.5">
                                        <span className={d(x,"w-4 shrink-0 text-right tabular-nums")}>
                                          {t+1}
                                          .
                                        </span>
                                        <span><k text={e} /></span>
                                      </li>
                    ))}
                  </ol>:<p key={t}><k text={e.text} /></p>)}
                </div>
              </div>
              <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",g.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",g.end?"opacity-100":"opacity-0")} />
            </div>
          </div>}
        </div>
      </div>
  );
}


export default g;
