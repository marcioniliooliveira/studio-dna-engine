/**
 * React Bits Pro — Application UI (chat-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_13426 = [["circle",{cx:"12",cy:"12",r:"2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 8C6.5 9 6 10.5 6 12C6 13.5 6.5 15 7.5 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4.5 6C3 7.5 2 9.5 2 12C2 14.5 3 16.5 4.5 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16.5 16C17.5 15 18 13.5 18 12C18 10.5 17.5 9 16.5 8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M19.5 18C21 16.5 22 14.5 22 12C22 9.5 21 7.5 19.5 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_90227 = [["path",{d:"M12 16V21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 5.2918C8 5.02079 8 4.88529 8.01312 4.77132C8.1194 3.84789 8.84789 3.1194 9.77133 3.01312C9.88529 3 10.0208 3 10.2918 3H13.7082C13.9792 3 14.1147 3 14.2287 3.01312C15.1521 3.1194 15.8806 3.84789 15.9869 4.77132C16 4.88529 16 5.02079 16 5.2918C16 5.37885 16 5.42237 15.9967 5.46264C15.9708 5.78281 15.7927 6.07104 15.5179 6.2374C15.4834 6.25832 15.4444 6.27779 15.3666 6.31672L15.1055 6.44726C14.7021 6.64897 14.5003 6.74983 14.3681 6.90564C14.26 7.03286 14.1856 7.18509 14.1515 7.34846C14.1097 7.54854 14.1539 7.76968 14.2424 8.21197L15 12H15.3333C15.9533 12 16.2633 12 16.5176 12.0681C17.2078 12.2531 17.7469 12.7922 17.9319 13.4824C18 13.7367 18 14.0467 18 14.6667C18 14.9767 18 15.1317 17.9659 15.2588C17.8735 15.6039 17.6039 15.8735 17.2588 15.9659C17.1317 16 16.9767 16 16.6667 16H7.33333C7.02334 16 6.86835 16 6.74118 15.9659C6.39609 15.8735 6.12654 15.6039 6.03407 15.2588C6 15.1317 6 14.9767 6 14.6667C6 14.0467 6 13.7367 6.06815 13.4824C6.25308 12.7922 6.79218 12.2531 7.48236 12.0681C7.73669 12 8.04669 12 8.66667 12H9L9.75761 8.21197C9.84606 7.76968 9.89029 7.54854 9.84852 7.34846C9.81441 7.18509 9.73995 7.03286 9.63194 6.90564C9.49965 6.74983 9.29794 6.64897 8.89452 6.44726L8.63344 6.31672C8.55558 6.27779 8.51665 6.25832 8.48208 6.2374C8.20731 6.07104 8.02917 5.78281 8.00326 5.46264C8 5.42237 8 5.37885 8 5.2918Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_36122 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_49322 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.625 8.387V8.91649M8.375 8.387V8.91649M8.75 8.75C8.75 8.33579 8.58211 8 8.375 8C8.16789 8 8 8.33579 8 8.75C8 9.16421 8.16789 9.5 8.375 9.5C8.58211 9.5 8.75 9.16421 8.75 8.75ZM16 8.75C16 8.33579 15.8321 8 15.625 8C15.4179 8 15.25 8.33579 15.25 8.75C15.25 9.16421 15.4179 9.5 15.625 9.5C15.8321 9.5 16 9.16421 16 8.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  b = "text-neutral-900/80 dark:text-neutral-100/80",
  h = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[13px]/[18px] font-normal",
  _ = "text-[14px]/[16px] font-[450]",
  m = "size-7 rounded-[var(--rb-r-sm,6px)]",
  f = u(p,h),
  v = [{id:"l1",name:"Rowan Diaz",initials:"RD",role:"host",text:"Welcome in. We are starting with the layout pass, then taking questions in the last twenty minutes."},{id:"l2",name:"kestrel",initials:"KE",text:"the grid overlay is doing a lot of work here"},{id:"l3",name:"Junie Park",initials:"JP",role:"mod",text:"Reminder: drop questions with a leading Q so we can find them later."},{id:"l4",name:"mattlives",initials:"ML",text:"Q: how do you decide when a section deserves its own surface vs just spacing?"},{id:"l5",name:"aurelia",initials:"AU",text:"second that question, we argue about it every sprint"},{id:"l6",name:"Rowan Diaz",initials:"RD",role:"host",text:"Good one. Short answer: a surface is for a different kind of content, not a different amount of it."},{id:"l7",name:"tinyhaus",initials:"TH",text:"that line is going straight into our team doc"},{id:"l8",name:"devon.b",initials:"DB",text:"is the recording going out to everyone or subscribers only?"}],
  k = [{group:"Hosts",people:["Rowan Diaz"]},{group:"Moderators",people:["Junie Park","Sam Ottoline"]},{group:"Viewers",people:["kestrel","mattlives","aurelia","tinyhaus","devon.b"]}];

function g(){
  let[e,r]=useState(""),{ref:a,edges:g,onScroll:w}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:i}=r;
      a({start:t>1,end:Math.ceil(t+i)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }();
  return (
    <div className={u("bg-white dark:bg-neutral-950",x,"flex h-full min-h-[680px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","grid min-h-0 flex-1 gap-1 lg:grid-cols-[1fr_220px]")}>
          <div className="flex min-h-[440px] min-w-0 flex-col gap-1 lg:min-h-0">
            <div className={u("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","justify-between gap-3 py-3")}>
              <div className="min-w-0">
                <h2 className={u(_,"flex items-center gap-2")}>
                  <HugeiconsIcon icon={Icon_13426} size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                  <span className="truncate">Live: designing dense interfaces</span>
                </h2>
                <p className={u(f,"mt-0.5 flex gap-x-3 truncate tabular-nums")}>
                  <span>1,284 watching</span>
                  <span>41 min in</span>
                </p>
              </div>
              <button type="button" className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","me-2")}>Follow</button>
            </div>
            <div className="flex items-start gap-2.5 px-4 py-2.5">
              <HugeiconsIcon icon={Icon_90227} size={14} strokeWidth={1.8} aria-hidden="true" className={u(h,"mt-0.5 shrink-0")} />
              <p className={u(p,b)}>
                Pinned by Junie Park: slides and the sample file are in the description. The recording goes out to everyone tomorrow.
              </p>
            </div>
            <div className={u("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
              <div ref={a} onScroll={w} className="flex min-h-0 flex-1 flex-col space-y-2.5 overflow-y-auto p-3 [&>*:first-child]:mt-auto">
                {v.map(e=>(
                  <p key={e.id} className={u(p,b)}>
                                <span aria-hidden className={u("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","mr-2 size-[20px] align-middle")}>
                                  <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.initials.slice(0,1)}</span>
                                </span>
                                {e.role&&<span className={u("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100","mr-1.5 align-middle")}>
                                  {"mod"===e.role&&<HugeiconsIcon icon={Icon_36122} size={12} strokeWidth={1.8} aria-hidden="true" />}
                                  {"host"===e.role?"Host":"Mod"}
                                </span>}
                                <span className={u(_,x,"mr-1.5")}>{e.name}</span>
                                {e.text}
                              </p>
                ))}
              </div>
              <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",g.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",g.end?"opacity-100":"opacity-0")} />
            </div>
            <div className="shrink-0 px-1 pb-1">
              <form onSubmit={e=>{
                e.preventDefault(),r("")
              }} className={u("relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8","rounded-[var(--rb-r-sm,6px)]")}>
                <div className="flex min-w-0 items-end gap-1 p-2">
                  <label htmlFor="chat-6-composer" className="sr-only">Send a message to the stream</label>
                  <input id="chat-6-composer" value={e} onChange={e=>r(e.target.value)} placeholder="Say something" className="max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
                  <button type="button" aria-label="Add emoji" className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",m)}>
                    <HugeiconsIcon icon={Icon_49322} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  <button type="submit" aria-label="Send message" disabled={!e.trim()} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",m)}>
                    <HugeiconsIcon icon={Icon_55410} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <aside className="hidden min-h-0 flex-col overflow-hidden lg:flex">
            <div className="px-4 py-3">
              <h3 className={_}>In the room</h3>
              <p className={u(f,"mt-0.5 tabular-nums")}>8 of 1,284 shown</p>
            </div>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-2 pb-2">
              {k.map(e=>(
                <div key={e.group}>
                            <p className={u("text-[12px]/[16px] font-normal tabular-nums",h,"px-2")}>{e.group}</p>
                            <ul className="mt-1.5 space-y-0.5">
                              {e.people.map(e=>(
                                <li key={e}>
                                                <button type="button" className="flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100"><span className="truncate">{e}</span></button>
                                              </li>
                              ))}
                            </ul>
                          </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
  );
}


export default g;
