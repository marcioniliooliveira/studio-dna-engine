/**
 * React Bits Pro — Application UI (tool-calls-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { additions, deletions, disconnect, id, lines, observe, path, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" ");

let X = (...e)=>e.filter(Boolean).join(" ");

let ee = "text-neutral-900 dark:text-neutral-100";

let et = "text-neutral-900/62 dark:text-neutral-100/62";

let er = "font-mono text-[12px]/[16px] tabular-nums";

let ea = "text-neutral-900/62 dark:text-neutral-100/62";

let en = X("text-[17px]/[22px] font-extrabold",ee);

let ei = X(er,et);

let el = X(et,"select-none");

let es = [{id:"f1",path:"services/payments/retry.ts",additions:9,deletions:3,lines:[{kind:"hunk",old:null,new:null,text:"@@ -18,13 +18,19 @@ export function withRetry("},{kind:"context",old:18,new:18,text:"  const max = options.maxAttempts ?? 5;"},{kind:"context",old:19,new:19,text:"  let attempt = 0;"},{kind:"del",old:20,new:null,text:"  const backoff = 100;"},{kind:"add",old:null,new:20,text:"  const baseBackoff = options.backoffMs ?? 200;"},{kind:"add",old:null,new:21,text:"  const jitter = () => Math.random() * baseBackoff;"},{kind:"context",old:21,new:22,text:""},{kind:"context",old:22,new:23,text:"  while (attempt < max) {"},{kind:"del",old:23,new:null,text:"    await sleep(backoff * attempt);"},{kind:"add",old:null,new:24,text:"    await sleep(baseBackoff * 2 ** attempt + jitter());"},{kind:"context",old:24,new:25,text:"    try {"},{kind:"context",old:25,new:26,text:"      return await run();"},{kind:"del",old:26,new:null,text:"    } catch (err) {"},{kind:"add",old:null,new:27,text:"    } catch (err: unknown) {"},{kind:"add",old:null,new:28,text:"      if (!isRetryable(err)) throw err;"},{kind:"context",old:27,new:29,text:"      attempt += 1;"},{kind:"context",old:28,new:30,text:"    }"},{kind:"context",old:29,new:31,text:"  }"},{kind:"context",old:30,new:32,text:""},{kind:"context",old:31,new:33,text:"  throw new RetryError(max);"},{kind:"context",old:32,new:34,text:"}"}]},{id:"f2",path:"services/payments/idempotency.ts",additions:6,deletions:1,lines:[{kind:"hunk",old:null,new:null,text:'@@ -4,7 +4,12 @@ import { createHash } from "crypto";'},{kind:"context",old:4,new:4,text:"export function keyFor(request: ChargeRequest) {"},{kind:"del",old:5,new:null,text:"  return request.id;"},{kind:"add",old:null,new:5,text:"  const seed = [request.customerId, request.amount, request.currency];"},{kind:"add",old:null,new:6,text:'  return createHash("sha256")'},{kind:"add",old:null,new:7,text:'    .update(seed.join(":"))'},{kind:"add",old:null,new:8,text:'    .digest("hex")'},{kind:"add",old:null,new:9,text:"    .slice(0, 32);"},{kind:"context",old:6,new:10,text:"}"}]}];

function eo({add:e,del:t}){
  return (
    <span className={X("text-[13px]/[16px] font-bold tabular-nums","text-neutral-900/78 dark:text-neutral-100/78","shrink-0")}>
        <span>
          +
          {e}
        </span>
        {" "}
        <span>
          −
          {t}
        </span>
      </span>
  );
}

function ec({lines:e}){
  let{ref:t,edges:r,onScroll:i}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollLeft:a,scrollWidth:n,clientWidth:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }();
  return (
    <div className="relative">
        <div ref={t} onScroll={i} className="overflow-x-auto">
          <div className={X("font-mono text-[13px]/[20px] tabular-nums",ee,"min-w-max pb-1")}>
            {e.map((e,t)=>"hunk"===e.kind?<div key={t} className={X("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]",ea,"whitespace-pre px-2 py-0.5")}>{e.text}</div>:<div key={t} className={X("flex","add"===e.kind&&"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]")}>
              <span className={X(el,"w-10 shrink-0 px-2 text-right tabular-nums")}>{e.old??""}</span>
              <span className={X(el,"w-10 shrink-0 px-2 text-right tabular-nums")}>{e.new??""}</span>
              <span className={X(el,"w-4 shrink-0 text-center")}>{"add"===e.kind?"+":"del"===e.kind?"−":""}</span>
              <span className={X("min-w-0 flex-1 whitespace-pre","del"===e.kind&&ea,"pr-4")}>{e.text||" "}</span>
            </div>)}
          </div>
        </div>
        <div aria-hidden="true" className={X("bg-linear-to-r from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 w-8",r.start?"opacity-100":"opacity-0")} />
        <div aria-hidden="true" className={X("bg-linear-to-l from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 w-8",r.end?"opacity-100":"opacity-0")} />
      </div>
  );
}


export default function tool_calls_3__Sorbet__Component(){
  let e=useId(),[t,r]=useState("f1"),{ref:i,edges:l,onScroll:o}=function(){
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
  }(),d=es.reduce((e,t)=>e+t.additions,0),u=es.reduce((e,t)=>e+t.deletions,0);
  return (
    <div className={X("bg-white dark:bg-neutral-950",ee,"relative flex h-full min-h-[580px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-baseline justify-between gap-3">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className={X(ei,"shrink-0")}>edit_file</span>
            <h2 className={X(en,"truncate")}>Applied 2 file edits</h2>
          </div>
          <eo add={d} del={u} />
        </header>
        <div className={X("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
          <div className={X("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1 min-h-0 flex-1")}>
            <div ref={i} onScroll={o} className={X("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","min-h-0 flex-1 overflow-y-auto overscroll-contain")}>
              {es.map(n=>{
                let i=t===id,l=`${e}-${id}`;
                return (
                  <div key={id}>
                                <div className="flex px-3 py-1">
                                  <button type="button" aria-expanded={i} aria-controls={l} onClick={()=>r(i?"":id)} className={X("group -mx-2 flex min-h-9 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[calc(var(--rb-r-lg,10px))] px-2 text-left text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:hover:bg-neutral-100/6 dark:active:bg-neutral-100/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","flex-1")}>
                                    <span className="flex size-[18px] shrink-0 items-center justify-center">
                                      <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                    </span>
                                    <span className={X("min-w-[6ch] truncate font-bold text-neutral-900 dark:text-neutral-100",er,"flex-1")}>{path}</span>
                                    <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/62 dark:text-neutral-100/62"><eo add={additions} del={deletions} /></span>
                                  </button>
                                </div>
                                {i&&<div id={l}><ec lines={lines} /></div>}
                              </div>
                );
              })}
            </div>
            <div aria-hidden="true" className={X("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",l.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={X("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",l.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
