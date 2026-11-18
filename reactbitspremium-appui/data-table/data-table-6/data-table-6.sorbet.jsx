/**
 * React Bits Pro — Application UI (data-table-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_73516 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let h = (...e)=>e.filter(Boolean).join(" ");

let p = "bg-white dark:bg-neutral-950";

let b = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let eZ = (...e)=>e.filter(Boolean).join(" ");

let eJ = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let eQ = "text-neutral-900/78 dark:text-neutral-100/78";

let eX = "text-neutral-900/62 dark:text-neutral-100/62";

let e0 = "text-[17px]/[22px] font-extrabold";

let e1 = "text-[14px]/[20px] font-medium";

let e2 = "text-[13px]/[16px] font-semibold tabular-nums";

let e5 = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let e8 = "block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]";

let e6 = "min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100";

let e9 = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let e4 = "bg-linear-to-b from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900";

let e3 = "bg-linear-to-t from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900";

let e7 = [{id:"SHP-9284",client:"Everbranch Foods",lane:"Fresno → Denver",status:"In transit",owner:"Lena Moore",temp:"2.4\xb0C",value:48200,carrier:"Crossline Freight",eta:"Today 17:40",notes:"Driver confirmed a replacement seal after the weigh-station inspection outside Grand Junction.",activity:[{time:"14:02",text:"Passed weigh station, seal replaced"},{time:"11:18",text:"Departed Fresno cold dock"},{time:"09:50",text:"Trailer pre-cooled to 2\xb0C"}]},{id:"SHP-9285",client:"Meridian Lab Supply",lane:"Boston → Raleigh",status:"At risk",owner:"Omar Diaz",temp:"6.1\xb0C",value:71900,carrier:"Beacon Cold Lines",eta:"Today 20:10",notes:"Temperature held above threshold for 18 minutes near Richmond. Quality team requested photos before delivery.",activity:[{time:"15:26",text:"Temperature excursion cleared"},{time:"15:08",text:"Reefer alarm above 6\xb0C"},{time:"12:40",text:"Departed Boston"},{time:"10:15",text:"Quality hold placed and released"}]},{id:"SHP-9286",client:"North Pier Robotics",lane:"Austin → Mesa",status:"Delivered",owner:"Ivy Zhang",temp:"-",value:33450,carrier:"Sunbelt Haul",eta:"Delivered 13:05",notes:"Dock appointment closed with no shortage claim. Signed by receiving lead.",activity:[{time:"13:05",text:"Delivered, no exceptions"},{time:"12:20",text:"Arrived at Mesa dock"},{time:"07:45",text:"Departed Austin"}]},{id:"SHP-9287",client:"Longleaf Clinical Research Network International",lane:"Newark → Montreal",status:"In transit",owner:"Sofia Martins",temp:"1.9\xb0C",value:126300,carrier:"Borderline Logistics",eta:"Tomorrow 09:30",notes:"Customs broker cleared paperwork. Final border scan expected before 17:00.",activity:[{time:"13:40",text:"Customs paperwork cleared"},{time:"11:02",text:"Approaching border crossing"},{time:"06:15",text:"Departed Newark"}]},{id:"SHP-9288",client:"Cedar Mill Provisions",lane:"Portland → Eugene",status:"In transit",owner:"Marcus Lund",temp:"3.2\xb0C",value:18700,carrier:"Willamette Transport",eta:"Today 18:55",notes:"On schedule. No exceptions logged.",activity:[{time:"16:10",text:"Passed Salem checkpoint"},{time:"15:00",text:"Departed Portland"}]},{id:"SHP-9289",client:"Bellwether Cold Storage",lane:"Atlanta → Nashville",status:"Delivered",owner:"Asha Malik",temp:"-",value:27400,carrier:"Piedmont Reefer",eta:"Delivered 16:22",notes:"Delivered complete. Receiving flagged one pallet for a minor label reprint.",activity:[{time:"16:22",text:"Delivered with note"},{time:"15:30",text:"Arrived Nashville"}]},{id:"SHP-9290",client:"Ridgeway Medical Supply",lane:"Denver → Cheyenne",status:"At risk",owner:"Theo Grant",temp:"5.4\xb0C",value:54800,carrier:"Frontier Cold",eta:"Today 21:30",notes:"Delay expected from mountain weather advisory north of Fort Collins.",activity:[{time:"16:45",text:"Weather advisory on I-25"},{time:"14:20",text:"Departed Denver"}]},{id:"SHP-9291",client:"Anchor Point Seafood",lane:"Seattle → Spokane",status:"In transit",owner:"Rhea Flores",temp:"0.8\xb0C",value:39900,carrier:"Cascade Freight",eta:"Today 22:15",notes:"Running on schedule across the pass.",activity:[{time:"17:05",text:"Cleared Snoqualmie Pass"},{time:"14:30",text:"Departed Seattle"}]},{id:"SHP-9292",client:"Harbor Grove Dairy",lane:"Sacramento → Reno",status:"In transit",owner:"Dana Cole",temp:"3.7\xb0C",value:21600,carrier:"Sierra Reefer",eta:"Today 19:20",notes:"On schedule over the Donner summit route.",activity:[{time:"16:50",text:"Cleared Donner summit"},{time:"15:10",text:"Departed Sacramento"}]},{id:"SHP-9293",client:"Vantage Pharma Distribution",lane:"Chicago → Columbus",status:"At risk",owner:"Priya Nair",temp:"5.9\xb0C",value:88400,carrier:"Great Lakes Cold",eta:"Today 23:05",notes:"Reefer running warm near Gary; driver monitoring closely.",activity:[{time:"17:12",text:"Reefer trending warm"},{time:"13:55",text:"Departed Chicago"}]},{id:"SHP-9294",client:"Tidewater Produce",lane:"Norfolk → Richmond",status:"Delivered",owner:"Grant Ellis",temp:"-",value:15200,carrier:"Bayfront Haul",eta:"Delivered 12:48",notes:"Delivered complete with signed receipt.",activity:[{time:"12:48",text:"Delivered, no exceptions"},{time:"10:30",text:"Departed Norfolk"}]}];

let re = {"In transit":"text-neutral-900 dark:text-neutral-100","At risk":"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Delivered:"text-neutral-900/78 dark:text-neutral-100/78"};

function rr({status:e,small:r}){
  return (
    <span className={eZ(r?"inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums":"inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",re[e],"shrink-0 whitespace-nowrap")}>
        {"In transit"===e&&<span className="flex h-lh shrink-0 items-center">
          <span className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" aria-hidden="true" />
        </span>}
        {e}
      </span>
  );
}

function ra({label:e,value:r}){
  return (
    <div className="min-w-0">
        <dt className="min-w-0 text-[15px]/[20px] font-bold text-neutral-900/62 dark:text-neutral-100/62">{e}</dt>
        <dd className={eZ("flex min-w-0 flex-wrap items-center gap-2 text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","mt-0.5")}>{r}</dd>
      </div>
  );
}

function rt(){
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


export default function data_table_6__Sorbet__Component(){
  let{ref:e,edges:r,onScroll:a}=rt(),{ref:o,edges:s,onScroll:i}=rt(),[c,u]=useState(e7[0].id),[x,h]=useState(""),p=useMemo(()=>{
    let e=x.trim().toLowerCase();
    return e?e7.filter(r=>r.client.toLowerCase().includes(e)||r.lane.toLowerCase().includes(e)||r.id.toLowerCase().includes(e)):e7;
  }, [x]),b=p.find(e=>e.id===c)??p[0]??e7[0];
  return (
    <div className={eZ("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[840px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={eZ(eJ,"flex h-14 shrink-0 items-center gap-3 px-5")}>
            <h2 className={eZ(e0,"min-w-0 flex-1 truncate")}>Live shipments</h2>
            <span className={eZ(e2,eX,"shrink-0")}>
              {e7.length}
              {" moving"}
            </span>
          </header>
          <div className="flex min-h-0 flex-1">
            <div className={eZ(eJ,"flex w-full min-w-0 flex-col lg:w-80 lg:shrink-0")}>
              <div className="flex h-12 shrink-0 items-center px-2">
                <label className={eZ("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10")}>
                  <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                    <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <input value={x} onChange={e=>h(e.target.value)} placeholder="Search shipments" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
                  <span className="sr-only">Search shipments</span>
                </label>
              </div>
              <div className="relative min-h-0 flex-1">
                <ul ref={e} onScroll={a} className="flex h-full flex-col gap-1 overflow-y-auto p-2">
                  {p.map(e=>{
                    let r=e.id===b.id;
                    return (
                      <li key={e.id}>
                                        <button type="button" aria-current={r?"true":undefined} onClick={()=>u(e.id)} className={eZ("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",r?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","rounded-[var(--rb-r-4xl,18px)]","px-3")}>
                                          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                            <p className={eZ("text-[15px]/[20px] font-bold",e8)}>{e.client}</p>
                                            <div className="flex items-center gap-2">
                                              <p className={eZ(e1,eX,e8,"flex-1")}>{e.lane}</p>
                                              <rr status={e.status} small />
                                            </div>
                                          </div>
                                        </button>
                                      </li>
                    );
                  })}
                  {0===p.length&&<li className="flex flex-col items-center justify-center px-4 py-12 text-center">
                    <span aria-hidden="true" className={eZ(eQ,"mb-3 flex h-10 w-10 items-center justify-center")}><HugeiconsIcon icon={Icon_73516} size={20} strokeWidth={2} /></span>
                    <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No shipments found</p>
                    <p className={eZ("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>Try a client, a lane, or a shipment ID.</p>
                  </li>}
                </ul>
                <div aria-hidden="true" className={eZ(e4,"pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={eZ(e3,"pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
            <div className={eZ("bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","hidden min-w-0 flex-1 flex-col lg:flex")}>
              <div className="flex shrink-0 items-start gap-3 px-5 pt-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={eZ("font-mono text-[12px]/[16px] tabular-nums",eX)}>{b.id}</span>
                    <rr status={b.status} small />
                  </div>
                  <h3 className={eZ(e0,"mt-1 truncate")}>{b.client}</h3>
                  <p className={eZ(e1,eQ,"truncate")}>{b.lane}</p>
                </div>
              </div>
              <div className="relative min-h-0 flex-1">
                <div ref={o} onScroll={i} className="h-full overflow-y-auto px-5 py-4">
                  <div className={e9}>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 p-4">
                      <ra label="Owner" value={b.owner} />
                      <ra label="Carrier" value={b.carrier} />
                      <ra label="Temperature" value={b.temp} />
                      <ra label="Declared value" value={b.value.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0})} />
                      <ra label="ETA" value={b.eta} />
                    </dl>
                  </div>
                  <div className={eZ(e9,"mt-4 p-4")}>
                    <h4 className={e6}>Notes</h4>
                    <p className={eZ(e1,eQ,"mt-2")}>{b.notes}</p>
                  </div>
                  <div className={eZ(e9,"mt-4 p-4")}>
                    <h4 className={e6}>Activity</h4>
                    <ol className="mt-3 space-y-3">
                      {b.activity.map((e,r)=>(
                        <li key={r} className={eZ(e1,"flex gap-3")}>
                                            <span className="mt-[0.5lh] size-2 shrink-0 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" />
                                            <div className="min-w-0 flex-1">
                                              <p>{e.text}</p>
                                              <p className={eZ(e2,eX)}>{e.time}</p>
                                            </div>
                                          </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div aria-hidden="true" className={eZ(e4,"pointer-events-none absolute inset-x-0 top-0 h-8",s.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={eZ(e3,"pointer-events-none absolute inset-x-0 bottom-0 h-8",s.end?"opacity-100":"opacity-0")} />
              </div>
              <div className="flex h-16 shrink-0 items-center justify-end gap-2 px-5">
                <button type="button" className={eZ("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",e5)}>
                  <HugeiconsIcon icon={Icon_36586} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                  Message driver
                </button>
                <button type="button" className={eZ("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",e5)}>Mark delivered</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
