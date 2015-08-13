'use strict';

var router = module.exports = require('express').Router();

router.get('/:roomid', function (req, res) {
    req.app.locals.roomid = req.params.roomid;
    res.render('index', {
        locals: req.app.locals,
        assets: req.assets
    });
});