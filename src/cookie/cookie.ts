import { isBrowser } from "../utils";
import type { CookieOptions } from "./types";

function buildExpiry(options: CookieOptions): string {
  if (options.days) {
    const date = new Date();
    date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
    return `expires=${date.toUTCString()};`;
  }

  if (options.minutes) {
    const date = new Date();
    date.setTime(date.getTime() + options.minutes * 60 * 1000);
    return `expires=${date.toUTCString()};`;
  }

  return "";
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  if (!isBrowser()) return;

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;

  cookie += buildExpiry(options);
  cookie += `path=${options.path || "/"};`;

  if (options.secure) {
    cookie += "secure;";
  }

  if (options.sameSite) {
    cookie += `SameSite=${options.sameSite};`;
  }

  document.cookie = cookie;
}

export function getCookie(name: string): string | null {
  if (!isBrowser()) return null;

  const decoded = decodeURIComponent(document.cookie);
  const parts = decoded.split(";");

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(`${name}=`)) {
      return trimmed.substring(name.length + 1);
    }
  }

  return null;
}

export function deleteCookie(name: string, path: string = "/"): void {
  if (!isBrowser()) return;

  document.cookie = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};`;
}
