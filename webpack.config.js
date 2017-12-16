const path = require("path")
const webpack = require("webpack")

let version = require("./package.json").version
let parts = version.split(".")
let last = parts.splice(-1, 1)[0]
version = parts.join(".") + "." + (parseInt(last || 0) + 1)

console.log(`Creating build of v${version}:`)

module.exports = {
  entry: {
    build: "./src/main.ts",
    example: "./src/example/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      vue$: "vue/dist/vue.esm.js",
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
        include: [path.resolve(__dirname, "./src"), path.resolve(__dirname, "./examples")],
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
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
        test: /\.ts$/,
        loader: "string-replace-loader",
        query: { search: "__VERSION__", replace: version },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  performance: {
    hints: false,
  },
  devtool: "#eval-source-map",
  plugins: [
    new webpack.ProvidePlugin({
      vue: "vue",
    }),
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

if (process.env.NODE_ENV !== "test") {
  module.exports.externals = {
    vue: "axios",
    vue: "Vue",
    "vue-router": "VueRouter",
    "crip-vue-notice": "CripVueNotice",
  }
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
