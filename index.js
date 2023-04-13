const path = require("path");
const fs = require("fs");

let hasTailwindcss = false;

try {
  const tailwindcssConfPath = path.join(
    process.cwd(),
    `./tailwindcss-config.js`
  );

  accessSync(tailwindcssConfPath, fs.constants.R_OK);
  hasTailwindcss = true;
} catch (error) {
  hasTailwindcss = false;
}

const postcssPresetEnvOpt = hasTailwindcss
  ? { features: { "nesting-rules": false } }
  : {};
const postcssConfig = {
  plugins: {
    // 更有效的引入内联样式表，并重新合并
    "postcss-import": {},
    // 自动添加兼容性前缀polyfills
    "postcss-preset-env": postcssPresetEnvOpt,
    // 修复了一些已知的flexbox错误
    "postcss-flexbugs-fixes": {},
    // 为浅色文本 添加抗锯齿功能
    "postcss-light-text": {},
    // 将样式表里的px转换成rem
    "postcss-plugin-px2rem": {
      rootValue: 16, // 换算基数,默认100，可以设置为75这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了
      remUnit: 192, // 设计图的宽度/10 比如你的设计图是1920的宽度 这里你就1920/10=192
      // exclude: /(node_module)/, // 排除文件夹 /(node_module)/。如果想把UI框架内的px也转换成rem，设为false
      exclude: false,
    },
    ...(hasTailwindcss
      ? {
          "tailwindcss/nesting": "postcss-nesting",
          tailwindcss: {},
        }
      : {}),
    // 自动添加前缀
    autoprefixer: {
      browsers: ["last 1 versions"],
      flexbox: "no-2009", // 仅为规范的最终版本和IE版本添加前缀。
      grid: "autoplace", // 启用-ms-Grid Layout的前缀
      overrideBrowserslist: ["> 0.15% in CN"],
    },
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};

exports.js = {
  ...postcssConfig,
  parser: 'postcss-js',
}
exports.css = postcssConfig
module.exports = postcssConfig;
