const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    static: "dist", // This tells the dev server to serve files from 'dist'
    watchFiles: ["./src/**/*"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "utilities",    // Copies everything from 'utilities' in your project root
          to: "utilities",      // Puts it in 'dist/utilities/'
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|otf|woff2|woff)$/i,
        type: "asset/resource", // Handles direct imports in JS/CSS (not needed for copy-plugin, but safe to keep)
      }
    ],
  },
};
