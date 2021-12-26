export type ColorType = typeof light;

export const light = {
  body: '#fff',
  header: 'rgba(255, 255, 255, 0.8)',
  textPrimary: '#333',
  textSecondary: '#585858',
  primary: '#f96900',
  secondary: '#ffedda',
  postHover: '#f4f4f4',

  markdown: {
    languageText: 'rgb(242, 242, 242)',
  },
};

export const dark = {
  body: '#3a3a3a',
  header: 'rgb(95 95 95 / 80%)',
  textPrimary: '#eaeaea',
  textSecondary: '#9e9e9e',
  primary: '#f78c57',
  secondary: '#525252',
  postHover: '#424242',

  markdown: {
    languageText: 'rgb(84 84 84)',
  },
};

export const theme = {
  color: {
    light,
    dark,
  },
};
