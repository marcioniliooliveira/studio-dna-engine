/**
 * React Bits Pro — Application UI (app-shell-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_68240 = [["path",{d:"M8.00002 4L8 4.99997C7.99998 5.94279 7.99998 6.4142 8.29287 6.7071C8.58577 7 9.05718 7 10 7L14 7C14.9428 7 15.4142 7 15.7071 6.70711C16 6.41421 16 5.94281 16 5V4",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.45 4L13.7149 4.1492C13.7853 4.49569 14.088 4.746 14.4416 4.74995L14.45 4ZM9.54997 4L9.55835 4.74995C9.91188 4.746 10.2146 4.49569 10.285 4.1492L9.54997 4ZM19.1213 4.87868L19.6517 4.34835L19.6517 4.34835L19.1213 4.87868ZM19.1213 21.1213L19.6517 21.6517V21.6517L19.1213 21.1213ZM16 4.01732L16.0226 3.26766C16.0179 3.26752 16.0131 3.26742 16.0084 3.26737L16 4.01732ZM4.87868 4.87868L5.40901 5.40901V5.40901L4.87868 4.87868ZM8 4.01732L7.99162 3.26737C7.98688 3.26742 7.98215 3.26752 7.97741 3.26766L8 4.01732ZM14.45 4L15.185 3.8508C14.8838 2.36703 13.5732 1.25 12 1.25V2V2.75C12.8457 2.75 13.5529 3.35073 13.7149 4.1492L14.45 4ZM12 2V1.25C10.4268 1.25 9.11615 2.36703 8.81496 3.8508L9.54997 4L10.285 4.1492C10.4471 3.35073 11.1542 2.75 12 2.75V2ZM20 10H20.75C20.75 8.60699 20.7516 7.48678 20.6335 6.60825C20.5125 5.70814 20.2536 4.95027 19.6517 4.34835L19.1213 4.87868L18.591 5.40901C18.8678 5.68577 19.0482 6.07435 19.1469 6.80812C19.2484 7.56347 19.25 8.56458 19.25 10H20ZM20 16H20.75V10H20H19.25V16H20ZM20 16H19.25C19.25 17.4354 19.2484 18.4365 19.1469 19.1919C19.0482 19.9257 18.8678 20.3142 18.591 20.591L19.1213 21.1213L19.6517 21.6517C20.2536 21.0497 20.5125 20.2919 20.6335 19.3918C20.7516 18.5132 20.75 17.393 20.75 16H20ZM14 22V22.75C15.393 22.75 16.5132 22.7516 17.3918 22.6335C18.2919 22.5125 19.0497 22.2536 19.6517 21.6517L19.1213 21.1213L18.591 20.591C18.3142 20.8678 17.9257 21.0482 17.1919 21.1469C16.4365 21.2484 15.4354 21.25 14 21.25V22ZM16 4.01732L15.9774 4.76698C17.5421 4.81413 18.1804 4.99842 18.591 5.40901L19.1213 4.87868L19.6517 4.34835C18.7796 3.47633 17.5648 3.31413 16.0226 3.26766L16 4.01732ZM10 22V22.75H14V22V21.25H10V22ZM10 22V21.25C8.56458 21.25 7.56347 21.2484 6.80812 21.1469C6.07434 21.0482 5.68577 20.8678 5.40901 20.591L4.87868 21.1213L4.34835 21.6517C4.95027 22.2536 5.70814 22.5125 6.60825 22.6335C7.48678 22.7516 8.60699 22.75 10 22.75V22ZM4 16H3.25C3.25 17.393 3.24841 18.5132 3.36652 19.3918C3.48754 20.2919 3.74643 21.0497 4.34835 21.6517L4.87868 21.1213L5.40901 20.591C5.13225 20.3142 4.9518 19.9257 4.85315 19.1919C4.75159 18.4365 4.75 17.4354 4.75 16H4ZM4 10H4.75C4.75 8.56458 4.75159 7.56347 4.85315 6.80812C4.9518 6.07435 5.13225 5.68577 5.40901 5.40901L4.87868 4.87868L4.34835 4.34835C3.74643 4.95027 3.48754 5.70814 3.36652 6.60825C3.24841 7.48678 3.25 8.60699 3.25 10H4ZM8 4.01732L7.97741 3.26766C6.43521 3.31413 5.22037 3.47633 4.34835 4.34835L4.87868 4.87868L5.40901 5.40901C5.8196 4.99842 6.4579 4.81413 8.02259 4.76698L8 4.01732ZM4 10H3.25V16H4H4.75V10H4ZM8 4.01732L8.00838 4.76728L9.55835 4.74995L9.54997 4L9.54159 3.25005L7.99162 3.26737L8 4.01732ZM16 4.01732L16.0084 3.26737L14.4583 3.25005L14.45 4L14.4416 4.74995L15.9916 4.76728L16 4.01732Z",fill:"currentColor",key:"1"}],["path",{d:"M12 12H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M12 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M8 12H8.01",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M8 17H8.01",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_84831 = [["path",{d:"M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_15805 = [["path",{d:"M3 16L7.46967 11.5303C7.80923 11.1908 8.26978 11 8.75 11C9.23022 11 9.69077 11.1908 10.0303 11.5303L14 15.5M15.5 17L14 15.5M21 16L18.5303 13.5303C18.1908 13.1908 17.7302 13 17.25 13C16.7698 13 16.3092 13.1908 15.9697 13.5303L14 15.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5 8C15.7761 8 16 7.77614 16 7.5C16 7.22386 15.7761 7 15.5 7M15.5 8C15.2239 8 15 7.77614 15 7.5C15 7.22386 15.2239 7 15.5 7M15.5 8V7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3.69797 19.7472C2.5 18.3446 2.5 16.2297 2.5 12C2.5 7.77027 2.5 5.6554 3.69797 4.25276C3.86808 4.05358 4.05358 3.86808 4.25276 3.69797C5.6554 2.5 7.77027 2.5 12 2.5C16.2297 2.5 18.3446 2.5 19.7472 3.69797C19.9464 3.86808 20.1319 4.05358 20.302 4.25276C21.5 5.6554 21.5 7.77027 21.5 12C21.5 16.2297 21.5 18.3446 20.302 19.7472C20.1319 19.9464 19.9464 20.1319 19.7472 20.302C18.3446 21.5 16.2297 21.5 12 21.5C7.77027 21.5 5.6554 21.5 4.25276 20.302C4.05358 20.1319 3.86808 19.9464 3.69797 19.7472Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_17601 = [["path",{d:"M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 9L11 9M8 13L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 22L22 22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_34133 = [["path",{d:"M2.00127 8.5L1.99911 13.997C1.99782 17.2979 1.99717 18.9484 3.02235 19.974C4.04754 20.9996 5.69801 20.9996 8.99895 20.9997L15 20.9998C18.2994 20.9999 19.949 21 20.9741 19.9751C21.9992 18.9502 21.9996 17.3005 22.0002 14.0012L22.0013 8.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.49857 6.5C8.49857 5.09554 8.49857 4.39331 8.83563 3.88886C8.98154 3.67048 9.16904 3.48298 9.38743 3.33706C9.89187 3 10.5941 3 11.9986 3C13.403 3 14.1053 3 14.6097 3.33706C14.8281 3.48298 15.0156 3.67048 15.1615 3.88886C15.4986 4.39331 15.4986 5.09554 15.4986 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M19.998 6.50016L3.99885 6.5C2.8944 6.50007 1.99876 7.39568 1.99866 8.50013C1.99876 10.7091 3.79005 12.5004 5.99901 12.5006H17.9978C20.2068 12.5005 21.998 10.7093 21.9981 8.5003C21.998 7.39582 21.1024 6.50023 19.998 6.50016Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99857 12.5V13.5C9.99857 13.965 9.99857 14.1975 10.0497 14.3882C10.1884 14.9059 10.5927 15.3102 11.1103 15.4489C11.3011 15.5 11.5336 15.5 11.9986 15.5C12.4636 15.5 12.696 15.5 12.8868 15.4489C13.4044 15.3102 13.8088 14.9059 13.9475 14.3882C13.9986 14.1975 13.9986 13.965 13.9986 13.5V12.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_40170 = [["path",{d:"M7 9.5C7 10.8807 5.88071 12 4.5 12C3.11929 12 2 10.8807 2 9.5C2 8.11929 3.11929 7 4.5 7C5.88071 7 7 8.11929 7 9.5ZM7 9.5V2C7.33333 2.5 7.6 4.6 10 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10.5",cy:"19.5",r:"2.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["circle",{cx:"20",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M13 19.5L13 11C13 10.09 13 9.63502 13.2466 9.35248C13.4932 9.06993 13.9938 9.00163 14.9949 8.86504C18.0085 8.45385 20.2013 7.19797 21.3696 6.42937C21.6498 6.24509 21.7898 6.15295 21.8949 6.20961C22 6.26627 22 6.43179 22 6.76283V17.9259",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M13 13C17.8 13 21 10.6667 22 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_45346 = [["path",{d:"M12 15V19",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 5H5.58088C5.03886 5 4.76785 5 4.55944 5.10228C4.36064 5.19984 4.19984 5.36064 4.10228 5.55944C4 5.76785 4 6.03886 4 6.58088C4 7.6579 4 8.19641 4.16249 8.66982C4.31812 9.12325 4.58015 9.53278 4.92663 9.8641C5.28837 10.21 5.77732 10.4357 6.7552 10.887L7 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M17 5H18.4191C18.9611 5 19.2322 5 19.4406 5.10228C19.6394 5.19984 19.8002 5.36064 19.8977 5.55944C20 5.76785 20 6.03886 20 6.58088C20 7.6579 20 8.19641 19.8375 8.66982C19.6819 9.12325 19.4198 9.53278 19.0734 9.8641C18.7116 10.21 18.2227 10.4357 17.2448 10.887L17 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 4.88889C7 4.06119 7 3.64735 7.12061 3.31596C7.32281 2.76043 7.76043 2.32281 8.31596 2.12061C8.64735 2 9.06119 2 9.88889 2H14.1111C14.9388 2 15.3527 2 15.684 2.12061C16.2396 2.32281 16.6772 2.76043 16.8794 3.31596C17 3.64735 17 4.06119 17 4.88889V10C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10V4.88889Z",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["path",{d:"M8 22C8 21.0681 8 20.6022 8.15224 20.2346C8.35523 19.7446 8.74458 19.3552 9.23463 19.1522C9.60218 19 10.0681 19 11 19H13C13.9319 19 14.3978 19 14.7654 19.1522C15.2554 19.3552 15.6448 19.7446 15.8478 20.2346C16 20.6022 16 21.0681 16 22H8Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_97838 = [["path",{d:"M13.5 16.5L15 18M14 14.5C14 15.8807 12.8807 17 11.5 17C10.1193 17 9 15.8807 9 14.5C9 13.1193 10.1193 12 11.5 12C12.8807 12 14 13.1193 14 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_67812 = [["path",{d:"M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_71497 = [["path",{d:"M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_90227 = [["path",{d:"M12 16V21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 5.2918C8 5.02079 8 4.88529 8.01312 4.77132C8.1194 3.84789 8.84789 3.1194 9.77133 3.01312C9.88529 3 10.0208 3 10.2918 3H13.7082C13.9792 3 14.1147 3 14.2287 3.01312C15.1521 3.1194 15.8806 3.84789 15.9869 4.77132C16 4.88529 16 5.02079 16 5.2918C16 5.37885 16 5.42237 15.9967 5.46264C15.9708 5.78281 15.7927 6.07104 15.5179 6.2374C15.4834 6.25832 15.4444 6.27779 15.3666 6.31672L15.1055 6.44726C14.7021 6.64897 14.5003 6.74983 14.3681 6.90564C14.26 7.03286 14.1856 7.18509 14.1515 7.34846C14.1097 7.54854 14.1539 7.76968 14.2424 8.21197L15 12H15.3333C15.9533 12 16.2633 12 16.5176 12.0681C17.2078 12.2531 17.7469 12.7922 17.9319 13.4824C18 13.7367 18 14.0467 18 14.6667C18 14.9767 18 15.1317 17.9659 15.2588C17.8735 15.6039 17.6039 15.8735 17.2588 15.9659C17.1317 16 16.9767 16 16.6667 16H7.33333C7.02334 16 6.86835 16 6.74118 15.9659C6.39609 15.8735 6.12654 15.6039 6.03407 15.2588C6 15.1317 6 14.9767 6 14.6667C6 14.0467 6 13.7367 6.06815 13.4824C6.25308 12.7922 6.79218 12.2531 7.48236 12.0681C7.73669 12 8.04669 12 8.66667 12H9L9.75761 8.21197C9.84606 7.76968 9.89029 7.54854 9.84852 7.34846C9.81441 7.18509 9.73995 7.03286 9.63194 6.90564C9.49965 6.74983 9.29794 6.64897 8.89452 6.44726L8.63344 6.31672C8.55558 6.27779 8.51665 6.25832 8.48208 6.2374C8.20731 6.07104 8.02917 5.78281 8.00326 5.46264C8 5.42237 8 5.37885 8 5.2918Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_65525 = [["path",{d:"M20.5 12.5C20.5 17.1944 16.6944 21 12 21C7.30558 21 3.5 17.1944 3.5 12.5C3.5 7.80558 7.30558 4 12 4C16.6944 4 20.5 7.80558 20.5 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.88 18.7031L3.5 21.0031",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18.14 18.668L20.5 20.998",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M5 3L2 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M22 6L19 3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M12 8V12.5L14 14.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58661 = [["path",{d:"M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_41442 = [["path",{d:"M2 12C2 8.3109 2 6.46633 2.81382 5.1588C3.1149 4.67505 3.48891 4.2543 3.91891 3.91557C5.08116 3.00003 6.72077 3.00003 10 3.00003H14C17.2792 3.00003 18.9188 3.00003 20.0811 3.91557C20.5111 4.2543 20.8851 4.67505 21.1862 5.1588C22 6.46633 22 8.3109 22 12C22 15.6892 22 17.5337 21.1862 18.8413C20.8851 19.325 20.5111 19.7458 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7458 3.1149 19.325 2.81382 18.8413C2 17.5337 2 15.6892 2 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.5 3.00003L14.5 21",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18 7.00006H19M18 10.0001H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let y = (...e)=>e.filter(Boolean).join(" ");

function j(){
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

let N = "text-neutral-900 dark:text-neutral-100";

let A = "text-neutral-900/78 dark:text-neutral-100/78";

let S = "text-neutral-900/62 dark:text-neutral-100/62";

let z = "text-[15px]/[20px] font-bold";

let C = "text-[13px]/[16px] font-semibold tabular-nums";

let ak = (...e)=>e.filter(Boolean).join(" ");

function af(){
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

let av = "text-neutral-900/78 dark:text-neutral-100/78";

let ag = "text-neutral-900/62 dark:text-neutral-100/62";

let aw = "text-[17px]/[22px] font-extrabold";

let ay = "text-[15px]/[20px] font-bold";

let aj = "text-[13px]/[16px] font-semibold tabular-nums";

let aN = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let aA = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let aS = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let az = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let aC = "text-neutral-900 dark:text-neutral-100";

let aD = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let aR = "min-w-0 text-[15px]/[20px] font-bold text-neutral-900/62 dark:text-neutral-100/62";

let aM = "flex min-w-0 flex-wrap items-center gap-2 text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]";

let aE = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let aW = "border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let aO = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let aT = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let aF = "text-right tabular-nums";

let aI = [{label:"Editorial",items:[{label:"Story queue",icon:Icon_31964,count:"16",current:true},{label:"Assignments",icon:Icon_68240,count:"6"},{label:"Copy desk",icon:Icon_84831,count:"4"},{label:"Media library",icon:Icon_15805}]},{label:"Desks",items:[{label:"Metro",icon:Icon_17601},{label:"Business",icon:Icon_34133},{label:"Culture",icon:Icon_40170},{label:"Sport",icon:Icon_45346},{label:"Investigations",icon:Icon_97838}]},{label:"Distribution",items:[{label:"Newsletters",icon:Icon_67812},{label:"Syndication",icon:Icon_71497},{label:"Audience",icon:Icon_88366}]},{label:"Saved views",items:[{label:"My desk",icon:Icon_90227},{label:"Late stories",icon:Icon_65525,count:"2"}]}];

let aL = {Scheduled:aC,"In review":aC,"Needs edits":"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Drafting:"text-neutral-900/62 dark:text-neutral-100/62"};

let aP = [{title:"Harbor tunnel overruns reach $40m",owner:"Priya Raghunathan",status:"Needs edits",publishOn:"2026-08-12"},{title:"Council delays the vacancy tax vote",owner:"Tomasz Nowak",status:"In review",publishOn:"2026-08-12"},{title:"The grid contract and winter rates",owner:"Ari Chen",status:"Scheduled",publishOn:"2026-08-13"},{title:"Inside the ferry terminal rebuild: three years, two contractors and a berth that still does not fit",owner:"Lena Ortiz",status:"Drafting",publishOn:null},{title:"Eastside schools reopen Monday",owner:"Devon Okafor",status:"Scheduled",publishOn:"2026-08-13"},{title:"The quiet return of the night bus",owner:"Sofia Martins",status:"In review",publishOn:"2026-08-14"},{title:"Port authority names its next chief",owner:"Marcus Lund",status:"Scheduled",publishOn:"2026-08-14"},{title:"A year on the hearing aid waitlist",owner:"Priya Raghunathan",status:"Drafting",publishOn:"2026-08-17"},{title:"Riverfront market loses half its stalls",owner:"Jun Park",status:"In review",publishOn:"2026-08-17"},{title:"The landlord of Fenwick Street",owner:"Ari Chen",status:"Needs edits",publishOn:"2026-08-19"},{title:"Fare evasion fines fall again",owner:"Tomasz Nowak",status:"Scheduled",publishOn:"2026-08-19"},{title:"One helicopter, a 40-minute gap",owner:"Marguerite Oyelaran-Bishop",status:"Drafting",publishOn:"2026-08-21"},{title:"Where the city compost actually goes",owner:"Sofia Martins",status:"In review",publishOn:"2026-08-21"},{title:"The last dry dock on the north bank",owner:"Marcus Lund",status:"Scheduled",publishOn:"2026-08-24"},{title:"Rent arrears cases double",owner:"Jun Park",status:"Drafting",publishOn:null},{title:"A cycle lane that ends in a hedge",owner:"Devon Okafor",status:"Scheduled",publishOn:"2026-08-27"}];

let aq = ["All stories","In review","Needs edits"];

let aH = [{iso:"2026-08-12",time:"4:00 PM",title:"Evening briefing send",slot:"Newsletter"},{iso:"2026-08-13",time:"6:00 AM",title:"The grid contract and winter rates",slot:"Homepage lead"},{iso:"2026-08-13",time:"12:00 PM",title:"Eastside schools reopen Monday",slot:"Local"},{iso:"2026-08-14",time:"6:00 AM",title:"Port authority names its next chief",slot:"Homepage lead"},{iso:"2026-08-17",time:"5:00 PM",title:"Print pages lock",slot:"Sunday edition"},{iso:"2026-08-19",time:"6:00 AM",title:"Fare evasion fines fall again",slot:"Homepage lead"},{iso:"2026-08-21",time:"9:00 AM",title:"Weekly desk planning",slot:"All desks"},{iso:"2026-08-24",time:"6:00 AM",title:"The last dry dock on the north bank",slot:"Homepage lead"},{iso:"2026-08-27",time:"6:00 AM",title:"A cycle lane that ends in a hedge",slot:"Local"}];

let a$ = new Set(aH.map(e=>e.iso));

let aB = "2026-08-12";

let aK = ["S","M","T","W","T","F","S"];

let aU = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function aV(e,a){
  let r=new Date(Date.UTC(e,a,1)).getUTCDay();
  return Array.from({length:42},(t,n)=>{
    let l=new Date(Date.UTC(e,a,1+n-r));
    return {iso:l.toISOString().slice(0,10),day:l.getUTCDate(),inMonth:l.getUTCMonth()===a};
  });
}

let aJ = (e,a)=>new Date(Date.UTC(e,a,1)).toLocaleDateString("en-US",{month:"long",year:"numeric",timeZone:"UTC"});

let aQ = e=>new Date(`${e}T00:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric"});

function aG({status:e}){
  return <span className={ak("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",aL[e])}>{e}</span>;
}

function aX({iso:e}){
  return e?<>{aQ(e)}</>:<span className="text-neutral-900/62 dark:text-neutral-100/62">None</span>;
}

function aY({onClose:e}){
  return (
    <>
        <div className="flex h-14 shrink-0 items-center gap-2.5 pl-4 pr-2">
          <span className={ak("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] select-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black)]","size-8",ay)}>N</span>
          <div className="min-w-0 flex-1">
            <p className={ak(ay,"truncate")}>Northline</p>
            <p className={ak(aj,ag,"truncate")}>City desk</p>
          </div>
          {e&&<button type="button" aria-label="Close navigation" onClick={e} className={ak(aA,az)}>
            <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
          </button>}
        </div>
        <nav aria-label="Primary" className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
          {aI.map(e=>(
            <div key={e.label}>
                    <p className="px-3 pt-5 pb-1.5 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e.label}</p>
                    <ul className="space-y-0.5">
                      {e.items.map(e=>(
                        <li key={e.label}>
                                    <a href="#story-queue" aria-current={e.current?"page":undefined} className="flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]">
                                      <HugeiconsIcon icon={e.icon} size={18} strokeWidth={2} aria-hidden="true" />
                                      <span className="min-w-0 flex-1 truncate">{e.label}</span>
                                      {e.count&&<span className="ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e.count}</span>}
                                    </a>
                                  </li>
                      ))}
                    </ul>
                  </div>
          ))}
        </nav>
        <div className={ak("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","shrink-0 p-2")}>
          <div className="flex items-center gap-2.5 py-2 pl-2">
            <span className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
              <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">MO</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className={ak(ay,"truncate")}>Marguerite Oyelaran-Bishop</p>
              <p className={ak(aj,ag,"truncate")}>Managing editor</p>
            </div>
          </div>
        </div>
      </>
  );
}

function aZ({onClose:e}){
  let{ref:a,edges:r,onScroll:i}=af(),[o,s]=useState({year:2026,month:7}),[c,d]=useState(aB),u=useMemo(()=>aV(o.year,o.month), [o]),[x,b]=useState(()=>Math.max(0,aV(2026,7).findIndex(e=>e.iso===aB))),p=useRef([]),m=aH.filter(e=>e.iso>=c),k=e=>{
    let a=new Date(Date.UTC(o.year,o.month+e,1));
    s({year:a.getUTCFullYear(),month:a.getUTCMonth()}),b(a.getUTCDay())
  },f=Array.from({length:6},(e,a)=>u.slice(7*a,7*a+7));
  return (
    <div className="flex h-full w-full min-w-0 flex-col lg:w-80 xl:w-96">
        <div className="flex h-14 shrink-0 items-center gap-2 px-4">
          <h2 className={ak(aw,"min-w-0 flex-1 truncate")}>Schedule</h2>
          <button type="button" aria-label="Hide schedule" onClick={e} className={ak(aA,az)}>
            <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        <div className="hidden shrink-0 px-4 pb-4 lg:block">
          <div className="mb-1 flex items-center gap-2">
            <p className={ak(ay,"min-w-0 flex-1 truncate")}>{aJ(o.year,o.month)}</p>
            <button type="button" aria-label="Previous month" onClick={()=>k(-1)} className={ak(aA,az)}>
              <HugeiconsIcon icon={Icon_58661} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next month" onClick={()=>k(1)} className={ak(aA,az)}><HugeiconsIcon icon={Icon_5042} size={18} strokeWidth={2} aria-hidden="true" /></button>
          </div>
          <table className="w-full border-collapse">
            <caption className="sr-only">
              {aJ(o.year,o.month)}
              {" publishing schedule"}
            </caption>
            <thead>
              <tr>
                {aK.map((e,a)=>(
                  <th key={aU[a]} scope="col" className={ak(aj,ag,"pb-1")}>
                                <span aria-hidden="true">{e}</span>
                                <span className="sr-only">{aU[a]}</span>
                              </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {f.map((e,a)=>(
                <tr key={e[0].iso}>
                            {e.map((e,r)=>{
                              let n,l=7*a+r,i=e.iso===aB,o=e.iso===c;
                              return (
                                <td key={e.iso} className="p-0 text-center">
                                                <button ref={e=>{
                                                  p.current[l]=e
                                                }} type="button" tabIndex={l===x?0:-1} aria-label={n=e.iso,new Date(`${n}T00:00:00`).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})} aria-pressed={o} aria-current={i?"date":undefined} onClick={()=>{
                                                  d(e.iso),b(l)
                                                }} onKeyDown={e=>((e,a)=>{
                                                  let r={ArrowLeft:a-1,ArrowRight:a+1,ArrowUp:a-7,ArrowDown:a+7,Home:a-a%7,End:a-a%7+6}[e.key];
                                                  if(undefined!==r){
                                                    let a;
                                                    e.preventDefault(),b(a=Math.min(41,Math.max(0,r))),p.current[a]?.focus({preventScroll:true})
                                                  }
                                                })(e,l)} className={ak(i?"relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none":aA,az,"text-[14px]/[20px] font-medium","mx-auto tabular-nums")}>
                                                  <span className={e.inMonth||i?undefined:ag}>
                                                    {a$.has(e.iso)&&<span aria-hidden="true" className={ak(!i&&ag,"absolute left-1/2 top-1 size-1 -translate-x-1/2 bg-current")} />}
                                                    {e.day}
                                                  </span>
                                                </button>
                                              </td>
                              );
                            })}
                          </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={ak(aj,ag,"shrink-0 px-4 pb-1")}>Up next</p>
        <div className="relative min-h-0 flex-1">
          <div ref={a} onScroll={i} className="h-full overflow-y-auto px-2 pb-4">
            {0===m.length?<div className="px-1 py-8 text-center">
              <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">Nothing scheduled</p>
              <p className={ak("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>
                {"The calendar is clear after "}
                {aQ(c)}
                .
              </p>
              <button type="button" onClick={()=>d(aB)} className={ak(aN,aS,"mt-4")}>Show today</button>
            </div>:<ul className="space-y-0.5">
              {m.map(e=>(
                <li key={`${e.iso}-${e.title}`}>
                            <button type="button" className={ak("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","rounded-[var(--rb-r-4xl,18px)]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","cursor-pointer px-2")}>
                              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <span className={ak(aj,ag)}>
                                  {aQ(e.iso)}
                                  {", "}
                                  {e.time}
                                </span>
                                <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.title}</span></span>
                                <span data-description className="line-clamp-2 text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78">{e.slot}</span>
                              </span>
                            </button>
                          </li>
              ))}
            </ul>}
          </div>
          <div aria-hidden="true" className={ak("bg-linear-to-b from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={ak("bg-linear-to-t from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default function app_shell_4__Sorbet__Component(){
  let[e,a]=useState("All stories"),[r,i]=useState(false),[o,s]=useState("stack"),[c,d]=useState(false),[u,_]=useState(false),x=useRef(false),b=useRef(null),p=useRef(null),h=useReducedMotion(),{ref:m,edges:k,onScroll:f}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollLeft:t,scrollWidth:n,clientWidth:l}=a;
      r({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),{ref:g,edges:y,onScroll:j}=af();
  useEffect(()=>{
    let e=b.current?.ownerDocument.defaultView??window,a=e.matchMedia("(min-width: 1280px)"),r=e.matchMedia("(min-width: 1024px)"),t=()=>a.matches?"xl":r.matches?"lg":"stack",n=()=>s(t()),l=requestAnimationFrame(()=>{
      let e=t();
      s(e),i("stack"!==e)
    });
    return a.addEventListener("change",n),r.addEventListener("change",n),()=>{
      cancelAnimationFrame(l),a.removeEventListener("change",n),r.removeEventListener("change",n)
    };
  }, []),useEffect(()=>{
    let e=requestAnimationFrame(()=>{
      (b.current?.ownerDocument.defaultView??window).matchMedia("(max-width: 1023px)").matches&&d(true)
    });
    return ()=>cancelAnimationFrame(e);
  }, []),useEffect(()=>{
    if(!c)return;
    let e=p.current,a=requestAnimationFrame(()=>_(true)),r=e?.ownerDocument??document,t=()=>Array.from(e?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    x.current&&(t()[0]?.focus({preventScroll:true}),x.current=false);
    let n=e=>{
      if("Escape"===e.key){
        d(false),_(false),b.current?.focus({preventScroll:true});
        return
      }
      if("Tab"!==e.key)return;
      let a=t(),n=a[0],l=a[a.length-1];
      n&&l&&(e.shiftKey&&r.activeElement===n?(e.preventDefault(),l.focus({preventScroll:true})):e.shiftKey||r.activeElement!==l||(e.preventDefault(),focus({preventScroll:true})))
    };
    return r.addEventListener("keydown",n),()=>{
      cancelAnimationFrame(a),r.removeEventListener("keydown",n)
    };
  }, [c]);
  let N=()=>{
    d(false),_(false),b.current?.focus({preventScroll:true})
  },A=useMemo(()=>"All stories"===e?aP:aP.filter(a=>a.status===e), [e]),S="xl"===o?384:"lg"===o?320:"100%",z=h||"stack"===o?S:0,C=[.2,0,0,1];
  return (
    <div className={ak("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[940px] w-full overflow-hidden")}>
        <aside className={ak(aW,"hidden w-64 shrink-0 flex-col lg:flex")}><aY /></aside>
        <div className={ak("bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex min-w-0 flex-1 flex-col lg:flex-row")}>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col p-2">
            <div className={ak(aD,"min-h-0 flex-1")}>
              <header className="flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6">
                <button ref={b} type="button" aria-label="Open navigation" aria-expanded={c} onClick={()=>{
                  x.current=true,d(true)
                }} className={ak(aA,az,"lg:hidden")}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
                <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
                  <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[15px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78">
                    <li className="hidden shrink-0 sm:block"><span>Editorial</span></li>
                    <li aria-hidden="true" className={ak("text-neutral-900/62 dark:text-neutral-100/62 select-none","hidden shrink-0 sm:block")}>/</li>
                    <li className="min-w-0">
                      <h1 id="story-queue" aria-current="page" className={ak("font-bold text-neutral-900 dark:text-neutral-100",aw,"truncate")}>Story queue</h1>
                    </li>
                  </ol>
                </nav>
                <button type="button" aria-label="Schedule panel" aria-pressed={r} aria-controls="schedule-panel" onClick={()=>i(e=>!e)} className={ak(aA,az)}>
                  <HugeiconsIcon icon={Icon_41442} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </header>
              <div className="flex h-12 shrink-0 items-center gap-2 px-4 sm:px-6">
                <div className="relative -mx-4 min-w-0 flex-1 sm:mx-0">
                  <div ref={m} onScroll={f} className="flex items-center gap-1.5 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:-mx-1 sm:px-1 [&::-webkit-scrollbar]:hidden">
                    {aq.map(r=>{
                      let n=e===r;
                      return <button key={r} type="button" aria-pressed={n} onClick={()=>a(r)} className="relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40">{r}</button>;
                    })}
                  </div>
                  <div aria-hidden="true" className={ak("bg-linear-to-r from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-y-0 left-0 w-8",k.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={ak("bg-linear-to-l from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-y-0 right-0 w-8",k.end?"opacity-100":"opacity-0")} />
                </div>
                <button type="button" aria-label="New story" className={ak(aN,aS)}>
                  <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" className="sm:hidden" />
                  <span className="hidden sm:inline">New story</span>
                </button>
              </div>
              <div className="relative flex min-h-0 flex-1 flex-col">
                <main ref={g} onScroll={j} className="h-full overflow-y-auto">
                  <table className={ak("w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium","hidden min-w-[440px] md:table")}>
                    <caption className="sr-only">Stories waiting to be published</caption>
                    <thead className={ak("bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","sticky top-0 z-20")}>
                      <tr>
                        <th scope="col" className={ak(aO,"h-9 sm:pl-6")}>Story</th>
                        <th scope="col" className={ak(aO,"hidden h-9 w-44 xl:table-cell")}>Owner</th>
                        <th scope="col" className={ak(aO,"h-9 w-28")}>Status</th>
                        <th scope="col" className={ak(aO,aF,"h-9 w-20 sm:pr-6")}>Publishes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {A.map(e=>(
                        <tr key={e.title} className={ak("group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","h-11")}>
                                            <td className={ak(aT,"max-w-0 sm:pl-6")}><span className="block truncate">{e.title}</span></td>
                                            <td className={ak(aT,"hidden max-w-0 xl:table-cell")}><span className={ak(av,"block truncate")}>{e.owner}</span></td>
                                            <td className={aT}><aG status={e.status} /></td>
                                            <td className={ak(aT,aF,"sm:pr-6")}>{e.publishOn&&<span className={av}>{aQ(e.publishOn)}</span>}</td>
                                          </tr>
                      ))}
                    </tbody>
                  </table>
                  <ul className="space-y-2 p-4 md:hidden">
                    {A.map(e=>(
                      <li key={e.title} className={ak(aD,"p-4")}>
                                        <p className={ay}>{e.title}</p>
                                        <dl className="mt-3 space-y-1.5">
                                          <div className="flex items-center justify-between gap-4">
                                            <dt className={aR}>Owner</dt>
                                            <dd className={aM}>{e.owner}</dd>
                                          </div>
                                          <div className="flex items-center justify-between gap-4">
                                            <dt className={aR}>Status</dt>
                                            <dd className={aM}><aG status={e.status} /></dd>
                                          </div>
                                          <div className="flex items-center justify-between gap-4">
                                            <dt className={aR}>Publishes</dt>
                                            <dd className={ak(aM,"tabular-nums")}><aX iso={e.publishOn} /></dd>
                                          </div>
                                        </dl>
                                      </li>
                    ))}
                  </ul>
                </main>
                <div aria-hidden="true" className={ak("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 top-0 h-8",y.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={ak("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 bottom-0 h-8",y.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
          </div>
          <AnimatePresence key={o} initial={false}>
            {r&&<motion.aside key={o} id="schedule-panel" aria-label="Schedule" initial={{width:z,opacity:0}} animate={{width:S,opacity:1}} exit={{width:z,opacity:0,transition:{duration:h?.15:.22,ease:C}}} transition={{duration:h?.15:.32,ease:C}} className={ak("bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","max-h-[45%] w-full shrink-0 overflow-hidden lg:max-h-none")}><aZ onClose={()=>i(false)} /></motion.aside>}
          </AnimatePresence>
        </div>
        {c&&<div className="lg:hidden">
          <button type="button" aria-label="Close navigation overlay" onClick={N} tabIndex={-1} className={ak("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70",aE,"absolute inset-0 z-30 cursor-pointer",u?"opacity-100":"opacity-0")} />
          <aside ref={p} role="dialog" aria-modal="true" aria-label="Navigation" className={ak(aW,"shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",aE,"absolute inset-y-0 left-0 z-40 flex w-72 max-w-[85%] flex-col",u?"opacity-100":"opacity-0")}><aY onClose={N} /></aside>
        </div>}
      </div>
  );
}
