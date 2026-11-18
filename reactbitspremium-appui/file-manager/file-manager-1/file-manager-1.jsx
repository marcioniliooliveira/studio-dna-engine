/**
 * React Bits Pro — Application UI (file-manager-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { children, id, map, name, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_8051 = [["path",{d:"M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_80969 = [["path",{d:"M20 15.0057V10.6606C20 9.84276 20 9.43383 19.8478 9.06613C19.6955 8.69843 19.4065 8.40927 18.8284 7.83096L14.0919 3.09236C13.593 2.59325 13.3436 2.3437 13.0345 2.19583C12.9702 2.16508 12.9044 2.13778 12.8372 2.11406C12.5141 2 12.1614 2 11.4558 2C8.21082 2 6.58831 2 5.48933 2.88646C5.26731 3.06554 5.06508 3.26787 4.88607 3.48998C4 4.58943 4 6.21265 4 9.45908V14.0052C4 17.7781 4 19.6645 5.17157 20.8366C6.11466 21.7801 7.52043 21.9641 10 22M13 2.50022V3.00043C13 5.83009 13 7.24492 13.8787 8.12398C14.7574 9.00304 16.1716 9.00304 19 9.00304H19.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.3267 22L13.1155 20.9142C12.3718 20.2475 12 19.9142 12 19.5C12 19.0858 12.3718 18.7525 13.1155 18.0858L14.3267 17M17.6733 22L18.8845 20.9142C19.6282 20.2475 20 19.9142 20 19.5C20 19.0858 19.6282 18.7525 18.8845 18.0858L17.6733 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_64801 = [["circle",{cx:"9.5",cy:"12.5",r:"1.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 21.5L14.2929 14.7071C14.7456 14.2544 15.3597 14 16 14C16.6403 14 17.2544 14.2544 17.7071 14.7071L19.8138 16.8138",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_19907 = [["path",{d:"M19 14.0052V10.6606C19 9.84276 19 9.43383 18.8478 9.06613C18.6955 8.69843 18.4065 8.40927 17.8284 7.83096L13.0919 3.09236C12.593 2.59325 12.3436 2.3437 12.0345 2.19583C11.9702 2.16508 11.9044 2.13778 11.8372 2.11406C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88646C4.26731 3.06554 4.06508 3.26787 3.88607 3.48998C3 4.58943 3 6.21265 3 9.45908V14.0052C3 17.7781 3 19.6645 4.17157 20.8366C5.11466 21.7801 6.52043 21.9641 9 22M12 2.50022V3.00043C12 5.83009 12 7.24492 12.8787 8.12398C13.7574 9.00304 15.1716 9.00304 18 9.00304H18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 19.5L19.4453 20.4635C20.1297 20.9198 20.4719 21.1479 20.7359 21.0066C21 20.8653 21 20.454 21 19.6315V18.3685C21 17.546 21 17.1347 20.7359 16.9934C20.4719 16.8521 20.1297 17.0802 19.4453 17.5365L18 18.5M18 19.5V18.5M18 19.5C18 20.4346 18 20.9019 17.799 21.25C17.6674 21.478 17.478 21.6674 17.25 21.799C16.9019 22 16.4346 22 15.5 22H15C13.5858 22 12.8787 22 12.4393 21.5607C12 21.1213 12 20.4142 12 19C12 17.5858 12 16.8787 12.4393 16.4393C12.8787 16 13.5858 16 15 16H15.5C16.4346 16 16.9019 16 17.25 16.201C17.478 16.3326 17.6674 16.522 17.799 16.75C18 17.0981 18 17.5654 18 18.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_12556 = [["path",{d:"M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_13449 = [["path",{d:"M13 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13V21M22 17H14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_6097 = [["path",{d:"M5.25 21H18.75C18.9822 21 19.0983 21 19.196 20.9904C20.1456 20.8968 20.8968 20.1456 20.9904 19.196C21 19.0983 21 18.9822 21 18.75C21 18.5178 21 18.4017 20.9904 18.304C20.8968 17.3544 20.1456 16.6032 19.196 16.5096C19.0983 16.5 18.9822 16.5 18.75 16.5H17.0607C16.8324 16.5 16.7182 16.5 16.6087 16.5121C16.2317 16.5538 15.8742 16.7018 15.5781 16.939C15.4921 17.0079 15.4114 17.0886 15.25 17.25C15.0886 17.4114 15.0079 17.4921 14.9219 17.561C14.6258 17.7982 14.2683 17.9462 13.8913 17.9879C13.7818 18 13.6676 18 13.4393 18H10.5607C10.3324 18 10.2182 18 10.1087 17.9879C9.73165 17.9462 9.37423 17.7982 9.07814 17.561C8.99213 17.4921 8.91142 17.4114 8.75 17.25C8.58858 17.0886 8.50787 17.0079 8.42186 16.939C8.12577 16.7018 7.76835 16.5538 7.3913 16.5121C7.28177 16.5 7.16763 16.5 6.93934 16.5H5.25C5.01783 16.5 4.90175 16.5 4.80397 16.5096C3.85441 16.6032 3.10315 17.3544 3.00963 18.304C3 18.4017 3 18.5178 3 18.75C3 18.9822 3 19.0983 3.00963 19.196C3.10315 20.1456 3.85441 20.8968 4.80397 20.9904C4.90175 21 5.01783 21 5.25 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.5 7.49996C16.5 7.49996 13.1858 3.00001 12 3C10.8141 2.99999 7.5 7.5 7.5 7.5M12 4V15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_48240 = [["path",{d:"M8 5.5L20 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L20 12.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 19.5L20 19.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M4.375 5.5H4.25M4.5 5.5C4.5 5.63807 4.38807 5.75 4.25 5.75C4.11193 5.75 4 5.63807 4 5.5C4 5.36193 4.11193 5.25 4.25 5.25C4.38807 5.25 4.5 5.36193 4.5 5.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M4.375 12.5H4.25M4.5 12.5C4.5 12.6381 4.38807 12.75 4.25 12.75C4.11193 12.75 4 12.6381 4 12.5C4 12.3619 4.11193 12.25 4.25 12.25C4.38807 12.25 4.5 12.3619 4.5 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M4.375 19.5H4.25M4.5 19.5C4.5 19.6381 4.38807 19.75 4.25 19.75C4.11193 19.75 4 19.6381 4 19.5C4 19.3619 4.11193 19.25 4.25 19.25C4.38807 19.25 4.5 19.3619 4.5 19.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_19809 = [["path",{d:"M3.88884 9.66294C4.39329 10 5.09552 10 6.49998 10C7.90445 10 8.60668 10 9.11113 9.66294C9.32951 9.51702 9.51701 9.32952 9.66292 9.11114C9.99998 8.60669 9.99998 7.90446 9.99998 6.5C9.99998 5.09554 9.99998 4.39331 9.66292 3.88886C9.51701 3.67048 9.32951 3.48298 9.11113 3.33706C8.60668 3 7.90445 3 6.49998 3C5.09552 3 4.39329 3 3.88884 3.33706C3.67046 3.48298 3.48296 3.67048 3.33705 3.88886C2.99998 4.39331 2.99998 5.09554 2.99998 6.5C2.99998 7.90446 2.99998 8.60669 3.33705 9.11114C3.48296 9.32952 3.67046 9.51702 3.88884 9.66294Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.8888 9.66294C15.3933 10 16.0955 10 17.5 10C18.9044 10 19.6067 10 20.1111 9.66294C20.3295 9.51702 20.517 9.32952 20.6629 9.11114C21 8.60669 21 7.90446 21 6.5C21 5.09554 21 4.39331 20.6629 3.88886C20.517 3.67048 20.3295 3.48298 20.1111 3.33706C19.6067 3 18.9044 3 17.5 3C16.0955 3 15.3933 3 14.8888 3.33706C14.6705 3.48298 14.483 3.67048 14.337 3.88886C14 4.39331 14 5.09554 14 6.5C14 7.90446 14 8.60669 14.337 9.11114C14.483 9.32952 14.6705 9.51702 14.8888 9.66294Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3.88884 20.6629C4.39329 21 5.09552 21 6.49998 21C7.90445 21 8.60668 21 9.11113 20.6629C9.32951 20.517 9.51701 20.3295 9.66292 20.1111C9.99998 19.6067 9.99998 18.9045 9.99998 17.5C9.99998 16.0955 9.99998 15.3933 9.66292 14.8889C9.51701 14.6705 9.32951 14.483 9.11113 14.3371C8.60668 14 7.90445 14 6.49998 14C5.09552 14 4.39329 14 3.88884 14.3371C3.67046 14.483 3.48296 14.6705 3.33705 14.8889C2.99998 15.3933 2.99998 16.0955 2.99998 17.5C2.99998 18.9045 2.99998 19.6067 3.33705 20.1111C3.48296 20.3295 3.67046 20.517 3.88884 20.6629Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.8888 20.6629C15.3933 21 16.0955 21 17.5 21C18.9044 21 19.6067 21 20.1111 20.6629C20.3295 20.517 20.517 20.3295 20.6629 20.1111C21 19.6067 21 18.9045 21 17.5C21 16.0955 21 15.3933 20.6629 14.8889C20.517 14.6705 20.3295 14.483 20.1111 14.3371C19.6067 14 18.9044 14 17.5 14C16.0955 14 15.3933 14 14.8888 14.3371C14.6705 14.483 14.483 14.6705 14.337 14.8889C14 15.3933 14 16.0955 14 17.5C14 18.9045 14 19.6067 14.337 20.1111C14.483 20.3295 14.6705 20.517 14.8888 20.6629Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let z = (...e)=>e.filter(Boolean).join(" "),
  A = "text-neutral-900 dark:text-neutral-100",
  S = "text-neutral-900/66 dark:text-neutral-100/66",
  C = "text-[13px]/[18px] font-normal",
  M = "text-[14px]/[16px] font-[450]",
  B = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  T = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  L = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  W = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  P = "relative inline-flex size-4 shrink-0 items-center justify-center",
  I = "peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40",
  D = "pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]",
  $ = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  E = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  O = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  R = "text-right tabular-nums",
  V = z(C,S),
  H = z("text-[12px]/[16px] font-normal tabular-nums",S),
  K = z(C,"text-neutral-900/80 dark:text-neutral-100/80"),
  G = z("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","active:bg-neutral-900/8 dark:active:bg-neutral-100/8",B),
  F = z("bg-neutral-900/9 dark:bg-neutral-100/9",B),
  U = z("bg-white dark:bg-neutral-900","border border-neutral-900/50 dark:border-neutral-100/50","rounded-[var(--rb-r-lg,10px)]",A),
  Y = [{id:"drive",name:"My Drive",children:[{id:"deliverables",name:"Client Deliverables",children:[{id:"northwind",name:"Northwind Rebrand"},{id:"harbor",name:"Harbor Coffee"}]},{id:"brand",name:"Brand Library",children:[{id:"logos",name:"Logos"},{id:"type",name:"Typefaces"}]},{id:"spring",name:"Spring Campaign",children:[{id:"assets",name:"Assets"}]},{id:"ops",name:"Studio Operations"}]}],
  q = [{id:"r1",parent:"drive",folderId:"brand",name:"Brand Library",icon:Icon_8051,owner:"Theo Park",initials:"TP",bytes:1022e5,size:"102.2 MB",sub:"8 items",modified:"Last week",rank:1},{id:"r2",parent:"drive",folderId:"deliverables",name:"Client Deliverables",icon:Icon_8051,owner:"Priya Patel",initials:"PP",bytes:4822e5,size:"482.2 MB",sub:"11 items",modified:"Yesterday",rank:3,starred:true},{id:"r3",parent:"drive",folderId:"spring",name:"Spring Campaign",icon:Icon_8051,owner:"Leo Grant",initials:"LG",bytes:9882e5,size:"988.2 MB",sub:"10 items",modified:"Today",rank:4,starred:true},{id:"r4",parent:"drive",folderId:"ops",name:"Studio Operations",icon:Icon_8051,owner:"Nora Vale",initials:"NV",bytes:246e6,size:"246.0 MB",sub:"4 items",modified:"2 days ago",rank:2},{id:"r5",parent:"brand",name:"brand-tokens.json",icon:Icon_80969,owner:"Kenji Tan",initials:"KT",bytes:64e3,size:"64.0 KB",modified:"Last week",rank:1},{id:"r6",parent:"logos",name:"wordmark-lockup.png",icon:Icon_64801,owner:"Theo Park",initials:"TP",bytes:28e5,size:"2.8 MB",modified:"Last week",rank:1},{id:"r7",parent:"ops",name:"New Hire Onboarding.pdf",icon:Icon_31964,owner:"Mira Stone",initials:"MS",bytes:16e6,size:"16.0 MB",modified:"3 weeks ago",rank:0},{id:"r8",parent:"ops",name:"Q3 Studio Plan.pdf",icon:Icon_31964,owner:"Nora Vale",initials:"NV",bytes:11e6,size:"11.0 MB",modified:"Today",rank:4,starred:true},{id:"r9",parent:"assets",name:"Studio Reel 2026.mp4",icon:Icon_19907,owner:"Leo Grant",initials:"LG",bytes:64e6,size:"64.0 MB",modified:"Today",rank:4},{id:"r10",parent:"northwind",name:"Northwind key visual.png",icon:Icon_64801,owner:"Priya Patel",initials:"PP",bytes:124e5,size:"12.4 MB",modified:"Today",rank:4},{id:"r11",parent:"harbor",name:"Harbor menu board.pdf",icon:Icon_31964,owner:"Mira Stone",initials:"MS",bytes:54e5,size:"5.4 MB",modified:"2 days ago",rank:2},{id:"r12",parent:"type",name:"specimen-grotesk.pdf",icon:Icon_31964,owner:"Kenji Tan",initials:"KT",bytes:31e5,size:"3.1 MB",modified:"Yesterday",rank:3}],
  Q = [{id:"shared",icon:Icon_88366,label:"Shared with me"},{id:"recent",icon:Icon_29635,label:"Recent"},{id:"starred",icon:Icon_12556,label:"Starred"},{id:"bin",icon:Icon_96037,label:"Bin"}],
  J = new Map;

!function e(r){
  r.forEach(r=>{
    J.set(r.id,r.name),r.children&&e(r.children)
  })
}(Y);

let X = new Map;

!function e(r){
  let a=[r.id];
  return r.children?.forEach(r=>a.push(...e(r))),X.set(r.id,a),a;
}(Y[0]);

let Z = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let i="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[i].focus(),a[i].click()
};

function ee(){
  let[e,r]=useState(["drive","deliverables"]),[a,s]=useState("drive"),[o,d]=useState(null),[c,u]=useState(""),[b,x]=useState([]),[C,B]=useState("list"),[ee,er]=useState({key:"name",asc:true}),[ea,et]=useState(q.filter(e=>e.starred).map(e=>e.id)),ei=useMemo(()=>{
    let e;
    if("starred"===o)e=q.filter(e=>ea.includes(e.id));else if("recent"===o)e=q.filter(e=>e.rank>=3);else if("shared"===o)e=q.filter(e=>"Nora Vale"!==e.owner);else if("bin"===o)e=[];else{
      let r=X.get(a)??[a];
      e=q.filter(e=>r.includes(e.parent))
    }
    let r=c.trim().toLowerCase();
    r&&(e=e.filter(e=>e.name.toLowerCase().includes(r)));
    let t=ee.asc?1:-1;
    return [...e].sort((e,r)=>"size"===ee.key?(e.bytes-r.bytes)*t:"modified"===ee.key?(e.rank-r.rank)*t:e.name.localeCompare(r.name)*t);
  }, [a,o,c,ee,ea]),en=ei.map(e=>e.id),el=en.length>0&&en.every(e=>b.includes(e)),{ref:es,edges:eo,onScroll:ed}=function(e){
    let r=useRef(null),[a,t]=useState({start:false,end:false}),n=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:a,scrollHeight:i,clientHeight:n}=e;
      t({start:a>1,end:Math.ceil(a+n)<i-1})
    }, []);
    return useEffect(()=>{
      n();
      let e=r.current,a=e?.ownerDocument.defaultView;
      if(!e||!a?.ResizeObserver)return;
      let t=new a.ResizeObserver(n);
      return t.observe(e),()=>t.disconnect();
    }, [e,n]),{ref:r,edges:a,onScroll:n};
  }(`${C}:${en.join()}`),ec=e=>x(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e]),eu=e=>{
    s(e),d(null),x([]),u(""),r(r=>r.includes(e)?r:[...r,e])
  },eb=(i,s=0)=>map(i=>{
    let d=e.includes(id),c=!o&&a===id;
    return (
      <li key={id}>
            <div aria-current={c?"page":undefined} style={{paddingLeft:4+14*s}} className={z($,"relative")}>
              {children?<button type="button" aria-label={`${d?"Collapse":"Expand"} ${name}`} aria-expanded={d} onClick={()=>r(e=>e.includes(id)?e.filter(e=>e!==id):[...e,id])} className={z("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","rounded-[var(--rb-r-xs,4px)]","group relative z-10 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center")}>
                <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
              </button>:<span aria-hidden className="size-5 shrink-0" />}
              <button type="button" aria-current={c?"page":undefined} onClick={()=>eu(id)} className={z("min-w-0 truncate outline-none after:absolute after:inset-0 after:rounded-[var(--rb-r-sm,6px)] after:content-[''] focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:after:outline-[var(--rb-accent,oklch(100%_0_0))]","flex flex-1 cursor-pointer items-center gap-2 text-left")}>
                <HugeiconsIcon icon={Icon_8051} size={16} strokeWidth={1.8} aria-hidden="true" />
                <span className="truncate">{name}</span>
              </button>
            </div>
            {children&&d&&<ul className="space-y-0.5">{eb(children,s+1)}</ul>}
          </li>
    );
  }),eh=o?Q.find(e=>e.id===o)?.label??"Files":J.get(a)??"My Drive";
  return (
    <div className={z("bg-white dark:bg-neutral-950",A,"flex h-full min-h-[800px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={z("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1 gap-1")}>
          <div className={z("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","flex-wrap justify-between gap-3 py-3 has-[button]:pe-4")}>
            <div className="min-w-0">
              <h2 className={z("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Halcyon Drive</h2>
              <p className={z(V,"mt-0.5 truncate")}>Shared studio files and folders</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" className={z(T,W)}>
                <HugeiconsIcon icon={Icon_13449} size={16} strokeWidth={1.8} aria-hidden="true" />
                New folder
              </button>
              <button type="button" className={z("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",W)}>
                <HugeiconsIcon icon={Icon_6097} size={16} strokeWidth={1.8} aria-hidden="true" />
                Upload
              </button>
            </div>
          </div>
          <div className="grid min-h-0 flex-1 gap-1 lg:grid-cols-[248px_1fr]">
            <aside className="hidden min-h-0 flex-col lg:flex">
              <div className="min-h-0 flex-1 overflow-y-auto p-2">
                <ul className="space-y-0.5">{eb(Y)}</ul>
                <ul className="mt-4 space-y-0.5">
                  {Q.map(({id:e,icon:r,label:a})=>(
                    <li key={e}>
                                    <button type="button" aria-current={o===e?"page":undefined} onClick={()=>{
                                      d(e),x([]),u("")
                                    }} className={$}>
                                      <HugeiconsIcon icon={r} size={16} strokeWidth={1.8} aria-hidden="true" />
                                      <span className="truncate">{a}</span>
                                    </button>
                                  </li>
                  ))}
                </ul>
              </div>
              <div className={z("border-t border-neutral-900/8 dark:border-neutral-100/8","p-3")}>
                <div className="px-1">
                  <p className="flex items-baseline justify-between gap-2">
                    <span className="text-[12px]/[16px] font-[450] tabular-nums">Storage</span>
                    <span className={H}>88% full</span>
                  </p>
                  <div role="progressbar" aria-valuenow={88} aria-valuemin={0} aria-valuemax={100} aria-label="Storage used" className={z("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-2")}>
                    <div style={{width:"88%"}} className={z("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","h-full")} />
                  </div>
                  <p className={z(H,"mt-2")}>1.77 TB of 2.00 TB used</p>
                </div>
              </div>
            </aside>
            <div className="flex min-h-0 min-w-0 flex-col gap-1">
              <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2">
                <p className={M}>{eh}</p>
                <div className="flex flex-1 items-center justify-end gap-2">
                  <label htmlFor="file-manager-1-search" className="sr-only">Search files</label>
                  <div className={z("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","max-w-[240px] flex-1")}>
                    <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                      <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <input id="file-manager-1-search" value={c} onChange={e=>u(e.target.value)} placeholder="Search files" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                  </div>
                  <div role="radiogroup" aria-label="View mode" onKeyDown={Z} className={z("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
                    {[{key:"list",icon:Icon_48240,label:"List view"},{key:"grid",icon:Icon_19809,label:"Grid view"}].map(({key:e,icon:r,label:a})=><button key={e} type="button" role="radio" aria-label={a} aria-checked={C===e} tabIndex={C===e?0:-1} onClick={()=>B(e)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-2 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40"><HugeiconsIcon icon={r} size={16} strokeWidth={1.8} aria-hidden="true" /></button>)}
                  </div>
                </div>
              </div>
              <div className={z("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
                <div ref={es} onScroll={ed} className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
                  {0===ei.length?<div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                    <HugeiconsIcon icon={Icon_8051} size={24} strokeWidth={1.8} aria-hidden="true" className={S} />
                    <p className={z("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-3")}>Nothing here</p>
                    <div className="mt-1 max-w-[280px]">
                      <p className="max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">{c?`No files match “${c}” in this location.`:"This location is empty."}</p>
                    </div>
                    {c&&<button type="button" onClick={()=>u("")} className={z(T,W,"mt-3")}>Clear search</button>}
                  </div>:"grid"===C?<ul className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {ei.map(e=>{
                      let r=b.includes(e.id);
                      return (
                        <li key={e.id}>
                                            <button type="button" aria-pressed={e.folderId?undefined:r} onClick={()=>e.folderId?eu(e.folderId):ec(e.id)} className={z(r&&!e.folderId?U:"relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","relative flex w-full min-w-0 cursor-pointer flex-col overflow-hidden text-left")}>
                                              <span className={z(r&&!e.folderId?F:G,"flex flex-col p-2")}>
                                                <span className={z("bg-neutral-900/8 dark:bg-neutral-100/8","rounded-[var(--rb-r-sm,6px)]","flex aspect-[4/3] items-center justify-center")}>
                                                  <HugeiconsIcon icon={e.icon} size={24} strokeWidth={1.8} aria-hidden="true" className={S} />
                                                </span>
                                                <span className="block px-2 pt-3 pb-2">
                                                  <span className={z(M,"block truncate")}>{e.name}</span>
                                                  <span className={z(H,"mt-0.5 flex gap-x-2 truncate")}>
                                                    <span>{e.size}</span>
                                                    <span>{e.modified}</span>
                                                  </span>
                                                </span>
                                              </span>
                                            </button>
                                          </li>
                      );
                    })}
                  </ul>:<table className="w-full border-separate border-spacing-0 text-left text-[14px]/[20px]">
                    <caption className="sr-only">
                      {"Files in "}
                      {eh}
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" className={z(E,"w-9")}>
                          <span className={P}>
                            <input type="checkbox" aria-label="Select all files" checked={el} onChange={()=>x(el?[]:en)} className={I} />
                            <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={D} />
                          </span>
                        </th>
                        {[{key:"name",label:"Name",cls:"w-1/2",end:false},{key:"size",label:"Size",cls:"hidden sm:table-cell",end:true},{key:"modified",label:"Modified",cls:"hidden lg:table-cell",end:true}].map(({key:e,label:r,cls:a,end:i})=>{
                          let l=<HugeiconsIcon icon={ee.key===e?ee.asc?Icon_40972:Icon_54345:Icon_31517} size={12} strokeWidth={1.8} aria-hidden="true" />;
                          return (
                            <th key={e} scope="col" aria-sort={ee.key===e?ee.asc?"ascending":"descending":"none"} className={z(E,a)}>
                                                    <div className={z("flex",i&&"justify-end")}>
                                                      <button type="button" onClick={()=>er(r=>r.key===e?{key:e,asc:!r.asc}:{key:e,asc:true})} data-sorted={ee.key===e?"":undefined} className="-mx-1.5 inline-flex h-7 min-w-0 cursor-pointer items-center gap-1 rounded-[var(--rb-r-sm,6px)] px-1.5 hover:bg-neutral-900/5 hover:text-neutral-900 data-sorted:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:data-sorted:text-neutral-100">
                                                        {i&&l}
                                                        {r}
                                                        {!i&&l}
                                                      </button>
                                                    </div>
                                                  </th>
                          );
                        })}
                        <th scope="col" className={z(E,"hidden md:table-cell")}>Owner</th>
                        <th scope="col" className={z(E,"w-10")}><span className="sr-only">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ei.map(e=>{
                        let r=b.includes(e.id),a=ea.includes(e.id);
                        return (
                          <tr key={e.id} aria-selected={r} className="group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9">
                                                <td className={O}>
                                                  <span className={P}>
                                                    <input type="checkbox" aria-label={`Select ${e.name}`} checked={r} onChange={()=>ec(e.id)} className={I} />
                                                    <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={D} />
                                                  </span>
                                                </td>
                                                <td className={O}>
                                                  <span className="flex min-w-0 items-center gap-2">
                                                    <HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" className={z(S,"shrink-0")} />
                                                    {e.folderId?<button type="button" onClick={()=>eu(e.folderId)} className={z("inline-flex min-h-6 items-center gap-1 rounded-[var(--rb-r-sm,6px)] text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","min-w-0 cursor-pointer")}><span className="truncate">{e.name}</span></button>:<span className={z(M,"truncate")}>{e.name}</span>}
                                                    <button type="button" aria-label={a?`Unstar ${e.name}`:`Star ${e.name}`} aria-pressed={a} onClick={()=>et(r=>r.includes(e.id)?r.filter(r=>r!==e.id):[...r,e.id])} className={z(L,"size-6 rounded-[var(--rb-r-sm,6px)]")}>
                                                      <HugeiconsIcon icon={Icon_12556} size={16} strokeWidth={1.8} aria-hidden="true" className={a?z(A,"[&_path]:fill-current"):S} />
                                                    </button>
                                                  </span>
                                                </td>
                                                <td className={z(O,R,"hidden py-2.5 sm:table-cell")}>
                                                  <span className={z(K,"block")}>{e.size}</span>
                                                  {e.sub&&<span className={z(H,"mt-0.5 block")}>{e.sub}</span>}
                                                </td>
                                                <td className={z(O,R,"hidden lg:table-cell")}><span className={K}>{e.modified}</span></td>
                                                <td className={z(O,"hidden md:table-cell")}>
                                                  <span className="flex items-center gap-2">
                                                    <span aria-hidden className={z("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                                                      <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.initials.slice(0,1)}</span>
                                                    </span>
                                                    <span className={z(K,"truncate")}>{e.owner}</span>
                                                  </span>
                                                </td>
                                                <td className={O}>
                                                  <button type="button" aria-label={`Actions for ${e.name}`} className={z(L,"size-7 rounded-[var(--rb-r-sm,6px)]")}>
                                                    <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                  </button>
                                                </td>
                                              </tr>
                        );
                      })}
                    </tbody>
                  </table>}
                </div>
                <div aria-hidden="true" className={z("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",eo.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={z("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",eo.end?"opacity-100":"opacity-0")} />
              </div>
              {b.length>0&&<div role="status" className={z("flex h-11 max-w-full items-center gap-1 rounded-[var(--rb-r-lg,10px)] bg-neutral-900 py-2 ps-4 pe-2 text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","mx-2 mb-2 justify-between gap-2")}>
                <p className={M}>
                  <span className="tabular-nums">{b.length}</span>
                  {" "}
                  selected
                </p>
                <button type="button" onClick={()=>x([])} className="inline-flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-white/10 px-3 text-[14px]/[16px] font-[450] transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-white/16 active:bg-white/28 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent-fg,oklch(100%_0_0))] dark:bg-neutral-900/10 dark:hover:bg-neutral-900/16 dark:active:bg-neutral-900/28 dark:focus-visible:outline-[var(--rb-accent-fg,oklch(20.5%_0_0))]">Clear</button>
              </div>}
            </div>
          </div>
        </div>
      </div>
  );
}


export default ee;
