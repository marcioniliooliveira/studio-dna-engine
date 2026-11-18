/**
 * React Bits Pro — Application UI (app-shell-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, end, focus, observe, start, useCallback, useEffect, useMemo, useRef, useState,  } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_52038 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20.8985 8C20.7706 6.69989 20.4816 5.82475 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C4.97975 21.6366 6.1277 21.8873 8 21.965",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 13V16L18 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_92916 = [["path",{d:"M17.7458 2.49963C19.3896 2.49963 20.2115 2.49963 20.7646 2.95361C20.8659 3.03672 20.9588 3.12958 21.0419 3.23085C21.4958 3.78402 21.4958 4.60589 21.4958 6.24963C21.4958 7.89338 21.4958 8.71525 21.0419 9.26842C20.9588 9.36969 20.8659 9.46255 20.7646 9.54566C20.2115 9.99963 19.3896 9.99963 17.7458 9.99963L6.74585 9.99963C5.10211 9.99963 4.28024 9.99963 3.72706 9.54565C3.62579 9.46255 3.53294 9.36969 3.44983 9.26842C2.99585 8.71525 2.99585 7.89337 2.99585 6.24963C2.99585 4.60589 2.99585 3.78402 3.44983 3.23085C3.53294 3.12958 3.62579 3.03672 3.72706 2.95361C4.28024 2.49963 5.10211 2.49963 6.74585 2.49963L17.7458 2.49963Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.7459 13.9998C19.3898 13.9997 20.2117 13.9997 20.7649 14.4537C20.8661 14.5368 20.959 14.6296 21.0421 14.7308C21.4961 15.284 21.4961 16.106 21.4961 17.7499C21.4961 19.3936 21.4961 20.2155 21.0421 20.7687C20.959 20.87 20.8662 20.9628 20.765 21.0459C20.2118 21.4999 19.3899 21.4999 17.7461 21.4999L15.7458 21.5C14.1019 21.5 13.28 21.5001 12.7268 21.046C12.6256 20.963 12.5327 20.8701 12.4496 20.7689C11.9956 20.2157 11.9956 19.3938 11.9956 17.7499C11.9956 16.1061 11.9956 15.2842 12.4496 14.731C12.5327 14.6298 12.6255 14.537 12.7267 14.4539C13.2799 13.9999 14.1018 13.9999 15.7456 13.9998L17.7459 13.9998Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5.24559 13.9999C5.94314 13.9999 6.29192 13.9999 6.57574 14.0859C7.21509 14.2798 7.71542 14.7801 7.9093 15.4195C7.99536 15.7033 7.99536 16.0521 7.99536 16.7496V18.7505C7.99536 19.4481 7.99536 19.7968 7.9093 20.0806C7.71542 20.72 7.2151 21.2203 6.57576 21.4142C6.29195 21.5003 5.94317 21.5003 5.24563 21.5003C4.54807 21.5003 4.19929 21.5003 3.91548 21.4142C3.27612 21.2203 2.77579 20.72 2.58191 20.0807C2.49585 19.7968 2.49585 19.4481 2.49585 18.7505L2.49585 16.7496C2.49585 16.0521 2.49585 15.7033 2.58191 15.4195C2.77579 14.7802 3.27611 14.2798 3.91545 14.086C4.19926 13.9999 4.54804 13.9999 5.24559 13.9999Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_63285 = [["path",{d:"M2 7C2 5.59987 2 4.8998 2.27248 4.36502C2.51217 3.89462 2.89462 3.51217 3.36502 3.27248C3.8998 3 4.59987 3 6 3C7.40013 3 8.1002 3 8.63498 3.27248C9.10538 3.51217 9.48783 3.89462 9.72752 4.36502C10 4.8998 10 5.59987 10 7V17C10 18.4001 10 19.1002 9.72752 19.635C9.48783 20.1054 9.10538 20.4878 8.63498 20.7275C8.1002 21 7.40013 21 6 21C4.59987 21 3.8998 21 3.36502 20.7275C2.89462 20.4878 2.51217 20.1054 2.27248 19.635C2 19.1002 2 18.4001 2 17V7Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6.125 17H6M6.25 17C6.25 17.1381 6.13807 17.25 6 17.25C5.86193 17.25 5.75 17.1381 5.75 17C5.75 16.8619 5.86193 16.75 6 16.75C6.13807 16.75 6.25 16.8619 6.25 17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M17.9062 16.6934H17.7812M18.0312 16.6934C18.0312 16.8314 17.9193 16.9434 17.7812 16.9434C17.6432 16.9434 17.5312 16.8314 17.5312 16.6934C17.5312 16.5553 17.6432 16.4434 17.7812 16.4434C17.9193 16.4434 18.0312 16.5553 18.0312 16.6934Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 7H10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.4486 8.26843C11.0937 6.93838 10.9163 6.27336 11.0385 5.69599C11.146 5.18812 11.4108 4.72747 11.7951 4.38005C12.2319 3.98508 12.8942 3.80689 14.2187 3.4505C15.5432 3.09412 16.2055 2.91593 16.7804 3.03865C17.2862 3.1466 17.7449 3.41256 18.0909 3.79841C18.4842 4.23706 18.6617 4.90209 19.0166 6.23213L21.5514 15.7316C21.9063 17.0616 22.0837 17.7266 21.9615 18.304C21.854 18.8119 21.5892 19.2725 21.2049 19.62C20.7681 20.0149 20.1058 20.1931 18.7813 20.5495C17.4568 20.9059 16.7945 21.0841 16.2196 20.9614C15.7138 20.8534 15.2551 20.5874 14.9091 20.2016C14.5158 19.7629 14.3383 19.0979 13.9834 17.7679L11.4486 8.26843Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M12 8.00019L18.5001 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_17601 = [["path",{d:"M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 9L11 9M8 13L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 22L22 22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_71898 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L10.5 15L16 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_2972 = [["path",{d:"M8 9V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 5V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18 13V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 3V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_3175 = [["path",{d:"M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 7V3M12 17V21M17 12H21M7 12H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.8965 3.47625C15.63 2.57541 16.7478 2 18 2C20.2091 2 22 3.79086 22 6C22 7.25222 21.4246 8.37005 20.5238 9.1035M20.5238 14.8965C21.4246 15.63 22 16.7478 22 18C22 20.2091 20.2091 22 18 22C16.7478 22 15.63 21.4246 14.8965 20.5238M9.1035 20.5238C8.37005 21.4246 7.25222 22 6 22C3.79086 22 2 20.2091 2 18C2 16.7478 2.57541 15.63 3.47625 14.8965M3.47625 9.1035C2.57541 8.37005 2 7.25222 2 6C2 3.79086 3.79086 2 6 2C7.25222 2 8.37005 2.57541 9.1035 3.47625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_18595 = [["path",{d:"M9 14V6H6C5.07003 6 4.60504 6 4.22354 6.10222C3.18827 6.37962 2.37962 7.18827 2.10222 8.22354C2 8.60504 2 9.07003 2 10C2 10.93 2 11.395 2.10222 11.7765C2.37962 12.8117 3.18827 13.6204 4.22354 13.8978C4.60504 14 5.07003 14 6 14H9Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 14L9.96466 18.8233C9.98816 18.9408 10 19.0604 10 19.1802V19.3411C10 20.2573 9.25728 21 8.34109 21C7.55885 21 6.8829 20.4536 6.719 19.6887L5.5 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M10 6H9V14H10C11.2982 14 12.5614 14.4211 13.6 15.2L15.747 16.8103C15.9112 16.9334 16.111 17 16.3162 17C16.7246 17 17.0909 16.7404 17.2088 16.3495C17.5537 15.2067 18 13.2728 18 10C18 6.72718 17.5537 4.79327 17.2088 3.65054C17.0909 3.25961 16.7246 3 16.3162 3C16.111 3 15.9112 3.06658 15.747 3.18974L13.6 4.8C12.5614 5.57893 11.2982 6 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 9.99996H22M20.5 6.00109L21.5 5.40637M20.5 14L21.5 14.6481",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_40279 = [["path",{d:"M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 3L9.5 21",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 7H6M5 10H6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_65174 = [["path",{d:"M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
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

let D = "font-mono text-[12px]/[16px] tabular-nums";

let R = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let M = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let E = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let W = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let eM = (...e)=>e.filter(Boolean).join(" ");

function eE(){
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

let eW = "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] select-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black)]";

let eO = "text-neutral-900/78 dark:text-neutral-100/78";

let eT = "text-neutral-900/62 dark:text-neutral-100/62";

let eF = "text-[15px]/[20px] font-bold";

let eI = "text-[13px]/[16px] font-semibold tabular-nums";

let eL = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let eP = "inline-flex min-h-6 items-center gap-1 rounded-[calc(var(--rb-r-sm,6px))] text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100 underline decoration-[var(--rb-accent,oklch(84%_0.15_165))] decoration-[3px] underline-offset-[5px] transition-[text-decoration-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:decoration-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:decoration-[var(--rb-accent,oklch(81%_0.16_163))]";

let eq = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eH = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let e$ = "flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1";

let eB = "text-neutral-900 dark:text-neutral-100";

let eK = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let eU = "min-w-0 text-[15px]/[20px] font-bold text-neutral-900/62 dark:text-neutral-100/62";

let eV = "flex min-w-0 flex-wrap items-center gap-2 text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]";

let eJ = "text-neutral-900/62 dark:text-neutral-100/62";

let eQ = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let eG = "border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let eX = "border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let eY = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let eZ = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let e0 = "text-right tabular-nums";

let e1 = "app-shell-3-sidebar";

let e2 = "app-shell-3-drawer";

let e5 = [{label:"Contracts",items:[{label:"Contracts",icon:Icon_31964,current:true},{label:"Renewals",icon:Icon_52038,count:"4"},{label:"Templates",icon:Icon_92916},{label:"Clause library",icon:Icon_63285}]},{label:"Organisation",items:[{label:"Counterparties",icon:Icon_17601},{label:"Approvals",icon:Icon_71898,count:"2"},{label:"Reports",icon:Icon_2972}]}];

let e6 = [{label:"Help center",icon:Icon_3175},{label:"What's new",icon:Icon_18595}];

let e8 = ["Account settings","Notification preferences","Switch workspace","Sign out"];

let e4 = [{label:"Renewing in 90 days",value:"4"},{label:"Awaiting approval",value:"2"},{label:"Annual contract value",value:"$3.91M"}];

let e9 = {Active:"text-neutral-900/78 dark:text-neutral-100/78",Draft:"text-neutral-900/62 dark:text-neutral-100/62","In review":eB,Renewing:"text-neutral-900 dark:text-neutral-100","Needs approval":eB,Overdue:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

let e3 = [{name:"Data processing addendum",counterparty:"Corvus Health",owner:"Tomas Lindqvist",value:null,renews:"04 Jan 2026",status:"Overdue",stage:"attention"},{name:"Platform subscription and support renewal for the North American field operations team",counterparty:"Halden Manufacturing",owner:"Priya Raghunathan",value:"$1,120,000",renews:"28 Feb 2026",status:"Needs approval",stage:"attention"},{name:"Master services agreement",counterparty:"Brightline Logistics Group",owner:"Amara Okafor",value:"$248,000",renews:"12 Mar 2026",status:"Active",stage:"signed"},{name:"Reseller agreement",counterparty:"Kestrel Digital",owner:"Amara Okafor",value:"$86,500",renews:"19 Apr 2026",status:"Active",stage:"signed"},{name:"Mutual non-disclosure agreement",counterparty:"Verity Partners",owner:null,value:null,renews:"22 May 2026",status:"Active",stage:"signed"},{name:"Statement of work 14",counterparty:"Halden Manufacturing",owner:"Daniel Whitfield",value:"$312,000",renews:"30 Jun 2026",status:"In review",stage:"drafting"},{name:"Software licence renewal",counterparty:"Northgate Utilities",owner:"Priya Raghunathan",value:"$455,000",renews:"08 Jul 2026",status:"Renewing",stage:"signed"},{name:"Professional services agreement",counterparty:"Larkspur Media",owner:"Daniel Whitfield",value:"$128,400",renews:"15 Aug 2026",status:"Draft",stage:"drafting"},{name:"Supply agreement",counterparty:"Ironbark Components",owner:"Tomas Lindqvist",value:"$674,200",renews:"01 Sep 2026",status:"Active",stage:"signed"},{name:"Security addendum",counterparty:"Kestrel Digital",owner:"Amara Okafor",value:"$24,000",renews:"11 Oct 2026",status:"In review",stage:"drafting"},{name:"Master services agreement",counterparty:"Verity Partners",owner:"Priya Raghunathan",value:"$198,000",renews:"03 Nov 2026",status:"Active",stage:"signed"},{name:"Hosting and infrastructure agreement",counterparty:"Northgate Utilities",owner:"Daniel Whitfield",value:"$530,000",renews:"27 Nov 2026",status:"Needs approval",stage:"attention"},{name:"Consulting retainer",counterparty:"Larkspur Media",owner:"Tomas Lindqvist",value:"$96,000",renews:"14 Dec 2026",status:"Active",stage:"signed"},{name:"Equipment lease",counterparty:"Ironbark Components",owner:"Amara Okafor",value:"$41,750",renews:"20 Jan 2027",status:"Draft",stage:"drafting"}];

let e7 = [{label:"All",stage:null},{label:"Signed",stage:"signed"},{label:"Needs attention",stage:"attention"}];

function ae({status:e}){
  return (
    <span className={eM("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",e9[e],"whitespace-nowrap")}>
        {"Renewing"===e&&<span className="flex h-lh shrink-0 items-center">
          <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
        </span>}
        {e}
      </span>
  );
}

function aa(){
  let[e,a]=useState(false),[r,l]=useState(false),[i,o]=useState(false),s=useRef(null),c=useRef(null),d=useRef(null),u=useRef(undefined),_=()=>Array.from(d.current?.querySelectorAll('[role="menuitem"]')??[]);
  useEffect(()=>{
    if(!e)return;
    let r=s.current?.ownerDocument??document,t=e=>{
      s.current?.contains(e.target)||(a(false),l(false))
    };
    return r.addEventListener("pointerdown",t),()=>r.removeEventListener("pointerdown",t);
  }, [e]),useEffect(()=>{
    e&&_()[0]?.focus({preventScroll:true})
  }, [e]),useEffect(()=>()=>cancelAnimationFrame(u.current??0), []);
  let x=e=>{
    a(true),o(e),e?(l(false),u.current=requestAnimationFrame(()=>l(true))):l(true)
  },b=(e=true)=>{
    a(false),l(false),e&&c.current?.focus({preventScroll:true})
  };
  return (
    <div ref={s} className="relative shrink-0">
        <button ref={c} type="button" aria-haspopup="menu" aria-expanded={e} aria-label="Amara Okafor, account menu" onClick={()=>e?b(false):x(true)} onKeyDown={e=>{
          ("ArrowDown"===e.key||"ArrowUp"===e.key)&&(e.preventDefault(),x(false))
        }} className={eM("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","cursor-pointer")}>
          <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">AO</span>
        </button>
        {e&&<div ref={d} role="menu" aria-label="Account" onKeyDown={e=>{
          let a=_();
          if(0===a.length)return;
          let r=a.indexOf(e.currentTarget.ownerDocument.activeElement);
          switch(e.key){case"Escape":e.preventDefault(),b();break;case"ArrowDown":e.preventDefault(),a[(r+1)%a.length]?.focus({preventScroll:true});break;case"ArrowUp":e.preventDefault(),a[(r-1+a.length)%a.length]?.focus({preventScroll:true});break;case"Home":e.preventDefault(),a[0]?.focus({preventScroll:true});break;case"End":e.preventDefault(),a[a.length-1]?.focus({preventScroll:true});break;case"Tab":b(false)}
        }} className={eM("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",i&&eQ,"absolute right-0 top-[calc(100%+0.5rem)] z-30 w-60",r?"opacity-100":"opacity-0")}>
          <div role="presentation" className="px-2 pb-2 pt-1">
            <p className={eM(eF,"truncate")}>Amara Okafor</p>
            <p className={eM(eI,eT,"truncate")}>amara.okafor@sundialclm.com</p>
          </div>
          {e8.map(e=><button key={e} type="button" role="menuitem" tabIndex={-1} onClick={()=>b()} className="relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40"><span className="truncate">{e}</span></button>)}
        </div>}
      </div>
  );
}

function ar({collapsed:e,onClose:a}){
  let{ref:r,edges:n,onScroll:i}=eE(),o=a=>(
    <li key={a.label}>
        <a href="#contracts" aria-current={a.current?"page":undefined} aria-label={e?a.label:undefined} className={eM("flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]","group relative",e&&"justify-center")}>
          <HugeiconsIcon icon={a.icon} size={18} strokeWidth={2} aria-hidden="true" />
          {e?<span aria-hidden="true" className={eM("pointer-events-none inline-flex min-h-7 w-fit max-w-64 items-center gap-2 rounded-[calc(var(--rb-r-lg,10px))] bg-neutral-900 px-3 py-1 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900",eQ,"absolute left-full top-1/2 z-[70] ml-2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100")}>{a.label}</span>:<>
            <span className="min-w-0 flex-1 truncate">{a.label}</span>
            {a.count&&<span className={eM("ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","shrink-0")}>{a.count}</span>}
          </>}
        </a>
      </li>
  );
  return (
    <div className="flex min-h-0 flex-1 flex-col">
        {a&&<div className="flex h-14 shrink-0 items-center gap-2.5 pl-4 pr-2">
          <span className={eM(eW,"size-8",eF)}>S</span>
          <p className={eM(eF,"min-w-0 flex-1 truncate")}>Sundial</p>
          <button type="button" aria-label="Close navigation" onClick={a} className={eM(eL,eH)}>
            <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>}
        <div className="relative flex min-h-0 flex-1 flex-col">
          <nav ref={r} onScroll={i} aria-label="Primary" className={eM("flex h-full flex-col px-2 py-3",e?"overflow-visible":"overflow-y-auto")}>
            <div className={e?"space-y-4":undefined}>
              {e5.map(a=>(
                <div key={a.label}>
                            {!e&&<p className="px-3 pt-5 pb-1.5 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{a.label}</p>}
                            <ul className="space-y-0.5">{a.items.map(o)}</ul>
                          </div>
              ))}
            </div>
            <ul className="mt-auto space-y-0.5 pt-8">{e6.map(o)}</ul>
          </nav>
          <div aria-hidden="true" className={eM("bg-linear-to-b from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={eM("bg-linear-to-t from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default function app_shell_3__Sorbet__Component(){
  let[e,a]=useState(false),[r,o]=useState(""),[s,d]=useState(e7[0].label),[u,x]=useState(false),[b,p]=useState(false),[h,m]=useState(false),{ref:k,edges:f,onScroll:y}=eE(),j=useRef(null),N=useRef(null),A=useRef(null),S=useRef(null),z=useRef(null),C=useRef(null),D=useRef(false);
  useEffect(()=>{
    let e=requestAnimationFrame(()=>{
      (C.current?.ownerDocument.defaultView??window).matchMedia("(max-width: 1023px)").matches&&p(true)
    });
    return ()=>cancelAnimationFrame(e);
  }, []),useEffect(()=>{
    let e=j.current?.ownerDocument??document,a=e=>{
      (e.metaKey||e.ctrlKey)&&"k"===e.key.toLowerCase()&&(e.preventDefault(),N.current?.focus({preventScroll:true}))
    };
    return e.addEventListener("keydown",a),()=>e.removeEventListener("keydown",a);
  }, []),useEffect(()=>{
    if(!b)return;
    let e=S.current,a=e?.ownerDocument??document,r=requestAnimationFrame(()=>m(true)),t=()=>Array.from(e?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    D.current&&(t()[0]?.focus({preventScroll:true}),D.current=false);
    let n=e=>{
      if("Escape"===e.key){
        p(false),m(false),z.current?.focus({preventScroll:true});
        return
      }
      if("Tab"!==e.key)return;
      let r=t(),n=r[0],l=r[r.length-1];
      n&&l&&(e.shiftKey&&a.activeElement===n?(e.preventDefault(),l.focus({preventScroll:true})):e.shiftKey||a.activeElement!==l||(e.preventDefault(),focus({preventScroll:true})))
    };
    return a.addEventListener("keydown",n),()=>{
      cancelAnimationFrame(r),a.removeEventListener("keydown",n)
    };
  }, [b]),useEffect(()=>{
    u&&A.current?.focus({preventScroll:true})
  }, [u]);
  let R=()=>{
    p(false),m(false),z.current?.focus({preventScroll:true})
  },M=useMemo(()=>{
    let e=r.trim().toLowerCase(),a=e7.find(e=>e.label===s)?.stage??null;
    return e3.filter(r=>(!a||r.stage===a)&&(!e||r.name.toLowerCase().includes(e)||r.counterparty.toLowerCase().includes(e)));
  }, [r,s]),E=(e,a)=>(
    <div className={eM("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10")}>
        <span data-affix className={e$}>
          <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
        </span>
        <input ref={e} type="text" role="searchbox" value={r} onChange={e=>o(e.target.value)} onKeyDown={e=>{
          "Escape"===e.key&&o("")
        }} placeholder="Search contracts and counterparties" aria-label="Search contracts and counterparties" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
        {a&&<span data-affix className={eM(e$,"hidden lg:flex")}>
          <kbd className="inline-flex min-h-5.5 min-w-5.5 w-fit items-center justify-center gap-1 rounded-[calc(var(--rb-r-md,8px))] bg-white px-1.5 font-mono text-[12px]/[16px] font-semibold tabular-nums text-neutral-900/78 dark:text-neutral-100/78 shadow-[0_0_0_1px_rgb(84_62_32/0.14),inset_0_-2px_0_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.06)] select-none dark:bg-neutral-800 dark:shadow-[0_0_0_1px_rgb(0_0_0/0.6),inset_0_-2px_0_rgb(0_0_0/0.4),inset_0_1px_0_rgb(255_255_255/0.08)]">⌘K</kbd>
        </span>}
      </div>
  ),W=M.length===e3.length?`${e3.length} agreements`:`${M.length} of ${e3.length} agreements`;
  return (
    <div ref={j} className={eM("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className={eM(eX,"relative z-20 flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6")}>
          <button ref={z} type="button" aria-label="Open navigation" aria-expanded={b} aria-controls={e2} onClick={()=>{
            D.current=true,p(true)
          }} className={eM(eL,eH,"lg:hidden")}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
          <span className={eM(eW,"size-8",eF)}>S</span>
          <p className={eM(eF,"truncate")}>Sundial</p>
          <button type="button" aria-label={e?"Expand sidebar":"Collapse sidebar"} aria-expanded={!e} aria-controls={e1} onClick={()=>a(e=>!e)} className={eM(eL,eH,"ml-1 max-lg:hidden")}>
            <HugeiconsIcon icon={Icon_40279} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <div className="mx-4 hidden min-w-0 flex-1 justify-center md:flex"><div className="w-full max-w-md">{E(N,true)}</div></div>
          <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
            <button ref={C} type="button" aria-label="Search contracts" aria-expanded={u} onClick={()=>x(e=>!e)} className={eM(eL,eH,"md:hidden")}>
              <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Notifications" className={eM(eL,eH,"max-sm:hidden")}>
              <HugeiconsIcon icon={Icon_13473} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Workspace settings" className={eM(eL,eH,"max-sm:hidden")}>
              <HugeiconsIcon icon={Icon_65174} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Create contract" className={eM("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",eq)}>
              <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
              <span className="hidden sm:inline">Create</span>
            </button>
            <aa />
          </div>
        </header>
        {u&&<div className={eM(eX,"flex shrink-0 items-center gap-2 px-4 py-2 md:hidden")}>
          {E(A,false)}
          <button type="button" aria-label="Close search" onClick={()=>{
            x(false),C.current?.focus({preventScroll:true})
          }} className={eM(eL,eH)}>
            <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>}
        <div className={eM("bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex min-h-0 flex-1")}>
          <aside id={e1} className={eM(eG,"hidden shrink-0 flex-col lg:flex",e?"w-14":"w-64")}><ar collapsed={e} /></aside>
          <div className="flex min-h-0 min-w-0 flex-1 p-2">
            <div className={eM(eK,"min-h-0 flex-1")}>
              <main id="contracts" ref={k} onScroll={y} className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                <h1 className="text-[22px]/[28px] font-extrabold tracking-[-0.01em]">Contracts</h1>
                <div className={eM("@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1","mt-4")}>
                  <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
                    {e4.map(e=>(
                      <div key={e.label} className="flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4">
                                        <p className={eM("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","text-pretty")}>{e.label}</p>
                                        <p className={eM("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100","mt-auto")}>{e.value}</p>
                                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex min-w-0 items-baseline gap-2">
                    <h2 className={eF}>Upcoming renewals</h2>
                    <span className={eM(eI,eT,"shrink-0")}>{W}</span>
                  </div>
                  <div role="radiogroup" aria-label="Filter agreements" onKeyDown={e=>{
                    let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
                    if(0===a)return;
                    e.preventDefault();
                    let r=e7.findIndex(e=>e.label===s),t=e7[(r+a+e7.length)%e7.length];
                    d(t.label);
                    let n=e.currentTarget.querySelectorAll("button");
                    n[e7.indexOf(t)]?.focus({preventScroll:true})
                  }} className={eM("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
                    {e7.map(e=>{
                      let a=e.label===s;
                      return <button key={e.label} type="button" role="radio" aria-checked={a} tabIndex={a?0:-1} onClick={()=>d(e.label)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{e.label}</button>;
                    })}
                  </div>
                </div>
                {0===M.length?<div className={eM(eK,"mt-3 items-center justify-center px-6 py-12 text-center")}>
                  <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No agreements match this search</p>
                  <p className={eM("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>Try a contract name or a counterparty, such as Kestrel Digital.</p>
                  <button type="button" onClick={()=>{
                    o(""),d(e7[0].label)
                  }} className={eM("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",eq,"mt-4")}>Clear search</button>
                </div>:<>
                  <div className={eM("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","mt-3 hidden md:flex")}>
                    <table className={eM("w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium","table-fixed")}>
                      <caption className="sr-only">Agreements by renewal date</caption>
                      <colgroup>
                        <col className="w-[32%]" />
                        <col className="w-[20%]" />
                        <col className="w-[14%]" />
                        <col className="w-[15%]" />
                        <col className="w-[19%]" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col" className={eM(eY,"h-9")}>Contract</th>
                          <th scope="col" className={eM(eY,"h-9")}>Owner</th>
                          <th scope="col" className={eM(eY,e0,"h-9")}>Value</th>
                          <th scope="col" className={eM(eY,"h-9")}>Renews</th>
                          <th scope="col" className={eM(eY,"h-9")}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {M.map(e=>(
                          <tr key={`${e.name}-${e.counterparty}`} className={eM("group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","h-11")}>
                                                <td className={eZ}>
                                                  <div className="min-w-0">
                                                    <a href="#contracts" className={eM(eP,"max-w-full")}><span className="truncate">{e.name}</span></a>
                                                    <p className={eM(eI,eT,"truncate")}>{e.counterparty}</p>
                                                  </div>
                                                </td>
                                                <td className={eZ}>{e.owner&&<span className={eM(eO,"block truncate")}>{e.owner}</span>}</td>
                                                <td className={eM(eZ,e0)}>{e.value}</td>
                                                <td className={eM(eZ,"tabular-nums")}><span className={eO}>{e.renews}</span></td>
                                                <td className={eZ}><ae status={e.status} /></td>
                                              </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <ul className="mt-3 space-y-2 md:hidden">
                    {M.map(e=>(
                      <li key={`${e.name}-${e.counterparty}`} className={eM(eK,"p-4")}>
                                        <a href="#contracts" className={eM(eP,"max-w-full")}><span className="truncate">{e.name}</span></a>
                                        <p className={eM(eI,eT,"mt-0.5 truncate")}>{e.counterparty}</p>
                                        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                                          <div className="min-w-0">
                                            <dt className={eU}>Owner</dt>
                                            <dd className={eV}>{e.owner??<span className={eJ}>None</span>}</dd>
                                          </div>
                                          <div className="min-w-0">
                                            <dt className={eU}>Value</dt>
                                            <dd className={eM(eV,"tabular-nums")}>{e.value??<span className={eJ}>None</span>}</dd>
                                          </div>
                                          <div className="min-w-0">
                                            <dt className={eU}>Renews</dt>
                                            <dd className={eM(eV,"tabular-nums")}>{e.renews}</dd>
                                          </div>
                                          <div className="min-w-0">
                                            <dt className={eU}>Status</dt>
                                            <dd className={eV}><ae status={e.status} /></dd>
                                          </div>
                                        </dl>
                                      </li>
                    ))}
                  </ul>
                </>}
              </main>
              <div aria-hidden="true" className={eM("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 top-0 h-8",f.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={eM("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 bottom-0 h-8",f.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
        {b&&<div className="lg:hidden">
          <button type="button" aria-label="Close navigation overlay" tabIndex={-1} onClick={R} className={eM("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70",eQ,"absolute inset-0 z-30 cursor-pointer",h?"opacity-100":"opacity-0")} />
          <aside ref={S} id={e2} role="dialog" aria-modal="true" aria-label="Navigation" className={eM(eG,"shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",eQ,"absolute inset-y-0 left-0 z-40 flex w-72 max-w-[85%] flex-col",h?"opacity-100":"opacity-0")}><ar collapsed={false} onClose={R} /></aside>
        </div>}
      </div>
  );
}
