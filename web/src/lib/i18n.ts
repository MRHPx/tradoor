/**
 * The page in the language picked. `tl('English')` gives that language's
 * words for it, or the English where the language has none yet: English is
 * the source, written in place, and costs nothing. Another language's words
 * load only when it is picked (i18n/<code>.json by lib/i18n-load, one file
 * each), and everything drawn with tl() changes with them. Tooltips and
 * toasts are translated where they are shown (lib/tooltip, lib/toasts).
 */
import { createSignal } from 'solid-js';
import { readPref } from './prefs';

const [words, setWords] = createSignal<Record<string, string>>({});
export { setWords };

/** Left out (an optional label) stays left out. */
export const tl = <S extends string | undefined>(s: S): S => ((s && words()[s]) || s) as S;

/** A sentence with values in it, written {0}, {1}… in the catalog: translated, then filled in. */
export const tlf = (s: string, ...v: unknown[]): string => tl(s).replace(/\{(\d+)\}/g, (_, i: string) => String(v[+i] ?? ''));

/** Every language offered, English first: the rest have a catalog each. */
export const LANG_CODES = 'en es fr ko zh ja th ms id vi tr pt ru'.split(' ');
export const LANG_KEY = 'lang';

/** The language picked, else the browser's own where offered, else English. */
export function startLang(): string {
  const picked = readPref(LANG_KEY);
  const asked = picked ?? navigator.languages.map((l) => l.slice(0, 2).toLowerCase()).find((l) => LANG_CODES.includes(l)) ?? 'en';
  const code = LANG_CODES.includes(asked) ? asked : 'en';
  if (code !== 'en') void import('./i18n-load').then((m) => m.useLang(code));
  return code;
}
