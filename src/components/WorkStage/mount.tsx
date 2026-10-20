import React from 'react';
import { createRoot } from 'react-dom/client';
import { WorkStage } from './WorkStage';

export function initWorkStage() {
  const mountEl = document.getElementById('jesper-work-stage-mount');
  if (mountEl && !mountEl.dataset.mounted) {
    mountEl.dataset.mounted = 'true';
    const root = createRoot(mountEl);
    root.render(<WorkStage initialPortalProgress={0.0} />);
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorkStage);
  } else {
    initWorkStage();
  }
}
