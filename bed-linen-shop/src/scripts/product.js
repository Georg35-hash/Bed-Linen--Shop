import { getProductById, getAllProducts } from './api/products-api.js';
import { addHandler } from './add-handler.js';
const baseUrl = 'http://localhost:3000';

export function renderProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  getProductById(productId)
    .then(product => {
      if (!product || !product.image) {
        throw new Error('Product not found or invalid data from server.');
      }

      const truncateText = (text, maxLength = 160) =>
        text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

      const fullText = product.description;
      const isTruncated = fullText.length > 160;
      const descriptionElement = document.getElementById('productDescription');
      const btn = document.querySelector('.btn-more-less');

      let expanded = false;

      descriptionElement.textContent = isTruncated
        ? truncateText(fullText)
        : fullText;

      if (isTruncated && btn) {
        btn.style.display = 'inline-block';
        btn.addEventListener('click', () => {
          expanded = !expanded;
          descriptionElement.textContent = expanded
            ? fullText
            : truncateText(fullText);
          btn.textContent = expanded ? 'Show less' : 'Show more';
        });
      } else if (btn) {
        btn.style.display = 'none';
      }

      document.getElementById('productImage').src = baseUrl + product.image;
      document.getElementById('productImage').alt = product.name;
      document.getElementById('productName').textContent = product.name;
      document.getElementById('productPrice').textContent =
        `${product.price} $`;

      const inStock = document.getElementById('inStock');
      inStock.innerHTML = `<p style="margin-top:20px;font-family: 'Cabinet-Grotesk', sans-serif;">avaliable: ${
        product.inStock ? 'yes' : 'no'
      }</p>`;

      const addToCartWrapper = document.getElementById('addToCartWrapper');
      if (addToCartWrapper) {
        addToCartWrapper.innerHTML = `
          <div class="cart-count" id="cartCount">
            <input class="quantity-input" id="quantity" type="text" data-id="${product._id}" min="1" value="1">
          </div>
          <button class="add-to-cart-btn" id="addToCart">Add to Cart</button>`;
      }
      addHandler(product._id);
    })
    .catch(err => {
      document.getElementById('errorMessage').innerHTML =
        `<p>${err.message}</p>`;
    });
}

export function renderAllProduct() {
  const container = document.getElementById('productsContainer');

  getAllProducts()
    .then(products => {
      if (!Array.isArray(products) || products.length === 0) {
        throw new Error('No products found.');
      }
      container.innerHTML = '';

      products.forEach(product => {
        container.innerHTML += `
          <a class='cart-item' href='/src/pages/product.html?id=${product._id}'>
            <img class='image-item' src='${baseUrl + product.image}' alt='${
              product.name
            }'/> 
            <span class='line'></span>
            <div class='text-wrapper'>
            <p class='title-item'>${product.name}</p> 
            <p class='price-item'>${product.price} $</p>
            </div>
          </a>
        `;
      });
    })
    .catch(error => {
      console.error(error);
      document.getElementById('errorMessage').textContent = error.message;
    });
}
