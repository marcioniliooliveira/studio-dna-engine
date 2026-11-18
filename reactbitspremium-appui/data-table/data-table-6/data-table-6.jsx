/**
 * React Bits Pro — Application UI (data-table-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_73516 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "bg-neutral-50 dark:bg-neutral-900",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  p = "text-[13px]/[18px] font-normal",
  b = "text-[12px]/[16px] font-normal tabular-nums",
  m = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  k = "block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]",
  f = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  g = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  v = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900",
  w = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900",
  _ = [{id:"SHP-9284",client:"Everbranch Foods",lane:"Fresno → Denver",status:"In transit",owner:"Lena Moore",temp:"2.4\xb0C",value:48200,carrier:"Crossline Freight",eta:"Today 17:40",notes:"Driver confirmed a replacement seal after the weigh-station inspection outside Grand Junction.",activity:[{time:"14:02",text:"Passed weigh station, seal replaced"},{time:"11:18",text:"Departed Fresno cold dock"},{time:"09:50",text:"Trailer pre-cooled to 2\xb0C"}]},{id:"SHP-9285",client:"Meridian Lab Supply",lane:"Boston → Raleigh",status:"At risk",owner:"Omar Diaz",temp:"6.1\xb0C",value:71900,carrier:"Beacon Cold Lines",eta:"Today 20:10",notes:"Temperature held above threshold for 18 minutes near Richmond. Quality team requested photos before delivery.",activity:[{time:"15:26",text:"Temperature excursion cleared"},{time:"15:08",text:"Reefer alarm above 6\xb0C"},{time:"12:40",text:"Departed Boston"},{time:"10:15",text:"Quality hold placed and released"}]},{id:"SHP-9286",client:"North Pier Robotics",lane:"Austin → Mesa",status:"Delivered",owner:"Ivy Zhang",temp:"-",value:33450,carrier:"Sunbelt Haul",eta:"Delivered 13:05",notes:"Dock appointment closed with no shortage claim. Signed by receiving lead.",activity:[{time:"13:05",text:"Delivered, no exceptions"},{time:"12:20",text:"Arrived at Mesa dock"},{time:"07:45",text:"Departed Austin"}]},{id:"SHP-9287",client:"Longleaf Clinical Research Network International",lane:"Newark → Montreal",status:"In transit",owner:"Sofia Martins",temp:"1.9\xb0C",value:126300,carrier:"Borderline Logistics",eta:"Tomorrow 09:30",notes:"Customs broker cleared paperwork. Final border scan expected before 17:00.",activity:[{time:"13:40",text:"Customs paperwork cleared"},{time:"11:02",text:"Approaching border crossing"},{time:"06:15",text:"Departed Newark"}]},{id:"SHP-9288",client:"Cedar Mill Provisions",lane:"Portland → Eugene",status:"In transit",owner:"Marcus Lund",temp:"3.2\xb0C",value:18700,carrier:"Willamette Transport",eta:"Today 18:55",notes:"On schedule. No exceptions logged.",activity:[{time:"16:10",text:"Passed Salem checkpoint"},{time:"15:00",text:"Departed Portland"}]},{id:"SHP-9289",client:"Bellwether Cold Storage",lane:"Atlanta → Nashville",status:"Delivered",owner:"Asha Malik",temp:"-",value:27400,carrier:"Piedmont Reefer",eta:"Delivered 16:22",notes:"Delivered complete. Receiving flagged one pallet for a minor label reprint.",activity:[{time:"16:22",text:"Delivered with note"},{time:"15:30",text:"Arrived Nashville"}]},{id:"SHP-9290",client:"Ridgeway Medical Supply",lane:"Denver → Cheyenne",status:"At risk",owner:"Theo Grant",temp:"5.4\xb0C",value:54800,carrier:"Frontier Cold",eta:"Today 21:30",notes:"Delay expected from mountain weather advisory north of Fort Collins.",activity:[{time:"16:45",text:"Weather advisory on I-25"},{time:"14:20",text:"Departed Denver"}]},{id:"SHP-9291",client:"Anchor Point Seafood",lane:"Seattle → Spokane",status:"In transit",owner:"Rhea Flores",temp:"0.8\xb0C",value:39900,carrier:"Cascade Freight",eta:"Today 22:15",notes:"Running on schedule across the pass.",activity:[{time:"17:05",text:"Cleared Snoqualmie Pass"},{time:"14:30",text:"Departed Seattle"}]},{id:"SHP-9292",client:"Harbor Grove Dairy",lane:"Sacramento → Reno",status:"In transit",owner:"Dana Cole",temp:"3.7\xb0C",value:21600,carrier:"Sierra Reefer",eta:"Today 19:20",notes:"On schedule over the Donner summit route.",activity:[{time:"16:50",text:"Cleared Donner summit"},{time:"15:10",text:"Departed Sacramento"}]},{id:"SHP-9293",client:"Vantage Pharma Distribution",lane:"Chicago → Columbus",status:"At risk",owner:"Priya Nair",temp:"5.9\xb0C",value:88400,carrier:"Great Lakes Cold",eta:"Today 23:05",notes:"Reefer running warm near Gary; driver monitoring closely.",activity:[{time:"17:12",text:"Reefer trending warm"},{time:"13:55",text:"Departed Chicago"}]},{id:"SHP-9294",client:"Tidewater Produce",lane:"Norfolk → Richmond",status:"Delivered",owner:"Grant Ellis",temp:"-",value:15200,carrier:"Bayfront Haul",eta:"Delivered 12:48",notes:"Delivered complete with signed receipt.",activity:[{time:"12:48",text:"Delivered, no exceptions"},{time:"10:30",text:"Departed Norfolk"}]}],
  j = {"In transit":"text-neutral-900 dark:text-neutral-100","At risk":"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Delivered:"text-neutral-900/80 dark:text-neutral-100/80"};

function N({status:e,small:t}){
  return (
    <span className={d(t?"inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums":"inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",j[e],"shrink-0 whitespace-nowrap")}>
        {"In transit"===e&&<span className="flex h-lh shrink-0 items-center">
          <span className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" aria-hidden="true" />
        </span>}
        {e}
      </span>
  );
}

function y({label:e,value:t}){
  return (
    <div className="min-w-0">
        <dt className="min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66">{e}</dt>
        <dd className={d("flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","mt-0.5")}>{t}</dd>
      </div>
  );
}

function S(){
  let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
    let t=e.current;
    if(!t)return;
    let{scrollTop:a,scrollHeight:n,clientHeight:s}=t;
    r({start:a>1,end:Math.ceil(a+s)<n-1})
  }, []);
  return useEffect(()=>{
    a();
    let t=e.current,r=t?.ownerDocument.defaultView;
    if(!t||!r?.ResizeObserver)return;
    let n=new r.ResizeObserver(a);
    return observe(t),()=>disconnect();
  }, [a]),{ref:e,edges:t,onScroll:a};
}

function A(){
  let{ref:e,edges:t,onScroll:r}=S(),{ref:j,edges:A,onScroll:C}=S(),[D,z]=useState(_[0].id),[R,P]=useState(""),L=useMemo(()=>{
    let e=R.trim().toLowerCase();
    return e?_.filter(t=>t.client.toLowerCase().includes(e)||t.lane.toLowerCase().includes(e)||t.id.toLowerCase().includes(e)):_;
  }, [R]),E=L.find(e=>e.id===D)??L[0]??_[0];
  return (
    <div className={d("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={d(c,"flex h-14 shrink-0 items-center gap-3 px-5")}>
            <h2 className={d(h,"min-w-0 flex-1 truncate")}>Live shipments</h2>
            <span className={d(b,x,"shrink-0")}>
              {_.length}
              {" moving"}
            </span>
          </header>
          <div className="flex min-h-0 flex-1">
            <div className={d(c,"flex w-full min-w-0 flex-col lg:w-80 lg:shrink-0")}>
              <div className="flex h-12 shrink-0 items-center px-2">
                <label className={d("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                  <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                    <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <input value={R} onChange={e=>P(e.target.value)} placeholder="Search shipments" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                  <span className="sr-only">Search shipments</span>
                </label>
              </div>
              <div className="relative min-h-0 flex-1">
                <ul ref={e} onScroll={r} className="flex h-full flex-col gap-1 overflow-y-auto p-2">
                  {L.map(e=>{
                    let t=e.id===E.id;
                    return (
                      <li key={e.id}>
                                        <button type="button" aria-current={t?"true":undefined} onClick={()=>z(e.id)} className={d("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",t?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","rounded-[var(--rb-r-sm,6px)]","px-3")}>
                                          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                            <p className={d("text-[14px]/[16px] font-[450]",k)}>{e.client}</p>
                                            <div className="flex items-center gap-2">
                                              <p className={d(p,x,k,"flex-1")}>{e.lane}</p>
                                              <N status={e.status} small />
                                            </div>
                                          </div>
                                        </button>
                                      </li>
                    );
                  })}
                  {0===L.length&&<li className="flex flex-col items-center justify-center px-4 py-12 text-center">
                    <span aria-hidden="true" className={d(u,"mb-3 flex h-10 w-10 items-center justify-center")}><HugeiconsIcon icon={Icon_73516} size={20} strokeWidth={1.8} /></span>
                    <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No shipments found</p>
                    <p className={d("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Try a client, a lane, or a shipment ID.</p>
                  </li>}
                </ul>
                <div aria-hidden="true" className={d(v,"pointer-events-none absolute inset-x-0 top-0 h-8",t.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={d(w,"pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
            <div className={d("bg-neutral-50 dark:bg-neutral-950","hidden min-w-0 flex-1 flex-col lg:flex")}>
              <div className="flex shrink-0 items-start gap-3 px-5 pt-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={d("font-mono text-[12px]/[16px] tabular-nums",x)}>{E.id}</span>
                    <N status={E.status} small />
                  </div>
                  <h3 className={d(h,"mt-1 truncate")}>{E.client}</h3>
                  <p className={d(p,u,"truncate")}>{E.lane}</p>
                </div>
              </div>
              <div className="relative min-h-0 flex-1">
                <div ref={j} onScroll={C} className="h-full overflow-y-auto px-5 py-4">
                  <div className={g}>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 p-4">
                      <y label="Owner" value={E.owner} />
                      <y label="Carrier" value={E.carrier} />
                      <y label="Temperature" value={E.temp} />
                      <y label="Declared value" value={E.value.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0})} />
                      <y label="ETA" value={E.eta} />
                    </dl>
                  </div>
                  <div className={d(g,"mt-4 p-4")}>
                    <h4 className={f}>Notes</h4>
                    <p className={d(p,u,"mt-2")}>{E.notes}</p>
                  </div>
                  <div className={d(g,"mt-4 p-4")}>
                    <h4 className={f}>Activity</h4>
                    <ol className="mt-3 space-y-3">
                      {E.activity.map((e,t)=>(
                        <li key={t} className={d(p,"flex gap-3")}>
                                            <span className="mt-[0.5lh] size-1.5 shrink-0 -translate-y-1/2 bg-neutral-900 dark:bg-neutral-100" />
                                            <div className="min-w-0 flex-1">
                                              <p>{e.text}</p>
                                              <p className={d(b,x)}>{e.time}</p>
                                            </div>
                                          </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div aria-hidden="true" className={d(v,"pointer-events-none absolute inset-x-0 top-0 h-8",A.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={d(w,"pointer-events-none absolute inset-x-0 bottom-0 h-8",A.end?"opacity-100":"opacity-0")} />
              </div>
              <div className="flex h-16 shrink-0 items-center justify-end gap-2 px-5">
                <button type="button" className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",m)}>
                  <HugeiconsIcon icon={Icon_36586} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                  Message driver
                </button>
                <button type="button" className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",m)}>Mark delivered</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default A;
