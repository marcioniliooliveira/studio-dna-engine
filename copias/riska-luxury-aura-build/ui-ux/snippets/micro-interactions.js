// -------------------------------------------------------------
// SNIPPET: MICRO-INTERACTIONS (Spotlight & Magnetic Button)
// Origem: https://riska-luxury.aura.build/
// -------------------------------------------------------------
export function initMagneticEffect(selector = '.magnetic-btn') {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
    });
  });
}
