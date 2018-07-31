const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const driver = require('bigchaindb-driver')
const routerBd = require('./bigchain')
const routerClaimAssist = require('./claimAssist');
const app = express();
const DEBUG = process.env.NODE_ENV !== 'production';
const PORT = DEBUG ? '3001' : process.env.PORT;

app.use('/public', express.static(__dirname + '/../public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routerClaimAssist);
const server = app.listen(PORT, function () {
    console.log('Claim Assist is running on PORT ', PORT);
});
