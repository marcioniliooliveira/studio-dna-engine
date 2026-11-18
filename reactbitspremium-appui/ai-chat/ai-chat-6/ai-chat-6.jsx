/**
 * React Bits Pro — Application UI (ai-chat-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900/80 dark:text-neutral-100/80",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "text-[14px]/[16px] font-[450]",
  f = "text-[13px]/[18px] font-normal",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  g = "size-7 rounded-[var(--rb-r-sm,6px)]",
  k = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  w = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  j = b(f,p);

function y(){
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
}

let N = "For a small team that puts privacy first, the encrypted app is the pick. It runs a dollar or two more per seat, but it is the only one that keeps notes end-to-end encrypted, and the price gap barely registers under ten seats.",
  z = "writer-2",
  S = [{id:"u1",role:"user",text:"Put together a competitive brief on the top three note-taking apps."},{id:"planner-1",role:"assistant",agent:"Planner",handoff:true,text:"I'll split this into two parts. Researcher will gather pricing and the core feature set for each app, then Writer will turn that into a one-page brief."},{id:"researcher-1",role:"assistant",agent:"Researcher",handoff:true,text:"All three offer a free tier. Paid plans are $8, $10, and $12 per seat each month. The clearest differences are offline sync and end-to-end encryption, which only one app includes."},{id:"u2",role:"user",text:"Which one fits a small, privacy-focused team best?"},{id:z,role:"assistant",agent:"Writer",handoff:true,text:N}],
  C = [{agent:"Planner",detail:"Split the task into research + writing",status:"done"},{agent:"Researcher",detail:"Pulled pricing for 3 apps",status:"done"},{agent:"Researcher",detail:"Compared offline-sync support",status:"done"},{agent:"Researcher",detail:"Checked encryption coverage",status:"done"},{agent:"Researcher",detail:"Noted free-tier limits",status:"done"},{agent:"Writer",detail:"Outlined the one-page brief",status:"done"},{agent:"Writer",detail:"Drafted the comparison",status:"done"},{agent:"Researcher",detail:"Summarized review sentiment",status:"done"},{agent:"Planner",detail:"Flagged the price trade-off",status:"done"},{agent:"Planner",detail:"Reviewed for a privacy angle",status:"done"},{agent:"Writer",detail:"Recommending an option",status:"running"}];

function A(){
  let e=useReducedMotion(),[t,r]=useState(S),[A,E]=useState(false),[R,H]=useState(""),[I,M]=useState(0),{text:D,done:T,push:L,end:W,reset:O}=function(){
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
  }(),{ref:$,edges:q,onScroll:F}=y(),{ref:P,edges:K,onScroll:B}=y(),{showJump:Y,jumpToLatest:V}=function(e){
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
  }($),J=useRef(null),G=useRef(null),Q=!T&&!A;
  useEffect(()=>{
    if(e){
      L(N),W();
      return
    }
    let t=N.match(/\S+\s*/g)??[],r=0;
    return G.current=window.setInterval(()=>{
      let e=1+Math.floor(3*Math.random());
      L(t.slice(r,r+e).join("")),(r+=e)>=t.length&&(W(),G.current&&window.clearInterval(G.current),G.current=null)
    },130),()=>{
      G.current&&window.clearInterval(G.current)
    };
  }, [e,L,W,I]);
  let U=useCallback(e=>{
    let t=e.trim();
    t&&(r(e=>[...e,{id:`u-${Date.now()}`,role:"user",text:t}]),H(""))
  }, []),X=useCallback(()=>{
    G.current&&(window.clearInterval(G.current),G.current=null),W(),E(true)
  }, [W]),Z=useCallback(()=>{
    O(),E(false),M(e=>e+1)
  }, [O]);
  return (
    <div className={b("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full min-w-0 flex-col overflow-hidden lg:flex-row")}>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="shrink-0">
            <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-3 px-4 sm:px-6">
              <h1 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Competitive brief</h1>
              <span className={b(j,"flex items-center gap-3")}>
                <span>Planner</span>
                <span>3 agents</span>
              </span>
            </div>
          </header>
          <div className="relative flex min-h-0 flex-1 flex-col">
            <div ref={$} onScroll={F} className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-y-auto overscroll-contain [overflow-anchor:none]">
              <div className="mt-auto flex w-full flex-col gap-6 px-4 py-6 sm:px-6">
                {t.map(e=>{
                  if("user"===e.role)return (
                    <div key={e.id} className="flex">
                                    <div className="ml-auto max-w-[85%]">
                                      <div className="w-fit max-w-full rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-3.5 py-2 text-[14px]/[20px] whitespace-pre-wrap text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{e.text}</div>
                                    </div>
                                  </div>
                  );
                  let t=e.id===z&&Q,r=e.id===z&&!Q;
                  return (
                    <div key={e.id} className="group">
                                    {e.handoff&&<span className={b("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100","h-6")}>{e.agent}</span>}
                                    <p className={b("flex min-w-0 flex-col gap-3 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","mt-2.5 max-w-prose")}>{t?D:e.text}</p>
                                    {r&&<div className={b("-ms-2 flex min-h-8 min-w-0 items-center gap-0.5 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 [@media(pointer:fine)]:*:data-reveal:opacity-0 [@media(pointer:fine)]:group-hover:*:data-reveal:opacity-100 *:data-reveal:focus-visible:opacity-100 *:data-reveal:transition-opacity","mt-3")}>
                                      <button type="button" data-reveal onClick={Z} className={b(v,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>Regenerate</button>
                                    </div>}
                                  </div>
                  );
                })}
              </div>
            </div>
            <div aria-hidden="true" className={b(k,"pointer-events-none absolute inset-x-0 top-0 h-8",q.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={b(w,"pointer-events-none absolute inset-x-0 bottom-0 h-8",q.end?"opacity-100":"opacity-0")} />
            {Y&&<div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
              <motion.button type="button" onClick={V} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.15}} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                <HugeiconsIcon icon={Icon_54345} size={16} strokeWidth={1.8} aria-hidden="true" />
                Jump to latest
              </motion.button>
            </div>}
          </div>
          <div className="shrink-0">
            <div className="mx-auto w-full max-w-3xl px-4 pb-4 sm:px-6">
              <div className={b("relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8","p-2")}>
                <textarea ref={J} rows={1} value={R} onChange={e=>{
                  let t;
                  H(e.target.value),(t=J.current)&&(t.style.height="auto",t.style.height=`${Math.min(t.scrollHeight,160)}px`)
                }} onKeyDown={e=>{
                  "Enter"!==e.key||e.shiftKey||(e.preventDefault(),U(R))
                }} placeholder="Ask anything" className="max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
                <div className="flex items-center gap-1 pt-1">
                  <button type="button" aria-label="Add attachment" className={b(v,g)}>
                    <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  <div className="ml-auto flex items-center gap-1">
                    {Q?<button key={"stop"} type="button" onClick={X} aria-label="Stop generating" className={b(_,g)}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button key={"send"} type="button" onClick={()=>U(R)} aria-label="Send" disabled={0===R.trim().length} className={b(_,g)}>
                      <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
                    </button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="hidden shrink-0 flex-col p-4 lg:flex lg:w-80">
          <h2 className={b(m,"mb-2 px-1")}>Activity</h2>
          <div className={b("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
            <div className={b("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
              <div ref={P} onScroll={B} className="h-full overflow-y-auto p-3">
                <ol className="relative">
                  <div className={b("border-r border-neutral-900/8 dark:border-neutral-100/8","absolute bottom-2 left-[7px] top-2 w-0")} />
                  {C.map((e,t)=>{
                    let r="running"===e.status&&t===C.length-1,n=r&&Q,l=r&&A;
                    return (
                      <li key={`${e.agent}-${t}`} className="relative flex gap-3 pb-4 last:pb-0">
                                        <span className={b("flex size-4 shrink-0 items-center justify-center","bg-white dark:bg-neutral-950","relative z-10")}>
                                          {n?<span className={b("inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none",h)} aria-hidden="true" />:<HugeiconsIcon icon={l?Icon_99199:Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" className={p} />}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className={b(m,"truncate")}>{e.agent}</span>
                                            <span className={b("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",n?"text-neutral-900 dark:text-neutral-100":l?"text-neutral-900/66 dark:text-neutral-100/66":"text-neutral-900/80 dark:text-neutral-100/80","ml-auto min-w-14 shrink-0 justify-end text-right")}>{n?"Running":l?"Stopped":"Done"}</span>
                                          </div>
                                          <p className={b(f,h,"truncate")}>{e.detail}</p>
                                        </div>
                                      </li>
                    );
                  })}
                </ol>
              </div>
              <div aria-hidden="true" className={b(k,"pointer-events-none absolute inset-x-0 top-0 h-8",K.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={b(w,"pointer-events-none absolute inset-x-0 bottom-0 h-8",K.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </aside>
      </div>
  );
}


export default A;
