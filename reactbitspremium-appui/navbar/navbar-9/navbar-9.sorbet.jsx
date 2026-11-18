/**
 * React Bits Pro — Application UI (navbar-9 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_47293 = [["path",{d:"M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_2775 = [["path",{d:"M3.32352 13.0113C3.6739 10.009 4.18586 7.75784 4.66063 6.15851C5.04994 4.84711 5.24459 4.19141 6.04283 3.5957C6.84107 3 7.65697 3 9.28876 3H14.7113C16.3431 3 17.159 3 17.9572 3.5957C18.7554 4.19141 18.9501 4.84711 19.3394 6.15851C19.8142 7.75784 20.3261 10.009 20.6765 13.0113C21.0895 16.5497 21.2959 18.3189 20.1027 19.6594C18.9095 21 16.9758 21 13.1084 21H10.8916C7.02422 21 5.09052 21 3.89731 19.6594C2.70411 18.3189 2.91058 16.5497 3.32352 13.0113Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let p = (...e)=>e.filter(Boolean).join(" ");

let h = [.2,0,0,1];

let k = {type:"spring",bounce:0,duration:.35};

let m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let v = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let g = p("text-[13px]/[16px] font-bold tabular-nums","text-neutral-900/62 dark:text-neutral-100/62");

let f = [{label:"Products",icon:true},{label:"Mobile",icon:true},{label:"Checkout Flow",icon:false}];

let aQ = (...e)=>e.filter(Boolean).join(" ");

let aX = [.2,0,0,1];

let aZ = "bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8";

let a0 = "text-neutral-900/62 dark:text-neutral-100/62";

let a1 = "text-[15px]/[20px] font-bold";

let a2 = "text-[14px]/[20px] font-medium";

let a5 = "shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]";

let a6 = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let a8 = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900/78 dark:text-neutral-100/78 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] hover:not-disabled:text-neutral-900 active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:hover:not-disabled:bg-neutral-100/8 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:bg-neutral-100/12 dark:aria-expanded:bg-neutral-100/8 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40";

let a4 = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let a9 = "size-7 rounded-[calc(var(--rb-r-full,999px))]";

let a3 = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let a7 = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let re = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let ra = aQ("bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7",a5);

let rr = aQ(a7,a5);

let rt = aQ("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.09),0_1px_2px_rgb(84_62_32/0.08)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.55)] dark:bg-neutral-800","pointer-events-none absolute -top-0.5 -right-0.5 h-[16px] min-w-[16px] px-[4px]");

let rn = [{id:"brew",label:"Brewing",columns:[{title:"Machines",items:["Espresso","Filter","Grinders","Kettles"]},{title:"Manual",items:["Pour over","Press","Moka","Siphon"]},{title:"Accessories",items:["Scales","Tampers","Filters","Jugs"]}]},{id:"beans",label:"Beans",columns:[{title:"Roast",items:["Light","Medium","Dark","Decaf"]},{title:"Origin",items:["Ethiopia","Colombia","Kenya","Brazil"]},{title:"Format",items:["Whole bean","Ground","Capsules","Sample"]}]}];

let rl = ["Subscriptions","Gifting","Journal"];

let ri = [{id:"c1",name:"Meridian espresso grinder",price:248,qty:1},{id:"c2",name:"Harbor blend, 1kg",price:32,qty:2}];


export default function navbar_9__Sorbet__Component(){
  let e=useReducedMotion(),[a,r]=useState(null),[c,d]=useState(false),[b,x]=useState("brew"),[p,h]=useState(ri),k=useRef(null);
  useEffect(()=>{
    if(!a&&!c)return;
    let e=k.current?.ownerDocument;
    if(!e)return;
    let t=e=>{
      let a=e.target;
      a?.closest?.("[data-menu-root]")||r(null)
    },n=e=>{
      "Escape"===e.key&&(r(null),d(false))
    };
    return e.addEventListener("pointerdown",t),e.addEventListener("keydown",n),()=>{
      e.removeEventListener("pointerdown",t),e.removeEventListener("keydown",n)
    };
  }, [a,c]);
  let m=e=>{
    r(a=>a===e?null:e)
  },v=p.reduce((e,a)=>e+a.qty,0),g=p.reduce((e,a)=>e+a.qty*a.price,0),f=(e,a)=>h(r=>r.map(r=>r.id===e?{...r,qty:Math.max(0,r.qty+a)}:r).filter(e=>e.qty>0));
  return (
    <div ref={k} className={aQ("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[560px] w-full flex-col overflow-hidden")}>
        <header className={aQ("border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","relative z-20 shrink-0")}>
          <p className={aQ("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]",a2,"text-neutral-900/78 dark:text-neutral-100/78","flex h-8 items-center justify-center px-4 text-center")}>Free shipping on orders over $60</p>
          <div className="flex h-14 items-center gap-2 px-3 sm:px-4">
            <button type="button" aria-label="Open menu" aria-expanded={c} onClick={()=>d(true)} className={aQ(a6,a3,"md:hidden")}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
            <a href="#" className={aQ("text-[17px]/[22px] font-extrabold","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","shrink-0")}>Harbor Coffee</a>
            <nav aria-label="Shop" className="ml-4 hidden items-center gap-0.5 md:flex" data-menu-root>
              {rn.map(e=>(
                <button key={e.id} type="button" aria-haspopup="true" aria-expanded={a===e.id} onClick={()=>m(e.id)} className={aQ(a8,a4)}>
                            {e.label}
                            <HugeiconsIcon icon={Icon_20148} size={16} strokeWidth={2} aria-hidden="true" className={aQ(a===e.id&&"rotate-180")} />
                          </button>
              ))}
              {rl.map(e=><a key={e} href="#" className={aQ(a8,a4)}>{e}</a>)}
            </nav>
            <div className="ml-auto flex shrink-0 items-center gap-0.5">
              <button type="button" aria-label="Search" className={aQ(a6,a3)}>
                <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Account" className={aQ(a6,a3,"max-sm:hidden")}>
                <HugeiconsIcon icon={Icon_34951} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Wishlist, 3 saved" className={aQ(a6,a3,"max-sm:hidden")}>
                <HugeiconsIcon icon={Icon_47293} size={18} strokeWidth={2} aria-hidden="true" />
                <span aria-hidden="true" className={rt}>3</span>
              </button>
              <div className="relative" data-menu-root>
                <button type="button" aria-haspopup="true" aria-expanded={"cart"===a} aria-label={`Cart, ${v} items`} onClick={()=>m("cart")} className={aQ(a6,a3)}>
                  <HugeiconsIcon icon={Icon_2775} size={18} strokeWidth={2} aria-hidden="true" />
                  {v>0&&<span aria-hidden="true" className={rt}>{v}</span>}
                </button>
                <AnimatePresence>
                  {"cart"===a&&<motion.div {...{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.12,ease:aX}},transition:{duration:.16*!e,ease:aX}}} className="absolute top-full right-0 z-30 mt-1.5 w-[300px] origin-top-right">
                    <div className={rr}>
                      <p className={aQ("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100")}>Your bag</p>
                      {0===p.length?<p className={aQ("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","px-3 py-4 text-center")}>Your bag is empty.</p>:<ul className={aQ("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","max-h-[200px] overflow-y-auto")}>
                        {p.map(e=>(
                          <li key={e.id} className={aQ("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","px-4")}>
                                                <span aria-hidden="true" className={aQ("flex size-9 shrink-0 items-center justify-center text-neutral-900/78 dark:text-neutral-100/78",aZ,"rounded-[var(--rb-r-sm,6px)]","size-[36px]")} />
                                                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                  <span className={aQ(a2,"block truncate")}>{e.name}</span>
                                                  <span className="shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">
                                                    $
                                                    {e.price}
                                                  </span>
                                                </span>
                                                <span className="flex shrink-0 items-center gap-1">
                                                  <button type="button" aria-label={`Remove one ${e.name}`} onClick={()=>f(e.id,-1)} className={aQ(a6,a9)}>
                                                    <HugeiconsIcon icon={Icon_99199} size={14} strokeWidth={2} aria-hidden="true" />
                                                  </button>
                                                  <span className={aQ("text-[13px]/[16px] font-bold tabular-nums","w-4 text-center")}>{e.qty}</span>
                                                  <button type="button" aria-label={`Add one ${e.name}`} onClick={()=>f(e.id,1)} className={aQ(a6,a9)}>
                                                    <HugeiconsIcon icon={Icon_89886} size={14} strokeWidth={2} aria-hidden="true" />
                                                  </button>
                                                </span>
                                              </li>
                        ))}
                      </ul>}
                      <div className={aQ("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","p-3")}>
                        <div className={aQ(a2,"flex items-center justify-between")}>
                          <span className={a0}>Subtotal</span>
                          <span className={aQ(a1,"tabular-nums")}>
                            $
                            {g}
                          </span>
                        </div>
                        <button type="button" className={aQ("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",a4,"mt-2.5 w-full")}>Checkout</button>
                      </div>
                    </div>
                  </motion.div>}
                </AnimatePresence>
              </div>
            </div>
          </div>
          {rn.map(e=>a===e.id&&<div key={e.id} data-menu-root className={aQ(ra,"transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","absolute inset-x-0 top-full z-30 hidden origin-top md:block")}>
            <div className="mx-auto grid max-w-[900px] grid-cols-3 gap-6 px-4 py-6">
              {e.columns.map(e=>(
                <div key={e.title}>
                            <p className="px-3 pt-2.5 pb-1 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e.title}</p>
                            <ul className="mt-2 space-y-0.5">{e.items.map(e=><li key={e}><a href="#" className={re}>{e}</a></li>)}</ul>
                          </div>
              ))}
            </div>
          </div>)}
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {["Meridian grinder","Harbor blend","Pour-over set"].map(e=>(
              <div key={e} className={a7}>
                        <div className={aQ(aZ,"rounded-[var(--rb-r-4xl,18px)]","m-2 mb-0 h-[110px]")} />
                        <div className="p-3">
                          <p className={aQ(a2,"truncate")}>{e}</p>
                          <p className={aQ("text-[13px]/[16px] font-semibold tabular-nums",a0,"mt-0.5")}>From $32</p>
                        </div>
                      </div>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {c&&<>
            <motion.div aria-hidden="true" onClick={()=>d(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:aX}}} transition={{duration:.18*!e,ease:aX}} className={aQ("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70","absolute inset-0 z-30 md:hidden")} />
            <motion.aside aria-label="Shop menu" initial={{opacity:0,x:e?0:-8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:e?0:-8,transition:{duration:.12,ease:aX}}} transition={{duration:.18*!e,ease:aX}} className={aQ("border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","absolute inset-y-0 left-0 z-40 flex w-[280px] max-w-[85%] flex-col md:hidden")}>
              <div className={aQ("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex h-14 shrink-0 items-center justify-between px-3")}>
                <span className={a1}>Menu</span>
                <button type="button" aria-label="Close menu" onClick={()=>{
                  d(false)
                }} className={aQ(a6,a3)}>
                  <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-2">
                {rn.map(e=>(
                  <div key={e.id}>
                                <button type="button" aria-expanded={b===e.id} onClick={()=>x(a=>a===e.id?null:e.id)} className={aQ(re,"justify-between")}>
                                  {e.label}
                                  <HugeiconsIcon icon={Icon_20148} size={16} strokeWidth={2} aria-hidden="true" className={aQ(b===e.id&&"rotate-180")} />
                                </button>
                                {b===e.id&&<ul className="mb-1 space-y-0.5 overflow-hidden pl-2.5">
                                  {e.columns.flatMap(e=>e.items).map(e=><li key={e}><a href="#" className={re}>{e}</a></li>)}
                                </ul>}
                              </div>
                ))}
                {rl.map(e=><a key={e} href="#" className={re}>{e}</a>)}
              </div>
            </motion.aside>
          </>}
        </AnimatePresence>
      </div>
  );
}
