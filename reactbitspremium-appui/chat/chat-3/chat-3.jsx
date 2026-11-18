/**
 * React Bits Pro — Application UI (chat-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_43755 = [["path",{d:"M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_47293 = [["path",{d:"M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_71497 = [["path",{d:"M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "text-[13px]/[18px] font-normal",
  h = "text-[14px]/[16px] font-[450]",
  p = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  m = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  f = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  v = c(b,x),
  k = c("text-[12px]/[16px] font-normal tabular-nums",x),
  g = 24,
  w = 41,
  j = 318,
  y = [{id:"r1",author:"Marcus Bell",handle:"@marcusb",initials:"MB",at:"1h",body:"This is the part most dashboards get wrong. Six status colours and everything looks equally urgent.",likes:42,liked:true,children:[{id:"r1a",author:"Amelia Whitfield",handle:"@amelia",initials:"AW",at:"58m",body:"Exactly. We capped ourselves at two hues for the whole surface and it forced better hierarchy everywhere else.",likes:17,liked:false}]},{id:"r2",author:"Sofia Alvarez",handle:"@sofia.a",initials:"SA",at:"44m",body:"Curious how you handle the “nearing limit” case. That one always wants to be its own colour.",likes:9,liked:false,children:[]}];

function N({initials:e,size:r=32}){
  return (
    <span aria-hidden style={{width:r,height:r}} className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
        <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e}</span>
      </span>
  );
}

function z({icon:e,label:r,count:a,active:n,onClick:l}){
  return (
    <button type="button" aria-label={`${r}, ${a}`} aria-pressed={n} onClick={l} className={c(_,m,"tabular-nums")}>
        <HugeiconsIcon icon={e} size={16} strokeWidth={1.8} aria-hidden="true" className={c(n&&"[&_path]:fill-current")} />
        {a}
      </button>
  );
}

function A(){
  let[e,r]=useState(false),[a,x]=useState(""),A=useRef(null);
  return (
    <div className={c("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[800px] w-full flex-col overflow-y-auto p-4 sm:p-6")}>
        <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[680px] shrink-0 gap-1")}>
          <article className={c(f,"mt-1 p-3")}>
            <div className="flex items-start gap-3">
              <N initials="AW" size={40} />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className={h}>Amelia Whitfield</span>
                  <span className={k}>@amelia</span>
                  <span className={k}>2h</span>
                </p>
                <p className={c("text-[14px]/[20px] font-normal","mt-2")}>
                  We rebuilt our billing screens around one rule: colour marks the exception, never the layout. Overdue is the only thing that gets to be red.
                </p>
                <div className="mt-3 flex items-center gap-1">
                  <z icon={Icon_36586} label="Replies" count={g} />
                  <z icon={Icon_43755} label="Reposts" count={w} />
                  <z icon={Icon_47293} label="Likes" count={j+ +!!e} active={e} onClick={()=>r(e=>!e)} />
                  <button type="button" aria-label="Share post" className={c(_,"size-7 rounded-[var(--rb-r-sm,6px)]","ml-auto")}>
                    <HugeiconsIcon icon={Icon_71497} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </article>
          <div className="px-1">
            <form onSubmit={e=>{
              e.preventDefault(),x(""),A.current&&(A.current.style.height="")
            }} className="relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8">
              <div className="flex items-start gap-3 p-3">
                <N initials="YO" />
                <div className="min-w-0 flex-1">
                  <label htmlFor="chat-3-reply" className="sr-only">Post a reply</label>
                  <textarea ref={A} id="chat-3-reply" rows={2} value={a} onChange={e=>{
                    let r;
                    x(e.target.value),(r=A.current)&&(r.style.height="auto",r.style.height=`${Math.min(r.scrollHeight,160)}px`)
                  }} placeholder="Post your reply" className={c("max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66","min-h-12 w-full")} />
                  <div className="mt-1 flex items-center justify-between gap-3 ps-1.5">
                    <p className={v}>Replies are visible to everyone following this thread.</p>
                    <button type="submit" disabled={!a.trim()} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",m)}>Reply</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5">
            <p className={v}>Showing most relevant replies first</p>
            <button type="button" className={c(p,m,"ml-auto")}>Most recent</button>
          </div>
          {y.map(e=>(
            <article key={e.id} className={c(f,"p-3")}>
                    <div className="flex items-start gap-3">
                      <N initials={e.initials} />
                      <div className="min-w-0 flex-1">
                        <p className="flex flex-wrap items-baseline gap-x-2">
                          <span className={h}>{e.author}</span>
                          <span className={k}>{e.handle}</span>
                          <span className={k}>{e.at}</span>
                        </p>
                        <p className={c(b,u,"mt-1.5")}>{e.body}</p>
                        <div className="mt-2 flex items-center gap-1">
                          <z icon={Icon_47293} label={`Likes on reply from ${e.author}`} count={e.likes} active={e.liked} />
                          <button type="button" className={c(p,m)}>Reply</button>
                        </div>
                        {e.children.length>0&&<ul className="mt-3 space-y-3 pl-4">
                          {e.children.map(e=>(
                            <li key={e.id} className="flex items-start gap-2.5">
                                            <N initials={e.initials} size={26} />
                                            <div className="min-w-0 flex-1">
                                              <p className="flex flex-wrap items-baseline gap-x-2">
                                                <span className={h}>{e.author}</span>
                                                <span className={k}>{e.handle}</span>
                                                <span className={k}>{e.at}</span>
                                              </p>
                                              <p className={c(b,u,"mt-1")}>{e.body}</p>
                                              <div className="mt-1.5">
                                                <z icon={Icon_47293} label={`Likes on reply from ${e.author}`} count={e.likes} active={e.liked} />
                                              </div>
                                            </div>
                                          </li>
                          ))}
                        </ul>}
                      </div>
                    </div>
                  </article>
          ))}
          <div className="px-1 pb-1">
            <button type="button" className={c(p,"h-11 gap-2 rounded-[var(--rb-r-sm,6px)] px-5 text-[16px]/[20px] font-[450] tracking-[-0.01em]","w-full")}>Show 21 more replies</button>
          </div>
        </div>
      </div>
  );
}


export default A;
