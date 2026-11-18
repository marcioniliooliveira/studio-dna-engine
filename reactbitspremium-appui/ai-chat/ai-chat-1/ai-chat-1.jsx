/**
 * React Bits Pro — Application UI (ai-chat-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  m = "text-neutral-900/66 dark:text-neutral-100/66",
  f = "text-[13px]/[18px] font-normal",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  g = "size-7 rounded-[var(--rb-r-sm,6px)]",
  k = "shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90",
  w = "flex size-4 shrink-0 items-center justify-center",
  j = p(f,m),
  y = "By plan, Growth accounted for $5,180 of the refunds and Scale for $3,240, with Starter under $900. The renewal failures cluster on Growth annual plans billed on the 12th, so retrying those cards a day later would recover most of the amount.",
  N = [{id:"u1",role:"user",text:"Why did refunds spike last week?"},{id:"a1",role:"assistant",reasoning:"The refund total moved with two things last week: a pricing change that shipped on the 12th, and a batch of failed renewals that were auto-refunded. I checked both before answering.",tool:{name:"Searched 1,284 refunds",result:"reason              count     amount\nRenewal failed         84    $6,240\nDowngrade credit       31    $1,905\nDuplicate charge        9      $612\nCustomer request        7      $438",duration:"1.2s",done:true},text:"Refunds rose 38% week over week, from $6,730 to $9,290. Almost all of the increase came from failed renewals after the card-retry window was shortened on the 12th. Downgrade credits were flat, and duplicate charges stayed in the single digits.",sources:[{id:"1",title:"Billing events"},{id:"2",title:"Pricing change, Jun 12"}]},{id:"u2",role:"user",text:"Break it down by plan tier."},{id:"a2",role:"assistant",text:y}];

function z({text:e}){
  let[t,r]=useState(false);
  return (
    <div className="flex flex-col">
        <button type="button" onClick={()=>r(e=>!e)} aria-expanded={t} className="group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">
          <span className={w}>
            <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className={k} />
          </span>
          <span>
            {"Thought for "}
            <span className="tabular-nums">4s</span>
          </span>
        </button>
        {t&&<p className={p(f,"text-neutral-900/80 dark:text-neutral-100/80","mt-2 max-w-prose")}>{e}</p>}
      </div>
  );
}

function S({tool:e}){
  let[t,r]=useState(false);
  return (
    <div>
        <button type="button" onClick={()=>r(e=>!e)} aria-expanded={t} className={p("group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","w-[calc(100%+16px)]")}>
          <span className={w}>
            <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className={k} />
          </span>
          <span className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80">{e.name}</span>
          <span className={p(m,"min-w-14")}>{e.done?"Done":"Running"}</span>
          <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{e.duration}</span>
        </button>
        {t&&<div className={p("flex min-w-0 flex-col gap-3 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 px-3 py-2 dark:bg-neutral-100/5","mt-2 max-h-40 overflow-y-auto")}>
          <pre className="min-w-0 overflow-x-auto font-mono text-[12px]/[16px] whitespace-pre-wrap text-neutral-900/80 dark:text-neutral-100/80 [overflow-wrap:anywhere]">{e.result}</pre>
        </div>}
      </div>
  );
}

function C({sources:e}){
  return (
    <div className="flex flex-wrap items-center gap-1.5">
        <span className={p("text-[12px]/[16px] font-normal tabular-nums",m)}>Sources</span>
        {e.map(e=><span key={e.id} className={p("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100","h-6")}>{e.title}</span>)}
      </div>
  );
}

function A(){
  let e=useReducedMotion(),[t,r]=useState(N),[o,m]=useState(false),[f,k]=useState(""),[w,A]=useState(0),{text:E,done:R,push:H,end:I,reset:M}=function(){
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
  }(),{ref:D,edges:T,onScroll:L}=function(){
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
  }(),{showJump:W,jumpToLatest:O}=function(e){
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
  }(D),$=useRef(null),q=useRef(null),F=!R&&!o;
  useEffect(()=>{
    if(e){
      H(y),I();
      return
    }
    let t=y.match(/\S+\s*/g)??[],r=0;
    return q.current=window.setInterval(()=>{
      let e=1+Math.floor(3*Math.random());
      H(t.slice(r,r+e).join("")),(r+=e)>=t.length&&(I(),q.current&&window.clearInterval(q.current),q.current=null)
    },130),()=>{
      q.current&&window.clearInterval(q.current)
    };
  }, [e,H,I,w]);
  let P=useCallback(e=>{
    let t=e.trim();
    t&&(r(e=>[...e,{id:`u-${Date.now()}`,role:"user",text:t}]),k(""))
  }, []),K=useCallback(()=>{
    q.current&&(window.clearInterval(q.current),q.current=null),I(),m(true)
  }, [I]),B=useCallback(()=>{
    M(),m(false),A(e=>e+1)
  }, [M]);
  return (
    <div className={p("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0">
          <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-3 px-4 sm:px-6">
            <h1 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Revenue assistant</h1>
            <span className={j}>Atlas</span>
          </div>
        </header>
        <div className="mx-auto flex w-full min-h-0 max-w-3xl flex-1 flex-col">
          <div className="relative flex min-h-0 flex-1 flex-col">
            <div ref={D} onScroll={L} className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain [overflow-anchor:none]">
              <div className="mt-auto flex w-full flex-col gap-6 px-4 py-6 sm:px-6">
                {t.map(e=>{
                  if("user"===e.role)return (
                    <div key={e.id} className="flex">
                                    <div className="ml-auto max-w-[85%]">
                                      <div className="w-fit max-w-full rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-3.5 py-2 text-[14px]/[20px] whitespace-pre-wrap text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{e.text}</div>
                                    </div>
                                  </div>
                  );
                  let t="a2"===e.id&&F,r="a2"===e.id&&!F;
                  return (
                    <div key={e.id} className="group space-y-3">
                                    {e.reasoning&&<z text={e.reasoning} />}
                                    {e.tool&&<S tool={e.tool} />}
                                    <p className={p("flex min-w-0 flex-col gap-3 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","max-w-prose")}>{t?E:e.text}</p>
                                    {e.sources&&e.sources.length>0&&<C sources={e.sources} />}
                                    {r&&<div className="-ms-2 flex min-h-8 min-w-0 items-center gap-0.5 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 [@media(pointer:fine)]:*:data-reveal:opacity-0 [@media(pointer:fine)]:group-hover:*:data-reveal:opacity-100 *:data-reveal:focus-visible:opacity-100 *:data-reveal:transition-opacity">
                                      <button type="button" data-reveal onClick={B} className={p(v,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>
                                        <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
                                        Regenerate
                                      </button>
                                      <button type="button" data-reveal aria-label="Copy reply" className={p(v,g)}>
                                        <HugeiconsIcon icon={Icon_62714} size={16} strokeWidth={1.8} aria-hidden="true" />
                                      </button>
                                    </div>}
                                  </div>
                  );
                })}
              </div>
            </div>
            <div aria-hidden="true" className={p("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",T.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={p("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",T.end?"opacity-100":"opacity-0")} />
            {W&&<div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
              <motion.button type="button" onClick={O} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.15}} className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                <HugeiconsIcon icon={Icon_54345} size={16} strokeWidth={1.8} aria-hidden="true" />
                Jump to latest
              </motion.button>
            </div>}
          </div>
          <div className="w-full shrink-0 px-4 pb-4 sm:px-6">
            <div className={p("relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8","p-2")}>
              <div className="flex flex-wrap gap-1.5 px-1.5 pt-1.5 pb-1">
                <span className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                  <span className="max-w-40 truncate">refunds-week-24.csv</span>
                  <button type="button" aria-label="Remove refunds-week-24.csv" className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                    <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </span>
              </div>
              <textarea ref={$} rows={1} value={f} onChange={e=>{
                let t;
                k(e.target.value),(t=$.current)&&(t.style.height="auto",t.style.height=`${Math.min(t.scrollHeight,160)}px`)
              }} onKeyDown={e=>{
                "Enter"!==e.key||e.shiftKey||(e.preventDefault(),P(f))
              }} placeholder="Ask anything" className="max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
              <div className="flex items-center gap-1 pt-1">
                <button type="button" aria-label="Add attachment" className={p(v,g)}>
                  <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <div className="ml-auto flex items-center gap-1">
                  {F?<button key={"stop"} type="button" onClick={K} aria-label="Stop generating" className={p(_,g)}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button key={"send"} type="button" onClick={()=>P(f)} aria-label="Send" disabled={0===f.trim().length} className={p(_,g)}>
                    <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default A;
