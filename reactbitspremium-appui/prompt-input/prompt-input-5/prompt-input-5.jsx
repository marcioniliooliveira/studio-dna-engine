/**
 * React Bits Pro — Application UI (prompt-input-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_48094 = [["path",{d:"M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_6097 = [["path",{d:"M5.25 21H18.75C18.9822 21 19.0983 21 19.196 20.9904C20.1456 20.8968 20.8968 20.1456 20.9904 19.196C21 19.0983 21 18.9822 21 18.75C21 18.5178 21 18.4017 20.9904 18.304C20.8968 17.3544 20.1456 16.6032 19.196 16.5096C19.0983 16.5 18.9822 16.5 18.75 16.5H17.0607C16.8324 16.5 16.7182 16.5 16.6087 16.5121C16.2317 16.5538 15.8742 16.7018 15.5781 16.939C15.4921 17.0079 15.4114 17.0886 15.25 17.25C15.0886 17.4114 15.0079 17.4921 14.9219 17.561C14.6258 17.7982 14.2683 17.9462 13.8913 17.9879C13.7818 18 13.6676 18 13.4393 18H10.5607C10.3324 18 10.2182 18 10.1087 17.9879C9.73165 17.9462 9.37423 17.7982 9.07814 17.561C8.99213 17.4921 8.91142 17.4114 8.75 17.25C8.58858 17.0886 8.50787 17.0079 8.42186 16.939C8.12577 16.7018 7.76835 16.5538 7.3913 16.5121C7.28177 16.5 7.16763 16.5 6.93934 16.5H5.25C5.01783 16.5 4.90175 16.5 4.80397 16.5096C3.85441 16.6032 3.10315 17.3544 3.00963 18.304C3 18.4017 3 18.5178 3 18.75C3 18.9822 3 19.0983 3.00963 19.196C3.10315 20.1456 3.85441 20.8968 4.80397 20.9904C4.90175 21 5.01783 21 5.25 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.5 7.49996C16.5 7.49996 13.1858 3.00001 12 3C10.8141 2.99999 7.5 7.5 7.5 7.5M12 4V15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "rounded-[var(--rb-r-sm,6px)]",
  p = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  m = "size-7 rounded-[var(--rb-r-sm,6px)]",
  f = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  k = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  v = [{id:"a",name:"brand-guidelines.pdf",size:"3.4 MB",status:"done",progress:100},{id:"b",name:"q3-campaign-metrics.csv",size:"820 KB",status:"uploading",progress:38},{id:"c",name:"product-shot-hero.png",size:"9.1 MB",status:"error",progress:64}];

function g(){
  let[e,r]=useState(""),[t,g]=useState(v),{ref:w,edges:y,onScroll:j}=function(){
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
  }(),[N,z]=useState(false),[A,D]=useState(false),S=useRef(null),E=useRef(undefined);
  useEffect(()=>{
    let e=S.current;
    if(!e)return;
    let r=()=>{
      e.style.height="auto",0!==e.scrollHeight&&(e.style.height=`${Math.min(e.scrollHeight,200)}px`)
    };
    r();
    let t=requestAnimationFrame(r);
    e.ownerDocument.fonts?.ready.then(r).catch(()=>{});
    let a=e.clientWidth,n=new ResizeObserver(()=>{
      e.clientWidth!==a&&(a=e.clientWidth,r())
    });
    return observe(e),()=>{
      cancelAnimationFrame(t),disconnect()
    };
  }, [e]),useEffect(()=>()=>clearTimeout(E.current), []);
  let R=()=>{
    g(e=>[...e,{id:`f${e.length+1}-${Date.now()}`,name:`asset-${e.length+1}.png`,size:`${1+e.length}.2 MB`,status:"uploading",progress:0}])
  };
  useEffect(()=>{
    let e=setInterval(()=>{
      g(e=>e.some(e=>"uploading"===e.status)?e.map(e=>"uploading"===e.status?e.progress>=100?{...e,status:"done",progress:100}:{...e,progress:Math.min(100,e.progress+6)}:e):e)
    },260);
    return ()=>clearInterval(e);
  }, []);
  let W=e.trim().length>0&&!A,C=()=>{
    W&&(D(true),r(""),E.current=setTimeout(()=>D(false),1800))
  };
  return (
    <div className={b("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full w-full min-h-[560px] flex-col overflow-hidden")}>
        {N&&<div className="pointer-events-none absolute inset-4 z-20">
          <div className={b(f,"h-full")}>
            <div className={b(k,"mt-1 flex-1 items-center justify-center")}>
              <span className={b("text-[14px]/[16px] font-[450]","text-neutral-900/80 dark:text-neutral-100/80")}>Drop files to attach</span>
            </div>
          </div>
        </div>}
        <div onDragOver={e=>{
          e.preventDefault(),z(true)
        }} onDragLeave={e=>{
          e.currentTarget.contains(e.relatedTarget)||z(false)
        }} onDrop={e=>{
          e.preventDefault(),z(false)
        }} className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-4 py-8 sm:px-6">
          <div className="relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8">
            <textarea ref={S} rows={1} value={e} onChange={e=>r(e.target.value)} onKeyDown={e=>{
              "Enter"!==e.key||e.shiftKey||(e.preventDefault(),C())
            }} placeholder="Ask anything" aria-label="Message" className={b("max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66","block max-h-[200px] min-h-[52px] w-full px-4 py-3.5")} />
            <div className="flex items-center gap-1 px-2.5 pb-2.5 pt-1">
              <button type="button" aria-label="Attach a file" onClick={R} className={b(h,m)}>
                <HugeiconsIcon icon={Icon_48094} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              {A?<button type="button" onClick={()=>{
                clearTimeout(E.current),D(false)
              }} aria-label="Stop generating" className={b(p,m,"ml-auto")}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button type="button" aria-label="Send" disabled={!W} onClick={C} className={b(p,m,"ml-auto")}>
                <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>}
            </div>
          </div>
          <div className={f}>
            <div className={b(k,"relative mt-1")}>
              <div ref={w} onScroll={j} className={b("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex max-h-[13.5rem] flex-col overflow-y-auto overscroll-contain")}>
                {t.map(e=>(
                  <div key={e.id} className="p-1">
                                <div className={b("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]","error"===e.status&&"bg-[oklch(94.5%_0.027_26/0.4)] hover:bg-[oklch(94.5%_0.027_26/0.6)] dark:bg-[oklch(29%_0.06_26/0.4)] dark:hover:bg-[oklch(29%_0.06_26/0.6)]",_,"h-9 content-center px-2")}>
                                  <HugeiconsIcon icon={Icon_31964} size={16} strokeWidth={1.8} aria-hidden="true" className={b(x,"shrink-0")} />
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2.5">
                                      <span className={b("text-[13px]/[18px] font-normal","block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]","flex-1")}>{e.name}</span>
                                      {"uploading"===e.status&&<div className="w-16 shrink-0 sm:w-24">
                                        <div className="relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7">
                                          <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${e.progress}%`}} />
                                        </div>
                                      </div>}
                                      {"error"===e.status?<span className={b("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums","text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]","shrink-0 text-right")}>Connection lost</span>:<span className={b("text-[12px]/[16px] font-normal tabular-nums",x,"min-w-[3rem] shrink-0 text-right")}>{"done"===e.status?e.size:`${e.progress}%`}</span>}
                                    </div>
                                  </div>
                                  <div className="relative z-10 flex shrink-0 items-center gap-1">
                                    {"error"===e.status&&<button type="button" aria-label={`Retry ${e.name}`} onClick={()=>{
                                      let r;
                                      return r=e.id,g(e=>e.map(e=>e.id===r?{...e,status:"uploading",progress:0}:e));
                                    }} className={b(h,m)}>
                                      <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
                                    </button>}
                                    <button type="button" aria-label={`Remove ${e.name}`} onClick={()=>{
                                      let r;
                                      return r=e.id,g(e=>e.filter(e=>e.id!==r));
                                    }} className={b(h,m)}>
                                      <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                ))}
              </div>
              <div aria-hidden="true" className={b("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",y.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={b("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",y.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
          <button type="button" onClick={R} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",_,"h-16 w-full")}>
            <HugeiconsIcon icon={Icon_6097} size={16} strokeWidth={1.8} aria-hidden="true" className={x} />
            Drag files here, or browse
          </button>
        </div>
      </div>
  );
}


export default g;
