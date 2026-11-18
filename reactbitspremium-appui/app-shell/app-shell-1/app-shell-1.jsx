/**
 * React Bits Pro — Application UI (app-shell-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_65174 = [["path",{d:"M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_44647 = [["path",{d:"M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 15.5V21.5M21 18.5L15 18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11",cy:"6.5",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_96022 = [["path",{d:"M7.99978 3.5H6.60021C4.43183 3.5 3.34764 3.5 2.67399 4.17362C2.00034 4.84724 2.00029 5.93144 2.00021 8.09982L2 13.3998C1.99992 15.5684 1.99987 16.6526 2.67353 17.3263C3.34719 18 4.43146 18 6.6 18H8.95042C10.4329 18 11.7092 19.0464 11.9999 20.5V5.5C11.0556 4.24097 9.99989 3.5 7.99978 3.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.0001 3.5H17.3997C19.5681 3.5 20.6523 3.5 21.3259 4.17362C21.9996 4.84724 21.9996 5.93144 21.9997 8.09982L21.9999 13.3998C22 15.5684 22 16.6526 21.3264 17.3263C20.6527 18 19.5684 18 17.3999 18H15.0495C13.567 18 12.2907 19.0464 12 20.5V5.5C12.9443 4.24097 14 3.5 16.0001 3.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_80071 = [["path",{d:"M15 9V15H9V9H15Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18V15Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9 15.002H6C4.34315 15.002 3 16.3451 3 18.002C3 19.6588 4.34315 21.002 6 21.002C7.65685 21.002 9 19.6588 9 18.002V15.002Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 9L15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9H15Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M9 9V6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9H9Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_83331 = [["path",{d:"M18 18C18 18.4644 18 18.6965 17.978 18.8918C17.7952 20.5145 16.5145 21.7952 14.8919 21.978C14.6965 22 14.4644 22 14 22H11C7.70017 22 6.05025 22 5.02513 20.9749C4 19.9498 4 18.2998 4 15L4.00001 8.99998C4.00001 5.70016 4.00003 4.05024 5.02514 3.02512C6.05027 2 7.70018 2 11 2H14C14.4644 2 14.6965 2 14.8919 2.02201C16.5145 2.20483 17.7952 3.48547 17.978 5.10816C18 5.30347 18 5.53565 18 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.07612 11.1183C8 11.3021 8 11.535 8 12.001C8 12.4669 8 12.6999 8.07612 12.8837C8.17761 13.1287 8.37229 13.3234 8.61732 13.4249C8.80109 13.501 9.03406 13.501 9.5 13.501H14.5C14.5002 15.2503 14.511 16.1299 15.0623 16.3858C15.0829 16.3954 15.1037 16.4042 15.1249 16.4124C15.7045 16.6353 16.3999 16.0139 17.7907 14.7711C19.2576 13.4602 19.9912 12.7851 20 11.957C19.9912 11.1289 19.2576 10.4538 17.7907 9.14301C16.3999 7.90018 15.7045 7.27876 15.1249 7.50171C15.1037 7.50985 15.0829 7.51869 15.0623 7.52822C14.5018 7.78844 14.5 8.69318 14.5 10.501H9.5C9.03406 10.501 8.80109 10.501 8.61732 10.5771C8.37229 10.6786 8.17761 10.8733 8.07612 11.1183Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_19809 = [["path",{d:"M3.88884 9.66294C4.39329 10 5.09552 10 6.49998 10C7.90445 10 8.60668 10 9.11113 9.66294C9.32951 9.51702 9.51701 9.32952 9.66292 9.11114C9.99998 8.60669 9.99998 7.90446 9.99998 6.5C9.99998 5.09554 9.99998 4.39331 9.66292 3.88886C9.51701 3.67048 9.32951 3.48298 9.11113 3.33706C8.60668 3 7.90445 3 6.49998 3C5.09552 3 4.39329 3 3.88884 3.33706C3.67046 3.48298 3.48296 3.67048 3.33705 3.88886C2.99998 4.39331 2.99998 5.09554 2.99998 6.5C2.99998 7.90446 2.99998 8.60669 3.33705 9.11114C3.48296 9.32952 3.67046 9.51702 3.88884 9.66294Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.8888 9.66294C15.3933 10 16.0955 10 17.5 10C18.9044 10 19.6067 10 20.1111 9.66294C20.3295 9.51702 20.517 9.32952 20.6629 9.11114C21 8.60669 21 7.90446 21 6.5C21 5.09554 21 4.39331 20.6629 3.88886C20.517 3.67048 20.3295 3.48298 20.1111 3.33706C19.6067 3 18.9044 3 17.5 3C16.0955 3 15.3933 3 14.8888 3.33706C14.6705 3.48298 14.483 3.67048 14.337 3.88886C14 4.39331 14 5.09554 14 6.5C14 7.90446 14 8.60669 14.337 9.11114C14.483 9.32952 14.6705 9.51702 14.8888 9.66294Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3.88884 20.6629C4.39329 21 5.09552 21 6.49998 21C7.90445 21 8.60668 21 9.11113 20.6629C9.32951 20.517 9.51701 20.3295 9.66292 20.1111C9.99998 19.6067 9.99998 18.9045 9.99998 17.5C9.99998 16.0955 9.99998 15.3933 9.66292 14.8889C9.51701 14.6705 9.32951 14.483 9.11113 14.3371C8.60668 14 7.90445 14 6.49998 14C5.09552 14 4.39329 14 3.88884 14.3371C3.67046 14.483 3.48296 14.6705 3.33705 14.8889C2.99998 15.3933 2.99998 16.0955 2.99998 17.5C2.99998 18.9045 2.99998 19.6067 3.33705 20.1111C3.48296 20.3295 3.67046 20.517 3.88884 20.6629Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.8888 20.6629C15.3933 21 16.0955 21 17.5 21C18.9044 21 19.6067 21 20.1111 20.6629C20.3295 20.517 20.517 20.3295 20.6629 20.1111C21 19.6067 21 18.9045 21 17.5C21 16.0955 21 15.3933 20.6629 14.8889C20.517 14.6705 20.3295 14.483 20.1111 14.3371C19.6067 14 18.9044 14 17.5 14C16.0955 14 15.3933 14 14.8888 14.3371C14.6705 14.483 14.483 14.6705 14.337 14.8889C14 15.3933 14 16.0955 14 17.5C14 18.9045 14 19.6067 14.337 20.1111C14.483 20.3295 14.6705 20.517 14.8888 20.6629Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_68142 = [["path",{d:"M19.5 17.5C19.5 18.8807 18.3807 20 17 20C15.6193 20 14.5 18.8807 14.5 17.5C14.5 16.1193 15.6193 15 17 15C18.3807 15 19.5 16.1193 19.5 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 17.5C9.5 18.8807 8.38071 20 7 20C5.61929 20 4.5 18.8807 4.5 17.5C4.5 16.1193 5.61929 15 7 15C8.38071 15 9.5 16.1193 9.5 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 17.5H9.5M19.5 17.5H20.2632C20.4831 17.5 20.5931 17.5 20.6855 17.4885C21.3669 17.4036 21.9036 16.8669 21.9885 16.1855C22 16.0931 22 15.9831 22 15.7632V13C22 9.41015 19.0899 6.5 15.5 6.5M2 4H12C13.4142 4 14.1213 4 14.5607 4.43934C15 4.87868 15 5.58579 15 7V15.5M2 12.75V15C2 15.9346 2 16.4019 2.20096 16.75C2.33261 16.978 2.52197 17.1674 2.75 17.299C3.09808 17.5 3.56538 17.5 4.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 7H8M2 10H6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_18583 = [["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 12V15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 18.5H12M12.25 18.5C12.25 18.6381 12.1381 18.75 12 18.75C11.8619 18.75 11.75 18.6381 11.75 18.5C11.75 18.3619 11.8619 18.25 12 18.25C12.1381 18.25 12.25 18.3619 12.25 18.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_17601 = [["path",{d:"M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 9L11 9M8 13L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 22L22 22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let j = (...e)=>e.filter(Boolean).join(" ");

function N(){
  let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
    let r=e.current;
    if(!r)return;
    let{scrollTop:t,scrollHeight:n,clientHeight:s}=r;
    a({start:t>1,end:Math.ceil(t+s)<n-1})
  }, []);
  return useEffect(()=>{
    t();
    let r=e.current,a=r?.ownerDocument.defaultView;
    if(!r||!a?.ResizeObserver)return;
    let n=new a.ResizeObserver(t);
    return observe(r),()=>disconnect();
  }, [t]),{ref:e,edges:r,onScroll:t};
}

let y = "text-neutral-900 dark:text-neutral-100",
  A = "text-neutral-900/80 dark:text-neutral-100/80",
  S = "text-neutral-900/66 dark:text-neutral-100/66",
  z = "text-[14px]/[16px] font-[450]",
  D = "text-[12px]/[16px] font-normal tabular-nums",
  C = "font-mono text-[12px]/[16px] tabular-nums",
  E = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  H = "size-8 rounded-[var(--rb-r-sm,6px)]",
  I = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  P = "transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none",
  W = "border-r border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900",
  F = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  O = "px-2 pt-4 pb-1 text-[12px]/[16px] font-normal tabular-nums text-neutral-900/66 dark:text-neutral-100/66",
  $ = "rounded-[var(--rb-r-sm,6px)] hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100",
  L = "text-neutral-900/66 dark:text-neutral-100/66 select-none",
  R = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  M = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  T = "text-right tabular-nums",
  q = [{label:"In transit",current:true},{label:"Awaiting pickup",current:false},{label:"Delivered",current:false},{label:"Cancelled",current:false}],
  B = [{name:"Newark distribution centre",needsAttention:false},{name:"Memphis sortation hub",needsAttention:false},{name:"Fresno cross-dock",needsAttention:true},{name:"Laredo border yard",needsAttention:false},{name:"Rotterdam gateway",needsAttention:false}],
  K = [{label:"Workspace settings",icon:Icon_65174},{label:"Invite teammate",icon:Icon_44647},{label:"Documentation",icon:Icon_96022}],
  V = [{label:"Account settings",icon:Icon_65174},{label:"Notification preferences",icon:Icon_13473},{label:"Keyboard shortcuts",icon:Icon_80071},{label:"Sign out",icon:Icon_83331}],
  U = [{label:"On-time delivery",value:"94.2%",delta:"+1.8 pts vs last week"},{label:"Shipments in transit",value:"1,284",delta:"+96 vs last week"},{label:"Average transit time",value:"3.4 days",delta:"−0.2 days vs last week"},{label:"Open claims",value:"6",delta:"+2 vs last week"}],
  J = [{reference:"SHP-40912",consignee:"Brightwater Municipal Utilities District",carrier:"Ardent Freightways",status:"In transit",eta:"Aug 11",value:"$42,180"},{reference:"SHP-40908",consignee:"Kettleworth Foods",carrier:"Novara Lines",status:"In transit",eta:"Aug 11",value:"$8,940"},{reference:"SHP-40901",consignee:"Halverson Marine Supply",carrier:"Ardent Freightways",status:"Held",eta:"Aug 13",value:"$17,620"},{reference:"SHP-40897",consignee:"Pinegrove Cabinetry",carrier:null,status:"Awaiting pickup",eta:"Aug 12",value:"$3,410"},{reference:"SHP-40892",consignee:"Corsair Metalworks",carrier:"Trellis Logistics",status:"In transit",eta:"Aug 12",value:"$26,750"},{reference:"SHP-40886",consignee:"Delacroix Paper",carrier:"Novara Lines",status:"In transit",eta:"Aug 13",value:"$6,205"},{reference:"SHP-40881",consignee:"Oakhaven Brewing",carrier:"Trellis Logistics",status:"Delivered",eta:"Aug 8",value:"$11,340"},{reference:"SHP-40877",consignee:"Stellamar Seafood",carrier:"Ardent Freightways",status:"In transit",eta:"Aug 14",value:"$19,880"},{reference:"SHP-40870",consignee:"Vandergrift Tooling",carrier:"Meridian Carriers",status:"Awaiting pickup",eta:"Aug 14",value:"$4,960"},{reference:"SHP-40864",consignee:"Cloudbank Textiles",carrier:"Novara Lines",status:"In transit",eta:"Aug 15",value:"$9,275"},{reference:"SHP-40859",consignee:"Rowanberry Organics",carrier:"Trellis Logistics",status:"Delivered",eta:"Aug 9",value:"$2,830"},{reference:"SHP-40851",consignee:"Ferris Point Aggregates",carrier:"Meridian Carriers",status:"In transit",eta:"Aug 15",value:"$31,470"},{reference:"SHP-40846",consignee:"Windhollow Instruments",carrier:"Ardent Freightways",status:"In transit",eta:"Aug 16",value:"$7,690"},{reference:"SHP-40840",consignee:"Juniper Hollow Distillery",carrier:"Meridian Carriers",status:"In transit",eta:"Aug 16",value:"$5,120"}],
  G = {"In transit":"text-neutral-900 dark:text-neutral-100","Awaiting pickup":"text-neutral-900 dark:text-neutral-100",Delivered:"text-neutral-900/80 dark:text-neutral-100/80",Held:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

function Q({status:e}){
  return (
    <span className={j("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",G[e],"whitespace-nowrap")}>
        {"In transit"===e&&<span className="flex h-lh shrink-0 items-center">
          <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
        </span>}
        {e}
      </span>
  );
}

function X({onClose:e}){
  let{ref:r,edges:a,onScroll:l}=N(),[i,c]=useState(true),[o,d]=useState(false),[u,g]=useState(false),_=useRef(null),w=useRef(null),A=useRef(null),C=useId(),I=e=>{
    d(false),g(false),e&&w.current?.focus({preventScroll:true})
  };
  return useEffect(()=>{
    if(!o)return;
    let e=_.current,r=e?.ownerDocument??document,a=requestAnimationFrame(()=>{
      g(true),A.current?.querySelector('[role="menuitem"]')?.focus({preventScroll:true})
    }),t=r=>{
      e?.contains(r.target)||I(false)
    },n=e=>{
      let a=Array.from(A.current?.querySelectorAll('[role="menuitem"]')??[]);
      if(0===a.length)return;
      let t=a.indexOf(r.activeElement);
      "Escape"===e.key?(e.preventDefault(),I(true)):"ArrowDown"===e.key?(e.preventDefault(),a[t<0||t===a.length-1?0:t+1]?.focus({preventScroll:true})):"ArrowUp"===e.key?(e.preventDefault(),a[t<=0?a.length-1:t-1]?.focus({preventScroll:true})):"Home"===e.key?(e.preventDefault(),a[0]?.focus({preventScroll:true})):"End"===e.key?(e.preventDefault(),a[a.length-1]?.focus({preventScroll:true})):"Tab"===e.key&&I(false)
    };
    return r.addEventListener("pointerdown",t),r.addEventListener("keydown",n),()=>{
      cancelAnimationFrame(a),r.removeEventListener("pointerdown",t),r.removeEventListener("keydown",n)
    };
  }, [o]),<>
    <div className="flex h-14 shrink-0 items-center gap-2.5 pl-3 pr-2">
      <span aria-hidden="true" className={j("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","size-8",z)}>O</span>
      <div className="min-w-0 flex-1">
        <p className={j(z,"truncate")}>Overland</p>
        <p className={j(D,S,"truncate")}>Freight operations</p>
      </div>
      {e?<button type="button" aria-label="Close navigation" onClick={e} className={j(E,H)}>
        <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
      </button>:<button type="button" aria-label="Workspace options" className={j(E,H)}>
        <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
      </button>}
    </div>
    <div className="relative min-h-0 flex-1">
      <nav ref={r} onScroll={l} aria-label="Primary" className="h-full overflow-y-auto px-2 pb-3">
        <div>
          <p className={O}>Operations</p>
          <ul className="space-y-0.5">
            <li>
              <a href="#dispatch-board" className={F}>
                <HugeiconsIcon icon={Icon_19809} size={16} strokeWidth={1.8} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">Dispatch board</span>
              </a>
            </li>
            <li>
              <button type="button" aria-expanded={i} aria-controls={C} onClick={()=>c(e=>!e)} className={j(F,"group")}>
                <HugeiconsIcon icon={Icon_68142} size={16} strokeWidth={1.8} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-left">Shipments</span>
                <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
              </button>
              <div id={C} className={j("grid",i?"grid-rows-[1fr]":"grid-rows-[0fr]")}>
                <ul className={j("-mx-1 min-h-0 space-y-0.5 overflow-hidden px-1",i&&"pt-0.5")}>
                  {q.map(e=>(
                    <li key={e.label} className={i?undefined:"invisible"}>
                                        <a href="#shipments" tabIndex={i?undefined:-1} aria-current={e.current?"page":undefined} className={j(F,"pl-8")}><span className="min-w-0 flex-1 truncate">{e.label}</span></a>
                                      </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <a href="#claims" className={F}>
                <HugeiconsIcon icon={Icon_18583} size={16} strokeWidth={1.8} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">Claims</span>
                <span className={j("ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","shrink-0")}>6</span>
              </a>
            </li>
            <li>
              <a href="#carriers" className={F}>
                <HugeiconsIcon icon={Icon_17601} size={16} strokeWidth={1.8} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">Carriers</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className={O}>Facilities</p>
          <ul className="space-y-0.5">
            {B.map(e=>(
              <li key={e.name}>
                            <a href="#facilities" className={j(F,"pl-8")}>
                              <span className="min-w-0 flex-1 truncate">{e.name}</span>
                              {e.needsAttention&&<span className={j("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums","text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","shrink-0")}>
                                Warning
                                <span className="sr-only">, nearing capacity</span>
                              </span>}
                            </a>
                          </li>
            ))}
          </ul>
        </div>
      </nav>
      <div aria-hidden="true" className={j("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",a.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={j("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",a.end?"opacity-100":"opacity-0")} />
    </div>
    <div ref={_} className={j("border-t border-neutral-900/8 dark:border-neutral-100/8","relative shrink-0 space-y-0.5 p-2")}>
      {K.map(({label:e,icon:r})=>(
        <a key={e} href="#workspace" className={F}>
                <HugeiconsIcon icon={r} size={16} strokeWidth={1.8} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">{e}</span>
              </a>
      ))}
      <button ref={w} type="button" aria-haspopup="menu" aria-expanded={o} onClick={()=>o?I(false):d(true)} className={j("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-11 gap-2 rounded-[var(--rb-r-sm,6px)] px-5 text-[16px]/[20px] font-[450] tracking-[-0.01em]","mt-1 w-full gap-2.5 pr-2 pl-1 text-left")}>
        <span aria-hidden="true" className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
          <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">DO</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className={j(z,y,"block truncate")}>Devon Okafor</span>
          <span className={j(D,S,"block truncate")}>Dispatch lead</span>
        </span>
        <HugeiconsIcon icon={Icon_20148} size={16} strokeWidth={1.8} aria-hidden="true" className={j("shrink-0",o&&"rotate-180")} />
      </button>
      {o&&<div ref={A} role="menu" aria-label="Account" className={j("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",P,"absolute bottom-[calc(100%-0.25rem)] left-2 right-2 z-30",u?"opacity-100":"opacity-0")}>
        {V.map(({label:e,icon:r})=>(
          <button key={e} type="button" role="menuitem" onClick={()=>I(true)} className="relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40">
                    <HugeiconsIcon icon={r} size={16} strokeWidth={1.8} aria-hidden="true" />
                    <span className="truncate">{e}</span>
                  </button>
        ))}
      </div>}
    </div>
  </>;
}

function Y(){
  let[e,r]=useState(false),[a,l]=useState(false),{ref:i,edges:c,onScroll:o}=N(),d=useRef(false),u=useRef(null),x=useRef(null);
  useEffect(()=>{
    let e=requestAnimationFrame(()=>{
      (u.current?.ownerDocument.defaultView??window).matchMedia("(max-width: 1023px)").matches&&r(true)
    });
    return ()=>cancelAnimationFrame(e);
  }, []),useEffect(()=>{
    if(!e)return;
    let a=x.current,t=a?.ownerDocument??document,n=requestAnimationFrame(()=>l(true)),s=()=>Array.from(a?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    d.current&&(s()[0]?.focus({preventScroll:true}),d.current=false);
    let i=e=>{
      if("Escape"===e.key){
        r(false),l(false),u.current?.focus({preventScroll:true});
        return
      }
      if("Tab"!==e.key)return;
      let a=s(),n=a[0],i=a[a.length-1];
      n&&i&&(e.shiftKey&&t.activeElement===n?(e.preventDefault(),i.focus({preventScroll:true})):e.shiftKey||t.activeElement!==i||(e.preventDefault(),focus({preventScroll:true})))
    };
    return t.addEventListener("keydown",i),()=>{
      cancelAnimationFrame(n),t.removeEventListener("keydown",i)
    };
  }, [e]);
  let h=()=>{
    r(false),l(false),u.current?.focus({preventScroll:true})
  };
  return (
    <div className={j("bg-white dark:bg-neutral-950",y,"relative flex h-full min-h-[720px] w-full overflow-hidden")}>
        <aside className={j(W,"hidden w-64 shrink-0 flex-col lg:flex")}><X /></aside>
        <div className={j("bg-neutral-50 dark:bg-neutral-950","flex min-w-0 flex-1 flex-col")}>
          <header className={j("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <button ref={u} type="button" aria-label="Open navigation" aria-expanded={e} onClick={()=>{
              d.current=true,r(true)
            }} className={j(E,H,"lg:hidden")}>
              <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
              <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">
                <li className="hidden items-center gap-1.5 sm:flex">
                  <a href="#operations" className={$}>Operations</a>
                  <span aria-hidden="true" className={L}>/</span>
                </li>
                <li className="flex shrink-0 items-center gap-1.5">
                  <a href="#shipments" className={$}>Shipments</a>
                  <span aria-hidden="true" className={L}>/</span>
                </li>
                <li className="min-w-0">
                  <span aria-current="page" className={j("text-neutral-900 dark:text-neutral-100","block truncate")}>In transit</span>
                </li>
              </ol>
            </nav>
            <label className="relative hidden w-56 shrink-0 md:block">
              <span className="sr-only">Search shipments</span>
              <span className={j("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                  <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <input type="search" placeholder="Search shipments" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
              </span>
            </label>
            <button type="button" aria-label="Book shipment" className={j("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
              <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
              <span className="hidden sm:inline">Book shipment</span>
            </button>
          </header>
          <div className="flex min-h-0 flex-1 flex-col p-2">
            <div className={j(I,"min-h-0 flex-1")}>
              <main ref={i} onScroll={o} className="min-h-0 flex-1 overflow-y-auto">
                <div className="p-4">
                  <div className="@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900">
                    <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
                      {U.map(e=>(
                        <div key={e.label} className="flex min-w-0 flex-col gap-2 px-4 py-3">
                                            <p className="text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">{e.label}</p>
                                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[32px]/[36px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.value}</p>
                                            <p className={j("text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66","mt-auto")}>{e.delta}</p>
                                          </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex h-9 items-center justify-between gap-3 px-4">
                  <h2 className={j(z,"min-w-0 truncate")}>Active shipments</h2>
                  <span className={j(D,S,"shrink-0")}>14 of 1,284</span>
                </div>
                <table className={j("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","hidden table-fixed md:table")}>
                  <caption className="sr-only">Shipments currently in transit</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={j(R,"h-9 w-[11%]")}>Reference</th>
                      <th scope="col" className={j(R,"h-9 w-[22%]")}>Consignee</th>
                      <th scope="col" className={j(R,"hidden h-9 w-[24%] lg:table-cell")}>Carrier</th>
                      <th scope="col" className={j(R,"h-9 w-[16%]")}>Status</th>
                      <th scope="col" className={j(R,T,"h-9 w-[11%]")}>ETA</th>
                      <th scope="col" className={j(R,T,"h-9 w-[16%]")}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {J.map(e=>(
                      <tr key={e.reference} className={j("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-11")}>
                                        <td className={M}><span className={j(C,A)}>{e.reference}</span></td>
                                        <td className={M}><span className={j(z,"block truncate")}>{e.consignee}</span></td>
                                        <td className={j(M,"hidden lg:table-cell")}>{e.carrier&&<span className={j(A,"block truncate")}>{e.carrier}</span>}</td>
                                        <td className={M}><Q status={e.status} /></td>
                                        <td className={j(M,T)}><span className={A}>{e.eta}</span></td>
                                        <td className={j(M,T)}>{e.value}</td>
                                      </tr>
                    ))}
                  </tbody>
                </table>
                <ul className="space-y-2 px-4 pb-4 md:hidden">
                  {J.map(e=>(
                    <li key={e.reference} className={j(I,"p-4")}>
                                    <div className="flex items-start justify-between gap-3">
                                      <p className={j(z,"min-w-0 flex-1 truncate")}>{e.consignee}</p>
                                      <span className={j("text-[13px]/[18px] font-normal","shrink-0 tabular-nums")}>{e.value}</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between gap-3">
                                      <Q status={e.status} />
                                      <span className={j(C,S,"shrink-0")}>{e.reference}</span>
                                    </div>
                                    <div className="mt-1 flex items-center justify-between gap-3">
                                      <span className={j(D,S,"min-w-0 truncate")}>{e.carrier}</span>
                                      <span className={j(D,S,"shrink-0")}>{e.eta}</span>
                                    </div>
                                  </li>
                  ))}
                </ul>
              </main>
              <div aria-hidden="true" className={j("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",c.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={j("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",c.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
        {e&&<div className="lg:hidden">
          <button type="button" aria-label="Close navigation overlay" onClick={h} tabIndex={-1} className={j("bg-neutral-900/25 dark:bg-neutral-950/60",P,"absolute inset-0 z-30 cursor-pointer",a?"opacity-100":"opacity-0")} />
          <aside ref={x} role="dialog" aria-modal="true" aria-label="Navigation" className={j(W,"shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",P,"absolute inset-y-0 left-0 z-40 flex w-72 max-w-[85%] flex-col",a?"opacity-100":"opacity-0")}><X onClose={h} /></aside>
        </div>}
      </div>
  );
}


export default Y;
