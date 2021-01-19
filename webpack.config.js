const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, options) => {
   const isProduction = options.mode === 'production'

   return {
      entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js'],
      output: {
         path: path.resolve(__dirname, 'public/scripts'),
         filename: 'bundle.js'
      },
      module: {
         rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               // options: {
               //    presets: ['@babel/preset-env', '@babel/preset-react']
               // }
            }
         }, {
            test: /\.s?css$/,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {
                     url: false
                  }
               },
               'sass-loader'
            ]
         }]
      },
      plugins: [
         new MiniCssExtractPlugin({
            // starting pt. is 'scripts' folder
            filename: 'style.css'
         })
      ],
      devServer: {
         contentBase: path.resolve(__dirname, 'public'),
         publicPath: '/scripts/'
      },
      devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map'
   }
}
