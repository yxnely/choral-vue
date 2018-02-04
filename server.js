if (!process.env.PORT) {
    require('dotenv').config();
};

const express = require('express');
const expressVue = require('express-vue');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
const compiler = webpack(webpackConfig);
// const Router = require('./router');

const app = express();

app.use(bodyParser());

const vueOptions = {
    rootPath: path.join(__dirname, './src/views'),
    head: {
        title: 'Article Search',
        meta: [
            { charset: 'UTF-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'application-name', content: 'Choral, Vue.js edition' },
            { name: 'description', content: 'A lyric collaboration app for creatives' }
        ]
    },
    layout: {
        start: '<div id="app">',
        end: '</div>'
    }
}

const expressVueMiddleware = expressVue.init(vueOptions);

app.use(expressVueMiddleware);
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', (req, res, next) => {
    const data = {
        otherData: 'Something Else',
    };

    res.renderVue('index', data, vueOptions);
})

// listen on $PORT or 3000
// this makes the app work on heroku
var port = process.env.PORT || 8080;

http.createServer(app).listen(port, function (err) {
  console.log('Yello! Coming at you with ' + port + ' hugs!');
});