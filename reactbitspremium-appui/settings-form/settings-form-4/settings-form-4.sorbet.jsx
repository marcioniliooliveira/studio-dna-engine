/**
 * React Bits Pro — Application UI (settings-form-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, observe, push, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

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

let eb = (...e)=>e.filter(Boolean).join(" ");

let eu = "text-neutral-900 dark:text-neutral-100";

let ex = "text-neutral-900/78 dark:text-neutral-100/78";

let eh = "text-neutral-900/62 dark:text-neutral-100/62";

let ep = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let ek = "min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]";

let em = "relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40";

let ev = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let ef = eb("text-[17px]/[22px] font-extrabold",eu);

let eg = eb("text-[15px]/[20px] font-bold",eu);

let ew = eb("text-[15px]/[22px] font-medium",eh);

let ey = eb("text-[14px]/[20px] font-medium",ex);

function ej(e){
  let a=e.ownerDocument.defaultView,r=e.getBoundingClientRect(),t=0,n=a?a.innerHeight:r.bottom;
  for(let r=e.parentElement;r&&a;r=r.parentElement){
    if("visible"===a.getComputedStyle(r).overflowY)continue;
    let e=r.getBoundingClientRect();
    t=Math.max(t,e.top),n=Math.min(n,e.bottom)
  }
  return {above:r.top-t,below:n-r.bottom};
}

let eN = [{value:"owner",label:"Owner"},{value:"admin",label:"Admin"},{value:"member",label:"Member"},{value:"billing",label:"Billing"},{value:"viewer",label:"Viewer"}];

let eC = [{id:"m1",name:"Mara Whitfield",email:"mara.whitfield@northwind.co",initials:"MW",role:"owner",status:"active"},{id:"m2",name:"Devan Rao",email:"devan@northwind.co",initials:"DR",role:"admin",status:"active"},{id:"m3",name:"Priyanka Balasubramanian",email:"priyanka.b@northwind.co",initials:"PB",role:"member",status:"active"},{id:"m4",name:"Tom Ek",email:"tom@contractors.northwind.co",initials:"TE",role:"viewer",status:"active"},{id:"m5",name:"Jules Moreau",email:"jules.moreau@northwind.co",initials:"JM",role:"member",status:"invited"},{id:"m6",name:"Sofia Castellano",email:"sofia@northwind.co",initials:"SC",role:"billing",status:"active"}];

function eS({status:e}){
  let a={active:{tone:"text-neutral-900/78 dark:text-neutral-100/78",label:"Active"},invited:{tone:"text-neutral-900 dark:text-neutral-100",label:"Invited"}}[e];
  return <span className={eb("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",a.tone)}>{a.label}</span>;
}

function ez({id:e,value:a,onChange:r,options:l,label:c}){
  let d=useId(),[_,b]=useState(false),[u,x]=useState(false),[h,p]=useState(0),[k,m]=useState(false),[v,f]=useState(undefined),g=useRef(null),w=useRef(null),y=useRef({buffer:"",at:0}),j=l.findIndex(e=>e.value===a),N=j>=0?l[j]:undefined,C=e=>{
    let a=g.current;
    if(a){
      let{above:e,below:r}=ej(a),t=Math.min(32*l.length+10,264),n=r<t+6&&e>r,i=(n?e:r)-10;
      m(n),f(i<t?Math.max(i,72):undefined)
    }
    x(e),p(j>=0?j:0),b(true)
  };
  useEffect(()=>{
    if(!_)return;
    let e=g.current,a=e?.ownerDocument;
    if(!e||!a)return;
    let r=a=>{
      e.contains(a.target)||b(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [_]),useEffect(()=>{
    if(!_)return;
    let e=w.current,a=e?.querySelector(`[data-index="${h}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [_,h]);
  let S=e=>{
    let a=l[e];
    a&&(r(a.value),b(false),g.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={g} className="relative flex">
        <label htmlFor={e} className="sr-only">{c}</label>
        <button id={e} type="button" role="combobox" aria-expanded={_} aria-controls={d} aria-haspopup="listbox" aria-activedescendant={_?`${d}-${h}`:undefined} onClick={()=>_?b(false):C(false)} onKeyDown={e=>{
          if(!_){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),C(true));
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),b(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),p(e=>Math.min(e+1,l.length-1));else if("ArrowUp"===e.key)e.preventDefault(),p(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),p(0);else if("End"===e.key)e.preventDefault(),p(l.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),S(h);else if(1===e.key.length&&/\S/.test(e.key)){
            let a=Date.now(),r=y.current;
            r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
            let t=l.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
            t>=0&&p(t)
          }
        }} className={eb("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","min-w-[0px] flex-1")}>
          <span className="truncate">{N?.label}</span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {_&&<ul ref={w} id={d} role="listbox" tabIndex={-1} style={v?{maxHeight:v}:undefined} className={eb(ek,!u&&ev,"absolute left-0 z-30 max-h-[264px] w-full min-w-full",k?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {l.map((e,r)=>{
            let n=e.value===a;
            return (
              <li key={e.value} id={`${d}-${r}`} role="option" aria-selected={n} data-highlighted={r===h?"":undefined} data-index={r} onMouseEnter={()=>p(r)} onClick={()=>S(r)} className={eb(em,"pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function eL({label:e,items:a}){
  let[r,l]=useState(false),[o,s]=useState(false),[c,d]=useState(false),[_,b]=useState(0),u=useRef(null),x=useRef(null),h=useRef([]),p=e=>{
    l(false),e&&x.current?.focus({preventScroll:true})
  };
  useEffect(()=>{
    if(!r)return;
    let e=u.current?.ownerDocument??document,a=e=>{
      u.current&&!u.current.contains(e.target)&&p(false)
    },t=e=>{
      "Escape"===e.key&&(e.stopPropagation(),p(true))
    };
    return e.addEventListener("pointerdown",a),e.addEventListener("keydown",t),()=>{
      e.removeEventListener("pointerdown",a),e.removeEventListener("keydown",t)
    };
  }, [r]),useEffect(()=>{
    r&&h.current[_]?.focus({preventScroll:true})
  }, [r,_]);
  let k=(e,r)=>{
    let t=u.current;
    if(t){
      let{above:e,below:r}=ej(t);
      d(r<32*a.length+9*!!a.some(e=>e.danger)+12&&e>r)
    }
    s(r),b(e),l(true)
  },m=e=>b(r=>(r+e+a.length)%a.length);
  return (
    <div ref={u} className="relative shrink-0">
        <button ref={x} type="button" aria-label={e} aria-haspopup="menu" aria-expanded={r} onClick={e=>r?p(false):k(0,0===e.detail)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),k(0,true)):"ArrowUp"===e.key&&(e.preventDefault(),k(a.length-1,true))
        }} className={eb("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-10 rounded-[calc(var(--rb-r-full,999px))]")}>
          <HugeiconsIcon icon={Icon_59649} size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        {r?<div role="menu" aria-label={e} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),m(1)):"ArrowUp"===e.key?(e.preventDefault(),m(-1)):"Home"===e.key?(e.preventDefault(),b(0)):"End"===e.key?(e.preventDefault(),b(a.length-1)):"Tab"===e.key&&p(false)
        }} className={eb(ek,!o&&ev,"absolute right-0 z-30 w-[176px] min-w-[176px]",c?"bottom-9":"top-9")}>
          {a.map((e,a)=>(
            <Fragment key={e.id}>
                    {e.danger?<div role="separator" className="mx-1 my-2 h-[1.5px] rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:bg-neutral-100/8" />:null}
                    <button ref={e=>{
                      h.current[a]=e
                    }} type="button" role="menuitem" tabIndex={a===_?0:-1} onFocus={()=>b(a)} onClick={()=>{
                      e.run(),p(true)
                    }} className={e.danger?"relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold outline-none select-none [&_svg]:shrink-0 text-[oklch(51%_0.18_26)] hover:bg-[oklch(96%_0.03_26)] focus-visible:bg-[oklch(96%_0.03_26)] data-[highlighted]:bg-[oklch(96%_0.03_26)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-[oklch(78%_0.13_26)] dark:hover:bg-[oklch(30%_0.065_26)] dark:focus-visible:bg-[oklch(30%_0.065_26)] dark:data-[highlighted]:bg-[oklch(30%_0.065_26)] dark:aria-disabled:text-neutral-100/40":em}>{e.label}</button>
                  </Fragment>
          ))}
        </div>:null}
      </div>
  );
}


export default function settings_form_4__Sorbet__Component(){
  let{ref:e,edges:a,onScroll:r}=function(){
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
  }(),[l,o]=useState(eC),[s,c]=useState(""),[d,_]=useState(null),[b,u]=useState("member"),[x,h]=useState(null),p=useRef(eC.length);
  useEffect(()=>{
    if(!x)return;
    let e=window.setTimeout(()=>h(null),2400);
    return ()=>window.clearTimeout(e);
  }, [x]);
  let k=(e,a)=>h({id:e,text:a,at:Date.now()}),m=l.length,v=m>=10;
  return (
    <div className={eb("bg-white dark:bg-neutral-950",eu,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0 px-4 sm:px-6">
          <div className="mx-auto flex h-14 w-full max-w-2xl items-center"><h2 className={eb(ef,"truncate")}>Members</h2></div>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={r} className="h-full overflow-y-auto px-4 sm:px-6">
            <div className="mx-auto w-full max-w-2xl pb-4 sm:pb-6">
              <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
                <div className={eb("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","py-3")}>
                  <div className="min-w-0">
                    <h3 className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">Team access</h3>
                    <p className={eb("text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5")}>Invite people and keep role assignments aligned.</p>
                  </div>
                </div>
                <div className={eb("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0",ep)}>
                  <form onSubmit={e=>{
                    e.preventDefault(),(()=>{
                      let e=s.trim();
                      if(v)return _("All seats are in use. Remove a member first.");
                      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))return _("Enter a valid email address.");
                      if(l.some(a=>a.email.toLowerCase()===e.toLowerCase()))return _("That person is already on the team.");
                      _(null);
                      let a=e.split("@")[0].replace(/[._-]+/g," "),r=a.split(" ").map(e=>e[0]?.toUpperCase()??"").slice(0,2).join("");
                      p.current+=1;
                      let t=`m${p.current}`;
                      o(n=>[...n,{id:t,name:a.replace(/\b\w/g,e=>e.toUpperCase()),email:e,initials:r||"?",role:b,status:"invited"}]),c(""),k(t,"Invitation sent")
                    })()
                  }} className="flex flex-col gap-2 px-3 py-2.5">
                    <div className="flex flex-col gap-0.5">
                      <p className="flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100">Invite member</p>
                      <p id="invite-hint" className="max-w-[60ch] text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78">
                        {v?"All seats are in use. Remove a member to invite someone new.":"Send an invitation with the right role from the start."}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <label htmlFor="invite-email" className="sr-only">Email address</label>
                      <div className={eb("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10","sm:flex-1")}>
                        <input id="invite-email" type="email" placeholder="name@company.com" value={s} aria-invalid={!!d||undefined} aria-describedby={d?"invite-error invite-hint":"invite-hint"} onChange={e=>{
                          c(e.target.value),d&&_(null)
                        }} className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
                      </div>
                      <div className="sm:w-40">
                        <ez id="invite-role" value={b} onChange={u} label="Role for invite" options={eN.filter(e=>"owner"!==e.value)} />
                      </div>
                      <button type="submit" className={eb("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
                        <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
                        Send invite
                      </button>
                    </div>
                    {d?<p id="invite-error" role="alert" className="flex items-start gap-2 text-[14px]/[20px] font-bold text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]">
                      <HugeiconsIcon icon={Icon_27476} size={18} strokeWidth={2} aria-hidden="true" className="mt-px shrink-0" />
                      {d}
                    </p>:null}
                  </form>
                  <ul className={eb(ep,"flex flex-col")}>
                    {l.map(e=>{
                      let a,r="owner"===e.role,n=[];
                      return "invited"===e.status&&push({id:"resend",label:"Resend invite",run:()=>k(e.id,"Invitation resent")}),push({id:"copy",label:"Copy email address",run:()=>{
                        navigator.clipboard?.writeText(e.email),k(e.id,"Email address copied")
                      }}),r||push({id:"remove",label:"Remove from team",danger:true,run:()=>{
                        let a;
                        return a=e.id,o(e=>e.filter(e=>e.id!==a));
                      }}),<li key={e.id} className="flex flex-wrap items-center gap-x-3 gap-y-2.5 px-3 py-2.5">
                        <span aria-hidden="true" className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
                          <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{e.initials}</span>
                        </span>
                        <div className="min-w-0 flex-1 basis-0">
                          <p className={eb(eg,"truncate")}>{e.name}</p>
                          <p className={eb("text-[13px]/[16px] font-semibold tabular-nums",x?.id===e.id?ex:eh,"truncate")}>{x?.id===e.id?x.text:e.email}</p>
                        </div>
                        <div className="order-last flex w-full items-center gap-3 sm:order-none sm:w-auto">
                          <div className="flex w-20 shrink-0"><eS status={e.status} /></div>
                          {r?<p className={eb(ew,"flex h-8 flex-1 items-center px-3 sm:w-32 sm:flex-none")}>{a=e.role,eN.find(e=>e.value===a)?.label??a}</p>:<div className="flex-1 sm:w-32 sm:flex-none">
                            <ez id={`role-${e.id}`} value={e.role} onChange={a=>{
                              let r;
                              return r=e.id,o(e=>e.map(e=>e.id===r?{...e,role:a}:e));
                            }} label={`Role for ${e.name}`} options={eN.filter(e=>"owner"!==e.value)} />
                          </div>}
                        </div>
                        <eL label={`Actions for ${e.name}`} items={n} />
                      </li>;
                    })}
                  </ul>
                </div>
                <div className={eb("flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5","justify-between max-sm:flex-col max-sm:items-stretch")}>
                  <p aria-live="polite" className={ey}>
                    {x?x.text:<>
                      <span className="tabular-nums">{m}</span>
                      {" of"}
                      {" "}
                      10
                      {" seats used"}
                    </>}
                  </p>
                  <div aria-hidden="true" className={eb("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","sm:w-32")}>
                    <div className="block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{width:`${Math.min(100,m/10*100)}%`}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={eb("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",a.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={eb("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",a.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
