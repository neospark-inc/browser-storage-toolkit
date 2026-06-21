# browser-storage-manager

a simple, lightweight toolkit to manage browser storage — cookies, localStorage, and sessionStorage — through one clean api.

built with typescript. zero dependencies. works everywhere including ssr frameworks like next.js.

---

## features

- **unified api** — one import, three storage types
- **cookie manager** — set, get, delete with full options (expiry, path, secure, sameSite)
- **localStorage wrapper** — auto json stringify/parse, availability fallback
- **sessionStorage wrapper** — same clean api as localStorage
- **ssr safe** — won't crash on server, returns safe defaults
- **typescript first** — full type support out of the box
- **zero dependencies** — nothing extra, just what you need
- **tiny bundle** — minimal footprint

---

## installation

```bash
npm install browser-storage-manager
```

---

## usage

### unified storage object

the easiest way to use everything:

```ts
import { storage } from "browser-storage-manager";

storage.cookie.setCookie("token", "abc123", { days: 7, secure: true });
storage.local.setItem("user", { name: "bibek", role: "admin" });
storage.session.setItem("tab-state", { page: 3 });
```

### cookies

```ts
import { setCookie, getCookie, deleteCookie } from "browser-storage-manager";

setCookie("theme", "dark", {
  days: 30,
  path: "/",
  secure: true,
  sameSite: "Lax",
});

const theme = getCookie("theme");

deleteCookie("theme");
```

**cookie options:**

| option     | type                           | default | description            |
| ---------- | ------------------------------ | ------- | ---------------------- |
| `days`     | `number`                       | —       | expire after n days    |
| `minutes`  | `number`                       | —       | expire after n minutes |
| `path`     | `string`                       | `"/"`   | cookie path            |
| `secure`   | `boolean`                      | —       | https only             |
| `sameSite` | `"Strict" \| "Lax" \| "None"` | —       | cross-site policy      |

### localStorage

```ts
import { storage } from "browser-storage-manager";

storage.local.setItem("settings", { theme: "dark", lang: "en" });

const settings = storage.local.getItem("settings");

storage.local.removeItem("settings");

storage.local.clear();
```

objects and arrays are automatically serialized to json and parsed back — you don't need to worry about `JSON.stringify` or `JSON.parse`.

### sessionStorage

```ts
import { storage } from "browser-storage-manager";

storage.session.setItem("form-draft", { name: "bibek", step: 2 });

const draft = storage.session.getItem("form-draft");

storage.session.removeItem("form-draft");

storage.session.clear();
```

---

## api reference

### cookie

| method                               | returns         | description               |
| ------------------------------------ | --------------- | ------------------------- |
| `setCookie(name, value, options?)`   | `void`          | sets a cookie             |
| `getCookie(name)`                    | `string \| null`| gets a cookie value       |
| `deleteCookie(name, path?)`         | `void`          | deletes a cookie          |

### localStorage

| method                | returns        | description                  |
| --------------------- | -------------- | ---------------------------- |
| `setItem(key, value)` | `void`         | stores value (auto json)     |
| `getItem(key)`        | `T \| null`    | retrieves value (auto parse) |
| `removeItem(key)`     | `void`         | removes a key                |
| `clear()`             | `void`         | clears all local storage     |

### sessionStorage

| method                | returns        | description                  |
| --------------------- | -------------- | ---------------------------- |
| `setItem(key, value)` | `void`         | stores value (auto json)     |
| `getItem(key)`        | `T \| null`    | retrieves value (auto parse) |
| `removeItem(key)`     | `void`         | removes a key                |
| `clear()`             | `void`         | clears all session storage   |

---

## individual imports

you can also import each function directly if you prefer:

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
} from "browser-storage-manager";
```

---

## browser support

works in all modern browsers:

- chrome
- firefox
- safari
- edge

also works in ssr environments (next.js, nuxt, etc.) — all functions safely return `null` or do nothing when `window` is not available.

---

## ssr support

this library checks for browser availability before every operation. if `window` or `document` is missing (like during server-side rendering), it simply returns `null` for reads and silently skips writes. no crashes, no errors.

```ts
const value = storage.local.getItem("key");
```

---

## contributing

contributions are welcome. here's how to get started:

### setup

1. fork the repo
2. clone your fork

```bash
git clone https://github.com/neospark-inc/browser-storage-manager.git
cd browser-storage-manager
```

3. install dependencies

```bash
npm install
```

4. create a branch

```bash
git checkout -b feature/your-feature-name
```

### development

build the project:

```bash
npm run build
```

the compiled output goes to `dist/`.

### coding standards

- typescript strict mode is on
- keep functions small and focused
- no external dependencies unless absolutely necessary
- write clean, readable code

### commit messages

use clear, descriptive commit messages:

```
feat: add cookie expiry in minutes
fix: handle null values in getItem
docs: update usage examples
```

### submitting

1. push your branch
2. open a pull request against `main`
3. describe what you changed and why

---

## license

[MIT](./LICENSE)
