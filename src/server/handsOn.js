const express = require('express');
const path = require('path');
const passport = require('passport');

var routerhandsOn = express.Router();

routerhandsOn.get('/handsOn', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/handsOn/index.html'));
});

module.exports = routerhandsOn;
