import { isJson } from "./data.helper";

export function getItem(key: string, defaultValue: any = null) {
  try {
    const LsData = localStorage.getItem(key);
    if (LsData === null) return defaultValue;

    return isJson(LsData) ? JSON.parse(LsData) : LsData;
  } catch (error) {
    return defaultValue;
  }
}

export function setItem(key: string, value: any) {
  const data = JSON.stringify(value);

  localStorage.setItem(key, data);
}

export function deleteItem(key: string) {
  localStorage.removeItem(key);
}

export function deleteAll() {
  localStorage.clear();
}
