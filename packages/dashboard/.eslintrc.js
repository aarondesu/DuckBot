module.exports = {
  extends: ['ruppy-react/ts', 'ruppy-ts'],
  env: {
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  root: true,
};
