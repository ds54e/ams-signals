/** Native disclosures and links work without JS; enhance access to closed hash targets. */
export function initializeCatalog() {
  const root = document.querySelector<HTMLElement>('[data-analog-ai]');
  if (!root) return;

  function revealHash() {
    let id: string;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (!id) return;
    const target = document.getElementById(id);
    const project = target?.closest<HTMLElement>('[data-catalog-project]');
    if (!target || !project || !root!.contains(project)) return;
    if (id !== project.id && !id.startsWith(`${project.id}--`)) return;
    project.querySelector('details')!.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
  }

  window.addEventListener('hashchange', revealHash);
  window.addEventListener('pageshow', revealHash);
  // Clicking the same hash again should reopen Notes even when no hashchange fires.
  root.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (link.href === location.href) revealHash();
  });
  revealHash();
}
