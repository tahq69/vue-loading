const path = require("path")
const webpack = require("webpack")

let version = require("./../package.json").version
let parts = version.split(".")
let last = parts.splice(-1, 1)[0]
version = parts.join(".") + "." + (parseInt(last || 0) + 1)

console.log(`Creating library build of v${version}:`)

let resolve = relativePath => path.resolve(__dirname, "./..", relativePath)

module.exports = {
  entry: {
    "crip-vue-loading": resolve("src/main.ts"),
  },
  output: {
    path: resolve("lib"),
    filename: "[name].js",
    library: {
      root: "CripVueLoading",
      amd: "crip-vue-loading",
      commonjs: "crip-vue-loading",
    },
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@": resolve("src"),
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts$/,
        loader: "tslint-loader",
        exclude: /node_modules|vue\/src|vendor\/*/,
        options: {
          configFile: "tslint.json",
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src|vendor\/*/,
        loader: "ts-loader",
        include: resolve("./src"),
      },
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }],
      },
      {
        test: /\.ts$/,
        loader: "string-replace-loader",
        query: { search: "__VERSION__", replace: version },
      },
    ],
  },
  performance: {
    hints: false,
  },
  devtool: "#eval-source-map",
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      progress: true,
      hide_modules: true,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    new webpack.BannerPlugin({
      banner: `/*!
* Crip Vue Loading v${version}
* Forged by Igors Krasjukovs <tahq69@gmail.com>
* Released under the MIT License.
*/`,
      raw: true,
      entryOnly: true,
    }),
  ],
}

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map"
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
  ])
}
