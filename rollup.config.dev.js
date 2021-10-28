/**
 * 开发环境
 * Rollup不知道如何'开箱即用'如何处理这些依赖项-我们需要添加一些插件配置。
 * 开发项目我们用webpack，开发js类库，rollup比webpack强。
 */

/**编译typescript */
import typescript from '@rollup/plugin-typescript';

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

/**为了正确解析我们的模块并使其与旧版浏览器兼容，我们应该包括babel来编译输出 */
import babel from 'rollup-plugin-babel';

/**
 * 编译css
 * 安装2.0.6版本
 */
import postcss from 'rollup-plugin-postcss';

/**编译图片 */
import image from '@rollup/plugin-image';

/**
 * uglify-js只能翻译es5语法。
 * 适用于ES6 +的JavaScript解析器，mangler和压缩器工具包
 */
import { terser } from 'rollup-plugin-terser';

/**
 * 开启本地服务器
 *  - 使用koa提供服务器并实现功能
 *  - 具有可能有用的附加功能
 *      - 请求的详细日志记录
 *      - 全面的代理支持
 *      - 支持URL的基本路径
 *      - 会自动为你的生产版本关闭
 */
import dev from 'rollup-plugin-dev';

/**开启本地服务器 */
import serve from 'rollup-plugin-serve';

/**热更新 */
import livereload from 'rollup-plugin-livereload';

/**Rollup插件，用于在打包软件包时定义别名。 */
import alias from '@rollup/plugin-alias';

/**可视化并分析您的Rollup捆绑包，以查看哪些模块占用了空间。 */
import { visualizer } from 'rollup-plugin-visualizer';

/**给css3的一些属性添加前缀 */
import autoprefixer from 'autoprefixer';

/**css压缩 */
import cssnano from 'cssnano';

const path = require('path');
const resolveDir = dir => path.join(__dirname, dir);

export default {
  /**入口文件地址, 要打包的文件源路径 */
  input: './src/main.js',

  /**文件输出配置 */
  output: [
    {
      /**输出文件, 打包后生产的文件位置及文件名 */
      file: 'dist/bundle.cjs.js',
      /**
       * 五种输出格式: amd/es6/iife/umd/cjs
       * 文件的输出格式(CommonJS规范, NodeJS的官方模块化规范)
       */
      format: 'cjs',
      name: 'bundleToCJS',
      sourceMap: true,
    },
    {
      file: 'dist/bundle.iife.js',
      /**
       * Imdiately Invoked Function Expression 立即执行函数
       * script引入lodash
       * 使用iife打包出来的文件（因为我们这里使用页面引用的方式），查看页面可以正常输出。
       */
      format: 'iife',
      name: 'bundleToIIFE',
    },
    {
      file: 'dist/bundle.amd.js',
      /**Asynchronous Module Definition 异步模块规范 */
      format: 'amd',
      name: 'bundleToAMD',
    },
    {
      file: 'dist/bundle.umd.js',
      /** Universal Module Definition 通用模块规范*/
      format: 'umd',
      name: 'bundleToUMD',
    },
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

  /**各种插件使用的配置 */
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    babel({
      /**排除node_modules文件夹下, 只编译本身的源代码 */
      exclude: 'node_modules/**',
    }),
    terser(),
    postcss(),
    alias({
      entries: [{ find: '@', replacement: resolveDir('src') }],
    }),
    image(),
    // autoprefixer(),
    // cssnano(),
    livereload(),
    serve({
      open: true,
      port: 8888,
      contentBase: '',
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    // dev({
    //   port: 8888,
    //   dirs: '',
    // }),
  ],
};
