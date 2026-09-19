import { Button } from '@/components/ui/button';

export function App() {
  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col items-center justify-center gap-300 px-200">
      <div className="flex flex-col items-center gap-100 text-center">
        <h1 className="text-preset-1 font-bold">Bookmark Manager</h1>
        <p className="text-muted-foreground text-preset-3-medium font-medium">
          Design tokens loaded from Figma.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-150">
        <Button type="button">Primary</Button>
        <Button type="button" variant="secondary">
          Secondary
        </Button>
        <Button type="button" variant="destructive">
          Destructive
        </Button>
      </div>
      <div className="border-border bg-muted rounded-10 flex gap-100 p-150">
        <span className="rounded-4 size-500 bg-neutral-900" aria-hidden />
        <span className="rounded-4 size-500 bg-teal-700" aria-hidden />
        <span className="rounded-4 size-500 bg-red-600" aria-hidden />
        <span className="rounded-4 size-500 bg-neutral-400" aria-hidden />
      </div>
    </div>
  );
}
