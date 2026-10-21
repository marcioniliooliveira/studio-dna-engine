import { p as F } from "./motion.C0Ky0Fmd.js";
import { s as E } from "./safeRefresh.B6s9ntyA.js";
import { g as c, S as b } from "./setup.ehf6vWB0.js";
import { r as J, c as K } from "./horizontalScrollContainer.CTQOhTfX.js";

const Z = 249, ee = 140, te = 85, re = 152, oe = 1.6, A = 8;

function syncViewportClip(pp, cur, tHoldEnd) {
  const viewportEl = document.getElementById('jesper-work-stage-viewport');
  if (!viewportEl) return;

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const rectEl = isMobile
    ? (document.querySelector('[data-more-work-mobile-rect]') || document.querySelector('[data-more-work-rect]'))
    : (document.querySelector('[data-more-work-rect]') || document.querySelector('[data-more-work-mobile-rect]'));

  if (viewportEl.hasAttribute('data-lenis-prevent')) {
    viewportEl.removeAttribute('data-lenis-prevent');
    viewportEl.removeAttribute('data-lenis-prevent-wheel');
    viewportEl.removeAttribute('data-lenis-prevent-touch');
  }

  if (pp >= 0.999) {
    if (viewportEl.style.clipPath !== 'none') viewportEl.style.clipPath = 'none';
    if (viewportEl.style.opacity !== '1') viewportEl.style.opacity = '1';
    viewportEl.style.pointerEvents = 'auto';
  } else if (pp <= 0.001) {
    if (viewportEl.style.clipPath !== 'polygon(0 0, 0 0, 0 0, 0 0)') {
      viewportEl.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)';
    }
    if (viewportEl.style.opacity !== '0') viewportEl.style.opacity = '0';
    viewportEl.style.pointerEvents = 'none';
  } else {
    viewportEl.style.pointerEvents = 'none';
    if (rectEl) {
      const r = rectEl.getBoundingClientRect();
      if (viewportEl.style.opacity !== '1') viewportEl.style.opacity = '1';
      viewportEl.style.clipPath = `polygon(${r.left}px ${r.top}px, ${r.right}px ${r.top}px, ${r.right}px ${r.bottom}px, ${r.left}px ${r.bottom}px)`;
    } else {
      if (viewportEl.style.clipPath !== 'none') viewportEl.style.clipPath = 'none';
      viewportEl.style.opacity = String(Math.max(0, Math.min(1, pp)));
    }
  }
}

if (typeof window != "undefined") {
  window.__SYNC_VIEWPORT_CLIP__ = syncViewportClip;
  if (!window.__TEST_SET_PORTAL_PROGRESS__) {
    window.__TEST_SET_PORTAL_PROGRESS__ = function(pp, cur, tHoldEnd) {
      syncViewportClip(pp, cur, tHoldEnd);
      if (window.__WORK_STAGE__) {
        window.__WORK_STAGE__.portalProgress = pp;
        window.__WORK_STAGE__.floorAlpha = pp;
        window.__WORK_STAGE__.phase = pp >= 0.99 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND';
      }
    };
  }
}

