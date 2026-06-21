# browser-storage-toolkit

A lightweight, unified browser storage toolkit for **Cookies**, **localStorage**, and **sessionStorage** — through one clean API.

Built with **TypeScript**. Zero dependencies. **SSR-safe** out of the box.

---

## Why This Exists

Managing browser storage shouldn't require three different mental models. Most projects end up with scattered `document.cookie` parsing, manual `JSON.stringify`/`JSON.parse` calls, and server-side rendering crashes — all for basic storage operations.

**browser-storage-toolkit** solves this by providing:

- 🔗 **One unified API** for Cookies, localStorage, and sessionStorage
- 🔒 **SSR safety** — no crashes on the server, returns safe defaults automatically
- 🔄 **Automatic JSON serialization** — store and retrieve objects without boilerplate
- 📦 **Zero dependencies** — nothing extra, just what you need
- ⚡ **Tree-shakeable** — import only what you use

---

## Quick Start

```bash
npm install browser-storage-toolkit
```

```ts
import { storage } from "browser-storage-toolkit";

// Cookies
storage.cookie.setCookie("token", "abc123", { days: 7, secure: true });

// localStorage
storage.local.setItem("user", { name: "Bibek", role: "admin" });

// sessionStorage
storage.session.setItem("tab-state", { page: 3 });
```

That's it. One import, three storage types. All SSR-safe.

---

## Features

| Feature                    | Details                                                    |
| -------------------------- | ---------------------------------------------------------- |
| **Unified API**            | One import, three storage types                            |
| **Cookie Manager**         | Set, get, delete with full options (expiry, path, Secure, SameSite) |
| **localStorage Wrapper**   | Automatic JSON serialization/parsing with availability fallback |
| **sessionStorage Wrapper** | Same clean API as localStorage                             |
| **SSR Safe**               | Returns `null` for reads, skips writes on the server       |
| **TypeScript First**       | Full type support out of the box                           |
| **Zero Dependencies**      | Nothing extra, just what you need                          |
| **Tree-Shakeable**         | Import only the functions you use                          |

---

## Usage

### Unified Storage Object

The easiest way to access all storage types:

```ts
import { storage } from "browser-storage-toolkit";

storage.cookie.setCookie("token", "abc123", { days: 7, secure: true });
storage.local.setItem("user", { name: "Bibek", role: "admin" });
storage.session.setItem("tab-state", { page: 3 });
```

### Cookies

```ts
import { setCookie, getCookie, deleteCookie } from "browser-storage-toolkit";

setCookie("theme", "dark", {
  days: 30,
  path: "/",
  secure: true,
  sameSite: "Lax",
});

const theme = getCookie("theme");

deleteCookie("theme");
```

**Cookie Options:**

| Option     | Type                             | Default | Description              |
| ---------- | -------------------------------- | ------- | ------------------------ |
| `days`     | `number`                         | —       | Expire after N days      |
| `minutes`  | `number`                         | —       | Expire after N minutes   |
| `path`     | `string`                         | `"/"`   | Cookie path              |
| `secure`   | `boolean`                        | —       | HTTPS only               |
| `sameSite` | `"Strict" \| "Lax" \| "None"`   | —       | Cross-site policy        |

### localStorage

```ts
import { storage } from "browser-storage-toolkit";

storage.local.setItem("settings", { theme: "dark", lang: "en" });

const settings = storage.local.getItem("settings");

storage.local.removeItem("settings");

storage.local.clear();
```

Objects and arrays are automatically serialized to JSON and parsed back — no need for manual `JSON.stringify` or `JSON.parse`.

### sessionStorage

```ts
import { storage } from "browser-storage-toolkit";

storage.session.setItem("form-draft", { name: "Bibek", step: 2 });

const draft = storage.session.getItem("form-draft");

storage.session.removeItem("form-draft");

storage.session.clear();
```

---

## API Reference

### Cookie

| Method                               | Returns          | Description           |
| ------------------------------------ | ---------------- | --------------------- |
| `setCookie(name, value, options?)`   | `void`           | Sets a cookie         |
| `getCookie(name)`                    | `string \| null` | Gets a cookie value   |
| `deleteCookie(name, path?)`          | `void`           | Deletes a cookie      |

### localStorage

| Method                | Returns      | Description                    |
| --------------------- | ------------ | ------------------------------ |
| `setItem(key, value)` | `void`       | Stores value (auto JSON)       |
| `getItem(key)`        | `T \| null`  | Retrieves value (auto parse)   |
| `removeItem(key)`     | `void`       | Removes a key                  |
| `clear()`             | `void`       | Clears all localStorage        |

### sessionStorage

| Method                | Returns      | Description                    |
| --------------------- | ------------ | ------------------------------ |
| `setItem(key, value)` | `void`       | Stores value (auto JSON)       |
| `getItem(key)`        | `T \| null`  | Retrieves value (auto parse)   |
| `removeItem(key)`     | `void`       | Removes a key                  |
| `clear()`             | `void`       | Clears all sessionStorage      |

---

## Individual Imports

You can also import each function directly if you prefer tree-shaking at the function level:

```ts
import {
  setCookie,
  getCookie,
  deleteCookie,
  setLocalItem,
  getLocalItem,
  removeLocalItem,
  clearLocal,
  setSessionItem,
  getSessionItem,
  removeSessionItem,
  clearSession,
} from "browser-storage-toolkit";
```

---

## SSR Support

This library checks for browser availability before every operation. If `window` or `document` is missing (e.g., during server-side rendering in **Next.js**, **Nuxt**, or any SSR framework), it:

- Returns `null` for all read operations
- Silently skips all write operations
- **Never throws** — no try/catch needed on your side

```ts
// Safe to call on the server — returns null, no crash
const value = storage.local.getItem("key");
```

---

## Browser Support

Works in all modern browsers:

- Chrome
- Firefox
- Safari
- Edge

Also works in SSR environments (Next.js, Nuxt, Remix, Astro, etc.) — all functions safely return `null` or do nothing when `window` is not available.

---

## Contributing

Contributions are welcome. Here's how to get started:

### Setup

1. Fork the repository
2. Clone your fork

```bash
git clone https://github.com/neospark-inc/browser-storage-toolkit.git
cd browser-storage-toolkit
```

3. Install dependencies

```bash
npm install
```

4. Create a branch

```bash
git checkout -b feature/your-feature-name
```

### Development

Build the project:

```bash
npm run build
```

The compiled output goes to `dist/`.

### Coding Standards

- TypeScript strict mode is enabled
- Keep functions small and focused
- No external dependencies unless absolutely necessary
- Write clean, readable code

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add cookie expiry in minutes
fix: handle null values in getItem
docs: update usage examples
```

### Submitting

1. Push your branch
2. Open a pull request against `main`
3. Describe what you changed and why

---

## License

[MIT](./LICENSE) © 2026 NeoSpark Inc
