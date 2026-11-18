/**
 * React Bits Pro — Application UI (feedback-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_67812 = [["path",{d:"M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_78805 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 15H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 9H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_22670 = [["path",{d:"M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_59037 = [["circle",{cx:"1.5",cy:"1.5",r:"1.5",transform:"matrix(1 0 0 -1 16 8.00024)",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M7.00002 14.0002L10 17.0002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  h = "text-[13px]/[18px] font-normal",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  m = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  k = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  f = "bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100",
  v = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  g = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  w = "relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",
  y = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900",
  j = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900",
  N = b(h,"text-neutral-900/80 dark:text-neutral-100/80"),
  S = b(h,x),
  z = b("text-[12px]/[16px] font-normal tabular-nums",x),
  A = {widget:Icon_36586,email:Icon_67812,survey:Icon_78805},
  W = [{id:"f1",plan:"Pro",seats:"42 of 50",age:"2y 3m",history:"9 notes",related:[{quote:"The CSV export loses a column now and then.",person:"R. Okafor"},{quote:"Export ran twice and produced different totals.",person:"L. Fontaine"}],person:"Amelia Whitfield",company:"Halcyon Pay",source:"widget",sentiment:"Negative",time:"12m",unread:true,subject:"Export silently drops the last column",body:"Running the Monday revenue export drops the final column about one time in five. It is always the last one, whatever it happens to be. We only noticed because a total stopped matching the invoice run.",tags:["Exports","Data loss"],page:"/reports/revenue"},{id:"f2",plan:"Scale",seats:"118 of 150",age:"1y 1m",history:"3 notes",related:[{quote:"Saved views finally let us delete the master sheet.",person:"K. Osei"},{quote:"Shared a view with finance and they stopped emailing me.",person:"D. Ferreira"}],person:"Jonas Vikander",company:"Meridian",source:"survey",sentiment:"Positive",time:"1h",unread:true,subject:"Saved views replaced our spreadsheet",body:"We retired a 40 tab spreadsheet last month. The team stopped asking me to rebuild charts, which is the first time that has happened in two years.",tags:["Saved views"],page:"NPS survey"},{id:"f3",plan:"Pro",seats:"64 of 80",age:"8m",history:"5 notes",related:[{quote:"SAML is the only thing blocking our rollout.",person:"H. Lindqvist"},{quote:"We need SSO before legal will renew.",person:"M. Rahimi"}],person:"Wei Chen",company:"Acme",source:"email",sentiment:"Neutral",time:"3h",unread:false,subject:"Can we get SSO on the Pro plan?",body:"Security will not sign off without SAML. We do not need the rest of the Scale tier, so paying triple for one control is a hard sell internally.",tags:["Billing","SSO"],page:"Reply to onboarding email"},{id:"f4",plan:"Starter",seats:"6 of 10",age:"4m",history:"2 notes",related:[{quote:"My date range resets every single visit.",person:"A. Nowak"},{quote:"Filters do not survive a page reload.",person:"P. Sandoval"}],person:"Tom\xe1s Guerrero",company:"Lumendesk",source:"widget",sentiment:"Negative",time:"Yesterday",unread:false,subject:"Filter resets when I switch tabs",body:"Every time I move between the two dashboards my date range goes back to the last 7 days. I have started keeping the range in a note so I can retype it.",tags:["Filters"],page:"/dashboards/ops"},{id:"f5",plan:"Scale",seats:"203 of 250",age:"3y 7m",history:"14 notes",related:[{quote:"Board view is unusable past 200 rows.",person:"S. Adeyemi"},{quote:"Scrolling the board pins my laptop fan.",person:"N. Petrov"}],person:"Priya Nandakumar",company:"Northwind",source:"widget",sentiment:"Neutral",time:"Yesterday",unread:false,subject:"Board view slows down past 200 rows",body:"Scrolling gets choppy somewhere around two hundred rows and the whole tab locks up for a second or two when I drag a card. Table view on the same data is fine.",tags:["Performance","Board view"],page:"/projects/board"},{id:"f6",plan:"Pro",seats:"18 of 25",age:"11m",history:"4 notes",related:[{quote:"Invite emails land in spam for us too.",person:"C. Bianchi"},{quote:"Had to resend three invites this week.",person:"T. Iwu"}],person:"Marcus Bell",company:"Meridian",source:"email",sentiment:"Negative",time:"2d",unread:false,subject:"Invite emails keep landing in spam",body:"Roughly half our invites end up in junk. New starters assume the account was never created and open a ticket with our own helpdesk instead.",tags:["Invites","Deliverability"],page:"Reply to invite email"},{id:"f7",plan:"Starter",seats:"3 of 10",age:"2m",history:"1 note",related:[{quote:"The tour covers things I will never use.",person:"V. Marchand"},{quote:"I skipped onboarding and got lost.",person:"E. Haddad"}],person:"Sofia Alvarez",company:"Orbital",source:"survey",sentiment:"Neutral",time:"3d",unread:false,subject:"Onboarding tour skips the part I needed",body:"The tour walked me through sharing before I had any data in the account. By the time I had something worth sharing the tour was gone and I could not replay it.",tags:["Onboarding"],page:"Activation survey"}];

function C(e){
  let r=useRef(null),[a,t]=useState({start:false,end:false}),l=useCallback(()=>{
    let e=r.current;
    if(!e)return;
    let{scrollTop:a,scrollHeight:n,clientHeight:l}=e;
    t({start:a>1,end:Math.ceil(a+l)<n-1})
  }, []);
  return useEffect(()=>{
    l();
    let e=r.current,a=e?.ownerDocument.defaultView;
    if(!e||!a?.ResizeObserver)return;
    let t=new a.ResizeObserver(l);
    return t.observe(e),()=>t.disconnect();
  }, [e,l]),{ref:r,edges:a,onScroll:l};
}

function I(){
  let e,[r,a]=useState(W[0].id),s=W.find(e=>e.id===r)??W[0],{ref:o,edges:i,onScroll:x}=C(),{ref:h,edges:I,onScroll:q}=C(r);
  return (
    <div className={b("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className={p}>Feedback inbox</h2>
            <p className={b(S,"mt-0.5 flex gap-3")}>
              <span>
                {W.filter(e=>e.unread).length}
                {" unread"}
              </span>
              <span>42 this week</span>
            </p>
          </div>
          <button type="button" className={b(_,m)}>
            <HugeiconsIcon icon={Icon_22670} size={16} strokeWidth={1.8} aria-hidden />
            Archive read
          </button>
        </div>
        <div className="mt-3 flex min-h-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[300px_1fr]">
            <div className={b(v,"max-h-[220px] min-h-0 lg:max-h-none")}>
              <ul ref={o} onScroll={x} className={b(g,"min-h-0 flex-1 overflow-y-auto p-2")}>
                {W.map(e=>{
                  let n=e.id===r;
                  return (
                    <li key={e.id}>
                                    <button type="button" aria-current={n} onClick={()=>a(e.id)} className={b(w,n?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","rounded-[var(--rb-r-sm,6px)]","px-3")}>
                                      <div className={b("flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","w-full")}>
                                        <span className="truncate">{e.person}</span>
                                        {e.unread&&<span className={b(k,f)}>Unread</span>}
                                        <span className={b(z,"ml-auto shrink-0")}>{e.time}</span>
                                      </div>
                                      <p className={b(N,"w-full truncate")}>{e.subject}</p>
                                      <div className={b(z,"flex w-full items-center gap-1.5")}>
                                        <HugeiconsIcon icon={A[e.source]} size={12} strokeWidth={1.8} aria-hidden />
                                        <span className="truncate">{e.company}</span>
                                      </div>
                                    </button>
                                  </li>
                  );
                })}
              </ul>
              <div aria-hidden="true" className={b(y,"pointer-events-none absolute inset-x-0 top-0 h-8",i.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={b(j,"pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={b(v,"min-h-0")}>
              <div className="flex items-start gap-3 px-4 pt-4">
                <span aria-hidden className={b("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-9")}>
                  <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                    {s.person.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("")}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px]/[16px] font-[450]">{s.person}</p>
                  <p className={b(z,"flex min-w-0 gap-3")}>
                    <span className="shrink-0">{s.company}</span>
                    <span className="truncate">{s.page}</span>
                    <span className="shrink-0">{e=s.time,/^\d/.test(e)?`${e} ago`:e}</span>
                  </p>
                </div>
                <span className={b(k,"border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100")}>{s.sentiment}</span>
              </div>
              <div className="relative min-h-0 flex-1">
                <div ref={h} onScroll={q} className="h-full overflow-y-auto px-4 pt-3">
                  <h3 className={p}>{s.subject}</h3>
                  <p className={b(N,"mt-2")}>{s.body}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {s.tags.map(e=>(
                      <span key={e} className={b(k,f,"h-6")}>
                                        <HugeiconsIcon icon={Icon_59037} size={10} strokeWidth={1.8} aria-hidden />
                                        {e}
                                      </span>
                    ))}
                    <button type="button" className="relative inline-flex h-6 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">Add tag</button>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-4">
                    {[["Plan",s.plan],["Seats",s.seats],["Account age",s.age],["Past feedback",s.history]].map(([e,r])=>(
                      <div key={e}>
                                        <dt className={z}>{e}</dt>
                                        <dd className={b("flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","mt-0.5")}>{r}</dd>
                                      </div>
                    ))}
                  </dl>
                  <p className={b("text-[12px]/[16px] font-[450] tabular-nums","mt-5")}>Others said the same thing</p>
                  <ul className={b(g,"mt-2")}>
                    {s.related.map(e=>(
                      <li key={e.person} className={w}>
                                        <span className={b(N,"min-w-0 flex-1 truncate")}>{e.quote}</span>
                                        <span className={b(z,"ml-auto shrink-0")}>{e.person}</span>
                                      </li>
                    ))}
                  </ul>
                  <label htmlFor="feedback-5-note" className="sr-only">Internal note</label>
                  <textarea id="feedback-5-note" rows={2} placeholder="Add an internal note for the team" className={b("block max-h-[256px] min-h-[76px] w-full min-w-48 resize-none rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 py-2 text-[14px]/[20px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none field-sizing-content transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-neutral-900/66 hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none read-only:border-transparent read-only:bg-neutral-900/5 read-only:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:placeholder:text-neutral-100/66 dark:hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40 dark:read-only:bg-neutral-100/5","mt-4 mb-1")} />
                </div>
                <div aria-hidden="true" className={b(y,"pointer-events-none absolute inset-x-0 top-0 h-8",I.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={b(j,"pointer-events-none absolute inset-x-0 bottom-0 h-8",I.end?"opacity-100":"opacity-0")} />
              </div>
              <div className="flex flex-wrap items-center gap-2 px-4 py-3">
                <button type="button" className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",m)}>Reply</button>
                <button type="button" className={b(_,m)}>
                  <HugeiconsIcon icon={Icon_1497} size={16} strokeWidth={1.8} aria-hidden />
                  Create issue
                </button>
                <button type="button" className={b(_,m)}>Archive</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default I;
