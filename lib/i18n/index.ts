import { en } from "./en";
import { ar } from "./ar";

export type Locale = "en" | "ar";

/** EN is the canonical shape; AR must match it. */
export type Dictionary = typeof en;

export const dictionaries: Record<Locale, Dictionary> = { en, ar };

export const defaultLocale: Locale = "ar"; // Arabic-first (Jeddah audience)

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
