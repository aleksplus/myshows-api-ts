import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  target: 'es2015',
  platform: 'node',
  dts: {
    // Force the oxc (isolatedDeclarations) generator: the default tsc
    // generator needs the TypeScript JS compiler API, which typescript@7
    // does not expose.
    generator: 'oxc',
  },
  outExtensions: ({ format }) =>
    format === 'cjs' ? { js: '.js', dts: '.d.ts' } : {},
});
