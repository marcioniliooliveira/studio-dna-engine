/**
 * React Bits Pro — Application UI (tool-calls-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { additions, deletions, disconnect, id, lines, observe, path, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let l = (...e)=>e.filter(Boolean).join(" "),
  o = "text-neutral-900 dark:text-neutral-100",
  d = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "font-mono text-[12px]/[16px] tabular-nums",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = l("text-[16px]/[20px] font-[450] tracking-[-0.015em]",o),
  p = l(c,d),
  m = l(d,"select-none"),
  b = [{id:"f1",path:"services/payments/retry.ts",additions:9,deletions:3,lines:[{kind:"hunk",old:null,new:null,text:"@@ -18,13 +18,19 @@ export function withRetry("},{kind:"context",old:18,new:18,text:"  const max = options.maxAttempts ?? 5;"},{kind:"context",old:19,new:19,text:"  let attempt = 0;"},{kind:"del",old:20,new:null,text:"  const backoff = 100;"},{kind:"add",old:null,new:20,text:"  const baseBackoff = options.backoffMs ?? 200;"},{kind:"add",old:null,new:21,text:"  const jitter = () => Math.random() * baseBackoff;"},{kind:"context",old:21,new:22,text:""},{kind:"context",old:22,new:23,text:"  while (attempt < max) {"},{kind:"del",old:23,new:null,text:"    await sleep(backoff * attempt);"},{kind:"add",old:null,new:24,text:"    await sleep(baseBackoff * 2 ** attempt + jitter());"},{kind:"context",old:24,new:25,text:"    try {"},{kind:"context",old:25,new:26,text:"      return await run();"},{kind:"del",old:26,new:null,text:"    } catch (err) {"},{kind:"add",old:null,new:27,text:"    } catch (err: unknown) {"},{kind:"add",old:null,new:28,text:"      if (!isRetryable(err)) throw err;"},{kind:"context",old:27,new:29,text:"      attempt += 1;"},{kind:"context",old:28,new:30,text:"    }"},{kind:"context",old:29,new:31,text:"  }"},{kind:"context",old:30,new:32,text:""},{kind:"context",old:31,new:33,text:"  throw new RetryError(max);"},{kind:"context",old:32,new:34,text:"}"}]},{id:"f2",path:"services/payments/idempotency.ts",additions:6,deletions:1,lines:[{kind:"hunk",old:null,new:null,text:'@@ -4,7 +4,12 @@ import { createHash } from "crypto";'},{kind:"context",old:4,new:4,text:"export function keyFor(request: ChargeRequest) {"},{kind:"del",old:5,new:null,text:"  return request.id;"},{kind:"add",old:null,new:5,text:"  const seed = [request.customerId, request.amount, request.currency];"},{kind:"add",old:null,new:6,text:'  return createHash("sha256")'},{kind:"add",old:null,new:7,text:'    .update(seed.join(":"))'},{kind:"add",old:null,new:8,text:'    .digest("hex")'},{kind:"add",old:null,new:9,text:"    .slice(0, 32);"},{kind:"context",old:6,new:10,text:"}"}]}];

function h({add:e,del:t}){
  return (
    <span className={l("text-[12px]/[16px] font-[450] tabular-nums","text-neutral-900/80 dark:text-neutral-100/80","shrink-0")}>
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

function f({lines:e}){
  let{ref:t,edges:r,onScroll:s}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollLeft:a,scrollWidth:n,clientWidth:s}=t;
      r({start:a>1,end:Math.ceil(a+s)<n-1})
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
        <div ref={t} onScroll={s} className="overflow-x-auto">
          <div className={l("font-mono text-[13px]/[20px] tabular-nums",o,"min-w-max pb-1")}>
            {e.map((e,t)=>"hunk"===e.kind?<div key={t} className={l("bg-neutral-900/5 dark:bg-neutral-100/5",u,"whitespace-pre px-2 py-0.5")}>{e.text}</div>:<div key={t} className={l("flex","add"===e.kind&&"bg-neutral-900/9 dark:bg-neutral-100/9")}>
              <span className={l(m,"w-10 shrink-0 px-2 text-right tabular-nums")}>{e.old??""}</span>
              <span className={l(m,"w-10 shrink-0 px-2 text-right tabular-nums")}>{e.new??""}</span>
              <span className={l(m,"w-4 shrink-0 text-center")}>{"add"===e.kind?"+":"del"===e.kind?"−":""}</span>
              <span className={l("min-w-0 flex-1 whitespace-pre","del"===e.kind&&u,"pr-4")}>{e.text||" "}</span>
            </div>)}
          </div>
        </div>
        <div aria-hidden="true" className={l("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 w-8",r.start?"opacity-100":"opacity-0")} />
        <div aria-hidden="true" className={l("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 w-8",r.end?"opacity-100":"opacity-0")} />
      </div>
  );
}

function k(){
  let e=useId(),[t,r]=useState("f1"),{ref:d,edges:u,onScroll:m}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:s}=t;
      r({start:a>1,end:Math.ceil(a+s)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),k=b.reduce((e,t)=>e+t.additions,0),v=b.reduce((e,t)=>e+t.deletions,0);
  return (
    <div className={l("bg-white dark:bg-neutral-950",o,"relative flex h-full min-h-[560px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-baseline justify-between gap-3">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className={l(p,"shrink-0")}>edit_file</span>
            <h2 className={l(x,"truncate")}>Applied 2 file edits</h2>
          </div>
          <h add={k} del={v} />
        </header>
        <div className={l("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className={l("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
            <div ref={d} onScroll={m} className={l("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","min-h-0 flex-1 overflow-y-auto overscroll-contain")}>
              {b.map(n=>{
                let o=t===id,d=`${e}-${id}`;
                return (
                  <div key={id}>
                                <div className="flex px-3 py-1">
                                  <button type="button" aria-expanded={o} aria-controls={d} onClick={()=>r(o?"":id)} className={l("group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","flex-1")}>
                                    <span className="flex size-4 shrink-0 items-center justify-center">
                                      <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                    </span>
                                    <span className={l("min-w-[6ch] truncate text-neutral-900 dark:text-neutral-100",c,"flex-1")}>{path}</span>
                                    <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/66 dark:text-neutral-100/66"><h add={additions} del={deletions} /></span>
                                  </button>
                                </div>
                                {o&&<div id={d}><f lines={lines} /></div>}
                              </div>
                );
              })}
            </div>
            <div aria-hidden="true" className={l("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={l("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default k;