function fe(e) {
  const t = e.querySelector("[data-horizontal-pin]"),
        r = e.querySelector("[data-horizontal-track]");
  if (!t || !r) return () => {};
  const o = c.matchMedia(),
        l = c.timeline({ defaults: { ease: "none" } }),
        w = window.matchMedia("(min-width: 768px)");
  let m, y = !1;
  return J(l),
  o.add("(min-width: 768px)", () => {
    let triggerPortalExit = null;
    const n = r.querySelector("[data-more-work-section]"),
          i = n?.querySelector("[data-more-work-rect]"),
          u = n?.querySelector("[data-more-work-more]"),
          a = n?.querySelector("[data-more-work-work]"),
          f = () => {
            I(n), c.set([r, i, u, a].filter(Boolean), { clearProps: "transform" });
          },
          g = () => {
            f(), requestAnimationFrame(() => { f(), requestAnimationFrame(f); });
          };
    let d;
    const s = l;
    let T = !0;
    const x = () => {
      const P = d?.progress ?? m;
      d?.kill(!0, !0), s.clear(), f();
      const v = se(t),
            h = Math.max(0, r.scrollWidth - v.width);
      if (!F() && n && i && u && a) {
        const k = -n.offsetLeft + (v.width - n.offsetWidth) / 2,
              p = Math.max(0, -k),
              Q = Math.max(0, h - p),
              M_in = v.height,
              M_hold = v.height * 2.5,
              M_out = v.height * 1.0,
              U = h + M_in + M_hold + M_out,
              t1 = p,
              t2 = p + M_in,
              t3 = p + M_in + M_hold,
              t4 = p + M_in + M_hold + M_out,
              L = G(i, { width: Z, height: ee }),
              W = V(L, v),
              O = (L.width / 2) * W,
              R = $(oe),
              _ = R,
              q = -R,
              D = ce({
                mwRect: i,
                mwMore: u,
                mwWork: a,
                coverScale: W,
                textOffset: O,
                moreInitialX: _,
                workStaggerX: q
              }) / 2,
              C = _ + D,
              Y = -O + D,
              H = q + D,
              j = O + D;

        c.set(i, { scale: 0, transformOrigin: "center center", force3D: !0 });
        c.set(u, { x: C, force3D: !0 });
        c.set(a, { x: H, force3D: !0 });

        s.fromTo(r, { x: 0 }, { x: k, duration: p });
        s.addLabel("mwPause");
        s.fromTo(i, { scale: 0 }, { scale: W, force3D: !0, duration: M_in }, "mwPause");
        s.fromTo(u, { x: C }, { x: Y, force3D: !0, duration: M_in }, "mwPause");
        s.fromTo(a, { x: H }, { x: j, force3D: !0, duration: M_in }, "mwPause");
        s.addLabel("mwHold");
        s.to(i, { scale: W, duration: M_hold, ease: "none" }, "mwHold");
        s.addLabel("mwExit");
        s.fromTo(i, { scale: W }, { scale: 0, force3D: !0, duration: M_out, ease: "none" }, "mwExit");
        s.fromTo(u, { x: Y }, { x: C, force3D: !0, duration: M_out, ease: "none" }, "mwExit");
        s.fromTo(a, { x: j }, { x: H, force3D: !0, duration: M_out, ease: "none" }, "mwExit");
        s.addLabel("mwResume");
        s.fromTo(r, { x: k }, { x: -h, duration: Q }, "mwResume");

        let _lastDesktopPP = -1;
        d = b.create({
          trigger: t,
          animation: s,
          start: "top top",
          end: `+=${U}`,
          pin: !0,
          scrub: !0,
          anticipatePin: 1,
          invalidateOnRefresh: !0,
          fastScrollEnd: !0,
          preventOverlaps: !0,
          refreshPriority: 1,
          onUpdate: self => {
            const cur = s.time();
            let pp = 0;
            if (cur < t1) {
              pp = 0;
            } else if (cur < t2) {
              pp = Math.min(1, Math.max(0, (cur - t1) / M_in));
            } else if (cur <= t3) {
              pp = 1.0;
            } else if (cur <= t4) {
              pp = Math.max(0, Math.min(1, 1 - (cur - t3) / M_out));
            } else {
              pp = 0;
            }
            const delta = Math.abs(pp - _lastDesktopPP);
            if (delta >= 0.005 || (pp === 0 && _lastDesktopPP !== 0) || (pp === 1 && _lastDesktopPP !== 1)) {
              _lastDesktopPP = pp;
              if (typeof window != "undefined") {
                if (window.__TEST_SET_PORTAL_PROGRESS__) {
                  window.__TEST_SET_PORTAL_PROGRESS__(pp, cur, t3);
                } else {
                  syncViewportClip(pp, cur, t3);
                  if (window.__WORK_STAGE__) {
                    window.__WORK_STAGE__.portalProgress = pp;
                    window.__WORK_STAGE__.floorAlpha = pp;
                    window.__WORK_STAGE__.phase = pp >= 0.99 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND';
                  }
                }
              }
            }
          }
        });

        if (typeof window != "undefined") {
          window.__TEST_SCROLL_TO_PORTAL_PROGRESS__ = tp => {
            const cl = Math.min(1, Math.max(0, tp));
            const tgt = d.start + p + cl * M_in;
            s.time(p + cl * M_in);
            const lenisInst = (typeof window !== 'undefined') ? (window.lenis || window.__lenis || window.__LENIS__) : null;
            if (lenisInst && typeof lenisInst.scrollTo === 'function') {
              lenisInst.scrollTo(tgt, { immediate: true });
            }
            window.scrollTo(0, tgt);
            d.scroll(tgt);
            d.update();
            syncViewportClip(cl, p + cl * M_in, t3);
            typeof window != "undefined" && window.__TEST_SET_PORTAL_PROGRESS__ && window.__TEST_SET_PORTAL_PROGRESS__(cl);
          };

          if (triggerPortalExit) {
            window.removeEventListener('work-portal-exit-request', triggerPortalExit);
          }
          triggerPortalExit = () => {
            const lenisInst = (typeof window !== 'undefined') ? (window.lenis || window.__lenis || window.__LENIS__) : null;
            const startExitScroll = d.start + t3;
            const endExitScroll = d.start + t4;
            const servicesOffset = Math.min(Q, Math.max(300, v.width * 0.45));
            const targetScroll = endExitScroll + servicesOffset;

            s.time(t3);
            if (lenisInst && typeof lenisInst.scrollTo === 'function') {
              lenisInst.scrollTo(startExitScroll, { immediate: true });
            }
            window.scrollTo(0, startExitScroll);
            d.scroll(startExitScroll);
            d.update();

            if (lenisInst && typeof lenisInst.scrollTo === 'function') {
              lenisInst.scrollTo(targetScroll, {
                duration: 1.4,
                easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
              });
            } else {
              const scrollObj = { y: startExitScroll };
              c.to(scrollObj, {
                y: targetScroll,
                duration: 1.4,
                ease: "power2.inOut",
                onUpdate: () => {
                  window.scrollTo(0, scrollObj.y);
                  d.scroll(scrollObj.y);
                  d.update();
                }
              });
            }
          };

          window.__TRIGGER_PORTAL_EXIT__ = triggerPortalExit;
          window.addEventListener('work-portal-exit-request', triggerPortalExit);
        }
      } else {
        s.fromTo(r, { x: 0 }, { x: -h });
        d = b.create({
          trigger: t,
          animation: s,
          start: "top top",
          end: `+=${h}`,
          pin: !0,
          scrub: !0,
          anticipatePin: 1,
          invalidateOnRefresh: !0,
          fastScrollEnd: !0,
          preventOverlaps: !0,
          refreshPriority: 1
        });
      }
      typeof P == "number" && d && ie(d, P);
    };
    x(),
    document.fonts.ready.then(() => { T && (x(), E()); });
    const S = X(() => { T && (x(), E()); }, 150);
    return window.addEventListener("resize", S), () => {
      if (triggerPortalExit) {
        window.removeEventListener('work-portal-exit-request', triggerPortalExit);
      }
      T = !1, S.cancel(), window.removeEventListener("resize", S), m = d?.progress ?? m, d?.kill(!0, !0), s.clear(), g(), !y && !w.matches && (ne(m), E());
    };
  }),
  o.add("(max-width: 767px)", () => {
    const n = r.querySelector("[data-more-work-section]"),
          i = n?.querySelector("[data-more-work-mobile-rect]"),
          u = n?.querySelector("[data-more-work-more]"),
          a = n?.querySelector("[data-more-work-work]");
    if (!n || !i || !u || !a || F()) return;
    let f, g, d = !0;
    const s = () => {
      I(n), c.set([i, u, a].filter(Boolean), { clearProps: "transform" });
    },
    T = () => {
      f?.kill(!0, !0), g?.kill(), s();
      const P = n.offsetHeight,
            P_in = P,
            P_hold = P * 1.5,
            P_out = P * 0.8,
            P_total = P_in + P_hold + P_out,
            v = G(i, { width: te, height: re }),
            h = V(v, { width: n.offsetWidth, height: n.offsetHeight }),
            k = v.height / 2 * h;
      c.set(i, { scale: 0, transformOrigin: "center center", force3D: !0 }),
      c.set([u, a], { x: 0, xPercent: -50, y: 0, force3D: !0 });
      const p = c.timeline({ defaults: { ease: "none" } });
      p.fromTo(i, { scale: 0 }, { scale: h, force3D: !0, duration: P_in }, 0);
      p.fromTo(u, { x: 0, xPercent: -50, y: 0 }, { x: 0, xPercent: -50, y: -k, force3D: !0, duration: P_in }, 0);
      p.fromTo(a, { x: 0, xPercent: -50, y: 0 }, { x: 0, xPercent: -50, y: k, force3D: !0, duration: P_in }, 0);
      p.to(i, { scale: h, duration: P_hold, ease: "none" }, P_in);
      p.fromTo(i, { scale: h }, { scale: 0, force3D: !0, duration: P_out, ease: "none" }, P_in + P_hold);
      p.fromTo(u, { x: 0, xPercent: -50, y: -k }, { x: 0, xPercent: -50, y: 0, force3D: !0, duration: P_out, ease: "none" }, P_in + P_hold);
      p.fromTo(a, { x: 0, xPercent: -50, y: k }, { x: 0, xPercent: -50, y: 0, force3D: !0, duration: P_out, ease: "none" }, P_in + P_hold);
      let _lastMobilePP = -1;
      f = b.create({
        trigger: n,
        animation: p,
        start: "top top",
        end: `+=${P_total}`,
        pin: !0,
        pinSpacing: !0,
        scrub: !0,
        anticipatePin: 1,
        invalidateOnRefresh: !0,
        fastScrollEnd: !0,
        preventOverlaps: !0,
        onUpdate: self => {
          const cur = p.time();
          let pp = 0;
          if (cur < P_in) {
            pp = Math.min(1, Math.max(0, cur / P_in));
          } else if (cur <= P_in + P_hold) {
            pp = 1.0;
          } else if (cur <= P_total) {
            pp = Math.max(0, Math.min(1, 1 - (cur - (P_in + P_hold)) / P_out));
          } else {
            pp = 0;
          }
          if (Math.abs(pp - _lastMobilePP) >= 0.005 || pp === 0 || pp === 1) {
            _lastMobilePP = pp;
            syncViewportClip(pp, cur, P_in + P_hold);
            if (typeof window != "undefined") {
              if (window.__TEST_SET_PORTAL_PROGRESS__) {
                window.__TEST_SET_PORTAL_PROGRESS__(pp);
              } else if (window.__WORK_STAGE__) {
                window.__WORK_STAGE__.portalProgress = pp;
                window.__WORK_STAGE__.floorAlpha = pp;
                window.__WORK_STAGE__.phase = pp >= 0.99 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND';
              }
            }
          }
        }
      });
      g = p;
      if (typeof window != "undefined") {
        const triggerPortalExitMobile = () => {
          const lenisInst = (typeof window !== 'undefined') ? (window.lenis || window.__lenis || window.__LENIS__) : null;
          const startExit = f.start + P_in + P_hold;
          const endExit = f.start + P_total + 100;
          p.time(P_in + P_hold);
          if (lenisInst && typeof lenisInst.scrollTo === 'function') {
            lenisInst.scrollTo(endExit, { duration: 1.2 });
          } else {
            const scrollObj = { y: startExit };
            c.to(scrollObj, {
              y: endExit,
              duration: 1.2,
              ease: "power2.inOut",
              onUpdate: () => {
                window.scrollTo(0, scrollObj.y);
                f.scroll(scrollObj.y);
                f.update();
              }
            });
          }
        };
        window.__TRIGGER_PORTAL_EXIT__ = triggerPortalExitMobile;
        window.addEventListener('work-portal-exit-request', triggerPortalExitMobile);
      }
    };
    T();
    const x = () => { m = B(); };
    x();
    window.addEventListener("scroll", x, { passive: !0 });
    const S = X(() => { d && (T(), E()); }, 150);
    return window.addEventListener("resize", S), () => {
      d = !1, S.cancel(), window.removeEventListener("resize", S), window.removeEventListener("scroll", x), m = m ?? B(), f?.kill(!0, !0), g?.kill(), s();
    };
  }),
  E(),
  () => {
    y = !0, o.revert(), l.kill(), K(), E();
  };
}

