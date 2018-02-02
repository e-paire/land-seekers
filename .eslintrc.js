module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
  ],
  plugins: ["react"],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
}
