/**
 * React Bits Pro — Application UI (ai-chat-8)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { useReducedMotion } from 'motion/react';

const Icon_22776 = [["circle",{cx:"7.5",cy:"7.5",r:"1.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424",stroke:"currentColor",strokeWidth:"1.5",key:"2"}]];
const Icon_48094 = [["path",{d:"M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_68686 = [["path",{d:"M7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5V6.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.5 19H11.0828C7.57267 19 4.57706 16.4623 4 13M11.5 19H11.9172C15.4273 19 18.4229 16.4623 19 13M11.5 19V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[13px]/[18px] font-normal",
  p = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  m = "size-8 rounded-[var(--rb-r-sm,6px)]",
  f = Array.from({length:28},()=>12),
  _ = "Pull the three designs from the shared folder and tell me which one has the strongest contrast in dark mode.",
  v = [{name:"hero-option-a.png",kind:"image"},{name:"hero-option-b.png",kind:"image"},{name:"brand-guidelines.pdf",kind:"file"}];

function g(){
  let e=useReducedMotion(),[t,r]=useState(true),[g,k]=useState(false),[w,j]=useState(0),[y,N]=useState(()=>Array.from({length:28},()=>30)),[z,S]=useState(14),{text:C,push:A,end:E,reset:R}=function(){
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
  }(),H=useRef(null),I=!g&&!t&&C.trim().length>0;
  useEffect(()=>{
    if(!t||e)return;
    let r=window.setInterval(()=>{
      N(Array.from({length:28},()=>18+82*Math.random()))
    },130);
    return ()=>window.clearInterval(r);
  }, [t,e]),useEffect(()=>{
    if(!t)return;
    let e=window.setInterval(()=>S(e=>e+1),1e3);
    return ()=>window.clearInterval(e);
  }, [t]),useEffect(()=>{
    if(!t)return;
    if(e){
      A(_),E();
      return
    }
    let r=_.match(/\S+\s*/g)??[],a=0;
    return H.current=window.setInterval(()=>{
      let e=1+Math.floor(2*Math.random());
      A(r.slice(a,a+e).join("")),(a+=e)>=r.length&&(E(),H.current&&window.clearInterval(H.current),H.current=null)
    },150),()=>{
      H.current&&window.clearInterval(H.current)
    };
  }, [t,w,e,A,E]);
  let M=useCallback(()=>{
    H.current&&(window.clearInterval(H.current),H.current=null),E(),r(false)
  }, [E]),D=useCallback(()=>{
    R(),k(false),S(0),r(true),j(e=>e+1)
  }, [R]),T=useCallback(()=>{
    t||0===C.trim().length||k(true)
  }, [t,C]),L=t?y:f;
  return (
    <div className={x("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full flex-col overflow-hidden p-6 sm:p-8")}>
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col">
          <header className="flex shrink-0 items-center justify-between gap-3">
            <h1 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Voice message</h1>
            <div className="flex items-center gap-3">
              <span className={x("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",t?"text-neutral-900 dark:text-neutral-100":"text-neutral-900/80 dark:text-neutral-100/80")}>
                {t&&<span className="flex h-lh shrink-0 items-center">
                  <span className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" aria-hidden="true" />
                </span>}
                {g?"Sent":t?"Listening":"Transcript ready"}
              </span>
              <span className={x(h,b,"tabular-nums")}>
                {Math.floor(z/60)}
                :
                {String(z%60).padStart(2,"0")}
              </span>
            </div>
          </header>
          <div className="flex min-h-0 flex-1 flex-col justify-center gap-4">
            <p className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">{C}</p>
            <div className="flex h-14 items-center justify-between" aria-hidden="true">
              {L.map((e,t)=><div key={t} className={x(b,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","h-full w-1 shrink-0 rounded-[2px] bg-current")} style={{scale:`1 ${e/100}`}} />)}
            </div>
          </div>
          <div className={x("relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8","rounded-[var(--rb-r-lg,10px)]","shrink-0 p-3")}>
            <div className="flex flex-wrap gap-1.5">
              {v.map(e=>(
                <span key={e.name} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                            <HugeiconsIcon icon={"image"===e.kind?Icon_22776:Icon_48094} size={14} strokeWidth={1.8} aria-hidden="true" className={x(b,"shrink-0")} />
                            <span className="max-w-40 truncate">{e.name}</span>
                            <button type="button" aria-label={`Remove ${e.name}`} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                              <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                            </button>
                          </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button type="button" aria-label={t?"Stop recording":"Start recording"} onClick={t?M:D} className={x(t?p:"relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",m)}>
                {t?<span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" />:<HugeiconsIcon icon={Icon_68686} size={16} strokeWidth={1.8} aria-hidden="true" />}
              </button>
              <span className={x(h,b,"w-28")}>{t?"Tap to stop":g?"Message sent":"Tap to re-record"}</span>
              <div className="ml-auto">
                <button type="button" aria-label="Send" onClick={T} disabled={!I} className={x(p,m)}>
                  <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default g;
