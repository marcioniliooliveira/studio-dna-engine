/**
 * React Bits Pro — Application UI (settings-form-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, observe, push, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/80 dark:text-neutral-100/80",
  h = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  m = "min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",
  f = "relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40",
  _ = "transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none",
  k = u("text-[16px]/[20px] font-[450] tracking-[-0.015em]",b),
  v = u("text-[14px]/[16px] font-[450]",b),
  g = u("text-[14px]/[20px] font-normal",h),
  w = u("text-[13px]/[18px] font-normal",x);

function j(e){
  let r=e.ownerDocument.defaultView,a=e.getBoundingClientRect(),t=0,n=r?r.innerHeight:a.bottom;
  for(let a=e.parentElement;a&&r;a=a.parentElement){
    if("visible"===r.getComputedStyle(a).overflowY)continue;
    let e=a.getBoundingClientRect();
    t=Math.max(t,e.top),n=Math.min(n,e.bottom)
  }
  return {above:a.top-t,below:n-a.bottom};
}

let y = [{value:"owner",label:"Owner"},{value:"admin",label:"Admin"},{value:"member",label:"Member"},{value:"billing",label:"Billing"},{value:"viewer",label:"Viewer"}],
  N = [{id:"m1",name:"Mara Whitfield",email:"mara.whitfield@northwind.co",initials:"MW",role:"owner",status:"active"},{id:"m2",name:"Devan Rao",email:"devan@northwind.co",initials:"DR",role:"admin",status:"active"},{id:"m3",name:"Priyanka Balasubramanian",email:"priyanka.b@northwind.co",initials:"PB",role:"member",status:"active"},{id:"m4",name:"Tom Ek",email:"tom@contractors.northwind.co",initials:"TE",role:"viewer",status:"active"},{id:"m5",name:"Jules Moreau",email:"jules.moreau@northwind.co",initials:"JM",role:"member",status:"invited"},{id:"m6",name:"Sofia Castellano",email:"sofia@northwind.co",initials:"SC",role:"billing",status:"active"}];

function C({status:e}){
  let r={active:{tone:"text-neutral-900/80 dark:text-neutral-100/80",label:"Active"},invited:{tone:"text-neutral-900 dark:text-neutral-100",label:"Invited"}}[e];
  return <span className={u("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",r.tone)}>{r.label}</span>;
}

function S({id:e,value:r,onChange:a,options:o,label:d}){
  let c=useId(),[b,x]=useState(false),[h,p]=useState(false),[k,v]=useState(0),[g,w]=useState(false),[y,N]=useState(undefined),C=useRef(null),S=useRef(null),z=useRef({buffer:"",at:0}),D=o.findIndex(e=>e.value===r),E=D>=0?o[D]:undefined,A=e=>{
    let r=C.current;
    if(r){
      let{above:e,below:a}=j(r),t=Math.min(32*o.length+10,264),n=a<t+6&&e>a,l=(n?e:a)-10;
      w(n),N(l<t?Math.max(l,72):undefined)
    }
    p(e),v(D>=0?D:0),x(true)
  };
  useEffect(()=>{
    if(!b)return;
    let e=C.current,r=e?.ownerDocument;
    if(!e||!r)return;
    let a=r=>{
      e.contains(r.target)||x(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [b]),useEffect(()=>{
    if(!b)return;
    let e=S.current,r=e?.querySelector(`[data-index="${k}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [b,k]);
  let R=e=>{
    let r=o[e];
    r&&(a(r.value),x(false),C.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={C} className="relative flex">
        <label htmlFor={e} className="sr-only">{d}</label>
        <button id={e} type="button" role="combobox" aria-expanded={b} aria-controls={c} aria-haspopup="listbox" aria-activedescendant={b?`${c}-${k}`:undefined} onClick={()=>b?x(false):A(false)} onKeyDown={e=>{
          if(!b){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),A(true));
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),x(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),v(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),v(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),v(0);else if("End"===e.key)e.preventDefault(),v(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),R(k);else if(1===e.key.length&&/\S/.test(e.key)){
            let r=Date.now(),a=z.current;
            a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
            let t=o.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
            t>=0&&v(t)
          }
        }} className={u("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","min-w-[0px] flex-1")}>
          <span className="truncate">{E?.label}</span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {b&&<ul ref={S} id={c} role="listbox" tabIndex={-1} style={y?{maxHeight:y}:undefined} className={u(m,!h&&_,"absolute left-0 z-30 max-h-[264px] w-full min-w-full",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,a)=>{
            let n=e.value===r;
            return (
              <li key={e.value} id={`${c}-${a}`} role="option" aria-selected={n} data-highlighted={a===k?"":undefined} data-index={a} onMouseEnter={()=>v(a)} onClick={()=>R(a)} className={u(f,"pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function z({label:e,items:r}){
  let[a,i]=useState(false),[s,d]=useState(false),[c,b]=useState(false),[x,h]=useState(0),p=useRef(null),k=useRef(null),v=useRef([]),g=e=>{
    i(false),e&&k.current?.focus({preventScroll:true})
  };
  useEffect(()=>{
    if(!a)return;
    let e=p.current?.ownerDocument??document,r=e=>{
      p.current&&!p.current.contains(e.target)&&g(false)
    },t=e=>{
      "Escape"===e.key&&(e.stopPropagation(),g(true))
    };
    return e.addEventListener("pointerdown",r),e.addEventListener("keydown",t),()=>{
      e.removeEventListener("pointerdown",r),e.removeEventListener("keydown",t)
    };
  }, [a]),useEffect(()=>{
    a&&v.current[x]?.focus({preventScroll:true})
  }, [a,x]);
  let w=(e,a)=>{
    let t=p.current;
    if(t){
      let{above:e,below:a}=j(t);
      b(a<32*r.length+9*!!r.some(e=>e.danger)+12&&e>a)
    }
    d(a),h(e),i(true)
  },y=e=>h(a=>(a+e+r.length)%r.length);
  return (
    <div ref={p} className="relative shrink-0">
        <button ref={k} type="button" aria-label={e} aria-haspopup="menu" aria-expanded={a} onClick={e=>a?g(false):w(0,0===e.detail)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),w(0,true)):"ArrowUp"===e.key&&(e.preventDefault(),w(r.length-1,true))
        }} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]")}>
          <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
        {a?<div role="menu" aria-label={e} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),y(1)):"ArrowUp"===e.key?(e.preventDefault(),y(-1)):"Home"===e.key?(e.preventDefault(),h(0)):"End"===e.key?(e.preventDefault(),h(r.length-1)):"Tab"===e.key&&g(false)
        }} className={u(m,!s&&_,"absolute right-0 z-30 w-[176px] min-w-[176px]",c?"bottom-9":"top-9")}>
          {r.map((e,r)=>(
            <Fragment key={e.id}>
                    {e.danger?<div role="separator" className="-mx-1 my-1 h-px bg-neutral-900/8 dark:bg-neutral-100/8" />:null}
                    <button ref={e=>{
                      v.current[r]=e
                    }} type="button" role="menuitem" tabIndex={r===x?0:-1} onFocus={()=>h(r)} onClick={()=>{
                      e.run(),g(true)
                    }} className={e.danger?"relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] outline-none select-none [&_svg]:shrink-0 text-[oklch(51%_0.18_26)] hover:bg-[oklch(94.5%_0.027_26)] focus-visible:bg-[oklch(94.5%_0.027_26)] data-[highlighted]:bg-[oklch(94.5%_0.027_26)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-[oklch(76%_0.14_26)] dark:hover:bg-[oklch(29%_0.06_26)] dark:focus-visible:bg-[oklch(29%_0.06_26)] dark:data-[highlighted]:bg-[oklch(29%_0.06_26)] dark:aria-disabled:text-neutral-100/40":f}>{e.label}</button>
                  </Fragment>
          ))}
        </div>:null}
      </div>
  );
}

function D(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:t+l<n-1})
    }, []);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      t();
      let a=r.ownerDocument.defaultView?.ResizeObserver,n=a?new a(t):null;
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),[i,s]=useState(N),[o,m]=useState(""),[f,_]=useState(null),[j,D]=useState("member"),[E,A]=useState(null),R=useRef(N.length);
  useEffect(()=>{
    if(!E)return;
    let e=window.setTimeout(()=>A(null),2400);
    return ()=>window.clearTimeout(e);
  }, [E]);
  let $=(e,r)=>A({id:e,text:r,at:Date.now()}),T=i.length,M=T>=10;
  return (
    <div className={u("bg-white dark:bg-neutral-950",b,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0 px-4 sm:px-6">
          <div className="mx-auto flex h-14 w-full max-w-2xl items-center"><h2 className={u(k,"truncate")}>Members</h2></div>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={a} className="h-full overflow-y-auto px-4 sm:px-6">
            <div className="mx-auto w-full max-w-2xl pb-4 sm:pb-6">
              <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
                <div className={u("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","py-3")}>
                  <div className="min-w-0">
                    <h3 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Team access</h3>
                    <p className={u("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>Invite people and keep role assignments aligned.</p>
                  </div>
                </div>
                <div className={u("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",p)}>
                  <form onSubmit={e=>{
                    e.preventDefault(),(()=>{
                      let e=o.trim();
                      if(M)return _("All seats are in use. Remove a member first.");
                      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))return _("Enter a valid email address.");
                      if(i.some(r=>r.email.toLowerCase()===e.toLowerCase()))return _("That person is already on the team.");
                      _(null);
                      let r=e.split("@")[0].replace(/[._-]+/g," "),a=r.split(" ").map(e=>e[0]?.toUpperCase()??"").slice(0,2).join("");
                      R.current+=1;
                      let t=`m${R.current}`;
                      s(n=>[...n,{id:t,name:r.replace(/\b\w/g,e=>e.toUpperCase()),email:e,initials:a||"?",role:j,status:"invited"}]),m(""),$(t,"Invitation sent")
                    })()
                  }} className="flex flex-col gap-2 px-3 py-2.5">
                    <div className="flex flex-col gap-0.5">
                      <p className="flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Invite member</p>
                      <p id="invite-hint" className="max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">
                        {M?"All seats are in use. Remove a member to invite someone new.":"Send an invitation with the right role from the start."}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <label htmlFor="invite-email" className="sr-only">Email address</label>
                      <div className={u("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","sm:flex-1")}>
                        <input id="invite-email" type="email" placeholder="name@company.com" value={o} aria-invalid={!!f||undefined} aria-describedby={f?"invite-error invite-hint":"invite-hint"} onChange={e=>{
                          m(e.target.value),f&&_(null)
                        }} className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                      </div>
                      <div className="sm:w-40">
                        <S id="invite-role" value={j} onChange={D} label="Role for invite" options={y.filter(e=>"owner"!==e.value)} />
                      </div>
                      <button type="submit" className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                        <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                        Send invite
                      </button>
                    </div>
                    {f?<p id="invite-error" role="alert" className="flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]">
                      <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                      {f}
                    </p>:null}
                  </form>
                  <ul className={u(p,"flex flex-col")}>
                    {i.map(e=>{
                      let r,a="owner"===e.role,n=[];
                      return "invited"===e.status&&push({id:"resend",label:"Resend invite",run:()=>$(e.id,"Invitation resent")}),push({id:"copy",label:"Copy email address",run:()=>{
                        navigator.clipboard?.writeText(e.email),$(e.id,"Email address copied")
                      }}),a||push({id:"remove",label:"Remove from team",danger:true,run:()=>{
                        let r;
                        return r=e.id,s(e=>e.filter(e=>e.id!==r));
                      }}),<li key={e.id} className="flex flex-wrap items-center gap-x-3 gap-y-2.5 px-3 py-2.5">
                        <span aria-hidden="true" className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
                          <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.initials}</span>
                        </span>
                        <div className="min-w-0 flex-1 basis-0">
                          <p className={u(v,"truncate")}>{e.name}</p>
                          <p className={u("text-[12px]/[16px] font-normal tabular-nums",E?.id===e.id?x:h,"truncate")}>{E?.id===e.id?E.text:e.email}</p>
                        </div>
                        <div className="order-last flex w-full items-center gap-3 sm:order-none sm:w-auto">
                          <div className="flex w-20 shrink-0"><C status={e.status} /></div>
                          {a?<p className={u(g,"flex h-8 flex-1 items-center px-3 sm:w-32 sm:flex-none")}>{r=e.role,y.find(e=>e.value===r)?.label??r}</p>:<div className="flex-1 sm:w-32 sm:flex-none">
                            <S id={`role-${e.id}`} value={e.role} onChange={r=>{
                              let a;
                              return a=e.id,s(e=>e.map(e=>e.id===a?{...e,role:r}:e));
                            }} label={`Role for ${e.name}`} options={y.filter(e=>"owner"!==e.value)} />
                          </div>}
                        </div>
                        <z label={`Actions for ${e.name}`} items={n} />
                      </li>;
                    })}
                  </ul>
                </div>
                <div className={u("flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2","justify-between max-sm:flex-col max-sm:items-stretch")}>
                  <p aria-live="polite" className={w}>
                    {E?E.text:<>
                      <span className="tabular-nums">{T}</span>
                      {" of"}
                      {" "}
                      10
                      {" seats used"}
                    </>}
                  </p>
                  <div aria-hidden="true" className={u("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","sm:w-32")}>
                    <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${Math.min(100,T/10*100)}%`}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default D;
