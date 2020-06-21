const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const { route } = require('./authRoute');

router.route('/')
  .get(userController.list)
  .post(userController.create);

module.exports = router;