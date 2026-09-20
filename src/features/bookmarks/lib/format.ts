const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
});

/** Formats ISO timestamps for card meta (e.g. "23 Sep"). Returns em dash when null/invalid. */
export function formatBookmarkDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return '—';
  return dateFormatter.format(time);
}

export function getBookmarkHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
