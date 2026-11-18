/**
 * React Bits Pro — Application UI (filtering-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { key, left, preventDefault, useEffect, useId, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "border border-neutral-900/12 dark:border-neutral-100/14",
  x = "text-[14px]/[16px] font-[450]",
  p = "text-[13px]/[18px] font-normal",
  h = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  m = "relative inline-flex size-4 shrink-0 items-center justify-center",
  k = "peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40",
  v = "pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]",
  _ = "relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40",
  g = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  f = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  w = "ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66",
  y = "inline-flex h-7 cursor-pointer items-center rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80 decoration-1 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100",
  j = d(p,u),
  z = d("text-[12px]/[16px] font-normal tabular-nums",u);

function N({id:e,value:a,onChange:r,options:o,disabled:c,placeholder:u="Select…",className:b,triggerClassName:x,leading:p,ariaLabel:h}){
  let m=useId(),[k,v]=useState(false),[_,g]=useState(0),[f,w]=useState(false),[y,j]=useState(),N=useRef(null),C=useRef(null),M=useRef({buffer:"",at:0}),S=o.findIndex(e=>e.value===a),D=S>=0?o[S]:undefined,A=e=>{
    if(c)return;
    let a=N.current,r=a?.ownerDocument.defaultView;
    if(a&&r){
      let e=a.getBoundingClientRect(),l=0,t=r.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        l=Math.max(l,a.top),t=Math.min(t,a.bottom);
        break
      }
      let n=t-e.bottom,i=e.top-l,s=Math.min(32*o.length+8,264),c=n<s+8&&i>n,d=(c?i:n)-8;
      w(c),j(d<s?Math.max(d,40):undefined)
    }
    g(e??(S>=0?S:0)),v(true)
  };
  useEffect(()=>{
    if(!k)return;
    let e=N.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||v(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [k]),useEffect(()=>{
    if(!k)return;
    let e=C.current,a=e?.querySelector(`[data-index="${_}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,l=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:l>e.scrollTop+e.clientHeight&&(e.scrollTop=l-e.clientHeight)
  }, [k,_]);
  let E=e=>{
    let a=o[e];
    a&&(r(a.value),v(false),N.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={N} className={d("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={k} aria-controls={m} aria-haspopup="listbox" disabled={c} onClick={()=>k?v(false):A()} onKeyDown={e=>{
          if(!c){
            if(!k){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),A());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),v(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),g(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),g(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),g(0);else if("End"===e.key)e.preventDefault(),g(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),E(_);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=M.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let l=o.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              l>=0&&g(l)
            }
          }
        }} aria-label={h} className={d("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",x)}>
          <span className="flex min-w-0 items-center gap-2">
            {p}
            <span className={d("truncate",!D&&"text-neutral-900/66 dark:text-neutral-100/66")}>{D?D.label:u}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {k&&<ul ref={C} id={m} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={d("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",f?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,r)=>{
            let t=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={t} data-index={r} data-highlighted={r===_||undefined} onMouseEnter={()=>g(r)} onClick={()=>E(r)} className={d("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={d(z,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {t&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function C({min:e,max:a,step:r=1,value:n,onChange:i,format:s,labels:o}){
  let c=useRef(null),[d,u]=useState(null),b=l=>Math.min(a,Math.max(e,Math.round(l/r)*r)),x=r=>(r-e)/(a-e)*100,p=r=>{
    let l=c.current;
    if(!l)return e;
    let t=l.getBoundingClientRect();
    return 0===width?e:b(e+(r-left)/width*(a-e));
  },h=(e,a)=>{
    let[r,l]=n;
    0===e?i([Math.min(a,l),l]):i([r,Math.max(a,r)])
  },m=l=>({role:"slider",tabIndex:0,"aria-label":o[l],"aria-valuemin":e,"aria-valuemax":a,"aria-valuenow":n[l],"aria-valuetext":s(n[l]),style:{left:`${x(n[l])}%`,touchAction:"none"},onPointerDown:e=>{
    e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId),u(l)
  },onPointerMove:e=>{
    d===l&&h(l,p(e.clientX))
  },onLostPointerCapture:()=>u(null),onPointerUp:e=>{
    e.currentTarget.releasePointerCapture(e.pointerId),u(null)
  },onKeyDown:t=>{
    let i=Math.max(r,Math.round((a-e)/10)),s=n[l],o=null;
    "ArrowLeft"===key||"ArrowDown"===key?o=s-r:"ArrowRight"===key||"ArrowUp"===key?o=s+r:"PageDown"===key?o=s-i:"PageUp"===key?o=s+i:"Home"===key?o=e:"End"===key&&(o=a),null!==o&&(preventDefault(),h(l,b(o)))
  },className:"absolute top-1/2 block size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] shadow-[0_0_0_2px_white] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:shadow-[0_0_0_2px_var(--color-neutral-900)]"});
  return (
    <div ref={c} onPointerDown={e=>{
        let a=p(e.clientX);
        h(Math.abs(a-n[0])<=Math.abs(a-n[1])?0:1,a)
      }} className="relative flex h-4 w-full cursor-pointer touch-none items-center select-none">
        <div className="relative h-1 w-full grow rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8">
          <span className="absolute inset-y-0 rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))]" style={{left:`${x(n[0])}%`,width:`${x(n[1])-x(n[0])}%`}} />
          <div {...m(0)} />
          <div {...m(1)} />
        </div>
      </div>
  );
}

let M = [{value:"dinnerware",label:"Dinnerware"},{value:"drinkware",label:"Drinkware"},{value:"vases",label:"Vases"},{value:"planters",label:"Planters"},{value:"serveware",label:"Serveware"}],
  S = [{value:"chalk",label:"Chalk",hex:"#ece5d8",light:true},{value:"sand",label:"Sand",hex:"#c9b193",light:true},{value:"moss",label:"Moss",hex:"#5a6647",light:false},{value:"slate",label:"Slate",hex:"#3b4b5a",light:false},{value:"clay",label:"Clay",hex:"#a05a41",light:false},{value:"ink",label:"Ink",hex:"#2a2724",light:false}],
  D = [{value:"s",label:"Small"},{value:"m",label:"Medium"},{value:"l",label:"Large"}],
  A = [{value:"kilnhouse",label:"Kilnhouse"},{value:"muro",label:"Muro Studio"},{value:"terra",label:"Terra & Ash"},{value:"nine",label:"Nine Fields"}],
  E = [{id:"p1",name:"Ridge dinner plate",category:"dinnerware",price:38,glaze:"chalk",size:"l",maker:"kilnhouse"},{id:"p2",name:"Ridge side plate",category:"dinnerware",price:26,glaze:"chalk",size:"m",maker:"kilnhouse"},{id:"p3",name:"Coil cereal bowl",category:"dinnerware",price:32,glaze:"sand",size:"m",maker:"muro"},{id:"p4",name:"Ember pasta bowl",category:"dinnerware",price:44,glaze:"clay",size:"l",maker:"terra"},{id:"p5",name:"Halo charger plate",category:"dinnerware",price:52,glaze:"ink",size:"l",maker:"nine"},{id:"p6",name:"Tuck mug",category:"drinkware",price:28,glaze:"moss",size:"s",maker:"kilnhouse"},{id:"p7",name:"Stack tumbler",category:"drinkware",price:22,glaze:"slate",size:"s",maker:"muro"},{id:"p8",name:"Pour carafe",category:"drinkware",price:68,glaze:"chalk",size:"l",maker:"terra"},{id:"p9",name:"Field cup",category:"drinkware",price:19,glaze:"sand",size:"s",maker:"nine"},{id:"p10",name:"Bell teapot",category:"drinkware",price:94,glaze:"ink",size:"l",maker:"kilnhouse"},{id:"p11",name:"Column vase",category:"vases",price:76,glaze:"slate",size:"l",maker:"muro"},{id:"p12",name:"Pebble bud vase",category:"vases",price:34,glaze:"chalk",size:"s",maker:"terra"},{id:"p13",name:"Fold vase",category:"vases",price:58,glaze:"clay",size:"m",maker:"nine"},{id:"p14",name:"Basin planter",category:"planters",price:62,glaze:"sand",size:"l",maker:"kilnhouse"},{id:"p15",name:"Rim planter",category:"planters",price:41,glaze:"moss",size:"m",maker:"muro"},{id:"p16",name:"Trace wall planter",category:"planters",price:29,glaze:"ink",size:"s",maker:"terra"},{id:"p17",name:"Crest platter",category:"serveware",price:88,glaze:"chalk",size:"l",maker:"nine"},{id:"p18",name:"Ladle serving bowl",category:"serveware",price:54,glaze:"moss",size:"m",maker:"kilnhouse"}],
  P = e=>`$${e}`,
  $ = [{value:"featured",label:"Featured"},{value:"low",label:"Price: low to high"},{value:"high",label:"Price: high to low"},{value:"name",label:"Alphabetical"}],
  R = {category:[],glaze:[],size:[],maker:[],price:[0,100]},
  L = (e,a,r)=>("category"===r||!a.category.length||!!a.category.includes(e.category))&&("glaze"===r||!a.glaze.length||!!a.glaze.includes(e.glaze))&&("size"===r||!a.size.length||!!a.size.includes(e.size))&&("maker"===r||!a.maker.length||!!a.maker.includes(e.maker))&&("price"===r||!(e.price<a.price[0])&&!(e.price>a.price[1]))&&true;

function T({label:e,children:a}){
  return (
    <section className="py-5 first:pt-0">
        <h3 className={d(x,"mb-3")}>{e}</h3>
        {a}
      </section>
  );
}

function W(){
  let[e,a]=useState(R),[r,i]=useState("featured"),[u,z]=useState(false),W=(e,r)=>a(a=>({...a,[e]:a[e].includes(r)?a[e].filter(e=>e!==r):[...a[e],r]})),H=useMemo(()=>{
    let a=E.filter(a=>L(a,e));
    return "low"===r?[...a].sort((e,a)=>e.price-a.price):"high"===r?[...a].sort((e,a)=>a.price-e.price):"name"===r?[...a].sort((e,a)=>e.name.localeCompare(a.name)):a;
  }, [e,r]),I=(a,r)=>E.filter(l=>L(l,e,a)&&l[a]===r).length,B=0!==e.price[0]||100!==e.price[1],F=[...e.category.map(e=>({key:`category:${e}`,label:M.find(a=>a.value===e)?.label??e,swatch:undefined,clear:()=>W("category",e)})),...e.glaze.map(e=>({key:`glaze:${e}`,label:S.find(a=>a.value===e)?.label??e,swatch:S.find(a=>a.value===e)?.hex,clear:()=>W("glaze",e)})),...e.size.map(e=>({key:`size:${e}`,label:D.find(a=>a.value===e)?.label??e,swatch:undefined,clear:()=>W("size",e)})),...e.maker.map(e=>({key:`maker:${e}`,label:A.find(a=>a.value===e)?.label??e,swatch:undefined,clear:()=>W("maker",e)})),...B?[{key:"price",label:`${P(e.price[0])} – ${P(e.price[1])}`,swatch:undefined,clear:()=>a(e=>({...e,price:[0,100]}))}]:[]],U=<div className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
    <T label="Category">
      <ul className="-mx-2 space-y-0.5">
        {M.map(a=>{
          let r=I("category",a.value),t=e.category.includes(a.value);
          return (
            <li key={a.value}>
                        <label className={d(f,0===r&&!t&&"opacity-40")}>
                          <span className={m}>
                            <input type="checkbox" checked={t} onChange={()=>W("category",a.value)} className={k} />
                            <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={v} />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{a.label}</span>
                          <span className={d(w,"shrink-0")}>{r}</span>
                        </label>
                      </li>
          );
        })}
      </ul>
    </T>
    <T label="Price">
      <div className="mb-4 flex min-h-7 items-center justify-between">
        <span className={d(x,"tabular-nums")}>
          {P(e.price[0])}
          {" – "}
          {P(e.price[1])}
        </span>
        {B&&<button type="button" onClick={()=>a(e=>({...e,price:[0,100]}))} className={y}>Reset</button>}
      </div>
      <C min={0} max={100} step={5} value={e.price} onChange={e=>a(a=>({...a,price:e}))} format={P} labels={["Minimum price","Maximum price"]} />
    </T>
    <T label="Glaze">
      <div className="-mx-1 grid grid-cols-6">
        {S.map(a=>{
          let r=e.glaze.includes(a.value),t=I("glaze",a.value);
          return (
            <button key={a.value} type="button" aria-pressed={r} aria-label={`${a.label}, ${t} pieces`} onClick={()=>W("glaze",a.value)} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]",0===t&&!r&&"opacity-40")}>
                        <span className={d(b,"rounded-[var(--rb-r-xs,4px)]","size-6")} style={{backgroundColor:a.hex}} />
                        {r&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className={d(a.light?"text-neutral-900 dark:text-neutral-900":"text-white dark:text-neutral-900","absolute")} />}
                      </button>
          );
        })}
      </div>
    </T>
    <T label="Size">
      <div className="flex flex-wrap gap-2">
        {D.map(a=>{
          let r=e.size.includes(a.value),t=I("size",a.value);
          return <button key={a.value} type="button" aria-pressed={r} onClick={()=>W("size",a.value)} className={d(_,0===t&&!r&&"opacity-40")}>{a.label}</button>;
        })}
      </div>
    </T>
    <T label="Maker">
      <ul className="-mx-2 space-y-0.5">
        {A.map(a=>{
          let r=I("maker",a.value),t=e.maker.includes(a.value);
          return (
            <li key={a.value}>
                        <label className={d(f,0===r&&!t&&"opacity-40")}>
                          <span className={m}>
                            <input type="checkbox" checked={t} onChange={()=>W("maker",a.value)} className={k} />
                            <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={v} />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{a.label}</span>
                          <span className={d(w,"shrink-0")}>{r}</span>
                        </label>
                      </li>
          );
        })}
      </ul>
    </T>
  </div>;
  return (
    <div className={d("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[940px] w-full flex-col overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Stoneware</h2>
              <p className={d(j,"mt-1")}>
                <span className="tabular-nums">{H.length}</span>
                {" of"}
                {" "}
                <span className="tabular-nums">{E.length}</span>
                {" pieces"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-expanded={u} onClick={()=>z(e=>!e)} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",h,"md:hidden")}>
                <HugeiconsIcon icon={Icon_68656} size={16} strokeWidth={1.8} aria-hidden="true" />
                Filters
                {F.length>0&&<span className="tabular-nums">
                  (
                  {F.length}
                  )
                </span>}
              </button>
              <N value={r} onChange={i} options={$} ariaLabel="Sort pieces" className="w-[190px]" />
            </div>
          </header>
          <div className="mt-6 flex flex-1 flex-col gap-6 md:flex-row md:gap-8">
            <aside className={d("w-full shrink-0 md:block md:w-[240px]",u?"block":"hidden")}>{U}</aside>
            <div className="flex min-w-0 flex-1 flex-col">
              {F.length>0&&<div className="mb-4 flex flex-wrap items-center gap-2">
                {F.map(e=>(
                  <span key={e.key} className={_}>
                                {e.swatch&&<span className={d("inline-block size-2 shrink-0",b,"size-[10px]")} style={{backgroundColor:e.swatch}} />}
                                {e.label}
                                <button type="button" aria-label={`Remove ${e.label} filter`} onClick={e.clear} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                                  <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                                </button>
                              </span>
                ))}
                <button type="button" onClick={()=>a(R)} className={y}>Clear all</button>
              </div>}
              {0===H.length?<div className={d(g,"flex-1 items-center justify-center px-6 py-16 text-center")}>
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">Nothing matches these filters</p>
                <p className={d("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-[280px]")}>Widen the price range or clear a facet to see more of the collection.</p>
                <button type="button" onClick={()=>a(R)} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",h,"mt-5")}>Clear all filters</button>
              </div>:<ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {H.map(e=>{
                  let a=S.find(a=>a.value===e.glaze);
                  return (
                    <li key={e.id}>
                                    <article className={d(g,"cursor-pointer p-1")}>
                                      <div className={d(b,"rounded-[var(--rb-r-sm,6px)]","aspect-square")} style={{backgroundColor:a?.hex}} />
                                      <div className="px-2 pt-2.5 pb-1.5">
                                        <p className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{e.name}</p>
                                        <div className="mt-0.5 flex items-baseline justify-between gap-2">
                                          <span className={d(j,"truncate")}>{A.find(a=>a.value===e.maker)?.label}</span>
                                          <span className={d(p,"shrink-0 tabular-nums")}>{P(e.price)}</span>
                                        </div>
                                      </div>
                                    </article>
                                  </li>
                  );
                })}
              </ul>}
            </div>
          </div>
        </div>
      </div>
  );
}


export default W;
