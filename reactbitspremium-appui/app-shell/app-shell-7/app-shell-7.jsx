/**
 * React Bits Pro — Application UI (app-shell-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { children, disconnect, focus, icon, items, label, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_57854 = [["path",{d:"M13.6903 19.4567C13.5 18.9973 13.5 18.4149 13.5 17.25C13.5 16.0851 13.5 15.5027 13.6903 15.0433C13.944 14.4307 14.4307 13.944 15.0433 13.6903C15.5027 13.5 16.0851 13.5 17.25 13.5C18.4149 13.5 18.9973 13.5 19.4567 13.6903C20.0693 13.944 20.556 14.4307 20.8097 15.0433C21 15.5027 21 16.0851 21 17.25C21 18.4149 21 18.9973 20.8097 19.4567C20.556 20.0693 20.0693 20.556 19.4567 20.8097C18.9973 21 18.4149 21 17.25 21C16.0851 21 15.5027 21 15.0433 20.8097C14.4307 20.556 13.944 20.0693 13.6903 19.4567Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13.6903 8.95671C13.5 8.49728 13.5 7.91485 13.5 6.75C13.5 5.58515 13.5 5.00272 13.6903 4.54329C13.944 3.93072 14.4307 3.44404 15.0433 3.1903C15.5027 3 16.0851 3 17.25 3C18.4149 3 18.9973 3 19.4567 3.1903C20.0693 3.44404 20.556 3.93072 20.8097 4.54329C21 5.00272 21 5.58515 21 6.75C21 7.91485 21 8.49728 20.8097 8.95671C20.556 9.56928 20.0693 10.056 19.4567 10.3097C18.9973 10.5 18.4149 10.5 17.25 10.5C16.0851 10.5 15.5027 10.5 15.0433 10.3097C14.4307 10.056 13.944 9.56928 13.6903 8.95671Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3.1903 19.4567C3 18.9973 3 18.4149 3 17.25C3 16.0851 3 15.5027 3.1903 15.0433C3.44404 14.4307 3.93072 13.944 4.54329 13.6903C5.00272 13.5 5.58515 13.5 6.75 13.5C7.91485 13.5 8.49728 13.5 8.95671 13.6903C9.56928 13.944 10.056 14.4307 10.3097 15.0433C10.5 15.5027 10.5 16.0851 10.5 17.25C10.5 18.4149 10.5 18.9973 10.3097 19.4567C10.056 20.0693 9.56928 20.556 8.95671 20.8097C8.49728 21 7.91485 21 6.75 21C5.58515 21 5.00272 21 4.54329 20.8097C3.93072 20.556 3.44404 20.0693 3.1903 19.4567Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3.1903 8.95671C3 8.49728 3 7.91485 3 6.75C3 5.58515 3 5.00272 3.1903 4.54329C3.44404 3.93072 3.93072 3.44404 4.54329 3.1903C5.00272 3 5.58515 3 6.75 3C7.91485 3 8.49728 3 8.95671 3.1903C9.56928 3.44404 10.056 3.93072 10.3097 4.54329C10.5 5.00272 10.5 5.58515 10.5 6.75C10.5 7.91485 10.5 8.49728 10.3097 8.95671C10.056 9.56928 9.56928 10.056 8.95671 10.3097C8.49728 10.5 7.91485 10.5 6.75 10.5C5.58515 10.5 5.00272 10.5 4.54329 10.3097C3.93072 10.056 3.44404 9.56928 3.1903 8.95671Z",stroke:"currentColor",strokeLinecap:"square",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_86829 = [["ellipse",{cx:"12",cy:"5",rx:"8",ry:"3",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_33126 = [["path",{d:"M7 19H13C15.8284 19 17.2426 19 18.1213 18.1213C19 17.2426 19 15.8284 19 13V10M19 10C19.7002 10 21.0085 11.9943 21.5 12.5M19 10C18.2998 10 16.9915 11.9943 16.5 12.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5 7L5 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"5",cy:"5",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["circle",{cx:"19",cy:"5",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["circle",{cx:"5",cy:"19",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_78830 = [["path",{d:"M1.99219 7C1.99219 7.94281 1.99219 8.41421 2.28508 8.70711C2.57797 9 3.04938 9 3.99219 9H5.99219V5C5.99219 3.89543 5.09676 3 3.99219 3C2.88762 3 1.99219 3.89543 1.99219 5V7Z",stroke:"currentColor",fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.99219 19V18C9.99219 17.0572 9.99219 16.5858 10.2851 16.2929C10.578 16 11.0494 16 11.9922 16H19.9922C20.935 16 21.4064 16 21.6993 16.2929C21.9922 16.5858 21.9922 17.0572 21.9922 18V19C21.9922 20.1046 21.0968 21 19.9922 21H7.99219C9.09676 21 9.99219 20.1046 9.99219 19Z",stroke:"currentColor",fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18.9922 16V7C18.9922 5.11438 18.9922 4.17157 18.4064 3.58579C17.8206 3 16.8778 3 14.9922 3H3.99219",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99219 8H14.9922",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M9.99219 11H12.9922",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M5.99219 9V19C5.99219 20.1046 6.88762 21 7.99219 21C9.09676 21 9.99219 20.1046 9.99219 19V18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_79698 = [["path",{d:"M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 6.5L16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_78805 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 15H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 9H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_65174 = [["path",{d:"M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_3175 = [["path",{d:"M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 7V3M12 17V21M17 12H21M7 12H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.8965 3.47625C15.63 2.57541 16.7478 2 18 2C20.2091 2 22 3.79086 22 6C22 7.25222 21.4246 8.37005 20.5238 9.1035M20.5238 14.8965C21.4246 15.63 22 16.7478 22 18C22 20.2091 20.2091 22 18 22C16.7478 22 15.63 21.4246 14.8965 20.5238M9.1035 20.5238C8.37005 21.4246 7.25222 22 6 22C3.79086 22 2 20.2091 2 18C2 16.7478 2.57541 15.63 3.47625 14.8965M3.47625 9.1035C2.57541 8.37005 2 7.25222 2 6C2 3.79086 3.79086 2 6 2C7.25222 2 8.37005 2.57541 9.1035 3.47625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_83331 = [["path",{d:"M18 18C18 18.4644 18 18.6965 17.978 18.8918C17.7952 20.5145 16.5145 21.7952 14.8919 21.978C14.6965 22 14.4644 22 14 22H11C7.70017 22 6.05025 22 5.02513 20.9749C4 19.9498 4 18.2998 4 15L4.00001 8.99998C4.00001 5.70016 4.00003 4.05024 5.02514 3.02512C6.05027 2 7.70018 2 11 2H14C14.4644 2 14.6965 2 14.8919 2.02201C16.5145 2.20483 17.7952 3.48547 17.978 5.10816C18 5.30347 18 5.53565 18 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.07612 11.1183C8 11.3021 8 11.535 8 12.001C8 12.4669 8 12.6999 8.07612 12.8837C8.17761 13.1287 8.37229 13.3234 8.61732 13.4249C8.80109 13.501 9.03406 13.501 9.5 13.501H14.5C14.5002 15.2503 14.511 16.1299 15.0623 16.3858C15.0829 16.3954 15.1037 16.4042 15.1249 16.4124C15.7045 16.6353 16.3999 16.0139 17.7907 14.7711C19.2576 13.4602 19.9912 12.7851 20 11.957C19.9912 11.1289 19.2576 10.4538 17.7907 9.14301C16.3999 7.90018 15.7045 7.27876 15.1249 7.50171C15.1037 7.50985 15.0829 7.51869 15.0623 7.52822C14.5018 7.78844 14.5 8.69318 14.5 10.501H9.5C9.03406 10.501 8.80109 10.501 8.61732 10.5771C8.37229 10.6786 8.17761 10.8733 8.07612 11.1183Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let N = (...e)=>e.filter(Boolean).join(" ");

function A(){
  let e=useRef(null),[a,t]=useState({start:false,end:false}),r=useCallback(()=>{
    let a=e.current;
    if(!a)return;
    let{scrollTop:r,scrollHeight:n,clientHeight:s}=a;
    t({start:r>1,end:Math.ceil(r+s)<n-1})
  }, []);
  return useEffect(()=>{
    r();
    let a=e.current,t=a?.ownerDocument.defaultView;
    if(!a||!t?.ResizeObserver)return;
    let n=new t.ResizeObserver(r);
    return observe(a),()=>disconnect();
  }, [r]),{ref:e,edges:a,onScroll:r};
}

let S = "text-neutral-900 dark:text-neutral-100",
  z = "text-neutral-900/80 dark:text-neutral-100/80",
  D = "text-neutral-900/66 dark:text-neutral-100/66",
  C = "text-[13px]/[18px] font-normal",
  E = "text-[14px]/[16px] font-[450]",
  R = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  W = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  O = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40",
  P = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  $ = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  L = "size-8 rounded-[var(--rb-r-sm,6px)]",
  M = "shrink-0 text-neutral-900/80 dark:text-neutral-100/80",
  F = "inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",
  I = "text-neutral-900/80 dark:text-neutral-100/80",
  T = "text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",
  H = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  K = "min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",
  q = "relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40",
  U = "transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none",
  V = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  B = "text-neutral-900/66 dark:text-neutral-100/66 select-none",
  G = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  J = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  Q = "text-right tabular-nums",
  X = ["Northwind Labs","Halden Group","Corran Health"],
  Y = [{name:"Payments API",slug:"payments-api"},{name:"Ledger core",slug:"ledger-core"},{name:"Merchant portal",slug:"merchant-portal"},{name:"Risk engine",slug:"risk-engine"}],
  Z = ["Production","Staging","Preview"],
  ee = {active:"Active",syncing:"Syncing",paused:"Paused",degraded:"Degraded"},
  ea = {active:I,syncing:"text-neutral-900 dark:text-neutral-100",paused:"text-neutral-900/66 dark:text-neutral-100/66",degraded:T},
  et = {Production:[{suffix:"primary",region:"eu-west-1",status:"active",connections:184,backup:"7 Apr 2026"},{suffix:"replica-a",region:"eu-west-1",status:"active",connections:96,backup:"7 Apr 2026"},{suffix:"replica-b",region:"eu-west-1",status:"active",connections:88,backup:"7 Apr 2026"},{suffix:"read-replica-analytics-frankfurt-standby",region:"eu-central-1",status:"degraded",connections:41,backup:"6 Apr 2026"},{suffix:"sessions",region:"us-east-1",status:"active",connections:310,backup:"7 Apr 2026"},{suffix:"jobs",region:"eu-west-1",status:"active",connections:22,backup:"7 Apr 2026"},{suffix:"audit-log",region:"ap-southeast-2",status:"active",connections:12,backup:"7 Apr 2026"},{suffix:"search-index",region:"eu-west-1",status:"syncing",connections:6,backup:null},{suffix:"billing",region:"eu-west-1",status:"active",connections:47,backup:"7 Apr 2026"},{suffix:"webhooks",region:"us-west-2",status:"active",connections:31,backup:"6 Apr 2026"},{suffix:"cache-meta",region:"eu-west-1",status:"active",connections:15,backup:"7 Apr 2026"},{suffix:"reporting",region:"eu-central-1",status:"active",connections:28,backup:"7 Apr 2026"},{suffix:"archive-2025",region:"us-east-1",status:"paused",connections:0,backup:"1 Apr 2026"},{suffix:"restore-drill",region:"us-east-1",status:"paused",connections:0,backup:"5 Apr 2026"}],Staging:[{suffix:"primary",region:"eu-west-1",status:"active",connections:24,backup:"7 Apr 2026"},{suffix:"replica-a",region:"eu-west-1",status:"active",connections:11,backup:"7 Apr 2026"},{suffix:"read-replica-analytics-frankfurt-standby",region:"eu-central-1",status:"active",connections:8,backup:"6 Apr 2026"},{suffix:"sessions",region:"us-east-1",status:"active",connections:19,backup:"7 Apr 2026"},{suffix:"jobs",region:"eu-west-1",status:"active",connections:5,backup:"7 Apr 2026"},{suffix:"audit-log",region:"ap-southeast-2",status:"active",connections:3,backup:"6 Apr 2026"},{suffix:"search-index",region:"eu-west-1",status:"syncing",connections:2,backup:null},{suffix:"billing",region:"eu-west-1",status:"active",connections:7,backup:"7 Apr 2026"},{suffix:"webhooks",region:"us-west-2",status:"active",connections:4,backup:"7 Apr 2026"},{suffix:"seed-data",region:"eu-west-1",status:"active",connections:1,backup:"5 Apr 2026"},{suffix:"load-test",region:"us-east-1",status:"paused",connections:0,backup:"2 Apr 2026"},{suffix:"archive-2025",region:"us-east-1",status:"paused",connections:0,backup:"1 Apr 2026"},{suffix:"fixtures",region:"eu-west-1",status:"active",connections:2,backup:"4 Apr 2026"}],Preview:[{suffix:"primary",region:"eu-west-1",status:"active",connections:3,backup:"7 Apr 2026"},{suffix:"pr-4821",region:"eu-west-1",status:"active",connections:2,backup:null},{suffix:"pr-4817",region:"eu-west-1",status:"active",connections:1,backup:null},{suffix:"pr-4802-checkout-redesign-rollback",region:"eu-west-1",status:"syncing",connections:0,backup:null},{suffix:"sessions",region:"eu-west-1",status:"active",connections:2,backup:"6 Apr 2026"},{suffix:"jobs",region:"eu-west-1",status:"active",connections:1,backup:"6 Apr 2026"},{suffix:"search-index",region:"eu-west-1",status:"active",connections:1,backup:"5 Apr 2026"},{suffix:"billing",region:"eu-central-1",status:"active",connections:1,backup:"5 Apr 2026"},{suffix:"webhooks",region:"eu-west-1",status:"paused",connections:0,backup:"4 Apr 2026"},{suffix:"seed-data",region:"eu-west-1",status:"active",connections:1,backup:"4 Apr 2026"},{suffix:"pr-4788",region:"us-east-1",status:"paused",connections:0,backup:"3 Apr 2026"},{suffix:"pr-4771",region:"us-east-1",status:"paused",connections:0,backup:"2 Apr 2026"},{suffix:"fixtures",region:"eu-west-1",status:"active",connections:1,backup:"3 Apr 2026"}]},
  er = [{label:"Project",items:[{label:"Overview",icon:Icon_57854},{label:"Data",icon:Icon_86829,children:["Databases","Backups","Migrations"]},{label:"Deployments",icon:Icon_33126},{label:"Logs",icon:Icon_78830}]},{label:"Environment",items:[{label:"Variables",icon:Icon_79698},{label:"Domains",icon:Icon_78805},{label:"Access",icon:Icon_88366}]}],
  en = [{label:"Account settings",icon:Icon_65174},{label:"Notification preferences",icon:Icon_13473},{label:"Help centre",icon:Icon_3175},{label:"Sign out",icon:Icon_83331}];

function es(e,a,t){
  let r=useRef(t);
  useEffect(()=>{
    r.current=t
  }),useEffect(()=>{
    if(!e)return;
    let t=a.current?.ownerDocument??document,n=e=>{
      a.current?.contains(e.target)||r.current(false)
    },s=e=>{
      "Escape"===e.key&&(e.preventDefault(),r.current(true))
    };
    return t.addEventListener("pointerdown",n),t.addEventListener("keydown",s),()=>{
      t.removeEventListener("pointerdown",n),t.removeEventListener("keydown",s)
    };
  }, [e,a])
}

function ei({status:e}){
  return (
    <span className={N(F,ea[e])}>
        {"syncing"===e&&<span className="flex h-lh shrink-0 items-center">
          <span className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" aria-hidden="true" />
        </span>}
        {ee[e]}
      </span>
  );
}

function el({id:e,label:a,display:t,sections:i,createLabel:l,open:o,onOpenChange:c,className:u,triggerMaxWidth:d}){
  let[p,x]=useState(false),[b,h]=useState(0),f=useRef(null),_=useRef(null),w=useRef(null),j=i.flatMap((e,a)=>e.options.map(e=>({sectionIndex:a,name:e}))),y=j.length+ +!!l,A=e=>{
    c(false),e&&_.current?.focus({preventScroll:true})
  };
  es(o,f,A),useEffect(()=>{
    o&&w.current?.focus({preventScroll:true})
  }, [o]);
  let S=e=>{
    let a=j.findIndex(e=>i[e.sectionIndex].value===e.name);
    h(a<0?0:a),x(e),c(true)
  },z=e=>{
    let a=j[e];
    a&&i[a.sectionIndex].onSelect(a.name),A(true)
  };
  return (
    <div ref={f} className={N("relative shrink-0",u)}>
        <button ref={_} type="button" aria-haspopup="menu" aria-expanded={o} aria-label={t?`${a}: ${t}`:a} onClick={()=>o?A(false):S(true)} onKeyDown={e=>{
          ("ArrowDown"===e.key||"ArrowUp"===e.key)&&(e.preventDefault(),S(false),"ArrowUp"===e.key&&h(y-1))
        }} className={t?N(O,$):N(W,L)}>
          {t?<>
            <span className={N("truncate",d)}>{t}</span>
            <HugeiconsIcon icon={Icon_31517} size={14} strokeWidth={1.8} aria-hidden="true" className={M} />
          </>:<HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />}
        </button>
        {o&&<div ref={w} role="menu" aria-label={a} aria-activedescendant={`${e}-item-${b}`} tabIndex={-1} onKeyDown={e=>{
          switch(e.key){case"ArrowDown":e.preventDefault(),h(e=>(e+1)%y);break;case"ArrowUp":e.preventDefault(),h(e=>(e-1+y)%y);break;case"Home":e.preventDefault(),h(0);break;case"End":e.preventDefault(),h(y-1);break;case"Enter":case" ":e.preventDefault(),z(b);break;case"Tab":A(false)}
        }} className={N(K,p&&U,"absolute left-0 top-full z-30 mt-2 w-60")}>
          {i.map((a,t)=>{
            let n=i.slice(0,t).reduce((e,a)=>e+a.options.length,0);
            return (
              <div key={a.label} role="group" aria-label={a.label} className={t>0?"mt-1":undefined}>
                        {i.length>1&&<p className="px-2 pt-2 pb-1 text-[12px]/[16px] font-normal tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{a.label}</p>}
                        {a.options.map((t,i)=>{
                          let l=n+i,o=t===a.value;
                          return (
                            <button key={t} id={`${e}-item-${l}`} type="button" role="menuitemradio" aria-checked={o} tabIndex={-1} data-highlighted={l===b?"":undefined} onClick={()=>z(l)} onPointerMove={()=>h(l)} className={q}>
                                          <span className="min-w-0 flex-1 truncate">{t}</span>
                                          {o&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />}
                                        </button>
                          );
                        })}
                      </div>
            );
          })}
          {l&&<button id={`${e}-item-${y-1}`} type="button" role="menuitem" tabIndex={-1} data-highlighted={b===y-1?"":undefined} onClick={()=>A(true)} onPointerMove={()=>h(y-1)} className={N(q,"mt-1")}>
            <HugeiconsIcon icon={Icon_89886} size={14} strokeWidth={1.8} aria-hidden="true" />
            <span className="truncate">{l}</span>
          </button>}
        </div>}
      </div>
  );
}

function eo({regions:e,degradedRegion:a,open:t,onOpenChange:s}){
  let i=useRef(null),l=useRef(null),o=e=>{
    s(false),e&&l.current?.focus({preventScroll:true})
  };
  return es(t,i,o),<div ref={i} className="relative shrink-0">
    <button ref={l} type="button" aria-haspopup="dialog" aria-expanded={t} aria-label={a?`System status: degraded in ${a}`:"System status: operational"} onClick={()=>{
      t?o(false):s(true)
    }} className={N(O,$)}><span className={N(F,a?T:I,"truncate")}>{a?"Degraded":"Operational"}</span></button>
    {t&&<div role="dialog" aria-label="System status" className={N("flex max-h-80 w-72 max-w-[calc(100vw-2rem)] flex-col gap-3 overflow-y-auto rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-4 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",U,"absolute right-0 top-full z-30 mt-2 w-72")}>
      <p className={N(C,z)}>
        {a?`Write latency is above target in ${a}.`:"All regions are serving traffic normally."}
      </p>
      <ul>
        {e.map(e=>(
          <li key={e} className="flex h-8 items-center justify-between gap-3">
                    <span className="min-w-0 truncate">{e}</span>
                    <span className={N(F,e===a?T:I,"shrink-0")}>{e===a?"Degraded":"Operational"}</span>
                  </li>
        ))}
      </ul>
    </div>}
  </div>;
}

function ec({idPrefix:e,dataOpen:a,onDataToggle:t,announcement:i,onDismissAnnouncement:l,onClose:o}){
  let[c,u]=useState(false),{ref:d,edges:p,onScroll:x}=A(),b=useRef(null),h=useRef(null),f=useRef(null),g=e=>{
    u(false),e&&h.current?.focus({preventScroll:true})
  };
  return es(c,b,g),<>
    <div className="flex shrink-0 items-center gap-2 p-3">
      <div className={N("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","flex-1")}>
        <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
          <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <input id={`${e}-search`} type="search" placeholder="Search" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
        <label className="sr-only" htmlFor={`${e}-search`}>Search this project</label>
      </div>
      {o&&<button type="button" aria-label="Close navigation" onClick={o} className={N(W,L)}>
        <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
      </button>}
    </div>
    <div className="relative min-h-0 flex-1">
      <nav ref={d} onScroll={x} aria-label="Project" className="h-full overflow-y-auto px-2 pb-2">
        {er.map(n=>(
          <div key={label}>
                    <p className="px-2 pt-4 pb-1 text-[12px]/[16px] font-normal tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{label}</p>
                    <ul className="space-y-0.5">
                      {items.map(n=>children?<li key={label}>
                        <button type="button" aria-expanded={a} aria-controls={`${e}-${label.toLowerCase()}`} onClick={t} className={N(V,"group")}>
                          <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                          <span className="min-w-0 flex-1 truncate text-left">{label}</span>
                          <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                        </button>
                        <div id={`${e}-${label.toLowerCase()}`} className={N("grid",a?"grid-rows-[1fr]":"grid-rows-[0fr]")}>
                          <ul className="-mx-1 overflow-hidden px-1">
                            {children.map((e,a)=>(
                              <li key={e} className="pt-0.5">
                                                  <a href="#databases" aria-current={0===a?"page":undefined} className={N(V,"pl-8")}><span className="min-w-0 flex-1 truncate">{e}</span></a>
                                                </li>
                            ))}
                          </ul>
                        </div>
                      </li>:<li key={label}>
                        <a href="#databases" className={V}>
                          <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                          <span className="min-w-0 flex-1 truncate">{label}</span>
                        </a>
                      </li>)}
                    </ul>
                  </div>
        ))}
      </nav>
      <div aria-hidden="true" className={N(o?"bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950":"bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",p.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={N(o?"bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950":"bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",p.end?"opacity-100":"opacity-0")} />
    </div>
    {"gone"!==i&&<div className="shrink-0 px-2 pb-2">
      <div className={N(H,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","p-3","leaving"===i?"opacity-0":"opacity-100")}>
        <p className={E}>Point-in-time restore</p>
        <p className={N(C,z,"mt-1")}>Rewind any database to any point in the last 30 days.</p>
        <div className="mt-2.5 flex items-center gap-2">
          <button type="button" className={N(R,P)}>Read more</button>
          <button type="button" onClick={l} className={N(R,P)}>Dismiss</button>
        </div>
      </div>
    </div>}
    <div ref={b} className="relative shrink-0 px-2 pb-2">
      <button ref={h} type="button" aria-haspopup="menu" aria-expanded={c} onClick={()=>{
        c?g(false):u(true)
      }} className={N(O,"h-11 gap-2 rounded-[var(--rb-r-sm,6px)] px-5 text-[16px]/[20px] font-[450] tracking-[-0.01em]","h-12 w-full gap-2.5 pr-2 pl-2 text-left")}>
        <span className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
          <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">DW</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className={N(E,S,"block truncate")}>Dana Whitfield</span>
          <span className={N("text-[12px]/[16px] font-normal tabular-nums",D,"block truncate")}>dana.whitfield@northwindlabs.com</span>
        </span>
        <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className={M} />
      </button>
      {c&&<div ref={f} role="menu" aria-label="Account" onKeyDown={e=>{
        let a=Array.from(f.current?.querySelectorAll('[role="menuitem"]')??[]);
        if(0===a.length)return;
        let t=f.current?.ownerDocument??document,r=a.indexOf(t.activeElement);
        "ArrowDown"===e.key?(e.preventDefault(),a[r<0||r===a.length-1?0:r+1]?.focus({preventScroll:true})):"ArrowUp"===e.key?(e.preventDefault(),a[r<=0?a.length-1:r-1]?.focus({preventScroll:true})):"Home"===e.key?(e.preventDefault(),a[0]?.focus({preventScroll:true})):"End"===e.key&&(e.preventDefault(),a[a.length-1]?.focus({preventScroll:true}))
      }} className={N(K,U,"absolute bottom-[calc(100%-0.5rem)] left-2 right-2 z-30")}>
        {en.map(({label:e,icon:a})=>(
          <button key={e} type="button" role="menuitem" onClick={()=>g(true)} className={q}>
                    <HugeiconsIcon icon={a} size={16} strokeWidth={1.8} aria-hidden="true" />
                    <span className="truncate">{e}</span>
                  </button>
        ))}
      </div>}
    </div>
  </>;
}

function eu({rows:e,slug:a}){
  return (
    <>
        <table className={N("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","hidden table-fixed md:table")}>
          <caption className="sr-only">Databases in the selected project and environment</caption>
          <thead className={N("bg-white dark:bg-neutral-900","sticky top-0 z-20")}>
            <tr>
              <th scope="col" className={N(G,"h-9 w-[32%] sm:first:pl-6")}>Database</th>
              <th scope="col" className={N(G,"h-9 w-[18%]")}>Region</th>
              <th scope="col" className={N(G,"h-9 w-[18%]")}>Status</th>
              <th scope="col" className={N(G,Q,"h-9 w-[16%]")}>Connections</th>
              <th scope="col" className={N(G,"h-9 w-[16%] sm:last:pr-6")}>Last backup</th>
            </tr>
          </thead>
          <tbody>
            {e.map(e=>(
              <tr key={e.suffix} className={N("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-11")}>
                        <td className={N(J,"truncate sm:first:pl-6")}>
                          {a}
                          -
                          {e.suffix}
                        </td>
                        <td className={N(J,"truncate")}>{e.region}</td>
                        <td className={J}><ei status={e.status} /></td>
                        <td className={N(J,Q)}>{e.connections}</td>
                        <td className={N(J,"truncate tabular-nums sm:last:pr-6")}>{e.backup}</td>
                      </tr>
            ))}
          </tbody>
        </table>
        <ul className="space-y-2 px-4 pb-4 md:hidden">
          {e.map(e=>(
            <li key={e.suffix} className={N(H,"p-3")}>
                    <p className={N(E,"truncate")}>
                      {a}
                      -
                      {e.suffix}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <ei status={e.status} />
                      <span className={N(C,z,"shrink-0")}>{e.region}</span>
                    </div>
                    <div className={N(C,z,"mt-1 flex items-center justify-between gap-3")}>
                      <span>
                        <span className={D}>{"Connections "}</span>
                        <span className={N(S,"tabular-nums")}>{e.connections}</span>
                      </span>
                      <span className="shrink-0 tabular-nums">{e.backup}</span>
                    </div>
                  </li>
          ))}
        </ul>
      </>
  );
}

function ed(){
  let{ref:e,edges:a,onScroll:t}=A(),[i,l]=useState(X[0]),[o,c]=useState(Y[0].name),[u,d]=useState(Z[0]),[p,x]=useState(null),[b,h]=useState(true),[f,m]=useState("shown"),g=useRef(undefined),[k,_]=useState(false),[w,j]=useState(false),z=useRef(false),D=useRef(null),C=useRef(null);
  useEffect(()=>()=>clearTimeout(g.current), []),useEffect(()=>{
    let e=requestAnimationFrame(()=>{
      (D.current?.ownerDocument.defaultView??window).matchMedia("(max-width: 1023px)").matches&&_(true)
    });
    return ()=>cancelAnimationFrame(e);
  }, []),useEffect(()=>{
    if(!k)return;
    let e=C.current,a=requestAnimationFrame(()=>j(true)),t=e?.ownerDocument??document,r=()=>Array.from(e?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    z.current&&(r()[0]?.focus({preventScroll:true}),z.current=false);
    let n=e=>{
      if("Escape"===e.key){
        _(false),j(false),D.current?.focus({preventScroll:true});
        return
      }
      if("Tab"!==e.key)return;
      let a=r(),n=a[0],s=a[a.length-1];
      n&&s&&(e.shiftKey&&t.activeElement===n?(e.preventDefault(),s.focus({preventScroll:true})):e.shiftKey||t.activeElement!==s||(e.preventDefault(),focus({preventScroll:true})))
    };
    return t.addEventListener("keydown",n),()=>{
      cancelAnimationFrame(a),t.removeEventListener("keydown",n)
    };
  }, [k]);
  let E=()=>{
    _(false),j(false),D.current?.focus({preventScroll:true})
  },R=()=>{
    m("leaving"),g.current=setTimeout(()=>m("gone"),200)
  },O=et[u],P=Y.find(e=>e.name===o)?.slug??Y[0].slug,M=Array.from(new Set(O.map(e=>e.region))),F=O.find(e=>"degraded"===e.status)?.region??null,I=e=>a=>x(a?e:null),T={label:"Organisation",options:X,value:i,onSelect:l},K={label:"Project",options:Y.map(e=>e.name),value:o,onSelect:c};
  return (
    <div className={N("bg-white dark:bg-neutral-950",S,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className={N("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6")}>
          <button ref={D} type="button" aria-label="Open navigation" aria-expanded={k} onClick={()=>{
            z.current=true,_(true)
          }} className={N(W,L,"lg:hidden")}>
            <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <span aria-hidden="true" className={N("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","text-[12px]/[16px] font-[450] tabular-nums","size-6 max-sm:hidden")}>T</span>
          <span className="sr-only">Tideline</span>
          <nav aria-label="Scope" className="flex min-w-0 flex-1 items-center gap-1">
            <el id="scope-organisation" label="Organisation" display={i} sections={[T]} createLabel="Create organisation" open={"organisation"===p} onOpenChange={I("organisation")} className="hidden md:block" triggerMaxWidth="max-w-[9rem]" />
            <span aria-hidden="true" className={N(B,"hidden md:inline")}>/</span>
            <el id="scope-project" label="Project" display={o} sections={[K]} createLabel="Create project" open={"project"===p} onOpenChange={I("project")} className="hidden md:block" triggerMaxWidth="max-w-[9rem]" />
            <el id="scope-overflow" label="Organisation and project" sections={[T,K]} open={"overflow"===p} onOpenChange={I("overflow")} className="md:hidden" />
            <span aria-hidden="true" className={B}>/</span>
            <el id="scope-environment" label="Environment" display={u} sections={[{label:"Environment",options:Z,value:u,onSelect:d}]} createLabel="Create environment" open={"environment"===p} onOpenChange={I("environment")} triggerMaxWidth="max-w-[7rem]" />
          </nav>
          <eo regions={M} degradedRegion={F} open={"status"===p} onOpenChange={I("status")} />
        </header>
        <div className={N("bg-neutral-50 dark:bg-neutral-950","flex min-h-0 flex-1")}>
          <aside className={N("border-r border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","hidden w-64 shrink-0 flex-col lg:flex")}>
            <ec idPrefix="sidebar" dataOpen={b} onDataToggle={()=>h(e=>!e)} announcement={f} onDismissAnnouncement={R} />
          </aside>
          <div className="flex min-w-0 flex-1 p-2">
            <main className={N(H,"min-w-0 flex-1")}>
              <div className="flex shrink-0 items-center gap-3 px-4 py-4 sm:px-6">
                <h1 id="databases" className={N("text-[20px]/[24px] font-[450] tracking-[-0.015em]","truncate")}>Databases</h1>
                <span className="shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{O.length}</span>
                <button type="button" aria-label="Create database" className={N("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",$,"ml-auto")}>
                  <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                  <span className="sm:hidden">Create</span>
                  <span className="hidden sm:inline">Create database</span>
                </button>
              </div>
              <div className="relative min-h-0 flex-1">
                <div ref={e} onScroll={t} className="h-full overflow-y-auto"><eu rows={O} slug={P} /></div>
                <div aria-hidden="true" className={N("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",a.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={N("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",a.end?"opacity-100":"opacity-0")} />
              </div>
            </main>
          </div>
        </div>
        {k&&<div className="lg:hidden">
          <button type="button" aria-label="Close navigation overlay" tabIndex={-1} onClick={E} className={N("bg-neutral-900/25 dark:bg-neutral-950/60",U,"absolute inset-0 z-30 cursor-pointer",w?"opacity-100":"opacity-0")} />
          <aside ref={C} role="dialog" aria-modal="true" aria-label="Navigation" className={N("flex h-full min-h-0 flex-col bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900",U,"absolute inset-y-0 left-0 z-40 w-72 max-w-[85%]",w?"opacity-100":"opacity-0")}>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
              <ec idPrefix="drawer" dataOpen={b} onDataToggle={()=>h(e=>!e)} announcement={f} onDismissAnnouncement={R} onClose={E} />
            </div>
          </aside>
        </div>}
      </div>
  );
}


export default ed;
