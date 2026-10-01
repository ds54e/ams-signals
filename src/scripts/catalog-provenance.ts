// Static HTML exposes every explanation and source. Enhancement replaces the
// plain label with a native button; keyboard and touch share its click behavior.
export function enhanceCatalogProvenance(catalog: HTMLElement) {
  catalog.querySelectorAll<HTMLElement>('[data-provenance-target]').forEach((badge) => {
    const label = badge.querySelector<HTMLElement>('span[data-scope-label]');
    const panel = document.getElementById(badge.dataset.provenanceTarget!);
    const name = badge.closest('article')?.querySelector('h2')?.textContent;
    if (!label || !panel || !name) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'catalog-provenance-toggle';
    button.dataset.scopeLabel = '';
    button.dataset.provenanceToggle = '';
    button.textContent = label.textContent;
    button.setAttribute('aria-label', `${label.textContent}: development provenance for ${name}`);
    button.setAttribute('aria-controls', panel.id);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
      button.setAttribute('aria-expanded', String(!panel.hidden));
    });
    label.replaceWith(button);
    panel.hidden = true;
  });
}
