/**
 * React Bits Pro — Application UI (app-sidebar-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { activeElement, addEventListener, disconnect, observe, removeEventListener, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_79875 = [["path",{d:"M12 21C15.7497 21 17.6246 21 18.9389 20.0451C19.3634 19.7367 19.7367 19.3634 20.0451 18.9389C21 17.6246 21 15.7497 21 12C21 8.25027 21 6.3754 20.0451 5.06107C19.7367 4.6366 19.3634 4.26331 18.9389 3.95491C17.6246 3 15.7497 3 12 3C8.25027 3 6.3754 3 5.06107 3.95491C4.6366 4.26331 4.26331 4.6366 3.95491 5.06107C3 6.3754 3 8.25027 3 12C3 15.7497 3 17.6246 3.95491 18.9389C4.26331 19.3634 4.6366 19.7367 5.06107 20.0451C6.3754 21 8.25027 21 12 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 7V11M17 7V17M7 7V14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_13575 = [["path",{d:"M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 11V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 11V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M8 11V15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_19809 = [["path",{d:"M3.88884 9.66294C4.39329 10 5.09552 10 6.49998 10C7.90445 10 8.60668 10 9.11113 9.66294C9.32951 9.51702 9.51701 9.32952 9.66292 9.11114C9.99998 8.60669 9.99998 7.90446 9.99998 6.5C9.99998 5.09554 9.99998 4.39331 9.66292 3.88886C9.51701 3.67048 9.32951 3.48298 9.11113 3.33706C8.60668 3 7.90445 3 6.49998 3C5.09552 3 4.39329 3 3.88884 3.33706C3.67046 3.48298 3.48296 3.67048 3.33705 3.88886C2.99998 4.39331 2.99998 5.09554 2.99998 6.5C2.99998 7.90446 2.99998 8.60669 3.33705 9.11114C3.48296 9.32952 3.67046 9.51702 3.88884 9.66294Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.8888 9.66294C15.3933 10 16.0955 10 17.5 10C18.9044 10 19.6067 10 20.1111 9.66294C20.3295 9.51702 20.517 9.32952 20.6629 9.11114C21 8.60669 21 7.90446 21 6.5C21 5.09554 21 4.39331 20.6629 3.88886C20.517 3.67048 20.3295 3.48298 20.1111 3.33706C19.6067 3 18.9044 3 17.5 3C16.0955 3 15.3933 3 14.8888 3.33706C14.6705 3.48298 14.483 3.67048 14.337 3.88886C14 4.39331 14 5.09554 14 6.5C14 7.90446 14 8.60669 14.337 9.11114C14.483 9.32952 14.6705 9.51702 14.8888 9.66294Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3.88884 20.6629C4.39329 21 5.09552 21 6.49998 21C7.90445 21 8.60668 21 9.11113 20.6629C9.32951 20.517 9.51701 20.3295 9.66292 20.1111C9.99998 19.6067 9.99998 18.9045 9.99998 17.5C9.99998 16.0955 9.99998 15.3933 9.66292 14.8889C9.51701 14.6705 9.32951 14.483 9.11113 14.3371C8.60668 14 7.90445 14 6.49998 14C5.09552 14 4.39329 14 3.88884 14.3371C3.67046 14.483 3.48296 14.6705 3.33705 14.8889C2.99998 15.3933 2.99998 16.0955 2.99998 17.5C2.99998 18.9045 2.99998 19.6067 3.33705 20.1111C3.48296 20.3295 3.67046 20.517 3.88884 20.6629Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.8888 20.6629C15.3933 21 16.0955 21 17.5 21C18.9044 21 19.6067 21 20.1111 20.6629C20.3295 20.517 20.517 20.3295 20.6629 20.1111C21 19.6067 21 18.9045 21 17.5C21 16.0955 21 15.3933 20.6629 14.8889C20.517 14.6705 20.3295 14.483 20.1111 14.3371C19.6067 14 18.9044 14 17.5 14C16.0955 14 15.3933 14 14.8888 14.3371C14.6705 14.483 14.483 14.6705 14.337 14.8889C14 15.3933 14 16.0955 14 17.5C14 18.9045 14 19.6067 14.337 20.1111C14.483 20.3295 14.6705 20.517 14.8888 20.6629Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_16568 = [["path",{d:"M13.5 13L17 9M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6 12C6 8.68629 8.68629 6 12 6C13.0929 6 14.1175 6.29218 15 6.80269",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M2.50006 12.0001C2.50006 7.52172 2.50006 5.28255 3.8913 3.8913C5.28255 2.50006 7.52172 2.50006 12.0001 2.50006C16.4784 2.50006 18.7176 2.50006 20.1088 3.8913C21.5001 5.28255 21.5001 7.52172 21.5001 12.0001C21.5001 16.4784 21.5001 18.7176 20.1088 20.1088C18.7176 21.5001 16.4784 21.5001 12.0001 21.5001C7.52172 21.5001 5.28255 21.5001 3.8913 20.1088C2.50006 18.7176 2.50006 16.4784 2.50006 12.0001Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}]];
const Icon_2972 = [["path",{d:"M8 9V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 5V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18 13V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 3V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_95735 = [["path",{d:"M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 16H11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 16L18 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 9H22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_65174 = [["path",{d:"M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_3175 = [["path",{d:"M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 7V3M12 17V21M17 12H21M7 12H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.8965 3.47625C15.63 2.57541 16.7478 2 18 2C20.2091 2 22 3.79086 22 6C22 7.25222 21.4246 8.37005 20.5238 9.1035M20.5238 14.8965C21.4246 15.63 22 16.7478 22 18C22 20.2091 20.2091 22 18 22C16.7478 22 15.63 21.4246 14.8965 20.5238M9.1035 20.5238C8.37005 21.4246 7.25222 22 6 22C3.79086 22 2 20.2091 2 18C2 16.7478 2.57541 15.63 3.47625 14.8965M3.47625 9.1035C2.57541 8.37005 2 7.25222 2 6C2 3.79086 3.79086 2 6 2C7.25222 2 8.37005 2.57541 9.1035 3.47625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let k = (...e)=>e.filter(Boolean).join(" "),
  g = "text-neutral-900 dark:text-neutral-100",
  w = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "text-[14px]/[16px] font-[450]",
  j = "text-[12px]/[16px] font-normal tabular-nums",
  y = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  N = "size-8 rounded-[var(--rb-r-sm,6px)]",
  A = "transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none",
  S = "border-r border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900",
  z = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  E = [{label:"Favorites",items:[{label:"Q3 pipeline review",icon:Icon_79875},{label:"Renewals board",icon:Icon_13575}]},{label:"Workspace",items:[{label:"Overview",icon:Icon_19809,current:true},{label:"Pipelines",icon:Icon_79875,badge:"9"},{label:"Projects",icon:Icon_13575},{label:"Documents",icon:Icon_31964},{label:"Customers",icon:Icon_88366}]},{label:"Reporting",items:[{label:"Performance",icon:Icon_16568},{label:"Reports",icon:Icon_2972},{label:"Security",icon:Icon_20484}]},{label:"Account",items:[{label:"Members",icon:Icon_88366},{label:"Billing",icon:Icon_95735},{label:"Settings",icon:Icon_65174}]}];

function R({onClose:e}){
  let{ref:r,edges:t,onScroll:i}=function(){
    let e=useRef(null),[r,t]=useState({start:false,end:false}),a=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=r;
      t({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let r=e.current,t=r?.ownerDocument.defaultView;
      if(!r||!t?.ResizeObserver)return;
      let n=new t.ResizeObserver(a);
      return observe(r),()=>disconnect();
    }, [a]),{ref:e,edges:r,onScroll:a};
  }();
  return (
    <>
        <div className="flex h-14 shrink-0 items-center gap-2.5 pl-4 pr-2">
          <span className={k("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","size-8",_)}>C</span>
          <div className="min-w-0 flex-1">
            <p className={k(_,g,"truncate")}>Cascade</p>
            <p className={k(j,w,"truncate")}>Revenue</p>
          </div>
          {e&&<button type="button" aria-label="Close navigation" onClick={e} className={k(y,N)}>
            <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>}
        </div>
        <div className="relative min-h-0 flex-1">
          <nav ref={r} onScroll={i} aria-label="Primary" className="h-full overflow-y-auto px-2 pb-3">
            <div>
              {E.map(e=>(
                <div key={e.label}>
                            <p className="px-2 pt-4 pb-1 text-[12px]/[16px] font-normal tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{e.label}</p>
                            <ul className="space-y-0.5">
                              {e.items.map(e=>{
                                let r="current"in e&&e.current;
                                return (
                                  <li key={e.label}>
                                                    <a href="#nav" aria-current={r?"page":undefined} className={z}>
                                                      <HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                      <span className={k("block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]","flex-1")}>{e.label}</span>
                                                      {"badge"in e&&e.badge&&<span className="ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{e.badge}</span>}
                                                    </a>
                                                  </li>
                                );
                              })}
                            </ul>
                          </div>
              ))}
            </div>
          </nav>
          <div aria-hidden="true" className={k("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",t.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={k("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
        </div>
        <div className={k("border-t border-neutral-900/8 dark:border-neutral-100/8","shrink-0 p-2")}>
          <a href="#help" className={k(z,"mb-1")}>
            <HugeiconsIcon icon={Icon_3175} size={16} strokeWidth={1.8} aria-hidden="true" />
            Help & support
          </a>
          <div className="flex h-11 items-center gap-2.5 px-2">
            <span className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
              <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">DM</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className={k(_,g,"truncate")}>Dana Mireles</p>
              <p className={k(j,w,"truncate")}>Sales operations</p>
            </div>
          </div>
        </div>
      </>
  );
}

function C(){
  let[e,r]=useState(false),[t,i]=useState(false),s=useRef(false),o=useRef(null),c=useRef(null);
  useEffect(()=>{
    let e=requestAnimationFrame(()=>{
      (o.current?.ownerDocument.defaultView??window).matchMedia("(max-width: 1023px)").matches&&r(true)
    });
    return ()=>cancelAnimationFrame(e);
  }, []),useEffect(()=>{
    if(!e)return;
    let t=c.current,a=requestAnimationFrame(()=>i(true)),n=t?.ownerDocument??document,l=()=>Array.from(t?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    s.current&&(l()[0]?.focus({preventScroll:true}),s.current=false);
    let d=e=>{
      if("Escape"===e.key){
        r(false),i(false),o.current?.focus({preventScroll:true});
        return
      }
      if("Tab"!==e.key)return;
      let t=l(),a=t[0],s=t[t.length-1];
      a&&s&&(e.shiftKey&&activeElement===a?(e.preventDefault(),s.focus({preventScroll:true})):e.shiftKey||activeElement!==s||(e.preventDefault(),a.focus({preventScroll:true})))
    };
    return addEventListener("keydown", d),()=>{
      cancelAnimationFrame(a),removeEventListener("keydown", d)
    };
  }, [e]);
  let d=()=>{
    r(false),i(false),o.current?.focus({preventScroll:true})
  };
  return (
    <div className={k("bg-white dark:bg-neutral-950",g,"relative flex h-full min-h-[720px] w-full overflow-hidden")}>
        <aside className={k(S,"hidden w-64 shrink-0 flex-col lg:flex")}><R /></aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-14 shrink-0 items-center px-4 lg:hidden">
            <button ref={o} type="button" aria-label="Open navigation" aria-expanded={e} onClick={()=>{
              s.current=true,r(true)
            }} className={k(y,N)}>
              <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
        {e&&<div className="lg:hidden">
          <button type="button" aria-label="Close navigation overlay" onClick={d} tabIndex={-1} className={k("bg-neutral-900/25 dark:bg-neutral-950/60",A,"absolute inset-0 z-30 cursor-pointer",t?"opacity-100":"opacity-0")} />
          <aside ref={c} role="dialog" aria-modal="true" aria-label="Navigation" className={k(S,"shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",A,"absolute inset-y-0 left-0 z-40 flex w-72 max-w-[85%] flex-col",t?"opacity-100":"opacity-0")}><R onClose={d} /></aside>
        </div>}
      </div>
  );
}


export default C;
