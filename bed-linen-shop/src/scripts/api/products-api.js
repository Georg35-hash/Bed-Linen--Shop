const API_URL = 'http://localhost:3000/api/products';

export async function getProductById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Error ${res.status}`);
  }
  return data;
}

export async function getAllProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Error ${res.status}`);
  }
  return data;
}
