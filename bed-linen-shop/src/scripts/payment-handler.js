import { loadStripe } from '@stripe/stripe-js';
import { getAllCountries } from 'postal-code-checker';
const stripePromise = loadStripe(
  'pk_test_51ROxGvQuXi6dIvV2Bs2l1qUHldWAB8tDVXV94Ld4hJPuy2oy8Zvq107qt6flh6HNfxFFtPTfVLrXOu2imdIQzvWo00j2zCZYWR',
);

let cardNumber, cardExpiry, cardCvc;

export async function setupPaymentForm() {
  const orderId = localStorage.getItem('orderId');
  const stripe = await stripePromise;
  const elements = stripe.elements();

  if (!orderId) {
    alert('Order ID not found');
    return;
  }

  // Создание и монтирование элементов карты
  cardNumber = elements.create('cardNumber');
  cardExpiry = elements.create('cardExpiry');
  cardCvc = elements.create('cardCvc');

  cardNumber.mount('#card-number');
  cardExpiry.mount('#card-expiry');
  cardCvc.mount('#card-cvc');

  // Подгружаем данные заказа
  try {
    const res = await fetch(`http://localhost:3000/api/orders/${orderId}`);
    if (!res.ok) throw new Error('Error in data');

    const { customer } = await res.json();
    const { name, email, phone, createdAt } = customer;

    const form = document.querySelector('#paymentForm');
    if (form) {
      form.querySelector('[name="name"]').value = name || '';
      form.querySelector('[name="email"]').value = email || '';
      form.querySelector('[name="phone"]').value = phone || '';
    }
  } catch (err) {
    console.error('Ошибка загрузки данных оплаты:', err);
  }

  // Обработчик сабмита формы — добавляется ВСЕГДА
  const form = document.querySelector('#paymentForm');
  form?.addEventListener('submit', async e => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const country = form.querySelector('[name="country"]').value.trim();

    const amount = parseFloat(
      document.querySelector('.form-wrapper .total')?.textContent,
    );

    if (isNaN(amount)) {
      alert('Invalid amount');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, amount, country, email, phone }),
      });

      const { clientSecret } = await res.json();

      const pmResult = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumber,
        billing_details: {
          name,
          email,
          phone,
          address: { country },
        },
      });

      if (pmResult.error) {
        alert('Error creating payment method: ' + pmResult.error.message);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: pmResult.paymentMethod.id,
      });
      console.log(result);

      if (result.error) {
        alert('Payment failed: ' + result.error.message);
      } else if (result.paymentIntent?.status === 'succeeded') {
        alert('Payment succeeded! 🎉');
        await updateOrderStatus(orderId, 'paid');
      }
    } catch (err) {
      console.error(err);
      alert('Payment error');
    }
  });
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
