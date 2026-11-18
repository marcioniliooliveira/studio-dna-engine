/**
 * React Bits Pro — Application UI (filtering-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { key, left, preventDefault, useEffect, useId, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_87924 = [["path",{d:"M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[13px]/[18px] font-normal",
  h = "text-[14px]/[16px] font-[450]",
  m = "text-[12px]/[16px] font-normal tabular-nums",
  k = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  f = "min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",
  _ = "relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40",
  v = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  g = "inline-flex h-7 cursor-pointer items-center rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80 decoration-1 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100";

function w({id:e,value:r,onChange:a,options:s,disabled:c,placeholder:d="Select…",className:b,triggerClassName:p,leading:h,ariaLabel:k}){
  let v=useId(),[g,w]=useState(false),[y,j]=useState(0),[N,S]=useState(false),[C,E]=useState(),R=useRef(null),L=useRef(null),P=useRef({buffer:"",at:0}),A=s.findIndex(e=>e.value===r),M=A>=0?Icon_89289:undefined,z=e=>{
    if(c)return;
    let r=R.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,n=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),n=Math.min(n,r.bottom);
        break
      }
      let l=n-e.bottom,i=e.top-t,o=Math.min(32*s.length+8,264),c=l<o+8&&i>l,d=(c?i:l)-8;
      S(c),E(d<o?Math.max(d,40):undefined)
    }
    j(e??(A>=0?A:0)),w(true)
  };
  useEffect(()=>{
    if(!g)return;
    let e=R.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||w(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [g]),useEffect(()=>{
    if(!g)return;
    let e=L.current,r=e?.querySelector(`[data-index="${y}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [g,y]);
  let D=e=>{
    let r=s[e];
    r&&(a(r.value),w(false),R.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={R} className={u("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={g} aria-controls={v} aria-haspopup="listbox" disabled={c} onClick={()=>g?w(false):z()} onKeyDown={e=>{
          if(!c){
            if(!g){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),z());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),w(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),j(e=>Math.min(e+1,s.length-1));else if("ArrowUp"===e.key)e.preventDefault(),j(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),j(0);else if("End"===e.key)e.preventDefault(),j(s.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),D(y);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=P.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=s.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&j(t)
            }
          }
        }} aria-label={k} className={u("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",p)}>
          <span className="flex min-w-0 items-center gap-2">
            {h}
            <span className={u("truncate",!M&&"text-neutral-900/66 dark:text-neutral-100/66")}>{M?M.label:d}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {g&&<ul ref={L} id={v} role="listbox" tabIndex={-1} style={{maxHeight:C}} className={u(f,"absolute z-30 max-h-[264px] w-full min-w-[100%]",N?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,a)=>{
            let n=e.value===r;
            return (
              <li key={e.value} role="option" aria-selected={n} data-index={a} data-highlighted={a===y||undefined} onMouseEnter={()=>j(a)} onClick={()=>D(a)} className={u(_,"pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={u(m,x,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function y({min:e,max:r,step:a=1,value:l,onChange:i,format:o,labels:s}){
  let c=useRef(null),[d,u]=useState(null),b=t=>Math.min(r,Math.max(e,Math.round(t/a)*a)),x=a=>(a-e)/(r-e)*100,p=a=>{
    let t=c.current;
    if(!t)return e;
    let n=t.getBoundingClientRect();
    return 0===width?e:b(e+(a-left)/width*(r-e));
  },h=(e,r)=>{
    let[a,t]=l;
    0===e?i([Math.min(r,t),t]):i([a,Math.max(r,a)])
  },m=t=>({role:"slider",tabIndex:0,"aria-label":s[t],"aria-valuemin":e,"aria-valuemax":r,"aria-valuenow":l[t],"aria-valuetext":o(l[t]),style:{left:`${x(l[t])}%`,touchAction:"none"},onPointerDown:e=>{
    e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId),u(t)
  },onPointerMove:e=>{
    d===t&&h(t,p(e.clientX))
  },onLostPointerCapture:()=>u(null),onPointerUp:e=>{
    e.currentTarget.releasePointerCapture(e.pointerId),u(null)
  },onKeyDown:n=>{
    let i=Math.max(a,Math.round((r-e)/10)),o=l[t],s=null;
    "ArrowLeft"===key||"ArrowDown"===key?s=o-a:"ArrowRight"===key||"ArrowUp"===key?s=o+a:"PageDown"===key?s=o-i:"PageUp"===key?s=o+i:"Home"===key?s=e:"End"===key&&(s=r),null!==s&&(preventDefault(),h(t,b(s)))
  },className:"absolute top-1/2 block size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] shadow-[0_0_0_2px_white] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:shadow-[0_0_0_2px_var(--color-neutral-900)]"});
  return (
    <div ref={c} onPointerDown={e=>{
        let r=p(e.clientX);
        h(Math.abs(r-l[0])<=Math.abs(r-l[1])?0:1,r)
      }} className="relative flex h-4 w-full cursor-pointer touch-none items-center select-none">
        <span className="relative h-1 w-full grow rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8">
          <span className="absolute inset-y-0 rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))]" style={{left:`${x(l[0])}%`,width:`${x(l[1])-x(l[0])}%`}} />
        </span>
        <div {...m(0)} />
        <div {...m(1)} />
      </div>
  );
}

let j = ["TypeScript","React","GraphQL","Node.js","Go","Kubernetes","PostgreSQL","gRPC","Terraform","AWS","Python","Redis","Kafka","Rust"],
  N = [{value:"junior",label:"Junior"},{value:"mid",label:"Mid-level"},{value:"senior",label:"Senior"},{value:"staff",label:"Staff / Principal"}],
  S = [{value:"lisbon",label:"Lisbon"},{value:"berlin",label:"Berlin"},{value:"london",label:"London"},{value:"toronto",label:"Toronto"},{value:"austin",label:"Austin"}],
  C = [{id:"c1",name:"Ana Ferreira",title:"Senior Frontend Engineer",seniority:"senior",location:"lisbon",comp:165,remote:true,skills:["TypeScript","React","GraphQL","Node.js"]},{id:"c2",name:"Marcus Lindqvist",title:"Staff Backend Engineer",seniority:"staff",location:"berlin",comp:235,remote:false,skills:["Go","Kubernetes","PostgreSQL","gRPC"]},{id:"c3",name:"Priya Nair",title:"Senior Platform Engineer",seniority:"senior",location:"london",comp:210,remote:true,skills:["Go","Terraform","AWS","Kubernetes"]},{id:"c4",name:"Diego Santos",title:"Fullstack Engineer",seniority:"mid",location:"lisbon",comp:140,remote:true,skills:["TypeScript","React","Node.js","PostgreSQL"]},{id:"c5",name:"Hannah Weber",title:"Senior Backend Engineer",seniority:"senior",location:"berlin",comp:195,remote:false,skills:["Python","PostgreSQL","Redis","Kafka"]},{id:"c6",name:"Yuki Tanaka",title:"Staff Frontend Engineer",seniority:"staff",location:"toronto",comp:225,remote:true,skills:["TypeScript","React","GraphQL","Rust"]},{id:"c7",name:"Omar Haddad",title:"Backend Engineer",seniority:"mid",location:"london",comp:150,remote:false,skills:["Node.js","PostgreSQL","Redis","AWS"]},{id:"c8",name:"Sofia Rossi",title:"Senior Infrastructure Engineer",seniority:"senior",location:"berlin",comp:205,remote:true,skills:["Terraform","AWS","Kubernetes","Go"]},{id:"c9",name:"Liam O'Brien",title:"Junior Frontend Engineer",seniority:"junior",location:"london",comp:125,remote:false,skills:["TypeScript","React","Node.js"]},{id:"c10",name:"Chen Wei",title:"Staff Data Engineer",seniority:"staff",location:"toronto",comp:240,remote:true,skills:["Python","Kafka","PostgreSQL","AWS"]},{id:"c11",name:"Nadia Petrova",title:"Senior Backend Engineer",seniority:"senior",location:"austin",comp:190,remote:true,skills:["Rust","gRPC","Redis","Kubernetes"]},{id:"c12",name:"Tom\xe1s Alves",title:"Platform Engineer",seniority:"mid",location:"lisbon",comp:145,remote:true,skills:["Go","Terraform","AWS","PostgreSQL"]},{id:"c13",name:"Grace Kim",title:"Senior Fullstack Engineer",seniority:"senior",location:"toronto",comp:185,remote:false,skills:["TypeScript","React","Node.js","GraphQL"]},{id:"c14",name:"Felix Braun",title:"Junior Backend Engineer",seniority:"junior",location:"berlin",comp:130,remote:false,skills:["Python","PostgreSQL","Redis"]},{id:"c15",name:"Isabel Moreno",title:"Staff Frontend Engineer",seniority:"staff",location:"austin",comp:230,remote:true,skills:["TypeScript","React","Rust","GraphQL"]},{id:"c16",name:"Raj Mehta",title:"Infrastructure Engineer",seniority:"mid",location:"london",comp:155,remote:true,skills:["Kubernetes","Terraform","AWS","Go"]}],
  E = e=>`$${e}k`,
  R = [{value:"relevance",label:"Best match"},{value:"comp-high",label:"Compensation: high to low"},{value:"comp-low",label:"Compensation: low to high"},{value:"name",label:"Name"}],
  L = {skills:[],seniority:[],comp:[120,260],remote:false,location:"any"},
  P = (e,r,a)=>("skills"===a||!r.skills.length||!!r.skills.every(r=>e.skills.includes(r)))&&("seniority"===a||!r.seniority.length||!!r.seniority.includes(e.seniority))&&("comp"===a||!(e.comp<r.comp[0])&&!(e.comp>r.comp[1]))&&("remote"===a||!r.remote||!!e.remote)&&("location"===a||"any"===r.location||e.location===r.location)&&true;

function A({label:e,children:r}){
  return (
    <section className="py-5 first:pt-0">
        <h3 className={u(h,b,"mb-3")}>{e}</h3>
        {r}
      </section>
  );
}

function M(){
  let[e,r]=useState(L),[a,i]=useState("relevance"),[M,z]=useState(false),[D,T]=useState(""),[W,B]=useState(false),[K,Q]=useState(0),G=useRef(null),$=useRef(null),F=e=>r(r=>({...r,seniority:r.seniority.includes(e)?r.seniority.filter(r=>r!==e):[...r.seniority,e]})),I=e=>{
    r(r=>r.skills.includes(e)?r:{...r,skills:[...r.skills,e]}),T(""),Q(0),$.current?.focus({preventScroll:true})
  },H=e=>r(r=>({...r,skills:r.skills.filter(r=>r!==e)})),U=useMemo(()=>{
    let r=D.trim().toLowerCase();
    return j.filter(a=>!e.skills.includes(a)&&(""===r||a.toLowerCase().includes(r))).slice(0,6);
  }, [D,e.skills]),q=Math.min(K,Math.max(0,U.length-1));
  useEffect(()=>{
    if(!W)return;
    let e=G.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||B(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [W]);
  let J=useMemo(()=>{
    let r=C.filter(r=>P(r,e));
    return "comp-high"===a?[...r].sort((e,r)=>r.comp-e.comp):"comp-low"===a?[...r].sort((e,r)=>e.comp-r.comp):"name"===a?[...r].sort((e,r)=>e.name.localeCompare(r.name)):[...r].sort((r,a)=>{
      let t=r.skills.filter(r=>e.skills.includes(r)).length,n=a.skills.filter(r=>e.skills.includes(r)).length;
      return n!==t?n-t:a.comp-r.comp;
    });
  }, [e,a]),O=useMemo(()=>[{value:"any",label:"Any location"},...S.map(r=>({value:r.value,label:r.label,hint:String(C.filter(a=>P(a,e,"location")&&a.location===r.value).length)}))], [e]),X=120!==e.comp[0]||260!==e.comp[1],Y=[...e.skills.map(e=>({key:`skill:${e}`,label:e,clear:()=>H(e)})),...e.seniority.map(e=>({key:`seniority:${e}`,label:N.find(r=>r.value===e)?.label??e,clear:()=>F(e)})),...X?[{key:"comp",label:`${E(e.comp[0])} – ${E(e.comp[1])}`,clear:()=>r(e=>({...e,comp:[120,260]}))}]:[],...e.remote?[{key:"remote",label:"Remote only",clear:()=>r(e=>({...e,remote:false}))}]:[],..."any"!==e.location?[{key:"location",label:S.find(r=>r.value===e.location)?.label??"",clear:()=>r(e=>({...e,location:"any"}))}]:[]],V=<div className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
    <A label="Skills">
      <div ref={G} className="relative">
        <div data-concentric className={u("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","min-h-8","flex-wrap gap-1.5 p-1")} onClick={()=>{
          B(true),$.current?.focus({preventScroll:true})
        }}>
          {e.skills.map(e=>(
            <span key={e} className="relative inline-flex h-6 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                        {e}
                        <button type="button" aria-label={`Remove ${e} filter`} onClick={r=>{
                          r.stopPropagation(),H(e)
                        }} className="-me-1 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                          <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                        </button>
                      </span>
          ))}
          <input ref={$} type="text" value={D} onChange={e=>{
            T(e.target.value),B(true),Q(0)
          }} onFocus={()=>B(true)} onKeyDown={r=>{
            "Enter"===r.key?U.length&&(r.preventDefault(),I(U[q])):"Backspace"===r.key&&""===D&&e.skills.length?(r.preventDefault(),H(e.skills[e.skills.length-1])):"ArrowDown"===r.key?(r.preventDefault(),B(true),Q(e=>Math.min(e+1,U.length-1))):"ArrowUp"===r.key?(r.preventDefault(),Q(e=>Math.max(e-1,0))):"Escape"===r.key&&B(false)
          }} placeholder={e.skills.length?"Add skill…":"e.g. TypeScript"} aria-label="Add a required skill" className={u("h-full w-full min-w-0 flex-1 bg-transparent px-2 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]","min-w-[80px]")} />
        </div>
        {W&&U.length>0&&<ul role="listbox" className={u(f,"absolute z-30 mt-1.5 max-h-[220px] w-full")}>
          {U.map((e,r)=><li key={e} role="option" aria-selected={r===q} onMouseEnter={()=>Q(r)} onClick={()=>I(e)} className={_}>{e}</li>)}
        </ul>}
      </div>
      <p className={u("max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-2")}>Candidates must have every skill. Press Enter to add.</p>
    </A>
    <A label="Seniority">
      <ul className="-mx-2 space-y-0.5">
        {N.map(r=>{
          let a,n=(a=r.value,C.filter(r=>P(r,e,"seniority")&&r.seniority===a).length),i=e.seniority.includes(r.value);
          return (
            <li key={r.value}>
                        <label className={u(v,0===n&&!i&&"opacity-40")}>
                          <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                            <input type="checkbox" checked={i} onChange={()=>F(r.value)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                            <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{r.label}</span>
                          <span className={u("ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","shrink-0")}>{n}</span>
                        </label>
                      </li>
          );
        })}
      </ul>
    </A>
    <A label="Compensation">
      <div className="mb-4 flex min-h-7 items-center justify-between">
        <span className={u(h,b,"tabular-nums")}>
          {E(e.comp[0])}
          {" – "}
          {E(e.comp[1])}
        </span>
        {X&&<button type="button" onClick={()=>r(e=>({...e,comp:[120,260]}))} className={g}>Reset</button>}
      </div>
      <y min={120} max={260} step={5} value={e.comp} onChange={e=>r(r=>({...r,comp:e}))} format={E} labels={["Minimum compensation","Maximum compensation"]} />
    </A>
    <A label="Location & remote">
      <div className="space-y-3">
        <w value={e.location} onChange={e=>r(r=>({...r,location:e}))} options={O} ariaLabel="Filter by location" leading={<HugeiconsIcon icon={Icon_87924} size={16} strokeWidth={1.8} aria-hidden="true" className={u(x,"shrink-0")} />} />
        <div className="-mx-2">
          <label className={u(v,"justify-between")}>
            <span>Remote only</span>
            <button type="button" role="switch" aria-checked={e.remote} aria-label="Remote only" onClick={()=>r(e=>({...e,remote:!e.remote}))} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
              <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
            </button>
          </label>
        </div>
      </div>
    </A>
  </div>;
  return (
    <div className={u("bg-white dark:bg-neutral-950",b,"flex h-full min-h-[920px] w-full flex-col overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className={u("text-[20px]/[24px] font-[450] tracking-[-0.015em]",b)}>Candidate pool</h2>
              <p role="status" className={u(p,x,"mt-1")}>
                <span className={u(b,"tabular-nums")}>{J.length}</span>
                {" "}
                {"of "}
                <span className="tabular-nums">{C.length}</span>
                {" "}
                engineers
              </p>
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <button type="button" aria-expanded={M} onClick={()=>z(e=>!e)} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",k,"md:hidden")}>
                <HugeiconsIcon icon={Icon_68656} size={16} strokeWidth={1.8} aria-hidden="true" />
                Filters
                {Y.length>0&&<span className="tabular-nums">
                  (
                  {Y.length}
                  )
                </span>}
              </button>
              <w value={a} onChange={i} options={R} ariaLabel="Sort candidates" className="w-[248px]" />
            </div>
          </header>
          <div className="mt-6 flex flex-1 flex-col gap-6 md:flex-row md:gap-8">
            <aside className={u("w-full shrink-0 md:block md:w-[260px]",M?"block":"hidden")}>{V}</aside>
            <div className="flex min-w-0 flex-1 flex-col">
              {Y.length>0&&<div className="mb-4 flex flex-wrap items-center gap-2">
                {Y.map(e=>(
                  <span key={e.key} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                                {e.label}
                                <button type="button" aria-label={`Remove ${e.label} filter`} onClick={e.clear} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                                  <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                                </button>
                              </span>
                ))}
                <button type="button" onClick={()=>{
                  r(L),T("")
                }} className={g}>Clear all</button>
              </div>}
              {0===J.length?<div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No candidates match these filters</p>
                <p className={u("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-[300px]")}>Remove a required skill or widen the compensation range to grow the shortlist.</p>
                <button type="button" onClick={()=>{
                  r(L),T("")
                }} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",k,"mt-5")}>Clear all filters</button>
              </div>:<ul className="flex flex-col gap-2.5">
                {J.map(r=>{
                  let a=S.find(e=>e.value===r.location)?.label;
                  return (
                    <li key={r.id}>
                                    <article className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                                      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3.5 p-4">
                                        <span aria-hidden="true" className={u("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","col-start-1 row-start-1 row-end-3 size-[44px]")}>
                                          <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{r.name.split(" ").slice(0,2).map(e=>e[0]).join("").toUpperCase()}</span>
                                        </span>
                                        <div className="col-start-2 row-start-1 min-w-0">
                                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                            <p className={u(h,b,"truncate")}>{r.name}</p>
                                            <span className={u(p,x)}>{r.title}</span>
                                          </div>
                                        </div>
                                        <div className="col-start-2 row-start-2 mt-2 flex flex-wrap gap-1.5 max-sm:col-end-4">
                                          {r.skills.map(r=>{
                                            let a=e.skills.includes(r);
                                            return <span key={r} className={u("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",a?"bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100":"border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100")}>{r}</span>;
                                          })}
                                        </div>
                                        <div className="col-start-3 row-start-1 flex shrink-0 flex-col items-end gap-1 pl-1 sm:row-end-3">
                                          <span className={u(h,b,"tabular-nums")}>{E(r.comp)}</span>
                                          <span className={u(m,x,"inline-flex items-center gap-1")}>
                                            <HugeiconsIcon icon={Icon_87924} size={12} strokeWidth={1.8} aria-hidden="true" />
                                            {a}
                                            {r.remote&&<span className="ms-2">Remote</span>}
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
        </div>
      </div>
  );
}


export default M;
