const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const mode = process.env.NODE_ENV || "production";
const PROJECT_ROOT = resolve(__dirname, "..");

module.exports = {
  mode,
  entry: `${PROJECT_ROOT}/src/index.js`,
  devServer: {
    contentBase: [
      `${PROJECT_ROOT}/dist`,
      `${PROJECT_ROOT}/public`,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
      template: `${PROJECT_ROOT}/src/index.html`
    }),
    new CopyPlugin([
      { from: 'public', to: '.' },
    ]),
    new WasmPackPlugin({
      crateDirectory: resolve(__dirname, ".."),
    }),
  ]
};
