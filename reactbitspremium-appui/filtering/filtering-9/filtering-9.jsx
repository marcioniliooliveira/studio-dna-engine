/**
 * React Bits Pro — Application UI (filtering-9)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58661 = [["path",{d:"M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_12556 = [["path",{d:"M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  p = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[20px]/[24px] font-[450] tracking-[-0.015em]",
  v = "text-[12px]/[16px] font-normal tabular-nums",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  _ = "size-7 rounded-[var(--rb-r-sm,6px)]",
  g = "inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5",
  f = "relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40",
  k = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  w = "border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  j = "relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40",
  y = ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"],
  N = e=>{
  if(!y.includes(e.key))return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let t=r.length-1,i=a===t?0:a+1;
  "Home"===e.key?i=0:"End"===e.key?i=t:("ArrowLeft"===e.key||"ArrowUp"===e.key)&&(i=0===a?t:a-1),r[i].focus(),r[i].click()
};

function z({id:e,value:r,onChange:a,options:o,disabled:c,placeholder:d="Select…",className:u,triggerClassName:p,leading:h,ariaLabel:m}){
  let _=useId(),[g,f]=useState(false),[k,w]=useState(0),[j,y]=useState(false),[N,z]=useState(),C=useRef(null),S=useRef(null),A=useRef({buffer:"",at:0}),H=o.findIndex(e=>e.value===r),L=H>=0?o[H]:undefined,D=e=>{
    if(c)return;
    let r=C.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,i=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),i=Math.min(i,r.bottom);
        break
      }
      let n=i-e.bottom,l=e.top-t,s=Math.min(32*o.length+8,264),c=n<s+8&&l>n,d=(c?l:n)-8;
      y(c),z(d<s?Math.max(d,40):undefined)
    }
    w(e??(H>=0?H:0)),f(true)
  };
  useEffect(()=>{
    if(!g)return;
    let e=C.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||f(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [g]),useEffect(()=>{
    if(!g)return;
    let e=S.current,r=e?.querySelector(`[data-index="${k}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [g,k]);
  let M=e=>{
    let r=o[e];
    r&&(a(r.value),f(false),C.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={C} className={b("relative",u)}>
        <button id={e} type="button" role="combobox" aria-expanded={g} aria-controls={_} aria-haspopup="listbox" disabled={c} onClick={()=>g?f(false):D()} onKeyDown={e=>{
          if(!c){
            if(!g){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),D());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),f(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),w(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),w(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),w(0);else if("End"===e.key)e.preventDefault(),w(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),M(k);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=A.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=o.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&w(t)
            }
          }
        }} aria-label={m} className={b("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",p)}>
          <span className="flex min-w-0 items-center gap-2">
            {h}
            <span className={b("truncate",!L&&"text-neutral-900/66 dark:text-neutral-100/66")}>{L?L.label:d}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {g&&<ul ref={S} id={_} role="listbox" tabIndex={-1} style={{maxHeight:N}} className={b("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",j?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,a)=>{
            let i=e.value===r;
            return (
              <li key={e.value} role="option" aria-selected={i} data-index={a} data-highlighted={a===k||undefined} onMouseEnter={()=>w(a)} onClick={()=>M(a)} className={b("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={b(v,x,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {i&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let C = [{value:"all",label:"All"},{value:"pizza",label:"Pizza"},{value:"sushi",label:"Sushi"},{value:"burgers",label:"Burgers"},{value:"thai",label:"Thai"},{value:"mexican",label:"Mexican"},{value:"indian",label:"Indian"},{value:"ramen",label:"Ramen"},{value:"salads",label:"Salads"},{value:"korean",label:"Korean"},{value:"mediterranean",label:"Mediterranean"},{value:"bbq",label:"BBQ"},{value:"vietnamese",label:"Vietnamese"},{value:"dessert",label:"Dessert"}],
  S = [{value:0,label:"Any"},{value:3.5,label:"3.5+"},{value:4,label:"4.0+"},{value:4.5,label:"4.5+"}],
  A = [{value:"vegetarian",label:"Vegetarian"},{value:"vegan",label:"Vegan"},{value:"gluten-free",label:"Gluten-free"},{value:"halal",label:"Halal"}],
  H = [{value:"any",label:"Any delivery time"},{value:"30",label:"Under 30 min"},{value:"45",label:"Under 45 min"},{value:"60",label:"Under 60 min"}],
  L = [{id:"r1",name:"Crust & Coal",cuisine:"pizza",rating:4.7,reviews:1820,price:2,etaLow:20,etaHigh:30,fee:0,diets:["vegetarian"]},{id:"r2",name:"Blue Fin Bar",cuisine:"sushi",rating:4.8,reviews:940,price:3,etaLow:30,etaHigh:45,fee:3.49,diets:["gluten-free"]},{id:"r3",name:"Ember Patty Co.",cuisine:"burgers",rating:4.4,reviews:2640,price:2,etaLow:15,etaHigh:25,fee:1.99,diets:["halal"]},{id:"r4",name:"Lemongrass Lane",cuisine:"thai",rating:4.6,reviews:1310,price:2,etaLow:25,etaHigh:40,fee:0,diets:["vegetarian","vegan","gluten-free"]},{id:"r5",name:"Casa Verde",cuisine:"mexican",rating:4.3,reviews:2020,price:1,etaLow:20,etaHigh:30,fee:.99,diets:["vegetarian"]},{id:"r6",name:"Saffron Room",cuisine:"indian",rating:4.7,reviews:1580,price:2,etaLow:30,etaHigh:45,fee:2.49,diets:["vegetarian","vegan","halal"]},{id:"r7",name:"Bowl & Broth",cuisine:"ramen",rating:4.5,reviews:870,price:2,etaLow:25,etaHigh:40,fee:1.49,diets:[]},{id:"r8",name:"Field Greens",cuisine:"salads",rating:4.2,reviews:640,price:2,etaLow:15,etaHigh:25,fee:0,diets:["vegetarian","vegan","gluten-free"]},{id:"r9",name:"Seoul Fire",cuisine:"korean",rating:4.6,reviews:1190,price:3,etaLow:35,etaHigh:50,fee:2.99,diets:["halal"]},{id:"r10",name:"Olive & Za'atar",cuisine:"mediterranean",rating:4.8,reviews:1450,price:2,etaLow:25,etaHigh:40,fee:0,diets:["vegetarian","vegan","halal"]},{id:"r11",name:"Low & Slow",cuisine:"bbq",rating:4.5,reviews:2210,price:3,etaLow:40,etaHigh:55,fee:3.99,diets:["gluten-free"]},{id:"r12",name:"Phở District",cuisine:"vietnamese",rating:4.7,reviews:980,price:1,etaLow:20,etaHigh:35,fee:.99,diets:["gluten-free"]},{id:"r13",name:"Sugar & Ash",cuisine:"dessert",rating:4.9,reviews:760,price:2,etaLow:15,etaHigh:25,fee:1.99,diets:["vegetarian"]},{id:"r14",name:"Stonefire Pies",cuisine:"pizza",rating:4.3,reviews:1120,price:3,etaLow:30,etaHigh:45,fee:2.49,diets:["vegetarian","vegan"]},{id:"r15",name:"Nori & Rice",cuisine:"sushi",rating:4.4,reviews:520,price:2,etaLow:25,etaHigh:40,fee:1.49,diets:["gluten-free"]},{id:"r16",name:"Smash District",cuisine:"burgers",rating:4.6,reviews:3140,price:2,etaLow:20,etaHigh:30,fee:0,diets:["halal"]},{id:"r17",name:"Basil & Chili",cuisine:"thai",rating:4.5,reviews:690,price:2,etaLow:35,etaHigh:50,fee:2.99,diets:["vegetarian","vegan"]},{id:"r18",name:"Agave Street",cuisine:"mexican",rating:4.7,reviews:1760,price:2,etaLow:25,etaHigh:35,fee:0,diets:["vegetarian","gluten-free"]}],
  D = {cuisine:"all",rating:0,prices:[],eta:"any",diets:[]},
  M = (e,r,a)=>!("cuisine"!==a&&"all"!==r.cuisine&&e.cuisine!==r.cuisine||"rating"!==a&&r.rating>0&&e.rating<r.rating||"prices"!==a&&r.prices.length&&!r.prices.includes(e.price)||"eta"!==a&&"any"!==r.eta&&e.etaHigh>Number(r.eta))&&("diets"===a||!r.diets.length||!!r.diets.every(r=>e.diets.includes(r)));

function R(){
  let[e,r]=useState(D),{ref:a,edges:l,onScroll:y}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollLeft:t,scrollWidth:i,clientWidth:n}=r;
      a({start:t>1,end:Math.ceil(t+n)<i-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let i=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),R=useMemo(()=>L.filter(r=>M(r,e)), [e]),E=e=>a.current?.scrollBy({left:260*e,behavior:"smooth"}),P=+("all"!==e.cuisine)+ +(e.rating>0)+e.prices.length+ +("any"!==e.eta)+e.diets.length;
  return (
    <div className={b("bg-white dark:bg-neutral-950",p,"flex h-full min-h-[880px] w-full flex-col overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col">
          <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className={b(h,p)}>Order in tonight</h2>
            <p className={b("text-[13px]/[18px] font-normal",x,"flex flex-wrap gap-x-3")}>
              <span role="status">
                <span className={b(p,"tabular-nums")}>{R.length}</span>
                {" "}
                places deliver to Mission St
              </span>
              <span className="tabular-nums">94110</span>
            </p>
          </header>
          <div className="mt-5 flex items-center gap-2">
            <button type="button" aria-label="Scroll cuisines left" disabled={!l.start} onClick={()=>E(-1)} className={b(m,_,"max-sm:hidden")}>
              <HugeiconsIcon icon={Icon_58661} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <div className="relative min-w-0 flex-1">
              <div ref={a} onScroll={y} className="-m-1 flex gap-2 overflow-x-auto p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {C.map(a=>{
                  let i,n=e.cuisine===a.value,l="all"===(i=a.value)?L.filter(r=>M(r,e,"cuisine")).length:L.filter(r=>M(r,e,"cuisine")&&r.cuisine===i).length;
                  return (
                    <button key={a.value} type="button" aria-pressed={n} onClick={()=>r(e=>({...e,cuisine:a.value}))} className={b(j,0===l&&!n&&"opacity-40")}>
                                    {a.label}
                                    <span className="ms-0.5 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{l}</span>
                                  </button>
                  );
                })}
              </div>
              <div aria-hidden="true" className={b("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 w-8",l.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={b("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 w-8",l.end?"opacity-100":"opacity-0")} />
            </div>
            <button type="button" aria-label="Scroll cuisines right" disabled={!l.end} onClick={()=>E(1)} className={b(m,_,"max-sm:hidden")}>
              <HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3">
            <div role="radiogroup" aria-label="Minimum rating" onKeyDown={N} className={b(g,"h-8")}>
              {S.map(a=>{
                let i=e.rating===a.value;
                return <button key={a.value} type="button" role="radio" aria-checked={i} tabIndex={i?0:-1} onClick={()=>r(e=>({...e,rating:a.value}))} className={b(f,"tabular-nums")}>{a.label}</button>;
              })}
            </div>
            <div role="group" aria-label="Price level" className={b(g,"h-8")}>
              {[1,2,3,4].map(a=>{
                let i=e.prices.includes(a),n=L.filter(r=>M(r,e,"prices")&&r.price===a).length;
                return <button key={a} type="button" role="checkbox" aria-checked={i} aria-label={`Price ${"$".repeat(a)}, ${n} places`} onClick={()=>r(e=>({...e,prices:e.prices.includes(a)?e.prices.filter(e=>e!==a):[...e.prices,a]}))} className={b(f,"min-w-8 tabular-nums",0===n&&!i&&"opacity-40")}>{"$".repeat(a)}</button>;
              })}
            </div>
            <z value={e.eta} onChange={e=>r(r=>({...r,eta:e}))} options={H} ariaLabel="Delivery time" className="w-[180px]" />
            <div className="flex flex-wrap items-center gap-2">
              {A.map(a=>{
                let i,l=e.diets.includes(a.value),o=(i=a.value,L.filter(r=>M(r,e,"diets")&&[...e.diets,i].every(e=>r.diets.includes(e))).length);
                return (
                  <button key={a.value} type="button" aria-pressed={l} onClick={()=>{
                                let e;
                                return e=a.value,r(r=>({...r,diets:r.diets.includes(e)?r.diets.filter(r=>r!==e):[...r.diets,e]}));
                              }} className={b(j,0===o&&!l&&"opacity-40")}>
                                {l&&<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={1.8} aria-hidden="true" />}
                                {a.label}
                              </button>
                );
              })}
              {P>0&&<button type="button" onClick={()=>r(D)} className={b("inline-flex h-7 cursor-pointer items-center rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80 decoration-1 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100","gap-1.5")}>
                <HugeiconsIcon icon={Icon_89289} size={14} strokeWidth={1.8} aria-hidden="true" />
                Clear
              </button>}
            </div>
          </div>
          {0===R.length?<div className="mt-5 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
            <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No places match right now</p>
            <p className={b("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-[300px]")}>Try a longer delivery window or clear a filter to see more kitchens nearby.</p>
            <button type="button" onClick={()=>r(D)} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-5")}>Clear all filters</button>
          </div>:<ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {R.map(e=>{
              let r,a=C.find(r=>r.value===e.cuisine);
              return (
                <li key={e.id}>
                            <article className={b("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","cursor-pointer p-1")}>
                              <div className={b("bg-neutral-900/8 dark:bg-neutral-100/8","rounded-[var(--rb-r-sm,6px)]","relative flex aspect-[3/2] items-center justify-center")}>
                                <span className={b(h,x,"tabular-nums")}>
                                  {e.name.replace(/[^A-Za-z\s]/g,"").split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("")}
                                </span>
                                <span className={b(k,w,"absolute top-2 left-2")}>
                                  <HugeiconsIcon icon={Icon_12556} size={12} strokeWidth={1.8} aria-hidden="true" className="[&_path]:fill-current" />
                                  {e.rating.toFixed(1)}
                                </span>
                                <span className={b(k,w,"absolute right-2 bottom-2")}>{0===e.fee?"Free delivery":`$${e.fee.toFixed(2)}`}</span>
                              </div>
                              <div className="px-2 pt-2.5 pb-1.5">
                                <p className={b("text-[14px]/[16px] font-[450]",p,"truncate")}>{e.name}</p>
                                <div className={b(v,x,"mt-0.5 flex items-center gap-3")}>
                                  <span className="truncate">{a?.label}</span>
                                  <span className="tabular-nums">{r=e.price,"$".repeat(r)}</span>
                                  <span className="shrink-0 tabular-nums">
                                    {e.etaLow}
                                    –
                                    {e.etaHigh}
                                    {" min"}
                                  </span>
                                </div>
                              </div>
                            </article>
                          </li>
              );
            })}
          </ul>}
        </div>
      </div>
  );
}


export default R;
