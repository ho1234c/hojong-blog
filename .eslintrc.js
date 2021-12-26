module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `react-app`,
};
