const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .send({ status: 'Error', message: 'User not found' });
    }
    res.send({ status: 'ok', data: user });
  } catch (error) {
    console.log(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { login, email, profileImage } = req.body;
    console.log('Received data:', req.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { login, email, profileImage },
      { new: true },
    );

    if (!updatedUser) {
      return res
        .status(404)
        .send({ status: 'Error', message: 'User not found' });
    }

    res.send({ status: 'ok', data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'Error', message: 'Failed to update user' });
  }
});

module.exports = router;
