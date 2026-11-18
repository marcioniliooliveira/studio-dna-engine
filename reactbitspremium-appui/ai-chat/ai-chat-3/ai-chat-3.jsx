/**
 * React Bits Pro — Application UI (ai-chat-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_97838 = [["path",{d:"M13.5 16.5L15 18M14 14.5C14 15.8807 12.8807 17 11.5 17C10.1193 17 9 15.8807 9 14.5C9 13.1193 10.1193 12 11.5 12C12.8807 12 14 13.1193 14 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_3980 = [["path",{d:"M6 8L6 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 16V12C18 9.17156 18 7.75735 17.1213 6.87867C16.2426 5.99999 14.8284 5.99999 12 5.99999L11 5.99999M11 5.99999C11 5.29976 12.9943 3.99152 13.5 3.49999M11 5.99999C11 6.70022 12.9943 8.00846 13.5 8.49999",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"6",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["circle",{cx:"6",cy:"6",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["circle",{cx:"18",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_92190 = [["path",{d:"M11 6L21 6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 12L21 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 18L21 18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  p = "size-7 rounded-[var(--rb-r-sm,6px)]",
  m = [{icon:Icon_97838,label:"Summarize the latest release notes"},{icon:Icon_3980,label:"What changed in this pull request?"},{icon:Icon_92190,label:"Draft acceptance criteria for the new filter"}],
  f = "The latest release centered on the new filter panel, faster search indexing, and a set of smaller fixes for keyboard navigation. I can pull the full changelog, or turn any part of it into acceptance criteria: just tell me which area to focus on.",
  _ = [{id:"u-1",role:"user",text:"Summarize the latest release notes"},{id:"a-1",role:"assistant",text:"Version 2.4 focused on the new filter panel, faster search indexing, and keyboard-navigation fixes."},{id:"u-2",role:"user",text:"What changed in the filter panel?"},{id:"a-2",role:"assistant",text:"It moved into a docked sidebar, gained saved views, and now remembers your last query per project."},{id:"u-3",role:"user",text:"Draft acceptance criteria for the new filter"},{id:"a-seed",role:"assistant",text:"Filters apply instantly, saved views persist per project, and every control stays reachable by keyboard."}];

function v(){
  let e=useReducedMotion(),[t,r]=useState(_),[o,c]=useState(null),[d,v]=useState(false),[g,k]=useState(""),[w,j]=useState(0),{text:y,done:N,push:z,end:S,reset:C}=function(){
    let[e,t]=useState(""),[r,a]=useState(false),i=useRef(""),s=useRef(0),o=useRef(false),c=useReducedMotion();
    useEffect(()=>{
      let e=0,r=performance.now(),n=l=>{
        let d=Math.min(l-r,64);
        r=l;
        let u=i.current,x=u.length-s.current;
        if(x>0){
          s.current=c?u.length:Math.min(u.length,s.current+x*(1-Math.exp(-d/180))+45*d/1e3);
          let e=Math.floor(s.current),r=o.current&&e>=u.length,n=r?u.length:function(e,t){
            if(t>=e.length)return e.length;
            let r=e.lastIndexOf(" ",t);
            return -1===r?0:r;
          }(u,e);
          t(u.slice(0,n)),r&&a(true)
        }
        e=requestAnimationFrame(n)
      };
      return e=requestAnimationFrame(n),()=>cancelAnimationFrame(e);
    }, [c]);
    let d=useCallback(e=>{
      i.current+=e
    }, []);
    return {text:e,done:r,push:d,end:useCallback(()=>{
      o.current=true
    }, []),reset:useCallback(()=>{
      i.current="",s.current=0,o.current=false,t(""),a(false)
    }, [])};
  }(),{ref:A,edges:E,onScroll:R}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=t;
      r({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),{showJump:H,jumpToLatest:I}=function(e){
    let t=useRef(true),[r,a]=useState(false);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      let n=()=>{
        let e=r.scrollHeight-r.clientHeight>1,n=r.scrollHeight-r.scrollTop-r.clientHeight,l=!e||n<24;
        t.current=l,a(e&&!l)
      },l=e=>{
        (!("deltaY"in e)||e.deltaY<0)&&r.scrollHeight-r.clientHeight>1&&r.scrollTop>0&&(t.current=false)
      },i=new ResizeObserver(()=>{
        t.current&&(r.scrollTop=r.scrollHeight),n()
      });
      return i.observe(r),r.firstElementChild&&i.observe(r.firstElementChild),r.addEventListener("wheel",l,{passive:true}),r.addEventListener("touchmove",l,{passive:true}),r.addEventListener("scroll",n,{passive:true}),r.scrollTop=r.scrollHeight,n(),()=>{
        i.disconnect(),r.removeEventListener("wheel",l),r.removeEventListener("touchmove",l),r.removeEventListener("scroll",n)
      };
    }, [e]),{showJump:r,jumpToLatest:useCallback(()=>{
      let r=e.current;
      r&&(t.current=true,a(false),r.scrollTop=r.scrollHeight)
    }, [e])};
  }(A),M=useRef(null),D=useRef(null),T=null!==o&&!N&&!d,L=T&&""===y;
  useEffect(()=>{
    if(!o)return;
    if(e){
      z(f),S();
      return
    }
    let t=f.match(/\S+\s*/g)??[],r=0;
    return D.current=window.setInterval(()=>{
      let e=1+Math.floor(3*Math.random());
      z(t.slice(r,r+e).join("")),(r+=e)>=t.length&&(S(),D.current&&window.clearInterval(D.current),D.current=null)
    },130),()=>{
      D.current&&window.clearInterval(D.current)
    };
  }, [o,w,e,z,S]);
  let W=useCallback(e=>{
    let t=e.trim();
    if(!t)return;
    let a=`u-${Date.now()}`,n=`a-${Date.now()}`;
    C(),v(false),r(e=>[...e,{id:a,role:"user",text:t},{id:n,role:"assistant",text:f}]),c(n),j(e=>e+1),k("")
  }, [C]),O=useCallback(()=>{
    D.current&&(window.clearInterval(D.current),D.current=null),S(),v(true)
  }, [S]),$=0===t.length;
  return (
    <div className={b("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[560px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={b("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-sm flex-1")}>
          <div className={b("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","h-12")}>
            <span className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Assistant</span>
            <span className={b("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-neutral-900/66 dark:text-neutral-100/66","ml-auto")}>Ready</span>
          </div>
          <div className={b("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","min-h-0 flex-1")}>
            <div className="relative flex min-h-0 flex-1 flex-col">
              <div ref={A} onScroll={R} className="min-h-0 flex-1 overflow-y-auto overscroll-contain [overflow-anchor:none]">
                <div className="flex min-h-full flex-col px-3 py-3">
                  {$?<div className="m-auto w-full">
                    <div className="space-y-1.5">
                      <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">How can I help?</h2>
                      <p className="max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">Ask about the repository, or start from an example.</p>
                    </div>
                    <div className={b("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","-mx-2.5 mt-5")}>
                      {m.map(({icon:e,label:t})=>(
                        <div key={t} className="p-1">
                                            <button type="button" onClick={()=>W(t)} className={b("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","rounded-[var(--rb-r-sm,6px)]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","px-1.5")}>
                                              <HugeiconsIcon icon={e} size={16} strokeWidth={1.8} aria-hidden="true" className={b("text-neutral-900/66 dark:text-neutral-100/66","shrink-0")} />
                                              <span className={b("text-[13px]/[18px] font-normal","text-neutral-900/80 dark:text-neutral-100/80","min-w-0 flex-1 truncate")}>{t}</span>
                                            </button>
                                          </div>
                      ))}
                    </div>
                  </div>:<div className="flex flex-col gap-4">
                    {t.map(e=>{
                      if("user"===e.role)return (
                        <div key={e.id} className="flex">
                                            <div className="ml-auto max-w-[85%]">
                                              <div className="w-fit max-w-full rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-3.5 py-2 text-[14px]/[20px] whitespace-pre-wrap text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{e.text}</div>
                                            </div>
                                          </div>
                      );
                      let t=e.id===o;
                      return (
                        <div key={e.id} className="min-h-[1.25rem]">
                                            {t&&L?<div className={b("relative flex w-fit max-w-full min-w-0 items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","h-5")}>
                                              <span className="flex h-lh shrink-0 items-center">
                                                <span className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" aria-hidden="true" />
                                              </span>
                                              Thinking
                                            </div>:<p className="flex min-w-0 flex-col gap-3 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{t&&T?y:e.text}</p>}
                                          </div>
                      );
                    })}
                  </div>}
                </div>
              </div>
              <div aria-hidden="true" className={b("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",E.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={b("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",E.end?"opacity-100":"opacity-0")} />
              {H&&<div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
                <motion.button type="button" onClick={I} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.15}} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                  <HugeiconsIcon icon={Icon_54345} size={16} strokeWidth={1.8} aria-hidden="true" />
                  Jump to latest
                </motion.button>
              </div>}
            </div>
          </div>
          <div className="shrink-0 p-1">
            <div className="relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8">
              <div className="flex min-w-0 items-end gap-1 p-2">
                <textarea ref={M} rows={1} value={g} onChange={e=>{
                  let t;
                  k(e.target.value),(t=M.current)&&(t.style.height="auto",t.style.height=`${Math.min(t.scrollHeight,160)}px`)
                }} onKeyDown={e=>{
                  "Enter"!==e.key||e.shiftKey||(e.preventDefault(),W(g))
                }} placeholder="Ask anything" className="max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
                {T?<button key={"stop"} type="button" onClick={O} aria-label="Stop generating" className={b(h,p)}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button key={"send"} type="button" onClick={()=>W(g)} aria-label="Send" disabled={0===g.trim().length} className={b(h,p)}>
                  <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default v;
