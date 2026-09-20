const DESCRIPTION_MAX_LENGTH = 280;

export interface BookmarkFormValues {
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export function parseTagsInput(value: string): string[] {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function formatTagsInput(tags: string[]): string {
  return tags.join(', ');
}

/** Google favicon service — matches challenge “extract favicon from URL” behavior. */
export function faviconFromUrl(url: string): string {
  try {
    const { hostname } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=64`;
  } catch {
    return '/assets/images/favicon-32x32.png';
  }
}

export function ensureHttpUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export type BookmarkFormFieldErrors = Partial<
  Record<'title' | 'description' | 'url' | 'tags' | 'form', string>
>;

export function validateBookmarkForm(values: {
  title: string;
  description: string;
  url: string;
  tagsInput: string;
}): { ok: true; values: BookmarkFormValues } | { ok: false; errors: BookmarkFormFieldErrors } {
  const errors: BookmarkFormFieldErrors = {};
  const title = values.title.trim();
  const description = values.description.trim();
  const urlRaw = values.url.trim();
  const tags = parseTagsInput(values.tagsInput);

  if (!title) errors.title = 'Title is required.';
  if (!description) errors.description = 'Description is required.';
  else if (description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `Description must be ${DESCRIPTION_MAX_LENGTH} characters or fewer.`;
  }

  if (!urlRaw) {
    errors.url = 'Website URL is required.';
  } else {
    try {
      // Throws if invalid after normalization
      void new URL(ensureHttpUrl(urlRaw));
    } catch {
      errors.url = 'Enter a valid URL.';
    }
  }

  if (tags.length === 0) errors.tags = 'Add at least one tag.';

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    values: {
      title,
      description,
      url: ensureHttpUrl(urlRaw),
      tags,
    },
  };
}

export { DESCRIPTION_MAX_LENGTH };
