/**
 * React Bits Pro — Application UI (analytics-14)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';

let n = (...e)=>e.filter(Boolean).join(" "),
  s = "text-neutral-900 dark:text-neutral-100",
  i = "text-neutral-900/66 dark:text-neutral-100/66",
  o = "text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",
  c = "text-[13px]/[18px] font-normal",
  d = "fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66",
  u = "stroke-neutral-900/66 dark:stroke-neutral-100/66",
  x = "fill-neutral-900 dark:fill-neutral-100",
  h = (e,t,a)=>Math.min(a,Math.max(t,e)),
  p = (e,t)=>.5*Math.sin(.9*t+e)+.32*Math.sin(.31*t+1.7*e),
  m = ["All","Growth","Enterprise"],
  f = ["Northwind Labs","Contoso Retail","Acme Freight","Meridian Health","Lumen Studios","Fabrikam","Cobalt Systems","Redwood Capital","Tallgrass Foods","Aperture Robotics","Vector Logistics","Beacon Insurance","Halcyon Media","Ironclad Security","Solstice Energy","Palisade Bank","Driftwood Travel","Quill Publishing","Verdant Farms","Sable & Co","Anvil Manufacturing","Cirrus Airlines","Marlowe Legal","Petra Ceramics","Onyx Telecom","Wexford Textiles"].map((e,t)=>{
  let a=h(Math.round(20+(p(1.1,t)+.9)*150),6,320),r=h(Math.round(60+42*p(3.3,t)),12,96),l=h(Math.round(a*(430+260*p(5.2,t))),4e3,19e4);
  return {i:t,name:e,seats:a,usage:r,acv:l,tier:l>=62e3?"Enterprise":"Growth"};
}),
  b = Math.min(...f.map(e=>e.acv)),
  k = Math.max(...f.map(e=>e.acv));

function g(e){
  return 5+(Math.sqrt(e)-Math.sqrt(b))/(Math.sqrt(k)-Math.sqrt(b)||1)*17;
}

let v = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=a.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?a.length-1:(r+t+a.length)%a.length;
  a[l].focus(),a[l].click()
};

function w(){
  let[e,t]=useState("All"),[a,p]=useState(null),[b,k]=useState(0),[w,y]=function(){
    let e=useRef(null),[t,a]=useState({width:0,height:0});
    return useEffect(()=>{
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(([e])=>{
        let t=e.contentRect;
        a({width:t.width,height:t.height})
      });
      return observe(t),()=>disconnect();
    }, []),[e,t];
  }(),j=useMemo(()=>f.filter(t=>"All"===e||t.tier===e), [e]),N=useMemo(()=>[...j].sort((e,t)=>t.acv-e.acv), [j]),_=useMemo(()=>(function(e){
    if(0===e.length)return 0;
    let t=[...e].sort((e,t)=>e-t),a=Math.floor(t.length/2);
    return t.length%2?t[a]:Math.round((t[a-1]+t[a])/2);
  })(j.map(e=>e.seats)), [j]),M=y.width,A=Math.max(M-40-16,1),S=328,$=Math.max(...f.map(e=>e.seats)),{top:R,ticks:L}=useMemo(()=>(function(e,t=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let a=e/t,r=10**Math.floor(Math.log10(a)),l=a/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })($), [$]),D=useCallback(e=>40+e/R*A, [A,R]),C=useCallback(e=>16+S-e/100*S, [S]),z=e=>e.seats>_&&e.usage<65,E=j.filter(z).length,F=null===a?null:f.find(e=>e.i===a)??null,B=f[b],U=C(B.usage),W=g(B.acv),P=U-W-62,H=P>=0?P:Math.min(U+W+8,314),O=g(2e4),T=g(1e5),q=e=>{
    if(0===N.length)return;
    let t=N.map(e=>e.i),r=null===a?-1:t.indexOf(a),l=-1===r?e>0?0:t.length-1:h(r+e,0,t.length-1);
    p(t[l]),k(t[l])
  },I=M>0?[{text:"Healthy",x:44,y:28,anchor:"start"},{text:"Expand",x:M-16-4,y:28,anchor:"end"},{text:"Watch",x:44,y:16+S-6,anchor:"start"},{text:"At risk",x:M-16-4,y:16+S-6,anchor:"end"}]:[];
  return (
    <div className={n("bg-white dark:bg-neutral-950",s,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={n("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={n("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
            <div className="px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className={n("text-[16px]/[20px] font-[450] tracking-[-0.015em]",s)}>Account health</h2>
                  <p className={n(c,i,"mt-0.5 truncate")}>Seats against weekly active usage, sized by contract value.</p>
                </div>
                <div role="radiogroup" aria-label="Plan tier" onKeyDown={v} className={n("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
                  {m.map(a=>(
                    <button key={a} type="button" role="radio" aria-checked={a===e} tabIndex={a===e?0:-1} onClick={()=>{
                                    t(a),p(null)
                                  }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{a}</button>
                  ))}
                </div>
              </div>
              <p className={n(c,i,"mt-2 flex flex-wrap gap-x-6 gap-y-1")}>
                <span>
                  <span className={n(s,"tabular-nums")}>{j.length}</span>
                  {" "}
                  accounts
                </span>
                <span>
                  <span className={n(s,"tabular-nums")}>{E}</span>
                  {" "}
                  at risk
                </span>
                <span>
                  Median
                  {" "}
                  <span className={n(s,"tabular-nums")}>{_}</span>
                  {" "}
                  seats
                </span>
              </p>
              <div ref={w} role="img" tabIndex={0} aria-label={F?`${F.name}: ${F.seats} seats, ${F.usage}% weekly active, $${F.acv.toLocaleString("en-US")} contract value${z(F)?", at risk":""}`:`Account health scatter, ${j.length} accounts. Arrow keys step through accounts by contract value.`} onPointerMove={e=>((e,t)=>{
                let a=w.current;
                if(!a)return;
                let r=a.getBoundingClientRect(),l=e-r.left,n=t-r.top,s=-1,i=1/0;
                for(let e of j){
                  let t=Math.hypot(D(e.seats)-l,C(e.usage)-n)-g(e.acv);
                  t<i&&(i=t,s=e.i)
                }
                s>=0&&i<=12?(p(s),k(s)):p(null)
              })(e.clientX,e.clientY)} onPointerLeave={()=>p(null)} onBlur={()=>p(null)} onKeyDown={e=>{
                "ArrowRight"===e.key||"ArrowDown"===e.key?(e.preventDefault(),q(1)):"ArrowLeft"===e.key||"ArrowUp"===e.key?(e.preventDefault(),q(-1)):"Home"===e.key?(e.preventDefault(),N.length&&(p(N[0].i),k(N[0].i))):"End"===e.key?(e.preventDefault(),N.length&&(p(N[N.length-1].i),k(N[N.length-1].i))):"Escape"===e.key&&p(null)
              }} style={{height:372,touchAction:"pan-y"}} className={n("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","relative mt-3 cursor-crosshair")}>
                {M>0&&<svg width={M} height={372} className="overflow-visible">
                  {[0,25,50,75,100].map(e=>(
                    <g key={`hy-${e}`}>
                                    <line x1={40} x2={M-16} y1={C(e)} y2={C(e)} shapeRendering="crispEdges" className={0===e?"stroke-neutral-900/8 dark:stroke-neutral-100/8":"stroke-neutral-900/5 dark:stroke-neutral-100/5"} strokeWidth={1} />
                                    <text x={0} y={C(e)} dy={-4} className={d}>
                                      {e}
                                      %
                                    </text>
                                  </g>
                  ))}
                  {L.map(e=>0===e?null:<text key={`xl-${e}`} x={D(e)} y={368} textAnchor="middle" className={d}>
                    {Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                  </text>)}
                  <line x1={D(_)} x2={D(_)} y1={16} y2={16+S} strokeDasharray="6 4" className={u} strokeWidth={1} />
                  <line x1={40} x2={M-16} y1={C(65)} y2={C(65)} strokeDasharray="6 4" className={u} strokeWidth={1} />
                  {I.map(e=><text key={e.text} x={e.x} y={e.y} textAnchor={e.anchor} className={d}>{e.text}</text>)}
                  <g>
                    {j.map(e=>{
                      let t=z(e);
                      return <circle key={e.i} cx={D(e.seats)} cy={C(e.usage)} r={g(e.acv)} fillOpacity={a===e.i?1:.55} stroke="currentColor" strokeWidth={1.5*!!t} className={n(x,t&&o)} />;
                    })}
                  </g>
                  {F&&<circle cx={D(F.seats)} cy={C(F.usage)} r={g(F.acv)+3} fill="none" strokeWidth={2} className="stroke-neutral-900 dark:stroke-neutral-100" />}
                </svg>}
                {M>0&&<div aria-hidden="true" style={{left:h(D(B.seats),88,Math.max(M-88,88)),top:H}} className={n("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","-translate-x-1/2",null===a?"opacity-0":"opacity-100")}>
                  <p className={n("text-[12px]/[16px] font-normal tabular-nums","whitespace-nowrap")}>{B.name}</p>
                  <p className="flex gap-2 whitespace-nowrap">
                    <span>
                      {B.seats.toLocaleString("en-US")}
                      {" seats"}
                    </span>
                    <span>
                      {B.usage}
                      % active
                    </span>
                    <span>
                      $
                      {B.acv.toLocaleString("en-US")}
                    </span>
                  </p>
                </div>}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-2">
              <div className={n(c,i,"flex items-center gap-3")}>
                <span>Contract value</span>
                <span className="flex items-center gap-1.5">
                  <svg width={Math.ceil(2*O)} height={24} className="shrink-0 overflow-visible" aria-hidden="true"><circle cx={O} cy={12} r={O} fillOpacity={.55} className={x} /></svg>
                  <span className="tabular-nums">$20k</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width={Math.ceil(2*T)} height={Math.ceil(2*T)} className="shrink-0 overflow-visible" aria-hidden="true"><circle cx={T} cy={T} r={T} fillOpacity={.55} className={x} /></svg>
                  <span className="tabular-nums">$100k</span>
                </span>
              </div>
              <div className={n(c,i,"flex items-center gap-1.5")}>
                <svg width={10} height={10} className="shrink-0 overflow-visible" aria-hidden="true">
                  <circle cx={5} cy={5} r={4.25} fill="none" stroke="currentColor" strokeWidth={1.5} className={o} />
                </svg>
                {"At risk: below "}
                65
                % usage above median seats
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default w;
