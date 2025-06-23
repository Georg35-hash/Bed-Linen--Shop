import { cartState } from '../state/cartState';
import { deleteHandler } from './delete-handler';
import { setupPaymentForm } from './payment-handler';
export function renderCart() {
  cartState.loadLocalStorage();

  const cartItemsEl = document.getElementById('cartItems');
  const totalPriceEl = document.querySelector('.cart-summary .total');

  if (totalPriceEl) {
    totalPriceEl.textContent = `${cartState.totalsum()}$`;
  }

  cartItemsEl.innerHTML = '';

  cartState.products.forEach(product => {
    cartItemsEl.innerHTML += `
    <section class='cart-section'>
      <ul class='cart-render'>
        <li class='cart-item' data-id='${product._id}'> 
          <img class='image-item' src='${product.image}'/> 
          <p class='title-item'>${product.name}</p> 
          <p class='price-item'>${product.price}$</p>
          <p class='product-total-count'>x${product.count}</p>
          <span class='rubish'>&#10006;</span>
        </li>
      </ul>
    </section>
  `;
  });

  deleteHandler();
}

export function openModal() {
  const openModalBtn = document.querySelector('#checkoutBtn');
  const modal = document.querySelector('.form-wrapper');
  const summaryTotalEl = document.querySelector('.cart-summary .total');
  const modalTotalEl = document.querySelector('.form-wrapper .total');
  const trackingSteps = document.querySelectorAll('.order-tracking');
  const orderForm = document.getElementById('orderForm');
  const paymentForm = document.getElementById('paymentForm');
  const succsessForm = document.getElementById('succsessForm');
  const succsessContainer = document.querySelector('.succsess-container');
  const succsessSubmitBtn = document.getElementById('succsessSubmit');
  const orderTrackingContainer = document.querySelector(
    '.order-tracking-container',
  );
  const productData = document.getElementById('productData');

  if (!openModalBtn || !modal || !orderForm || !paymentForm || !succsessForm)
    return;

  const goToStep = stepIndex => {
    trackingSteps.forEach((step, i) => {
      step.classList.toggle('completed', i <= stepIndex);
    });

    orderForm.style.display = stepIndex === 0 ? 'flex' : 'none';
    paymentForm.style.display = stepIndex === 1 ? 'flex' : 'none';
    succsessForm.style.display = stepIndex === 2 ? 'flex' : 'none';

    if (succsessSubmitBtn) {
      succsessSubmitBtn.style.display =
        stepIndex === 2 ? 'inline-block' : 'none';
    }

    if (stepIndex === 2) {
      succsessContainer.innerHTML = `<p style="color:white;">Your order has been successfully placed! Thank you for your purchase.</p>`;

      succsessForm.style.flexDirection = 'column';
      succsessForm.style.alignItems = 'center';
      succsessForm.style.justifyContent = 'center';
      succsessForm.style.gap = '15px';

      if (orderTrackingContainer) {
        const now = new Date();
        const timeString = now.toLocaleString();
        let timeEl = orderTrackingContainer.querySelector('.payment-time');
        if (!timeEl) {
          timeEl = document.createElement('p');
          timeEl.className = 'payment-time';
          orderTrackingContainer.appendChild(timeEl);
        }
        timeEl.textContent = `Paid: ${timeString}`;
      }
    } else {
      succsessContainer.innerHTML = '';
    }
  };

  openModalBtn.addEventListener('click', e => {
    e.preventDefault();
    cartState.loadLocalStorage();

    if (!cartState.products || cartState.products.length === 0) {
      alert('No orders found');
      return;
    }

    if (summaryTotalEl && modalTotalEl) {
      modalTotalEl.textContent = summaryTotalEl.textContent;
    }

    productData.innerHTML = '';
    cartState.products.forEach(product => {
      productData.innerHTML += `
        <div class='cart-section'>
          <ul class='cart-render'>
            <li class='cart-item' data-id='${product._id}'> 
              <p class='title-item'>${product.name}</p> 
              <p class='price-item'>${product.price}$</p>
              <p class='product-total-count'>x${product.count}</p>
            </li>
          </ul>
        </div>
      `;
    });

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    orderForm.querySelector('[name="order-name"]').value = userData.name || '';
    orderForm.querySelector('[name="order-phone"]').value =
      userData.phone || '';
    orderForm.querySelector('[name="order-email"]').value =
      userData.email || '';
    orderForm.querySelector('[name="order-address"]').value = '';

    modal.style.display = 'block';
    goToStep(0);
  });

  orderForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm(orderForm)) return;

    const form = e.target;
    const name = form.querySelector('[name="order-name"]').value;
    const phone = form.querySelector('[name="order-phone"]').value;
    const email = form.querySelector('[name="order-email"]').value;
    const address = form.querySelector('[name="order-address"]').value;

    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name, phone, email, address },
          items: cartState.products.map(p => ({
            product: p._id,
            price: p.price,
            quantity: p.count,
          })),
        }),
      });

      if (!res.ok) throw new Error('Error per creating an order');

      const { _id: orderId } = await res.json();
      localStorage.setItem('orderId', orderId);
      localStorage.setItem('userData', JSON.stringify({ name, phone, email }));

      goToStep(1);
      await setupPaymentForm();
    } catch {
      alert('Error. Try later.');
    }
  });

  paymentForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm(paymentForm)) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      goToStep(2);
      cartState.clear();
      productData.innerHTML = '';
      if (summaryTotalEl) summaryTotalEl.textContent = '0';
    } catch {
      alert('Payment failed, please try again.');
    }
  });

  if (succsessSubmitBtn) {
    succsessSubmitBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      cartState.clear();
      productData.innerHTML = '';
      if (summaryTotalEl) summaryTotalEl.textContent = '0';

      orderForm.querySelector('[name="order-name"]').value = '';
      orderForm.querySelector('[name="order-phone"]').value = '';
      orderForm.querySelector('[name="order-email"]').value = '';
      orderForm.querySelector('[name="order-address"]').value = '';

      localStorage.removeItem('userData');
      localStorage.removeItem('orderId');
    });
  }

  const cancelBtns = document.querySelectorAll('.btn-сancle');
  cancelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });
}

