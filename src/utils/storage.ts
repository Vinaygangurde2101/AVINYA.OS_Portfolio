/**
 * Safe LocalStorage utility with fallback for restricted iframe/browser settings
 */

export function getItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
}
