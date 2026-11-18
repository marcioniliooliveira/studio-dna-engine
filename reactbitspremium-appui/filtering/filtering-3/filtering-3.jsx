/**
 * React Bits Pro — Application UI (filtering-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, kind, label, observe, operators, options, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_58770 = [["path",{d:"M8.85746 12.5061C6.36901 10.6456 4.59564 8.59915 3.62734 7.44867C3.3276 7.09253 3.22938 6.8319 3.17033 6.3728C2.96811 4.8008 2.86701 4.0148 3.32795 3.5074C3.7889 3 4.60404 3 6.23433 3H17.7657C19.396 3 20.2111 3 20.672 3.5074C21.133 4.0148 21.0319 4.8008 20.8297 6.37281C20.7706 6.83191 20.6724 7.09254 20.3726 7.44867C19.403 8.60062 17.6261 10.6507 15.1326 12.5135C14.907 12.6821 14.7583 12.9567 14.7307 13.2614C14.4837 15.992 14.2559 17.4876 14.1141 18.2442C13.8853 19.4657 12.1532 20.2006 11.226 20.8563C10.6741 21.2466 10.0043 20.782 9.93278 20.1778C9.79643 19.0261 9.53961 16.6864 9.25927 13.2614C9.23409 12.9539 9.08486 12.6761 8.85746 12.5061Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  p = "bg-white dark:bg-neutral-900",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  m = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  v = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  f = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  k = "flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1",
  g = "text-neutral-900 dark:text-neutral-100",
  w = "min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",
  _ = "relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40",
  y = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  j = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  N = "text-right tabular-nums",
  S = b("text-[13px]/[18px] font-normal",x),
  C = b("text-[12px]/[16px] font-normal tabular-nums",x),
  A = b(p,"border border-neutral-900/10 dark:border-neutral-100/14","rounded-[var(--rb-r-lg,10px)]","shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]");

function L({id:e,value:a,onChange:r,options:s,disabled:d,placeholder:u="Select…",className:c,triggerClassName:p,leading:x,ariaLabel:h}){
  let m=useId(),[v,f]=useState(false),[k,g]=useState(0),[y,j]=useState(false),[N,S]=useState(),A=useRef(null),L=useRef(null),z=useRef({buffer:"",at:0}),E=s.findIndex(e=>e.value===a),R=E>=0?s[E]:undefined,M=e=>{
    if(d)return;
    let a=A.current,r=a?.ownerDocument.defaultView;
    if(a&&r){
      let e=a.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        t=Math.max(t,a.top),l=Math.min(l,a.bottom);
        break
      }
      let n=l-e.bottom,i=e.top-t,o=Math.min(32*s.length+8,264),d=n<o+8&&i>n,u=(d?i:n)-8;
      j(d),S(u<o?Math.max(u,40):undefined)
    }
    g(e??(E>=0?E:0)),f(true)
  };
  useEffect(()=>{
    if(!v)return;
    let e=A.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||f(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [v]),useEffect(()=>{
    if(!v)return;
    let e=L.current,a=e?.querySelector(`[data-index="${k}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [v,k]);
  let D=e=>{
    let a=s[e];
    a&&(r(a.value),f(false),A.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={A} className={b("relative",c)}>
        <button id={e} type="button" role="combobox" aria-expanded={v} aria-controls={m} aria-haspopup="listbox" disabled={d} onClick={()=>v?f(false):M()} onKeyDown={e=>{
          if(!d){
            if(!v){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),M());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),f(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),g(e=>Math.min(e+1,s.length-1));else if("ArrowUp"===e.key)e.preventDefault(),g(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),g(0);else if("End"===e.key)e.preventDefault(),g(s.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),D(k);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=z.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=s.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&g(t)
            }
          }
        }} aria-label={h} className={b("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",p)}>
          <span className="flex min-w-0 items-center gap-2">
            {x}
            <span className={b("truncate",!R&&"text-neutral-900/66 dark:text-neutral-100/66")}>{R?R.label:u}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {v&&<ul ref={L} id={m} role="listbox" tabIndex={-1} style={{maxHeight:N}} className={b(w,"absolute z-30 max-h-[264px] w-full min-w-[100%]",y?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,r)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={r} data-highlighted={r===k||undefined} onMouseEnter={()=>g(r)} onClick={()=>D(r)} className={b(_,"pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={b(C,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let z = [{value:"lead",label:"Lead"},{value:"qualified",label:"Qualified"},{value:"proposal",label:"Proposal"},{value:"negotiation",label:"Negotiation"},{value:"won",label:"Won"},{value:"lost",label:"Lost"}],
  E = {lead:g,qualified:g,proposal:g,negotiation:g,won:"text-neutral-900/80 dark:text-neutral-100/80",lost:"text-neutral-900/66 dark:text-neutral-100/66"},
  R = [{value:"amara",label:"Amara Osei",initials:"AO"},{value:"raj",label:"Raj Patel",initials:"RP"},{value:"lena",label:"Lena Fischer",initials:"LF"},{value:"marco",label:"Marco Bianchi",initials:"MB"}],
  M = R.map(e=>({value:e.value,label:e.label})),
  D = [{id:"d1",name:"Harborline renewal",company:"Harborline Supply",stage:"negotiation",owner:"amara",value:48e3,close:"Aug 14",probability:70},{id:"d2",name:"Meridian expansion",company:"Meridian Labs",stage:"proposal",owner:"raj",value:32e3,close:"Aug 22",probability:55},{id:"d3",name:"Kestrel pilot",company:"Kestrel Robotics",stage:"qualified",owner:"lena",value:12e3,close:"Sep 03",probability:30},{id:"d4",name:"Foxglove migration",company:"Foxglove Media",stage:"negotiation",owner:"marco",value:76e3,close:"Aug 09",probability:80},{id:"d5",name:"Anvil onboarding",company:"Anvil Logistics",stage:"lead",owner:"amara",value:8e3,close:"Sep 18",probability:15},{id:"d6",name:"Cobalt upsell",company:"Cobalt Health",stage:"proposal",owner:"raj",value:21e3,close:"Aug 28",probability:50},{id:"d7",name:"Rivermark deal",company:"Rivermark Foods",stage:"won",owner:"lena",value:54e3,close:"Jul 30",probability:100},{id:"d8",name:"Two Rivers expansion",company:"Two Rivers Coffee",stage:"qualified",owner:"marco",value:15500,close:"Sep 11",probability:35},{id:"d9",name:"Stonepath platform",company:"Stonepath Systems",stage:"negotiation",owner:"amara",value:12e4,close:"Aug 05",probability:65},{id:"d10",name:"Verdant build",company:"Verdant Studio",stage:"lead",owner:"raj",value:6500,close:"Sep 25",probability:10},{id:"d11",name:"Silt & Vine renewal",company:"Silt & Vine",stage:"proposal",owner:"lena",value:28e3,close:"Aug 19",probability:60},{id:"d12",name:"Summit Chalet retrofit",company:"Summit Chalet",stage:"lost",owner:"marco",value:4e4,close:"Jul 22",probability:0},{id:"d13",name:"Skyward rollout",company:"Skyward Air",stage:"negotiation",owner:"amara",value:95e3,close:"Aug 12",probability:75},{id:"d14",name:"Marginalia upgrade",company:"Marginalia Press",stage:"qualified",owner:"raj",value:18e3,close:"Sep 08",probability:40},{id:"d15",name:"Longitude booking suite",company:"Longitude Travel",stage:"proposal",owner:"lena",value:24500,close:"Aug 30",probability:45},{id:"d16",name:"Thornbury financing",company:"Thornbury Bank",stage:"won",owner:"marco",value:67e3,close:"Jul 28",probability:100},{id:"d17",name:"Halden Research POC",company:"Halden Research",stage:"lead",owner:"amara",value:9500,close:"Sep 20",probability:20},{id:"d18",name:"Fine Arts curriculum",company:"Fine Arts Collective",stage:"qualified",owner:"raj",value:13500,close:"Sep 14",probability:25}],
  H = [{value:"stage",label:"Stage",kind:"enum",operators:["is","is_not"],options:z},{value:"owner",label:"Owner",kind:"enum",operators:["is","is_not"],options:M},{value:"company",label:"Company",kind:"text",operators:["contains","not_contains"]},{value:"value",label:"Deal value",kind:"number",operators:["gt","lt"]},{value:"probability",label:"Probability",kind:"number",operators:["gt","lt"]}],
  T = {is:"is",is_not:"is not",contains:"contains",not_contains:"does not contain",gt:"greater than",lt:"less than"},
  q = H.map(e=>({value:e.value,label:e.label})),
  F = e=>H.find(a=>a.value===e),
  W = e=>`$${e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`,
  V = e=>{
  let a=F(e);
  return "enum"===a.kind?a.options?.[0]?.value??"":"";
},
  O = 0,
  P = ()=>`q${O+=1}`,
  B = [{value:"all",label:"All deals",build:()=>[]},{value:"mine",label:"My deals",build:()=>[{id:P(),field:"owner",operator:"is",value:"amara"}]},{value:"late",label:"Late stage",build:()=>[{id:P(),field:"stage",operator:"is",value:"negotiation"}]},{value:"high",label:"High value",build:()=>[{id:P(),field:"value",operator:"gt",value:"50000"}]}];

function $(){
  let e=useRef(null),a=useRef(null),{ref:r,edges:i,onScroll:o}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),[g,M]=useState("all"),[O,$]=useState(()=>[{id:P(),field:"stage",operator:"is_not",value:"lost"},{id:P(),field:"value",operator:"gt",value:"10000"}]),[I,J]=useState(""),[K,U]=useState(null);
  useEffect(()=>{
    if(!K)return;
    let r=e.current?.ownerDocument;
    if(!r)return;
    let t=e=>{
      a.current&&!a.current.contains(e.target)&&U(null)
    },l=e=>{
      "Escape"===e.key&&U(null)
    };
    return r.addEventListener("mousedown",t),r.addEventListener("touchstart",t),r.addEventListener("keydown",l),()=>{
      r.removeEventListener("mousedown",t),r.removeEventListener("touchstart",t),r.removeEventListener("keydown",l)
    };
  }, [K]);
  let Q=(e,a)=>{
    $(r=>r.map(r=>r.id===e?{...r,...a}:r)),M("")
  },Y=()=>{
    $([]),J(""),M("all"),U(null)
  },G=useMemo(()=>{
    let e=I.trim().toLowerCase();
    return D.filter(a=>(!e||!!a.name.toLowerCase().includes(e)||!!a.company.toLowerCase().includes(e))&&O.every(e=>((e,a)=>{
      let r=F(a.field);
      if("enum"===r.kind){
        let r=String(e[a.field]);
        return "is"===a.operator?r===a.value:r!==a.value;
      }
      if("text"===r.kind){
        let r=a.value.trim().toLowerCase();
        if(!r)return true;
        let t=String(e[a.field]).toLowerCase();
        return "contains"===a.operator?t.includes(r):!t.includes(r);
      }
      if(""===a.value.trim())return true;
      let t=Number(a.value);
      if(Number.isNaN(t))return true;
      let l=Number(e[a.field]);
      return "gt"===a.operator?l>t:l<t;
    })(a,e)));
  }, [O,I]),X=useMemo(()=>G.reduce((e,a)=>e+a.value,0), [G]),Z=O.length>0||""!==I.trim();
  return (
    <div ref={e} className={b("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[900px] w-full flex-col overflow-hidden p-6 sm:p-8")}>
        <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col">
          <header className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Deal pipeline</h2>
              <p className={b(S,"mt-1 flex flex-wrap gap-x-3")}>
                <span>
                  <span className="tabular-nums">{G.length}</span>
                  {" of"}
                  {" "}
                  <span className="tabular-nums">{D.length}</span>
                  {" deals"}
                </span>
                <span>
                  <span className="tabular-nums">{W(X)}</span>
                  {" "}
                  weighted
                </span>
              </p>
            </div>
            <div className="-m-1 max-w-[calc(100%+8px)] overflow-x-auto p-1 [scrollbar-width:none]">
              <div className="w-max">
                <div role="radiogroup" aria-label="Saved views" className={b("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
                  {B.map(e=>{
                    let a=g===e.value;
                    return (
                      <button key={e.value} type="button" role="radio" aria-checked={a} onClick={()=>{
                                        var a;
                                        let r;
                                        return M(a=e.value),void($((r=B.find(e=>e.value===a))?r.build():[]),U(null));
                                      }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e.label}</button>
                    );
                  })}
                </div>
              </div>
            </div>
          </header>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px] flex-1">
              <div className={b(v,"h-8")}>
                <span data-affix className={k}>
                  <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <input type="text" value={I} onChange={e=>J(e.target.value)} placeholder="Search deals or companies…" aria-label="Search deals" className={f} />
                {I&&<span data-affix className={k}>
                  <button type="button" aria-label="Clear search" onClick={()=>J("")} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-6 rounded-[var(--rb-r-sm,6px)]")}>
                    <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </span>}
              </div>
            </div>
            <div className="relative" ref={"add"===K?a:undefined}>
              <button type="button" aria-haspopup="menu" aria-expanded={"add"===K} onClick={()=>U(e=>"add"===e?null:"add")} className={b(h,m)}>
                <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                Add filter
              </button>
              {"add"===K&&<div role="menu" className={b(w,"absolute top-full right-0 z-30 mt-1.5 w-52")}>
                <p className="px-2 pt-2 pb-1 text-[12px]/[16px] font-normal tabular-nums text-neutral-900/66 dark:text-neutral-100/66">Filter by field</p>
                {H.map(e=>(
                  <button key={e.value} type="button" role="menuitem" onClick={()=>{
                                var a;
                                let r,t;
                                return r=F(a=e.value),t={id:P(),field:a,operator:r.operators[0],value:V(a)},void($(e=>[...e,t]),M(""),U(t.id));
                              }} className={_}>
                                <HugeiconsIcon icon={Icon_58770} size={14} strokeWidth={1.8} aria-hidden="true" />
                                {e.label}
                              </button>
                ))}
              </div>}
            </div>
          </div>
          {O.length>0&&<div className="mt-3 flex flex-wrap items-center gap-2">
            {O.map(e=>{
              let r,l=F(e.field),i=K===e.id;
              return (
                <div key={e.id} className="relative" ref={i?a:undefined}>
                            <div className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                              <button type="button" aria-haspopup="dialog" aria-expanded={i} onClick={()=>U(a=>a===e.id?null:e.id)} className={b("min-w-0 truncate outline-none after:absolute after:inset-0 after:rounded-[var(--rb-r-sm,6px)] after:content-[''] focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:after:outline-[var(--rb-accent,oklch(100%_0_0))]","flex h-full items-center gap-1.5")}>
                                <span className={x}>{label}</span>
                                <span className={x}>{T[e.operator]}</span>
                                <span className="tabular-nums">
                                  {"enum"===(r=F(e.field)).kind?r.options?.find(a=>a.value===e.value)?.label??e.value:""===e.value.trim()?"…":"number"===r.kind&&"value"===e.field?W(Number(e.value)):"number"===r.kind&&"probability"===e.field?`${e.value}%`:e.value}
                                </span>
                              </button>
                              <button type="button" aria-label={`Remove ${label} filter`} onClick={()=>{
                                var a;
                                return a=e.id,void($(e=>e.filter(e=>e.id!==a)),M(""),K===a&&U(null));
                              }} className={b("-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100","relative")}>
                                <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                              </button>
                            </div>
                            {i&&<div role="dialog" aria-label={`Edit ${label} filter`} className={b(A,"absolute top-full left-0 z-30 mt-1.5 w-64 p-3")}>
                              <div className="space-y-2">
                                <L value={e.field} onChange={a=>{
                                  var r;
                                  let t;
                                  return r=e.id,t=F(a),void Q(r,{field:a,operator:t.operators[0],value:V(a)});
                                }} options={q} ariaLabel="Field" />
                                <L value={e.operator} onChange={a=>Q(e.id,{operator:a})} options={operators.map(e=>({value:e,label:T[e]}))} ariaLabel="Operator" />
                                {"enum"===kind?<L value={e.value} onChange={a=>Q(e.id,{value:a})} options={options??[]} ariaLabel="Value" />:<div className={b(v,"h-8")}>
                                  <input type={"number"===kind?"number":"text"} value={e.value} onChange={a=>Q(e.id,{value:a.target.value})} placeholder={"number"===kind?"Enter a number":"Enter text"} aria-label="Value" className={f} />
                                </div>}
                              </div>
                            </div>}
                          </div>
              );
            })}
            <button type="button" onClick={Y} className="inline-flex h-7 cursor-pointer items-center rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80 decoration-1 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100">Clear all</button>
          </div>}
          <div className={b("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","mt-4 min-h-0 flex-1")}>
            <div ref={r} onScroll={o} className="min-h-0 flex-1 overflow-auto">
              {0===G.length?<div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                <div className={b("text-neutral-900/80 dark:text-neutral-100/80","mb-3 flex h-10 w-10 items-center justify-center")}>
                  <HugeiconsIcon icon={Icon_58770} size={20} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No deals match this query</p>
                <p className={b("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-xs")}>Loosen an operator or remove a filter to widen the pipeline.</p>
                {Z&&<button type="button" onClick={Y} className={b(h,m,"mt-4")}>Clear all filters</button>}
              </div>:<table className="w-full border-separate border-spacing-0 text-left text-[14px]/[20px]">
                <caption className="sr-only">Filtered deals</caption>
                <thead>
                  <tr className={b(p,"sticky top-0 z-20")}>
                    <th scope="col" className={b(y,"h-9 min-w-[180px] sm:first:ps-5")}>Deal</th>
                    <th scope="col" className={b(y,"h-9 min-w-[140px]")}>Stage</th>
                    <th scope="col" className={b(y,"h-9 min-w-[150px]")}>Owner</th>
                    <th scope="col" className={b(y,"h-9")}><span className={b(N,"block")}>Value</span></th>
                    <th scope="col" className={b(y,"h-9")}><span className={b(N,"block")}>Prob.</span></th>
                    <th scope="col" className={b(y,"h-9 sm:last:pe-5")}><span className={b(N,"block")}>Close</span></th>
                  </tr>
                </thead>
                <tbody>
                  {G.map(e=>{
                    let a,r=R.find(a=>a.value===e.owner);
                    return (
                      <tr key={e.id} className={b("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-11")}>
                                        <td className={b(j,"sm:first:ps-5")}>
                                          <span className={b("text-[14px]/[16px] font-[450]","block truncate")}>{e.name}</span>
                                          <span className={b(C,"block truncate")}>{e.company}</span>
                                        </td>
                                        <td className={j}>
                                          <span className={b("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",E[e.stage])}>{a=e.stage,z.find(e=>e.value===a)?.label??a}</span>
                                        </td>
                                        <td className={j}>
                                          <span className="inline-flex items-center gap-2">
                                            <span className={b("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                                              <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{r?.initials.charAt(0)}</span>
                                            </span>
                                            <span className="truncate">{r?.label}</span>
                                          </span>
                                        </td>
                                        <td className={b(j,N)}>{W(e.value)}</td>
                                        <td className={b(j,N)}>
                                          {e.probability}
                                          %
                                        </td>
                                        <td className={b(j,N,"sm:last:pe-5")}>{e.close}</td>
                                      </tr>
                    );
                  })}
                </tbody>
              </table>}
            </div>
            <div aria-hidden="true" className={b("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-9 h-8",i.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={b("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default $;
