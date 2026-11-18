/**
 * React Bits Pro — Application UI (navbar-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_90089 = [["path",{d:"M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_92881 = [["path",{d:"M3 19C3 18.535 3 18.3025 3.05111 18.1118C3.18981 17.5941 3.59413 17.1898 4.11177 17.0511C4.30252 17 4.53501 17 5 17H8C8.46499 17 8.69748 17 8.88823 17.0511C9.40587 17.1898 9.81019 17.5941 9.94889 18.1118C10 18.3025 10 18.535 10 19C10 19.465 10 19.6975 9.94889 19.8882C9.81019 20.4059 9.40587 20.8102 8.88823 20.9489C8.69748 21 8.46499 21 8 21H5C4.53501 21 4.30252 21 4.11177 20.9489C3.59413 20.8102 3.18981 20.4059 3.05111 19.8882C3 19.6975 3 19.465 3 19Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 5C14 4.53501 14 4.30252 14.0511 4.11177C14.1898 3.59413 14.5941 3.18981 15.1118 3.05111C15.3025 3 15.535 3 16 3H19C19.465 3 19.6975 3 19.8882 3.05111C20.4059 3.18981 20.8102 3.59413 20.9489 4.11177C21 4.30252 21 4.53501 21 5C21 5.46499 21 5.69748 20.9489 5.88823C20.8102 6.40587 20.4059 6.81019 19.8882 6.94889C19.6975 7 19.465 7 19 7H16C15.535 7 15.3025 7 15.1118 6.94889C14.5941 6.81019 14.1898 6.40587 14.0511 5.88823C14 5.69748 14 5.46499 14 5Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M9 12H8.5C6.567 12 5 10.433 5 8.5C5 6.567 6.56687 5 8.49987 5H14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10 19H15.5C17.433 19 19 17.433 19 15.5C19 13.567 17.4336 12 15.5006 12H15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10.6325 10.467C11.277 9.82235 11.5993 9.50001 11.9998 9.5C12.4003 9.49999 12.7226 9.82229 13.3672 10.4669L13.5332 10.6329C14.1777 11.2774 14.5 11.5997 14.5 12.0002C14.5 12.4007 14.1777 12.723 13.5331 13.3675L13.3673 13.5333C12.7227 14.1778 12.4005 14.5 12 14.5C11.5996 14.5 11.2773 14.1778 10.6328 13.5333L10.4669 13.3674C9.82231 12.7229 9.50003 12.4007 9.5 12.0002C9.49997 11.5997 9.82221 11.2774 10.4667 10.6329L10.6325 10.467Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_10303 = [["path",{d:"M6 12V8C6 7.05719 6 6.58579 6.29289 6.29289C6.58579 6 7.05719 6 8 6H12C12.9428 6 13.4142 6 13.7071 6.29289C14 6.58579 14 7.05719 14 8V12C14 12.9428 14 13.4142 13.7071 13.7071C13.4142 14 12.9428 14 12 14H8C7.05719 14 6.58579 14 6.29289 13.7071C6 13.4142 6 12.9428 6 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2 20V16C2 15.0572 2 14.5858 2.29289 14.2929C2.58579 14 3.05719 14 4 14H8C8.94281 14 9.41421 14 9.70711 14.2929C10 14.5858 10 15.0572 10 16V20C10 20.9428 10 21.4142 9.70711 21.7071C9.41421 22 8.94281 22 8 22H4C3.05719 22 2.58579 22 2.29289 21.7071C2 21.4142 2 20.9428 2 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M10 20V16C10 15.0572 10 14.5858 10.2929 14.2929C10.5858 14 11.0572 14 12 14H16C16.9428 14 17.4142 14 17.7071 14.2929C18 14.5858 18 15.0572 18 16V20C18 20.9428 18 21.4142 17.7071 21.7071C17.4142 22 16.9428 22 16 22H12C11.0572 22 10.5858 22 10.2929 21.7071C10 21.4142 10 20.9428 10 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 21.5L21.4142 18.0858C21.7032 17.7968 21.8478 17.6522 21.9239 17.4685C22 17.2847 22 17.0803 22 16.6716V12C22 11.0572 22 10.5858 21.7071 10.2929C21.4142 10 20.9428 10 20 10H18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M6 10L2.58579 13.4142C2.29676 13.7032 2.15224 13.8478 2.07612 14.0315C2 14.2153 2 14.4197 2 14.8284V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M14 13.5L17.317 10.5976C17.6532 10.3035 17.8213 10.1564 17.9106 9.95945C18 9.7625 18 9.53916 18 9.09246V4C18 3.05719 18 2.58579 17.7071 2.29289C17.4142 2 16.9428 2 16 2H11.2604C10.8845 2 10.6965 2 10.5248 2.06528C10.3531 2.13056 10.2126 2.25543 9.93167 2.50518L6.67127 5.40331C6.34077 5.69709 6.17552 5.84398 6.08776 6.03941C6 6.23484 6 6.45594 6 6.89813V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M14 6L17.5 2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M18 14L21.5 10.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_77368 = [["path",{d:"M10.5 8H18.5M10.5 12H13M18.5 12H16M10.5 16H13M18.5 16H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 7.5H6C4.11438 7.5 3.17157 7.5 2.58579 8.08579C2 8.67157 2 9.61438 2 11.5V18C2 19.3807 3.11929 20.5 4.5 20.5C5.88071 20.5 7 19.3807 7 18V7.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 3.5H11C10.07 3.5 9.60504 3.5 9.22354 3.60222C8.18827 3.87962 7.37962 4.68827 7.10222 5.72354C7 6.10504 7 6.57003 7 7.5V18C7 19.3807 5.88071 20.5 4.5 20.5H16C18.8284 20.5 20.2426 20.5 21.1213 19.6213C22 18.7426 22 17.3284 22 14.5V9.5C22 6.67157 22 5.25736 21.1213 4.37868C20.2426 3.5 18.8284 3.5 16 3.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_96022 = [["path",{d:"M7.99978 3.5H6.60021C4.43183 3.5 3.34764 3.5 2.67399 4.17362C2.00034 4.84724 2.00029 5.93144 2.00021 8.09982L2 13.3998C1.99992 15.5684 1.99987 16.6526 2.67353 17.3263C3.34719 18 4.43146 18 6.6 18H8.95042C10.4329 18 11.7092 19.0464 11.9999 20.5V5.5C11.0556 4.24097 9.99989 3.5 7.99978 3.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.0001 3.5H17.3997C19.5681 3.5 20.6523 3.5 21.3259 4.17362C21.9996 4.84724 21.9996 5.93144 21.9997 8.09982L21.9999 13.3998C22 15.5684 22 16.6526 21.3264 17.3263C20.6527 18 19.5684 18 17.3999 18H15.0495C13.567 18 12.2907 19.0464 12 20.5V5.5C12.9443 4.24097 14 3.5 16.0001 3.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_38897 = [["path",{d:"M17 10.8045C17 10.4588 17 10.286 17.052 10.132C17.2032 9.68444 17.6018 9.51076 18.0011 9.32888C18.45 9.12442 18.6744 9.02219 18.8968 9.0042C19.1493 8.98378 19.4022 9.03818 19.618 9.15929C19.9041 9.31984 20.1036 9.62493 20.3079 9.87302C21.2513 11.0188 21.7229 11.5918 21.8955 12.2236C22.0348 12.7334 22.0348 13.2666 21.8955 13.7764C21.6438 14.6979 20.8485 15.4704 20.2598 16.1854C19.9587 16.5511 19.8081 16.734 19.618 16.8407C19.4022 16.9618 19.1493 17.0162 18.8968 16.9958C18.6744 16.9778 18.45 16.8756 18.0011 16.6711C17.6018 16.4892 17.2032 16.3156 17.052 15.868C17 15.714 17 15.5412 17 15.1955V10.8045Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 10.8046C7 10.3694 6.98778 9.97821 6.63591 9.6722C6.50793 9.5609 6.33825 9.48361 5.99891 9.32905C5.55001 9.12458 5.32556 9.02235 5.10316 9.00436C4.43591 8.9504 4.07692 9.40581 3.69213 9.87318C2.74875 11.019 2.27706 11.5919 2.10446 12.2237C1.96518 12.7336 1.96518 13.2668 2.10446 13.7766C2.3562 14.6981 3.15152 15.4705 3.74021 16.1856C4.11129 16.6363 4.46577 17.0475 5.10316 16.996C5.32556 16.978 5.55001 16.8757 5.99891 16.6713C6.33825 16.5167 6.50793 16.4394 6.63591 16.3281C6.98778 16.0221 7 15.631 7 15.1957V10.8046Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 9C5 5.68629 8.13401 3 12 3C15.866 3 19 5.68629 19 9",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M19 17V17.8C19 19.5673 17.2091 21 15 21H13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let f = (...e)=>e.filter(Boolean).join(" "),
  g = [.2,0,0,1],
  w = "border-t border-neutral-900/8 dark:border-neutral-100/8",
  j = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  y = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40",
  N = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  z = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  A = {Product:[{icon:Icon_90089,label:"Platform",hint:"The workspace your team runs on"},{icon:Icon_92881,label:"Automations",hint:"Rules that move work forward"},{icon:Icon_10303,label:"Integrations",hint:"Connect the tools you already use"},{icon:Icon_20484,label:"Security",hint:"Controls, audit logs and SSO"}],Company:[{icon:Icon_88366,label:"About",hint:"Who we are and what we build"},{icon:Icon_77368,label:"Blog",hint:"Product notes and engineering posts"},{icon:Icon_96022,label:"Careers",hint:"Nine open roles across four teams"},{icon:Icon_38897,label:"Support",hint:"Reach a human within one hour"}]},
  S = ["Pricing","Changelog"];

function C(){
  let e=useReducedMotion(),[t,r]=useState(null),[c,u]=useState(false),[x,b]=useState("Product"),h=useRef(null);
  useEffect(()=>{
    if(!t&&!c)return;
    let e=h.current?.ownerDocument;
    if(!e)return;
    let a=e=>{
      let t=e.target;
      t?.closest?.("[data-menu-root]")||r(null)
    },n=e=>{
      "Escape"===e.key&&(r(null),u(false))
    };
    return e.addEventListener("pointerdown",a),e.addEventListener("keydown",n),()=>{
      e.removeEventListener("pointerdown",a),e.removeEventListener("keydown",n)
    };
  }, [t,c]);
  let p=()=>{
    u(false)
  };
  return (
    <div ref={h} className={f("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[560px] w-full flex-col overflow-hidden")}>
        <header className={f("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","relative z-20 flex h-16 shrink-0 items-center gap-2 px-4 sm:px-6")}>
          <a href="#" className={f("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","inline-flex shrink-0 items-center gap-2")}>
            <span aria-hidden="true" className={f("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","size-8")}><HugeiconsIcon icon={Icon_90089} size={16} strokeWidth={1.8} /></span>
            <span className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Halcyon</span>
          </a>
          <span aria-hidden="true" className={f("border-r border-neutral-900/8 dark:border-neutral-100/8","mx-2 hidden h-5 w-px md:block")} />
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-0.5">
              {Object.keys(A).map(n=>(
                <li key={n} className="relative" data-menu-root>
                            <button type="button" aria-haspopup="true" aria-expanded={t===n} onClick={()=>{
                              r(e=>e===n?null:n)
                            }} className={f(y,N)}>
                              {n}
                              <HugeiconsIcon icon={Icon_20148} size={14} strokeWidth={1.8} aria-hidden="true" className={f(t===n&&"rotate-180")} />
                            </button>
                            <AnimatePresence>
                              {t===n&&<motion.div {...{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.12,ease:g}},transition:{duration:.16*!e,ease:g}}} className={f("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute top-full left-0 z-30 mt-1.5 w-[320px] origin-top-left")}>
                                {A[n].map(e=>(
                                  <a key={e.label} href="#" onClick={()=>r(null)} className="relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40">
                                                    <span className="flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80"><HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" /></span>
                                                    <span className="min-w-0">
                                                      <span className="block">{e.label}</span>
                                                      <span className={f("line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>{e.hint}</span>
                                                    </span>
                                                  </a>
                                ))}
                              </motion.div>}
                            </AnimatePresence>
                          </li>
              ))}
              {S.map(e=><li key={e}><a href="#" className={f(y,N)}>{e}</a></li>)}
            </ul>
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <a href="#" className={f(j,N,"max-sm:hidden")}>Sign in</a>
            <a href="#" className={f("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",N)}>Get started</a>
            <button type="button" aria-label={c?"Close menu":"Open menu"} aria-expanded={c} onClick={()=>c?p():u(true)} className={f("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]","md:hidden")}>
              <HugeiconsIcon icon={c?Icon_89289:Icon_1836} size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-[560px] text-center">
            <p className={f("text-[12px]/[16px] font-normal tabular-nums","text-neutral-900/66 dark:text-neutral-100/66")}>Ship with confidence</p>
            <h1 className={f("text-[32px]/[36px] font-[450] tracking-[-0.015em]","mt-2")}>One workspace for the whole release</h1>
            <p className={f("text-[14px]/[20px] font-normal","text-neutral-900/80 dark:text-neutral-100/80","mx-auto mt-3 max-w-[420px]")}>
              Plan the work, run the automations and watch it land, without stitching six tools together.
            </p>
          </div>
          <div className={f("rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8","mx-auto mt-8 h-[120px] max-w-[720px]")} />
        </div>
        <AnimatePresence>
          {c&&<>
            <motion.button type="button" aria-label="Close menu" onClick={p} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:g}}} transition={{duration:.18*!e,ease:g}} className={f("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-30 cursor-default md:hidden")} />
            <motion.nav aria-label="Mobile" initial={{opacity:0,y:e?0:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:e?0:-8,transition:{duration:.12,ease:g}}} transition={{duration:.18*!e,ease:g}} className={f("bg-white dark:bg-neutral-900",w,"absolute inset-x-0 top-16 bottom-0 z-40 overflow-y-auto p-3 md:hidden")}>
              {Object.keys(A).map(e=>{
                let t=x===e;
                return (
                  <div key={e} className="mb-1">
                                <button type="button" aria-expanded={t} onClick={()=>b(t?null:e)} className={f(z,"justify-between")}>
                                  {e}
                                  <HugeiconsIcon icon={Icon_20148} size={16} strokeWidth={1.8} aria-hidden="true" className={f(t&&"rotate-180")} />
                                </button>
                                {t&&<ul className="mt-0.5 ml-3 space-y-0.5 overflow-hidden pl-3">
                                  {A[e].map(e=><li key={e.label}><a href="#" onClick={p} className={z}>{e.label}</a></li>)}
                                </ul>}
                              </div>
                );
              })}
              {S.map(e=><a key={e} href="#" onClick={p} className={z}>{e}</a>)}
              <div className={f(w,"mt-3 pt-3")}>
                <a href="#" onClick={p} className={f(j,"h-11 gap-2 rounded-[var(--rb-r-sm,6px)] px-5 text-[16px]/[20px] font-[450] tracking-[-0.01em]","w-full")}>Sign in</a>
              </div>
            </motion.nav>
          </>}
        </AnimatePresence>
      </div>
  );
}


export default C;
