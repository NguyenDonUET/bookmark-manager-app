import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  DESCRIPTION_MAX_LENGTH,
  formatTagsInput,
  validateBookmarkForm,
} from '@/features/bookmarks/lib/bookmark-form';
import { cn } from '@/lib/utils';

import type {
  BookmarkFormFieldErrors,
  BookmarkFormValues,
} from '@/features/bookmarks/lib/bookmark-form';
import type { Bookmark } from '@/features/bookmarks/types';

type BookmarkFormMode = 'add' | 'edit';

interface BookmarkFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: BookmarkFormMode;
  /** Required when `mode="edit"`. */
  bookmark?: Bookmark | null;
  onSubmit: (values: BookmarkFormValues) => void;
}

interface BookmarkFormFieldsProps {
  mode: BookmarkFormMode;
  initial: {
    title: string;
    description: string;
    url: string;
    tagsInput: string;
  };
  onCancel: () => void;
  onSubmit: (values: BookmarkFormValues) => void;
}

function RequiredMark() {
  return (
    <span className="text-teal-700" aria-hidden>
      *
    </span>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-preset-4 font-semibold text-teal-700">
      {children} <RequiredMark />
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-preset-5 text-destructive" role="alert">
      {message}
    </p>
  );
}

/**
 * Inner form — remount via `key` when mode/bookmark changes so values reset
 * without syncing props in an effect (rerender-derived-state-no-effect).
 */
function BookmarkFormFields({ mode, initial, onCancel, onSubmit }: BookmarkFormFieldsProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const urlId = React.useId();
  const tagsId = React.useId();

  const [title, setTitle] = React.useState(initial.title);
  const [description, setDescription] = React.useState(initial.description);
  const [url, setUrl] = React.useState(initial.url);
  const [tagsInput, setTagsInput] = React.useState(initial.tagsInput);
  const [errors, setErrors] = React.useState<BookmarkFormFieldErrors>({});

  // Derived during render — do not store in state
  const descriptionLength = description.length;
  const isDescriptionOverLimit = descriptionLength > DESCRIPTION_MAX_LENGTH;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateBookmarkForm({ title, description, url, tagsInput });
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    onSubmit(result.values);
  };

  const submitLabel = mode === 'add' ? 'Add Bookmark' : 'Save Changes';

  return (
    <form className="grid gap-400" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-250">
        <div className="grid gap-100">
          <FieldLabel htmlFor={titleId}>Title</FieldLabel>
          <Input
            id={titleId}
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? `${titleId}-error` : undefined}
            autoComplete="off"
            className="min-w-0 px-200 py-150"
          />
          <FieldError id={`${titleId}-error`} message={errors.title} />
        </div>

        <div className="grid gap-100">
          <FieldLabel htmlFor={descriptionId}>Description</FieldLabel>
          <Textarea
            id={descriptionId}
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={DESCRIPTION_MAX_LENGTH + 20}
            aria-invalid={Boolean(errors.description) || isDescriptionOverLimit}
            aria-describedby={`${descriptionId}-count${errors.description ? ` ${descriptionId}-error` : ''}`}
            className="min-h-1000 min-w-0 px-200 py-150"
          />
          <div className="grid grid-cols-[1fr_auto] items-start gap-150">
            <FieldError id={`${descriptionId}-error`} message={errors.description} />
            <p
              id={`${descriptionId}-count`}
              className={cn(
                'text-preset-5 justify-self-end tabular-nums',
                isDescriptionOverLimit
                  ? 'text-destructive'
                  : 'text-neutral-500 dark:text-neutral-100',
              )}
            >
              {descriptionLength}/{DESCRIPTION_MAX_LENGTH}
            </p>
          </div>
        </div>

        <div className="grid gap-100">
          <FieldLabel htmlFor={urlId}>Website URL</FieldLabel>
          <Input
            id={urlId}
            name="url"
            type="url"
            inputMode="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            aria-invalid={Boolean(errors.url)}
            aria-describedby={errors.url ? `${urlId}-error` : undefined}
            autoComplete="url"
            className="min-w-0 px-200 py-150"
          />
          <FieldError id={`${urlId}-error`} message={errors.url} />
        </div>

        <div className="grid gap-100">
          <FieldLabel htmlFor={tagsId}>Tags</FieldLabel>
          <Input
            id={tagsId}
            name="tags"
            value={tagsInput}
            onChange={(event) => setTagsInput(event.target.value)}
            placeholder="e.g. design, learning, tools"
            aria-invalid={Boolean(errors.tags)}
            aria-describedby={errors.tags ? `${tagsId}-error` : undefined}
            autoComplete="off"
            className="min-w-0 px-200 py-150"
          />
          <FieldError id={`${tagsId}-error`} message={errors.tags} />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="secondary" size="md" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="default" size="md">
          {submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}

const COPY = {
  add: {
    title: 'Add a Bookmark',
    description: 'Save a link with details to keep them organized.',
  },
  edit: {
    title: 'Edit bookmark',
    description: 'Update your saved link details anytime.',
  },
} as const;

export function BookmarkFormDialog({
  open,
  onOpenChange,
  mode,
  bookmark = null,
  onSubmit,
}: BookmarkFormDialogProps) {
  const copy = COPY[mode];
  const formKey = mode === 'edit' && bookmark ? `edit-${bookmark.id}` : `add-${String(open)}`;

  const initial = {
    title: bookmark?.title ?? '',
    description: bookmark?.description ?? '',
    url: bookmark?.url ?? '',
    tagsInput: bookmark ? formatTagsInput(bookmark.tags) : '',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="w-dialog-form gap-400 p-400">
        <DialogHeader className="gap-100 pr-500">
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>

        {open ? (
          <BookmarkFormFields
            key={formKey}
            mode={mode}
            initial={initial}
            onCancel={() => onOpenChange(false)}
            onSubmit={(values) => {
              onSubmit(values);
              onOpenChange(false);
            }}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export type { BookmarkFormDialogProps, BookmarkFormMode };
