/**
 * Rollup不知道如何'开箱即用'如何处理这些依赖项-我们需要添加一些插件配置。
 * 开发项目我们用webpack，开发js类库，rollup比webpack强。
 */

/**为了正确解析我们的模块并使其与旧版浏览器兼容，我们应该包括babel来编译输出 */
import babel from 'rollup-plugin-babel';

/**
 * rollup.js编译源码中的模块引用默认只支持 ES6+的模块方式import/export。
 * 然而大量的npm模块是基于CommonJS模块方式，这就导致了大量 npm 模块不能直接编译使用。
 * 所以辅助rollup.js编译支持 npm模块和CommonJS模块方式的插件就应运而生。
 *
 * 如果你安装了rollup-plugin-commonjs报错 => 使用@rollup/plugin commonjs.
 * 如果你安装了rollup-plugin-node-resolve可能也会遇到这个情况，解决方案类似
 */
import commonjs from '@rollup/plugin-commonjs';
import resolve, { nodeResolve } from '@rollup/plugin-node-resolve';

import typescript from '@rollup/plugin-typescript';

/**
 * uglify-js只能翻译es5语法。
 * 适用于ES6 +的JavaScript解析器，mangler和压缩器工具包
 */
import { terser } from 'rollup-plugin-terser';

/**
 * 编译css
 * 安装2.0.6版本
 */
import postcss from 'rollup-plugin-postcss'

export default {
  // 入口文件地址, 要打包的文件源路径
  input: './src/main.js',
  // 文件输出配置
  output: [
    {
      /**
       * 输出文件
       * 打包后生产的文件位置及文件名
       */
      file: 'dist/bundle.cjs.js',
      /**
       * 五种输出格式: amd/es6/iife/umd/cjs
       * 文件的输出格式(CommonJS规范, NodeJS的官方模块化规范)
       */
      format: 'cjs',
      /**
       * 包的全局变量名
       * 当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
       */
      name: 'bundleName',
    },
    {
      file: 'dist/bundle.iife.js',
      /**
       * Imdiately Invoked Function Expression 立即执行函数
       * script引入lodash
       * 使用iife打包出来的文件（因为我们这里使用页面引用的方式），查看页面可以正常输出。
       */
      format: 'iife',
      name: 'iifeToBundle',
    },
  ],
  /**
   * 各种插件使用的配置
   */
  plugins: [
    typescript(),
    resolve(),
    nodeResolve({
      extensions: ['css'],
    }),
    commonjs(),
    babel({
      /**排除node_modules文件夹下, 只编译本身的源代码 */
      exclude: 'node_modules/**',
    }),
    // terser(),
    postcss(),
  ],
  /**
   * 告诉rollup不要将此lodash打包而作为外部依赖
   * 如果你不想第三方库被打包进来，而可以在外面引入，配合使用的话，
   * 可以在rollup.config.js中配置external
   */
  external: ['lodash'],
  /**
   * 告诉rollup变量$即是jquery
   */
  global: {
    //   'jquery': '$'
  },
};
