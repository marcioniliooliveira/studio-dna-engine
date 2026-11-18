/**
 * React Bits Pro — Application UI (command-menu-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_57854 = [["path",{d:"M13.6903 19.4567C13.5 18.9973 13.5 18.4149 13.5 17.25C13.5 16.0851 13.5 15.5027 13.6903 15.0433C13.944 14.4307 14.4307 13.944 15.0433 13.6903C15.5027 13.5 16.0851 13.5 17.25 13.5C18.4149 13.5 18.9973 13.5 19.4567 13.6903C20.0693 13.944 20.556 14.4307 20.8097 15.0433C21 15.5027 21 16.0851 21 17.25C21 18.4149 21 18.9973 20.8097 19.4567C20.556 20.0693 20.0693 20.556 19.4567 20.8097C18.9973 21 18.4149 21 17.25 21C16.0851 21 15.5027 21 15.0433 20.8097C14.4307 20.556 13.944 20.0693 13.6903 19.4567Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13.6903 8.95671C13.5 8.49728 13.5 7.91485 13.5 6.75C13.5 5.58515 13.5 5.00272 13.6903 4.54329C13.944 3.93072 14.4307 3.44404 15.0433 3.1903C15.5027 3 16.0851 3 17.25 3C18.4149 3 18.9973 3 19.4567 3.1903C20.0693 3.44404 20.556 3.93072 20.8097 4.54329C21 5.00272 21 5.58515 21 6.75C21 7.91485 21 8.49728 20.8097 8.95671C20.556 9.56928 20.0693 10.056 19.4567 10.3097C18.9973 10.5 18.4149 10.5 17.25 10.5C16.0851 10.5 15.5027 10.5 15.0433 10.3097C14.4307 10.056 13.944 9.56928 13.6903 8.95671Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3.1903 19.4567C3 18.9973 3 18.4149 3 17.25C3 16.0851 3 15.5027 3.1903 15.0433C3.44404 14.4307 3.93072 13.944 4.54329 13.6903C5.00272 13.5 5.58515 13.5 6.75 13.5C7.91485 13.5 8.49728 13.5 8.95671 13.6903C9.56928 13.944 10.056 14.4307 10.3097 15.0433C10.5 15.5027 10.5 16.0851 10.5 17.25C10.5 18.4149 10.5 18.9973 10.3097 19.4567C10.056 20.0693 9.56928 20.556 8.95671 20.8097C8.49728 21 7.91485 21 6.75 21C5.58515 21 5.00272 21 4.54329 20.8097C3.93072 20.556 3.44404 20.0693 3.1903 19.4567Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3.1903 8.95671C3 8.49728 3 7.91485 3 6.75C3 5.58515 3 5.00272 3.1903 4.54329C3.44404 3.93072 3.93072 3.44404 4.54329 3.1903C5.00272 3 5.58515 3 6.75 3C7.91485 3 8.49728 3 8.95671 3.1903C9.56928 3.44404 10.056 3.93072 10.3097 4.54329C10.5 5.00272 10.5 5.58515 10.5 6.75C10.5 7.91485 10.5 8.49728 10.3097 8.95671C10.056 9.56928 9.56928 10.056 8.95671 10.3097C8.49728 10.5 7.91485 10.5 6.75 10.5C5.58515 10.5 5.00272 10.5 4.54329 10.3097C3.93072 10.056 3.44404 9.56928 3.1903 8.95671Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_29719 = [["path",{d:"M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_44647 = [["path",{d:"M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 15.5V21.5M21 18.5L15 18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11",cy:"6.5",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_52038 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20.8985 8C20.7706 6.69989 20.4816 5.82475 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C4.97975 21.6366 6.1277 21.8873 8 21.965",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 13V16L18 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_79698 = [["path",{d:"M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 6.5L16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_22670 = [["path",{d:"M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_68820 = [["path",{d:"M5 15H12C15.7712 15 17.6569 15 18.8284 13.8284C20 12.6569 20 10.7712 20 7V4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.99996 20C8.99996 20 4.00001 16.3176 4 15C3.99999 13.6824 9 10 9 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let h = (...e)=>e.filter(Boolean).join(" ");

let m = "text-[14px]/[20px] font-medium";

let f = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]";

let k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let g = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let v = h(m,"text-neutral-900/78 dark:text-neutral-100/78");

let w = h(m,"text-neutral-900/62 dark:text-neutral-100/62");

let y = [{id:"recent-readiness",group:"Recent",title:"Launch readiness review",detail:"Opened 6 minutes ago",shortcut:"1",icon:Icon_29635},{id:"recent-incident",group:"Recent",title:"Incident 4821, checkout latency",detail:"Opened yesterday",shortcut:"2",icon:Icon_29635},{id:"recent-roadmap",group:"Recent",title:"Q3 roadmap draft",detail:"Opened 2 days ago",shortcut:"3",icon:Icon_29635},{id:"go-overview",group:"Navigation",title:"Release overview",shortcut:"G O",icon:Icon_57854},{id:"go-docs",group:"Navigation",title:"Runbooks and docs",shortcut:"G D",icon:Icon_31964},{id:"go-people",group:"Navigation",title:"Team directory",shortcut:"G P",icon:Icon_88366},{id:"go-settings",group:"Navigation",title:"Workspace settings",shortcut:"G S",icon:Icon_29719},{id:"do-invite",group:"Actions",title:"Invite a teammate",detail:"Send a workspace invite by email",shortcut:"I",icon:Icon_44647},{id:"do-schedule",group:"Actions",title:"Schedule a launch review",detail:"Hold a slot with product and infra",shortcut:"S",icon:Icon_52038},{id:"do-rotate",group:"Actions",title:"Rotate an API key",detail:"Retire a key and issue a replacement",shortcut:"R",icon:Icon_79698}];

let j = ["Recent","Navigation","Actions"];

function N({children:e}){
  return <kbd className="inline-flex min-h-5.5 min-w-5.5 w-fit items-center justify-center gap-1 rounded-[calc(var(--rb-r-md,8px))] bg-white px-1.5 font-mono text-[12px]/[16px] font-semibold tabular-nums text-neutral-900/78 dark:text-neutral-100/78 shadow-[0_0_0_1px_rgb(84_62_32/0.14),inset_0_-2px_0_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.06)] select-none dark:bg-neutral-800 dark:shadow-[0_0_0_1px_rgb(0_0_0/0.6),inset_0_-2px_0_rgb(0_0_0/0.4),inset_0_1px_0_rgb(255_255_255/0.08)]">{e}</kbd>;
}

let W = (...e)=>e.filter(Boolean).join(" ");

let F = "text-[14px]/[20px] font-medium";

let I = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]";

let B = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let O = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let P = W(F,"text-neutral-900/78 dark:text-neutral-100/78");

let H = W(F,"text-neutral-900/62 dark:text-neutral-100/62");

let eb = (...e)=>e.filter(Boolean).join(" ");

let ep = "text-neutral-900/62 dark:text-neutral-100/62";

let eh = "text-[14px]/[20px] font-medium";

let em = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]";

let ef = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let ek = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eg = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let ev = "mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:last-child]:mb-1";

let ew = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let ey = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let ej = eb(eh,"text-neutral-900/78 dark:text-neutral-100/78");

let eN = eb(eh,ep);

function eS(){
  let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
    let t=e.current;
    if(!t)return;
    let{scrollTop:a,scrollHeight:l,clientHeight:n}=t;
    r({start:a>1,end:Math.ceil(a+n)<l-1})
  }, []);
  return useEffect(()=>{
    a();
    let t=e.current,r=t?.ownerDocument.defaultView;
    if(!t||!r?.ResizeObserver)return;
    let l=new r.ResizeObserver(a);
    return observe(t),()=>disconnect();
  }, [a]),{ref:e,edges:t,onScroll:a};
}

let eD = [{id:"invite",title:"Invite a teammate",detail:"Add someone to Northwind",icon:Icon_44647,cta:"Send invite",fields:[{id:"email",label:"Email address",kind:"text",placeholder:"name@company.com"},{id:"role",label:"Role",kind:"select",options:["Viewer","Editor","Admin"]}],summary:e=>`Invite ${e.email||"this person"} to Northwind as ${(e.role||"a member").toLowerCase()}.`},{id:"rerun",title:"Rerun a workflow",detail:"Trigger a fresh run",icon:Icon_59157,cta:"Start run",fields:[{id:"workflow",label:"Workflow",kind:"select",options:["Staged deploy","Rotate signing keys","Nightly backup"]},{id:"ref",label:"Git ref",kind:"text",placeholder:"main"}],summary:e=>`Run ${e.workflow||"a workflow"} on ${e.ref||"main"}.`},{id:"archive",title:"Archive a project",detail:"Hide it from the workspace",icon:Icon_22670,cta:"Archive project",destructive:true,fields:[{id:"project",label:"Project",kind:"select",options:["Ledger billing","Relay notifications","Beacon status page"]}],summary:e=>`Archive ${e.project||"a project"}. Members lose access until it is restored.`}];

let eA = {invite:{email:"erin.walsh@northwind.io",role:"Editor"},rerun:{workflow:"Staged deploy",ref:"main"},archive:{project:"Ledger billing"}};

function eC({children:e}){
  return <kbd className="inline-flex min-h-5.5 min-w-5.5 w-fit items-center justify-center gap-1 rounded-[calc(var(--rb-r-md,8px))] bg-white px-1.5 font-mono text-[12px]/[16px] font-semibold tabular-nums text-neutral-900/78 dark:text-neutral-100/78 shadow-[0_0_0_1px_rgb(84_62_32/0.14),inset_0_-2px_0_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.06)] select-none dark:bg-neutral-800 dark:shadow-[0_0_0_1px_rgb(0_0_0/0.6),inset_0_-2px_0_rgb(0_0_0/0.4),inset_0_1px_0_rgb(255_255_255/0.08)]">{e}</kbd>;
}


export default function command_menu_4__Sorbet__Component(){
  let e=useId(),t=useRef(null),r=useRef(null),{ref:o,edges:i,onScroll:s}=eS(),{ref:c,edges:d,onScroll:_}=eS(),u=useRef(null),x=useRef(null),h=useRef(null),m=useRef(undefined),f=useRef(undefined),[k,g]=useState(true),[v,w]=useState(true),[y,j]=useState("form"),[N,S]=useState("invite"),[D,A]=useState(""),[C,R]=useState(0),[z,$]=useState(()=>JSON.parse(JSON.stringify(eA))),E=`${e}-listbox`,T=eD.find(e=>e.id===N)??eD[0],L=z[N]??{},K=useMemo(()=>{
    let e=D.trim().toLowerCase();
    return e?eD.filter(t=>`${t.title} ${t.detail}`.toLowerCase().includes(e)):eD;
  }, [D]),W=K[C],F=W?`${e}-${W.id}`:undefined;
  useEffect(()=>{
    k&&("select"===y?u.current?.focus({preventScroll:true}):h.current?.focus({preventScroll:true}))
  }, [k,y]),useEffect(()=>{
    let e=o.current,t=e?.querySelector('[data-active="true"]');
    if(!e||!t)return;
    let r=e.getBoundingClientRect(),a=t.getBoundingClientRect();
    if(a.top<r.top+32){
      let t=e.scrollTop-(r.top+32-a.top);
      e.scrollTop=t<32?0:t
    }else if(a.bottom>r.bottom-32){
      let t=e.scrollHeight-e.clientHeight,l=e.scrollTop+(a.bottom-r.bottom+32);
      e.scrollTop=l>t-32?t:l
    }
  }, [C,D,y,o]),useEffect(()=>()=>{
    cancelAnimationFrame(m.current??0),clearTimeout(f.current)
  }, []);
  let I=useCallback(e=>{
    clearTimeout(f.current),g(true),e?(w(false),m.current=requestAnimationFrame(()=>w(true))):w(true)
  }, []),B=useCallback(()=>{
    w(false),clearTimeout(f.current),f.current=setTimeout(()=>{
      g(false),x.current?.focus({preventScroll:true})
    },140)
  }, []);
  useEffect(()=>{
    let e=t.current?.ownerDocument??document,r=e=>{
      (e.metaKey||e.ctrlKey)&&"k"===e.key.toLowerCase()&&(e.preventDefault(),I(false))
    };
    return e.addEventListener("keydown",r),()=>e.removeEventListener("keydown",r);
  }, [I]);
  let O=useCallback(e=>{
    S(e.id),j("form"),A("")
  }, []),P=(e,t)=>{
    $(r=>({...r,[N]:{...r[N],[e]:t}}))
  },H=e=>{
    let t=K.length;
    0!==t&&R(r=>(r+e+t)%t)
  };
  return (
    <section ref={t} className={eb("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[400px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={x} type="button" aria-haspopup="dialog" aria-expanded={k} onClick={()=>I(true)} className={eb(ek,eg)}>
          Run an action
          <eC>⌘K</eC>
        </button>
        {k&&<>
          <button type="button" tabIndex={-1} aria-label="Close menu" onClick={B} className={eb("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70","absolute inset-0 z-40 cursor-default",v?"opacity-100":eb(em,"opacity-0"))} />
          <div ref={r} role="dialog" aria-modal="true" aria-labelledby={`${e}-title`} onKeyDown={e=>{
            if("Escape"===e.key){
              e.preventDefault(),B();
              return
            }
            if("Tab"!==e.key)return;
            let t=r.current;
            if(!t)return;
            let a=Array.from(t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
            if(0===a.length)return;
            let l=a[0],n=a[a.length-1],o=t.ownerDocument.activeElement;
            e.shiftKey&&o===l?(e.preventDefault(),n.focus({preventScroll:true})):e.shiftKey||o!==n||(e.preventDefault(),focus({preventScroll:true}))
          }} className={eb("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute left-1/2 top-[12%] z-50 max-h-[min(76%,calc(100%-4rem))] w-[calc(100%-2rem)] max-w-md -translate-x-1/2",v?"opacity-100":eb(em,"opacity-0"))}>
            {"select"===y?<>
              <h2 id={`${e}-title`} className="sr-only">Run an action</h2>
              <div className={ev}>
                <div className={eb("flex min-h-12 shrink-0 items-center gap-2.5 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] ps-4 pe-2 text-neutral-900/62 dark:text-neutral-100/62 dark:bg-neutral-100/4","h-12")}>
                  <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                  <label htmlFor={`${e}-input`} className="sr-only">Find an action</label>
                  <input ref={u} id={`${e}-input`} role="combobox" aria-expanded="true" aria-controls={E} aria-activedescendant={F} aria-autocomplete="list" value={D} onChange={e=>{
                    A(e.target.value),R(0)
                  }} onKeyDown={e=>{
                    switch(e.key){case"ArrowDown":e.preventDefault(),H(1);break;case"ArrowUp":e.preventDefault(),H(-1);break;case"Home":e.preventDefault(),R(0);break;case"End":e.preventDefault(),R(Math.max(K.length-1,0));break;case"Enter":if(!W)break;e.preventDefault(),O(W)}
                  }} placeholder="Find an action" className="h-full min-w-0 flex-1 bg-transparent text-[16px]/[20px] font-semibold text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/55 dark:placeholder:text-neutral-100/55" />
                </div>
                <div className="relative min-h-0 flex-1">
                  <div ref={o} onScroll={s} className="h-full overflow-y-auto p-2">
                    {K.length>0?<div id={E} role="listbox" aria-label="Actions">
                      {K.map((t,r)=>{
                        let l=r===C;
                        return (
                          <button key={t.id} id={`${e}-${t.id}`} role="option" aria-selected={l} data-active={l} data-highlighted={l||undefined} type="button" tabIndex={-1} onPointerMove={()=>R(r)} onMouseDown={e=>{
                                                e.preventDefault(),O(t)
                                              }} className={eb("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","min-h-11")}>
                                                <HugeiconsIcon icon={t.icon} size={18} strokeWidth={2} aria-hidden="true" />
                                                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                  <span className="truncate">{t.title}</span>
                                                  <span className={eb(ej,"truncate")}>{t.detail}</span>
                                                </span>
                                              </button>
                        );
                      })}
                    </div>:<div className="flex flex-col items-center px-2.5 py-8 text-center">
                      <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">
                        No action matches “
                        {D.trim()}
                        ”
                      </p>
                      <button type="button" onMouseDown={e=>{
                        e.preventDefault(),A(""),R(0),u.current?.focus({preventScroll:true})
                      }} className={eb(ek,eg,"mt-3")}>Clear search</button>
                    </div>}
                  </div>
                  <div aria-hidden="true" className={eb(ew,"pointer-events-none absolute inset-x-0 top-0 h-8",i.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={eb(ey,"pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
            </>:<form onSubmit={e=>{
              e.preventDefault(),"form"===y?j("confirm"):B()
            }} className="flex min-h-0 flex-1 flex-col">
              <div className={ev}>
                <div className="flex h-12 shrink-0 items-center gap-3 px-4">
                  <button type="button" aria-label={"confirm"===y?"Back to details":"Back to actions"} onClick={()=>"confirm"===y?j("form"):j("select")} className={eb("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-8 rounded-[calc(var(--rb-r-full,999px))]","-ml-1.5")}>
                    <HugeiconsIcon icon={Icon_18976} size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                  <h2 id={`${e}-title`} className={eb("min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100","flex-1")}>{T.title}</h2>
                  <span className={eb("text-[13px]/[16px] font-semibold tabular-nums",ep,"shrink-0")}>{"form"===y?"Step 1 of 2":"Step 2 of 2"}</span>
                </div>
                <div className="relative min-h-0 flex-1">
                  <div ref={c} onScroll={_} className="h-full overflow-y-auto px-4 pt-1 pb-4">
                    {"form"===y?<div className="flex flex-col gap-4">
                      {T.fields.map((t,r)=>(
                        <div key={t.id} className="flex flex-col gap-2">
                                            <label htmlFor={`${e}-${t.id}`} className="flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100">{t.label}</label>
                                            {"text"===t.kind?<div className={eb("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10")}>
                                              <input ref={0===r?h:undefined} id={`${e}-${t.id}`} value={L[t.id]??""} onChange={e=>P(t.id,e.target.value)} placeholder={t.placeholder} className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
                                            </div>:<div className="relative">
                                              <select ref={0===r?h:undefined} id={`${e}-${t.id}`} value={L[t.id]??t.options[0]} onChange={e=>P(t.id,e.target.value)} className={eb("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full appearance-none pr-8")}>{t.options.map(e=><option key={e} value={e}>{e}</option>)}</select>
                                              <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className={eb("shrink-0 text-neutral-900/78 dark:text-neutral-100/78","pointer-events-none absolute right-3 top-1/2 -translate-y-1/2")} />
                                            </div>}
                                          </div>
                      ))}
                    </div>:<div>
                      <p className={eh}>{T.summary(L)}</p>
                      <dl className={eb("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-3 flex flex-col")}>
                        {T.fields.map(e=>(
                          <div key={e.id} className="flex min-h-10 min-w-0 items-center justify-between gap-4">
                                                <dt className={eb("min-w-0 text-[15px]/[20px] font-bold text-neutral-900/62 dark:text-neutral-100/62","shrink-0")}>{e.label}</dt>
                                                <dd className={eb("flex min-w-0 flex-wrap items-center gap-2 text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","justify-end text-right")}>
                                                  {L[e.id]||<span className="text-neutral-900/62 dark:text-neutral-100/62">None</span>}
                                                </dd>
                                              </div>
                        ))}
                      </dl>
                    </div>}
                  </div>
                  <div aria-hidden="true" className={eb(ew,"pointer-events-none absolute inset-x-0 top-0 h-8",d.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={eb(ey,"pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
              <div className={eb(eN,"flex h-14 shrink-0 items-center gap-4 ps-5 pe-3")}>
                <span className="inline-flex items-center gap-1.5">
                  <eC>
                    <HugeiconsIcon icon={Icon_68820} size={14} strokeWidth={2} aria-hidden="true" />
                  </eC>
                  {"form"===y?"to review":"to confirm"}
                </span>
                <span className="hidden items-center gap-1.5 sm:inline-flex">
                  <eC>esc</eC>
                  to close
                </span>
                {"form"===y?<button type="submit" className={eb(ef,eg,"ml-auto")}>Review</button>:<button type="button" onClick={B} className={eb(T.destructive?"relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-[oklch(51%_0.18_26)] hover:not-disabled:bg-none hover:not-disabled:bg-[oklch(96%_0.03_26)] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:text-[oklch(80%_0.13_26)] dark:hover:not-disabled:bg-[oklch(32%_0.07_26)] dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40":ef,eg,"ml-auto")}>{T.cta}</button>}
              </div>
            </form>}
            {"select"===y&&<div className={eb(eN,"flex h-10 shrink-0 items-center gap-4 px-5")}>
              <span className="inline-flex items-center gap-1.5">
                <eC>
                  <HugeiconsIcon icon={Icon_68820} size={14} strokeWidth={2} aria-hidden="true" />
                </eC>
                to choose
              </span>
              <span className="inline-flex items-center gap-1.5">
                <eC>esc</eC>
                to close
              </span>
            </div>}
          </div>
        </>}
      </section>
  );
}
