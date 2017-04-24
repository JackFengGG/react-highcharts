var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');


var server = new WebpackDevServer(webpack(config), {
  stats: {colors: true,},
  progress: true,
  publicPath: config.output.publicPath
});


server.app.get('*', function(req, res) {
	res.sendFile(__dirname + '/index.html')
});
server.listen(3000, function(err, result) {
	console.log('正常打开3000端口')
});
