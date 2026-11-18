/**
 * React Bits Pro — Application UI (settings-form-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { useReducedMotion } from 'motion/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];

let d = (...e)=>e.filter(Boolean).join(" ");

let _ = "text-neutral-900 dark:text-neutral-100";

let b = "text-neutral-900/78 dark:text-neutral-100/78";

let u = "text-[14px]/[20px] font-medium";

let x = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let h = "relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40";

let p = "h-10";

let k = "h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]";

let m = "flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let v = d("text-[17px]/[22px] font-extrabold",_);

let f = d("text-[13px]/[16px] font-semibold tabular-nums",b);

let g = d(u,b);

let w = d(u,b);

let y = [{id:"workspace",label:"Workspace",title:"Workspace",blurb:"Details, defaults, and formats people use across the workspace.",fields:[{kind:"text",id:"ws-name",label:"Name",hint:"Shown in sidebars, invitations, and reports."},{kind:"prefix",id:"ws-slug",label:"Workspace URL",hint:"Lowercase letters, numbers, and hyphens only.",prefix:"northwind.app/"},{kind:"select",id:"ws-region",label:"Primary region",hint:"Where new projects store data by default.",options:[{value:"us-east",label:"US East (N. Virginia)"},{value:"us-west",label:"US West (Oregon)"},{value:"eu-west",label:"Europe (Frankfurt)"},{value:"ap-south",label:"Asia Pacific (Singapore)"}]},{kind:"textarea",id:"ws-description",label:"Description",hint:"A short note for people joining the workspace."},{kind:"select",id:"ws-language",label:"Language",hint:"The default language for shared workspace screens.",options:[{value:"en",label:"English"},{value:"de",label:"German"},{value:"fr",label:"French"},{value:"ja",label:"Japanese"}]},{kind:"select",id:"ws-timezone",label:"Time zone",hint:"Used for timestamps in reports and exports.",options:[{value:"new_york",label:"New York, GMT−05:00"},{value:"london",label:"London, GMT+00:00"},{value:"berlin",label:"Berlin, GMT+01:00"},{value:"tokyo",label:"Tokyo, GMT+09:00"}]},{kind:"select",id:"ws-date",label:"Date format",hint:"How dates appear in shared workspace screens.",options:[{value:"mdy",label:"Aug 5, 2026"},{value:"dmy",label:"5 Aug 2026"},{value:"iso",label:"2026-08-05"}]}]},{id:"billing",label:"Billing",title:"Billing",blurb:"Who is charged, how often, and what appears on the invoice.",fields:[{kind:"select",id:"bl-plan",label:"Plan",hint:"Changes apply on the next invoice.",options:[{value:"team",label:"Team"},{value:"business",label:"Business"},{value:"enterprise",label:"Enterprise"}]},{kind:"select",id:"bl-cycle",label:"Billing cycle",hint:"Annual plans are invoiced once, in advance.",options:[{value:"monthly",label:"Monthly"},{value:"annual",label:"Annual"}]},{kind:"text",id:"bl-email",label:"Billing email",hint:"Invoices and receipts are sent here."},{kind:"textarea",id:"bl-address",label:"Billing address",hint:"Printed on every invoice."},{kind:"text",id:"bl-tax",label:"Tax ID",hint:"Shown on invoices in regions that require it."},{kind:"text",id:"bl-po",label:"Purchase order",hint:"Added to the invoice reference. Leave empty if unused."},{kind:"switch",id:"bl-receipts",label:"Email receipts",hint:"Send a receipt to the billing address after each charge."}]},{id:"notifications",label:"Notifications",title:"Notifications",blurb:"Where workspace activity reaches people, and how often.",fields:[{kind:"checkgroup",id:"nt-email",label:"Email",hint:"Choose which messages reach the inbox.",items:[{id:"nt-email-product",label:"Product updates"},{id:"nt-email-security",label:"Security alerts"},{id:"nt-email-digest",label:"Weekly digest"}]},{kind:"select",id:"nt-digest-day",label:"Digest day",hint:"When the weekly digest is sent.",options:[{value:"monday",label:"Monday"},{value:"friday",label:"Friday"},{value:"sunday",label:"Sunday"}]},{kind:"select",id:"nt-quiet",label:"Quiet hours",hint:"Hold non-urgent alerts until the morning.",options:[{value:"off",label:"Off"},{value:"18-09",label:"18:00 to 09:00"},{value:"22-07",label:"22:00 to 07:00"}]},{kind:"text",id:"nt-reply",label:"Reply-to address",hint:"Where replies to workspace email are delivered."},{kind:"switch",id:"nt-desktop",label:"Desktop alerts",hint:"Show alerts while the app is open."},{kind:"switch",id:"nt-mobile",label:"Mobile push",hint:"Send alerts to signed-in mobile devices."},{kind:"switch",id:"nt-mentions",label:"Mentions",hint:"Notify people when someone mentions their name."}]},{id:"security",label:"Security",title:"Security",blurb:"How members prove who they are and how long they stay signed in.",fields:[{kind:"switch",id:"sc-2fa",label:"Two-factor authentication",hint:"Require a second factor for every member."},{kind:"select",id:"sc-sso",label:"Single sign-on",hint:"Members sign in through your identity provider.",options:[{value:"off",label:"Off"},{value:"okta",label:"Okta"},{value:"google",label:"Google Workspace"}]},{kind:"select",id:"sc-timeout",label:"Session timeout",hint:"Sign members out after this much inactivity.",options:[{value:"8h",label:"8 hours"},{value:"24h",label:"24 hours"},{value:"7d",label:"7 days"},{value:"30d",label:"30 days"}]},{kind:"text",id:"sc-domains",label:"Allowed email domains",hint:"Only these domains can join without an invitation."},{kind:"textarea",id:"sc-ips",label:"IP allowlist",hint:"One CIDR range per line. Empty allows every address."},{kind:"select",id:"sc-audit",label:"Audit log retention",hint:"How long member activity is kept.",options:[{value:"30d",label:"30 days"},{value:"1y",label:"1 year"},{value:"3y",label:"3 years"}]},{kind:"switch",id:"sc-devices",label:"Device approval",hint:"Ask an admin to approve every new device."}]},{id:"advanced",label:"Advanced",title:"Advanced",blurb:"Defaults for projects, the API, and scheduled exports.",fields:[{kind:"select",id:"ad-visibility",label:"New project visibility",hint:"Where new projects start out.",options:[{value:"workspace",label:"Everyone in the workspace"},{value:"private",label:"Only the creator"}]},{kind:"select",id:"ad-rate",label:"API rate limit",hint:"Requests per minute across every key.",options:[{value:"1000",label:"1,000 requests"},{value:"5000",label:"5,000 requests"},{value:"10000",label:"10,000 requests"}]},{kind:"prefix",id:"ad-webhook",label:"Webhook endpoint",hint:"Workspace events are posted here.",prefix:"https://"},{kind:"select",id:"ad-export",label:"Export format",hint:"Used by scheduled workspace exports.",options:[{value:"json",label:"JSON"},{value:"csv",label:"CSV"},{value:"parquet",label:"Parquet"}]},{kind:"prefix",id:"ad-domain",label:"Custom domain",hint:"Serve shared links from your own domain.",prefix:"https://"},{kind:"switch",id:"ad-beta",label:"Beta features",hint:"Try unreleased features before general release."},{kind:"switch",id:"ad-analytics",label:"Usage analytics",hint:"Share anonymous usage data to help prioritise work."}]}];

let j = {"ws-name":"Northwind","ws-slug":"northwind","ws-region":"us-east","ws-description":"Internal tools and dashboards for the operations team. Shared with 24 people.","ws-language":"en","ws-timezone":"new_york","ws-date":"mdy","bl-plan":"business","bl-cycle":"annual","bl-email":"accounts-payable@northwind.co","bl-address":"18 Wharf Road\nLondon N1 7GS\nUnited Kingdom","bl-tax":"GB 428 9971 07","bl-po":"","bl-receipts":true,"nt-email-product":false,"nt-email-security":true,"nt-email-digest":true,"nt-digest-day":"monday","nt-quiet":"18-09","nt-reply":"no-reply@northwind.co","nt-desktop":true,"nt-mobile":false,"nt-mentions":true,"sc-2fa":true,"sc-sso":"okta","sc-timeout":"24h","sc-domains":"northwind.co, contractors.northwind.co","sc-ips":"","sc-audit":"1y","sc-devices":false,"ad-visibility":"workspace","ad-rate":"5000","ad-webhook":"hooks.northwind.co/workspace","ad-export":"json","ad-domain":"","ad-beta":false,"ad-analytics":true};

function N({id:e,checked:a,onChange:r,labelledBy:n,describedBy:l}){
  return (
    <button id={e} type="button" role="switch" aria-checked={a} aria-labelledby={n} aria-describedby={l} onClick={()=>r(!a)} className="group relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] p-0.5 shadow-[inset_0_1px_2px_rgb(84_62_32/0.14),inset_0_0_0_1px_rgb(84_62_32/0.05)] transition-[background-color,box-shadow,outline-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:aria-[checked=false]:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_94%,black)] aria-checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] aria-checked:shadow-[inset_0_1px_2px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_75%,black)] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-neutral-100/16 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)] dark:hover:aria-[checked=false]:not-disabled:bg-neutral-100/24 dark:aria-checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-checked:shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)]">
        <span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[translate,width] duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-active:w-6 group-aria-checked:translate-x-4 group-aria-checked:group-active:translate-x-3 group-disabled:shadow-none dark:bg-white" />
      </button>
  );
}

function C({id:e,value:a,onChange:r,options:l,describedBy:c}){
  let _=useId(),[b,u]=useState(false),[x,h]=useState(false),[p,k]=useState(0),[m,v]=useState(false),[f,g]=useState(undefined),w=useRef(null),y=useRef(null),j=useRef({buffer:"",at:0}),N=l.findIndex(e=>e.value===a),C=N>=0?l[N]:undefined,S=e=>{
    let a=w.current;
    if(a){
      let{above:e,below:r}=function(e){
        let a=e.ownerDocument.defaultView,r=e.getBoundingClientRect(),t=0,n=a?a.innerHeight:r.bottom;
        for(let r=e.parentElement;r&&a;r=r.parentElement){
          if("visible"===a.getComputedStyle(r).overflowY)continue;
          let e=r.getBoundingClientRect();
          t=Math.max(t,e.top),n=Math.min(n,e.bottom)
        }
        return {above:r.top-t,below:n-r.bottom};
      }(a),t=Math.min(32*l.length+10,264),n=r<t+6&&e>r,i=(n?e:r)-10;
      v(n),g(i<t?Math.max(i,72):undefined)
    }
    h(e),k(N>=0?N:0),u(true)
  };
  useEffect(()=>{
    if(!b)return;
    let e=w.current,a=e?.ownerDocument;
    if(!e||!a)return;
    let r=a=>{
      e.contains(a.target)||u(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [b]),useEffect(()=>{
    if(!b)return;
    let e=y.current,a=e?.querySelector(`[data-index="${p}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [b,p]);
  let z=e=>{
    let a=l[e];
    a&&(r(a.value),u(false),w.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={w} className="relative flex">
        <button id={e} type="button" role="combobox" aria-expanded={b} aria-controls={_} aria-haspopup="listbox" aria-activedescendant={b?`${_}-${p}`:undefined} aria-describedby={c} onClick={()=>b?u(false):S(false)} onKeyDown={e=>{
          if(!b){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),S(true));
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),u(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),k(e=>Math.min(e+1,l.length-1));else if("ArrowUp"===e.key)e.preventDefault(),k(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),k(0);else if("End"===e.key)e.preventDefault(),k(l.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),z(p);else if(1===e.key.length&&/\S/.test(e.key)){
            let a=Date.now(),r=j.current;
            r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
            let t=l.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
            t>=0&&k(t)
          }
        }} className={d("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","flex-1")}>
          <span className="truncate">{C?.label}</span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {b&&<ul ref={y} id={_} role="listbox" tabIndex={-1} style={f?{maxHeight:f}:undefined} className={d("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",!x&&"transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","absolute left-0 z-30 max-h-[264px] w-full min-w-[100%]",m?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {l.map((e,r)=>{
            let n=e.value===a;
            return (
              <li key={e.value} id={`${_}-${r}`} role="option" aria-selected={n} data-highlighted={r===p?"":undefined} data-index={r} onMouseEnter={()=>k(r)} onClick={()=>z(r)} className={d("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function S({id:e,label:a,description:r,native:n,inline:l,changed:i,children:o}){
  return (
    <div className={d("px-3 py-2.5",l?"flex items-center justify-between gap-4":"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4")}>
        <div className="min-w-0 flex-1">
          <div className="flex min-h-5 items-center gap-2">
            {n?<label htmlFor={e} className={m}>{a}</label>:<span id={`${e}-label`} className={m}>{a}</span>}
            {i?<span className={d("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>Changed</span>:null}
          </div>
          <p id={`${e}-hint`} className={d("max-w-[60ch] text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5")}>{r}</p>
        </div>
        <div className={l?"shrink-0":"w-full sm:w-80 sm:shrink-0"}>{o}</div>
      </div>
  );
}

let D = (...e)=>e.filter(Boolean).join(" ");

let A = "text-neutral-900 dark:text-neutral-100";

let M = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let W = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let R = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let T = "relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40";

let $ = "h-10";

let B = "h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]";

let I = "flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let U = "max-w-[60ch] text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78";

let H = "flex items-start gap-2 text-[14px]/[20px] font-bold text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]";

let P = D("text-[17px]/[22px] font-extrabold",A);

let V = D("text-[14px]/[20px] font-medium","text-neutral-900/78 dark:text-neutral-100/78");


export default function settings_form_1__Sorbet__Component(){
  let e=useReducedMotion(),{ref:a,edges:r,onScroll:o}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollLeft:t,scrollWidth:n,clientWidth:l}=a;
      r({start:t>1,end:t+l<n-1})
    }, []);
    return useEffect(()=>{
      let a=e.current;
      if(!a)return;
      t();
      let r=a.ownerDocument.defaultView?.ResizeObserver,n=r?new r(t):null;
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),{ref:b,edges:u,onScroll:m}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=a;
      r({start:t>1,end:t+l<n-1})
    }, []);
    return useEffect(()=>{
      let a=e.current;
      if(!a)return;
      t();
      let r=a.ownerDocument.defaultView?.ResizeObserver,n=r?new r(t):null;
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),[z,L]=useState(y[0].id),[E,D]=useState({...j,"ws-name":"Northwind Labs"}),[A,M]=useState(j),[W,R]=useState(false),[T,$]=useState(null),B=useMemo(()=>Object.keys(E).filter(e=>E[e]!==A[e]), [E,A]),I=B.length>0,U=useMemo(()=>y.find(e=>e.fields.some(e=>"checkgroup"===e.kind?e.items.some(e=>B.includes(e.id)):B.includes(e.id))), [B]),H=y.find(e=>e.id===z)??y[0],P=(e,a)=>D(r=>({...r,[e]:a})),V=(e,a,r)=>{
    let n=e===z;
    return <button key={e} type="button" aria-current={n?"page":undefined} onClick={()=>L(e)} className={d("flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]",r)}>{a}</button>;
  };
  return (
    <div className={d("bg-white dark:bg-neutral-950",_,"relative flex h-full min-h-[800px] w-full overflow-hidden")}>
        <aside className={d("border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","hidden w-64 shrink-0 flex-col gap-4 p-4 sm:p-5 lg:flex")}>
          <div className="px-2">
            <h2 className={v}>Settings</h2>
            <p className={d(f,"mt-0.5")}>Northwind Labs</p>
          </div>
          <nav aria-label="Settings sections" className="flex flex-col gap-0.5">{y.map(e=>V(e.id,e.label,"text-left"))}</nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="relative shrink-0 lg:hidden">
            <nav ref={a} onScroll={o} aria-label="Settings sections" className={d("border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex items-center gap-2 overflow-x-auto px-4 py-2")}>{y.map(e=>V(e.id,e.label,"max-w-max shrink-0"))}</nav>
            <div aria-hidden="true" className={d("bg-linear-to-r from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute top-0 bottom-px left-0 w-8",r.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={d("bg-linear-to-l from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute top-0 bottom-px right-0 w-8",r.end?"opacity-100":"opacity-0")} />
          </div>
          <div className="relative min-h-0 flex-1">
            <div ref={b} onScroll={m} className="h-full overflow-y-auto">
              <div className="mx-auto max-w-2xl p-4 sm:p-6">
                <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
                  <div className={d("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","py-3")}>
                    <div className="min-w-0">
                      <h3 className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">{H.title}</h3>
                      <p className={d("text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5")}>{H.blurb}</p>
                    </div>
                  </div>
                  <div className={d("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7")}>
                    {H.fields.map(e=>{
                      let a=`${e.id}-hint`,r="checkgroup"===e.kind?e.items.some(e=>B.includes(e.id)):B.includes(e.id);
                      return "switch"===e.kind?<S key={e.id} id={e.id} label={e.label} description={e.hint} native={false} inline changed={r}>
                        <N id={e.id} checked={!!E[e.id]} onChange={a=>P(e.id,a)} labelledBy={`${e.id}-label`} describedBy={a} />
                      </S>:"checkgroup"===e.kind?<S key={e.id} id={e.id} label={e.label} description={e.hint} native={false} changed={r}>
                        <div role="group" aria-labelledby={`${e.id}-label`} aria-describedby={a} className="flex flex-col gap-2">
                          {e.items.map(e=>(
                            <label key={e.id} className={d(g,"flex cursor-pointer items-center gap-2")}>
                                                    <span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
                                                      <input type="checkbox" checked={!!E[e.id]} onChange={a=>P(e.id,a.target.checked)} className="peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[calc(var(--rb-r-sm,6px))] border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(84%_0.15_165))] checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] indeterminate:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:bg-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:indeterminate:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:shadow-none dark:indeterminate:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:bg-neutral-100/28" />
                                                      <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute scale-50 text-[var(--rb-accent-fg,oklch(26%_0.06_168))] opacity-0 transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:scale-100 peer-indeterminate:opacity-100 peer-active:scale-[0.86] motion-reduce:transition-none dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))]" />
                                                    </span>
                                                    {e.label}
                                                  </label>
                          ))}
                        </div>
                      </S>:<S key={e.id} id={e.id} label={e.label} description={e.hint} native changed={r}>
                        {"select"===e.kind?<C id={e.id} value={String(E[e.id]??"")} onChange={a=>P(e.id,a)} options={e.options} describedBy={a} />:"textarea"===e.kind?<textarea id={e.id} rows={2} value={String(E[e.id]??"")} aria-describedby={a} onChange={a=>P(e.id,a.target.value)} className="block max-h-[280px] min-h-[88px] w-full min-w-48 resize-none rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 py-2.5 text-[15px]/[22px] font-medium text-neutral-900 outline-none field-sizing-content transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-neutral-900/55 hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] aria-invalid:bg-[oklch(97.5%_0.016_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none read-only:shadow-none dark:text-neutral-100 dark:placeholder:text-neutral-100/55 dark:hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:aria-invalid:bg-[oklch(26%_0.04_26)] dark:disabled:text-neutral-100/40" />:"prefix"===e.kind?<div className={d(h,p)}>
                          <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">{e.prefix}</span>
                          <input id={e.id} value={String(E[e.id]??"")} aria-describedby={a} onChange={a=>P(e.id,a.target.value)} className={k} />
                        </div>:<div className={d(h,p)}>
                          <input id={e.id} value={String(E[e.id]??"")} aria-describedby={a} onChange={a=>P(e.id,a.target.value)} className={k} />
                        </div>}
                      </S>;
                    })}
                  </div>
                  <div className={d("flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5","max-sm:flex-col max-sm:items-stretch max-sm:has-[button]:pe-4")}>
                    <p aria-live="polite" className={d(w,"flex min-w-0 items-center gap-2 sm:me-auto")}>
                      {I?<span className="truncate">
                        {"Unsaved changes in "}
                        {U?.label??"Workspace"}
                      </span>:<>
                        <HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className={d("text-neutral-900/62 dark:text-neutral-100/62","shrink-0")} />
                        <span className="truncate">{T?`Saved ${T}`:"All changes saved"}</span>
                      </>}
                    </p>
                    <div className="flex flex-col-reverse gap-2 sm:flex-row">
                      <button type="button" onClick={()=>D(A)} disabled={!I||W} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",x,"w-full sm:w-auto")}>Cancel</button>
                      <button type="button" onClick={()=>{
                        I&&!W&&(R(true),window.setTimeout(()=>{
                          M(E),R(false),$("just now")
                        },700*!e))
                      }} disabled={!I} aria-busy={W} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",x,"w-full min-w-[7.5rem] sm:w-auto")}>
                        <span className="grid place-items-center *:[grid-area:1/1]">
                          <span className={d("inline-flex items-center gap-2",W&&"invisible")}>Save changes</span>
                          {W&&<span className="inline-flex items-center gap-2">
                            <HugeiconsIcon icon={Icon_79715} size={18} strokeWidth={2} aria-hidden="true" className="animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
                            Saving
                          </span>}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