openModal();

function validateForm(form) {
  let isValid = true;

  form.querySelectorAll('.error-message').forEach(el => (el.textContent = ''));

  form.querySelectorAll('input, select, textarea').forEach(input => {
    if (input.hasAttribute('required')) {
      if (!input.value.trim()) {
        const errorEl = form.querySelector(
          `.error-message[data-for="${input.name}"]`,
        );
        errorEl.style.color = 'red';
        if (errorEl) errorEl.textContent = 'This field is required';
        isValid = false;
        return;
      }

      if (
        input.type === 'email' ||
        input.name.toLowerCase().includes('email')
      ) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value.trim())) {
          const errorEl = form.querySelector(
            `.error-message[data-for="${input.name}"]`,
          );
          if (errorEl) errorEl.style.color = 'red';
          errorEl.textContent = 'Enter a valid email';
          isValid = false;
          return;
        }
      }

      if (input.name.toLowerCase().includes('phone')) {
        const phonePattern = /^\+?[\d\s\-]{7,15}$/;
        if (!phonePattern.test(input.value.trim())) {
          const errorEl = form.querySelector(
            `.error-message[data-for="${input.name}"]`,
          );
          if (errorEl) errorEl.style.color = 'red';
          errorEl.textContent = 'Enter a valid phone number';
          isValid = false;
          return;
        }
      }

      if (input.name === 'order-address') {
        if (input.value.trim().length < 5) {
          const errorEl = form.querySelector(
            `.error-message[data-for="${input.name}"]`,
          );
          if (errorEl) errorEl.style.color = 'red';
          errorEl.textContent = 'Enter a valid address (min 5 chars)';
          isValid = false;
          return;
        }
      }
    }
  });

  return isValid;
}
