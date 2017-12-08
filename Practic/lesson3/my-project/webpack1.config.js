var webpack= require('webpack');

module.exports={
  entry:"./src/main.js",
  output:{
    path: __dirname + '/public/build',
    publicPath: "build/",
    filename: "bundle.js"
  },
  module:{
    loaders: [
      {
        test: /\.js$/,
        loader:"babel",
        exclude: [/node_modules/, /public/]
      },
      {
        test:/\.css$/,
        loader:"style-loader!css-loader!autoprefixer-loader",
        exclude: [/node_modules/, /public/]
      },
      {
        test:/\.gif$/,
        loader:"url-loader?limit=1000%mimetype=image/gif"
      },
      {
        test:/\.jpg$/,
        loader:"url-loader?limit=1000%mimetype=imagejpgf"
      },
      {
        test:/\.png$/,
        loader:"url-loader?limit=1000%mimetype=image/png"
      },
      {
        test:/\.svg$/,
        loader:"url-loader?limit=26000%mimetype=image/svg+xml"
      },
      {
        test: /\.jsx$/,
        loader:"babel",
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.js$on/,
        loader:"json-loader"
      },
    ]
  }
}