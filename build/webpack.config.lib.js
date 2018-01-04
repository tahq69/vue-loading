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
    filename: "crip-vue-loading.js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "CripVueLoading",
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      "@": resolve("src"),
      "#": resolve("app"),
      "$": resolve("types"),
      "&": resolve("test"),
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
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: "vue-style-loader!css-loader!sass-loader",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax",
            esModule: true,
          },
        },
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
* (c) 2017-${new Date().getFullYear() + 1} Igors Krasjukovs <tahq69@gmail.com>
* Released under the MIT License.
*/`,
      raw: true,
      entryOnly: true,
    }),
  ],
}

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map"
  module.exports.externals = {
    vue: {
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
      root: "Vue",
    },
    "vue-router": {
      commonjs: "vue-router",
      commonjs2: "vue-router",
      amd: "vue-router",
      root: "VueRouter",
    },
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
  ])
}
