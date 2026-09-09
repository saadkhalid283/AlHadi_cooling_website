/**
 * Matching for the mobile find-menu.
 *
 * Two things make naive substring search fail for this site:
 *
 * 1. Arabic orthography varies. أ/إ/آ/ا are typed interchangeably, ة and ه
 *    swap, ى and ي swap, and diacritics may or may not be present. Normalising
 *    both sides collapses those into one form.
 * 2. People do not search using our service names. Someone with a broken
 *    fridge types "ثلاجة" or "fridge", not "Refrigerator Repair". Each entry
 *    therefore carries synonyms in both languages.
 */

/** Fold Arabic orthographic variants and strip diacritics, then lowercase. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[ً-ْٰ]/g, "") // tashkeel
    .replace(/ـ/g, "") // tatweel
    .replace(/[أإآٱ]/g, "ا") // أإآٱ -> ا
    .replace(/ى/g, "ي") // ى -> ي
    .replace(/ئ/g, "ي") // ئ -> ي
    .replace(/ؤ/g, "و") // ؤ -> و
    .replace(/ة/g, "ه") // ة -> ه
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extra terms attached to any entry whose label matches the pattern. */
const SYNONYMS: { match: RegExp; terms: string[] }[] = [
  {
    match: /\bac\b|air.?condition|duct|مكيف|تكييف|دكت|فريون/i,
    terms: [
      "ac", "a/c", "air conditioner", "aircon", "hvac", "cooling", "split",
      "window", "gas", "freon", "not cooling",
      "مكيف", "مكيفات", "تكييف", "تبريد", "سبليت", "اسبليت", "شباك",
      "فريون", "غاز", "ما يبرد", "لا يبرد", "مركزي", "دكت",
    ],
  },
  {
    match: /refrigerat|fridge|freezer|water cooler|ثلاج|فريزر|براد/i,
    terms: [
      "fridge", "refrigerator", "freezer", "cooler", "not freezing", "warm",
      "ثلاجة", "ثلاجات", "براد", "برادات", "فريزر", "مجمد", "ما تبرد", "لا تجمد",
    ],
  },
  {
    match: /washing machine|washer|laundry|غسال/i,
    terms: [
      "washer", "washing machine", "laundry", "drain", "spin", "error code",
      "غسالة", "غسالات", "غسيل", "ما تصرف", "ما تعصر", "تسريب",
    ],
  },
  {
    match: /price|quote|cost|charge|سعر|تسعير|عرض|تكلفة/i,
    terms: ["price", "cost", "quote", "fee", "سعر", "أسعار", "تكلفة", "عرض سعر", "كم"],
  },
  {
    match: /emergency|24\/7|طوارئ|ساعة/i,
    terms: ["emergency", "urgent", "night", "24/7", "طوارئ", "مستعجل", "ليل", "الآن"],
  },
  {
    match: /guarantee|warrant|ضمان/i,
    terms: ["guarantee", "warranty", "ضمان", "مضمون"],
  },
];

export type SearchEntry = {
  /** Text shown in the list. */
  label: string;
  /** Anchor id to scroll to. */
  target: string;
  /** Group heading this entry sits under. */
  group: string;
  /** Optional second line, e.g. the service description. */
  hint?: string;
};

type Indexed = SearchEntry & { haystack: string };

/** Precompute the normalised match text for each entry (label + synonyms). */
export function buildIndex(entries: SearchEntry[]): Indexed[] {
  return entries.map((e) => {
    const extra = SYNONYMS.filter((s) => s.match.test(e.label) || (e.hint ? s.match.test(e.hint) : false))
      .flatMap((s) => s.terms)
      .join(" ");
    return {
      ...e,
      haystack: normalize([e.label, e.hint ?? "", extra].join(" ")),
    };
  });
}

/**
 * Every whitespace-separated token in the query must appear somewhere in the
 * entry, so "fridge leak" narrows rather than widening to everything.
 */
export function search(index: Indexed[], query: string): SearchEntry[] {
  const q = normalize(query);
  if (!q) return index;
  const tokens = q.split(" ").filter(Boolean);
  return index.filter((e) => tokens.every((t) => e.haystack.includes(t)));
}
