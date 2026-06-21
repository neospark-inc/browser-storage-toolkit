import * as cookie from "./cookie";
import * as local from "./local";
import * as session from "./session";

export const storage = {
  cookie,
  local,
  session,
};

export { setCookie, getCookie, deleteCookie } from "./cookie";
export type { CookieOptions } from "./cookie";

export {
  setItem as setLocalItem,
  getItem as getLocalItem,
  removeItem as removeLocalItem,
  clear as clearLocal,
} from "./local";

export {
  setItem as setSessionItem,
  getItem as getSessionItem,
  removeItem as removeSessionItem,
  clear as clearSession,
} from "./session";

export { isBrowser } from "./utils";
