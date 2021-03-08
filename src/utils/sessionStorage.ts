export const setItem = (key: string, value: string) => {
  if (typeof window === `undefined`) return
  window.sessionStorage.setItem(key, value)
}

export const getItem = (key: string) => {
  if (typeof window === `undefined`) return ""
  return window.sessionStorage.getItem(key) || ""
}
