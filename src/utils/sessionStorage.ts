export const setItem = (key:string, value: string) => {
  sessionStorage.setItem(key, value);
}

export const getItem = (key: string) => {
  return sessionStorage.getItem(key) || "";
}