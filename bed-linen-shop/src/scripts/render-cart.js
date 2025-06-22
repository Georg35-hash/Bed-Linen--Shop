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
  const cancelBtns = document.querySelectorAll('.form-button');
  const summaryTotalEl = document.querySelector('.cart-summary .total');
  const modalTotalEl = document.querySelector('.form-wrapper .total');
  const trackingSteps = document.querySelectorAll('.order-tracking');
  const orderForm = document.getElementById('orderForm');
  const paymentForm = document.getElementById('paymentForm');
  const productData = document.getElementById('productData');
  const succsessSubmit = document.querySelector('.succsess-container');
  const succsessSubmitBtn = document.getElementById('succsessSubmit');

  if (!openModalBtn || !modal) return;

  const goToStep = stepIndex => {
    trackingSteps.forEach((step, i) => {
      step.classList.toggle('completed', i <= stepIndex);
    });
  };

  const formatDate = () => {
    const d = new Date();
    const minute = String(d.getMinutes()).padStart(2, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const year = d.getFullYear();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `<span>${year}-${day}-${month} ${hour}:${minute}</span>`;
  };

  openModalBtn.addEventListener('click', e => {
    e.preventDefault();
    if (summaryTotalEl && modalTotalEl) {
      modalTotalEl.textContent = summaryTotalEl.textContent;
    }
    modal.style.display = 'block';
    goToStep(0);

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
  });

  cancelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });

  orderForm.addEventListener('submit', async e => {
    e.preventDefault();

    const form = e.target;
    const name = form.querySelector('[name="order-name"]').value;
    const phone = form.querySelector('[name="order-phone"]').value;
    const email = form.querySelector('[name="order-email"]').value;
    const adress = form.querySelector('[name="order-adress"]').value;
    const orderDate = document.getElementById('ordered');

    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name, phone, email, adress },
          items: cartState.products.map(p => ({
            id: p._id,
            name: p.name,
            price: p.price,
            count: p.count,
          })),
        }),
      });

      if (!res.ok) throw new Error('Ошибка при создании заказа');

      const { _id: orderId } = await res.json();
      localStorage.setItem('orderId', orderId);

      orderDate.innerHTML = formatDate();

      orderForm.style.display = 'none';
      paymentForm.style.display = 'flex';
      goToStep(1);

      await setupPaymentForm?.();
    } catch (err) {
      console.error('Ошибка создания заказа:', err);
      alert('Произошла ошибка. Попробуйте позже.');
    }
  });

  paymentForm.addEventListener('submit', e => {
    e.preventDefault();

    const payedDate = document.getElementById('payed');
    payedDate.innerHTML = formatDate();

    paymentForm.style.display = 'none';
    goToStep(2);

    const infoDate = document.getElementById('information');
    infoDate.innerHTML = formatDate();

    succsessSubmit.innerHTML = `
      <p class="succes-message">Success</p>
      <p class="succes-message">Manager will contact you shortly</p>
    `;
    succsessSubmitBtn.style.display = 'flex';

    goToStep(3);
  });
}

openModal();
