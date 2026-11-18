/**
 * React Bits Pro — Application UI (settings-form-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { useReducedMotion } from 'motion/react';

const Icon_6097 = [["path",{d:"M5.25 21H18.75C18.9822 21 19.0983 21 19.196 20.9904C20.1456 20.8968 20.8968 20.1456 20.9904 19.196C21 19.0983 21 18.9822 21 18.75C21 18.5178 21 18.4017 20.9904 18.304C20.8968 17.3544 20.1456 16.6032 19.196 16.5096C19.0983 16.5 18.9822 16.5 18.75 16.5H17.0607C16.8324 16.5 16.7182 16.5 16.6087 16.5121C16.2317 16.5538 15.8742 16.7018 15.5781 16.939C15.4921 17.0079 15.4114 17.0886 15.25 17.25C15.0886 17.4114 15.0079 17.4921 14.9219 17.561C14.6258 17.7982 14.2683 17.9462 13.8913 17.9879C13.7818 18 13.6676 18 13.4393 18H10.5607C10.3324 18 10.2182 18 10.1087 17.9879C9.73165 17.9462 9.37423 17.7982 9.07814 17.561C8.99213 17.4921 8.91142 17.4114 8.75 17.25C8.58858 17.0886 8.50787 17.0079 8.42186 16.939C8.12577 16.7018 7.76835 16.5538 7.3913 16.5121C7.28177 16.5 7.16763 16.5 6.93934 16.5H5.25C5.01783 16.5 4.90175 16.5 4.80397 16.5096C3.85441 16.6032 3.10315 17.3544 3.00963 18.304C3 18.4017 3 18.5178 3 18.75C3 18.9822 3 19.0983 3.00963 19.196C3.10315 20.1456 3.85441 20.8968 4.80397 20.9904C4.90175 21 5.01783 21 5.25 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.5 7.49996C16.5 7.49996 13.1858 3.00001 12 3C10.8141 2.99999 7.5 7.5 7.5 7.5M12 4V15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
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

let O = {name:"Mara Whitfield",username:"mara.whitfield",email:"mara.whitfield@northwind.co",role:"Product designer",bio:"Designing the tools our operations team uses every day. Previously at Fieldbase."};

function F({id:e,label:a,description:r,native:n,changed:l,children:i}){
  return (
    <div className="flex flex-col gap-3 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex min-h-5 items-center gap-2">
            {n?<label htmlFor={e} className={I}>{a}</label>:<span id={`${e}-label`} className={I}>{a}</span>}
            {l?<span className={D("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>Changed</span>:null}
          </div>
          <p id={`${e}-hint`} className={D(U,"mt-0.5")}>{r}</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-80 sm:shrink-0">{i}</div>
      </div>
  );
}


export default function settings_form_2__Sorbet__Component(){
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
  }(),o=useReducedMotion(),[d,_]=useState({...O,username:"mara"}),[b,u]=useState(O),[x,h]=useState(false),[p,k]=useState(null),m=useRef(null);
  useEffect(()=>{
    if(p)return ()=>URL.revokeObjectURL(p);
  }, [p]);
  let v=e=>a=>_(r=>({...r,[e]:a})),f=useMemo(()=>{
    let e=d.username.trim();
    return e.length<3?"Use at least 3 characters.":/^[a-z0-9-]+$/.test(e)?"mara"===e?"mara is taken. Try another handle.":undefined:"Use lowercase letters, numbers, and hyphens only.";
  }, [d.username]),g=d.bio.length>160?`Remove ${d.bio.length-160} characters to fit the limit.`:undefined,w=useMemo(()=>Object.keys(d).filter(e=>d[e]!==b[e]), [d,b]),y=w.length>0,j=y&&!f&&!g;
  return (
    <div className={D("bg-white dark:bg-neutral-950",A,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0 px-4 sm:px-6">
          <div className="mx-auto flex h-14 w-full max-w-2xl items-center"><h2 className={D(P,"truncate")}>Public profile</h2></div>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={r} className="h-full overflow-y-auto px-4 sm:px-6">
            <div className="mx-auto w-full max-w-2xl pb-4 sm:pb-6">
              <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
                <div className={D("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","py-3")}>
                  <div className="min-w-0">
                    <h3 className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">Account</h3>
                    <p className={D("text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5")}>The profile other people see when you collaborate.</p>
                  </div>
                </div>
                <div className={D("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7")}>
                  <div className="flex flex-col gap-3 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex min-h-5 items-center"><p className={I}>Profile photo</p></div>
                      <p className={D(U,"mt-0.5")}>JPG, PNG, or GIF up to 2 MB.</p>
                    </div>
                    <div className="flex w-full items-center gap-3 sm:w-80 sm:shrink-0 sm:justify-end">
                      <input ref={m} type="file" accept="image/png,image/jpeg,image/gif" className="sr-only" aria-label="Upload a profile photo" onChange={e=>{
                        let a=e.target.files?.[0];
                        a&&k(URL.createObjectURL(a)),e.target.value=""
                      }} />
                      <span className={D("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-10")}>
                        {p?<img src={p} alt="Your profile photo" className="size-full object-cover" />:<span aria-hidden="true" className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">MW</span>}
                      </span>
                      <div className="flex min-w-0 flex-1 flex-wrap justify-end gap-2 sm:flex-none">
                        <button type="button" className={D(M,R)} onClick={()=>m.current?.click()}>
                          <HugeiconsIcon icon={Icon_6097} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                          Change
                        </button>
                        {p?<button type="button" className={D(M,R)} onClick={()=>k(null)}>
                          <HugeiconsIcon icon={Icon_34951} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                          Remove
                        </button>:null}
                      </div>
                    </div>
                  </div>
                  <F id="pf-name" changed={w.includes("name")} label="Full name" description="Shown with comments, edits, and shared documents." native>
                    <div className={D(T,$)}>
                      <input id="pf-name" value={d.name} aria-describedby="pf-name-hint" onChange={e=>v("name")(e.target.value)} className={B} />
                    </div>
                  </F>
                  <F id="pf-role" changed={w.includes("role")} label="Title" description="A short role that appears beneath your name." native>
                    <div className={D(T,$)}>
                      <input id="pf-role" value={d.role} aria-describedby="pf-role-hint" onChange={e=>v("role")(e.target.value)} className={B} />
                    </div>
                  </F>
                  <F id="pf-username" changed={w.includes("username")} label="Username" description="This is the address of your public profile." native>
                    <div className={D(T,$)}>
                      <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">northwind.co/</span>
                      <input id="pf-username" value={d.username} aria-invalid={!!f||undefined} aria-describedby={f?"pf-username-error pf-username-hint":"pf-username-hint"} onChange={e=>v("username")(e.target.value)} className={B} />
                    </div>
                    {f?<p id="pf-username-error" role="alert" className={H}>
                      <HugeiconsIcon icon={Icon_27476} size={18} strokeWidth={2} aria-hidden="true" className="mt-px shrink-0" />
                      {f}
                    </p>:null}
                  </F>
                  <F id="pf-email" changed={w.includes("email")} label="Email" description="Used for sign-in and account notices." native>
                    <div className={D(T,$)}>
                      <input id="pf-email" type="email" value={d.email} aria-describedby="pf-email-hint pf-email-help" onChange={e=>v("email")(e.target.value)} className={B} />
                    </div>
                    <p id="pf-email-help" className={U}>Never shown publicly.</p>
                  </F>
                  <F id="pf-bio" changed={w.includes("bio")} label="Bio" description="A short line under your name." native>
                    <textarea id="pf-bio" rows={3} value={d.bio} aria-invalid={!!g||undefined} aria-describedby={g?"pf-bio-error pf-bio-hint":"pf-bio-hint pf-bio-count"} onChange={e=>v("bio")(e.target.value)} className="block max-h-[280px] min-h-[88px] w-full min-w-48 resize-none rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 py-2.5 text-[15px]/[22px] font-medium text-neutral-900 outline-none field-sizing-content transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-neutral-900/55 hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] aria-invalid:bg-[oklch(97.5%_0.016_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none read-only:shadow-none dark:text-neutral-100 dark:placeholder:text-neutral-100/55 dark:hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:aria-invalid:bg-[oklch(26%_0.04_26)] dark:disabled:text-neutral-100/40" />
                    {g?<p id="pf-bio-error" role="alert" className={H}>
                      <HugeiconsIcon icon={Icon_27476} size={18} strokeWidth={2} aria-hidden="true" className="mt-px shrink-0" />
                      {g}
                    </p>:<p id="pf-bio-count" className={D(U,"text-right")}>
                      <span className="tabular-nums">{d.bio.length}</span>
                      {" "}
                      {"of "}
                      <span className="tabular-nums">160</span>
                      {" "}
                      characters
                    </p>}
                  </F>
                </div>
                <div className={D("flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5","max-sm:flex-col max-sm:items-stretch max-sm:has-[button]:pe-4")}>
                  <p aria-live="polite" className={D(V,"flex min-w-0 items-center gap-2 sm:me-auto")}>
                    {y?<span className="truncate">Unsaved profile changes</span>:<>
                      <HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className={D("text-neutral-900/62 dark:text-neutral-100/62","shrink-0")} />
                      <span className="truncate">Profile up to date</span>
                    </>}
                  </p>
                  <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <button type="button" onClick={()=>_(b)} disabled={!y||x} className={D(M,W,"w-full sm:w-auto")}>Cancel</button>
                    <button type="button" onClick={()=>{
                      j&&!x&&(h(true),window.setTimeout(()=>{
                        u(d),h(false)
                      },700*!o))
                    }} disabled={!j} aria-busy={x} className={D("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",W,"w-full min-w-[7.5rem] sm:w-auto")}>
                      <span className="grid place-items-center *:[grid-area:1/1]">
                        <span className={D("inline-flex items-center gap-2",x&&"invisible")}>Save profile</span>
                        {x&&<span className="inline-flex items-center gap-2">
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
          <div aria-hidden="true" className={D("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",a.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={D("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",a.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
