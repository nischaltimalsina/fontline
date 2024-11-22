import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'],
  external: ['react', 'next'],
  injectStyle: false,
  sourcemap: false,
  minify: true,
  dts: true,
  clean: true,
  format: ['esm', 'cjs'],
  splitting: false,
  bundle: true
})
