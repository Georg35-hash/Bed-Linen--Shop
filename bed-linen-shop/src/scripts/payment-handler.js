import { loadStripe } from '@stripe/stripe-js';
import { getAllCountries } from 'postal-code-checker';
const stripePromise = loadStripe(
  'pk_test_51ROxGvQuXi6dIvV2Bs2l1qUHldWAB8tDVXV94Ld4hJPuy2oy8Zvq107qt6flh6HNfxFFtPTfVLrXOu2imdIQzvWo00j2zCZYWR',
);
let cardNumber, cardExpiry, cardCvc;
let paymentFormInitialized = false;

export async function setupPaymentForm() {
  const orderId = localStorage.getItem('orderId');

  const stripe = await stripePromise;
  const elements = stripe.elements();

  // Создаем и монтируем Stripe Elements один раз
  if (!cardNumber) {
    cardNumber = elements.create('cardNumber');
    cardExpiry = elements.create('cardExpiry');
    cardCvc = elements.create('cardCvc');

    cardNumber.mount('#card-number');
    cardExpiry.mount('#card-expiry');
    cardCvc.mount('#card-cvc');
  }

  const form = document.querySelector('#paymentForm');
  if (!form) {
    console.error('Payment form not found in DOM');
    return;
  }

  ['name', 'email', 'phone'].forEach(name => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) input.value = '';
  });

  try {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const { name, email, phone } = JSON.parse(savedUserData);
      if (form.querySelector('[name="name"]'))
        form.querySelector('[name="name"]').value = name || '';
      if (form.querySelector('[name="email"]'))
        form.querySelector('[name="email"]').value = email || '';
      if (form.querySelector('[name="phone"]'))
        form.querySelector('[name="phone"]').value = phone || '';
    }
  } catch (e) {
    console.warn('Error parsing userData from localStorage:', e);
  }

  if (!paymentFormInitialized) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const country = form.querySelector('[name="country"]').value.trim();

      const amountStr = document.querySelector(
        '.form-wrapper .total',
      )?.textContent;
      const amount = parseFloat(amountStr);

      if (!name || !email || !phone || !country) {
        alert('Please fill in all required fields.');
        return;
      }

      if (isNaN(amount) || amount <= 0) {
        alert('Invalid payment amount');
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, amount, country, email, phone }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            `Server payment endpoint error: ${text || res.statusText}`,
          );
        }

        const { clientSecret } = await res.json();
        if (!clientSecret) {
          throw new Error('No clientSecret received from server');
        }

        const pmResult = await stripe.createPaymentMethod({
          type: 'card',
          card: cardNumber,
          billing_details: { name, email, phone, address: { country } },
        });

        if (pmResult.error) {
          alert('Error creating payment method: ' + pmResult.error.message);
          return;
        }

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: pmResult.paymentMethod.id,
        });

        if (paymentResult.error) {
          alert('Payment failed: ' + paymentResult.error.message);
          return;
        }

        if (paymentResult.paymentIntent?.status === 'succeeded') {
          alert('Payment succeeded! 🎉');
          try {
            await updateOrderStatus(orderId, 'paid');
          } catch (updateErr) {
            console.error('Error updating order status:', updateErr);
            alert('Payment was successful, but failed to update order status.');
          }
        } else {
          alert('Payment not completed successfully.');
        }
      } catch (err) {
        console.error('Payment process error:', err);
        alert('Payment error: ' + err.message);
      }
    });

    paymentFormInitialized = true;
  }
}

async function updateOrderStatus(orderId, newStatus) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/orders/${orderId}/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ошибка при обновлении статуса');
    }

    console.log('Статус успешно обновлён:', data);
  } catch (err) {
    console.error('Ошибка:', err.message);
  }
}

export function countrySelector() {
  const countrySelect = document.getElementById('countrySelect');
  const countries = getAllCountries();

  countries.forEach(code => {
    const option = document.createElement('option');
    option.value = code.countryCode;
    option.textContent = code.countryCode;
    countrySelect.appendChild(option);
  });
}
