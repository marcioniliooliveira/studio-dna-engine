/**
 * React Bits Pro — Application UI (list-12)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_80969 = [["path",{d:"M20 15.0057V10.6606C20 9.84276 20 9.43383 19.8478 9.06613C19.6955 8.69843 19.4065 8.40927 18.8284 7.83096L14.0919 3.09236C13.593 2.59325 13.3436 2.3437 13.0345 2.19583C12.9702 2.16508 12.9044 2.13778 12.8372 2.11406C12.5141 2 12.1614 2 11.4558 2C8.21082 2 6.58831 2 5.48933 2.88646C5.26731 3.06554 5.06508 3.26787 4.88607 3.48998C4 4.58943 4 6.21265 4 9.45908V14.0052C4 17.7781 4 19.6645 5.17157 20.8366C6.11466 21.7801 7.52043 21.9641 10 22M13 2.50022V3.00043C13 5.83009 13 7.24492 13.8787 8.12398C14.7574 9.00304 16.1716 9.00304 19 9.00304H19.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.3267 22L13.1155 20.9142C12.3718 20.2475 12 19.9142 12 19.5C12 19.0858 12.3718 18.7525 13.1155 18.0858L14.3267 17M17.6733 22L18.8845 20.9142C19.6282 20.2475 20 19.9142 20 19.5C20 19.0858 19.6282 18.7525 18.8845 18.0858L17.6733 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_22776 = [["circle",{cx:"7.5",cy:"7.5",r:"1.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424",stroke:"currentColor",strokeWidth:"1.5",key:"2"}]];
const Icon_56328 = [["path",{d:"M2.5 20V8.87695C2.5 7.58945 2.5 6.9457 2.78533 6.47048C2.9541 6.18939 3.18939 5.9541 3.47048 5.78533C3.9457 5.5 4.59449 5.5 5.89206 5.5C6.52339 5.5 6.83906 5.5 7.12612 5.58819C7.31759 5.64702 7.49914 5.73428 7.66469 5.84705C7.91289 6.01611 8.10859 6.26074 8.5 6.75C8.89141 7.23926 9.08711 7.48389 9.33531 7.65295C9.50086 7.76572 9.68241 7.85298 9.87388 7.91181C10.1609 8 10.4742 8 11.1008 8H15C16.4045 8 17.1067 8 17.6111 8.33706C17.8295 8.48298 18.017 8.67048 18.1629 8.88886C18.5 9.39331 18.5 10.0955 18.5 11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.42028 14.0144L3.63368 16.0144C2.65618 18.4998 2.16743 19.7425 2.7524 20.6213C3.33737 21.5 4.65337 21.5 7.28537 21.5H15.1903C16.4249 21.5 17.0422 21.5 17.5295 21.1795C18.0169 20.859 18.2702 20.2865 18.7769 19.1415L19.6618 17.1415C20.7866 14.5992 21.349 13.3281 20.7679 12.4141C20.1868 11.5 18.8163 11.5 16.0752 11.5H8.07196C6.78232 11.5 6.1375 11.5 5.63811 11.8439C5.13872 12.1877 4.89924 12.7966 4.42028 14.0144Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M11.5 4.51456C12.4151 3.28409 13.6662 2.55594 15.5125 2.50161C16.1155 2.48386 16.7152 2.61395 17.2682 2.85544C18.5748 3.42601 19.4185 4.15644 20 5.5L21.5 3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_8051 = [["path",{d:"M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  p = "text-neutral-900 dark:text-neutral-100",
  h = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  m = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  f = "shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66",
  k = [{id:"src",name:"src",type:"folder",children:[{id:"components",name:"components",type:"folder",children:[{id:"button",name:"Button.tsx",type:"file",kind:"code",size:"2.4 KB"},{id:"modal",name:"Modal.tsx",type:"file",kind:"code",size:"3.1 KB"},{id:"icons",name:"icons",type:"folder",children:[{id:"logo",name:"logo.svg",type:"file",kind:"image",size:"1.2 KB"},{id:"spinner",name:"spinner.svg",type:"file",kind:"image",size:"0.8 KB"}]}]},{id:"hooks",name:"hooks",type:"folder",children:[{id:"use-auth",name:"use-auth.ts",type:"file",kind:"code",size:"1.6 KB"},{id:"use-theme",name:"use-theme.ts",type:"file",kind:"code",size:"0.9 KB"}]},{id:"lib",name:"lib",type:"folder",children:[{id:"api",name:"api.ts",type:"file",kind:"code",size:"4.2 KB"},{id:"format",name:"format.ts",type:"file",kind:"code",size:"1.1 KB"}]},{id:"styles",name:"styles.css",type:"file",kind:"text",size:"5.0 KB"},{id:"index",name:"index.ts",type:"file",kind:"code",size:"0.4 KB"}]},{id:"public",name:"public",type:"folder",children:[{id:"favicon",name:"favicon.png",type:"file",kind:"image",size:"4.5 KB"},{id:"og",name:"og-image.png",type:"file",kind:"image",size:"88 KB"}]},{id:"readme",name:"README.md",type:"file",kind:"text",size:"6.2 KB"},{id:"pkg",name:"package.json",type:"file",kind:"code",size:"1.9 KB"},{id:"tsconfig",name:"tsconfig.json",type:"file",kind:"code",size:"0.6 KB"},{id:"gitignore",name:".gitignore",type:"file",kind:"text",size:"0.2 KB"}],
  v = {code:Icon_80969,text:Icon_31964,image:Icon_22776},
  g = function e(t,r=[]){
  for(let a of t)"folder"===a.type&&(r.push(a.id),e(a.children,r));
  return r;
}(k);

function w(){
  let[e,t]=useState(()=>new Set(["src","components"])),[r,l]=useState(null),[s,o]=useState(k[0].id),{ref:w,edges:_,onScroll:y}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),j=useRef({}),N=useRef(false),A=useMemo(()=>(function e(t,r,a=0,n=null,i=[]){
    for(let[l,s]of t.entries()){
      let o="folder"===s.type;
      i.push({node:s,depth:a,parentId:n,hasChildren:o&&s.children.length>0,posInSet:l+1,setSize:t.length}),o&&r.has(s.id)&&e(s.children,r,a+1,s.id,i)
    }
    return i;
  })(k,e), [e]),z=A.findIndex(e=>e.node.id===s),S=-1===z?0:z,C=A[S]?.node.id??k[0].id;
  useEffect(()=>{
    N.current&&(N.current=false,j.current[C]?.focus({preventScroll:true}))
  });
  let R=()=>{
    N.current=true
  },M=e=>t(t=>{
    let r=new Set(t);
    return r.has(e)?r.delete(e):r.add(e),r;
  }),T=e=>{
    o(e.node.id),"folder"===e.node.type?M(e.node.id):l(e.node.id)
  };
  return (
    <div className={x("bg-white dark:bg-neutral-950",p,"flex h-full min-h-[640px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex h-full w-full max-w-[720px] flex-col">
          <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em]",p)}>Repository</h2>
              <p className={x("text-[13px]/[18px] font-normal",h,"mt-0.5 truncate")}>
                <span>acme/web</span>
                <span className="ms-3">main</span>
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button type="button" onClick={()=>t(new Set(g))} className={x(b,m)}>Expand all</button>
              <button type="button" onClick={()=>{
                t(new Set),o(k[0].id)
              }} className={x(b,m)}>Collapse all</button>
            </div>
          </div>
          <div className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","min-h-0 flex-1")}>
            <div ref={w} onScroll={y} style={{touchAction:"pan-y"}} className="min-h-0 flex-1 overflow-y-auto p-2">
              <div role="tree" aria-label="Repository files" onKeyDown={t=>{
                let r,a=A[S];
                if(!a)return;
                let n="folder"===a.node.type,i=n&&(r=a.node.id,e.has(r));
                switch(t.key){case"ArrowDown":t.preventDefault(),o(A[Math.min(S+1,A.length-1)].node.id),R();break;case"ArrowUp":t.preventDefault(),o(A[Math.max(S-1,0)].node.id),R();break;case"ArrowRight":if(t.preventDefault(),n&&!i&&a.hasChildren)M(a.node.id);else if(i){
                  let e=A[S+1];
                  e&&e.parentId===a.node.id&&(o(e.node.id),R())
                }break;case"ArrowLeft":t.preventDefault(),i?M(a.node.id):a.parentId&&(o(a.parentId),R());break;case"Home":t.preventDefault(),o(A[0].node.id),R();break;case"End":t.preventDefault(),o(A[A.length-1].node.id),R();break;case"Enter":case" ":t.preventDefault(),T(a)}
              }}>
                {A.map(t=>{
                  let n,{node:l,depth:s}=t,o="folder"===l.type,b=o&&(n=l.id,e.has(n)),m=l.id===C,k=l.id===r,g=o?b?Icon_56328:Icon_8051:v[l.kind];
                  return (
                    <div key={l.id} ref={e=>{
                                    j.current[l.id]=e
                                  }} role="treeitem" aria-level={s+1} aria-posinset={t.posInSet} aria-setsize={t.setSize} aria-expanded={o?b:undefined} aria-selected={o?undefined:k} tabIndex={m?0:-1} onClick={()=>T(t)} style={{paddingLeft:8+16*s}} className={x("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","rounded-[var(--rb-r-sm,6px)]",k?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","group h-11 cursor-pointer gap-x-[6px] pr-2")}>
                                    {Array.from({length:s},(e,t)=><span key={t} aria-hidden="true" className={x("border-r border-neutral-900/8 dark:border-neutral-100/8","pointer-events-none absolute top-0 bottom-0")} style={{left:8+16*t+8}} />)}
                                    {o?<span aria-hidden="true" className="flex h-4 w-4 shrink-0 items-center justify-center">
                                      <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                    </span>:<span aria-hidden="true" className="h-4 w-4 shrink-0" />}
                                    <HugeiconsIcon icon={g} size={16} strokeWidth={1.8} aria-hidden="true" className={x(h,"shrink-0")} />
                                    <span className={x("text-[14px]/[16px] font-[450]",p,"min-w-0 flex-1 truncate")}>{l.name}</span>
                                    {o?!b&&<span className={f}>
                                      {l.children.length}
                                      {" "}
                                      {1===l.children.length?"item":"items"}
                                    </span>:<span className={f}>{l.size}</span>}
                                  </div>
                  );
                })}
              </div>
            </div>
            <div aria-hidden="true" className={x("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",_.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",_.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default w;
