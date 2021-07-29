module.exports = {
  extends: ['ruppy-node', 'ruppy-ts', 'ruppy-jest'],
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
