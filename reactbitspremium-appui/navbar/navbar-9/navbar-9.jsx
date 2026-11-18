/**
 * React Bits Pro — Application UI (navbar-9)
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

let v = (...e)=>e.filter(Boolean).join(" "),
  k = [.2,0,0,1],
  f = "bg-neutral-900/8 dark:bg-neutral-100/8",
  g = "text-neutral-900/66 dark:text-neutral-100/66",
  w = "text-[14px]/[16px] font-[450]",
  j = "text-[13px]/[18px] font-normal",
  y = "shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",
  N = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  z = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40",
  A = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  S = "size-6 rounded-[var(--rb-r-sm,6px)]",
  C = "size-8 rounded-[var(--rb-r-sm,6px)]",
  W = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  E = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  P = v("bg-white dark:bg-neutral-900","border-b border-neutral-900/10 dark:border-neutral-100/14",y),
  L = v(W,y),
  R = v("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","pointer-events-none absolute -top-0.5 -right-0.5 h-[16px] min-w-[16px] px-[4px]"),
  D = [{id:"brew",label:"Brewing",columns:[{title:"Machines",items:["Espresso","Filter","Grinders","Kettles"]},{title:"Manual",items:["Pour over","Press","Moka","Siphon"]},{title:"Accessories",items:["Scales","Tampers","Filters","Jugs"]}]},{id:"beans",label:"Beans",columns:[{title:"Roast",items:["Light","Medium","Dark","Decaf"]},{title:"Origin",items:["Ethiopia","Colombia","Kenya","Brazil"]},{title:"Format",items:["Whole bean","Ground","Capsules","Sample"]}]}],
  M = ["Subscriptions","Gifting","Journal"],
  B = [{id:"c1",name:"Meridian espresso grinder",price:248,qty:1},{id:"c2",name:"Harbor blend, 1kg",price:32,qty:2}];

function O(){
  let e=useReducedMotion(),[t,r]=useState(null),[y,O]=useState(false),[H,I]=useState("brew"),[T,F]=useState(B),q=useRef(null);
  useEffect(()=>{
    if(!t&&!y)return;
    let e=q.current?.ownerDocument;
    if(!e)return;
    let a=e=>{
      let t=e.target;
      t?.closest?.("[data-menu-root]")||r(null)
    },n=e=>{
      "Escape"===e.key&&(r(null),O(false))
    };
    return e.addEventListener("pointerdown",a),e.addEventListener("keydown",n),()=>{
      e.removeEventListener("pointerdown",a),e.removeEventListener("keydown",n)
    };
  }, [t,y]);
  let G=e=>{
    r(t=>t===e?null:e)
  },V=T.reduce((e,t)=>e+t.qty,0),$=T.reduce((e,t)=>e+t.qty*t.price,0),K=(e,t)=>F(r=>r.map(r=>r.id===e?{...r,qty:Math.max(0,r.qty+t)}:r).filter(e=>e.qty>0));
  return (
    <div ref={q} className={v("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[560px] w-full flex-col overflow-hidden")}>
        <header className={v("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","relative z-20 shrink-0")}>
          <p className={v("bg-neutral-900/5 dark:bg-neutral-100/5",j,"text-neutral-900/80 dark:text-neutral-100/80","flex h-8 items-center justify-center px-4 text-center")}>Free shipping on orders over $60</p>
          <div className="flex h-14 items-center gap-2 px-3 sm:px-4">
            <button type="button" aria-label="Open menu" aria-expanded={y} onClick={()=>O(true)} className={v(N,C,"md:hidden")}>
              <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <a href="#" className={v("text-[16px]/[20px] font-[450] tracking-[-0.015em]","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","shrink-0")}>Harbor Coffee</a>
            <nav aria-label="Shop" className="ml-4 hidden items-center gap-0.5 md:flex" data-menu-root>
              {D.map(e=>(
                <button key={e.id} type="button" aria-haspopup="true" aria-expanded={t===e.id} onClick={()=>G(e.id)} className={v(z,A)}>
                            {e.label}
                            <HugeiconsIcon icon={Icon_20148} size={14} strokeWidth={1.8} aria-hidden="true" className={v(t===e.id&&"rotate-180")} />
                          </button>
              ))}
              {M.map(e=><a key={e} href="#" className={v(z,A)}>{e}</a>)}
            </nav>
            <div className="ml-auto flex shrink-0 items-center gap-0.5">
              <button type="button" aria-label="Search" className={v(N,C)}>
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Account" className={v(N,C,"max-sm:hidden")}>
                <HugeiconsIcon icon={Icon_34951} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Wishlist, 3 saved" className={v(N,C,"max-sm:hidden")}>
                <HugeiconsIcon icon={Icon_47293} size={16} strokeWidth={1.8} aria-hidden="true" />
                <span aria-hidden="true" className={R}>3</span>
              </button>
              <div className="relative" data-menu-root>
                <button type="button" aria-haspopup="true" aria-expanded={"cart"===t} aria-label={`Cart, ${V} items`} onClick={()=>G("cart")} className={v(N,C)}>
                  <HugeiconsIcon icon={Icon_2775} size={16} strokeWidth={1.8} aria-hidden="true" />
                  {V>0&&<span aria-hidden="true" className={R}>{V}</span>}
                </button>
                <AnimatePresence>
                  {"cart"===t&&<motion.div {...{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.12,ease:k}},transition:{duration:.16*!e,ease:k}}} className="absolute top-full right-0 z-30 mt-1.5 w-[300px] origin-top-right">
                    <div className={L}>
                      <p className={v("flex min-h-10 min-w-0 shrink-0 items-center gap-2 border-b border-neutral-900/8 px-4 has-[button]:pe-2 dark:border-neutral-100/8","min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100")}>Your bag</p>
                      {0===T.length?<p className={v("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","px-3 py-4 text-center")}>Your bag is empty.</p>:<ul className={v("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","max-h-[200px] overflow-y-auto")}>
                        {T.map(e=>(
                          <li key={e.id} className={v("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","px-4")}>
                                                <span aria-hidden="true" className={v("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80",f,"rounded-[var(--rb-r-xs,4px)]","size-[36px]")} />
                                                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                  <span className={v(j,"block truncate")}>{e.name}</span>
                                                  <span className="shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">
                                                    $
                                                    {e.price}
                                                  </span>
                                                </span>
                                                <span className="flex shrink-0 items-center gap-1">
                                                  <button type="button" aria-label={`Remove one ${e.name}`} onClick={()=>K(e.id,-1)} className={v(N,S)}>
                                                    <HugeiconsIcon icon={Icon_99199} size={12} strokeWidth={1.8} aria-hidden="true" />
                                                  </button>
                                                  <span className={v("text-[12px]/[16px] font-[450] tabular-nums","w-4 text-center")}>{e.qty}</span>
                                                  <button type="button" aria-label={`Add one ${e.name}`} onClick={()=>K(e.id,1)} className={v(N,S)}>
                                                    <HugeiconsIcon icon={Icon_89886} size={12} strokeWidth={1.8} aria-hidden="true" />
                                                  </button>
                                                </span>
                                              </li>
                        ))}
                      </ul>}
                      <div className={v("border-t border-neutral-900/8 dark:border-neutral-100/8","p-3")}>
                        <div className={v(j,"flex items-center justify-between")}>
                          <span className={g}>Subtotal</span>
                          <span className={v(w,"tabular-nums")}>
                            $
                            {$}
                          </span>
                        </div>
                        <button type="button" className={v("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",A,"mt-2.5 w-full")}>Checkout</button>
                      </div>
                    </div>
                  </motion.div>}
                </AnimatePresence>
              </div>
            </div>
          </div>
          {D.map(e=>t===e.id&&<div key={e.id} data-menu-root className={v(P,"transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute inset-x-0 top-full z-30 hidden origin-top md:block")}>
            <div className="mx-auto grid max-w-[900px] grid-cols-3 gap-6 px-4 py-6">
              {e.columns.map(e=>(
                <div key={e.title}>
                            <p className="px-2 pt-2 pb-1 text-[12px]/[16px] font-normal tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{e.title}</p>
                            <ul className="mt-2 space-y-0.5">{e.items.map(e=><li key={e}><a href="#" className={E}>{e}</a></li>)}</ul>
                          </div>
              ))}
            </div>
          </div>)}
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {["Meridian grinder","Harbor blend","Pour-over set"].map(e=>(
              <div key={e} className={W}>
                        <div className={v(f,"rounded-[var(--rb-r-sm,6px)]","m-2 mb-0 h-[110px]")} />
                        <div className="p-3">
                          <p className={v(j,"truncate")}>{e}</p>
                          <p className={v("text-[12px]/[16px] font-normal tabular-nums",g,"mt-0.5")}>From $32</p>
                        </div>
                      </div>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {y&&<>
            <motion.div aria-hidden="true" onClick={()=>O(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:k}}} transition={{duration:.18*!e,ease:k}} className={v("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-30 md:hidden")} />
            <motion.aside aria-label="Shop menu" initial={{opacity:0,x:e?0:-8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:e?0:-8,transition:{duration:.12,ease:k}}} transition={{duration:.18*!e,ease:k}} className={v("border-r border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","absolute inset-y-0 left-0 z-40 flex w-[280px] max-w-[85%] flex-col md:hidden")}>
              <div className={v("border-b border-neutral-900/8 dark:border-neutral-100/8","flex h-14 shrink-0 items-center justify-between px-3")}>
                <span className={w}>Menu</span>
                <button type="button" aria-label="Close menu" onClick={()=>{
                  O(false)
                }} className={v(N,C)}>
                  <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-2">
                {D.map(e=>(
                  <div key={e.id}>
                                <button type="button" aria-expanded={H===e.id} onClick={()=>I(t=>t===e.id?null:e.id)} className={v(E,"justify-between")}>
                                  {e.label}
                                  <HugeiconsIcon icon={Icon_20148} size={14} strokeWidth={1.8} aria-hidden="true" className={v(H===e.id&&"rotate-180")} />
                                </button>
                                {H===e.id&&<ul className="mb-1 space-y-0.5 overflow-hidden pl-2.5">
                                  {e.columns.flatMap(e=>e.items).map(e=><li key={e}><a href="#" className={E}>{e}</a></li>)}
                                </ul>}
                              </div>
                ))}
                {M.map(e=><a key={e} href="#" className={E}>{e}</a>)}
              </div>
            </motion.aside>
          </>}
        </AnimatePresence>
      </div>
  );
}


export default O;
