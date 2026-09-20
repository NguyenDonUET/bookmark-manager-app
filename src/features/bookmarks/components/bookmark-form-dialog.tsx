import * as React from 'react';
import { useForm, useWatch } from 'react-hook-form';

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
  bookmarkFormResolver,
  formatTagsInput,
} from '@/features/bookmarks/lib/bookmark-form';
import { cn } from '@/lib/utils';

import type { BookmarkFormInput, BookmarkFormValues } from '@/features/bookmarks/lib/bookmark-form';
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
  initial: BookmarkFormInput;
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookmarkFormInput, unknown, BookmarkFormValues>({
    defaultValues: initial,
    resolver: bookmarkFormResolver,
  });

  // useWatch (not watch()) — safer with React Compiler
  const description = useWatch({ control, name: 'description', defaultValue: initial.description });
  const descriptionLength = description.length;
  const isDescriptionOverLimit = descriptionLength > DESCRIPTION_MAX_LENGTH;

  const submitLabel = mode === 'add' ? 'Add Bookmark' : 'Save Changes';

  return (
    <form className="grid gap-400" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-250">
        <div className="grid gap-100">
          <FieldLabel htmlFor={titleId}>Title</FieldLabel>
          <Input
            id={titleId}
            autoComplete="off"
            className="min-w-0 px-200 py-150"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? `${titleId}-error` : undefined}
            {...register('title')}
          />
          <FieldError id={`${titleId}-error`} message={errors.title?.message} />
        </div>

        <div className="grid gap-100">
          <FieldLabel htmlFor={descriptionId}>Description</FieldLabel>
          <Textarea
            id={descriptionId}
            maxLength={DESCRIPTION_MAX_LENGTH + 20}
            className="min-h-1000 min-w-0 px-200 py-150"
            aria-invalid={Boolean(errors.description) || isDescriptionOverLimit}
            aria-describedby={`${descriptionId}-count${errors.description ? ` ${descriptionId}-error` : ''}`}
            {...register('description')}
          />
          <div className="grid grid-cols-[1fr_auto] items-start gap-150">
            <FieldError id={`${descriptionId}-error`} message={errors.description?.message} />
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
            type="url"
            inputMode="url"
            autoComplete="url"
            className="min-w-0 px-200 py-150"
            aria-invalid={Boolean(errors.url)}
            aria-describedby={errors.url ? `${urlId}-error` : undefined}
            {...register('url')}
          />
          <FieldError id={`${urlId}-error`} message={errors.url?.message} />
        </div>

        <div className="grid gap-100">
          <FieldLabel htmlFor={tagsId}>Tags</FieldLabel>
          <Input
            id={tagsId}
            placeholder="e.g. design, learning, tools"
            autoComplete="off"
            className="min-w-0 px-200 py-150"
            aria-invalid={Boolean(errors.tagsInput)}
            aria-describedby={errors.tagsInput ? `${tagsId}-error` : undefined}
            {...register('tagsInput')}
          />
          <FieldError id={`${tagsId}-error`} message={errors.tagsInput?.message} />
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

  const initial: BookmarkFormInput = {
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
