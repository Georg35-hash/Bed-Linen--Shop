export const cartState = {
  products: [],

  removeFromCart(productID) {
    this.products = this.products.filter(
      product => String(product._id) !== String(productID),
    );
    this.saveToLocalStorage();
  },

  loadLocalStorage() {
    const stored = localStorage.getItem('cart');
    this.products = stored ? JSON.parse(stored) : [];
  },

  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.products));
  },

  totalsum() {
    return this.products.reduce((sum, product) => {
      return sum + parseFloat(product.price) * product.count;
    }, 0);
  },

  addToCart(product) {
    const existing = this.products.find(p => p._id === product._id);
    if (existing) {
      existing.count += product.count;
    } else {
      this.products.push(product);
    }
    this.saveToLocalStorage();
  },

  clear() {
    this.products = [];
    this.saveToLocalStorage();
  },
};
