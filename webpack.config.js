const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js',
    // slickslider: './src/js/slickslider.js',
  },
  output: {
    filename: 'assets/js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          partialDirs: [
            path.join(__dirname, 'src', 'partials'),
            path.join(__dirname, 'src', 'partials', 'sections'),
          ],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/layouts/main.hbs',
      inject: false,
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/home.hbs',
      inject: 'body',
      filename: 'home.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets/images', to: './assets/images', noErrorOnMissing: true },
        { from: './src/assets/videos', to: './assets/videos', noErrorOnMissing: true },
        { from: './src/assets/fonts', to: './assets/fonts', noErrorOnMissing: true },
        { from: './node_modules/slick-carousel/slick/slick.css', to: './assets/css/slick.css' },
        { from: './node_modules/slick-carousel/slick/slick-theme.css', to: './assets/css/slick-theme.css' },
        { from: './node_modules/slick-carousel/slick/slick.min.js', to: './assets/js/slick.min.js' },
      ],
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080,
    historyApiFallback: true,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    alias: {
      '@scss': path.resolve(__dirname, 'src/scss'),
    },
  },
  mode: 'development',
};
