import path from "path"
import defaultWebpackConfig from "@phenomic/plugin-bundler-webpack/lib/webpack.config.js"
//import CopyWebpackPlugin from "copy-webpack-plugin"

module.exports = (config: PhenomicConfig) => {
  const webpackConfig = defaultWebpackConfig(config)
  return Object.assign({}, webpackConfig, {
    //plugins: [new CopyWebpackPlugin([{from: "admin", to: "admin"}])],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
  })
}
