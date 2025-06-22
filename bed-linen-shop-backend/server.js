const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();

// Routes
const productRoutes = require('./src/routes/products');
const orderRoutes = require('./src/routes/orders');
const intentPayment = require('./src/routes/payment');
const signUp = require('./src/routes/signup');
const logIn = require('./src/routes/login');
const user = require('./src/routes/user');
const email = require('./src/routes/email');
// MongoDB Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connect to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/email', email);
app.use('/payment', intentPayment);
app.use('/signup', signUp);
app.use('/login', logIn);
app.use('/api/user', user);

const PORT = process.env.PORT || 3000;

app.listen(PORT, res => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Server is started!');
});
