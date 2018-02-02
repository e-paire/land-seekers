import path from "path"
import defaultWebpackConfig from "@phenomic/plugin-bundler-webpack/lib/webpack.config.js"

module.exports = (config: PhenomicConfig) => {
  const webpackConfig = defaultWebpackConfig(config)
  return Object.assign({}, webpackConfig, {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
  })
}
