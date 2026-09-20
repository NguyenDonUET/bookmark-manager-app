import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

function applyThemeToDocument(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme) => {
        applyThemeToDocument(theme);
        set({ theme });
      },
      toggleTheme: () => {
        const next: Theme = get().theme === 'light' ? 'dark' : 'light';
        get().setTheme(next);
      },
    }),
    {
      name: 'theme-store',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) applyThemeToDocument(state.theme);
      },
    },
  ),
);

/** Apply persisted theme before first paint when possible (also call from main). */
export function syncThemeFromStorage(): void {
  try {
    const raw = localStorage.getItem('theme-store');
    if (!raw) {
      applyThemeToDocument('light');
      return;
    }
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'state' in parsed &&
      typeof parsed.state === 'object' &&
      parsed.state !== null &&
      'theme' in parsed.state &&
      (parsed.state.theme === 'light' || parsed.state.theme === 'dark')
    ) {
      applyThemeToDocument(parsed.state.theme);
      return;
    }
  } catch {
    // ignore corrupt storage
  }
  applyThemeToDocument('light');
}
