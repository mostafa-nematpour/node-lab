var express = require('express');
var router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users.controller');


router.get('/profile',
  passport.authenticate('jwt', { session: false }),
  userController.show
);



module.exports = router;
