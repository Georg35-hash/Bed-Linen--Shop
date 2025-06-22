const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    items: [
      {
        product: {
          type: String,
          ref: 'Product',
          required: true,
        },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1, default: 1 },
      },
    ],
    status: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);
