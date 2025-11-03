const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module:{
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins:[
  new HtmlWebpackPlugin({
    title: 'Output Management',
    template: path.resolve(__dirname, 'src/index.html') //__dirname=D:Tratsiak_Olga\Test - полный путь к шаблону
  }),
  new MiniCssExtractPlugin({
    filename: 'index.[fullhash].css' //'[name].css - если написать так, то в dist будет присваиваться имя main.css
  }),
  ],
};