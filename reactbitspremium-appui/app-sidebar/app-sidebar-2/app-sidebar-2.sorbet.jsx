/**
 * React Bits Pro — Application UI (app-sidebar-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_16568 = [["path",{d:"M13.5 13L17 9M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6 12C6 8.68629 8.68629 6 12 6C13.0929 6 14.1175 6.29218 15 6.80269",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M2.50006 12.0001C2.50006 7.52172 2.50006 5.28255 3.8913 3.8913C5.28255 2.50006 7.52172 2.50006 12.0001 2.50006C16.4784 2.50006 18.7176 2.50006 20.1088 3.8913C21.5001 5.28255 21.5001 7.52172 21.5001 12.0001C21.5001 16.4784 21.5001 18.7176 20.1088 20.1088C18.7176 21.5001 16.4784 21.5001 12.0001 21.5001C7.52172 21.5001 5.28255 21.5001 3.8913 20.1088C2.50006 18.7176 2.50006 16.4784 2.50006 12.0001Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}]];
const Icon_59844 = [["path",{d:"M2.5 5.5C2.5 3.85008 2.5 3.02513 3.01256 2.51256C3.52513 2 4.35008 2 6 2C7.64992 2 8.47487 2 8.98744 2.51256C9.5 3.02513 9.5 3.85008 9.5 5.5C9.5 7.14992 9.5 7.97487 8.98744 8.48744C8.47487 9 7.64992 9 6 9C4.35008 9 3.52513 9 3.01256 8.48744C2.5 7.97487 2.5 7.14992 2.5 5.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M3.65685 15.6569C4.76142 14.5523 5.31371 14 6 14C6.68629 14 7.23858 14.5523 8.34315 15.6569C9.44772 16.7614 10 17.3137 10 18C10 18.6863 9.44772 19.2386 8.34315 20.3431C7.23858 21.4477 6.68629 22 6 22C5.31371 22 4.76142 21.4477 3.65685 20.3431C2.55228 19.2386 2 18.6863 2 18C2 17.3137 2.55228 16.7614 3.65685 15.6569Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 9V14M10 18H15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 18C15 16.3501 15 15.5251 15.5126 15.0126C16.0251 14.5 16.8501 14.5 18.5 14.5C20.1499 14.5 20.9749 14.5 21.4874 15.0126C22 15.5251 22 16.3501 22 18C22 19.6499 22 20.4749 21.4874 20.9874C20.9749 21.5 20.1499 21.5 18.5 21.5C16.8501 21.5 16.0251 21.5 15.5126 20.9874C15 20.4749 15 19.6499 15 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];
const Icon_10303 = [["path",{d:"M6 12V8C6 7.05719 6 6.58579 6.29289 6.29289C6.58579 6 7.05719 6 8 6H12C12.9428 6 13.4142 6 13.7071 6.29289C14 6.58579 14 7.05719 14 8V12C14 12.9428 14 13.4142 13.7071 13.7071C13.4142 14 12.9428 14 12 14H8C7.05719 14 6.58579 14 6.29289 13.7071C6 13.4142 6 12.9428 6 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2 20V16C2 15.0572 2 14.5858 2.29289 14.2929C2.58579 14 3.05719 14 4 14H8C8.94281 14 9.41421 14 9.70711 14.2929C10 14.5858 10 15.0572 10 16V20C10 20.9428 10 21.4142 9.70711 21.7071C9.41421 22 8.94281 22 8 22H4C3.05719 22 2.58579 22 2.29289 21.7071C2 21.4142 2 20.9428 2 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M10 20V16C10 15.0572 10 14.5858 10.2929 14.2929C10.5858 14 11.0572 14 12 14H16C16.9428 14 17.4142 14 17.7071 14.2929C18 14.5858 18 15.0572 18 16V20C18 20.9428 18 21.4142 17.7071 21.7071C17.4142 22 16.9428 22 16 22H12C11.0572 22 10.5858 22 10.2929 21.7071C10 21.4142 10 20.9428 10 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 21.5L21.4142 18.0858C21.7032 17.7968 21.8478 17.6522 21.9239 17.4685C22 17.2847 22 17.0803 22 16.6716V12C22 11.0572 22 10.5858 21.7071 10.2929C21.4142 10 20.9428 10 20 10H18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M6 10L2.58579 13.4142C2.29676 13.7032 2.15224 13.8478 2.07612 14.0315C2 14.2153 2 14.4197 2 14.8284V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M14 13.5L17.317 10.5976C17.6532 10.3035 17.8213 10.1564 17.9106 9.95945C18 9.7625 18 9.53916 18 9.09246V4C18 3.05719 18 2.58579 17.7071 2.29289C17.4142 2 16.9428 2 16 2H11.2604C10.8845 2 10.6965 2 10.5248 2.06528C10.3531 2.13056 10.2126 2.25543 9.93167 2.50518L6.67127 5.40331C6.34077 5.69709 6.17552 5.84398 6.08776 6.03941C6 6.23484 6 6.45594 6 6.89813V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M14 6L17.5 2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M18 14L21.5 10.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_86829 = [["ellipse",{cx:"12",cy:"5",rx:"8",ry:"3",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_88002 = [["path",{d:"M4.85195 20.7716C5.40326 21 6.10218 21 7.5 21C8.89782 21 9.59674 21 10.1481 20.7716C10.8831 20.4672 11.4672 19.8831 11.7716 19.1481C12 18.5967 12 17.8978 12 16.5C12 15.1022 12 14.4033 11.7716 13.8519C11.4672 13.1169 10.8831 12.5328 10.1481 12.2284C9.59674 12 8.89782 12 7.5 12C6.10218 12 5.40326 12 4.85195 12.2284C4.11687 12.5328 3.53284 13.1169 3.22836 13.8519C3 14.4033 3 15.1022 3 16.5C3 17.8978 3 18.5967 3.22836 19.1481C3.53284 19.8831 4.11687 20.4672 4.85195 20.7716Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13.8519 20.7716C14.4033 21 15.1022 21 16.5 21C17.8978 21 18.5967 21 19.1481 20.7716C19.8831 20.4672 20.4672 19.8831 20.7716 19.1481C21 18.5967 21 17.8978 21 16.5C21 15.1022 21 14.4033 20.7716 13.8519C20.4672 13.1169 19.8831 12.5328 19.1481 12.2284C18.5967 12 17.8978 12 16.5 12C15.1022 12 14.4033 12 13.8519 12.2284C13.1169 12.5328 12.5328 13.1169 12.2284 13.8519C12 14.4033 12 15.1022 12 16.5C12 17.8978 12 18.5967 12.2284 19.1481C12.5328 19.8831 13.1169 20.4672 13.8519 20.7716Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.35195 11.7716C9.90326 12 10.6022 12 12 12C13.3978 12 14.0967 12 14.6481 11.7716C15.3831 11.4672 15.9672 10.8831 16.2716 10.1481C16.5 9.59674 16.5 8.89782 16.5 7.5C16.5 6.10218 16.5 5.40326 16.2716 4.85195C15.9672 4.11687 15.3831 3.53284 14.6481 3.22836C14.0967 3 13.3978 3 12 3C10.6022 3 9.90326 3 9.35195 3.22836C8.61687 3.53284 8.03284 4.11687 7.72836 4.85195C7.5 5.40326 7.5 6.10218 7.5 7.5C7.5 8.89782 7.5 9.59674 7.72836 10.1481C8.03284 10.8831 8.61687 11.4672 9.35195 11.7716Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_36122 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_57466 = [["path",{d:"M4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 14L9.79289 11.2071C10.1834 10.8166 10.8166 10.8166 11.2071 11.2071L12.7929 12.7929C13.1834 13.1834 13.8166 13.1834 14.2071 12.7929L17 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55599 = [["path",{d:"M6.21875 11.618L3.31189 11.2378C2.71644 11.1606 2.31883 10.5841 2.58348 10.0458C3.42523 8.33365 5.6195 6.35437 9.73988 6.68079M6.21875 11.618C7.27445 9.85426 8.57175 8.00435 9.73988 6.68079M6.21875 11.618L11.882 17.2812M9.73988 6.68079C13.4105 2.58986 17.1745 1.728 19.5937 2.06685C20.5508 2.2009 21.2991 2.94917 21.4332 3.90626C21.772 6.32551 20.9101 10.0895 16.8192 13.7601M11.882 17.2812L12.2622 20.1881C12.3394 20.7836 12.9159 21.1812 13.4542 20.9165C15.1664 20.0748 17.1456 17.8805 16.8192 13.7601M11.882 17.2812C13.6457 16.2255 15.4956 14.9282 16.8192 13.7601",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 8C17.5 6.89543 16.6046 6 15.5 6C14.3954 6 13.5 6.89543 13.5 8C13.5 9.10457 14.3954 10 15.5 10C16.6046 10 17.5 9.10457 17.5 8Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 22L8 18M4 17L5.5 15.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_36048 = [["path",{d:"M19 4H5C4.06812 4 3.60218 4 3.23463 4.15224C2.74458 4.35523 2.35523 4.74458 2.15224 5.23463C2 5.60218 2 6.06812 2 7C2 7.93188 2 8.39782 2.15224 8.76537C2.35523 9.25542 2.74458 9.64477 3.23463 9.84776C3.60218 10 4.06812 10 5 10H19C19.9319 10 20.3978 10 20.7654 9.84776C21.2554 9.64477 21.6448 9.25542 21.8478 8.76537C22 8.39782 22 7.93188 22 7C22 6.06812 22 5.60218 21.8478 5.23463C21.6448 4.74458 21.2554 4.35523 20.7654 4.15224C20.3978 4 19.9319 4 19 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 14H5C4.06812 14 3.60218 14 3.23463 14.1522C2.74458 14.3552 2.35523 14.7446 2.15224 15.2346C2 15.6022 2 16.0681 2 17C2 17.9319 2 18.3978 2.15224 18.7654C2.35523 19.2554 2.74458 19.6448 3.23463 19.8478C3.60218 20 4.06812 20 5 20H19C19.9319 20 20.3978 20 20.7654 19.8478C21.2554 19.6448 21.6448 19.2554 21.8478 18.7654C22 18.3978 22 17.9319 22 17C22 16.0681 22 15.6022 21.8478 15.2346C21.6448 14.7446 21.2554 14.3552 20.7654 14.1522C20.3978 14 19.9319 14 19 14Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.125 7H6M6.25 7C6.25 7.13807 6.13807 7.25 6 7.25C5.86193 7.25 5.75 7.13807 5.75 7C5.75 6.86193 5.86193 6.75 6 6.75C6.13807 6.75 6.25 6.86193 6.25 7Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10.125 7H10M10.25 7C10.25 7.13807 10.1381 7.25 10 7.25C9.86193 7.25 9.75 7.13807 9.75 7C9.75 6.86193 9.86193 6.75 10 6.75C10.1381 6.75 10.25 6.86193 10.25 7Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M6.125 17H6M6.25 17C6.25 17.1381 6.13807 17.25 6 17.25C5.86193 17.25 5.75 17.1381 5.75 17C5.75 16.8619 5.86193 16.75 6 16.75C6.13807 16.75 6.25 16.8619 6.25 17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10.125 17H10M10.25 17C10.25 17.1381 10.1381 17.25 10 17.25C9.86193 17.25 9.75 17.1381 9.75 17C9.75 16.8619 9.86193 16.75 10 16.75C10.1381 16.75 10.25 16.8619 10.25 17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_79698 = [["path",{d:"M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 6.5L16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_3175 = [["path",{d:"M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 7V3M12 17V21M17 12H21M7 12H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.8965 3.47625C15.63 2.57541 16.7478 2 18 2C20.2091 2 22 3.79086 22 6C22 7.25222 21.4246 8.37005 20.5238 9.1035M20.5238 14.8965C21.4246 15.63 22 16.7478 22 18C22 20.2091 20.2091 22 18 22C16.7478 22 15.63 21.4246 14.8965 20.5238M9.1035 20.5238C8.37005 21.4246 7.25222 22 6 22C3.79086 22 2 20.2091 2 18C2 16.7478 2.57541 15.63 3.47625 14.8965M3.47625 9.1035C2.57541 8.37005 2 7.25222 2 6C2 3.79086 3.79086 2 6 2C7.25222 2 8.37005 2.57541 9.1035 3.47625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];

let V = (...e)=>e.filter(Boolean).join(" ");

let K = "text-neutral-900 dark:text-neutral-100";

let $ = "text-[15px]/[20px] font-bold";

let U = "min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]";

let Q = "relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40";

let G = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let Y = [[{label:"Overview",icon:Icon_16568,children:["Today","This week"]},{label:"Automation",icon:Icon_59844,current:true,children:["Agent runs","Playbooks","Schedules"]},{label:"Services",icon:Icon_10303,children:["Inventory","Vendors","Contracts"]},{label:"Data",icon:Icon_86829,children:["Warehouses","Exports","Retention"]},{label:"Integrations",icon:Icon_88002,children:["Connected apps","Webhooks","API keys"]}],[{label:"Governance",icon:Icon_36122,children:["Access review","Audit log","Policies"]},{label:"Monitoring",icon:Icon_57466,children:["Incidents","Alerts","Uptime"]},{label:"Releases",icon:Icon_55599,children:["Rollouts","Changelog","Flags"]},{label:"Environments",icon:Icon_36048,children:["Production","Staging","Sandbox"]},{label:"Credentials",icon:Icon_79698,children:["Tokens","Certificates","Secrets"]}]];

function J({label:e,items:r,align:a,menuRef:n}){
  return (
    <div ref={n} className={V("absolute left-full z-30 pl-2","top"===a?"top-0":"bottom-0")}>
        <div role="menu" aria-label={e} className={V(U,"min-w-[176px]")}>
          <p className="px-3 pt-2.5 pb-1 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e}</p>
          {r.map(e=><button key={e} type="button" role="menuitem" className={Q}><span className="truncate">{e}</span></button>)}
        </div>
      </div>
  );
}


export default function app_sidebar_2__Sorbet__Component(){
  let[e,r]=useState(null),[a,i]=useState(false),o=useRef(null),s=useRef(null),c=useRef({}),d=useCallback(a=>{
    r(null),i(false),a&&e&&c.current[e]?.focus({preventScroll:true})
  }, [e]),u=(e,t)=>{
    "mouse"!==t.pointerType||a||r(e)
  },b=(e,t)=>{
    "mouse"!==t.pointerType||a||r(r=>r===e?null:r)
  },_=t=>{
    if(e===t&&a){
      r(null),i(false);
      return
    }
    r(t),i(true)
  };
  return useEffect(()=>{
    if(!e)return;
    let r=o.current?.ownerDocument??document,a=e=>{
      o.current?.contains(e.target)||d(false)
    },t=e=>{
      if("Escape"===e.key){
        e.preventDefault(),d(true);
        return
      }
      let a=Array.from(s.current?.querySelectorAll('[role="menuitem"]')??[]);
      if(0===a.length)return;
      let t=a.indexOf(r.activeElement);
      "ArrowDown"===e.key?(e.preventDefault(),a[t<0||t===a.length-1?0:t+1]?.focus({preventScroll:true})):"ArrowUp"===e.key?(e.preventDefault(),a[t<=0?a.length-1:t-1]?.focus({preventScroll:true})):"Home"===e.key?(e.preventDefault(),a[0]?.focus({preventScroll:true})):"End"===e.key&&(e.preventDefault(),a[a.length-1]?.focus({preventScroll:true}))
    };
    return r.addEventListener("pointerdown",a),r.addEventListener("keydown",t),()=>{
      r.removeEventListener("pointerdown",a),r.removeEventListener("keydown",t)
    };
  }, [e,d]),<div className={V("bg-white dark:bg-neutral-950",K,"relative flex h-full min-h-[640px] w-full overflow-hidden")}>
    <aside ref={o} className={V("border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex w-14 shrink-0 flex-col items-center py-3")}>
      <span className={V("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] select-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black)]","size-8",$)}>A</span>
      <nav aria-label="Primary" className="mt-4 flex flex-1 flex-col items-center gap-4">
        {Y.map((r,a)=>(
          <ul key={a} className="flex flex-col items-center gap-1" role="list">
                    {r.map(r=>{
                      let a=e===r.label;
                      return (
                        <li key={r.label} className="relative" onPointerEnter={e=>u(r.label,e)} onPointerLeave={e=>b(r.label,e)}>
                                      <button ref={e=>{
                                        c.current[r.label]=e
                                      }} type="button" aria-label={r.label} aria-current={r.current?"page":undefined} aria-haspopup="menu" aria-expanded={a} onClick={()=>_(r.label)} className={V(G,"justify-center")}><HugeiconsIcon icon={r.icon} size={18} strokeWidth={2} aria-hidden="true" /></button>
                                      {a&&<J menuRef={s} label={r.label} items={r.children} align="top" />}
                                    </li>
                      );
                    })}
                  </ul>
        ))}
      </nav>
      <div className="mt-4 flex flex-col items-center gap-1">
        {[{label:"Support",icon:Icon_3175,children:["Help center","Contact support","Status page"]}].map(r=>{
          let a=e===r.label;
          return (
            <div key={r.label} className="relative" onPointerEnter={e=>u(r.label,e)} onPointerLeave={e=>b(r.label,e)}>
                        <button ref={e=>{
                          c.current[r.label]=e
                        }} type="button" aria-label={r.label} aria-haspopup="menu" aria-expanded={a} onClick={()=>_(r.label)} className={V(G,"justify-center")}><HugeiconsIcon icon={r.icon} size={18} strokeWidth={2} aria-hidden="true" /></button>
                        {a&&<J menuRef={s} label={r.label} items={[...r.children]} align="bottom" />}
                      </div>
          );
        })}
        <div className="relative" onPointerEnter={e=>u("Account",e)} onPointerLeave={e=>b("Account",e)}>
          <button ref={e=>{
            c.current.Account=e
          }} type="button" aria-label="Your account" aria-haspopup="menu" aria-expanded={"Account"===e} onClick={()=>_("Account")} className={V("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","cursor-pointer")}>
            <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">TS</span>
          </button>
          {"Account"===e&&<div ref={s} className="absolute bottom-0 left-full z-30 pl-2">
            <div role="menu" aria-label="Account" className={V(U,"w-[224px]")}>
              <div className="px-2 py-1.5">
                <p className={V($,K,"truncate")}>Theo Salcedo</p>
                <p className={V("text-[13px]/[16px] font-semibold tabular-nums","text-neutral-900/62 dark:text-neutral-100/62","truncate")}>theo@northwind.co</p>
              </div>
              {["Account settings","Preferences","Sign out"].map(e=><button key={e} type="button" role="menuitem" className={Q}><span className="truncate">{e}</span></button>)}
            </div>
          </div>}
        </div>
      </div>
    </aside>
  </div>;
}
