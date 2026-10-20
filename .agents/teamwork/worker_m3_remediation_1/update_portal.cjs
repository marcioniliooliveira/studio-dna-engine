const fs = require('fs');
const file = 'src/components/WorkStage/WorkStage.tsx';
let content = fs.readFileSync(file, 'utf8');

const marker = '{/* Vis\u00e3o Detalhada permanente no DOM';
const idx = content.indexOf(marker);
if (idx === -1) {
  console.error('Marker not found!');
  process.exit(1);
}

const replacement = `    {/* Visão Detalhada permanente no DOM e portada para work-detail-panel-root (ou document.body) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            data-testid="work-detail-panel"
            data-work-detail-panel=""
            data-header-bg="#FAF9F6"
            data-header-text="#2E2B28"
            data-header-border="#b8b3ac"
            aria-hidden={isDetailOpen ? 'false' : 'true'}
            aria-label={\`\${displayProject.shortName} project details\`}
            style={{
              position: 'fixed',
              inset: 0,
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 120,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '3.5rem',
              paddingLeft: '5.5rem',
              color: BRAND_TOKENS.textDark,
              opacity: isDetailOpen ? 1 : 0,
              transition: 'opacity 0.4s ease-out',
              pointerEvents: isDetailOpen ? 'auto' : 'none',
            }}
          >
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
                Chapter II — {displayProject.category} ({displayProject.year})
              </p>
              <button
                type="button"
                data-testid="detail-close-btn"
                data-detail-close=""
                onClick={handleCloseProject}
                style={{
                  padding: '0.75rem 1.75rem',
                  borderRadius: '9999px',
                  backgroundColor: BRAND_TOKENS.textDark,
                  color: BRAND_TOKENS.bgSurface,
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Close
              </button>
            </header>

            <div style={{ maxWidth: '48rem' }}>
              <h2
                data-detail-title=""
                style={{
                  fontFamily: 'PP Editorial Old, serif',
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                }}
              >
                {displayProject.shortName} — {displayProject.title}
              </h2>
              <p style={{ marginTop: '1.5rem', fontSize: '1.25rem', lineHeight: 1.4 }}>
                {displayProject.description}
              </p>
            </div>

            <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', textTransform: 'uppercase' }}>
                Project 0{displayProject.index + 1} / 0{REFERENCE_PROJECTS.length}
              </span>
              <a
                href={displayProject.link}
                className="to-link-underline"
                style={{ fontSize: '1.125rem', fontWeight: 500 }}
              >
                Solicitar estudo de caso →
              </a>
            </footer>
          </div>,
          document.getElementById('work-detail-panel-root') || document.body
        )}
    </>
  );
};
`;

content = content.slice(0, idx) + replacement;
fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated WorkStage.tsx with complete portal implementation!');
