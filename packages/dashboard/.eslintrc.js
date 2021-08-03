module.exports = {
  extends: ['ruppy-react/ts', 'ruppy-ts'],
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  root: true,
};
