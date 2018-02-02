module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
  ],
  plugins: ["prettier", "react"],
  rules: {
    "react/prop-types": "off",
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
}
