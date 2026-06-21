export interface CookieOptions {
  days?: number;
  minutes?: number;
  path?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}
