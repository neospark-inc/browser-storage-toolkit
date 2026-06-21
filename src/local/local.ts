import { isBrowser, safeStringify, safeParse } from "../utils";

function isAvailable(): boolean {
  if (!isBrowser()) return false;

  try {
    const key = "__storage_test__";
    window.localStorage.setItem(key, "1");
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function setItem(key: string, value: unknown): void {
  if (!isAvailable()) return;
  window.localStorage.setItem(key, safeStringify(value));
}

export function getItem<T = unknown>(key: string): T | null {
  if (!isAvailable()) return null;
  return safeParse<T>(window.localStorage.getItem(key));
}

export function removeItem(key: string): void {
  if (!isAvailable()) return;
  window.localStorage.removeItem(key);
}

export function clear(): void {
  if (!isAvailable()) return;
  window.localStorage.clear();
}
