// Loads the Apex OS design system (global CSS + component bundle) for a template.
// One file, one line to edit (`base`) if a consuming project nests this deeper.
(() => {
  const base = '../..';
  for (const p of ['styles.css']) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — in a consuming project point the base line at the bound _ds/<folder> tree relative to this page; in the source design system this just means the bundle is not compiled yet.');
  document.head.appendChild(s);
})();
