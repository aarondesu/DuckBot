module.exports = {
  extends: ['ruppy-node', 'ruppy-ts'],
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
