import { cartState } from '../state/cartState';

export function addHandler(productId) {
  cartState.loadLocalStorage();

  const button = document.getElementById('addToCart');

  if (button) {
    button.addEventListener('click', () => {
      const productName = document.getElementById('productName')?.textContent;
      const productPriceText =
        document.getElementById('productPrice')?.textContent;
      const productImage = document.getElementById('productImage')?.src;
      const quantityInput = document.getElementById('quantity');
      const quantity = parseInt(quantityInput?.value);

      if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
      }

      const product = {
        _id: productId,
        name: productName,
        image: productImage,
        price: parseFloat(productPriceText),
        count: quantity,
      };

      cartState.addToCart(product);
      alert(`Added ${quantity} to cart!`);
    });
  }
}
