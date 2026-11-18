/**
 * React Bits Pro — Application UI (editor-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_80969 = [["path",{d:"M20 15.0057V10.6606C20 9.84276 20 9.43383 19.8478 9.06613C19.6955 8.69843 19.4065 8.40927 18.8284 7.83096L14.0919 3.09236C13.593 2.59325 13.3436 2.3437 13.0345 2.19583C12.9702 2.16508 12.9044 2.13778 12.8372 2.11406C12.5141 2 12.1614 2 11.4558 2C8.21082 2 6.58831 2 5.48933 2.88646C5.26731 3.06554 5.06508 3.26787 4.88607 3.48998C4 4.58943 4 6.21265 4 9.45908V14.0052C4 17.7781 4 19.6645 5.17157 20.8366C6.11466 21.7801 7.52043 21.9641 10 22M13 2.50022V3.00043C13 5.83009 13 7.24492 13.8787 8.12398C14.7574 9.00304 16.1716 9.00304 19 9.00304H19.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.3267 22L13.1155 20.9142C12.3718 20.2475 12 19.9142 12 19.5C12 19.0858 12.3718 18.7525 13.1155 18.0858L14.3267 17M17.6733 22L18.8845 20.9142C19.6282 20.2475 20 19.9142 20 19.5C20 19.0858 19.6282 18.7525 18.8845 18.0858L17.6733 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "bg-white dark:bg-neutral-950",
  x = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "border-r border-neutral-900/8 dark:border-neutral-100/8",
  b = "text-neutral-900/80 dark:text-neutral-100/80",
  m = "bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  f = "bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  v = c("text-[12px]/[16px] font-normal tabular-nums",p),
  k = [{id:"meter",name:"meter.ts",dirty:true,code:`import { ledger } from "./ledger";
import type { Event, Window } from "./types";

const WINDOW_MS = 10_000;

export function meter(events: Event[], window: Window) {
  const buckets = new Map<string, number>();

  for (const event of events) {
    if (event.ts < window.from) continue;
    if (event.ts >= window.to) break;

    const key = event.workspace;
    buckets.set(key, (buckets.get(key) ?? 0) + event.units);
  }

  return [...buckets].map(([workspace, units]) => ({
    workspace,
    units,
    window: WINDOW_MS,
  }));
}

export async function flush(window: Window) {
  const rows = meter(await ledger.since(window.from), window);
  await ledger.commit(rows);
  return rows.length;
}`},{id:"ledger",name:"ledger.ts",dirty:false,code:`import { db } from "./db";

export const ledger = {
  async since(ts: number) {
    return db.events.where("ts").aboveOrEqual(ts).toArray();
  },

  async commit(rows: unknown[]) {
    return db.rollups.bulkPut(rows);
  },
};`},{id:"types",name:"types.ts",dirty:false,code:`export type Event = {
  ts: number;
  workspace: string;
  units: number;
};

export type Window = {
  from: number;
  to: number;
};`}],
  g = {name:"app-ui-ink",type:"light",settings:[]},
  w = {keyword:"font-medium",string:b,comment:"text-neutral-900/66 dark:text-neutral-100/66",punct:b,plain:undefined};

function _(e){
  let t=useRef(null),[r,a]=useState({start:false,end:false}),i=useCallback(()=>{
    let e=t.current;
    if(!e)return;
    let{scrollLeft:r,scrollWidth:n,clientWidth:i}=e;
    a({start:r>1,end:Math.ceil(r+i)<n-1})
  }, []);
  return useEffect(()=>{
    i();
    let e=t.current,r=e?.ownerDocument.defaultView;
    if(!e||!r?.ResizeObserver)return;
    let a=new r.ResizeObserver(i);
    return a.observe(e),()=>a.disconnect();
  }, [e,i]),{ref:t,edges:r,onScroll:i};
}

function y(){
  let e=useId(),[t,b]=useState(k),[y,j]=useState("meter"),[N,S]=useState(12),z=useRef([]),A=t.find(e=>e.id===y)??t[0],R=useMemo(()=>A.code.split("\n"), [A]),E=Math.min(N,R.length),[W,C]=useState(null),D=useRef(0),{ref:M,edges:O,onScroll:$}=_(t.length),{ref:I,edges:H,onScroll:T}=_(A.id);
  return useEffect(()=>{
    let e=++D.current;
    C(null);
    let t=false;
    return Promise.all([r.e(19543),r.e(7775),r.e(34419)]).then(r.bind(r,34419)).then(({codeToTokens:e})=>e(A.code,{lang:"typescript",theme:g,includeExplanation:"scopeName"})).then(r=>{
      t||e!==D.current||C(r.tokens.map(e=>e.flatMap(e=>e.explanation?e.explanation.map(e=>{
        let t;
        return {content:e.content,kind:(t=e.scopes.map(e=>e.scopeName).join(" "),/(^|\s)(comment|punctuation\.definition\.comment)/.test(t)?"comment":/(^|\s)(string|constant\.character\.escape)/.test(t)?"string":/(^|\s)(keyword\.control|storage\.type|storage\.modifier|keyword\.operator\.new|keyword\.operator\.expression)/.test(t)?"keyword":/(^|\s)(punctuation|meta\.brace|keyword\.operator)/.test(t)?"punct":"plain")};
      }):[{content:e.content,kind:"plain"}])))
    }).catch(()=>{
      t||e!==D.current||C(null)
    }),()=>{
      t=true
    };
  }, [A.code]),<div className={c(u,x,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
    <div className="relative shrink-0">
      <div ref={M} onScroll={$} role="tablist" aria-label="Open files" className={c("flex max-w-full min-w-0 items-center gap-1 overflow-x-auto shadow-[inset_0_-1px_0_color-mix(in_oklab,var(--color-neutral-900)_8%,transparent)] [scrollbar-width:none] dark:shadow-[inset_0_-1px_0_color-mix(in_oklab,var(--color-neutral-100)_8%,transparent)]","ps-2 pe-1.5")}>
        {t.map((r,n)=>{
          let o=r.id===y;
          return (
            <div key={r.id} className="relative shrink-0">
                        <button ref={e=>{
                          z.current[n]=e
                        }} id={`${e}-tab-${r.id}`} type="button" role="tab" aria-selected={o} aria-controls={`${e}-panel`} tabIndex={o?0:-1} onClick={()=>j(r.id)} onKeyDown={e=>{
                          let r;
                          return r=-1,void("ArrowRight"===e.key?r=(n+1)%t.length:"ArrowLeft"===e.key?r=(n-1+t.length)%t.length:"Home"===e.key?r=0:"End"===e.key&&(r=t.length-1),!(r<0)&&(e.preventDefault(),j(t[r].id),z.current[r]?.focus()));
                        }} className={c("relative inline-flex min-h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900/80 select-none transition-[color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-neutral-900 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent aria-selected:text-neutral-900 aria-selected:after:bg-neutral-900 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-neutral-100 dark:disabled:text-neutral-100/40","h-10 pe-8")}>
                          <HugeiconsIcon icon={Icon_80969} size={16} strokeWidth={1.8} aria-hidden="true" className={p} />
                          {r.name}
                          {r.dirty&&<span className={c("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-neutral-900/66 dark:text-neutral-100/66")}>Unsaved</span>}
                        </button>
                        <span className="absolute top-1/2 right-3 flex -translate-y-1/2">
                          <button type="button" aria-label={`Close ${r.name}`} onClick={()=>{
                            var e;
                            return e=r.id,void b(t=>{
                              let r=t.filter(t=>t.id!==e);
                              return 0===r.length?t:(e===y&&j(r[0].id),r);
                            });
                          }} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                            <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                          </button>
                        </span>
                      </div>
          );
        })}
        <button type="button" className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]","ml-auto")}>
          <HugeiconsIcon icon={Icon_48318} size={16} strokeWidth={1.8} aria-hidden="true" />
          Run
        </button>
      </div>
      <div aria-hidden="true" className={c(m,"pointer-events-none absolute top-0 bottom-px left-0 w-8",O.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={c(f,"pointer-events-none absolute top-0 bottom-px right-0 w-8",O.end?"opacity-100":"opacity-0")} />
    </div>
    <div id={`${e}-panel`} role="tabpanel" aria-labelledby={`${e}-tab-${A.id}`} className="flex min-h-0 flex-1">
      <div className="relative min-w-0 flex-1">
        <div ref={I} onScroll={T} className="h-full overflow-auto">
          <div className={c("font-mono text-[13px]/[20px] tabular-nums","flex min-w-max")}>
            <div aria-hidden="true" className={c(u,h,p,"sticky left-0 z-10 shrink-0 py-3 pr-3 pl-4 text-right tabular-nums select-none")}>
              {R.map((e,t)=><div key={t} className={c(t+1===E&&x)}>{t+1}</div>)}
              <div className={c(m,"pointer-events-none absolute inset-y-0 left-[calc(100%+1px)] w-8",H.start?"opacity-100":"opacity-0")} />
            </div>
            <div className="min-w-0 flex-1 py-3">
              {R.map((e,t)=>{
                let r=W?.[t];
                return (
                  <div key={t} role="presentation" onMouseEnter={()=>S(t+1)} className={c("flex px-4",t+1===E&&"bg-neutral-900/9 dark:bg-neutral-100/9")}>
                                    <span className="min-w-0 flex-1 whitespace-pre">
                                      {r&&r.length>0?r.map((e,t)=><span key={t} className={w[e.kind]}>{e.content}</span>):""===e?" ":e}
                                    </span>
                                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div aria-hidden="true" className={c(f,"pointer-events-none absolute inset-y-0 right-0 w-8",H.end?"opacity-100":"opacity-0")} />
      </div>
      <div aria-hidden="true" className="hidden shrink-0 lg:flex">
        <span className={c(h,"w-px")} />
        <div className="w-[52px] px-2 py-3">
          <div className="space-y-[3px]">
            {R.map((e,t)=><div key={t} className={c("h-[2px] rounded-full",t+1===E?"bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900":"bg-neutral-900/8 dark:bg-neutral-100/8")} style={{width:`${Math.min(100,Math.max(6,e.trim().length/44*100))}%`,marginLeft:`${Math.min(30,(e.length-e.trimStart().length)*4)}%`}} />)}
          </div>
        </div>
      </div>
    </div>
    <footer className={c("border-t border-neutral-900/8 dark:border-neutral-100/8",v,"flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2")}>
      <span className="tabular-nums">
        {"Ln "}
        {E}
        {", Col "}
        {R[E-1]?.length??0}
      </span>
      <span>TypeScript</span>
      <span>UTF-8</span>
      <span>Spaces: 2</span>
      <span className={c("text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","ml-auto inline-flex items-center gap-1.5")}>
        <HugeiconsIcon icon={Icon_36474} size={14} strokeWidth={1.8} aria-hidden="true" />
        1 warning
      </span>
    </footer>
  </div>;
}


export default y;
