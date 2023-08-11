var express = require('express');
var router = express.Router();


let homeRouter = require('./home');
let usersRouter = require('./users');
let moviesRouter = require('./movies');


router.use('/', homeRouter);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);


module.exports = router;
