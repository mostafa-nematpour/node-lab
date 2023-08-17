var express = require('express');
var router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/', userController.getAll);
router.get('/:userId', userController.getUser);

module.exports = router;
