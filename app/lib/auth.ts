"use client";

const TOKEN_KEY = "admin_token";

export function login(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {}
}

export function logout() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {}
}

export function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch (e) { return null; }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
