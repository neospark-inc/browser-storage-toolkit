export function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function safeParse<T = unknown>(raw: string | null): T | null {
  if (raw === null) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return raw as unknown as T;
  }
}
