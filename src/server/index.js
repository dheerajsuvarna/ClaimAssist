const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const driver = require('bigchaindb-driver')
const routerBd = require('./bigchain')

const app = express();
const DEBUG = process.env.NODE_ENV !== 'production';
const PORT = DEBUG ? '3001' : process.env.PORT;

app.use('/public', express.static(__dirname + '/../public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Bigchain DB connection


const routerpetshop = require('./petshop');
app.use('/',routerBd)
//app.use('/', routerpetshop);
//app.use('/', routerhandsOn);

const server = app.listen(PORT, function () {
    console.log('Express listening on port %s', PORT);
});
