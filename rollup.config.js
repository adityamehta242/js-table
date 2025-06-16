import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';

const pkg = require('./package.json');

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} License.
 */`;

const baseConfig = {
  input: 'src/index.js',
  external: ['react', 'vue', '@angular/core'],
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    postcss({
      extract: 'datatable.css',
      minimize: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
          }
        }]
      ]
    })
  ]
};

export default [
  // ES Module build
  {
    ...baseConfig,
    output: {
      file: pkg.module,
      format: 'esm',
      banner
    }
  },
  
  // CommonJS build
  {
    ...baseConfig,
    output: {
      file: pkg.main,
      format: 'cjs',
      banner
    }
  },
  
  // UMD build for browsers
  {
    ...baseConfig,
    output: {
      file: 'dist/datatable.umd.js',
      format: 'umd',
      name: 'DataTable',
      banner
    }
  },
  
  // Minified UMD build
  {
    ...baseConfig,
    plugins: [...baseConfig.plugins, terser()],
    output: {
      file: 'dist/datatable.umd.min.js',
      format: 'umd',
      name: 'DataTable',
      banner
    }
  },
  
  // Framework-specific builds
  {
    input: 'adapters/react.js',
    external: ['react', 'react-dom'],
    plugins: baseConfig.plugins,
    output: {
      file: 'dist/react.js',
      format: 'esm'
    }
  },
  
  {
    input: 'adapters/vue.js',
    external: ['vue'],
    plugins: baseConfig.plugins,
    output: {
      file: 'dist/vue.js',
      format: 'esm'
    }
  }
];