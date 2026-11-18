/**
 * React Bits Pro — Application UI (app-shell-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, ownerDocument, querySelectorAll, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
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
const Icon_22830 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_2605 = [["path",{d:"M15.6 8.40033V12.9003C15.6 14.3915 16.8088 15.6003 18.3 15.6003C19.7912 15.6003 21 14.3915 21 12.9003V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.0265 21 15.8965 20.3302 17.4009 19.2M15.6 12.0003C15.6 13.9886 13.9882 15.6003 12 15.6003C10.0118 15.6003 8.4 13.9886 8.4 12.0003C8.4 10.0121 10.0118 8.40033 12 8.40033C13.9882 8.40033 15.6 10.0121 15.6 12.0003Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_22670 = [["path",{d:"M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_96738 = [["path",{d:"M3.99219 10H11.9922C13.8521 10 14.7821 10 15.5451 10.2044C17.6157 10.7592 19.2329 12.3765 19.7877 14.4471C19.9922 15.2101 19.9922 16.1401 19.9922 18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.99219 6L6.83839 6.87652C4.94092 8.31801 3.99219 9.03875 3.99219 10C3.99219 10.9612 4.94092 11.682 6.83839 13.1235L7.99219 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_12556 = [["path",{d:"M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

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

let D = "font-mono text-[12px]/[16px] tabular-nums";

let R = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let M = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let E = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let W = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let O = "border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let T = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let F = "px-3 pt-5 pb-1.5 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";

let I = "rounded-[calc(var(--rb-r-sm,6px))] transition-[color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:text-neutral-100";

let L = "text-neutral-900/62 dark:text-neutral-100/62 select-none";

let P = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let q = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let H = "text-right tabular-nums";

let $ = [{label:"In transit",current:true},{label:"Awaiting pickup",current:false},{label:"Delivered",current:false},{label:"Cancelled",current:false}];

let B = [{name:"Newark distribution centre",needsAttention:false},{name:"Memphis sortation hub",needsAttention:false},{name:"Fresno cross-dock",needsAttention:true},{name:"Laredo border yard",needsAttention:false},{name:"Rotterdam gateway",needsAttention:false}];

let K = [{label:"Workspace settings",icon:Icon_65174},{label:"Invite teammate",icon:Icon_44647},{label:"Documentation",icon:Icon_96022}];

let U = [{label:"Account settings",icon:Icon_65174},{label:"Notification preferences",icon:Icon_13473},{label:"Keyboard shortcuts",icon:Icon_80071},{label:"Sign out",icon:Icon_83331}];

let V = [{label:"On-time delivery",value:"94.2%",delta:"+1.8 pts vs last week"},{label:"Shipments in transit",value:"1,284",delta:"+96 vs last week"},{label:"Average transit time",value:"3.4 days",delta:"−0.2 days vs last week"},{label:"Open claims",value:"6",delta:"+2 vs last week"}];

let J = [{reference:"SHP-40912",consignee:"Brightwater Municipal Utilities District",carrier:"Ardent Freightways",status:"In transit",eta:"Aug 11",value:"$42,180"},{reference:"SHP-40908",consignee:"Kettleworth Foods",carrier:"Novara Lines",status:"In transit",eta:"Aug 11",value:"$8,940"},{reference:"SHP-40901",consignee:"Halverson Marine Supply",carrier:"Ardent Freightways",status:"Held",eta:"Aug 13",value:"$17,620"},{reference:"SHP-40897",consignee:"Pinegrove Cabinetry",carrier:null,status:"Awaiting pickup",eta:"Aug 12",value:"$3,410"},{reference:"SHP-40892",consignee:"Corsair Metalworks",carrier:"Trellis Logistics",status:"In transit",eta:"Aug 12",value:"$26,750"},{reference:"SHP-40886",consignee:"Delacroix Paper",carrier:"Novara Lines",status:"In transit",eta:"Aug 13",value:"$6,205"},{reference:"SHP-40881",consignee:"Oakhaven Brewing",carrier:"Trellis Logistics",status:"Delivered",eta:"Aug 8",value:"$11,340"},{reference:"SHP-40877",consignee:"Stellamar Seafood",carrier:"Ardent Freightways",status:"In transit",eta:"Aug 14",value:"$19,880"},{reference:"SHP-40870",consignee:"Vandergrift Tooling",carrier:"Meridian Carriers",status:"Awaiting pickup",eta:"Aug 14",value:"$4,960"},{reference:"SHP-40864",consignee:"Cloudbank Textiles",carrier:"Novara Lines",status:"In transit",eta:"Aug 15",value:"$9,275"},{reference:"SHP-40859",consignee:"Rowanberry Organics",carrier:"Trellis Logistics",status:"Delivered",eta:"Aug 9",value:"$2,830"},{reference:"SHP-40851",consignee:"Ferris Point Aggregates",carrier:"Meridian Carriers",status:"In transit",eta:"Aug 15",value:"$31,470"},{reference:"SHP-40846",consignee:"Windhollow Instruments",carrier:"Ardent Freightways",status:"In transit",eta:"Aug 16",value:"$7,690"},{reference:"SHP-40840",consignee:"Juniper Hollow Distillery",carrier:"Meridian Carriers",status:"In transit",eta:"Aug 16",value:"$5,120"}];

let Q = {"In transit":"text-neutral-900 dark:text-neutral-100","Awaiting pickup":"text-neutral-900 dark:text-neutral-100",Delivered:"text-neutral-900/78 dark:text-neutral-100/78",Held:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

function G({status:e}){
  return (
    <span className={y("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",Q[e],"whitespace-nowrap")}>
        {"In transit"===e&&<span className="flex h-lh shrink-0 items-center">
          <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
        </span>}
        {e}
      </span>
  );
}

function X({onClose:e}){
  let{ref:a,edges:r,onScroll:i}=j(),[o,s]=useState(true),[c,d]=useState(false),[u,v]=useState(false),g=useRef(null),w=useRef(null),A=useRef(null),D=useId(),E=e=>{
    d(false),v(false),e&&w.current?.focus({preventScroll:true})
  };
  return useEffect(()=>{
    if(!c)return;
    let e=g.current,a=e?.ownerDocument??document,r=requestAnimationFrame(()=>{
      v(true),A.current?.querySelector('[role="menuitem"]')?.focus({preventScroll:true})
    }),t=a=>{
      e?.contains(a.target)||E(false)
    },n=e=>{
      let r=Array.from(A.current?.querySelectorAll('[role="menuitem"]')??[]);
      if(0===r.length)return;
      let t=r.indexOf(a.activeElement);
      "Escape"===e.key?(e.preventDefault(),E(true)):"ArrowDown"===e.key?(e.preventDefault(),r[t<0||t===r.length-1?0:t+1]?.focus({preventScroll:true})):"ArrowUp"===e.key?(e.preventDefault(),r[t<=0?r.length-1:t-1]?.focus({preventScroll:true})):"Home"===e.key?(e.preventDefault(),r[0]?.focus({preventScroll:true})):"End"===e.key?(e.preventDefault(),r[r.length-1]?.focus({preventScroll:true})):"Tab"===e.key&&E(false)
    };
    return a.addEventListener("pointerdown",t),a.addEventListener("keydown",n),()=>{
      cancelAnimationFrame(r),a.removeEventListener("pointerdown",t),a.removeEventListener("keydown",n)
    };
  }, [c]),<>
    <div className="flex h-14 shrink-0 items-center gap-2.5 pl-3 pr-2">
      <span aria-hidden="true" className={y("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] select-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black)]","size-8",z)}>O</span>
      <div className="min-w-0 flex-1">
        <p className={y(z,"truncate")}>Overland</p>
        <p className={y(C,S,"truncate")}>Freight operations</p>
      </div>
      {e?<button type="button" aria-label="Close navigation" onClick={e} className={y(R,M)}>
        <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
      </button>:<button type="button" aria-label="Workspace options" className={y(R,M)}>
        <HugeiconsIcon icon={Icon_59649} size={18} strokeWidth={2} aria-hidden="true" />
      </button>}
    </div>
    <div className="relative min-h-0 flex-1">
      <nav ref={a} onScroll={i} aria-label="Primary" className="h-full overflow-y-auto px-2 pb-3">
        <div>
          <p className={F}>Operations</p>
          <ul className="space-y-0.5">
            <li>
              <a href="#dispatch-board" className={T}>
                <HugeiconsIcon icon={Icon_19809} size={18} strokeWidth={2} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">Dispatch board</span>
              </a>
            </li>
            <li>
              <button type="button" aria-expanded={o} aria-controls={D} onClick={()=>s(e=>!e)} className={y(T,"group")}>
                <HugeiconsIcon icon={Icon_68142} size={18} strokeWidth={2} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-left">Shipments</span>
                <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
              </button>
              <div id={D} className={y("grid",o?"grid-rows-[1fr]":"grid-rows-[0fr]")}>
                <ul className={y("-mx-1 min-h-0 space-y-0.5 overflow-hidden px-1",o&&"pt-0.5")}>
                  {$.map(e=>(
                    <li key={e.label} className={o?undefined:"invisible"}>
                                        <a href="#shipments" tabIndex={o?undefined:-1} aria-current={e.current?"page":undefined} className={y(T,"pl-8")}><span className="min-w-0 flex-1 truncate">{e.label}</span></a>
                                      </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <a href="#claims" className={T}>
                <HugeiconsIcon icon={Icon_18583} size={18} strokeWidth={2} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">Claims</span>
                <span className={y("ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","shrink-0")}>6</span>
              </a>
            </li>
            <li>
              <a href="#carriers" className={T}>
                <HugeiconsIcon icon={Icon_17601} size={18} strokeWidth={2} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">Carriers</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className={F}>Facilities</p>
          <ul className="space-y-0.5">
            {B.map(e=>(
              <li key={e.name}>
                            <a href="#facilities" className={y(T,"pl-8")}>
                              <span className="min-w-0 flex-1 truncate">{e.name}</span>
                              {e.needsAttention&&<span className={y("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums","text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","shrink-0")}>
                                Warning
                                <span className="sr-only">, nearing capacity</span>
                              </span>}
                            </a>
                          </li>
            ))}
          </ul>
        </div>
      </nav>
      <div aria-hidden="true" className={y("bg-linear-to-b from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={y("bg-linear-to-t from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
    </div>
    <div ref={g} className={y("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","relative shrink-0 space-y-0.5 p-2")}>
      {K.map(({label:e,icon:a})=>(
        <a key={e} href="#workspace" className={T}>
                <HugeiconsIcon icon={a} size={18} strokeWidth={2} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">{e}</span>
              </a>
      ))}
      <button ref={w} type="button" aria-haspopup="menu" aria-expanded={c} onClick={()=>c?E(false):d(true)} className={y("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900/78 dark:text-neutral-100/78 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] hover:not-disabled:text-neutral-900 active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:hover:not-disabled:bg-neutral-100/8 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:bg-neutral-100/12 dark:aria-expanded:bg-neutral-100/8 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-12 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-6 text-[16px]/[20px] font-extrabold","mt-1 w-full gap-2.5 pr-2 pl-1 text-left")}>
        <span aria-hidden="true" className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
          <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">DO</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className={y(z,N,"block truncate")}>Devon Okafor</span>
          <span className={y(C,S,"block truncate")}>Dispatch lead</span>
        </span>
        <HugeiconsIcon icon={Icon_20148} size={18} strokeWidth={2} aria-hidden="true" className={y("shrink-0",c&&"rotate-180")} />
      </button>
      {c&&<div ref={A} role="menu" aria-label="Account" className={y("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",W,"absolute bottom-[calc(100%-0.25rem)] left-2 right-2 z-30",u?"opacity-100":"opacity-0")}>
        {U.map(({label:e,icon:a})=>(
          <button key={e} type="button" role="menuitem" onClick={()=>E(true)} className="relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40">
                    <HugeiconsIcon icon={a} size={18} strokeWidth={2} aria-hidden="true" />
                    <span className="truncate">{e}</span>
                  </button>
        ))}
      </div>}
    </div>
  </>;
}

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

let ra = (...e)=>e.filter(Boolean).join(" ");

function rr(){
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

let rt = "bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70";

let rn = "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] select-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black)]";

let rl = "text-neutral-900 dark:text-neutral-100";

let ri = "text-neutral-900/78 dark:text-neutral-100/78";

let ro = "text-neutral-900/62 dark:text-neutral-100/62";

let rs = "text-[15px]/[20px] font-bold";

let rc = "text-[14px]/[20px] font-medium";

let rd = "text-[13px]/[16px] font-semibold tabular-nums";

let ru = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let r_ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let rx = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let rb = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let rp = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none";

let rh = "flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]";

let rm = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let rk = "relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16";

let rf = "flex min-w-0 flex-1 flex-col gap-0.5";

let rv = "pointer-events-none inline-flex min-h-7 w-fit max-w-64 items-center gap-2 rounded-[calc(var(--rb-r-lg,10px))] bg-neutral-900 px-3 py-1 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900";

let rg = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let rw = "border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let ry = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let rj = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]";

let rN = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]";

let rA = [{id:"inbox",label:"Inbox",icon:Icon_22830},{id:"mentions",label:"Mentions",icon:Icon_2605,unread:true},{id:"snoozed",label:"Snoozed",icon:Icon_29635},{id:"sent",label:"Sent",icon:Icon_55410},{id:"archive",label:"Archive",icon:Icon_22670}];

let rS = ["All","Unread","Assigned","Escalated"];

let rz = [{id:"c-4821",name:"Priya Raghunathan",email:"priya.raghunathan@lumenfield-logistics.example",subject:"Bulk import of 12,400 supplier records keeps failing at the validation step after the March schema change",preview:"We ran the import again last night and it stopped at 3,180 records. Every rejected row has a value in secondary_contact.",time:"09:24",received:"14 Mar 2025, 09:24",unread:true,assigned:true,escalated:false,body:["We ran the March supplier import last night and it stopped at 3,180 of 12,400 records. The job never fails outright, it sits at the validation step until the two-hour timeout and then reports a partial write.","Every record it rejects has a value in the secondary_contact column. The same rows imported cleanly on 6 March, so I think this is related to the schema change you shipped on the 11th.","I have attached the export we are using, trimmed to the first 500 rows so you can reproduce it without waiting for the full file. The shape is unchanged from the one we agreed at onboarding.","Two questions. Is secondary_contact still accepted, and if it has moved, is there a mapping we should apply before the next run? We have another 9,000 records queued behind this one.","For context on urgency: the queued records cover the four new depots we open on 24 March, and none of those suppliers can be dispatched against until they exist in Portway. Our planners are currently holding the lane assignments in a spreadsheet.","If the fix has to wait for a release, a temporary import path that skips validation on that one column would unblock us. We can clean the data afterwards, and I would rather do that than keep the depots on manual entry for another week.","The Rotterdam team needs them in place before Monday, so if a call today is faster than email I can make time from 14:00 onwards."],attachment:{name:"supplier-import-sample-500.csv",size:"2.4 MB"}},{id:"c-4820",name:"Daniel Okonkwo",email:"daniel.okonkwo@brightsea-freight.example",subject:"Rate card for the Rotterdam lane is showing last quarter's prices",preview:"Our dispatchers are quoting from a card that expired on 28 February. Nothing changed on our side, so I suspect the sync.",time:"08:51",received:"14 Mar 2025, 08:51",unread:true,assigned:false,escalated:false,body:["Our dispatchers are quoting the Rotterdam to Duisburg lane from a rate card that expired on 28 February. Nothing changed on our side, so I suspect the nightly sync is not picking up the new card.","The customer-facing quote tool shows the correct prices, which is the confusing part. It is only the dispatch board that is behind.","We can work around it for a day or two by quoting manually, but I would rather not have twelve people copying numbers out of a spreadsheet."]},{id:"c-4819",name:"Marta Lindqvist",email:"m.lindqvist@nordkust.example",subject:"Two drivers cannot sign in after the SSO migration",preview:"Both accounts were created before we moved to Okta. They get sent back to the login screen with no error message.",time:"Yesterday",received:"13 Mar 2025, 16:07",unread:true,assigned:true,escalated:false,body:["Two of our drivers cannot sign in to the mobile app after Tuesday's SSO migration. Both accounts were created before we moved to Okta.","They get sent back to the login screen with no error message, which makes it hard for them to tell us what went wrong. Everyone else on the same team signs in fine.","I have their employee numbers if that helps you find the accounts. Let me know what you need and I will get it to you today."]},{id:"c-4818",name:"Kenji Watanabe",email:"k.watanabe@harborline.example",subject:"Webhook retries are arriving out of order",preview:"We are seeing shipment.updated land before shipment.created for about one delivery in fifty. Our queue handles it, but the ordering guarantee in the docs says this should not happen.",time:"Yesterday",received:"13 Mar 2025, 11:42",unread:false,assigned:false,escalated:false,body:["We are seeing shipment.updated arrive before shipment.created for roughly one delivery in fifty. Our queue tolerates it, but the ordering guarantee in your documentation says this should not happen.","It started around the same time we increased our endpoint timeout from two to five seconds, so it may be on our side. I would like to rule out the retry logic first.","Is there a way to see the delivery attempts for a single event without opening a ticket each time?"]},{id:"c-4817",name:"Aisha Bello",email:"aisha.bello@sahelgroup.example",subject:"Read-only access for our finance team",preview:"Four people in finance need to see invoices and settlement reports without being able to change a shipment.",time:"Mon",received:"11 Mar 2025, 14:15",unread:false,assigned:true,escalated:false,body:["Four people in our finance team need to see invoices and settlement reports without being able to change a shipment or a rate.","The viewer role looks close, but it also hides the settlement export, which is the one thing they actually need.","Is there a way to grant the export on its own, or should we be looking at a custom role?"]},{id:"c-4816",name:"Tom\xe1s Ferreira",email:"tomas.ferreira@atlanticoport.example",subject:"Signed carrier agreement",preview:"",time:"Mon",received:"11 Mar 2025, 09:03",unread:false,assigned:false,escalated:false,body:["Attached is the countersigned carrier agreement for the 2025 season. No changes from the draft you sent on 4 March."],attachment:{name:"carrier-agreement-2025-signed.pdf",size:"812 KB"}},{id:"c-4815",name:"Hannah Weiss",email:"h.weiss@genoa-forwarding.example",subject:"Customs documents missing from the Genoa shipment",preview:"Container GNOA-77412 arrived without the packing list attached in the portal. The paper copy travelled with the driver.",time:"12 Mar",received:"12 Mar 2025, 08:30",unread:false,assigned:false,escalated:false,body:["Container GNOA-77412 arrived without the packing list attached in the portal. The paper copy travelled with the driver, so nothing was held up, but our broker needs the digital version for the file.","The upload shows as complete in the shipment timeline, which is why nobody noticed until the container was already on the water.","Can you check whether the document was stored and simply not linked?"]},{id:"c-4814",name:"Oliver Grant",email:"oliver.grant@meadowbank.example",subject:"Invoice 2025-0418 was charged twice",preview:"Both charges cleared on 10 March for \xa34,280.00. Our bank shows two separate authorisations, not a pending and a capture.",time:"11 Mar",received:"11 Mar 2025, 17:48",unread:false,assigned:false,escalated:false,body:["Invoice 2025-0418 was charged twice. Both charges cleared on 10 March for \xa34,280.00, and our bank shows two separate authorisations rather than a pending and a capture.","I have the reference numbers for both if you need them. A refund of the duplicate would be ideal, but a credit against the April invoice works as well."]},{id:"c-4813",name:"Sofia Marchetti",email:"s.marchetti@viadria.example",subject:"Filter the dispatch board by trailer type",preview:"We run reefers and dry vans out of the same yard and the planners scroll past most of the board to find the right one.",time:"9 Mar",received:"9 Mar 2025, 10:12",unread:false,assigned:false,escalated:false,body:["We run reefers and dry vans out of the same yard, and the planners scroll past most of the board to find the right trailer.","A filter on trailer type would save each of them a few minutes every hour. Saved views would be even better, but the filter alone would be enough.","Not urgent. I wanted to get it in front of you before the next planning cycle."]}];

let rC = [{label:"Mark as unread",icon:Icon_22830},{label:"Snooze until Monday",icon:Icon_29635},{label:"Assign to a teammate",icon:Icon_44647},{label:"Mute this sender",icon:Icon_13473}];

function rD(e,a,r,t,l){
  useEffect(()=>{
    if(!e)return;
    let n=a.current,i=ownerDocument??document,o=()=>Array.from(querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    t.current&&(t.current=false,(l?.current??o()[0])?.focus({preventScroll:true}));
    let s=e=>{
      if("Escape"===e.key){
        e.preventDefault(),r();
        return
      }
      if("Tab"!==e.key)return;
      let a=o(),t=a[0],n=a[a.length-1];
      t&&n&&(e.shiftKey&&i.activeElement===t?(e.preventDefault(),focus({preventScroll:true})):e.shiftKey||i.activeElement!==n||(e.preventDefault(),t.focus({preventScroll:true})))
    };
    return i.addEventListener("keydown",s),()=>i.removeEventListener("keydown",s);
  }, [e,a,r,t,l])
}


export default function app_shell_5__Sorbet__Component(){
  let[e,a]=useState("inbox"),[r,i]=useState("All"),[o,s]=useState(""),[c,d]=useState(rz[0].id),[u,b]=useState([rz[0].id]),[p,h]=useState([]),[m,k]=useState([]),[f,w]=useState(false),[y,j]=useState(false),[N,A]=useState(false),[S,z]=useState(false),[C,D]=useState(false),[R,M]=useState(false),[E,W]=useState(false),O=useRef(null),T=useRef(null),F=useRef(null),I=useRef(null),L=useRef(null),P=useRef(null),q=useRef(null),H=useRef(null),$=useRef(null),{ref:B,edges:K,onScroll:U}=rr(),{ref:V,edges:J,onScroll:Q}=rr(),{ref:G,edges:X,onScroll:Y}=rr(),Z=useRef(null),ee=useRef(false),ea=useRef(false),er=useRef(false),et=useMemo(()=>{
    let e=o.trim().toLowerCase();
    return rz.filter(a=>!(p.includes(a.id)||"Unread"===r&&u.includes(a.id))&&("Assigned"!==r||!!a.assigned)&&("Escalated"!==r||!!a.escalated)&&(!e||a.name.toLowerCase().includes(e)||a.subject.toLowerCase().includes(e)||a.preview.toLowerCase().includes(e)));
  }, [p,r,o,u]),en=rz.find(e=>e.id===c)??rz[0],el="All"!==r||o.trim().length>0,ei=(e,a)=>{
    d(e),b(a=>a.includes(e)?a:[...a,e]),w(true),er.current=a
  };
  useEffect(()=>{
    if(!f||!er.current)return;
    er.current=false;
    let e=T.current;
    e&&null!==e.offsetParent&&e.focus({preventScroll:true})
  }, [f,c]);
  let eo=useCallback(()=>{
    j(false),A(false),F.current?.focus({preventScroll:true})
  }, []),es=useCallback(()=>{
    M(false),W(false),H.current?.focus({preventScroll:true})
  }, []);
  rD(y,I,eo,ee),rD(R,$,es,ea,Z),useEffect(()=>{
    if(!y)return;
    let e=requestAnimationFrame(()=>A(true));
    return ()=>cancelAnimationFrame(e);
  }, [y]),useEffect(()=>{
    if(!R)return;
    let e=requestAnimationFrame(()=>W(true));
    return ()=>cancelAnimationFrame(e);
  }, [R]),useEffect(()=>{
    if(!S)return;
    let e=q.current,a=e?.ownerDocument??document,r=requestAnimationFrame(()=>D(true)),t=e=>{
      z(false),D(false),e&&L.current?.focus({preventScroll:true})
    },n=a=>{
      e?.contains(a.target)||t(false)
    },l=e=>{
      let r=Array.from(P.current?.querySelectorAll('[role="menuitem"]')??[]);
      if(0===r.length)return;
      let n=r.indexOf(a.activeElement);
      "Escape"===e.key?(e.preventDefault(),t(true)):"ArrowDown"===e.key?(e.preventDefault(),r[n<0||n===r.length-1?0:n+1]?.focus({preventScroll:true})):"ArrowUp"===e.key?(e.preventDefault(),r[n<=0?r.length-1:n-1]?.focus({preventScroll:true})):"Home"===e.key?(e.preventDefault(),r[0]?.focus({preventScroll:true})):"End"===e.key&&(e.preventDefault(),r[r.length-1]?.focus({preventScroll:true}))
    };
    return a.addEventListener("pointerdown",n),a.addEventListener("keydown",l),()=>{
      cancelAnimationFrame(r),a.removeEventListener("pointerdown",n),a.removeEventListener("keydown",l)
    };
  }, [S]);
  let ec=m.includes(en.id);
  return (
    <div className={ra("bg-white dark:bg-neutral-950",rl,"relative flex h-full min-h-[720px] w-full overflow-hidden")}>
        <div className={ra(rw,"hidden w-14 shrink-0 flex-col items-center pb-3 lg:flex")}>
          <div className="flex h-14 shrink-0 items-center"><span className={ra(rn,"size-8",rs)}>P</span></div>
          <nav aria-label="Mailboxes">
            <ul className="flex flex-col items-center gap-1">
              {rA.map(({id:r,label:n,icon:i,unread:o})=>{
                let s=r===e;
                return (
                  <li key={r} className="relative">
                                <button type="button" aria-label={n} aria-current={s?"page":undefined} onClick={()=>a(r)} className={ra(ry,"peer relative justify-center")}>
                                  <HugeiconsIcon icon={i} size={18} strokeWidth={2} aria-hidden="true" />
                                  {o&&<span className="sr-only">Unread</span>}
                                </button>
                                <span role="tooltip" className={ra(rv,rg,"absolute left-full top-1/2 z-[70] ml-2 h-7 -translate-y-1/2 whitespace-nowrap opacity-0 peer-hover:opacity-100 peer-focus-visible:opacity-100")}>{n}</span>
                              </li>
                );
              })}
            </ul>
          </nav>
          <div className="relative mt-auto">
            <button type="button" aria-label="Iris Renner, support lead" className={ra(rp,"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","peer size-9 cursor-pointer")}><span className={rh}>IR</span></button>
            <span role="tooltip" className={ra(rv,rg,"absolute bottom-1 left-full z-[70] ml-2 h-7 whitespace-nowrap opacity-0 peer-hover:opacity-100 peer-focus-visible:opacity-100")}>Iris Renner</span>
          </div>
        </div>
        <div className={ra("bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex min-w-0 flex-1 gap-2 p-2")}>
          <section aria-labelledby="app-shell-5-list-heading" className={ra(rm,"w-full lg:w-80 lg:shrink-0 xl:w-96",f?"hidden lg:flex":"flex")}>
            <div className="flex h-14 shrink-0 items-center gap-2 px-3">
              <button ref={F} type="button" aria-label="Open mailboxes" aria-expanded={y} onClick={()=>{
                ee.current=true,j(true)
              }} className={ra(r_,rb,"lg:hidden")}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
              <h2 id="app-shell-5-list-heading" className={rs}>Inbox</h2>
              <span className={ra(rd,ro)}>{et.length}</span>
              <div className="ml-auto flex items-center gap-1">
                <button type="button" aria-label="Sort conversations" className={ra(r_,rb)}>
                  <HugeiconsIcon icon={Icon_68656} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <button type="button" aria-label="Compose a reply" className={ra(r_,rb)}>
                  <HugeiconsIcon icon={Icon_96738} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="relative shrink-0 px-3">
              <label htmlFor="app-shell-5-search" className="sr-only">Search conversations</label>
              <div className={ra("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10")}>
                <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                  <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
                </span>
                <input id="app-shell-5-search" type="search" value={o} onChange={e=>s(e.target.value)} placeholder="Search conversations" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
              </div>
            </div>
            <div role="radiogroup" aria-label="Filter conversations" className={ra("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","mx-3 my-2.5 shrink-0")}>
              {rS.map(e=>{
                let a=e===r;
                return <button key={e} type="button" role="radio" aria-checked={a} tabIndex={a?0:-1} onClick={()=>i(e)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{e}</button>;
              })}
            </div>
            <div className="relative min-h-0 flex-1">
              <div ref={B} onScroll={U} className="h-full overflow-y-auto">
                {0===et.length?<div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <span className="mb-3 flex h-10 w-10 items-center justify-center">
                    <HugeiconsIcon icon={Icon_22830} size={20} strokeWidth={2} aria-hidden="true" className={ri} />
                  </span>
                  <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">{el?"No conversations match":"Inbox is empty"}</p>
                  <p className={ra("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>
                    {el?"Nothing in this mailbox matches the current search and filter.":"Everything here has been deleted. Restore it if that was a mistake."}
                  </p>
                  <button type="button" onClick={()=>{
                    i("All"),s(""),h([])
                  }} className={ra(ru,"h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","mt-4")}>{el?"Clear filters":"Restore conversations"}</button>
                </div>:<ul ref={O} role="listbox" aria-label="Conversations" onKeyDown={e=>{
                  if(0===et.length)return;
                  let a=et.findIndex(e=>e.id===c),r=a;
                  if("ArrowDown"===e.key)r=a<0?0:Math.min(a+1,et.length-1);else if("ArrowUp"===e.key)r=a<=0?0:a-1;else if("Home"===e.key)r=0;else if("End"===e.key)r=et.length-1;else{
                    if("Enter"!==e.key)return;
                    e.preventDefault(),ei(c,true);
                    return
                  }
                  e.preventDefault();
                  let t=et[r].id;
                  d(t),b(e=>e.includes(t)?e:[...e,t]),O.current?.querySelector(`[data-conversation="${t}"]`)?.focus({preventScroll:true})
                }} className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
                  {et.map(e=>{
                    let a=e.id===en.id,r=!u.includes(e.id);
                    return (
                      <li key={e.id} role="presentation">
                                        <button type="button" role="option" aria-selected={a} tabIndex={a?0:-1} data-conversation={e.id} onClick={()=>ei(e.id,true)} className={ra(rk,a?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","cursor-pointer px-3")}>
                                          <span className={rf}>
                                            <span className={ra(rs,r?rl:ri,"block truncate")}>{e.name}</span>
                                            <span className={ra(rc,"block truncate")}>{e.subject}</span>
                                            {e.preview&&<span data-description className={ra("line-clamp-2 text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5")}>{e.preview}</span>}
                                          </span>
                                          <span className="flex shrink-0 flex-col items-end self-start">
                                            <span className="shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e.time}</span>
                                            {r&&<span className={ra("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>Unread</span>}
                                          </span>
                                        </button>
                                      </li>
                    );
                  })}
                </ul>}
              </div>
              <div aria-hidden="true" className={ra(rj,"pointer-events-none absolute inset-x-0 top-0 h-8",K.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={ra(rN,"pointer-events-none absolute inset-x-0 bottom-0 h-8",K.end?"opacity-100":"opacity-0")} />
            </div>
          </section>
          <main className={ra(rm,"flex-1",f?"flex":"hidden lg:flex")}>
            <header className="flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6">
              <button ref={T} type="button" aria-label="Back to conversations" onClick={()=>{
                w(false);
                let e=O.current?.querySelector('[role="option"][aria-selected="true"]');
                e?.focus({preventScroll:true})
              }} className={ra(r_,rb,"lg:hidden")}>
                <HugeiconsIcon icon={Icon_18976} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
              <h1 className={ra("text-[17px]/[22px] font-extrabold","min-w-0 flex-1 truncate")}>{en.subject}</h1>
              <div className="flex items-center gap-1">
                <button type="button" aria-label="Reply" className={ra(r_,rb)}>
                  <HugeiconsIcon icon={Icon_96738} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <button type="button" aria-label={ec?"Remove star":"Star this conversation"} aria-pressed={ec} onClick={()=>k(e=>e.includes(en.id)?e.filter(e=>e!==en.id):[...e,en.id])} className={ra(r_,rb,"max-sm:hidden")}>
                  <HugeiconsIcon icon={Icon_12556} size={18} strokeWidth={2} aria-hidden="true" className={ra(ec&&"[&_path]:fill-current")} />
                </button>
                <button type="button" aria-label="Archive" className={ra(r_,rb,"max-sm:hidden")}>
                  <HugeiconsIcon icon={Icon_22670} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <button ref={H} type="button" aria-label="Delete" onClick={()=>{
                  ea.current=true,M(true)
                }} className={ra(r_,rb,"max-sm:hidden")}>
                  <HugeiconsIcon icon={Icon_96037} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <div ref={q} className="relative">
                  <button ref={L} type="button" aria-label="More actions" aria-haspopup="menu" aria-expanded={S} onClick={()=>{
                    S?(z(false),D(false)):z(true)
                  }} className={ra(r_,rb)}>
                    <HugeiconsIcon icon={Icon_59649} size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                  {S&&<div ref={P} role="menu" aria-label="More actions" className={ra("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",rg,"absolute right-0 top-full z-30 mt-1 w-56",C?"opacity-100":"opacity-0")}>
                    {rC.map(({label:e,icon:a})=>(
                      <button key={e} type="button" role="menuitem" onClick={()=>{
                                        z(false),D(false),L.current?.focus({preventScroll:true})
                                      }} className="relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40">
                                        <HugeiconsIcon icon={a} size={18} strokeWidth={2} aria-hidden="true" />
                                        <span className="truncate">{e}</span>
                                      </button>
                    ))}
                  </div>}
                </div>
              </div>
            </header>
            <div className="relative min-h-0 flex-1">
              <div ref={V} onScroll={Q} className="h-full overflow-y-auto p-4 sm:p-6">
                <div className="max-w-3xl">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className={rs}>{en.name}</p>
                      <p className={ra(rc,ro,"mt-0.5 truncate")}>{en.email}</p>
                    </div>
                    <p className={ra(rd,ro,"shrink-0")}>{en.received}</p>
                  </div>
                  <p className={ra(rc,ro,"mt-2")}>To Portway support</p>
                  <div className={ra("text-[15px]/[22px] font-medium","mt-5 space-y-4")}>{en.body.map(e=><p key={e}>{e}</p>)}</div>
                  {en.attachment&&<div className="mt-6">
                    <p className={ra(rd,ro)}>Attachment</p>
                    <div className={ra(rm,"mt-2")}>
                      <div className={ra(rk,"px-2")}>
                        <span className={ra("flex size-9 shrink-0 items-center justify-center text-neutral-900/78 dark:text-neutral-100/78","size-9")}>
                          <HugeiconsIcon icon={Icon_31964} size={18} strokeWidth={2} aria-hidden="true" />
                        </span>
                        <span className={rf}>
                          <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="truncate">{en.attachment.name}</span></span>
                          <span className={ra("text-[13px]/[16px] font-bold tabular-nums",ro)}>{en.attachment.size}</span>
                        </span>
                        <span className="relative z-10 flex shrink-0 items-center gap-1">
                          <button type="button" aria-label={`Download ${en.attachment.name}`} className={ra(r_,rb)}>
                            <HugeiconsIcon icon={Icon_92752} size={18} strokeWidth={2} aria-hidden="true" />
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>}
                </div>
              </div>
              <div aria-hidden="true" className={ra(rj,"pointer-events-none absolute inset-x-0 top-0 h-8",J.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={ra(rN,"pointer-events-none absolute inset-x-0 bottom-0 h-8",J.end?"opacity-100":"opacity-0")} />
            </div>
          </main>
        </div>
        {y&&<div className="lg:hidden">
          <button type="button" aria-label="Close mailboxes overlay" tabIndex={-1} onClick={eo} className={ra(rt,rg,"absolute inset-0 z-30 cursor-pointer",N?"opacity-100":"opacity-0")} />
          <nav ref={I} role="dialog" aria-modal="true" aria-label="Mailboxes" className={ra(rw,"shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",rg,"absolute inset-y-0 left-0 z-40 flex w-64 max-w-[85%] flex-col",N?"opacity-100":"opacity-0")}>
            <div className="flex h-14 shrink-0 items-center gap-2.5 pr-2 pl-4">
              <span className={ra(rn,"size-8",rs)}>P</span>
              <p className={ra(rs,"min-w-0 flex-1 truncate")}>Portway</p>
              <button type="button" aria-label="Close mailboxes" onClick={eo} className={ra(r_,rb)}>
                <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <ul ref={G} onScroll={Y} className="h-full space-y-0.5 overflow-y-auto px-2 pb-3">
                {rA.map(({id:r,label:n,icon:i,unread:o})=>{
                  let s=r===e;
                  return (
                    <li key={r}>
                                    <button type="button" aria-current={s?"page":undefined} onClick={()=>{
                                      a(r),eo()
                                    }} className={ry}>
                                      <HugeiconsIcon icon={i} size={18} strokeWidth={2} aria-hidden="true" />
                                      <span className="min-w-0 flex-1 truncate text-left">{n}</span>
                                      {o&&<span className="ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">Unread</span>}
                                    </button>
                                  </li>
                  );
                })}
              </ul>
              <div aria-hidden="true" className={ra("bg-linear-to-b from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",X.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={ra("bg-linear-to-t from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",X.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={ra("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex shrink-0 items-center gap-2.5 py-2 pr-2 pl-4")}>
              <span className={rp}><span className={rh}>IR</span></span>
              <span className="min-w-0 flex-1">
                <span className={ra(rs,"block truncate")}>Iris Renner</span>
                <span className={ra(rd,ro,"block truncate")}>Support lead</span>
              </span>
            </div>
          </nav>
        </div>}
        {R&&<>
          <div className={ra(rt,rg,"absolute inset-0 z-40",E?"opacity-100":"opacity-0")} />
          <div ref={$} role="dialog" aria-modal="true" aria-labelledby="app-shell-5-confirm-title" aria-describedby="app-shell-5-confirm-body" className={ra("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",rg,"absolute left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2",E?"opacity-100":"opacity-0")}>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:last-child]:mb-1">
              <div className={ra("relative flex flex-col gap-2 px-5 pt-6 pb-6 has-[button]:pe-14 [&:has(+*)]:pb-0","pe-[20px]")}>
                <h2 id="app-shell-5-confirm-title" className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">
                  {"Delete the thread from "}
                  {en.name}
                  ?
                </h2>
                <p id="app-shell-5-confirm-body" className="text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78">It moves to trash and leaves the shared inbox for everyone on the team.</p>
              </div>
            </div>
            <div className={ra("flex min-h-14 flex-wrap items-center justify-end gap-2 px-4 py-2.5 pe-2.5","flex-col-reverse max-sm:ps-2 sm:flex-row")}>
              <button ref={Z} type="button" onClick={es} className={ra(ru,rx,"w-full sm:w-auto")}>Keep it</button>
              <button type="button" onClick={()=>{
                let e=et.filter(e=>e.id!==en.id);
                h(e=>[...e,en.id]),d(e[0]?.id??rz[0].id),M(false),W(false),w(false),F.current?.focus({preventScroll:true})
              }} className={ra("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-[oklch(51%_0.18_26)] hover:not-disabled:bg-none hover:not-disabled:bg-[oklch(96%_0.03_26)] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:text-[oklch(80%_0.13_26)] dark:hover:not-disabled:bg-[oklch(32%_0.07_26)] dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",rx,"w-full sm:w-auto")}>Delete conversation</button>
            </div>
          </div>
        </>}
      </div>
  );
}
