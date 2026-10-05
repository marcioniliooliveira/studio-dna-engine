document.addEventListener('DOMContentLoaded', () => {
  // ─────────────────────────────────────────────────────────
  // 1. STICKY STAGE 4-PHASE NARRATIVE SCRUB
  // ─────────────────────────────────────────────────────────
  const triggerSec = document.querySelector('.sequence-trigger-section');
  const phaseBadge = document.getElementById('narrative-phase-badge');
  const phaseTitle = document.getElementById('narrative-title');
  const phaseDesc = document.getElementById('narrative-desc');
  const stageVideo = document.getElementById('stage-hero-video');

  const phases = [
    {
      badge: 'PHASE 01 • ADAPTOGENIC FOUNDATION',
      title: 'CENTURIES-OLD ADAPTOGENS',
      desc: 'Rooted in traditional herbal medicine, our bioavailable adaptogens work directly with your body\'s natural chemistry.'
    },
    {
      badge: 'PHASE 02 • NEUROLOGICAL CALM',
      title: 'ASHWAGANDHA & LEMON BALM',
      desc: 'Clinically selected botanical extracts support a calm, focused mental state without daytime drowsiness.'
    },
    {
      badge: 'PHASE 03 • CELLULAR ENERGY',
      title: 'ACTIVATED B-VITAMINS',
      desc: 'A complete spectrum of B-vitamins to convert daily food intake into clean cellular ATP, fueling nervous system stamina.'
    },
    {
      badge: 'PHASE 04 • CORTISOL REGULATION',
      title: 'PANTOTHENIC ACID',
      desc: 'Essential co-factors maintain a healthy adrenal baseline, modulating daily physiological stress response.'
    }
  ];

  let currentPhaseIndex = -1;

  function updateNarrative() {
    if (!triggerSec) return;
    const rect = triggerSec.getBoundingClientRect();
    const totalDist = rect.height - window.innerHeight;
    if (totalDist <= 0) return;

    const progress = Math.max(0, Math.min(1, -rect.top / totalDist));

    // Determine active phase (0..3)
    let pIdx = Math.min(3, Math.floor(progress * 4));

    if (pIdx !== currentPhaseIndex) {
      currentPhaseIndex = pIdx;
      const data = phases[pIdx];
      if (phaseBadge) phaseBadge.textContent = data.badge;
      if (phaseTitle) {
        phaseTitle.style.opacity = '0';
        phaseTitle.style.transform = 'translateY(8px)';
        setTimeout(() => {
          phaseTitle.textContent = data.title;
          phaseTitle.style.opacity = '1';
          phaseTitle.style.transform = 'translateY(0)';
        }, 150);
      }
      if (phaseDesc) phaseDesc.textContent = data.desc;
    }

    // Scrub video timeline if loaded
    if (stageVideo && stageVideo.duration) {
      stageVideo.currentTime = progress * stageVideo.duration;
    }
  }

  window.addEventListener('scroll', updateNarrative, { passive: true });
  updateNarrative();

  // ─────────────────────────────────────────────────────────
  // 2. CLINICAL SPECS ACCORDION
  // ─────────────────────────────────────────────────────────
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        accordionItems.forEach(i => i.classList.remove('is-open'));
        if (!isOpen) {
          item.classList.add('is-open');
        }
      });
    }
  });
});
