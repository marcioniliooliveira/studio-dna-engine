/**
 * React Bits Pro — Application UI (dashboard-13)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_77378 = [["path",{d:"M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.99707 16.999C11.5286 16.999 18.9122 15.5348 18.6979 6.43269M16.4886 8.04302L18.3721 6.14612C18.5656 5.95127 18.8798 5.94981 19.0751 6.14286L20.9971 8.04302",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_88294 = [["path",{d:"M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6.99707 5.99902C10.5286 5.999 17.9122 7.46328 17.6979 16.5654M15.4886 14.955L17.3721 16.8519C17.5656 17.0468 17.8798 17.0482 18.0751 16.8552L19.9971 14.955",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_71270 = [["path",{d:"M15.1312 2.5C14.1462 2.17555 13.0936 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M19.5 4.5L12 12M19.5 4.5V2M19.5 4.5H22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_85585 = [["path",{d:"M5.0249 21C5.04385 19.2643 5.04366 17.5541 5.0366 15.9209M5.0366 15.9209C5.01301 10.4614 4.91276 5.86186 5.19475 4.04271C5.5611 1.67939 9.39301 3.82993 13.9703 5.59842L16.0328 6.48729C17.5508 7.1415 19.7187 8.30352 18.7662 9.66084C18.3738 10.22 17.56 10.8596 16.0575 11.567L5.0366 15.9209Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_84341 = [["path",{d:"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 10.875V13.125M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let f = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  g = "text-neutral-900/66 dark:text-neutral-100/66",
  k = "bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]",
  j = "text-[13px]/[18px] font-normal",
  v = "text-[12px]/[16px] font-[450] tabular-nums",
  w = "text-[12px]/[16px] font-normal tabular-nums",
  N = "text-[32px]/[36px] font-[450] tabular-nums",
  y = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  M = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  A = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  S = "flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2",
  z = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  R = "flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2",
  _ = "relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",
  P = "flex min-w-0 flex-1 flex-col gap-0.5",
  L = "flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  W = "relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7",
  B = "block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100",
  D = "fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66",
  I = "fill-neutral-900/5 dark:fill-neutral-100/5",
  O = "fill-neutral-900 stroke-white stroke-2 dark:fill-neutral-100 dark:stroke-neutral-900",
  C = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  $ = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950";

function E(){
  let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
    let t=e.current;
    if(!t)return;
    let{scrollTop:a,scrollHeight:n,clientHeight:s}=t;
    r({start:a>1,end:Math.ceil(a+s)<n-1})
  }, []);
  return useEffect(()=>{
    a();
    let t=e.current,r=t?.ownerDocument.defaultView;
    if(!t||!r?.ResizeObserver)return;
    let n=new r.ResizeObserver(a);
    return observe(t),()=>disconnect();
  }, [a]),{ref:e,edges:t,onScroll:a};
}

let K = (e,t,r,a,n)=>a+(e-t)/(r-t||1)*(n-a),
  T = (e,t,r)=>Math.min(r,Math.max(t,e)),
  H = e=>`${Math.round(e)}%`,
  J = [{id:"o1",name:"Make the first hour obvious",lead:"Ines Halvorsen",meta:"Activation",results:[{id:"o1r1",name:"Reach first saved project in under 6 minutes",owner:"IH",unit:"percent",start:34,target:70,current:61},{id:"o1r2",name:"Cut setup steps from nine to four",owner:"TM",unit:"count",start:9,target:4,current:5},{id:"o1r3",name:"Lift week-one return visits",owner:"IH",unit:"percent",start:41,target:58,current:47}]},{id:"o2",name:"Earn the second seat",lead:"Dovid Aranyi",meta:"Expansion",results:[{id:"o2r1",name:"Workspaces with two or more editors",owner:"DA",unit:"count",start:820,target:1600,current:1418},{id:"o2r2",name:"Net revenue retention",owner:"PS",unit:"percent",start:104,target:118,current:113},{id:"o2r3",name:"Invites accepted within a day",owner:"DA",unit:"percent",start:52,target:75,current:58}]},{id:"o3",name:"Answer before people ask",lead:"Runa Petit",meta:"Support",results:[{id:"o3r1",name:"Median first reply",owner:"RP",unit:"count",start:240,target:45,current:68},{id:"o3r2",name:"Tickets closed without a handoff",owner:"KO",unit:"percent",start:62,target:85,current:81},{id:"o3r3",name:"Docs deflection rate",owner:"RP",unit:"percent",start:18,target:40,current:22}]},{id:"o4",name:"Ship on a predictable cadence",lead:"Marta L\xf8ken",meta:"Platform",results:[{id:"o4r1",name:"Releases per week",owner:"ML",unit:"count",start:2,target:6,current:5},{id:"o4r2",name:"Change failure rate",owner:"JB",unit:"percent",start:21,target:8,current:11},{id:"o4r3",name:"Build minutes per merge",owner:"ML",unit:"count",start:34,target:15,current:26}]},{id:"o5",name:"Make pricing legible",lead:"Priya Sundar",meta:"Revenue",results:[{id:"o5r1",name:"Plan page visits that reach checkout",owner:"PS",unit:"percent",start:12,target:24,current:19},{id:"o5r2",name:"Support threads asking what a seat costs",owner:"RP",unit:"count",start:180,target:40,current:74},{id:"o5r3",name:"Annual plans as a share of new revenue",owner:"PS",unit:"percent",start:28,target:45,current:39}]},{id:"o6",name:"Keep the editor fast under load",lead:"Jonas Brekke",meta:"Performance",results:[{id:"o6r1",name:"p95 interaction latency",owner:"JB",unit:"count",start:310,target:120,current:168},{id:"o6r2",name:"Documents over 5MB that open cleanly",owner:"ML",unit:"percent",start:71,target:96,current:92},{id:"o6r3",name:"Client bundle size",owner:"JB",unit:"count",start:1240,target:700,current:918}]},{id:"o7",name:"Hire the team we planned for",lead:"Tom\xe1s Miralles",meta:"People",results:[{id:"o7r1",name:"Open roles closed this quarter",owner:"TM",unit:"count",start:0,target:9,current:6},{id:"o7r2",name:"Offer acceptance rate",owner:"TM",unit:"percent",start:64,target:85,current:78},{id:"o7r3",name:"Days from screen to offer",owner:"KO",unit:"count",start:31,target:14,current:21}]}],
  q = Array.from({length:13},(e,t)=>`W${t+1}`),
  G = e=>{
  let t=e.target-e.start;
  return 0===t?100:T((e.current-e.start)/t*100,0,100);
},
  Q = (e,t)=>{
  let r=Math.round(t);
  return "percent"===e.unit?`${r}%`:"money"===e.unit?`$${r.toLocaleString("en-US")}`:r.toLocaleString("en-US");
},
  U = e=>e.results.reduce((e,t)=>e+G(t),0)/e.results.length,
  V = e=>e>=79.23076923076923?"ahead":e>=59.230769230769226?"on":"behind",
  X = {ahead:{label:"Ahead",Icon:Icon_77378,tone:b},on:{label:"On pace",Icon:Icon_99199,tone:g},behind:{label:"Behind",Icon:Icon_88294,tone:g}};

function F(){
  let[e,t]=useState(J[0].id),[r,l]=useState(null),[i,c]=function(){
    let e=useRef(null),[t,r]=useState({width:0,height:0});
    return useEffect(()=>{
      let t=e.current,a=t?.ownerDocument.defaultView;
      if(!t||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(([e])=>{
        let t=e.contentRect;
        r({width:t.width,height:t.height})
      });
      return observe(t),()=>disconnect();
    }, []),[e,t];
  }(),{ref:F,edges:Y,onScroll:Z}=E(),{ref:ee,edges:et,onScroll:er}=E(),ea=J.find(t=>t.id===e)??J[0],en=useMemo(()=>J.reduce((e,t)=>e+U(t),0)/J.length, []),es=useMemo(()=>J.flatMap(e=>e.results).filter(e=>"behind"===V(G(e))).length, []),el=useMemo(()=>{
    let e=U(ea),t=ea.id.charCodeAt(1),r=Array.from({length:9},(r,a)=>{
      let n=a/8;
      return T(e*(.16+.84*n)+11*(.5*Math.sin(.42*a+t)+.3*Math.sin(.17*a+1.6*t))*(1-.35*n),0,100);
    });
    return r[8]=e,{actual:r,plan:Array.from({length:13},(e,t)=>t/12*100),end:e};
  }, [ea]),ei=c.width,ec=c.height,ed=Math.max(ei-40-4,1),eo=Math.max(ec-12-22,1),eu=useMemo(()=>{
    if(0===ei)return null;
    let e=e=>40+K(e,0,12,0,ed),t=e=>12+eo-K(e,0,100,0,eo),r=line().x((t,r)=>e(r)).y(e=>t(e)).curve(m.G),a=area().x((t,r)=>e(r)).y0(12+eo).y1(e=>t(e)).curve(m.G);
    return {x:e,y:t,actualLine:r(el.actual)??"",actualArea:a(el.actual)??"",planLine:r(el.plan)??""};
  }, [ei,ed,eo,el]),ex=null===r?{label:"Week 9",actual:el.end,plan:el.plan[8]}:{label:`Week ${r+1}`,actual:r<9?el.actual[r]:NaN,plan:el.plan[r]},eh=V(en),em=X[eh].Icon;
  return (
    <div className={f("bg-white dark:bg-neutral-950",b,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="flex shrink-0 flex-wrap items-end justify-between gap-3 px-4 pt-5 pb-4 sm:px-6">
          <div className="min-w-0">
            <h1 className={f("text-[20px]/[24px] font-[450] tracking-[-0.015em]",b)}>Company goals</h1>
            <div className={f(j,g,"mt-1.5 flex items-center gap-2")}>
              <HugeiconsIcon icon={Icon_71270} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
              <span>Q2 scorecard</span>
              <span>
                {"week "}
                9
                {" of "}
                13
              </span>
            </div>
          </div>
          <dl className="flex items-end gap-5">
            <div className="text-right">
              <dt className={f(w,g)}>Overall</dt>
              <dd className={f(N,b,"mt-0.5")}>{H(en)}</dd>
            </div>
            <div className="text-right">
              <dt className={f(w,g)}>Quarter elapsed</dt>
              <dd className={f(N,g,"mt-0.5")}>{H(69.23076923076923)}</dd>
            </div>
            <div className="pb-1 text-right">
              <dt className={f(w,g)}>Key results at risk</dt>
              <dd className={f("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",es>0?"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]":"text-neutral-900/66 dark:text-neutral-100/66","mt-1")}>{es}</dd>
            </div>
          </dl>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div ref={ee} onScroll={er} className="flex min-h-0 flex-1 flex-col max-lg:overflow-y-auto">
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 px-4 pb-4 max-lg:flex-none lg:grid-cols-[340px_minmax(0,1fr)] sm:px-6 sm:pb-6">
              <div className={f(A,"lg:min-h-0")}>
                <div className={f(S,"justify-between py-3")}>
                  <h2 className={M}>Objectives</h2>
                  <span className="shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{J.length}</span>
                </div>
                <div className={f(z,"relative min-h-0 flex-1")}>
                  <div ref={F} onScroll={Z} className="h-full overflow-y-auto">
                    <ul className="space-y-0.5 p-1">
                      {J.map(r=>{
                        let n=U(r),i=V(n),c=X[i].Icon,d=r.id===e;
                        return (
                          <li key={r.id}>
                                                <button type="button" aria-current={d?"true":undefined} onClick={()=>{
                                                  t(r.id),l(null)
                                                }} className={f(_,d?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8",y,"rounded-[var(--rb-r-sm,6px)]","px-2")}>
                                                  <div className={P}>
                                                    <div className="flex items-start gap-2">
                                                      <HugeiconsIcon icon={Icon_85585} size={14} strokeWidth={1.8} aria-hidden="true" className={f(g,"mt-0.5 shrink-0")} />
                                                      <span className={f(L,"flex-1")}>{r.name}</span>
                                                      <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={1.8} aria-hidden="true" className={f(d?"text-neutral-900/80 dark:text-neutral-100/80":g,"mt-0.5 shrink-0")} />
                                                    </div>
                                                    <div className={f("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","mt-1 flex items-center gap-2 pl-5.5")}>
                                                      <span className="truncate">{r.meta}</span>
                                                      <span className="truncate">{r.lead}</span>
                                                    </div>
                                                    <div className="mt-2 flex items-center gap-2 pl-5.5">
                                                      <span aria-hidden="true" className={f(W,"flex-1")}><span className={"behind"===i?f(k,"block h-full"):B} style={{width:`${n}%`}} /></span>
                                                      <span className={f(v,"w-8 shrink-0 text-right")}>{H(n)}</span>
                                                      <HugeiconsIcon icon={c} size={14} strokeWidth={1.8} aria-hidden="true" className={f(X[i].tone,"shrink-0")} />
                                                    </div>
                                                  </div>
                                                </button>
                                              </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div aria-hidden="true" className={f(C,"pointer-events-none absolute inset-x-0 top-0 h-8",Y.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={f($,"pointer-events-none absolute inset-x-0 bottom-0 h-8",Y.end?"opacity-100":"opacity-0")} />
                </div>
                <div className={f(R,"justify-between")}>
                  <span className="inline-flex items-center gap-1.5">
                    <HugeiconsIcon icon={em} size={14} strokeWidth={1.8} aria-hidden="true" className={X[eh].tone} />
                    {X[eh].label}
                    {" against the quarter"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:min-h-0">
                <div className={f(A,"min-h-0 flex-1")}>
                  <div className={f(S,"flex-wrap justify-between py-3")}>
                    <div className="min-w-0">
                      <h2 className={M}>{ea.name}</h2>
                      <p className={f("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 flex min-w-0 gap-2")}>
                        <span className="shrink-0">{ex.label}</span>
                        <span className="shrink-0">{Number.isNaN(ex.actual)?"not reached yet":`${H(ex.actual)} done`}</span>
                        <span className="truncate">
                          {"plan "}
                          {H(ex.plan)}
                        </span>
                      </p>
                    </div>
                    <div className={f(w,g,"flex shrink-0 items-center gap-4")}>
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className={f("text-neutral-900 dark:text-neutral-100","h-1 w-4 bg-current")} />
                        Actual
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className={f("text-neutral-900/66 dark:text-neutral-100/66","h-0 w-4 border-t border-dashed border-current")} />
                        Plan
                      </span>
                    </div>
                  </div>
                  <div className={f(z,"min-h-0 flex-1")}>
                    <div ref={i} role="application" tabIndex={0} aria-label={`Burn-up of ${ea.name} across 13 weeks`} onPointerMove={e=>{
                      let t=i.current;
                      if(!t||ed<=0)return;
                      let r=t.getBoundingClientRect();
                      l(T(Math.round((e.clientX-r.left-40)/ed*12),0,12))
                    }} onPointerLeave={()=>l(null)} onKeyDown={e=>{
                      ("ArrowLeft"===e.key||"ArrowRight"===e.key)&&(e.preventDefault(),l(t=>T((t??8)+("ArrowRight"===e.key?1:-1),0,12)))
                    }} onBlur={()=>l(null)} className={f(y,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","relative min-h-[172px] flex-1 p-3")}>
                      {eu&&<svg width={ei} height={ec} className="overflow-visible" aria-hidden="true">
                        {[0,25,50,75,100].map(e=>(
                          <g key={e}>
                                                <line x1={40} x2={ei-4} y1={eu.y(e)} y2={eu.y(e)} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/5 dark:stroke-neutral-100/5" />
                                                <text x={32} y={eu.y(e)} dy={3.5} textAnchor="end" className={D}>
                                                  {e}
                                                  %
                                                </text>
                                              </g>
                        ))}
                        <rect x={eu.x(8)} y={12} width={Math.max(eu.x(12)-eu.x(8),0)} height={eo} className={I} />
                        <path d={eu.planLine} fill="none" strokeWidth={2} strokeDasharray="6 4" className="stroke-neutral-900/66 dark:stroke-neutral-100/66" />
                        <path d={eu.actualArea} className={I} />
                        <path d={eu.actualLine} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-neutral-900 dark:stroke-neutral-100" />
                        <rect x={eu.x(8)-4} y={eu.y(el.end)-4} width={8} height={8} className={O} />
                        {q.map((e,t)=>t%2==0?<text key={e} x={eu.x(t)} y={ec-2} textAnchor={0===t?"start":12===t?"end":"middle"} className={D}>{e}</text>:null)}
                        {null!==r&&<g>
                          <line x1={eu.x(r)} x2={eu.x(r)} y1={12} y2={12+eo} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900 dark:stroke-neutral-100" />
                          <rect x={eu.x(r)-4} y={eu.y(r<9?el.actual[r]:el.plan[r])-4} width={8} height={8} className={O} />
                        </g>}
                      </svg>}
                    </div>
                  </div>
                </div>
                <div className={f(A,"shrink-0")}>
                  <div className={f(S,"justify-between py-3")}>
                    <h2 className={M}>Key results</h2>
                    <span className={f(j,g,"truncate")}>Start → target, current in bold</span>
                  </div>
                  <ul className={f(z,"divide-y divide-neutral-900/8 dark:divide-neutral-100/8")}>
                    {ea.results.map(e=>{
                      let t=G(e),r=V(t),n=X[r].Icon;
                      return (
                        <li key={e.id} className={f(_,"px-3")}>
                                            <span className={f("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[28px]")}>
                                              <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.owner}</span>
                                            </span>
                                            <div className={P}>
                                              <p className={L}><span className="truncate">{e.name}</span></p>
                                              <div className="mt-1.5 flex items-center gap-2">
                                                <span aria-hidden="true" className={f(W,"max-w-[220px] flex-1")}><span className={"behind"===r?f(k,"block h-full"):B} style={{width:`${t}%`}} /></span>
                                                <span className={f(w,g)}>
                                                  {Q(e,e.start)}
                                                  {" →"}
                                                  {" "}
                                                  <strong className={f(v,b)}>{Q(e,e.current)}</strong>
                                                  {" "}
                                                  {"→ "}
                                                  {Q(e,e.target)}
                                                </span>
                                              </div>
                                            </div>
                                            <span className={f(v,X[r].tone,"inline-flex shrink-0 items-center gap-1.5")}>
                                              <HugeiconsIcon icon={n} size={14} strokeWidth={1.8} aria-hidden="true" />
                                              {H(t)}
                                            </span>
                                          </li>
                      );
                    })}
                  </ul>
                  <div className={R}>
                    <HugeiconsIcon icon={Icon_84341} size={14} strokeWidth={1.8} aria-hidden="true" />
                    {"Pace compares progress with "}
                    {H(69.23076923076923)}
                    {" of the quarter spent."}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={f(C,"pointer-events-none absolute inset-x-0 top-0 h-8",et.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={f($,"pointer-events-none absolute inset-x-0 bottom-0 h-8",et.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default F;
