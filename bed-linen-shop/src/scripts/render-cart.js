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
  const productData = document.getElementById('productData');
  const succsessSubmit = document.querySelector('.succsess-container');
  const succsessSubmitBtn = document.getElementById('succsessSubmit');
  const orderTrackingContainer = document.querySelector(
    '.order-tracking-container',
  );

  if (!openModalBtn || !modal || !orderForm || !paymentForm) return;

  const goToStep = stepIndex => {
    trackingSteps.forEach((step, i) => {
      step.classList.toggle('completed', i <= stepIndex);
    });

    orderForm.style.display = stepIndex === 0 ? 'flex' : 'none';
    paymentForm.style.display = stepIndex === 1 ? 'flex' : 'none';
    succsessSubmit.style.display = stepIndex === 2 ? 'flex' : 'none';
    succsessSubmitBtn.style.display = stepIndex === 2 ? 'flex' : 'none';

    if (stepIndex === 2 && orderTrackingContainer) {
      const now = new Date();
      const timeString = now.toLocaleString();
      let timeEl = orderTrackingContainer.querySelector('.payment-time');
      if (!timeEl) {
        timeEl = document.createElement('p');
        timeEl.className = 'payment-time';
        orderTrackingContainer.appendChild(timeEl);
      }
      timeEl.textContent = `Оплачено: ${timeString}`;
    }
  };

  openModalBtn.addEventListener('click', e => {
    e.preventDefault();

    if (summaryTotalEl && modalTotalEl) {
      modalTotalEl.textContent = summaryTotalEl.textContent;
    }

    cartState.loadLocalStorage();

    productData.innerHTML = '';
    cartState.products.forEach(product => {
      productData.innerHTML += `
        <div class='cart-section'>
          <ul class='cart-render'>
            <li class='cart-item' data-id='${product._id}'> 
              <p class='title-item'>${product.name}</p> 
              <p class='price-item'>${product.price}$</p>
              <p class='product-total-count'>x${product.count}</p>
              <span class='rubish'>&#10006;</span>
            </li>
          </ul>
        </div>
      `;
    });

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const nameInput = orderForm.querySelector('[name="order-name"]');
    const phoneInput = orderForm.querySelector('[name="order-phone"]');
    const emailInput = orderForm.querySelector('[name="order-email"]');
    const addressInput = orderForm.querySelector('[name="order-address"]');

    nameInput.value = userData.name || '';
    phoneInput.value = userData.phone || '';
    emailInput.value = userData.email || '';
    addressInput.value = '';

    modal.style.display = 'block';
    goToStep(0);
  });

  orderForm.addEventListener('submit', async e => {
    e.preventDefault();

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

      if (!res.ok) throw new Error('Ошибка при создании заказа');

      const { _id: orderId } = await res.json();
      localStorage.setItem('orderId', orderId);
      localStorage.setItem('userData', JSON.stringify({ name, phone, email }));

      goToStep(1);
      await setupPaymentForm();
    } catch (err) {
      console.error('Ошибка создания заказа:', err);
      alert('Произошла ошибка. Попробуйте позже.');
    }
  });

  paymentForm.addEventListener('submit', async e => {
    e.preventDefault();
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      goToStep(2);
    } catch (err) {
      console.error('Ошибка при оплате:', err);
      alert('Оплата не удалась, попробуйте еще раз.');
    }
  });

  const cancelBtns = document.querySelectorAll('.btn-сancle');
  cancelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });

  if (succsessSubmitBtn) {
    succsessSubmitBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      cartState.clear();
    });
  }
}

openModal();
