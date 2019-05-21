const path = require('path')
module.exports = {
  mode: "none",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: "request.js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader"
      }
    ]
  }
};