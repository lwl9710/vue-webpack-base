const path = require("path");
const { DefinePlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// postcss配置文件
const PostcssConfig = require("./postcss.config");

function resolvePath(pathname) {
  return path.resolve(__dirname, pathname);
}

module.exports = function(env) {
  const isProduction = env.mode === "production";
  return {
    mode: env.mode || "development",
    target: [ "web", "es5" ],
    entry: resolvePath("src/main.js"),
    output: {
      clean: true,
      path: resolvePath("dist"),
      filename: "js/[name].[contenthash].bundle.js",
      chunkFilename: "js/[name].[contenthash].chunk.js"
    },
    optimization: {
      // runtimeChunk: "single",
      splitChunks: {
        name: "vendor",
        chunks: "all"
      },
      minimize: isProduction,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({ extractComments: false })
      ]
    },
    resolve: {
      alias: {
        "@": resolvePath("src")
      },
      extensions: [ ".js", ".vue" ]
    },
    devServer: {
      port: 9000,
      compress: true,
      host: "local-ipv4",
      static: {
        directory: resolvePath("public"),
      },
      // proxy: {
      //   "/dev-api": {
      //     target: "", //目标服务器
      //     changeOrigin: true,
      //     pathRewrite: { "^/dev-api": "" }
      //   }
      // },
    },
    devtool: isProduction ? undefined : "inline-source-map",
    externals: {
      vue: "Vue"
    },
    module: {
      rules: [
        { test: /\.js$/i, use: "babel-loader" },
        { test: /\.vue$/i, use: "vue-loader" },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: PostcssConfig
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name].[contenthash].[ext]"
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name].[contenthash].[ext]"
          }
        },
      ]
    },
    plugins: [
      new DefinePlugin({
        "__VUE_OPTIONS_API__": true,
        "__VUE_PROD_DEVTOOLS__": false,
        "process.env": JSON.stringify(env)
      }),
      new CopyPlugin({
        patterns: [
          {
            from: resolvePath("public"),
            to: resolvePath("dist"),
            filter: filename => !/public\/index.html$/i.test(filename)
          }
        ]
      }),
      new HtmlWebpackPlugin({
        template: resolvePath("public/index.html"),
        inject: "body",
        scriptLoading: "blocking"
      }),
      new MiniCssExtractPlugin({ filename: "css/[name].[contenthash].css" }),
      new VueLoaderPlugin()
    ]
  }
}