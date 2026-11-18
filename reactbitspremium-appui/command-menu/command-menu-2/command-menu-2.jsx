/**
 * React Bits Pro — Application UI (command-menu-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_5642 = [["path",{d:"M8 6.50116H16.75C18.8567 6.50116 19.91 6.50116 20.6667 7.0069C20.9943 7.22584 21.2755 7.50717 21.4944 7.83484C22 8.59173 22 9.64538 22 11.7527C22 12.0122 22 12.2621 21.9997 12.5029M12 6.50116L11.3666 5.23392C10.8418 4.18406 10.3622 3.1273 9.19926 2.69106C8.6899 2.5 8.10802 2.5 6.94427 2.5C5.1278 2.5 4.21956 2.5 3.53806 2.88043C3.05227 3.15161 2.65142 3.55257 2.38032 4.03851C2 4.72021 2 5.62871 2 7.44571V10.5023C2 15.2177 2 17.5754 3.46447 19.0403C4.70529 20.2815 6.58687 20.4711 10 20.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"14",cy:"12.5",r:"2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"20",cy:"18.5",r:"2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 18.5C15.7909 18.5 14 16.7091 14 14.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M14 14.5V21.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_73804 = [["path",{d:"M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C12.8417 22 14 22.1163 14 21C14 20.391 13.6832 19.9212 13.3686 19.4544C12.9082 18.7715 12.4523 18.0953 13 17C13.6667 15.6667 14.7778 15.6667 16.4815 15.6667C17.3334 15.6667 18.3334 15.6667 19.5 15.5C21.601 15.1999 22 13.9084 22 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["circle",{cx:"9.5",cy:"8.5",r:"1.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["circle",{cx:"16.5",cy:"9.5",r:"1.5",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7.125 15H7M7.25 15C7.25 15.1381 7.13807 15.25 7 15.25C6.86193 15.25 6.75 15.1381 6.75 15C6.75 14.8619 6.86193 14.75 7 14.75C7.13807 14.75 7.25 14.8619 7.25 15Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_55171 = [["path",{d:"M18.4984 19.1511C17.3377 17.4018 15.2947 16.2009 12.9313 16.0569L11.9984 16C11.6652 16.0083 11.3547 16.0194 11.0617 16.0325C8.71722 16.1376 6.66598 17.3796 5.5 19.1511",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.9961 10C14.9961 11.6569 13.6529 13 11.9961 13C10.3392 13 8.99609 11.6569 8.99609 10C8.99609 8.34315 10.3392 7 11.9961 7C13.6529 7 14.9961 8.34315 14.9961 10Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90121 = [["path",{d:"M14.5 7H9.5C6.21252 7 4.56878 7 3.46243 7.90796C3.25989 8.07418 3.07418 8.25989 2.90796 8.46243C2 9.56878 2 11.2125 2 14.5C2 17.7875 2 19.4312 2.90796 20.5376C3.07418 20.7401 3.25989 20.9258 3.46243 21.092C4.56878 22 6.21252 22 9.5 22H14.5C17.7875 22 19.4312 22 20.5376 21.092C20.7401 20.9258 20.9258 20.7401 21.092 20.5376C22 19.4312 22 17.7875 22 14.5C22 11.2125 22 9.56878 21.092 8.46243C20.9258 8.25989 20.7401 8.07418 20.5376 7.90796C19.4312 7 17.7875 7 14.5 7Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 7V5C12 4.44772 12.4477 4 13 4C13.5523 4 14 3.55228 14 3V2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M7 12L8 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M11.5 12L12.5 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 12L17 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7 17L17 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_30553 = [["path",{d:"M14 21H16M14 21C13.1716 21 12.5 20.3284 12.5 19.5V17L12 17M14 21H10M10 21H8M10 21C10.8284 21 11.5 20.3284 11.5 19.5V17L12 17M12 17V21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16 3H8C5.17157 3 3.75736 3 2.87868 3.87868C2 4.75736 2 6.17157 2 9V11C2 13.8284 2 15.2426 2.87868 16.1213C3.75736 17 5.17157 17 8 17H16C18.8284 17 20.2426 17 21.1213 16.1213C22 15.2426 22 13.8284 22 11V9C22 6.17157 22 4.75736 21.1213 3.87868C20.2426 3 18.8284 3 16 3Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_80469 = [["path",{d:"M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_48419 = [["path",{d:"M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_33212 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 3.12589C8.88491 2.48978 9.95074 2.08864 11.1071 2.01285C11.3031 2 11.5353 2 11.9995 2C12.4638 2 12.696 2 12.892 2.01285C15.8965 2.20977 18.2898 4.60304 18.4867 7.60758C18.4995 7.80358 18.4995 8.03572 18.4995 8.5V9.8056C18.4995 10.5353 18.4995 10.9002 18.5356 11.254C18.6477 12.354 19.0187 13.4119 19.6184 14.3409C19.8113 14.6397 20.0392 14.9246 20.4951 15.4944L20.6648 15.7066C20.7508 15.814 20.8286 15.9113 20.8986 16",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18 18H4.43654C3.70878 18 3.3449 18 3.13431 17.8951C2.72509 17.6913 2.50621 17.2359 2.60268 16.789C2.65233 16.559 2.87964 16.2749 3.33427 15.7066L3.50401 15.4944C3.95985 14.9246 4.18779 14.6397 4.38067 14.3409C4.98035 13.4119 5.35143 12.354 5.46349 11.254C5.49954 10.9002 5.49954 10.5353 5.49954 9.8056V8.5C5.49954 8.03572 5.49954 7.80358 5.51239 7.60758C5.54913 7.04701 5.66232 6.50772 5.84168 6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 2L22 22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_52038 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20.8985 8C20.7706 6.69989 20.4816 5.82475 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C4.97975 21.6366 6.1277 21.8873 8 21.965",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 13V16L18 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_68820 = [["path",{d:"M5 15H12C15.7712 15 17.6569 15 18.8284 13.8284C20 12.6569 20 10.7712 20 7V4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.99996 20C8.99996 20 4.00001 16.3176 4 15C3.99999 13.6824 9 10 9 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let w = (...e)=>e.filter(Boolean).join(" "),
  y = "text-[13px]/[18px] font-normal",
  j = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  N = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  S = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  D = w(y,"text-neutral-900/80 dark:text-neutral-100/80"),
  A = w(y,"text-neutral-900/66 dark:text-neutral-100/66"),
  C = [{id:"p-northwind",title:"Northwind",detail:"Updated 4m ago",icon:Icon_5642},{id:"p-aurora",title:"Aurora mobile",detail:"Updated 1h ago",icon:Icon_5642},{id:"p-ledger",title:"Ledger billing",detail:"Updated yesterday",icon:Icon_5642},{id:"p-atlas",title:"Atlas search platform",detail:"Updated 2 days ago",icon:Icon_5642},{id:"p-relay",title:"Relay notifications",detail:"Updated 3 days ago",icon:Icon_5642},{id:"p-vault",title:"Vault access control",detail:"Updated last week",icon:Icon_5642}],
  R = {root:{id:"root",title:"Home",placeholder:"Search or run a command",items:[{id:"switch-project",title:"Switch project",icon:Icon_5642,to:"project"},{id:"set-theme",title:"Change theme",icon:Icon_73804,to:"theme"},{id:"set-status",title:"Set your status",icon:Icon_55171,to:"status"},{id:"copy-link",title:"Copy link to this view",icon:Icon_62714},{id:"shortcuts",title:"Open keyboard shortcuts",icon:Icon_90121}]},project:{id:"project",title:"Switch project",placeholder:"Find a project",items:C},theme:{id:"theme",title:"Change theme",placeholder:"Choose a theme",items:[{id:"t-system",title:"System",detail:"Follows your device",icon:Icon_30553},{id:"t-light",title:"Light",icon:Icon_80469},{id:"t-dark",title:"Dark",icon:Icon_48419}]},status:{id:"status",title:"Set your status",placeholder:"Choose a status",items:[{id:"s-active",title:"Active",icon:Icon_55171},{id:"s-away",title:"Away",detail:"Clears when you return",icon:Icon_29635},{id:"s-dnd",title:"Do not disturb",detail:"Mutes notifications",icon:Icon_33212},{id:"s-meeting",title:"In a meeting",detail:"Clears after 1 hour",icon:Icon_52038}]}};

function z({children:e}){
  return <kbd className="inline-flex min-h-5 min-w-5 w-fit items-center justify-center gap-1 rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1 font-mono text-[12px]/[16px] tabular-nums text-neutral-900/80 dark:text-neutral-100/80 select-none">{e}</kbd>;
}

function $(){
  let e=useId(),t=useRef(null),r=useRef(null),{ref:o,edges:i,onScroll:s}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:l,clientHeight:n}=t;
      r({start:a>1,end:Math.ceil(a+n)<l-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),c=useRef(null),d=useRef(null),u=useRef(undefined),x=useRef(undefined),[b,h]=useState(true),[p,m]=useState(true),[y,C]=useState(["root"]),[$,E]=useState(""),[T,M]=useState(0),[K,L]=useState("Northwind"),[W,I]=useState("System"),[F,H]=useState("Active"),P=y[y.length-1],B=R[P],O=y.length>1,q=`${e}-listbox`,U="project"===P?K:"theme"===P?W:"status"===P?F:undefined,V=useCallback(e=>"project"===e.to?`Currently ${K}`:"theme"===e.to?`Currently ${W.toLowerCase()}`:"status"===e.to?`Currently ${F.toLowerCase()}`:e.detail, [K,W,F]),G=useMemo(()=>{
    let e=$.trim().toLowerCase();
    return e?B.items.filter(t=>`${t.title} ${t.detail??""}`.toLowerCase().includes(e)):B.items;
  }, [B,$]),Q=G[T],J=Q?`${e}-${Q.id}`:undefined;
  useEffect(()=>{
    b&&c.current?.focus({preventScroll:true})
  }, [b]),useEffect(()=>{
    let e=o.current,t=e?.querySelector('[data-active="true"]');
    if(!e||!t)return;
    let r=e.getBoundingClientRect(),a=t.getBoundingClientRect();
    if(a.top<r.top+32){
      let t=e.scrollTop-(r.top+32-a.top);
      e.scrollTop=t<32?0:t
    }else if(a.bottom>r.bottom-32){
      let t=e.scrollHeight-e.clientHeight,l=e.scrollTop+(a.bottom-r.bottom+32);
      e.scrollTop=l>t-32?t:l
    }
  }, [T,$,P,o]),useEffect(()=>()=>{
    cancelAnimationFrame(u.current??0),clearTimeout(x.current)
  }, []);
  let X=useCallback(e=>{
    clearTimeout(x.current),h(true),e?(m(false),u.current=requestAnimationFrame(()=>m(true))):m(true)
  }, []),Y=useCallback(()=>{
    m(false),clearTimeout(x.current),x.current=setTimeout(()=>{
      h(false),C(["root"]),d.current?.focus({preventScroll:true})
    },140)
  }, []);
  useEffect(()=>{
    let e=t.current?.ownerDocument??document,r=e=>{
      (e.metaKey||e.ctrlKey)&&"k"===e.key.toLowerCase()&&(e.preventDefault(),X(false))
    };
    return e.addEventListener("keydown",r),()=>e.removeEventListener("keydown",r);
  }, [X]);
  let Z=useCallback(()=>{
    C(e=>e.length>1?e.slice(0,-1):e),E(""),M(0),c.current?.focus({preventScroll:true})
  }, []),ee=useCallback(e=>{
    if(e.to){
      C(t=>[...t,e.to]),E(""),M(0),c.current?.focus({preventScroll:true});
      return
    }
    "project"===P&&L(e.title),"theme"===P&&I(e.title),"status"===P&&H(e.title),E(""),M(0),Y()
  }, [Y,P]),et=e=>{
    M(t=>{
      let r=G.length;
      return 0===r?0:(t+e+r)%r;
    })
  };
  return (
    <section ref={t} className={w("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={d} type="button" aria-haspopup="dialog" aria-expanded={b} onClick={()=>X(true)} className={w(N,S,"w-72 max-w-full")}>
          <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
          <span className="min-w-0 flex-1 truncate text-left">Search or run a command</span>
          <z>⌘K</z>
        </button>
        {b&&<>
          <button type="button" tabIndex={-1} aria-label="Close menu" onClick={Y} className={w("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-40 cursor-default",p?"opacity-100":w(j,"opacity-0"))} />
          <div ref={r} role="dialog" aria-modal="true" aria-labelledby={`${e}-title`} onKeyDown={e=>{
            if("Escape"===e.key){
              e.preventDefault(),Y();
              return
            }
            if("Tab"!==e.key)return;
            let t=r.current;
            if(!t)return;
            let a=Array.from(t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
            if(0===a.length)return;
            let l=a[0],n=a[a.length-1],o=t.ownerDocument.activeElement;
            e.shiftKey&&o===l?(e.preventDefault(),n.focus({preventScroll:true})):e.shiftKey||o!==n||(e.preventDefault(),focus({preventScroll:true}))
          }} className={w("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","absolute left-1/2 top-[12%] z-50 max-h-[min(76%,calc(100%-4rem))] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2",p?"opacity-100":w(j,"opacity-0"))}>
            <h2 id={`${e}-title`} className="sr-only">{B.title}</h2>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
              <div className={w("flex min-h-10 shrink-0 items-center gap-2 border-b border-neutral-900/8 ps-4 pe-2 text-neutral-900/66 dark:text-neutral-100/66 has-[input:focus-visible]:border-transparent has-[input:focus-visible]:shadow-[inset_0_0_0_1px_var(--rb-accent,oklch(20.5%_0_0))] dark:border-neutral-100/8 dark:has-[input:focus-visible]:shadow-[inset_0_0_0_1px_var(--rb-accent,oklch(100%_0_0))]","h-12")}>
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                {O&&<button type="button" onClick={Z} className={w(N,"h-6 gap-1 rounded-[var(--rb-r-sm,6px)] px-2 text-[12px]/[16px] font-[450] tabular-nums","max-w-[9rem]")}>
                  <HugeiconsIcon icon={Icon_18976} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                  <span className="truncate">{B.title}</span>
                  <span className="sr-only">: go back</span>
                </button>}
                <label htmlFor={`${e}-input`} className="sr-only">{B.placeholder}</label>
                <input ref={c} id={`${e}-input`} role="combobox" aria-expanded="true" aria-controls={q} aria-activedescendant={J} aria-autocomplete="list" value={$} onChange={e=>{
                  E(e.target.value),M(0)
                }} onKeyDown={e=>{
                  switch(e.key){case"ArrowDown":e.preventDefault(),et(1);break;case"ArrowUp":e.preventDefault(),et(-1);break;case"Home":e.preventDefault(),M(0);break;case"End":e.preventDefault(),M(Math.max(G.length-1,0));break;case"Enter":if(!Q)break;e.preventDefault(),ee(Q);break;case"Backspace":if(""!==$||!O)break;e.preventDefault(),Z()}
                }} placeholder={B.placeholder} className="h-full min-w-0 flex-1 bg-transparent text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
              </div>
              <div className="relative min-h-0 flex-1">
                <div ref={o} onScroll={s} className="h-full overflow-y-auto p-2">
                  {G.length>0?<div id={q} role="listbox" aria-label={B.title}>
                    {G.map((t,r)=>{
                      let l=r===T,o=V(t),i=U===t.title;
                      return (
                        <button key={t.id} id={`${e}-${t.id}`} role="option" aria-selected={l} data-active={l} data-highlighted={l||undefined} type="button" tabIndex={-1} onPointerMove={()=>M(r)} onMouseDown={e=>{
                                            e.preventDefault(),M(r),ee(t)
                                          }} className={w("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","min-h-11")}>
                                            <HugeiconsIcon icon={t.icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                                            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                              <span className="truncate">{t.title}</span>
                                              {o&&<span className={w(D,"truncate")}>{o}</span>}
                                            </span>
                                            {i?<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />:t.to?<HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={1.8} aria-hidden="true" />:null}
                                          </button>
                      );
                    })}
                  </div>:<div className="flex flex-col items-center px-2.5 py-10 text-center">
                    <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">
                      Nothing here matches “
                      {$.trim()}
                      ”
                    </p>
                    <p className={w("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-xs text-balance")}>Clear the search to see everything on this page.</p>
                    <button type="button" onMouseDown={e=>{
                      e.preventDefault(),E(""),M(0),c.current?.focus({preventScroll:true})
                    }} className={w(N,S,"mt-4")}>Clear search</button>
                  </div>}
                </div>
                <div aria-hidden="true" className={w("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",i.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={w("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
            <div className={w(A,"flex h-10 shrink-0 items-center gap-4 px-5")}>
              <span className="inline-flex items-center gap-1.5">
                <z>
                  <HugeiconsIcon icon={Icon_68820} size={12} strokeWidth={1.8} aria-hidden="true" />
                </z>
                to select
              </span>
              <span className="inline-flex items-center gap-1.5">
                <z>esc</z>
                to close
              </span>
              {O&&<span className="ml-auto inline-flex shrink-0 items-center gap-1.5">
                <z>⌫</z>
                to go back
              </span>}
            </div>
          </div>
        </>}
      </section>
  );
}


export default $;
