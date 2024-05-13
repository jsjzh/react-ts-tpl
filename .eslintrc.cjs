module.exports = {
  extends: ["alloy", "alloy/react", "alloy/typescript"],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    browser: true,
    node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    // myGlobal: false
    T: true,
    B: true,
    NodeJS: true,
    DocumentEventMap: true,
  },
  rules: {
    // 自定义你的规则
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "no-return-assign": "off",
    "no-promise-executor-return": "off",
    "max-params": "off",
    "no-sequences": "off",
    "no-empty": "off",
  },
};
