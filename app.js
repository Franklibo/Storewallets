var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var storeWalletRouter = require('./routes/store_wallet');
const { configDotenv } = require('dotenv');

var app = express();

configDotenv();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use('/store_connect_wallet_info', storeWalletRouter);

module.exports = app;
