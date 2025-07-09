import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import { version } from './package.json';
import { visualizer } from 'rollup-plugin-visualizer';
import cleanup from 'rollup-plugin-cleanup';

export default [
  //umd
  {
    input: 'src/index.ts',
    output: {
      file: `dist/umd/rn-emitter-${version}.min.js`,
      format: 'umd',
      name: 'imsdk',
    },
    plugins: [
      resolve({
        extensions: ['.js', '.json', '.ts'],
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true, // 开启体积优化
      }),
      typescript({
        tsconfig: './tsconfig-umd.json',
      }),
      resolve({
        mainField: ['jsnext', 'main'],
        browser: true,
      }),

      cleanup(),
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
      }),
      visualizer(),
    ],
  },
  //es5
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/lib',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js',
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
  // ES6
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/es',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js',
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig-es.json',
      }),
    ],
  },
];
