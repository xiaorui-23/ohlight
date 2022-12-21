
import typescript from "rollup-plugin-typescript2"
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
    input: './src/index.ts',
    output: [
        {
          dir: 'bin',
          format: "es", // es模块导出，支持按需加载
          name: 'o-light',
          exports: "named", // 指定导出模式（自动、默认、命名、无）
          preserveModules: true, // 保留模块结构
          preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
       },
      ],
    plugins: [
        typescript(),
        resolve(),
        commonjs(),
        babel({
          exclude: 'node_modules/**',
          runtimeHelpers: true,
        }),
        terser(),
    ]
}