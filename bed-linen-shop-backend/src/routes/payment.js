const express = require('express');
const router = new express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

router.post('/', async (req, res) => {
  const { amount, name, email, phone, country } = req.body;

  try {
    const customer = await stripe.customers.create({
      name,
      email,
      phone,
      address: {
        country,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      description: `Payment from ${name}`,
      customer: customer.id,
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Stripe error' });
  }
});

module.exports = router;
