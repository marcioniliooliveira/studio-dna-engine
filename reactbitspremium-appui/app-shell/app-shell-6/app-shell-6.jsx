/**
 * React Bits Pro — Application UI (app-shell-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, docs, focus, id, name, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_76021 = [["path",{d:"M17 21C16.3932 20.4102 14 18.8403 14 18C14 17.1597 16.3932 15.5898 17 15M15 18H22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 21C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12V14",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_85018 = [["path",{d:"M3.49902 14.9656C4.72475 18.4791 8.06749 21 11.999 21C16.9696 21 20.999 16.9706 20.999 12C20.999 7.02944 16.9696 3 11.999 3C8.29827 3 4.8984 5.6756 3.68943 8.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.999 7V12L14.999 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M7.49751 8.74363C7.49751 8.74363 3.81388 9.3026 3.25487 8.7436C2.69585 8.1846 3.25488 4.50098 3.25488 4.50098",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_48240 = [["path",{d:"M8 5.5L20 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L20 12.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 19.5L20 19.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M4.375 5.5H4.25M4.5 5.5C4.5 5.63807 4.38807 5.75 4.25 5.75C4.11193 5.75 4 5.63807 4 5.5C4 5.36193 4.11193 5.25 4.25 5.25C4.38807 5.25 4.5 5.36193 4.5 5.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M4.375 12.5H4.25M4.5 12.5C4.5 12.6381 4.38807 12.75 4.25 12.75C4.11193 12.75 4 12.6381 4 12.5C4 12.3619 4.11193 12.25 4.25 12.25C4.38807 12.25 4.5 12.3619 4.5 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M4.375 19.5H4.25M4.5 19.5C4.5 19.6381 4.38807 19.75 4.25 19.75C4.11193 19.75 4 19.6381 4 19.5C4 19.3619 4.11193 19.25 4.25 19.25C4.38807 19.25 4.5 19.3619 4.5 19.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_30322 = [["path",{d:"M10 8C10 9.88562 10 10.8284 9.41421 11.4142C8.82843 12 7.88562 12 6 12C4.11438 12 3.17157 12 2.58579 11.4142C2 10.8284 2 9.88562 2 8C2 6.11438 2 5.17157 2.58579 4.58579C3.17157 4 4.11438 4 6 4C7.88562 4 8.82843 4 9.41421 4.58579C10 5.17157 10 6.11438 10 8Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 7L10 11.4821C10 15.4547 7.48429 18.8237 4 20",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M22 8C22 9.88562 22 10.8284 21.4142 11.4142C20.8284 12 19.8856 12 18 12C16.1144 12 15.1716 12 14.5858 11.4142C14 10.8284 14 9.88562 14 8C14 6.11438 14 5.17157 14.5858 4.58579C15.1716 4 16.1144 4 18 4C19.8856 4 20.8284 4 21.4142 4.58579C22 5.17157 22 6.11438 22 8Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M22 7L22 11.4821C22 15.4547 19.4843 18.8237 16 20",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_81320 = [["path",{d:"M17 8L18.8398 9.85008C19.6133 10.6279 20 11.0168 20 11.5C20 11.9832 19.6133 12.3721 18.8398 13.1499L17 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 8L5.16019 9.85008C4.38673 10.6279 4 11.0168 4 11.5C4 11.9832 4.38673 12.3721 5.16019 13.1499L7 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 4L9.5 20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_33786 = [["path",{d:"M14.9961 17H16.9961C19.7575 17 21.9961 14.7614 21.9961 12C21.9961 9.23858 19.7575 7 16.9961 7H14.9961M8.99609 17H6.99609C4.23467 17 1.99609 14.7614 1.99609 12C1.99609 9.23858 4.23467 7 6.99609 7H8.99609",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.49609 12H15.4961",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_71497 = [["path",{d:"M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];
const Icon_64132 = [["path",{d:"M5 6C5 4.58579 5 3.87868 5.43934 3.43934C5.87868 3 6.58579 3 8 3H12.5789C15.0206 3 17 5.01472 17 7.5C17 9.98528 15.0206 12 12.5789 12H5V6Z",stroke:"currentColor",fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.4286 12H13.6667C16.0599 12 18 14.0147 18 16.5C18 18.9853 16.0599 21 13.6667 21H8C6.58579 21 5.87868 21 5.43934 20.5607C5 20.1213 5 19.4142 5 18V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_17771 = [["path",{d:"M12 4H19",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 20L16 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 20H12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_22244 = [["path",{d:"M4 12H20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 7.66667C17.5 5.08934 15.0376 3 12 3C8.96243 3 6.5 5.08934 6.5 7.66667C6.5 8.15279 6.55336 8.59783 6.6668 9M6 16.3333C6 18.9107 8.68629 21 12 21C15.3137 21 18 19.6667 18 16.3333C18 13.9404 16.9693 12.5782 14.9079 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];

let j = (...e)=>e.filter(Boolean).join(" ");

function N(){
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
}

let A = "text-neutral-900 dark:text-neutral-100",
  S = "text-neutral-900/80 dark:text-neutral-100/80",
  z = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  E = "text-[14px]/[20px] font-normal",
  D = "text-[14px]/[16px] font-[450]",
  M = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  T = "size-8 rounded-[var(--rb-r-sm,6px)]",
  R = "inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5",
  C = "transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none",
  q = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  I = j(D,A,"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]"),
  L = [{id:"product",name:"Product specs",docs:[{id:"checkout",title:"Checkout redesign",updated:"6 March 2025",author:"Priya Raman",words:1420},{id:"saved-methods",title:"Saved payment methods",updated:"27 February 2025",author:"Mara Vogt",words:860},{id:"refunds",title:"Refund policy for marketplace sellers and connected accounts",updated:"12 March 2025",author:"Elena Costa",words:2310},{id:"disputes",title:"Dispute handling",updated:"4 March 2025",author:"Elena Costa",words:1180},{id:"payouts",title:"Payout scheduling",updated:"19 February 2025",author:"Tobias Lindqvist",words:740},{id:"onboarding",title:"Merchant onboarding",updated:"28 January 2025",author:"Priya Raman",words:1960},{id:"currencies",title:"Currency support",updated:"11 February 2025",author:"Tobias Lindqvist",words:520}]},{id:"notes",name:"Meeting notes",docs:[{id:"sync-14-mar",title:"Weekly sync, 14 March",updated:"14 March 2025",author:"Elena Costa",words:430},{id:"q2-planning",title:"Q2 planning",updated:"5 March 2025",author:"Priya Raman",words:980},{id:"postmortem",title:"Payout delay postmortem",updated:"26 February 2025",author:"Tobias Lindqvist",words:1120}]},{id:"engineering",name:"Engineering",docs:[{id:"webhooks",title:"Webhook retry schedule",updated:"14 March 2025",author:"Mara Vogt",words:812},{id:"versioning",title:"API versioning",updated:"9 March 2025",author:"Tobias Lindqvist",words:1340},{id:"ledger",title:"Ledger migration plan",updated:"2 March 2025",author:"Priya Raman",words:3080},{id:"idempotency",title:"Idempotency keys",updated:"21 February 2025",author:"Mara Vogt",words:690},{id:"runbook",title:"Incident runbook",updated:"13 March 2025",author:"Elena Costa",words:1570},{id:"rate-limits",title:"Rate limits",updated:"7 March 2025",author:"Tobias Lindqvist",words:640},{id:"signing-keys",title:"Signing key rotation",updated:"24 February 2025",author:"Mara Vogt",words:1050},{id:"queues",title:"Queue backpressure",updated:"18 February 2025",author:"Priya Raman",words:1490},{id:"sandbox",title:"Sandbox data reset",updated:"9 January 2025",author:"",words:210}]}],
  F = L.flatMap(e=>e.docs),
  W = "webhooks",
  P = [{label:"Duplicate",icon:Icon_62714},{label:"Move to folder",icon:Icon_76021},{label:"Version history",icon:Icon_85018},{label:"Export as Markdown",icon:Icon_92752},{label:"Move to trash",icon:Icon_96037,danger:true}],
  O = [{label:"Bulleted list",icon:Icon_48240},{label:"Quote",icon:Icon_30322},{label:"Code block",icon:Icon_81320},{label:"Link",icon:Icon_33786}],
  V = `retry:
  initial_delay: 30s
  multiplier: 3
  max_delay: 6h
  max_attempts: 21
  jitter: 0.2`;

function B({label:e,items:t,className:r,align:l="end"}){
  let[s,o]=useState(false),[d,c]=useState(false),u=useRef(null),h=useRef(null),p=useRef(null),b=e=>{
    o(false),e&&h.current?.focus({preventScroll:true})
  };
  useEffect(()=>{
    if(!s)return;
    let e=u.current?.ownerDocument??document,t=()=>Array.from(p.current?.querySelectorAll('[role="menuitem"]')??[]);
    t()[0]?.focus({preventScroll:true});
    let r=e=>{
      u.current?.contains(e.target)||b(false)
    },a=r=>{
      let a=t();
      if(0===a.length)return;
      let n=a.indexOf(e.activeElement);
      "Escape"===r.key?(r.preventDefault(),b(true)):"ArrowDown"===r.key?(r.preventDefault(),a[n<0||n===a.length-1?0:n+1]?.focus({preventScroll:true})):"ArrowUp"===r.key?(r.preventDefault(),a[n<=0?a.length-1:n-1]?.focus({preventScroll:true})):"Home"===r.key?(r.preventDefault(),a[0]?.focus({preventScroll:true})):"End"===r.key?(r.preventDefault(),a[a.length-1]?.focus({preventScroll:true})):"Tab"===r.key&&b(false)
    };
    return e.addEventListener("pointerdown",r),e.addEventListener("keydown",a),()=>{
      e.removeEventListener("pointerdown",r),e.removeEventListener("keydown",a)
    };
  }, [s]);
  let m=e=>{
    c(e),o(true)
  };
  return (
    <div ref={u} className={j("relative shrink-0",r)}>
        <button ref={h} type="button" aria-label={e} aria-haspopup="menu" aria-expanded={s} onClick={()=>s?b(false):m(true)} onKeyDown={e=>{
          "ArrowDown"!==e.key||s||(e.preventDefault(),m(false))
        }} className={j(M,T)}>
          <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
        {s&&<div ref={p} role="menu" aria-label={e} className={j("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",d&&C,"absolute top-full z-30 mt-1 w-56","start"===l?"left-0":"right-0")}>
          {t.map(({label:e,icon:t,danger:r})=>(
            <Fragment key={e}>
                    {r&&<div role="separator" className="-mx-1 my-1 h-px bg-neutral-900/8 dark:bg-neutral-100/8" />}
                    <button type="button" role="menuitem" tabIndex={-1} onClick={()=>b(true)} className={r?"relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] outline-none select-none [&_svg]:shrink-0 text-[oklch(51%_0.18_26)] hover:bg-[oklch(94.5%_0.027_26)] focus-visible:bg-[oklch(94.5%_0.027_26)] data-[highlighted]:bg-[oklch(94.5%_0.027_26)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-[oklch(76%_0.14_26)] dark:hover:bg-[oklch(29%_0.06_26)] dark:focus-visible:bg-[oklch(29%_0.06_26)] dark:data-[highlighted]:bg-[oklch(29%_0.06_26)] dark:aria-disabled:text-neutral-100/40":"relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40"}>
                      <HugeiconsIcon icon={t} size={14} strokeWidth={1.8} aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate">{e}</span>
                    </button>
                  </Fragment>
          ))}
        </div>}
      </div>
  );
}

function H({titles:e,expanded:t,onToggleFolder:r,selectedId:l,onSelect:s,activeId:o,onActivate:d}){
  let c=useRef(null),u=e=>{
    e&&(e.focus({preventScroll:true}),e.dataset.id&&d(e.dataset.id))
  };
  return (
    <ul ref={c} role="tree" aria-label="Documents" onKeyDown={e=>{
        let t=Array.from(c.current?.querySelectorAll('[role="treeitem"]')??[]);
        if(0===t.length)return;
        let a=c.current?.ownerDocument??document,n=t.indexOf(a.activeElement),i=t[n];
        switch(e.key){case"ArrowDown":e.preventDefault(),u(t[Math.min(n+1,t.length-1)]);break;case"ArrowUp":e.preventDefault(),u(t[Math.max(n-1,0)]);break;case"Home":e.preventDefault(),u(t[0]);break;case"End":e.preventDefault(),u(t[t.length-1]);break;case"ArrowRight":{
          if(!i)return;
          e.preventDefault();
          let a=i.getAttribute("aria-expanded");
          "false"===a&&i.dataset.id?r(i.dataset.id):"true"===a&&u(t[n+1]);
          break
        }case"ArrowLeft":{
          if(!i)return;
          if(e.preventDefault(),"true"===i.getAttribute("aria-expanded")&&i.dataset.id){
            r(i.dataset.id);
            break
          }
          let a=i.dataset.parent;
          if(!a)break;
          u(t.find(e=>e.dataset.id===a))
        }}
      }} className="space-y-0.5">
        {L.map((n,c)=>{
          let u=t[id];
          return (
            <li key={id} role="none">
                    <button type="button" role="treeitem" data-id={id} aria-expanded={u} aria-selected={false} aria-level={1} aria-posinset={c+1} aria-setsize={L.length} tabIndex={o===id?0:-1} onClick={()=>{
                      d(id),r(id)
                    }} className={j(q,"group")}>
                      <span className="flex size-4 shrink-0 items-center justify-center">
                        <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-left">{name}</span>
                    </button>
                    {u&&<ul role="group" aria-label={name} className="space-y-0.5 pt-0.5">
                      {docs.map((t,r)=>{
                        let i=t.id===l;
                        return (
                          <li key={t.id} role="none">
                                        <button type="button" role="treeitem" data-id={t.id} data-parent={id} aria-level={2} aria-posinset={r+1} aria-setsize={docs.length} aria-selected={i} aria-current={i?"page":undefined} tabIndex={o===t.id?0:-1} onClick={()=>{
                                          d(t.id),s(t.id)
                                        }} className={j(q,"pl-8")}><span className="min-w-0 flex-1 truncate text-left">{e[t.id]}</span></button>
                                      </li>
                        );
                      })}
                    </ul>}
                  </li>
          );
        })}
      </ul>
  );
}

function K({titles:e,expanded:t,onToggleFolder:r,selectedId:n,onSelect:l,activeId:s,onActivate:o,onClose:d}){
  let{ref:u,edges:h,onScroll:p}=N();
  return (
    <>
        <div className="flex h-14 shrink-0 items-center gap-2 pr-2 pl-4">
          <p className={j(D,"min-w-0 flex-1 truncate")}>Halden docs</p>
          <button type="button" aria-label="New document" className={j(M,T)}>
            <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          {d&&<button type="button" aria-label="Close documents" onClick={d} className={j(M,T)}>
            <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>}
        </div>
        <div className="relative min-h-0 flex-1">
          <nav ref={u} onScroll={p} aria-label="Documents" className="h-full overflow-y-auto px-2 pb-2">
            <H titles={e} expanded={t} onToggleFolder={r} selectedId={n} onSelect={l} activeId={s} onActivate={o} />
          </nav>
          <div aria-hidden="true" className={j(d?"bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950":"bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",h.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={j(d?"bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950":"bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",h.end?"opacity-100":"opacity-0")} />
        </div>
        <div className="shrink-0 px-2 pb-3 pt-2">
          <button type="button" className={q}>
            <HugeiconsIcon icon={Icon_96037} size={16} strokeWidth={1.8} aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-left">Trash</span>
            <span className="ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">6</span>
          </button>
        </div>
      </>
  );
}

function Q({label:e,icon:t,pressed:r,onToggle:n}){
  return <button type="button" aria-label={e} aria-pressed={r} onClick={n} className={j(M,"size-7 rounded-[var(--rb-r-sm,6px)]")}><HugeiconsIcon icon={t} size={16} strokeWidth={1.8} aria-hidden="true" /></button>;
}

function J(){
  let[e,t]=useState(()=>Object.fromEntries(F.map(e=>[e.id,e.title]))),[r,l]=useState({product:true,engineering:true,notes:false}),[s,o]=useState(W),[d,c]=useState(W),[x,m]=useState({bold:true,italic:false,strikethrough:false,list:false,quote:false,code:false}),[f,g]=useState(false),[D,q]=useState(false),H=useRef(false),J=useRef(null),U=useRef(null),G=useRef(null),{ref:X,edges:Y,onScroll:Z}=N(),{ref:$,edges:ee,onScroll:et}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollLeft:a,scrollWidth:n,clientWidth:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }();
  useEffect(()=>{
    let e=(J.current?.ownerDocument.defaultView??window).matchMedia("(max-width: 1023px)"),t=false,r=()=>{
      !t&&e.matches&&(t=true,g(true))
    },a=requestAnimationFrame(r);
    return e.addEventListener("change",r),()=>{
      cancelAnimationFrame(a),e.removeEventListener("change",r)
    };
  }, []),useEffect(()=>{
    if(!f)return;
    let e=U.current,t=requestAnimationFrame(()=>q(true)),r=e?.ownerDocument??document,a=()=>Array.from(e?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    H.current&&(a()[0]?.focus({preventScroll:true}),H.current=false);
    let n=e=>{
      if("Escape"===e.key){
        g(false),q(false),J.current?.focus({preventScroll:true});
        return
      }
      if("Tab"!==e.key)return;
      let t=a(),n=t[0],i=t[t.length-1];
      n&&i&&(e.shiftKey&&r.activeElement===n?(e.preventDefault(),i.focus({preventScroll:true})):e.shiftKey||r.activeElement!==i||(e.preventDefault(),focus({preventScroll:true})))
    };
    return r.addEventListener("keydown",n),()=>{
      cancelAnimationFrame(t),r.removeEventListener("keydown",n)
    };
  }, [f]),useEffect(()=>{
    G.current?.scrollTo({top:0})
  }, [s]);
  let er=()=>{
    g(false),q(false),J.current?.focus({preventScroll:true})
  },ea=e=>{
    l(t=>({...t,[e]:!t[e]}));
    let t=L.find(t=>t.id===e);
    r[e]&&t?.docs.some(e=>e.id===d)&&d!==e&&c(e)
  },en=F.find(e=>e.id===s)??F[0],ei=e[en.id];
  return (
    <div className={j("bg-white dark:bg-neutral-950",A,"relative flex h-full min-h-[720px] w-full overflow-hidden")}>
        <aside className={j("border-r border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","hidden w-64 shrink-0 flex-col lg:flex")}>
          <K titles={e} expanded={r} onToggleFolder={ea} selectedId={s} onSelect={o} activeId={d} onActivate={c} />
        </aside>
        <div className={j("bg-neutral-50 dark:bg-neutral-950","flex min-w-0 flex-1 flex-col p-2")}>
          <div className={j("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","min-h-0 flex-1")}>
            <header className="flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6">
              <button ref={J} type="button" aria-label="Open documents" aria-expanded={f} onClick={()=>{
                H.current=true,g(true)
              }} className={j(M,T,"lg:hidden")}>
                <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <div className="min-w-0 flex-1">
                <input value={ei} aria-label="Document title" onChange={e=>t(t=>({...t,[en.id]:e.target.value}))} className={j(I,"h-8 w-full max-w-[20rem] px-2")} />
              </div>
              <span aria-live="polite" className={j("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-neutral-900/80 dark:text-neutral-100/80","shrink-0 max-sm:hidden")}>Saved</span>
              <button type="button" className={j("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                <HugeiconsIcon icon={Icon_71497} size={16} strokeWidth={1.8} aria-hidden="true" />
                Share
              </button>
              <B label="Document actions" items={P} />
            </header>
            <div className={j("bg-neutral-50 dark:bg-neutral-900","flex h-12 shrink-0 items-center gap-2 px-4 sm:px-6")}>
              <div role="group" aria-label="Text style" className={j(R,"h-8","shrink-0")}>
                <Q label="Bold" icon={Icon_64132} pressed={x.bold} onToggle={()=>m(e=>({...e,bold:!e.bold}))} />
                <Q label="Italic" icon={Icon_17771} pressed={x.italic} onToggle={()=>m(e=>({...e,italic:!e.italic}))} />
                <Q label="Strikethrough" icon={Icon_22244} pressed={x.strikethrough} onToggle={()=>m(e=>({...e,strikethrough:!e.strikethrough}))} />
              </div>
              <div role="group" aria-label="Block style" className={j(R,"h-8","shrink-0 max-md:hidden")}>
                <Q label="Bulleted list" icon={Icon_48240} pressed={x.list} onToggle={()=>m(e=>({...e,list:!e.list}))} />
                <Q label="Quote" icon={Icon_30322} pressed={x.quote} onToggle={()=>m(e=>({...e,quote:!e.quote}))} />
                <Q label="Code block" icon={Icon_81320} pressed={x.code} onToggle={()=>m(e=>({...e,code:!e.code}))} />
              </div>
              <button type="button" aria-label="Insert link" className={j(M,T,"max-md:hidden")}>
                <HugeiconsIcon icon={Icon_33786} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <B label="More formatting" items={O} align="start" className="md:hidden" />
              <span className={j("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","ml-auto")}>
                {String(en.words).replace(/\B(?=(\d{3})+(?!\d))/g,",")}
                {" words"}
              </span>
            </div>
            <div className="relative flex min-h-0 flex-1 flex-col">
              <main ref={e=>{
                G.current=e,X.current=e
              }} onScroll={Z} className="h-full overflow-y-auto">
                <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
                  <h1 className="text-[24px]/[28px] font-[450] tracking-[-0.015em]">{ei}</h1>
                  <p className={j("text-[13px]/[18px] font-normal","text-neutral-900/66 dark:text-neutral-100/66","mt-2")}>
                    {"Last edited "}
                    {en.updated}
                    {" by"}
                    {" "}
                    {en.author||<span className="text-neutral-900/66 dark:text-neutral-100/66">None</span>}
                  </p>
                  <p className={j(E,S,"mt-6")}>
                    Every webhook Halden sends is retried until the endpoint accepts it or the schedule runs out. This page describes the schedule as it behaves in production today, so support and integration engineers can answer a merchant’s question without reading the delivery service.
                  </p>
                  <p className={j(E,S,"mt-4")}>
                    Retries are tracked per endpoint rather than per account. If a merchant has three endpoints registered and one of them is unreachable, deliveries to the other two are unaffected and stay on time.
                  </p>
                  <h2 className={j(z,"mt-8")}>Timing</h2>
                  <p className={j(E,S,"mt-3")}>
                    The first retry is sent 30 seconds after a failed attempt. Each attempt after that waits about three times as long as the one before it, up to a ceiling of six hours. A delivery is abandoned after 21 attempts, which works out to just under three days.
                  </p>
                  <div className={j("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","mt-4")}>
                    <pre ref={$} onScroll={et} className="overflow-auto bg-neutral-900/5 py-3 font-mono text-[13px]/[20px] tabular-nums text-neutral-900 dark:text-neutral-100 [scrollbar-width:thin] dark:bg-neutral-100/5">
                      {V.split("\n").map((e,t)=><span key={t} className="flex px-4"><span className="min-w-0 flex-1 whitespace-pre">{e}</span></span>)}
                    </pre>
                    <div aria-hidden="true" className={j("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 left-0 w-8",ee.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={j("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-y-0 right-0 w-8",ee.end?"opacity-100":"opacity-0")} />
                  </div>
                  <h2 className={j(z,"mt-8")}>What counts as a failure</h2>
                  <p className={j(E,S,"mt-3")}>
                    An attempt fails when any of the following happens. Everything else, including a slow but successful response, counts as delivered.
                  </p>
                  <ul className={j(E,S,"mt-3 list-disc space-y-2 pl-5")}>
                    <li>The endpoint returns a status outside the 2xx range, including redirects.</li>
                    <li>The connection is not established within 10 seconds.</li>
                    <li>The response body has not arrived 30 seconds after the request was sent.</li>
                    <li>The TLS certificate cannot be verified against the public trust store.</li>
                  </ul>
                  <h2 className={j(z,"mt-8")}>Replaying a delivery</h2>
                  <p className={j(E,S,"mt-3")}>
                    Support can replay a single delivery from the endpoint page. A replay sends the payload as it was recorded when the event happened, so a replayed charge still carries the amount that was charged at the time rather than the amount on the account today.
                  </p>
                  <p className={j(E,S,"mt-4")}>
                    Replays do not reset the retry counter and do not extend the three day window. If a merchant needs deliveries older than that, read them from the events API instead and reconcile against the ledger export.
                  </p>
                </article>
              </main>
              <div aria-hidden="true" className={j("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",Y.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={j("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",Y.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
        {f&&<div className="lg:hidden">
          <button type="button" aria-label="Close documents overlay" tabIndex={-1} onClick={er} className={j("bg-neutral-900/25 dark:bg-neutral-950/60",C,"absolute inset-0 z-30 cursor-pointer",D?"opacity-100":"opacity-0")} />
          <aside ref={U} role="dialog" aria-modal="true" aria-label="Documents" className={j("flex h-full min-h-0 flex-col bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900",C,"absolute inset-y-0 left-0 z-40 w-72 max-w-[85%]",D?"opacity-100":"opacity-0")}>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
              <K titles={e} expanded={r} onToggleFolder={ea} selectedId={s} onSelect={o} activeId={d} onActivate={c} onClose={er} />
            </div>
          </aside>
        </div>}
      </div>
  );
}


export default J;
