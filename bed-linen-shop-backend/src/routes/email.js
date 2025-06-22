const express = require('express');
const router = express.Router();
const Email = require('../controllers/emailController');

router.post('/', Email, (req, res) => {
  console.log('Request body:', req.body);
});

module.exports = router;
