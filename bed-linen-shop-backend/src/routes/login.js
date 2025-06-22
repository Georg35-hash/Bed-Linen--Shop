const express = require('express');
const router = express.Router();
const Login = require('../controllers/loginController');

router.post('/', Login, (req, res) => {
  console.log('Request body:', req.body);
  console.log(req.body);
});

module.exports = router;
