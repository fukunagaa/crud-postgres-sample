const path = require("path");

const server = {
  mode: "development",
  // node_moduleを使うために必要(クライアントは必要なさそう。)
  target: "node",
  // エントリポイントの定義
  entry: {
    server: ["@babel/polyfill", path.join(__dirname, "src/server/app.js")],
  },
  // nativeはバンドルできないので、対象外とする
  externals: ["pg-native"],
  // 出力先の定義
  output: {
    path: path.join(__dirname, "src"),
    filename: "[name].min.js",
  },
  resolve: {
    // モジュール解決定義
    modules: ["node_modules", path.resolve(__dirname, "src")],
  },
  devtool: "inline-source-map",
  module: {
    // babel の実行定義
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
};

module.exports = [server];
