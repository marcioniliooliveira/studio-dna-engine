/**
 * React Bits Pro — Application UI (app-sidebar-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_59844 = [["path",{d:"M2.5 5.5C2.5 3.85008 2.5 3.02513 3.01256 2.51256C3.52513 2 4.35008 2 6 2C7.64992 2 8.47487 2 8.98744 2.51256C9.5 3.02513 9.5 3.85008 9.5 5.5C9.5 7.14992 9.5 7.97487 8.98744 8.48744C8.47487 9 7.64992 9 6 9C4.35008 9 3.52513 9 3.01256 8.48744C2.5 7.97487 2.5 7.14992 2.5 5.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M3.65685 15.6569C4.76142 14.5523 5.31371 14 6 14C6.68629 14 7.23858 14.5523 8.34315 15.6569C9.44772 16.7614 10 17.3137 10 18C10 18.6863 9.44772 19.2386 8.34315 20.3431C7.23858 21.4477 6.68629 22 6 22C5.31371 22 4.76142 21.4477 3.65685 20.3431C2.55228 19.2386 2 18.6863 2 18C2 17.3137 2.55228 16.7614 3.65685 15.6569Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 9V14M10 18H15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 18C15 16.3501 15 15.5251 15.5126 15.0126C16.0251 14.5 16.8501 14.5 18.5 14.5C20.1499 14.5 20.9749 14.5 21.4874 15.0126C22 15.5251 22 16.3501 22 18C22 19.6499 22 20.4749 21.4874 20.9874C20.9749 21.5 20.1499 21.5 18.5 21.5C16.8501 21.5 16.0251 21.5 15.5126 20.9874C15 20.4749 15 19.6499 15 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];
const Icon_13575 = [["path",{d:"M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 11V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 11V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M8 11V15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_2972 = [["path",{d:"M8 9V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 5V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18 13V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 3V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_88002 = [["path",{d:"M4.85195 20.7716C5.40326 21 6.10218 21 7.5 21C8.89782 21 9.59674 21 10.1481 20.7716C10.8831 20.4672 11.4672 19.8831 11.7716 19.1481C12 18.5967 12 17.8978 12 16.5C12 15.1022 12 14.4033 11.7716 13.8519C11.4672 13.1169 10.8831 12.5328 10.1481 12.2284C9.59674 12 8.89782 12 7.5 12C6.10218 12 5.40326 12 4.85195 12.2284C4.11687 12.5328 3.53284 13.1169 3.22836 13.8519C3 14.4033 3 15.1022 3 16.5C3 17.8978 3 18.5967 3.22836 19.1481C3.53284 19.8831 4.11687 20.4672 4.85195 20.7716Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13.8519 20.7716C14.4033 21 15.1022 21 16.5 21C17.8978 21 18.5967 21 19.1481 20.7716C19.8831 20.4672 20.4672 19.8831 20.7716 19.1481C21 18.5967 21 17.8978 21 16.5C21 15.1022 21 14.4033 20.7716 13.8519C20.4672 13.1169 19.8831 12.5328 19.1481 12.2284C18.5967 12 17.8978 12 16.5 12C15.1022 12 14.4033 12 13.8519 12.2284C13.1169 12.5328 12.5328 13.1169 12.2284 13.8519C12 14.4033 12 15.1022 12 16.5C12 17.8978 12 18.5967 12.2284 19.1481C12.5328 19.8831 13.1169 20.4672 13.8519 20.7716Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.35195 11.7716C9.90326 12 10.6022 12 12 12C13.3978 12 14.0967 12 14.6481 11.7716C15.3831 11.4672 15.9672 10.8831 16.2716 10.1481C16.5 9.59674 16.5 8.89782 16.5 7.5C16.5 6.10218 16.5 5.40326 16.2716 4.85195C15.9672 4.11687 15.3831 3.53284 14.6481 3.22836C14.0967 3 13.3978 3 12 3C10.6022 3 9.90326 3 9.35195 3.22836C8.61687 3.53284 8.03284 4.11687 7.72836 4.85195C7.5 5.40326 7.5 6.10218 7.5 7.5C7.5 8.89782 7.5 9.59674 7.72836 10.1481C8.03284 10.8831 8.61687 11.4672 9.35195 11.7716Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_36122 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_65174 = [["path",{d:"M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let e_ = (...e)=>e.filter(Boolean).join(" ");

function ex(){
  let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
    let r=e.current;
    if(!r)return;
    let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
    a({start:t>1,end:Math.ceil(t+l)<n-1})
  }, []);
  return useEffect(()=>{
    t();
    let r=e.current,a=r?.ownerDocument.defaultView;
    if(!r||!a?.ResizeObserver)return;
    let n=new a.ResizeObserver(t);
    return observe(r),()=>disconnect();
  }, [t]),{ref:e,edges:r,onScroll:t};
}

let ep = "text-neutral-900 dark:text-neutral-100";

let eh = "border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7";

let em = "text-[15px]/[20px] font-bold";

let ek = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let ef = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let ev = "border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let eg = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let ew = "bg-linear-to-b from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900";

let ej = "bg-linear-to-t from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900";

let ey = [{label:"Automations",icon:Icon_59844,groups:[{label:"Build",items:["Agent runs","Playbooks","Schedules","Triggers"]},{label:"Review",items:["Approvals","Run history","Failures"]},{label:"Configure",items:["Variables","Webhooks","Retries"]}]},{label:"Projects",icon:Icon_13575,groups:[{label:"Boards",items:["Active","Backlog","Archived","Templates"]},{label:"Planning",items:["Roadmap","Milestones","Releases"]},{label:"Delivery",items:["Handoffs","Retros","Reports"]}]},{label:"People",icon:Icon_88366,groups:[{label:"Directory",items:["Members","Teams","Guests","Invitations"]},{label:"Access",items:["Roles","Permissions","Groups"]},{label:"Records",items:["Onboarding","Time off","Reviews"]}]},{label:"Insights",icon:Icon_2972,groups:[{label:"Usage",items:["Seats","Sessions","Adoption","Exports"]},{label:"Performance",items:["Latency","Throughput","Errors"]},{label:"Finance",items:["Costs","Forecasts","Invoices"]}]},{label:"Documents",icon:Icon_31964,groups:[{label:"Library",items:["All files","Shared","Recent","Starred"]},{label:"Templates",items:["Contracts","Briefs","Policies"]},{label:"Lifecycle",items:["Drafts","In review","Archived"]}]},{label:"Integrations",icon:Icon_88002,groups:[{label:"Connections",items:["Connected apps","Data sources","Sinks","Registry"]},{label:"Developer",items:["API keys","Webhooks","Events"]},{label:"Health",items:["Sync status","Quotas","Logs"]}]},{label:"Security",icon:Icon_36122,groups:[{label:"Identity",items:["Sign-in","Devices","Sessions","Domains"]},{label:"Policies",items:["Retention","Sharing","Encryption"]},{label:"Audit",items:["Access review","Audit log","Alerts"]}]}];


export default function app_sidebar_4__Sorbet__Component(){
  let[e,r]=useState(0),[a,i]=useState(ey[0].groups[0].items[0]),{ref:o,edges:s,onScroll:c}=ex(),{ref:d,edges:u,onScroll:b}=ex(),_=ey[e];
  return (
    <div className={e_("bg-white dark:bg-neutral-950",ep,"relative flex h-full min-h-[720px] w-full overflow-hidden")}>
        <aside className={e_(ev,"flex w-14 shrink-0 flex-col items-center")}>
          <div className="flex h-14 shrink-0 items-center">
            <span className={e_("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] select-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black)]","size-8",em)}>O</span>
          </div>
          <div className="relative flex min-h-0 flex-1 flex-col items-center">
            <nav ref={o} onScroll={c} aria-label="Sections" className="flex h-full flex-col items-center gap-1 overflow-y-auto pb-3">
              {ey.map((a,n)=>{
                let o=n===e;
                return (
                  <button key={a.label} type="button" title={a.label} aria-label={a.label} aria-current={o?"page":undefined} onClick={()=>{
                                r(n),i(a.groups[0].items[0])
                              }} className={e_(eg,"shrink-0 justify-center")}><HugeiconsIcon icon={a.icon} size={18} strokeWidth={2} aria-hidden="true" /></button>
                );
              })}
            </nav>
            <div aria-hidden="true" className={e_(ew,"pointer-events-none absolute inset-x-0 top-0 h-8",s.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={e_(ej,"pointer-events-none absolute inset-x-0 bottom-0 h-8",s.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={e_(eh,"w-full shrink-0 p-2")}>
            <div className="flex h-11 items-center justify-center">
              <button type="button" title="Workspace settings" aria-label="Workspace settings" className={e_(ek,ef)}>
                <HugeiconsIcon icon={Icon_65174} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </aside>
        <div className={e_(ev,"flex w-full min-w-0 flex-col sm:w-64 sm:shrink-0")}>
          <div className="flex h-14 shrink-0 items-center gap-2 pl-4 pr-2">
            <h2 className={e_("text-[17px]/[22px] font-extrabold",ep,"min-w-0 flex-1 truncate")}>{_.label}</h2>
            <button type="button" aria-label={`New ${_.label.toLowerCase().replace(/s$/,"")}`} className={e_(ek,ef)}>
              <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <div className="px-2 pb-2">
            <label className={e_("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <input type="search" placeholder={`Search ${_.label.toLowerCase()}`} aria-label={`Search ${_.label}`} className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
            </label>
          </div>
          <div className="relative min-h-0 flex-1">
            <nav ref={d} onScroll={b} aria-label={`${_.label} pages`} className="h-full overflow-y-auto px-2 pb-3">
              {_.groups.map(e=>(
                <div key={e.label}>
                            <p className="px-3 pt-5 pb-1.5 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e.label}</p>
                            <ul className="space-y-0.5">
                              {e.items.map(e=>{
                                let r=e===a;
                                return (
                                  <li key={e}>
                                                    <button type="button" aria-current={r?"page":undefined} onClick={()=>i(e)} className={e_(eg,"text-left")}>
                                                      <span className={e_("block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]","flex-1")}>{e}</span>
                                                    </button>
                                                  </li>
                                );
                              })}
                            </ul>
                          </div>
              ))}
            </nav>
            <div aria-hidden="true" className={e_(ew,"pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={e_(ej,"pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={e_(eh,"shrink-0 p-2")}>
            <div className="flex h-11 items-center gap-2.5 px-2">
              <span className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
                <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">RC</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className={e_(em,ep,"truncate")}>Ruben Cole</p>
                <p className={e_("text-[13px]/[16px] font-semibold tabular-nums","text-neutral-900/62 dark:text-neutral-100/62","truncate")}>Automation lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
