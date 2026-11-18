/**
 * React Bits Pro — Application UI (file-manager-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_64801 = [["circle",{cx:"9.5",cy:"12.5",r:"1.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 21.5L14.2929 14.7071C14.7456 14.2544 15.3597 14 16 14C16.6403 14 17.2544 14.2544 17.7071 14.7071L19.8138 16.8138",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_19907 = [["path",{d:"M19 14.0052V10.6606C19 9.84276 19 9.43383 18.8478 9.06613C18.6955 8.69843 18.4065 8.40927 17.8284 7.83096L13.0919 3.09236C12.593 2.59325 12.3436 2.3437 12.0345 2.19583C11.9702 2.16508 11.9044 2.13778 11.8372 2.11406C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88646C4.26731 3.06554 4.06508 3.26787 3.88607 3.48998C3 4.58943 3 6.21265 3 9.45908V14.0052C3 17.7781 3 19.6645 4.17157 20.8366C5.11466 21.7801 6.52043 21.9641 9 22M12 2.50022V3.00043C12 5.83009 12 7.24492 12.8787 8.12398C13.7574 9.00304 15.1716 9.00304 18 9.00304H18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 19.5L19.4453 20.4635C20.1297 20.9198 20.4719 21.1479 20.7359 21.0066C21 20.8653 21 20.454 21 19.6315V18.3685C21 17.546 21 17.1347 20.7359 16.9934C20.4719 16.8521 20.1297 17.0802 19.4453 17.5365L18 18.5M18 19.5V18.5M18 19.5C18 20.4346 18 20.9019 17.799 21.25C17.6674 21.478 17.478 21.6674 17.25 21.799C16.9019 22 16.4346 22 15.5 22H15C13.5858 22 12.8787 22 12.4393 21.5607C12 21.1213 12 20.4142 12 19C12 17.5858 12 16.8787 12.4393 16.4393C12.8787 16 13.5858 16 15 16H15.5C16.4346 16 16.9019 16 17.25 16.201C17.478 16.3326 17.6674 16.522 17.799 16.75C18 17.0981 18 17.5654 18 18.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_95819 = [["path",{d:"M4 22V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.8971 21.7598 16.5144 21.9508 14.0919 21.9899M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 5.5H7M10 7.5H9.5M7.5 9.5H7M10 11.5226H9.5M7.5 13.5H7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 22.0001V19C11 17.8954 10.1046 17 9 17C7.89543 17 7 17.8954 7 19V22.0001H11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40190 = [["path",{d:"M17.4776 9.01106C17.485 9.01102 17.4925 9.01101 17.5 9.01101C19.9853 9.01101 22 11.0294 22 13.5193C22 15.8398 20.25 17.7508 18 18M17.4776 9.01106C17.4924 8.84606 17.5 8.67896 17.5 8.51009C17.5 5.46695 15.0376 3 12 3C9.12324 3 6.76233 5.21267 6.52042 8.03192M17.4776 9.01106C17.3753 10.1476 16.9286 11.1846 16.2428 12.0165M6.52042 8.03192C3.98398 8.27373 2 10.4139 2 13.0183C2 15.4417 3.71776 17.4632 6 17.9273M6.52042 8.03192C6.67826 8.01687 6.83823 8.00917 7 8.00917C8.12582 8.00917 9.16474 8.38194 10.0005 9.01101",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 13L12 21M12 13C11.2998 13 9.99153 14.9943 9.5 15.5M12 13C12.7002 13 14.0085 14.9943 14.5 15.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_81520 = [["path",{d:"M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let m = (...e)=>e.filter(Boolean).join(" "),
  f = "rounded-[var(--rb-r-sm,6px)]",
  v = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "text-[14px]/[16px] font-[450]",
  k = "text-[12px]/[16px] font-normal tabular-nums",
  g = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  w = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  j = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  y = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  N = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  z = m("text-[13px]/[18px] font-normal",v),
  A = m(k,v),
  M = m("border border-dashed border-neutral-900/20 dark:border-neutral-100/20",f,"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",w,g),
  P = m("border border-neutral-900/50 dark:border-neutral-100/50",f,"bg-neutral-900/9 dark:bg-neutral-100/9",w,g),
  S = [{id:"u1",name:"hero-still-a.png",mb:4.2,icon:Icon_64801,progress:100,state:"done"},{id:"u2",name:"campaign-brief.pdf",mb:1.1,icon:Icon_31964,progress:100,state:"done"},{id:"u3",name:"sizzle-30s.mp4",mb:164,icon:Icon_19907,progress:62,state:"uploading"},{id:"u4",name:"press-kit.zip",mb:240,icon:Icon_95819,progress:0,state:"queued"},{id:"u5",name:"billboard-2400.png",mb:12.4,icon:Icon_64801,progress:34,state:"failed"}],
  C = [{name:"teaser-15s.mp4",mb:88,icon:Icon_19907},{name:"storyboard-v4.pdf",mb:6.7,icon:Icon_31964},{name:"hero-still-b.png",mb:3.9,icon:Icon_64801}];

function D(){
  let[e,a]=useState(false),[r,i]=useState(S),s=useRef(0);
  useEffect(()=>{
    let e=setInterval(()=>{
      i(e=>e.some(e=>"uploading"===e.state)?e.map(e=>{
        if("uploading"!==e.state)return e;
        let a=e.progress+3;
        return a>=100?{...e,progress:100,state:"done"}:{...e,progress:a};
      }):e)
    },900);
    return ()=>clearInterval(e);
  }, []);
  let o=r.filter(e=>"done"===e.state).length,{ref:d,edges:g,onScroll:w}=function(e){
    let a=useRef(null),[r,t]=useState({start:false,end:false}),n=useCallback(()=>{
      let e=a.current;
      if(!e)return;
      let{scrollTop:r,scrollHeight:l,clientHeight:n}=e;
      t({start:r>1,end:Math.ceil(r+n)<l-1})
    }, []);
    return useEffect(()=>{
      n();
      let e=a.current,r=e?.ownerDocument.defaultView;
      if(!e||!r?.ResizeObserver)return;
      let t=new r.ResizeObserver(n);
      return t.observe(e),()=>t.disconnect();
    }, [e,n]),{ref:a,edges:r,onScroll:n};
  }(r.map(e=>`${e.id}:${e.state}`).join()),D=r.reduce((e,a)=>e+a.mb,0),B=r.reduce((e,a)=>e+a.mb*a.progress/100,0),T=()=>{
    let e=C[s.current%C.length];
    s.current+=1,i(a=>[...a,{...e,id:`n${s.current}`,progress:0,state:a.some(e=>"uploading"===e.state)?"queued":"uploading"}])
  };
  return (
    <div className={m("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={m("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto min-h-0 w-full max-w-[720px] flex-1 gap-1")}>
          <div className={m("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","justify-between gap-3 py-3 has-[button]:pe-4")}>
            <div className="min-w-0">
              <h2 className={m("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Upload to Spring Campaign</h2>
              <p className={m(z,"mt-0.5 flex gap-x-3 truncate tabular-nums")}>
                <span>
                  {o}
                  {" of "}
                  {r.length}
                  {" complete"}
                </span>
                <span>
                  {D.toFixed(1)}
                  {" MB total"}
                </span>
              </p>
            </div>
            <button type="button" aria-label="Close uploader" className={m(j,"size-8 rounded-[var(--rb-r-sm,6px)]")}>
              <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <div className={m(N,"p-2.5")}>
            <button type="button" onClick={T} onDragOver={e=>{
              e.preventDefault(),a(true)
            }} onDragLeave={()=>a(false)} onDrop={e=>{
              e.preventDefault(),a(false),T()
            }} className={m(e?P:M,"flex w-full cursor-pointer flex-col items-center justify-center border-dashed px-4 py-7 text-center")}>
              <HugeiconsIcon icon={Icon_40190} size={24} strokeWidth={1.8} aria-hidden="true" className={v} />
              <p className={m(_,"mt-2.5")}>Drop files here or click to browse</p>
              <p className={m(z,"mt-1")}>Up to 2 GB per file. Images, video, PDF and archives.</p>
            </button>
          </div>
          <div className={m(N,"relative min-h-0 flex-1")}>
            <div ref={d} onScroll={w} className="min-h-0 flex-1 overflow-y-auto">
              <p className={m(A,"px-4 pt-3")}>Queue</p>
              {0===r.length?<div className="mt-2 flex flex-col items-center justify-center px-6 py-10 text-center">
                <HugeiconsIcon icon={Icon_40190} size={20} strokeWidth={1.8} aria-hidden="true" className={v} />
                <p className={m("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-2")}>Queue is empty</p>
                <p className={m("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Drop files above to start a new upload.</p>
              </div>:<ul className={m("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-2 px-1 pb-1")}>
                {r.map(e=>{
                  let a=(e=>{
                    if("done"===e.state)return ["Uploaded"];
                    if("failed"===e.state)return ["Connection lost"];
                    if("paused"===e.state)return [`Paused at ${Math.round(e.progress)}%`];
                    if("queued"===e.state)return ["Waiting"];
                    let a=Math.max(1,Math.round((100-e.progress)/100*60));
                    return [`${Math.round(e.progress)}%`,`${a} s left`];
                  })(e);
                  return (
                    <li key={e.id}>
                                    <div className={m("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","failed"===e.state&&"bg-[oklch(94.5%_0.027_26/0.4)] hover:bg-[oklch(94.5%_0.027_26/0.6)] dark:bg-[oklch(29%_0.06_26/0.4)] dark:hover:bg-[oklch(29%_0.06_26/0.6)]",f,"px-3")}>
                                      <HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" className={m(v,"shrink-0")} />
                                      <div className="min-w-0 flex-1">
                                        <p className="flex items-baseline justify-between gap-3">
                                          <span className={m(_,"truncate")}>{e.name}</span>
                                          <span className={m(A,"shrink-0")}>
                                            {e.mb.toFixed(1)}
                                            {" MB"}
                                          </span>
                                        </p>
                                        {"done"===e.state?<p className={m(A,"mt-1 flex items-center gap-1.5")}>
                                          <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                                          {a[0]}
                                        </p>:<>
                                          <div role="progressbar" aria-valuenow={Math.round(e.progress)} aria-valuemin={0} aria-valuemax={100} aria-label={`Upload progress for ${e.name}`} className={m("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-1.5")}>
                                            <div style={{width:`${e.progress}%`}} className={"failed"===e.state?m("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","h-full"):"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100"} />
                                          </div>
                                          <p className={m(k,"failed"===e.state?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":v,"mt-1 flex gap-x-2")}>{a.map(e=><span key={e}>{e}</span>)}</p>
                                        </>}
                                      </div>
                                      <button type="button" onClick={()=>{
                                        i(a=>a.flatMap(a=>a.id!==e.id?[a]:"uploading"===a.state?[{...a,state:"paused"}]:"paused"===a.state||"queued"===a.state?[{...a,state:"uploading"}]:"failed"===a.state?[{...a,progress:0,state:"uploading"}]:[]))
                                      }} aria-label={"failed"===e.state?`Retry ${e.name}`:"uploading"===e.state?`Pause ${e.name}`:"paused"===e.state||"queued"===e.state?`Start ${e.name}`:`Remove ${e.name}`} className={m(j,"size-7 rounded-[var(--rb-r-sm,6px)]")}>
                                        <HugeiconsIcon icon={"failed"===e.state?Icon_59157:"uploading"===e.state?Icon_81520:"paused"===e.state||"queued"===e.state?Icon_48318:Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                                      </button>
                                    </div>
                                  </li>
                  );
                })}
              </ul>}
            </div>
            <div aria-hidden="true" className={m("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",g.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={m("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",g.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={m("flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2","flex-wrap")}>
            <p className="me-auto tabular-nums">
              {B.toFixed(1)}
              {" MB of "}
              {D.toFixed(1)}
              {" MB transferred"}
            </p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>i([])} className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",y)}>Cancel all</button>
              <button type="button" onClick={()=>i(e=>e.filter(e=>"done"!==e.state))} className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",y)}>Clear completed</button>
            </div>
          </div>
        </div>
      </div>
  );
}


export default D;
