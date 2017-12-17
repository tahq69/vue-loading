const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let version = require("./../package.json").version
let parts = version.split(".")
let last = parts.splice(-1, 1)[0]
version = parts.join(".") + "." + (parseInt(last || 0) + 1)

console.log(`Creating documentation build of v${version}:`)

let resolve = relativePath => path.resolve(__dirname, "./..", relativePath)

module.exports = {
  entry: {
    app: resolve("app/main.ts"),
  },
  output: {
    path: resolve("./dist"),
    publicPath: "/dist/",
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      "@": resolve("src"),
      "#": resolve("app"),
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
          configFile: resolve("tslint.json"),
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src|vendor\/*/,
        loader: "ts-loader",
        include: [resolve("src"), resolve("app")],
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
        test: /\.ts$/,
        loader: "string-replace-loader",
        query: { search: "__VERSION__", replace: version },
      },
      {
        test: /\.scss$|\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
        }),
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: "url-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "file-loader",
        options: { name: "[name].[ext]?[hash]" },
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
    new ExtractTextPlugin('styles.css'),
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
    axios: "axios",
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
