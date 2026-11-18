/**
 * React Bits Pro — Application UI (command-menu-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, getElementById, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_57854 = [["path",{d:"M13.6903 19.4567C13.5 18.9973 13.5 18.4149 13.5 17.25C13.5 16.0851 13.5 15.5027 13.6903 15.0433C13.944 14.4307 14.4307 13.944 15.0433 13.6903C15.5027 13.5 16.0851 13.5 17.25 13.5C18.4149 13.5 18.9973 13.5 19.4567 13.6903C20.0693 13.944 20.556 14.4307 20.8097 15.0433C21 15.5027 21 16.0851 21 17.25C21 18.4149 21 18.9973 20.8097 19.4567C20.556 20.0693 20.0693 20.556 19.4567 20.8097C18.9973 21 18.4149 21 17.25 21C16.0851 21 15.5027 21 15.0433 20.8097C14.4307 20.556 13.944 20.0693 13.6903 19.4567Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13.6903 8.95671C13.5 8.49728 13.5 7.91485 13.5 6.75C13.5 5.58515 13.5 5.00272 13.6903 4.54329C13.944 3.93072 14.4307 3.44404 15.0433 3.1903C15.5027 3 16.0851 3 17.25 3C18.4149 3 18.9973 3 19.4567 3.1903C20.0693 3.44404 20.556 3.93072 20.8097 4.54329C21 5.00272 21 5.58515 21 6.75C21 7.91485 21 8.49728 20.8097 8.95671C20.556 9.56928 20.0693 10.056 19.4567 10.3097C18.9973 10.5 18.4149 10.5 17.25 10.5C16.0851 10.5 15.5027 10.5 15.0433 10.3097C14.4307 10.056 13.944 9.56928 13.6903 8.95671Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3.1903 19.4567C3 18.9973 3 18.4149 3 17.25C3 16.0851 3 15.5027 3.1903 15.0433C3.44404 14.4307 3.93072 13.944 4.54329 13.6903C5.00272 13.5 5.58515 13.5 6.75 13.5C7.91485 13.5 8.49728 13.5 8.95671 13.6903C9.56928 13.944 10.056 14.4307 10.3097 15.0433C10.5 15.5027 10.5 16.0851 10.5 17.25C10.5 18.4149 10.5 18.9973 10.3097 19.4567C10.056 20.0693 9.56928 20.556 8.95671 20.8097C8.49728 21 7.91485 21 6.75 21C5.58515 21 5.00272 21 4.54329 20.8097C3.93072 20.556 3.44404 20.0693 3.1903 19.4567Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3.1903 8.95671C3 8.49728 3 7.91485 3 6.75C3 5.58515 3 5.00272 3.1903 4.54329C3.44404 3.93072 3.93072 3.44404 4.54329 3.1903C5.00272 3 5.58515 3 6.75 3C7.91485 3 8.49728 3 8.95671 3.1903C9.56928 3.44404 10.056 3.93072 10.3097 4.54329C10.5 5.00272 10.5 5.58515 10.5 6.75C10.5 7.91485 10.5 8.49728 10.3097 8.95671C10.056 9.56928 9.56928 10.056 8.95671 10.3097C8.49728 10.5 7.91485 10.5 6.75 10.5C5.58515 10.5 5.00272 10.5 4.54329 10.3097C3.93072 10.056 3.44404 9.56928 3.1903 8.95671Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_29719 = [["path",{d:"M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_44647 = [["path",{d:"M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 15.5V21.5M21 18.5L15 18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11",cy:"6.5",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_52038 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20.8985 8C20.7706 6.69989 20.4816 5.82475 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C4.97975 21.6366 6.1277 21.8873 8 21.965",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 13V16L18 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_79698 = [["path",{d:"M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 6.5L16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_92881 = [["path",{d:"M3 19C3 18.535 3 18.3025 3.05111 18.1118C3.18981 17.5941 3.59413 17.1898 4.11177 17.0511C4.30252 17 4.53501 17 5 17H8C8.46499 17 8.69748 17 8.88823 17.0511C9.40587 17.1898 9.81019 17.5941 9.94889 18.1118C10 18.3025 10 18.535 10 19C10 19.465 10 19.6975 9.94889 19.8882C9.81019 20.4059 9.40587 20.8102 8.88823 20.9489C8.69748 21 8.46499 21 8 21H5C4.53501 21 4.30252 21 4.11177 20.9489C3.59413 20.8102 3.18981 20.4059 3.05111 19.8882C3 19.6975 3 19.465 3 19Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 5C14 4.53501 14 4.30252 14.0511 4.11177C14.1898 3.59413 14.5941 3.18981 15.1118 3.05111C15.3025 3 15.535 3 16 3H19C19.465 3 19.6975 3 19.8882 3.05111C20.4059 3.18981 20.8102 3.59413 20.9489 4.11177C21 4.30252 21 4.53501 21 5C21 5.46499 21 5.69748 20.9489 5.88823C20.8102 6.40587 20.4059 6.81019 19.8882 6.94889C19.6975 7 19.465 7 19 7H16C15.535 7 15.3025 7 15.1118 6.94889C14.5941 6.81019 14.1898 6.40587 14.0511 5.88823C14 5.69748 14 5.46499 14 5Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M9 12H8.5C6.567 12 5 10.433 5 8.5C5 6.567 6.56687 5 8.49987 5H14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10 19H15.5C17.433 19 19 17.433 19 15.5C19 13.567 17.4336 12 15.5006 12H15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10.6325 10.467C11.277 9.82235 11.5993 9.50001 11.9998 9.5C12.4003 9.49999 12.7226 9.82229 13.3672 10.4669L13.5332 10.6329C14.1777 11.2774 14.5 11.5997 14.5 12.0002C14.5 12.4007 14.1777 12.723 13.5331 13.3675L13.3673 13.5333C12.7227 14.1778 12.4005 14.5 12 14.5C11.5996 14.5 11.2773 14.1778 10.6328 13.5333L10.4669 13.3674C9.82231 12.7229 9.50003 12.4007 9.5 12.0002C9.49997 11.5997 9.82221 11.2774 10.4667 10.6329L10.6325 10.467Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
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

let Q = (...e)=>e.filter(Boolean).join(" ");

let X = "text-[14px]/[20px] font-medium";

let Y = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]";

let Z = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let ee = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let et = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let er = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let ea = Q(X,"text-neutral-900/78 dark:text-neutral-100/78");

let el = Q(X,"text-neutral-900/62 dark:text-neutral-100/62");

function en(){
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

let eo = {Doc:Icon_31964,Person:Icon_34951,Workflow:Icon_92881};

let ei = {Doc:"bg-[oklch(93%_0.06_220)] text-[oklch(38%_0.11_220)] dark:bg-[oklch(32%_0.07_220)] dark:text-[oklch(88%_0.08_220)]",Person:"bg-[oklch(93%_0.06_345)] text-[oklch(38%_0.11_345)] dark:bg-[oklch(32%_0.07_345)] dark:text-[oklch(88%_0.08_345)]",Workflow:"bg-[oklch(93%_0.06_250)] text-[oklch(38%_0.11_250)] dark:bg-[oklch(32%_0.07_250)] dark:text-[oklch(88%_0.08_250)]"};

let es = [{id:"r-readiness",kind:"Doc",title:"Launch readiness review",subtitle:["Runbook","Aurora mobile 2.4"],facts:[{label:"Owner",value:"Priya Anand"},{label:"Section",value:"Release"},{label:"Updated",value:"6m ago"}],summary:"Gate checklist covering rollout stages, alerting thresholds, and the rollback owner for the 2.4 launch."},{id:"r-latency",kind:"Doc",title:"Checkout latency postmortem",subtitle:["Incident 4821"],facts:[{label:"Owner",value:"Marcus Reed"},{label:"Section",value:"Reliability"},{label:"Updated",value:"1h ago"}],summary:"Root cause of the p95 spike at checkout, the mitigation shipped, and follow-up work to prevent recurrence."},{id:"r-rollback",kind:"Doc",title:"Rollback procedure for staged deploys",subtitle:["Runbook","Platform"],facts:[{label:"Owner",value:"Priya Anand"},{label:"Section",value:"Release"},{label:"Updated",value:"3 days ago"}],summary:"Step-by-step revert for a canary that fails its error gate, including who to page and what to post."},{id:"r-priya",kind:"Person",title:"Priya Anand",subtitle:["Staff engineer","Release"],facts:[{label:"Team",value:"Release"},{label:"Timezone",value:"GMT+1"},{label:"Reviews",value:"18"}],summary:"Owns launch readiness for mobile. Point of contact for rollout gates and staged deploys."},{id:"r-marcus",kind:"Person",title:"Marcus Reed",subtitle:["Senior engineer","Reliability"],facts:[{label:"Team",value:"Reliability"},{label:"Timezone",value:"GMT−5"},{label:"Reviews",value:"24"}],summary:"Runs the incident rotation this week. Best reached in the reliability channel for pages."},{id:"r-deploy",kind:"Workflow",title:"Staged deploy to production",subtitle:["Runs on merge to main"],facts:[{label:"Last run",value:"Passed"},{label:"Duration",value:"6m 40s"},{label:"Steps",value:"9"}],summary:"Promotes a build through canary and full rollout with automatic rollback if error rate exceeds the gate."},{id:"r-rotate",kind:"Workflow",title:"Rotate signing keys",subtitle:["Runs weekly, Mondays"],facts:[{label:"Last run",value:"Passed"},{label:"Duration",value:"48s"},{label:"Steps",value:"4"}],summary:"Issues a fresh signing key, updates the secret store, and revokes the previous key after a grace window."},{id:"r-backup",kind:"Workflow",title:"Nightly database backup",subtitle:["Runs daily, 02:00 UTC"],facts:[{label:"Last run",value:"Passed"},{label:"Duration",value:"11m 02s"},{label:"Steps",value:"3"}],summary:"Snapshots the primary cluster to cold storage and verifies the restore path against a scratch instance."}];

let ec = [{id:"all",label:"All"},{id:"Doc",label:"Docs"},{id:"Person",label:"People"},{id:"Workflow",label:"Workflows"}];

function ed({children:e}){
  return <kbd className="inline-flex min-h-5.5 min-w-5.5 w-fit items-center justify-center gap-1 rounded-[calc(var(--rb-r-md,8px))] bg-white px-1.5 font-mono text-[12px]/[16px] font-semibold tabular-nums text-neutral-900/78 dark:text-neutral-100/78 shadow-[0_0_0_1px_rgb(84_62_32/0.14),inset_0_-2px_0_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.06)] select-none dark:bg-neutral-800 dark:shadow-[0_0_0_1px_rgb(0_0_0/0.6),inset_0_-2px_0_rgb(0_0_0/0.4),inset_0_1px_0_rgb(255_255_255/0.08)]">{e}</kbd>;
}


export default function command_menu_3__Sorbet__Component(){
  let e=useId(),t=useRef(null),r=useRef(null),{ref:o,edges:i,onScroll:s}=en(),{ref:c,edges:d,onScroll:_}=en(),u=useRef(null),x=useRef(null),h=useRef(undefined),m=useRef(undefined),[f,k]=useState(true),[g,v]=useState(true),[w,y]=useState(""),[j,N]=useState("all"),[S,D]=useState(0),A=`${e}-listbox`,C=useMemo(()=>{
    let e=w.trim().toLowerCase();
    return es.filter(t=>("all"===j||t.kind===j)&&(!e||`${t.title} ${t.subtitle.join(" ")} ${t.summary}`.toLowerCase().includes(e)));
  }, [w,j]),R=Math.min(S,Math.max(C.length-1,0)),z=C[R],$=z?`${e}-${z.id}`:undefined;
  useEffect(()=>{
    f&&u.current?.focus({preventScroll:true})
  }, [f]),useEffect(()=>{
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
  }, [R,w,j,o]),useEffect(()=>()=>{
    cancelAnimationFrame(h.current??0),clearTimeout(m.current)
  }, []);
  let E=useCallback(e=>{
    clearTimeout(m.current),k(true),e?(v(false),h.current=requestAnimationFrame(()=>v(true))):v(true)
  }, []),T=useCallback(()=>{
    v(false),clearTimeout(m.current),m.current=setTimeout(()=>{
      k(false),x.current?.focus({preventScroll:true})
    },140)
  }, []);
  useEffect(()=>{
    let e=t.current?.ownerDocument??document,r=e=>{
      (e.metaKey||e.ctrlKey)&&"k"===e.key.toLowerCase()&&(e.preventDefault(),E(false))
    };
    return e.addEventListener("keydown",r),()=>e.removeEventListener("keydown",r);
  }, [E]);
  let M=useCallback(()=>{
    y(""),D(0),T()
  }, [T]),L=e=>{
    let t=C.length;
    0!==t&&D((R+e+t)%t)
  };
  return (
    <section ref={t} className={Q("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={x} type="button" aria-haspopup="dialog" aria-expanded={f} onClick={()=>E(true)} className={Q(Z,ee,"w-80 max-w-full")}>
          <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
          <span className="min-w-0 flex-1 truncate text-left">Search docs, people, workflows</span>
          <ed>⌘K</ed>
        </button>
        {f&&<>
          <button type="button" tabIndex={-1} aria-label="Close search" onClick={T} className={Q("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70","absolute inset-0 z-40 cursor-default",g?"opacity-100":Q(Y,"opacity-0"))} />
          <div ref={r} role="dialog" aria-modal="true" aria-labelledby={`${e}-title`} onKeyDown={e=>{
            if("Escape"===e.key){
              e.preventDefault(),T();
              return
            }
            if("Tab"!==e.key)return;
            let t=r.current;
            if(!t)return;
            let a=Array.from(t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
            if(0===a.length)return;
            let l=a[0],n=a[a.length-1],o=t.ownerDocument.activeElement;
            e.shiftKey&&o===l?(e.preventDefault(),n.focus({preventScroll:true})):e.shiftKey||o!==n||(e.preventDefault(),focus({preventScroll:true}))
          }} className={Q("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute left-1/2 top-[10%] z-50 max-h-[min(80%,calc(100%-4rem))] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2",g?"opacity-100":Q(Y,"opacity-0"))}>
            <h2 id={`${e}-title`} className="sr-only">Search everything</h2>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:last-child]:mb-1">
              <div className={Q("flex min-h-12 shrink-0 items-center gap-2.5 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] ps-4 pe-2 text-neutral-900/62 dark:text-neutral-100/62 dark:bg-neutral-100/4","h-12")}>
                <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                <label htmlFor={`${e}-input`} className="sr-only">Search everything</label>
                <input ref={u} id={`${e}-input`} role="combobox" aria-expanded="true" aria-controls={A} aria-activedescendant={$} aria-autocomplete="list" value={w} onChange={e=>{
                  y(e.target.value),D(0)
                }} onKeyDown={e=>{
                  switch(e.key){case"ArrowDown":e.preventDefault(),L(1);break;case"ArrowUp":e.preventDefault(),L(-1);break;case"Home":e.preventDefault(),D(0);break;case"End":e.preventDefault(),D(Math.max(C.length-1,0));break;case"Enter":if(!z)break;e.preventDefault(),M()}
                }} placeholder="Search everything" className="h-full min-w-0 flex-1 bg-transparent text-[16px]/[20px] font-semibold text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/55 dark:placeholder:text-neutral-100/55" />
              </div>
              <div className="shrink-0 px-4 py-2">
                <div role="radiogroup" aria-label="Result type" className={Q("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10")}>
                  {ec.map((t,r)=>{
                    let l=j===t.id;
                    return (
                      <button key={t.id} id={`${e}-filter-${t.id}`} type="button" role="radio" aria-checked={l} tabIndex={l?0:-1} onClick={()=>{
                                        N(t.id),D(0)
                                      }} onKeyDown={t=>((t,r)=>{
                                        if("ArrowRight"!==t.key&&"ArrowLeft"!==t.key)return;
                                        t.preventDefault();
                                        let a=(r+("ArrowRight"===t.key?1:-1)+ec.length)%ec.length;
                                        N(ec[a].id),D(0);
                                        let l=t.currentTarget.ownerDocument;
                                        getElementById(`${e}-filter-${ec[a].id}`)?.focus({preventScroll:true})
                                      })(t,r)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{t.label}</button>
                    );
                  })}
                </div>
              </div>
              <div className="flex min-h-0 flex-1">
                <div className="relative min-h-0 w-full sm:w-1/2 sm:shrink-0">
                  <div ref={o} onScroll={s} className="h-full overflow-y-auto p-2">
                    {C.length>0?<div id={A} role="listbox" aria-label="Results">
                      {C.map((t,r)=>{
                        let l=r===R;
                        return (
                          <button key={t.id} id={`${e}-${t.id}`} role="option" aria-selected={l} data-active={l} data-highlighted={l||undefined} type="button" tabIndex={-1} onPointerMove={()=>D(r)} onMouseDown={e=>{
                                                e.preventDefault(),D(r),M()
                                              }} className={Q("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","min-h-11")}>
                                                <HugeiconsIcon icon={eo[t.kind]} size={18} strokeWidth={2} aria-hidden="true" />
                                                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                  <span className="truncate">{t.title}</span>
                                                  <span className={Q(ea,"flex min-w-0 gap-3")}>{t.subtitle.map(e=><span key={e} className="truncate">{e}</span>)}</span>
                                                </span>
                                              </button>
                        );
                      })}
                    </div>:<div className="flex flex-col items-center px-2.5 py-10 text-center">
                      <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">
                        No matches in
                        {" "}
                        {"all"===j?"anything":"this type"}
                      </p>
                      <p className={Q("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1 max-w-xs text-balance")}>Try another term, or widen the filter back to everything.</p>
                      <button type="button" onMouseDown={e=>{
                        e.preventDefault(),y(""),N("all"),D(0),u.current?.focus({preventScroll:true})
                      }} className={Q(Z,ee,"mt-4")}>Reset search</button>
                    </div>}
                  </div>
                  <div aria-hidden="true" className={Q(et,"pointer-events-none absolute inset-x-0 top-0 h-8",i.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={Q(er,"pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
                </div>
                <div className="relative my-2 hidden min-h-0 min-w-0 flex-1 overflow-hidden sm:block">
                  <div ref={c} onScroll={_} aria-live="polite" className="h-full overflow-y-auto px-4 pt-1.5 pb-4">
                    {z?<div className="flex flex-col">
                      <p className={Q("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums",ei[z.kind])}>{z.kind}</p>
                      <h3 className={Q("text-[17px]/[22px] font-extrabold","mt-1")}>{z.title}</h3>
                      <p className={Q(ea,"mt-0.5 flex flex-wrap gap-x-3")}>{z.subtitle.map(e=><span key={e}>{e}</span>)}</p>
                      <dl className={Q("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-4 flex flex-col")}>
                        {z.facts.map(e=>(
                          <div key={e.label} className="flex min-h-10 min-w-0 items-center justify-between gap-4">
                                                <dt className={Q("min-w-0 text-[15px]/[20px] font-bold text-neutral-900/62 dark:text-neutral-100/62","shrink-0")}>{e.label}</dt>
                                                <dd className={Q("flex min-w-0 flex-wrap items-center gap-2 text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","justify-end text-right tabular-nums")}>{e.value}</dd>
                                              </div>
                        ))}
                      </dl>
                      <p className={Q(ea,"mt-4")}>{z.summary}</p>
                    </div>:<div className={Q(el,"flex h-full items-center justify-center px-6 text-center")}>Nothing to preview yet.</div>}
                  </div>
                  <div aria-hidden="true" className={Q(et,"pointer-events-none absolute inset-x-0 top-0 h-8",d.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={Q(er,"pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
            </div>
            <div className={Q(el,"flex h-10 shrink-0 items-center gap-4 px-5")}>
              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <ed>↑</ed>
                <ed>↓</ed>
                to move
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ed>
                  <HugeiconsIcon icon={Icon_68820} size={14} strokeWidth={2} aria-hidden="true" />
                </ed>
                to open
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ed>esc</ed>
                to close
              </span>
              <span className="ml-auto shrink-0 tabular-nums">
                {C.length}
                {" of "}
                {es.length}
              </span>
            </div>
          </div>
        </>}
      </section>
  );
}
