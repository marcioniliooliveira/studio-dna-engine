/**
 * React Bits Pro — Application UI (ai-chat-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let h = (...e)=>e.filter(Boolean).join(" "),
  p = "text-neutral-900/80 dark:text-neutral-100/80",
  m = "text-neutral-900/66 dark:text-neutral-100/66",
  f = "text-[13px]/[18px] font-normal",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  g = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  k = "size-7 rounded-[var(--rb-r-sm,6px)]",
  w = "shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90",
  j = "flex min-w-0 flex-col gap-3 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]",
  y = "flex size-4 shrink-0 items-center justify-center",
  N = "shrink-0 text-neutral-900/80 dark:text-neutral-100/80",
  z = "flex min-w-0 flex-col gap-3 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 px-3 py-2 dark:bg-neutral-100/5",
  S = "min-w-0 overflow-x-auto font-mono text-[12px]/[16px] whitespace-pre-wrap text-neutral-900/80 dark:text-neutral-100/80 [overflow-wrap:anywhere]",
  C = h(f,m),
  A = "call_keys",
  E = [{id:"u1",role:"user",text:"Clean up the staging environment before tomorrow’s demo."},{id:"a1",role:"assistant",text:"I scanned the staging project and found two preview databases that have not been queried in 30 days and three API keys with no recent requests. I’ll remove them in a few steps so you can approve each one.",tools:[{kind:"output",id:"call_scan",name:"Scanned staging resources",output:"resource            last used     status\ndb/preview-fern       31 days     idle\ndb/preview-oak        44 days     idle\nkey/svc-legacy-1: unused\nkey/svc-legacy-2: unused\nkey/svc-import: unused",duration:"0.9s"},{kind:"approval",id:"call_db",decision:"approved",result:"Deleted 2 preview databases"},{kind:"approval",id:"call_sess",decision:"approved",result:"Cleared 5 idle sessions"},{kind:"approval",id:A,decision:"pending",action:"Delete 3 unused API keys from the staging project",consequence:"Any service still using them will start returning 401 errors. This cannot be undone.",input:'delete_api_keys({\n  project: "staging",\n  keys: ["svc-legacy-1", "svc-legacy-2", "svc-import"],\n})'}]}];

function R({tool:e}){
  let[t,r]=useState(false);
  return (
    <div>
        <button type="button" onClick={()=>r(e=>!e)} aria-expanded={t} className={h("group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","w-[calc(100%+16px)]")}>
          <span className={y}>
            <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className={w} />
          </span>
          <span className={N}>{e.name}</span>
          <span className={h(m,"min-w-14")}>Done</span>
          <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{e.duration}</span>
        </button>
        {t&&<div className={h(z,"mt-2 max-h-40 overflow-y-auto")}><pre className={S}>{e.output}</pre></div>}
      </div>
  );
}

function H({denied:e,result:t}){
  return (
    <div className={h(f,p,"flex h-8 items-center gap-2")}>
        <span className={y}>
          <HugeiconsIcon icon={e?Icon_99199:Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" className={m} />
        </span>
        <span className={N}>{e?"Skipped":"Approved"}</span>
        <span className="min-w-[6ch] truncate text-neutral-900 dark:text-neutral-100">{t}</span>
      </div>
  );
}

function I({tool:e,onDecision:t}){
  let[r,l]=useState(false);
  return (
    <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
        <div className="flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2">
          <p className="min-w-0 py-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Needs approval</p>
        </div>
        <div className={h("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","px-3 pt-3",e.input&&!r?"pb-1":"pb-3")}>
          <p className={h("text-[14px]/[20px] font-normal",p)}>
            {e.action}
            {". "}
            {e.consequence}
          </p>
          {e.input&&<button type="button" onClick={()=>l(e=>!e)} aria-expanded={r} className={h("group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","mt-2")}>
            <span className={y}>
              <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className={w} />
            </span>
            {r?"Hide request":"Show request"}
          </button>}
          {e.input&&r&&<div className={h(z,"mt-1")}><pre className={S}>{e.input}</pre></div>}
        </div>
        <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
          <button type="button" onClick={()=>t(false)} className={h(v,g)}>Keep them</button>
          <button type="button" onClick={()=>t(true)} className={h(_,g)}>Delete keys</button>
        </div>
      </div>
  );
}

function M(){
  let e=useReducedMotion(),[t,r]=useState(E),[o,c]=useState(""),{text:d,done:p,push:m,end:f,reset:g}=function(){
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
  }(),{ref:w,edges:y,onScroll:N}=function(){
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
  }(),{showJump:z,jumpToLatest:S}=function(e){
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
  }(w),M=useRef(null),D=useRef(null),T=t.flatMap(e=>"assistant"===e.role?e.tools??[]:[]).find(e=>"approval"===e.kind&&e.id===A)?.decision??"pending",L="approved"===T?"The staging project is cleaned up. Two databases and three keys are removed, so the demo will run against a fresh environment.":"denied"===T?"I left the API keys in place. The two preview databases are still removed, so staging is lighter but nothing is broken.":"",W=""!==L&&!p;
  useEffect(()=>{
    if(!L)return;
    if(g(),e){
      m(L),f();
      return
    }
    let t=L.match(/\S+\s*/g)??[],r=0;
    return D.current=window.setInterval(()=>{
      let e=1+Math.floor(3*Math.random());
      m(t.slice(r,r+e).join("")),(r+=e)>=t.length&&(f(),D.current&&window.clearInterval(D.current),D.current=null)
    },130),()=>{
      D.current&&window.clearInterval(D.current)
    };
  }, [L,e,g,m,f]);
  let O=useCallback((e,t)=>{
    r(r=>r.map(r=>"assistant"===r.role&&r.tools?{...r,tools:r.tools.map(r=>"approval"!==r.kind||r.id!==e?r:{...r,decision:t?"approved":"denied"})}:r))
  }, []),$=useCallback(e=>{
    let t=e.trim();
    t&&(r(e=>[...e,{id:`u-${Date.now()}`,role:"user",text:t}]),c(""))
  }, []),q=useCallback(()=>{
    D.current&&(window.clearInterval(D.current),D.current=null),f()
  }, [f]);
  return (
    <div className={h("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0">
          <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-3 px-4 sm:px-6">
            <h1 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Staging cleanup</h1>
            <span className={h(C,"flex items-center gap-3")}>
              <span>Atlas</span>
              <span>Needs review</span>
            </span>
          </div>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div ref={w} onScroll={N} className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-y-auto overscroll-contain [overflow-anchor:none]">
            <div className="mt-auto flex w-full flex-col gap-6 px-4 py-6 sm:px-6">
              {t.map(e=>"user"===e.role?<div key={e.id} className="flex">
                <div className="ml-auto max-w-[85%]">
                  <div className="w-fit max-w-full rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-3.5 py-2 text-[14px]/[20px] whitespace-pre-wrap text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{e.text}</div>
                </div>
              </div>:<div key={e.id} className="flex flex-col gap-3">
                {e.text&&<p className={h(j,"max-w-prose")}>{e.text}</p>}
                {(e.tools??[]).map((e,t)=>"output"===e.kind?<R key={t} tool={e} />:"approved"===e.decision?<H key={t} result={e.result??""} />:"denied"===e.decision?<H key={t} denied result="Skipped, not approved" />:<I key={t} tool={e} onDecision={t=>O(e.id,t)} />)}
              </div>)}
              {L&&<div className="flex flex-col gap-3"><p className={h(j,"max-w-prose")}>{W?d:L}</p></div>}
            </div>
          </div>
          <div aria-hidden="true" className={h("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",y.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",y.end?"opacity-100":"opacity-0")} />
          {z&&<div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
            <motion.button type="button" onClick={S} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.15}} className={h(v,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
              <HugeiconsIcon icon={Icon_54345} size={16} strokeWidth={1.8} aria-hidden="true" />
              Jump to latest
            </motion.button>
          </div>}
        </div>
        <div className="shrink-0">
          <div className="mx-auto w-full max-w-3xl px-4 pb-4 sm:px-6">
            <div className={h("relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8","p-2")}>
              <textarea ref={M} rows={1} value={o} onChange={e=>{
                let t;
                c(e.target.value),(t=M.current)&&(t.style.height="auto",t.style.height=`${Math.min(t.scrollHeight,160)}px`)
              }} onKeyDown={e=>{
                "Enter"!==e.key||e.shiftKey||(e.preventDefault(),$(o))
              }} placeholder="Ask anything" className="max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
              <div className="flex items-center gap-1 pt-1">
                <button type="button" aria-label="Add attachment" className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",k)}>
                  <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <div className="ml-auto flex items-center gap-1">
                  {W?<button key={"stop"} type="button" onClick={q} aria-label="Stop generating" className={h(_,k)}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button key={"send"} type="button" onClick={()=>$(o)} aria-label="Send" disabled={0===o.trim().length} className={h(_,k)}>
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


export default M;
