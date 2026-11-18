/**
 * React Bits Pro — Application UI (app-shell-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_32406 = [["path",{d:"M12 22C11.1818 22 10.4002 21.6698 8.83693 21.0095C4.94564 19.3657 3 18.5438 3 17.1613C3 16.7742 3 10.0645 3 7M12 22C12.8182 22 13.5998 21.6698 15.1631 21.0095C19.0544 19.3657 21 18.5438 21 17.1613V7M12 22L12 11.3548",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.32592 9.69138L5.40472 8.27785C3.80157 7.5021 3 7.11423 3 6.5C3 5.88577 3.80157 5.4979 5.40472 4.72215L8.32592 3.30862C10.1288 2.43621 11.0303 2 12 2C12.9697 2 13.8712 2.4362 15.6741 3.30862L18.5953 4.72215C20.1984 5.4979 21 5.88577 21 6.5C21 7.11423 20.1984 7.5021 18.5953 8.27785L15.6741 9.69138C13.8712 10.5638 12.9697 11 12 11C11.0303 11 10.1288 10.5638 8.32592 9.69138Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 12L8 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M17 4L7 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_53096 = [["circle",{cx:"18",cy:"5",r:"3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"6",cy:"19",r:"3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 5H8.5C6.567 5 5 6.567 5 8.5C5 10.433 6.567 12 8.5 12H15.5C17.433 12 19 13.567 19 15.5C19 17.433 17.433 19 15.5 19H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_68142 = [["path",{d:"M19.5 17.5C19.5 18.8807 18.3807 20 17 20C15.6193 20 14.5 18.8807 14.5 17.5C14.5 16.1193 15.6193 15 17 15C18.3807 15 19.5 16.1193 19.5 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 17.5C9.5 18.8807 8.38071 20 7 20C5.61929 20 4.5 18.8807 4.5 17.5C4.5 16.1193 5.61929 15 7 15C8.38071 15 9.5 16.1193 9.5 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 17.5H9.5M19.5 17.5H20.2632C20.4831 17.5 20.5931 17.5 20.6855 17.4885C21.3669 17.4036 21.9036 16.8669 21.9885 16.1855C22 16.0931 22 15.9831 22 15.7632V13C22 9.41015 19.0899 6.5 15.5 6.5M2 4H12C13.4142 4 14.1213 4 14.5607 4.43934C15 4.87868 15 5.58579 15 7V15.5M2 12.75V15C2 15.9346 2 16.4019 2.20096 16.75C2.33261 16.978 2.52197 17.1674 2.75 17.299C3.09808 17.5 3.56538 17.5 4.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 7H8M2 10H6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_17601 = [["path",{d:"M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 9L11 9M8 13L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 22L22 22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_91418 = [["path",{d:"M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.7831 21.6971 17.6161 20.6774 17.0291 20.3073C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124C12.5445 21.8374 12.2868 22 12 22C11.7132 22 11.4555 21.8374 10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.38395 20.6774 5.21687 21.6971 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 11H8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14 7L8 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let y = (...e)=>e.filter(Boolean).join(" ");

let el = (...e)=>e.filter(Boolean).join(" ");

function ei(){
  let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
    let a=e.current;
    if(!a)return;
    let{scrollTop:t,scrollHeight:n,clientHeight:l}=a;
    r({start:t>1,end:Math.ceil(t+l)<n-1})
  }, []);
  return useEffect(()=>{
    t();
    let a=e.current,r=a?.ownerDocument.defaultView;
    if(!a||!r?.ResizeObserver)return;
    let n=new r.ResizeObserver(t);
    return observe(a),()=>disconnect();
  }, [t]),{ref:e,edges:a,onScroll:t};
}

let eo = "text-neutral-900 dark:text-neutral-100";

let es = "text-neutral-900/62 dark:text-neutral-100/62";

let ec = "text-[13px]/[16px] font-semibold tabular-nums";

let ed = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let eu = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let e_ = "flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]";

let ex = "relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40";

let eb = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let ep = "border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let eh = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let em = [.2,0,0,1];

let ek = {neutral:"text-neutral-900/78 dark:text-neutral-100/78",attention:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",critical:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

let ef = [{name:"Kestrel Freight",members:"24 members"},{name:"Kestrel Freight Europe",members:"9 members"},{name:"Pinnacle 3PL Partners",members:"6 members"}];

let ev = [{id:"shipments",label:"Shipments",icon:Icon_32406,current:"All shipments",title:"Shipments",action:"New shipment",listTitle:"All shipments",listCount:"312",groups:[{label:"Shipments",items:[{label:"All shipments",count:"312"},{label:"In transit",count:"48"},{label:"Awaiting pickup",count:"12"},{label:"Delayed",count:"5"},{label:"Delivered"},{label:"Cancelled"}]},{label:"Saved views",items:[{label:"Northeast lane"},{label:"Reefer loads"},{label:"High-value cargo"},{label:"Missing paperwork"},{label:"Customs hold"},{label:"Weekend departures"}]},{label:"Reference",items:[{label:"Service map"},{label:"Rate table"},{label:"Documents"},{label:"Exception log"},{label:"Carrier directory"},{label:"Archive"}]}],rows:[{name:"Halvorsen Cold Chain Logistics AB",detail:["KF-40218","Newark → Montr\xe9al"],meta:"14 Mar",status:"In transit",tone:"neutral"},{name:"Brightwater Foods",detail:["KF-40211","Savannah → Atlanta"],meta:"13 Mar",status:"Delivered",tone:"neutral"},{name:"Ardent Medical Supply",detail:["KF-40207","Houston → El Paso"],meta:"14 Mar",status:"Delayed",tone:"attention"},{name:"Corriveau Fr\xe8res Distribution",detail:["KF-40233","Detroit → Windsor"],meta:"15 Mar",status:"Customs hold",tone:"attention"},{name:"Pinewood Building Products",detail:["KF-40199","Portland → Boise"],meta:"12 Mar",status:"Delivered",tone:"neutral"},{name:"Northgate Appliance",detail:["KF-40241","Chicago → Omaha"],meta:null,status:"Awaiting pickup",tone:"neutral"},{name:"Lakeshore Beverage Co.",detail:["KF-40188","Milwaukee → Fargo"],meta:"16 Mar",status:"In transit",tone:"neutral"},{name:"Sable & Finch Furnishings",detail:["KF-40250","Charlotte → Richmond"],meta:"15 Mar",status:"Failed delivery",tone:"critical"},{name:"Tamarack Paper Mills",detail:["KF-40176","Duluth → Sioux Falls"],meta:"13 Mar",status:"Delivered",tone:"neutral"},{name:"Ridgeline Auto Parts",detail:["KF-40262","Reno → Sacramento"],meta:"16 Mar",status:"In transit",tone:"neutral"},{name:"Meridian Home Goods",detail:["KF-40255","Tampa → Mobile"],meta:"17 Mar",status:"Awaiting pickup",tone:"neutral"}]},{id:"dispatch",label:"Dispatch",icon:Icon_53096,current:"Load board",title:"Load board",action:"Assign driver",listTitle:"Open loads",listCount:"61",groups:[{label:"Dispatch",items:[{label:"Load board",count:"61"},{label:"Assigned",count:"26"},{label:"Needs a driver",count:"9"},{label:"Check-ins"},{label:"Route changes",count:"4"},{label:"Detention"}]},{label:"Saved views",items:[{label:"Same-day pickups"},{label:"Owner-operators"},{label:"Hazmat certified"},{label:"Backhaul candidates"},{label:"Weekend coverage"},{label:"Night shift"}]},{label:"Reference",items:[{label:"Driver roster"},{label:"Terminal hours"},{label:"Fuel stops"},{label:"Escalation policy"},{label:"Shift log"},{label:"Archive"}]}],rows:[{name:"Newark → Montr\xe9al",detail:["DX-8841","Reefer","Ivo Petrenko"],meta:"14 Mar",status:"Assigned",tone:"neutral"},{name:"Houston → El Paso",detail:["DX-8846","Dry van","no driver yet"],meta:"14 Mar",status:"Needs a driver",tone:"attention"},{name:"Savannah → Atlanta",detail:["DX-8829","Dry van","Rosalind Achebe-Whitfield"],meta:"13 Mar",status:"Assigned",tone:"neutral"},{name:"Portland → Boise",detail:["DX-8852","Flatbed","Marcus Oyelaran"],meta:"15 Mar",status:"Tendered",tone:"neutral"},{name:"Chicago → Omaha",detail:["DX-8858","Dry van","no driver yet"],meta:null,status:"Needs a driver",tone:"attention"},{name:"Detroit → Windsor",detail:["DX-8837","Reefer","Anneke Vos"],meta:"15 Mar",status:"Running late",tone:"attention"},{name:"Milwaukee → Fargo",detail:["DX-8863","Dry van","Dario Esposito"],meta:"16 Mar",status:"Assigned",tone:"neutral"},{name:"Charlotte → Richmond",detail:["DX-8871","Flatbed","Priya Raghunathan"],meta:"15 Mar",status:"Refused",tone:"critical"},{name:"Duluth → Sioux Falls",detail:["DX-8818","Dry van","Colm Brennan"],meta:"13 Mar",status:"Assigned",tone:"neutral"},{name:"Reno → Sacramento",detail:["DX-8880","Reefer","Yolanda Cruz"],meta:"16 Mar",status:"Tendered",tone:"neutral"},{name:"Tampa → Mobile",detail:["DX-8884","Dry van","Henrik Lund"],meta:"17 Mar",status:"Assigned",tone:"neutral"}]},{id:"fleet",label:"Fleet",icon:Icon_68142,current:"All units",title:"Fleet",action:"Add unit",listTitle:"All units",listCount:"184",groups:[{label:"Fleet",items:[{label:"All units",count:"184"},{label:"In service",count:"151"},{label:"In shop",count:"7"},{label:"Idle",count:"22"},{label:"Out of service",count:"4"},{label:"Retired"}]},{label:"Saved views",items:[{label:"Reefer trailers"},{label:"Due for inspection"},{label:"High idle time"},{label:"Out of region"},{label:"Leased units"},{label:"Fuel outliers"}]},{label:"Reference",items:[{label:"Maintenance plans"},{label:"Parts inventory"},{label:"Warranty claims"},{label:"Fuel cards"},{label:"Compliance log"},{label:"Archive"}]}],rows:[{name:"Unit 2141",detail:["Freightliner Cascadia","Ivo Petrenko"],meta:"22 Mar",status:"In service",tone:"neutral"},{name:"Unit 2158",detail:["Kenworth T680","Rosalind Achebe-Whitfield"],meta:"04 Apr",status:"In service",tone:"neutral"},{name:"Unit 1907",detail:["Volvo VNL 760","Marcus Oyelaran"],meta:"18 Mar",status:"Inspection due",tone:"attention"},{name:"Trailer R-4412",detail:["Utility 3000R reefer","pool unit"],meta:"27 Mar",status:"Idle",tone:"neutral"},{name:"Unit 2203",detail:["Peterbilt 579","Anneke Vos"],meta:null,status:"In shop",tone:"attention"},{name:"Trailer D-8820",detail:["Wabash DuraPlate dry van","pool unit"],meta:"09 Apr",status:"In service",tone:"neutral"},{name:"Unit 1864",detail:["International LT","Colm Brennan"],meta:"16 Mar",status:"Out of service",tone:"critical"},{name:"Unit 2177",detail:["Mack Anthem","Dario Esposito"],meta:"31 Mar",status:"In service",tone:"neutral"},{name:"Trailer F-2290",detail:["Fontaine Infinity flatbed","pool unit"],meta:"12 Apr",status:"Idle",tone:"neutral"},{name:"Unit 2195",detail:["Freightliner Cascadia","Priya Raghunathan"],meta:"25 Mar",status:"In service",tone:"neutral"},{name:"Unit 2088",detail:["Kenworth T680","Yolanda Cruz"],meta:"07 Apr",status:"In service",tone:"neutral"}]},{id:"customers",label:"Customers",icon:Icon_17601,current:"All accounts",title:"Customers",action:"Add customer",listTitle:"All accounts",listCount:"96",groups:[{label:"Customers",items:[{label:"All accounts",count:"96"},{label:"Active",count:"78"},{label:"Onboarding",count:"4"},{label:"At risk",count:"3"},{label:"Past due",count:"5"},{label:"Closed"}]},{label:"Saved views",items:[{label:"Enterprise accounts"},{label:"Contract renewals"},{label:"Volume commitments"},{label:"Missing tax ID"},{label:"Referral sources"},{label:"Dormant 90 days"}]},{label:"Reference",items:[{label:"Contacts"},{label:"Contracts"},{label:"Service levels"},{label:"Credit limits"},{label:"Account notes"},{label:"Archive"}]}],rows:[{name:"Halvorsen Cold Chain Logistics AB",detail:["Nordics","Iris Renner"],meta:"18 open",status:"Active",tone:"neutral"},{name:"Brightwater Foods",detail:["Southeast","Theo Amankwah"],meta:"24 open",status:"Active",tone:"neutral"},{name:"Ardent Medical Supply",detail:["Gulf Coast","Iris Renner"],meta:"6 open",status:"At risk",tone:"attention"},{name:"Corriveau Fr\xe8res Distribution",detail:["Great Lakes","Marguerite Vaillancourt"],meta:"11 open",status:"Active",tone:"neutral"},{name:"Pinewood Building Products",detail:["Pacific Northwest","Theo Amankwah"],meta:"9 open",status:"Active",tone:"neutral"},{name:"Northgate Appliance",detail:["Midwest","owner not set"],meta:null,status:"Onboarding",tone:"neutral"},{name:"Lakeshore Beverage Co.",detail:["Upper Midwest","Marguerite Vaillancourt"],meta:"14 open",status:"Active",tone:"neutral"},{name:"Sable & Finch Furnishings",detail:["Mid-Atlantic","Iris Renner"],meta:"3 open",status:"Past due",tone:"critical"},{name:"Tamarack Paper Mills",detail:["Northern Plains","Theo Amankwah"],meta:"7 open",status:"Active",tone:"neutral"},{name:"Ridgeline Auto Parts",detail:["Mountain West","Marguerite Vaillancourt"],meta:"12 open",status:"Active",tone:"neutral"},{name:"Meridian Home Goods",detail:["Southeast","Iris Renner"],meta:"2 open",status:"At risk",tone:"attention"}]},{id:"billing",label:"Billing",icon:Icon_91418,current:"All invoices",title:"Billing",action:"Create invoice",listTitle:"Open invoices",listCount:"119",groups:[{label:"Billing",items:[{label:"All invoices",count:"438"},{label:"Draft",count:"12"},{label:"Sent",count:"96"},{label:"Overdue",count:"11"},{label:"Paid"},{label:"Credit notes"}]},{label:"Saved views",items:[{label:"Over 60 days"},{label:"Disputed charges"},{label:"Accessorial review"},{label:"Auto-pay accounts"},{label:"Unbilled loads"},{label:"Fuel surcharges"}]},{label:"Reference",items:[{label:"Rate agreements"},{label:"Tax profiles"},{label:"Payment methods"},{label:"Remittance advice"},{label:"Export history"},{label:"Archive"}]}],rows:[{name:"Halvorsen Cold Chain Logistics AB",detail:["INV-20418","issued 02 Mar"],meta:"$18,240.00",status:"Sent",tone:"neutral"},{name:"Brightwater Foods",detail:["INV-20421","issued 03 Mar"],meta:"$7,905.50",status:"Paid",tone:"neutral"},{name:"Ardent Medical Supply",detail:["INV-20388","issued 12 Jan"],meta:"$12,480.00",status:"Overdue",tone:"attention"},{name:"Corriveau Fr\xe8res Distribution",detail:["INV-20430","issued 05 Mar"],meta:"$4,116.25",status:"Sent",tone:"neutral"},{name:"Pinewood Building Products",detail:["INV-20399","issued 21 Feb"],meta:"$9,760.00",status:"Paid",tone:"neutral"},{name:"Northgate Appliance",detail:["INV-20444","not issued yet"],meta:null,status:"Draft",tone:"neutral"},{name:"Lakeshore Beverage Co.",detail:["INV-20407","issued 26 Feb"],meta:"$21,318.75",status:"Sent",tone:"neutral"},{name:"Sable & Finch Furnishings",detail:["INV-20362","issued 04 Jan"],meta:"$6,540.00",status:"Disputed",tone:"critical"},{name:"Tamarack Paper Mills",detail:["INV-20375","issued 18 Jan"],meta:"$3,289.40",status:"Overdue",tone:"attention"},{name:"Ridgeline Auto Parts",detail:["INV-20436","issued 06 Mar"],meta:"$15,072.00",status:"Sent",tone:"neutral"},{name:"Meridian Home Goods",detail:["INV-20441","issued 07 Mar"],meta:"$2,845.10",status:"Sent",tone:"neutral"}]}];

function eg(){
  let[e,a]=useState(ef[0].name),[r,i]=useState(false),[o,s]=useState(false),c=useRef(null),d=useRef(null),u=useRef(null),_=e=>{
    i(false),s(false),e&&d.current?.focus({preventScroll:true})
  };
  useEffect(()=>{
    if(!r)return;
    let e=c.current?.ownerDocument??document,a=requestAnimationFrame(()=>{
      s(true),u.current?.querySelector('[role="menuitemradio"]')?.focus({preventScroll:true})
    }),t=e=>{
      c.current?.contains(e.target)||(i(false),s(false))
    },n=a=>{
      let r=Array.from(u.current?.querySelectorAll('[role="menuitemradio"], [role="menuitem"]')??[]);
      if(0===r.length)return;
      let t=r.indexOf(e.activeElement);
      "Escape"===a.key?(a.preventDefault(),_(true)):"ArrowDown"===a.key?(a.preventDefault(),r[t<0||t===r.length-1?0:t+1]?.focus({preventScroll:true})):"ArrowUp"===a.key?(a.preventDefault(),r[t<=0?r.length-1:t-1]?.focus({preventScroll:true})):"Home"===a.key?(a.preventDefault(),r[0]?.focus({preventScroll:true})):"End"===a.key?(a.preventDefault(),r[r.length-1]?.focus({preventScroll:true})):"Tab"===a.key&&(i(false),s(false))
    };
    return e.addEventListener("pointerdown",t),e.addEventListener("keydown",n),()=>{
      cancelAnimationFrame(a),e.removeEventListener("pointerdown",t),e.removeEventListener("keydown",n)
    };
  }, [r]);
  let x=ef.find(a=>a.name===e);
  return (
    <div ref={c} className="relative">
        <button ref={d} type="button" aria-haspopup="menu" aria-expanded={r} onClick={()=>r?_(false):i(true)} className={el("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900/78 dark:text-neutral-100/78 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] hover:not-disabled:text-neutral-900 active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:hover:not-disabled:bg-neutral-100/8 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:bg-neutral-100/12 dark:aria-expanded:bg-neutral-100/8 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-12 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-6 text-[16px]/[20px] font-extrabold","w-full pr-2 pl-2 text-left")}>
          <span className={el("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] select-none","size-[28px]")}><span className={e_}>{e.charAt(0)}</span></span>
          <span className="min-w-0 flex-1">
            <span className={el("text-[15px]/[20px] font-bold",eo,"block truncate")}>{e}</span>
            <span className={el(ec,es,"block truncate")}>{x?.members}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {r&&<div ref={u} role="menu" aria-label="Switch workspace" className={el("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",eb,"absolute left-0 right-0 top-[calc(100%+0.25rem)] z-30",o?"opacity-100":"opacity-0")}>
          {ef.map(r=>(
            <button key={r.name} type="button" role="menuitemradio" aria-checked={r.name===e} onClick={()=>{
                    a(r.name),_(true)
                  }} className={ex}>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{r.name}</span>
                      <span className={el(ec,es,"block truncate")}>{r.members}</span>
                    </span>
                    {r.name===e&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" />}
                  </button>
          ))}
          <div role="separator" className="mx-1 my-2 h-[1.5px] rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:bg-neutral-100/8" />
          <button type="button" role="menuitem" onClick={()=>_(true)} className={ex}>Add workspace</button>
        </div>}
      </div>
  );
}

function ew({areaId:e,onSelectArea:a,onClose:r}){
  let[i,o]=useState(null),[s,c]=useState(false),{ref:d,edges:u,onScroll:x}=ei(),b=useRef(undefined),p=useRef(undefined),h=useRef(false),m=useRef(false),k=useRef(undefined),f=useReducedMotion(),v=ev.find(a=>a.id===e)??ev[0],g=e=>{
    clearTimeout(b.current),cancelAnimationFrame(p.current??0);
    let a=h.current||m.current,r=()=>{
      h.current=true,o(e),a?c(true):(c(false),p.current=requestAnimationFrame(()=>c(true)))
    };
    a?r():b.current=setTimeout(r,400)
  },w=()=>{
    clearTimeout(b.current),cancelAnimationFrame(p.current??0),h.current&&(m.current=true,clearTimeout(k.current),k.current=setTimeout(()=>{
      m.current=false
    },300)),h.current=false,o(null),c(false)
  };
  useEffect(()=>()=>{
    clearTimeout(b.current),clearTimeout(k.current),cancelAnimationFrame(p.current??0)
  }, []);
  let y=(e,a)=>i===e?<motion.span role="tooltip" initial={!s&&!f&&{opacity:0}} animate={{opacity:1}} transition={{duration:.16,ease:em}} className={el("pointer-events-none inline-flex min-h-7 w-fit max-w-64 items-center gap-2 rounded-[calc(var(--rb-r-lg,10px))] bg-neutral-900 px-3 py-1 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","absolute left-full top-1/2 z-[70] ml-2 h-7 -translate-y-1/2 whitespace-nowrap")}>{a}</motion.span>:null;
  return (
    <>
        <div className={el(ep,"flex w-14 shrink-0 flex-col items-center gap-1 px-2 py-3")}>
          {r&&<button type="button" aria-label="Close navigation" onClick={r} className={el(ed,eu,"mb-1")}>
            <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
          </button>}
          <nav aria-label="Areas" onMouseLeave={w} className="flex flex-col items-center gap-1">
            {ev.map(r=>{
              let n=r.id===e;
              return (
                <span key={r.id} className="relative">
                            <button type="button" aria-label={r.label} aria-current={n?"page":undefined} onClick={()=>{
                              a(r.id),w()
                            }} onMouseEnter={()=>g(r.id)} onFocus={()=>g(r.id)} onBlur={w} className={el(eh,"justify-center")}><HugeiconsIcon icon={r.icon} size={18} strokeWidth={2} aria-hidden="true" /></button>
                            {y(r.id,r.label)}
                          </span>
              );
            })}
          </nav>
          <span className="relative mt-auto" onMouseLeave={w}>
            <button type="button" aria-label="Marta Kowalczyk, dispatch manager" onMouseEnter={()=>g("account")} onFocus={()=>g("account")} onBlur={w} className={el("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","cursor-pointer")}><span className={e_}>MK</span></button>
            {y("account","Marta Kowalczyk")}
          </span>
        </div>
        <div className={el(ep,"flex w-64 min-w-0 flex-col")}>
          <div className="shrink-0 px-2 py-1.5"><eg /></div>
          <div className="relative min-h-0 flex-1">
            <nav ref={d} onScroll={x} aria-label={v.label} className="h-full overflow-y-auto px-2 pb-3">
              <div>
                {v.groups.map(e=>(
                  <div key={e.label}>
                                <p className="px-3 pt-5 pb-1.5 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e.label}</p>
                                <ul className="space-y-0.5">
                                  {e.items.map(e=>{
                                    let a=e.label===v.current;
                                    return (
                                      <li key={e.label}>
                                                          <a href={`#${v.id}`} aria-current={a?"page":undefined} className={eh}>
                                                            <span className="min-w-0 flex-1 truncate">{e.label}</span>
                                                            {e.count&&<span className={el("ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","shrink-0")}>{e.count}</span>}
                                                          </a>
                                                        </li>
                                    );
                                  })}
                                </ul>
                              </div>
                ))}
              </div>
            </nav>
            <div aria-hidden="true" className={el("bg-linear-to-b from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={el("bg-linear-to-t from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </>
  );
}


export default function app_shell_2__Sorbet__Component(){
  let[e,a]=useState(ev[0].id),[r,i]=useState(false),[o,s]=useState(false),{ref:c,edges:d,onScroll:u}=ei(),_=useRef(false),x=useRef(null),b=useRef(null),p=useRef(null),h=ev.find(a=>a.id===e)??ev[0];
  useEffect(()=>{
    let e=requestAnimationFrame(()=>{
      (x.current?.ownerDocument.defaultView??window).matchMedia("(max-width: 1023px)").matches&&i(true)
    });
    return ()=>cancelAnimationFrame(e);
  }, []),useEffect(()=>{
    if(!r)return;
    let e=p.current,a=e?.ownerDocument??document,t=requestAnimationFrame(()=>s(true)),n=()=>Array.from(e?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    _.current&&(n()[0]?.focus({preventScroll:true}),_.current=false);
    let l=e=>{
      if("Escape"===e.key){
        i(false),s(false),b.current?.focus({preventScroll:true});
        return
      }
      if("Tab"!==e.key)return;
      let r=n(),t=r[0],l=r[r.length-1];
      t&&l&&(e.shiftKey&&a.activeElement===t?(e.preventDefault(),l.focus({preventScroll:true})):e.shiftKey||a.activeElement!==l||(e.preventDefault(),t.focus({preventScroll:true})))
    };
    return a.addEventListener("keydown",l),()=>{
      cancelAnimationFrame(t),a.removeEventListener("keydown",l)
    };
  }, [r]);
  let m=()=>{
    i(false),s(false),b.current?.focus({preventScroll:true})
  };
  return (
    <div ref={x} className={el("bg-white dark:bg-neutral-950",eo,"relative flex h-full min-h-[800px] w-full overflow-hidden")}>
        <aside className="hidden shrink-0 lg:flex"><ew areaId={e} onSelectArea={a} /></aside>
        <div className={el("bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex min-w-0 flex-1 flex-col")}>
          <header className={el("border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <button ref={b} type="button" aria-label="Open navigation" aria-expanded={r} onClick={()=>{
              _.current=true,i(true)
            }} className={el(ed,eu,"lg:hidden")}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
            <h1 className={el("text-[22px]/[28px] font-extrabold tracking-[-0.01em]","min-w-0 flex-1 truncate")}>{h.title}</h1>
            <button type="button" className={el("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>{h.action}</button>
          </header>
          <div className="flex min-h-0 flex-1 flex-col p-2">
            <div className={el("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","min-h-0 flex-1")}>
              <main ref={c} onScroll={u} className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
                  <div className={el("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","h-12")}>
                    <h2 className={el("min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100","flex-1")}>{h.listTitle}</h2>
                    <span className="shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{h.listCount}</span>
                  </div>
                  <ul className={el("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7")}>
                    {h.rows.map(e=>(
                      <li key={e.name}>
                                        <button type="button" className={el("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","px-3")}>
                                          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                            <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.name}</span></span>
                                            <span data-description className={el(ec,es,"flex min-w-0 gap-2")}>
                                              {e.detail.map((e,a)=><span key={e} className={0===a?"shrink-0":"min-w-0 truncate"}>{e}</span>)}
                                            </span>
                                          </span>
                                          <span className="flex shrink-0 flex-col items-end">
                                            <span className={el("text-[14px]/[20px] font-medium","block min-h-lh tabular-nums")}>{e.meta}</span>
                                            <span className={el("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",ek[e.tone])}>{e.status}</span>
                                          </span>
                                        </button>
                                      </li>
                    ))}
                  </ul>
                </div>
              </main>
              <div aria-hidden="true" className={el("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 top-0 h-8",d.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={el("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
        {r&&<div className="lg:hidden">
          <button type="button" aria-label="Close navigation overlay" tabIndex={-1} onClick={m} className={el("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70",eb,"absolute inset-0 z-30 cursor-pointer",o?"opacity-100":"opacity-0")} />
          <div ref={p} role="dialog" aria-modal="true" aria-label="Navigation" className={el("bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",eb,"absolute inset-y-0 left-0 z-40 flex w-[312px] max-w-[calc(100%-3rem)] overflow-hidden",o?"opacity-100":"opacity-0")}><ew areaId={e} onSelectArea={a} onClose={m} /></div>
        </div>}
      </div>
  );
}
