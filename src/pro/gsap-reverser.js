/**
 * Deserializa e reconstrói timelines profundas do GSAP e ScrollTrigger
 */
function extractGsapTimelines() {
  const result = {
    detected: false,
    version: null,
    scrollTriggers: [],
    tweens: [],
    totalDuration: 0
  };

  if (typeof window.gsap === 'undefined') return result;

  result.detected = true;
  result.version = window.gsap.version || '3.x';

  // 1. Desmonta instâncias de ScrollTrigger
  if (typeof window.ScrollTrigger !== 'undefined') {
    try {
      const triggers = window.ScrollTrigger.getAll();
      result.scrollTriggers = triggers.map(st => {
        const triggerEl = st.trigger;
        let selector = 'body';
        if (triggerEl) {
          selector = triggerEl.id ? `#${triggerEl.id}` : triggerEl.className ? `.${triggerEl.className.split(' ').filter(Boolean).join('.')}` : triggerEl.tagName.toLowerCase();
        }

        return {
          trigger: selector,
          start: st.start,
          end: st.end,
          scrub: !!st.vars.scrub,
          pin: !!st.vars.pin,
          markers: !!st.vars.markers,
          toggleActions: st.vars.toggleActions || 'play none none reverse'
        };
      });
    } catch (e) {}
  }

  // 2. Desmonta Tweens e Curvas do Global Timeline
  try {
    const children = window.gsap.globalTimeline.getChildren(true, true, true);
    result.tweens = children.slice(0, 20).map(tween => {
      const vars = tween.vars || {};
      let targetSelector = 'unknown';

      if (tween.targets && tween.targets().length > 0) {
        const target = tween.targets()[0];
        if (target instanceof Element) {
          targetSelector = target.id ? `#${target.id}` : target.className ? `.${target.className.split(' ').filter(Boolean).join('.')}` : target.tagName.toLowerCase();
        } else if (typeof target === 'string') {
          targetSelector = target;
        }
      }

      return {
        target: targetSelector,
        duration: tween.duration() || vars.duration || 1,
        ease: vars.ease ? (typeof vars.ease === 'string' ? vars.ease : 'custom') : 'power2.out',
        stagger: vars.stagger || null,
        props: {
          x: vars.x,
          y: vars.y,
          opacity: vars.opacity,
          scale: vars.scale,
          rotation: vars.rotation || vars.rotate
        }
      };
    });
  } catch (e) {}

  return result;
}

module.exports = {
  extractGsapTimelines
};
