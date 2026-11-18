/**
 * React Bits Pro — Application UI (data-table-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_86829 = [["ellipse",{cx:"12",cy:"5",rx:"8",ry:"3",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_42734 = [["path",{d:"M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.9994 15L9 9M9.00064 15L15 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "bg-white dark:bg-neutral-950",
  u = "bg-neutral-50 dark:bg-neutral-900",
  x = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  h = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  p = "sm:first:ps-6 sm:last:pe-6",
  b = ["Loading","Empty","Error"],
  m = [["w-40","w-24"],["w-32","w-20"],["w-48","w-28"],["w-36","w-20"],["w-28","w-24"],["w-44","w-16"],["w-32","w-28"],["w-40","w-20"],["w-24","w-24"],["w-44","w-24"],["w-36","w-20"]];

function k(){
  return (
    <thead className={d(c,"sticky top-0 z-20")}>
        <tr>
          <th scope="col" className={d(x,p)}>Source</th>
          <th scope="col" className={d(x,p,"w-[180px]")}>Owner</th>
          <th scope="col" className={d(x,p,"w-[150px]")}>Status</th>
          <th scope="col" className={d(x,p,"w-[120px] text-right")}>Records</th>
        </tr>
      </thead>
  );
}

function f({className:e}){
  return <span className={d("h-[0.7em] rounded-[var(--rb-r-xs,4px)] bg-neutral-900/8 dark:bg-neutral-100/8","block",e)} />;
}

let g = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function v(){
  let{ref:e,edges:t,onScroll:r}=function(){
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
  }(),[x,v]=useState("Loading");
  return (
    <div className={d(c,"text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={d(u,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <h2 className={d("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Connected sources</h2>
            <div role="radiogroup" aria-label="Preview state" onKeyDown={g} className={d("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {b.map(e=>{
                let t=x===e;
                return <button key={e} type="button" role="radio" aria-checked={t} tabIndex={t?0:-1} onClick={()=>v(e)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e}</button>;
              })}
            </div>
          </header>
          <div className="relative min-h-0 flex-1">
            <div ref={e} onScroll={r} aria-busy={"Loading"===x} className="h-full overflow-y-auto">
              <table className={d("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","min-w-[640px]","Loading"!==x&&"h-full")}>
                <caption className="sr-only">
                  {"Loading"===x?"Loading connected sources":"Empty"===x?"No connected sources":"Connected sources failed to load"}
                </caption>
                <k />
                {"Loading"===x&&<tbody aria-hidden>
                  {m.map((e,t)=>(
                    <tr key={t} className="group">
                                    <td className={d(h,p)}><f className={e[0]} /></td>
                                    <td className={d(h,p)}><f className={e[1]} /></td>
                                    <td className={d(h,p)}><div className="flex items-center gap-1.5"><f className="w-16" /></div></td>
                                    <td className={d(h,p)}><f className="ml-auto w-14" /></td>
                                  </tr>
                  ))}
                </tbody>}
                {"Empty"===x&&<tbody>
                  <tr>
                    <td colSpan={4} className="px-4 py-16 align-middle sm:px-6">
                      <div className="flex flex-col items-center justify-center text-center">
                        <span aria-hidden="true" className={d("text-neutral-900/80 dark:text-neutral-100/80","mb-3 flex h-10 w-10 items-center justify-center")}><HugeiconsIcon icon={Icon_86829} size={20} strokeWidth={1.8} /></span>
                        <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No sources connected</p>
                        <p className={d("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Connect a warehouse, billing system, or event stream to start syncing records.</p>
                        <button type="button" className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-4")}>Connect a source</button>
                      </div>
                    </td>
                  </tr>
                </tbody>}
                {"Error"===x&&<tbody>
                  <tr>
                    <td colSpan={4} className="px-4 py-16 align-middle sm:px-6">
                      <div role="alert" className={d("flex w-full min-w-0 items-start gap-3 rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-4 py-3 text-neutral-900 dark:text-neutral-100","mx-auto max-w-sm")}>
                        <HugeiconsIcon icon={Icon_42734} size={16} strokeWidth={1.8} aria-hidden="true" className={d("text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]","mt-0.5 shrink-0")} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[14px]/[20px] font-[450]">Couldn’t load sources</p>
                          <p className={d("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>The sync service didn’t respond within 30 seconds.</p>
                          <button type="button" onClick={()=>v("Loading")} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]","mt-2.5")}>
                            <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                            Try again
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>}
              </table>
            </div>
            <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
          <footer aria-live="polite" className={d(u,"text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","flex h-12 shrink-0 items-center px-4 sm:px-6")}>
            {"Loading"===x?"Loading sources…":"Empty"===x?"0 sources":"Last synced 30 minutes ago"}
          </footer>
        </div>
      </div>
  );
}


export default v;
