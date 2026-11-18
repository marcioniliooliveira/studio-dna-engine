/**
 * React Bits Pro — Application UI (app-sidebar-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_19809 = [["path",{d:"M3.88884 9.66294C4.39329 10 5.09552 10 6.49998 10C7.90445 10 8.60668 10 9.11113 9.66294C9.32951 9.51702 9.51701 9.32952 9.66292 9.11114C9.99998 8.60669 9.99998 7.90446 9.99998 6.5C9.99998 5.09554 9.99998 4.39331 9.66292 3.88886C9.51701 3.67048 9.32951 3.48298 9.11113 3.33706C8.60668 3 7.90445 3 6.49998 3C5.09552 3 4.39329 3 3.88884 3.33706C3.67046 3.48298 3.48296 3.67048 3.33705 3.88886C2.99998 4.39331 2.99998 5.09554 2.99998 6.5C2.99998 7.90446 2.99998 8.60669 3.33705 9.11114C3.48296 9.32952 3.67046 9.51702 3.88884 9.66294Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.8888 9.66294C15.3933 10 16.0955 10 17.5 10C18.9044 10 19.6067 10 20.1111 9.66294C20.3295 9.51702 20.517 9.32952 20.6629 9.11114C21 8.60669 21 7.90446 21 6.5C21 5.09554 21 4.39331 20.6629 3.88886C20.517 3.67048 20.3295 3.48298 20.1111 3.33706C19.6067 3 18.9044 3 17.5 3C16.0955 3 15.3933 3 14.8888 3.33706C14.6705 3.48298 14.483 3.67048 14.337 3.88886C14 4.39331 14 5.09554 14 6.5C14 7.90446 14 8.60669 14.337 9.11114C14.483 9.32952 14.6705 9.51702 14.8888 9.66294Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3.88884 20.6629C4.39329 21 5.09552 21 6.49998 21C7.90445 21 8.60668 21 9.11113 20.6629C9.32951 20.517 9.51701 20.3295 9.66292 20.1111C9.99998 19.6067 9.99998 18.9045 9.99998 17.5C9.99998 16.0955 9.99998 15.3933 9.66292 14.8889C9.51701 14.6705 9.32951 14.483 9.11113 14.3371C8.60668 14 7.90445 14 6.49998 14C5.09552 14 4.39329 14 3.88884 14.3371C3.67046 14.483 3.48296 14.6705 3.33705 14.8889C2.99998 15.3933 2.99998 16.0955 2.99998 17.5C2.99998 18.9045 2.99998 19.6067 3.33705 20.1111C3.48296 20.3295 3.67046 20.517 3.88884 20.6629Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.8888 20.6629C15.3933 21 16.0955 21 17.5 21C18.9044 21 19.6067 21 20.1111 20.6629C20.3295 20.517 20.517 20.3295 20.6629 20.1111C21 19.6067 21 18.9045 21 17.5C21 16.0955 21 15.3933 20.6629 14.8889C20.517 14.6705 20.3295 14.483 20.1111 14.3371C19.6067 14 18.9044 14 17.5 14C16.0955 14 15.3933 14 14.8888 14.3371C14.6705 14.483 14.483 14.6705 14.337 14.8889C14 15.3933 14 16.0955 14 17.5C14 18.9045 14 19.6067 14.337 20.1111C14.483 20.3295 14.6705 20.517 14.8888 20.6629Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_22830 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_71898 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L10.5 15L16 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_88002 = [["path",{d:"M4.85195 20.7716C5.40326 21 6.10218 21 7.5 21C8.89782 21 9.59674 21 10.1481 20.7716C10.8831 20.4672 11.4672 19.8831 11.7716 19.1481C12 18.5967 12 17.8978 12 16.5C12 15.1022 12 14.4033 11.7716 13.8519C11.4672 13.1169 10.8831 12.5328 10.1481 12.2284C9.59674 12 8.89782 12 7.5 12C6.10218 12 5.40326 12 4.85195 12.2284C4.11687 12.5328 3.53284 13.1169 3.22836 13.8519C3 14.4033 3 15.1022 3 16.5C3 17.8978 3 18.5967 3.22836 19.1481C3.53284 19.8831 4.11687 20.4672 4.85195 20.7716Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13.8519 20.7716C14.4033 21 15.1022 21 16.5 21C17.8978 21 18.5967 21 19.1481 20.7716C19.8831 20.4672 20.4672 19.8831 20.7716 19.1481C21 18.5967 21 17.8978 21 16.5C21 15.1022 21 14.4033 20.7716 13.8519C20.4672 13.1169 19.8831 12.5328 19.1481 12.2284C18.5967 12 17.8978 12 16.5 12C15.1022 12 14.4033 12 13.8519 12.2284C13.1169 12.5328 12.5328 13.1169 12.2284 13.8519C12 14.4033 12 15.1022 12 16.5C12 17.8978 12 18.5967 12.2284 19.1481C12.5328 19.8831 13.1169 20.4672 13.8519 20.7716Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.35195 11.7716C9.90326 12 10.6022 12 12 12C13.3978 12 14.0967 12 14.6481 11.7716C15.3831 11.4672 15.9672 10.8831 16.2716 10.1481C16.5 9.59674 16.5 8.89782 16.5 7.5C16.5 6.10218 16.5 5.40326 16.2716 4.85195C15.9672 4.11687 15.3831 3.53284 14.6481 3.22836C14.0967 3 13.3978 3 12 3C10.6022 3 9.90326 3 9.35195 3.22836C8.61687 3.53284 8.03284 4.11687 7.72836 4.85195C7.5 5.40326 7.5 6.10218 7.5 7.5C7.5 8.89782 7.5 9.59674 7.72836 10.1481C8.03284 10.8831 8.61687 11.4672 9.35195 11.7716Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_13575 = [["path",{d:"M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 11V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 11V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M8 11V15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_16568 = [["path",{d:"M13.5 13L17 9M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6 12C6 8.68629 8.68629 6 12 6C13.0929 6 14.1175 6.29218 15 6.80269",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M2.50006 12.0001C2.50006 7.52172 2.50006 5.28255 3.8913 3.8913C5.28255 2.50006 7.52172 2.50006 12.0001 2.50006C16.4784 2.50006 18.7176 2.50006 20.1088 3.8913C21.5001 5.28255 21.5001 7.52172 21.5001 12.0001C21.5001 16.4784 21.5001 18.7176 20.1088 20.1088C18.7176 21.5001 16.4784 21.5001 12.0001 21.5001C7.52172 21.5001 5.28255 21.5001 3.8913 20.1088C2.50006 18.7176 2.50006 16.4784 2.50006 12.0001Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}]];
const Icon_2972 = [["path",{d:"M8 9V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 5V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18 13V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 3V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_57466 = [["path",{d:"M4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 14L9.79289 11.2071C10.1834 10.8166 10.8166 10.8166 11.2071 11.2071L12.7929 12.7929C13.1834 13.1834 13.8166 13.1834 14.2071 12.7929L17 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_95735 = [["path",{d:"M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 16H11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 16L18 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 9H22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_65174 = [["path",{d:"M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_3175 = [["path",{d:"M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 7V3M12 17V21M17 12H21M7 12H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.8965 3.47625C15.63 2.57541 16.7478 2 18 2C20.2091 2 22 3.79086 22 6C22 7.25222 21.4246 8.37005 20.5238 9.1035M20.5238 14.8965C21.4246 15.63 22 16.7478 22 18C22 20.2091 20.2091 22 18 22C16.7478 22 15.63 21.4246 14.8965 20.5238M9.1035 20.5238C8.37005 21.4246 7.25222 22 6 22C3.79086 22 2 20.2091 2 18C2 16.7478 2.57541 15.63 3.47625 14.8965M3.47625 9.1035C2.57541 8.37005 2 7.25222 2 6C2 3.79086 3.79086 2 6 2C7.25222 2 8.37005 2.57541 9.1035 3.47625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_83331 = [["path",{d:"M18 18C18 18.4644 18 18.6965 17.978 18.8918C17.7952 20.5145 16.5145 21.7952 14.8919 21.978C14.6965 22 14.4644 22 14 22H11C7.70017 22 6.05025 22 5.02513 20.9749C4 19.9498 4 18.2998 4 15L4.00001 8.99998C4.00001 5.70016 4.00003 4.05024 5.02514 3.02512C6.05027 2 7.70018 2 11 2H14C14.4644 2 14.6965 2 14.8919 2.02201C16.5145 2.20483 17.7952 3.48547 17.978 5.10816C18 5.30347 18 5.53565 18 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.07612 11.1183C8 11.3021 8 11.535 8 12.001C8 12.4669 8 12.6999 8.07612 12.8837C8.17761 13.1287 8.37229 13.3234 8.61732 13.4249C8.80109 13.501 9.03406 13.501 9.5 13.501H14.5C14.5002 15.2503 14.511 16.1299 15.0623 16.3858C15.0829 16.3954 15.1037 16.4042 15.1249 16.4124C15.7045 16.6353 16.3999 16.0139 17.7907 14.7711C19.2576 13.4602 19.9912 12.7851 20 11.957C19.9912 11.1289 19.2576 10.4538 17.7907 9.14301C16.3999 7.90018 15.7045 7.27876 15.1249 7.50171C15.1037 7.50985 15.0829 7.51869 15.0623 7.52822C14.5018 7.78844 14.5 8.69318 14.5 10.501H9.5C9.03406 10.501 8.80109 10.501 8.61732 10.5771C8.37229 10.6786 8.17761 10.8733 8.07612 11.1183Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40279 = [["path",{d:"M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 3L9.5 21",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 7H6M5 10H6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let y = (...e)=>e.filter(Boolean).join(" ");

let N = "text-neutral-900 dark:text-neutral-100";

let A = "text-neutral-900/62 dark:text-neutral-100/62";

let S = "text-[15px]/[20px] font-bold";

let z = "text-[13px]/[16px] font-semibold tabular-nums";

let E = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let R = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let C = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let D = "border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let W = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let P = [{label:"Workspace",items:[{label:"Command center",icon:Icon_19809,badge:"8",current:true},{label:"Inbox",icon:Icon_22830,badge:"12"},{label:"Approvals",icon:Icon_71898,badge:"5"},{label:"Automations",icon:Icon_88002},{label:"Projects",icon:Icon_13575}]},{label:"Insights",items:[{label:"Performance",icon:Icon_16568},{label:"Usage",icon:Icon_2972},{label:"Activity log",icon:Icon_57466}]},{label:"Account",items:[{label:"Members",icon:Icon_88366},{label:"Billing",icon:Icon_95735},{label:"Settings",icon:Icon_65174}]}];

let L = [{label:"Account settings",icon:Icon_65174},{label:"Notifications",icon:Icon_13473},{label:"Help center",icon:Icon_3175},{label:"Sign out",icon:Icon_83331}];

function F({collapsed:e,onToggleCollapse:r,onClose:a}){
  let[i,o]=useState(false),[s,c]=useState(false),{ref:d,edges:u,onScroll:b}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),_=useRef(null),x=useRef(null),p=useRef(null),h=e=>{
    o(false),c(false),e&&x.current?.focus({preventScroll:true})
  };
  return useEffect(()=>{
    if(!i)return;
    let e=_.current,r=e?.ownerDocument??document,a=requestAnimationFrame(()=>c(true)),t=r=>{
      e?.contains(r.target)||h(false)
    },n=e=>{
      let a=Array.from(p.current?.querySelectorAll('[role="menuitem"]')??[]);
      if(0===a.length)return;
      let t=a.indexOf(r.activeElement);
      "Escape"===e.key?(e.preventDefault(),h(true)):"ArrowDown"===e.key?(e.preventDefault(),a[t<0||t===a.length-1?0:t+1]?.focus({preventScroll:true})):"ArrowUp"===e.key?(e.preventDefault(),a[t<=0?a.length-1:t-1]?.focus({preventScroll:true})):"Home"===e.key?(e.preventDefault(),a[0]?.focus({preventScroll:true})):"End"===e.key&&(e.preventDefault(),a[a.length-1]?.focus({preventScroll:true}))
    };
    return r.addEventListener("pointerdown",t),r.addEventListener("keydown",n),()=>{
      cancelAnimationFrame(a),r.removeEventListener("pointerdown",t),r.removeEventListener("keydown",n)
    };
  }, [i]),<>
    <div className="flex h-14 shrink-0 items-center gap-2.5 pl-4 pr-2">
      <span className={y("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] select-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black)]","size-8",S)}>M</span>
      {!e&&<div className="min-w-0 flex-1">
        <p className={y(S,N,"truncate")}>Meridian</p>
        <p className={y(z,A,"truncate")}>Operations</p>
      </div>}
      {a&&<button type="button" aria-label="Close navigation" onClick={a} className={y(E,R)}>
        <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
      </button>}
    </div>
    <div className="relative min-h-0 flex-1">
      <nav ref={d} onScroll={b} aria-label="Primary" className="h-full overflow-y-auto px-2 pb-3">
        <div className={y(e&&"space-y-4")}>
          {P.map(r=>(
            <div key={r.label}>
                        {!e&&<p className="px-3 pt-5 pb-1.5 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{r.label}</p>}
                        <ul className="space-y-0.5">
                          {r.items.map(r=>(
                            <li key={r.label}>
                                            <a href="#command-center" aria-current={r.current?"page":undefined} title={e?r.label:undefined} className={y(W,e&&"justify-center")}>
                                              <HugeiconsIcon icon={r.icon} size={18} strokeWidth={2} aria-hidden="true" />
                                              {!e&&<>
                                                <span className={y("block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]","flex-1")}>{r.label}</span>
                                                {r.badge&&<span className="ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{r.badge}</span>}
                                              </>}
                                            </a>
                                          </li>
                          ))}
                        </ul>
                      </div>
          ))}
        </div>
      </nav>
      <div aria-hidden="true" className={y("bg-linear-to-b from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={y("bg-linear-to-t from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
    </div>
    <div ref={_} className={y("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","relative shrink-0 space-y-1 p-2")}>
      {r&&<button type="button" aria-label={e?"Expand sidebar":"Collapse sidebar"} title={e?"Expand sidebar":undefined} onClick={r} className={y(W,e&&"justify-center")}>
        <HugeiconsIcon icon={Icon_40279} size={18} strokeWidth={2} aria-hidden="true" />
        {!e&&<span className="min-w-0 flex-1 truncate text-left">Collapse sidebar</span>}
      </button>}
      <button ref={x} type="button" aria-haspopup="menu" aria-expanded={i} onClick={()=>i?h(false):o(true)} className={y("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900/78 dark:text-neutral-100/78 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] hover:not-disabled:text-neutral-900 active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:hover:not-disabled:bg-neutral-100/8 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:bg-neutral-100/12 dark:aria-expanded:bg-neutral-100/8 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-12 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-6 text-[16px]/[20px] font-extrabold","w-full gap-2.5 ps-2 pe-2 text-left")}>
        <span className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
          <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">IR</span>
        </span>
        {!e&&<>
          <span className="min-w-0 flex-1">
            <span className={y(S,N,"block truncate")}>Iris Renner</span>
            <span className={y(z,A,"block truncate")}>Operations lead</span>
          </span>
          <HugeiconsIcon icon={Icon_20148} size={18} strokeWidth={2} aria-hidden="true" className={y(A,"shrink-0")} />
        </>}
      </button>
      {i&&<div ref={p} role="menu" aria-label="Account" className={y("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",C,"absolute bottom-[calc(100%-0.25rem)] left-2 z-30",e?"w-[224px] max-w-none":"right-2",s?"opacity-100":"opacity-0")}>
        {L.map(({label:e,icon:r})=>(
          <button key={e} type="button" role="menuitem" onClick={()=>h(true)} className="relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40">
                    <HugeiconsIcon icon={r} size={18} strokeWidth={2} aria-hidden="true" />
                    <span className="truncate">{e}</span>
                  </button>
        ))}
      </div>}
    </div>
  </>;
}


export default function app_sidebar_1__Sorbet__Component(){
  let[e,r]=useState(false),[a,i]=useState(false),[o,s]=useState(false),c=useRef(false),d=useRef(null),u=useRef(null);
  useEffect(()=>{
    let e=requestAnimationFrame(()=>{
      (d.current?.ownerDocument.defaultView??window).matchMedia("(max-width: 1023px)").matches&&i(true)
    });
    return ()=>cancelAnimationFrame(e);
  }, []),useEffect(()=>{
    if(!a)return;
    let e=u.current,r=requestAnimationFrame(()=>s(true)),t=e?.ownerDocument??document,n=()=>Array.from(e?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    c.current&&(n()[0]?.focus({preventScroll:true}),c.current=false);
    let l=e=>{
      if("Escape"===e.key){
        i(false),s(false),d.current?.focus({preventScroll:true});
        return
      }
      if("Tab"!==e.key)return;
      let r=n(),a=r[0],l=r[r.length-1];
      a&&l&&(e.shiftKey&&t.activeElement===a?(e.preventDefault(),l.focus({preventScroll:true})):e.shiftKey||t.activeElement!==l||(e.preventDefault(),a.focus({preventScroll:true})))
    };
    return t.addEventListener("keydown",l),()=>{
      cancelAnimationFrame(r),t.removeEventListener("keydown",l)
    };
  }, [a]);
  let b=()=>{
    i(false),s(false),d.current?.focus({preventScroll:true})
  };
  return (
    <div className={y("bg-white dark:bg-neutral-950",N,"relative flex h-full min-h-[760px] w-full overflow-hidden")}>
        <aside className={y(D,"hidden shrink-0 flex-col lg:flex",e?"w-14":"w-64")}><F collapsed={e} onToggleCollapse={()=>r(e=>!e)} /></aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-14 shrink-0 items-center px-4 lg:hidden">
            <button ref={d} type="button" aria-label="Open navigation" aria-expanded={a} onClick={()=>{
              c.current=true,i(true)
            }} className={y(E,R)}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
          </div>
        </div>
        {a&&<div className="lg:hidden">
          <button type="button" aria-label="Close navigation overlay" onClick={b} tabIndex={-1} className={y("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70",C,"absolute inset-0 z-30 cursor-pointer",o?"opacity-100":"opacity-0")} />
          <aside ref={u} role="dialog" aria-modal="true" aria-label="Navigation" className={y(D,"shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",C,"absolute inset-y-0 left-0 z-40 flex w-72 max-w-[85%] flex-col",o?"opacity-100":"opacity-0")}><F collapsed={false} onClose={b} /></aside>
        </div>}
      </div>
  );
}
