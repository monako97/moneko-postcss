module.exports = {
  parser: "postcss-jsx",
  plugins: [
    // 更有效的引入内联样式表，并重新合并
    require("postcss-import")(),
    // 修复了一些已知的flexbox错误
    require("postcss-flexbugs-fixes"),
    // 为浅色文本 添加抗锯齿功能
    require("postcss-light-text"),
    // 将样式表里的px转换成rem
    require("postcss-plugin-px2rem")({
      rootValue: 16, // 换算基数,默认100，可以设置为75这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了
      remUnit: 192, // 设计图的宽度/10 比如你的设计图是1920的宽度 这里你就1920/10=192
      // exclude: /(node_module)/, // 排除文件夹 /(node_module)/。如果想把UI框架内的px也转换成rem，设为false
      exclude: false,
    }),
  ].filter(Boolean),
};
