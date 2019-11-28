const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const mode = process.env.NODE_ENV || "production";

module.exports = {
  mode,
  entry: resolve(__dirname, "..", "src", "index.js"),
  devServer: {
    contentBase: [
      resolve(__dirname, "..", "dist"),
      resolve(__dirname, "..", "public"),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
      template: resolve(__dirname, "..", "src", "index.html")
    }),
    new CopyPlugin([
      { from: 'public', to: '.' },
    ]),
    new WasmPackPlugin({
      crateDirectory: resolve(__dirname, ".."),
    }),
  ]
};
