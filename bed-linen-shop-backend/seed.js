const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Product.deleteMany({});

    await Product.insertMany([
      {
        _id: '1',
        name: 'Classic Comfort Pillow',
        description: `Soft and breathable pillow for everyday sleep, ensuring you wake up refreshed and energized.
Our pillow is crafted with a soft and breathable fabric that gently conforms to the contours of your head and neck. It provides just the right amount of support for a peaceful night’s sleep, helping you wake up feeling rested and rejuvenated. Designed for everyday use, it’s perfect for anyone seeking comfort and relaxation`,
        price: 25.99,
        category: 'pillow',
        image: '/static/products/article1.svg',
        inStock: true,
      },
      {
        _id: '2',
        name: 'Memory Foam Pillow',
        description: `The contours follow the shape of your head and neck, providing optimal support.
The ergonomic design of the pillow helps relax muscles and reduce pressure points, allowing you to fall into a deep and restful sleep. Thanks to its unique shape, the pillow is ideal for side, back and stomach sleepers, ensuring proper spinal alignment and preventing neck and shoulder pain.
The premium memory foam filling provides exceptional comfort and support. The foam responds to your body heat and weight, adapting to your individual contours. This creates a feeling of weightlessness and allows your muscles to fully relax. In addition, the foam has excellent ventilation properties, preventing overheating and ensuring a cool and comfortable sleep throughout the night.
The pillow cover is made of soft and breathable fabric, which provides additional comfort and hygiene. The removable and washable cover makes it easy to keep the pillow clean and fresh. Hypoallergenic materials ensure that the pillow is suitable for people with sensitive skin and allergies.
Enjoy unrivaled comfort and support that will provide you with a restful and restorative sleep. This pillow is an investment in your health and well-being.`,
        price: 39.99,
        category: 'pillow',
        image: '/static/products/article2.svg',
        inStock: true,
      },
      {
        _id: '3',
        name: 'Cooling Gel Pillow',
        description: `Made with sustainable bamboo fabric for natural comfort, offering a gentle touch while being eco-friendly.
Our pillow is made with luxurious, sustainable bamboo fabric, known for its natural softness and breathability. The eco-friendly material not only feels gentle against your skin but also has moisture-wicking properties that help keep you cool and dry. Perfect for those who value comfort and sustainability, this pillow supports both your well-being and the planet.`,
        price: 44.5,
        category: 'pillow',
        image: '/static/products/article3.svg',
        inStock: false,
      },
      {
        _id: '4',
        name: 'Eco Bamboo Pillow',
        description: `Hypoallergenic, supportive design that adapts to your head and neck for restful sleep and improved posture.
Experience superior comfort with our hypoallergenic pillow, designed to provide optimal support for your head and neck. Its ergonomic shape adapts to your unique sleeping position, promoting better spinal alignment and reducing neck strain. The hypoallergenic materials make it ideal for sensitive sleepers, ensuring you enjoy a peaceful, restful night without irritation.`,
        price: 32.0,
        category: 'pillow',
        image: '/static/products/article4.svg',
        inStock: true,
      },
      {
        _id: '5',
        name: 'CloudRest Memory Foam Pillow',
        description:
          'Designed with contouring memory foam, CloudRest cradles your head and neck for deep, restorative sleep and proper spinal alignment.',
        price: 39.99,
        category: 'pillow',
        image: '/static/products/article5.svg',
        inStock: true,
      },
      {
        _id: '6',
        name: 'BambooCool Orthopedic Pillow',
        description:
          'Stay cool all night with breathable bamboo fabric and orthopedic support that reduces pressure on the neck and shoulders.',
        price: 44.5,
        category: 'pillow',
        image: '/static/products/article6.png',
        inStock: true,
      },
      {
        _id: '7',
        name: 'SilkSoft Luxury Pillow',
        description:
          'Filled with hypoallergenic microfibers and wrapped in silky-soft fabric, this pillow offers gentle support with a hotel-quality feel.',
        price: 33.25,
        category: 'pillow',
        image: '/static/products/arcticle7.png',
        inStock: false,
      },
      {
        _id: '8',
        name: 'EcoComfort Organic Pillow',
        description:
          'Made from 100% organic cotton and natural latex, EcoComfort provides sustainable softness without compromising on support.',
        price: 49.0,
        category: 'pillow',
        image: '/static/products/article8.png',
        inStock: true,
      },
      {
        _id: '9',
        name: 'TravelEase Compact Pillow',
        description:
          'A lightweight, compact travel pillow that provides ergonomic support on planes, cars, and trains. Folds easily into your bag.',
        price: 18.99,
        category: 'pillow',
        image: '/static/products/article9.png',
        inStock: false,
      },
      {
        _id: '10',
        name: 'DualZone Cooling Pillow',
        description:
          'Features a dual-sided design — one cool-touch gel layer and one plush memory foam — for customizable sleeping comfort.',
        price: 46.75,
        category: 'pillow',
        image: '/static/products/article10.png',
        inStock: true,
      },
      {
        _id: '11',
        name: 'ArcticDown Winter Duvet',
        description:
          'Ultra-warm duvet filled with premium duck down, perfect for cold winter nights. Breathable cotton cover ensures dryness and coziness.',
        price: 89.99,
        category: 'duvet',
        image: '/static/products/article-duvet1.png',
        inStock: true,
      },
      {
        _id: '12',
        name: 'BambooBreeze Summer Duvet',
        description:
          'Lightweight summer duvet made from breathable bamboo fibers. Keeps you cool while providing just the right amount of coverage.',
        price: 62.5,
        category: 'duvet',
        image: '/static/products/article-duvet2.png',
        inStock: true,
      },
      {
        _id: '13',
        name: 'EcoWarm All-Season Duvet',
        description:
          'Versatile all-season duvet crafted from eco-friendly materials. Soft, hypoallergenic, and perfect for year-round comfort.',
        price: 74.0,
        category: 'duvet',
        image: '/static/products/article-duvet3.png',
        inStock: true,
      },
    ]);

    console.log('Success');
    await mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
  });
