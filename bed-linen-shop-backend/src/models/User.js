const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('User', userScheme);
