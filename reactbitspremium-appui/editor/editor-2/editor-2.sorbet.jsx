/**
 * React Bits Pro — Application UI (editor-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_84831 = [["path",{d:"M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_15304 = [["path",{d:"M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 2.5V21.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_2301 = [["path",{d:"M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];

let U = (...e)=>e.filter(Boolean).join(" ");

let H = "text-neutral-900 dark:text-neutral-100";

let q = "text-neutral-900/78 dark:text-neutral-100/78";

let F = "text-neutral-900/62 dark:text-neutral-100/62";

let V = U("text-[17px]/[22px] font-extrabold",H);

let K = U("text-[14px]/[20px] font-medium",F);

let J = U("text-[13px]/[16px] font-semibold tabular-nums",F);

let Q = U("font-mono text-[13px]/[20px] tabular-nums",q);

let G = [{id:"write",label:"Write",icon:Icon_84831},{id:"split",label:"Split",icon:Icon_15304},{id:"preview",label:"Preview",icon:Icon_2301}];

let X = `# Migrating to the streaming meter

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

function Y({text:e}){
  let r=e.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
        {r.map((e,r)=>e.startsWith("**")&&e.endsWith("**")?<strong key={r} className="font-bold">{e.slice(2,-2)}</strong>:e.startsWith("*")&&e.endsWith("*")?<em key={r} className="italic">{e.slice(1,-1)}</em>:e.startsWith("`")&&e.endsWith("`")?<code key={r} className="rounded-[calc(var(--rb-r-sm,6px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] px-1.5 py-px font-mono text-[0.88em] leading-none text-neutral-900 dark:text-neutral-100 [box-decoration-break:clone] dark:bg-neutral-100/10">{e.slice(1,-1)}</code>:<span key={r}>{e}</span>)}
      </>
  );
}


export default function editor_2__Sorbet__Component(){
  let[e,r]=useState("split"),[t,i]=useState(X),l=useRef([]),{ref:o,edges:c,onScroll:d}=function(e){
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
    }, [e,i]),{ref:r,edges:t,onScroll:i};
  }(`${e}:${t}`),_=useMemo(()=>(function(e){
    let r=[];
    for(let t of e.split(/\n{2,}/)){
      let e=t.trim();
      if(!e)continue;
      let a=e.split("\n");
      a.every(e=>/^[-*]\s+/.test(e))?r.push({kind:"ul",items:a.map(e=>e.replace(/^[-*]\s+/,""))}):a.every(e=>/^\d+\.\s+/.test(e))?r.push({kind:"ol",items:a.map(e=>e.replace(/^\d+\.\s+/,""))}):e.startsWith("## ")?r.push({kind:"h2",text:e.slice(3)}):e.startsWith("# ")?r.push({kind:"h1",text:e.slice(2)}):e.startsWith("> ")?r.push({kind:"quote",text:e.slice(2)}):r.push({kind:"p",text:e.replace(/\n/g," ")})
    }
    return r;
  })(t), [t]),x=t.trim()?t.trim().split(/\s+/).length:0,u="preview"!==e,b="write"!==e;
  return (
    <div className={U("bg-white dark:bg-neutral-950",H,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <header className={U("border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex shrink-0 flex-wrap items-center justify-between gap-3 px-4 py-3")}>
          <div className="min-w-0">
            <h2 className={U(V,"truncate")}>streaming-meter.md</h2>
            <p className={U(K,"mt-0.5 flex flex-wrap gap-x-3")}>
              <span className="tabular-nums">
                {x}
                {" words"}
              </span>
              <span>Markdown</span>
            </p>
          </div>
          <div role="radiogroup" aria-label="Editor view" className={U("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10")}>
            {G.map((t,n)=>{
              let i=t.id===e;
              return (
                <button key={t.id} ref={e=>{
                            l.current[n]=e
                          }} role="radio" type="button" aria-checked={i} tabIndex={i?0:-1} onClick={()=>r(t.id)} onKeyDown={e=>((e,t)=>{
                            let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
                            if(!a)return;
                            e.preventDefault();
                            let n=(t+a+G.length)%G.length;
                            r(G[n].id),l.current[n]?.focus()
                          })(e,n)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">
                            <HugeiconsIcon icon={t.icon} size={18} strokeWidth={2} aria-hidden="true" />
                            {t.label}
                          </button>
              );
            })}
          </div>
        </header>
        <div className="grid min-h-0 flex-1 md:grid-cols-2">
          {u&&<div className={U("relative flex min-h-0 flex-col","write"===e&&"md:col-span-2")}>
            {b&&<span aria-hidden="true" className={U("border-r border-transparent","pointer-events-none absolute inset-y-0 right-0 hidden md:block")} />}
            <div className={U(J,"flex h-8 shrink-0 items-center px-4")}>Source</div>
            <textarea aria-label="Markdown source" value={t} onChange={e=>i(e.target.value)} spellCheck={false} className={U(Q,"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","min-h-0 flex-1 resize-none px-4 pb-4")} />
          </div>}
          {b&&<div className={U("flex min-h-0 flex-col","preview"===e&&"md:col-span-2",u&&"split"===e&&"hidden md:flex")}>
            <div className={U(J,"flex h-8 shrink-0 items-center px-4")}>Preview</div>
            <div className="relative min-h-0 flex-1">
              <div ref={o} onScroll={d} className="h-full overflow-y-auto px-4 pb-6">
                <div className={U("flex min-w-0 flex-col gap-4 text-[15px]/[24px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","mx-auto max-w-[640px]")}>
                  {_.map((e,r)=>"h1"===e.kind?<h3 key={r} className="text-[22px]/[28px] font-extrabold tracking-[-0.01em]"><Y text={e.text} /></h3>:"h2"===e.kind?<h4 key={r} className="pt-1 text-[17px]/[22px] font-extrabold tracking-[-0.01em]"><Y text={e.text} /></h4>:"quote"===e.kind?<p key={r} className={U("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]",q,"rounded-[var(--rb-r-4xl,18px)]","px-4 py-3")}><Y text={e.text} /></p>:"ul"===e.kind?<ul key={r} className="space-y-1.5">
                    {e.items.map((e,r)=>(
                      <li key={r} className="flex gap-2.5">
                                        <span aria-hidden="true" className="mt-[0.5lh] size-2 shrink-0 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" />
                                        <span><Y text={e} /></span>
                                      </li>
                    ))}
                  </ul>:"ol"===e.kind?<ol key={r} className="space-y-1.5">
                    {e.items.map((e,r)=>(
                      <li key={r} className="flex gap-2.5">
                                        <span className={U(F,"w-4 shrink-0 text-right tabular-nums")}>
                                          {r+1}
                                          .
                                        </span>
                                        <span><Y text={e} /></span>
                                      </li>
                    ))}
                  </ol>:<p key={r}><Y text={e.text} /></p>)}
                </div>
              </div>
              <div aria-hidden="true" className={U("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",c.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={U("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",c.end?"opacity-100":"opacity-0")} />
            </div>
          </div>}
        </div>
      </div>
  );
}
