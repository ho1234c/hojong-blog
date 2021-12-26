export const sessionStorage = {
  setItem: (key: string, value: string) => {
    if (typeof window === `undefined`) return;
    window.sessionStorage.setItem(key, value);
  },

  getItem: (key: string) => {
    if (typeof window === `undefined`) return '';
    return window.sessionStorage.getItem(key) || '';
  },
};

export const localStorage = {
  setItem: (key: string, value: string) => {
    if (typeof window === `undefined`) return;
    window.localStorage.setItem(key, value);
  },

  getItem: (key: string) => {
    if (typeof window === `undefined`) return '';
    return window.localStorage.getItem(key) || '';
  },
};
