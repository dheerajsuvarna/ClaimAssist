const express = require('express');
const path = require('path');
const passport = require('passport');

var routerpetshop = express.Router();

routerpetshop.get('/petshop', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/petshop/index.html'));
});

module.exports = routerpetshop;