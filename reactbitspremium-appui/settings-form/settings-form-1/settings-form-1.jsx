/**
 * React Bits Pro — Application UI (settings-form-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { useReducedMotion } from 'motion/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  b = "text-neutral-900/80 dark:text-neutral-100/80",
  h = "text-[13px]/[18px] font-normal",
  p = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  x = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  k = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  v = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  m = c("text-[16px]/[20px] font-[450] tracking-[-0.015em]",u),
  f = c("text-[12px]/[16px] font-normal tabular-nums",b),
  g = c(h,b),
  _ = c(h,b),
  w = [{id:"workspace",label:"Workspace",title:"Workspace",blurb:"Details, defaults, and formats people use across the workspace.",fields:[{kind:"text",id:"ws-name",label:"Name",hint:"Shown in sidebars, invitations, and reports."},{kind:"prefix",id:"ws-slug",label:"Workspace URL",hint:"Lowercase letters, numbers, and hyphens only.",prefix:"northwind.app/"},{kind:"select",id:"ws-region",label:"Primary region",hint:"Where new projects store data by default.",options:[{value:"us-east",label:"US East (N. Virginia)"},{value:"us-west",label:"US West (Oregon)"},{value:"eu-west",label:"Europe (Frankfurt)"},{value:"ap-south",label:"Asia Pacific (Singapore)"}]},{kind:"textarea",id:"ws-description",label:"Description",hint:"A short note for people joining the workspace."},{kind:"select",id:"ws-language",label:"Language",hint:"The default language for shared workspace screens.",options:[{value:"en",label:"English"},{value:"de",label:"German"},{value:"fr",label:"French"},{value:"ja",label:"Japanese"}]},{kind:"select",id:"ws-timezone",label:"Time zone",hint:"Used for timestamps in reports and exports.",options:[{value:"new_york",label:"New York, GMT−05:00"},{value:"london",label:"London, GMT+00:00"},{value:"berlin",label:"Berlin, GMT+01:00"},{value:"tokyo",label:"Tokyo, GMT+09:00"}]},{kind:"select",id:"ws-date",label:"Date format",hint:"How dates appear in shared workspace screens.",options:[{value:"mdy",label:"Aug 5, 2026"},{value:"dmy",label:"5 Aug 2026"},{value:"iso",label:"2026-08-05"}]}]},{id:"billing",label:"Billing",title:"Billing",blurb:"Who is charged, how often, and what appears on the invoice.",fields:[{kind:"select",id:"bl-plan",label:"Plan",hint:"Changes apply on the next invoice.",options:[{value:"team",label:"Team"},{value:"business",label:"Business"},{value:"enterprise",label:"Enterprise"}]},{kind:"select",id:"bl-cycle",label:"Billing cycle",hint:"Annual plans are invoiced once, in advance.",options:[{value:"monthly",label:"Monthly"},{value:"annual",label:"Annual"}]},{kind:"text",id:"bl-email",label:"Billing email",hint:"Invoices and receipts are sent here."},{kind:"textarea",id:"bl-address",label:"Billing address",hint:"Printed on every invoice."},{kind:"text",id:"bl-tax",label:"Tax ID",hint:"Shown on invoices in regions that require it."},{kind:"text",id:"bl-po",label:"Purchase order",hint:"Added to the invoice reference. Leave empty if unused."},{kind:"switch",id:"bl-receipts",label:"Email receipts",hint:"Send a receipt to the billing address after each charge."}]},{id:"notifications",label:"Notifications",title:"Notifications",blurb:"Where workspace activity reaches people, and how often.",fields:[{kind:"checkgroup",id:"nt-email",label:"Email",hint:"Choose which messages reach the inbox.",items:[{id:"nt-email-product",label:"Product updates"},{id:"nt-email-security",label:"Security alerts"},{id:"nt-email-digest",label:"Weekly digest"}]},{kind:"select",id:"nt-digest-day",label:"Digest day",hint:"When the weekly digest is sent.",options:[{value:"monday",label:"Monday"},{value:"friday",label:"Friday"},{value:"sunday",label:"Sunday"}]},{kind:"select",id:"nt-quiet",label:"Quiet hours",hint:"Hold non-urgent alerts until the morning.",options:[{value:"off",label:"Off"},{value:"18-09",label:"18:00 to 09:00"},{value:"22-07",label:"22:00 to 07:00"}]},{kind:"text",id:"nt-reply",label:"Reply-to address",hint:"Where replies to workspace email are delivered."},{kind:"switch",id:"nt-desktop",label:"Desktop alerts",hint:"Show alerts while the app is open."},{kind:"switch",id:"nt-mobile",label:"Mobile push",hint:"Send alerts to signed-in mobile devices."},{kind:"switch",id:"nt-mentions",label:"Mentions",hint:"Notify people when someone mentions their name."}]},{id:"security",label:"Security",title:"Security",blurb:"How members prove who they are and how long they stay signed in.",fields:[{kind:"switch",id:"sc-2fa",label:"Two-factor authentication",hint:"Require a second factor for every member."},{kind:"select",id:"sc-sso",label:"Single sign-on",hint:"Members sign in through your identity provider.",options:[{value:"off",label:"Off"},{value:"okta",label:"Okta"},{value:"google",label:"Google Workspace"}]},{kind:"select",id:"sc-timeout",label:"Session timeout",hint:"Sign members out after this much inactivity.",options:[{value:"8h",label:"8 hours"},{value:"24h",label:"24 hours"},{value:"7d",label:"7 days"},{value:"30d",label:"30 days"}]},{kind:"text",id:"sc-domains",label:"Allowed email domains",hint:"Only these domains can join without an invitation."},{kind:"textarea",id:"sc-ips",label:"IP allowlist",hint:"One CIDR range per line. Empty allows every address."},{kind:"select",id:"sc-audit",label:"Audit log retention",hint:"How long member activity is kept.",options:[{value:"30d",label:"30 days"},{value:"1y",label:"1 year"},{value:"3y",label:"3 years"}]},{kind:"switch",id:"sc-devices",label:"Device approval",hint:"Ask an admin to approve every new device."}]},{id:"advanced",label:"Advanced",title:"Advanced",blurb:"Defaults for projects, the API, and scheduled exports.",fields:[{kind:"select",id:"ad-visibility",label:"New project visibility",hint:"Where new projects start out.",options:[{value:"workspace",label:"Everyone in the workspace"},{value:"private",label:"Only the creator"}]},{kind:"select",id:"ad-rate",label:"API rate limit",hint:"Requests per minute across every key.",options:[{value:"1000",label:"1,000 requests"},{value:"5000",label:"5,000 requests"},{value:"10000",label:"10,000 requests"}]},{kind:"prefix",id:"ad-webhook",label:"Webhook endpoint",hint:"Workspace events are posted here.",prefix:"https://"},{kind:"select",id:"ad-export",label:"Export format",hint:"Used by scheduled workspace exports.",options:[{value:"json",label:"JSON"},{value:"csv",label:"CSV"},{value:"parquet",label:"Parquet"}]},{kind:"prefix",id:"ad-domain",label:"Custom domain",hint:"Serve shared links from your own domain.",prefix:"https://"},{kind:"switch",id:"ad-beta",label:"Beta features",hint:"Try unreleased features before general release."},{kind:"switch",id:"ad-analytics",label:"Usage analytics",hint:"Share anonymous usage data to help prioritise work."}]}],
  y = {"ws-name":"Northwind","ws-slug":"northwind","ws-region":"us-east","ws-description":"Internal tools and dashboards for the operations team. Shared with 24 people.","ws-language":"en","ws-timezone":"new_york","ws-date":"mdy","bl-plan":"business","bl-cycle":"annual","bl-email":"accounts-payable@northwind.co","bl-address":"18 Wharf Road\nLondon N1 7GS\nUnited Kingdom","bl-tax":"GB 428 9971 07","bl-po":"","bl-receipts":true,"nt-email-product":false,"nt-email-security":true,"nt-email-digest":true,"nt-digest-day":"monday","nt-quiet":"18-09","nt-reply":"no-reply@northwind.co","nt-desktop":true,"nt-mobile":false,"nt-mentions":true,"sc-2fa":true,"sc-sso":"okta","sc-timeout":"24h","sc-domains":"northwind.co, contractors.northwind.co","sc-ips":"","sc-audit":"1y","sc-devices":false,"ad-visibility":"workspace","ad-rate":"5000","ad-webhook":"hooks.northwind.co/workspace","ad-export":"json","ad-domain":"","ad-beta":false,"ad-analytics":true};

function j({id:e,checked:a,onChange:t,labelledBy:n,describedBy:i}){
  return (
    <button id={e} type="button" role="switch" aria-checked={a} aria-labelledby={n} aria-describedby={i} onClick={()=>t(!a)} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
        <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
      </button>
  );
}

function N({id:e,value:a,onChange:t,options:i,describedBy:d}){
  let u=useId(),[b,h]=useState(false),[p,x]=useState(false),[k,v]=useState(0),[m,f]=useState(false),[g,_]=useState(undefined),w=useRef(null),y=useRef(null),j=useRef({buffer:"",at:0}),N=i.findIndex(e=>e.value===a),S=N>=0?i[N]:undefined,z=e=>{
    let a=w.current;
    if(a){
      let{above:e,below:t}=function(e){
        let a=e.ownerDocument.defaultView,t=e.getBoundingClientRect(),r=0,n=a?a.innerHeight:t.bottom;
        for(let t=e.parentElement;t&&a;t=t.parentElement){
          if("visible"===a.getComputedStyle(t).overflowY)continue;
          let e=t.getBoundingClientRect();
          r=Math.max(r,e.top),n=Math.min(n,e.bottom)
        }
        return {above:t.top-r,below:n-t.bottom};
      }(a),r=Math.min(32*i.length+10,264),n=t<r+6&&e>t,l=(n?e:t)-10;
      f(n),_(l<r?Math.max(l,72):undefined)
    }
    x(e),v(N>=0?N:0),h(true)
  };
  useEffect(()=>{
    if(!b)return;
    let e=w.current,a=e?.ownerDocument;
    if(!e||!a)return;
    let t=a=>{
      e.contains(a.target)||h(false)
    };
    return a.addEventListener("mousedown",t),a.addEventListener("touchstart",t),()=>{
      a.removeEventListener("mousedown",t),a.removeEventListener("touchstart",t)
    };
  }, [b]),useEffect(()=>{
    if(!b)return;
    let e=y.current,a=e?.querySelector(`[data-index="${k}"]`);
    if(!e||!a)return;
    let t=a.offsetTop,r=t+a.offsetHeight;
    t<e.scrollTop?e.scrollTop=t:r>e.scrollTop+e.clientHeight&&(e.scrollTop=r-e.clientHeight)
  }, [b,k]);
  let C=e=>{
    let a=i[e];
    a&&(t(a.value),h(false),w.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={w} className="relative flex">
        <button id={e} type="button" role="combobox" aria-expanded={b} aria-controls={u} aria-haspopup="listbox" aria-activedescendant={b?`${u}-${k}`:undefined} aria-describedby={d} onClick={()=>b?h(false):z(false)} onKeyDown={e=>{
          if(!b){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),z(true));
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),h(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),v(e=>Math.min(e+1,i.length-1));else if("ArrowUp"===e.key)e.preventDefault(),v(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),v(0);else if("End"===e.key)e.preventDefault(),v(i.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),C(k);else if(1===e.key.length&&/\S/.test(e.key)){
            let a=Date.now(),t=j.current;
            t.buffer=a-t.at>700?e.key:t.buffer+e.key,t.at=a;
            let r=i.findIndex(e=>e.label.toLowerCase().startsWith(t.buffer.toLowerCase()));
            r>=0&&v(r)
          }
        }} className={c("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","flex-1")}>
          <span className="truncate">{S?.label}</span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {b&&<ul ref={y} id={u} role="listbox" tabIndex={-1} style={g?{maxHeight:g}:undefined} className={c("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",!p&&"transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute left-0 z-30 max-h-[264px] w-full min-w-[100%]",m?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {i.map((e,t)=>{
            let n=e.value===a;
            return (
              <li key={e.value} id={`${u}-${t}`} role="option" aria-selected={n} data-highlighted={t===k?"":undefined} data-index={t} onMouseEnter={()=>v(t)} onClick={()=>C(t)} className={c("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function S({id:e,label:a,description:t,native:n,inline:i,changed:l,children:s}){
  return (
    <div className={c("px-3 py-2.5",i?"flex items-center justify-between gap-4":"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4")}>
        <div className="min-w-0 flex-1">
          <div className="flex min-h-5 items-center gap-2">
            {n?<label htmlFor={e} className={v}>{a}</label>:<span id={`${e}-label`} className={v}>{a}</span>}
            {l?<span className={c("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>Changed</span>:null}
          </div>
          <p id={`${e}-hint`} className={c("max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>{t}</p>
        </div>
        <div className={i?"shrink-0":"w-full sm:w-80 sm:shrink-0"}>{s}</div>
      </div>
  );
}

function z(){
  let e=useReducedMotion(),{ref:a,edges:t,onScroll:s}=function(){
    let e=useRef(null),[a,t]=useState({start:false,end:false}),r=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollLeft:r,scrollWidth:n,clientWidth:i}=a;
      t({start:r>1,end:r+i<n-1})
    }, []);
    return useEffect(()=>{
      let a=e.current;
      if(!a)return;
      r();
      let t=a.ownerDocument.defaultView?.ResizeObserver,n=t?new t(r):null;
      return observe(a),()=>disconnect();
    }, [r]),{ref:e,edges:a,onScroll:r};
  }(),{ref:b,edges:h,onScroll:v}=function(){
    let e=useRef(null),[a,t]=useState({start:false,end:false}),r=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:r,scrollHeight:n,clientHeight:i}=a;
      t({start:r>1,end:r+i<n-1})
    }, []);
    return useEffect(()=>{
      let a=e.current;
      if(!a)return;
      r();
      let t=a.ownerDocument.defaultView?.ResizeObserver,n=t?new t(r):null;
      return observe(a),()=>disconnect();
    }, [r]),{ref:e,edges:a,onScroll:r};
  }(),[z,C]=useState(w[0].id),[E,A]=useState({...y,"ws-name":"Northwind Labs"}),[D,W]=useState(y),[M,T]=useState(false),[B,R]=useState(null),L=useMemo(()=>Object.keys(E).filter(e=>E[e]!==D[e]), [E,D]),q=L.length>0,I=useMemo(()=>w.find(e=>e.fields.some(e=>"checkgroup"===e.kind?e.items.some(e=>L.includes(e.id)):L.includes(e.id))), [L]),O=w.find(e=>e.id===z)??w[0],P=(e,a)=>A(t=>({...t,[e]:a})),$=(e,a,t)=>{
    let n=e===z;
    return <button key={e} type="button" aria-current={n?"page":undefined} onClick={()=>C(e)} className={c("flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",t)}>{a}</button>;
  };
  return (
    <div className={c("bg-white dark:bg-neutral-950",u,"relative flex h-full min-h-[800px] w-full overflow-hidden")}>
        <aside className={c("border-r border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","hidden w-64 shrink-0 flex-col gap-4 p-4 sm:p-5 lg:flex")}>
          <div className="px-2">
            <h2 className={m}>Settings</h2>
            <p className={c(f,"mt-0.5")}>Northwind Labs</p>
          </div>
          <nav aria-label="Settings sections" className="flex flex-col gap-0.5">{w.map(e=>$(e.id,e.label,"text-left"))}</nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="relative shrink-0 lg:hidden">
            <nav ref={a} onScroll={s} aria-label="Settings sections" className={c("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","flex items-center gap-2 overflow-x-auto px-4 py-2")}>{w.map(e=>$(e.id,e.label,"max-w-max shrink-0"))}</nav>
            <div aria-hidden="true" className={c("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute top-0 bottom-px left-0 w-8",t.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={c("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute top-0 bottom-px right-0 w-8",t.end?"opacity-100":"opacity-0")} />
          </div>
          <div className="relative min-h-0 flex-1">
            <div ref={b} onScroll={v} className="h-full overflow-y-auto">
              <div className="mx-auto max-w-2xl p-4 sm:p-6">
                <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
                  <div className={c("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","py-3")}>
                    <div className="min-w-0">
                      <h3 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{O.title}</h3>
                      <p className={c("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>{O.blurb}</p>
                    </div>
                  </div>
                  <div className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8")}>
                    {O.fields.map(e=>{
                      let a=`${e.id}-hint`,t="checkgroup"===e.kind?e.items.some(e=>L.includes(e.id)):L.includes(e.id);
                      return "switch"===e.kind?<S key={e.id} id={e.id} label={e.label} description={e.hint} native={false} inline changed={t}>
                        <j id={e.id} checked={!!E[e.id]} onChange={a=>P(e.id,a)} labelledBy={`${e.id}-label`} describedBy={a} />
                      </S>:"checkgroup"===e.kind?<S key={e.id} id={e.id} label={e.label} description={e.hint} native={false} changed={t}>
                        <div role="group" aria-labelledby={`${e.id}-label`} aria-describedby={a} className="flex flex-col gap-2">
                          {e.items.map(e=>(
                            <label key={e.id} className={c(g,"flex cursor-pointer items-center gap-2")}>
                                                    <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                                                      <input type="checkbox" checked={!!E[e.id]} onChange={a=>P(e.id,a.target.checked)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                                                      <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                                                    </span>
                                                    {e.label}
                                                  </label>
                          ))}
                        </div>
                      </S>:<S key={e.id} id={e.id} label={e.label} description={e.hint} native changed={t}>
                        {"select"===e.kind?<N id={e.id} value={String(E[e.id]??"")} onChange={a=>P(e.id,a)} options={e.options} describedBy={a} />:"textarea"===e.kind?<textarea id={e.id} rows={2} value={String(E[e.id]??"")} aria-describedby={a} onChange={a=>P(e.id,a.target.value)} className="block max-h-[256px] min-h-[76px] w-full min-w-48 resize-none rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 py-2 text-[14px]/[20px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none field-sizing-content transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-neutral-900/66 hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none read-only:border-transparent read-only:bg-neutral-900/5 read-only:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:placeholder:text-neutral-100/66 dark:hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40 dark:read-only:bg-neutral-100/5" />:"prefix"===e.kind?<div className={c(x,"h-8")}>
                          <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">{e.prefix}</span>
                          <input id={e.id} value={String(E[e.id]??"")} aria-describedby={a} onChange={a=>P(e.id,a.target.value)} className={k} />
                        </div>:<div className={c(x,"h-8")}>
                          <input id={e.id} value={String(E[e.id]??"")} aria-describedby={a} onChange={a=>P(e.id,a.target.value)} className={k} />
                        </div>}
                      </S>;
                    })}
                  </div>
                  <div className={c("flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2","max-sm:flex-col max-sm:items-stretch max-sm:has-[button]:pe-4")}>
                    <p aria-live="polite" className={c(_,"flex min-w-0 items-center gap-2 sm:me-auto")}>
                      {q?<span className="truncate">
                        {"Unsaved changes in "}
                        {I?.label??"Workspace"}
                      </span>:<>
                        <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className={c("text-neutral-900/66 dark:text-neutral-100/66","shrink-0")} />
                        <span className="truncate">{B?`Saved ${B}`:"All changes saved"}</span>
                      </>}
                    </p>
                    <div className="flex flex-col-reverse gap-2 sm:flex-row">
                      <button type="button" onClick={()=>A(D)} disabled={!q||M} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",p,"w-full sm:w-auto")}>Cancel</button>
                      <button type="button" onClick={()=>{
                        q&&!M&&(T(true),window.setTimeout(()=>{
                          W(E),T(false),R("just now")
                        },700*!e))
                      }} disabled={!q} aria-busy={M} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",p,"w-full min-w-[7.5rem] sm:w-auto")}>
                        <span className="grid place-items-center *:[grid-area:1/1]">
                          <span className={c("inline-flex items-center gap-2",M&&"invisible")}>Save changes</span>
                          {M&&<span className="inline-flex items-center gap-2">
                            <HugeiconsIcon icon={Icon_79715} size={16} strokeWidth={1.8} aria-hidden="true" className="animate-spin [animation-duration:800ms] motion-reduce:animate-none" />
                            Saving
                          </span>}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",h.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",h.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default z;
