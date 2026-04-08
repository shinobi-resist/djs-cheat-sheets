import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'm3-imports.js',
  output: {
    file: 'm3-bundle.js',
    format: 'es',
  },
  plugins: [resolve()],
};
