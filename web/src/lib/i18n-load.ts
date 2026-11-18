/**
 * A language's words, fetched when it is picked: one catalog a language
 * (src/i18n/<code>.json, English strings to that language's), each its own
 * file so a page reads only its own. Loaded only for a language other than
 * English, so what loads first carries none of them.
 */
import { LANG_CODES, LANG_KEY, setWords } from './i18n';
import { writePref } from './prefs';
import { relabel } from './tooltip';

const catalogs = import.meta.glob<{ default: Record<string, string> }>('../i18n/*.json');

/** The languages by their own names, for the picker. */
export const LANGS: readonly { code: string; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '简体中文' },
  { code: 'ja', name: '日本語' },
  { code: 'th', name: 'ไทย' },
  { code: 'ms', name: 'Bahasa Melayu' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'pt', name: 'Português (Brasil)' },
  { code: 'ru', name: 'Русский' },
];

/** The page in `code`'s words: English empties the catalog. Kept for next time when `keep`. */
export async function useLang(code: string, keep = false): Promise<void> {
  if (!LANG_CODES.includes(code)) return;
  if (keep) writePref(LANG_KEY, code);
  document.documentElement.lang = code === 'zh' ? 'zh-Hans' : code === 'pt' ? 'pt-BR' : code;
  const load = code === 'en' ? null : catalogs[`../i18n/${code}.json`];
  setWords(load ? (await load()).default : {});
  relabel();
}
