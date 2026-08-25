/**
 * Cylindrical 3D Ring Spinner Component
 * Cria um anel 3D cilíndrico interativo baseado na geometria do Storey Architecture.
 */
function initCylindricalSpinner(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = container.querySelectorAll('[data-spinner-square]');
  const total = items.length;
  if (total === 0) return;

  const radius = options.radius || '44vw';
  const perspective = options.perspective || '132vw';
  const stepAngle = 360 / total;

  container.style.perspective = perspective;
  container.style.transformStyle = 'preserve-3d';

  items.forEach((item, i) => {
    const angle = i * stepAngle;
    item.style.position = 'absolute';
    item.style.left = '50%';
    item.style.transformOrigin = 'center center';
    item.style.transform = `translateX(-50%) rotateY(${angle}deg) translateZ(${radius})`;
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  // Rotação scroll-driven
  let currentRot = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    currentRot = (scrollY * 0.1) % 360;
    container.style.transform = `rotate3d(0.27, -1.005, 1.5, 85deg) rotateZ(${currentRot}deg)`;
  }, { passive: true });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initCylindricalSpinner };
}