function X(e, t) {
  let r;
  const o = (() => { clearTimeout(r), r = setTimeout(e, t); });
  return o.cancel = () => clearTimeout(r), o;
}
function z(e, t, r) { return Math.min(r, Math.max(t, e)); }
function B() {
  const e = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  return z(window.scrollY / e, 0, 1);
}
function ne(e) {
  if (typeof e != "number") return;
  const t = z(e, 0, 1),
        r = () => {
          const o = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
          window.scrollTo(0, o * t);
        };
  r(), requestAnimationFrame(() => { r(), requestAnimationFrame(r); });
}
function ie(e, t) {
  const r = z(t, 0, 1),
        o = () => {
          const l = e.start + (e.end - e.start) * r;
          e.scroll(l), e.update();
        };
  o(), requestAnimationFrame(() => { o(), requestAnimationFrame(o); });
}
function I(e) {
  const t = e?.parentElement;
  !e || !t?.classList.contains("pin-spacer") || (t.parentElement?.insertBefore(e, t), t.remove(), c.set(e, { clearProps: "position,top,left,right,bottom,width,height,maxWidth,maxHeight,margin,padding,boxSizing,transform" }));
}
function N(e, t) {
  const r = document.createRange();
  r.selectNodeContents(e);
  const o = r.getBoundingClientRect();
  return t === "left" ? o.left : o.right;
}
function $(e) {
  const t = window.matchMedia("(min-width: 768px)").matches ? 144 : 39;
  return e * (window.innerWidth / t);
}
function G(e, t) {
  const r = window.getComputedStyle(e),
        o = e.offsetWidth || Number.parseFloat(r.width),
        l = e.offsetHeight || Number.parseFloat(r.height),
        w = $(1);
  return { width: Number.isFinite(o) && o > 0 ? o : t.width * w, height: Number.isFinite(l) && l > 0 ? l : t.height * w };
}
function se(e) {
  const t = document.documentElement,
        r = e.clientWidth || t.clientWidth || window.innerWidth,
        o = e.clientHeight || t.clientHeight || window.innerHeight;
  return { width: r, height: o };
}
function V(e, t) {
  return Math.max((t.width + A) / e.width, (t.height + A) / e.height);
}
function ce({ mwRect: e, mwMore: t, mwWork: r, coverScale: o, textOffset: l, moreInitialX: w, workStaggerX: m, progress: y = .35 }) {
  const n = o * y,
        i = w + (-l - w) * y,
        u = m + (l - m) * y;
  c.set(e, { scale: n, transformOrigin: "center center", force3D: !0 }),
  c.set(t, { x: i, force3D: !0 }),
  c.set(r, { x: u, force3D: !0 });
  const a = e.getBoundingClientRect(),
        f = a.left - N(t, "right"),
        g = N(r, "left") - a.right;
  return f - g;
}

export { fe as i };
