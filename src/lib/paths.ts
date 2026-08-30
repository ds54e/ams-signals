export function sitePath(path = ''): string {
  const base = import.meta.env.BASE_URL || '/';
  const clean = path.replace(/^\/+/, '');
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return clean ? `${prefix}${clean}` : prefix;
}
