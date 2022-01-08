'use strict';

const config = require('./../webpack.config.js');
const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const middleware = require('webpack-dev-middleware');
const api = require('./routes/api');
const compiler = webpack(config);
const app = express();
const server = require('http').Server(app);
const io = require('./io')(server);

server.listen(3000);

app.use(bodyParser.json());

app.use(middleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/api', api);
