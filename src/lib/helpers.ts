import dayjs from "dayjs";
import slugify from "slugify";

export function formatDate(date: string, fmt: string): string {
  return dayjs(date).format(fmt);
}

export function slug(input: string): string {
  return slugify(input, {
    lower: true,
    strict: false,
    remove: /[&,+()$~%.'":*?<>{}]/g,
  });
}

export interface Group<T> {
  name: string;
  items: T[];
}

export function groupBy<T extends Record<string, unknown>>(
  items: T[],
  key: keyof T,
): Group<T>[] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const k = String(item[key]);
    const bucket = map.get(k);
    if (bucket) bucket.push(item);
    else map.set(k, [item]);
  }
  return Array.from(map, ([name, items]) => ({ name, items }));
}

export function sortNatural<T extends Record<string, unknown>>(
  items: T[],
  key: keyof T,
): T[] {
  const collator = new Intl.Collator(undefined, {
    sensitivity: "base",
    numeric: true,
  });
  return [...items].sort((a, b) =>
    collator.compare(String(a[key]), String(b[key])),
  );
}
