const express = require('express');
const router = express.Router();
const SignUp = require('../controllers/registerController');

router.post('/', SignUp);

module.exports = router;
