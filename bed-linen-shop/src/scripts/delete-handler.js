import { cartState } from '../state/cartState';

export function deleteHandler() {
  const deleteButtons = document.querySelectorAll('.rubish');
  deleteButtons.forEach(button => {
    button.addEventListener('click', e => {
      const itemElement = e.currentTarget.closest('.cart-item');
      const productID = itemElement?.dataset.id;

      if (!productID) {
        console.warn('Product ID not found!');
        return;
      }

      cartState.removeFromCart(productID);
      itemElement.remove();
      alert('Deleted!');
    });
  });
}
