/**
 * React Bits Pro — Application UI (editor-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_80969 = [["path",{d:"M20 15.0057V10.6606C20 9.84276 20 9.43383 19.8478 9.06613C19.6955 8.69843 19.4065 8.40927 18.8284 7.83096L14.0919 3.09236C13.593 2.59325 13.3436 2.3437 13.0345 2.19583C12.9702 2.16508 12.9044 2.13778 12.8372 2.11406C12.5141 2 12.1614 2 11.4558 2C8.21082 2 6.58831 2 5.48933 2.88646C5.26731 3.06554 5.06508 3.26787 4.88607 3.48998C4 4.58943 4 6.21265 4 9.45908V14.0052C4 17.7781 4 19.6645 5.17157 20.8366C6.11466 21.7801 7.52043 21.9641 10 22M13 2.50022V3.00043C13 5.83009 13 7.24492 13.8787 8.12398C14.7574 9.00304 16.1716 9.00304 19 9.00304H19.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.3267 22L13.1155 20.9142C12.3718 20.2475 12 19.9142 12 19.5C12 19.0858 12.3718 18.7525 13.1155 18.0858L14.3267 17M17.6733 22L18.8845 20.9142C19.6282 20.2475 20 19.9142 20 19.5C20 19.0858 19.6282 18.7525 18.8845 18.0858L17.6733 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let y = (...e)=>e.filter(Boolean).join(" ");

let ea = (...e)=>e.filter(Boolean).join(" ");

let en = "bg-white dark:bg-neutral-950";

let ei = "text-neutral-900 dark:text-neutral-100";

let el = "text-neutral-900/62 dark:text-neutral-100/62";

let eo = "border-r border-transparent";

let es = "text-neutral-900/78 dark:text-neutral-100/78";

let ec = "bg-linear-to-r from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let ed = "bg-linear-to-l from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let e_ = ea("text-[13px]/[16px] font-semibold tabular-nums",el);

let ex = [{id:"meter",name:"meter.ts",dirty:true,code:`import { ledger } from "./ledger";
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
};`}];

let eu = {name:"app-ui-ink",type:"light",settings:[]};

let eb = {keyword:"font-bold",string:es,comment:"text-neutral-900/62 dark:text-neutral-100/62",punct:es,plain:undefined};

function ep(e){
  let r=useRef(null),[t,a]=useState({start:false,end:false}),i=useCallback(()=>{
    let e=r.current;
    if(!e)return;
    let{scrollLeft:t,scrollWidth:n,clientWidth:i}=e;
    a({start:t>1,end:Math.ceil(t+i)<n-1})
  }, []);
  return useEffect(()=>{
    i();
    let e=r.current,t=e?.ownerDocument.defaultView;
    if(!e||!t?.ResizeObserver)return;
    let a=new t.ResizeObserver(i);
    return a.observe(e),()=>a.disconnect();
  }, [e,i]),{ref:r,edges:t,onScroll:i};
}


export default function editor_3__Sorbet__Component(){
  let e=useId(),[r,i]=useState(ex),[l,o]=useState("meter"),[c,d]=useState(12),_=useRef([]),x=r.find(e=>e.id===l)??r[0],u=useMemo(()=>x.code.split("\n"), [x]),b=Math.min(c,u.length),[p,h]=useState(null),m=useRef(0),{ref:f,edges:k,onScroll:v}=ep(r.length),{ref:g,edges:w,onScroll:y}=ep(x.id);
  return useEffect(()=>{
    let e=++m.current;
    h(null);
    let r=false;
    return Promise.all([t.e(19543),t.e(34419)]).then(t.bind(t,34419)).then(({codeToTokens:e})=>e(x.code,{lang:"typescript",theme:eu,includeExplanation:"scopeName"})).then(t=>{
      r||e!==m.current||h(t.tokens.map(e=>e.flatMap(e=>e.explanation?e.explanation.map(e=>{
        let r;
        return {content:e.content,kind:(r=e.scopes.map(e=>e.scopeName).join(" "),/(^|\s)(comment|punctuation\.definition\.comment)/.test(r)?"comment":/(^|\s)(string|constant\.character\.escape)/.test(r)?"string":/(^|\s)(keyword\.control|storage\.type|storage\.modifier|keyword\.operator\.new|keyword\.operator\.expression)/.test(r)?"keyword":/(^|\s)(punctuation|meta\.brace|keyword\.operator)/.test(r)?"punct":"plain")};
      }):[{content:e.content,kind:"plain"}])))
    }).catch(()=>{
      r||e!==m.current||h(null)
    }),()=>{
      r=true
    };
  }, [x.code]),<div className={ea(en,ei,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
    <div className="relative shrink-0">
      <div ref={f} onScroll={v} role="tablist" aria-label="Open files" className={ea("flex max-w-full min-w-0 items-center gap-1.5 overflow-x-auto shadow-[inset_0_-2px_0_color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] [scrollbar-width:none] dark:shadow-[inset_0_-2px_0_color-mix(in_oklab,var(--color-neutral-100)_9%,transparent)]","ps-2 pe-1.5")}>
        {r.map((t,n)=>{
          let c=t.id===l;
          return (
            <div key={t.id} className="relative shrink-0">
                        <button ref={e=>{
                          _.current[n]=e
                        }} id={`${e}-tab-${t.id}`} type="button" role="tab" aria-selected={c} aria-controls={`${e}-panel`} tabIndex={c?0:-1} onClick={()=>o(t.id)} onKeyDown={e=>{
                          let t;
                          return t=-1,void("ArrowRight"===e.key?t=(n+1)%r.length:"ArrowLeft"===e.key?t=(n-1+r.length)%r.length:"Home"===e.key?t=0:"End"===e.key&&(t=r.length-1),!(t<0)&&(e.preventDefault(),o(r[t].id),_.current[t]?.focus()));
                        }} className={ea("relative inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[calc(var(--rb-r-lg,10px))] px-3 text-[15px]/[20px] font-bold whitespace-nowrap text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-neutral-900 after:absolute after:inset-x-2.5 after:bottom-0 after:h-[3px] after:rounded-[calc(var(--rb-r-full,999px))] after:bg-transparent after:transition-[background-color] aria-selected:text-neutral-900 aria-selected:after:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:disabled:text-neutral-100/40","h-10 pe-8")}>
                          <HugeiconsIcon icon={Icon_80969} size={18} strokeWidth={2} aria-hidden="true" className={el} />
                          {t.name}
                          {t.dirty&&<span className={ea("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums","text-neutral-900/62 dark:text-neutral-100/62")}>Unsaved</span>}
                        </button>
                        <span className="absolute top-1/2 right-3 flex -translate-y-1/2">
                          <button type="button" aria-label={`Close ${t.name}`} onClick={()=>{
                            var e;
                            return e=t.id,void i(r=>{
                              let t=r.filter(r=>r.id!==e);
                              return 0===t.length?r:(e===l&&o(t[0].id),t);
                            });
                          }} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[calc(var(--rb-r-full,999px))] text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/8 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/12 dark:hover:text-neutral-100">
                            <HugeiconsIcon icon={Icon_89289} size={14} strokeWidth={2} aria-hidden="true" />
                          </button>
                        </span>
                      </div>
          );
        })}
        <button type="button" className={ea("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold","ml-auto")}>
          <HugeiconsIcon icon={Icon_48318} size={18} strokeWidth={2} aria-hidden="true" />
          Run
        </button>
      </div>
      <div aria-hidden="true" className={ea(ec,"pointer-events-none absolute top-0 bottom-px left-0 w-8",k.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={ea(ed,"pointer-events-none absolute top-0 bottom-px right-0 w-8",k.end?"opacity-100":"opacity-0")} />
    </div>
    <div id={`${e}-panel`} role="tabpanel" aria-labelledby={`${e}-tab-${x.id}`} className="flex min-h-0 flex-1">
      <div className="relative min-w-0 flex-1">
        <div ref={g} onScroll={y} className="h-full overflow-auto">
          <div className={ea("font-mono text-[13px]/[20px] tabular-nums","flex min-w-max")}>
            <div aria-hidden="true" className={ea(en,eo,el,"sticky left-0 z-10 shrink-0 py-3 pr-3 pl-4 text-right tabular-nums select-none")}>
              {u.map((e,r)=><div key={r} className={ea(r+1===b&&ei)}>{r+1}</div>)}
              <div className={ea(ec,"pointer-events-none absolute inset-y-0 left-[calc(100%+1px)] w-8",w.start?"opacity-100":"opacity-0")} />
            </div>
            <div className="min-w-0 flex-1 py-3">
              {u.map((e,r)=>{
                let t=p?.[r];
                return (
                  <div key={r} role="presentation" onMouseEnter={()=>d(r+1)} className={ea("flex px-4",r+1===b&&"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]")}>
                                    <span className="min-w-0 flex-1 whitespace-pre">
                                      {t&&t.length>0?t.map((e,r)=><span key={r} className={eb[e.kind]}>{e.content}</span>):""===e?" ":e}
                                    </span>
                                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div aria-hidden="true" className={ea(ed,"pointer-events-none absolute inset-y-0 right-0 w-8",w.end?"opacity-100":"opacity-0")} />
      </div>
      <div aria-hidden="true" className="hidden shrink-0 lg:flex">
        <span className={ea(eo,"w-px")} />
        <div className="w-[52px] px-2 py-3">
          <div className="space-y-[3px]">
            {u.map((e,r)=><div key={r} className={ea("h-[2px] rounded-full",r+1===b?"bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900":"bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8")} style={{width:`${Math.min(100,Math.max(6,e.trim().length/44*100))}%`,marginLeft:`${Math.min(30,(e.length-e.trimStart().length)*4)}%`}} />)}
          </div>
        </div>
      </div>
    </div>
    <footer className={ea("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7",e_,"flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2")}>
      <span className="tabular-nums">
        {"Ln "}
        {b}
        {", Col "}
        {u[b-1]?.length??0}
      </span>
      <span>TypeScript</span>
      <span>UTF-8</span>
      <span>Spaces: 2</span>
      <span className={ea("text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","ml-auto inline-flex items-center gap-1.5")}>
        <HugeiconsIcon icon={Icon_36474} size={16} strokeWidth={2} aria-hidden="true" />
        1 warning
      </span>
    </footer>
  </div>;
}
