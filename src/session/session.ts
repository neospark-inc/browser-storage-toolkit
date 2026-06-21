import { isBrowser, safeStringify, safeParse } from "../utils";

function isAvailable(): boolean {
  if (!isBrowser()) return false;

  try {
    const key = "__storage_test__";
    window.sessionStorage.setItem(key, "1");
    window.sessionStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function setItem(key: string, value: unknown): void {
  if (!isAvailable()) return;
  window.sessionStorage.setItem(key, safeStringify(value));
}

export function getItem<T = unknown>(key: string): T | null {
  if (!isAvailable()) return null;
  return safeParse<T>(window.sessionStorage.getItem(key));
}

export function removeItem(key: string): void {
  if (!isAvailable()) return;
  window.sessionStorage.removeItem(key);
}

export function clear(): void {
  if (!isAvailable()) return;
  window.sessionStorage.clear();
}
