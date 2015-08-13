'use strict';

var router = module.exports = require('express').Router();

router.get('', function (req, res) {
    req.app.locals.roomid = '__ROOT__';
    res.render('index', {
        locals: req.app.locals,
        assets: req.assets
    });
});