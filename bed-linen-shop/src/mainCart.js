import { renderCart } from './scripts/render-cart';
import { setupPaymentForm, countrySelector } from './scripts/payment-handler';
import '../src/mainCart.scss';
import './components/mainHeader.js';

document.addEventListener('DOMContentLoaded', () => {
  setupPaymentForm();
  countrySelector();
});

renderCart();
